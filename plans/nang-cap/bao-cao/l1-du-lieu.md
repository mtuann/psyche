# L1 (dữ liệu): trường `lien_quan` cho khối "Đọc tiếp"

Nhánh `moi/nc0-lien-quan` (xếp trên `moi/nc0-doc-tiep`), 20/11/2026. Model: ba agent Claude Sonnet 5.5 đề xuất (chỉ đọc, ba lô song song); một agent Claude Sonnet 5.5 khác review `ve-site`; phiên chính Claude Opus 5.5 gộp, kiểm bằng máy, sửa theo review.

## Cách làm

- Lời giao chung: `l1-du-lieu/lq-brief.md`. Mỗi bài tối đa 4 trang: 1 bài Khám phá gần chủ đề (ưu tiên khác lĩnh vực), 1 thí nghiệm, 1 bài Hiểu bằng chứng cho khái niệm bài thật sự dùng, 1 công cụ; không hợp thì bỏ, không chọn cho đủ. Chỉ trang đã khóa; không trỏ bài mở rộng đã có ở phần "Bài mở rộng dựa trên bài này"; bài Sức khỏe tâm thần không trỏ công cụ có thể bị hiểu là tự đánh giá.
- Ba lô: A (15 thí nghiệm, 12 Hiểu bằng chứng), B (24 bài: trí nhớ, tri giác, tư duy, sinh học, giấc ngủ), C (27 bài: xã hội, tính cách, cảm xúc, căng thẳng, phát triển, hạnh phúc, Sức khỏe tâm thần). Đề xuất kèm lý do từng cặp: `l1-du-lieu/lq-{a,b,c}.yml`.
- Máy kiểm khi gộp: trang có trong `trang.yml` và đã khóa, tối đa 4, không lặp, không trỏ chính nó, không trỏ bài mở rộng dựa trên bài đang xét, mỗi cặp có lý do. Schema và kiểm chéo của `src/du-lieu.mjs` (K1) kiểm lại lúc build.

## Review (`l1-du-lieu/lq-review.yml`)

179 cặp: 166 đạt, 12 yếu, 1 sai (`do-lon-hieu-ung` → `tam-ly-hoc-duong`, lý do không đúng chữ bài). Đã sửa: bỏ 11 cặp; thay 2 (`do-lon-hieu-ung` → `phong-cach-hoc`, bài đọc d = 0,04 của phong cách học; `tram-cam` → `tim-giup-do`). Không dùng các trang thay mà review chỉ nêu "hay" (chưa ai kiểm).

## Kết quả

- 75 bài có `lien_quan`, tổng 168 trang (1 trang: 9 bài; 2: 40; 3: 25; 4: 1). Không có: `dunning-kruger` (không trang nào hợp), `nao-che-doi`, `tre-hoc-the-nao` (cặp duy nhất bị bỏ theo review).
- Thiếu: `giac-mo`, `tri-nho-lam-viec`, `ao-giac-thi-giac` đang mở khóa trên nhánh này (S1, S2) nên không được chọn làm đích; bổ sung sau khi khóa lại.
- Bản xem: 75 bài có khối "Đọc tiếp". **Bản thật chưa hiện**: trường `lien_quan` chưa khóa.

## Còn chờ

- Câu `ve-site` cho từng bản ghi: `l1-lien-quan.yml` (đã review). Chủ repo kiểm mẫu; đạt thì thêm câu và lần mới vào `kiem-dinh/du-lieu/trang/<id>.yml` và khóa rộng hơn (`#lien_quan,linh_vuc,moi,tang`; bài mở rộng gộp với `dua_tren` của `k1-dua-tren.yml`).

## Kiểm thử

`npm run build:xem`, `npm test`: 154 đạt.
