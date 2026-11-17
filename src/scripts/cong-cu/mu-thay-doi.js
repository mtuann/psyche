// Công cụ "Mù thay đổi" (::cong-cu{ten="mu-thay-doi"}; D8-L1, viết lại từ ../psyche-zero/docs/assets/js/mu-thay-doi.js).
// Khuôn của một công cụ: đầu stroop.js.
//
// Kỹ thuật nhấp nháy (flicker): lưới 5×5 ô màu hiện xen kẽ hai phiên bản A và B (một ô đổi màu), giữa mỗi lần đổi là màn
// xám. Người dùng bấm (hay chọn bằng bàn phím) ô mà họ cho là đã đổi. Công cụ đo số chu kỳ và thời gian tới khi chọn đúng.
// Người xin giảm chuyển động: mỗi phiên bản hiện lâu gấp đôi.

import { bieuDoCot, canhBao, giamChuyenDong, h, khung, lichSu, loiRiengTu, nut, so, thuGon } from './chung/giao-dien.js';
import { them } from './chung/luu.js';

/** Số liệu nghiên cứu mà công cụ so với (hồ sơ: kiem-dinh/trai-nghiem/mu-thay-doi.yml). */
export const NGHIEN_CUU = {
	// rensink1997: thời gian trung bình (giây) tới khi phát hiện thay đổi, ở vùng được quan tâm và ít được quan tâm
	rensink1997: { quanTam: 4.7, itQuanTam: 10.9 },
};

export const N = 5; // lưới N×N
/** Màu của ô: kích thích, giữ nguyên ở cả nền sáng và tối (như bộ màu của Stroop). */
export const BANG_MAU = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e67e22', '#1abc9c', '#fd79a8'];
export const MAU_XAM = '#9aa0a6';
/** Thời gian (ms): mỗi phiên bản, màn xám giữa hai lần đổi, tối đa một lượt. */
export const THOI_GIAN = { hien: 500, xam: 250, toiDa: 90000 };

// ---------- Tính toán (hàm thuần) ----------

/** Một lượt: lưới A ngẫu nhiên, B giống A trừ một ô đổi sang màu cách 3 bước trong bảng màu (khác rõ). */
export function taoLuot(rand = Math.random) {
	const a = Array.from({ length: N * N }, () => BANG_MAU[Math.floor(rand() * BANG_MAU.length)]);
	const doi = Math.floor(rand() * N * N);
	const b = [...a];
	b[doi] = BANG_MAU[(BANG_MAU.indexOf(a[doi]) + 3) % BANG_MAU.length];
	return { a, b, doi };
}

/** Số chu kỳ A → xám → B → xám đã trọn sau ms mili giây. */
export function soChuKy(ms, hien, xam) {
	const chuKy = 2 * (hien + xam);
	return chuKy > 0 ? Math.floor(ms / chuKy) : 0;
}

/** Ô thứ i thành hàng, cột (từ 1). */
export const hangCot = (i) => ({ hang: Math.floor(i / N) + 1, cot: (i % N) + 1 });

// ---------- Giao diện ----------

export function mount(el) {
	const K = khung(el);
	const R = NGHIEN_CUU.rensink1997;
	let hen = null;
	let henToiDa = null;
	const cham = giamChuyenDong();
	const hien = cham ? 2 * THOI_GIAN.hien : THOI_GIAN.hien;
	const xam = cham ? 2 * THOI_GIAN.xam : THOI_GIAN.xam;

	const dungHen = () => {
		clearTimeout(hen);
		clearTimeout(henToiDa);
	};
	const cacLan = () =>
		lichSu('changeblind', [
			['Kết quả', (r) => (r.found ? `${so(r.seconds, 1)} giây (${r.cycles} chu kỳ)` : 'chưa phát hiện')],
			['Bấm nhầm', (r) => `${r.wrong ?? 0} lần`],
		]);

	function gioiThieu() {
		dungHen();
		K.dangChay(false);
		K.hien([
			h('p', { class: 'pz-cc__dan' }, [
				'Một lưới 5×5 ô màu sẽ nhấp nháy: hai phiên bản xen kẽ nhau, giữa mỗi lần đổi có một màn xám ngắn. Một ô đổi màu giữa hai phiên bản. Hãy bấm vào ô mà bạn cho là đã đổi.',
			]),
			canhBao(
				'Lưu ý về nhấp nháy',
				'Màn hình sẽ nhấp nháy liên tục (mỗi phiên bản hiện nửa giây, xen giữa là màn xám một phần tư giây). Nếu bạn nhạy cảm với ánh sáng nhấp nháy (ví dụ có tiền sử động kinh nhạy sáng), hãy bỏ qua công cụ này và đọc phần giải thích bên dưới.',
			),
			cham
				? h('p', { class: 'pz-small' }, [
						`Vì bạn đang bật chế độ giảm chuyển động, mỗi phiên bản sẽ hiện lâu hơn (${so(hien / 1000, 1)} giây, màn xám ${so(xam / 1000, 1)} giây). Thời gian của bạn vì thế không so trực tiếp được với nghiên cứu gốc.`,
					])
				: null,
			h('p', { class: 'pz-small' }, ['Công cụ này cần thị giác. Bạn có thể dùng phím Tab để vào lưới, phím mũi tên để đi giữa các ô, Enter để chọn ô.']),
			nut('Bắt đầu', chay, { chinh: true, tuDong: true }),
			loiRiengTu(),
			cacLan(),
		]);
	}

	function chay() {
		const L = taoLuot();
		let batDau = null;
		let nham = 0;
		let xong = false;
		let dangChon = 0; // ô nhận tiêu điểm khi vào lưới (tabindex lưu động)
		const o = Array.from({ length: N * N }, (_, i) => {
			const { hang, cot } = hangCot(i);
			const b = h('button', { type: 'button', class: 'pz-o-mau', 'data-o': i, tabindex: i ? '-1' : '0', 'data-tu-dong': i === 0, 'aria-label': `Ô hàng ${hang} cột ${cot}` });
			b.addEventListener('click', () => doan(i));
			return b;
		});
		const luoi = h('div', { class: 'pz-luoi-5', role: 'group', 'aria-label': 'Lưới 5 nhân 5 ô màu; một ô đổi màu giữa hai phiên bản' }, o);
		// phím mũi tên đi giữa các ô; chỉ ô đang chọn nằm trong thứ tự Tab
		luoi.addEventListener('keydown', (e) => {
			const d = { ArrowUp: -N, ArrowDown: N, ArrowLeft: -1, ArrowRight: 1 }[e.key];
			if (d == null) return;
			const moi = dangChon + d;
			if (moi < 0 || moi >= N * N) return;
			if (Math.abs(d) === 1 && Math.floor(moi / N) !== Math.floor(dangChon / N)) return;
			e.preventDefault();
			o[dangChon].tabIndex = -1;
			o[moi].tabIndex = 0;
			o[moi].focus();
			dangChon = moi;
		});
		const to = (mau) => mau.forEach((m, i) => (o[i].style.background = m));

		const vong = (laA) => {
			if (xong || !el.isConnected) return;
			batDau ??= performance.now();
			to(laA ? L.a : L.b);
			hen = setTimeout(() => {
				if (xong) return;
				o.forEach((x) => (x.style.background = MAU_XAM));
				hen = setTimeout(() => vong(!laA), xam);
			}, hien);
		};

		function doan(i) {
			if (xong || batDau == null) return;
			if (i === L.doi) return ketThuc(true, false);
			nham += 1;
			K.bao('Ô đó không phải ô đổi màu. Quan sát tiếp nhé.');
		}

		function ketThuc(thay, hetGio) {
			if (xong) return;
			xong = true;
			dungHen();
			K.dangChay(false);
			const ms = batDau == null ? 0 : performance.now() - batDau;
			const giay = Math.round(ms / 100) / 10;
			const chuKy = soChuKy(ms, hien, xam);
			them('changeblind', { seconds: giay, cycles: chuKy, wrong: nham, found: thay });
			const { hang, cot } = hangCot(L.doi);
			K.bao(thay ? `Đúng rồi! Bạn phát hiện sau ${so(giay, 1)} giây.` : `Đã hiện đáp án: ô đổi màu là ô hàng ${hang} cột ${cot}.`);
			to(L.b);
			o.forEach((x) => (x.setAttribute('disabled', ''), x.removeAttribute('data-tu-dong')));
			o[L.doi].classList.add('pz-o-mau--dap-an');
			K.hien([
				h('h3', { text: 'Kết quả của bạn' }),
				h(
					'p',
					{ class: 'pz-big-number' },
					thay
						? [h('strong', { text: `${so(giay, 1)} giây` }), ` (${chuKy} chu kỳ) đến khi bạn phát hiện đúng`]
						: [`Bạn chưa phát hiện ra sau ${so(giay, 1)} giây (${chuKy} chu kỳ).`],
				),
				h('p', {}, [`Ô đổi màu là ô hàng ${hang}, cột ${cot} (viền đậm trong lưới dưới đây). `, nham ? `Bạn đã bấm nhầm ${nham} lần. ` : '', hetGio ? `Đã hết ${THOI_GIAN.toiDa / 1000} giây.` : '']),
				luoi,
				h('h4', { text: 'So với nghiên cứu gốc' }),
				bieuDoCot(
					[
						{ ten: 'Bạn', gt: giay, chu: `${so(giay, 1)} giây`, nhan: true },
						{ ten: 'Vùng được quan tâm (Rensink và cộng sự, 1997)', gt: R.quanTam, chu: `${so(R.quanTam, 1)} giây` },
						{ ten: 'Vùng ít được quan tâm (Rensink và cộng sự, 1997)', gt: R.itQuanTam, chu: `${so(R.itQuanTam, 1)} giây` },
					],
					{ toiDa: Math.max(giay, R.itQuanTam, 1), tieuDe: 'Thời gian tới khi phát hiện thay đổi' },
				),
				h('p', {}, [
					'Trong nghiên cứu dùng kỹ thuật nhấp nháy của Rensink, O’Regan và Clark (1997), người tham gia cần trung bình ',
					h('strong', { text: `${so(R.quanTam, 1)} giây` }),
					' để phát hiện thay đổi ở vùng được quan tâm, và ',
					h('strong', { text: `${so(R.itQuanTam, 1)} giây` }),
					' ở vùng ít được quan tâm, dù thay đổi lớn và lặp đi lặp lại.',
				]),
				thuGon('Vì sao con số của bạn có thể khác?', [
					'Ở đây chỉ có một ô đổi màu trên lưới 25 ô đơn giản; nghiên cứu gốc dùng ảnh đời thực phức tạp với nhiều loại thay đổi.',
					'Thời gian mỗi phiên bản và màn xám ở đây khác thí nghiệm gốc (xem mục Nghiên cứu then chốt bên dưới).',
					'Kích thước màn hình, độ sáng và khoảng cách nhìn đều ảnh hưởng.',
					cham ? 'Bạn đang dùng chế độ giảm chuyển động nên mỗi phiên bản hiện lâu hơn; thời gian không so trực tiếp được.' : null,
				]),
				nut('Chơi lại', gioiThieu, { chinh: true, tuDong: true }),
				loiRiengTu(),
				cacLan(),
			]);
		}

		K.dangChay(true);
		K.hien([
			h('p', { class: 'pz-counter', text: 'Đang nhấp nháy… hãy tìm ô đổi màu.' }),
			luoi,
			h('div', { class: 'pz-cc__nut pz-cc__nut--giua' }, [nut('Tôi chịu, hiện đáp án', () => ketThuc(false, false))]),
		]);
		luoi.scrollIntoView?.({ block: 'center' });
		vong(true);
		henToiDa = setTimeout(() => ketThuc(false, true), THOI_GIAN.toiDa);
	}

	gioiThieu();
	el.dataset.san = '1';
}
