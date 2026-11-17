// Service worker "dùng khi mất mạng" của Psyche (D8-L4; viết lại từ ../psyche-zero/docs/sw.js). Lúc build,
// src/scripts/ngoai-tuyen/tich-hop.mjs chép file này thành dist/sw.js, thay __PHIEN_BAN__ bằng mã băm của bản build: mỗi
// lần deploy đổi nội dung thì sw.js đổi, trình duyệt cài bản mới, bản mới xóa bộ nhớ đệm cũ. Phạm vi: /psyche/ (thư mục
// của sw.js). Chỉ xử lý yêu cầu GET cùng nguồn trong phạm vi; không nạp gì từ nguồn ngoài, không gửi gì đi.
// - Trang (yêu cầu điều hướng): mạng trước; mạng hỏng thì bản đã lưu; chưa lưu thì trang "Đang mất mạng" (chữ trong file
//   này, không cần tài nguyên nào khác), có link tới trang Hỗ trợ (lưu sẵn lúc cài).
// - File có mã băm trong tên (/_astro/), font, biểu tượng: bản đã lưu trước (không bao giờ đổi), chưa có thì lấy mạng rồi lưu.
// - Còn lại (chỉ mục tìm kiếm, manifest…): mạng trước, mạng hỏng thì bản đã lưu.
// Tắt: người đọc tắt ở trang Dữ liệu của tôi (dang-ky.js gỡ service worker, xóa bộ nhớ đệm); chủ site build với
// PSYCHE_NGOAI_TUYEN=tat thì sw.js thành bản tự gỡ (tich-hop.mjs).
const PHIEN_BAN = '__PHIEN_BAN__';
// không trùng tiền tố bộ nhớ đệm của site cũ (psyche-zero-v1, cùng nguồn mtuann.github.io): dọn kho không xóa của site cũ (review D8-L4)
const TIEN_TO = 'psyche-moi-';
const KHO = TIEN_TO + PHIEN_BAN;
const PHAM_VI = new URL('./', self.location).pathname; // "/psyche/"

const TRANG_MAT_MANG =
	'<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
	'<title>Đang mất mạng · Psyche</title><style>body{font:1.05rem/1.6 system-ui,sans-serif;margin:0;padding:2rem 1rem;color:#1b1c3a;background:#fff}' +
	'main{max-width:36rem;margin:auto}a{color:#3b3f8f}@media (prefers-color-scheme:dark){body{color:#eceaf5;background:#17182b}a{color:#b8bbf2}}</style>' +
	'<main><h1>Đang mất mạng</h1><p>Trang này chưa được lưu trên máy của bạn, nên chưa mở được khi không có mạng. Các trang bạn đã mở trước đây (khi có mạng) vẫn đọc được.</p>' +
	'<p><a href="' + PHAM_VI + '">Về trang chủ</a> (nếu đã lưu) hay thử lại khi có mạng.</p>' +
	'<p>Bạn đang gặp khó khăn? <a href="' + PHAM_VI + 'ho-tro/">Trang Hỗ trợ</a> được lưu sẵn trên máy để mở được cả khi mất mạng: khi nào nên tìm chuyên gia và số điện thoại khẩn cấp.</p></main></html>';

// Lưu sẵn trang Hỗ trợ (chỉ trang HTML; chữ đọc được cả khi chưa có CSS), để lời dẫn ở trang "Đang mất mạng" luôn mở được.
// Hỏng (trang chưa lên site, mất mạng) thì thôi, không chặn việc cài.
const LUU_SAN = [PHAM_VI + 'ho-tro/'];

self.addEventListener('install', (e) => {
	self.skipWaiting();
	e.waitUntil(caches.open(KHO).then((kho) => Promise.all(LUU_SAN.map((u) => kho.add(u).catch(() => {})))));
});

self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches
			.keys()
			.then((ds) => Promise.all(ds.filter((k) => k.startsWith(TIEN_TO) && k !== KHO).map((k) => caches.delete(k))))
			.then(() => self.clients.claim()),
	);
});

const laFileCoDinh = (p) => p.startsWith(PHAM_VI + '_astro/') || p.startsWith(PHAM_VI + 'fonts/') || p.startsWith(PHAM_VI + 'icons/');

async function luu(req, res) {
	if (res && res.status === 200 && res.type === 'basic') {
		const kho = await caches.open(KHO);
		await kho.put(req, res.clone());
	}
	return res;
}

async function mangTruoc(req, laTrang) {
	try {
		return await luu(req, await fetch(req));
	} catch (loi) {
		const co = await caches.match(req, { cacheName: KHO });
		if (co) return co;
		if (laTrang) return new Response(TRANG_MAT_MANG, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
		throw loi;
	}
}

async function luuTruoc(req) {
	const co = await caches.match(req, { cacheName: KHO });
	return co || luu(req, await fetch(req));
}

self.addEventListener('fetch', (e) => {
	const req = e.request;
	if (req.method !== 'GET') return;
	const url = new URL(req.url);
	if (url.origin !== self.location.origin || !url.pathname.startsWith(PHAM_VI)) return;
	if (url.pathname === PHAM_VI + 'sw.js') return;
	if (req.mode === 'navigate') e.respondWith(mangTruoc(req, true));
	else if (laFileCoDinh(url.pathname)) e.respondWith(luuTruoc(req));
	else e.respondWith(mangTruoc(req, false));
});
