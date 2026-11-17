// Công cụ "Ảo giác Ebbinghaus" (::cong-cu{ten="ebbinghaus"}; D8-L1, viết lại từ ../psyche-zero/docs/assets/js/ebbinghaus.js).
// Khuôn của một công cụ: đầu stroop.js.
//
// Hai cụm vòng tròn (SVG): hai vòng trung tâm BẰNG NHAU (đường kính 60 đơn vị của hình); cụm trái có 6 vòng bao quanh lớn,
// cụm phải có 6 vòng bao quanh nhỏ. Thanh trượt đổi bán kính các vòng bao quanh ở cụm trái; vòng trung tâm không đổi. Nút
// "Đo kích thước thật" vẽ thước đo lên cả hai vòng trung tâm. Công cụ không chấm điểm người dùng và không so với số liệu
// nghiên cứu: chỉ cho thấy hai vòng bằng nhau.

import { giamChuyenDong, h, khung, lichSu, loiRiengTu, nut, s } from './chung/giao-dien.js';
import { them } from './chung/luu.js';

/** Thông số của hình (đơn vị của SVG; hình co giãn theo màn hình nên "px" là px của hình gốc rộng 720). */
export const HINH = {
	banKinhTam: 30,
	duongKinhTam: 60,
	soVongQuanh: 6,
	khe: 22, // khe giữa mép vòng trung tâm và mép vòng bao quanh gần nhất
	quanhMin: 14,
	quanhMax: 44,
	quanhMacDinh: 40,
	quanhNho: 14, // bán kính vòng bao quanh cố định ở cụm phải
};

// ---------- Tính toán (hàm thuần) ----------

/** Bán kính của vòng tròn chứa tâm các vòng bao quanh. */
export const banKinhVanh = (r) => HINH.banKinhTam + HINH.khe + r;

/** Tâm của n vòng bao quanh, đều nhau trên vòng bán kính rr, vòng đầu ở trên cùng. */
export function viTriQuanh(cx, cy, rr, n) {
	return Array.from({ length: n }, (_, i) => {
		const a = (Math.PI * 2 * i) / n - Math.PI / 2;
		return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a) };
	});
}

/** Các vòng bao quanh bán kính r không đè lên nhau. */
export const khongDe = (r, n = HINH.soVongQuanh) => 2 * banKinhVanh(r) * Math.sin(Math.PI / n) >= 2 * r;

// ---------- Giao diện ----------

const r1 = (x) => Math.round(x * 10) / 10;

function cum(cx, cy, r, daDo) {
	const nhom = viTriQuanh(cx, cy, banKinhVanh(r), HINH.soVongQuanh).map((p) =>
		s('circle', { class: 'pz-eb-quanh', cx: r1(p.x), cy: r1(p.y), r, fill: 'none', stroke: 'currentColor', 'stroke-width': 3 }),
	);
	const tam = s('circle', { class: daDo ? 'pz-eb-tam pz-fig-b' : 'pz-eb-tam', cx, cy, r: HINH.banKinhTam, fill: 'none', stroke: 'currentColor', 'stroke-width': 4 });
	if (daDo && !giamChuyenDong())
		tam.append(s('animate', { attributeName: 'r', values: `${HINH.banKinhTam};${HINH.banKinhTam + 5};${HINH.banKinhTam}`, dur: '0.8s', repeatCount: 2 }));
	nhom.push(tam);
	if (daDo) {
		const x0 = cx - HINH.banKinhTam;
		const x1 = cx + HINH.banKinhTam;
		nhom.push(
			s('g', { class: 'pz-fig-b', stroke: 'currentColor', 'stroke-width': 2 }, [
				s('line', { x1: x0, y1: cy, x2: x1, y2: cy }),
				s('line', { x1: x0, y1: cy - 6, x2: x0, y2: cy + 6 }),
				s('line', { x1, y1: cy - 6, x2: x1, y2: cy + 6 }),
			]),
			s('text', { x: cx, y: cy - HINH.banKinhTam - 12, 'text-anchor': 'middle', fill: 'currentColor', 'font-size': 18, 'font-weight': 700, class: 'pz-fig-b' }, [`${HINH.duongKinhTam} px`]),
		);
	}
	return nhom;
}

/** Hình hai cụm; nhãn mô tả cho trình đọc màn hình (công cụ cần thị giác, trang có phần giải thích bằng chữ). */
function hinh(r, daDo) {
	return s(
		'svg',
		{
			viewBox: '0 0 720 320',
			class: 'pz-hinh-cc pz-hinh-cc--eb',
			role: 'img',
			'aria-label': `Hai cụm vòng tròn. Vòng trung tâm của hai cụm có đường kính bằng nhau, ${HINH.duongKinhTam} px. Cụm bên trái bao quanh bởi các vòng lớn, cụm bên phải bao quanh bởi các vòng nhỏ.${daDo ? ` Đã vẽ thước đo: cả hai vòng trung tâm đều ${HINH.duongKinhTam} px.` : ''}`,
		},
		[...cum(180, 160, r, daDo), ...cum(540, 160, HINH.quanhNho, daDo)],
	);
}

const chuHinh = () =>
	h('div', { class: 'pz-hai-cot', 'aria-hidden': 'true' }, [
		h('p', { class: 'pz-chu-hinh', text: 'Cụm trái: vòng bao quanh lớn' }),
		h('p', { class: 'pz-chu-hinh', text: 'Cụm phải: vòng bao quanh nhỏ' }),
	]);

let soKhoi = 0;

export function mount(el) {
	const K = khung(el);
	const ma = ++soKhoi;

	function gioiThieu() {
		K.hien([
			h('p', { class: 'pz-cc__dan' }, ['Nhìn hai cụm vòng tròn. Vòng tròn ở giữa mỗi cụm "nhìn" có vẻ khác nhau, nhưng thước đo sẽ cho bạn biết sự thật. Khoảng 1 phút.']),
			h('p', { class: 'pz-small' }, ['Công cụ này cần thị giác: nếu bạn dùng trình đọc màn hình, hãy đọc phần giải thích bên dưới công cụ.']),
			nut('Bắt đầu', () => lam(), { chinh: true, tuDong: true }),
			loiRiengTu(),
			lichSu('ebbinghaus', [['Bán kính vòng bao quanh (cụm trái)', (r) => `${r.surR} px`]]),
		]);
	}

	function lam(r = HINH.quanhMacDinh) {
		const id = `pz-eb-${ma}`;
		const o = h('div', { class: 'pz-hinh-o' });
		const gt = h('p', { class: 'pz-counter', 'aria-live': 'polite' });
		const truot = h('input', { id, type: 'range', min: HINH.quanhMin, max: HINH.quanhMax, step: 1, value: r, class: 'pz-truot' });
		const ve = () => {
			const v = +truot.value;
			o.replaceChildren(hinh(v, false));
			truot.setAttribute('aria-valuetext', `bán kính ${v} px`);
			gt.textContent = `Cụm trái: các vòng bao quanh có bán kính ${v} px. Hai vòng tròn trung tâm luôn có đường kính ${HINH.duongKinhTam} px.`;
		};
		truot.addEventListener('input', ve);
		ve();
		K.hien([
			h('p', { class: 'pz-cc__dan' }, [
				'Kéo thanh trượt (hay dùng phím ',
				h('kbd', { text: '←' }),
				' ',
				h('kbd', { text: '→' }),
				') để đổi kích thước các vòng bao quanh ở cụm bên trái, rồi bấm "Đo kích thước thật".',
			]),
			o,
			chuHinh(),
			h('div', { class: 'pz-hang-truot' }, [h('label', { for: id, text: 'Kích thước các vòng bao quanh ở cụm bên trái:' }), truot, gt]),
			nut('Đo kích thước thật', () => do_(+truot.value), { chinh: true, tuDong: true }),
		]);
	}

	function do_(r) {
		them('ebbinghaus', { surR: r, centerD: HINH.duongKinhTam });
		K.bao(`Kết quả đo: cả hai vòng tròn trung tâm đều có đường kính ${HINH.duongKinhTam} px, bằng nhau hoàn toàn. Vòng ở cụm bên trái chỉ "nhìn" nhỏ hơn vì bị các vòng lớn bao quanh.`);
		K.hien([
			h('div', { class: 'pz-hinh-o' }, [hinh(r, true)]),
			chuHinh(),
			h('h3', { text: 'Kết quả đo' }),
			h('p', { class: 'pz-big-number' }, [h('strong', { text: `${HINH.duongKinhTam} px = ${HINH.duongKinhTam} px` }), ': hai vòng tròn trung tâm bằng nhau']),
			h('p', {}, [
				`Thước đo trên hình cho thấy cả hai vòng tròn trung tâm đều có đường kính đúng ${HINH.duongKinhTam} px (của hình gốc rộng 720 px; trên màn hình nhỏ, hình co lại nhưng hai vòng vẫn bằng nhau). Ảo giác khiến vòng bị các vòng lớn bao quanh "nhìn" nhỏ hơn, dù thước đo nói ngược lại.`,
			]),
			nut('Chơi lại', () => lam(r), { chinh: true, tuDong: true }),
			loiRiengTu(),
		]);
	}

	gioiThieu();
	el.dataset.san = '1';
}
