// Kho kết quả của các công cụ, trong trình duyệt (D8-L1; viết lại từ ../psyche-zero/docs/assets/js/progress.js). Một khóa
// localStorage "psyche-zero" như site cũ (cùng tên miền mtuann.github.io), nên người dùng cũ giữ được kết quả. Không gửi gì
// đi đâu.
//
// Dữ liệu (phiên bản 1, giữ y như site cũ):
// { v: 1, records: { [id]: { id, kind, t, ...dữ liệu } }, prefs: { [khóa]: { value, t } } }
// Bản ghi có id riêng và không bao giờ bị sửa sau khi tạo, nên gộp hai bản sao lưu là hợp các bản ghi theo id: không mất,
// gộp nhiều lần không nhân đôi, thứ tự gộp không đổi kết quả. Tùy chọn: bản ghi sau thắng.
//
// `kind` của từng công cụ (giữ như site cũ, trang "Dữ liệu của tôi" và "Nhật ký" đọc theo đó): stroop, digitspan,
// illusion (Müller-Lyer), changeblind, ebbinghaus; lô sau thêm của công cụ mình. Hàm thuần dùng được cả trong Node
// (kiểm thử: tests/cong-cu.test.mjs); không có localStorage thì giữ trong bộ nhớ, chỉ sống trong phiên.

export const KHOA = 'psyche-zero';
export const PHIEN_BAN = 1;

const laDoiTuong = (x) => !!x && typeof x === 'object' && !Array.isArray(x);

export const rong = () => ({ v: PHIEN_BAN, records: {}, prefs: {} });

/** Dữ liệu bất kỳ (hỏng, hay của phiên bản khác) thành dạng phiên bản 1; bỏ bản ghi, tùy chọn không đúng dạng. */
export function chuanHoa(data) {
	const ra = rong();
	if (!laDoiTuong(data)) return ra;
	if (laDoiTuong(data.records))
		for (const [id, r] of Object.entries(data.records))
			if (id !== '__proto__' && laDoiTuong(r) && typeof r.kind === 'string' && typeof r.t === 'number') ra.records[id] = { ...r, id };
	if (laDoiTuong(data.prefs))
		for (const [k, p] of Object.entries(data.prefs)) if (k !== '__proto__' && laDoiTuong(p) && typeof p.t === 'number') ra.prefs[k] = { value: p.value, t: p.t };
	return ra;
}

/** JSON với khóa xếp theo chữ cái: so sánh và phân xử hòa không phụ thuộc thứ tự khóa. */
export function onDinh(x) {
	if (Array.isArray(x)) return `[${x.map(onDinh).join(',')}]`;
	if (laDoiTuong(x))
		return `{${Object.keys(x)
			.sort()
			.map((k) => `${JSON.stringify(k)}:${onDinh(x[k])}`)
			.join(',')}}`;
	return JSON.stringify(x);
}

/**
 * Gộp hai bộ dữ liệu (hàm thuần, không sửa đầu vào). Bản ghi: hợp theo id; cùng id mà khác nội dung (sửa tay) thì lấy bản
 * có chuỗi ổn định nhỏ hơn, để kết quả không phụ thuộc thứ tự. Tùy chọn: t lớn hơn thắng, hòa thì so chuỗi ổn định.
 */
export function gop(a, b) {
	const ra = rong();
	for (const nguon of [chuanHoa(a), chuanHoa(b)]) {
		for (const [id, r] of Object.entries(nguon.records)) {
			const cu = ra.records[id];
			if (!cu || onDinh(r) < onDinh(cu)) ra.records[id] = r;
		}
		for (const [k, p] of Object.entries(nguon.prefs)) {
			const cu = ra.prefs[k];
			if (!cu || p.t > cu.t || (p.t === cu.t && onDinh(p) < onDinh(cu))) ra.prefs[k] = p;
		}
	}
	return ra;
}

/** Xem trước khi gộp: bao nhiêu bản ghi mới (theo loại), bao nhiêu đã có. Tên trường như site cũ. */
export function soSanh(hienCo, moi) {
	const a = chuanHoa(hienCo);
	const b = chuanHoa(moi);
	const byKind = {};
	let added = 0;
	let alreadyPresent = 0;
	for (const [id, r] of Object.entries(b.records)) {
		if (a.records[id]) alreadyPresent += 1;
		else {
			added += 1;
			byKind[r.kind] = (byKind[r.kind] || 0) + 1;
		}
	}
	return { added, byKind, alreadyPresent };
}

/** Ngày (giờ địa phương) dạng năm-tháng-ngày. */
export function ngay(t) {
	const d = new Date(t);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Tóm tắt: số bản ghi, theo loại, số ngày có bản ghi. */
export function tomTat(data) {
	const d = chuanHoa(data);
	const byKind = {};
	const days = new Set();
	for (const r of Object.values(d.records)) {
		byKind[r.kind] = (byKind[r.kind] || 0) + 1;
		days.add(ngay(r.t));
	}
	return { records: Object.keys(d.records).length, byKind, days: days.size };
}

/** Id mới cho bản ghi: loại, thời điểm (cơ số 36), số ngẫu nhiên. */
export const taoId = (kind, t, rand = Math.random) => `${kind}-${t.toString(36)}-${Math.floor(rand() * 1e9).toString(36)}`;

// ---------- localStorage (chỉ trong trình duyệt) ----------

// dự phòng khi không có localStorage (chế độ riêng tư, bị chặn) hay khi ghi hỏng (đầy chỗ): chỉ sống trong phiên. Khác null
// thì là bản mới nhất (đọc từ kho rồi thêm), nên doc() đọc nó trước kho: bản ghi vừa làm không biến mất (review D8-L1)
let boNho = null;

function kho() {
	try {
		const s = globalThis.localStorage;
		if (!s) return null;
		const thu = `${KHOA}:probe`;
		s.setItem(thu, '1');
		s.removeItem(thu);
		return s;
	} catch {
		return null;
	}
}

/** Lưu được lâu (có localStorage) không. */
export const coLuu = () => !!kho();

export function doc() {
	const s = kho();
	if (!s || boNho) return chuanHoa(boNho);
	const chu = s.getItem(KHOA);
	try {
		return chuanHoa(JSON.parse(chu || 'null'));
	} catch {
		// chữ hỏng (không phải JSON): chép sang khóa phụ trước khi lần ghi sau đè lên, để còn cứu được (chỉ chép lần đầu)
		try {
			if (s.getItem(`${KHOA}:hong`) === null) s.setItem(`${KHOA}:hong`, chu);
		} catch {}
		return rong();
	}
}

/** Ghi cả bộ dữ liệu; trả về false nếu chỉ giữ được trong bộ nhớ. */
export function ghi(data) {
	const d = chuanHoa(data);
	const s = kho();
	if (s)
		try {
			s.setItem(KHOA, JSON.stringify(d));
			boNho = null;
			return true;
		} catch {}
	boNho = d;
	return false;
}

/** Thêm một bản ghi kết quả; trả về bản ghi đã lưu. */
export function them(kind, duLieu) {
	const t = Date.now();
	const r = { ...duLieu, kind, t, id: taoId(kind, t) };
	const d = doc();
	d.records[r.id] = r;
	ghi(d);
	return r;
}

/** Các bản ghi (của một loại, hay mọi loại), cũ trước. */
export function ds(kind) {
	return Object.values(doc().records)
		.filter((r) => !kind || r.kind === kind)
		.sort((a, b) => a.t - b.t);
}

export function layTuyChon(k, macDinh) {
	const p = doc().prefs[k];
	return p ? p.value : macDinh;
}

export function datTuyChon(k, value) {
	const d = doc();
	d.prefs[k] = { value, t: Date.now() };
	ghi(d);
}

/** Gộp bản sao lưu vào dữ liệu hiện có; trả về bộ dữ liệu sau khi gộp. */
export function nhap(moi) {
	const d = gop(doc(), moi);
	ghi(d);
	return d;
}

export function xoaHet() {
	boNho = null;
	kho()?.removeItem(KHOA);
}
