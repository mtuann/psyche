// Công cụ "Bạn nhớ được bao nhiêu từ?" (::cong-cu{ten="tri-nho-tu"}; D8-L2, viết lại từ ../psyche-zero/docs/assets/js/tri-nho-tu.js).
// Khuôn của một công cụ: đầu stroop.js.
//
// Quy trình độ dài trí nhớ dùng chung với công cụ chữ số (chung/thong-ke.js: trangThaiDoDai): bắt đầu 2 từ (tối đa 12), mỗi
// độ dài 2 lượt, dừng khi sai cả 2 lượt ở cùng độ dài. Mỗi từ hiện 900 ms, cách nhau 100 ms. 40 danh từ một âm tiết do site
// chọn. Công cụ không so con số với chuẩn nào (chưa có chuẩn cho tiếng Việt).
//
// Bản ghi (kind "wordspan", như site cũ): { span, positions, rtMs }.

import { bieuDoCot, h, khung, lichSu, loiRiengTu, nut, phanViTri, thuGon } from './chung/giao-dien.js';
import { them } from './chung/luu.js';
import { gopViTri, trangThaiDoDai, trungVi } from './chung/thong-ke.js';

/** Thông số của quy trình (hồ sơ: kiem-dinh/trai-nghiem/tri-nho-tu.yml). */
export const QUY_TRINH = { batDau: 2, toiDa: 12, hienMs: 900, cachMs: 100 };

/** 40 danh từ tiếng Việt một âm tiết, quen thuộc (site chọn). */
export const TU = [
	'nhà', 'cây', 'mèo', 'chó', 'chim', 'cá', 'hoa', 'lá', 'đá', 'núi',
	'sông', 'biển', 'mây', 'mưa', 'nắng', 'gió', 'lửa', 'đất', 'trời', 'trăng',
	'sao', 'gà', 'vịt', 'trâu', 'bò', 'lợn', 'ngựa', 'ong', 'bướm', 'kiến',
	'chuột', 'thỏ', 'hổ', 'voi', 'khỉ', 'cua', 'tôm', 'ốc', 'rùa', 'ếch',
];

// ---------- Tính toán (hàm thuần) ----------

/** Rút `n` từ khác nhau. */
export function rutTu(n, rand = Math.random) {
	const kho = [...TU];
	const ra = [];
	while (ra.length < n && kho.length) ra.push(kho.splice(Math.floor(rand() * kho.length), 1)[0]);
	return ra;
}

/** Chuẩn hóa câu trả lời: Unicode NFC (bộ gõ tiếng Việt có thể ra dạng tổ hợp), chữ thường, bỏ dấu câu và khoảng trắng thừa. */
export const chuanHoa = (chu) =>
	String(chu ?? '')
		.normalize('NFC')
		.toLowerCase()
		.replace(/[,.;:–—-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

/** Đúng khi gõ đủ các từ, đúng thứ tự. */
export const chamTu = (day, traLoi) => chuanHoa(traLoi) === day.join(' ').normalize('NFC');

/** Đúng sai từng vị trí. */
export function chamViTriTu(day, traLoi) {
	const go = chuanHoa(traLoi).split(' ').filter(Boolean);
	return day.map((w, i) => go[i] === w.normalize('NFC'));
}

// ---------- Giao diện ----------

let soKhoi = 0;

export function mount(el) {
	const K = khung(el);
	const ma = ++soKhoi;
	let hen = null;
	let luot = [];

	function gioiThieu() {
		clearTimeout(hen);
		K.dangChay(false);
		luot = [];
		K.hien([
			h('p', { class: 'pz-cc__dan' }, [
				'Các từ tiếng Việt sẽ hiện lần lượt, mỗi giây một từ. Khi dãy kết thúc, hãy gõ lại các từ theo đúng thứ tự, cách nhau bằng dấu cách. Bắt đầu từ 2 từ; mỗi độ dài có 2 lượt; dừng khi bạn sai cả hai lượt ở cùng một độ dài. Khoảng 3–5 phút.',
			]),
			h('p', { class: 'pz-small' }, ['Đừng ghi ra giấy hay lẩm nhẩm thành tiếng. Nếu dùng trình đọc màn hình, các từ sẽ được đọc lên lần lượt.']),
			nut('Bắt đầu', chay, { chinh: true, tuDong: true }),
			loiRiengTu(),
			lichSu('wordspan', [['Độ dài', (r) => `${r.span} từ`]]),
		]);
	}

	function chay() {
		const ls = [];
		const buoc = () => {
			const tt = trangThaiDoDai(ls, QUY_TRINH.batDau, QUY_TRINH.toiDa);
			if (tt.done) return ketThuc(tt.span);
			const day = rutTu(tt.nextLen);
			trinhBay(day, (traLoi, rt) => {
				const dung = chamTu(day, traLoi);
				ls.push({ len: day.length, correct: dung });
				luot.push({ positions: chamViTriTu(day, traLoi), rt });
				phanHoi(dung, day, buoc);
			});
		};
		buoc();
	}

	function trinhBay(day, xong) {
		const stim = h('div', { class: 'pz-stim pz-stim--tu', 'aria-live': 'assertive', 'aria-atomic': 'true' });
		const nhan = h('p', { class: 'pz-counter', text: `Dãy này có ${day.length} từ` });
		const stage = h('div', { class: 'pz-stage' }, [stim]);
		K.dangChay(true);
		K.hien([nhan, stage]);
		let i = 0;
		const nhip = () => {
			if (!el.isConnected) return K.dangChay(false);
			if (i >= day.length) return hoi(xong, nhan, stage, stim);
			stim.textContent = day[i];
			hen = setTimeout(() => {
				stim.textContent = '';
				i += 1;
				hen = setTimeout(nhip, QUY_TRINH.cachMs);
			}, QUY_TRINH.hienMs);
		};
		hen = setTimeout(nhip, 600);
	}

	function hoi(xong, nhan, stage, stim) {
		const id = `pz-tu-${ma}`;
		const o = h('input', { id, type: 'text', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', class: 'pz-o-nhap pz-o-chu', 'aria-describedby': `${id}-g`, 'data-tu-dong': true });
		const t0 = performance.now();
		const form = h('form', { class: 'pz-hang-nhap' }, [
			h('label', { for: id, text: 'Gõ lại dãy từ:' }),
			h('span', { class: 'pz-hang-nhap__o' }, [o, h('button', { type: 'submit', class: 'pz-nut pz-nut--chinh' }, ['Xong'])]),
			h('p', { id: `${id}-g`, class: 'pz-small', text: 'Gõ các từ theo đúng thứ tự, cách nhau bằng dấu cách; cần gõ đủ dấu tiếng Việt. Không phân biệt chữ hoa, chữ thường.' }),
		]);
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			xong(o.value, Math.round(performance.now() - t0));
		});
		stim.textContent = '?';
		K.hien([nhan, stage, form]);
	}

	function phanHoi(dung, day, tiep) {
		K.dangChay(false);
		K.hien([h('p', { class: 'pz-feedback', role: 'status', text: dung ? 'Đúng!' : `Chưa đúng. Dãy là: ${day.join(' – ')}.` }), nut('Tiếp', tiep, { chinh: true, tuDong: true })]);
	}

	function ketThuc(span) {
		const rts = luot.map((t) => t.rt);
		them('wordspan', { span, positions: gopViTri(luot), rtMs: rts.length ? Math.round(trungVi(rts)) : null });
		K.bao(`Đã xong. Độ dài trí nhớ từ của bạn là ${span} từ.`);
		K.hien([
			h('h3', { text: 'Kết quả của bạn' }),
			bieuDoCot([{ ten: 'Độ dài trí nhớ từ', gt: span, chu: `${span} từ`, nhan: true }], { toiDa: QUY_TRINH.toiDa, tieuDe: 'Độ dài trí nhớ từ của bạn (một lần đo)' }),
			h('p', {}, ['Độ dài trí nhớ là dãy dài nhất bạn gõ lại đúng ít nhất một lần.']),
			phanViTri(luot),
			h('h4', { text: 'So với độ dài trí nhớ chữ số' }),
			h('p', {}, [
				'Bạn có thể làm bài ',
				h('a', { href: '/psyche/trai-nghiem/do-dai-tri-nho/' }, ['đo độ dài trí nhớ chữ số']),
				' rồi so hai con số của chính mình. Vì sao hai con số có thể khác nhau: xem mục ',
				h('a', { href: '#dieu-gi-dang-xay-ra' }, ['Điều gì đang xảy ra?']),
				' ngay bên dưới công cụ.',
			]),
			thuGon('Vì sao con số của bạn có thể khác?', [
				'Một lần làm có nhiều yếu tố ngẫu nhiên: mệt, mất tập trung, gõ nhầm.',
				'Mẹo nhóm các từ thành cụm có nghĩa (ví dụ “mèo – chuột”) có thể làm kết quả cao hơn.',
				'Ở đây bạn nhìn trên màn hình rồi gõ; trong nhiều nghiên cứu, người ta nghe đọc to rồi nói lại.',
			]),
			nut('Làm lại', gioiThieu, { chinh: true, tuDong: true }),
			loiRiengTu(),
		]);
	}

	gioiThieu();
	el.dataset.san = '1';
}
