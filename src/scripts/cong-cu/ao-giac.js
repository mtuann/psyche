// Công cụ "Ảo giác Müller-Lyer" (::cong-cu{ten="ao-giac"}; D8-L1, viết lại từ
// ../psyche-zero/docs/assets/js/ao-giac-thi-giac.js). Khuôn của một công cụ: đầu stroop.js.
//
// Hai đoạn thẳng: đoạn trên cố định, cánh hướng vào (<——>); đoạn dưới chỉnh bằng thanh trượt (50–150% đoạn trên), cánh
// hướng ra (>——<). Người dùng chỉnh tới khi hai đoạn "nhìn bằng nhau", rồi xem độ dài thật và độ lệch (%).

import { bieuDoCot, h, khung, lichSu, loiRiengTu, nut, s, so, thuGon } from './chung/giao-dien.js';
import { them } from './chung/luu.js';

/** Số liệu nghiên cứu mà công cụ so với (hồ sơ: kiem-dinh/trai-nghiem/ao-giac-thi-giac.yml). */
export const NGHIEN_CUU = {
	// segall1966, theo henrich2010 (Hình 2 và lời bình): điểm bằng nhau chủ quan (PSE) = đoạn cánh hướng vào (<——>) phải
	// dài hơn đoạn cánh hướng ra (>——<) bao nhiêu % thì hai đoạn trông bằng nhau; 16 xã hội. Sinh viên đại học Mỹ ở đầu cao
	// nhất, "khoảng một phần năm"; người San ở Kalahari không phân biệt được với 0
	segall1966: { sinhVienMy: 20, soXaHoi: 16 },
};

/** Độ dài thật (đơn vị của hình) của đoạn cố định; thanh trượt tính theo % của nó. */
export const DAI_CO_DINH = 220;
export const TRUOT = { min: 50, max: 150 };

// ---------- Tính toán (hàm thuần) ----------

/**
 * Cùng lần chỉnh, tính theo cách của Segall và cộng sự: đoạn cánh hướng vào (cố định) dài hơn đoạn cánh hướng ra (bạn
 * chỉnh bằng pct% đoạn trên) bao nhiêu %.
 */
export const theoSegall = (pct) => (100 / pct - 1) * 100;

/** Độ lệch (%): dương khi đoạn cánh hướng ra được chỉnh NGẮN hơn đoạn cố định, đúng hướng ảo giác. */
export const doLech = (that, chinh) => ((that - chinh) / that) * 100;

/** Vị trí bắt đầu của thanh trượt, ngẫu nhiên trong 75–125%, để bớt hiệu ứng neo vào điểm xuất phát. */
export const batDauNgauNhien = (rand = Math.random) => 75 + Math.floor(rand() * 51);

/** Mức của độ lệch để diễn giải. */
export function muc(e) {
	if (e < -5) return 'nguoc';
	if (e <= 5) return 'gan-khong';
	if (e < 12) return 'nhe';
	if (e <= 25) return 'tham-khao';
	return 'lon';
}

export function dienGiai(e) {
	return {
		nguoc: 'Bạn chỉnh đoạn cánh hướng ra DÀI HƠN đoạn cố định, ngược với hướng ảo giác thường gặp. Có thể bạn đã "đo" bằng cách nào đó (ví dụ ướm bằng ngón tay), hoặc lần thử này mắt bạn ít bị ảo giác đánh lừa.',
		'gan-khong': 'Bạn gần như chỉnh đúng độ dài thật. Trong lần thử này, mắt bạn ít bị ảo giác "lừa".',
		nhe: 'Bạn lệch nhẹ theo đúng hướng của ảo giác: đoạn cánh hướng ra "nhìn" dài hơn độ dài thật của nó.',
		'tham-khao': 'Bạn lệch rõ theo đúng hướng của ảo giác: đoạn cánh hướng ra "nhìn" dài hơn hẳn độ dài thật của nó.',
		lon: 'Bạn lệch rất nhiều theo hướng của ảo giác. Điều này vẫn có thể xảy ra ở một lần đo, nhất là khi thanh trượt bắt đầu ở vị trí xa.',
	}[muc(e)];
}

// ---------- Giao diện ----------

/** Một đoạn thẳng có cánh (SVG): kieu "vao" (<——>) hay "ra" (>——<); chỉ để nhìn, chữ mô tả nằm ngoài hình. */
function hinhDoan(kieu, dai) {
	const W = 560;
	const y = 50;
	const x0 = (W - dai) / 2;
	const x1 = x0 + dai;
	const goc = (35 * Math.PI) / 180;
	const dx = Math.cos(goc) * 26;
	const dy = Math.sin(goc) * 26;
	const r = (x) => Math.round(x * 10) / 10;
	const huong = kieu === 'vao' ? 1 : -1;
	const net = [
		[x0, y, x1, y],
		[x0, y, x0 + huong * dx, y - dy],
		[x0, y, x0 + huong * dx, y + dy],
		[x1, y, x1 - huong * dx, y - dy],
		[x1, y, x1 - huong * dx, y + dy],
	];
	return s('svg', { viewBox: `0 0 ${W} 100`, class: 'pz-hinh-cc', 'aria-hidden': 'true', focusable: 'false' }, [
		s(
			'g',
			{ stroke: 'currentColor', 'stroke-width': 4, 'stroke-linecap': 'round' },
			net.map(([a, b, c, d]) => s('line', { x1: r(a), y1: r(b), x2: r(c), y2: r(d) })),
		),
	]);
}

let soKhoi = 0;

export function mount(el) {
	const K = khung(el);
	const ma = ++soKhoi;
	const G = NGHIEN_CUU.segall1966;

	const cacLan = () =>
		lichSu('illusion', [
			['Độ lệch', (r) => `${so(r.errorPct, 1)}%`],
			['Bạn chỉnh', (r) => `${r.setPct}% đoạn trên`],
		]);

	function gioiThieu() {
		K.hien([
			h('p', { class: 'pz-cc__dan' }, [
				'Nhìn hai đoạn thẳng. Đoạn trên có cánh hướng vào, đoạn dưới có cánh hướng ra. Kéo thanh trượt để chỉnh đoạn dưới sao cho hai đoạn NHÌN BẰNG NHAU theo mắt bạn, rồi bấm "Chốt đáp án".',
			]),
			h('p', { class: 'pz-small' }, [
				'Công cụ này cần thị giác: nếu bạn dùng trình đọc màn hình, hãy đọc phần giải thích bên dưới công cụ. Mẹo: đừng đo bằng thước hay ngón tay, hãy tin vào mắt mình ở lần thử đầu tiên.',
			]),
			nut('Bắt đầu', lam, { chinh: true, tuDong: true }),
			loiRiengTu(),
			cacLan(),
		]);
	}

	function lam() {
		const id = `pz-ml-${ma}`;
		const o = h('div', { class: 'pz-hinh-o' });
		const gt = h('p', { class: 'pz-counter', 'aria-live': 'polite' });
		const truot = h('input', {
			id,
			type: 'range',
			min: TRUOT.min,
			max: TRUOT.max,
			step: 1,
			value: batDauNgauNhien(),
			class: 'pz-truot',
			'aria-valuetext': '',
		});
		const ve = () => {
			const pct = +truot.value;
			o.replaceChildren(hinhDoan('ra', (DAI_CO_DINH * pct) / 100));
			truot.setAttribute('aria-valuetext', `${pct}% đoạn trên`);
			gt.textContent = `Đoạn dưới đang bằng ${pct}% đoạn trên (theo thanh trượt).`;
		};
		truot.addEventListener('input', ve);
		ve();
		K.hien([
			h('div', { class: 'pz-hinh-o' }, [hinhDoan('vao', DAI_CO_DINH)]),
			h('p', { class: 'pz-chu-hinh', text: 'Đoạn trên (cố định, cánh hướng vào)' }),
			o,
			h('p', { class: 'pz-chu-hinh', text: 'Đoạn dưới (chỉnh được, cánh hướng ra)' }),
			h('div', { class: 'pz-hang-truot' }, [h('label', { for: id, text: 'Kéo để chỉnh độ dài đoạn dưới (dùng được phím mũi tên):' }), truot, gt]),
			nut('Chốt đáp án', () => ketQua(+truot.value), { chinh: true, tuDong: true }),
		]);
	}

	function ketQua(pct) {
		const dai = (DAI_CO_DINH * pct) / 100;
		const e = Math.round(doLech(DAI_CO_DINH, dai) * 10) / 10;
		const segall = theoSegall(pct);
		them('illusion', { errorPct: e, setPct: pct });
		K.bao(`Đã chốt. Bạn lệch ${so(e, 1)} phần trăm.`);
		K.hien([
			h('h3', { text: 'Kết quả của bạn' }),
			h('p', { class: 'pz-big-number' }, [h('strong', { text: `${so(e, 1)}%` }), ' là độ lệch của bạn']),
			h('p', {}, [dienGiai(e)]),
			bieuDoCot(
				[
					{ ten: 'Đoạn trên (cánh hướng vào)', gt: DAI_CO_DINH, chu: `${DAI_CO_DINH} px` },
					{ ten: 'Đoạn dưới (cánh hướng ra), bạn chỉnh', gt: dai, chu: `${so(dai)} px`, nhan: true },
				],
				{ toiDa: (DAI_CO_DINH * TRUOT.max) / 100, tieuDe: 'Độ dài thật của hai đoạn, bỏ cánh đi' },
			),
			h('p', { class: 'pz-small' }, [
				`Bạn chỉnh đoạn dưới bằng ${pct}% đoạn trên. `,
				e > 0 ? 'Vì đoạn cánh hướng ra "nhìn" dài hơn thật, bạn đã chỉnh nó ngắn lại, đúng hướng ảo giác.' : 'Bạn chỉnh đoạn cánh hướng ra dài bằng hoặc dài hơn đoạn cố định.',
			]),
			h('h4', { text: 'So với nghiên cứu' }),
			h('p', {}, [
				`Nghiên cứu xuyên văn hóa của Segall, Campbell và Herskovits (sách năm 1966, ${G.soXaHoi} xã hội) đo ảo giác theo cách khác: đoạn cánh hướng vào phải dài hơn đoạn cánh hướng ra bao nhiêu phần trăm thì hai đoạn trông bằng nhau. Tính theo cách ấy, lần chỉnh của bạn là `,
				h('strong', { text: `${so(segall, 1)}%` }),
				'.',
			]),
			bieuDoCot(
				[
					{ ten: 'Bạn', gt: Math.max(0, segall), chu: `${so(segall, 1)}%`, nhan: true },
					{ ten: 'Sinh viên đại học Mỹ (Segall và cộng sự)', gt: G.sinhVienMy, chu: 'khoảng 20%' },
					{ ten: 'Người San, Kalahari (Segall và cộng sự)', gt: 0, chu: 'gần như 0%' },
				],
				{ tieuDe: 'Đoạn cánh hướng vào phải dài hơn bao nhiêu % để trông bằng đoạn cánh hướng ra' },
			),
			h('p', {}, [
				'Theo Henrich và cộng sự (2010) kể lại, sinh viên đại học Mỹ đứng ở đầu cao nhất: trung bình cần đoạn ấy dài hơn khoảng một phần năm; người San ở Kalahari gần như không bị ảo giác. ',
				'Các con số này là tham khảo, không phải "chuẩn" mà bạn phải đạt; bằng chứng về khác biệt giữa các nền văn hóa nay đang bị phản biện (xem mục Mức độ chắc chắn bên dưới).',
			]),
			thuGon('Vì sao con số của bạn có thể khác?', [
				'Thanh trượt bắt đầu ở vị trí ngẫu nhiên (75–125%), và điểm xuất phát có thể "neo" đáp án của bạn.',
				'Đây chỉ là một lần đo; mỗi lần chỉnh lại có thể cho số khác nhau.',
				'Góc và độ dài cánh, độ dày nét vẽ và kích thước màn hình đều ảnh hưởng đến độ mạnh của ảo giác.',
				'Bạn biết trước đây là ảo giác; sự đề phòng có thể làm bạn chỉnh khác đi.',
			]),
			nut('Làm lại', gioiThieu, { chinh: true, tuDong: true }),
			loiRiengTu(),
			cacLan(),
		]);
	}

	gioiThieu();
	el.dataset.san = '1';
}
