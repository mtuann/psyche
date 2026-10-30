// Kiểm thử giao diện bố cục C (D1.3): menu bên theo nhóm và lĩnh vực (src/menu.mjs), biểu tượng của lĩnh vực, địa chỉ
// trang, màu thanh trên khớp thẻ theme-color, trang chủ có dải chàm. Phần menu là hàm thuần, chạy không cần bản build;
// phần còn lại đọc dist/ (chạy sau npm run build hay build:xem). Hiển thị trên trình duyệt: tests/trinh-duyet/.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { BIEU_TUONG, svg } from '../src/bieu-tuong.mjs';
import { diaChi, trangCuaDiaChi } from '../src/ban-build.mjs';
import { duLieuDaKiem } from '../src/du-lieu.mjs';
import { NHOM, menu, nhomCuaTrang } from '../src/menu.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const duLieu = duLieuDaKiem();
const read = (f) => fs.readFileSync(f, 'utf8');

test('menu: đủ tám nhóm theo thứ tự; Nền tảng chia 14 lĩnh vực theo thu_tu, kể cả lĩnh vực chưa có trang', () => {
	const m = menu([], duLieu.trang, duLieu['linh-vuc']);
	assert.deepEqual(
		m.map((n) => n.label),
		NHOM.map((n) => n.ten),
	);
	const nenTang = m.find((n) => n.label === 'Nền tảng');
	const lv = [...duLieu['linh-vuc']].sort((a, b) => a.thu_tu - b.thu_tu).map((l) => l.ten);
	assert.deepEqual(
		nenTang.items.map((x) => x.label),
		lv,
	);
	assert.ok(nenTang.items.every((x) => Array.isArray(x.items) && x.items.length === 0), 'chưa có trang thì lĩnh vực rỗng');
	assert.ok(m.filter((n) => n.label !== 'Nền tảng').every((n) => n.items.length === 0));
});

test('menu: chỉ trang có trong bản build, theo thứ tự của trang.yml; mục lục và trang lĩnh vực là "Tổng quan", đứng đầu', () => {
	const trang = ['thi-nghiem/asch', 'thi-nghiem/index', 'kham-pha/tri-nho/vi-sao-ta-quen', 'nen-tang/tri-nho', 'kham-pha/index', 'trai-nghiem/stroop', 'bat-dau/index', 'index'];
	const m = menu(trang, duLieu.trang, duLieu['linh-vuc']);
	const nhom = (ten) => m.find((n) => n.label === ten).items;
	assert.deepEqual(nhom('Thí nghiệm kinh điển'), [{ slug: 'thi-nghiem', label: 'Tổng quan' }, { slug: 'thi-nghiem/asch' }]);
	assert.deepEqual(nhom('Bắt đầu'), [{ slug: 'bat-dau', label: 'Tổng quan' }]);
	assert.deepEqual(nhom('Tự trải nghiệm'), [{ slug: 'trai-nghiem/stroop' }]);
	const nenTang = nhom('Nền tảng');
	assert.deepEqual(nenTang[0], { slug: 'kham-pha', label: 'Tổng quan' });
	const triNho = nenTang.find((x) => x.label === 'Trí nhớ');
	assert.deepEqual(triNho.items, [{ slug: 'nen-tang/tri-nho', label: 'Tổng quan' }, { slug: 'kham-pha/tri-nho/vi-sao-ta-quen' }]);
	// trang chủ không vào menu; mỗi trang đúng một chỗ
	const slugs = JSON.stringify(m).match(/"slug":"[^"]*"/g);
	assert.equal(slugs.length, trang.length - 1);
	assert.equal(new Set(slugs).size, slugs.length);
});

test('menu: mọi trang của trang.yml (trừ trang chủ) thuộc đúng một nhóm', () => {
	const ngoai = duLieu.trang.map((r) => r.id).filter((t) => t !== 'index' && !nhomCuaTrang(t));
	assert.deepEqual(ngoai, []);
	for (const t of duLieu.trang.map((r) => r.id)) assert.ok(NHOM.filter((n) => n.khop(t)).length <= 1, t);
});

test('biểu tượng: mỗi nhóm menu và mỗi lĩnh vực có biểu tượng, không lĩnh vực nào trùng', () => {
	for (const n of NHOM) assert.ok(BIEU_TUONG[n.id], `nhóm ${n.id} chưa có biểu tượng`);
	const bt = duLieu['linh-vuc'].map((l) => l.bieu_tuong);
	for (const [i, b] of bt.entries()) assert.ok(b && BIEU_TUONG[b], `lĩnh vực ${duLieu['linh-vuc'][i].id}: bieu_tuong "${b}" không có trong src/bieu-tuong.mjs`);
	assert.equal(new Set(bt).size, bt.length, 'hai lĩnh vực trùng biểu tượng');
	assert.match(svg('tim'), /^<svg [^>]*aria-hidden="true"/);
	assert.equal(svg('khong-co'), '');
});

test('địa chỉ trang: diaChi và trangCuaDiaChi', () => {
	assert.equal(diaChi('index'), '/psyche/');
	assert.equal(diaChi('thi-nghiem/index'), '/psyche/thi-nghiem/');
	assert.equal(diaChi('thi-nghiem/asch'), '/psyche/thi-nghiem/asch/');
	const co = ['index', 'thi-nghiem/index', 'thi-nghiem/asch'];
	assert.equal(trangCuaDiaChi('/psyche/', '/psyche/', co), 'index');
	assert.equal(trangCuaDiaChi('/psyche/thi-nghiem/#muc', '/psyche/', co), 'thi-nghiem/index');
	assert.equal(trangCuaDiaChi('/psyche/thi-nghiem/asch/', '/psyche/', co), 'thi-nghiem/asch');
	assert.equal(trangCuaDiaChi('/psyche/thi-nghiem/milgram/', '/psyche/', co), undefined);
	assert.equal(trangCuaDiaChi('/psyche/favicon.svg', '/psyche/', co), undefined);
	assert.equal(trangCuaDiaChi('/opus/', '/psyche/', co), undefined);
});

test('bản build: màu thanh trình duyệt (theme-color) trùng nền thanh trên; trang chủ có dải chàm và tiêu đề là câu hỏi', () => {
	const html = read(path.join(DIST, 'index.html'));
	const css = fs
		.readdirSync(path.join(DIST, '_astro'))
		.filter((f) => f.endsWith('.css'))
		.map((f) => read(path.join(DIST, '_astro', f)))
		.join('\n');
	const toi = /content="(#[0-9a-f]{6})" media="\(prefers-color-scheme: dark\)"/.exec(html)?.[1];
	const sang = /content="(#[0-9a-f]{6})" media="\(prefers-color-scheme: light\)"/.exec(html)?.[1];
	assert.ok(toi && sang, 'thiếu thẻ theme-color');
	assert.ok(css.includes(`--pz-header-bg:${toi}`), `nền thanh trên ở chế độ tối không phải ${toi}`);
	assert.ok(css.includes(`--pz-indigo-dark:${sang}`) && /--pz-header-bg:var\(--pz-indigo-dark\)/.test(css), `nền thanh trên ở chế độ sáng không phải ${sang}`);
	assert.match(html, /<div class="pz-hero"[^>]*>/);
	assert.match(html, /<h1 id="_top" data-page-title[^>]*>[^<]*\?<\/h1>/);
});

test('bản build: trang bài có viên loại bài, lĩnh vực, tầng phía trên tiêu đề, và dòng trạng thái', () => {
	const bai = fs.existsSync(DIST)
		? fs
				.readdirSync(DIST, { recursive: true })
				.map(String)
				.filter((f) => /^(kham-pha|thi-nghiem|bang-chung|trai-nghiem)\/.+\/index\.html$/.test(f.replace(/\\/g, '/')))
		: [];
	if (!bai.length) return; // chưa có trang bài nào trong bản build (trước D1.8)
	for (const f of bai) {
		const html = read(path.join(DIST, f));
		assert.match(html, /<p class="pz-dau__vien"[^>]*><span class="pz-dau__loai">/, `${f}: thiếu viên loại bài`);
		assert.match(html, /class="pz-dau__trang-thai"/, `${f}: thiếu dòng trạng thái kiểm định`);
	}
});
