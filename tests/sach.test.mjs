// Kiểm thử trên bản build (dist/) của lô D8-L4: Sách in và Tờ tóm tắt sinh lúc build chỉ từ bài có trong bản build (bản
// thật: đã khóa; bản xem: bài chưa khóa được đánh dấu), id không trùng, công cụ đã thay bằng link; dùng khi mất mạng có
// sw.js đúng phiên bản, manifest, đoạn đăng ký ở mọi trang. Chạy sau npm run build hay build:xem. Hàm thuần: them.test.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { maBamBan } from '../src/scripts/ngoai-tuyen/tich-hop.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const doc = (f) => fs.readFileSync(path.join(DIST, f), 'utf8');
const KHOA = JSON.parse(fs.readFileSync(path.join(ROOT, 'kiem-dinh/khoa.json'), 'utf8')).trang;

/** Bài (khám phá, thí nghiệm, hiểu bằng chứng; lõi, mở rộng) có trang trong dist/. */
function baiTrongBan() {
	return parse(fs.readFileSync(path.join(ROOT, 'src/data/trang.yml'), 'utf8'))
		.filter((r) => /^(kham-pha|thi-nghiem|bang-chung)\//.test(r.id) && !r.id.endsWith('/index') && ['loi', 'mo-rong'].includes(r.tang))
		.map((r) => r.id)
		.filter((t) => fs.existsSync(path.join(DIST, t, 'index.html')));
}

const coSach = fs.existsSync(path.join(DIST, 'sach/index.html'));

test('Sách in: đủ mọi bài trong bản build, không bài nào khác; bài chưa khóa có đánh dấu', { skip: !coSach && 'bản build không có Sách in (chưa khóa)' }, () => {
	const html = doc('sach/index.html');
	const trongSach = [...html.matchAll(/Trên web: <a href="\/psyche\/([^"]+)\/"/g)].map((m) => m[1]).sort();
	assert.deepEqual(trongSach, baiTrongBan().sort());
	const chuaKhoa = trongSach.filter((t) => !KHOA[t]);
	assert.equal((html.match(/Chưa kiểm định: chỉ có ở bản xem/g) ?? []).length, chuaKhoa.length);
});

test('Sách in: id không trùng, mọi link #mục có đích, không còn khối công cụ hay dữ liệu câu hỏi, không vào chỉ mục tìm kiếm', { skip: !coSach && 'bản build không có Sách in (chưa khóa)' }, () => {
	const html = doc('sach/index.html');
	const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
	const trung = ids.filter((x, i) => ids.indexOf(x) !== i);
	assert.deepEqual([...new Set(trung)], []);
	const co = new Set(ids);
	assert.deepEqual([...html.matchAll(/href="#([^"]+)"/g)].map((m) => decodeURIComponent(m[1])).filter((x) => !co.has(x)), []);
	assert.doesNotMatch(html, /class="pz-cong-cu |class="pz-quiz |data-quiz=/);
	assert.doesNotMatch(html, /data-pagefind-body/);
	assert.doesNotMatch(html, /src="[^"]*tai[^"]*\.js"/, 'Sách in không tải bộ tải thành phần');
});

test('Tờ tóm tắt: mỗi bài trong bản build một mục, link về bài', { skip: !fs.existsSync(path.join(DIST, 'sach/tom-tat/index.html')) && 'bản build không có Tờ tóm tắt' }, () => {
	const html = doc('sach/tom-tat/index.html');
	const muc = [...html.matchAll(/<p class="pz-to-tom-tat__ten"><a href="\/psyche\/([^"]+)\/">/g)].map((m) => m[1]).sort();
	assert.deepEqual(muc, baiTrongBan().sort());
});

test('dùng khi mất mạng: dist/sw.js mang mã băm của bản build; manifest đúng; mọi trang có link manifest và đoạn đăng ký', () => {
	const sw = doc('sw.js');
	if (process.env.PSYCHE_NGOAI_TUYEN === 'tat') return assert.match(sw, /unregister\(\)/);
	assert.match(sw, new RegExp(`const PHIEN_BAN = '${maBamBan(DIST)}';`));
	const mf = JSON.parse(doc('manifest.webmanifest'));
	assert.equal(mf.scope, './');
	for (const i of mf.icons) assert.ok(fs.existsSync(path.join(DIST, i.src)), `manifest: thiếu ${i.src}`);
	for (const f of ['index.html', '404.html', 'them/du-lieu-cua-toi/index.html'].filter((f) => fs.existsSync(path.join(DIST, f)))) {
		const html = doc(f);
		assert.match(html, /<link rel="manifest" href="\/psyche\/manifest\.webmanifest"/, f);
		assert.match(html, /navigator\.serviceWorker\.register\(base \+ 'sw\.js'/, f);
	}
});
