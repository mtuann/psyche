# Lượt 1 cho bản ghi dữ liệu (<việc>, phần <x>)

Model: Sonnet. Khớp siêu dữ liệu DOI hàng loạt (V1) chạy bằng script; agent chỉ xử lý bản ghi script báo lệch.

Bạn kiểm định **lượt 1** cho các bản ghi `<bộ>/<id>…` trong `src/data/`. Đọc trước:
- `plans/ben-vung/chuan-kiem-dinh.md`: mục 1, 2 (kể cả "Nguồn và cách mở"), 6;
- schema của bộ dữ liệu (D1.2, `src/du-lieu.mjs`).

## Mỗi bản ghi

1. `node tools/khoa.mjs mau du-lieu/<bộ>/<id>` tạo hồ sơ mẫu.
2. Viết nhận định cho các trường của việc. Mỗi nhận định có `id`, `cau` (câu tiếng Việt nói đúng điều dữ liệu ghi), `loai`, `truong` (các trường câu ấy nói tới), `nguon`, `trich`, `ket_qua`, `ghi_chu` khi cần. Không ghi `luot_2`. Tách gọn: tác giả một câu, năm và nơi đăng một câu, kết quả chính một câu.
3. Chỉ ghi nguồn đã mở và có nói điều ấy.
4. Kết quả:
   - `dung`.
   - Dữ liệu sai: **không sửa `src/data/`**. Ghi `da-sua`, viết câu đúng vào `cau`, ghi cũ và mới cùng lý do ở `ghi_chu`. Thêm một mục vào file sửa của phần: `{ban_ghi, truong, cu, moi, nhan_dinh, nguon, ly_do}`. Người gom áp dụng một lần, vì nhiều agent cùng làm.
   - Không quyết được: `ket_qua: null`, `ghi_chu: "chưa chắc: …"`.
5. Điền `lan[0].ngay` và `nguoi.luot_1`. Kiểm hồ sơ đọc được bằng `node tools/khoa.mjs xuat du-lieu/<bộ>/<id>`.

## Gợi ý theo bộ dữ liệu

- **Nguồn** (`nguon.yml`): tác giả, năm, tên bài, nơi đăng, số tập, trang theo Crossref (`https://api.crossref.org/works/<DOI>`, gọi từ máy chủ repo hay GitHub Actions) và trang của nhà xuất bản; sách theo trang của nhà xuất bản, WorldCat, Google Books. Bài bị rút hay đính chính: ghi `trang_thai` theo thông báo của nhà xuất bản và Retraction Watch, không theo cờ của OpenAlex (từng gắn nhầm).
- **Nghiên cứu** (`nghien-cuu.yml`): tác giả, năm, mẫu (số người, ai), thiết kế, kết quả chính theo bài gốc; trang nhà; các lần tái lập lớn kèm năm. Kết quả chính khóa cùng trang nhà.
- **Thẻ ngộ nhận** (`ngo-nhan.yml`): khẳng định phổ biến, kết luận (đúng, sai, tranh cãi), giải thích, nguồn; kết luận theo thước đo nhãn.

## Đầu ra

- Hồ sơ của phần.
- File sửa `plans/lam-lai/bao-cao/<việc>/sua-<x>.yml`.
- Ghi chú `plans/lam-lai/bao-cao/<việc>/luot-1-<x>.md`: số liệu; chỗ chưa chắc; vấn đề schema; nguồn hay dùng.

## Quy tắc

- Chỉ ghi các file của phần mình: có agent khác làm cùng worktree.
- Không build, không chạy kiểm thử, không commit, không push.
- Không đưa thông tin cá nhân của chủ repo ra ngoài; Crossref đề nghị ghi thông tin liên hệ trong User-Agent: dùng `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`, không ghi email.
- Xong thì trả lời: số liệu, chỗ chưa chắc, chỗ sửa, điều người gom phải quyết.
