// Nền cho các script công cụ chép từ site cũ (src/scripts/cu/): chúng tự đăng ký qua window.PZReady(init) và đọc
// window.PZ.base (link "Dữ liệu của tôi"), như bộ tải ../psyche-zero/docs/assets/js/loader.js. Module này chạy trước
// chúng (thứ tự import trong src/scripts/cong-cu/<tên>.js), giữ hàm init để mount() gọi khi khối tới gần màn hình.
const goc = /** @type {any} */ (window);
goc.PZ = goc.PZ || {};
goc.PZ.base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const inits = [];
goc.PZReady = (fn) => inits.push(fn);

/** Chạy mọi hàm init đã đăng ký (an toàn khi gọi nhiều lần: mỗi công cụ tự bỏ qua khối đã dựng, PZUI.once). */
export function chayInit() {
	for (const fn of inits) {
		try {
			fn(document);
		} catch (e) {
			console.error('[Psyche]', e);
		}
	}
}
