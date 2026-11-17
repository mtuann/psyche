// Thống kê dùng chung cho các công cụ (D8-L1; viết lại từ ../psyche-zero/docs/assets/js/stats.js): hàm thuần, chạy được
// trong Node (kiểm thử: tests/cong-cu.test.mjs). Phần riêng của từng công cụ (sinh lượt Stroop, dãy chữ số) nằm ở module
// của công cụ ấy; ở đây chỉ phần nhiều công cụ dùng: trung vị, bộ sinh số ngẫu nhiên có hạt giống, xáo trộn, và quy trình
// đo độ dài trí nhớ (chữ số ở D8-L1, từ ở D8-L2).

const xep = (xs) => [...xs].sort((a, b) => a - b);

export function trungBinh(xs) {
	if (!xs.length) return NaN;
	return xs.reduce((s, x) => s + x, 0) / xs.length;
}

/** Độ lệch chuẩn mẫu (chia n − 1). */
export function doLechChuan(xs) {
	if (xs.length < 2) return NaN;
	const m = trungBinh(xs);
	return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1));
}

/** Phân vị theo nội suy tuyến tính (kiểu 7 của R), p trong [0, 1]. */
export function phanVi(xs, p) {
	if (!xs.length) return NaN;
	const s = xep(xs);
	const h = (s.length - 1) * p;
	const lo = Math.floor(h);
	const hi = Math.ceil(h);
	return s[lo] + (h - lo) * (s[hi] - s[lo]);
}

export const trungVi = (xs) => phanVi(xs, 0.5);

/** Bộ sinh số ngẫu nhiên có hạt giống (mulberry32), để kiểm thử lặp lại được. */
export function ngauNhien(hat) {
	let a = hat >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Bản xáo trộn (Fisher–Yates) của mảng, không sửa mảng gốc. */
export function tron(xs, rand = Math.random) {
	const a = [...xs];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// ---------- Độ dài trí nhớ (chữ số, từ) ----------

/**
 * Quy trình đo độ dài trí nhớ: bắt đầu từ độ dài `batDau`, mỗi độ dài 2 lượt; dừng khi sai cả 2 lượt ở cùng một độ dài,
 * hay khi xong độ dài `toiDa`. Độ dài trí nhớ = độ dài dài nhất có ít nhất một lượt đúng.
 * @param {{ len: number, correct: boolean }[]} lichSu
 * @returns {{ done: boolean, nextLen: number | null, span: number }}
 */
export function trangThaiDoDai(lichSu, batDau = 3, toiDa = 12) {
	const theoDoDai = {};
	for (const x of lichSu) (theoDoDai[x.len] ??= []).push(x.correct);
	let span = 0;
	for (const [l, kq] of Object.entries(theoDoDai)) if (kq.some(Boolean)) span = Math.max(span, +l);
	if (!lichSu.length) return { done: false, nextLen: batDau, span: 0 };
	const nay = lichSu[lichSu.length - 1].len;
	const kq = theoDoDai[nay];
	if (kq.length < 2) return { done: false, nextLen: nay, span };
	if (!kq.some(Boolean) || nay >= toiDa) return { done: true, nextLen: null, span };
	return { done: false, nextLen: nay + 1, span };
}

/**
 * Cộng dồn đúng sai theo vị trí qua các lượt.
 * @param {{ positions: boolean[] }[]} luot
 * @returns {{ correct: number, total: number }[]} phần tử 0 là vị trí 1
 */
export function gopViTri(luot) {
	const ra = [];
	for (const l of luot ?? [])
		(l.positions ?? []).forEach((dung, i) => {
			ra[i] ??= { correct: 0, total: 0 };
			ra[i].total += 1;
			if (dung) ra[i].correct += 1;
		});
	return ra;
}

/**
 * Dạng của đường vị trí chuỗi: "u" (nhóm đầu và nhóm cuối cao hơn nhóm giữa, như hiệu ứng đầu và hiệu ứng cuối), "none"
 * (không thấy), "insufficient" (dưới 4 vị trí, hay một nhóm dưới 2 lượt). Chỉ là mô tả, không phải kiểm định thống kê.
 */
export function dangViTri(gop) {
	const n = gop.length;
	if (n < 4) return 'insufficient';
	const k = Math.max(1, Math.floor(n / 3));
	const ti = [gop.slice(0, k), gop.slice(k, n - k), gop.slice(n - k)].map((g) => {
		const c = g.reduce((s, p) => s + p.correct, 0);
		const t = g.reduce((s, p) => s + p.total, 0);
		return t >= 2 ? c / t : NaN;
	});
	if (ti.some(Number.isNaN)) return 'insufficient';
	return ti[0] > ti[1] && ti[2] > ti[1] ? 'u' : 'none';
}
