# D6-L3, review phần 2 (tuoi-gia, tam-ly-hoc-duong, mang-xa-hoi-teen)

Nhánh `moi/d6-l3`. Ngày 10/11/2026. Claude Opus 5.5 (một agent, tuần tự; không làm lượt 1 hay lượt 2 của lô). Không build, không commit. Tệp tạm: `scratchpad/rv-d6l3b/` (bản tải nguồn, script sửa hồ sơ bằng thư viện `yaml` chép từ phần 1, thêm `nguon_set`).

Phạm vi: mọi câu `ve-site`, mọi câu lượt 2 khác `dung`, mọi câu lượt 1 đã sửa, làm mềm hay bỏ, mọi `nhan`, hình `gf-gc-curves`. Mỗi câu ghi `review: dung` hay `review: sai` và đoạn "Review (Claude Opus 5.5, 10/11/2026): …" cuối `ghi_chu`. Câu sai đã sửa trên trang và trong hồ sơ, mỗi chỗ một mục `doi_chu`. `nguoi.review` ở lần kiểm định cuối đã điền. `node tools/khoa.mjs xuat kham-pha/phat-trien/<trang>` đọc được cả ba; `loiHoSo` chỉ còn báo thiếu `nguoi.luot_2`, `nguoi.kiem_mau`. Mọi nhận định không `da-bo`, không `ve-site` có `nguon`; trang không có khoảng trắng cuối dòng.

## Số liệu

| Trang | Nhận định | review dung | review sai | Câu sai |
|---|---|---|---|---|
| tuoi-gia (loi) | 76 | 52 | 7 | n1, n5, n6, n7, n27, n37, n67 |
| tam-ly-hoc-duong (mo-rong) | 89 | 63 | 8 | n37, n45, n50, n56, n59, n68, n74, n88 |
| mang-xa-hoi-teen (mo-rong) | 66 | 42 | 12 | n4, n6, n10, n12, n30, n32, n40, n43, n45, n46, n48, n66 |

Câu không có `review`: hai lượt cùng `dung`, không phải nhãn hay `ve-site`.

## Nguồn mở được ở review

- Toàn văn: Salthouse 2019 (bản tác giả PMC6367038, qua NCBI E-utilities; lượt 1 chỉ có tóm tắt); Schaie & Willis 2010 (PMC); Cattell 1963 (Internet Archive); báo cáo đánh giá UNFPA Việt Nam 2026 (PDF, mục 2.1.3, tr. 38); WHO, NHS (sa sút trí tuệ; căng thẳng thi cử); bản tin LHQ về báo cáo UNESCO 2019; UNICEF (bắt nạt trên mạng); tổng quan 2026 về OBPP (PMC12782987); **Orben & Przybylski 2019, bản tác giả trên Oxford ORA** (`ora.ox.ac.uk/objects/uuid:5d844350-a359-47d3-b10c-4bfb93ce613b`, link PDF lấy từ trường `locations` của OpenAlex); **Odgers 2024** (nature.com mở được); **khuyến cáo Surgeon General 2023** (PDF hhs.gov qua bản lưu Internet Archive 04/11/2026; hhs.gov trả 403).
- Tóm tắt: Ttofi & Farrington 2011 (bản ghi NCJRS, ojp.gov), Ttofi 2011 trầm cảm và Salmivalli 1996 (OpenAlex; lượt 2 và lượt 1 không có), Salthouse & Babcock 1991 (OpenAlex), Verhaeghen 2003 (mới, Europe PMC), APA 2008, NAMHS Lancet 2024, Teague 2026 (Europe PMC, DOI 10.1001/jamapediatrics.2026.0085), Gaffney 2019 và 2021, Charles 2003, Reed 2014, Clarfield 2003, Singh-Manoux 2012, Olweus 2013, Olweus & Limber 2010.
- Không mở được: bản gốc UNESCO 2019 (unesdoc 403; trang giữ "theo bản tin của Liên Hợp Quốc"), toàn văn Ttofi 2011 (Springer, Emerald; không có trong bộ Internet Archive), sách Haidt và Olweus, StopBullying.gov (403).

## Các câu sai (chữ cũ → chữ mới)

**tuoi-gia**
- n1 (mô tả): "Nghiên cứu dọc Seattle cho thấy … và vốn từ vựng còn tăng đến khoảng thập niên 60" → "… chưa thấy …, và các nghiên cứu khác thấy vốn từ vựng còn tăng…" (số vốn từ là của Salthouse 2019, không phải SLS).
- n5: "khó làm hai việc cùng lúc hơn hồi trẻ (Salthouse, 1996)" → "tốc độ xử lý chậm lại (Salthouse, 1996), và khi làm hai việc cùng lúc thì chậm đi nhiều hơn so với người trẻ (Verhaeghen và cộng sự, 2003)" ("simultaneity" của Salthouse không phải làm hai việc; tổng hợp Verhaeghen chỉ thấy chậm hơn, không kém chính xác hơn).
- n37 (bảng): "Làm nhiều việc cùng lúc khó hơn trước" → "Làm hai việc cùng lúc chậm hơn trước".
- n6: sa sút trí tuệ "một nhóm bệnh lý" → "một tình trạng do nhiều bệnh gây tổn thương não" (NHS: "not a disease itself").
- n7: "hai cái hại ngược nhau… người thì hoảng loạn khi gặp một lần quên vặt" → chỉ giữ vế chủ quan bỏ qua dấu hiệu, kèm NHS (người thân có khi không để ý) và WHO (thiếu hiểu biết là rào cản chẩn đoán).
- n67: "Các dấu hiệu sớm mà NHS nêu là quên thường xuyên những việc vừa xảy ra, hỏi lặp lại, …" → tách: dấu hiệu sớm (việc quen thuộc, tìm từ, thời gian và nơi chốn) và dấu hiệu NHS nêu cho bệnh Alzheimer (quên việc vừa xảy ra, hỏi lặp lại).
- n27 (hình `gf-gc-curves`): "Gc tăng suốt tuổi trung niên và giữ vững đến tuổi già" → đường Gc tăng đến khoảng trung niên muộn rồi chững lại, đi xuống nhẹ; chú thích "giảm muộn hơn và ít hơn, theo dự đoán của Cattell (1963). Ở vốn từ vựng … tăng đến khoảng thập niên 60 rồi chững lại hay giảm, nhưng ở tuổi 70–80 vẫn cao hơn ở tuổi 20–40 (Salthouse, 2019); nhóm Seattle thấy trí tuệ kết tinh giảm dốc hơn từ cuối tuổi 70 (Schaie và Willis, 2010)". Gf: "đạt đỉnh ở tuổi trưởng thành trẻ" → "đạt đỉnh sớm" (n26, dung). Đã thêm `gf-gc-curves` vào `HINH_DA_SUA` kèm dòng chú thích.

**tam-ly-hoc-duong**
- n45 (khung): Vững chắc "bắt nạt được định nghĩa bằng ba tiêu chí" → Khá vững, thân khung nói rõ là định nghĩa quy ước, Holt 2015: chỉ 12/47 nghiên cứu đo chênh lệch quyền lực.
- n68 (chip mục 1): Vững chắc → Khá vững, giữ id `#1-nhan-dien-dung-dung-bo-loc-ba-tieu-chi-vung-chac`.
- n56 (mục 2): "Người chứng kiến là "chìa khóa" bị bỏ quên" (Khá vững) → "Người chứng kiến: hướng đi hứa hẹn, bằng chứng chưa thống nhất" (Đang tranh cãi; Ttofi 2011 và Gaffney 2021 trái chiều; KiVa đánh giá cả chương trình), giữ id cũ; bỏ các hành vi gợi ý không nguồn, thay bằng lời khuyên của UNICEF.
- n50 (khung): Đã bị bác bỏ "'trừng phạt thật nặng là cách tốt nhất để xóa bắt nạt'" → Khá vững "chính sách kỷ luật "không khoan nhượng" chưa có bằng chứng ủng hộ" (APA 2008 nói về kỷ luật học đường nói chung; Ttofi 2011 thấy kỷ luật vững chắc gắn với hiệu quả).
- n37: bỏ "xin giúp đỡ là dấu hiệu của sức mạnh, không phải của yếu đuối" (không nguồn); lời khuyên ghi "như UNICEF khuyên".
- n59: bỏ "ghi lại diễn biến (ngày giờ…), trao đổi với giáo viên chủ nhiệm" → lời khuyên của UNICEF (người lớn tin cậy; chặn, báo cáo, lưu bằng chứng).
- n74: "khảo sát ẩn danh định kỳ… xử lý từng vụ việc riêng với từng bên" → "khảo sát ẩn danh… làm việc riêng với em bắt nạt, em bị bắt nạt và phụ huynh (theo một bài tổng quan năm 2026)".
- n88 (hồ sơ, ve-site): "kiem_lai_truoc 2028-05" → "2027-11" (khớp trang.yml).

**mang-xa-hoi-teen**
- n10, n12: "22% từng nghiêm túc nghĩ đến việc tự tử…, 10% đã từng cố tự tử"; "khoảng 9% (2023)" → "trong 12 tháng qua" ở cả hai chỗ trên trang.
- n30 (khung): Vững chắc → Khá vững (chỉ YRBS, một nước); tiêu đề mục YRBS "khủng hoảng là có thật" → "buồn bã tự báo cáo tăng", giữ id cũ.
- n46 (chip mục 3): Khá vững → bỏ chip (`da-bo`); tiêu đề "Chú ý đặc biệt ở ngưỡng dậy thì" → "Có thể có những độ tuổi nhạy cảm hơn", giữ id cũ; n45: bỏ "trò chuyện… hữu ích hơn chỉ ra lệnh cấm" (không nguồn), thêm Teague 2026 (liên hệ với trầm cảm mạnh hơn ở đầu tuổi vị thành niên).
- n4: "ông nói về giai đoạn biến đổi 2010–2015" → bỏ (chỉ có Wikipedia).
- n6: bốn tổn hại của Haidt (chỉ có Wikipedia) → theo đoạn trích sách trong bài Nature của Odgers (nội dung gây nghiện; thay thế chơi, gặp gỡ trực tiếp), cả ở mục Lý thuyết.
- n32: "liên hệ nhất quán nhưng khiêm tốn" → "liên hệ nhất quán…, ở mức nhỏ (r = 0,09–0,21)"; nguồn đổi sang DOI.
- n40: "hỏi con đang xem gì… là thông lệ hợp lý" → khuyến cáo của Surgeon General (kế hoạch dùng phương tiện số, thảo luận về thời gian, nội dung, lợi ích và rủi ro).
- n43: "sạc ngoài phòng ngủ, không lướt trước giờ ngủ 30–60 phút" → Surgeon General: hạn chế thiết bị ít nhất 1 giờ trước khi ngủ và suốt đêm.
- n48: bỏ "Tìm giúp đỡ là dấu hiệu của sức mạnh, không phải yếu đuối"; đổi loại thành `ve-site`.
- n66 (hồ sơ, ve-site): "kiem_lai_truoc 2028-05" → "2027-05".

Sửa có nguồn mới, review dung: tam-ly-hoc-duong n53 (Salmivalli: 573 học sinh lớp 6, các vai), n60 (UNICEF), n66 (NHS căng thẳng thi cử); mang-xa-hoi-teen n34 (Odgers mở được bài gốc), n35 và n59 (Surgeon General toàn văn: lợi ích cho nhóm bị gạt ra lề). Đổi loại thành `ve-site`: tam-ly-hoc-duong n2 (ba tình huống giả định). Bỏ nguồn `wiki-ag` khỏi hồ sơ mang-xa-hoi-teen.

## Nhãn đã chốt

| Trang | Khung | Trước review | Chốt |
|---|---|---|---|
| tuoi-gia | Gf/Gc, vốn từ (n43) | Khá vững | Giữ (Schaie 2010 thêm: Gc giảm dốc từ cuối tuổi 70) |
| tuoi-gia | hiệu ứng tích cực (n44), lối sống (n56), nói chuyện với bác sĩ (n60) | Khá vững | Giữ |
| tuoi-gia | suy giảm trước 60 (n45) | Đang tranh cãi | Giữ |
| tuoi-gia | "già thì lẫn" (n47) | Đã bị bác bỏ | Giữ (WHO, NHS; SLS: ở 81 tuổi chưa đến nửa suy giảm) |
| tam-ly-hoc-duong | ba tiêu chí (n45), mục 1 (n68) | Vững chắc | Khá vững |
| tam-ly-hoc-duong | bắt nạt và trầm cảm, tự tử (n46) | Vững chắc | Giữ (ba tổng hợp, nhiều quần thể; liên hệ, không nhân quả) |
| tam-ly-hoc-duong | người chứng kiến (n56) | Khá vững | Đang tranh cãi |
| tam-ly-hoc-duong | trừng phạt nặng (n50) | Đã bị bác bỏ | Khá vững, đổi ý chính |
| tam-ly-hoc-duong | "chuyện trẻ con" (n51) | Đã bị bác bỏ | Giữ (hai tổng quan dọc; số đã đọc được) |
| tam-ly-hoc-duong | n47, n48, n58, n65; n49 | Khá vững; Đang tranh cãi | Giữ |
| mang-xa-hoi-teen | xu hướng YRBS (n30) | Vững chắc | Khá vững |
| mang-xa-hoi-teen | cửa sổ nhạy cảm (n46) | Khá vững | Bỏ chip |
| mang-xa-hoi-teen | n31, n41, n44 (giấc ngủ: Orben 2019 đã đọc); n33; n36 | Khá vững; Đang tranh cãi; Đã bị bác bỏ | Giữ |

## Chỗ còn chưa chắc

- UNESCO 2019: chỉ qua bản tin LHQ (trang đã ghi rõ). Ttofi & Farrington 2011 và Ttofi 2011 (trầm cảm): chỉ tóm tắt.
- OBPP: mô tả ba cấp chỉ theo một tổng quan 2026; chưa mở tài liệu chính thức của chương trình.
- mang-xa-hoi-teen n36 (Đã bị bác bỏ "hoàn toàn vô hại") đứng cạnh n33 (nhân quả Đang tranh cãi): giữ vì mệnh đề tuyệt đối và có hiệu ứng trong cùng người (Orben 2019, 2022), nhưng là chỗ sát ranh.
- tam-ly-hoc-duong n47 có thể lên Vững chắc (Gaffney 2019: nhiều RCT, không thấy thiên lệch xuất bản); giữ Khá vững cho thận trọng.
- tam-ly-hoc-duong n36 "phần lớn học sinh bị bắt nạt không đi đến bước đường cùng": suy ra từ tỉ lệ nền, không có con số trực tiếp.
- tuoi-gia n38 "học cái mới mất nhiều thời gian hơn": suy ra từ tốc độ xử lý; bảng ghi "chỉ minh họa".
- Teague 2026: tóm tắt tự mâu thuẫn về số người tham gia (trang không dùng số này).

## Việc cho người gom

- Điền `nguoi.luot_2`, `nguoi.kiem_mau` ở lần kiểm định cuối của ba hồ sơ; rồi `npm run build:xem`, `npm test` (gồm `tests/chuyen.test.mjs` với `gf-gc-curves` mới trong `HINH_DA_SUA`), xem hình `gf-gc-curves` ở 360 px (chú thích dài hơn).
- Liên kết tới trang lô khác (hiện "sắp có"): `tinh-cach/tinh-cach-thay-doi`, `co-so-sinh-hoc/nao-tuoi-teen`, `suc-khoe-tam-than/tim-giup-do`, `suc-khoe-tam-than/tram-cam`.
- Nguồn mới chưa có bản ghi ở `src/data/nguon.yml`: Verhaeghen 2003, Odgers 2024, UNICEF (cyberbullying), NHS (exam stress); Teague 2026 nay dẫn DOI.
- Đề xuất thêm vào `plans/ben-vung/chuan-kiem-dinh.md` (Nguồn và cách mở): trường `locations` của OpenAlex chỉ tới bản tác giả trong kho trường (ví dụ Oxford ORA); trang hhs.gov chặn bot nhưng bản lưu Internet Archive (`web.archive.org/web/<thời điểm>if_/<url>`) tải được PDF; bản ghi NCJRS (ojp.gov) có tóm tắt đã xuất bản của nhiều bài tội phạm học Springer.
- Mục 2 của tam-ly-hoc-duong và mục 3 của mang-xa-hoi-teen đổi nhãn: nếu trang khác link tới các id này, kiểm lại chữ dẫn.
