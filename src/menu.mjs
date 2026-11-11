// Menu bên của site (D1.3; bố cục C, plans/lam-lai/ban-mau/README.md): tám nhóm theo thứ tự dưới đây, nhóm Nền tảng chia
// theo 14 lĩnh vực của src/data/linh-vuc.yml. Trang trong nhóm theo thứ tự của src/data/trang.yml (thứ tự menu của site
// cũ). Chỉ trang có trong bản build (src/ban-build.mjs) mới vào menu; nhóm, lĩnh vực chưa có trang nào vẫn hiện tên kèm
// nhãn "sắp có" (src/components/Sidebar.astro). Menu chỉ dựng từ đường dẫn, tầng và lĩnh vực, không đọc chữ của trang:
// tên mục là tiêu đề trang (Starlight tự lấy).
// Lĩnh vực của Nền tảng liệt kê mọi bài của nó (như ::danh-sach-bai{linh_vuc} ở trang lĩnh vực), kể cả bài thuộc nhóm
// khác (Học tập: bài thí nghiệm; Phương pháp: bài Hiểu bằng chứng). Bản lặp ấy có attrs data-lap: trang không coi là
// trang đang xem ở chỗ lặp, nút Trước, Tiếp bỏ qua chỗ lặp (src/dieu-huong.mjs), nên mỗi bài vẫn có một chỗ gốc.

/** Nhóm menu: id (cũng là tên biểu tượng, src/bieu-tuong.mjs), tên, trang nào thuộc nhóm. */
export const NHOM = [
	{ id: 'bat-dau', ten: 'Bắt đầu', khop: (t) => t.startsWith('bat-dau/') },
	// Nền tảng: bài khám phá (lõi, mở rộng) và trang lĩnh vực, chia theo lĩnh vực; trang mục lục Khám phá đứng đầu
	{ id: 'nen-tang', ten: 'Nền tảng', khop: (t) => t.startsWith('kham-pha/') || t.startsWith('nen-tang/') },
	{ id: 'thi-nghiem', ten: 'Thí nghiệm kinh điển', khop: (t) => t.startsWith('thi-nghiem/') },
	{ id: 'bang-chung', ten: 'Hiểu bằng chứng', khop: (t) => t.startsWith('bang-chung/') },
	{ id: 'trai-nghiem', ten: 'Tự trải nghiệm', khop: (t) => t.startsWith('trai-nghiem/') },
	{ id: 'ngo-nhan', ten: 'Ngộ nhận phổ biến', khop: (t) => t.startsWith('ngo-nhan/') },
	{ id: 'ho-tro', ten: 'Hỗ trợ', khop: (t) => t.startsWith('ho-tro/') },
	{ id: 'them', ten: 'Thêm', khop: (t) => t.startsWith('them/') || t.startsWith('sach/') },
];

/** Nhóm menu của một trang, hay undefined (trang chủ, 404). */
export const nhomCuaTrang = (t) => NHOM.find((n) => n.khop(t));

const laMucLuc = (t) => /(^|\/)index$/.test(t);
const slug = (t) => t.replace(/\/?index$/, '');
/** Mục menu của một trang: trang mục lục, trang lĩnh vực hiện "Tổng quan"; trang khác lấy tiêu đề trang. */
const muc = (t) => (laMucLuc(t) || t.startsWith('nen-tang/') ? { slug: slug(t), label: 'Tổng quan' } : { slug: slug(t) });
/** Thuộc tính đánh dấu bản lặp của một bài trong lĩnh vực của Nền tảng. */
export const LAP = 'data-lap';
/** Bài (lõi, mở rộng) ở nhóm khác mà vẫn kể trong lĩnh vực của Nền tảng: như laBai của src/plugins/thanh-phan.mjs. */
const laBaiNhomKhac = (r) => /^(thi-nghiem|bang-chung)\//.test(r.id) && !r.id.endsWith('/index') && (r.tang === 'loi' || r.tang === 'mo-rong');

/**
 * Cấu hình sidebar cho Starlight.
 * @param {string[]} trang trang có trong bản build (trangTrongBan)
 * @param {{ id: string, tang: string, linh_vuc?: string }[]} banGhi bản ghi của trang.yml (thứ tự menu)
 * @param {{ id: string, ten: string, thu_tu: number }[]} linhVuc bản ghi của linh-vuc.yml
 */
export function menu(trang, banGhi, linhVuc) {
	const co = new Set(trang);
	const thuTu = new Map(banGhi.map((r, i) => [r.id, i]));
	const lv = new Map(banGhi.map((r) => [r.id, r.linh_vuc]));
	const ghi = new Map(banGhi.map((r) => [r.id, r]));
	// trang có trong bản build mà trang.yml không có (không thể: build hỏng trước) xếp cuối, theo chữ cái
	const xep = (ds) => [...ds].sort((a, b) => (thuTu.get(a) ?? Infinity) - (thuTu.get(b) ?? Infinity) || a.localeCompare(b));
	return NHOM.map((n) => {
		const ds = xep(trang.filter((t) => n.khop(t)));
		if (n.id !== 'nen-tang') return { label: n.ten, collapsed: true, items: ds.map(muc) };
		const dau = ds.filter((t) => t === 'kham-pha/index').map(muc);
		const nhomLv = [...linhVuc]
			.sort((a, b) => a.thu_tu - b.thu_tu)
			.map((l) => {
				// trang lĩnh vực đứng đầu lĩnh vực của nó
				const cua = ds.filter((t) => t !== 'kham-pha/index' && lv.get(t) === l.id && co.has(t));
				cua.sort((a, b) => Number(b.startsWith('nen-tang/')) - Number(a.startsWith('nen-tang/')));
				const lap = xep(trang.filter((t) => co.has(t) && ghi.get(t)?.linh_vuc === l.id && laBaiNhomKhac(ghi.get(t))));
				return { label: l.ten, collapsed: true, items: [...cua.map(muc), ...lap.map((t) => ({ slug: t, attrs: { [LAP]: '' } }))] };
			});
		return { label: n.ten, collapsed: true, items: [...dau, ...nhomLv] };
	});
}

const laLap = (e) => e.type === 'link' && e.attrs?.[LAP] !== undefined;

/**
 * Sửa dữ liệu trang của Starlight cho bản lặp (route middleware, src/dieu-huong.mjs): trang đang xem là chỗ gốc, không
 * phải chỗ lặp (nhóm gốc mở, menu cuộn tới chỗ gốc), Trước và Tiếp tính trên menu bỏ chỗ lặp. prev, next của frontmatter: chỉ
 * xử lý false (trang 404); trang nào dùng kiểu khác thì cần thêm ở đây.
 * @param {{ sidebar: any[], pagination: { prev?: any, next?: any }, entry: { data: { prev?: unknown, next?: unknown } } }} route
 */
export function suaBanLap(route) {
	const di = (ds) => ds.flatMap((e) => (e.type === 'group' ? di(e.entries) : [e]));
	const tatCa = di(route.sidebar);
	if (!tatCa.some(laLap)) return;
	// Starlight chỉ đánh dấu chỗ khớp đầu tiên của địa chỉ, tức chỗ lặp (Nền tảng đứng trước): dời sang chỗ gốc
	const dangXem = tatCa.find((e) => e.isCurrent);
	const goc = tatCa.filter((e) => !laLap(e));
	if (dangXem && laLap(dangXem)) {
		dangXem.isCurrent = false;
		const g = goc.find((e) => e.href === dangXem.href);
		if (g) g.isCurrent = true;
	}
	const i = goc.findIndex((e) => e.isCurrent);
	const { prev, next } = route.entry.data;
	route.pagination = {
		prev: prev === false || i < 1 ? undefined : goc[i - 1],
		next: next === false || i < 0 ? undefined : goc[i + 1],
	};
}
