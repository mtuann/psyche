// Công cụ "Đo nhanh 5 chiều tính cách" (::cong-cu{ten="big-five-mini"}; D8-L2, thay 15 câu tự soạn của
// ../psyche-zero/docs/assets/js/big-five-mini.js). Khuôn của một công cụ: đầu stroop.js.
//
// Thang đo: Mini-IPIP (Donnellan, Oswald, Baird và Lucas, 2006), 20 câu, 4 câu mỗi chiều, câu và khóa chấm theo trang
// "Mini-IPIP Scoring Key" của IPIP (ipip.ori.org; câu IPIP thuộc phạm vi công cộng). Thang trả lời 5 bậc và cách chấm theo
// "IPIP Scale Scoring Instructions": câu thuận 1–5, câu nghịch 5–1, điểm chiều là tổng 4 câu (4–20). Câu tiếng Việt: 18 câu
// lấy từ bản dịch tiếng Việt các câu IPIP của Kate E. Walton (trang "Vietnamese Translation of AB5C Facets" của IPIP), 2 câu
// do site dịch (bản dịch IPIP ghi "Feel others' emotion", dịch "Cảm nhận được tình cảm của người khác": site dịch
// "cảm xúc" cho sát chữ emotions; câu "Am the life of the party" bản IPIP dịch thành "Cuộc
// sống với tôi giống như một bữa tiệc", sai nghĩa). Lời dẫn và nhãn thang do site dịch. Bản tiếng Việt này chưa được kiểm
// chứng hay chuẩn hóa trên người Việt. Thứ tự câu xen kẽ các chiều (IPIP khuyên không xếp câu cùng thang liền nhau).
//
// Không có ngưỡng "cao, thấp": IPIP khuyên không xếp người vào loại, và chuẩn so sánh phải tính trên mẫu của chính người
// dùng thang; site không có mẫu người Việt, nên chỉ hiện điểm trên dải 4–20.
//
// Bản ghi (kind "bigfive", như site cũ): { scores: { O, C, E, A, N } (trung bình 1–5, như site cũ), answers, thang:
// "mini-ipip", tong: { O, C, E, A, N } (4–20) }. Bản ghi cũ (15 câu tự soạn) không có `thang`. Mục "Các lần làm trước"
// hiện tổng 4–20 cho bản Mini-IPIP (cùng thang với màn kết quả), trung bình 1–5 cho bản cũ (diemLichSu).

import { batPhimTat, h, khung, lichSu, loiRiengTu, nut, so } from './chung/giao-dien.js';
import { them } from './chung/luu.js';

/** Năm chiều, theo tên của Mini-IPIP (khóa O, C, E, A, N như bản ghi của site cũ; O là Intellect/Imagination). */
export const CHIEU = [
	{ k: 'E', ten: 'Hướng ngoại', en: 'Extraversion' },
	{ k: 'A', ten: 'Dễ chịu', en: 'Agreeableness' },
	{ k: 'C', ten: 'Tận tâm', en: 'Conscientiousness' },
	{ k: 'N', ten: 'Bất ổn cảm xúc', en: 'Neuroticism' },
	{ k: 'O', ten: 'Trí tuệ, trí tưởng tượng', en: 'Intellect/Imagination' },
];

/** 20 câu: chiều, khóa (+ thuận, − nghịch), câu tiếng Anh của IPIP, câu tiếng Việt, nguồn bản dịch ("ipip" hay "site"). */
export const CAU = [
	{ k: 'E', khoa: 1, en: 'Am the life of the party.', vi: 'Là người làm cho các cuộc vui sôi nổi hẳn lên.', dich: 'site' },
	{ k: 'A', khoa: 1, en: "Sympathize with others' feelings.", vi: 'Đồng cảm với mọi người.', dich: 'ipip' },
	{ k: 'C', khoa: 1, en: 'Get chores done right away.', vi: 'Thường giải quyết tức thì các việc lặt vặt.', dich: 'ipip' },
	{ k: 'N', khoa: 1, en: 'Have frequent mood swings.', vi: 'Tính khí thay đổi thất thường.', dich: 'ipip' },
	{ k: 'O', khoa: 1, en: 'Have a vivid imagination.', vi: 'Có khả năng tưởng tượng sinh động.', dich: 'ipip' },
	{ k: 'E', khoa: -1, en: "Don't talk a lot.", vi: 'Không nói nhiều.', dich: 'ipip' },
	{ k: 'A', khoa: -1, en: "Am not interested in other people's problems.", vi: 'Không quan tâm đến những vấn đề mà người khác gặp phải.', dich: 'ipip' },
	{ k: 'C', khoa: -1, en: 'Often forget to put things back in their proper place.', vi: 'Thường quên để các thứ trở lại đúng chỗ của nó sau khi dùng xong.', dich: 'ipip' },
	{ k: 'N', khoa: -1, en: 'Am relaxed most of the time.', vi: 'Gần như lúc nào cũng thư thái, thanh thản.', dich: 'ipip' },
	{ k: 'O', khoa: -1, en: 'Am not interested in abstract ideas.', vi: 'Không quan tâm đến những ý tưởng trừu tượng.', dich: 'ipip' },
	{ k: 'E', khoa: 1, en: 'Talk to a lot of different people at parties.', vi: 'Nói chuyện với nhiều người khác nhau trong các bữa tiệc mà mình tham dự.', dich: 'ipip' },
	{ k: 'A', khoa: 1, en: "Feel others' emotions.", vi: 'Cảm nhận được cảm xúc của người khác.', dich: 'site' },
	{ k: 'C', khoa: 1, en: 'Like order.', vi: 'Thích sự trật tự, nề nếp.', dich: 'ipip' },
	{ k: 'N', khoa: 1, en: 'Get upset easily.', vi: 'Dễ lo lắng, buồn phiền.', dich: 'ipip' },
	{ k: 'O', khoa: -1, en: 'Have difficulty understanding abstract ideas.', vi: 'Gặp khó trong việc hiểu các ý tưởng trừu tượng.', dich: 'ipip' },
	{ k: 'E', khoa: -1, en: 'Keep in the background.', vi: 'Kín đáo, không phô trương.', dich: 'ipip' },
	{ k: 'A', khoa: -1, en: 'Am not really interested in others.', vi: 'Không thực sự quan tâm đến người khác.', dich: 'ipip' },
	{ k: 'C', khoa: -1, en: 'Make a mess of things.', vi: 'Hay làm mọi thứ rối tinh, rối mù.', dich: 'ipip' },
	{ k: 'N', khoa: -1, en: 'Seldom feel blue.', vi: 'Ít khi cảm thấy chán nản.', dich: 'ipip' },
	{ k: 'O', khoa: -1, en: 'Do not have a good imagination.', vi: 'Khả năng tưởng tượng chưa tốt.', dich: 'ipip' },
];

/** Thang 5 bậc của IPIP (Very Inaccurate … Very Accurate), site dịch. */
export const THANG = ['Rất không đúng', 'Khá không đúng', 'Không đúng cũng không sai', 'Khá đúng', 'Rất đúng'];

// ---------- Tính toán (hàm thuần) ----------

/** Điểm một câu: thuận 1–5, nghịch 6 − lựa chọn. */
export const diemCau = (cau, chon) => (cau.khoa > 0 ? chon : 6 - chon);

/**
 * Chấm: traLoi[i] là lựa chọn 1–5 của câu i. Trả về { tong: {k: 4–20}, scores: {k: trung bình 1–5, 2 chữ số} }; chiều
 * thiếu câu thì null.
 */
export function chamDiem(traLoi) {
	const tong = {};
	const dem = {};
	CAU.forEach((c, i) => {
		const a = traLoi[i];
		if (!Number.isInteger(a) || a < 1 || a > 5) return;
		tong[c.k] = (tong[c.k] ?? 0) + diemCau(c, a);
		dem[c.k] = (dem[c.k] ?? 0) + 1;
	});
	const ra = { tong: {}, scores: {} };
	for (const { k } of CHIEU) {
		const du = dem[k] === 4;
		ra.tong[k] = du ? tong[k] : null;
		ra.scores[k] = du ? Math.round((tong[k] / 4) * 100) / 100 : null;
	}
	return ra;
}

/** Tên bản và thang của một lần làm trước: bản Mini-IPIP hiện tổng 4–20 như màn kết quả; bản cũ chỉ có trung bình 1–5. */
export const banLichSu = (r) => (laMiniIpip(r) ? 'Mini-IPIP (tổng 4–20)' : 'bản cũ 15 câu (trung bình 1–5)');
const laMiniIpip = (r) => r.thang === 'mini-ipip' && r.tong != null;

/**
 * Điểm chiều k của một lần làm trước, cùng thang với màn kết quả: bản Mini-IPIP lấy tổng 4–20 (r.tong); bản cũ 15 câu
 * không có tổng nên giữ trung bình 1–5 (r.scores), cột "Bản" ghi rõ thang.
 */
export function diemLichSu(r, k) {
	if (laMiniIpip(r)) return r.tong[k] == null ? '—' : String(r.tong[k]);
	return r.scores?.[k] == null ? '—' : so(r.scores[k], 1);
}

// ---------- Giao diện ----------

export function mount(el) {
	const K = khung(el);
	let traLoi = [];
	let i = 0;
	let goPhim = null;
	const thoi = () => {
		goPhim?.();
		goPhim = null;
	};

	function gioiThieu() {
		thoi();
		traLoi = [];
		i = 0;
		K.hien([
			h('p', { class: 'pz-cc__dan' }, [
				`${CAU.length} câu, khoảng 3 phút. Với mỗi câu, chọn mức mô tả đúng về bạn. Không có câu trả lời đúng hay sai.`,
			]),
			h('p', { class: 'pz-small' }, [
				'Thang Mini-IPIP (20 câu, 4 câu mỗi chiều) của Donnellan và cộng sự (2006). Bản tiếng Việt chưa được chuẩn hóa trên người Việt; đây là trải nghiệm, không phải trắc nghiệm tâm lý, không dùng để đánh giá người khác hay tuyển dụng.',
			]),
			nut('Bắt đầu', hoi, { chinh: true, tuDong: true }),
			loiRiengTu(),
			lichSu('bigfive', [
				['Bản', banLichSu],
				...CHIEU.map(({ k }) => [k, (r) => diemLichSu(r, k)]),
			]),
		]);
	}

	function hoi() {
		thoi();
		const c = CAU[i];
		const chon = (v) => {
			traLoi[i] = v;
			i += 1;
			if (i < CAU.length) hoi();
			else ketQua();
		};
		K.hien([
			h('p', { class: 'pz-counter', text: `Câu ${i + 1} / ${CAU.length}` }),
			h('p', { class: 'pz-small', text: 'Hãy mô tả bạn như bạn thường là hiện nay, không phải như bạn mong muốn, so với những người cùng giới, cùng lứa tuổi mà bạn biết.' }),
			h('fieldset', { class: 'pz-choice pz-thang' }, [
				h('legend', { class: 'pz-cau-hoi', text: c.vi }),
				...THANG.map((ten, v) =>
					h(
						'button',
						{ type: 'button', class: traLoi[i] === v + 1 ? 'pz-nut pz-nut--chinh' : 'pz-nut', 'aria-keyshortcuts': String(v + 1), 'aria-pressed': traLoi[i] === v + 1 ? 'true' : 'false', 'data-tu-dong': v === 0 || null, onclick: () => chon(v + 1) },
						[h('span', { class: 'pz-thang__so', 'aria-hidden': 'true', text: String(v + 1) }), ten],
					),
				),
			]),
			i > 0
				? nut('Quay lại câu trước', () => {
						i -= 1;
						hoi();
					})
				: null,
			h('p', { class: 'pz-small' }, ['Bàn phím: phím 1–5 để chọn.']),
		]);
		goPhim = batPhimTat((k) => (/^[1-5]$/.test(k) ? (chon(+k), true) : false));
	}

	function ketQua() {
		thoi();
		const d = chamDiem(traLoi);
		them('bigfive', { scores: d.scores, answers: [...traLoi], thang: 'mini-ipip', tong: d.tong });
		K.bao(`Đã có kết quả. ${CHIEU.map(({ k, ten }) => `${ten}: ${d.tong[k]} trên dải 4 đến 20`).join('. ')}.`);
		K.hien([
			h('h3', { text: 'Kết quả của bạn' }),
			h('p', {}, ['Điểm mỗi chiều là tổng 4 câu, từ 4 đến 20 (câu nghịch được đảo điểm). Vạch giữa là điểm giữa của dải (12), không phải điểm trung bình của người Việt: site chưa có số liệu ấy.']),
			h(
				'ul',
				{ class: 'pz-thang-diem' },
				CHIEU.map(({ k, ten, en }) =>
					h('li', {}, [
						h('span', { class: 'pz-thang-diem__ten' }, [h('strong', { text: ten }), ` (${en})`]),
						h('span', { class: 'pz-thang-diem__truc', 'aria-hidden': 'true' }, [h('span', { class: 'pz-thang-diem__diem', style: { '--x': `${((d.tong[k] - 4) / 16) * 100}%` } })]),
						h('span', { class: 'pz-thang-diem__so', text: `${d.tong[k]} / 20` }),
					]),
				),
			),
			h('p', {}, [
				'Mỗi chiều là một dải liên tục, không chia người thành “kiểu”. Điểm của một lần làm với 4 câu mỗi chiều dao động khá nhiều; đừng đọc chênh lệch một vài điểm như một khác biệt thật. Năm chiều nghĩa là gì: xem bài ',
				h('a', { href: '/psyche/kham-pha/tinh-cach/big-five/' }, ['Tính cách có mấy chiều?']),
				'.',
			]),
			h('details', { class: 'pz-mo-them' }, [
				h('summary', { text: 'Cách tính điểm' }),
				h('ul', {}, [
					h('li', {}, ['Câu thuận: chọn 1 được 1 điểm … chọn 5 được 5 điểm. Câu nghịch (ví dụ “Không nói nhiều.” với chiều Hướng ngoại): đảo lại, chọn 5 được 1 điểm.']),
					h('li', {}, ['Điểm chiều = tổng 4 câu của chiều ấy, theo hướng dẫn chấm của IPIP.']),
					h('li', {}, [`Câu nghịch trong bài này: câu ${CAU.map((c, j) => (c.khoa < 0 ? j + 1 : null)).filter(Boolean).join(', ')}.`]),
				]),
			]),
			h('div', { class: 'pz-canh-bao' }, [
				h('p', { class: 'pz-canh-bao__tieu-de', text: 'Một lần trải nghiệm, không phải trắc nghiệm' }),
				h('p', {}, ['Bản tiếng Việt này chưa được kiểm chứng trên người Việt. Đừng dùng kết quả để quyết định điều gì quan trọng, để đánh giá người khác hay tuyển dụng. Big Five mô tả tính cách bình thường, không phải công cụ chẩn đoán.']),
			]),
			nut('Làm lại', gioiThieu, { chinh: true, tuDong: true }),
			loiRiengTu(),
		]);
	}

	gioiThieu();
	el.dataset.san = '1';
}
