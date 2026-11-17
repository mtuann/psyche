# Bỏ link sang Psyche Zero; câu về bài Sức khỏe tâm thần (mo/bo-link-site-cu, 17/11/2026)

Repo `mtuann/psyche-zero` đã chuyển sang riêng tư, nên https://mtuann.github.io/psyche-zero/ trả 404 (kiểm 17/11/2026). Chủ repo chọn bỏ link sang site cũ (17/11/2026). Cùng lúc sửa câu ở "Cách Psyche kiểm chứng" còn nói bài Sức khỏe tâm thần chỉ lên site sau khi chuyên gia đọc, lệch với quyết định đăng trước (16/11/2026).

- Mở khóa, sửa, khóa lại: `index` (bỏ câu "bản cũ vẫn đọc được ở…"), `404` (bỏ nút và câu "Xem ở bản cũ, Psyche Zero"), `bat-dau/cach-kiem-chung` (câu mới: bài Sức khỏe tâm thần kiểm hai lượt, chưa có chuyên gia đọc thì có dải "Chưa qua rà soát chuyên môn"; nhận định n20 mới). Hồ sơ: lần mới có đủ người; chỉ đổi câu về chính site.
- `src/components/Hero.astro`: bỏ đoạn script đổi link "bản cũ" theo đường dẫn.
- `tests/link.test.mjs`: trang 404 không còn link sang psyche-zero.
- Còn lại: `src/components/Footer.astro` vẫn có địa chỉ Hỗ trợ của site cũ làm dự phòng khi bản build không có trang Hỗ trợ; trang Hỗ trợ đã khóa nên dự phòng ấy không dùng tới.

Kiểm thử: `npm run build`, `npm test` 85/85 (bản build không còn link `psyche-zero` trong trang); kiểm thử trình duyệt (404, Cách Psyche kiểm chứng; ba trình duyệt, axe) 114/114. Model: Opus 5.5.
