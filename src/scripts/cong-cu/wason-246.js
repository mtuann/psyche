// Công cụ "Nhiệm vụ 2–4–6 của Wason" (::cong-cu{ten="wason-246"}; D8-L2, viết lại từ ../psyche-zero/docs/assets/js/wason-246.js).
// Khuôn của một công cụ: đầu stroop.js.
//
// Người dùng nhập dãy ba số, công cụ trả lời có tuân theo quy tắc hay không; quy tắc thật như Wason (1960): ba số tăng dần
// bất kỳ. Khi chắc chắn, người dùng viết quy tắc của mình; công cụ chấm bằng từ khóa (chamQuyTac). Chấm "chưa đúng" thì
// được thử tiếp, như trong thí nghiệm (người nêu sai được báo rồi thử tiếp). Chữ người dùng viết không lưu, không chèn vào
// trang bằng HTML.
//
// Bản ghi (kind "wason", như site cũ): { triples, disconfirm, ruleOk } (disconfirm: số dãy KHÔNG tuân theo quy tắc), thêm
// announcements (số lần công bố quy tắc).

import { bieuDoCot, h, khung, khungKetLuan, lichSu, loiRiengTu, nut, so } from './chung/giao-dien.js';
import { them } from './chung/luu.js';

/** Số liệu nghiên cứu mà công cụ so với (hồ sơ: kiem-dinh/trai-nghiem/wason-246.yml). */
export const NGHIEN_CUU = {
	// wason1960: 29 sinh viên; 6 người nêu đúng mà chưa nêu sai lần nào; tỉ lệ trung bình dãy không tuân theo quy tắc trong
	// các dãy đã thử trước lần nêu đầu: 0,21 ở 6 người nêu đúng ngay, 0,04 ở 22 người nêu sai lần đầu
	wason1960: { soNguoi: 29, dungNgay: 6, tiLeKhongTuan: { dungNgay: 0.21, saiLanDau: 0.04 } },
};

// ---------- Tính toán (hàm thuần) ----------

/** Quy tắc thật: ba số tăng dần (a < b < c). */
export const tuanTheo = (a, b, c) => a < b && b < c;

/** Đọc một số người dùng gõ (dấu phẩy hay dấu chấm thập phân, dấu trừ); không phải số thì null. */
export function docSo(chu) {
	const s = String(chu ?? '')
		.trim()
		.replace(/\s/g, '')
		.replace(/[−–]/g, '-')
		.replace(',', '.');
	if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
	const x = Number(s);
	return Number.isFinite(x) ? x : null;
}

// Ý "tăng dần" và các điều kiện làm quy tắc hẹp hơn quy tắc thật (chẵn, lẻ, cách đều…)
const Y_TANG = /tăng|lớn dần|to dần|lớn hơn|to hơn|nhỏ đến lớn|bé đến lớn|thấp đến cao|nhỏ hơn số sau|bé hơn số sau|a\s*<\s*b\s*<\s*c|<.*</;
const Y_HEP = /chẵn|lẻ|cách đều|đều nhau|đều đặn|tăng đều|khoảng bằng|khoảng cách bằng|hiệu bằng|cộng|nhân|gấp|liên tiếp|nguyên|dương|\b2\b|hai đơn vị|bội/;

/** Chấm quy tắc người dùng viết: "dung", "hep" (có ý tăng dần nhưng thêm điều kiện hẹp hơn) hay "sai". */
export function chamQuyTac(chu) {
	const t = String(chu ?? '').normalize('NFC').toLowerCase();
	if (!Y_TANG.test(t) || /giảm|không tăng/.test(t)) return 'sai';
	return Y_HEP.test(t) ? 'hep' : 'dung';
}

/** Tóm tắt các dãy đã thử: { n, khongTuan, tiLe }. */
export function tomTatDay(day) {
	const khongTuan = day.filter((d) => !d.ok).length;
	return { n: day.length, khongTuan, tiLe: day.length ? khongTuan / day.length : NaN };
}

// ---------- Giao diện ----------

let soKhoi = 0;

export function mount(el) {
	const K = khung(el);
	const N = NGHIEN_CUU.wason1960;
	const ma = ++soKhoi;
	let day = []; // { a, b, c, ok }
	let lanCongBo = 0;

	const chuDay = (d) => `${so(d.a, soLe(d.a))} – ${so(d.b, soLe(d.b))} – ${so(d.c, soLe(d.c))}`;

	function gioiThieu() {
		day = [];
		lanCongBo = 0;
		K.hien([
			h('p', { class: 'pz-cc__dan' }, ['Tôi đang nghĩ về một quy tắc cho dãy ba số. Ví dụ: dãy 2 – 4 – 6 tuân theo quy tắc đó.']),
			h('p', {}, [
				'Bạn đề xuất bao nhiêu dãy tùy thích; sau mỗi dãy, tôi cho biết nó có tuân theo quy tắc hay không. Khi đã chắc chắn, bấm ',
				h('strong', { text: 'Công bố quy tắc' }),
				' và viết quy tắc của bạn.',
			]),
			nut('Bắt đầu', choi, { chinh: true, tuDong: true }),
			loiRiengTu(),
			lichSu('wason', [
				['Số dãy đã thử', (r) => String(r.triples)],
				['Dãy “không tuân theo”', (r) => String(r.disconfirm)],
				['Quy tắc', (r) => (r.ruleOk ? 'đúng' : 'chưa đúng')],
			]),
		]);
	}

	function oSo(ten, thu) {
		return h('input', {
			id: `pz-wason-${ma}-${ten}`,
			class: 'pz-o-nhap pz-o-so',
			type: 'text',
			inputmode: 'decimal',
			autocomplete: 'off',
			'aria-label': `Số thứ ${thu}`,
		});
	}

	function choi() {
		const o = [oSo('a', 'nhất'), oSo('b', 'hai'), oSo('c', 'ba')];
		o[0].dataset.tuDong = '';
		const bao = h('p', { class: 'pz-feedback', role: 'status' });
		const ds = h('div', {});
		const form = h('form', { class: 'pz-hang-nhap' }, [
			h('fieldset', { class: 'pz-day-so' }, [
				h('legend', { text: 'Dãy ba số của bạn' }),
				h('span', { class: 'pz-hang-nhap__o' }, [o[0], h('span', { 'aria-hidden': 'true', text: '–' }), o[1], h('span', { 'aria-hidden': 'true', text: '–' }), o[2]]),
			]),
			h('button', { type: 'submit', class: 'pz-nut pz-nut--chinh' }, ['Kiểm tra']),
		]);
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const [a, b, c] = o.map((x) => docSo(x.value));
			if (a == null || b == null || c == null) {
				bao.textContent = 'Hãy nhập đủ ba số (ví dụ 1, 2,5 hay −3).';
				o[[a, b, c].findIndex((x) => x == null)].focus();
				return;
			}
			const d = { a, b, c, ok: tuanTheo(a, b, c) };
			day.push(d);
			bao.textContent = `Dãy ${chuDay(d)}: ${d.ok ? 'tuân theo quy tắc.' : 'không tuân theo quy tắc.'}`;
			veDanhSach(ds);
			o[0].focus();
			o[0].select();
		});
		K.hien([
			h('p', {}, ['Nhập một dãy ba số rồi bấm ', h('kbd', { text: 'Enter' }), ' hoặc nút Kiểm tra. Nhớ: 2 – 4 – 6 là một ví dụ ', h('em', { text: 'đúng' }), '.']),
			form,
			bao,
			ds,
			h('div', { class: 'pz-cc__nut' }, [nut('Công bố quy tắc', congBo, { chinh: true }), nut('Chơi lại từ đầu', gioiThieu)]),
			loiRiengTu(),
		]);
		veDanhSach(ds);
	}

	function veDanhSach(ds) {
		if (!day.length) return ds.replaceChildren();
		ds.replaceChildren(
			h('h4', { text: `Các dãy bạn đã thử (${day.length})` }),
			h(
				'ol',
				{ class: 'pz-ds-day' },
				day.map((d) => h('li', {}, [`${chuDay(d)}: `, h('strong', { text: d.ok ? 'tuân theo' : 'không tuân theo' })])),
			),
		);
	}

	function congBo() {
		const id = `pz-wason-${ma}-quy-tac`;
		const o = h('input', { id, class: 'pz-o-nhap pz-o-chu', type: 'text', autocomplete: 'off', 'data-tu-dong': true });
		const bao = h('div', { role: 'status' });
		const form = h('form', { class: 'pz-hang-nhap' }, [
			h('label', { for: id, text: 'Theo bạn, quy tắc là gì?' }),
			h('span', { class: 'pz-hang-nhap__o' }, [o, h('button', { type: 'submit', class: 'pz-nut pz-nut--chinh' }, ['Chấm'])]),
		]);
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!o.value.trim()) return o.focus();
			lanCongBo += 1;
			const kq = chamQuyTac(o.value);
			if (kq === 'dung') return ketThuc(true);
			bao.replaceChildren(
				h('p', { class: 'pz-feedback' }, [
					kq === 'hep'
						? 'Chưa phải quy tắc tôi nghĩ: quy tắc của bạn có vẻ thêm một điều kiện mà quy tắc thật không có.'
						: 'Chưa phải quy tắc tôi nghĩ.',
				]),
				h('div', { class: 'pz-cc__nut' }, [nut('Thử thêm dãy', choi, { chinh: true, tuDong: true }), nut('Xem quy tắc thật', () => ketThuc(false))]),
			);
			bao.querySelector('[data-tu-dong]')?.focus();
		});
		K.hien([
			h('p', {}, [`Bạn đã thử ${so(day.length)} dãy. Hãy viết quy tắc mà bạn cho là đúng. Máy chấm theo từ khóa, nên hãy viết ngắn gọn.`]),
			form,
			bao,
			nut('Quay lại thử tiếp', choi),
		]);
	}

	function ketThuc(dung) {
		const t = tomTatDay(day);
		them('wason', { triples: t.n, disconfirm: t.khongTuan, ruleOk: dung, announcements: lanCongBo });
		K.bao(dung ? 'Chính xác: quy tắc là ba số tăng dần bất kỳ.' : 'Quy tắc thật là ba số tăng dần bất kỳ.');
		K.hien([
			h('h3', { text: 'Kết quả của bạn' }),
			dung
				? khungKetLuan('tot', 'Chính xác!', ['Quy tắc thật chỉ là: ba số tăng dần bất kỳ (a < b < c). Dãy 2 – 3 – 4 đúng, dãy 1 – 5 – 100 cũng đúng.'])
				: khungKetLuan('chu-y', 'Quy tắc thật', [
						'Quy tắc thật chỉ là: ',
						h('strong', { text: 'ba số tăng dần bất kỳ' }),
						' (a < b < c). Nhiều người đoán một quy tắc hẹp hơn, ví dụ “mỗi số hơn số trước 2 đơn vị”.',
					]),
			bieuDoCot(
				[
					{ ten: 'Dãy đã thử', gt: t.n, chu: so(t.n) },
					{ ten: 'Trong đó, dãy nhận câu trả lời “không tuân theo”', gt: t.khongTuan, chu: so(t.khongTuan), nhan: true },
				],
				{ tieuDe: 'Các dãy bạn đã thử' },
			),
			h('p', {}, [
				'Dãy nhận câu trả lời “không tuân theo” là dãy có thể cho bạn biết phỏng đoán của mình sai ở đâu. Một dãy “khớp” với phỏng đoán (như 8 – 10 – 12 với phỏng đoán “cộng 2”) thì tuân theo cả phỏng đoán lẫn quy tắc thật, nên không loại trừ được gì.',
			]),
			h('h4', { text: 'So với Wason (1960)' }),
			h('p', {}, [
				`Trong ${N.soNguoi} người tham gia, chỉ ${N.dungNgay} người nêu đúng quy tắc mà chưa nêu sai lần nào. Trước lần nêu đầu, trung bình ${so(N.tiLeKhongTuan.dungNgay * 100)}% số dãy mà ${N.dungNgay} người ấy thử là dãy không tuân theo quy tắc; ở những người nêu sai lần đầu, con số này chỉ là ${so(N.tiLeKhongTuan.saiLanDau * 100)}%.`,
				t.n ? ` Của bạn: ${so(t.tiLe * 100)}% (${t.khongTuan}/${t.n} dãy, tính cả các dãy thử sau lần công bố đầu nếu có).` : '',
			]),
			h('p', {}, [
				'Bài học: dãy đáng thử nhất là dãy ',
				h('strong', { text: 'có thể làm phỏng đoán của bạn sai' }),
				'. Nếu bạn nghĩ quy tắc là “cộng 2”, hãy thử 2 – 3 – 4 hay 10 – 5 – 1: nếu 2 – 3 – 4 vẫn tuân theo, bạn biết ngay phỏng đoán của mình quá hẹp.',
			]),
			nut('Chơi lại', gioiThieu, { chinh: true, tuDong: true }),
			loiRiengTu(),
		]);
	}

	gioiThieu();
	el.dataset.san = '1';
}

/** Số chữ số thập phân để hiện lại đúng số người dùng gõ (tối đa 3). */
function soLe(x) {
	const s = String(x);
	const i = s.indexOf('.');
	return i === -1 ? 0 : Math.min(3, s.length - i - 1);
}
