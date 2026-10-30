# D3-L2, lượt 1, phần 1/2: keo-deo, pavlov, skinner, harlow

Model: Claude Sonnet 5.5 (agent lượt 1). Ngày 30/10/2026. Nhánh `moi/d3-l2`. Không build, không commit. `node tools/khoa.mjs xuat thi-nghiem/<trang>` chạy được cho cả bốn trang. Trang không có khoảng trắng cuối dòng. Mỗi trang đã thêm hộp hồ sơ nghiên cứu (4 dòng) và `doi_chu` cho hộp ấy và hộp `::tom-tat`.

## Số nhận định (tổng 234)

| Trang | Tổng | dung | da-sua | da-lam-mem | da-bo | null |
|---|---|---|---|---|---|---|
| keo-deo | 66 | 26 | 28 | 11 | 1 | 0 |
| pavlov | 55 | 22 | 26 | 2 | 1 | 4 |
| skinner | 58 | 19 | 32 | 6 | 1 | 0 |
| harlow | 55 | 18 | 29 | 4 | 3 | 1 |

Mỗi trang có 3–4 nhãn, 1–2 câu thời sự (`thoi-su`, `het_han: 2028-10-01`), 3–4 câu `ve-site`.

## Sai so với nguồn, đã sửa (chi tiết ở `ghi_chu`: chữ cũ, chữ mới, lý do)

- **keo-deo:** thiết kế 1972 sai (trẻ chọn giữa kẹo dẻo và bánh quy que, tối đa 15 phút, không phải một so với hai viên; không có "đám mây trắng", "che mắt, quay đi"); "918 trẻ gấp mười lần mẫu gốc" sai (552 mới gấp mười); hệ số Watts ghi lại đúng (0,08 có ý nghĩa, 0,05 không); "con em cán bộ giảng viên", "dạy chiến thuật", đoạn Việt Nam: không nguồn, đã bỏ.
- **pavlov:** bỏ chi tiết chỉ dựa vào Todes 2014 (không mở được) và "phong cầm", "lỗ rò thực quản"; thí nghiệm bảy bài giảng đầu: máy đếm nhịp 67 lần, chuông điện 2 lần; Thomas 1997 xác nhận có dùng chuông.
- **skinner:** Ferster & Skinner chủ yếu dùng bồ câu (trang viết chuột); bỏ "741 trang", "1904–1990", "hộp Skinner không phải tên ông đặt" (không kiểm được); PREE dẫn Skinner 1953 (đọc toàn văn), không dẫn Ferster & Skinner; "ý chí tự do chỉ là ảo giác" không có trong Skinner 1953 (ông viết phải giả định hành vi "lawful and determined"); Chomsky: củng cố là một yếu tố quan trọng, không phải "không thể giải thích".
- **harlow:** mẹ lưới thép cũng được sưởi ấm (trang viết "lạnh ngắt"); "17–18 giờ" nằm ở Hình 5 (không có trong bản psychclassics), bỏ số; cảnh "khỉ có/không có mẹ vải" là cùng 4 khỉ khi mẹ có/vắng mặt; bỏ "mẹ quái vật", "IACUC, 3R", "di chứng cô lập" (Harlow 1965 không mở được).

## Nhãn đổi theo thước đo (chuẩn mục 4), đều ghi `chỗ khó`

- keo-deo: Vững chắc giữ thành Khá vững; Đã bị bác bỏ thành Đang tranh cãi (một lần làm lại, Watts 2018).
- pavlov: Vững chắc giữ, nhưng phân tích tổng hợp (Hofmann 2010) là của điều kiện hóa đánh giá, không phải điều kiện hóa sinh lý: lượt 2 cân nhắc Khá vững. Đã bị bác bỏ giữ, đổi tên khung ("chuông là kích thích chính, hay duy nhất").
- skinner: Vững chắc thành Khá vững; Đã bị bác bỏ thành Đang tranh cãi (không có phân tích tổng hợp, không có chuỗi kiểm tra thất bại).
- harlow: Vững chắc thành Khá vững (8 khỉ, một phòng thí nghiệm).

## Chưa chắc (`ket_qua: null`)

- pavlov n29, n30, n32, n37: thuật ngữ "conditional" của Todes (sách 2014 và bài 1997 không mở được), Rescorla–Wagner/Kamin (chương sách), Jarius & Wildemann 2015 (chỉ có tên bài).
- harlow: số trong hình `harlow-contact` (17–18 giờ, dưới 1 giờ).

## Nguồn chỉ đọc tóm tắt hay nhan đề

Mischel 1988, 1989, Shoda 1990, Kidd 2013, Metcalfe & Mischel 1999, Staddon & Simmelhag 1971, Schultz 1997, Thomas 1997, Hofmann 2010, Beck 2009, Powell 2014, Harlow & Zimmermann 1959, Suomi 1976, van Rosmalen 2022; Harlow 1965 chỉ nhan đề (PMC bị reCAPTCHA).

## Toàn văn đã đọc

Mischel 1972 (bản quét), Watts 2018 (gwern), Pavlov 1927 (bảy bài giảng đầu), Watson & Rayner 1920, Skinner 1938 (OCR), Skinner 1948, Skinner 1953, Ferster & Skinner 1957 (bản in lại có lời giới thiệu 1997), Harlow 1958 (không có hình), Chomsky 1959 (bản 1967), OpenStax 2e (6.2, 6.3, 6.4, 9.3, 16.2), Nobel 1904.

## Người giao phải sửa hay quyết

1. **Hình `harlow-contact`** (không sửa theo lời giao): số 17–18 giờ, "dưới 1 giờ", chú thích "đúng bằng thời gian bú rồi quay về ngay" không kiểm được; nhãn "mẹ sắt" nên là "mẹ lưới thép". Trang đã bỏ số: hình và trang đang lệch.
2. **Hình `skinner-schedules`:** không có số; chữ "rất cao, đều, bền nhất" ở VR hơi lệch chữ trang ("cao, đều, khó tắt dần nhất").
3. **`src/data/nguon.yml`:** `suomi1972` sai (đúng: Suomi, Delizio & Harlow 1976, AJP 133(11), 1279–1285); thiếu `metcalfe1999`, `hofmann2010`, `staddon1971`, `cotter1967`, `vanrosmalen2022`, `todes1997`, `nobel1904`. Kiểm tra `nguon` của hồ sơ trước khi khóa.
4. **Nhãn** (mục trên): lượt 2/review xem lại.
5. **Chuẩn mực đạo đức động vật** (câu chung ở pavlov, skinner, harlow) chỉ có nguồn là OpenStax ("modern ethics guidelines"); cần nguồn quy định cụ thể nếu muốn giữ.
6. Pavlov còn đoạn kể Watson & Rayner dài (trang nhà là `little-albert`): chưa rút gọn.
7. Ba bản ghi `ket_qua: null` ở pavlov cần lượt 2 hay người giao có Todes 1997 để xác nhận.
