# D2-L1, lượt 1: trang Hỗ trợ (`ho-tro/index`)

Ngày 30/10/2026. Model: Claude Opus 5.5 (agent lượt 1). File đã chạm: `src/content/docs/ho-tro/index.md`, `kiem-dinh/ho-tro/index.yml`, file này. Không build (agent khác build cùng worktree); `node tools/khoa.mjs xuat ho-tro/index` đọc được hồ sơ (67 nhận định ra lượt 2, trừ 8 câu `ve-site`). Không gọi thử số nào.

## Số nhận định

75 nhận định: `thoi-su` 36, `loi-khuyen` 20, `dinh-nghia` 8, `ve-site` 8, `lam-sang` 2, `phat-hien` 1. Kết quả: `dung` 43, `da-sua` 21, `da-lam-mem` 4, `da-bo` 3, chưa quyết (`null`) 4. Câu thời sự hết hạn 2027-01-30.

## Sửa, bỏ chính

- **Số sai:** Bệnh viện Tâm thần TP.HCM, trang cũ ghi `028 9234 675` (thiếu một chữ số, chép theo chân trang chủ của bệnh viện). Trang Liên hệ của bệnh viện ghi `(028) 39234675`. Đã sửa thành `028 3923 4675` (n33).
- **Bỏ dòng Bạch Mai** (n31): không mở được trang chính thức (bachmai.gov.vn từ chối kết nối, nimh.gov.vn bị chặn ở máy kiểm, không có bản lưu).
- **Bỏ "24/7" của 113** (n12): không có nguồn chính thức về giờ trực.
- Ngày Mai: đối tượng theo trang chính thức (người trầm cảm và người thân), thêm "do nhóm tình nguyện viên vận hành", bỏ "(cước gọi theo nhà mạng)" vì trang không nói (n18, n19, n21).
- CSAGA: thêm "tư vấn miễn phí"; giờ: "Trang của CSAGA không ghi giờ trực" (n23, n24).
- "Chưa có đường dây quốc gia 24/7…": làm mềm thành "Tính đến tháng 10/2026, chúng tôi chưa tìm thấy…" (n25). Có thấy HOPE (hyvongsong.com, 086 50 444 00, 12:00–00:00 hằng ngày), nhưng nó lập năm 2025, không nói phạm vi quốc gia và không ghi pháp nhân, nên chưa thêm vào trang.
- Bảng chuyên gia: tham vấn viên đổi thành "không nằm trong các chức danh phải có giấy phép của Luật KBCB 2023, Điều 26" (n50); kê đơn theo Thông tư 26/2025/TT-BYT là bác sĩ và y sĩ (n53); công tác xã hội nhận cả ngành gần, giấy tờ là "giấy chứng nhận đăng ký hành nghề" (n47, n51); Nghị định 96/2023 chỉ nói 9 tháng thực hành, bỏ "có người hướng dẫn tại cơ sở phù hợp" (n59).
- "Khi nào nên tìm chuyên gia": đổi "nhiều tuần" thành "từ hai tuần trở lên" (SAMHSA, NIMH, WHO); làm mềm dòng rượu, chất kích thích; bỏ dòng "người thân nói bạn thay đổi nhiều" (không có nguồn) (n37, n39, n40).
- Đổi tên "Psyche Zero" thành "Psyche"; ngày kiểm 30/10/2026, hạn kiểm lại 30/01/2027; danh sách nguồn thay theo các nguồn đã mở. Báo cáo 111 trên tongdai111.vn để trống số và ngày, nên bỏ "số 14/BC-BMTE ngày 20/01/2026".
- Hộp `pz-urgent`: giữ `<div class="pz-urgent">`, Markdown bên trong có dòng trống bao quanh (chỉ bỏ một dòng trống thừa).

## Chưa chắc, chỗ khó

- `null`: n34 (nhiều tỉnh có bệnh viện, khoa tâm thần), n45 (văn bằng của nhà tâm lý lâm sàng ở Việt Nam), n46 (tham vấn viên "đào tạo rất khác nhau"), n62 ("thận trọng với nơi hứa chữa khỏi nhanh…"). Chưa có nguồn chính thức.
- Bệnh viện TW1: trang chính thức không mở được ngày 30/10; số lấy theo bản lưu Internet Archive ngày 14/7/2026. Bản lưu có chèn link cờ bạc lạ, nghĩa là site của bệnh viện có thể đã bị chèn mã (n30).
- Hiệu lực của Thông tư 22/2014 (số khẩn cấp) và Quyết định 01/2008/QĐ-BYT (115 trực 24/24) chưa xác nhận được; Thư viện pháp luật trả 403 (n2, n10). Có dự thảo sửa Nghị định 96/2023 (n59).
- Vai trò các loại chuyên gia dựa vào nguồn của Úc (Healthdirect) và Anh (NHS); chưa mở được phạm vi hành nghề của Thông tư 32/2023/TT-BYT (n55, n56).
- `doi_chu` ghi tay theo chữ hiển thị. Sau `npm run build:xem`, chạy `node tools/chuyen/so-chu.mjs ho-tro/index --doi-chu` để khớp đúng chuỗi.

## Người giao, chủ repo quyết

1. Mở bachmai.gov.vn hay nimh.gov.vn/lien-he từ máy khác; nếu khớp thì thêm lại dòng Viện Sức khỏe Tâm thần (số (024) 3576 5344 theo kết quả tìm kiếm, chưa kiểm).
2. Có thêm HOPE (086 50 444 00, 12:00–00:00) không.
3. Bốn câu `null`: giữ (tìm nguồn ở lượt 2) hay bỏ.
4. n73: workflow nhắc kiểm tra mỗi quý đã chép chưa. n74: thêm đường báo lỗi, hay giữ câu mời như cũ.
5. Mở lại bvtttw1.gov.vn để xác nhận số hiện hành.
