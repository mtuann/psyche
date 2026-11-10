# D5-L1, lượt 1, phần 1/2 (bang-ghi-hinh, vi-sao-ta-quen, duong-cong-quen, phong-cach-hoc)

Ngày 09/11/2026. Model: Claude Sonnet 5.5. Nhánh `moi/d5-l1`. Chưa commit. Phần 2 (tri-nho-lam-viec, tri-tue-la-gi, hieu-ung-flynn) do agent khác làm.

## Số nhận định

| Trang | Tầng | Tổng | Theo loại | Kết quả |
|---|---|---|---|---|
| bang-ghi-hinh | loi | 52 | phat-hien 26, so-lieu 13, lich-su 2, dinh-nghia 1, nhan 3, thoi-su 2, loi-khuyen 3, ve-site 2 | dung 41, da-sua 2, da-lam-mem 9 |
| vi-sao-ta-quen | loi | 70 | phat-hien 33, so-lieu 12, dinh-nghia 11, lich-su 6, nhan 4, ve-site 3, thoi-su 1 | dung 52, da-sua 3, da-lam-mem 15 |
| duong-cong-quen | loi | 64 | phat-hien 28, so-lieu 12, nhan 8, dinh-nghia 4, loi-khuyen 6, ve-site 3, lich-su 2, thoi-su 1 | dung 32, da-sua 7, da-lam-mem 25 |
| phong-cach-hoc | mo-rong (kiểm đủ như lõi) | 39 | phat-hien 19, so-lieu 6, nhan 4, dinh-nghia 3, loi-khuyen 3, ve-site 2, lich-su 1, thoi-su 1 | dung 28, da-sua 1, da-lam-mem 10 |

Tổng 225. Không có `da-bo`, không có `ket_qua: null`.

Nhập từ G1-L01 (có câu trích của G1 hay chỗ sửa của G1): khoảng 66 nhận định (bang 5, duong 27, vi 20, phong 14; ghi `ghi_chu` "theo G1-L01 (22/10/2026)"); mọi sửa của G1 (9 mục SAI/ĐÁNG NGỜ của bốn trang, đã áp trên trang cũ) đã đối chiếu lại với chữ trên trang và ghi `da-sua`/`da-lam-mem` kèm chữ cũ, chữ mới. Kiểm mới: khoảng 160 nhận định (mọi câu G1 gộp hay chưa nói tới, Loftus và Palmer 1974 nay có toàn văn, các khung nhãn, quiz, hình, lời khuyên, thời sự).

## Đã sửa trang (chữ, có nguồn)

- Sửa theo G1 nhưng đã có sẵn trên trang chuyển sang, kiểm lại: duong-cong-quen (180 sinh viên, 83%/71%, bỏ hàng 2 ngày, Adesope g 0,61/0,51, Cepeda "người trẻ tuổi"), vi-sao-ta-quen (mốc 24 giờ, "cùng một hình dạng"), bang-ghi-hinh (khảo sát làm 2009).
- Mới ở lượt này, `da-sua`: bang-ghi-hinh n20 (bỏ "khác" ở "150 sinh viên khác"); vi-sao-ta-quen n10 (38 trong 163 lần thử chỉ có 6 dãy).
- `da-lam-mem` đáng chú ý: bang-ghi-hinh bỏ "phần lớn ký ức đủ chính xác" (hai chỗ), bỏ vế tâm lý "không bị căng thẳng, biết hậu quả không lớn", bỏ nhận xét về sắc thái động từ tiếng Việt; vi-sao-ta-quen bỏ "người đầu tiên đo được", "mạnh nhất trong tâm lý học học tập", "nhiều trang mạng"; duong-cong-quen bỏ "trên hàng nghìn người", "luyện tập truy xuất", "đặc biệt phổ biến trong văn hóa thi cử nặng nề", "từ tiểu học đến y khoa", "tốt hơn hẳn", "vài ngày" thành "một đến vài ngày" (ở mốc 7 ngày khoảng cách tối ưu đo được là 1 ngày; cải thiện chỉ 10% so với khoảng cách 0); phong-cach-hoc bỏ "chẳng ai phản đối", "phổ biến nhất", "dễ chịu", "điều này đúng với mọi người", nêu rõ mẫu của Dekker (242 giáo viên quan tâm khoa học não), g = 0,31 của tổng hợp 2024 không gọi là "rất nhỏ hoặc bằng 0".
- Đã thêm nguồn vào mục Nguồn: vi-sao-ta-quen (Nørby 2015, OpenStax Psychology 2e mục 8.3); duong-cong-quen (Diekelmann và Born 2010, chương 8 của Ebbinghaus). Frontmatter `description` đổi ở bang-ghi-hinh và duong-cong-quen.
- Khẳng định thời sự (có "Tính đến 11/2026", `thoi-su`, `het_han`, nguồn `tim-kiem-vn` là lần tìm OpenAlex 9/11/2026): "chưa tìm thấy nghiên cứu ở Việt Nam" (bốn trang, hạn 2028-11-01); "thí nghiệm Loftus và Palmer chưa được tái lập lớn, đăng ký trước" (hạn 2027-11-01; Zwaan 2025 là blog bậc 3, tìm thêm thấy một bản làm lại nhỏ năm 2026 trên 60 học sinh, không phải tái lập lớn).

## `doi_chu`

Mỗi trang có mục `doi_chu` đầu tiên cho hộp `::tom-tat` (Bố cục C), rồi một mục cho mỗi chỗ sửa chữ, cùng các sửa của G1 đã có sẵn.

## Chỗ khó (để lượt 2 và review chú ý)

1. **Nhãn "Vững chắc" thiếu phân tích tổng hợp trực tiếp** (thước đo chuẩn mục 4): bang-ghi-hinh n28 (hiệu ứng thông tin sai lệch: dựa tổng quan Loftus 2005 và phân tích tổng hợp Blank và Launay 2014 về cảnh báo, không có phân tích tổng hợp trực tiếp về độ lớn); vi-sao-ta-quen n27 (hình dạng đường cong quên: Rubin và Wenzel 1996 là tổng hợp định lượng 210 bộ dữ liệu, chỉ đọc tóm tắt); phong-cach-hoc n23 (khung "sở thích học khác nhau": chỉ tổng quan Pashler; khung gộp hai ý, ý thứ hai là ý bác bỏ). Nhãn "Khá vững" của duong-cong-quen n36 và n50 có thể đủ "Vững chắc" (n36) hay yếu hơn (n50, lời khuyên ngủ giữa các buổi học chỉ dựa nghiên cứu giấc ngủ nói chung).
2. **Phong cách học, "Đã bị bác bỏ" so với g = 0,31** (Clinton-Lisell và Litzinger 2024, toàn văn): giữ nhãn vì khớp các trang đã khóa và các tác giả tự không khuyên áp dụng; n19 ghi rõ.
3. **Thiên não trái/phải (phong-cach-hoc n35)**: chỉ một nghiên cứu hình ảnh não lớn (Nielsen 2013); thẻ ngộ nhận `nao-trai-phai` chưa khóa (D8-L3).
4. **Coffield 2004 "71 mô hình"**: không mở được bản gốc (ERIC 404, ulb.be 403); dựa bài tổng quan McGill Journal of Education kể lại. Đề xuất trang viết "theo bài tổng quan kể lại" hay tìm bản gốc.
5. **Bảy bài báo chỉ có tóm tắt hoặc G1**: Cepeda 2006, Rowland 2014, Adesope 2017, Dunlosky 2013, Kornell 2009, Pashler 2008, Loftus 2005 (escholarship chặn bằng WAF, SAGE/APA 403, không có trong bộ Internet Archive). Câu "học ngắt quãng thắng một cách nhất quán" (duong-cong-quen n12) không có câu trích trực tiếp từ toàn văn Cepeda 2006; dựa Cepeda 2008 và G1.
6. **vi-sao-ta-quen n33**: chữ trong khung "Đang tranh cãi" nói mô hình khớp dữ liệu Dros không cho thấy bước nhảy, trong khi Bảng 3 cho thấy điểm 1 ngày của Dros cao hơn 9 giờ; cả hai đều đúng (một nói số liệu, một nói mô hình), nên giữ.

## Hình

- `duong-cong-quen` (hiển thị ở vi-sao-ta-quen): 14 giá trị, mốc, trục logarit khớp Bảng 3 của Murre và Dros; không cần sửa.
- `loftus-verbs` (bang-ghi-hinh): năm giá trị và nhãn khớp Bảng 1 của Loftus và Palmer (đã đọc toàn văn, nay hết "không kiểm được" của G1); không cần sửa.

## Cần người giao điền hay quyết

- `src/data/trang.yml`, bài mở rộng `phong-cach-hoc`: đề xuất `dua_tren: [kham-pha/tri-nho/duong-cong-quen]` (hai kỹ thuật được nhắc để thay thế; tùy chọn thêm `kham-pha/tri-nho/vi-sao-ta-quen`), `kiem_lai_truoc: 2028-05` (18 tháng; có thể 2027-11 nếu muốn 12 tháng).
- `src/data/nguon.yml`: nguồn mới cần bản ghi khi lô dùng (theo "Việc treo"): Nørby 2015 (10.1177/1745691615596787), Diekelmann và Born 2010 (10.1038/nrn2762), OpenStax Psychology 2e mục 8.3 (url), Rubin và Wenzel 1996 (10.1037/0033-295X.103.4.734), Blank và Launay 2014 (10.1037/h0101798), Lamb và cộng sự 2007 (10.1016/j.chiabu.2007.03.021), Nielsen và cộng sự 2013 (10.1371/journal.pone.0071275); các nguồn khác đã có (loftus1974, simons2011, cepeda2006/2008, roediger2006, rowland2014, dunlosky2013, kornell2009, klein2018, pashler2008, clintonlisell2024, coffield2004, dekker2012, hattie2025, newton2020, adesope2017). Chữ trong hồ sơ chỉ ghi `id` cục bộ.
- Link `/psyche/kham-pha/cang-thang-giac-ngu/ngu-va-tri-nho/` ở hai trang sẽ thành "sắp có" đến khi trang ấy lên.
- Khung bang-ghi-hinh n32 (`het_han` 2027-11-01) và các câu "chưa tìm thấy ở Việt Nam" (2028-11-01) cần máy canh ở đợt 9.

## Kiểm tra

`node tools/khoa.mjs khoa <trang>` chạy thử trên cả bốn trang: chỉ báo thiếu lượt 2, review, kiểm mẫu, `ve-site` chưa có `review`, và (phong-cach-hoc) `dua_tren`, `kiem_lai_truoc`; không báo lỗi định dạng hồ sơ. Không build, không chạy `npm test`. Không có khoảng trắng cuối dòng ở bốn trang.

## Nguồn hay dùng

Toàn văn: Loftus và Palmer 1974 (Internet Archive, bộ wikipedia-scholarly-sources-corpus), Simons và Chabris 2011 (PMC), Murre và Dros 2015 (PLOS), Roediger và Karpicke 2006 (Purdue), Cepeda 2008 (Internet Archive), Clinton-Lisell 2024 (PMC), Hattie 2025 (Springer), Dekker 2012, Newton 2020 (Frontiers), Klein 2018 (LSE), Nielsen 2013 (PLOS), Ebbinghaus chương 7 (psychclassics), OpenStax 8.3. Tóm tắt: Europe PMC, OpenAlex. Đã dùng User-Agent `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`, không gửi thông tin cá nhân.
