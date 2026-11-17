// Kiểm thử của lô D8-L4 (Sách in, Tờ tóm tắt, Thêm, dùng khi mất mạng), phần chạy trong Node: hàm thuần của hai trang
// đọc kho kết quả (Dữ liệu của tôi, Nhật ký: src/scripts/cong-cu/chung/loai.js, du-lieu-cua-toi.js, nhat-ky.js), cách đưa
// một bài vào Sách in và Tờ tóm tắt (src/plugins/thanh-phan.mjs), service worker (src/scripts/ngoai-tuyen/), và luật "chỉ
// thêm" của dòng cập nhật. Phần trên bản build: tests/sach.test.mjs; trên trình duyệt: tests/trinh-duyet/kiem-cong-cu.mjs,
// kiem-ngoai-tuyen.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parse } from 'yaml';
import * as L from '../src/scripts/cong-cu/chung/luu.js';
import { LOAI, nhanBanGhi, tenLoai, tomTatBanGhi, trangCuaQuiz } from '../src/scripts/cong-cu/chung/loai.js';
import { docSaoLuu, dongTheoLoai, tenFile } from '../src/scripts/cong-cu/du-lieu-cua-toi.js';
import { tenNgay, theoNgay } from '../src/scripts/cong-cu/nhat-ky.js';
import { baiTrongSach, toTomTat, yChinh } from '../src/plugins/thanh-phan.mjs';
import { SW_TU_GO, chuDangKy, chuSw, maBamBan } from '../src/scripts/ngoai-tuyen/tich-hop.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

// ---------- Dữ liệu của tôi, Nhật ký ----------

test('loại bản ghi: mọi kind của các công cụ đã chuyển có tên và trang; trang công cụ có trong trang.yml', () => {
	const trang = new Set(parse(fs.readFileSync(path.join(ROOT, 'src/data/trang.yml'), 'utf8')).map((r) => r.id));
	for (const f of fs.readdirSync(path.join(ROOT, 'src/scripts/cong-cu')).filter((f) => f.endsWith('.js')))
		for (const [, kind] of fs.readFileSync(path.join(ROOT, 'src/scripts/cong-cu', f), 'utf8').matchAll(/\bthem\('([a-z]+)'/g))
			assert.ok(LOAI[kind], `${f}: kind "${kind}" chưa có tên trong chung/loai.js`);
	for (const [k, { trang: t }] of Object.entries(LOAI)) if (t) assert.ok(trang.has(t), `${k}: trang ${t} không có trong trang.yml`);
	assert.equal(tenLoai('la'), 'la');
});

test('nhật ký: link chỉ tới trang có trong bản build; câu hỏi lấy tên bài, đọc được cả đường dẫn của site cũ', () => {
	const co = { 'trai-nghiem/stroop': 'Hiệu ứng Stroop', 'kham-pha/tri-nho/vi-sao-ta-quen': 'Vì sao ta quên?' };
	assert.deepEqual(nhanBanGhi({ kind: 'stroop' }, co), { ten: 'Hiệu ứng Stroop', trang: 'trai-nghiem/stroop' });
	assert.deepEqual(nhanBanGhi({ kind: 'linda' }, co), { ten: 'Bài toán Linda', trang: null });
	assert.equal(trangCuaQuiz('/psyche/kham-pha/tri-nho/vi-sao-ta-quen#quiz-0'), 'kham-pha/tri-nho/vi-sao-ta-quen');
	assert.equal(trangCuaQuiz('/psyche-zero/kham-pha/tri-nho/vi-sao-ta-quen/#quiz-1'), 'kham-pha/tri-nho/vi-sao-ta-quen');
	assert.equal(trangCuaQuiz('/khac/x'), null);
	assert.deepEqual(nhanBanGhi({ kind: 'quiz', quiz: '/psyche-zero/kham-pha/tri-nho/vi-sao-ta-quen/#quiz-0' }, co), {
		ten: 'Thử suy ngẫm: Vì sao ta quên?',
		trang: 'kham-pha/tri-nho/vi-sao-ta-quen',
	});
	assert.deepEqual(nhanBanGhi({ kind: 'quiz', quiz: '/psyche/khong-co#quiz-0' }, co), { ten: 'Thử suy ngẫm', trang: null });
});

test('nhật ký: tóm tắt từng loại chỉ nhắc con số, không diễn giải; Big Five không nêu điểm', () => {
	assert.equal(tomTatBanGhi({ kind: 'stroop', effect: 112.5, pct: 18.25 }), 'Hiệu ứng 113 ms (chậm hơn 18,3%)');
	assert.equal(tomTatBanGhi({ kind: 'digitspan', forward: 7, backward: 5 }), 'Nhớ xuôi 7, ngược 5 chữ số');
	assert.equal(tomTatBanGhi({ kind: 'quiz', score: 4, total: 5 }), 'Đúng 4/5 câu');
	assert.equal(tomTatBanGhi({ kind: 'changeblind', found: false }), 'Chưa tìm thấy chỗ đổi');
	assert.equal(tomTatBanGhi({ kind: 'stroop' }), 'Hiệu ứng — ms (chậm hơn —%)');
	assert.doesNotMatch(tomTatBanGhi({ kind: 'bigfive', scores: { N: 4.8 } }), /\d/);
	for (const k of Object.keys(LOAI)) assert.doesNotMatch(tomTatBanGhi({ kind: k }), /bình thường|bất thường|rối loạn|kém|giỏi|chẩn đoán/i);
});

test('nhật ký: nhóm theo ngày, mới nhất trước; tên ngày có thứ', () => {
	const t0 = new Date(2026, 10, 16, 9).getTime();
	const ds = [{ t: t0 }, { t: t0 + 3600e3 }, { t: t0 + 86400e3 }];
	const g = theoNgay(ds);
	assert.deepEqual(g.map((x) => [x.ngay, x.ds.length]), [['2026-11-17', 1], ['2026-11-16', 2]]);
	assert.equal(g[1].ds[0].t, t0 + 3600e3);
	assert.equal(tenNgay('2026-11-17'), 'Thứ Ba, 17/11/2026');
});

test('dữ liệu của tôi: đọc bản sao lưu (chỉ JSON có records), tên file, đếm theo loại', () => {
	assert.equal(docSaoLuu('không phải json'), null);
	assert.equal(docSaoLuu('{"a":1}'), null);
	const d = docSaoLuu(JSON.stringify({ v: 1, records: { a: { kind: 'stroop', t: 1 }, b: { kind: 1 } }, prefs: {} }));
	assert.deepEqual(Object.keys(d.records), ['a']);
	assert.equal(tenFile(new Date(2026, 10, 17).getTime()), 'psyche-zero-2026-11-17.json');
	assert.deepEqual(dongTheoLoai({ quiz: 1, stroop: 3 }), [['Hiệu ứng Stroop', 3], ['Thử suy ngẫm', 1]]);
	// gộp bản sao lưu: hợp theo id (chung/luu.js), gộp hai lần không nhân đôi
	const a = docSaoLuu(JSON.stringify({ records: { x: { kind: 'quiz', t: 5 } } }));
	assert.equal(Object.keys(L.gop(L.gop(d, a), a).records).length, 2);
});

// ---------- Sách in, Tờ tóm tắt ----------

test('bài trong Sách in: id có tiền tố, link #mục và aria theo, tiêu đề lùi hai bậc, vùng có tên kèm tên bài, công cụ thành link', () => {
	const html =
		'<div class="sl-heading-wrapper level-h2"><h2 id="nguon">Nguồn</h2><a class="sl-anchor-link" href="#nguon">#</a></div>' +
		'<p><a href="#nguon">xem</a> <a href="/psyche/x/#muc">khác</a></p>' +
		'<svg><defs><marker id="m"/></defs><path marker-end="url(#m)"/></svg><label for="o">o</label><input id="o">' +
		'<aside class="pz-nhan" aria-label="Vững chắc: ý">…</aside><div class="pz-bang" tabindex="0" role="region" aria-label="Bảng 1, cuộn ngang được"><table></table></div>' +
		'<div class="pz-quiz not-content" data-quiz="[1]"><ol></ol></div>' +
		'<div class="pz-cong-cu pz-stroop not-content" data-cong-cu="stroop" data-pagefind-ignore></div><h3>a</h3><h5>b</h5>';
	const ra = baiTrongSach(html, { tienTo: 'bai-x', ten: 'Bài "X"', diaChiBai: '/psyche/x/' });
	assert.match(ra, /<h4 id="bai-x--nguon">/);
	assert.match(ra, /level-h4/);
	assert.match(ra, /href="#bai-x--nguon"/);
	assert.match(ra, /href="\/psyche\/x\/#muc"/);
	assert.match(ra, /url\(#bai-x--m\)/);
	assert.match(ra, /for="bai-x--o"/);
	assert.match(ra, /<h5>a<\/h5><h6>b<\/h6>/);
	assert.match(ra, /aria-label="Vững chắc: ý \(bài: Bài &quot;X&quot;\)"/);
	assert.match(ra, /aria-label="Bảng 1, cuộn ngang được \(bài: Bài &quot;X&quot;\)"/);
	assert.doesNotMatch(ra, /data-quiz=|pz-cong-cu|class="pz-quiz /);
	assert.match(ra, /class="pz-quiz-sach not-content"/);
	assert.match(ra, /pz-sach__cong-cu">Công cụ tương tác: trải nghiệm ở <a href="\/psyche\/x\/">/);
});

test('Tờ tóm tắt: theo lĩnh vực, chỉ bài trong bản build, ý chính kèm nhãn; bài chưa khóa được đánh dấu', () => {
	const docs = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-ttt-'));
	fs.mkdirSync(path.join(docs, 'kham-pha/a'), { recursive: true });
	fs.writeFileSync(path.join(docs, 'kham-pha/a/x.md'), '---\ntitle: Bài X\ndescription: Mô tả X\n---\n\n:::vung-chac[quên nhanh lúc đầu]\nchữ\n:::\n\n:::tranh-cai[*nghiêng*]\n:::\n');
	fs.writeFileSync(path.join(docs, 'kham-pha/a/y.md'), '---\ntitle: Bài Y\n---\n\nchữ\n');
	const banGhi = [
		{ id: 'kham-pha/a/x', tang: 'loi', linh_vuc: 'a' },
		{ id: 'kham-pha/a/y', tang: 'mo-rong', linh_vuc: 'a' },
		{ id: 'kham-pha/a/z', tang: 'loi', linh_vuc: 'a' },
		{ id: 'kham-pha/b/w', tang: 'loi', linh_vuc: 'b' },
	];
	const linhVuc = [{ id: 'b', ten: 'Lĩnh vực B', thu_tu: 1, mau: 10 }, { id: 'a', ten: 'Lĩnh vực A', thu_tu: 2, mau: 20 }];
	const html = toTomTat({ banGhi, linhVuc, trangCo: ['kham-pha/a/x', 'kham-pha/a/y'], docsDir: docs, base: '/psyche/', ngayKhoa: (t) => (t === 'kham-pha/a/x' ? '2026-11-10' : null) });
	assert.match(html, /<h2 id="lv-a">Lĩnh vực A<\/h2>/);
	assert.doesNotMatch(html, /Lĩnh vực B/);
	assert.match(html, /<a href="\/psyche\/kham-pha\/a\/x\/">Bài X<\/a><\/p>/);
	assert.match(html, /pz-tag--vung-chac">Vững chắc<\/span> Quên nhanh lúc đầu/);
	assert.match(html, /<em>Nghiêng<\/em>/);
	assert.match(html, /Bài Y<\/a> <span class="pz-sach__chua">/);
	assert.match(html, /Còn 2 bài sắp có/);
	assert.deepEqual(yChinh(':::kha-vung[a]\n:::note[b]\n'), [{ ma: 'kha-vung', y: 'a' }]);
});

// ---------- Dùng khi mất mạng ----------

test('service worker: phiên bản theo nội dung bản build, đổi khi một file đổi; bỏ qua chính sw.js', () => {
	const d = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-sw-'));
	fs.mkdirSync(path.join(d, 'a'));
	fs.writeFileSync(path.join(d, 'index.html'), 'x');
	fs.writeFileSync(path.join(d, 'a/b.css'), 'y');
	const v1 = maBamBan(d);
	fs.writeFileSync(path.join(d, 'sw.js'), 'bất kỳ');
	assert.equal(maBamBan(d), v1);
	fs.writeFileSync(path.join(d, 'a/b.css'), 'z');
	assert.notEqual(maBamBan(d), v1);
	assert.match(v1, /^[0-9a-f]{16}$/);
});

test('service worker: chỉ cùng nguồn, trong phạm vi /psyche/, chỉ GET; không nạp gì từ nguồn ngoài; bản tự gỡ khi tắt', () => {
	const sw = chuSw('abc123', false);
	assert.match(sw, /const PHIEN_BAN = 'abc123';/);
	assert.doesNotMatch(sw, /__PHIEN_BAN__/);
	assert.match(sw, /url\.origin !== self\.location\.origin/);
	assert.match(sw, /startsWith\(PHAM_VI\)/);
	assert.match(sw, /req\.method !== 'GET'/);
	// deploy mới: sw.js đổi (phiên bản), bản mới nhận việc ngay và xóa mọi bộ nhớ đệm psyche- của phiên bản khác
	assert.match(sw, /self\.skipWaiting\(\)/);
	assert.match(sw, /k\.startsWith\(TIEN_TO\) && k !== KHO/);
	assert.match(sw, /self\.clients\.claim\(\)/);
	assert.doesNotMatch(sw, /https?:\/\//);
	assert.match(sw, /ho-tro\//, 'trang "Đang mất mạng" dẫn tới Hỗ trợ');
	assert.equal(chuSw('x', true), SW_TU_GO);
	assert.match(SW_TU_GO, /unregister\(\)/);
	const dk = chuDangKy('/psyche/', false);
	assert.match(dk, /var base = '\/psyche\/';/);
	assert.match(dk, /var tat = false;/);
	assert.match(dk, /prefs\['ngoai-tuyen'\]/);
	assert.doesNotMatch(dk, /^\s*\/\//m, 'bỏ chú thích khi chèn vào trang');
	assert.match(chuDangKy('/psyche/', true), /var tat = true;/);
});

// ---------- Dòng cập nhật: chỉ thêm ----------

/** Các mục của một trang dòng cập nhật: mỗi tiêu đề "## ngày/tháng/năm: …" tới trước tiêu đề "## " sau. */
function mucCapNhat(chu) {
	const than = chu.replace(/^---\n[\s\S]*?\n---\n/, '');
	const phan = than.split(/^(?=## )/m).slice(1);
	return phan.map((p) => ({ dau: p.split('\n')[0], chu: p.trimEnd() }));
}

const trangCapNhat = () =>
	parse(fs.readFileSync(path.join(ROOT, 'src/data/trang.yml'), 'utf8'))
		.filter((r) => r.tang === 'cap-nhat')
		.map((r) => r.id)
		.filter((t) => fs.existsSync(path.join(ROOT, `src/content/docs/${t}.md`)));

test('dòng cập nhật: mỗi mục mở bằng "## ngày/tháng/năm: …", mới nhất trước', () => {
	for (const t of trangCapNhat()) {
		const muc = mucCapNhat(fs.readFileSync(path.join(ROOT, `src/content/docs/${t}.md`), 'utf8'));
		assert.ok(muc.length, `${t}: chưa có mục nào`);
		const ngay = muc.map(({ dau }) => {
			const m = /^## (\d{1,2})\/(\d{1,2})\/(\d{4}): \S/.exec(dau);
			assert.ok(m, `${t}: tiêu đề "${dau}" phải là "## ngày/tháng/năm: tiêu đề"`);
			return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
		});
		for (let i = 1; i < ngay.length; i++) assert.ok(ngay[i - 1] >= ngay[i], `${t}: mục ${ngay[i]} đứng sau mục cũ hơn (mới nhất trước)`);
	}
});

test('dòng cập nhật: so với main, các mục đã có giữ nguyên (chỉ thêm mục mới)', (t) => {
	const git = (...ts) => execFileSync('git', ['-C', ROOT, ...ts], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
	const nen = ['main', 'origin/main'].find((b) => {
		try {
			return git('rev-parse', '--verify', '--quiet', `${b}^{commit}`);
		} catch {
			return false;
		}
	});
	if (!nen) return t.skip('không có main để so');
	for (const trang of trangCapNhat()) {
		let cu;
		try {
			cu = git('show', `${nen}:src/content/docs/${trang}.md`);
		} catch {
			continue; // trang chưa có ở main
		}
		const nay = new Set(mucCapNhat(fs.readFileSync(path.join(ROOT, `src/content/docs/${trang}.md`), 'utf8')).map((m) => m.chu));
		for (const m of mucCapNhat(cu)) assert.ok(nay.has(m.chu), `${trang}: mục "${m.dau}" ở main đã bị sửa hay bỏ (dòng cập nhật chỉ thêm; sai thì đính chính bằng mục mới)`);
	}
});
