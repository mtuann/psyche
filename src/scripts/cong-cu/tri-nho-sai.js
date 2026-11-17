// Công cụ "Trí nhớ sai" kiểu DRM (::cong-cu{ten="tri-nho-sai"}; D8-L2, viết lại từ ../psyche-zero/docs/assets/js/tri-nho-sai.js).
// Khuôn của một công cụ: đầu stroop.js.
//
// Học 12 từ cùng chủ đề giấc ngủ (không có từ mồi "ngủ"), mỗi từ hiện 1,2 giây, nghỉ 0,3 giây (khoảng 1,5 giây mỗi từ, như
// nhịp đọc của thí nghiệm 1 ở Roediger và McDermott, 1995). Rồi nhận diện 18 từ theo thứ tự ngẫu nhiên: 12 từ đã học, từ
// mồi, 5 từ nhiễu không liên quan; trả lời "Đã thấy" (phím D) hay "Chưa thấy" (phím C). Danh sách tiếng Việt do site soạn
// theo mẫu danh sách "sleep" của bài gốc, chưa chuẩn hóa độ mạnh liên tưởng.
//
// Bản ghi (kind "falsememory", như site cũ): { hits, of, lureYes, faUnrelated }.

import { batPhimTat, bieuDoCot, h, khung, khungKetLuan, lichSu, loiRiengTu, nut, thuGon } from './chung/giao-dien.js';
import { them } from './chung/luu.js';
import { tron } from './chung/thong-ke.js';

/** Số liệu nghiên cứu mà công cụ so với (hồ sơ: kiem-dinh/trai-nghiem/tri-nho-sai.yml). */
export const NGHIEN_CUU = {
	// roediger1995, Thí nghiệm 1: 36 sinh viên, 6 danh sách 12 từ, đọc to khoảng 1,5 giây mỗi từ; nhớ lại tự do ngay sau
	// mỗi danh sách: từ mồi được "nhớ" ra ở 40% số danh sách. Bài nhận diện sau đó (Bảng 1, đánh giá 3 hay 4): từ mồi bị
	// nhận nhầm 84%, từ đã học được nhận đúng 86%.
	tn1: { soNguoi: 36, soDanhSach: 6, soTu: 12, nhoNham: 40, nhanNhamMoi: 84, nhanDung: 86 },
	// roediger1995, Thí nghiệm 2: 30 sinh viên, danh sách 15 từ: từ mồi được "nhớ" ra ở 55% số danh sách
	tn2: { soNguoi: 30, soTu: 15, nhoNham: 55 },
};

/** Danh sách của site (đã học, từ mồi, từ nhiễu) và nhịp trình bày. */
export const DANH_SACH = {
	hoc: ['giường', 'gối', 'chăn', 'đêm', 'mơ', 'ác mộng', 'ngáy', 'mệt', 'ngáp', 'thức khuya', 'nghỉ ngơi', 'chợp mắt'],
	moi: 'ngủ',
	nhieu: ['bàn', 'cây', 'sách', 'mưa', 'xe đạp'],
	hienMs: 1200,
	nghiMs: 300,
};

// ---------- Tính toán (hàm thuần) ----------

/** Bài nhận diện 18 từ, xáo trộn: { word, kind: study | lure | unrelated } (tên trường như site cũ). */
export function baiKiemTra(rand = Math.random) {
	return tron(
		[
			...DANH_SACH.hoc.map((word) => ({ word, kind: 'study' })),
			{ word: DANH_SACH.moi, kind: 'lure' },
			...DANH_SACH.nhieu.map((word) => ({ word, kind: 'unrelated' })),
		],
		rand,
	);
}

/** Chấm: traLoi [{ kind, yes }] → { hits, n, lureYes, faUnrelated, nUnrelated }. */
export function cham(traLoi) {
	const ra = { hits: 0, n: 0, lureYes: false, faUnrelated: 0, nUnrelated: 0 };
	for (const a of traLoi) {
		if (a.kind === 'study') {
			ra.n += 1;
			if (a.yes) ra.hits += 1;
		} else if (a.kind === 'lure') ra.lureYes = !!a.yes;
		else {
			ra.nUnrelated += 1;
			if (a.yes) ra.faUnrelated += 1;
		}
	}
	return ra;
}

// ---------- Giao diện ----------

export function mount(el) {
	const K = khung(el);
	const N = NGHIEN_CUU;
	let hen = null;
	let goPhim = null;

	const dung = () => {
		clearTimeout(hen);
		goPhim?.();
		goPhim = null;
		K.dangChay(false);
	};

	const lichSuChoi = () =>
		lichSu('falsememory', [
			['Từ đã học nhận đúng', (r) => `${r.hits}/${r.of}`],
			['Từ "ngủ"', (r) => (r.lureYes ? 'báo đã thấy' : 'báo chưa thấy')],
		]);

	function gioiThieu() {
		dung();
		K.hien([
			h('p', { class: 'pz-cc__dan' }, [
				`Bạn sẽ thấy ${DANH_SACH.hoc.length} từ hiện lần lượt, mỗi từ khoảng một giây. Hãy đọc thầm và cố nhớ. Sau đó là bài kiểm tra: với từng từ, cho biết bạn đã thấy nó trong danh sách hay chưa. Khoảng 2–3 phút.`,
			]),
			h('p', { class: 'pz-small' }, ['Đây là minh họa một hiện tượng trí nhớ trong phòng thí nghiệm, không phải bài kiểm tra trí nhớ của bạn. Nếu dùng trình đọc màn hình, các từ sẽ được đọc lên lần lượt.']),
			nut('Bắt đầu', hoc, { chinh: true, tuDong: true }),
			loiRiengTu(),
			lichSuChoi(),
		]);
	}

	function hoc() {
		const stim = h('div', { class: 'pz-stim pz-stim--tu', 'aria-live': 'assertive', 'aria-atomic': 'true' });
		const dem = h('p', { class: 'pz-counter' });
		K.dangChay(true);
		K.hien([dem, h('div', { class: 'pz-stage' }, [stim])]);
		K.bao('Bắt đầu hiện các từ. Hãy đọc thầm và cố nhớ.');
		let i = 0;
		const nhip = () => {
			if (!el.isConnected) return dung();
			if (i >= DANH_SACH.hoc.length) return kiemTra();
			dem.textContent = `Đang học: từ ${i + 1} / ${DANH_SACH.hoc.length}`;
			stim.textContent = DANH_SACH.hoc[i];
			i += 1;
			hen = setTimeout(() => {
				stim.textContent = '';
				hen = setTimeout(nhip, DANH_SACH.nghiMs);
			}, DANH_SACH.hienMs);
		};
		hen = setTimeout(nhip, 600);
	}

	function kiemTra() {
		const muc = baiKiemTra();
		const traLoi = [];
		let i = 0;
		const dem = h('p', { class: 'pz-counter' });
		// từ đang hỏi: trình đọc màn hình đọc qua vùng báo (cùng câu hỏi), nên chữ to chỉ để nhìn
		const stim = h('div', { class: 'pz-stim pz-stim--tu', 'aria-hidden': 'true' });
		const nutTraLoi = (chu, phim, co) =>
			h('button', { type: 'button', class: 'pz-answer', 'aria-keyshortcuts': phim, 'data-tu-dong': co || null, onclick: () => tra(co) }, [
				h('span', { text: chu }),
				h('span', { class: 'pz-answer__key', 'aria-hidden': 'true', text: phim }),
			]);
		const hoi = () => {
			if (i >= muc.length) return ketQua(traLoi);
			dem.textContent = `Kiểm tra: từ ${i + 1} / ${muc.length}`;
			stim.textContent = muc[i].word;
			K.bao(`Từ ${i + 1} trên ${muc.length}: ${muc[i].word}. Bạn đã thấy từ này trong danh sách chưa?`);
		};
		const tra = (co) => {
			if (i >= muc.length) return;
			traLoi.push({ kind: muc[i].kind, yes: co });
			i += 1;
			hoi();
		};
		K.dangChay(false);
		K.hien([
			dem,
			h('div', { class: 'pz-stage pz-stage--small' }, [stim]),
			h('div', { class: 'pz-answers pz-answers--2', role: 'group', 'aria-label': 'Trả lời' }, [nutTraLoi('Đã thấy', 'D', true), nutTraLoi('Chưa thấy', 'C', false)]),
		]);
		goPhim = batPhimTat((k) => (k === 'd' ? (tra(true), true) : k === 'c' ? (tra(false), true) : false));
		hoi();
	}

	function ketQua(traLoi) {
		dung();
		const s = cham(traLoi);
		them('falsememory', { hits: s.hits, of: s.n, lureYes: s.lureYes, faUnrelated: s.faUnrelated });
		K.bao(
			`Đã xong. Bạn nhận đúng ${s.hits} trên ${s.n} từ đã học. ` +
				(s.lureYes ? 'Bạn báo đã thấy từ “ngủ” dù nó chưa từng xuất hiện.' : 'Bạn báo chưa thấy từ “ngủ”: đúng, nó chưa từng xuất hiện.'),
		);
		K.hien([
			h('h3', { text: 'Kết quả của bạn' }),
			bieuDoCot(
				[
					{ ten: 'Từ đã học, nhận đúng', gt: s.hits, chu: `${s.hits} / ${s.n}` },
					{ ten: 'Từ nhiễu, báo nhầm là đã thấy', gt: s.faUnrelated, chu: `${s.faUnrelated} / ${s.nUnrelated}`, nhan: true },
				],
				{ toiDa: Math.max(s.n, s.nUnrelated, 1), tieuDe: 'Bài nhận diện của bạn' },
			),
			s.lureYes
				? khungKetLuan('chu-y', 'Bạn vừa có một “trí nhớ sai”', [
						'Bạn trả lời “Đã thấy” với từ ',
						h('strong', { text: '“ngủ”' }),
						', dù từ này chưa từng xuất hiện trong danh sách. Đây là hiệu ứng DRM thu nhỏ: các từ cùng chủ đề gợi tới từ “ngủ” mạnh đến mức bạn “nhận ra” nó.',
					])
				: khungKetLuan('tot', 'Lần này bạn không bị lừa', [
						'Bạn trả lời “Chưa thấy” với từ ',
						h('strong', { text: '“ngủ”' }),
						': đúng, nó chưa từng xuất hiện. Một lần làm chưa nói được gì nhiều: trong nghiên cứu, kết quả tính trên nhiều danh sách và nhiều người.',
					]),
			h('p', { class: 'pz-small' }, [
				'Từ nhiễu (“bàn”, “cây”…) là phép đối chứng: nếu bạn báo nhầm cả những từ chẳng liên quan gì, thì việc báo nhầm từ “ngủ” có thể chỉ vì bạn trả lời “đã thấy” quá dễ dãi.',
				s.lureYes && s.faUnrelated === 0 ? ' Bạn không báo nhầm từ nhiễu nào, nên lần báo nhầm từ “ngủ” khó là do đoán bừa.' : '',
			]),
			h('h4', { text: 'So với nghiên cứu gốc' }),
			h('p', {}, [
				`Trong thí nghiệm 1 của Roediger và McDermott (1995), ${N.tn1.soNguoi} sinh viên nghe ${N.tn1.soDanhSach} danh sách ${N.tn1.soTu} từ, mỗi danh sách gợi về một từ không có mặt. Khi nhớ lại tự do, họ “nhớ” ra từ ấy ở `,
				h('strong', { text: `${N.tn1.nhoNham}%` }),
				` số danh sách (thí nghiệm 2, danh sách ${N.tn2.soTu} từ: `,
				h('strong', { text: `${N.tn2.nhoNham}%` }),
				`). Ở bài nhận diện sau đó của thí nghiệm 1, từ không có mặt bị nhận là đã nghe ${N.tn1.nhanNhamMoi}% số lần, gần bằng tỉ lệ nhận đúng từ đã nghe (${N.tn1.nhanDung}%).`,
			]),
			h('p', {}, ['Giải thích và mức độ chắc chắn: xem các mục bên dưới công cụ.']),
			thuGon('Vì sao kết quả của bạn có thể khác?', [
				'Bạn chỉ làm một danh sách; nghiên cứu gốc dùng nhiều danh sách và tính trên hàng chục người.',
				'Ở đây bạn chỉ làm bài nhận diện, không nhớ lại tự do trước đó; trong thí nghiệm 1, bài nhận diện đến sau các lần nhớ lại.',
				'Danh sách tiếng Việt này do chúng tôi soạn theo mẫu của nghiên cứu gốc; độ mạnh liên tưởng của từng từ chưa được đo như bản tiếng Anh.',
				'Nếu bạn đoán được chủ đề từ trước (ví dụ đọc tiêu đề trang), bạn có thể đã cảnh giác với từ mồi.',
			]),
			nut('Làm lại', gioiThieu, { chinh: true, tuDong: true }),
			loiRiengTu(),
			lichSuChoi(),
		]);
	}

	gioiThieu();
	el.dataset.san = '1';
}
