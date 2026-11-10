# D5-L4 review nội dung, phần Tâm lý xã hội (4 bài)

Nhánh `moi/d5-l4`, 10/11/2026, Claude Sonnet 5.5 (agent review). Bốn bài `kham-pha/tam-ly-xa-hoi/phu-hop-so-dong`, `bat-hoa-nhan-thuc`, `thuyet-phuc`, `dinh-kien` (tầng `loi`). Không build, không commit. Hồ sơ: mỗi nhận định có `review: dung` hay `sai`, chữ "Review (Claude Sonnet 5.5, 10/11/2026): …" ở cuối `ghi_chu`; `nguoi.review` ghi ở lần 1; mục `doi_chu` bổ sung cho mọi chỗ sửa trang. `node tools/khoa.mjs xuat` đọc được cả bốn bài. Số nhận định ở báo cáo lượt 1 (181) đã cũ: số đúng là 185 (46 + 44 + 43 + 52).

## Kết quả

| Trang | Nhận định | dung | sai (đã sửa) |
|---|---|---|---|
| phu-hop-so-dong | 46 | 43 | 3 |
| bat-hoa-nhan-thuc | 44 | 34 | 10 |
| thuyet-phuc | 43 | 34 | 9 |
| dinh-kien | 52 | 41 | 11 |
| Cộng | 185 | 152 | 33 |

Mọi câu `ve-site` (13), mọi câu lượt 2 khác `dung` (10 `khong-chac`), mọi câu lượt 1 đã sửa, làm mềm, bỏ, mọi nhãn (`nhan`, 21 câu) đều có review.

## Câu sai (chữ cũ → chữ mới)

phu-hop-so-dong
- n26: "(…số lỗi giảm; mẫu chỉ 14 người…)" → "số lỗi giảm còn khoảng một phần ba (mẫu chỉ 14 người, Asch nói chưa chứng minh được chênh lệch bằng thống kê)".
- n27: "hàng nghìn đánh giá… Đọc thêm vài đánh giá thấp điểm giúp bạn có góc nhìn khác" → "các đánh giá có sẵn là một dạng ý kiến của số đông… chỉ là phép loại suy, Asch không thử đánh giá trực tuyến" (bỏ lời khuyên không nguồn).
- n43 (giải thích quiz): "phát hiện thú vị: hiệu ứng Asch không phải hằng số bất biến của con người, thay đổi theo thời đại" → "mức phù hợp đo bằng bài này… trong các nghiên cứu ở Mỹ thấp dần theo thời gian; Bond và Smith không giải thích nguyên nhân".
- Kèm theo (n11): "Hơn bốn mươi năm sau" → "Khoảng bốn mươi năm sau" (1956 đến 1996).

bat-hoa-nhan-thuc
- n13: chú thích hình `festinger-diverging` "tích cực hơn hẳn nhóm 20 đô-la" → "cao hơn nhóm 20 đô-la… chênh lệch có ý nghĩa thống kê (p < 0,03 so với nhóm 20 đô-la, p < 0,02 so với đối chứng)"; thêm vào `HINH_DA_SUA` kèm chú thích.
- n15: "thái độ chỉ được đo bằng một câu hỏi trên thang 11 điểm" → "chênh lệch có ý nghĩa thống kê chỉ thấy ở một trong bốn câu hỏi phỏng vấn (độ thú vị); câu hỏi mong muốn tham gia lại cùng chiều nhưng chưa đạt ý nghĩa" (F&C 1959: p = .08 và .15).
- n17: bỏ vế "chưa có phân tích tổng hợp chung cho các mô hình" (khẳng định về điều không tồn tại, chỉ dựa một lần tìm Crossref); nhãn Khá vững giữ.
- n26, n27, n28 (Áp dụng): lời khuyên "dừng lại tự hỏi…", "cho họ lối thoát giữ thể diện", "nhận ra cơ chế giúp phân biệt lý do thật" → mô tả theo lý thuyết (OpenStax 12.3), ghi rõ suy luận, bỏ lời khuyên; n28 `da-bo`.
- n32: bỏ câu "nếu văn hóa coi trọng giữ thể diện, lối thoát 3 và 4 dễ được chọn hơn" (suy đoán không nguồn).
- n33: "nhóm 20 đô-la không đổi thái độ" → "không khác nhóm đối chứng về mặt thống kê" (F&C: "slightly and not significantly higher").
- n34: "Nhiều nghiên cứu cho thấy thái độ dịch… nên ta không khách quan" → kết quả tái lập 2024, theo lý thuyết bất hòa là dấu hiệu, tự tri giác giải thích khác nên còn tranh cãi.
- n35: chip `:nhan[bac-bo]` của ngộ nhận "luôn khách quan" bỏ (không đạt thước đo, mâu thuẫn với n23); n35 `da-bo`.
- Kèm theo: "Vaidis và cộng sự (2024). When replication fails… 7(3)" → "Sleegers, Van Leeuwen, Ross, DeMarree, van Beest, và cộng sự (2024)… 7(4)" (sai tác giả đầu và số tập, kiểm Crossref).

thuyet-phuc
- n1: description "ELM… cho thấy quảng cáo tác động lên ta qua hai đường" → "…mô tả hai đường mà quảng cáo có thể tác động lên ta".
- n6: "Hệ quả quan trọng nhất: thái độ qua đường trung tâm bền hơn…" → "Theo ELM, …" (giả thuyết, không phải điều đã chứng minh).
- n7: hình `elm-routes` "Thái độ bền vững / mong manh, dễ đổi" → "tương đối bền, khó bị lung lay hơn / tương đối mong manh, dễ đổi hơn" (Petty & Cacioppo 1986, Hình 1: "relatively"); thêm `elm-routes` vào `HINH_DA_SUA`.
- n11, n38: "uy tín nguồn tin quyết định thái độ / chất lượng lập luận quyết định" → "chủ yếu chịu ảnh hưởng của…" ("influenced primarily by"; lập luận "không tạo khác biệt có ý nghĩa thống kê").
- n16, n17, n29: thiếu giới hạn trên trang → thêm "bài không kiểm định riêng so sánh này" và "(Gợi ý này suy ra từ ELM, chưa được kiểm trực tiếp)" ở Áp dụng 3 và 4.
- n23: khung Đang tranh cãi không nói điều gì mâu thuẫn → thêm mô hình đơn đường (Kruglanski và Thompson, 1999) và dòng Nguồn.
- Kèm theo (n13): "làm thái độ tốt lên rõ rệt" → "…có ý nghĩa thống kê".

dinh-kien
- n6, n41 (thang 5 mức Allport, `khong-chac`): tìm được nguồn bậc 2 mở được, tổng quan hệ thống Windisch và cộng sự (2022, Campbell Syst Rev 18(2): e1243, PMC9133687) mô tả đủ năm mức và "antilocution… only the starting point". Giữ thang với chữ "theo cách tóm tắt thường gặp"; bỏ hai vế chỉ có ở ghi chú giảng bậc 3: "lời lẽ miệt thị, đùa cợt… thường được xem là vô hại" và "nói xấu tự nó có thể không gây hại nhưng tạo đất" → "nói xấu là điểm khởi đầu, bạo lực nặng hơn dựa trên hành vi ở mức thấp hơn". Mục Nguồn gộp hai dòng Allport làm một.
- n7: "Allport… nhưng chỉ khi hội đủ bốn điều kiện" → "khi hội đủ bốn điều kiện… phân tích của chính họ lại thấy các điều kiện này không bắt buộc".
- n9: "không phải do thiên lệch chọn mẫu hay xuất bản" → "dường như không do" (nguồn: "appears not to result from").
- n12, n13, n14, n35 (Paluck 2019): "27 thí nghiệm ngẫu nhiên" → "27 thí nghiệm ngẫu nhiên có đo kết quả sau một thời gian"; "chưa có thí nghiệm nào thao túng bốn điều kiện" giới hạn trong 27 thí nghiệm ấy; "khoảng trống ở định kiến của người trưởng thành" → "ở định kiến chủng tộc, sắc tộc của người trưởng thành".
- n20: "hiệu ứng nhỏ nhân với hàng triệu quyết định… IAT vẫn hữu ích để thăm dò liên tưởng tự động" → "hiệu ứng nhỏ vẫn gây hậu quả xã hội khi ảnh hưởng nhiều người cùng lúc hay lặp lại với một người; hạn chế về độ tin cậy ít gây vấn đề ở cấp hệ thống, nơi mẫu lớn" (bản thảo Greenwald, Banaji & Nosek đọc toàn văn, không có hai vế kia).
- n24: "Não ta tự động chia thế giới thành phe mình và phe họ" → "Ta có xu hướng chia người khác thành…" (Tajfel 1971 không đo "não" hay "tự động"; phần Klee/Kandinsky đúng, đã mở toàn văn).
- n49: "hiệu quả hơn nhiều so với chỉ ở gần nhau… hãy thiết kế" → "có thể hiệu quả hơn… dù các điều kiện không bắt buộc; gợi ý suy ra (chưa kiểm trực tiếp)".
- Kèm theo (n18): thêm "cho các bài về da đen–da trắng" vào r ≈ 0,236.

## Câu `khong-chac` đã giải quyết

phu-hop n2 (giữ `da-bo`; "phương án thứ hai" chỉ là danh sách tĩnh, không phải quiz), n24 (xác nhận bằng toàn văn D&G 1955: "Commonly these two types of influence are found together"), n27 (viết lại); bat-hoa n26, n27 (viết lại), n28 (bỏ), n32 (bỏ câu suy đoán); dinh-kien n6, n41 (nguồn bậc 2, xem trên), n24 (Tajfel 1971 toàn văn xác nhận). Ba câu ghi chú lượt 2 ở bat-hoa/dinh-kien cần xem: bat-hoa n22 (đã sửa `cau` thành "nhóm bài trung tính"; nội dung trang đã đúng), n20 (nội dung có trong tóm tắt Crossref của bài Sleegers và cộng sự 2024, gán cho "bài phản hồi" là đúng); dinh-kien n21, n33, n17, n29 xác nhận bằng toàn văn Nosek 2002 (bản OSF), P&T 2006, Oswald 2013, Pettigrew 1998.

## Nhãn đã chốt

- bat-hoa n17 Vững chắc → **Khá vững** (chốt): hiệu ứng nhỏ, tái lập lớn không thấy tác động của quyền chọn, mẫu nhỏ của nhiều nghiên cứu kinh điển. bat-hoa n15 Đang tranh cãi (giữ, nhưng sát ranh: tái lập 2024 có đăng ký trước thất bại ở quyền chọn, không thử tiền thưởng 1/20 đô-la; trang nói rõ), n23 Đang tranh cãi (giữ).
- thuyet-phuc n18 Vững chắc → **Khá vững** (chốt): có phân tích tổng hợp (Carpenter 2015, k = 134) nhưng chỉ phủ phần chất lượng lập luận × kiểu xử lý; n22 Khá vững (giữ, mỏng: nền là bài của chính tác giả, Chaiken 1980, và Haugtvedt & Petty 1992 đọc thêm ở review); n23 Đang tranh cãi (giữ, nay có mô hình đơn đường); n27–n30 chip Khá vững ở mục Áp dụng: giữ cho nền ELM, lời khuyên đã ghi chưa kiểm trực tiếp (sát ranh).
- dinh-kien n11 **Vững chắc giữ**, sát ranh: hai phân tích tổng hợp (P&T 2006, 713 mẫu, 38 nước; Paluck 2019, 27 thí nghiệm ngẫu nhiên) cùng chiều, không thất bại tái lập; giới hạn (yếu hơn với định kiến chủng tộc, sắc tộc, chưa có nghiên cứu người lớn) đã thêm vào khung. n13 Khá vững, n20 Đang tranh cãi, n50, n52 Khá vững (n50 mỏng), n51 Đang tranh cãi: giữ.
- phu-hop n15 Vững chắc, n17 Khá vững, n38 Đang tranh cãi: giữ (khớp trang nhà thi-nghiem/asch).
- bat-hoa n35 (ngộ nhận "luôn khách quan", chip Đã bị bác bỏ): bỏ chip.

## Chỗ còn chưa chắc

1. Chỉ đọc tóm tắt (không có toàn văn mở): Bem 1967, Greenwald và cộng sự 1998, Payne 2017, Forscher 2019, Carpenter 2015, Johnson & Eagly 1989, Simon 1995, Stanovich & West 2008, Kruglanski & Thompson 1999. Allport 1954 không mở được (khóa mượn); thang 5 mức dẫn theo Windisch 2022. Hình `festinger-diverging`, `elm-routes` đã sửa; hình khác của lô không đụng.
2. Câu Greenwald, Banaji & Nosek 2015 về "chẩn đoán cá nhân" xác nhận bằng bản thảo OSF/PsyArXiv (2014), chưa có bản đăng.
3. Mục Áp dụng của thuyet-phuc và dinh-kien mang chip nhãn dù lời khuyên chưa kiểm trực tiếp: giữ theo quy ước các trang đã khóa (nhãn chỉ nền bằng chứng), nhưng chủ repo có thể thấy chưa hợp.
4. Tìm "chưa tìm thấy nghiên cứu ở Việt Nam" (mọi bài) chỉ qua Crossref, hạn 2027-11-01.
5. `nguon.yml` chưa có bản ghi cho nguồn mới (Sleegers 2024, Kruglanski & Thompson 1999, Windisch 2022; cùng danh sách ở báo cáo lượt 1): thêm khi dọn nguồn.
6. `lan.luot_2` của bốn hồ sơ còn `null` (lượt 1 để lại; không thuộc phần review).
7. `tests/chuyen.test.mjs` (dòng `HINH_DA_SUA`) cùng được agent review cam-xuc-dong-luc sửa trong worktree: lúc kiểm, chỉ `gross-model` (của họ) chưa có trong tập; khi gộp hai nhánh chú ý dòng này.

Model: Claude Sonnet 5.5. Nguồn đã mở lại ở review: Asch 1956 và 1955, Bond & Smith 1996, Deutsch & Gerard 1955 (Internet Archive); Festinger & Carlsmith 1959 (psychclassics); Vaidis 2024 (bản HAL); OpenStax 12.3, 12.5; Petty & Cacioppo 1984, Chaiken 1980, Haugtvedt & Petty 1992 (Internet Archive); Petty, Cacioppo & Goldman 1981 và Petty, Cacioppo & Schumann 1983 (richardepetty.com, OCR); Tajfel 1971, Pettigrew 1998, Pettigrew & Tropp 2006, Greenwald 2009, Oswald 2013 (Internet Archive); Nosek 2002, Greenwald, Banaji & Nosek (OSF); Windisch 2022 (Europe PMC); tóm tắt qua OpenAlex và Crossref.
