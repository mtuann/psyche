# Lượt 2 cho bản ghi dữ liệu (<việc>, phần <x>)

Model: Sonnet; Haiku khi phần chỉ gồm siêu dữ liệu xuất bản (tác giả, năm, tên bài, nơi đăng).

Như `luot-2-trang.md`, với các chỗ khác sau.

- **Đầu vào:** `<file danh sách>`, xuất bằng `node tools/khoa.mjs xuat du-lieu/<bộ>/<id> … --ra <file>`. `trang` là `du-lieu/<bộ>/<id>`.
- **Không mở `src/data/`:** kiểm câu nhận định, không phải file dữ liệu.
- **Không mở** `kiem-dinh/` và `plans/lam-lai/bao-cao/<việc>/` (trừ file danh sách được giao).
- **Nguồn:** siêu dữ liệu theo trang của nhà xuất bản hay Crossref; kết quả nghiên cứu theo bài gốc; tình trạng rút bài theo thông báo của nhà xuất bản và Retraction Watch.
- **Năm:** năm xuất bản chính thức (số tạp chí), không phải năm đăng trực tuyến trước, trừ khi câu nói rõ.
- **Thẻ ngộ nhận:** kết luận `dung` khi hợp thước đo nhãn; `qua-manh` khi kết luận chắc hơn bằng chứng; `khong-chac` khi các tổng quan mâu thuẫn.
