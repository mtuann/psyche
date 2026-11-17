// Công cụ "Nhật ký những gì bạn đã thử" (::cong-cu{ten="nhat-ky"}; D8-L4, viết lại từ
// ../psyche-zero/docs/assets/js/nhat-ky.js). Khuôn của một công cụ: đầu stroop.js. Dòng thời gian các bản ghi trong kho
// kết quả (chung/luu.js: công cụ, câu hỏi "Thử suy ngẫm", thẻ ngộ nhận), nhóm theo ngày, mới nhất trước. Chỉ đọc: người
// đọc không ghi gì ở đây (không phải nhật ký cảm xúc); sao lưu, xóa ở trang Dữ liệu của tôi. Không chấm điểm, không diễn
// giải về người đọc: mỗi dòng chỉ nhắc lại con số công cụ đã cho xem (chung/loai.js, tomTatBanGhi).

import { canhBao, h, khung, so } from './chung/giao-dien.js';
import { nhanBanGhi, tomTatBanGhi } from './chung/loai.js';
import { coLuu, ds, ngay } from './chung/luu.js';

const THU = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

/** "2026-11-17" -> "Thứ Ba, 17/11/2026". */
export function tenNgay(k) {
	const [n, t, d] = k.split('-').map(Number);
	return `${THU[new Date(n, t - 1, d).getDay()]}, ${d}/${t}/${n}`;
}

/** Giờ:phút (giờ máy) của một thời điểm. */
export const gio = (t) => {
	const d = new Date(t);
	return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/** Bản ghi (cũ trước) thành các ngày, mới nhất trước: [{ ngay: "2026-11-17", ds: [bản ghi mới nhất trước] }]. */
export function theoNgay(banGhi) {
	const m = new Map();
	for (const r of [...banGhi].sort((a, b) => b.t - a.t)) {
		const k = ngay(r.t);
		if (!m.has(k)) m.set(k, []);
		m.get(k).push(r);
	}
	return [...m].map(([k, v]) => ({ ngay: k, ds: v }));
}

export function mount(el) {
	const K = khung(el);
	let trangCo = {};
	try {
		trangCo = JSON.parse(el.dataset.trang || '{}');
	} catch {}
	const goc = new URL('../../', location.href).pathname; // trang ở /psyche/them/nhat-ky/
	const link = (trang, ten) => (trang ? h('a', { href: goc + trang.replace(/(^|\/)index$/, '').replace(/([^/])$/, '$1/') }, [ten]) : h('strong', { text: ten }));
	const nhom = theoNgay(ds());
	const tong = nhom.reduce((s, x) => s + x.ds.length, 0);
	K.hien([
		coLuu() ? null : canhBao('Trình duyệt đang chặn lưu dữ liệu', 'Có thể bạn đang ở chế độ riêng tư hay đã tắt lưu dữ liệu trang web. Nhật ký chỉ giữ đến khi bạn đóng trang.'),
		tong
			? h('p', { class: 'pz-small', text: `${so(tong)} lần thử trong ${so(nhom.length)} ngày.` })
			: h('div', { class: 'pz-du-lieu__hop' }, [
					h('p', { class: 'pz-du-lieu__tieu-de', text: 'Nhật ký còn trống' }),
					h('p', {}, [
						'Bạn chưa thử gì trên trình duyệt này. Mỗi lần bạn làm một công cụ hay trả lời xong các câu hỏi "Thử suy ngẫm" cuối bài, nhật ký tự ghi lại ở đây.',
						trangCo['trai-nghiem/index'] ? ' ' : '',
						trangCo['trai-nghiem/index'] ? link('trai-nghiem/index', 'Xem các công cụ tự trải nghiệm') : '',
					]),
				]),
		...nhom.map((x) =>
			h('section', { class: 'pz-nhat-ky__ngay', 'aria-label': `Ngày ${tenNgay(x.ngay)}` }, [
				h('h2', { text: tenNgay(x.ngay) }),
				h(
					'ul',
					{ class: 'pz-nhat-ky__ds' },
					x.ds.map((r) => {
						const nb = nhanBanGhi(r, trangCo);
						return h('li', {}, [
							h('time', { datetime: new Date(r.t).toISOString(), text: gio(r.t) }),
							' ',
							link(nb.trang, nb.ten),
							h('span', { class: 'pz-nhat-ky__tom-tat', text: tomTatBanGhi(r) }),
						]);
					}),
				),
			]),
		),
	]);
	el.dataset.san = '1';
}
