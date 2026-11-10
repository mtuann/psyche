# D5-L3 review nội dung, phần Tính cách (3 bài)

Ngày 10/11/2026, Claude Sonnet 5.5. Trang: `kham-pha/tinh-cach/big-five`, `tinh-cach-thay-doi` (tầng `loi`), `mbti` (tầng `mo-rong`). Tự mở nguồn: Internet Archive (bộ wikipedia-scholarly-sources-corpus, đã tìm đúng zip theo danh sách tệp), Europe PMC, nap.edu, OpenStax, intestcom.org, research.vu.nl, trang 16Personalities. Không build, không commit.

## Kết quả

| Trang | Đã review | dung | sai (đã sửa) | Nhận định khác |
|---|---|---|---|---|
| big-five | 28 | 18 | 10 | 22 chưa cần review (dung ở cả hai lượt) |
| tinh-cach-thay-doi | 26 | 23 | 3 | 15 như trên |
| mbti | 43 | 41 | 2 | n14, n27 (dung ở cả hai lượt) |

Hồ sơ đọc được bằng `node tools/khoa.mjs xuat`; `loiHoSo` chỉ còn báo thiếu `nguoi.luot_2` và `nguoi.kiem_mau` (không thuộc phần việc của review). `nguoi.review` đã ghi "Claude Sonnet 5.5 (agent review D5-L3, 10/11/2026)". Cả ba hồ sơ đã có `doi_chu` (18 đến 24 mục).

## Câu sai (chữ cũ → chữ mới)

big-five
- n8: "4.500 từ miêu tả đặc điểm ổn định, quan sát được" → "xếp vào nhóm nét tính cách bền, ổn định (như hung hăng, hướng nội, hòa đồng)"; "quan sát được" không có trong Allport & Odbert 1936.
- n25: ".63 so với .47" và ".54 so với .34" → ba mẫu (Úc, Canada, Hà Lan), .52–.63 so với .41–.47 (Lee, Ashton & de Vries 2005, tự mở). Cặp .34→.54 về quấy rối tình dục có trong toàn văn Ashton & Lee 2007 (tr. 13): giữ, ghi rõ là Ashton & Lee dẫn lại, số của Lee, Gizzarone & Ashton 2003 chưa mở được.
- n30: "dễ nhận loại khác khi làm lại bài test, dù điểm liên tục chênh rất ít" → "Với MBTI, người có điểm gần điểm trung tính dễ nhận loại khác khi làm lại (Howes & Carskadon 1979, theo Pittenger 1993)"; nguồn chỉ nói MBTI và không báo mức chênh điểm.
- n31: còn "tận tâm thấp không có nghĩa lười", "hướng ngoại thấp không kém giao tiếp" (hồ sơ ghi da-bo nhưng trang còn) → "mô tả thống kê, chưa phải đánh giá về con người"; giữ phần có nguồn (Barrick & Mount 1991).
- n34: chip Vững chắc → Khá vững, căn cứ Fleeson & Gallagher 2009 (tổng hợp 15 nghiên cứu lấy mẫu trải nghiệm, r .42–.56) cộng McCrae & Costa 1989; thêm câu có số, ví dụ ghi "giả định".
- n39: "không dùng cho quyết định quan trọng như tuyển dụng" → "cần thận trọng khi dùng"; "dịch ngược" → "dịch xuôi và dịch ngược hay dịch kép"; căn cứ ITC 2017 (toàn văn) và Laajaj 2019.
- n41: "Không chiều nào tốt hay xấu tuyệt đối" → "Big Five mô tả mức độ, không chấm điểm tốt hay xấu; tác dụng của hướng ngoại phụ thuộc hoàn cảnh"; tận tâm dự báo dương ở mọi nhóm nghề nên câu cũ trái nguồn.
- n46, n47, n48 (giải thích quiz): "tính cách thực hầu như không đổi" → "điểm liên tục chênh rất ít"; "bằng chứng mạnh cho tính phổ quát" → "các tác giả cho rằng dữ liệu rất ủng hộ", kèm lưu ý Laajaj; "nguyên tắc không chiều nào tốt tuyệt đối" → "giá trị dự báo phụ thuộc hoàn cảnh".

tinh-cach-thay-doi
- n20: khung Vững chắc "ổn định thứ hạng tăng theo tuổi, đạt đỉnh khoảng .74 ở tuổi 50–70" → "tăng từ thơ ấu đến đầu tuổi trưởng thành rồi đi ngang"; .74 ghi là ước tính của Roberts & DelVecchio 2000; thêm Bleidorn 2022 (tóm tắt: ít bằng chứng tăng sau 25 tuổi) ở thân bài, khung và nguồn. Giữ Vững chắc cho hướng chung (hai tổng hợp cùng chiều).
- n38 (quiz): đáp án "thời gian dài cho thêm cơ hội thay đổi tích lũy" với nhiễu "đo sai khi để lâu" → câu hỏi "khoảng đo liên quan thế nào đến hệ số", đáp án "càng dài càng thấp"; Roberts & DelVecchio 2000 (tr. 6) nêu cả sai số đo tích lũy lẫn thay đổi thật, nên phương án nhiễu cũ cũng đúng một phần.
- n40 (quiz): "là phổ quát" → "xuất hiện ở nhiều nền văn hóa" (khớp hồ sơ, n18, n32).

mbti
- n25: khung Đang tranh cãi (doanh nghiệp, tuyển dụng) → Khá vững "độ tin cậy chấp nhận được chưa đủ để dùng MBTI trong doanh nghiệp và tuyển dụng". Capraro 2002 chỉ đo độ tin cậy, không bênh vực việc dùng; không có bằng chứng chất lượng cao mâu thuẫn nhau.
- n28: "gần như mọi sinh viên đánh giá bản mô tả đúng: chỉ một đánh giá dưới 4 về độ chính xác của bài test" → "39 sinh viên, trung bình 10,2 trong 13 câu đúng; thang 0–5, 5 người chấm bản mô tả dưới 4, 1 người chấm bài kiểm tra dưới 4" (Forer 1949, tự mở): câu cũ gán điểm của bài kiểm tra cho bản mô tả.

## Ba câu big-five kiểm từ đầu

- n3 (định nghĩa tính cách): dung, nguồn OpenStax Psychology 2e mục 11.1 (đọc 10/11/2026).
- n34: sai về nhãn, đã sửa (xem trên). OpenStax 11.7 chỉ nói mỗi người có điểm liên tục trên năm chiều, không nói giới hạn diễn giải.
- n39: sai về mức độ, đã sửa (xem trên).

## Ghi chú lượt 2 ở câu dung

- big-five n40: dung; Pittenger 1993 mở được toàn văn (tr. 7: 50% xếp lại ở ít nhất một thang), không cần đổi sang Pittenger 2005.
- n7, n8: đọc toàn văn Allport & Odbert 1936: 17.953 từ (tr. 29) và 4.504 từ, 25% (tr. 31).
- n29: thêm Haslam, Holland & Kuppens 2012 (tổng quan định lượng 177 nghiên cứu taxometric); đạt thước đo Vững chắc; cũng thêm vào khung Bác bỏ của mbti n22.

## Nhãn đã chốt

- big-five: n20 Khá vững (dung), n21 Khá vững (dung), n26 Đang tranh cãi (dung; nguồn đã mở chủ yếu từ phía HEXACO), n29 Vững chắc (dung, thêm tổng hợp), n31 Khá vững (chip chỉ đỡ phần hệ số nhỏ đến vừa), n34 Khá vững (hạ từ Vững chắc).
- tinh-cach-thay-doi: n20 Vững chắc (hướng chung), n21 Khá vững (thêm Bleidorn 2022), n22 và n26 Đang tranh cãi, n25 và n29 Khá vững.
- mbti: n22 Bác bỏ (dung, thêm Haslam), n23, n24, n31, n32, n33 Khá vững (dung), n25 Khá vững (hạ từ Đang tranh cãi).

## Chỗ còn chưa chắc

- Tìm "chưa thấy nghiên cứu người Việt" (big-five n35, tinh-cach-thay-doi n30, mbti n34): OpenAlex bị giới hạn tốc độ (429), review chỉ tìm thêm ở Europe PMC; giữ mốc 11/2026 và `het_han`.
- Chỉ đọc tóm tắt: Fleeson & Gallagher 2009, Haslam 2012, Bleidorn 2013 và 2022, Roberts 2006 và 2008 và 2017, McCrae & Costa 1997, Tupes & Christal 1992, Laajaj 2019, Bühler 2023, Quynh & Church 2023. Boyle 1995 (mbti n27) chưa mở lại.
- Chưa mở được bài phản biện của phe Big Five (n26); Lee, Gizzarone & Ashton 2003 chưa mở.
- mbti là bài mở rộng: review thấy 2 câu sai ngoài mẫu lượt 2 (n25, n28). Hai câu đã sửa chưa qua lượt 2; nên cho lượt 2 kiểm lại n22, n25, n28 sau sửa.
- Câu hỏi quiz và khung đã đổi chữ nhưng chưa build, chưa chạy `npm test`.

## Cần người giao xem (ngoài phạm vi lô)

- Thẻ ngộ nhận `mbti` trong `src/data/ngo-nhan.yml` vẫn nói Big Five "có bằng chứng dự báo tốt hơn" và `nguon` chỉ có Pittenger; trang mbti nay nói chưa có so sánh trực tiếp.
- Hồ sơ cả ba bài còn thiếu `nguoi.luot_2` và `nguoi.kiem_mau` ở lần kiểm định cuối.
- Mục Nguồn viết tay của big-five còn Costa & McCrae 1992, John & Srivastava 1999, McCrae & Costa 1999 mà trang không còn dẫn.

## Nguồn mới chưa có trong `src/data/nguon.yml`

Đã ghi vào mục `nguon` của hồ sơ và vào mục Nguồn của trang:
- Fleeson & Gallagher (2009), J Pers Soc Psychol 97(6), 1097–1114, doi 10.1037/a0016786
- Haslam, Holland & Kuppens (2012), Psychol Med 42(5), 903–920, doi 10.1017/S0033291711001966
- International Test Commission (2017), ITC Guidelines for Translating and Adapting Tests (ấn bản 2), Int J Test 18(2), 101–134, doi 10.1080/15305058.2017.1398166
- Lee, Ashton & de Vries (2005), Hum Perform 18(2), 179–197, doi 10.1207/s15327043hup1802_4
- Bleidorn, Schwaba, Zheng, Hopwood, Sosa, Roberts & Briley (2022), Psychol Bull 148(7–8), 588–619, doi 10.1037/bul0000365
- OpenStax Psychology 2e, mục 11.1 (chỉ ở hồ sơ, trang không dẫn): openstax.org/books/psychology-2e/pages/11-1-what-is-personality

Các nguồn cũ của lô (Allport 1936, Tupes 1992, Goldberg 1990, McCrae 1989 và 1997, Barrick 1991, Ashton 2007, Pittenger 1993 và 2005, Laajaj 2019, Bühler 2023, Quynh 2023, Roberts 2000 và 2006 và 2008 và 2017, Bleidorn 2013, NRC 1991, Capraro 2002, Forer 1949, Boyle 1995, 16Personalities) lượt 1 đã báo; kiểm tra chéo `nguon.yml` chưa làm vì không sửa tệp đó.

## Tệp đã chạm

- `src/content/docs/kham-pha/tinh-cach/big-five.md`, `tinh-cach-thay-doi.md`, `mbti.md`
- `kiem-dinh/kham-pha/tinh-cach/big-five.yml`, `tinh-cach-thay-doi.yml`, `mbti.yml`
- `plans/lam-lai/bao-cao/d5-l3/review-2.md`
