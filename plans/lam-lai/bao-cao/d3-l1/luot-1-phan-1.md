# D3-L1, lượt 1, phần 1/2: asch, milgram, darley-latane, khi-dot-vo-hinh

Model: Claude Sonnet 5.5 (agent lượt 1). Ngày 30/10/2026. Nhánh `moi/d3-l1`. Không build, không commit. Chạy `node tools/khoa.mjs xuat thi-nghiem/<trang>` cho cả bốn trang: đọc được. Trang không có khoảng trắng cuối dòng. Mọi trang đã thêm hộp hồ sơ nghiên cứu (`:::ho-so-nghien-cuu`, 4 dòng) và mục `doi_chu` cho hộp ấy và hộp `::tom-tat`.

## Số nhận định theo loại (tổng 227)

| Trang | Tổng | phat-hien | so-lieu | lich-su | tai-lap | dinh-nghia | nhan | loi-khuyen | thoi-su | ve-site |
|---|---|---|---|---|---|---|---|---|---|---|
| asch | 59 | 16 | 24 | 2 | 1 | 2 | 4 | 6 | 1 | 3 |
| milgram | 68 | 23 | 16 | 6 | 9 | 1 | 4 | 5 | 1 | 3 |
| darley-latane | 53 | 14 | 16 | 4 | 0 | 4 | 5 | 5 | 1 | 4 |
| khi-dot-vo-hinh | 47 | 15 | 18 | 0 | 0 | 3 | 3 | 4 | 1 | 3 |

Kết quả: dung 99, da-sua 93, da-lam-mem 9, da-bo 1, chưa quyết (`ket_qua: null`, ghi "chưa chắc") 25 (19 ở darley-latane, 4 milgram, 2 asch).

## Trang sai so với nguồn, đã sửa (chi tiết từng chỗ nằm ở `ghi_chu` của hồ sơ: chữ cũ, chữ mới, lý do)

**asch**
- Kịch bản tự trải nghiệm: bài 1956 có 2 lượt trung tính đầu, nhóm nói sai từ lượt 3 (trang viết lượt 4).
- "Nhóm 3 người đủ" và "một người nói đúng thì giảm mạnh" dẫn nhầm bài 1956: chúng thuộc Asch 1951/1955 (đã mở bản 1955). Thêm "còn khoảng một phần tư" (Asch 1955) và lưu ý B&S 1996 rằng quy mô nhóm vẫn có liên hệ với hùa theo.
- "Phản bác ý tưởng đám đông", "trẻ con cũng làm đúng", "Mỹ", "Asch tin con người độc lập", "phổ biến nhất", "biết nhóm sai", "hàng trăm lần", "thước đo chuẩn" (Franzen): không có trong nguồn; đã bỏ hay thay bằng số liệu có nguồn (Franzen và Mader 2023: 210 người, 33%; có thưởng tiền 25%).
- Ngộ nhận "người thiếu tự tin": thay bằng kết quả Franzen (tính cách, lòng tự trọng không dự đoán chắc chắn).
- Lời khuyên họp, mạng xã hội, Việt Nam: không nguồn; làm mềm, dùng Thí nghiệm 4 của Asch (viết thay vì nói công khai: lỗi còn khoảng một phần ba, 14 người).

**milgram**
- Bài 1963 không có tiếng kêu ở 150V: học trò im đến 300V (đập tường), rồi im hẳn; kêu từ 150V là Thí nghiệm 5 (Burger 2009 mô tả). 79% (26/33) và 82,5% là của Thí nghiệm 5, không phải bài 1963.
- Nấc 450V không ghi "Nguy hiểm: giật mạnh" (hai nấc cuối là XXX); áo choàng xám, không phải trắng; không có "ông Wallace"; không có "bác sĩ tâm thần dự đoán" trong bài 1963; 14 người dự đoán là sinh viên năm cuối, không phải "chuyên gia".
- Burger: 70 người là cả hai điều kiện; 70% là điều kiện cơ sở (28/40).
- Bridgeport: 47,5% so với 62,5% ở Yale (không phải 65%). Biến thể "một người phản đối" thực ra hai người cộng tác từ chối: 4/40 vâng lời.
- Perry 2012 (sách, chưa mở): bỏ câu "chọn lọc"; thay bằng Perry và cộng sự 2019 (18/23 biến thể: người tin hoàn toàn giật ở mức thấp hơn).
- Doliński 2017: chỉ có tóm tắt Crossref và thông cáo SPSP.

**darley-latane**
- "Kitty Genovese" đổi từ Đang tranh cãi sang Đã bị bác bỏ (Manning và cộng sự 2007: không có bằng chứng cho 38 nhân chứng, cho việc họ nhìn thấy, hay đứng yên); bỏ "báo chí thổi phồng", "có gọi điện".
- "Lửa cháy thì xông vào" mạnh hơn Fischer ("attenuated"); "huấn luyện cho thấy can thiệp nhiều hơn hẳn" không nguồn; đoạn Việt Nam viết lại (không nguồn cho clip, báo chí, quy định pháp lý). Thêm Philpot 2020 (219 xung đột quay camera: 9/10 có người giúp; đông người thì dễ có ai giúp) vào Vững chắc và Ngộ nhận.

**khi-dot-vo-hinh**
- 46% (192 người, mọi điều kiện) và 58% (đội trắng, video thường, đếm tổng) thay "cứ hai người thì một người"; bỏ "đều sững sờ".
- Simons và Levin 1998: "7/15, hỏi đường, cánh cửa, 5 cm, hai người khiêng" không có trong tóm tắt: bỏ; chỉ giữ "khoảng một nửa" và nhóm xã hội. Levin và Simons 1997: bỏ "đổi áo, đạo cụ", dùng tóm tắt.
- Hyman 2010 ("sân trường", "hẳn", "sặc sỡ", "huống chi lái xe"); "vô số tai nạn" (Herslund 2003 nói xe đạp, Đan Mạch); "thiết kế an toàn, checklist", "ghi chép ngay", Việt Nam "phòng thí nghiệm khổng lồ", "multitask": không nguồn, đã bỏ hay thay bằng Caird 2014, Drew 2013, Ekelund 2022, Chabris 2011, Nobre 2020.
- Khung Đang tranh cãi (nhân chứng): không nguồn cho "một số nhà nghiên cứu cảnh báo"; đổi thành Khá vững dựa trên Chabris 2011.

## Chỗ chưa chắc, chỗ khó (người giao quyết)

1. **Latané và Darley 1968 (thí nghiệm khói), Latané và Darley 1970 (mô hình 5 bước), định nghĩa vô tri tập thể**: không mở được bài gốc (psycnet chặn, không có bản sao). 19 nhận định ở darley-latane để `null`: số 75%/38%/10%, mô hình 5 bước, vô tri tập thể, các lời khuyên "chỉ đích danh". Số liệu khớp mô tả nhất quán ở nguồn bậc 3. Cần toàn văn hay giao lượt 2.
2. **Hình**: `src/hinh/milgram-obedience.html` ghi "đập tường đòi được thả" (bài 1963: đập tường và ngừng trả lời) và dán 79% dưới nhãn "Milgram (1963)" (79% là của Thí nghiệm 5). `src/hinh/bystander-smoke.html` có số khói (chưa kiểm). Tôi không sửa hình (ngoài phạm vi); người giao sửa.
3. **Nhãn Vững chắc** (cần xét hạ xuống Khá vững): asch (có tổng hợp lớn nhưng chưa mở tái lập đăng ký trước), milgram (tổng hợp là số liệu của chính Milgram, hai lần làm lại đều giảm nhẹ, Perry 2019 chất vấn), darley-latane (Fischer chỉ đọc tóm tắt; Philpot gợi ý thận trọng), khi-dot-vo-hinh (tổng hợp Ekelund là về chuyên môn, không đo hiệu ứng khỉ đột).
4. **Đổi nhãn**: darley-latane Kitty Genovese (tranh cãi → bác bỏ, một nguồn Manning 2007) và khi-dot-vo-hinh (tranh cãi → khá vững). Asch Đang tranh cãi (méo tri giác) chỉ dựa lập luận của chính Asch (không nguồn hiện đại).
5. **Định nghĩa ảnh hưởng thông tin** (Deutsch và Gerard 1955) và định nghĩa APA Dictionary (trang dựng bằng JavaScript, không tải được): asch có 1 nhận định `null`.
6. **Lời khuyên không nguồn** (để `null`, người giao giữ có nguồn, làm mềm, hay bỏ): milgram (giả danh công an, biết trước 4 câu thúc ép), darley-latane (chỉ đích danh, đặt tên tình huống), asch (đánh giá mạng xã hội, ví dụ đánh giá nhà hàng).
7. **Dữ liệu dùng chung** (không sửa): `src/data/nguon.yml` có `dolinski2017` ghi 8(3), 282–289, không DOI; Crossref: SPPS 8(8), 927–933, DOI 10.1177/1948550617693060. `perry2012` (sách) chưa mở. Chưa có `levin1997`, `levin2000`, `haslam2014meta`, `perry2019`, `manning2007`, `philpot2020`, `asch1955`, `chabris2011`, `drew2013`, `ekelund2022`, `nobre2020`, `caird2014`, `herslund2003`: danh sách nguồn của trang viết tay đã thêm; nếu muốn `::nguon{id=…}` thì thêm vào `nguon.yml`.
8. Thời sự "chưa tìm thấy nghiên cứu ở Việt Nam" (bốn trang): tìm PubMed và Crossref ngày 30/10/2026, `het_han: 2028-10-01`. Chưa tìm Google Scholar hay tạp chí trong nước.
9. Asch (1955) *Scientific American* 193(5), 31–35: số tập và trang ghi theo trí nhớ, chưa kiểm; đã đọc bản đăng lại ở panarchy.org (bản đăng lại, nội dung của chính Asch).

## Nguồn đã mở (toàn văn: T; tóm tắt: A)

- T: Asch 1956 (bản quét có chữ, eclass.uowm.gr), Asch 1955 (panarchy.org), Bond và Smith 1996 (PDF), Milgram 1963 (psy.miami.edu), Burger 2009 (PDF), Darley và Latané 1968 (pdf.stafforini.com), Simons và Chabris 1999 (chabris.com), Haslam, Loughnan và Perry 2014 Meta-Milgram (Europe PMC XML).
- A: Franzen và Mader 2023, Fischer 2011, Philpot 2020, Manning 2007, Haslam 2014 BJSP, Reicher 2012, Drew 2013, Ekelund 2022, Nobre 2020, Chabris 2011, Caird 2014, Herslund 2003 (PubMed); Perry 2019, Hyman 2010, Doliński 2017 (Crossref, kèm thông cáo SPSP); Simons và Levin 1998, Levin và Simons 1997 (Illinois Experts); Levin 2000 (chỉ nhan đề).
- Không mở được: Latané và Darley 1968 (khói), Latané và Darley 1970, Asch 1951, Milgram 1974/1965, Blass 1999, Perry 2012 (sách), Deutsch và Gerard 1955, APA Dictionary.
- Gốc hồ sơ dùng để đối chiếu (script, văn bản tải về) nằm ở thư mục tạm của phiên, không ở repo.
