# D6-L1 phần 2/2, review: Hạnh phúc

Nhánh `moi/d6-l1`, ngày 10/11/2026, Claude Sonnet 5.5 (agent review). Ba trang `kham-pha/hanh-phuc/`. Không build, không commit. Không động vào bốn bài `cang-thang-giac-ngu/*`.

## Số liệu review

Review xét mọi câu `ve-site`, mọi câu lượt 2 khác `dung`, mọi câu lượt 1 đã sửa hay làm mềm, mọi câu `nhan`; ghi `review: dung|sai` kèm "Review (Claude Sonnet 5.5, 10/11/2026)" ở `ghi_chu`.

| Trang | review dung | review sai | Ghi chú |
|---|---|---|---|
| do-hanh-phuc | 55 | 3 | n38, n79 (nhãn), n40 (thời tiết) |
| tien-va-hanh-phuc | 42 | 2 | n49 (ví dụ logarit), n61 (link Hỗ trợ) |
| dong-chay-flow | 59 | 13 | n19, n28, n38, n51, n52, n71, n72, n74, n75, n76, n77, n78, n85 |

Mọi nhận định không `da-bo` và không `ve-site` có `nguon`; mọi `nguon` có trong danh sách nguồn của hồ sơ; câu `thoi-su` có `het_han` (2028-11-01) và `nguon`; `kiem_lai_truoc` 2028-05 của hai bài mở rộng không muộn hơn `het_han` nên không đổi. `nguoi.review` điền ở lần kiểm định cuối. `node tools/khoa.mjs xuat` đọc được cả ba trang; các kiểm thử `chuyen`, `doi`, `du-lieu`, `khoa`, `thanh-phan` đạt (49/49).

## Câu sai đã sửa (chữ cũ → chữ mới)

**do-hanh-phuc**
- n38, n79 (nhãn): khung "Đang tranh cãi: diễn giải các con số như thế nào" → "Khá vững: điểm hạnh phúc đọc được, nhưng cần diễn giải thận trọng". Lý do: bằng chứng ở hai điểm (hai chiều tách biệt, văn hóa điều chỉnh) cùng chiều, mỗi điểm chỉ một hai nghiên cứu, không đạt "bằng chứng chất lượng cao mâu thuẫn" của mục 4. Đổi cả hộp tóm tắt (tự dựng từ khung) và câu hỏi cuối bài ("vẫn được gắn nhãn đang tranh cãi" → "chỉ được gắn nhãn khá vững, chưa phải vững chắc").
- n40 (lượt 2 `qua-manh`, đúng): "tâm trạng lúc trả lời ảnh hưởng, như do thời tiết (Schwarz & Clore 1983)" → nêu cả hai: nghiên cứu cũ thấy ảnh hưởng, nhưng mẫu đại diện hơn 1 triệu người Mỹ không thấy thời tiết ảnh hưởng đáng tin cậy đến hài lòng cuộc sống (Lucas & Lawless 2013, JPSP 104(5), 872–884; đọc tóm tắt qua Europe PMC, Crossref khớp). Sửa cả gạch đầu dòng Lý thuyết 3 ("có thể ảnh hưởng … dù …"), thêm nguồn `lucas2013` vào hồ sơ và mục Nguồn.

**tien-va-hanh-phuc**
- n49: "cả ba nghiên cứu … tăng từ 20.000 lên 60.000 USD có tác động tương đương tăng từ 60.000 lên 180.000 USD" → "… ít nhất ở một dải. Nếu đúng dạng logarit, … (cùng gấp ba lần)" (Kahneman & Deaton thấy cảm xúc chững ở khoảng 75.000 USD).
- n61: câu hồ sơ nói có link tới Hỗ trợ nhưng trang chỉ có chữ "xem trang Hỗ trợ" → thêm `[Hỗ trợ](/psyche/ho-tro/)`.
- Ngoài hồ sơ: id giữ lại của tiêu đề Áp dụng 2 thiếu "dang" (chip "Đang tranh cãi" vào id cũ): `…-hieu-qua-nhat-tranh-cai` → `…-hieu-qua-nhat-dang-tranh-cai`, đã đối chiếu id trong bản build cũ (`.cache/site-cu`). Các id giữ lại khác (dong-chay-flow: mục LeFevre, Áp dụng 2, 3, 4) khớp bản build cũ; kiểm toàn bộ tiêu đề cả ba trang: chỉ thiếu id của H1 (tiêu đề trang, bình thường).

**dong-chay-flow**
- n19 (hình `flow-channel`): "Flow chỉ xuất hiện khi cả hai đều cao và cân bằng." → "Theo mô hình kênh flow, flow được dự đoán khi cả hai đều cao và cân bằng."; chú thích "Dòng chảy chỉ xuất hiện …" → "Theo mô hình, dòng chảy được dự đoán khi cả hai đều cao và cân bằng; bằng chứng cho điều này chưa thống nhất." `doi_chu` ghi; `flow-channel` thêm vào `HINH_DA_SUA` (`tests/chuyen.test.mjs`, kèm chú thích).
- n38 (lượt 2 `qua-manh`, đúng): tiêu đề khung Khá vững "flow xuất hiện khi thử thách và kỹ năng đều cao và cân bằng" → "cân bằng thử thách–kỹ năng liên hệ vừa phải với flow, nhưng không đủ để flow xuất hiện" (hộp tóm tắt đổi theo). Nhãn Khá vững giữ.
- n74: "flow đòi hỏi thử thách cao, ngang ngửa với kỹ năng" → thêm "theo mô hình kênh flow" (hồ sơ đã ghi "theo mô hình", trang thì chưa).
- n75, n76 (lượt 2 `qua-manh`, đúng): "chúng tôi chưa tìm thấy nghiên cứu nào xét giới hạn của việc ở trong flow liên tục hay flow trong các hoạt động có hại" → nêu hai nghiên cứu có thật: Burleigh và cộng sự 2025 (565 người chơi game nhập vai, Addict Behav Rep 21, 100606) và Kruger và cộng sự 2022 (110 người chơi máy đánh bạc, "dark flow", J Gambl Stud 38, 185–203), "tính đến 11/2026 chúng tôi mới thấy ít nghiên cứu như vậy"; bỏ phần "flow liên tục" (không nguồn). Thêm hai nguồn và một mục lần tìm; `het_han` 2028-11-01 giữ.
- n51 (lượt 2 `khong-chac`): "Nakamura và Csikszentmihalyi (2002) mô tả … siêu kỹ năng" → "Theo Baumann (2012), Nakamura và Csikszentmihalyi (2002) mô tả …" (không mở được bài 2002; nguồn bậc 2 kể lại), ở cả mục Lý thuyết và Ngộ nhận.
- n52, n77 (lượt 2 `qua-manh`, đúng): "chưa có cách đo thỏa đáng, hiếm được kiểm tra (Baumann, 2012)" nói như hiện tại → "Cũng theo Baumann (2012), khi ấy … Từ đó đã có phân tích tổng hợp 24 nghiên cứu về Big Five và flow (tận tâm r = 0,33; Buseyne 2026)".
- n78 (lượt 2 `qua-manh`, đúng): giải thích câu hỏi 1 "Bạn có thể thích nằm dài lướt điện thoại mà không hề ở trong flow." → "… mà theo mô hình không phải flow, vì thiếu thử thách và phản hồi rõ ràng; đây là suy luận từ mô hình, không phải kết quả đo."
- n85 (lượt 2 `qua-manh`, đúng): giải thích câu hỏi 5 "thư giãn … KHÔNG bị ảnh hưởng bởi flow" → "thư giãn … (cùng với động lực) KHÔNG chịu ảnh hưởng của flow mạnh hơn bối cảnh làm việc hay giải trí" (khớp tóm tắt bài 1989).
- n28: "Csikszentmihalyi và LeFevre gọi là 'nghịch lý của công việc' (tên gọi theo cách kể lại)" → "mà ở đây chúng tôi gọi là … (cụm này không lấy từ tóm tắt của bài; chúng tôi chưa mở toàn văn)"; tóm tắt bài chỉ nói "more motivated in leisure than in work".
- n72: mục Việt Nam "(flow nhiều ở công sở nhưng động lực cao ở lúc rảnh)" → "(đa số trải nghiệm flow được báo cáo khi làm việc, nhưng động lực cao hơn lúc rảnh)".
- n71: bỏ câu không nguồn "khái niệm mất tự ý thức ra đời trong bối cảnh văn hóa cá nhân chủ nghĩa, nơi 'cái tôi cần được im lặng' …", giữ phần suy đoán về sắc thái khác ở văn hóa Việt Nam.
- n59: loại `loi-khuyen` không có nguồn → gắn Swann 2018 (mục tiêu rõ, phản hồi rõ).

## Mục Nguồn của dong-chay-flow (việc 6)

- Csikszentmihalyi (1990): đúng "New York: Harper & Row"; kiểm qua OpenLibrary, ISBN 0060162538 (Flow, Harper & Row, New York, 1990, 303 tr.); đã thêm link OpenLibrary, ghi sách chưa mở được toàn văn.
- Baumann (2012): "chap. 9" đúng; Crossref (DOI 10.1007/978-1-4614-2359-1_9): Advances in Flow Research, Springer New York, tr. 165–186; đã thêm số trang và DOI, giữ link bản tác giả.
- Thêm Burleigh 2025 và Kruger 2022 (Crossref khớp).

## Nhãn đã chốt

- do-hanh-phuc: Khá vững (đo được, độ tin cậy tốt: giữ, hợp mục 4: có hai tổng hợp nhưng chủ yếu tự báo cáo, ổn định theo thời gian ít được kiểm ở bản dịch); khung diễn giải điểm: **đổi Đang tranh cãi → Khá vững** (xem trên); ba nhãn Áp dụng (Khá vững) giữ, nhãn ở phần liên hệ đã có bằng chứng, cách làm cụ thể trang đã ghi là gợi ý chưa kiểm tra.
- tien-va-hanh-phuc: Đang tranh cãi (tổng thể), Khá vững (hai thứ khác nhau), Đang tranh cãi (75.000 USD) và ba nhãn Áp dụng (Đang tranh cãi): giữ, hợp mục 4 (K&D 2010 với Killingsworth 2021 mâu thuẫn, hòa giải 2023 bị bình luận 2024, chưa có tổng hợp hay tái lập đăng ký trước).
- dong-chay-flow: Khá vững (9 đặc điểm), Khá vững (cân bằng thử thách–kỹ năng, đổi tiêu đề), Đang tranh cãi (phổ quát văn hóa: ba phân tích tổng hợp khác chiều), Khá vững (thành tích, tương quan); Áp dụng 1 Khá vững (nhãn ở liên hệ mục tiêu rõ–flow, trang nói phần lớn là tương quan), Áp dụng 2, 3, 4 Đang tranh cãi. Giữ.

## Chỗ còn chưa chắc

- Nhiều câu vẫn dựa vào chỉ tóm tắt: Sandvik 1993, Lucas 1996, Schimmack 2008, Suh 1998, Schneider & Schimmack 2009, Milo 2025, Easterlin 2010, Lucas & Lawless 2013, Csikszentmihalyi 1977 và 1989, Jackson & Marsh 1996, Fong 2015, Harris 2021, Xie, Sweeny, Buseyne, Nguyen 2026, Burleigh 2025, Kruger 2022; Rohrer & Wenz và Arslan 2024 đã đọc lại toàn văn ở PMC (nhận xét "giả định nhân quả" có ở cả hai bình luận, "ngưỡng không ước lượng từ dữ liệu Killingsworth" chỉ ở Arslan; câu trang gộp hai ý, chấp nhận). Không tải toàn văn Internet Archive (không biết tệp zip chứa từng bài); các sửa dựa vào tóm tắt Europe PMC, Crossref, OpenLibrary.
- Cụm "nghịch lý của công việc" chưa kiểm được ở toàn văn Csikszentmihalyi & LeFevre 1989: trang nay ghi là cách gọi của site.
- Sách Csikszentmihalyi 1990 và bài Nakamura & Csikszentmihalyi 2002 vẫn không mở được; nội dung dựa Swann 2018, Abuhamdeh 2020, Baumann 2012 kể lại.
- Các câu `thoi-su` (Việt Nam, "chưa ngã ngũ", experience-sampling châu Á, tắt thông báo, flow ở hoạt động có hại) là lần tìm Europe PMC chưa hệ thống, đã ghi trong hồ sơ; `het_han` 2028-11-01.
- Việc đổi nhãn khung "diễn giải" sang Khá vững là phán đoán của review; chủ repo có thể xem lại. Đổi ngược lại thì phải đổi cả khung, hộp tóm tắt và câu hỏi 5.
- Link `/psyche/ho-tro/` của tien-va-hanh-phuc: `ho-tro/index` có trong `trang.yml` và `src/content/docs/ho-tro/index.md`, nhưng trang cần lên (khóa) trước khi khóa trang này để link không thành "sắp có".
- `src/data/nguon.yml` vẫn chưa có bản ghi cho các nguồn mới (đã nêu ở báo cáo lượt 1), nay thêm: Lucas & Lawless 2013, Burleigh 2025, Kruger 2022.
