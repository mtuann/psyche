// Kiểm thử phạm vi lô (D1.6; plans/lam-lai/README.md, mục Quy tắc chung): trên nhánh moi/d<đợt>-l<lô>, mọi file khác
// với main (kể cả file chưa commit) phải thuộc phạm vi của lô; trang khóa, đổi mã băm hay mở khóa trong
// kiem-dinh/khoa.json phải là trang của lô; khóa bản ghi đã có ở main không đổi, không bị gỡ (mở khóa đi nhánh mo/…).
// Trang của lô lấy từ plans/lam-lai/anh-xa.md. Nhánh khác thì bỏ qua. Chép từ ../opus/tests/pham-vi.test.mjs rồi sửa.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { docKhoa, maBamKhoaBanGhi, tachKhoaBanGhi } from '../src/khoa.mjs';
import { parse } from 'yaml';
import { trangCuaLo } from '../tools/khoa.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const git = (goc, ...ts) => execFileSync('git', ['-C', goc, ...ts], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

/**
 * Phạm vi chung của một lô (plans/lam-lai/README.md, Quy tắc chung): trang của lô; dữ liệu; thành phần, script, file
 * tĩnh, hình; hồ sơ (của trang trong lô, của bản ghi, và khoa.json); bổ sung có ngày; báo cáo của lô (cả ảnh chụp, danh
 * sách nhận định, kết quả lượt 2, mẫu kiểm). Lô làm thành phần thì đăng ký nó trong src/plugins/thanh-phan.mjs, thêm CSS
 * vào src/styles/thanh-phan.css và kiểm thử vào tests/, trừ hai kiểm thử canh cổng (khóa và phạm vi). Chỉ thị mới (sửa
 * src/plugins/psyche-markdown.mjs, nơi có phép chặn ô "chưa chuyển" ở trang đã khóa) chỉ ở lô được giao (THEM), như opus.
 */
const CHUNG = [
	/^src\/(data|components|scripts|hinh)\//,
	/^src\/content\/bo-sung\//,
	/^public\//,
	/^kiem-dinh\/(khoa\.json$|du-lieu\/)/,
	/^src\/plugins\/thanh-phan\.mjs$/,
	/^src\/styles\/thanh-phan\.css$/,
	/^tests\/(?!khoa\.test\.mjs$|pham-vi\.test\.mjs$)/,
];

/** Việc kế hoạch giao riêng cho một lô, ngoài phạm vi chung (plans/lam-lai/README.md, mục của đợt). */
const MD = 'src/plugins/psyche-markdown.mjs';
const THEM = {
	// trang chủ thật, 14 trang lĩnh vực sinh từ dữ liệu, chân trang trỏ tới Hỗ trợ mới, workflow nhắc kiểm Hỗ trợ mỗi quý;
	// tóm tắt đầu bài (chỉ thị mới)
	'D2-L1': ['astro.config.mjs', 'src/menu.mjs', 'src/styles/psyche.css', 'src/pages/', 'src/ban-build.mjs', '.github/workflows/ho-tro-quarterly.yml', MD],
	// hồ sơ nghiên cứu kinh điển ở trang nhà (chỉ thị mới)
	'D3-L1': [MD],
	// công cụ, trang Ngộ nhận và bài thử sinh từ thẻ
	'D8-L1': [MD],
	'D8-L2': [MD],
	'D8-L3': [MD, 'src/pages/'],
	// Sách in, Tờ tóm tắt sinh lúc build; dùng khi mất mạng
	'D8-L4': ['astro.config.mjs', 'src/pages/', 'src/ban-build.mjs', 'public/', MD],
};

/** Các lô của một đợt ("D3" -> ["D3-L1", "D3-L2"]) theo plans/lam-lai/anh-xa.md. */
const cacLoCuaDot = (dot, goc) =>
	[...fs.readFileSync(path.join(goc, 'plans/lam-lai/anh-xa.md'), 'utf8').matchAll(/^## (D\d+-L\d+) /gm)].map((x) => x[1]).filter((x) => x.startsWith(`${dot}-`));

/** File `file` (đường dẫn từ gốc repo) có thuộc phạm vi của lô `lo` ("D3-L1"), với các trang `trangLo`, không. */
function trongPhamVi(file, lo, trangLo) {
	if (CHUNG.some((re) => re.test(file))) return true;
	const them = lo.endsWith('-GOM') ? Object.entries(THEM).filter(([k]) => k.startsWith(lo.slice(0, -3))).flatMap(([, v]) => v) : (THEM[lo] ?? []);
	if (them.some((p) => (p.endsWith('/') ? file.startsWith(p) : file === p))) return true;
	// hồ sơ kiểm định của trang: chỉ của trang trong lô
	const hs = /^kiem-dinh\/(.+)\.yml$/.exec(file);
	if (hs) return trangLo.includes(hs[1]);
	// nhánh gom (D3-GOM): báo cáo của mọi lô trong đợt
	const bc = `plans/lam-lai/bao-cao/${lo.endsWith('-GOM') ? lo.toLowerCase().slice(0, -4) : lo.toLowerCase()}`;
	if (file.startsWith(bc) && /^[./-]/.test(file.slice(bc.length))) return true;
	const m = /^src\/content\/docs\/(.+)\.mdx?$/.exec(file);
	if (!m) return false;
	return trangLo.includes(m[1]);
}

/** Tên nhánh đang kiểm; trên GitHub Actions, pull request để HEAD tách rời nên lấy từ biến môi trường. */
function nhanhHienTai(goc) {
	let n = '';
	try {
		n = git(goc, 'rev-parse', '--abbrev-ref', 'HEAD');
	} catch {}
	return !n || n === 'HEAD' ? process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || '' : n;
}

/** Kiểm phạm vi của nhánh `nhanh` trong repo `goc`: null nếu không phải nhánh lô, không thì { lo, loi }. */
function kiemPhamVi(goc, nhanh) {
	const m = /^moi\/(d\d+-(?:l\d+|gom))$/i.exec(nhanh);
	if (!m) return null;
	const lo = m[1].toUpperCase();
	// nhánh gom của đợt (moi/d3-gom: lượt 2, review, khóa cả đợt): phạm vi là hợp các lô của đợt (review D1.6)
	const trangLo = lo.endsWith('-GOM') ? cacLoCuaDot(lo.slice(0, -4), goc).flatMap((x) => trangCuaLo(x, goc)) : trangCuaLo(lo, goc);
	const nen = ['main', 'origin/main'].find((b) => {
		try {
			return git(goc, 'rev-parse', '--verify', '--quiet', `${b}^{commit}`);
		} catch {
			return false;
		}
	});
	if (!nen) throw new Error('không thấy nhánh main hay origin/main để so (GitHub Actions: actions/checkout với fetch-depth: 0)');
	const chung = git(goc, 'merge-base', 'HEAD', nen);
	const file = new Set(
		[git(goc, 'diff', '--name-only', '--no-renames', chung), git(goc, 'ls-files', '--others', '--exclude-standard')].join('\n').split('\n').filter(Boolean),
	);
	const loi = [...file].sort().filter((f) => !trongPhamVi(f, lo, trangLo)).map((f) => `${f}: ngoài phạm vi của lô ${lo}`);
	let truoc = {};
	try {
		truoc = JSON.parse(git(goc, 'show', `${chung}:kiem-dinh/khoa.json`));
	} catch {}
	const nay = docKhoa(goc);
	const [tTruoc, tNay] = [truoc.trang ?? {}, nay.trang];
	for (const t of new Set([...Object.keys(tTruoc), ...Object.keys(tNay)]))
		if (tTruoc[t] !== tNay[t] && !trangLo.includes(t)) loi.push(`kiem-dinh/khoa.json: trang ${t} không thuộc lô ${lo} mà ${!tTruoc[t] ? 'được khóa' : !tNay[t] ? 'bị mở khóa' : 'đổi mã băm'}`);
	// bản ghi: khóa mới thì cho. Khóa đã có ở main không được đổi mã băm hay bị gỡ, trừ khóa từng phần được thay bằng khóa
	// rộng hơn của cùng bản ghi (cả bản ghi, hay nhiều trường hơn), khi các trường đã khóa vẫn y như cũ
	for (const [k, ma] of Object.entries(truoc.ban_ghi ?? {})) {
		if (nay.ban_ghi[k] === ma) continue;
		if (k in nay.ban_ghi) {
			loi.push(`kiem-dinh/khoa.json: bản ghi ${k} đã khóa ở main mà đổi mã băm`);
			continue;
		}
		const { banGhi, truong } = tachKhoaBanGhi(k);
		const thay = truong && Object.keys(nay.ban_ghi).some((x) => {
			const moi = tachKhoaBanGhi(x);
			return moi.banGhi === banGhi && (!moi.truong || truong.every((t) => moi.truong.includes(t)));
		});
		if (!thay) loi.push(`kiem-dinh/khoa.json: bản ghi ${k} đã khóa ở main mà bị gỡ`);
		else if (maBamKhoaBanGhi(k, goc) !== ma) loi.push(`kiem-dinh/khoa.json: bản ghi ${k} được thay bằng khóa rộng hơn mà trường đã khóa bị sửa`);
	}
	return { lo, loi };
}

test('anh-xa.md: đọc được trang của mọi lô, mỗi trang thuộc đúng một lô, đủ mọi trang của trang.yml', () => {
	const lo = [...fs.readFileSync(path.join(ROOT, 'plans/lam-lai/anh-xa.md'), 'utf8').matchAll(/^## (D\d+-L\d+) \((\d+) trang\)/gm)];
	assert.equal(lo.length, 17);
	const tatCa = [];
	for (const [, ma, so] of lo) {
		const trang = trangCuaLo(ma, ROOT);
		assert.equal(trang.length, Number(so), `${ma}: tiêu đề ghi ${so} trang mà bảng có ${trang.length}`);
		tatCa.push(...trang);
	}
	assert.equal(new Set(tatCa).size, tatCa.length);
	const trangYml = parse(fs.readFileSync(path.join(ROOT, 'src/data/trang.yml'), 'utf8')).map((r) => r.id);
	assert.deepEqual([...tatCa].sort(), [...trangYml].sort());
	assert.deepEqual(trangCuaLo('d3-l1', ROOT).slice(0, 2), ['thi-nghiem/index', 'thi-nghiem/milgram']);
});

test('phạm vi của một lô: trang của lô, thư mục chung, báo cáo của lô, phần giao riêng', () => {
	const trang = ['thi-nghiem/index', 'thi-nghiem/asch'];
	for (const f of [
		'src/content/docs/thi-nghiem/asch.md',
		'src/data/nguon.yml',
		'src/components/HoSo.astro',
		'src/scripts/cong-cu/linda.js',
		'src/hinh/asch-duong-thang.html',
		'src/content/bo-sung/thi-nghiem/asch/2027-03-15.md',
		'public/x.svg',
		'kiem-dinh/thi-nghiem/asch.yml',
		'kiem-dinh/khoa.json',
		'kiem-dinh/du-lieu/nguon/asch1956.yml',
		'src/plugins/thanh-phan.mjs',
		'src/plugins/psyche-markdown.mjs',
		'src/styles/thanh-phan.css',
		'tests/ho-so.test.mjs',
		'plans/lam-lai/bao-cao/d3-l1.md',
		'plans/lam-lai/bao-cao/d3-l1/asch-360.png',
		'plans/lam-lai/bao-cao/d3-l1-nhan-dinh.yml',
	])
		assert.ok(trongPhamVi(f, 'D3-L1', trang), `${f} phải thuộc phạm vi`);
	for (const f of [
		'src/content/docs/thi-nghiem/pavlov.md',
		'src/content/docs/index.md',
		'plans/lam-lai/bao-cao/d3-l10.md',
		'plans/lam-lai/README.md',
		'AGENTS.md',
		'astro.config.mjs',
		'package.json',
		'src/plugins/sap-co.mjs',
		'src/styles/psyche.css',
		'src/khoa.mjs',
		'src/menu.mjs',
		'tools/khoa.mjs',
		'tests/khoa.test.mjs',
		'tests/pham-vi.test.mjs',
		'kiem-dinh/index.yml',
		'kiem-dinh/thi-nghiem/pavlov.yml',
	])
		assert.ok(!trongPhamVi(f, 'D3-L1', trang), `${f} phải ngoài phạm vi`);
	assert.ok(trongPhamVi('astro.config.mjs', 'D2-L1', ['index']));
	assert.ok(trongPhamVi('src/content/docs/index.md', 'D2-L1', ['index']));
	assert.ok(trongPhamVi('src/pages/sach.astro', 'D8-L4', []));
	assert.ok(trongPhamVi('src/plugins/psyche-markdown.mjs', 'D3-L1', trang));
	assert.ok(!trongPhamVi('src/plugins/psyche-markdown.mjs', 'D3-L2', trang));
	// nhánh gom: báo cáo của mọi lô trong đợt, phần giao riêng của các lô ấy
	assert.ok(trongPhamVi('plans/lam-lai/bao-cao/d3-gom.md', 'D3-GOM', trang));
	assert.ok(trongPhamVi('plans/lam-lai/bao-cao/d3-l2-luot-2.yml', 'D3-GOM', trang));
	assert.ok(trongPhamVi('src/plugins/psyche-markdown.mjs', 'D3-GOM', trang));
	assert.ok(!trongPhamVi('plans/lam-lai/bao-cao/d4-l1.md', 'D3-GOM', trang));
	assert.deepEqual(cacLoCuaDot('D3', ROOT), ['D3-L1', 'D3-L2']);
});

test('nhánh lô trong repo thử: bắt file ngoài phạm vi (đã commit, chưa commit, file mới), hồ sơ và khóa trang của lô khác, khóa bản ghi bị đổi hay gỡ', () => {
	const goc = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-pham-vi-'));
	const g = (...ts) => execFileSync('git', ['-C', goc, '-c', 'user.name=thu', '-c', 'user.email=thu@example.com', ...ts], { stdio: 'ignore' });
	const ghi = (f, chu) => {
		fs.mkdirSync(path.dirname(path.join(goc, f)), { recursive: true });
		fs.writeFileSync(path.join(goc, f), chu);
	};
	try {
		g('init', '-q', '-b', 'main');
		ghi('plans/lam-lai/anh-xa.md', fs.readFileSync(path.join(ROOT, 'plans/lam-lai/anh-xa.md'), 'utf8'));
		ghi('src/content/docs/index.md', 'chủ\n');
		ghi('src/content/docs/thi-nghiem/pavlov.md', 'cũ\n');
		const DU_LIEU = (y, w) => `- id: u\n  ten: U\n- id: v\n  ten: V\n  loai: sach\n- id: w\n  ten: ${w}\n- id: x\n  ten: X\n- id: y\n  ten: ${y}\n- id: z\n  ten: Z\n`;
		ghi('src/data/nguon.yml', DU_LIEU('Y', 'W'));
		ghi('kiem-dinh/index.yml', 'trang: src/content/docs/index.md\n');
		const ma = (k) => maBamKhoaBanGhi(k, goc);
		const khoaBg = (...ks) => Object.fromEntries(ks.map((k) => [k, ma(k)]));
		ghi('kiem-dinh/khoa.json', JSON.stringify({ trang: { index: 'sha256:a' }, ban_ghi: khoaBg('nguon/u#ten', 'nguon/v#loai,ten', 'nguon/w#ten', 'nguon/x#ten', 'nguon/y#ten', 'nguon/z#ten') }));
		g('add', '-A');
		g('commit', '-q', '-m', 'nền');
		g('checkout', '-q', '-b', 'moi/d3-l1');
		ghi('src/content/docs/thi-nghiem/asch.md', 'mới\n');
		ghi('src/content/docs/thi-nghiem/pavlov.md', 'sửa\n');
		g('add', '-A');
		g('commit', '-q', '-m', 'lô');
		ghi('AGENTS.md', 'chưa commit\n');
		ghi('kiem-dinh/index.yml', 'trang: src/content/docs/index.md\nghi_chu: sửa lén\n');
		// u: khóa giữ nguyên (không báo); v: thu hẹp khóa (#loai,ten thành #ten); w: sửa trường đã khóa rồi thay bằng khóa
		// cả bản ghi; x: khóa cả bản ghi thay khóa từng phần, dữ liệu không đổi (được); y: sửa trường đã khóa rồi tính lại
		// mã băm bằng tay; z: gỡ khóa
		ghi('src/data/nguon.yml', DU_LIEU('Y2', 'W2'));
		ghi('kiem-dinh/khoa.json', JSON.stringify({ trang: { 'thi-nghiem/asch': 'sha256:b', 'thi-nghiem/pavlov': 'sha256:c' }, ban_ghi: khoaBg('nguon/u#ten', 'nguon/v#ten', 'nguon/w', 'nguon/x', 'nguon/y#ten') }));
		assert.equal(kiemPhamVi(goc, 'moi/d1-6-khoa'), null);
		assert.equal(kiemPhamVi(goc, 'main'), null);
		assert.deepEqual(kiemPhamVi(goc, 'moi/d3-l1'), {
			lo: 'D3-L1',
			loi: [
				'AGENTS.md: ngoài phạm vi của lô D3-L1',
				'kiem-dinh/index.yml: ngoài phạm vi của lô D3-L1',
				'src/content/docs/thi-nghiem/pavlov.md: ngoài phạm vi của lô D3-L1',
				'kiem-dinh/khoa.json: trang index không thuộc lô D3-L1 mà bị mở khóa',
				'kiem-dinh/khoa.json: trang thi-nghiem/pavlov không thuộc lô D3-L1 mà được khóa',
				'kiem-dinh/khoa.json: bản ghi nguon/v#loai,ten đã khóa ở main mà bị gỡ',
				'kiem-dinh/khoa.json: bản ghi nguon/w#ten được thay bằng khóa rộng hơn mà trường đã khóa bị sửa',
				'kiem-dinh/khoa.json: bản ghi nguon/y#ten đã khóa ở main mà đổi mã băm',
				'kiem-dinh/khoa.json: bản ghi nguon/z#ten đã khóa ở main mà bị gỡ',
			],
		});
	} finally {
		fs.rmSync(goc, { recursive: true, force: true });
	}
});

test('nhánh đang làm: chỉ chạm file trong phạm vi của lô (nhánh moi/d<đợt>-l<lô>; nhánh khác bỏ qua)', (t) => {
	const nhanh = nhanhHienTai(ROOT);
	const kq = kiemPhamVi(ROOT, nhanh);
	if (!kq) return t.skip(`nhánh ${nhanh || '(không rõ)'} không phải nhánh lô`);
	assert.deepEqual(kq.loi, [], `lô ${kq.lo} chạm chỗ ngoài phạm vi (plans/lam-lai/README.md, Quy tắc chung): việc khác thì ghi vào báo cáo`);
});
