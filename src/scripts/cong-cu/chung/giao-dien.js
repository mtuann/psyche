// Giao diện dùng chung cho các công cụ (D8-L1; viết lại từ ../psyche-zero/docs/assets/js/ui.js). Khuôn của một công cụ:
// xem đầu src/scripts/cong-cu/stroop.js. Chỉ đụng tới document bên trong hàm, nên module của công cụ nạp được trong Node để
// kiểm thử phần tính toán. Kiểu (lớp pz-…) ở src/styles/thanh-phan.css, mục "Công cụ", màu theo biến của site.

import { ds } from './luu.js';
import { dangViTri, gopViTri, trungVi } from './thong-ke.js';

const SVG = 'http://www.w3.org/2000/svg';

/**
 * Tạo phần tử: h('button', { class: 'pz-nut', onclick: fn }, ['chữ', con]). Thuộc tính: class, text, html (chuỗi HTML
 * do chính công cụ dựng, không bao giờ là chữ người dùng gõ), on… (sự kiện), style (đối tượng), còn lại là thuộc tính
 * HTML (true thành thuộc tính rỗng; null, false bỏ qua).
 */
export function h(tag, thuocTinh = {}, con = []) {
	return dat(document.createElement(tag), thuocTinh, con);
}

/** Như h(), cho phần tử SVG (chữ trong hình là chữ thật, màu theo currentColor hay lớp của site). */
export function s(tag, thuocTinh = {}, con = []) {
	return dat(document.createElementNS(SVG, tag), thuocTinh, con);
}

function dat(el, thuocTinh, con) {
	for (const [k, v] of Object.entries(thuocTinh)) {
		if (v == null || v === false) continue;
		if (k === 'class') el.setAttribute('class', v);
		else if (k === 'text') el.textContent = v;
		else if (k === 'html') el.innerHTML = v;
		else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
		else if (k === 'style' && typeof v === 'object') for (const [ten, gt] of Object.entries(v)) el.style.setProperty(ten.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`), gt);
		else el.setAttribute(k, v === true ? '' : String(v));
	}
	for (const c of con) if (c != null && c !== false) el.append(typeof c === 'string' ? document.createTextNode(c) : c);
	return el;
}

/** Số kiểu Việt Nam: dấu phẩy thập phân, dấu chấm ngăn hàng nghìn, dấu trừ thật; không phải số thì "—". */
export function so(x, chuSo = 0) {
	if (x == null || Number.isNaN(x)) return '—';
	const [nguyen, le] = Math.abs(x).toFixed(chuSo).split('.');
	const am = x < 0 && Number(Math.abs(x).toFixed(chuSo)) !== 0;
	return (am ? '−' : '') + nguyen.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (le ? `,${le}` : '');
}

/** Ngày kiểu Việt Nam (ngày/tháng/năm) của một thời điểm. */
export const ngayVN = (t) => new Date(t).toLocaleDateString('vi-VN');

/** Người dùng xin giảm chuyển động không. */
export const giamChuyenDong = () => !!globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Nút của site. `chinh`: nút chính (nền màu); `tuDong`: nhận tiêu điểm khi màn hiện ra (sau khi người dùng bấm, không phải
 * lúc tải trang: khung().hien).
 */
export function nut(chu, khiBam, { chinh = false, tuDong = false, ...khac } = {}) {
	return h('button', { type: 'button', class: chinh ? 'pz-nut pz-nut--chinh' : 'pz-nut', 'data-tu-dong': tuDong, onclick: khiBam, ...khac }, [chu]);
}

/** Lời về quyền riêng tư dưới công cụ. D8-L4 (trang Dữ liệu của tôi) thêm link tới trang ấy. */
export const loiRiengTu = () => h('p', { class: 'pz-rieng-tu' }, ['Kết quả chỉ lưu trên trình duyệt của bạn, không gửi đi đâu.']);

/** Khung cảnh báo trong công cụ (tiêu đề, các đoạn). */
export const canhBao = (tieuDe, ...doan) => h('div', { class: 'pz-canh-bao' }, [h('p', { class: 'pz-canh-bao__tieu-de', text: tieuDe }), ...doan.map((d) => h('p', {}, [d]))]);

/**
 * Khung kết luận trong công cụ (D8-L2): `kieu` "tot" (viền xanh lá: làm đúng, không sập bẫy) hay "chu-y" (viền hồng: vừa
 * sập bẫy, kết quả đáng chú ý). Không phải lời khen chê: chữ của khung nói điều vừa xảy ra.
 */
export const khungKetLuan = (kieu, tieuDe, ...doan) =>
	h('div', { class: `pz-ket-luan pz-ket-luan--${kieu}` }, [h('p', { class: 'pz-ket-luan__tieu-de', text: tieuDe }), ...doan.map((d) => h('p', {}, [].concat(d)))]);

/**
 * Phím tắt trên document (D8-L2, từ bài học review D8-L1): bỏ qua khi có Ctrl, Alt, Meta, hay khi đang gõ vào ô nhập
 * (input, textarea, select, contenteditable: ô tìm kiếm của trang…). `xuLy(phím chữ thường, sự kiện)` trả về true nếu đã
 * dùng phím (thì chặn hành vi mặc định). Trả về hàm gỡ phím tắt.
 */
export function batPhimTat(xuLy) {
	const nghe = (e) => {
		if (e.ctrlKey || e.metaKey || e.altKey || dangGo(e.target)) return;
		if (xuLy((e.key || '').toLowerCase(), e)) e.preventDefault();
	};
	document.addEventListener('keydown', nghe);
	return () => document.removeEventListener('keydown', nghe);
}

/** Phần tử đang nhận phím là ô nhập chữ (phím là chữ, không phải phím tắt). */
export const dangGo = (t) => t instanceof Element && (!!t.closest('input, textarea, select') || t.isContentEditable);

/** Khối thu gọn trong công cụ: tiêu đề và danh sách ý. */
export const thuGon = (tieuDe, y) => h('details', { class: 'pz-mo-them' }, [h('summary', { text: tieuDe }), h('ul', {}, y.filter(Boolean).map((x) => h('li', {}, [x])))]);

/**
 * Khung của một công cụ trong khối `el` (::cong-cu): vùng hiển thị và vùng báo cho trình đọc màn hình (aria-live).
 * - hien(con): thay màn đang hiện. Nút có tuDong nhận tiêu điểm, trừ lần hiện đầu tiên (lúc tải trang: không kéo trang
 *   tới công cụ, không lấy tiêu điểm của người đọc).
 * - bao(chu): đọc một câu cho trình đọc màn hình.
 * - dangChay(co): đang làm bài (lớp pz-running trên body: ẩn thanh mục lục điện thoại để không che kích thích).
 */
export function khung(el) {
	const view = h('div', { class: 'pz-cc__man' });
	const live = h('div', { class: 'pz-an', role: 'status', 'aria-live': 'polite' });
	el.replaceChildren(view, live);
	let lan = 0;
	return {
		el,
		hien(con) {
			view.replaceChildren(...con.filter((c) => c != null && c !== false));
			if (lan++) view.querySelector('[data-tu-dong]')?.focus();
		},
		bao(chu) {
			live.textContent = chu;
		},
		dangChay(co) {
			document.body.classList.toggle('pz-running', co);
		},
	};
}

/**
 * Biểu đồ cột ngang bằng HTML: mỗi hàng một nhãn (chữ thật, xuống dòng được ở màn hẹp), một thanh, một giá trị. Thanh chỉ
 * để nhìn (aria-hidden); trình đọc màn hình đọc nhãn và giá trị. hang: [{ ten, gt, chu, nhan: true nếu là thanh nhấn }].
 */
export function bieuDoCot(hang, { toiDa, tieuDe } = {}) {
	const max = toiDa ?? Math.max(...hang.map((r) => r.gt || 0), 1);
	return h('figure', { class: 'pz-cot' }, [
		tieuDe ? h('figcaption', { text: tieuDe }) : null,
		h(
			'ul',
			{},
			hang.map((r) =>
				h('li', { class: r.nhan ? 'pz-cot__hang pz-cot__hang--nhan' : 'pz-cot__hang' }, [
					h('span', { class: 'pz-cot__ten', text: r.ten }),
					h('span', { class: 'pz-cot__thanh', 'aria-hidden': 'true', style: { '--w': `${Math.max(0.5, Math.min(100, ((r.gt || 0) / max) * 100))}%` } }),
					h('span', { class: 'pz-cot__so', text: r.chu }),
				]),
			),
		),
	]);
}

/**
 * Bảng các lần làm trước (5 lần gần nhất) của một loại bản ghi, trong khối thu gọn; chưa có lần nào thì null.
 * cot: [[tên cột, (bản ghi) => chữ], …]; cột đầu luôn là ngày.
 */
export function lichSu(kind, cot, { soLan = 5 } = {}) {
	const lan = ds(kind).slice(-soLan).reverse();
	if (!lan.length) return null;
	const tieuDe = `Các lần làm trước (${lan.length} lần gần nhất)`;
	return h('details', { class: 'pz-mo-them' }, [
		h('summary', { text: tieuDe }),
		h('div', { class: 'pz-bang', tabindex: '0', role: 'region', 'aria-label': `${tieuDe}, cuộn ngang được` }, [
			h('table', {}, [
				h('thead', {}, [h('tr', {}, ['Ngày', ...cot.map(([ten]) => ten)].map((x) => h('th', { scope: 'col', text: x })))]),
				h(
					'tbody',
					{},
					lan.map((r) => h('tr', {}, [ngayVN(r.t), ...cot.map(([, f]) => f(r))].map((x) => h('td', { text: x })))),
				),
			]),
		]),
	]);
}

/**
 * Mục "Vị trí nào bạn nhớ tốt nhất?" của các công cụ đo độ dài trí nhớ: tỉ lệ đúng theo vị trí (biểu đồ cột), lời diễn
 * giải và thời gian trả lời trung vị. luot: [{ positions: [bool…], rt: ms }]. Chưa có lượt nào thì null.
 */
export function phanViTri(luot) {
	if (!luot?.length) return null;
	const gop = gopViTri(luot);
	const hang = gop
		.map((p, i) => p.total && { ten: `Vị trí ${i + 1}`, gt: Math.round((p.correct / p.total) * 100), chu: `${Math.round((p.correct / p.total) * 100)}% (${p.correct}/${p.total})` })
		.filter(Boolean);
	if (!hang.length) return null;
	const dienGiai =
		dangViTri(gop) === 'u'
			? 'Đường chữ U này giống hiệu ứng vị trí chuỗi trong nghiên cứu trí nhớ: mục ở đầu dãy (hiệu ứng đầu) và cuối dãy (hiệu ứng cuối) thường được nhớ tốt hơn mục ở giữa.'
			: 'Lần này chưa thấy rõ hình chữ U; cần nhiều lượt hơn mới nói được gì. Đây chỉ là số liệu của một lần làm.';
	const rts = luot.map((t) => t.rt).filter((x) => x != null && !Number.isNaN(x));
	return h('div', { class: 'pz-vi-tri' }, [
		h('h4', { text: 'Vị trí nào bạn nhớ tốt nhất?' }),
		bieuDoCot(hang, { toiDa: 100, tieuDe: 'Tỉ lệ gõ đúng ở từng vị trí trong dãy, cả lần này' }),
		h('p', {}, [dienGiai]),
		h('p', {}, ['Thời gian trả lời trung vị: ', h('strong', { text: `${so(rts.length ? trungVi(rts) / 1000 : NaN, 1)} giây mỗi lượt` }), ' (từ lúc ô nhập hiện ra đến lúc bạn bấm Xong).']),
	]);
}
