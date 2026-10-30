# Kế hoạch phát triển bền vững: lõi kiểm một lần rồi khóa, phần thêm mới chỉ kiểm phần mới

*Đã duyệt ngày 29/10/2026 (chủ repo đồng ý kế hoạch và các bước). Bản gốc: `../psyche-zero/plans/kien-truc-ben-vung.md` (đề xuất 23/10/2026, viết cho site MkDocs); bản này chuyển sang site mới (Astro, công cụ khóa của opus) và là bản chuẩn. Kế hoạch làm lại theo đợt: `../lam-lai/README.md`.*

## 0. Tóm tắt

**Vấn đề.** Ở site cũ, sửa xong vẫn phải đọc lại để biết còn gì sai, vì: (1) trạng thái kiểm chứng không gắn vào nội dung, (2) cùng một sự thật nằm ở nhiều nơi, (3) phần bất biến và phần hay đổi nằm chung một đoạn văn, (4) mọi thay đổi (kể cả thêm link, thêm tin mới) đều sửa thẳng vào bài.

**Cách giải, sáu ý:**

1. **Ba tầng nội dung.** *Nền tảng* (chủ đề, thí nghiệm kinh điển và phương pháp): kiểm kỹ một lần rồi **khóa**. *Mở rộng* (chủ đề ứng dụng, thời sự, bằng chứng còn biến động): thêm tự do, mỗi bài kiểm riêng, có hạn xem lại. *Dòng cập nhật* (bổ sung bằng chứng mới, bổ sung về Việt Nam, Nghiên cứu mới): chỉ thêm, có ngày, không sửa ngược.
2. **Ba loại khẳng định.** *Lịch sử* (nghiên cứu X năm Y làm gì, thấy gì): khóa vĩnh viễn. *Nhận định* (nhãn, kết luận hiện hành): chỉ xem lại khi có sự kiện (rút bài, tái lập lớn, phân tích tổng hợp mới). *Thời sự* (số liệu, xếp hạng, "chưa tìm thấy nghiên cứu ở Việt Nam"): ghi mốc thời gian và hạn dùng.
3. **Hồ sơ kiểm định đi kèm từng trang** (`kiem-dinh/<trang>.yml`): khẳng định → nguồn → câu trích nguyên văn → kết quả của hai lượt → mọi nơi khẳng định đó xuất hiện. Thay cho báo cáo văn xuôi tham chiếu số dòng (số dòng trôi ngay sau lần sửa đầu tiên).
4. **Khóa bằng mã băm.** Trang đã kiểm có mã băm trong `kiem-dinh/khoa.json`; trang bị sửa mà không qua thủ tục mở khóa thì build hỏng. "Đã kiểm" trở thành điều máy xác nhận được.
5. **Phần hay đổi nằm ngoài văn bản đã khóa**: link sang chủ đề mở rộng, bổ sung bằng chứng mới, bổ sung Việt Nam, dòng trạng thái kiểm chứng, danh sách bài của lĩnh vực đều sinh lúc build từ dữ liệu. Thêm một bài mở rộng hay một bổ sung không đụng vào trang lõi nào.
6. **Máy canh thay người đọc lại.** Hằng tuần: rút bài, đính chính của các DOI đang dẫn; khẳng định hết hạn; link hỏng. Hằng quý (tùy chọn): phân tích tổng hợp mới trích dẫn nguồn then chốt. Máy chỉ ra đúng trang, đúng khẳng định cần xem; phần còn lại không phải đọc.

**Mục tiêu thực tế** không phải "không bao giờ kiểm lại": khoa học thay đổi, và chính lô G1-L04 của site cũ thấy một hiệu ứng bất hòa nhận thức kinh điển đã thất bại trong đợt tái lập ở 39 phòng thí nghiệm năm 2024. Mục tiêu là **không bao giờ phải đọc lại cả site để biết có cần sửa hay không**: phần lịch sử khóa hẳn, phần nhận định chỉ mở lại khi có cờ, phần thời sự tự báo khi hết hạn. Chi phí bảo trì tỉ lệ với lượng thêm mới, không tỉ lệ với kích thước site.

## 1. Vì sao phải làm lại

### 1.1 Quy mô site cũ (rà soát ngày 23/10/2026)

| Phần | Số trang | Ghi chú |
|---|---|---|
| Khám phá | 51 bài, 12 nhóm | 4 bài Sức khỏe tâm thần mang cờ chờ rà soát chuyên môn |
| Thí nghiệm kinh điển | 15 | khung 10 mục |
| Hiểu bằng chứng | 12 | 9 bài lệch khung, chưa có câu hỏi |
| Tự trải nghiệm | 11 công cụ | số liệu nghiên cứu nằm cả trong file JavaScript |
| Ngộ nhận | 60 thẻ | dữ liệu `myths.json`: nội dung và nguồn đã tách khỏi trình bày |
| Bắt đầu, Hỗ trợ, Thêm | 3 + 1 + 5 | Hỗ trợ có ngày kiểm và nhắc kiểm hằng quý |
| Sách in, Tờ tóm tắt, trang Ngộ nhận | sinh tự động | đang được commit vào git |

### 1.2 Chất lượng nội dung: kết quả G1-L01→L04 (27 bài)

| Lô | Khẳng định | Khớp | Không kiểm được | Sai | Đáng ngờ |
|---|---|---|---|---|---|
| L01 Trí nhớ, Trí tuệ | 128 | 87 | 16 | 9 | 16 |
| L02 Tư duy | 85 | 53 | 9 | 14 | 9 |
| L03 Chú ý–tri giác, Tính cách | 173 | 128 | 22 | 13 | 10 |
| L04 Tâm lý xã hội, Cảm xúc–động lực | 221 | 170 | 25 | 15 | 11 |
| **Tổng** | **607** | **438 (72%)** | **72 (12%)** | **51 (8%)** | **46 (8%)** |

Khoảng **1/6 khẳng định sai hoặc đáng ngờ**, trong những bài từng mang dòng "đã rà soát". Kiểu lỗi lặp lại: ghép số của hai thí nghiệm khác nhau; gán phát hiện cho nhầm nghiên cứu hay nhầm người; kể sai thiết kế; nhãn mạnh hơn bằng chứng; chưa cập nhật các lần tái lập thất bại; bản tóm tắt không đúng nguồn; "đập ngộ nhận" quá tay.

### 1.3 Bảy nguyên nhân gốc

1. **Nội dung được sinh nhanh hơn được kiểm.** Gần như toàn bộ 78 bài, 11 công cụ và 60 thẻ được commit trong buổi chiều 13/10/2026; kiểm chứng đi sau nên phải quét lại toàn site.
2. **Trạng thái kiểm chứng không gắn vào nội dung.** Mọi lần sửa sau đó (một script chèn link hàng loạt, một agent sửa nhầm) đều lặng lẽ làm mất hiệu lực kiểm chứng mà không ai biết.
3. **Độ sâu kiểm chứng không đồng nhất** ("chế độ tiết kiệm" ở vài bài), mà không ghi mức kiểm cho từng bài.
4. **Một sự thật nằm ở nhiều nơi:** thân bài, câu hỏi, khung nhãn, thẻ ngộ nhận, JavaScript của công cụ, dữ liệu hình, cộng bản sao trong Sách in. 63 DOI được dẫn ở từ 2 nơi trở lên; khoảng 20 nghiên cứu được nhắc ở từ 3 trang trở lên. Lỗi vì thế lan.
5. **Phần bất biến và phần hay đổi trộn lẫn:** 63 cụm "hiện nay, mới nhất, gần đây, xếp hạng" trên 29 trang; 70 mục "Ở Việt Nam" có câu "chưa tìm thấy nghiên cứu", vốn chỉ đúng tới một ngày nhất định.
6. **File sinh tự động nằm trong git** (`docs/sach/index.md` đổi trong 16/25 commit).
7. **Kiểm thử khung chỉ phủ danh sách liệt kê tay**, nên bài sai khung lọt qua.

### 1.4 Giữ lại từ site cũ

Khung bài thống nhất và bốn nhãn; `myths.json` (mô hình "thêm một thẻ thì chỉ kiểm thẻ đó"); dữ liệu hình; 363 DOI đã khớp Crossref; quy trình G1 (xếp loại, bắt buộc trích nguyên văn); trang Hỗ trợ có ngày kiểm và nhắc định kỳ.

## 2. Nguyên tắc

1. **Ba tầng**, xác định bằng dữ liệu (`tang` trong `src/data/trang.yml`), không bằng thư mục: không đổi địa chỉ.
   - *Nền tảng* (`loi`): chủ đề và nghiên cứu kinh điển của giáo trình nhập môn, bằng chứng đã chín. Điều kiện vào: kiểm định V3 (`chuan-kiem-dinh.md` mục 3). Sau khi khóa, chỉ thay đổi qua *bổ sung* hay *tái lập mốc* (`them-noi-dung.md`).
   - *Mở rộng* (`mo-rong`): chủ đề ứng dụng, thời sự, hay bằng chứng còn biến động nhanh. Điều kiện vào: tối thiểu V2. Có hạn xem lại `kiem_lai_truoc` (12–18 tháng).
   - *Dòng cập nhật* (`cap-nhat`): bổ sung bằng chứng mới, bổ sung về Việt Nam, Nghiên cứu mới, Cập nhật. Mỗi mục có ngày, kiểm riêng, chỉ thêm; sai thì đính chính bằng một mục mới.
   - Ngoài ba tầng nội dung: `cong-cu` (công cụ: số liệu trong mã vào hồ sơ), `co-han` (thông tin có hạn như số liên hệ của Hỗ trợ), `du-lieu` (trang sinh từ bản ghi đã khóa), `khung` (mục lục, trang sinh, trang về site).
2. **Ba loại khẳng định**: lịch sử (khóa vĩnh viễn), nhận định (xem lại theo sự kiện), thời sự (có hạn dùng, viết kèm mốc thời gian, ví dụ "Tính đến 11/2026, chúng tôi chưa tìm thấy…").
3. **Mỗi nghiên cứu một trang nhà.** Nghiên cứu kinh điển được kể chi tiết ở đúng một trang (thường là trang Thí nghiệm hay bài lõi chính). Nơi khác chỉ tóm một câu, không thêm con số mới, và link về nhà.
4. **Kiểm chứng gắn vào nội dung**: hồ sơ và mã băm.
5. **Phần hay đổi nằm ngoài văn bản đã khóa**, sinh lúc build.
6. **Máy canh, người kiểm theo cờ.** Không quét lại toàn site theo lịch.
7. **Người viết khác người kiểm.** Agent hay phiên viết bài không làm lượt 2 cho bài của mình.

## 3. Bản đồ Nền tảng

Đã duyệt 29/10/2026. Xếp theo khung giáo trình nhập môn (như OpenStax *Psychology 2e*). "TN" là trang Thí nghiệm kinh điển. Mã lĩnh vực và trang của từng lô: `../lam-lai/anh-xa.md`.

| Lĩnh vực nền tảng | Lõi | Mở rộng | Chỗ trống kinh điển (thêm dần sau đợt 9) |
|---|---|---|---|
| 1. Tâm lý học là gì, phương pháp | 12 bài Hiểu bằng chứng; Cách đọc nhãn; Bạn nghĩ gì về tâm trí? | | Lịch sử và các trường phái (Wundt, James, Freud, hành vi, nhận thức, nhân văn) |
| 2. Cơ sở sinh học | nao-che-doi, gen-va-tinh-cach, nao-tuoi-teen, tam-ly-tien-hoa | dopamine, the-duc-nao | Neuron và chất dẫn truyền thần kinh; tính dẻo của não |
| 3. Cảm giác, tri giác, chú ý | ao-giac-thi-giac, nhin-ma-khong-thay, nghe-chon-loc; TN Khỉ đột vô hình | da-nhiem-so | Tri giác là suy đoán (xử lý từ trên xuống) |
| 4. Ý thức và giấc ngủ | ngu-va-tri-nho, giac-mo | | Giấc ngủ và nhịp sinh học; thôi miên, thiền |
| 5. Học tập | TN Pavlov, Skinner, Bandura, Little Albert, Seligman | | Bài tổng quan về điều kiện hóa (tùy chọn) |
| 6. Trí nhớ | vi-sao-ta-quen, bang-ghi-hinh, duong-cong-quen, tri-nho-lam-viec | phong-cach-hoc | |
| 7. Tư duy, ngôn ngữ, trí tuệ | thien-kien-xac-nhan, linh-cam-va-xac-suat, tu-duy-nhanh-cham, tin-dieu-vo-ly, tri-tue-la-gi, hieu-ung-flynn | dunning-kruger | Ngôn ngữ có định hình tư duy?; giải quyết vấn đề |
| 8. Phát triển suốt đời | tre-hoc-the-nao, tre-hoc-noi, gan-bo, ban-sac-tuoi-teen, tuoi-gia; TN Harlow, Kẹo dẻo | mang-xa-hoi-teen, tam-ly-hoc-duong | Thuyết tâm trí; phát triển đạo đức |
| 9. Cảm xúc và động lực | cam-xuc-co-ban, thuong-va-dong-luc, dieu-tiet-cam-xuc; TN Schachter–Singer | tri-tue-cam-xuc | Nhu cầu và động lực (từ Maslow tới thuyết tự quyết) |
| 10. Tính cách | big-five, tinh-cach-thay-doi | mbti | Các cách tiếp cận tính cách |
| 11. Tâm lý xã hội | phu-hop-so-dong, bat-hoa-nhan-thuc, thuyet-phuc, dinh-kien; TN Milgram, Asch, Darley–Latané, Zimbardo, Robbers Cave, Pygmalion | | Lỗi quy kết cơ bản; hấp dẫn và các mối quan hệ |
| 12. Căng thẳng và sức khỏe | doi-pho-stress | stress-co-hai | Hiệu ứng giả dược |
| 13. Hạnh phúc | do-hanh-phuc | tien-va-hanh-phuc, dong-chay-flow | |
| 14. Sức khỏe tâm thần, trị liệu | tram-cam, lo-au, tri-lieu-tam-ly, tim-giup-do (khóa sau khi chuyên gia đọc) | | Thế nào là rối loạn tâm thần (ICD, DSM, kỳ thị); sang chấn (cần chuyên gia) |

Kết quả: **68 trang lõi** (39 bài Khám phá, 15 Thí nghiệm, 12 Hiểu bằng chứng, Cách đọc nhãn, Bạn nghĩ gì về tâm trí?), **12 bài mở rộng**, 11 công cụ, khoảng 18 chỗ trống kinh điển (ứng viên, không bắt buộc làm hết).

## 4. Cơ chế kỹ thuật trên site mới

Làm ở đợt 1 của kế hoạch làm lại (`../lam-lai/README.md`); công cụ khóa và kiểm thử chép từ opus rồi sửa.

### 4.1 Frontmatter (D1.2)

```yaml
ma: tn-asch                # mã ổn định, không đổi khi đổi tên file
loai: thi-nghiem           # kham-pha | thi-nghiem | phuong-phap | cong-cu | suc-khoe | trang
linh_vuc: tam-ly-xa-hoi    # một trong 14 mã của src/data/linh-vuc.yml
dua_tren: [kp-phu-hop-so-dong]   # chỉ trang mở rộng: bài lõi mà nó dựa trên
can_ra_soat: false         # chỉ trang Sức khỏe tâm thần: true cho tới khi chuyên gia đọc
```

Tầng và hạn xem lại nằm trong `src/data/trang.yml`, trạng thái kiểm định đọc từ `kiem-dinh/` lúc build: không ghi trong trang, để mã băm của trang không đổi khi khóa. Dòng trạng thái trên trang sinh lúc build, ví dụ "Nền tảng · Kiểm chứng hai lượt, khóa ngày 05/11/2026 · 1 bổ sung (03/2027)". Bỏ dòng "Rà soát nội dung lần cuối" viết tay của site cũ.

### 4.2 Hồ sơ kiểm định (D1.6)

Mỗi trang một file `kiem-dinh/<trang>.yml`; định dạng ở `chuan-kiem-dinh.md` mục 6. Mỗi khẳng định có loại, nguồn, câu trích nguyên văn, vị trí trong nguồn, kết quả của hai lượt, và `o_dau`: mọi nơi khác khẳng định ấy xuất hiện kèm chuỗi bắt buộc có. Kiểm thử đọc hồ sơ: mọi nguồn có trong `src/data/nguon.yml`; mọi chuỗi trong `o_dau` có mặt trong file tương ứng (sửa con số ở một nơi mà quên nơi khác thì kiểm thử đỏ, chỉ đúng chỗ); trang lõi không còn mục chưa xử lý.

### 4.3 Dữ liệu dùng chung (D1.2, khóa ở D2-0)

`src/data/nguon.yml` (khóa, DOI hay URL, tác giả, năm, tên bài, nơi đăng, có toàn văn không, trạng thái rút bài, trang nhà), `nghien-cuu.yml` (hồ sơ nghiên cứu kinh điển), `linh-vuc.yml`, `trang.yml`, `ngo-nhan.yml`. Mục Nguồn của từng trang vẫn viết như hiện nay; kiểm thử đối chiếu với danh mục. Bản ghi khóa từng phần, chỉ các trường đã kiểm định (như opus).

### 4.4 Khóa (D1.6)

- `kiem-dinh/khoa.json` ánh xạ trang hay bản ghi → mã băm SHA-256, tính trên nguồn đã chuẩn hóa (`chuan-kiem-dinh.md` mục 7).
- `tools/khoa.mjs`: `mau` (hồ sơ mẫu), `khoa` (kiểm hồ sơ đủ rồi ghi mã băm), `tinh` (kiểm mọi mục đã khóa), `mo --ly-do` (mở khóa, ghi lý do), `xuat` và `nhap` (danh sách cho lượt 2 và kết quả của nó).
- Bản build thật chỉ đưa trang đã khóa; trang đã khóa mà đổi thì build hỏng, kèm cách mở khóa.

### 4.5 Phần động sinh lúc build

- **Chủ đề mở rộng liên quan:** chỉ mục ngược từ `dua_tren` của các trang mở rộng. Thêm bài mở rộng mới thì trang lõi tự có link mà không bị sửa.
- **Bổ sung:** `src/content/bo-sung/<trang lõi>/<yyyy-mm>-<tên>.md`, mỗi file ngắn, có hồ sơ riêng, có `loai: bang-chung-moi | viet-nam | dinh-chinh` và `anh_huong_nhan: true/false`. Thành phần chèn thành khung "Cập nhật tháng 03/2027" ở cuối mục tương ứng và tự liệt kê ở trang Cập nhật. `anh_huong_nhan: true` thì khung hiện ngay đầu bài và trang lõi vào hàng đợi tái lập mốc.
- **Trang lĩnh vực, trang chủ, mục lục:** sinh từ `trang.yml`, chỉ trang đã khóa.
- **Sách in, Tờ tóm tắt, trang Ngộ nhận:** sinh lúc build; không commit file sinh.

### 4.6 Kiểm thử theo loại trang và chỉ kiểm phần đổi

- Kiểm thử khung chạy cho **mọi** trang theo `loai`, không có danh sách liệt kê tay.
- Kiểm thử phạm vi lô (D1.6) và CI: trang đã khóa bị đổi thì phải có mở khóa và hồ sơ mới; trang, bổ sung hay thẻ mới thì phải có hồ sơ, không còn mục chưa xử lý. Kiểm sâu (Crossref, hồ sơ) chỉ chạy cho phần đổi.

### 4.7 Máy canh hằng tuần (đợt 9, GitHub Actions)

1. **Rút bài, đính chính:** đối chiếu danh sách DOI với bộ dữ liệu Retraction Watch mà Crossref phát hành mở, cộng cờ `is_retracted` của OpenAlex (chỉ là tín hiệu: từng gắn nhầm bài chỉ có đính chính). Có khớp thì mở issue nêu nguồn, các khẳng định trong hồ sơ và các trang bị ảnh hưởng.
2. **Hết hạn:** khẳng định thời sự có `het_han`, trang mở rộng có `kiem_lai_truoc`, số liên hệ của Hỗ trợ: mở issue trước 30 ngày.
3. **Link hỏng.**
4. **Tùy chọn, hằng quý:** với nguồn then chốt của mỗi trang lõi, hỏi OpenAlex các tổng quan, phân tích tổng hợp trích dẫn nó kể từ ngày kiểm; ra danh sách ứng viên cho bổ sung.

Máy ảo của Cowork không gọi được api.crossref.org và api.openalex.org; máy chủ repo và GitHub Actions gọi được.

## 5. Vận hành sau khi làm lại

| Nhịp | Việc |
|---|---|
| Mỗi lần push | Kiểm thử nhanh toàn site (khung, khóa, hồ sơ, link nội bộ); kiểm sâu chỉ phần đổi; kiểm thử trình duyệt và Lighthouse trên trang mẫu, song song |
| Hằng tuần | Máy canh (mục 4.7) |
| Hằng quý | Hỗ trợ (số liên hệ), Nghiên cứu mới, xử lý issue của máy canh, danh sách bằng chứng mới (tùy chọn) |
| Hằng năm | Duyệt bài mở rộng tới hạn; trang lõi đã tích từ 3 bổ sung thì tái lập mốc |
| Hằng tháng | Nâng phiên bản gói trên nhánh riêng (`../lam-lai/cong-nghe.md` mục 2) |

Thêm và cập nhật nội dung: `them-noi-dung.md`.

## 6. Bổ sung về Việt Nam: tách khỏi kiểm chứng

70 mục "Ở Việt Nam" của site cũ ghi "chưa tìm thấy". Lô chuyển trang chỉ đổi câu đó sang dạng có mốc thời gian ("Tính đến 11/2026…", loại thời sự, có hạn) rồi khóa. Việc tìm nghiên cứu Việt Nam chạy riêng, sau đợt 9 hay xen giữa các đợt khi rảnh, ưu tiên các chủ đề có khả năng có dữ liệu (thụ đắc thanh điệu ở trẻ nói tiếng Việt; dùng điện thoại khi lái xe máy; khảo sát quốc gia về sức khỏe tâm thần vị thành niên; nghiên cứu đa quốc gia có mẫu Việt Nam). Đây mới là hướng tìm, chưa được kiểm chứng. Mỗi phát hiện là một bổ sung `loai: viet-nam`, kiểm riêng; trang lõi không phải mở khóa.

## 7. Không làm

- Không đổi địa chỉ trang (tầng là dữ liệu).
- Không sửa thẳng trang lõi đã khóa để thêm link, tin mới hay nghiên cứu Việt Nam: dùng bổ sung và phần động.
- Không quét lại toàn site theo lịch.
- Không viết bài mới trước khi khung (đợt 1) xong: bài viết theo khuôn cũ sẽ phải chuyển lại.
- Không sửa site cũ.
