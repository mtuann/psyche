# D5-L1 review 2: vi-sao-ta-quen, bang-ghi-hinh, duong-cong-quen, phong-cach-hoc

Model: Claude Sonnet 5.5 (agent review), 09/11/2026. Không commit. `npm run build:xem` và `npm test` (83 phép thử) đạt; `node tools/khoa.mjs xuat` đọc được cả bốn trang; mọi nhận định không `da-bo`, không `ve-site` có `nguon`. `nguoi.review` đã ghi ở lần kiểm định cuối của bốn hồ sơ.

## Kết quả

| Trang | review dung | review sai |
|---|---|---|
| vi-sao-ta-quen | 24 | 3 (n15, n47, n62) |
| bang-ghi-hinh | 16 | 2 (n15, n32) |
| duong-cong-quen | 40 | 5 (n2, n9, n29, n53, n55) |
| phong-cach-hoc | 33 | 2 (n15, n23) |

(Số câu có `review` = mọi `ve-site`, `nhan`, câu lượt 1 đã sửa/làm mềm, câu lượt 2 khác `dung`, và các câu lượt 2 ghi chú; các câu còn lại không có `review`.)

## Câu sai (chữ cũ → chữ mới)

- vi-sao n15: "làm lại thí nghiệm theo cách gần giống nhất có thể" → "làm lại thí nghiệm, cố bám sát bản gốc trong điều kiện cho phép".
- vi-sao n47 (lượt 2 qua-manh): "Cố nhớ lại một điều, kể cả khi nhớ không ra, giúp củng cố… hơn đọc lại" → "Cố nhớ lại một điều giúp củng cố trí nhớ hơn đọc lại. Nếu sau đó xem đáp án đúng thì kể cả khi lần thử thất bại, nó vẫn giúp lần học tiếp theo (Kornell 2009)". Thêm Kornell vào trang và mục Nguồn.
- vi-sao n62: "Ai cũng quên theo một hình dạng giống nhau" → "Nhiều nghiên cứu thấy quên theo cùng một hình dạng".
- bang-ghi-hinh n15: "khoảng 14 km/giờ" → "khoảng 14,5 km/giờ" (trang và chú thích hình `src/hinh/loftus-verbs.html`; đã thêm `loftus-verbs` vào `HINH_DA_SUA` ở `tests/chuyen.test.mjs`, như tiền lệ của các hình khác).
- bang-ghi-hinh n32: "chưa được làm lại trong một dự án tái lập quy mô lớn, đăng ký trước" → thêm: bản làm lại nhỏ 2021 (Raghunath, Fultz & Sanchez, Proc HFES 65(1)) không thấy cách đặt câu hỏi ảnh hưởng ước lượng tốc độ; dự án tái lập quốc tế khoảng 20 ngôn ngữ đang được chuẩn bị (Zwaan 2/6/2026; không nói đăng ký trước, chưa có kết quả). Nhãn Khá vững giữ.
- duong-cong-quen n2 (lượt 2 qua-manh): "ngay sau khi học xong An có thể làm tốt hơn một chút" → "chưa chắc An hơn Bình: các tổng hợp không thấy học dồn thắng ổn định ở bài kiểm tra ngay sau đó". Mở toàn văn Cepeda 2006: học rải +9% kể cả khoảng giữ dưới 1 phút, 12/271 phép so sánh không thấy lợi. Sửa cả câu hỏi Tự trải nghiệm ("ai làm tốt hơn").
- duong-cong-quen n9 (qua-manh): "Phải hơn một thế kỷ sau… mới trả lời được" → "Hơn một thế kỷ sau, hàng trăm thí nghiệm đã kiểm tra lại điều ông thấy" (Ebbinghaus ch. 8: 38 lần lặp rải trong 3 ngày bằng 68 lần dồn một ngày).
- duong-cong-quen n29: g = 0,61 ghi rõ là mô hình hiệu ứng cố định (ngẫu nhiên 0,70), 0,51 so với đọc lại. Mở toàn văn Adesope 2017 (bản WSU ở Wayback): 15.427 người đúng (15.472 ở vài trang thứ cấp là sai chữ số).
- duong-cong-quen n53 (khong-chac): "chưa tìm thấy nghiên cứu nào kiểm tra các hiệu ứng này trên người Việt" → "…trên người Việt kiểm tra riêng các hiệu ứng này" kèm câu: có vài nghiên cứu ứng dụng Memrise (ôn ngắt quãng gộp trò chơi hóa) ở học sinh Việt, không tách được hiệu ứng (Nguyễn & Nguyễn 2026). Chạy lại OpenAlex 9/11/2026; `het_han` giữ 2028-11-01.
- duong-cong-quen n55: "Học dồn có thể cho kết quả tốt ở bài kiểm tra ngay sau đó" → "Học dồn cho cảm giác thuộc bài ngay lúc đó" (cùng lỗi n2).
- phong-cach-hoc n15: "tổng hợp 2025 dựa trên 17 phân tích tổng hợp… d = 0,04" → d = 0,04 là của bốn phân tích tổng hợp về giả thuyết khớp (143 nghiên cứu, 401 hiệu ứng); 17 gộp lại d = 0,40 vì lẫn nghiên cứu tương quan (mở toàn văn Hattie & O'Leary).
- phong-cach-hoc n23: khung "sở thích học khác nhau" từ Vững chắc → Khá vững (xem dưới).

## Nhãn đã chốt

- vi-sao n27 Vững chắc (hình dạng đường cong quên): giữ. Rubin & Wenzel 1996 (tổng hợp định lượng 210 bộ dữ liệu, chỉ tóm tắt) cùng chiều với bản làm lại Murre & Dros 2015; nhãn chỉ nói hình dạng, giới hạn "một người, âm tiết vô nghĩa" đã nêu. Ranh giới mục 4, ghi rõ ở hồ sơ.
- vi-sao n31 Đang tranh cãi (bước nhảy 24 giờ): giữ. n41 (học rải) và n46 (tự kiểm tra) Vững chắc: khớp `doc-nhan-chac-chan` (Cepeda) và `do-lon-hieu-ung` (Rowland).
- bang-ghi-hinh n28 Vững chắc (thông tin sai lệch): giữ, nhưng thêm vào khung hai phân tích tổng hợp mà lượt 1 thiếu: Blank & Launay 2014 (25 nghiên cứu, cảnh báo giảm hiệu ứng còn dưới một nửa) và Edmar, Enquist & Luke 2026 (480 nghiên cứu, g = 0,694, I2 = 92%; bản thảo PsyArXiv chưa bình duyệt, ghi rõ trên trang). n29 Khá vững, n45 Đã bị bác bỏ (khớp thẻ `tri-nho-may-quay`): giữ.
- duong-cong-quen n31, n34, n44, n46 Vững chắc; n36, n48, n50 Khá vững; n38 Đang tranh cãi: giữ.
- phong-cach-hoc n19, n34 Đã bị bác bỏ (dạy khớp): giữ (khớp `doc-nhan-chac-chan`, `do-lon-hieu-ung`; g = 0,31 của 2024 đã được trang nêu cùng giới hạn). n23: đổi Khá vững vì Pashler 2008 là tổng quan kể về sở thích tự khai, chưa thấy phân tích tổng hợp riêng; khung trên trang đổi `:::kha-vung`, tách ý thứ hai về hiệu quả khớp sang khung Đã bị bác bỏ; n24 cập nhật `cau`. n35 Đã bị bác bỏ (não trái/phải): giữ, dựa một nghiên cứu hình ảnh lớn (Nielsen 2013).

## Chỗ còn chưa chắc

- vi-sao n27 và bang-ghi-hinh n28: ranh giới thước đo mục 4 (n28 phụ thuộc bản thảo chưa bình duyệt cho phân tích tổng hợp trực tiếp); chủ repo cân nhắc nếu muốn nghiêm hơn thì hạ Khá vững.
- phong-cach-hoc n3 (71 mô hình của Coffield 2004): vẫn chưa mở được bản gốc, chỉ nguồn thứ cấp.
- phong-cach-hoc n35: nhãn bác bỏ dựa Nielsen 2013 và thẻ ngộ nhận (khóa D8-L3); nếu thẻ khóa nhãn khác thì sửa.
- duong-cong-quen n2: tổng hợp Cepeda so học dồn với khoảng cách ngắn nhất cho cùng một mục, không khớp 1:1 với tình huống 4 giờ so 4 buổi; trang đã nói "chưa chắc".
- Câu trong hồ sơ của bang-ghi-hinh về "bốn vụ va chạm 20/30/40 dặm/giờ, 36,1 đến 39,7" và các số khác không do review mở lại ngoài những câu đã nêu.
- Hồ sơ YAML được ghi lại bằng ruamel: một số dòng `luot_2_nguon` đổi từ dạng `[ "…" ]` sang `["…"]` và `null` thành trống; nội dung giữ nguyên.

## File đã chạm

`src/content/docs/kham-pha/tri-nho/{vi-sao-ta-quen,bang-ghi-hinh,duong-cong-quen,phong-cach-hoc}.md`; `src/hinh/loftus-verbs.html`; `kiem-dinh/kham-pha/tri-nho/{vi-sao-ta-quen,bang-ghi-hinh,duong-cong-quen,phong-cach-hoc}.yml` (thêm nguồn kornell trong trang, edmar2026, raghunath2021, zwaan2026, memrise-vn2026; mục `doi_chu`); `tests/chuyen.test.mjs` (một tên hình); báo cáo này.
