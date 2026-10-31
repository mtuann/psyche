# D4-L2, review nội dung 1: phan-tich-tong-hop, co-mau-suc-manh, dao-duc-nghien-cuu

Người làm: Claude Opus 5.5 (agent review D4-L2), 30/10/2026. Không làm lượt 1, lượt 2. Không build, không commit.

## Phạm vi đã xét

Mọi câu `ve-site`, `nhan`, câu lượt 1 đã sửa, làm mềm hay bỏ, câu lượt 2 khác `dung`. Thêm bốn câu dựa Tuyên bố Helsinki 2024 (e2, e7, e25, e29): đã đọc đoạn 23 trên wma.net. Mỗi câu có `review` và ghi chú "Review (Claude Opus 5.5, 30/10/2026): …" ở cuối `ghi_chu`. `nguoi.review` đã ghi ở lần kiểm định cuối của cả ba hồ sơ.

| Trang | Đã xét | dung | sai |
|---|---|---|---|
| phan-tich-tong-hop | 42 | 41 | 1 |
| co-mau-suc-manh | 31 | 29 | 2 |
| dao-duc-nghien-cuu | 41 | 38 | 3 |

## Câu sai (đã sửa trang, hồ sơ và `doi_chu`)

- **pt22**: "chia cho độ lệch chuẩn (có hiệu chỉnh cho mẫu nhỏ)" → "chia cho độ lệch chuẩn gộp của hai nhóm". Đoạn trích của Fischer chỉ định nghĩa g là chênh lệch chia cho độ lệch chuẩn gộp. Không nguồn nào đã đọc nói Fischer hiệu chỉnh cho mẫu nhỏ. Đã bỏ lakens2013 khỏi `nguon` của câu.
- **c26**: "Tóm tắt của bài ước tính công suất trung vị … nằm giữa khoảng 8% và 31%" → "Phần bàn luận của bài ước tính công suất trung bình … có lẽ không quá khoảng 8% đến 31%". Tóm tắt trên Europe PMC không có khoảng này. Đã sửa luôn `trich`, `vi_tri`, `co_so` của nhãn c45.
- **c30**: Szucs và Ioannidis "0,12, 0,44 và 0,73" → "0,12, 0,46 và 0,78, theo bản đính chính năm 2021". Đã mở trang đính chính (PLOS Biol 19(3), e3001151, ngày 5/3/2021). Đã thêm nguồn `szucs2021` vào hồ sơ, link vào trang và một dòng vào mục Nguồn.
- **e50** (đáp án tình huống 1): "Nếu đã có lựa chọn thay thế như vậy thì tình huống không còn vi phạm tiêu chuẩn này" → "Có lựa chọn thay thế như vậy thì đáp ứng tiêu chuẩn 8.04(b), nhưng vẫn phải bảo đảm sinh viên không bị bất lợi khi từ chối hay rút lui (8.04(a))".
- **e51** (đáp án tình huống 2): "không nên đặt gánh nặng lên những nhóm ít có khả năng hưởng lợi từ kết quả" → "không nên dùng quá mức người thuộc những nhóm ít có khả năng hưởng lợi từ ứng dụng của kết quả". Belmont viết "should not unduly involve".
- **e46** (điểm mấu chốt cuối mục Cách nhận ra): "không che giấu rủi ro đáng kể" → "không che giấu rủi ro nào hơn mức tối thiểu". Belmont viết "more than minimal". Chữ mới cũng khớp câu ngay trước đó trên trang.

## Hình

- Forest plot ASCII thứ nhất (pt21): đã đếm lại cột. Vạch 0 ở cột 30. Dải của Trần (cột 22–35) cắt vạch 0. Nghiêm, Lê và hình thoi gộp nằm hẳn bên trái. Hình thoi gộp hẹp nhất. Hình khớp lời kể.
- Forest plot bài tập (pt56): vạch 0 ở cột 20, mỗi 0,2 là 6 cột. Đã tính thử trung bình theo phương sai nghịch đảo từ độ rộng ba khoảng tin cậy: ước lượng gộp khoảng 0,18, khoảng tin cậy rộng khoảng 10 cột. Kết quả khớp hình thoi (tâm 0,17, rộng 10 cột, chạm vạch 0). Hình khớp đáp án và mô tả A, B, C.
- funnel-demo (pt45): đúng. Chú thích nói "đáng ngờ", "có thể", và đoạn văn ngay trên hình đã nêu lý do khác. Không sửa hình, không thêm vào `HINH_DA_SUA`.

## Nhãn đã chốt (không đổi)

- phan-tich-tong-hop: pt53 Vững chắc (nguyên tắc phương pháp, theo đồng thuận của Cochrane). pt54 Khá vững: khung gộp hai vế nên lấy mức của vế yếu hơn, như lượt 2 lưu ý; Fischer cũng báo các nghiên cứu khác nhau nhiều.
- co-mau-suc-manh: c44 Vững chắc (hệ quả phương pháp). c45 Khá vững; đã cập nhật cơ sở theo số đính chính.
- dao-duc-nghien-cuu: e48 và e49 Vững chắc (chuẩn đạo đức xét theo văn bản chính thức; `ly_do` ghi rõ).

## Đề xuất về tiêu đề phan-tich-tong-hop

"Gộp hàng trăm nghiên cứu lại thì được gì?" không khớp ví dụ chính: Fischer 2011 có 105 hiệu ứng từ 53 bài. Đề xuất đổi thành **"Gộp nhiều nghiên cứu lại thì được gì?"** và đổi `sidebar.label` tương ứng. Đường dẫn và id không đổi, nên không hỏng link. Chưa sửa.

## Chỗ còn chưa chắc

- c26: không mở được toàn văn Button 2013, vì nature.com đòi đăng nhập và bản sao bị chặn. Câu mới dựa vào đoạn trích mục Implications của lượt 2, cộng với tóm tắt trên Europe PMC (không có khoảng 8–31%). Câu của lượt 1 ("Empirically, we estimate the median … between ∼8% and ∼31%") nhiều khả năng nằm ở khung Key points; ý của nó gần với câu mới.
- e50: không đọc được chữ trong PDF của Bộ luật APA (PDF nén). Chữ 8.04(a) trong `trich` theo lượt 2 và theo bản đã biết. Các sửa đổi 2010 và 2016 không chạm 8.04.
- Ngoài phạm vi, chưa sửa: e4 dịch "disadvantaged" là "nghèo"; chữ sát hơn là "thiệt thòi". Nhãn trục của hai forest plot lệch tối đa một cột so với vạch chia, không đổi cách đọc.
