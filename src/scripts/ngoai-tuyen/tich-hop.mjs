// Dùng khi mất mạng (D8-L4): tích hợp Astro ghi dist/sw.js sau khi build, và đoạn đăng ký chèn vào <head>. Chạy ở Node
// lúc build (astro.config.mjs), không vào trình duyệt.
// - Phiên bản của service worker là mã băm của mọi file trong dist/ (trừ sw.js): deploy đổi gì thì sw.js đổi theo, trình
//   duyệt cài bản mới và bản mới xóa bộ nhớ đệm cũ (src/scripts/ngoai-tuyen/sw.js). Build lại y nguyên thì không đổi.
// - Tắt cả site: build với PSYCHE_NGOAI_TUYEN=tat: sw.js thành bản tự gỡ (xóa bộ nhớ đệm, gỡ chính nó), đoạn đăng ký gỡ
//   service worker cũ thay vì đăng ký. Người đọc tắt riêng ở trang Dữ liệu của tôi.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const THU_MUC = fileURLToPath(new URL('./', import.meta.url));

/** Site có tắt dùng khi mất mạng không (biến môi trường PSYCHE_NGOAI_TUYEN=tat). */
export const tatNgoaiTuyen = () => process.env.PSYCHE_NGOAI_TUYEN === 'tat';

/** Mã băm (16 ký tự) của mọi file trong thư mục `dist` theo đường dẫn và nội dung, trừ sw.js ở gốc. */
export function maBamBan(dist) {
	const h = createHash('sha256');
	const tep = fs
		.readdirSync(dist, { recursive: true })
		.map((f) => String(f).replace(/\\/g, '/'))
		.filter((f) => f !== 'sw.js' && fs.statSync(path.join(dist, f)).isFile())
		.sort();
	for (const f of tep) h.update(f + '\0').update(fs.readFileSync(path.join(dist, f))).update('\0');
	return h.digest('hex').slice(0, 16);
}

/** Bản service worker tự gỡ (site tắt dùng khi mất mạng). */
export const SW_TU_GO = `// Psyche: dùng khi mất mạng đã tắt (PSYCHE_NGOAI_TUYEN=tat): xóa bộ nhớ đệm, gỡ service worker.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches.keys()
			.then((ds) => Promise.all(ds.filter((k) => k.startsWith('psyche-moi-')).map((k) => caches.delete(k))))
			.then(() => self.registration.unregister()),
	);
});
`;

/** Chữ của sw.js cho một phiên bản (hay bản tự gỡ khi tat). */
export function chuSw(phienBan, tat = tatNgoaiTuyen()) {
	if (tat) return SW_TU_GO;
	return fs.readFileSync(path.join(THU_MUC, 'sw.js'), 'utf8').replace(/__PHIEN_BAN__/g, phienBan);
}

/** Đoạn đăng ký, chèn vào <head> (thẻ script trong dòng). */
export function chuDangKy(base, tat = tatNgoaiTuyen()) {
	return fs
		.readFileSync(path.join(THU_MUC, 'dang-ky.js'), 'utf8')
		.replace(/^\/\/.*\n/gm, '')
		.replace('__BASE__', base)
		.replace('__TAT__', String(tat))
		.trim();
}

/** Tích hợp Astro: sau khi build xong (và sau tích hợp tìm kiếm, vốn sửa pagefind.js), ghi dist/sw.js. */
export function ngoaiTuyen() {
	return {
		name: 'psyche-ngoai-tuyen',
		hooks: {
			'astro:build:done': ({ dir, logger }) => {
				const dist = fileURLToPath(dir);
				const phienBan = maBamBan(dist);
				fs.writeFileSync(path.join(dist, 'sw.js'), chuSw(phienBan));
				logger.info(tatNgoaiTuyen() ? 'đã ghi sw.js tự gỡ (PSYCHE_NGOAI_TUYEN=tat)' : `đã ghi sw.js, phiên bản ${phienBan}`);
			},
		},
	};
}
