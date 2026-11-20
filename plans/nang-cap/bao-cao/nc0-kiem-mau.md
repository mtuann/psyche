# NC0: kiểm mẫu của chủ repo và khóa lại

20/11/2026. Chủ repo trả lời «đạt» cho mọi mục kiểm mẫu của NC0. Gộp và khóa ở nhánh `moi/nc0-gop` (phiên chính, Claude Opus 5.5).

## Các mục kiểm mẫu

| Việc | Mục | Báo cáo |
|---|---|---|
| S1, S2 | `kham-pha/cang-thang-giac-ngu/giac-mo`, `kham-pha/tri-nho/tri-nho-lam-viec`, `kham-pha/chu-y-tri-giac/ao-giac-thi-giac` | `s1-s2.md` |
| T4 | `index` (trang chủ) | `t4.md` |
| S5 (gồm duyệt câu chữ) | `kham-pha/suc-khoe-tam-than/tram-cam`, `lo-au`, `tri-lieu-tam-ly` (vẫn `cho_chuyen_gia`, dải «Chưa qua rà soát chuyên môn») | `s5.md` |
| S3 | `kham-pha/phat-trien/tre-hoc-noi`, `kham-pha/tam-ly-xa-hoi/bat-hoa-nhan-thuc`, `kham-pha/phat-trien/tre-hoc-the-nao` | `s3.md` |
| K1 | `dua_tren` của 12 bài mở rộng | `k1-dua-tren.yml` |
| L1 | `lien_quan` của 75 bài | `l1-lien-quan.yml`, `l1-du-lieu.md` |

## Khóa

- 10 trang khóa lại (`node tools/khoa.mjs khoa`). `tram-cam` n15, n16 (đã bỏ khỏi trang ở S5): lấy lại kết quả lượt 2 cũ (bản ở `main`), vì lượt 1 S5 đã xóa trường ấy mà công cụ khóa vẫn đòi.
- 76 bản ghi `trang` khóa rộng hơn: 11 `#dua_tren,lien_quan,linh_vuc,moi,tang`, 1 `#dua_tren,linh_vuc,moi,tang`, 64 `#lien_quan,linh_vuc,moi,tang` (45 bản ghi còn lại giữ `#linh_vuc,moi,tang`). Mỗi hồ sơ thêm câu `ve-site` có `truong` và lần kiểm định mới.
- Gộp `mo/sktt-than-trong`: xung đột `kiem-dinh/khoa.json` (mỗi nhánh gỡ khóa trang của mình), giải bằng bản của nhánh gom và gỡ thêm ba trang Sức khỏe tâm thần.

## Kiểm thử trên bản thật

- `node tools/khoa.mjs tinh`: mọi mục khớp. `npm run build`: 122 trang; 75 bài có khối «Đọc tiếp».
- `npm test`: 158 đạt. `npm run test:trinh-duyet` (ba trình duyệt, trang mẫu cộng `tram-cam`, `tre-hoc-noi`, `vi-sao-ta-quen`): 257 đạt. `npm run test:hinh`: 82 đạt.
- `npm run lighthouse`: trang chủ 100/100/100/100; `giac-mo` 99/100/100/100; `ao-giac-thi-giac` 100/100/100/100.

## Còn chờ chủ repo quyết

1. Nút menu ở trang chủ trên màn 360 px (đổi mẫu `splash` sang `doc`), hay đủ với năm thẻ lối vào (`t4.md`).
2. S5, việc tùy chọn (`s5.md`, mục Review): số 42%/19% của Cuijpers 2023; chữ câu hỏi 2 của `tram-cam`, câu hỏi 3 của `lo-au`; «hay sớm hơn nếu thấy quá sức».
3. Mục 7 của kế hoạch, ý 4–6: hạn tìm chuyên gia, Search Console và link báo lỗi, nhịp làm.
