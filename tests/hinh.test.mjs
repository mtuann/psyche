// Hình tĩnh src/hinh/<tên>.html (kế hoạch nâng cấp H1; quy chuẩn plans/nang-cap/hinh.md mục 3). Mọi hình: khuôn file,
// SVG có role="img" và aria-label, id trong SVG không trùng trên toàn bộ hình (Sách in đặt mọi hình vào một trang). Hình
// theo chuẩn mới (data-chuan="2" ở <figure>) thì chặn thêm: SVG mang data-pagefind-ignore; hai bản bố cục (khi có hai SVG)
// mang lớp pz-fig__hep và pz-fig__rong; tối đa ba cỡ chữ; câu chú thích không lặp trong SVG. Hình cũ chưa có dấu chỉ
// được ghi ra (cảnh báo), không chặn: mọi lô cùng sửa dần, không cần danh sách chờ.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const THU_MUC = path.resolve(import.meta.dirname, '../src/hinh');
const tatCa = () =>
	fs
		.readdirSync(THU_MUC)
		.filter((f) => f.endsWith('.html'))
		.map((f) => ({ ten: f.slice(0, -5), html: fs.readFileSync(path.join(THU_MUC, f), 'utf8') }));

const chuThuong = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const laChuan2 = (html) => /^<figure\b[^>]*\sdata-chuan="2"/.test(html.trim());

/** Lỗi khuôn của một hình (mọi hình). */
export function loiKhuon(html, ten) {
	const loi = [];
	const h = html.trim();
	if (!/^<figure class="pz-fig"[\s>]/.test(h) || !h.endsWith('</figure>')) loi.push(`${ten}: phải là một <figure class="pz-fig"> … </figure>`);
	if ((h.match(/<figcaption>/g) ?? []).length !== 1) loi.push(`${ten}: cần đúng một <figcaption>`);
	const svg = [...h.matchAll(/<svg\b[^>]*>/g)].map((m) => m[0]);
	if (!svg.length) loi.push(`${ten}: không có <svg>`);
	for (const s of svg) if (!/\srole="img"/.test(s) || !/\saria-label="[^"]+"/.test(s)) loi.push(`${ten}: <svg> cần role="img" và aria-label`);
	return loi;
}

/** Lỗi theo chuẩn mới (data-chuan="2"): chặn. Hình cũ dùng cùng hàm để in cảnh báo. */
export function loiChuan2(html, ten) {
	const loi = [];
	const svg = [...html.matchAll(/<svg\b[^>]*>[\s\S]*?<\/svg>/g)].map((m) => m[0]);
	for (const s of svg) if (!/^<svg\b[^>]*\sdata-pagefind-ignore/.test(s)) loi.push(`${ten}: <svg> thiếu data-pagefind-ignore (số đã có ở chú thích, bảng số liệu)`);
	if (svg.length > 2) loi.push(`${ten}: tối đa hai bản bố cục (hẹp, rộng), có ${svg.length} <svg>`);
	if (svg.length === 2) {
		const lop = svg.map((s) => /^<svg\b[^>]*\sclass="([^"]*)"/.exec(s)?.[1] ?? '');
		if (!lop.some((l) => /\bpz-fig__hep\b/.test(l)) || !lop.some((l) => /\bpz-fig__rong\b/.test(l)))
			loi.push(`${ten}: hai bản bố cục mang lớp pz-fig__hep và pz-fig__rong`);
	}
	for (const s of svg) {
		const co = new Set([...s.matchAll(/font-size(?:="|:\s*)([\d.]+)/g)].map((m) => m[1]));
		if (co.size > 3) loi.push(`${ten}: tối đa ba cỡ chữ mỗi bản, có ${co.size} (${[...co].join(', ')})`);
	}
	const chuThich = chuThuong(/<figcaption>([\s\S]*?)<\/figcaption>/.exec(html)?.[1] ?? '');
	const cau = chuThich.split(/(?<=[.!?])\s+/).filter((c) => c.length >= 25);
	const chuSvg = svg.map((s) => chuThuong(s)).join(' ');
	for (const c of cau) if (chuSvg.includes(c)) loi.push(`${ten}: câu chú thích lặp trong SVG: "${c.slice(0, 50)}…"`);
	return loi;
}

test('hình tĩnh: khuôn file, SVG có role="img" và aria-label', () => {
	const ds = tatCa();
	assert.ok(ds.length > 0);
	assert.deepEqual(ds.flatMap(({ ten, html }) => loiKhuon(html, ten)), []);
});

test('hình tĩnh: id trong SVG không trùng, cả giữa các hình (Sách in đặt mọi hình vào một trang)', () => {
	const gap = new Map();
	for (const { ten, html } of tatCa()) for (const [, id] of html.matchAll(/\sid="([^"]+)"/g)) gap.set(id, [...(gap.get(id) ?? []), ten]);
	assert.deepEqual([...gap].filter(([, ds]) => ds.length > 1).map(([id, ds]) => `${id}: ${ds.join(', ')}`), []);
});

test('hình theo chuẩn mới (data-chuan="2"): chặn; hình cũ: chỉ ghi cảnh báo', (t) => {
	const ds = tatCa();
	const moi = ds.filter(({ html }) => laChuan2(html));
	assert.deepEqual(moi.flatMap(({ ten, html }) => loiChuan2(html, ten)), []);
	const cu = ds.filter(({ html }) => !laChuan2(html));
	if (cu.length) t.diagnostic(`${cu.length} hình chưa theo chuẩn mới (data-chuan="2"), sửa trong lô N của trang: ${cu.map((h) => h.ten).join(', ')}`);
});

test('phép kiểm hình bắt được lỗi (mẫu hỏng)', () => {
	assert.match(loiKhuon('<div><svg></svg></div>', 'x').join('\n'), /phải là một <figure class="pz-fig">/);
	assert.match(loiKhuon('<figure class="pz-fig"><svg viewBox="0 0 1 1"></svg><figcaption>a</figcaption></figure>', 'x').join('\n'), /role="img" và aria-label/);
	const hai = (lop1, lop2, them = '') =>
		`<figure class="pz-fig" data-chuan="2"><svg class="${lop1}" role="img" aria-label="a" data-pagefind-ignore><text font-size="11">Một</text>${them}</svg><svg class="${lop2}" role="img" aria-label="a" data-pagefind-ignore></svg><figcaption>Hình cho thấy điều này rất rõ ràng ở mọi nhóm. Nguồn: A (2000).</figcaption></figure>`;
	assert.deepEqual(loiChuan2(hai('pz-fig__hep', 'pz-fig__rong'), 'x'), []);
	assert.match(loiChuan2(hai('a', 'b'), 'x').join('\n'), /pz-fig__hep và pz-fig__rong/);
	assert.match(loiChuan2(hai('pz-fig__hep', 'pz-fig__rong', '<text font-size="12">a</text><text font-size="13">b</text><text font-size="14">c</text>'), 'x').join('\n'), /tối đa ba cỡ chữ/);
	assert.match(loiChuan2(hai('pz-fig__hep', 'pz-fig__rong', '<text>Hình cho thấy điều này rất rõ ràng ở mọi nhóm.</text>'), 'x').join('\n'), /câu chú thích lặp trong SVG/);
	assert.match(loiChuan2('<figure class="pz-fig" data-chuan="2"><svg role="img" aria-label="a"></svg><figcaption>x</figcaption></figure>', 'x').join('\n'), /data-pagefind-ignore/);
});
