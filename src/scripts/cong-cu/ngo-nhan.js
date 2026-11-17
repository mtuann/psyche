// Trò chơi "Bạn nghĩ gì về tâm trí?" (::cong-cu{ten="ngo-nhan" limit="20"}; D8-L3, viết lại từ
// ../psyche-zero/docs/assets/js/myths.js theo khuôn công cụ ở đầu src/scripts/cong-cu/stroop.js).
//
// Thẻ không nằm trong module: plugin dựng chúng lúc build từ src/data/ngo-nhan.yml (cùng nguồn với trang Ngộ nhận, chỉ
// thẻ có trong bản build) và nhúng vào data-the của khối (duLieuNgoNhan, src/plugins/thanh-phan.mjs). Mỗi thẻ:
// { id, cap, k: khẳng định, n: nhãn, g: giải thích, ng: [{ chu, link }], bai: { link, ten } | null }.
// Thông số của khối như site cũ: limit (số thẻ mỗi lượt; 0 hay không ghi: mọi thẻ), level (chỉ thẻ có cap ≤ level).
// Kết quả lưu như site cũ: kind "myths", { score, total, wrong: [id thẻ trả lời khác bằng chứng] }.
// Phím tắt: 1, 2, 3 chọn Đúng, Sai, Còn tranh cãi khi tiêu điểm ở trong trò chơi; bỏ qua khi đang gõ vào ô nhập.

import { h, khung, lichSu, loiRiengTu, nut } from './chung/giao-dien.js';
import { them } from './chung/luu.js';
import { tron } from './chung/thong-ke.js';

/** Bốn nhãn (như TEN_NHAN của plugin). */
export const TEN_NHAN = { 'vung-chac': 'Vững chắc', 'kha-vung': 'Khá vững', 'tranh-cai': 'Đang tranh cãi', 'bac-bo': 'Đã bị bác bỏ' };

/** Ba lựa chọn, theo thứ tự nút (và phím 1, 2, 3). */
export const LUA_CHON = [
	{ ma: 'dung', chu: 'Đúng' },
	{ ma: 'sai', chu: 'Sai' },
	{ ma: 'tranh-cai', chu: 'Còn tranh cãi' },
];

/** Đáp án theo nhãn (như site cũ; trang có khối "Cách chấm"): Vững chắc, Khá vững là Đúng; bác bỏ là Sai; tranh cãi là Còn tranh cãi. */
export function dapAn(nhan) {
	if (nhan === 'vung-chac' || nhan === 'kha-vung') return 'dung';
	if (nhan === 'bac-bo') return 'sai';
	if (nhan === 'tranh-cai') return 'tranh-cai';
	throw new Error(`nhãn lạ: ${nhan}`);
}

/** Bộ thẻ của một lượt: thẻ có cap ≤ level (level 0: mọi thẻ), trộn thứ tự, lấy limit thẻ đầu (limit 0: mọi thẻ). */
export function boThe(the, { limit = 0, level = 0 } = {}, rand = Math.random) {
	const loc = the.filter((t) => !level || t.cap <= level);
	const tronXong = tron(loc, rand);
	return limit > 0 ? tronXong.slice(0, limit) : tronXong;
}

/** Bản ghi kết quả (kind "myths"): điểm, số thẻ, id các thẻ trả lời khác bằng chứng. traLoi: [{ id, nhan, chon }]. */
export function ketQua(traLoi) {
	const wrong = traLoi.filter((x) => x.chon !== dapAn(x.nhan)).map((x) => x.id);
	return { score: traLoi.length - wrong.length, total: traLoi.length, wrong };
}

/** Phím 1, 2, 3 -> chỉ số lựa chọn; phím khác, có phím bổ trợ, hay đang gõ vào ô nhập: -1. */
export function phimChon(e) {
	if (e.ctrlKey || e.metaKey || e.altKey) return -1;
	const t = e.target;
	if (t && typeof t.closest === 'function' && (t.closest('input, textarea, select') || t.isContentEditable)) return -1;
	const i = ['1', '2', '3'].indexOf(e.key);
	return i;
}

// ---------- Giao diện ----------

function docThe(el) {
	try {
		const ds = JSON.parse(el.dataset.the || '[]');
		return Array.isArray(ds) ? ds : [];
	} catch {
		return [];
	}
}

const khangDinh = (t) => h('blockquote', { class: 'pz-nn__khang' }, [h('p', { text: `“${t.k}”` })]);

export function mount(el) {
	const K = khung(el);
	const tatCa = docThe(el);
	const thongSo = { limit: Number(el.dataset.limit) || 0, level: Number(el.dataset.level) || 0 };
	let bo = [];
	let i = 0;
	let traLoi = [];
	let dangHoi = false;

	function batDau() {
		bo = boThe(tatCa, thongSo);
		i = 0;
		traLoi = [];
		if (!bo.length) {
			dangHoi = false;
			K.hien([h('p', { text: 'Chưa có thẻ nào lên site: mỗi thẻ lên sau khi được kiểm chứng lại. Bạn quay lại sau nhé.' })]);
			return;
		}
		the();
	}

	const dem = () => h('p', { class: 'pz-nn__dem', text: `Thẻ ${i + 1} / ${bo.length}` });

	function the() {
		const t = bo[i];
		dangHoi = true;
		K.hien([
			dem(),
			khangDinh(t),
			h('p', { text: 'Theo bạn, khẳng định này…' }),
			h(
				'div',
				{ class: 'pz-cc__nut pz-nn__chon', role: 'group', 'aria-label': 'Theo bạn, khẳng định này…' },
				LUA_CHON.map((c, k) => nut(c.chu, () => chon(k), { tuDong: k === 0, 'aria-keyshortcuts': String(k + 1) })),
			),
			h('p', { class: 'pz-nn__meo', text: 'Mẹo: khi đang ở trong trò chơi, bấm phím 1, 2 hoặc 3 để chọn.' }),
		]);
	}

	function chon(k) {
		if (!dangHoi) return;
		dangHoi = false;
		const t = bo[i];
		const lc = LUA_CHON[k];
		traLoi.push({ id: t.id, nhan: t.n, chon: lc.ma });
		const khop = lc.ma === dapAn(t.n);
		const cau = khop ? 'Bạn nghĩ giống với bằng chứng hiện có.' : 'Bằng chứng hiện có nói khác.';
		K.bao(`${cau} ${TEN_NHAN[t.n]}.`);
		const cuoi = i + 1 >= bo.length;
		K.hien([
			dem(),
			khangDinh(t),
			h('p', { class: `pz-cau__ket pz-cau__ket--${khop ? 'dung' : 'sai'}` }, [`Bạn chọn “${lc.chu}”. ${cau}`]),
			h('div', { class: `pz-nhan pz-nhan--${t.n} pz-nn__nhan` }, [
				h('p', { class: 'pz-nhan__dau' }, [h('span', { class: 'pz-nhan__muc', text: TEN_NHAN[t.n] })]),
				h('p', { text: t.g }),
				t.bai ? h('p', {}, ['Đọc thêm: ', h('a', { href: t.bai.link, text: t.bai.ten })]) : null,
				t.ng?.length
					? h('p', { class: 'pz-the-nn__nguon' }, [
							h('em', { text: 'Nguồn:' }),
							' ',
							...t.ng.flatMap((n, j) => [j ? '; ' : '', n.link ? h('a', { href: n.link, text: n.chu }) : n.chu]),
						])
					: null,
			]),
			h('div', { class: 'pz-cc__nut' }, [nut(cuoi ? 'Xem tổng kết' : 'Thẻ tiếp theo', tiep, { chinh: true, tuDong: true })]),
		]);
	}

	function tiep() {
		i += 1;
		if (i < bo.length) the();
		else xong();
	}

	function xong() {
		const kq = ketQua(traLoi);
		them('myths', kq);
		K.bao(`Bạn khớp với bằng chứng ở ${kq.score} trên ${kq.total} thẻ.`);
		K.hien([
			h('h3', { text: `Bạn khớp với bằng chứng ở ${kq.score} / ${kq.total} thẻ` }),
			h('p', {
				text: 'Đừng lo nếu con số này thấp: nhiều ngộ nhận rất phổ biến, kể cả ở sinh viên tâm lý học và giáo viên. Mục đích của trò chơi là nhận ra rằng trực giác về tâm trí thường đáng để kiểm tra lại.',
			}),
			lichSu('myths', [['Khớp với bằng chứng', (r) => `${r.score}/${r.total}`]]),
			h('div', { class: 'pz-cc__nut' }, [nut('Chơi lại (xáo trộn thẻ)', batDau, { chinh: true, tuDong: true })]),
			loiRiengTu(),
		]);
	}

	el.addEventListener('keydown', (e) => {
		if (!dangHoi) return;
		const k = phimChon(e);
		if (k < 0) return;
		e.preventDefault();
		chon(k);
	});

	batDau();
	el.dataset.san = '1';
}
