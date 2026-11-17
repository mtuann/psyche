# Khóa: câu về chính site ở thẻ ngộ nhận (them/ve-site-ngo-nhan, 18/11/2026)

D8-L3 báo: `tools/khoa.mjs` từ chối nhận định `ve-site` ở bản ghi `ngo-nhan`, trong khi mỗi thẻ có trường `trang` (trang liên quan trên site, link) và `cap` (cấp trong bài thử "Bạn nghĩ gì về tâm trí?") là lựa chọn của site, không có nguồn ngoài để kiểm ở lượt 2.

- `tools/khoa.mjs`: `VE_SITE_BO` thêm `'ngo-nhan': ['trang', 'cap']`; lời báo lỗi kể thêm. Khẳng định, nhãn, giải thích, nguồn của thẻ vẫn không được là `ve-site` (phải qua hai lượt).
- `tests/khoa.test.mjs`: `trang`, `cap` được; `khang_dinh`, `nhan`, `giai_thich`, `nguon`, và câu gộp `trang` với `nhan`, bị từ chối.
- `AGENTS.md` (mục Khóa): ghi các trường được.

`npm run build`, `npm test`: 85/85. Mức lớn (công cụ khóa): review Opus. Model: Opus 5.5.
