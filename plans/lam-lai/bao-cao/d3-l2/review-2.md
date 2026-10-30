# D3-L2 review 2: keo-deo, pavlov, skinner, harlow

Model: Claude Sonnet 5.5 (agent review), 30/10/2026. Không build, không commit. Hồ sơ `kiem-dinh/thi-nghiem/{keo-deo,pavlov,skinner,harlow}.yml` có `review: dung|sai` và một câu "Review (Claude Sonnet 5.5, 30/10/2026): …" ở cuối `ghi_chu` của mọi câu thuộc phạm vi review; `nguoi.review` ghi ở lần kiểm định cuối; mỗi trang có thêm mục `doi_chu`. `node tools/khoa.mjs xuat thi-nghiem/<trang>` đọc được cả bốn trang; `loiHoSo` (khiKhoa) chỉ còn báo `nguoi.luot_2` và `nguoi.kiem_mau` (việc của lượt 2 và chủ repo).

## Kết quả

| Trang | Câu review | dung | sai (đã sửa) |
|---|---|---|---|
| keo-deo | 45 | 44 | 1 (n41) |
| pavlov | 44 | 38 | 6 (n10, n15, n18, n43, n51, n55) |
| skinner | 41 | 34 | 7 (n9, n14, n21, n32, n39, n51, n58) |
| harlow | 44 | 36 | 8 (n14, n26, n28, n32, n34, n48, n51, n55) |

Phạm vi: mọi câu `ve-site`, `nhan`, mọi câu lượt 2 khác `dung`, mọi câu lượt 1 `da-sua`, `da-lam-mem`, `da-bo`. Ngoài ra thêm `review` cho các câu `thoi-su` phải sửa nguồn.

## Câu sai: chữ cũ → chữ mới

keo-deo
- n41 (khung Khá vững): "mỗi nhóm khoảng 6–10 trẻ" → "4–10 trẻ" (Mischel 1972 toàn văn: TN III có hai nhóm đối chứng 4 trẻ).

pavlov
- n10: "nhìn thấy thức ăn, cái bát quen thuộc, hay người thường cho chúng ăn" → "nhìn thấy thức ăn, nhìn cái bát rỗng, hay nghe tiếng chân của người phụ tá" (trang chưa theo hồ sơ; OpenStax 6.2).
- n15: "đáp ứng có thể trở lại một phần" → "đáp ứng đã tắt có thể trở lại" (trang chưa theo hồ sơ).
- n18: "mọi thủ tục trên động vật đều phải qua hội đồng đạo đức…" → "chẳng hạn chính sách của cơ quan y tế công cộng Mỹ (PHS Policy), nghiên cứu trên động vật phải được hội đồng đạo đức duyệt và tránh hay giảm thiểu đau đớn" (thêm nguồn `phs-policy`).
- n43: bỏ vế "ý tưởng tương tự được dùng khi huấn luyện bằng tiếng clicker" (OpenStax 6.2, 6.3 không có).
- n51 (đáp án câu 4): "sinh vật học mối liên hệ…" → "học mối liên hệ giữa hai kích thích … học mối liên hệ giữa hành vi và hậu quả".
- n55 (hộp hồ sơ): "hơn một trăm cộng sự … 25 năm" không có trong phần kể → thêm vào cuối đoạn Bản tổng kết: "Trong bài giảng đầu, Pavlov kể công việc này đã kéo dài khoảng 25 năm, với hơn một trăm cộng sự tham gia" (đã đọc bài giảng I).

skinner
- n14 (lượt 2 đúng): "phó giáo sư" → "trợ lý giáo sư (assistant professor) ở Đại học Minnesota" (trang tựa sách 1938).
- n21: bỏ "dồn dập" ở gạch đầu dòng FI và chú thích hình `skinner-schedules` ("tăng tốc dồn dập" → "tăng tốc").
- n51 (lượt 2 qua-manh): bỏ "FI dễ tắt dần nhất" ở lời giải thích câu 2 ("…FI cho tốc độ vừa phải, với quãng nghỉ sau mỗi lần thưởng") và ở khung Khá vững ("(theo giáo trình mở, tỉ lệ biến đổi khó tắt dần nhất)"). OpenStax có câu đó nhưng không nguồn nào khác; thứ tự phụ thuộc thông số.
- n39: tên gạch đầu dòng "Ba yếu tố (tình huống – hành vi – hậu quả)" → "Kích thích phân biệt và lịch trình củng cố".
- n9: vế "trong sách 1938, Skinner gọi là 'experimental box'" trên trang không có nhận định nào chứa nó → thêm vào `cau`, `nguon`, `trich` của n9 (đã đọc OCR sách 1938).
- n32: như pavlov n18 (PHS Policy).
- n58 (hộp hồ sơ): "bị giảm cân để đói có kiểm soát" (cho mọi con vật) → "trong thí nghiệm 1948, bồ câu bị giảm còn 75% cân nặng để đói có kiểm soát"; "máy ghi tích lũy" → "ghi dưới dạng đường cong tích lũy".
- n45 (da-bo): câu "Việc phần thưởng vật chất có làm mòn động lực nội tại… không đi sâu" còn trên trang → đã bỏ (review dung sau khi bỏ).

harlow
- n14 và n48 (lượt 2 khong-chac, đúng): "thời gian trên mẹ lưới thép giảm dần theo tuổi" → "thời gian trên mẹ vải tăng dần (khoảng 7 → 16 giờ/ngày trong 25 ngày đầu), còn thời gian trên mẹ lưới thép chỉ khoảng 1–2 giờ/ngày" (đã mở ảnh Hình 5 và Hình 6; đường mẹ lưới thép phẳng).
- n32: ba chỗ "nhu cầu nguyên thủy… độc lập với nhu cầu ăn" (đoạn mở đầu, gạch đầu dòng lý thuyết, đáp án câu 4) → "biến số quan trọng… áp đảo, hơn hẳn việc cho bú" (Harlow viết "very important variable"; ghi chú lượt 1 nói đã bỏ nhưng trang còn).
- n26 và n51: "thí nghiệm nhằm gây trầm cảm ở khỉ" → "thí nghiệm gây tranh cãi nhằm tìm cách chữa trầm cảm", kèm tiêu đề đúng của bài van Rosmalen 2022 ("Harry Harlow's pit of despair: Depression in monkeys and men", đã xác nhận qua OpenAlex, Europe PMC); đáp án câu 5 "thí nghiệm gây trầm cảm" → "thí nghiệm về trầm cảm".
- n34: "hình ảnh gần với 'căn cứ an toàn'… (theo OpenStax)" → ghi Harlow dùng "base of operations", và "đây là phép so sánh của trang" (OpenStax không nối hai thứ). Phần Suomi 1976 lượt 2 không kiểm được vì tra nhầm bài; tôi đã mở đúng tóm tắt (PubMed 824960, 4 khỉ): khớp.
- n28: như pavlov n18 (PHS Policy).
- n55 (hộp hồ sơ): "cộng thêm các nhóm đối chứng khỉ nuôi không có mẹ giả" → "cộng thêm 4 khỉ đối chứng chưa từng nuôi với mẹ giả".

Câu `thoi-su` thiếu `nguon` đã thêm `tim-kiem-vn` (Europe PMC, tự tra lại 30/10/2026, từ khóa và số kết quả ghi ở `ghi_chu`): keo-deo n52, pavlov n44, skinner n46, harlow n43; thêm `het_han` cho pavlov n45 và harlow n44 (đã bỏ khỏi trang, loại `thoi-su` đòi hạn). harlow n40 (nghĩa bóng) thêm `nguon: [harlow1958]`.

## Câu lượt 2 đã chỉ, kết luận
- skinner n14: sai thật (xem trên). n51: sửa. n24 ("10.000 đáp ứng", lượt 2 không kiểm được): đã đọc Skinner 1953 toàn văn (Internet Archive), chương V tr. 70–71 có đúng câu; giữ nguyên, review dung.
- harlow n14, n48: sửa. n24 (da-bo) và n44 (da-bo): đã xem trang thật, đã bỏ. n26, n34: sửa. 
- pavlov n45: đã bỏ khỏi trang, thêm `het_han`.
- keo-deo n54: đã bỏ khỏi trang (grep "diễn đàn" = 0), review dung.

## Nhãn đã chốt (đối chiếu mục 4)
- keo-deo: n41 Khá vững; n42 Khá vững (sát ranh Đang tranh cãi: Watts 2018 n = 552 thấy tương quan đơn giản β = 0,24, bằng nửa bản gốc, còn 0,08 rồi 0,05 khi kiểm soát; nhãn chỉ nói tương quan ở tuổi teen tồn tại và khung ghi "nhỏ hơn"; không dự đoán ở tuổi trưởng thành nằm ở khung bác bỏ); n43 Đã bị bác bỏ (cho riêng ý "định đoạt": Watts 2018, Benjamin 2020 và Sperber 2024 có đăng ký trước).
- pavlov: n27 Vững chắc (Duits 2015, Hofmann 2010, Vervliet 2013); n28 Vững chắc; n30 Đang tranh cãi (Miller 1995, Maes 2016); n33 Đã bị bác bỏ cho hai khẳng định cực đoan về chuông (đã đếm bảy bài giảng đầu: máy đếm nhịp 67, "electric bell" 2).
- skinner: n33 Vững chắc (Prendergast 2006 d = 0,42, thu hẹp ở động vật cho phần lịch trình); n34 Khá vững; n35, n37 Đang tranh cãi (không đủ điều kiện bác bỏ).
- harlow: n33 Khá vững; n34 Khá vững (mức thấp nhất, xem dưới); n35 Đang tranh cãi.

## Chưa chắc
- keo-deo n42 sát ranh (giữ Khá vững); harlow n34 chỉ dựa trên hai nghiên cứu nhỏ (4 khỉ mỗi nghiên cứu), có thể bị chủ repo hạ.
- Mô tả và đáp án "lần làm lại 2018 với 918 trẻ" của keo-deo: các hệ số một nửa, β 0,08, 0,05 là của mẫu 552 (Bảng 4, n = 552); phần kể đã nói rõ 552, nên giữ.
- Câu chuẩn mực đạo đức nay có nguồn PHS Policy, chỉ đúng cho nghiên cứu do PHS Mỹ tài trợ; Chỉ thị 2010/63/EU không mở được (EUR-Lex trả rỗng).
- Câu thời sự "chưa tìm thấy nghiên cứu ở Việt Nam" chỉ tìm trên Europe PMC; chưa tìm tạp chí trong nước.
- `metcalfe1999`, `benjamin2020`, `sperber2024`, `hofmann2010`, `duits2015`, `miller1995`, `vervliet2013`, `bouton2004`, `nobel1904`, `suomi1976`, `vanrosmalen2022`… có trong hồ sơ nhưng chưa có trong `src/data/nguon.yml` (trang Nguồn viết tay; việc của người giao dữ liệu dùng chung). `phs-policy`, `tim-kiem-vn` chỉ ở hồ sơ.
- Không chạy được `tests/chuyen.test.mjs` hai phép thử cần `../psyche-zero/` (EPERM trong sandbox); `tests/khoa.test.mjs`, `tests/pham-vi.test.mjs` đạt. Hình `skinner-schedules` đã sửa chú thích nằm trong `HINH_DA_SUA`; hình `harlow-contact` không đổi (đã đối chiếu số đọc với ảnh Hình 5).

## File đã chạm
- `src/content/docs/thi-nghiem/{keo-deo,pavlov,skinner,harlow}.md`
- `src/hinh/skinner-schedules.html`
- `kiem-dinh/thi-nghiem/{keo-deo,pavlov,skinner,harlow}.yml`
- `plans/lam-lai/bao-cao/d3-l2/review-2.md`
