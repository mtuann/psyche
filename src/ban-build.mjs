// Trang nào có trong bản build hiện tại, và địa chỉ của trang. Chép từ ../opus/src/ban-build.mjs rồi sửa cho Psyche.
// D1.3: mọi trang trong src/content/docs/ (trừ 404) có trong cả hai bản build. D1.6 thêm khóa: bản thật (npm run build) chỉ
// có trang đã khóa trong kiem-dinh/khoa.json; bản xem (npm run build:xem, npm run dev) có mọi trang.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = fileURLToPath(new URL('../', import.meta.url));
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

/** File mà HTML đã dựng của trang phụ thuộc, ngoài chính trang: mã dựng trang, dữ liệu, hình tĩnh, khóa. */
export function tepDauVet(goc = GOC) {
	const trong = (thu, duoi) =>
		fs.existsSync(path.join(goc, thu))
			? fs
					.readdirSync(path.join(goc, thu))
					.filter((f) => f.endsWith(duoi))
					.sort()
					.map((f) => `${thu}/${f}`)
			: [];
	return ['src/du-lieu.mjs', 'src/ban-build.mjs', ...trong('src/plugins', '.mjs'), ...trong('src/data', '.yml'), ...trong('src/hinh', '.html'), 'kiem-dinh/khoa.json'];
}

/** Dấu vết của tepDauVet(), bản build (thật hay xem) và danh sách trang trong bản build. Chép từ opus (dauVet). */
export function dauVet(goc = GOC) {
	const h = createHash('sha256');
	for (const f of tepDauVet(goc)) h.update(fs.existsSync(path.join(goc, f)) ? fs.readFileSync(path.join(goc, f)) : `không có ${f}`);
	h.update(ban());
	h.update(trangTrongBan().join('\n'));
	return h.digest('hex');
}

/**
 * Bọc bộ nạp trang (docsLoader của Starlight). Astro giữ HTML đã dựng của trang giữa các lần build và chỉ dựng lại trang
 * có file đổi; nhưng HTML còn phụ thuộc dữ liệu, plugin, hình và danh sách trang (link "sắp có"). Dấu vết khác lần trước
 * thì xóa bộ nhớ đệm của trang, dựng lại hết. Đang chạy npm run dev mà thêm, xóa trang: khởi động lại.
 */
export function dungLaiKhiDoi(loader) {
	return {
		...loader,
		load: async (ctx) => {
			const moi = dauVet();
			if (ctx.meta.get('psyche-dau-vet') !== moi) {
				ctx.store.clear();
				ctx.meta.set('psyche-dau-vet', moi);
			}
			await loader.load(ctx);
		},
	};
}
