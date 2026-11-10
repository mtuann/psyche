# D6-L2, review phần 2 (tâm lý học tiến hóa, dopamine, thể dục và não)

Ngày 10/11/2026, nhánh `moi/d6-l2`, model Claude Sonnet 5.5 (agent review; không làm lượt 1, lượt 2). Chưa commit, chưa khóa, chưa build. Hồ sơ: `kiem-dinh/kham-pha/co-so-sinh-hoc/{tam-ly-tien-hoa,dopamine,the-duc-nao}.yml`: mỗi câu đã xét có `review` và đoạn "Review (Claude Sonnet 5.5, 10/11/2026): …" cuối `ghi_chu`; `lan[-1].nguoi.review` đã ghi; mục `doi_chu` đã thêm. Việc nêu ở mục 6 (gen-va-tinh-cach n8): xem cuối.

## Phạm vi và kết quả

Xét: mọi câu `ve-site`, mọi câu `nhan`, mọi câu lượt 1 đã sửa, làm mềm, bỏ, mọi câu lượt 2 khác `dung`; quét cả trang tìm chữ cũ mà hồ sơ ghi đã sửa; đối chiếu lại nguồn đã mở được.

| Trang | Tổng nhận định | Đã xét | dung | sai |
|---|---|---|---|---|
| tam-ly-tien-hoa (lõi) | 76 (+3 mới: n77–n79) | 55 (+3 mới) | 45 (+3 mới) | 10 (n31, n58, n59, n60, n61, n62, n64, n66, n68, n75) |
| dopamine (mở rộng) | 65 | 58 | 45 | 13 (n1, n12, n32, n34, n36, n39, n46, n47, n48, n49, n50, n62, n64) |
| the-duc-nao (mở rộng) | 74 | 60 | 46 | 14 (n4, n6, n8, n18, n42, n47, n48, n53, n55, n58, n59, n63, n64, n74) |

Mọi nhận định không `da-bo`, không `ve-site` có `nguon` nằm trong `nguon` của hồ sơ (kiểm bằng script); câu thời sự có `het_han` 2028-11-01; `kiem_lai_truoc` (dopamine 2028-05, the-duc-nao 2027-11) không muộn hơn. Ba trang không có khoảng trắng cuối dòng; `node tools/khoa.mjs xuat` và `tinh` đọc được; `node --test` của `thanh-phan`, `du-lieu`, `doi`, `pham-vi`, `chuyen` đạt (38/38). Chưa chạy build, `link.test`, kiểm thử trình duyệt.

## Câu sai (đã sửa trang và hồ sơ)

**the-duc-nao**
- n4: "phần trước của hồi hải mã … to ra khoảng 2% … teo đi khoảng 1,4%" → "thể tích hồi hải mã … tăng khoảng 2% (tăng chọn lọc ở phần trước) … giảm khoảng 1,4%" (đọc toàn văn Erickson: 2,12% và 1,97% là toàn hồi hải mã trái, phải).
- n42: khung Đã bị bác bỏ "tập vài tuần là não to ra / tập thể dục chữa được sa sút trí tuệ" → chỉ "tập thể dục chữa khỏi sa sút trí tuệ", dẫn DAPA (Lamb 2018, BMJ, 494 người: không làm chậm sa sút nhận thức) và Cochrane (Forbes 2015: không có bằng chứng rõ ràng về lợi ích nhận thức, chất lượng rất thấp); vế "vài tuần" bỏ khỏi khung.
- n74 (hình `erickson-hippocampus`): "+2% ≈ đảo ngược 1–2 năm teo não do tuổi tác" → "Theo các tác giả: +2% ≈ đảo ngược 1–2 năm teo do tuổi"; chú thích thêm "theo các tác giả … (mức teo 1–2% mỗi năm)", bỏ "đúng như quy luật tự nhiên" → "phù hợp với mức teo 1–2% mỗi năm đã biết", tiêu đề "toàn hồi hải mã". Đã thêm `erickson-hippocampus` vào `HINH_DA_SUA`. Tiêu đề mục Erickson "…não đảo ngược 1–2 năm tuổi già" → "…hồi hải mã to ra khoảng 2%" (id cũ giữ).
- n18: "cả hai nhóm đều cải thiện độ chính xác" → thêm "nhưng nhóm đi bộ không cải thiện hơn nhóm giãn cơ" (tương tác Thời gian × Nhóm không có ý nghĩa).
- n8: "Nhiều người coi đó là quy luật tất yếu" → "Erickson và cộng sự cho rằng sự mất thể tích này ở tuổi già không phải là tất yếu".
- n6: "vai trò trung tâm" → "vai trò quan trọng". n47: "tranh luận về mức độ và ý nghĩa vẫn chưa kết thúc" (không có trong tóm tắt) → "các nhóm nghiên cứu vẫn cho kết quả khác nhau". n48: Neeper 1995 (không mở được) → "theo Erickson kể lại" + kết quả ở chuột của Rasmussen 2009.
- n53: "Một giả thuyết là … đi qua giấc ngủ, tâm trạng, huyết áp" → tách phần có nguồn và nói thẳng "suy đoán của chúng tôi, chưa dẫn nghiên cứu"; loại `loi-khuyen` → `phat-hien`.
- n55: chip Khá vững bỏ; thêm "so sánh giữa các nhóm nghiên cứu, không phải thử nghiệm trực tiếp về thời lượng", khác biệt giữa các nhóm "liều" của Aghjayan không có ý nghĩa (p = 0,91). n58, n59: bỏ chip Đang tranh cãi và Khá vững; n58 "Một cách nghĩ là kết hợp vận động đều với ngủ đủ và giao tiếp xã hội" → "chỉ là suy đoán".
- n63 (hồ sơ ghi da-bo mà trang còn): bỏ đoạn "thể trạng, chế độ ăn, khí hậu nóng ẩm … khói bụi" khỏi mục Việt Nam. n64: "Chưa có bằng chứng như vậy" → "Chúng tôi không thấy bằng chứng như vậy".

**dopamine**
- n34: "Hàng trăm nghiên cứu ghi hình não … theo một phân tích tổng hợp (Garrison 2013)" → "một phân tích tổng hợp 35 nghiên cứu fMRI ở người (446 điểm tọa độ)" (đọc bản tác giả).
- n32: khung Vững chắc → **Khá vững** (mục 4 đòi tổng hợp riêng cho khẳng định; Garrison là về ghi hình não, Schultz 2016 là tổng quan kể); thân khung nêu lý do.
- n36, n49: khung Đã bị bác bỏ "detox dopamine" → aside `:::note` "Không có cơ chế, không có bằng chứng: 'detox dopamine' theo nghĩa đen", không nhãn; thêm Harvard Health (Grinspoon 2020); Mô tả frontmatter đổi theo; chip Áp dụng 3 bỏ; vế "có thể giúp một số người bớt xao lãng" thu về phần có nguồn (Kushlev 2016, tắt thông báo).
- n39: khung Đang tranh cãi (nghiện mạng xã hội, game) → `:::note` "Chưa đủ bằng chứng: …" (không có bằng chứng chất lượng cao mâu thuẫn; thực tế là chưa có nghiên cứu trực tiếp). n46, n48, n50: bỏ chip (n48: chip Khá vững đặt trên bài tập mà chính trang nói chưa có nghiên cứu); n50 "một số người đề xuất" → "có thể nghĩ đến".
- n47: lời khuyên "tắt thông báo, để điện thoại xa tầm tay" không nguồn → thêm Kushlev, Proulx & Dunn 2016 (221 người, tuần bật và tuần tắt thông báo; tự báo cáo ít mất tập trung hơn khi tắt; không đo dopamine).
- n12 (Olds & Milner "quên ăn uống"): "Chuột nhấn cần nhiều hơn … quên ăn uống một lúc" → "Theo cách Schultz (2016) kể lại, …" (Schultz 2016 có câu này; bài gốc không mở được).
- n1: "dopamine thường được xếp vào nhóm hormone hạnh phúc" → "trong một số nội dung sức khỏe … (ví dụ một bài của Vinmec)". n62 (quiz): câu hỏi "bị coi là sai về mặt khoa học" → "trang này nói không có cơ sở khoa học"; giải thích dẫn Kushlev. n64: mô tả "Đọc thêm" của cam-xuc-co-ban ("'thích' và 'muốn' trong cảm xúc") không đúng trang đích → "Ekman, các cảm xúc cơ bản và tranh luận về nét mặt".
- Mở bài: hai câu "Buồn thì làm gì đó cho tăng dopamine đi", "Detox dopamine 7 ngày để reset não" thêm "Hai câu giả định, kiểu lời khuyên về dopamine:" (n2 ve-site, gia-dinh).

**tam-ly-tien-hoa**
- n31, n64: "Việt Nam xuất hiện (bốn tác giả ĐHQG Hà Nội); chưa mở được toàn văn" → đã đọc toàn văn bản chấp nhận đăng của Walter 2020 (kho Đại học Louvain): Việt Nam có trong 45 nước nhưng người tham gia không ghi tuổi bạn đời nên không vào phân tích tuổi. Thêm n77 (dữ liệu 2016, kế hoạch phân tích đăng ký trước) và n78 (kết quả bình đẳng giới, mầm bệnh) cho thân trang.
- n58, n59: chip Vững chắc ở "Tự nhiên không có nghĩa là đúng" bỏ (nguyên tắc lập luận, không phải bằng chứng); thêm nguồn SEP (Cohon, "Hume's Moral Philosophy", mục 5) và nói rõ là nguyên tắc lập luận.
- n60, n61, n62: bỏ chip Khá vững, Vững chắc, Khá vững ở Áp dụng 2, 3, 4 (id cũ giữ). n62: "văn hóa và lựa chọn cá nhân vẫn định hình phần lớn hành vi" → "có thể định hình hành vi mạnh mẽ".
- n66 (lượt 2: khong-chac): bỏ ba "chuẩn mực" Việt Nam không nguồn ("môn đăng hộ đối", con trai lập nghiệp, con gái lấy chồng sớm), giữ "suy đoán của chúng tôi, chưa có dữ liệu". n68: bỏ "luật pháp, giáo dục … bạo lực vì ghen", giữ phần có nguồn (biến thiên văn hóa về trinh tiết, Buss).
- n75: mô tả "Đọc thêm" của nao-che-doi ("não bộ không phải máy ghi hình trung thực") không đúng trang đích → "thí nghiệm não chẻ và ngộ nhận 'não trái, não phải'".
- Cũng sửa không đánh sai: thêm "Hai tình huống giả định." (n2); "(Gould và Vrba, 1982)" và Nguồn (n57); khung Vững chắc dẫn OpenStax Psychology 2e mục 3.1 (n45, n79) thay cho câu "đồng thuận khoa học" không nguồn; khung Khá vững: "mới có một tái lập lớn có đăng ký trước"; khung Đang tranh cãi bám Walter (n47, n50, n78).

## Nhãn đã chốt

- tam-ly-tien-hoa: n45 **Vững chắc** (nguyên tắc nền, căn cứ giáo trình OpenStax; giữ); n46 **Khá vững** (giữ; Walter 2020 là một tái lập lớn có đăng ký trước, chưa đủ hai, chưa có tổng hợp); n47 **Đang tranh cãi** (giữ; hai khung cạnh tranh, kết quả Walter lẫn lộn); n48 **Đã bị bác bỏ** (giữ, sát ranh: khẳng định phổ quát "mọi đặc điểm đều là thích nghi" bị phản bác bằng ví dụ ngược hơn là bằng thí nghiệm). Bốn chip Áp dụng bỏ.
- dopamine: n32 hạ **Khá vững**; n35 **Khá vững** (giữ); n36/n49 Đã bị bác bỏ → bỏ nhãn (note); n39 Đang tranh cãi → bỏ nhãn (note); chip n46, n48, n50 bỏ. Còn hai khung nhãn: hai Khá vững.
- the-duc-nao: n39, n40, n41 **Đang tranh cãi** (giữ); n42 **Đã bị bác bỏ** chỉ cho "chữa khỏi sa sút trí tuệ" (DAPA và Cochrane; xem chỗ chưa chắc); chip n55, n58, n59 bỏ; n56 giữ chip Đang tranh cãi (cùng căn cứ n39).

## Chỗ còn chưa chắc

- the-duc-nao n42: Cochrane 2015 tìm tài liệu đến 10/2013 và viết "không có bằng chứng rõ ràng" (chất lượng rất thấp), không phải "không có tác dụng"; DAPA là một thử nghiệm lớn. Nhãn Bác bỏ cho "chữa khỏi" chấp nhận được, nhưng người gom có thể hạ xuống không nhãn.
- dopamine n32: Vững chắc hay Khá vững còn tùy cách hiểu chuẩn (ngành thần kinh học coi RPE rất vững); tôi theo chữ của mục 4.
- tam-ly-tien-hoa n48: xem trên.
- Không mở được: Olds & Milner 1954 (APA), Neeper 1995, Fiorillo 2003 (toàn văn), Berridge 1989/1998 và Peciña 2005 (chỉ tóm tắt), Eagly & Wood 1999 (chỉ qua mô tả của Walter 2020), Gould & Lewontin 1979 (chỉ tóm tắt). Bộ `wikipedia-scholarly-sources-corpus` có 1.529 tệp zip đặt tên theo DOI, không tra được tệp nào chứa bài nào, nên không dùng được.
- gen-va-tinh-cach n8 "khoảng 50 giờ" (việc 6): không sai. Time 1987 "six-day tests" và tóm tắt Bouchard 1990 (Europe PMC) "a week of intensive … assessment" nhất quán (sáu ngày đến một tuần); "approximately 50 hours" là câu trong thân bài Bouchard 1990 mà lượt 1, lượt 2 đã đọc; review không mở lại độc lập (bản gwern.net là bản sao của bài có tường phí). Trang không đổi; đã ghi `review: dung` và lý do.
- Eastwick & Finkel 2008: chỉ tóm tắt; Henrich 2010, Smith 2010 (có bản tác giả, lượt 1 đã đọc), Colcombe 2003: chỉ tóm tắt.

## Việc cho người gom

1. Lượt 2 chưa chạy lại cho các câu review viết lại sau lượt 2 (`luot_2` cũ vẫn `dung`, không xét chữ mới): the-duc-nao n4, n6, n8, n17, n18, n42, n47, n48, n53, n55, n58, n59, n63, n64, n74; dopamine n1, n12, n32, n34, n36, n39, n46, n47, n48, n49, n50, n62, n64; tam-ly-tien-hoa n31, n45–n48 (thân khung), n50, n58–n62, n64, n66, n68, n75. Ba nhận định mới của trang lõi (n77, n78, n79) chưa có lượt 2 (`khoa xuat --con-lai` chỉ in ba câu này).
2. `lan[-1].nguoi.luot_2` của ba hồ sơ còn `null`; `kiem_mau` cũng `null`.
3. `tests/chuyen.test.mjs`: đã thêm `erickson-hippocampus` vào `HINH_DA_SUA`. Hình đã sửa chú thích; khóa trang the-duc-nao tính cả nội dung hình.
4. Link tới trang chưa chuyển (thành chữ "sắp có"): doi-pho-stress (the-duc-nao), gan-bo (tam-ly-tien-hoa), thuong-va-dong-luc, cam-xuc-co-ban (dopamine).
5. Tiêu đề bỏ chip đã giữ id cũ bằng `{ #id-cu }` (chip chữ nằm trong id): the-duc-nao mục 4 và mục Erickson; dopamine Áp dụng 3, 4; tam-ly-tien-hoa Áp dụng 1–4.
6. Trang the-duc-nao thêm nguồn Forbes 2015, Lamb 2018 vào mục Nguồn; dopamine thêm Grinspoon 2020, Kushlev 2016; tam-ly-tien-hoa thêm Cohon (SEP), OpenStax 3.1, Gould & Vrba 1982. Hồ sơ đã thêm các nguồn này; `walter2020` và `garrison2013` đổi `toan_van: true` (đã đọc bản chấp nhận đăng và bản tác giả).
7. Chưa chạy `npm run build:xem`, `link.test`, kiểm thử trình duyệt.
