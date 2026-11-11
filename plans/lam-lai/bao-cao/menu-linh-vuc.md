# Menu: lĩnh vực của Nền tảng kể đủ bài (them/menu-linh-vuc, 10/11/2026)

Chủ repo báo: một số lĩnh vực trong menu chỉ có "Tổng quan" dù trang lĩnh vực ghi đủ bài (Phương pháp 12/12, Học tập 5/5). Chủ repo chọn cách 1: bài ở nhóm khác hiện cả trong lĩnh vực của nó.

## Nguyên nhân

`src/menu.mjs` xếp trang vào nhóm theo đường dẫn: lĩnh vực của Nền tảng chỉ nhận `kham-pha/…` và `nen-tang/…`. Trang lĩnh vực (`::danh-sach-bai{linh_vuc}`) thì lấy theo `linh_vuc`, gồm cả bài `thi-nghiem/…`, `bang-chung/…`. Lệch ở 6 lĩnh vực: Phương pháp (menu 0/12), Học tập (0/5), Tâm lý xã hội (4/10), Phát triển (7/9), Trí nhớ, Cảm xúc và động lực…

## Đã làm

- `src/menu.mjs`: lĩnh vực của Nền tảng thêm bài lõi, mở rộng của `thi-nghiem/`, `bang-chung/` cùng lĩnh vực (như `laBai` của `src/plugins/thanh-phan.mjs`), sau bài khám phá, theo thứ tự `trang.yml`; bản lặp có `attrs: { 'data-lap': '' }`. Bài nhóm Bắt đầu không lặp (trang lĩnh vực cũng không kể).
- `src/dieu-huong.mjs` (route middleware của Starlight, khai ở `astro.config.mjs`) gọi `suaBanLap`: Starlight đánh dấu chỗ khớp đầu tiên (chỗ lặp, vì Nền tảng đứng trước) là trang đang xem; dời dấu sang chỗ gốc, nên nhóm gốc mở, lĩnh vực lặp đóng. Trước, Tiếp tính trên menu bỏ chỗ lặp (giữ như cũ: Harlow → Bandura → Little Albert trong Thí nghiệm kinh điển). `prev: false`, `next: false` của frontmatter (404) vẫn theo.
- `tests/giao-dien.test.mjs`: mỗi trang đúng một chỗ gốc; mọi lĩnh vực kể đủ bài như trang lĩnh vực; dời dấu đang xem và Trước, Tiếp.

Không trang, bản ghi đã khóa nào đổi.

## Kiểm thử

- `npm run build`, `npm test`: 84/84. Đếm trong bản build: 14 lĩnh vực, số bài trong menu bằng số bài của trang lĩnh vực.
- `npm run build:xem`, `PSYCHE_TRANG="thi-nghiem/pavlov/,bang-chung/p-value/,nen-tang/hoc-tap/" npm run test:trinh-duyet`: 148/148 (ba trình duyệt, ba cỡ, axe).

## Model

Opus 5.5 (sửa), Haiku đọc diff (mức vừa): báo một lỗi "dấu đang xem dính sang trang sau" do sidebar Starlight lưu đệm; không đúng, vì Starlight chép sâu (klona) dữ liệu trang trước khi chạy middleware, và bản build cho thấy mỗi trang đúng một dấu ở chỗ gốc. CI test.yml 6/6.

## Chỗ chưa chắc

Menu dài hơn (thêm 27 mục lặp). Trang Hỗ trợ đứng sau Đạo đức nghiên cứu ở nút Tiếp, như trước.
