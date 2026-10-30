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
- Không build, không commit, không push. Không đưa thông tin cá nhân của chủ repo ra ngoài; User-Agent khi cần: `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`.

## Trả lời

Ngắn: số nhận định theo loại; đã sửa, đã làm mềm, đã bỏ (trang, id, một dòng lý do); chỗ chưa chắc, chỗ khó; nguồn hay dùng; chỗ người giao phải sửa hay quyết.
