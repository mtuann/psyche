# D4-L2, lượt 1, phần 1/2

Model: Claude Sonnet 5.5. Nhánh `moi/d4-l2`. Trang: `bang-chung/phan-tich-tong-hop`, `bang-chung/thong-ke-mo-ta`, `bang-chung/do-luong`. Chưa build, chưa commit.

## Đã làm

- Ba trang chuyển sang khuôn 7 mục như `p-value`: thêm "Mức độ chắc chắn" (hai khung nhãn mỗi trang, có `co_so` và `ly_do`), "Bài tập" (giữ "### Thử một lần { #thu-mot-lan }", thêm "### Kiểm tra nhanh" 3 câu), đổi "Tự suy ngẫm" thành "## Thử suy ngẫm { #tu-suy-ngam }". Id cũ của mọi mục giữ nguyên.
- Hồ sơ `kiem-dinh/bang-chung/<trang>.yml`: có nguồn, trích nguyên văn (kiểm tự động trên văn bản đã tải, trừ ba nguồn không có văn bản: tệp dữ liệu WHR, OpenAlex), `ket_qua`, `doi_chu` cho từng chỗ sửa. `node tools/khoa.mjs xuat` đọc được cả ba. `lan[0].ngay`, `nhanh`, `nguoi.luot_1` đã điền.

## Số nhận định

| Trang | Tổng | Theo loại | dung | da-sua | da-lam-mem |
|---|---|---|---|---|---|
| phan-tich-tong-hop | 65 | dinh-nghia 36, phat-hien 17, ve-site 6, so-lieu 2, loi-khuyen 2, nhan 2 | 29 | 28 | 8 |
| thong-ke-mo-ta | 39 | dinh-nghia 17, loi-khuyen 8, so-lieu 6, lich-su 2, phat-hien 2, nhan 2, thoi-su 1, ve-site 1 | 13 | 21 | 5 |
| do-luong | 47 | dinh-nghia 20, phat-hien 12, lich-su 4, loi-khuyen 4, so-lieu 3, nhan 2, cong-cu 1, thoi-su 1 | 18 | 23 | 6 |

Không có `da-bo` (câu thừa gộp vào câu sửa) và không có câu `ket_qua: null`.

## Đã sửa (chữ cũ, chữ mới, lý do trong `ghi_chu` và `doi_chu`)

phan-tich-tong-hop
- pt21, pt56: hình ASCII forest plot vẽ sai so với lời kể (ở hình đầu, Nghiêm và Lê cắt vạch 0, Trần nằm hẳn bên phải; ở hình bài tập, B không cắt vạch 0, C ở bên phải, gộp không chạm 0). Đã vẽ lại hai hình bằng số liệu khớp lời, chỉnh đáp án.
- pt58, pt59: "ba nghiên cứu lớn ... đây chính là tính không đồng nhất" sai (khoảng tin cậy chồng nhau); "cần thêm nghiên cứu lớn, đăng ký trước" bỏ.
- pt2 ("toàn bộ", "không thí nghiệm nào làm được"), pt29, pt30 ("bất kể đông hay ít người chứng kiến" so với Fischer: chỉ "yếu đi", một số tình huống nguy hiểm mới không âm), pt33 ("nhiều quốc gia", "vụ cướp"), pt23 (g so có/không có người khác, không phải "càng đông"), pt16 và pt20 (diễn giải khoảng tin cậy).
- Bỏ "phiếu bầu" (Cochrane coi đếm phiếu là không chấp nhận được), "rác vào rác ra", "phép màu thống kê".

thong-ke-mo-ta
- Bỏ các ví dụ phân phối lệch/đối xứng không có nguồn (giá nhà, tuổi thọ, điểm thi, chiều cao, IQ) và "luôn lệch phải"; giữ nội dung theo OpenStax 2.5, 2.6 và von Hippel 2005 (quy tắc yếu vị < trung vị < trung bình "thường", có ngoại lệ).
- Bản tin: bỏ "gần như không báo nào đưa trung vị ... không phải ngẫu nhiên" và "20% hộ" (nguồn: "20% dân số"); đưa lên thông cáo gốc của Cục Thống kê (16/5/2025); thêm phép tính 44% và 6% từ chính số liệu; thêm `thoi-su` "Tính đến 10/2026 ... không nêu trung vị" (hết hạn 30/10/2027).

do-luong
- Ngưỡng alpha: bỏ bảng năm hàng có nhãn bằng lời (không nguồn; Taber 2018 thấy nhãn biến thiên lớn), thay bằng ba dòng theo Tavakol và Dennick 2011. Bỏ "Ngưỡng 0,70 bắt nguồn từ Nunnally ... mức tối thiểu cho nghiên cứu ban đầu" (không kiểm được); giữ hai câu Nunnally đọc được qua trích của Metsämuuronen và Niemensivu 2025.
- "Giá trị cấu trúc được đặt nền móng bởi Cronbach và Meehl 1955" sửa: thuật ngữ là "chief innovation" của báo cáo ủy ban APA 1950–54, bài 1955 nêu cách hiểu của riêng mình.
- Ví dụ SWLS: câu mẫu "Nhìn chung, tôi hài lòng..." không phải câu của thang (câu thật "I am satisfied with my life"); thêm mẫu (176 sinh viên Illinois, 76 làm lại); "hàng nghìn nghiên cứu suốt bốn thập kỷ" thành số trích dẫn OpenAlex có mốc (31.756, 10/2026, `thoi-su`).
- Bản tin hạnh phúc: bỏ "lan khắp báo", "các nhà khoa học hàng đầu", "thứ bảy liên tiếp"; đối chiếu dữ liệu gốc WHR 2023 và 2024 (hạng 65 và 54).
- Thay "kết quả nịnh người làm" bằng thí nghiệm Forer 1949 (39 sinh viên, trung bình 10,2 trên 13 nhận xét); bỏ ví dụ quiz "đo trầm cảm".

## Chỗ khó và chỗ chưa chắc

- do-luong dl30: Nunnally (1978) là sách in, không mở được (kể cả bản Internet Archive); chỉ dẫn qua một bài mở. Nguồn gốc ngưỡng 0,70 không kiểm được nên bỏ.
- do-luong dl22: Cronbach (1951) chưa mở được toàn văn (không có trong kho Internet Archive đã thử); chỉ dùng cho tên bài, tạp chí, năm (Crossref) và câu "developed by Cronbach in 1951" của Tavakol và Dennick.
- thong-ke-mo-ta: von Hippel (2005) chỉ đọc tóm tắt (OpenAlex).
- Nhãn: bốn khung nguyên tắc phương pháp (Vững chắc) xét theo đồng thuận giáo trình, tổng quan phương pháp (ghi trong `ly_do`, như `p-value`). Khung "Fischer 2011" ở phan-tich-tong-hop là Khá vững, khớp `n31` của hồ sơ Darley và Latané.
- Bài báo Báo Chính phủ ghi Việt Nam "từ hạng 75" trong khi cùng bài nói "tăng 11 bậc"; dữ liệu gốc xác nhận hạng 65, nên đã bỏ nguồn đó.

## Người giao cần sửa hay quyết

1. Hình `src/hinh/funnel-demo.html` đúng về hình học và số liệu (không có số), nhưng chú thích chỉ nói phễu khuyết là "đáng ngờ có thiên lệch xuất bản", chưa nhắc còn có thể do lý do khác (Cochrane). Hồ sơ pt45 ghi lại, chưa sửa hình. Hình `mean-vs-median.html` đúng (đã kiểm tỉ lệ cột và hai đường).
2. Tiêu đề "Gộp hàng trăm nghiên cứu lại thì được gì?" và nhãn menu giữ nguyên; phân tích mẫu của Fischer chỉ có 105 hiệu ứng từ 53 bài, nên "hàng trăm" chỉ đúng cho các phân tích khác. Người giao quyết có đổi không (đổi `title` là đổi menu và có thể ảnh hưởng link).
3. Câu `ve-site` pt7, pt21, pt28, pt45, pt55, pt56 và tk18 chưa có `review`: review kiểm trực tiếp trên trang, hình và dữ liệu.
4. Mô tả (`description`) và tiêu đề ở frontmatter đã chỉnh nhẹ (ghi ở `doi_chu`); không đổi `title` nào.
5. Lượt 2: nhận định `thoi-su` tk6 và dl33 (hết hạn 30/10/2027) cần kiểm lại nguồn mở; số liệu WHR dl2 kiểm được bằng hai tệp dữ liệu `.xls` ở `files.worldhappiness.report`.

## Nguồn hay dùng

Cochrane Handbook (chương 6, 10, 12, 13, 15); Fischer và cộng sự 2011 (toàn văn, Internet Archive); OpenStax Introductory Statistics 2e (1.1, 2.5, 2.6) và Psychology 2e (2.3); Tiêu chuẩn AERA, APA, NCME 2014 (PDF mở); Tavakol và Dennick 2011 (PMC); Taber 2018; Metsämuuronen và Niemensivu 2025 (PMC); Cronbach và Meehl 1955, Diener 1985, Forer 1949 (Internet Archive, bộ `wikipedia-scholarly-sources-corpus`; thêm cách tìm: liệt kê `archive.org/download/wikipedia-scholarly-sources-corpus/` rồi chọn zip có tên DOI đứng trước DOI cần tìm); Cục Thống kê (nso.gov.vn); World Happiness Report 2023 và 2024 (tệp `.xls` ở `files.worldhappiness.report`).
