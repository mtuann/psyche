# Bản mẫu giao diện đã chọn (D1.3)

Ngày 29/10/2026, Claude (phiên Cowork, Opus) dựng ba bản mẫu giao diện bằng nội dung cũ: trang chủ, bài `kham-pha/tri-nho/vi-sao-ta-quen`, thí nghiệm `thi-nghiem/asch`, ở chế độ sáng và tối, màn hình 360 và 1280 px. Bản mẫu chỉ để xem, không đăng. Chủ repo chọn **phương án C "Tạp chí"**, lấy thêm **màu riêng của từng lĩnh vực ở phương án B**. Quyết định ghi ở `../README.md`, mục "Quyết định".

Thư mục này giữ mã của bản mẫu để D1.3 làm bản thật; đây không phải mã của site.

Bản mẫu làm trước D1.2: hai trang trong `trang/` ghi `linh_vuc`, `tang`, `loai` ở frontmatter, và `ma/PageTitle.astro` đọc chúng từ đó. Từ D1.2 các thông tin này ở `src/data/trang.yml` (frontmatter có chúng thì build hỏng; loại trang suy từ đường dẫn bằng `loaiTrang()` trong `src/du-lieu.mjs`): D1.3 đọc từ đó, chép trang mẫu vào repo thì bỏ ba dòng ấy.

| File | Nội dung |
|---|---|
| `phuong-an-c.jpg` | Ảnh phương án C: trang chủ, bài, khung nhãn, Asch nền tối, câu hỏi; điện thoại sáng và tối |
| `phuong-an-b.jpg` | Ảnh phương án B, để xem màu lĩnh vực (ô 14 lĩnh vực ở trang chủ, chấm màu ở dòng trên tiêu đề) |
| `ma/mau-chung.css` | Phần chung của ba phương án: màu bốn nhãn, nhãn nhỏ, khung nhãn, tóm tắt, hồ sơ nghiên cứu, hình, đáp án thu gọn, "sắp có", câu hỏi, đầu trang, menu bên |
| `ma/mau-c.css` | Phương án C: thanh trên và dải trang chủ chàm đậm, viên phía trên tiêu đề, mục lớn đánh số, khung nhãn nền màu, tóm tắt nổi bật, trang chủ |
| `ma/mau-b.css` | Phương án B; D1.3 chỉ lấy màu lĩnh vực (`--lv`, `--lv-nen`, `--lv-vien` tính từ sắc độ `--h`, ở `mau-chung.css`) và cách dùng màu ấy |
| `ma/PageTitle.astro` | Thay `PageTitle` của Starlight: viên loại bài, lĩnh vực, tầng; dòng trạng thái kiểm định |
| `ma/HeroC.astro` | Phần đầu trang chủ của C |
| `ma/du-lieu.mjs` | Dữ liệu tạm của bản mẫu: 14 lĩnh vực và sắc độ màu, menu bên. Bản thật đọc `src/data/` (D1.2) |
| `ma/trang-chu.mjs` | Sinh trang chủ mẫu (`node trang-chu.mjs C`); bản thật sinh từ dữ liệu, chỉ trang đã khóa (D2-L1) |
| `ma/astro.config.diff` | Chỗ sửa `astro.config.mjs`, `src/content.config.ts` của bản mẫu (chọn phương án qua `PSYCHE_MAU`, menu bên, thay `PageTitle`, `Hero`) |
| `trang/*.md` | Hai trang cũ với cách viết khối của bản mẫu (khung nhãn `<aside class="pz-nhan">`, tóm tắt, câu hỏi). **Nội dung cũ, chưa kiểm định**; cú pháp thật chốt ở D1.4 |

## Dựng lại bản mẫu

Trên một bản chép của repo ở commit D1.1 (`06bf148`): chép `ma/*` (trừ file `.diff`) vào `src/mau/`, áp `ma/astro.config.diff`, chép `trang/vi-sao-ta-quen.md` vào `src/content/docs/kham-pha/tri-nho/` và `trang/asch.md` vào `src/content/docs/thi-nghiem/`, rồi:

```bash
node src/mau/trang-chu.mjs C > src/content/docs/index.md
PSYCHE_MAU=C npm run build && npm run preview
```

## Ghi chú cho D1.3

- Đã kiểm trên bản mẫu (Chromium): không lỗi axe (WCAG 2.2 AA) ở 3 trang × sáng, tối × 360, 1280 px; không tràn ngang; link đứng riêng trên màn hình cảm ứng cao từ 44 px. Hai chỗ phải sửa lúc làm mẫu, giữ khi làm thật: chữ "sắp có" trong menu bên ở nền tối phải dùng `--sl-color-gray-2` (gray-3 chỉ đạt 4,48:1); câu hỏi mẫu trong ô lĩnh vực màu cũng vậy.
- Màu lĩnh vực: mỗi lĩnh vực một sắc độ (`mau` trong `src/data/linh-vuc.yml`, D1.2), chữ `hsl(h 55% 30%)` trên nền `hsl(h 60% 95,5%)` (sáng), `hsl(h 70% 80%)` trên `hsl(h 28% 19%)` (tối). Biểu tượng của lĩnh vực làm ở D1.3.
- Đánh số mục lớn chỉ ở trang có menu bên (`[data-has-sidebar]`), không ở trang chủ.
- Hộp tóm tắt dùng `display: contents` cho mục danh sách để nhãn thẳng cột; bản thật nên dựng bằng thành phần (D1.4) và giữ ngữ nghĩa danh sách cho trình đọc màn hình.
- Dòng trạng thái kiểm định trong bản mẫu là chữ giữ chỗ. Bản thật đọc `kiem-dinh/` (D1.6), ví dụ "Nền tảng · Kiểm chứng hai lượt, khóa ngày 05/11/2026 · 1 bổ sung (03/2027)".
- Menu bên của bản mẫu liệt kê cả trang chưa có (huy hiệu "sắp có") để thấy khung. Site thật chỉ hiện trang đã khóa (luật 1).
