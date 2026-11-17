// Đăng ký service worker "dùng khi mất mạng" (D8-L4), chèn thẳng vào <head> mọi trang (astro.config.mjs, head): vài dòng,
// không nạp file nào. Chạy sau khi trang tải xong và trình duyệt rảnh, để không chen vào lúc tải trang. Không đăng ký
// (và gỡ service worker cũ, xóa bộ nhớ đệm) khi: người đọc đã tắt ở trang Dữ liệu của tôi (tùy chọn "ngoai-tuyen" là
// false trong khóa localStorage "psyche-zero", src/scripts/cong-cu/chung/luu.js), hay chủ site build với
// PSYCHE_NGOAI_TUYEN=tat (__TAT__ thành true). Lỗi (trình duyệt không cho, chứng chỉ tự ký khi kiểm thử) thì thôi, im lặng.
(function () {
	if (!('serviceWorker' in navigator)) return;
	var base = '__BASE__';
	var tat = __TAT__;
	try {
		var p = JSON.parse(localStorage.getItem('psyche-zero') || 'null');
		if (p && p.prefs && p.prefs['ngoai-tuyen'] && p.prefs['ngoai-tuyen'].value === false) tat = true;
	} catch (e) {}
	function chay() {
		if (tat) {
			navigator.serviceWorker.getRegistrations().then(function (ds) {
				ds.forEach(function (r) {
					if (r.scope.indexOf(location.origin + base) === 0) r.unregister();
				});
			}).catch(function () {});
			if (window.caches) caches.keys().then(function (ks) {
				ks.forEach(function (k) {
					if (k.indexOf('psyche-') === 0) caches.delete(k);
				});
			}).catch(function () {});
			return;
		}
		navigator.serviceWorker.register(base + 'sw.js', { scope: base }).catch(function () {});
	}
	function khiRanh() {
		if (window.requestIdleCallback) requestIdleCallback(chay, { timeout: 5000 });
		else setTimeout(chay, 2000);
	}
	if (document.readyState === 'complete') khiRanh();
	else addEventListener('load', khiRanh, { once: true });
})();
