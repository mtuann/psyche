// Công cụ "Hiệu ứng Stroop" (::cong-cu{ten="stroop"}; D8-L1, viết lại từ ../psyche-zero/docs/assets/js/stroop.js và phần
// Stroop của stats.js).
//
// KHUÔN CỦA MỘT CÔNG CỤ (D8-L1 đặt, các lô sau theo; AGENTS.md, mục "Mẫu trang và khối đặc biệt"):
// - Một module src/scripts/cong-cu/<tên>.js, đăng ký ở CONG_CU (src/plugins/thanh-phan.mjs: lớp, thông số nhận được) và
//   ở LUAT (src/scripts/tai.js: nạp khi khối tới gần màn hình).
// - Phần tính toán là hàm thuần, export ra để kiểm thử trong Node (tests/cong-cu.test.mjs); không đụng document lúc nạp.
// - Số liệu nghiên cứu mà công cụ so với (năm, cỡ mẫu, con số) gom ở hằng NGHIEN_CUU đầu module, mỗi mục ghi nguồn (id của
//   src/data/nguon.yml); chữ hiện ra dựng từ hằng ấy. Mỗi con số là một nhận định trong hồ sơ của trang
//   (kiem-dinh/trai-nghiem/<trang>.yml, loại cong-cu hay so-lieu, vi_tri ghi tên hằng).
// - export function mount(el): dựng công cụ trong khối (chung/giao-dien.js: khung), đặt el.dataset.san = '1' khi đã dựng
//   xong (kiểm thử trình duyệt chờ dấu này). Thông số của khối (data-*) đọc từ el.dataset.
// - Kết quả lưu bằng chung/luu.js (them(kind, dữ liệu)): khóa localStorage "psyche-zero", kind và tên trường như site cũ.
// - Giao diện: nút pz-nut (vùng bấm 44 px), làm được bằng bàn phím, tiêu điểm chuyển tới nút chính của màn mới (trừ lúc
//   tải trang), vùng báo cho trình đọc màn hình; màu theo biến của site (sáng và tối); kích thích chỉ để nhìn thì
//   aria-hidden và trang có phần giải thích bằng chữ. Hẹn giờ bằng setTimeout và requestAnimationFrame (kiểm thử điều
//   khiển được bằng đồng hồ giả của Playwright: tests/trinh-duyet/kiem-cong-cu.mjs).
// - Không chẩn đoán: công cụ nào cho ra con số về người dùng thì nói rõ đó là một lần đo, không phải thước đo năng lực.
//
// Hai phiên bản: màu (gọi tên màu mực của chữ: ĐỎ, VÀNG, XANH, TRẮNG trên nền tối) và đếm (có bao nhiêu ký tự, ví dụ "3 3"
// thì 2; không cần phân biệt màu). Mỗi lượt: dấu + 500 ms, màn trống 300–700 ms (ngẫu nhiên), rồi kích thích tới khi trả
// lời hay hết 3 giây. Thời điểm hiện kích thích lấy bằng hai lần requestAnimationFrame; thời điểm trả lời lấy từ
// event.timeStamp (độ phân giải cao).

import { bieuDoCot, canhBao, h, khung, lichSu, loiRiengTu, nut, so, thuGon } from './chung/giao-dien.js';
import { them } from './chung/luu.js';
import { tron, trungVi } from './chung/thong-ke.js';

/** Số liệu nghiên cứu mà công cụ so với (hồ sơ: kiem-dinh/trai-nghiem/stroop.yml). */
export const NGHIEN_CUU = {
	// stroop1935, Thí nghiệm 2: 100 sinh viên, mỗi thẻ 100 mục, gọi tên to; thời gian trung bình mỗi thẻ (giây)
	stroop1935: { soNguoi: 100, soMuc: 100, oVuong: 63.3, chuKhongKhop: 110.3, chamHon: 74 },
	// augustinova2019, Bảng 2: mức cản trở (không khớp trừ trung tính XXXX, ms), Thí nghiệm 1 và 2, trả lời bằng phím và bằng lời
	augustinova2019: { nam: 2019, phim: [76, 73], loi: [155, 168] },
};

export const BO_MAU = [
	{ chu: 'ĐỎ', muc: '#ff5a52', ten: 'đỏ' },
	{ chu: 'VÀNG', muc: '#ffd21f', ten: 'vàng' },
	{ chu: 'XANH', muc: '#5c9dff', ten: 'xanh (dương)' },
	{ chu: 'TRẮNG', muc: '#f4f4f4', ten: 'trắng' },
];
export const PHIM = ['d', 'f', 'j', 'k'];
const DIEU_KIEN = ['congruent', 'incongruent', 'neutral'];

// ---------- Tính toán (hàm thuần) ----------

/**
 * Một khối lượt cân bằng. Lượt: { cond: congruent | incongruent | neutral, ink: 0..k-1, word: 0..k-1 hay -1 (trung tính,
 * ####) }. Mỗi điều kiện nMoiDk lượt, mỗi màu mực đều nhau trong từng điều kiện; không có hai lượt liền nhau cùng màu mực;
 * lượt không khớp có chữ khác màu mực của lượt ngay trước (tránh mồi lặp lại).
 */
export function khoiStroop(nMoiDk, k, rand = Math.random) {
	const luot = [];
	DIEU_KIEN.forEach((cond, ci) => {
		for (let i = 0; i < nMoiDk; i++) {
			// lệch màu theo điều kiện để khối nhỏ (lượt khởi động) vẫn có nhiều màu mực
			const ink = (i + ci) % k;
			const word = cond === 'congruent' ? ink : cond === 'neutral' ? -1 : (ink + 1 + (Math.floor(i / k) % (k - 1))) % k;
			luot.push({ cond, ink, word });
		}
	});
	for (let lan = 0; lan < 1000; lan++) {
		const thuTu = xepThuTu(luot, rand);
		if (thuTu) return thuTu;
	}
	throw new Error('Không xếp được thứ tự lượt Stroop thỏa ràng buộc');
}

const hopVoi = (t, truoc) => !truoc || (t.ink !== truoc.ink && !(t.cond === 'incongruent' && t.word === truoc.ink));

/** Xếp ngẫu nhiên, lượt sau hợp với lượt trước, ưu tiên màu mực còn nhiều (bình phương) để khỏi kẹt ở cuối; kẹt thì null. */
function xepThuTu(luot, rand) {
	const con = tron(luot, rand);
	const ra = [];
	while (con.length) {
		const truoc = ra[ra.length - 1];
		const dem = {};
		for (const t of con) dem[t.ink] = (dem[t.ink] || 0) + 1;
		const chon = [];
		let tong = 0;
		con.forEach((t, i) => {
			if (!hopVoi(t, truoc)) return;
			const w = dem[t.ink] ** 2;
			chon.push([i, w]);
			tong += w;
		});
		if (!chon.length) return null;
		let x = rand() * tong;
		let j = 0;
		while (j < chon.length - 1 && x >= chon[j][1]) x -= chon[j++][1];
		ra.push(con.splice(chon[j][0], 1)[0]);
	}
	return ra;
}

/** Thứ tự hợp lệ: không hai lượt liền nhau cùng màu mực, lượt không khớp không mang chữ là màu mực của lượt trước. */
export const hopLeStroop = (ds) => ds.every((t, i) => hopVoi(t, ds[i - 1]));

/** Khoảng thời gian trả lời được tính (ms). */
export const RT_MIN = 200;
export const RT_MAX = 2500;

/**
 * Tóm tắt kết quả. luot: [{ cond, rt (ms) hay null khi hết giờ, correct, practice }]. Bỏ lượt khởi động, lượt sai, lượt
 * hết giờ, lượt ngoài [200, 2500] ms; báo trung vị theo điều kiện (ít bị kéo bởi vài lượt rất chậm). Hiệu ứng = trung vị
 * không khớp − trung vị khớp; phần trăm = (không khớp − trung tính) / trung tính, gần cách so của Stroop (1935): ô màu so
 * với chữ không khớp. Hợp lệ khi mỗi điều kiện còn ít nhất 8 lượt.
 */
export function tomTatStroop(luot) {
	const ra = { byCond: {}, excluded: 0, total: 0 };
	for (const c of DIEU_KIEN) {
		const het = luot.filter((t) => !t.practice && t.cond === c);
		const traLoi = het.filter((t) => t.rt != null);
		const sai = traLoi.filter((t) => !t.correct).length;
		const dung = traLoi.filter((t) => t.correct && t.rt >= RT_MIN && t.rt <= RT_MAX).map((t) => t.rt);
		ra.total += het.length;
		ra.excluded += het.length - dung.length;
		ra.byCond[c] = {
			n: het.length,
			used: dung.length,
			median: dung.length ? trungVi(dung) : NaN,
			// hết giờ tính là sai
			errorRate: het.length ? (sai + het.length - traLoi.length) / het.length : NaN,
		};
	}
	const C = ra.byCond;
	ra.effect = C.incongruent.median - C.congruent.median;
	ra.interferencePct = ((C.incongruent.median - C.neutral.median) / C.neutral.median) * 100;
	ra.valid = DIEU_KIEN.every((c) => C[c].used >= 8);
	return ra;
}

/** Cấu hình từ thông số của khối (data-per-cond, data-blocks, data-practice; CONG_CU.stroop.thongSo). */
export function cauHinh(d = {}) {
	return {
		moiDk: +d.perCond || 12,
		soPhan: +d.blocks || 2,
		khoiDong: d.practice != null ? +d.practice : 8,
		dauCong: 500,
		trongMin: 300,
		trongMax: 700,
		hetGio: 3000,
		phanHoi: 700,
	};
}

// ---------- Giao diện ----------

const KIEU = {
	color: {
		ten: 'Phiên bản màu',
		viec: 'Chọn MÀU MỰC của chữ, bỏ qua nghĩa của chữ.',
		dapAn: BO_MAU.map((c) => c.chu),
		ve(stim, t) {
			stim.textContent = t.word === -1 ? '####' : BO_MAU[t.word].chu;
			stim.style.color = BO_MAU[t.ink].muc;
		},
		tenDapAn: (i) => BO_MAU[i].ten,
	},
	count: {
		ten: 'Phiên bản đếm (không dùng màu)',
		viec: 'Cho biết CÓ BAO NHIÊU ký tự trên màn hình, bỏ qua giá trị của chữ số.',
		dapAn: ['1', '2', '3', '4'],
		// ink = số ký tự − 1; word = chữ số − 1, hay −1 (trung tính "#")
		ve(stim, t) {
			stim.textContent = Array(t.ink + 1)
				.fill(t.word === -1 ? '#' : String(t.word + 1))
				.join(' ');
			stim.style.color = '';
		},
		tenDapAn: (i) => String(i + 1),
	},
};

const bayGio = () => performance.now();
/** event.timeStamp cùng gốc với performance.now() ở trình duyệt hiện đại; lệch xa (đồng hồ giả của kiểm thử) thì lấy bây giờ. */
const lucSuKien = (e) => {
	const n = bayGio();
	return e?.timeStamp && Math.abs(e.timeStamp - n) < 1000 ? e.timeStamp : n;
};
let soKhoi = 0;

export function mount(el) {
	const C = cauHinh(el.dataset);
	const K = khung(el);
	const ma = ++soKhoi;
	let kieu = 'color';
	let cachTraLoi = 'unknown';
	let st = null; // lượt chạy đang làm

	const R = NGHIEN_CUU.stroop1935;
	const A = NGHIEN_CUU.augustinova2019;

	function gioiThieu() {
		ngungPhim();
		K.hien([
			h('p', { class: 'pz-cc__dan' }, ['Bạn sẽ thấy các chữ hiện lần lượt. Việc của bạn rất đơn giản, nhưng não bạn sẽ phải "cãi nhau" với chính nó. Khoảng 3 phút.']),
			h('fieldset', { class: 'pz-choice' }, [h('legend', { text: 'Chọn phiên bản' }), chon('color'), chon('count')]),
			h('div', {}, [
				h('p', {}, ['Bạn có phân biệt rõ bốn màu dưới đây không? Nếu không chắc (ví dụ bạn có mù màu một phần), hãy chọn phiên bản đếm: nó tạo ra cùng loại xung đột mà không cần đến màu sắc.']),
				h('div', { class: 'pz-swatches', 'aria-hidden': 'true' }, BO_MAU.map((c) => h('span', { class: 'pz-swatch', style: { background: c.muc } }))),
			]),
			nut('Tiếp tục', huongDan, { chinh: true, tuDong: true }),
			loiRiengTu(),
			lichSu('stroop', [
				['Phiên bản', (r) => (r.mode === 'count' ? 'Đếm' : 'Màu')],
				['Hiệu ứng', (r) => `${so(r.effect)} ms`],
				['Khớp', (r) => `${so(r.congruent)} ms`],
				['Không khớp', (r) => `${so(r.incongruent)} ms`],
			]),
		]);
	}

	function chon(gt) {
		const id = `pz-stroop-${ma}-${gt}`;
		return h('label', { class: 'pz-radio', for: id }, [
			h('input', { type: 'radio', name: `pz-stroop-${ma}`, id, value: gt, checked: kieu === gt, onchange: () => (kieu = gt) }),
			` ${KIEU[gt].ten}`,
		]);
	}

	function huongDan() {
		const M = KIEU[kieu];
		const viDu =
			kieu === 'color'
				? [h('span', { class: 'pz-ex', style: { color: BO_MAU[2].muc } }, ['ĐỎ']), ' → đáp án đúng là ', h('strong', {}, ['XANH']), ' (màu mực).']
				: [h('span', { class: 'pz-ex' }, ['3 3']), ' → đáp án đúng là ', h('strong', {}, ['2']), ' (có hai ký tự).'];
		K.hien([
			h('h3', { text: M.ten }),
			h('p', {}, [M.viec]),
			h('div', { class: 'pz-stage pz-stage--small' }, viDu),
			h('p', {}, [
				'Trả lời bằng bốn nút bên dưới khung, hoặc bằng phím ',
				...PHIM.flatMap((p, i) => [h('kbd', { text: p.toUpperCase() }), i < 3 ? ' ' : '']),
				kieu === 'count' ? ' (hoặc phím số 1–4).' : '.',
				' Hãy trả lời nhanh nhưng chính xác.',
			]),
			h('p', {}, [`Đầu tiên là ${C.khoiDong} lượt khởi động (có báo đúng/sai, không tính điểm).`]),
			h('div', { class: 'pz-cc__nut' }, [nut('Bắt đầu khởi động', () => chay(true), { chinh: true, tuDong: true }), nut('Quay lại', gioiThieu)]),
		]);
	}

	function taoLuot(khoiDong) {
		if (khoiDong)
			return [
				khoiStroop(Math.max(1, Math.ceil(C.khoiDong / 3)), 4)
					.slice(0, C.khoiDong)
					.map((t) => ({ ...t, practice: true })),
			];
		return Array.from({ length: C.soPhan }, (_, b) => khoiStroop(C.moiDk, 4).map((t) => ({ ...t, block: b })));
	}

	function chay(khoiDong) {
		const M = KIEU[kieu];
		const stim = h('div', { class: 'pz-stim', 'aria-hidden': 'true' });
		const stage = h('div', { class: 'pz-stage' }, [stim]);
		const fb = h('p', { class: 'pz-feedback', 'aria-live': 'assertive' });
		const dem = h('p', { class: 'pz-counter' });
		const nutDapAn = M.dapAn.map((chu, i) => {
			const b = h('button', { type: 'button', class: 'pz-answer', 'data-answer': i, 'aria-keyshortcuts': PHIM[i].toUpperCase() }, [
				h('span', { text: chu }),
				h('span', { class: 'pz-answer__key', 'aria-hidden': 'true', text: PHIM[i].toUpperCase() }),
			]);
			// chạm, chuột: nhận ngay lúc ấn xuống (đo thời gian chính xác hơn); bàn phím trên nút (Enter, phím cách): click
			b.addEventListener('pointerdown', (e) => {
				e.preventDefault();
				if (e.pointerType) cachTraLoi = e.pointerType;
				traLoi(i, e);
			});
			b.addEventListener('click', (e) => e.detail === 0 && traLoi(i, e));
			return b;
		});
		K.hien([dem, stage, fb, h('div', { class: 'pz-answers', role: 'group', 'aria-label': 'Đáp án' }, nutDapAn)]);
		stage.scrollIntoView?.({ block: 'center' });
		st = { khoiDong, khoi: taoLuot(khoiDong), b: 0, i: 0, kq: [], luc: null, hen: null, nhan: false, stim, fb, dem, stage };
		batPhim();
		luotSau();
	}

	const luotNay = () => st.khoi[st.b][st.i];

	function luotSau() {
		const s = st;
		if (!s) return;
		if (s.i >= s.khoi[s.b].length) {
			s.b += 1;
			s.i = 0;
			return s.b >= s.khoi.length ? xong() : nghi();
		}
		const tong = s.khoi.reduce((n, k) => n + k.length, 0);
		const daLam = s.khoi.slice(0, s.b).reduce((n, k) => n + k.length, 0) + s.i;
		s.dem.textContent = `${s.khoiDong ? 'Khởi động: ' : 'Lượt '}${daLam + 1} / ${tong}`;
		s.stim.textContent = '+';
		s.stim.style.color = '';
		s.stim.className = 'pz-stim pz-stim--fix';
		s.luc = null;
		s.nhan = false;
		const trong = C.trongMin + Math.random() * (C.trongMax - C.trongMin);
		s.hen = setTimeout(() => {
			if (st !== s) return;
			s.stim.textContent = '';
			s.hen = setTimeout(() => {
				if (st !== s) return;
				requestAnimationFrame(() => {
					if (st !== s) return;
					s.stim.className = 'pz-stim';
					KIEU[kieu].ve(s.stim, luotNay());
					s.nhan = true;
					requestAnimationFrame(() => {
						if (st === s && s.luc == null) s.luc = bayGio();
					});
					s.hen = setTimeout(() => traLoi(null, null), C.hetGio);
				});
			}, trong);
		}, C.dauCong);
	}

	function traLoi(dapAn, e) {
		const s = st;
		if (!s?.nhan) return;
		const t = e ? lucSuKien(e) : bayGio();
		s.luc ??= t; // trả lời trước khi khung hình kịp vẽ: thời gian ≈ 0, sẽ bị loại
		s.nhan = false;
		clearTimeout(s.hen);
		const luot = luotNay();
		const dung = dapAn === luot.ink;
		s.kq.push({
			cond: luot.cond,
			ink: luot.ink,
			word: luot.word,
			block: luot.block,
			practice: !!luot.practice,
			answer: dapAn,
			correct: dung,
			rt: dapAn == null ? null : Math.round((t - s.luc) * 10) / 10,
		});
		s.i += 1;
		s.stim.textContent = '';
		if (s.khoiDong && C.phanHoi) {
			s.fb.textContent = dapAn == null ? 'Hết giờ.' : dung ? 'Đúng.' : `Chưa đúng: đáp án là ${KIEU[kieu].tenDapAn(luot.ink)}.`;
			s.hen = setTimeout(() => {
				s.fb.textContent = '';
				luotSau();
			}, C.phanHoi);
		} else luotSau();
	}

	function nghi() {
		const s = st;
		s.stim.textContent = '';
		s.nhan = false;
		s.fb.textContent = `Nghỉ một chút. Xong ${s.b} / ${s.khoi.length} phần.`;
		const b = nut(
			'Tiếp tục',
			() => {
				b.remove();
				s.fb.textContent = '';
				luotSau();
			},
			{ chinh: true },
		);
		s.stage.append(b);
		b.focus();
	}

	function xong() {
		const s = st;
		ngungPhim();
		st = null;
		if (s.khoiDong) {
			const dung = s.kq.filter((r) => r.correct).length;
			K.hien([
				h('p', {}, [`Xong phần khởi động: đúng ${dung} / ${s.kq.length} lượt.`]),
				h('p', {}, [`Phần chính gồm ${C.soPhan * C.moiDk * 3} lượt, chia ${C.soPhan} phần, không báo đúng/sai. Bạn có thể nghỉ giữa các phần.`]),
				h('div', { class: 'pz-cc__nut' }, [nut('Bắt đầu phần chính', () => chay(false), { chinh: true, tuDong: true }), nut('Khởi động lại', () => chay(true))]),
			]);
			return;
		}
		const sum = tomTatStroop(s.kq);
		const r1 = (x) => (x == null || Number.isNaN(x) ? null : Math.round(x * 10) / 10);
		const B = sum.byCond;
		them('stroop', {
			mode: kieu,
			congruent: r1(B.congruent.median),
			neutral: r1(B.neutral.median),
			incongruent: r1(B.incongruent.median),
			effect: r1(sum.effect),
			pct: r1(sum.interferencePct),
			errors: { congruent: B.congruent.errorRate, neutral: B.neutral.errorRate, incongruent: B.incongruent.errorRate },
			valid: sum.valid,
			n: sum.total,
			input: cachTraLoi,
		});
		K.bao(`Đã xong. Hiệu ứng Stroop của bạn là ${so(sum.effect)} mili giây.`);
		ketQua(sum);
	}

	function ketQua(sum) {
		const B = sum.byCond;
		K.hien([
			h('h3', { text: 'Kết quả của bạn' }),
			sum.valid
				? null
				: canhBao('Chưa đủ lượt hợp lệ để tính', 'Có quá nhiều lượt sai, quá nhanh (dưới 200 ms) hoặc quá chậm. Kết quả dưới đây chỉ để tham khảo. Bạn có thể làm lại khi tập trung hơn.'),
			h('p', { class: 'pz-big-number' }, [h('strong', { text: `${so(sum.effect)} ms` }), ' là hiệu ứng Stroop của bạn']),
			h('p', {}, [
				sum.effect > 0
					? `Bạn trả lời chậm hơn ${so(sum.effect)} ms khi chữ và đáp án mâu thuẫn nhau, so với khi chúng khớp.`
					: 'Lần này bạn không chậm hơn ở lượt mâu thuẫn. Điều đó có thể xảy ra, nhất là khi số lượt ít hoặc bạn trả lời rất cẩn thận.',
			]),
			bieuDoCot(
				[
					{ ten: 'Khớp', gt: B.congruent.median, chu: `${so(B.congruent.median)} ms` },
					{ ten: 'Trung tính', gt: B.neutral.median, chu: `${so(B.neutral.median)} ms` },
					{ ten: 'Không khớp', gt: B.incongruent.median, chu: `${so(B.incongruent.median)} ms`, nhan: true },
				],
				{ tieuDe: 'Thời gian trả lời trung vị theo loại lượt' },
			),
			h('p', { class: 'pz-small' }, [
				`Trung vị thời gian trả lời, chỉ tính lượt đúng trong khoảng ${so(RT_MIN)}–${so(RT_MAX)} ms. `,
				`Tỉ lệ sai: khớp ${so(B.congruent.errorRate * 100)}%, trung tính ${so(B.neutral.errorRate * 100)}%, không khớp ${so(B.incongruent.errorRate * 100)}%. `,
				`Đã loại ${sum.excluded} / ${sum.total} lượt.`,
			]),
			h('h4', { text: 'So với nghiên cứu gốc' }),
			h('p', {}, [
				`Trong Thí nghiệm 2 của J. Ridley Stroop (1935), ${R.soNguoi} sinh viên gọi tên to màu của ${R.soMuc} mục trên một tấm thẻ. `,
				`Gọi tên màu của các ô vuông mất trung bình ${so(R.oVuong, 1)} giây; gọi tên màu mực của các chữ chỉ màu khác mất ${so(R.chuKhongKhop, 1)} giây: chậm hơn khoảng ${R.chamHon}%.`,
			]),
			h('p', {}, [
				kieu === 'color'
					? `Ở bài này, lượt không khớp của bạn chậm hơn lượt trung tính (####) ${so(sum.interferencePct)}%.`
					: `Phiên bản đếm không có số liệu gốc của Stroop (1935) để so trực tiếp. Lượt không khớp của bạn chậm hơn lượt trung tính ${so(sum.interferencePct)}%.`,
			]),
			kieu === 'color'
				? h('p', {}, [
						`Với cách trả lời bằng phím bấm như ở đây, hai thí nghiệm năm ${A.nam} (Augustinova và cộng sự) đo được mức cản trở (lượt không khớp so với lượt trung tính) ${A.phim[0]} ms và ${A.phim[1]} ms, khoảng một nửa so với khi người tham gia nói to câu trả lời (${A.loi[0]} ms và ${A.loi[1]} ms). `,
						`Tính theo cách ấy, lượt không khớp của bạn chậm hơn lượt trung tính ${so(B.incongruent.median - B.neutral.median)} ms.`,
					])
				: null,
			thuGon('Vì sao con số của bạn khó giống với nghiên cứu gốc?', [
				'Stroop đo tổng thời gian đọc to cả một tấm thẻ; ở đây bạn bấm nút cho từng lượt. Cách trả lời khác nhau cho ra độ lớn hiệu ứng khác nhau.',
				'Bấm nút đòi hỏi nhớ vị trí bốn đáp án, cộng thêm thời gian vào mọi lượt, nên tỉ lệ % thường nhỏ hơn.',
				'Thiết bị có độ trễ riêng (màn hình, bàn phím, màn cảm ứng), khác nhau giữa các máy và trình duyệt. Nếu độ trễ gần như như nhau ở mọi lượt, phép trừ "không khớp − khớp" ít bị ảnh hưởng hơn từng con số riêng lẻ.',
				`Mỗi người khác nhau, và cùng một người cũng dao động giữa các lần làm. Với khoảng ${C.soPhan * C.moiDk} lượt mỗi điều kiện, kết quả của một lần làm còn khá "ồn".`,
			]),
			nut('Làm lại', gioiThieu, { chinh: true, tuDong: true }),
			loiRiengTu(),
		]);
	}

	function khiAnPhim(e) {
		if (!st || e.ctrlKey || e.metaKey || e.altKey) return;
		// đang gõ vào ô nhập (ô tìm kiếm của trang…) thì phím là chữ, không phải đáp án (review D8-L1)
		const t = e.target;
		if (t instanceof Element && (t.closest('input, textarea, select') || t.isContentEditable)) return;
		const k = (e.key || '').toLowerCase();
		let i = PHIM.indexOf(k);
		if (i === -1 && kieu === 'count' && /^[1-4]$/.test(k)) i = +k - 1;
		if (i === -1) return;
		e.preventDefault();
		cachTraLoi = 'keyboard';
		traLoi(i, e);
	}

	function batPhim() {
		ngungPhim();
		K.dangChay(true);
		document.addEventListener('keydown', khiAnPhim);
	}

	function ngungPhim() {
		K.dangChay(false);
		document.removeEventListener('keydown', khiAnPhim);
		if (st) clearTimeout(st.hen);
	}

	gioiThieu();
	el.dataset.san = '1';
}
