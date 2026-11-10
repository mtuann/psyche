# D5-L3 lượt 1, phần 1/2: Chú ý–tri giác (4 bài)

Làm ngày 10/11/2026, Claude Sonnet 5.5. Nhánh `moi/d5-l3`. Trang: `ao-giac-thi-giac`, `nhin-ma-khong-thay`, `nghe-chon-loc` (tầng `loi`), `da-nhiem-so` (tầng `mo-rong`).

## Số nhận định (hồ sơ `kiem-dinh/kham-pha/chu-y-tri-giac/`)

| Trang | Tổng | Đúng | Đã sửa | Đã làm mềm | Đã bỏ | Chưa chắc |
|---|---|---|---|---|---|---|
| ao-giac-thi-giac | 49 | 20 | 15 | 13 | 1 | 0 |
| nhin-ma-khong-thay | 52 | 20 | 17 | 13 | 2 | 0 |
| nghe-chon-loc | 67 | 26 | 31 | 7 | 1 | 2 |
| da-nhiem-so | 52 | 14 | 26 | 5 | 4 | 3 |

## Sửa lớn

- nghe-chon-loc: "4 trên 12 người" của Moray không có trong bài Moray (bảng III: 20/39 chỉ dẫn có tên được nghe, 4/36 không tên; 33% là Conway thuật lại). Đã sửa ở mọi chỗ (câu đố, mục Moray, khung Khá vững, quiz 2). Hai khung Vững chắc/Khá vững hạ theo thước đo; "hàng chục lần" thành 35.
- ao-giac-thi-giac: đoạn A `>---<` (cánh xòe ra) mới trông dài hơn, trang cũ ghi B. Mô tả Gregory (góc lồi/lõm) đảo ngược, đã trung tính hóa. Nhãn khung văn hóa giữ Khá vững; khung "ảo giác tồn tại" ghi chỗ khó (chưa có phân tích tổng hợp).
- nhin-ma-khong-thay: là trang nhà của Simons 2011; mục Simons & Chabris 1999 rút còn một câu và link về `thi-nghiem/khi-dot-vo-hinh`; "9 giây" thành "nhiều giây" (trang nhà ghi 5 giây); khung "đánh giá quá cao khả năng thấy hết" hạ Vững chắc xuống Khá vững; bỏ hai mục áp dụng không nguồn; bỏ đoạn Việt Nam không nguồn.
- da-nhiem-so: bỏ phần "breadth-biased", vòng xoáy, nhạc khi học, đoạn Việt Nam (ca dao, Zalo); Ward: bỏ thứ tự ba nhóm, "úp mặt tắt tiếng", cơ chế kìm nén (không kiểm được); thêm Parry & le Roux 2021, Kiesel 2010, khảo sát Hà Nội 2026; nhãn áp dụng 4 và khung switch cost ghi chỗ khó.

## Chỗ chưa chắc, chỗ khó (cho lượt 2 và review)

- Treisman 1964 và Deutsch & Deutsch 1963 không mở được (không có tóm tắt, không có trong kho Internet Archive): ba nhận định ghi `ket_qua: null`/làm mềm. Broadbent 1958 chỉ qua Conway 2001.
- Ophir 2009 chỉ qua tóm tắt và thông cáo Stanford; Uncapher & Wagner 2018 chỉ qua tóm tắt; Ward 2017 chỉ qua tóm tắt; Segall 1963 chỉ qua tóm tắt và Henrich 2010; Müller-Lyer 1889, Simon 1971, cách giải thích (Gregory, Howe & Purves) chỉ qua Wikipedia (nguồn bậc ba).
- Nhãn sát ranh: nghe-chon-loc "Đã bị bác bỏ" (hai thí nghiệm kinh điển), da-nhiem-so Vững chắc switch cost (Kiesel 2010 là tổng quan kể chuyện) và Khá vững của khung đa nhiệm truyền thông (có thể là Đang tranh cãi); lời khuyên gom thông báo, tự đo mức đa nhiệm (không nguồn riêng, ghi `null`).
- Quiz 3 của ao-giac-thi-giac còn mô tả "góc nhọn/tù thành góc 3D" (chưa mở toàn văn Segall 1966).

## Người giao phải sửa hay quyết

- `src/data/trang.yml`, `da-nhiem-so` (tầng `mo-rong`): đề xuất `dua_tren: [kham-pha/chu-y-tri-giac/nghe-chon-loc, kham-pha/chu-y-tri-giac/nhin-ma-khong-thay]`, `kiem_lai_truoc: 2028-05`.
- Nguồn mới chưa có ở `src/data/nguon.yml`: Cherry/Moray có sẵn; thêm Treisman 1960, Wood & Cowan 1995, Conway 2001, Röer & Cowan 2021, Lavie 1995, van der Kamp 2013, Watson & Strayer 2010, Kiesel 2010, Parry & le Roux 2021, Wiradhany 2017, Sanbonmatsu 2013, Ruiz Pardo 2022, Hartanto 2024 (nếu chưa có).
- Link "Ảo giác thị giác" là chữ thường, không phải link (đúng như trang cũ).
- Trang chưa build, chưa chạy `npm test`; hồ sơ đọc được bằng `node tools/khoa.mjs xuat`.
