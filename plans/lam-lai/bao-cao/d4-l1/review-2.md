# D4-L1, review phần 2/2 (index, tuong-quan-nhan-qua, thi-nghiem-doi-chung, do-lon-hieu-ung)

Model: Claude Sonnet 5.5. Ngày 30/10/2026. Nhánh `moi/d4-l1`. Chưa commit.

## Kết quả

| Trang | Câu review | dung | sai | Ghi |
|---|---|---|---|---|
| index | 5 (cả 5 `ve-site`) | 5 | 0 | i5 giữ vì có chữ "thường" |
| tuong-quan-nhan-qua | 24 (3 `ve-site`, 1 `nhan`, 20 đã sửa, làm mềm, bỏ) | 24 | 0 | 1 sửa câu hồ sơ (t26), trang không đổi |
| thi-nghiem-doi-chung | 17 (2 `nhan`, 15 đã sửa hay làm mềm) | 17 | 0 | |
| do-lon-hieu-ung | 14 (4 `nhan`, 7 đã sửa hay làm mềm, cộng h23-h25, h30) | 14 | 0 | thêm Hagger 2016 vào nguồn và `co_so` của h25 |

Không câu nào `review: sai`, nên trang không đổi chữ, không cần `doi_chu`. Lượt 2 của bốn trang đều `dung` (không có câu khác `dung`).

Hồ sơ đã sửa (không phải trang):
- tuong-quan t26: `cau` của hồ sơ có thêm vế "thói quen ăn uống và kinh tế chỉ là yếu tố phụ" không có trên trang; cắt cho khớp trang ("Số giải Nobel của một nước được dự đoán chủ yếu bởi hoạt động khoa học, như số bài báo và chi cho nghiên cứu"). Vế bỏ vẫn đúng Doi 2014 nhưng không nằm trên trang.
- do-lon h25: thêm nguồn `hagger2016` (chép từ hồ sơ đã khóa `bat-dau/doc-nhan-chac-chan`), `co_so` có cả hai tái lập, `trich` có cả Hagger; câu "Chưa đọc các tái lập khác (Hagger 2016)" trong `ly_do` đã cũ, đổi thành kết quả Hagger.
- `nhan` của nguyên tắc phương pháp (t27, d23, h30): `ly_do` ghi thêm là xét theo đồng thuận giáo trình, tổng quan, tuyên bố ASA.
- `nguoi.review` ghi ở lần 1 của bốn hồ sơ. `nguoi.luot_2` và `kiem_mau` vẫn `null` (lệnh `nhap` không ghi vào `lan`; người gom điền khi khóa).

## Việc đã kiểm

- **Câu `ve-site`:**
  - index i1-i5: mô tả khớp frontmatter; năm câu hỏi ứng năm trang có trong `trang.yml`; `danhSachBai` (`src/plugins/thanh-phan.mjs`) lọc `nhom` theo tiền tố, bỏ `index`, đếm bài sắp có; bản xem hiện 6 bài và "Còn 6 bài sắp có". i5: cả sáu bài đã chuyển có "Một tin tức", "Khái niệm", "Cách nhận ra", bài tập có `:::thu-gon`, quiz hay "Thử suy ngẫm". Riêng `mau-va-chon-mau` mở bằng một con số có nguồn, không phải tin giả định hay diễn đạt lại; câu có "thường" nên giữ.
  - tuong-quan t10-t12: tính lại Pearson từ tọa độ 400 điểm trong `src/hinh/tuong-quan.html`: 0,0; 0,3; 0,7; −0,5; mỗi ô 100 điểm; chú thích trong hình đúng chữ hồ sơ. Hình `hieu-ung-d`: nhãn 92/80/69% và 56/64/71% khớp tính lại (OVL = 2Φ(−d/2), Φ(d/√2)).
- **Câu đã sửa, làm mềm, bỏ:** chữ cuối trên trang khớp trích; đọc lại bằng Europe PMC, Crossref: Freedman 2012 (HR 0,90 nam và 0,87 nữ cho 2-3 tách; 402.260 người; 1995-2008), Maurage 2013, Doi 2014, Treur 2024, Franco 2014, Many Labs 2, Vohs 2021, Hattie & O'Leary 2025, Funder & Ozer 2019, Richard 2003; Dåderman 2022 và Weinerová 2022 (Gignac 708 hệ số, 87 tổng hợp, 2,7% từ 0,50, "dưới 3%" đúng); Fraundorf 2023 (Rowland g = 0,50).
- **Nhãn** (thước đo mục 4):
  - t27, d23, h30 "Vững chắc": nguyên tắc phương pháp, xét theo đồng thuận, ghi rõ trong `ly_do`.
  - d25 "Khá vững" (giả dược, Cochrane 2010): đạt (cùng chiều, nhưng 8% thử nghiệm sai lệch thấp, không đồng nhất, khó tách báo cáo thiên lệch). Tìm Europe PMC theo tiêu đề không thấy tổng quan thay thế.
  - h23 "Vững chắc" (Rowland): hai tổng hợp độc lập g khoảng 0,50 cùng chiều.
  - h24 "Đã bị bác bỏ" (phong cách học): khớp ngộ nhận `phong-cach-hoc` đã khóa (`bac-bo`) và Hattie 2025 d = 0,04.
  - h25 "Đang tranh cãi" (cạn kiệt ý chí): khớp trang đã khóa `bat-dau/doc-nhan-chac-chan` (khung "Đang tranh cãi", hồ sơ n19, review Opus). Hai tái lập lớn đăng ký trước đều gần 0, nhưng Vohs 2021 có phân tích khám phá d = 0,08 có ý nghĩa và Bayes ngang nhau, nên chưa "Đã bị bác bỏ"; sát ranh giới như lượt 2 đã ghi.

## Chỗ chưa chắc

- **Messerli 2012 vẫn chưa ai đọc toàn văn.** Crossref, Europe PMC chỉ có tên bài, tác giả, số trang (không có tóm tắt). Tôi thử mở bản NEJM và bản lưu thì hệ thống chặn (nội dung sau tường trả phí), nên dừng, không vòng. r = 0,791, 23 nước, giả thuyết flavanol và nhân quả ngược đều qua Kayser 2012 (toàn văn PMC3544694, đã đọc lại). Trang chỉ nói điều Kayser xác nhận. Trang viết "trên đầu người" cho cả hai biến, hơi gọn hơn nguồn (sô-cô-la: bình quân đầu người; giải Nobel: trên 10 triệu dân), cùng nghĩa.
- Gignac & Szodorai 2016, Rowland 2014, Cohen 1988: chỉ qua nguồn kể lại (đã ghi trong hồ sơ). Con số Rowland được hai nguồn độc lập xác nhận.
- Số "chồng lấn" (92/80/69%) là phép tính, không có nguồn định nghĩa bậc 1-2; xác suất vượt trội (56/64/71%) có định nghĩa ở Lakens 2013. Đã ghi trong h11.
- h23: nhãn Rowland phải khớp trang nhà `kham-pha/tri-nho/duong-cong-quen` khi trang ấy làm (hiện chưa có file).
- Các mô tả (frontmatter) của sáu bài hiện ở mục lục `index`, nên được rà ở hồ sơ từng trang (hai bài kia thuộc review khác).
