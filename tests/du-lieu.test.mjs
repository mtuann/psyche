// Kiểm thử lớp dữ liệu (D1.2, chép từ ../opus/tests/du-lieu.test.mjs rồi sửa): dữ liệu thật trong src/data/ đúng schema
// và kiểm chéo; bộ dữ liệu hỏng mẫu trong tests/du-lieu-hong/ bị bắt đủ từng lỗi và làm build hỏng; trang chưa có bản
// ghi trong trang.yml, hay frontmatter ghi thông tin thuộc trang.yml, làm build hỏng (thử thật bằng astro sync);
// trang.yml khớp bảng ánh xạ plans/lam-lai/anh-xa.md.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parse } from 'yaml';
import { TRUONG_O_TRANG_YML, frontmatterRieng, kiemTra, loaiTrang, trangChuaDangKy } from '../src/du-lieu.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATA = path.join(ROOT, 'src/data');
const CU = path.resolve(ROOT, '../psyche-zero/docs'); // site cũ, chỉ có ở máy (trên GitHub thì bỏ qua)
const ASTRO = path.join(ROOT, 'node_modules/astro/bin/astro.mjs');

/** Chạy astro sync ở thư mục `cwd` với biến môi trường thêm `env`; trả về { status, ra } (ra: stdout và stderr). */
function astroSync(cwd, env = {}) {
	const r = spawnSync(process.execPath, [ASTRO, 'sync'], { cwd, env: { ...process.env, ...env }, encoding: 'utf8' });
	return { status: r.status, ra: r.stdout + r.stderr };
}

test('dữ liệu trong src/data/ đúng schema và kiểm chéo, đủ số bản ghi đã tách', () => {
	const { duLieu, loi } = kiemTra(DATA);
	assert.deepEqual(loi, []);
	assert.equal(duLieu['linh-vuc'].length, 14, '14 lĩnh vực của bản đồ Nền tảng');
	assert.equal(duLieu.trang.length, 121, '106 trang cũ và 15 trang mới');
	assert.equal(duLieu.trang.filter((r) => r.moi).length, 15);
	assert.equal(duLieu.trang.filter((r) => r.tang === 'loi').length, 68, '68 trang lõi (plans/ben-vung/README.md mục 3)');
	assert.equal(duLieu.trang.filter((r) => r.tang === 'mo-rong').length, 12, '12 bài mở rộng');
	assert.equal(duLieu['ngo-nhan'].length, 60, '60 thẻ ngộ nhận');
	// D1.2 tách được 534 nguồn, 374 DOI (site cũ có 381 DOI; 7 DOI còn lại D2-0 thêm). Thêm thì được, mất thì đỏ.
	assert.ok(duLieu.nguon.length >= 534, `nguon.yml còn ${duLieu.nguon.length} bản ghi, D1.2 có 534`);
	assert.ok(duLieu.nguon.filter((r) => r.doi).length >= 374, 'nguon.yml mất DOI (D1.2 có 374)');
	// mỗi trang Thí nghiệm là trang nhà của nghiên cứu chính của nó
	for (const r of duLieu.trang.filter((t) => t.tang === 'loi' && t.id.startsWith('thi-nghiem/')))
		assert.ok(duLieu['nghien-cuu'].some((n) => n.trang_nha === r.id), `${r.id} chưa là trang nhà của hồ sơ nào`);
	// trang Sức khỏe tâm thần (chỉ khóa khi hồ sơ có chữ ký chuyên gia, D1.6): bài lõi của lĩnh vực suc-khoe-tam-than
	assert.deepEqual(
		duLieu.trang.filter((r) => r.tang === 'loi' && r.linh_vuc === 'suc-khoe-tam-than').map((r) => r.id).sort(),
		['lo-au', 'tim-giup-do', 'tram-cam', 'tri-lieu-tam-ly'].map((x) => `kham-pha/suc-khoe-tam-than/${x}`),
	);
});

test('trang.yml khớp bảng ánh xạ plans/lam-lai/anh-xa.md (tầng, lĩnh vực, trang mới của từng trang)', () => {
	const bang = new Map();
	for (const dong of fs.readFileSync(path.join(ROOT, 'plans/lam-lai/anh-xa.md'), 'utf8').split('\n')) {
		const m = /^\| `([^`]+)`( \(mới\))? \| [^|]+ \| ([a-z-]+) \| ([a-z-]*) \|/.exec(dong);
		if (m) bang.set(m[1], { tang: m[3], linh_vuc: m[4] || undefined, moi: m[2] ? true : undefined });
	}
	assert.equal(bang.size, 121, 'anh-xa.md phải có 121 trang');
	const lech = [];
	for (const r of parse(fs.readFileSync(path.join(DATA, 'trang.yml'), 'utf8'))) {
		const b = bang.get(r.id);
		if (!b) lech.push(`${r.id}: không có trong anh-xa.md`);
		else for (const k of ['tang', 'linh_vuc', 'moi']) if (b[k] !== r[k]) lech.push(`${r.id}: ${k} ở trang.yml là ${r[k]}, ở anh-xa.md là ${b[k]}`);
	}
	assert.deepEqual(lech, [], 'đổi tầng, lĩnh vực ở trang.yml thì sửa bảng trong plans/lam-lai/anh_xa.py và sinh lại anh-xa.md');
});

test('bộ dữ liệu hỏng mẫu: mỗi lỗi cố ý đều bị bắt, đủ số chú thích "lỗi"', () => {
	const { loi } = kiemTra(path.join(ROOT, 'tests/du-lieu-hong'));
	const canBat = [
		'linh-vuc.yml: thiếu thu_tu 2',
		'linh-vuc.yml: thu_tu 3 xuất hiện 2 lần',
		'linh-vuc.yml: "tri-nho" trùng màu 232',
		'linh-vuc.yml: bản ghi "hoc-tap" (dòng 12): mau:',
		'linh-vuc.yml: bản ghi "hoc-tap" (dòng 12): Khóa không được nhận dạng: "mau_sac"',
		'linh-vuc.yml: bản ghi "Tam-Ly" (dòng 17): id:',
		'trang.yml: lĩnh vực "tri-nho" thiếu trang lĩnh vực nen-tang/tri-nho',
		'trang.yml: bản ghi "kham-pha/tri-nho/vi-sao-ta-quen" (dòng 14): dua_tren: chỉ trang mở rộng',
		'trang.yml: bản ghi "kham-pha/tri-nho/bang-ghi-hinh" (dòng 18): linh_vuc: trang lõi, trang mở rộng phải có linh_vuc',
		'trang.yml: bản ghi "kham-pha/tri-nho/phong-cach-hoc": dua_tren "nen-tang/hoc-tap" không phải trang lõi',
		'trang.yml: bản ghi "kham-pha/tri-nho/phong-cach-hoc": dua_tren "kham-pha/khong-co" không có trong trang.yml',
		'trang.yml: bản ghi "kham-pha/tri-nho/phong-cach-hoc": dua_tren trỏ tới chính nó',
		'trang.yml: bản ghi "kham-pha/tri-nho/duong-cong-quen" (dòng 24): dua_tren: có phần tử lặp',
		'trang.yml: bản ghi "kham-pha/hanh-phuc/dong-chay-flow" (dòng 28): kiem_lai_truoc:',
		'trang.yml: bản ghi "kham-pha/tri-nho/tri-nho-lam-viec": linh_vuc "tri-nho-sai" không có',
		'trang.yml: bản ghi "bat-dau/index" (dòng 35): kiem_lai_truoc: chỉ trang mở rộng, trang có hạn',
		'trang.yml: bản ghi "them/gioi-thieu" (dòng 38): tang:',
		'trang.yml: bản ghi "them/cap-nhat" (dòng 40): Khóa không được nhận dạng: "ghi_chu"',
		'trang.yml: bản ghi "/thi-nghiem/asch.md" (dòng 43): id:',
		'trang.yml: trùng id "bang-chung/p-value" (dòng 46)',
		'trang.yml: lĩnh vực "hoc-tap" không có bài lõi nào',
		'nguon.yml: "cepeda2006b" và "cepeda2006" cùng doi',
		'nguon.yml: "cepeda2006c" và "cepeda2006" cùng tác giả, năm, tên',
		'nguon.yml: "rowland2014b" và "rowland2014" cùng doi',
		'nguon.yml: "roediger2006b" và "roediger2006" cùng url',
		'nguon.yml: bản ghi "murre2015" (dòng 44): doi:',
		'nguon.yml: bản ghi "dros2015" (dòng 50): doi:',
		'nguon.yml: bản ghi "ebbinghaus1885" (dòng 56): url: link doi.org ghi ở trường doi',
		'nguon.yml: bản ghi "xss2020" (dòng 62): url: link phải là http hay https',
		'nguon.yml: bản ghi "sherif1988" (dòng 68): nam_goc:',
		'nguon.yml: bản ghi "cohen1990" (dòng 74): id: id không có năm 1988',
		'nguon.yml: bản ghi "cohen1990" (dòng 74): noi_dang: nơi đăng không mở đầu bằng dấu câu',
		'nguon.yml: bản ghi "retracted2011" (dòng 80): rut_bai: Khóa không được nhận dạng: "ly_do"',
		'nguon.yml: bản ghi "khong-tac-gia" (dòng 86): loai:',
		'nguon.yml: bản ghi "khong-tac-gia" (dòng 86): tac_gia:',
		'nguon.yml: bản ghi "khong-tac-gia" (dòng 86): nam:',
		'nguon.yml: bản ghi "khong-tac-gia" (dòng 86): Khóa không được nhận dạng: "trang"',
		'nghien-cuu.yml: bản ghi "tai-lap": nguồn "murre2015" đã thuộc hồ sơ "ebbinghaus"',
		'nghien-cuu.yml: bản ghi "tai-lap": nguồn "khong-co-nguon" không có',
		'nghien-cuu.yml: bản ghi "tai-lap": trang_nha "nen-tang/phuong-phap" không phải trang lõi',
		'nghien-cuu.yml: bản ghi "rong" (dòng 10): nguon:',
		'nghien-cuu.yml: bản ghi "lap" (dòng 14): nguon: có phần tử lặp',
		'nghien-cuu.yml: bản ghi "lap" (dòng 14): Khóa không được nhận dạng: "nam"',
		'ngo-nhan.yml: bản ghi "nao-10" (dòng 2): nhan:',
		'ngo-nhan.yml: bản ghi "hoc-don" (dòng 8): cap:',
		'ngo-nhan.yml: bản ghi "hoc-don" (dòng 8): nguon: có phần tử lặp',
		'ngo-nhan.yml: bản ghi "may-quay": nguồn "nguon-khong-co" không có',
		'ngo-nhan.yml: bản ghi "may-quay": trang "kham-pha/tri-nho/khong-co" không có',
		'ngo-nhan.yml: bản ghi "tieng-anh" (dòng 21): Khóa không được nhận dạng: "claim"',
		'trang.yml: bản ghi "them/nhat-ky" (dòng 50): moi:',
		'trang.yml: bản ghi "kham-pha/hanh-phuc/tien-va-hanh-phuc" (dòng 53): dua_tren:',
		'nguon.yml: "roediger2006c" và "roediger2006" cùng url',
		'nguon.yml: bản ghi "wundt1874" (dòng 97): nam_goc:',
		'nguon.yml: bản ghi "retracted2012" (dòng 103): rut_bai.nguon: link phải là http hay https',
	];
	for (const c of canBat) assert.ok(loi.some((l) => l.startsWith(c)), `không bắt được lỗi: ${c}\nCác lỗi bắt được:\n${loi.join('\n')}`);
	// Mỗi chú thích "lỗi:" trong file mẫu là một lỗi phải bắt, và không có lỗi nào ngoài các lỗi đã ghi (không lỗi dây
	// chuyền): thêm lỗi mẫu thì thêm vào canBat.
	const chuThich = fs
		.readdirSync(path.join(ROOT, 'tests/du-lieu-hong'))
		.map((f) => fs.readFileSync(path.join(ROOT, 'tests/du-lieu-hong', f), 'utf8'))
		.join('\n')
		.match(/lỗi:/g).length;
	assert.equal(chuThich, canBat.length, 'số chú thích "lỗi:" trong tests/du-lieu-hong/ khác số lỗi kiểm ở đây');
	assert.equal(loi.length, canBat.length, `có lỗi ngoài các lỗi đã ghi (lỗi dây chuyền?):\n${loi.join('\n')}`);
});

test('file dữ liệu rỗng, hỏng hay thiếu: báo một lỗi, không kéo theo hàng loạt lỗi "không có"', () => {
	const tam = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-du-lieu-'));
	try {
		for (const f of fs.readdirSync(DATA)) fs.copyFileSync(path.join(DATA, f), path.join(tam, f));
		fs.writeFileSync(path.join(tam, 'nguon.yml'), '[]\n');
		assert.deepEqual(kiemTra(tam).loi, ['nguon.yml: không có bản ghi nào']);
		fs.copyFileSync(path.join(DATA, 'nguon.yml'), path.join(tam, 'nguon.yml'));
		fs.writeFileSync(path.join(tam, 'trang.yml'), '- id: a\n  id: b\n');
		const { loi } = kiemTra(tam);
		assert.equal(loi.length, 1, loi.join('\n'));
		assert.match(loi[0], /^trang\.yml: YAML hỏng: .*line 2/);
		fs.rmSync(path.join(tam, 'linh-vuc.yml'));
		fs.copyFileSync(path.join(DATA, 'trang.yml'), path.join(tam, 'trang.yml'));
		assert.deepEqual(kiemTra(tam).loi, ['linh-vuc.yml: không có file']);
		// một lĩnh vực sai kiểu ở giữa danh sách: chỉ báo lỗi của nó, không báo lệch thứ tự hay "không có" ở chỗ khác
		const lv = parse(fs.readFileSync(path.join(DATA, 'linh-vuc.yml'), 'utf8'));
		fs.writeFileSync(path.join(tam, 'linh-vuc.yml'), JSON.stringify(lv.map((r) => (r.thu_tu === 5 ? { ...r, mau: 400 } : r))));
		assert.deepEqual(kiemTra(tam).loi, ['linh-vuc.yml: bản ghi "hoc-tap" (dòng 1): mau: Quá lớn: mong đợi number <=359']);
		// lĩnh vực không có id: lỗi của nó và lỗi thật của các trang trỏ tới nó, không có lỗi giả về lĩnh vực "undefined"
		fs.writeFileSync(path.join(tam, 'linh-vuc.yml'), JSON.stringify(lv.map((r) => (r.id === 'hoc-tap' ? { ...r, id: undefined } : r))));
		const loiId = kiemTra(tam).loi;
		assert.ok(loiId.some((l) => l.startsWith('linh-vuc.yml: bản ghi thứ 5 (dòng 1): id:')), loiId.join('\n'));
		assert.ok(!loiId.some((l) => l.includes('"undefined"')), loiId.join('\n'));
		// lỗi đọc file (ở đây: một thư mục mang tên file) khác lỗi YAML và lỗi thiếu file
		fs.copyFileSync(path.join(DATA, 'linh-vuc.yml'), path.join(tam, 'linh-vuc.yml'));
		fs.rmSync(path.join(tam, 'nguon.yml'));
		fs.mkdirSync(path.join(tam, 'nguon.yml'));
		const loiDoc = kiemTra(tam).loi;
		assert.equal(loiDoc.length, 1, loiDoc.join('\n'));
		assert.match(loiDoc[0], /^nguon\.yml: không đọc được: /);
	} finally {
		fs.rmSync(tam, { recursive: true, force: true });
	}
});

test('build hỏng khi dữ liệu sai (astro sync với PSYCHE_DU_LIEU=tests/du-lieu-hong)', () => {
	const r = astroSync(ROOT, { PSYCHE_DU_LIEU: 'tests/du-lieu-hong' });
	assert.notEqual(r.status, 0, 'astro sync phải hỏng');
	assert.match(r.ra, /Dữ liệu trong tests\/du-lieu-hong sai \(\d+ lỗi\)/);
});

test('build hỏng khi có trang chưa có trong trang.yml, hay frontmatter ghi thông tin thuộc trang.yml (astro sync thật)', () => {
	// Bản chép tối thiểu của repo ở thư mục tạm (node_modules dùng liên kết), để thử cả phần nối trong src/content.config.ts
	const tam = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-noi-'));
	try {
		for (const f of ['astro.config.mjs', 'package.json', 'tsconfig.json']) fs.copyFileSync(path.join(ROOT, f), path.join(tam, f));
		fs.cpSync(path.join(ROOT, 'src'), path.join(tam, 'src'), { recursive: true });
		fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(tam, 'node_modules'), 'dir');
		const docs = path.join(tam, 'src/content/docs');
		const trang = (ten, fm) => fs.writeFileSync(path.join(docs, ten), `---\ntitle: Thử\n${fm}---\n\nChữ.\n`);
		assert.equal(astroSync(tam).status, 0, 'bản chép nguyên vẹn phải đạt (để chắc lỗi dưới đây là do trang thử)');
		trang('chua-dang-ky.md', '');
		let r = astroSync(tam);
		assert.notEqual(r.status, 0, 'trang chưa có trong trang.yml mà build vẫn đạt');
		assert.match(r.ra, /Trang chưa có trong src\/data\/trang\.yml[^]*chua-dang-ky/);
		fs.rmSync(path.join(docs, 'chua-dang-ky.md'));
		fs.mkdirSync(path.join(docs, '_thu-muc'));
		trang('_thu-muc/x.md', ''); // thư mục "_": Starlight vẫn nạp và đăng trang, nên phải có bản ghi
		r = astroSync(tam);
		assert.notEqual(r.status, 0, 'trang trong thư mục "_" chưa có trong trang.yml mà build vẫn đạt');
		assert.match(r.ra, /Trang chưa có trong src\/data\/trang\.yml[^]*_thu-muc\/x/);
		fs.rmSync(path.join(docs, '_thu-muc'), { recursive: true });
		trang('_nhap.md', ''); // file tên mở đầu bằng "_": bản nháp, Starlight không nạp, không cần bản ghi
		fs.writeFileSync(path.join(docs, 'index.md'), fs.readFileSync(path.join(docs, 'index.md'), 'utf8').replace(/^---\n/, '---\ntang: loi\n'));
		r = astroSync(tam);
		assert.notEqual(r.status, 0, 'frontmatter có tang mà build vẫn đạt');
		assert.match(r.ra, /src\/data\/trang\.yml/);
		assert.doesNotMatch(r.ra, /Trang chưa có/, 'trang nháp _nhap.md bị đòi bản ghi');
	} finally {
		fs.rmSync(tam, { recursive: true, force: true });
	}
});

test('trangChuaDangKy: mọi trang thật có bản ghi; thiếu thì báo đúng trang (cả trong thư mục "_"), bỏ qua 404 và file nháp "_"', () => {
	assert.deepEqual(trangChuaDangKy(), []);
	const tam = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-docs-'));
	try {
		fs.mkdirSync(path.join(tam, 'thi-nghiem/_nhap'), { recursive: true });
		for (const f of ['index.md', '404.md', 'thi-nghiem/asch.md', 'thi-nghiem/khong-co.md', 'thi-nghiem/_a.md', 'thi-nghiem/_nhap/b.md', 'thi-nghiem/c.mdx', 'thi-nghiem/d.markdown'])
			fs.writeFileSync(path.join(tam, f), '');
		assert.deepEqual(trangChuaDangKy(tam), ['thi-nghiem/_nhap/b', 'thi-nghiem/c', 'thi-nghiem/d', 'thi-nghiem/khong-co']);
	} finally {
		fs.rmSync(tam, { recursive: true, force: true });
	}
});

test('frontmatter không ghi thông tin thuộc trang.yml (mọi trường của trang.yml trừ id, cùng ma, loai, can_ra_soat)', () => {
	assert.deepEqual([...TRUONG_O_TRANG_YML].sort(), ['can_ra_soat', 'dua_tren', 'kiem_lai_truoc', 'linh_vuc', 'loai', 'ma', 'moi', 'tang']);
	for (const truong of TRUONG_O_TRANG_YML) {
		const kq = frontmatterRieng.safeParse({ [truong]: 'loi' });
		assert.equal(kq.success, false, `frontmatter có ${truong} mà không báo lỗi`);
		assert.match(kq.error.issues[0].message, /src\/data\/trang\.yml/);
	}
	assert.equal(frontmatterRieng.safeParse({}).success, true);
});

test('loaiTrang suy loại trang từ đường dẫn', () => {
	const mong = {
		index: 'trang',
		'kham-pha/index': 'trang',
		'kham-pha/tri-nho/vi-sao-ta-quen': 'kham-pha',
		'kham-pha/suc-khoe-tam-than/tram-cam': 'suc-khoe',
		'thi-nghiem/asch': 'thi-nghiem',
		'thi-nghiem/index': 'trang',
		'bang-chung/p-value': 'phuong-phap',
		'trai-nghiem/stroop': 'cong-cu',
		'bat-dau/doc-nhan-chac-chan': 'trang',
		'nen-tang/tri-nho': 'trang',
	};
	for (const [id, loai] of Object.entries(mong)) assert.equal(loaiTrang(id), loai, id);
});

test('trang.yml có mọi trang của site cũ (chỉ chạy khi có ../psyche-zero/)', { skip: !fs.existsSync(CU) && 'không có site cũ' }, () => {
	const ids = new Set(parse(fs.readFileSync(path.join(DATA, 'trang.yml'), 'utf8')).map((r) => r.id));
	const cu = fs
		.readdirSync(CU, { recursive: true })
		.map((f) => String(f).replace(/\\/g, '/'))
		.filter((f) => f.endsWith('.md'))
		.map((f) => f.slice(0, -3));
	assert.equal(cu.length, 106);
	assert.deepEqual(cu.filter((t) => !ids.has(t)), []);
});
