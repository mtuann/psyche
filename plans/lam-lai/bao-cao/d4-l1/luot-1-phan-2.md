# D4-L1, lượt 1, phần 2/2

Model: Claude Sonnet 5.5. Nhánh `moi/d4-l1` (chưa commit). Trang: `bang-chung/mau-va-chon-mau`, `bang-chung/p-value`, `bang-chung/khung-hoang-tai-lap`.

## Đã làm

- Đưa ba trang về khuôn 7 mục: thêm "Mức độ chắc chắn" (mỗi trang một khung Vững chắc và một khung Khá vững), "Bài tập" (phần "Thử một lần" cũ thành `### Thử một lần { #thu-mot-lan }`, thêm `### Kiểm tra nhanh` với khối quiz 3 câu), "Tự suy ngẫm" thành "Thử suy ngẫm { #tu-suy-ngam }". Id cũ giữ nguyên.
- Hồ sơ `kiem-dinh/bang-chung/<trang>.yml`: 64, 50, 51 nhận định (tổng 165), kèm `nguon`, `doi_chu`, `lan[0]`. Trích dẫn đã kiểm tự động với văn bản nguồn đã tải (một trích của k2 là siêu dữ liệu Crossref, không có trong văn bản).
- Kiểm: `node tools/khoa.mjs xuat` đọc được cả ba; dựng thử từng trang qua plugin Markdown (không build): đạt, quiz hợp lệ.

## Nhận định theo loại (mau / p-value / khung-hoang)

- phat-hien 30 / 29 / 22; so-lieu 8 / 2 / 9; lich-su 5 / 4 / 1; dinh-nghia 7 / 5 / 5; loi-khuyen 11 / 7 / 11; nhan 2 / 2 / 2; ve-site 1 / 1 / 1.
- Kết quả: dung 36 / 28 / 26; da-sua 13 / 9 / 12; da-lam-mem 12 / 13 / 12; da-bo 3 / 0 / 1.

## Sửa lớn (sai so với nguồn)

- `mau-va-chon-mau` m4: con số 68%, 96% là phân tích của Arnett (2008), Henrich và cộng sự chỉ dẫn lại; trang cũ viết như của họ. m47: ví dụ "nhận thức hình ảnh cơ bản thì mẫu sinh viên vẫn tốt" trái bài Henrich mục 3.1 (ảo ảnh Müller-Lyer khác nhau rõ giữa xã hội, sinh viên Mỹ ở đầu cực); đã thay.
- `p-value` p8: "nhấn mạnh đầu tiên" sai, là nguyên tắc thứ hai của ASA; "phổ biến nhất" bỏ. p11: bỏ lời giải thích "bộ não ta" không nguồn. p25–p28: bốn chiêu p-hacking viết lại theo bảng của John và cộng sự 2012 (bỏ "chia nhóm, nhiều mô hình").
- `khung-hoang-tai-lap` k1: "hơn 270" thành 270 tác giả, bài làm lại là của năm 2008; k3: bỏ "độc lập", "cỡ mẫu lớn"; k28: bỏ câu hùng biện không nguồn, thay bằng lời Nosek 2022 về Registered Reports.
- Đã bỏ (`da-bo`): phản ứng báo chí với Henrich (m3); "chiến thắng cách biệt nhất lịch sử Mỹ" (m33); cơ chế "gia đình khá giả nghiêng Cộng hòa" của Literary Digest (m36); "vài chục người" (k17). Số 10 triệu phiếu, 2,4 triệu trả lời của Literary Digest cũng bỏ (m31): chỉ mở được tóm tắt Squire 1988 và Lohr & Brick 2017 (tóm tắt cho 24% trả lời, danh bạ điện thoại và danh sách ô tô).

## Chỗ chưa chắc, chỗ khó

- Nhãn (cần review): `mau-va-chon-mau` khung Vững chắc "mẫu lệch cho kết luận sai" và `p-value` khung Vững chắc về nghĩa của p-value là nguyên tắc thống kê, thước đo mục 4 viết cho phát hiện thực nghiệm (giống cách `do-lon-hieu-ung` đã dùng). `khung-hoang-tai-lap` Vững chắc dựa OSC, Many Labs 2, Camerer 2018 (chỉ tóm tắt) và tổng hợp Nosek 2022. Các khung Khá vững: WEIRD (Henrich là tổng quan, Many Labs 2 cho thấy khác biệt WEIRD nhỏ), p-hacking làm khó tái lập (chưa có ước lượng riêng), nguyên nhân của thất bại tái lập (OSC chỉ gọi là "plausible").
- Chưa mở được toàn văn: Squire 1988, Lohr & Brick 2017, Camerer 2018 (chỉ tóm tắt), tuyên bố ASA đầy đủ (Taylor & Francis chặn; đọc qua thông cáo của ASA, nên chỉ dùng sáu nguyên tắc), Arnett 2008, Segall 1966, Simmons và cộng sự 2011 (đọc qua mô tả của John 2012), Scheel 2020 (Nosek kể lại).
- k28 (Nosek 2022 nói chưa có nghiên cứu về Registered Reports tái lập tốt hơn) để `phat-hien`, câu viết là "đến thời điểm bài ấy viết"; chưa tìm sau 2022. Có thể đổi `thoi-su` nếu review muốn.
- Câu `ve-site` (s1 của mỗi trang) chưa có `review`.

## Việc cho người giao

- `src/data/nguon.yml` chưa có: `lohr2017` (Statistics, Politics and Policy 8(1), 65–84, DOI 10.1515/spp-2016-0006), `squire1988` có nhưng thiếu DOI 10.1086/269085, `nosek2022` (Annual Review of Psychology 73, 719–748, DOI 10.1146/annurev-psych-020821-114157), `camerer2018` (Nature Human Behaviour 2, 637–644, DOI 10.1038/s41562-018-0399-z), `greenland2016` (Eur J Epidemiol 31(4), 337–350, DOI 10.1007/s10654-016-0149-3), `john2012` (Psychol Sci 23(5), 524–532, DOI 10.1177/0956797611430953), `fisher1925`, `asa-thong-cao`, hai giáo trình OpenStax (Psychology 2e mục 2.3; Introductory Statistics 2e mục 1.2). Nhóm tác giả của hai bản OpenStax ghi ở mục Nguồn (Spielman và cộng sự 2020; Illowsky & Dean 2023) chưa kiểm V1.
- Trang `bang-chung/mau-va-chon-mau` là trang nhà của hồ sơ Henrich 2010 (`nghien-cuu.yml`): giữ các con số của Henrich ở đây, nơi khác chỉ tóm một câu.
- Chưa chạy `so-chu.mjs --doi-chu` (không build): `doi_chu` viết tay, người gom nên chạy một lần để so với `.cache/site-cu`.
- Hình `osc-replication` không đổi (số khớp bài gốc, hồ sơ k7).
