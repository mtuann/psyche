// Công cụ "Hiệu ứng mỏ neo" (::cong-cu{ten="neo-gia"}; D8-L2, viết lại từ ../psyche-zero/docs/assets/js/neo-gia.js). Khuôn của
// một công cụ: đầu stroop.js.
//
// Người dùng được xếp ngẫu nhiên (50/50) vào nhóm neo thấp hay neo cao, rồi trả lời hai câu về Việt Nam, mỗi câu hai bước
// như thiết kế của Tversky và Kahneman (1974): câu so sánh ("lớn hơn hay nhỏ hơn [neo]?"), rồi con số ước lượng. Một người
// không cho kết luận gì về hiệu ứng: công cụ nói rõ điều ấy.
//
// Bản ghi (kind "anchoring", như site cũ): { group: "low" | "high", answers: [{ q, anchor, compare: "higher" | "lower",
// estimate }] }. Câu 2 của site cũ (quãng đường Hà Nội – TP. Hồ Chí Minh, id "quang-duong") đã thay bằng câu tỉ lệ dân
// thành thị (id "thanh-thi"), vì có số chính thức cùng nguồn; bản ghi cũ giữ nguyên.

import { h, khung, khungKetLuan, lichSu, loiRiengTu, nut, so } from './chung/giao-dien.js';
import { them } from './chung/luu.js';

/** Số liệu nghiên cứu mà công cụ so với (hồ sơ: kiem-dinh/trai-nghiem/neo-gia.yml). */
export const NGHIEN_CUU = {
	// tversky1974: vòng quay 0–100 dừng ở 10 hay 65; ước lượng trung vị tỉ lệ nước châu Phi trong Liên Hợp Quốc: 25 và 45
	tversky1974: { neo: [10, 65], trungVi: [25, 45] },
};

/** Hai câu hỏi. Số thật: thông cáo báo chí của Cục Thống kê, 1/2026 (dân số trung bình năm 2025, ước tính). */
export const CAU_HOI = [
	{
		id: 'dan-so',
		tieuDe: 'Câu 1: Dân số Việt Nam',
		chuDe: 'dân số Việt Nam',
		donVi: 'triệu người',
		hoi: 'Vậy theo bạn, dân số Việt Nam hiện nay là khoảng bao nhiêu triệu người?',
		neo: { low: 40, high: 200 },
		that: 102.3,
		ghiChu: 'dân số trung bình năm 2025, ước tính (Cục Thống kê, thông cáo báo chí tháng 1/2026)',
	},
	{
		id: 'thanh-thi',
		tieuDe: 'Câu 2: Dân số thành thị',
		chuDe: 'tỉ lệ dân số Việt Nam sống ở thành thị',
		donVi: '%',
		hoi: 'Vậy theo bạn, bao nhiêu phần trăm dân số Việt Nam sống ở thành thị?',
		neo: { low: 15, high: 70 },
		that: 38.6,
		ghiChu: 'năm 2025, ước tính (Cục Thống kê, thông cáo báo chí tháng 1/2026)',
	},
];

// ---------- Tính toán (hàm thuần) ----------

export const xepNhom = (rand = Math.random) => (rand() < 0.5 ? 'low' : 'high');

/** Đọc con số ước lượng (dấu phẩy thập phân, dấu chấm ngăn hàng nghìn, khoảng trắng); không hợp lệ hay không dương thì null. */
export function docUocLuong(chu) {
	let s = String(chu ?? '').trim().replace(/\s/g, '').replace(/%$/, '');
	if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, '');
	s = s.replace(',', '.');
	if (!/^\d+(\.\d+)?$/.test(s)) return null;
	const x = Number(s);
	return x > 0 ? x : null;
}

const chuSo = (c, x) => `${so(x, Number.isInteger(x) ? 0 : 1)} ${c.donVi}`.replace(' %', '%');

// ---------- Giao diện ----------

let soKhoi = 0;

export function mount(el) {
	const K = khung(el);
	const ma = ++soKhoi;
	let st = null;

	function gioiThieu() {
		st = null;
		K.hien([
			h('p', { class: 'pz-cc__dan' }, [
				'Bạn sẽ được xếp ',
				h('strong', { text: 'ngẫu nhiên' }),
				' vào một trong hai nhóm, rồi ước lượng 2 con số về Việt Nam. Mỗi câu có hai bước: trước hết trả lời “lớn hơn hay nhỏ hơn” một con số cho trước, sau đó đưa ra con số của riêng bạn.',
			]),
			h('p', { class: 'pz-small' }, ['Đừng tra cứu, hãy đoán theo linh cảm. Đây là minh họa với một người, không phải một thí nghiệm.']),
			nut(
				'Bắt đầu',
				() => {
					st = { group: xepNhom(), qi: 0, answers: [] };
					soSanh();
				},
				{ chinh: true, tuDong: true },
			),
			loiRiengTu(),
			lichSu('anchoring', [
				['Nhóm neo', (r) => (r.group === 'low' ? 'thấp' : 'cao')],
				['Ước lượng', (r) => (r.answers || []).map((a) => so(a.estimate, Number.isInteger(a.estimate) ? 0 : 1)).join('; ')],
			]),
		]);
	}

	function soSanh() {
		const c = CAU_HOI[st.qi];
		const neo = c.neo[st.group];
		const chon = (cmp) => {
			st.answers[st.qi] = { q: c.id, anchor: neo, compare: cmp, estimate: null };
			uocLuong();
		};
		K.hien([
			h('p', { class: 'pz-counter', text: `Câu hỏi ${st.qi + 1} / ${CAU_HOI.length}, bước 1/2` }),
			h('h3', { text: c.tieuDe }),
			h('p', { class: 'pz-cc__dan', text: `Theo bạn, ${c.chuDe} lớn hơn hay nhỏ hơn ${chuSo(c, neo)}?` }),
			h('div', { class: 'pz-cc__nut', role: 'group', 'aria-label': 'Trả lời so sánh' }, [nut('Lớn hơn', () => chon('higher'), { chinh: true, tuDong: true }), nut('Nhỏ hơn', () => chon('lower'))]),
		]);
	}

	function uocLuong() {
		const c = CAU_HOI[st.qi];
		const qi = st.qi;
		const id = `pz-neo-${ma}-${qi}`;
		const loi = h('p', { class: 'pz-feedback', role: 'alert' });
		const o = h('input', { id, class: 'pz-o-nhap pz-o-so', type: 'text', inputmode: 'decimal', autocomplete: 'off', 'aria-describedby': `${id}-g`, 'data-tu-dong': true });
		const form = h('form', { class: 'pz-hang-nhap' }, [
			h('label', { for: id, text: c.hoi }),
			h('p', { id: `${id}-g`, class: 'pz-small', text: `Chỉ nhập con số (đơn vị: ${c.donVi}), ví dụ ${qi === 0 ? '95' : '25'}.` }),
			h('span', { class: 'pz-hang-nhap__o' }, [o, h('button', { type: 'submit', class: 'pz-nut pz-nut--chinh' }, ['Tiếp tục'])]),
			loi,
		]);
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!st || st.qi !== qi) return;
			const x = docUocLuong(o.value);
			if (x == null) {
				loi.textContent = 'Hãy nhập một con số lớn hơn 0.';
				return o.focus();
			}
			st.answers[qi].estimate = Math.round(x * 100) / 100;
			st.qi += 1;
			if (st.qi < CAU_HOI.length) soSanh();
			else ketThuc();
		});
		K.hien([h('p', { class: 'pz-counter', text: `Câu hỏi ${qi + 1} / ${CAU_HOI.length}, bước 2/2` }), h('h3', { text: c.tieuDe }), form]);
	}

	function ketThuc() {
		const { group, answers } = st;
		const T = NGHIEN_CUU.tversky1974;
		them('anchoring', { group, answers });
		const nhom = group === 'low' ? 'thấp' : 'cao';
		K.bao(`Đã xong. Bạn thuộc nhóm neo ${nhom}.`);
		K.hien([
			h('h3', { text: 'Kết quả của bạn' }),
			h('p', {}, ['Bạn được xếp vào ', h('strong', { text: `nhóm neo ${nhom}` }), '.']),
			...answers.flatMap((a, i) => {
				const c = CAU_HOI[i];
				return [
					h('h4', { text: c.tieuDe }),
					h('ul', {}, [
						h('li', {}, ['Con số neo bạn nhận: ', h('strong', { text: chuSo(c, a.anchor) }), '.']),
						h('li', {}, ['Ước lượng của bạn: ', h('strong', { text: chuSo(c, a.estimate) }), '.']),
						h('li', {}, ['Số chính thức: ', h('strong', { text: chuSo(c, c.that) }), ` (${c.ghiChu}).`]),
					]),
				];
			}),
			h('h4', { text: 'Nghiên cứu gốc' }),
			h('p', {}, [
				`Tversky và Kahneman (1974) cho người tham gia quay một vòng quay số 0–100 (dừng ở ${T.neo[0]} hay ${T.neo[1]}), rồi hỏi hai bước như trên về tỉ lệ nước châu Phi trong Liên Hợp Quốc. Ước lượng trung vị của hai nhóm là ${T.trungVi[0]} và ${T.trungVi[1]}. Chi tiết: bài `,
				h('a', { href: '/psyche/kham-pha/tu-duy/linh-cam-va-xac-suat/' }, ['Vì sao linh cảm hay đánh lừa ta?']),
				'.',
			]),
			khungKetLuan('chu-y', 'Một người chưa nói được gì về hiệu ứng', [
				'Ước lượng của bạn có thể cao hay thấp vì nhiều lý do khác (kiến thức sẵn có, đoán, làm tròn). Hiệu ứng mỏ neo là khác biệt giữa ',
				h('strong', { text: 'hai nhóm người' }),
				' nhận hai con số neo khác nhau, không đo được từ một lần làm của một người.',
			]),
			nut('Làm lại', gioiThieu, { chinh: true, tuDong: true }),
			loiRiengTu(),
		]);
		st = null;
	}

	gioiThieu();
	el.dataset.san = '1';
}
