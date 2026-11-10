# D6-L1 phần 2/2, lượt 1: Hạnh phúc

Nhánh `moi/d6-l1`, ngày 10/11/2026, Claude Sonnet 5.5, làm tuần tự một mình. Ba trang `kham-pha/hanh-phuc/`: `do-hanh-phuc` (tầng `loi`), `tien-va-hanh-phuc`, `dong-chay-flow` (tầng `mo-rong`, kiểm đủ như lõi). Trang chưa được kiểm ở site cũ nên lượt 1 đủ, từ đầu. Chưa khóa, chưa lượt 2. `node tools/khoa.mjs xuat` chạy được cho cả ba trang; các kiểm thử `chuyen`, `doi`, `du-lieu`, `khoa`, `thanh-phan` đạt. Phần 1 (Căng thẳng–giấc ngủ) không động tới.

## Số nhận định (247)

| Trang | Tổng | dung | da-sua | da-lam-mem | da-bo |
|---|---|---|---|---|---|
| do-hanh-phuc | 81 | 26 | 32 | 23 | 0 |
| tien-va-hanh-phuc | 79 | 40 | 26 | 13 | 0 |
| dong-chay-flow | 87 | 25 | 55 | 7 | 0 |

Mọi nhận định có `ket_qua`; mỗi câu `da-sua`/`da-lam-mem` có chữ cũ, chữ mới, lý do (từ mục `doi_chu`); mỗi trang có mục `doi_chu` cho `::tom-tat`. Hình `flow-channel` không có số; ghi hai nhận định về chữ trong hình, không sửa hình.

## Sửa chính

- **do-hanh-phuc:** bỏ công thức "SWB = hài lòng + tích cực − tiêu cực" (không có trong Diener 1984; phép trừ chỉ ở thang Bradburn) và câu hỏi 1 theo đó; số tương quan SWLS sửa theo Bảng 2 bài gốc (0,47–0,75; Fordyce 0,58/0,62; âm với thang cảm xúc tiêu cực); thiết kế ba nghiên cứu sửa theo bài gốc (176 sinh viên là mẫu chung, 76 người làm lại); mốc điểm sửa theo hướng dẫn của Diener; Sandvik 1993 chỉ giữ điều tóm tắt nói (bỏ experience sampling và trí nhớ sự kiện); "tăng 5 điểm nói lên nhiều điều" bỏ (sai số chuẩn khoảng 2,7 điểm, tính từ SD 6,43 và r 0,82); **câu "chưa tìm thấy nghiên cứu SWLS ở Việt Nam" sai**: có Arrindell và cộng sự 2022 (1.073 người, TP Hồ Chí Minh; một chiều; tương đương theo giới và học vấn, kém theo tuổi); thêm Schneider & Schimmack 2009 (r ≈ 0,42), Milo 2025.
- **tien-va-hanh-phuc:** Easterlin 1974 không nói người giàu hạnh phúc hơn "giữa các nước" (nói là chưa chắc); bỏ "chọn ngẫu nhiên" của Gallup; 75.000 là điểm giữa nhóm 60–90k, ngưỡng thực khoảng 90k, 100k sau điều chỉnh lạm phát; Mellers là người điều phối; nhóm hạnh phúc nhất dốc hơn ở phân vị 85; nguyên nhân của ngưỡng 100k chỉ là suy đoán của tác giả (bỏ danh sách "cô đơn, bệnh tật, xung đột, vô nghĩa"); tiêu đề Áp dụng 2 và lời khuyên bỏ ngụ ý nhân quả (cả ba nghiên cứu chỉ là liên hệ cắt ngang; r = 0,09); thêm hai bình luận PNAS 2024 (Rohrer & Wenz; Arslan) và phản hồi của KKM; thêm nghiên cứu châu Âu 2026; phương án nhiễu "trung bình 2010" đổi vì gần 75.000 (trung bình 71.500 năm 2008).
- **dong-chay-flow:** khung "Đã bị bác bỏ: cứ vào flow là hiệu suất tăng" **sai nguồn**: Swann 2018 không nói liên hệ flow–thành tích không nhất quán; Harris và cộng sự (phân tích tổng hợp 22 nghiên cứu) thấy r = 0,31 nhất quán (tương quan, chưa rõ nhân quả), nên đổi thành Khá vững; khung "Vững chắc" 9 đặc điểm hạ Khá vững (dưới 30% vận động viên ưu tú nêu mất tự ý thức và biến dạng thời gian; chồng lấn; chưa có cách đo thống nhất); Løvoll & Vittersø nói ngược lại chữ trang (không thấy đỉnh ở cân bằng, ủng hộ mô hình mất cân bằng); "tám đặc điểm đầu là trạng thái, thứ chín là kết quả" sai (ba điều kiện, sáu đặc điểm); Áp dụng 2, 3, 4 hạ Đang tranh cãi (thử nghiệm gây flow trái chiều; bằng chứng cho người thực hành "extremely limited"), bỏ "đừng săn flow" (không nguồn); "nhân cách tự trị là kỹ năng có thể rèn" bỏ (chỉ có "siêu kỹ năng", hiếm được kiểm); danh sách vũ công, bác sĩ phẫu thuật, nhà soạn nhạc bỏ; **câu "chưa tìm thấy nghiên cứu flow ở người Việt" sai**: có Nguyen và cộng sự 2026 (239 sinh viên học tiếng Anh trực tuyến).

## Chỗ chưa chắc, chỗ khó

- Chỉ đọc tóm tắt: Sandvik 1993, Lucas 1996, Schimmack 2008, Suh 1998, Schneider & Schimmack 2009, Milo 2025, Easterlin 2010 (số mẫu theo bản thảo IZA 5799), Csikszentmihalyi 1977 và 1989, Jackson & Marsh 1996, Løvoll 2014, Fong 2015, Harris 2021 (bản thảo PsyArXiv), Xie, Sweeny, Buseyne, Nguyen 2026, Fors Connolly 2026. Kawabata 2008 chỉ đọc tên bài (không biết kết quả: đã viết "chưa đọc được kết quả"). Rohrer & Wenz 2024 chỉ tóm tắt. Stevenson & Wolfers đọc bản NBER 14282, không phải bản Brookings. Sách Csikszentmihalyi 1990 và 1975 không mở được: nội dung sách theo Swann 2018, Abuhamdeh 2020, Baumann 2012 kể lại. Swann 2012 (dưới 30%) chỉ qua Swann 2018. Schwarz & Clore 1983 chỉ qua Diener 1984.
- Nhãn "Đang tranh cãi" của khung diễn giải điểm hạnh phúc (do-hanh-phuc, n38 và n79) lỏng so với thước đo mục 4 (các điểm còn mở, chưa mâu thuẫn bằng chứng cao): có thể hợp "Khá vững" hơn; đổi thì đổi cả hộp tóm tắt và câu hỏi cuối bài. Để review quyết.
- Hình `flow-channel` phát biểu "Flow chỉ xuất hiện khi cả hai đều cao và cân bằng" như điều chắc; bằng chứng lẫn lộn (Fong: vừa phải; Løvoll: không đỉnh ở cân bằng). Chưa sửa hình; nên thêm "theo mô hình" vào hình và chú thích.
- Các câu `thoi-su` (Việt Nam của ba trang; "tranh luận Easterlin chưa ngã ngũ"; thiết kế experience-sampling ở châu Á; thử nghiệm tắt thông báo) dựa vào truy vấn Europe PMC ngày 10/11/2026, chưa đọc hết danh sách, chưa tìm tạp chí trong nước; OpenAlex hết hạn mức trong ngày. `het_han` 2028-11-01. Quan hệ thu nhập–hạnh phúc ở người Việt: không thấy bài nào qua Europe PMC, tìm chưa hệ thống.
- dong-chay-flow: một số câu suy đoán đã ghi rõ trong trang ("giả thuyết", "suy luận") vẫn cần lượt 2 xem; câu "ra đời trong văn hóa cá nhân chủ nghĩa" (mất tự ý thức) không có nguồn, đã giữ vì ngay sau ghi là suy đoán.

## Việc người giao phải sửa hay quyết

1. **`src/data/trang.yml`:** giữ `dua_tren: [kham-pha/hanh-phuc/do-hanh-phuc]` và `kiem_lai_truoc: 2028-05` cho hai bài mở rộng (các câu thời sự hết hạn 11/2028; chủ đề tiền–hạnh phúc đang có bình luận và flow đang có phân tích tổng hợp mới nên nên xem lại).
2. **`src/data/nguon.yml`:** chưa có bản ghi cho các nguồn mới (Arrindell 2022, Milo 2025, Pavot & Diener 1993, Schneider & Schimmack 2009, Rohrer & Wenz 2024, Arslan 2024, KKM 2024, Fors Connolly 2026, Abuhamdeh 2020, Baumann 2012, Fong 2015, Harris 2021, Buseyne 2026, Xie 2026, Sweeny 2026, Nguyen 2026); các trang dùng mục Nguồn viết tay nên không lỗi.
3. **Link phụ thuộc chưa có trong worktree:** `/psyche/ho-tro/` (tien-va-hanh-phuc, mục Áp dụng 3) cần lên trước khi khóa; trang `doi-pho-stress` đã có.
4. Hộp `::tom-tat` của dong-chay-flow đổi theo tên khung mới (hồ sơ có mục `doi_chu`); tiêu đề giữ id cũ bằng `{ #id-cu }` (tien-va-hanh-phuc mục Áp dụng 2; dong-chay-flow mục Áp dụng 2, 3, 4 và mục Csikszentmihalyi & LeFevre). Id cũ tính theo quy tắc `id-cu.mjs` (chữ + nhãn cũ), chưa build để xác nhận.
5. Mục Nguồn của dong-chay-flow ghi Csikszentmihalyi (1990) mà chưa kiểm được thông tin xuất bản của sách; chương Baumann ghi "chap. 9" (chưa kiểm số trang).
6. Chỉ lượt 2: câu `ve-site` chưa có `review`.
