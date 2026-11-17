# Bỏ lời "đang làm lại" ở trang chủ và trang 404 (mo/xong-lam-lai, 17/11/2026)

Đợt 9 xong: 106/106 trang cũ đã lên site và khóa (`plans/lam-lai/doi-chieu.md`). Chủ repo duyệt bỏ lời "Psyche đang được làm lại" (17/11/2026).

## Việc đã làm

- `src/content/docs/index.md`: bỏ hộp "Đang làm lại". Hồ sơ `kiem-dinh/index.yml`: nhận định n4 thành `da-bo`, lần 4.
- `src/content/docs/404.md`: tiêu đề "Không thấy trang này"; mô tả và câu dẫn không còn nói site đang làm lại; câu cuối nói link cũ tới Psyche Zero giữ nguyên đường dẫn, chỉ đổi `/psyche-zero/` thành `/psyche/` (đúng theo bảng đối chiếu). Hồ sơ `kiem-dinh/404.yml`: lần 3 (trang không có nhận định).
- Mở khóa rồi khóa lại cả hai trang. `kiem-dinh/khoa.json` được công cụ khóa ghi lại theo định dạng chuẩn (nhiều dòng); bản trên main đang là một dòng (ghi tay lúc gộp trước đó).
- Kiểm thử: `tests/khung.test.mjs` (trang chủ không còn câu "đang được làm lại"), `tests/link.test.mjs` (404 không còn câu ấy, có tiêu đề mới).

## Kiểm thử

`npm run build && npm test`: 151 đạt, 0 hỏng.

## Model

Claude Opus 5.5 (người gộp). Chỉ câu về chính site: không cần lượt 2.
