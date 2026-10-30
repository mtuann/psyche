// Trạng thái kiểm định của một trang, cho dòng trạng thái dưới tiêu đề (src/components/PageTitle.astro). Chép từ
// ../opus/src/kiem-dinh.mjs rồi sửa cho Psyche. Trạng thái không ghi trong trang (để mã băm không đổi khi khóa) mà đọc
// lúc build từ kiem-dinh/: khoa.json { "trang": { "<đường dẫn trang>": "sha256:…" } } (ghi bằng node tools/khoa.mjs,
// D1.6) và hồ sơ kiem-dinh/<đường dẫn trang>.yml (plans/ben-vung/chuan-kiem-dinh.md mục 6).
import { parse } from 'yaml';

/**
 * null khi trang chưa khóa; còn không thì { ngay, nhanDinh, tang }: ngày của lần kiểm định gần nhất ("2026-11-02"), số
 * nhận định trong hồ sơ, tầng lúc khóa. Trang khóa mà hồ sơ không có nhận định (trang chủ tạm, trang 404) thì nhanDinh là
 * 0: không có gì để kiểm, không hiện dòng trạng thái.
 * @param {string} trang đường dẫn trang, như "thi-nghiem/asch" (trang mục lục: "thi-nghiem/index")
 * @param {{ trang?: Record<string, string> } | undefined} khoa nội dung kiem-dinh/khoa.json
 * @param {string | undefined} hoSo chữ của kiem-dinh/<trang>.yml
 */
export function kiemDinh(trang, khoa, hoSo) {
	if (!khoa?.trang?.[trang]) return null;
	const hs = (hoSo && parse(hoSo)) || {};
	const ngay = hs.lan?.at(-1)?.ngay;
	return { ngay: ngay ? String(ngay) : null, nhanDinh: (hs.nhan_dinh ?? []).length, tang: hs.tang ?? null };
}

/** "2026-11-02" -> "2/11/2026", không phụ thuộc bộ dữ liệu ngôn ngữ của Node. */
export const ngayViet = (ngay) => {
	const [n, t, d] = String(ngay).split('-').map(Number);
	return `${d}/${t}/${n}`;
};

/** "2027-11" -> "11/2027". */
export const thangViet = (namThang) => {
	const [n, t] = String(namThang).split('-').map(Number);
	return `${t}/${n}`;
};

/** Mức kiểm định của mỗi tầng, như người đọc thấy (chuan-kiem-dinh.md mục 3). */
export const MUC_THEO_TANG = {
	loi: 'Kiểm chứng hai lượt độc lập',
	'mo-rong': 'Kiểm chứng hai lượt, lượt hai kiểm mẫu',
	'cong-cu': 'Số liệu trong công cụ kiểm chứng hai lượt',
	'co-han': 'Kiểm chứng hai lượt, có hạn kiểm lại',
	'cap-nhat': 'Mỗi mục kiểm chứng hai lượt',
};

/**
 * Chữ của dòng trạng thái cho trang đã khóa có nhận định, như "Kiểm chứng hai lượt độc lập, khóa ngày 5/11/2026 · xem
 * lại trước 11/2027".
 * @param {{ ngay: string | null, tang: string | null }} kd kết quả của kiemDinh
 * @param {{ tang: string, kiem_lai_truoc?: string } | undefined} banGhi bản ghi của trang trong trang.yml
 */
export function chuTrangThai(kd, banGhi) {
	const muc = MUC_THEO_TANG[kd.tang ?? banGhi?.tang] ?? 'Đã kiểm chứng';
	const phan = [muc + (kd.ngay ? `, khóa ngày ${ngayViet(kd.ngay)}` : '')];
	if (banGhi?.kiem_lai_truoc) phan.push(`xem lại trước ${thangViet(banGhi.kiem_lai_truoc)}`);
	return phan.join(' · ');
}
