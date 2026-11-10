# Review D5-L3 (1): Chú ý và tri giác

Ngày 10/11/2026. Claude Sonnet 5.5 (agent review). Phạm vi: `kham-pha/chu-y-tri-giac/ao-giac-thi-giac`, `nghe-chon-loc`, `nhin-ma-khong-thay` (tầng `loi`), `da-nhiem-so` (tầng `mo-rong`). Không build, không commit, không động vào ba bài `tinh-cach`. Mọi chữ trong ghi chú hồ sơ là "Review (Claude Sonnet 5.5, 10/11/2026): dung|sai. …"; `nguoi.review` đã ghi ở lần kiểm định cuối; `ma_bam` còn `null` (khóa sẽ ghi).

## Kết quả

| Trang | Đã review | dung | sai (đã sửa) |
|---|---|---|---|
| ao-giac-thi-giac | 49 (mọi câu) | 36 | 13: n1, n17, n20, n21, n22, n23, n34, n39, n40, n41, n44, n45, n49 |
| nghe-chon-loc | 45 | 33 | 12: n4, n14, n35, n42, n50, n52, n55, n56, n58, n61, n63, n66 |
| nhin-ma-khong-thay | 35 | 32 | 3: n31, n42, n46 |
| da-nhiem-so | 50 | 36 | 14: n2, n9, n22, n26, n27, n28, n34, n35, n36, n37, n39, n41, n47, n52 |

Câu `ve-site` (6 câu): 5 dung; 1 sai (ao-giac n39: công cụ "Ảo giác thị giác" chưa dựng nhưng trang nói như đã có). Hai câu `ket_qua` rỗng của nghe-chon-loc (n41, n47; Deutsch và Deutsch 1963) và ba câu rỗng của da-nhiem-so (n35, n36, n37) đã kiểm từ đầu, ghi `ket_qua`, `nguon`, `trich`.

Nguồn mới mở ở review (toàn văn): Amir & Firestone 2026 (bản chấp nhận đăng, OSF); Cherry 1953, Moray 1959 (kể cả ảnh Bảng III, IV), Treisman 1960, Wood & Cowan 1995, Deutsch & Deutsch 1963 (Internet Archive, bộ `wikipedia-scholarly-sources-corpus`); Röer & Cowan 2021 (PMC8908911); Strayer 2006; Simon 1971 (gwern.net); Simons & Chabris 1999, 2011; Parry & le Roux 2021; Sanbonmatsu 2013; Wiradhany & Nieuwenstein 2017. Chỉ tóm tắt: Ophir 2009, Uncapher & Wagner 2018, Ward 2017, Hartanto 2024 (qua trang JCU/APA Open), Böttger 2023, Fitz 2019 (qua Duke Scholars), Bronkhorst 2015, Snowden & Gray 2025, Horrey & Wickens 2006. OpenAlex hết hạn mức trong ngày; dùng Europe PMC và Crossref.

## Mọi câu sai, chữ cũ thành chữ mới

**ao-giac-thi-giac**
- n1 (mô tả): "phát hiện rằng người phương Tây dễ bị ảo giác Müller-Lyer hơn…" thành "nghiên cứu kinh điển cho rằng… một kết luận nay đang bị phản biện".
- n17: "thứ mà sách giáo khoa… hóa ra mang đậm dấu ấn của môi trường sống" thành đoạn nêu Amir & Firestone (Psychol Rev 133(5), 2026): bằng chứng khác biệt văn hóa không nhất quán (Rivers 1905 thấy người Urali, Sholaga bị mạnh hơn người Anh; dữ liệu Segall tự mâu thuẫn; loại dữ liệu có nhóm quá nửa); giả thuyết "thế giới thợ mộc" gần như chắc chắn sai. Cũng sửa câu dẫn ("không phải ai cũng bị lừa như nhau" thành "kết quả được báo cáo ban đầu") và nhãn đầu danh sách kết quả.
- n20: nhãn Vững chắc "các ảo giác hình học tồn tại và đo được" thành "ảo giác Müller-Lyer…", cơ sở Bruno & Franz 2009 (tổng quan định lượng 18 nghiên cứu) và Amir & Firestone; bỏ viện dẫn so sánh văn hóa.
- n21: nhãn Khá vững "khác nhau rõ rệt giữa các nền văn hóa" thành Đang tranh cãi "có khác nhau theo nền văn hóa hay không, và vì sao".
- n22: "khác biệt lớn và có hệ thống" thành "báo cáo khác biệt lớn giữa 15 xã hội". n23: thêm "các nghiên cứu cùng thời cho kết quả trái chiều", dẫn Amir & Firestone làm chính, van der Kamp chỉ "xem thêm".
- n34: "đo… trong phòng thí nghiệm" thành "…hình vẽ đơn giản, không phải cảnh đời thường" (Segall đo ở hiện trường).
- n39 (ve-site): công cụ Ảo giác thị giác nói như đã có thành "khi công cụ… lên site" (link sắp có); quiz 5 thành tình huống giả định.
- n40: "…ngay cả khi ta đã biết sự thật" thành "thường ngay cả…".
- n41: ngộ nhận "ai cũng bị như nhau" giữ Đã bị bác bỏ nhưng căn cứ đổi sang khác biệt giữa người với người (người cao tuổi 8,20% so với 4,33%, Chen 2025; trẻ em theo tuổi, Lin 2023), không dựa khác biệt văn hóa.
- n44, n45 (quiz 2, 3): "phát hiện" thành "báo cáo"; "học được cách diễn giải 2D thành góc 3D" thành "thói quen thị giác thích nghi với góc vuông"; giải thích nêu phản biện.
- n49: mục Nguồn thêm Amir & Firestone, Bruno & Franz, Chen, Lin.

**nghe-chon-loc**
- n4, n35, n50, n58, n61: "chỉ khoảng một phần ba… trong điều kiện lab nghiêm ngặt" thành dải "một phần ba đến một nửa": Moray 33%, Wood & Cowan 34,6% (9/26), Röer & Cowan 29%, Conway 43%, Naveh-Benjamin 48–58% (theo Röer & Cowan, toàn văn). Nhãn Khá vững giữ.
- n14: "phát ngược: phần lớn người nghe không nhận ra" thành "chỉ một vài người nhận ra có điều gì lạ; những người khác tưởng là tiếng nói bình thường" (Cherry, toàn văn).
- n42: Lavie "còn được bàn cãi" (không nguồn) thành có Snowden & Gray 2025 (không tái lập tải tri giác).
- n52: chip Khá vững ở Áp dụng 3 không có cơ sở (nhận định `phat-hien`): đổi thành `nhan` có co_so Wood & Cowan, Röer & Cowan; thêm Röer & Cowan vào câu.
- n55, n56: thời sự thêm "Tính đến 11/2026" ở chính câu.
- n63: "giáng một đòn mạnh vào… Broadbent" thành "thách thức…". n66: Nguồn thêm Bronkhorst 2015, Snowden & Gray 2025. Tự thêm câu Bronkhorst vào Áp dụng 1.

**nhin-ma-khong-thay**
- n31: "con khỉ đột bị xử lý ở mức sơ sài" thành "có thể chỉ được xử lý ở mức sơ sài" (Nobre 2020: kích thích không chú ý vẫn có thể xử lý ngầm).
- n42: "Chưa có bằng chứng nào cho thấy một nền văn hóa nào miễn nhiễm…" thành "Tính đến 11/2026, chúng tôi chưa tìm thấy bằng chứng…".
- n46: câu hỏi quiz 1 còn "9 giây" (chỉ đúng với video bổ sung) thành "nhiều giây".

**da-nhiem-so**
- n2: "đa nhiệm thực chất là chuyển đổi" thành "thường thực chất là". n9: "Nguyên nhân: họ dễ bị nhiễu" thành "Cụ thể, họ dễ bị nhiễu". n47: quiz 1 thêm "nhiều khả năng".
- n22: Khá vững giữ, thêm số của Parry & le Roux (khoảng 0,14 chung, 0,09 ở bài kiểm tra hiệu suất, Fisher z).
- n26, n28: "khả năng lớn nhất là vòng xoáy hai chiều", "giả thuyết hợp lý nhất" thành "cũng có thể cả hai chiều cùng đúng, chưa có bằng chứng quyết định"; bỏ ví dụ "đi bộ" không nguồn.
- n27 (lượt 2 quá mạnh): khung Đã bị bác bỏ "đa nhiệm giúp giỏi đa nhiệm, và não làm được hai việc khó cùng lúc" thành Khá vững "đa nhiệm truyền thông nhiều không đi kèm khả năng đa nhiệm hay kiểm soát nhận thức tốt hơn".
- n34: Đang tranh cãi giữ; thêm Böttger 2023 (22 nghiên cứu, thấy tác động tiêu cực chung) trái chiều với Hartanto 2024.
- n35, n36 (lượt 2 quá mạnh): bỏ chip Khá vững ở lời khuyên gom thông báo; bỏ "mỗi thông báo là một lần chuyển đổi bắt buộc", "bạn không bỏ lỡ gì cả", "tắt thông báo của mọi ứng dụng"; nêu Stothart 2015 và Fitz 2019 (237 người: gom ba đợt tốt hơn; không thông báo thì lo âu và sợ bỏ lỡ), "bằng chứng từ ít nghiên cứu".
- n37 (lượt 2 quá mạnh): bỏ chip Khá vững; tiêu đề thành "Thử quan sát mức đa nhiệm của chính mình" (giữ id cũ), nêu chưa có nghiên cứu về hiệu quả ghi chép.
- n39: cau của hồ sơ lệch trang, chỉnh cho khớp. n41: "Các con số… từ sinh viên Mỹ và châu Âu" thành "Mỹ, Canada và châu Âu; lần làm lại của Wiradhany có thêm sinh viên Indonesia" (đọc toàn văn). n52: Nguồn thêm Böttger, Fitz, Stothart. Sửa khoảng trắng cuối dòng ở một mục Ngộ nhận.

## Nhãn đã chốt

- ao-giac: Vững chắc "ảo giác Müller-Lyer tồn tại và đo được" (hạ phạm vi); Đang tranh cãi "khác biệt văn hóa" (từ Khá vững) và "vì sao ảo giác xảy ra" (giữ); Đã bị bác bỏ "ai cũng như nhau" (giữ, căn cứ mới).
- nghe-chon-loc: Khá vững (tên riêng lọt qua; một phần ba đến một nửa; khả năng kiểm soát chú ý; lời khuyên 1, 2, 3); Đang tranh cãi (khâu chặn thông tin); Đã bị bác bỏ "nhớ mọi thứ lọt vào tai" (giữ).
- nhin-ma-khong-thay: Vững chắc (căn cứ ở trang nhà đã khóa), Khá vững (khảo sát 78%; mù thay đổi ngoài đời; lái xe và điện thoại, thêm Horrey & Wickens 2006), Đã bị bác bỏ "mắt nhìn đường nên không sao" (giữ, thêm tổng hợp).
- da-nhiem-so: Vững chắc (phí chuyển đổi; làm tuần tự), Khá vững (đa nhiệm và nhận thức; đa nhiệm không đi kèm khả năng tốt hơn), Đang tranh cãi (nhân quả; điện thoại ở gần). Hết Đã bị bác bỏ.

## Chỗ còn chưa chắc

1. **Vững chắc sát ranh thước đo** (chủ repo duyệt): ao-giac n20 (Bruno & Franz chỉ về Müller-Lyer; Amir & Firestone là tổng quan lý thuyết); da-nhiem-so n21, n38 (Kiesel là tổng quan kể chuyện, Wasylyshyn bàn lão hóa).
2. **Đã bị bác bỏ** dựa ít nguồn: nghe-chon-loc n43 (Cherry, Moray, hai thí nghiệm nhỏ; mệnh đề "mọi thứ" hẹp nên giữ); nhin-ma n43 (Strayer, một mô phỏng 40 người, cộng Horrey & Wickens); ao-giac n41.
3. **Nguồn chưa mở toàn văn**: Ophir 2009, Uncapher & Wagner 2018, Ward 2017 (chỉ tóm tắt; Internet Archive không có, PNAS/PMC chặn); Hartanto 2024 chỉ qua trang tóm tắt tìm web; Treisman 1964 (BMB) không mở được, cách đặt "(1964)" theo Wood & Cowan ("attenuating-filter notion (Treisman, 1960, 1964)"); Conway 2001 và Simons & Levin 1998 không mở lại được ở review (lượt 1 đã đọc toàn văn); Naveh-Benjamin 2014 chỉ qua Röer & Cowan; Fitz 2019 chỉ qua tóm tắt Duke Scholars.
4. **Câu mới thêm ở review chưa qua lượt 2**: ao-giac n17 (viết lại), n21 (đổi nhãn); nghe-chon-loc n35, n52 (đổi loại thành nhan); da-nhiem-so n27 (nhãn mới), n36 (Stothart, Fitz). Nên chạy `node tools/khoa.mjs xuat <trang> --con-lai` cho các câu này, và chủ repo xem lại nhãn Đang tranh cãi của ao-giac n21 (Amir & Firestone mới, chưa có tái lập).
5. **Chưa dựng**: công cụ Ảo giác thị giác (`trai-nghiem/ao-giac-thi-giac`), trang `ngo-nhan/index`, `kham-pha/tu-duy/*`: link tự thành "sắp có".
6. Ảo giác Ebbinghaus, "vòng tròn Titchener" chỉ có Wikipedia cho tên gọi (n9); giữ vì câu lịch sử ít rủi ro.
7. Bốn bản kiểm định này sửa trang nên **mở khóa là không cần** (chưa khóa); khi khóa, `khoa.mjs` sẽ tính lại mã băm.

Model: Claude Sonnet 5.5. File chạm: bốn trang `.md` và bốn hồ sơ `.yml` của lô; báo cáo này.
