# D5-L2, lượt 1, phần 2/2

Model: Claude Sonnet 5.5. Ngày 10/11/2026. Nhánh `moi/d5-l2`. Trang: `kham-pha/tu-duy/tin-dieu-vo-ly` (lõi), `kham-pha/tu-duy/dunning-kruger` (mở rộng).

## Số nhận định

| Trang | Tổng | Theo loại | Kết quả |
|---|---|---|---|
| tin-dieu-vo-ly | 69 | phat-hien 43, dinh-nghia 7, nhan 5, so-lieu 3, lich-su 2, tai-lap 1, loi-khuyen 4, ve-site 3, thoi-su 1 | dung 32, da-lam-mem 20, da-sua 16, da-bo 1 |
| dunning-kruger | 103 | phat-hien 55, so-lieu 13, dinh-nghia 10, lich-su 8, nhan 7, ve-site 6, loi-khuyen 3, thoi-su 1 | dung 55, da-lam-mem 36, da-sua 10, da-bo 2 |

Mỗi câu trích (`trich`) đã so khớp bằng máy với văn bản nguồn đã mở. `loiHoSo` (tools/khoa.mjs) chỉ còn báo thiếu lượt 2, review, `nguoi.luot_2`, `nguoi.kiem_mau`, và (dunning-kruger) `dua_tren`, `kiem_lai_truoc`.

## Đã sửa, làm mềm, bỏ (chọn lọc)

tin-dieu-vo-ly:
- Khung "Vững chắc" (ta có xu hướng suy luận theo hướng bảo vệ kết luận mình muốn) đổi thành **Khá vững**: không nguồn cho "hàng thập kỷ nghiên cứu"; cơ sở nay là Ditto 2019 (phân tích tổng hợp 51 thí nghiệm) và Persson 2021, nhưng chủ yếu chính trị Mỹ. Chỗ khó (t33).
- Taber và Lodge (chỉ có tóm tắt): bỏ "trên sinh viên", "cân bằng về độ dài và cấu trúc", "hai phe càng xa nhau" (tóm tắt chỉ nói thái độ mạnh hơn trước). Miller 1993: bỏ "các lần làm lại thường không thấy".
- Kahan 2013: mô tả đúng thiết kế (1.750 người, CRT, ba điều kiện), bỏ "tư duy phản biện … tinh vi hơn", thêm Tappin 2021 (không thấy bằng chứng rõ rằng sự tinh tường làm tăng suy luận theo bản sắc).
- Khung "Đã bị bác bỏ" (cứ đưa đủ sự thật): viết lại có nguồn; chỗ khó (Guess và Coppock không thấy phản tác dụng).
- Khung "Đang tranh cãi" thứ hai: thay câu không nguồn bằng Tappin 2021 và Bago 2023.
- Bỏ: ý "mất mặt, phản bội nhóm … gần như tự động" (Kunda không nói); "vaccine" (Kahan 2013 không nêu); lời khuyên 4 ("cùng phe nhưng trung thực", "Hệ 2 thuê ngoài"); chip nhãn ở lời khuyên 1; ngộ nhận "đạn dược", "mù tịt".
- Lời khuyên 2: dựa Lord, Lepper và Preston 1984, Greitemeyer 2023; chip Khá vững (chỗ khó).
- Ở Việt Nam: "Kunda … đều thực hiện ở Mỹ" sửa; câu "chưa tìm thấy" thành `thoi-su` kèm mốc 11/2026 và hạn 2028-11-01.

dunning-kruger:
- Khung "Vững chắc" đổi nội dung thành "tự xếp mình trên mức trung bình" (so với người khác, theo Zell 2020: 291 mẫu, dz = 0,78); bỏ "tự đánh giá cao hơn thực tế", "tái hiện nhiều nhất trong tâm lý học xã hội", ví dụ "lái xe, dạy học".
- Khung "Khá vững" (học thêm giúp tự đánh giá chính xác hơn) nới thành "phản hồi và huấn luyện" kèm Ryvkin 2012. Chỗ khó: mới hai hướng nghiên cứu (n57).
- Khung "Đang tranh cãi": bỏ "Phe bảo vệ đáp rằng …, Dunning nhấn mạnh …" (không nguồn); thay bằng Ehrlinger 2008 và Jansen 2021 (tái lập lớn, khoảng 4.000 người mỗi nghiên cứu).
- Khung "Đã bị bác bỏ" (núi ngu dốt): bỏ "tranh biếm họa internet ra đời sau này" và "người mới bắt đầu rất rụt rè" (không nguồn). Kiểm toàn văn: bài gốc có đúng bốn hình, đều là đồ thị đường.
- Bỏ câu "đến nay vẫn chưa ngã ngũ" (Hiller), motto Ig Nobel, điểm ngộ nhận Bukowski/Russell (chỉ có Wikiquote), "Thùng rỗng kêu to" và Luận ngữ (không tìm được nguồn), "đi trước khoa học cả trăm năm", mục "Điểm dung hòa hiện nay".
- Lời khuyên: bỏ chip ở 1 và 3, đổi chip lời khuyên 4 thành `tranh-cai` (hai giải thích khác nhau cho việc người giỏi đánh giá thấp mình).
- Ví dụ tục ngữ dùng bản đánh máy Nam ngạn chích cẩm trên Wikisource (bậc 3, người giao cân nhắc).
- Mục Việt Nam: câu "chưa tìm thấy" thành `thoi-su` ("Tính đến 11/2026", hạn 2028-11-01); nêu bài Nguyen và cộng sự (2026) dùng tên hiệu ứng nhưng không đo theo cách gốc.

## Chưa chắc, chỗ khó

- Chưa mở được toàn văn: Taber và Lodge 2006, Persson 2021, Guess và Coppock 2020, Lord 1979, Ditto 2019, Tappin 2021, Bago 2023, Krueger và Mueller 2002, Nuhfer 2016 và 2017 (PDF trả 403), Hiller 2023, Jansen 2021 (thu phí), Ehrlinger 2008 (PMC mở nhưng chưa đọc), Ryvkin 2012 (chỉ có tóm tắt bản mở rộng SSRN), Zell 2020. Các nhận định về chúng ghi `toan_van: false`.
- t33 (Khá vững hay Vững chắc), t42 (Đã bị bác bỏ hay Đang tranh cãi), t49 (chip lời khuyên 2), n57 (Khá vững chỉ với hai hướng), n65 (nhãn bác bỏ cho một khẳng định về nguồn gốc đồ thị): lượt 2 và review cân nhắc.
- n37: tên "Joachim Krueger" lấy từ Crossref theo G1-L02, chưa chạy lại trong phiên này.
- Câu "chưa tìm thấy ở Việt Nam" mới tra OpenAlex; có một mục đăng ký thử nghiệm AEA (Kiesel, rct.10541) về lập luận có động cơ của người tiêu dùng Việt, không chính trị và không có kết quả.

## Nguồn hay dùng

Toàn văn: Kruger & Dunning 1999 (avaresearch.com), Gignac & Zajenkowski 2020 (gwern.net), Kunda 1990, Stanovich 2013, Miller 1993, Kuhn & Lao 1996 (Internet Archive, bộ wikipedia-scholarly-sources-corpus; cách mở: `ia.py` ở thư mục tạm của D5-L1), Kahan 2013 (journal.sjdm.org), Kahan 2017 (bản tác giả, scholarsbank.uoregon.edu). Tóm tắt: OpenAlex, Europe PMC, Crossref.

## Người giao cần làm

- `src/data/trang.yml`, bản ghi `kham-pha/tu-duy/dunning-kruger`: đề xuất `dua_tren: [kham-pha/tu-duy/thien-kien-xac-nhan]` (bài chỉ nối với bài này qua "Đọc thêm"; nếu thấy yếu thì để `tu-duy-nhanh-cham`) và `kiem_lai_truoc: 2028-05`.
- `src/data/nguon.yml`: chưa có các nguồn mới thêm vào trang (Ditto 2019, Tappin 2021, Bago 2023, Lord–Lepper–Preston 1984, Greitemeyer 2023, Ehrlinger 2008, Jansen 2021, Nuhfer 2016 và 2017, Ryvkin 2012, Zell 2020, Nguyen 2026); `kruger1999` có trong `nguon.yml` nhưng chưa thuộc hồ sơ nghiên cứu nào ở `nghien-cuu.yml`. Không sửa dữ liệu theo lời giao.
- Hồ sơ `ve-site` (6 ở dunning-kruger, 3 ở tin-dieu-vo-ly) cần `review: dung/sai` ở bước review.
- Khóa `::tom-tat` của hai trang tự dựng từ ý chính các khung nhãn; ý chính khung "Vững chắc" và "Khá vững" đã đổi, nên bản sinh sẽ khác bản cũ.
- Trang `tu-duy-nhanh-cham` (phần 1) cần giữ câu "Bài toán bóng và chày này là câu đầu tiên trong bài kiểm tra … của Shane Frederick (2005)" vì `tin-dieu-vo-ly` dựa vào đó.
