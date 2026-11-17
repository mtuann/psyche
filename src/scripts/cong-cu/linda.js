// Công cụ "Bài toán Linda" (::cong-cu{ten="linda"}; D8-L2, viết lại từ ../psyche-zero/docs/assets/js/linda.js). Khuôn của
// một công cụ: đầu stroop.js.
//
// Đoạn mô tả Linda và hai phát biểu theo phiên bản chọn một trong hai của Tversky và Kahneman (1983), dịch như trang nhà
// kham-pha/tu-duy/linh-cam-va-xac-suat. Chọn xong: đáp án đúng về mặt logic (A) và số liệu của phiên bản ấy.
//
// Bản ghi (kind "linda", như site cũ): { chose: "a" | "b", correct }.

import { bieuDoCot, h, khung, khungKetLuan, lichSu, loiRiengTu, nut } from './chung/giao-dien.js';
import { them } from './chung/luu.js';

/** Số liệu nghiên cứu mà công cụ so với (hồ sơ: kiem-dinh/trai-nghiem/linda.yml). */
export const NGHIEN_CUU = {
	// tversky1983: 142 sinh viên đại học ở UBC chọn một trong hai phát biểu; 85% chọn "nhân viên ngân hàng và nhà hoạt
	// động nữ quyền" (T&F) là có khả năng hơn "nhân viên ngân hàng" (T)
	tversky1983: { soNguoi: 142, chonB: 85 },
};

export const PHAT_BIEU = {
	a: 'Linda là nhân viên ngân hàng.',
	b: 'Linda là nhân viên ngân hàng và là nhà hoạt động nữ quyền.',
};

/** Chấm: (A) luôn có khả năng ít nhất bằng (B), vì mọi người thỏa (B) đều thỏa (A). */
export const dungLogic = (chon) => chon === 'a';

let soKhoi = 0;

export function mount(el) {
	const K = khung(el);
	const N = NGHIEN_CUU.tversky1983;
	const ma = ++soKhoi;

	function hoi() {
		const ten = `pz-linda-${ma}`;
		const loi = h('p', { class: 'pz-feedback', role: 'status' });
		const lua = (k) =>
			h('label', { class: 'pz-radio' }, [h('input', { type: 'radio', name: ten, value: k, 'data-tu-dong': k === 'a' || null }), h('span', {}, [h('strong', { text: `${k.toUpperCase()}. ` }), PHAT_BIEU[k]])]);
		const form = h('form', {}, [
			h('fieldset', { class: 'pz-choice' }, [h('legend', { text: 'Theo bạn, điều nào có khả năng đúng hơn?' }), lua('a'), lua('b')]),
			loi,
			h('button', { type: 'submit', class: 'pz-nut pz-nut--chinh' }, ['Trả lời']),
		]);
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const chon = form.querySelector('input:checked')?.value;
			if (!chon) {
				loi.textContent = 'Hãy chọn một đáp án trước khi trả lời.';
				form.querySelector('input')?.focus();
				return;
			}
			traLoi(chon);
		});
		K.hien([
			h('blockquote', { class: 'pz-tinh-huong' }, [
				'Linda 31 tuổi, độc thân, thẳng thắn và rất thông minh. Cô học chuyên ngành triết học. Thời sinh viên, cô quan tâm sâu sắc đến các vấn đề phân biệt đối xử và công bằng xã hội, đồng thời tham gia các cuộc biểu tình chống vũ khí hạt nhân.',
			]),
			h('p', { class: 'pz-cc__dan' }, ['Hãy trả lời bằng linh cảm đầu tiên của bạn, đừng tính toán.']),
			form,
			loiRiengTu(),
			lichSu('linda', [['Bạn chọn', (r) => `${String(r.chose).toUpperCase()} (${r.correct ? 'đúng về logic' : 'sập bẫy'})`]]),
		]);
	}

	function traLoi(chon) {
		const dung = dungLogic(chon);
		them('linda', { chose: chon, correct: dung });
		K.bao(dung ? 'Bạn chọn A: đúng về mặt logic.' : 'Bạn chọn B. Đáp án đúng về mặt logic là A.');
		K.hien([
			h('h3', { text: 'Kết quả' }),
			khungKetLuan(dung ? 'tot' : 'chu-y', dung ? 'Đúng về mặt logic: đáp án A' : 'Đáp án đúng về mặt logic là A', [
				'Mọi người “là nhân viên ngân hàng và là nhà hoạt động nữ quyền” đều “là nhân viên ngân hàng”: nhóm (B) nằm gọn trong nhóm (A). Một nhóm con không bao giờ đông hơn nhóm chứa nó, nên ',
				h('strong', { text: 'xác suất của (B) không thể lớn hơn xác suất của (A)' }),
				'.',
			]),
			h('p', {}, [
				dung ? 'Nhiều người chọn khác bạn. ' : 'Nếu bạn chọn (B), bạn không đơn độc. ',
				`Trong một phiên bản của nghiên cứu gốc (Tversky và Kahneman, 1983), khi ${N.soNguoi} sinh viên đại học chưa học thống kê chọn giữa hai phát biểu này, `,
				h('strong', { text: `${N.chonB}%` }),
				' chọn (B).',
			]),
			bieuDoCot(
				[
					{ ten: 'Chọn (B): sập bẫy', gt: N.chonB, chu: `${N.chonB}%`, nhan: true },
					{ ten: 'Chọn (A): đúng về logic', gt: 100 - N.chonB, chu: `${100 - N.chonB}%` },
				],
				{ toiDa: 100, tieuDe: `Tỉ lệ chọn mỗi đáp án, ${N.soNguoi} sinh viên trong nghiên cứu gốc` },
			),
			h('p', {}, [
				'Vì sao ta sập bẫy? Theo cách giải thích của Tversky và Kahneman, ta không thật sự so hai xác suất mà so xem mô tả nào “giống Linda” hơn, và (B) nghe giống hơn nhiều. Các cách giải thích khác, và lỗi này vững đến đâu: xem bài ',
				h('a', { href: '/psyche/kham-pha/tu-duy/linh-cam-va-xac-suat/' }, ['Vì sao linh cảm hay đánh lừa ta?']),
				'.',
			]),
			h('p', {}, ['Ghi nhớ: thêm một chi tiết vào một giả thuyết chỉ có thể giữ nguyên hay làm giảm xác suất để nó đúng, không bao giờ làm tăng.']),
			nut('Thử lại', hoi, { chinh: true, tuDong: true }),
			loiRiengTu(),
		]);
	}

	hoi();
	el.dataset.san = '1';
}
