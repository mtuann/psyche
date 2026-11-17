# D9: đối chiếu với site cũ, quét toàn site, bỏ phụ thuộc site cũ

Nhánh `them/doi-chieu`, 17/11/2026. Model: Sonnet 5.5.

## Đã làm

1. **Bảng đối chiếu** `plans/lam-lai/doi-chieu.md`: 106 trang cũ đều có trang cùng địa chỉ trong bản thật (đã khóa); chức năng cũ đều có chỗ tương ứng, trừ nút "In bài này" ở từng bài và hai máy canh hằng tuần của site cũ (còn ở việc máy canh của đợt 9). Thêm `tests/doi-chieu.test.mjs` (mọi trang cũ có trong `dist/`) để kiểm lại mỗi lần chạy `npm test`.
2. **Quét toàn site**, bản thật (`npm run build`, 122 trang gồm 404). Thêm `PSYCHE_TOAN_SITE=1` ở `tools/trang-mau.mjs` (mọi trang của `dist/`; `npm run lighthouse` không giới hạn ba trang; axe thêm cỡ 768 px).
3. **Bỏ phụ thuộc `../psyche-zero/`**: sửa `AGENTS.md` (site cũ đã tắt, chỉ còn repo riêng tư để tra; 404 mô tả đúng; phần chuyển trang ghi là chỉ để tra); chụp danh sách 106 trang cũ vào `tests/trang-site-cu.txt` để `tests/du-lieu.test.mjs` kiểm `trang.yml` mà không cần site cũ (thêm một phép kiểm danh sách chụp còn khớp khi có site cũ ở máy); bỏ dự phòng link Hỗ trợ tới site cũ ở `Footer.astro`; thêm `og:image`, `twitter:image`, `twitter:card summary` ở `astro.config.mjs` (site cũ có, site mới thiếu).

## Kết quả quét

| Phép đo | Trang | Trượt | Ghi chú |
|---|---|---|---|
| Lighthouse (điện thoại, mạng chậm mô phỏng, 1 lần mỗi trang) | 122 | 0 | Trợ năng, thực hành tốt, SEO đều 100 ở 122 trang. Hiệu năng: 117 trang 100; 99 ở `bang-chung/do-luong`, `kham-pha/phat-trien/tuoi-gia`, `kham-pha/suc-khoe-tam-than/tri-lieu-tam-ly`, `kham-pha/tri-tue/tri-tue-la-gi`; `sach/` 55 (miễn theo `MIEN_HIEU_NANG`: 4,9 s LCP, 828 KiB, TBT 625 ms). Mọi trang khác LCP 1,2–1,4 s, TBT 0 ms |
| axe (WCAG 2.2 AA và best-practice, Chromium) | 122 x 3 cỡ (360 tối, 1280 sáng, 768 sáng) = 366 lượt | 0 | Chạy trên bản build sau khi thêm thẻ meta |

Không có lỗi nào cần sửa mã chung, nên không có lần chạy lại sau sửa. Lighthouse chạy trên bản build trước khi thêm thẻ meta `og:image`; axe và `npm test` chạy sau. Thẻ meta không đổi cách vẽ trang.

## Kiểm thử

- `npm run build && npm test`: 137 kiểm, 136 đạt, 0 hỏng, 1 bỏ qua (phạm vi lô, nhánh không phải nhánh lô).
- `npm run build:xem && npm test`: như trên.
- Trong một bản chép ở thư mục không có `../psyche-zero/` (thư mục scratchpad của phiên này có sẵn liên kết tới site cũ, nên phải chép ra thư mục riêng): bản thật 133 đạt, 0 hỏng, 4 bỏ qua; bản xem như vậy. Chứng minh build và kiểm thử không cần site cũ.

## Kiểm thử tự bỏ qua vì thiếu site cũ, và cách giữ giá trị

| Kiểm thử | Việc kiểm | Cách xử lý |
|---|---|---|
| `tests/chuyen.test.mjs`: "site cũ: mọi trang chuyển được…" | script chuyển chạy được trên 106 trang cũ | Giữ: là phép kiểm của công cụ chuyển (đã xong việc); đề xuất bỏ cùng `tools/chuyen/` khi chủ repo cho |
| `tests/chuyen.test.mjs`: "hình tĩnh… chép đúng hình của trang cũ" | hình `src/hinh/` khớp hình cũ | Giữ như trên |
| `tests/du-lieu.test.mjs`: "trang.yml có mọi trang của site cũ" | `trang.yml` có đủ 106 trang | Đã đổi: đọc `tests/trang-site-cu.txt`, không còn bỏ qua |
| `tests/du-lieu.test.mjs`: danh sách chụp khớp site cũ | danh sách chụp đúng | Mới, chỉ chạy khi có site cũ ở máy |

## File đã chạm

`plans/lam-lai/doi-chieu.md`, `plans/lam-lai/bao-cao/d9-doi-chieu.md`, `plans/lam-lai/README.md` (một dòng), `AGENTS.md`, `tools/trang-mau.mjs`, `tools/lighthouse/kiem.mjs`, `tests/trinh-duyet/kiem-tro-nang.mjs`, `tests/du-lieu.test.mjs`, `tests/doi-chieu.test.mjs`, `tests/trang-site-cu.txt`, `astro.config.mjs`, `src/components/Footer.astro`. Không chạm `src/content/docs/`, `kiem-dinh/`, site cũ.

## Chỗ chưa chắc

- Lighthouse đo một lần mỗi trang (cả site một lần): 99 ở bốn trang là điểm một lần, có thể 100 khi đo lại; không trượt ngưỡng 95 nên không đo lại.
- Id tiêu đề cũ: 32 id ở 16 trang không còn do bài được viết lại; link `#mục` cũ tới chúng không cuộn tới mục (xem `doi-chieu.md`, C4).
- Nút "In bài này" và lời trang 404 (đã khóa) chưa sửa: chờ quyết định, ghi ở `doi-chieu.md` mục C.
- Thư mục scratchpad của phiên có liên kết `psyche-zero` tới site cũ, nên kiểm thử chạy ở worktree dưới scratchpad vẫn thấy site cũ; xem mục kiểm thử.
