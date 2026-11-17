// Công cụ "Bạn nhớ được bao nhiêu chữ số?" (::cong-cu{ten="do-dai-tri-nho"}; D8-L1, viết lại từ
// ../psyche-zero/docs/assets/js/digit-span.js và phần chữ số của stats.js). Khuôn của một công cụ: đầu stroop.js.
//
// Xuôi bắt đầu 3 chữ số (tối đa 12), ngược bắt đầu 2 (tối đa 10). Mỗi độ dài 2 lượt; dừng khi sai cả 2 lượt ở cùng độ dài
// (chung/thong-ke.js: trangThaiDoDai). Mỗi chữ số hiện 800 ms, cách nhau 200 ms (một chữ số mỗi giây). Công cụ không so
// con số với chuẩn nào: số liệu nghiên cứu nằm ở mục "So với nghiên cứu" của trang (công cụ link tới đó).

import { h, khung, lichSu, loiRiengTu, nut, phanViTri, thuGon, bieuDoCot } from './chung/giao-dien.js';
import { them } from './chung/luu.js';
import { gopViTri, trangThaiDoDai, trungVi } from './chung/thong-ke.js';

/** Thông số của quy trình (hồ sơ: kiem-dinh/trai-nghiem/do-dai-tri-nho.yml). */
export const QUY_TRINH = {
	xuoi: { batDau: 3, toiDa: 12 },
	nguoc: { batDau: 2, toiDa: 10 },
	hienMs: 800,
	cachMs: 200,
};

// ---------- Tính toán (hàm thuần) ----------

/**
 * Dãy `n` chữ số ngẫu nhiên: không lặp số liền kề, không có ba số liên tiếp tăng hay giảm đều 1 (kiểu 4-5-6), khác dãy
 * `truoc`.
 */
export function dayChuSo(n, rand = Math.random, truoc = null) {
	for (;;) {
		const ra = [];
		while (ra.length < n) {
			const d = Math.floor(rand() * 10);
			const a = ra[ra.length - 1];
			const b = ra[ra.length - 2];
			if (d === a) continue;
			if (a != null && b != null && d - a === a - b && Math.abs(d - a) === 1) continue;
			ra.push(d);
		}
		if (!truoc || ra.join('') !== truoc.join('')) return ra;
	}
}

/** Câu trả lời (bỏ ký tự không phải số) khớp dãy (đảo ngược khi `nguoc`) không. */
export function chamChuSo(day, traLoi, nguoc) {
	const can = nguoc ? [...day].reverse() : day;
	return String(traLoi).replace(/\D/g, '') === can.join('');
}

/** Đúng sai từng vị trí: vị trí i đúng khi chữ số thứ i của câu trả lời khớp mục thứ i của dãy cần gõ. */
export function chamViTri(day, traLoi, nguoc) {
	const can = nguoc ? [...day].reverse() : day;
	const go = String(traLoi).replace(/\D/g, '');
	return can.map((d, i) => i < go.length && go[i] === String(d));
}

// ---------- Giao diện ----------

let soKhoi = 0;

export function mount(el) {
	const K = khung(el);
	const ma = ++soKhoi;
	let hen = null;
	let ketQua = { xuoi: null, nguoc: null };
	let luot = []; // mọi lượt của cả hai phần: { positions, rt }

	function gioiThieu() {
		clearTimeout(hen);
		K.dangChay(false);
		ketQua = { xuoi: null, nguoc: null };
		luot = [];
		K.hien([
			h('p', { class: 'pz-cc__dan' }, [
				'Các chữ số sẽ hiện lần lượt, mỗi giây một số. Khi dãy kết thúc, hãy gõ lại. Dãy dài dần cho đến khi bạn sai hai lần liên tiếp ở cùng một độ dài. Khoảng 3–5 phút.',
			]),
			h('ol', {}, [
				h('li', {}, [h('strong', { text: 'Xuôi: ' }), 'gõ lại đúng thứ tự. Ví dụ thấy 5 – 2 – 8 thì gõ 528.']),
				h('li', {}, [h('strong', { text: 'Ngược: ' }), 'gõ theo thứ tự ngược lại. Thấy 5 – 2 – 8 thì gõ 825.']),
			]),
			h('p', { class: 'pz-small' }, [
				'Đừng ghi ra giấy hay lẩm nhẩm thành tiếng nếu bạn muốn so sánh công bằng với các nghiên cứu. Nếu dùng trình đọc màn hình, các chữ số sẽ được đọc lên lần lượt.',
			]),
			nut('Bắt đầu phần xuôi', () => phan('xuoi'), { chinh: true, tuDong: true }),
			loiRiengTu(),
			lichSu('digitspan', [
				['Xuôi', (r) => `${r.forward} chữ số`],
				['Ngược', (r) => `${r.backward} chữ số`],
			]),
		]);
	}

	function phan(huong) {
		const Q = QUY_TRINH[huong];
		const ls = [];
		let truoc = null;
		const buoc = () => {
			const tt = trangThaiDoDai(ls, Q.batDau, Q.toiDa);
			if (tt.done) return xongPhan(huong, tt.span);
			const day = dayChuSo(tt.nextLen, Math.random, truoc);
			truoc = day;
			trinhBay(huong, day, (traLoi, rt) => {
				const dung = chamChuSo(day, traLoi, huong === 'nguoc');
				ls.push({ len: day.length, correct: dung });
				luot.push({ positions: chamViTri(day, traLoi, huong === 'nguoc'), rt });
				phanHoi(dung, day, huong, buoc);
			});
		};
		buoc();
	}

	function trinhBay(huong, day, xong) {
		// aria-live: trình đọc màn hình đọc từng chữ số khi nó hiện
		const stim = h('div', { class: 'pz-stim', 'aria-live': 'assertive', 'aria-atomic': 'true' });
		const nhan = h('p', { class: 'pz-counter', text: `${huong === 'xuoi' ? 'Xuôi' : 'Ngược'} · ${day.length} chữ số` });
		const stage = h('div', { class: 'pz-stage' }, [stim]);
		K.dangChay(true);
		K.hien([nhan, stage]);
		let i = 0;
		const nhip = () => {
			if (!el.isConnected) return;
			if (i >= day.length) return hoi(huong, xong, nhan, stage, stim);
			stim.textContent = String(day[i]);
			hen = setTimeout(() => {
				stim.textContent = '';
				i += 1;
				hen = setTimeout(nhip, QUY_TRINH.cachMs);
			}, QUY_TRINH.hienMs);
		};
		hen = setTimeout(nhip, 600);
	}

	function hoi(huong, xong, nhan, stage, stim) {
		const id = `pz-dd-${ma}`;
		const o = h('input', {
			id,
			type: 'text',
			inputmode: 'numeric',
			autocomplete: 'off',
			autocorrect: 'off',
			spellcheck: 'false',
			class: 'pz-o-nhap',
			'data-tu-dong': true,
		});
		const t0 = performance.now();
		const form = h('form', { class: 'pz-hang-nhap' }, [
			h('label', { for: id, text: huong === 'xuoi' ? 'Gõ lại dãy số (xuôi):' : 'Gõ dãy số theo thứ tự NGƯỢC:' }),
			h('span', { class: 'pz-hang-nhap__o' }, [o, h('button', { type: 'submit', class: 'pz-nut pz-nut--chinh' }, ['Xong'])]),
		]);
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			xong(o.value, Math.round(performance.now() - t0));
		});
		stim.textContent = '?';
		K.hien([nhan, stage, form]);
	}

	function phanHoi(dung, day, huong, tiep) {
		K.dangChay(false);
		const chu = dung ? 'Đúng!' : `Chưa đúng. Dãy là ${day.join(' ')}${huong === 'nguoc' ? ` (ngược lại: ${[...day].reverse().join(' ')}).` : '.'}`;
		K.hien([h('p', { class: 'pz-feedback', role: 'status', text: chu }), nut('Tiếp', tiep, { chinh: true, tuDong: true })]);
	}

	function xongPhan(huong, span) {
		ketQua[huong] = span;
		if (huong === 'xuoi') {
			K.hien([
				h('p', {}, ['Phần xuôi: bạn nhớ được ', h('strong', { text: `${span} chữ số` }), '.']),
				h('p', {}, ['Bây giờ đến phần ngược: gõ lại dãy theo thứ tự ngược. Phần này khó hơn vì bạn vừa phải giữ vừa phải đảo thông tin.']),
				nut('Bắt đầu phần ngược', () => phan('nguoc'), { chinh: true, tuDong: true }),
			]);
			return;
		}
		const rts = luot.map((t) => t.rt);
		them('digitspan', {
			forward: ketQua.xuoi,
			backward: ketQua.nguoc,
			positions: gopViTri(luot),
			rtMs: rts.length ? Math.round(trungVi(rts)) : null,
		});
		K.bao(`Đã xong. Xuôi ${ketQua.xuoi} chữ số, ngược ${ketQua.nguoc} chữ số.`);
		ketThuc();
	}

	function ketThuc() {
		K.hien([
			h('h3', { text: 'Kết quả của bạn' }),
			bieuDoCot(
				[
					{ ten: 'Xuôi', gt: ketQua.xuoi, chu: `${ketQua.xuoi} chữ số` },
					{ ten: 'Ngược', gt: ketQua.nguoc, chu: `${ketQua.nguoc} chữ số`, nhan: true },
				],
				{ toiDa: QUY_TRINH.xuoi.toiDa, tieuDe: 'Độ dài trí nhớ chữ số của bạn' },
			),
			h('p', {}, ['Độ dài trí nhớ là dãy dài nhất bạn gõ lại đúng ít nhất một lần.']),
			phanViTri(luot),
			h('h4', { text: 'So với các nghiên cứu' }),
			h('p', {}, ['Số liệu từ các nghiên cứu (kèm nguồn) nằm ở mục ', h('a', { href: '#so-voi-nghien-cuu' }, ['So với nghiên cứu']), ' ngay bên dưới công cụ.']),
			thuGon('Vì sao con số của bạn có thể khác?', [
				'Phần lớn số liệu chuẩn được đo bằng cách người làm test đọc to dãy số và người tham gia nói lại, không phải nhìn trên màn hình rồi gõ.',
				'Mẹo nhóm số (ví dụ 528-17) hay lẩm nhẩm có thể làm kết quả cao hơn.',
				'Ngôn ngữ ảnh hưởng: tên chữ số càng ngắn khi đọc thì càng dễ giữ nhiều số. Tên chữ số tiếng Việt đều chỉ có một âm tiết, nên người Việt có thể đạt cao hơn số liệu đo bằng tiếng Anh. Đây là suy luận từ nghiên cứu ở các ngôn ngữ khác, chưa phải số liệu đo trên người Việt.',
				'Mệt mỏi, mất tập trung và chỉ làm một lần khiến kết quả dao động ±1 chữ số là bình thường.',
			]),
			nut('Làm lại', gioiThieu, { chinh: true, tuDong: true }),
			loiRiengTu(),
		]);
	}

	gioiThieu();
	el.dataset.san = '1';
}
