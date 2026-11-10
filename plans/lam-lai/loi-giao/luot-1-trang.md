# Lượt 1 cho trang (<D…-L…>, phần <x>/<n>)

Model: Sonnet; Opus cho trang Sức khỏe tâm thần. Agent làm lô giao cho agent con khi lô nhiều trang. Trang đã chuyển và đã so chữ; agent con chỉ kiểm định.

Bạn kiểm định **lượt 1** cho các trang `<trang…>` (worktree `<đường dẫn>`, nhánh `moi/<d…-l…>`). Đọc trước:
- `plans/ben-vung/chuan-kiem-dinh.md`: mục 1 (loại nhận định), 2 (thứ bậc nguồn, "Nguồn và cách mở"), 3 (mức theo tầng), 4 (thước đo nhãn), 6 (hồ sơ);
- `AGENTS.md`, mục "Mẫu trang và khối đặc biệt" và "Quy tắc nội dung";
- một hồ sơ đã khóa cùng loại để xem cách ghi (từ đợt 3).

## Mỗi trang

1. `node tools/khoa.mjs mau <trang>` (nếu người giao chưa tạo). Giữ `doi_chu` người giao đã ghi.
2. Tách trang thành nhận định: mọi câu có thể đúng hay sai, kể cả chữ trong bảng, khung nhãn, câu hỏi (dòng `+`, `>`), chú thích, chữ của hình hay công cụ. Con số (tỉ lệ, cỡ mẫu, hệ số, năm) mỗi số một nhận định hay gộp theo một câu của nguồn. Mỗi nhận định: `id`, `cau`, `loai`, `nguon`, `trich`, `ket_qua`, `ghi_chu` khi cần. Không ghi `luot_2`.
3. Nguồn: theo thứ bậc của chuẩn. Điều nghiên cứu X đã làm và đã thấy: bài gốc (toàn văn nếu mở được; ghi rõ nếu chỉ đọc tóm tắt). Tình trạng bằng chứng hiện nay (nhãn): phân tích tổng hợp, tổng quan hệ thống, tái lập lớn có đăng ký trước. `trich` là câu nguyên văn ngắn trong nguồn (tiếng Anh giữ nguyên), kèm vị trí (trang, bảng, mục). Chỉ ghi nguồn đã mở và có nói điều ấy.
4. Nhãn mức độ chắc chắn: mỗi khung nhãn một nhận định loại `nhan`, `co_so` ghi các nguồn làm căn cứ và vì sao đạt mức ấy theo thước đo (chuẩn mục 4).
5. Khẳng định thời sự (số liệu mới nhất, "chưa tìm thấy nghiên cứu ở Việt Nam", xếp hạng): viết lại kèm mốc ("Tính đến 11/2026…"), loại `thoi-su`, có `het_han`.
6. Câu về chính site (`ve-site`): kiểm trên trang, dữ liệu, bản xem; `ghi_chu` ghi đã kiểm ở đâu. Câu vừa nói về site vừa có điều cần nguồn thì tách đôi.
7. Kết quả:
   - `dung`;
   - sai: sửa trang (mỗi chỗ sửa có nguồn), `da-sua`, `ghi_chu` ghi chữ cũ, chữ mới, lý do; thêm mục vào `doi_chu`;
   - mạnh hơn bằng chứng: viết mềm lại cho đúng mức nguồn nói, `da-lam-mem`, ghi như trên;
   - câu thừa hay không kiểm được: bỏ khỏi trang, `da-bo`;
   - không quyết được: `ket_qua: null`, `ghi_chu: "chưa chắc: …"`; chỗ khó: `ghi_chu: "chỗ khó: …"`.
8. Điền `lan[0].ngay`, `nhanh`, `nguoi.luot_1` (model và phần). Kiểm hồ sơ đọc được: `node tools/khoa.mjs xuat <trang>`.

## Quy tắc

- Chỉ ghi trang và hồ sơ của phần mình: agent khác làm cùng worktree. Không sửa thành phần, dữ liệu, kiểm thử: chỗ cần sửa thì ghi lại cho người giao.
- Câu hỏi: lời giải thích không dựa vào vị trí lựa chọn. Trang không có khoảng trắng cuối dòng.
- Không viết điều gì như chẩn đoán hay lời khuyên điều trị.
- Bài học đợt 3–4: trang thí nghiệm có `::tom-tat` và hộp `:::ho-so-nghien-cuu` (3–5 dòng, chỉ điều đã có trong phần kể nghiên cứu của trang); bài Hiểu bằng chứng theo khuôn 7 mục (Một tin tức, Khái niệm, Cách nhận ra, Mức độ chắc chắn, Bài tập có câu hỏi, Thử suy ngẫm, Nguồn); nhãn cho nguyên tắc phương pháp hay chuẩn đạo đức xét theo đồng thuận của giáo trình, văn bản chính thức, ghi rõ trong `ly_do`; khung gộp hai ý theo ý yếu hơn; câu "chưa tìm thấy nghiên cứu ở Việt Nam" là `thoi-su`, có `het_han` và `nguon` là lần tìm; câu suy luận đã ghi rõ là suy luận vẫn cần `nguon`; câu `ve-site` không ghi nguồn ngoài; nghiên cứu đã có trang nhà thì chỉ tóm một câu, link về nhà.
- Toàn văn bài cũ: Internet Archive bộ `wikipedia-scholarly-sources-corpus` (liệt kê `archive.org/download/wikipedia-scholarly-sources-corpus/`, chọn zip có tên DOI đứng ngay trước DOI cần tìm, mở `<zip>/<DOI>.pdf`), psychclassics.yorku.ca, gwern.net, PubMed Central; tóm tắt qua OpenAlex.
- Không build, không commit, không push. Không đưa thông tin cá nhân của chủ repo ra ngoài; User-Agent khi cần: `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`.

## Trả lời

Ngắn: số nhận định theo loại; đã sửa, đã làm mềm, đã bỏ (trang, id, một dòng lý do); chỗ chưa chắc, chỗ khó; nguồn hay dùng; chỗ người giao phải sửa hay quyết.
