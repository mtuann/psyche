// Trang nào có trong bản build hiện tại, và địa chỉ của trang. Chép từ ../opus/src/ban-build.mjs rồi sửa cho Psyche.
// D1.3: mọi trang trong src/content/docs/ (trừ 404) có trong cả hai bản build. D1.6 thêm khóa: bản thật (npm run build) chỉ
// có trang đã khóa trong kiem-dinh/khoa.json; bản xem (npm run build:xem, npm run dev) có mọi trang.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const DOCS = fileURLToPath(new URL('./content/docs/', import.meta.url));

/** Đường dẫn gốc của site, có "/" ở cuối (base của astro.config.mjs): link do thành phần dựng lúc build viết từ đây. */
export const DUONG_GOC = '/psyche/';

/**
 * Bản build đang dựng: "that" (bản thật, mặc định) hay "xem" (bản xem). Đặt bằng biến môi trường PSYCHE_BAN
 * (npm run build:xem, npm run dev).
 */
export const ban = () => (process.env.PSYCHE_BAN === 'xem' ? 'xem' : 'that');

/** Mọi trang trong src/content/docs/, như "thi-nghiem/asch", "thi-nghiem/index", "index", kể cả "404". */
export function tatCaTrang(docs = DOCS) {
	if (!fs.existsSync(docs)) return [];
	return fs
		.readdirSync(docs, { recursive: true })
		.map((f) => String(f).replace(/\\/g, '/'))
		.filter((f) => /\.mdx?$/.test(f) && !f.split('/').at(-1).startsWith('_'))
		.map((f) => f.replace(/\.mdx?$/, ''))
		.sort();
}

/** Trang có trong bản build hiện tại, không tính trang 404. */
export function trangTrongBan() {
	return tatCaTrang().filter((t) => t !== '404');
}

/** Địa chỉ của một trang: "thi-nghiem/asch" -> "/psyche/thi-nghiem/asch/", "thi-nghiem/index" -> "/psyche/thi-nghiem/". */
export const diaChi = (trang, base = DUONG_GOC) => base + trang.replace(/(^|\/)index$/, '').replace(/([^/])$/, '$1/');

/** Địa chỉ trỏ tới file (.txt, .svg…): đoạn cuối của đường dẫn (bỏ ?… và #…) có đuôi, không có "/" ở cuối. */
export const laFile = (dc) => /\.[a-z0-9]+$/i.test(dc.split(/[?#]/)[0]);

/**
 * Trang (trong `trang`, dạng trangTrongBan) mà địa chỉ `dc` (/psyche/x/y/#muc) trỏ tới, hay undefined nếu không có.
 * Địa chỉ không thuộc site (không bắt đầu bằng `base`) hay trỏ tới file (có đuôi) cũng trả về undefined.
 */
export function trangCuaDiaChi(dc, base, trang) {
	if (!dc.startsWith(base) || laFile(dc)) return undefined;
	const p = decodeURI(dc.slice(base.length).split(/[?#]/)[0]).replace(/\/$/, '');
	return [p || 'index', `${p}/index`].find((t) => trang.includes(t));
}

/** Đường dẫn trang của một mục trong bộ docs (theo file nguồn; trang mục lục giữ đuôi /index). */
export const trangCuaMuc = (muc) => muc?.filePath?.replace(/^src\/content\/docs\//, '').replace(/\.mdx?$/, '');
