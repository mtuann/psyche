# D4-L2, lượt 1, phần 2/2

Nhánh `moi/d4-l2`, 30/10/2026. Model: Claude Sonnet 5.5. Ba trang: `bang-chung/co-mau-suc-manh`, `bang-chung/doc-bai-bao-khoa-hoc`, `bang-chung/dao-duc-nghien-cuu`. Không build, không commit. Hồ sơ đọc được bằng `node tools/khoa.mjs xuat bang-chung/<trang>`.

## Đã làm

- Chuẩn hóa khuôn 7 mục cho cả ba trang: thêm Mức độ chắc chắn (2 khung nhãn mỗi trang, có `co_so`, `ly_do`), Bài tập (`### Thử một lần { #thu-mot-lan }` giữ, thêm `### Kiểm tra nhanh` 3 câu), đổi "Tự suy ngẫm" thành `## Thử suy ngẫm { #tu-suy-ngam }`.
- Viết lại các chỗ sai hay mạnh hơn nguồn; mỗi chỗ ghi `doi_chu` và `ghi_chu` (chữ cũ, chữ mới, lý do).

## Số nhận định

| Trang | Tổng | Loại | Kết quả |
|---|---|---|---|
| co-mau-suc-manh | 51 | 12 so-lieu, 16 phat-hien, 8 loi-khuyen, 5 lich-su, 5 dinh-nghia, 3 ve-site, 2 nhan | 26 dung, 16 da-sua, 8 da-lam-mem, 1 da-bo |
| doc-bai-bao-khoa-hoc | 55 | 20 loi-khuyen, 15 phat-hien, 10 dinh-nghia, 4 so-lieu, 2 lich-su, 2 ve-site, 2 nhan | 21 dung, 20 da-sua, 14 da-lam-mem |
| dao-duc-nghien-cuu | 56 | 28 phat-hien, 11 loi-khuyen, 6 ve-site, 5 dinh-nghia, 4 lich-su, 2 nhan | 26 dung, 20 da-sua, 10 da-lam-mem |

Nhãn: cả ba trang Vững chắc cho nguyên tắc phương pháp hay chuẩn đạo đức (xét theo đồng thuận của các nguồn, ghi ở `ly_do`); riêng co-mau-suc-manh có thêm một khung Khá vững (công suất thực tế của nghiên cứu, vì Nord 2017 thấy không đồng đều).

## Đã sửa, đã làm mềm, đã bỏ (chỗ quan trọng)

- co-mau-suc-manh c25: "chưa bằng một phần tư quy ước 0,8" sai (21/80 = 26%). c24: Button dùng 49 bài tổng hợp (Nord, BPS), không phải 48 (số của The Transmitter), và ước tính công suất cho nghiên cứu cỡ trung vị mỗi bài chứ không phải từng nghiên cứu. c12–c14: lý do Cohen chọn 0,8 viết lại theo Cohen 1988 trích trong Lakens 2022 (tỉ lệ 4:1, "arbitrary but reasonable", dùng khi không có cơ sở khác); câu cũ "thỏa hiệp chi phí", "mức tối thiểu nên đạt" trái lời Cohen. c18: bảng cỡ mẫu tính lại (394, 64, 26), cột "ví dụ trực quan" bỏ. c16: câu "thử nghiệm thuốc nhắm 0,9" bỏ (không có nguồn mở). c34, c43: "tung đồng xu còn đáng tin hơn" và hàng "p sát 0,05" bỏ. Đáp án "Thử một lần" bỏ "ổn định", "p sát nút". Thêm Szucs & Ioannidis 2017 và phản biện của Nord 2017.
- doc-bai-bao-khoa-hoc d6: "tất cả những bài báo đó đều vượt qua phản biện" (10.000 bài) mạnh hơn bản tin, chỉ nói về Hindawi; d38–d41: "2–3 chuyên gia", "thường ẩn danh", "không được xem dữ liệu gốc" không có nguồn (ICMJE nói ngược lại về quyền tiếp cận tài liệu) nên viết lại theo ICMJE 2026; d19–d25: "thứ tự đọc khôn ngoan" thành "không có thứ tự đúng duy nhất" (Carey 2020).
- dao-duc-nghien-cuu e37: "debriefing ngay sau đó" sai, APA 8.07(c) cho phép muộn nhất đến khi kết thúc thu thập dữ liệu; e24: "hội đồng độc lập" không phải chữ của 46.107 (độc lập là chữ của Helsinki); e32, e35: Milgram và Asch viết theo trang nhà ("chim mồi"), bỏ câu "những tranh luận này là lý do hệ thống bảo vệ ra đời"; e50–e53: đáp án "Vi phạm …" thành câu hỏi đặt ra theo nguồn (tình huống điểm quá trình hợp lệ nếu có lựa chọn thay thế tương đương, APA 8.04(b)); bỏ Wikipedia khỏi mục Nguồn.

## Chỗ chưa chắc, chỗ khó

- Button 2013 toàn văn bị khóa (chỉ đọc được tóm tắt). Con số 49 bài, 730 nghiên cứu, 21%, 8%, 18% và 31% lấy qua Nord 2017 (toàn văn, bậc 1) và Research Digest của BPS (bậc 3); số 8–31% có trong tóm tắt. Một lần thử lấy bản Button qua Wayback bị hệ thống chặn nên không dùng. Lượt 2 và review nên kiểm lại c24–c28 nếu có toàn văn.
- Cohen 1992 và Cohen 1988: chỉ đọc tóm tắt và đoạn Lakens (2022) trích Cohen 1988; số d = 0,2, 0,5, 0,8 không có trong tóm tắt (c18).
- Jefferson 2007 (Cochrane): chỉ đọc tóm tắt.
- Belmont: trang hhs.gov chặn tự động (403); đọc bản scan Federal Register 44(76), 23192–23197 (govinfo.gov), toàn văn.
- 45 CFR 46 đọc qua eCFR (bản 1/10/2026), từng điều riêng, công cụ đọc web tóm tắt; Helsinki bản 2024 đọc trang wma.net; Helsinki viết cho nghiên cứu y học.
- Nhãn nguyên tắc phương pháp: thước đo mục 4 viết cho phát hiện thực nghiệm; đã xét theo đồng thuận như nhãn của p-value đã khóa (review nên xác nhận).
- Trang đạo đức không nói quy định Việt Nam (e31, ve-site): lời giao nói "nếu trang nói tới", nên không thêm.

## Nguồn hay dùng

ICMJE 2026 (PDF chính thức), Lakens 2022 (preprint OSF), Nord 2017, Szucs 2017, Carey 2020, Sollaci 2004, Schroter 2008, Tennant 2020, Belmont qua Federal Register, APA Ethics Code 2017 (PDF), 45 CFR 46, Tuyên bố Helsinki 2024.

## Cho người giao

- Link nội bộ đã kiểm có trong `trang.yml`; chưa chạy `npm test` hay build (theo lời giao).
- Tính số cỡ mẫu và công suất bằng scipy (`stats.nct`) ở thư mục tạm; chưa có trong repo (nếu cần kiểm lại, lượt 2 dùng G*Power hay tính độc lập).
- Mô tả ở frontmatter đã đổi một chữ ("khó tin" thành "cần đọc thận trọng", "khôn ngoan" bỏ); `doi_chu` có ghi.
