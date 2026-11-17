# Bài Sức khỏe tâm thần lên site trước khi chuyên gia đọc (them/cho-chuyen-gia, 16/11/2026)

Chủ repo quyết (16/11/2026): đợt 7 làm xong nội dung thì cho lên site, chuyên gia rà soát sau. Trước đây `tools/khoa.mjs` chặn khóa bài Sức khỏe tâm thần khi hồ sơ chưa có `nguoi.chuyen_gia`, nên bài không thể lên bản thật.

## Đã làm

- `tools/khoa.mjs` (`loiHoSo`): bài `kham-pha/suc-khoe-tam-than/` khóa được khi lần kiểm định cuối có `nguoi.chuyen_gia`, hay `nguoi.cho_chuyen_gia` (chuỗi khác rỗng: ai đồng ý, ngày). Mọi điều kiện khác giữ nguyên (hai lượt, review, kiểm mẫu).
- `src/kiem-dinh.mjs` (`kiemDinh`): thêm `choChuyenGia` (lần cuối có `cho_chuyen_gia` mà chưa có `chuyen_gia`).
- `src/components/PageTitle.astro`, `src/styles/psyche.css`: bài Sức khỏe tâm thần đã khóa mà `choChuyenGia` thì hiện khung viền cam ngay dưới dòng trạng thái: "Chưa qua rà soát chuyên môn…", không dùng để tự chẩn đoán, kèm link Hỗ trợ. Đọc từ hồ sơ, nên chuyên gia ký xong thì dải tự mất mà mã băm của trang không đổi.
- Kiểm thử: `tests/khoa.test.mjs` (khóa được với `cho_chuyen_gia`; chuỗi trống hay `true` thì không; `kiemDinh().choChuyenGia`); `tests/khung.test.mjs` (mọi bài Sức khỏe tâm thần đã khóa: chưa có chuyên gia thì có dải và link Hỗ trợ, có chuyên gia thì không có dải).
- Tài liệu: `plans/ben-vung/chuan-kiem-dinh.md` mục 5 (cách đăng trước, việc khi chuyên gia đọc xong), `AGENTS.md` (Dữ liệu, Khóa), kế hoạch (đợt 7, việc treo).

## Kiểm thử

- `npm run build`, `npm test`: 85/85.
- Thử tạm (không commit): một trang `tram-cam` giả, khóa với `cho_chuyen_gia`, build bản thật: dải hiện ở 360 px (sáng) và 1280 px (tối); thêm `chuyen_gia` mà không build lại thì kiểm thử khung báo "đã có chuyên gia mà còn dải"; build lại thì dải mất, kiểm thử đạt.

## Model

Opus 5.5 (làm); review mã mức lớn (đụng khóa): Opus 5.5. Review thấy `chuyen_gia: " "` hay `true` (không có `cho_chuyen_gia`) vẫn khóa được mà không có dải: sửa, cả ba chỗ (`tools/khoa.mjs`, `src/kiem-dinh.mjs`, kiểm thử khung) dùng chung `coChu` (chuỗi có chữ); thêm kiểm thử. Khi 4 bài lên: thêm một bài vào `PSYCHE_TRANG` để axe kiểm dải.
