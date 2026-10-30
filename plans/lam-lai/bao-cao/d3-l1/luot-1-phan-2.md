# D3-L1, lượt 1, phần 2/2

Model: Claude Sonnet 5.5. Nhánh `moi/d3-l1`. Các trang: `thi-nghiem/zimbardo`, `thi-nghiem/pygmalion`, `thi-nghiem/robbers-cave`, `thi-nghiem/index`. Không build, không commit; `node tools/khoa.mjs xuat` đọc được cả bốn hồ sơ. Chưa có `luot_2`, `review`, `kiem_mau` (đúng việc của lượt 1).

## Số nhận định

| Trang | Tổng | Loại | Kết quả |
|---|---|---|---|
| zimbardo | 76 | lich-su 29, phat-hien 30, so-lieu 5, nhan 4, dinh-nghia 2, loi-khuyen 4, thoi-su 1, ve-site 1 | dung 36, da-sua 29, da-lam-mem 11 |
| pygmalion | 66 | lich-su 24, phat-hien 23, so-lieu 10, dinh-nghia 3, nhan 3, loi-khuyen 2, thoi-su 1 | dung 25, da-sua 33, da-lam-mem 8 |
| robbers-cave | 66 | phat-hien 32, lich-su 13, so-lieu 7, tai-lap 4, nhan 3, dinh-nghia 2, loi-khuyen 4, thoi-su 1 | dung 23, da-sua 37, da-lam-mem 5, da-bo 1 |
| index | 17 | ve-site 13, lich-su 2, tai-lap 1, phat-hien 1 | dung 4, da-sua 7, da-lam-mem 2, chưa quyết (null) 4 |

Mỗi trang thí nghiệm có thêm bốn nhận định cho hộp hồ sơ (`h1`–`h4`, ghi câu gốc), và `doi_chu` cho hộp `::tom-tat`, hộp hồ sơ và mọi chỗ sửa. Hộp hồ sơ chỉ dùng điều đã có trong phần kể nghiên cứu của chính trang, không thêm số mới.

## Đã sửa (chỉ nêu chỗ quan trọng; chữ cũ, chữ mới, lý do nằm ở `ghi_chu` của hồ sơ)

Zimbardo
- n19 (da-sua): trang cũ nói "sách giáo khoa ghi 5, Le Texier chỉ còn 3 trường hợp". Sai: Le Texier xác nhận 5 người ra sớm; ông nói chỉ khoảng hai trong 10 tù nhân thật sự có triệu chứng suy sụp, một người (Korpi) theo hồ sơ đã tính trước việc tỏ ra suy sụp.
- n4 (da-sua): 24 người được chọn nhưng 21 người tham gia (10 tù nhân, 11 cai tù); báo cáo gốc ghi 75 người đăng ký.
- n5 (da-sua): bỏ "Jordan Hall" (không có ở báo cáo gốc hay Le Texier).
- n26 (da-sua): "Dave Eshelman" thành David Eshleman; bỏ "lấy cảm hứng từ phim ảnh" (không nguồn nào đã mở nói điều đó).
- n30 (da-sua): bỏ "màn diễn minh họa được dàn dựng"; Le Texier viết "incredibly flawed study".
- n35, n36 (da-sua): BBC Prison Study: "gặp sự kháng cự ngày càng yếu" (không "vấp phải phản kháng"); bỏ "vai trò của người lãnh đạo" khỏi kết luận 2006 (ý ấy thuộc Haslam, Reicher & Van Bavel 2019, nay thêm vào danh sách Nguồn).
- n24, n61 (da-sua): "ít nhất một phần ba cai tù hung hăng", số còn lại "cứng nhưng công bằng" hay thụ động (thay cho "trung lập, tử tế").
- n23, n12, n13...: làm mềm "cả thế giới rùng mình", "cán cân nghiêng về hoài nghi", "ngầm" (thành "hướng dẫn của người thí nghiệm"), "không thể qua hội đồng đạo đức nào".
- n57 (thoi-su): thêm mốc "Tính đến 10/2026", `het_han` 2028-10-30.

Pygmalion
- j4 (da-sua): bài kiểm tra không phải "phi ngôn ngữ"; là TOGA có phần từ vựng nói (Thorndike).
- nt2 (da-sua): Thorndike không nói "hồi quy về trung bình"; ông chỉ ra "IQ" lập luận trung bình lớp 1 chỉ 58 (một lớp 31). Thêm Snow (1995) (35% điểm ngoài khoảng chuẩn; hiệu ứng mất khi bỏ năm em) và phản biện của Jussim & Harber; thêm Snow vào Nguồn.
- b4 (da-sua): bỏ "0,41 theo ước lượng mô hình" và "đầu năm học" (không có trong bài); thay bằng 0,32 / 0,26 / −0,04 theo số tuần tiếp xúc trước. b3: "có đạt ý nghĩa thống kê hay không tùy cách kiểm" (không "có thật").
- j9 (da-sua): câu "mục duy nhất có ý nghĩa là cơ hội thành công" không có nguồn; Raudenbush tóm lại giáo viên đánh giá nhóm "nở muộn" tò mò, vui vẻ hơn.
- j2 (da-sua): bài kiểm tra làm tháng 5/1964, danh sách đưa cho giáo viên tháng 9/1964 (Thorndike); sửa "đầu năm học".
- r3–r6 (da-sua): chuột Rosenthal & Fode: "chọn đúng nhánh", không "nhanh hơn"; sinh viên đánh giá chuột "sạch, thuần, dễ chịu"; chênh lệch cầm nắm chỉ p = 0,09, không có ý nghĩa; cơ chế là giả thuyết của tác giả.
- nv2 (da-sua): khung Vững chắc dựa trên "hàng chục thí nghiệm, kể cả nhân viên" không có nguồn; viết lại theo tổng quan 345 nghiên cứu (qua Raudenbush) và Jussim & Harber (hiệu ứng "thường nhỏ").
- e3, l2, a1, a2, g1–g4 (da-sua/da-lam-mem): cơ chế "giọng ấm, chờ lâu hơn, học sinh dần trở thành", "nhân viên mới", "khen nỗ lực", "thiên vị ngoài ý thức", "hiệu ứng thật tồn tại" không có nguồn; viết mềm lại hay bỏ.
- v2 (da-sua): bỏ khẳng định về lớp chọn, trường chuyên ở Việt Nam (không nguồn); thay bằng nghiên cứu Smith và cộng sự (1998) qua Jussim & Harber: tự ứng nghiệm ở lớp xếp theo năng lực không mạnh hơn lớp hỗn hợp.
- j1: bỏ "hiệu trưởng ... ở California" (xem chỗ chưa chắc).

Robbers Cave
- s3, t2 (da-sua): hai nhóm được xếp tương đương (chiều cao, cân nặng, thể thao, độ nổi tiếng, kỹ năng trại, bơi, kinh nghiệm cắm trại), đồng xu chỉ quyết nhóm nào theo quan sát viên nào; không có IQ, không "chia ngẫu nhiên".
- s2, t3: các em khoảng 11 tuổi (trung bình 11 tuổi 1 tháng), không "11–12"; Tự trải nghiệm đổi 12 tuổi thành 11.
- s8: xe tải "không nổ máy, các em kéo bằng dây kéo co", không "đẩy" (cả câu hỏi 3).
- s12: bỏ trích "bọn nó chơi bẩn" (không có trong nguồn; thay bằng sáu tính từ trong bảng đánh giá).
- nk1c (da-sua): khung Đang tranh cãi nói hai lần thử trước 1954 "đều trật kịch bản". Báo cáo gốc chỉ nêu lần 1953 (dừng vì các em quy nguồn cơn cho ban điều hành); lần 1949 dùng "kẻ thù chung" và hiệu quả. Bỏ "các nhà phê bình cho rằng" (không nêu được ai).
- s17, s18 (da-sua, da-lam-mem): bỏ "không có sự đồng ý": phụ huynh được báo về trại thí nghiệm của Đại học Oklahoma và phải cho phép; các em không biết mình là đối tượng nghiên cứu.
- nk1 (da-sua): đổi khung `:::vung-chac[cạnh tranh về nguồn lực có hạn sinh ra thù địch]` thành `:::kha-vung[... làm tăng thù địch ...]` vì không đạt thước đo Vững chắc (xem chỗ cần quyết).
- a3–a6 (da-sua): đoạn jigsaw: kết quả "giảm định kiến, tự tin, điểm chuẩn hóa" không kiểm được; dẫn lời tóm của Aronson (jigsaw.org), kèm tổng quan hệ thống 69 nghiên cứu (Cochon Drouet 2023) và 5 thí nghiệm ngẫu nhiên không thấy cải thiện học tập (Stanczak 2022, hiệu ứng gộp 0,00). Khung Khá vững "jigsaw cho thấy nguyên lý dùng được ngoài đời thực" đổi theo Pettigrew & Tropp 2006.
- l4, g2: "tiếp xúc đơn thuần có thể làm tệ hơn" chỉ đúng với Robbers Cave khi hai nhóm đang đối đầu; thêm đối trọng (Pettigrew & Tropp: tiếp xúc nhìn chung giảm định kiến).
- ap1–ap3, v3: lời khuyên công sở, mạng xã hội, "văn hóa Việt Nam đề cao tập thể" không có nguồn; làm mềm, đánh dấu suy luận hoặc bỏ (v3, da-bo).

Index
- s9–s11: ba câu tóm khớp lại trang nhà đã sửa (24 "được chọn"; "tăng điểm IQ nhiều hơn", bỏ "tiến bộ hơn thật"; "làm thù địch dịu đi" thay "làm hòa").
- s8: "bài học cho lái xe an toàn" thành "gợi ý về rủi ro khi lái xe" (trang nhà nói nghiên cứu không đo việc lái xe).
- p4: "trẻ con em giảng viên Stanford" thành "trẻ ở một nhà trẻ của Stanford" (Bandura, Ross & Ross 1961 chỉ nói trẻ học ở Stanford University Nursery School).
- p1, p3: bỏ "nổi tiếng nhất" và "hầu như ai cũng nghe tên"; câu "chưa làm lại thì chỉ là một câu chuyện hay" viết lại theo OSC 2015.
- s4: "cho từng kết luận" thành "cho các kết luận chính".

## Chỗ chưa chắc, chỗ khó (người giao cần xem)

Cần quyết
1. **Robbers Cave, đổi nhãn** (nk1): khung đầu đổi từ Vững chắc sang Khá vững. Nếu giữ Vững chắc, cần tái lập đăng ký trước hay phân tích tổng hợp về cạnh tranh gây thù địch; không tìm thấy. Có thể ảnh hưởng các trang khác dẫn nhãn.
2. **Zimbardo, khung Khá vững "mẫu không đại diện"** (n44): chỉ có Carnahan & McFarland 2007 (một nghiên cứu, chính tác giả nói hệ quả với SPE vẫn là phỏng đoán). Không đạt thước đo "nhiều nghiên cứu cùng chiều"; đề nghị giữ, hạ xuống tranh cãi, hay bỏ nhãn.
3. **Zimbardo, khung Vững chắc "sự kiện cơ bản có thật"** (n37): thước đo nhãn viết cho hiệu ứng, ở đây dùng cho sự kiện lịch sử có tư liệu và hai phía đồng thuận; xem có giữ nhãn không.
4. **Pygmalion, khung Vững chắc** (nv): nhãn chỉ nói "có thể tự ứng nghiệm", đã thêm "thường nhỏ"; Snow (1995) phản bác cách gộp hàng trăm nghiên cứu; cân nhắc Khá vững.
5. **Câu đánh giá đạo đức hiện hành** (Robbers Cave s18, q5b, g4): "rất khó được hội đồng đạo đức phê duyệt" không có nguồn mở được (APA Ethical Principles và Belmont Report không tải được). Giữ như nhận định của site hay thêm nguồn.
6. **Index, phần 1**: câu tóm Milgram, Asch, Darley-Latané, khỉ đột khớp trang nhà ở thời điểm 30/10 (s5–s8), nhưng do agent phần 1 sửa trang ấy; phải so lại sau.

Chưa chắc (đã đánh dấu trong `ghi_chu`)
- Pygmalion j1: không mở được nguồn bậc 1–2 nói Jacobson là hiệu trưởng, hay trường ở California (chỉ có Discover 2015, bậc 3); đã đổi thành "tại trường tiểu học của bà". Nếu có sách gốc (Rosenthal & Jacobson 1968), khôi phục.
- Pygmalion: con số gần 4 / 7 điểm IQ và đánh giá của giáo viên (j7, j9) lấy qua Raudenbush; sách 1968 không mở được. Bảng đánh giá của giáo viên (mục nào đạt ý nghĩa) nên kiểm ở sách.
- Pygmalion e1: chỉ mở dòng 243–297 bản Latin (Ovid); đoạn Venus cho tượng sống không đọc hết.
- Zimbardo n23 (Maslach), Robbers Cave a3 (lời tóm jigsaw): nguồn là lời kể của chính Zimbardo, của chính Aronson (bậc 3, người trong cuộc); chưa có nguồn độc lập. Sách Aronson và cộng sự 1978 không mở được.
- Zimbardo n25: "nhà xã hội học" cho Le Texier chưa kiểm (Author Note chỉ ghi "associate researcher, University of Nice").
- Robbers Cave nk1a, nk2a: Riek và Pettigrew & Tropp chỉ đọc tóm tắt; tóm tắt Riek nói năm loại đe dọa, chưa tách riêng "thực tế"; tóm tắt Pettigrew & Tropp không nêu "mục tiêu chung".
- Robbers Cave nk1c: chi tiết Middle Grove (New York; hai nhóm hợp sức chống nhân viên) chỉ có từ Perry (2018) và bài điểm sách, chưa mở được; trang chỉ giữ điều báo cáo gốc của Sherif nói.
- Các câu thoi-su (Zimbardo n57, Pygmalion v1, Robbers Cave v2): chỉ tìm bằng WebSearch ngày 30/10/2026; chưa tìm trong cơ sở dữ liệu tiếng Việt.
- Index s1b, s2, s3, s12: tám trang nhà chưa chuyển (kẹo dẻo, Pavlov, Skinner, Harlow, Bandura, Little Albert, Schachter và Singer, Seligman); tên bài, trình tự mục, các số trong câu tóm (918 trẻ, 17–18 giờ, nhãn của kẹo dẻo, Pavlov, Seligman 2016) chưa so được. Index chưa khóa được tới khi các trang ấy lên (`ket_qua: null`).
- Index p4: "40 người đàn ông ở Yale" (Milgram) thuộc hồ sơ Milgram.

## Nguồn đã mở (toàn văn trừ khi ghi khác)

- Haney, Banks & Zimbardo (1973): bản quét từ prisonexp.org, đọc bằng OCR (tesseract).
- Le Texier (2019): bản thảo PsyArXiv/OSF (`osf.io/mjhnp`; số trang theo bản thảo, có thể lệch bản in).
- Reicher & Haslam (2006): toàn văn (bản của nhà xuất bản qua CiteSeerX). Carnahan & McFarland (2007), Zimbardo & Haney (2020), Haslam, Reicher & Van Bavel (2019): chỉ tóm tắt.
- Zimbardo: prisonexp.org (Conclusion, The Story, Guards): lời kể của chính ông.
- Rosenthal & Fode (1963), Raudenbush (1984), Jussim & Harber (2005), Thorndike (1968), Snow (1995): toàn văn, qua bản quét trên gwern.net (không có bản khác mở được).
- Rosenthal & Jacobson (1966): tóm tắt (Crossref). Ovid, Metamorphoses 10.243–297: Perseus (Latin). Crawfurd & Rolleston (2020): toàn văn (UCL), không nói về kỳ vọng.
- Sherif và cộng sự (1954/1961): toàn văn trên Classics in the History of Psychology (số trang theo bản 1961); bản 1988 của Wesleyan University Press không mở được.
- Jigsaw: jigsaw.org (Overview, History); Stanczak và cộng sự (2022) toàn văn (HAL); Cochon Drouet và cộng sự (2023), Pettigrew & Tropp (2006), Riek và cộng sự (2006), Mullen và cộng sự (1992), Tyerman & Spencer (1983): chỉ tóm tắt.
- Index: Open Science Collaboration (2015) tóm tắt; Bandura, Ross & Ross (1961) toàn văn (psychclassics).
- Cách vòng: bản quét PDF cần `pypdf` lấy ảnh rồi `tesseract`; gwern.net lưu bản PDF của nhiều bài kinh điển và bài đóng; PsyArXiv/OSF có `https://osf.io/download/<id>/`; psychclassics.yorku.ca có Sherif, Bandura 1961.

## Cần người giao làm hay sửa

- `src/data/nguon.yml` thiếu các nguồn mới thêm vào danh sách Nguồn viết tay của trang: Haslam, Reicher & Van Bavel 2019; Snow 1995; Pettigrew & Tropp 2006; Riek và cộng sự 2006; Mullen và cộng sự 1992; Tyerman & Spencer 1983; Stanczak và cộng sự 2022; Cochon Drouet và cộng sự 2023; Ovid; Aronson (jigsaw.org). Hồ sơ trang có danh sách `nguon` riêng nên khóa không cần, nhưng `nghien-cuu.yml` và các trang khác sẽ cần nếu dẫn lại (`src/data/` đã khóa ở D2-0, nên thêm bản ghi mới mà không sửa bản ghi cũ).
- `Rosenthal & Fode (1963)` đã có trong `nguon.yml` là `rosenthal1963`, nhưng `nghien-cuu.yml` chỉ gán `rosenthal1966b`, `rosenthal1968`, `rosenthal1968b` cho hồ sơ Pygmalion: không đụng.
- Trên trang Pygmalion, câu "Hầu hết nghiên cứu ... phương Tây" đã bỏ; nếu muốn khẳng định mẫu phương Tây cần nguồn (Jussim & Harber không nêu quốc gia).
- `tests/` không chạm.
