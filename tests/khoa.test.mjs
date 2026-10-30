// Kiểm thử khóa (D1.6): mã băm (chuẩn hóa nguồn, JSON của bản ghi), mọi mục trong kiem-dinh/khoa.json còn khớp và có hồ sơ
// đủ, luật của hồ sơ (chuan-kiem-dinh.md mục 3, 6), công cụ tools/khoa.mjs (mẫu, khóa, tính, mở, xuất, nhập) trên một bản
// chép nhỏ, lọc trang theo bản build, và trên bản build: bản thật không có trang chưa khóa; trang chưa khóa (chỉ ở bản xem)
// có dải "Chưa kiểm định". Khung chép từ ../opus/tests/khoa.test.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parse, stringify } from 'yaml';
import { locTheoBan } from '../src/ban-build.mjs';
import { chuanHoaTrang, docKhoa, jsonChuan, kiemKhoa, maBamBanGhi, maBamTrang, maBamTrangFile } from '../src/khoa.mjs';
import { MAU_MO_RONG, lenh, loiHoSo } from '../tools/khoa.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');

test('mã băm của trang không đổi theo Unicode tổ hợp hay dựng sẵn, kiểu xuống dòng, khoảng trắng cuối dòng, dòng trống cuối file', () => {
	const goc = '---\ntitle: A\n---\n\nChữ.\n';
	assert.equal(chuanHoaTrang('---\r\ntitle: A  \r\n---\r\n\r\nChữ.\t\r\n\r\n\r\n'), goc);
	assert.equal(maBamTrang(goc), maBamTrang('---\ntitle: A\n---\n\nChữ.'));
	assert.equal(maBamTrang(goc), maBamTrang(goc.normalize('NFD')), 'NFC và NFD cùng mã băm');
	assert.notEqual(maBamTrang(goc), maBamTrang(goc.replace('Chữ.', 'Chữ!')));
	assert.match(maBamTrang(goc), /^sha256:[0-9a-f]{64}$/);
	assert.equal(maBamBanGhi({ id: 'x', ten: 'A' }), maBamBanGhi({ ten: 'A', id: 'x' }));
	assert.equal(jsonChuan({ b: 1, a: { d: [2, { y: 1, x: 2 }] } }), '{"a":{"d":[2,{"x":2,"y":1}]},"b":1}');
});

test('mã băm của trang gồm cả hình tĩnh ::hinh của trang: sửa hình là đổi mã băm; trang không hình thì như nguồn', () => {
	const goc = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-hinh-'));
	fs.mkdirSync(path.join(goc, 'src', 'hinh'), { recursive: true });
	const f = path.join(goc, 'trang.md');
	fs.writeFileSync(f, '---\ntitle: A\n---\n\n::hinh{ten="x"}\n');
	fs.writeFileSync(path.join(goc, 'src', 'hinh', 'x.html'), '<figure>65%</figure>\n');
	const truoc = maBamTrangFile(f, goc);
	assert.notEqual(truoc, maBamTrang(fs.readFileSync(f, 'utf8')));
	fs.writeFileSync(path.join(goc, 'src', 'hinh', 'x.html'), '<figure>79%</figure>\n');
	assert.notEqual(maBamTrangFile(f, goc), truoc, 'sửa số trong hình thì mã băm đổi');
	fs.writeFileSync(f, '---\ntitle: A\n---\n\nChữ.\n');
	assert.equal(maBamTrangFile(f, goc), maBamTrang('---\ntitle: A\n---\n\nChữ.\n'));
	fs.rmSync(goc, { recursive: true });
});

test('mọi mục trong kiem-dinh/khoa.json còn khớp mã băm và có hồ sơ đủ; trang 404 luôn khóa', () => {
	assert.deepEqual(kiemKhoa(), []);
	const { trang, ban_ghi } = docKhoa();
	assert.ok('404' in trang, 'trang 404 phải được khóa (D1.6)');
	for (const muc of [...Object.keys(trang), ...Object.keys(ban_ghi).map((k) => `du-lieu/${k}`)]) {
		const f = path.join(ROOT, 'kiem-dinh', `${muc.split('#')[0]}.yml`);
		assert.ok(fs.existsSync(f), `${muc}: thiếu hồ sơ kiem-dinh/${muc}.yml`);
		const hs = parse(fs.readFileSync(f, 'utf8'));
		assert.deepEqual(loiHoSo(hs, muc, ROOT), [], `hồ sơ của ${muc} chưa đủ`);
		if (!muc.startsWith('du-lieu/')) assert.equal(hs.lan.at(-1).ma_bam, trang[muc], `${muc}: lần cuối trong hồ sơ phải ghi mã băm đang khóa`);
	}
});

/** Bản chép nhỏ của repo trong thư mục tạm; `ghi(f, chữ)`, `chay(...tham số)`. */
function banChep() {
	const goc = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-khoa-'));
	const ghi = (f, chu) => {
		fs.mkdirSync(path.dirname(path.join(goc, f)), { recursive: true });
		fs.writeFileSync(path.join(goc, f), chu);
	};
	const chay = (...ts) => lenh([...ts, '--goc', goc], ROOT, () => {});
	return { goc, ghi, chay, xoa: () => fs.rmSync(goc, { recursive: true, force: true }) };
}

const NGUOI = { luot_1: 'agent A', luot_2: 'agent B', review: 'Claude', kiem_mau: 'chủ repo, 1/1' };
const nd = (them = {}) => ({ id: 'n1', cau: 'Câu.', loai: 'phat-hien', nguon: ['asch1956'], luot_2: 'dung', ket_qua: 'dung', ...them });
const hoSo = (muc, tang, nhanDinh, them = {}) => ({
	trang: `src/content/docs/${muc}.md`,
	tang,
	lan: [{ so: 1, ngay: null, nhanh: 'x', ma_bam: null, nguoi: NGUOI }],
	nguon: [{ id: 'asch1956' }],
	nhan_dinh: nhanDinh,
	...them,
});

test('luật của hồ sơ: loại, kết quả, nguồn, lượt 2, nhãn có cơ sở, thời sự có hạn, câu về chính site, tầng khớp trang.yml', () => {
	const { goc, ghi, xoa } = banChep();
	try {
		ghi('src/data/trang.yml', '- id: thi-nghiem/a\n  tang: loi\n  linh_vuc: tam-ly-xa-hoi\n');
		ghi('src/content/docs/thi-nghiem/a.md', '---\ntitle: A\n---\n\nChữ.\n');
		const loi = (ds, them) => loiHoSo(hoSo('thi-nghiem/a', 'loi', ds, them), 'thi-nghiem/a', goc);
		assert.deepEqual(loi([nd()]), []);
		assert.match(loi([nd({ loai: 'khac' })]).join(), /loai phải là/);
		assert.match(loi([nd({ ket_qua: 'khong-can-nguon' })]).join(), /ket_qua phải là dung, da-sua, da-lam-mem, da-bo/);
		assert.match(loi([nd({ luot_2: null })]).join(), /chưa có kết quả lượt 2/);
		assert.match(loi([nd({ nguon: ['khac2000'] })]).join(), /nguồn "khac2000" không có/);
		assert.match(loi([nd({ ket_qua: 'da-lam-mem' })]).join(), /da-lam-mem cần ghi_chu/);
		assert.match(loi([nd({ loai: 'nhan' })]).join(), /cần nhan.*cần co_so.*cần ly_do/);
		assert.deepEqual(loi([nd({ loai: 'nhan', nhan: 'kha-vung', co_so: ['bond1996'], ly_do: 'Phân tích tổng hợp.' })]), []);
		assert.match(loi([nd({ loai: 'thoi-su' })]).join(), /cần het_han/);
		assert.match(loi([nd({ loai: 've-site', luot_2: null })]).join(), /không ghi nguồn ngoài.*cần ghi_chu.*cần kết quả review/);
		assert.deepEqual(loi([nd({ loai: 've-site', luot_2: null, nguon: [], ghi_chu: 'Kiểm trên trang.', review: 'dung' })]), []);
		assert.match(loi([nd(), nd()]).join(), /n1: id trùng/);
		assert.match(loiHoSo(hoSo('thi-nghiem/a', 'mo-rong', [nd()]), 'thi-nghiem/a', goc).join(), /tang: mo-rong mà src\/data\/trang.yml ghi loi/);
		assert.match(loi([]).join(), /chưa có nhận định nào/);
		// trang còn ô "chưa chuyển", hay có khoảng trắng cuối dòng
		ghi('src/content/docs/thi-nghiem/a.md', '---\ntitle: A\n---\n\n::cong-cu{ten="linda"}\n\n::hinh{ten="khong-co"}\n\nChữ. \n');
		const l = loi([nd()]).join('\n');
		assert.match(l, /::cong-cu\{ten="linda"\} chưa có/);
		assert.match(l, /::hinh\{ten="khong-co"\} chưa có/);
		assert.match(l, /khoảng trắng cuối dòng/);
	} finally {
		xoa();
	}
});

test('luật của hồ sơ: trang Sức khỏe tâm thần cần chữ ký chuyên gia; bài mở rộng cần dua_tren, hạn xem lại, lượt 2 kiểm mẫu', () => {
	const { goc, ghi, xoa } = banChep();
	try {
		ghi(
			'src/data/trang.yml',
			'- id: kham-pha/suc-khoe-tam-than/tram-cam\n  tang: loi\n  linh_vuc: suc-khoe-tam-than\n- id: kham-pha/tri-nho/phong-cach-hoc\n  tang: mo-rong\n  linh_vuc: tri-nho\n',
		);
		const sk = 'kham-pha/suc-khoe-tam-than/tram-cam';
		ghi(`src/content/docs/${sk}.md`, '---\ntitle: A\n---\n\nChữ.\n');
		assert.match(loiHoSo(hoSo(sk, 'loi', [nd()]), sk, goc).join(), /chỉ khóa khi chuyên gia đã đọc/);
		const co = hoSo(sk, 'loi', [nd()]);
		co.lan[0].nguoi = { ...NGUOI, chuyen_gia: 'BS. X, 2027-01-05' };
		assert.deepEqual(loiHoSo(co, sk, goc), []);

		const mr = 'kham-pha/tri-nho/phong-cach-hoc';
		ghi(`src/content/docs/${mr}.md`, '---\ntitle: A\n---\n\nChữ.\n');
		const nhieu = Array.from({ length: 12 }, (_, i) => nd({ id: `n${i}`, luot_2: null }));
		const l = loiHoSo(hoSo(mr, 'mo-rong', nhieu), mr, goc).join('\n');
		assert.match(l, /chưa có dua_tren/);
		assert.match(l, /chưa có kiem_lai_truoc/);
		assert.match(l, new RegExp(`kiểm mẫu ít nhất ${MAU_MO_RONG} nhận định \\(mới có 0\\)`));
		ghi('src/data/trang.yml', `- id: ${mr}\n  tang: mo-rong\n  linh_vuc: tri-nho\n  dua_tren: [kham-pha/tri-nho/vi-sao-ta-quen]\n  kiem_lai_truoc: 2028-01\n`);
		nhieu.slice(0, MAU_MO_RONG).forEach((n) => (n.luot_2 = 'dung'));
		assert.deepEqual(loiHoSo(hoSo(mr, 'mo-rong', nhieu), mr, goc), []);
		// mẫu có câu sai thì lượt 2 kiểm cả trang; nhận định loại nhan, lam-sang luôn qua lượt 2
		nhieu[0].luot_2 = 'sai';
		nhieu[0].ghi_chu = 'đã giải quyết';
		assert.match(loiHoSo(hoSo(mr, 'mo-rong', nhieu), mr, goc).join(), /phải kiểm cả trang \(mới có 8\/12\)/);
		const ls = [...nhieu.slice(1, MAU_MO_RONG), nd({ id: 'ls', loai: 'lam-sang', luot_2: null })];
		assert.match(loiHoSo(hoSo(mr, 'mo-rong', ls), mr, goc).join(), /nhận định ls: chưa có kết quả lượt 2/);
	} finally {
		xoa();
	}
});

test('công cụ khóa trên bản chép nhỏ: mẫu, khóa (đòi hồ sơ đủ), tính, mở khóa (ghi lý do, thêm lần mới), khóa lại, xuất, nhập', () => {
	const { goc, ghi, chay, xoa } = banChep();
	try {
		ghi('src/content/docs/thi-nghiem/a.md', '---\ntitle: A\n---\n\nChữ.\n');
		ghi('src/data/trang.yml', '- id: thi-nghiem/a\n  tang: loi\n  linh_vuc: tam-ly-xa-hoi\n');
		ghi('src/data/nguon.yml', '- id: asch1956\n  loai: bai-bao\n  tac_gia: Asch, S. E.\n  nam: 1956\n  ten: Studies\n');
		ghi('plans/lam-lai/anh-xa.md', '## D9-L1 (1 trang)\n\n| Trang | Tầng |\n|---|---|\n| `thi-nghiem/a` | loi |\n\n## D9-L2 (0 trang)\n');
		const f = path.join(goc, 'kiem-dinh/thi-nghiem/a.yml');
		const doc = () => parse(fs.readFileSync(f, 'utf8'));
		const ghiHs = (hs) => fs.writeFileSync(f, stringify(hs));

		chay('mau', 'thi-nghiem/a');
		assert.equal(doc().tang, 'loi');
		assert.equal(doc().muc, 'V3');
		assert.throws(() => chay('mau', 'thi-nghiem/a'), /đã có/);
		assert.throws(() => chay('khoa', 'thi-nghiem/a'), /hồ sơ chưa đủ để khóa:[\s\S]*thiếu nguoi.luot_1[\s\S]*chưa có nhận định/);
		ghiHs({ ...doc(), lan: [{ ...doc().lan[0], nguoi: NGUOI }], nguon: [{ id: 'asch1956' }], nhan_dinh: [nd({ luot_2: null })] });

		// xuất danh sách cho lượt 2 (theo lô), nhập kết quả
		chay('xuat', 'D9-L1', '--ra', 'ra.yml');
		const xuat = parse(fs.readFileSync(path.join(goc, 'ra.yml'), 'utf8'));
		assert.deepEqual(xuat, [{ trang: 'thi-nghiem/a', id: 'n1', cau: 'Câu.', loai: 'phat-hien' }]);
		ghi('luot2.yml', stringify([{ trang: 'thi-nghiem/a', id: 'n1', luot_2: 'dung', nguon: ['https://doi.org/10.1037/h0093718'] }]));
		chay('nhap', 'luot2.yml');
		assert.equal(doc().nhan_dinh[0].luot_2, 'dung');
		assert.deepEqual(doc().nhan_dinh[0].luot_2_nguon, ['https://doi.org/10.1037/h0093718']);
		ghi('sai.yml', stringify([{ trang: 'thi-nghiem/a', id: 'n9', luot_2: 'dung', nguon: ['x'] }]));
		assert.throws(() => chay('nhap', 'sai.yml'), /hồ sơ không có nhận định n9/);

		chay('khoa', 'thi-nghiem/a');
		const khoa = parse(fs.readFileSync(path.join(goc, 'kiem-dinh/khoa.json'), 'utf8'));
		assert.match(khoa.trang['thi-nghiem/a'], /^sha256:/);
		assert.equal(doc().lan[0].ma_bam, khoa.trang['thi-nghiem/a']);
		assert.match(String(doc().lan[0].ngay), /^\d{4}-\d{2}-\d{2}$/);
		assert.deepEqual(kiemKhoa(goc), []);
		assert.equal(chay('tinh'), 0);
		assert.throws(() => chay('khoa', 'thi-nghiem/a'), /đã khóa/);

		// sửa trang đã khóa: build hỏng (kiemKhoa), tinh báo LỆCH
		ghi('src/content/docs/thi-nghiem/a.md', '---\ntitle: A\n---\n\nChữ khác.\n');
		assert.match(kiemKhoa(goc).join(), /trang thi-nghiem\/a đã khóa mà nội dung đã đổi[\s\S]*tools\/khoa.mjs mo thi-nghiem\/a/);
		assert.equal(chay('tinh'), 1);

		// mở khóa: ghi lý do, gỡ khỏi khoa.json, thêm lần mới; khóa lại
		assert.throws(() => chay('mo', 'thi-nghiem/a'), /cần mục và --ly-do/);
		chay('mo', 'thi-nghiem/a', '--ly-do', 'lỗi được báo');
		assert.equal(docKhoa(goc).trang['thi-nghiem/a'], undefined);
		assert.equal(doc().mo_khoa[0].ly_do, 'lỗi được báo');
		assert.equal(doc().lan.length, 2);
		assert.throws(() => chay('khoa', 'thi-nghiem/a'), /thiếu nguoi.luot_1/);
		ghiHs({ ...doc(), lan: [doc().lan[0], { ...doc().lan[1], nguoi: NGUOI }] });
		chay('khoa', 'thi-nghiem/a');
		assert.deepEqual(kiemKhoa(goc), []);
	} finally {
		xoa();
	}
});

test('khóa bản ghi dữ liệu, cả bản ghi hay từng trường; sửa trường đã khóa thì lệch', () => {
	const { goc, ghi, chay, xoa } = banChep();
	try {
		ghi('src/data/trang.yml', '- id: index\n  tang: khung\n');
		ghi('src/data/nguon.yml', '- id: asch1956\n  loai: bai-bao\n  tac_gia: Asch, S. E.\n  nam: 1956\n  ten: Studies\n');
		const muc = 'du-lieu/nguon/asch1956#nam,tac_gia';
		chay('mau', muc);
		const f = path.join(goc, 'kiem-dinh/du-lieu/nguon/asch1956.yml');
		const hs = parse(fs.readFileSync(f, 'utf8'));
		fs.writeFileSync(f, stringify({ ...hs, lan: [{ ...hs.lan[0], nguoi: NGUOI }], nguon: [{ id: 'asch1956' }], nhan_dinh: [nd({ truong: ['nam', 'tac_gia'] })] }));
		chay('khoa', muc);
		assert.ok(docKhoa(goc).ban_ghi['nguon/asch1956#nam,tac_gia']);
		assert.deepEqual(kiemKhoa(goc), []);
		// trường chưa khóa đổi thì không sao; trường đã khóa đổi thì lệch
		ghi('src/data/nguon.yml', '- id: asch1956\n  loai: bai-bao\n  tac_gia: Asch, S. E.\n  nam: 1956\n  ten: Studies of independence\n');
		assert.deepEqual(kiemKhoa(goc), []);
		ghi('src/data/nguon.yml', '- id: asch1956\n  loai: bai-bao\n  tac_gia: Asch, S.\n  nam: 1956\n  ten: Studies\n');
		assert.match(kiemKhoa(goc).join(), /bản ghi nguon\/asch1956#nam,tac_gia đã khóa mà đã đổi/);
		// khóa từng phần cũ đã lệch thì không khóa thêm che đi; khóa cả bản ghi rồi thì không khóa đè
		assert.throws(() => chay('khoa', 'du-lieu/nguon/asch1956#ten'), /đã lệch/);
		ghi('src/data/nguon.yml', '- id: asch1956\n  loai: bai-bao\n  tac_gia: Asch, S. E.\n  nam: 1956\n  ten: Studies\n');
		chay('mau', 'du-lieu/nguon/asch1956');
		const hs2 = parse(fs.readFileSync(f, 'utf8'));
		hs2.lan.at(-1).nguoi = NGUOI;
		fs.writeFileSync(f, stringify(hs2));
		chay('khoa', 'du-lieu/nguon/asch1956');
		assert.ok(docKhoa(goc).ban_ghi['nguon/asch1956'] && !docKhoa(goc).ban_ghi['nguon/asch1956#nam,tac_gia'], 'khóa cả bản ghi thay khóa từng phần');
		assert.throws(() => chay('khoa', 'du-lieu/nguon/asch1956#ten'), /đã khóa cả bản ghi/);
	} finally {
		xoa();
	}
});

test('lọc trang theo bản build: bản thật bỏ trang chưa khóa khỏi bộ docs, bản xem giữ hết', async () => {
	const muc = (t) => ({ filePath: `src/content/docs/${t}.md` });
	const lam = async (banXem) => {
		const store = new Map([
			['404', muc('404')],
			['thu-chua-khoa', muc('thi-nghiem/khong-co-trong-khoa')],
		]);
		const ctx = { store: { entries: () => [...store.entries()], delete: (k) => store.delete(k) } };
		const cu = process.env.PSYCHE_BAN;
		if (banXem) process.env.PSYCHE_BAN = 'xem';
		else delete process.env.PSYCHE_BAN;
		try {
			await locTheoBan({ name: 'thu', load: async () => {} }).load(ctx);
		} finally {
			if (cu === undefined) delete process.env.PSYCHE_BAN;
			else process.env.PSYCHE_BAN = cu;
		}
		return [...store.keys()];
	};
	assert.deepEqual(await lam(false), ['404']);
	assert.deepEqual(await lam(true), ['404', 'thu-chua-khoa']);
});

test('bản build: trang chưa khóa có dải "Chưa kiểm định" (chỉ ở bản xem); bản thật không có trang chưa khóa', () => {
	if (!fs.existsSync(path.join(DIST, 'index.html'))) throw new Error('Chưa có dist/: chạy npm run build trước npm test');
	const khoa = docKhoa().trang;
	const trang = fs
		.readdirSync(DIST, { recursive: true })
		.map((f) => String(f).replace(/\\/g, '/'))
		.filter((f) => f.endsWith('index.html') && !f.startsWith('pagefind/'))
		.map((f) => f.replace(/\/?index\.html$/, ''));
	const banXem = trang.some((t) => {
		const html = fs.readFileSync(path.join(DIST, t, 'index.html'), 'utf8');
		return html.includes('class="pz-chua-kiem-dinh"');
	});
	for (const t of trang) {
		const id = [t || 'index', `${t}/index`].find((x) => fs.existsSync(path.join(ROOT, 'src/content/docs', `${x}.md`)));
		if (!id) continue;
		const html = fs.readFileSync(path.join(DIST, t, 'index.html'), 'utf8');
		const coDai = html.includes('class="pz-chua-kiem-dinh"');
		if (id in khoa) assert.ok(!coDai, `${id}: đã khóa mà có dải "Chưa kiểm định"`);
		else assert.ok(coDai, `${id}: chưa khóa mà ${banXem ? 'thiếu dải "Chưa kiểm định"' : 'có trong bản build (bản thật chỉ có trang đã khóa)'}`);
	}
	assert.doesNotMatch(fs.readFileSync(path.join(DIST, '404.html'), 'utf8'), /pz-chua-kiem-dinh/);
});

test('review D1.6: qua-manh là kết quả lượt 2; câu về chính site review sai; tới hạn; lõi không có nhận định; Sức khỏe tâm thần mọi tầng', () => {
	const { goc, ghi, xoa } = banChep();
	try {
		ghi('src/data/trang.yml', '- id: thi-nghiem/a\n  tang: loi\n  linh_vuc: tam-ly-xa-hoi\n- id: kham-pha/suc-khoe-tam-than/b\n  tang: mo-rong\n  linh_vuc: suc-khoe-tam-than\n  dua_tren: [thi-nghiem/a]\n  kiem_lai_truoc: 2028-01\n- id: ho-tro/index\n  tang: co-han\n  linh_vuc: suc-khoe-tam-than\n');
		ghi('src/content/docs/ho-tro/index.md', '---\ntitle: H\n---\n\nChữ.\n');
		// trang Hỗ trợ cùng lĩnh vực nhưng không phải bài Sức khỏe tâm thần: không cần chữ ký chuyên gia
		assert.deepEqual(loiHoSo(hoSo('ho-tro/index', 'co-han', [nd()]), 'ho-tro/index', goc), []);
		ghi('src/content/docs/thi-nghiem/a.md', '---\ntitle: A\n---\n\nChữ.\n');
		ghi('src/content/docs/kham-pha/suc-khoe-tam-than/b.md', '---\ntitle: B\n---\n\nChữ.\n');
		const loi = (ds, them) => loiHoSo(hoSo('thi-nghiem/a', 'loi', ds, them), 'thi-nghiem/a', goc).join('\n');
		assert.equal(loi([nd({ luot_2: 'qua-manh', ket_qua: 'da-lam-mem', ghi_chu: 'viết lại' })]), '');
		assert.match(loi([nd({ luot_2: 'qua-manh' })]), /lượt 2 cho "qua-manh" mà kết quả "dung": ghi_chu/);
		assert.match(loi([nd({ loai: 've-site', luot_2: null, nguon: [], ghi_chu: 'x', review: 'sai' })]), /review ghi sai mà kết quả dung/);
		// tới hạn: chặn lúc khóa, không chặn mục đã khóa (máy canh báo)
		assert.match(loiHoSo(hoSo('thi-nghiem/a', 'loi', [nd({ loai: 'thoi-su', het_han: '2020-01-01' })]), 'thi-nghiem/a', goc, { khiKhoa: true }).join(), /đã tới hạn/);
		assert.equal(loi([nd({ loai: 'thoi-su', het_han: '2020-01-01' })]), '');
		assert.equal(loi([nd({ loai: 'thoi-su', het_han: '2099-01-01' })]), '');
		// trang lõi không được khóa với 0 nhận định, kể cả khi có ghi_chu
		assert.match(loi([], { ghi_chu: 'không có gì' }), /trang tầng loi cần ít nhất một nhận định/);
		const mr = 'kham-pha/suc-khoe-tam-than/b';
		const nhieu = Array.from({ length: 3 }, (_, i) => nd({ id: `n${i}` }));
		assert.match(loiHoSo(hoSo(mr, 'mo-rong', nhieu), mr, goc).join(), /chỉ khóa khi chuyên gia đã đọc/);
		// mẫu lượt 2 của bài mở rộng: một câu qua-manh thì phải kiểm cả trang
		const mau = Array.from({ length: 12 }, (_, i) => nd({ id: `m${i}`, luot_2: i < 8 ? 'dung' : null }));
		mau[0].luot_2 = 'qua-manh';
		mau[0].ket_qua = 'da-lam-mem';
		mau[0].ghi_chu = 'x';
		const co = hoSo(mr, 'mo-rong', mau);
		co.lan[0].nguoi = { ...NGUOI, chuyen_gia: 'BS. X, 2027-01-05' };
		assert.match(loiHoSo(co, mr, goc).join(), /phải kiểm cả trang \(mới có 8\/12\)/);
	} finally {
		xoa();
	}
});

test('review D1.6: xuất mẫu bài mở rộng, nhập (đòi nguồn, cau_dung; không ghi vào hồ sơ đã khóa), mở khóa khi không có hồ sơ, khóa đè', () => {
	const { goc, ghi, chay, xoa } = banChep();
	try {
		ghi('src/data/trang.yml', '- id: kham-pha/tri-nho/m\n  tang: mo-rong\n  linh_vuc: tri-nho\n  dua_tren: [kham-pha/tri-nho/l]\n  kiem_lai_truoc: 2028-01\n- id: kham-pha/tri-nho/l\n  tang: loi\n  linh_vuc: tri-nho\n');
		ghi('src/data/nguon.yml', '- id: asch1956\n  loai: bai-bao\n  tac_gia: Asch, S. E.\n  nam: 1956\n  ten: Studies\n');
		ghi('src/content/docs/kham-pha/tri-nho/m.md', '---\ntitle: M\n---\n\nChữ.\n');
		ghi('src/content/docs/kham-pha/tri-nho/l.md', '---\ntitle: L\n---\n\nChữ.\n');
		const f = (t) => path.join(goc, `kiem-dinh/kham-pha/tri-nho/${t}.yml`);
		const ghiHs = (t, hs) => fs.writeFileSync(f(t), stringify(hs));
		chay('mau', 'kham-pha/tri-nho/m', 'kham-pha/tri-nho/l');
		const nhieu = [...Array.from({ length: 12 }, (_, i) => nd({ id: `n${i}`, luot_2: null })), nd({ id: 'nh', loai: 'nhan', nhan: 'kha-vung', co_so: ['x'], ly_do: 'y', luot_2: null })];
		ghiHs('m', hoSo('kham-pha/tri-nho/m', 'mo-rong', nhieu));
		chay('xuat', 'kham-pha/tri-nho/m', '--ra', 'x.yml');
		const ds = parse(fs.readFileSync(path.join(goc, 'x.yml'), 'utf8'));
		assert.equal(ds.length, MAU_MO_RONG + 1, 'mẫu 8 nhận định cộng mọi nhận định loại nhan');
		assert.ok(ds.some((d) => d.id === 'nh'));
		ghi('a.yml', stringify([{ trang: 'kham-pha/tri-nho/m', id: 'n0', luot_2: 'dung' }]));
		assert.throws(() => chay('nhap', 'a.yml'), /dung cần nguon/);
		ghi('b.yml', stringify([{ trang: 'kham-pha/tri-nho/m', id: 'n0', luot_2: 'qua-manh', nguon: ['https://x.org/'] }]));
		assert.throws(() => chay('nhap', 'b.yml'), /qua-manh cần cau_dung/);
		ghi('c.yml', stringify([{ trang: 'kham-pha/tri-nho/m', id: 'n0', luot_2: 'qua-manh', nguon: ['https://x.org/'], cau_dung: 'Câu nhẹ hơn.' }]));
		chay('nhap', 'c.yml');
		assert.equal(parse(fs.readFileSync(f('m'), 'utf8')).nhan_dinh[0].luot_2, 'qua-manh');
		// hồ sơ đã khóa: không nhập vào; không khóa đè; mở khóa khi không có hồ sơ thì từ chối
		ghiHs('l', hoSo('kham-pha/tri-nho/l', 'loi', [nd()]));
		chay('khoa', 'kham-pha/tri-nho/l');
		ghi('d.yml', stringify([{ trang: 'kham-pha/tri-nho/l', id: 'n1', luot_2: 'dung', nguon: ['https://x.org/'] }]));
		assert.throws(() => chay('nhap', 'd.yml'), /đã khóa/);
		assert.throws(() => chay('khoa', 'kham-pha/tri-nho/l'), /đã khóa/);
		fs.rmSync(f('l'));
		assert.throws(() => chay('mo', 'kham-pha/tri-nho/l', '--ly-do', 'thử'), /không có hồ sơ/);
	} finally {
		xoa();
	}
});

test('chiTrangTrongBan: ở bản thật, trang chưa khóa không qua plugin của dự án (lỗi của nó không làm hỏng bản đăng); bản xem thì qua', async () => {
	const { chiTrangTrongBan } = await import('../src/ban-build.mjs');
	const docs = path.join(ROOT, 'src/content/docs');
	const plugin = () => ({ name: 'that' });
	const lay = (ban, trang) => {
		const cu = process.env.PSYCHE_BAN;
		if (ban === 'xem') process.env.PSYCHE_BAN = 'xem';
		else delete process.env.PSYCHE_BAN;
		try {
			return chiTrangTrongBan(plugin, docs)({ fileURL: new URL(`file://${path.join(docs, trang)}.md`) }).name;
		} finally {
			if (cu === undefined) delete process.env.PSYCHE_BAN;
			else process.env.PSYCHE_BAN = cu;
		}
	};
	assert.equal(lay('that', 'thi-nghiem/khong-khoa'), 'psyche-bo-qua-trang-chua-khoa');
	assert.equal(lay('that', '404'), 'that', 'trang đã khóa (404 luôn khóa) vẫn qua plugin');
	assert.equal(lay('xem', 'thi-nghiem/khong-khoa'), 'that');
	assert.equal(chiTrangTrongBan(plugin, docs)({}).name, 'that', 'không có đường dẫn (gọi thẳng Sätteri): qua plugin');
});

test('dauVet đổi khi danh sách trang, bản build hay dữ liệu đổi (để trang dựng lại: link "sắp có" tự thành link)', async () => {
	const { dauVet, dungLaiKhiDoi, tepDauVet } = await import('../src/ban-build.mjs');
	const goc = dauVet();
	assert.match(goc, /^[0-9a-f]{64}$/);
	assert.ok(tepDauVet().includes('src/data/trang.yml') && tepDauVet().includes('kiem-dinh/khoa.json'));
	const cu = process.env.PSYCHE_BAN;
	process.env.PSYCHE_BAN = cu === 'xem' ? 'that' : 'xem';
	try {
		assert.notEqual(dauVet(), goc, 'đổi bản build thì dấu vết đổi');
	} finally {
		if (cu === undefined) delete process.env.PSYCHE_BAN;
		else process.env.PSYCHE_BAN = cu;
	}
	// thêm một trang vào bản build thì dấu vết đổi
	assert.notEqual(dauVet(undefined, ['index', 'thi-nghiem/asch']), dauVet(undefined, ['index']));
	assert.equal(dauVet(), goc);
	// dấu vết khác lần trước thì xóa bộ nhớ đệm của trang
	let xoa = 0;
	const meta = new Map([['psyche-dau-vet', 'cu']]);
	await dungLaiKhiDoi({ load: async () => {} }).load({ meta, store: { clear: () => xoa++ } });
	assert.equal(xoa, 1);
	await dungLaiKhiDoi({ load: async () => {} }).load({ meta, store: { clear: () => xoa++ } });
	assert.equal(xoa, 1, 'dấu vết như cũ thì giữ bộ nhớ đệm');
});

test('bản ghi dữ liệu: câu về chính site chỉ ở cấu trúc của site (trang, lĩnh vực, trang nhà của nghiên cứu)', () => {
	const vs = (truong) => ({ id: 'n1', cau: 'Câu.', loai: 've-site', truong, ghi_chu: 'đối chiếu anh-xa.md', review: 'dung', ket_qua: 'dung' });
	const hs = (bg, ds) => ({ ban_ghi: bg, lan: [{ so: 1, ngay: null, nhanh: 'x', ma_bam: null, nguoi: NGUOI }], nguon: [], nhan_dinh: ds });
	assert.deepEqual(loiHoSo(hs('trang/thi-nghiem/asch', [vs(['tang', 'linh_vuc'])]), 'du-lieu/trang/thi-nghiem/asch', ROOT), []);
	assert.deepEqual(loiHoSo(hs('linh-vuc/tri-nho', [vs(['ten', 'thu_tu'])]), 'du-lieu/linh-vuc/tri-nho', ROOT), []);
	assert.match(loiHoSo(hs('linh-vuc/tri-nho', [vs(['mo_ta'])]), 'du-lieu/linh-vuc/tri-nho', ROOT).join(), /không có câu về chính site/);
	assert.deepEqual(loiHoSo(hs('nghien-cuu/asch1956', [vs(['trang_nha'])]), 'du-lieu/nghien-cuu/asch1956', ROOT), []);
	assert.match(loiHoSo(hs('nghien-cuu/asch1956', [vs(['nguon'])]), 'du-lieu/nghien-cuu/asch1956', ROOT).join(), /không có câu về chính site/);
	assert.match(loiHoSo(hs('nguon/asch1956', [vs(['ten'])]), 'du-lieu/nguon/asch1956', ROOT).join(), /không có câu về chính site/);
});

test('khóa từng phần bản ghi: nhận định về trường chưa khóa được để chưa có kết quả', () => {
	const hs = {
		ban_ghi: 'nguon/asch1951',
		lan: [{ so: 1, ngay: null, nhanh: 'x', ma_bam: null, nguoi: NGUOI }],
		nguon: [{ id: 'asch1956' }],
		nhan_dinh: [nd({ id: 'n1', truong: ['tac_gia'] }), nd({ id: 'n4', truong: ['noi_dang'], ket_qua: null, luot_2: 'khong-chac' })],
	};
	assert.deepEqual(loiHoSo(hs, 'du-lieu/nguon/asch1951#tac_gia', ROOT), []);
	assert.match(loiHoSo(hs, 'du-lieu/nguon/asch1951#noi_dang,tac_gia', ROOT).join(), /n4: ket_qua phải là/);
	assert.match(loiHoSo(hs, 'du-lieu/nguon/asch1951', ROOT).join(), /n4: ket_qua phải là/);
});
