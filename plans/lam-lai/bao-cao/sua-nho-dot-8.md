# Sửa nhỏ đợt 8 (mo/sua-nho-dot-8, 17/11/2026)

Mở khóa các trang đã khóa có chỗ lệch phát hiện khi làm đợt 8 (review công cụ, thẻ ngộ nhận) và một mục trong "Việc treo". Lượt 1: Claude Opus 5.5 (một agent, không dùng agent con). Nguồn chỉ mở theo đường công khai bình thường (Europe PMC, PMC, OpenAlex, Crossref, trang tạp chí khi bài mở, bản PDF tác giả); không dùng bản lưu Internet Archive.

**Trạng thái khóa:** năm trang đã mở (`node tools/khoa.mjs mo`) và **chưa khóa lại**. Bốn trang có câu cần lượt 2. Trang thứ năm (`bang-chung/dao-duc-nghien-cuu`, chỉ đổi chữ dịch) cũng chưa khóa được: công cụ khóa đòi `nguoi.review` và `nguoi.kiem_mau` ở lần mới, mà lời giao bảo để trống hai trường ấy. Khi người giao điền review (và kiểm mẫu, hay ghi "không cần" như tiền lệ `bang-chung/mau-va-chon-mau` lần 2) thì `node tools/khoa.mjs khoa bang-chung/dao-duc-nghien-cuu` là đủ. Trước khi gộp vào `main`, mọi trang phải khóa lại (chuẩn mục 8): bản thật hiện không có năm trang này.

Câu đã sửa cho lượt 2: 11 câu ở `plans/lam-lai/bao-cao/sua-nho-dot-8-nhan-dinh.yml` (10 câu cần lượt 2, cộng e4 chỉ đổi chữ dịch, để người giao chọn). Ở các câu bị chạm, đã xóa `luot_2`, `review` cũ để công cụ khóa đòi kết quả mới.

## 1. Ảo giác thị giác: tên gọi vòng tròn Titchener

- Trang: `kham-pha/chu-y-tri-giac/ao-giac-thi-giac`. Chữ cũ: "Vòng tròn Ebbinghaus (còn gọi là vòng tròn Titchener)", hồ sơ n9 dựa Wikipedia ("Titchener popularized it … in a 1901 psychology textbook").
- Sửa: bỏ ngoặc; thêm câu "Hình mang tên Hermann Ebbinghaus, người có lẽ đưa ra nó từ những năm 1890; trong tiếng Anh hình còn được gọi là "vòng tròn Titchener", nhưng Edward B. Titchener không tạo ra hình này và cũng không nhận là của mình (Burton, 2001)", link sang công cụ Ảo giác Ebbinghaus; thêm Burton 2001 vào Nguồn. Cùng nội dung với `trai-nghiem/ebbinghaus` (hồ sơ n2); không nêu năm 1901, 1957.
- Nguồn: Burton (2001), tóm tắt (OpenAlex, mở 17/11/2026): "Ebbinghaus probably introduced this illusion in the 1890s, although not in any explicit publication, and Titchener neither had nor asserted any authorship of this figure". Toàn văn (APA) không mở được.
- Hồ sơ: n9 (chỉ còn mô tả hình, `dinh-nghia`, bỏ nguồn wiki-eb), n50 mới (`lich-su`). Lượt 2: n9, n50.

## 2. Trí tuệ cảm xúc: ρ ≈ .17

- Trang: `kham-pha/cam-xuc-dong-luc/tri-tue-cam-xuc`. Bài Joseph & Newman (2010) đóng (OpenAlex: `closed`, không có bản kho; Europe PMC chỉ có tóm tắt). Bảng 4 trước đây đọc qua bản lưu Internet Archive, không còn được dùng; nguồn kể lại ghi .16 hay .18. Không đọc được số trong nguồn mở, nên viết ở mức tóm tắt, như thẻ ngộ nhận `eq-hon-iq`.
- Sửa: đoạn Joseph và Newman (2010), "Thứ hai": bỏ ρ ≈ .17 và .42; viết "liên hệ giữa EQ năng lực và hiệu suất không nhất quán (dương ở công việc nhiều lao động cảm xúc, âm ở công việc ít lao động cảm xúc)", còn EQ mixed "theo Joseph và cộng sự (2015) kể lại, hệ số hiệu chỉnh trong bài này là ρ = .47". Khung Đang tranh cãi: bỏ ρ ≈ .17, ≈ .40 (năng lực nhận thức), ≈ .42; viết theo tóm tắt hai bài (β = -.02 khi kiểm soát đúng danh sách khái niệm của tóm tắt 2015). Nhãn giữ Đang tranh cãi; `ly_do` của n70 viết lại không dùng các số ấy.
- Nguồn: tóm tắt Joseph & Newman 2010 (Europe PMC, PMID 20085406): "relationships between ability-based EI and job performance are shown to be inconsistent (i.e., EI positively predicts performance for high emotional labor jobs and negatively predicts performance for low emotional labor jobs)"; tóm tắt Joseph và cộng sự 2015 (PMID 25243996): "(e.g., ρ = .47; Joseph & Newman, 2010b)", "multiple R = .79", "ρ = .29", "becomes nil (β = -.02)".
- Hồ sơ: n43, n72 (`da-sua`), n70 (ly_do). Lượt 2: n43, n70, n72.

## 3. Linh cảm và xác suất: cách hiểu "không phải nhà hoạt động nữ quyền"

- Trang: `kham-pha/tu-duy/linh-cam-va-xac-suat`. Chữ cũ gán cách hiểu "(a) = nhân viên ngân hàng và không phải nhà hoạt động nữ quyền" là "một dạng" cách hiểu từ ngữ của Hertwig (khung Đang tranh cãi), và mục Lý thuyết gán "hai nhóm loại trừ nhau" cho Gigerenzer và Hertwig.
- Sửa: khung: "Một giả thuyết khác, của một số tác giả như Adler, Dulany và Hilton, Politzer và Noveck (theo Hertwig và Gigerenzer, 1999) … theo Hertwig và Gigerenzer, các dự đoán rút từ giả thuyết này chưa được xác nhận." Câu sau của khung đã có Chandrashekar 2021 "không ủng hộ giả thuyết mơ hồ ngữ nghĩa". Mục Lý thuyết: Gigerenzer và Hertwig chỉ còn ý về nghĩa của "xác suất" và "và"; giả thuyết "loại trừ nhau" quy cho "một số tác giả khác", Tversky và Kahneman đã thử, chưa được xác nhận. Thêm Hertwig & Gigerenzer 1999 vào Nguồn. Khớp công cụ `trai-nghiem/linda` (n11).
- Nguồn: Chandrashekar và cộng sự 2021, toàn văn (open.lnu.se, Meta-Psychology, mở 17/11/2026): "participants' understanding of natural language words such as "probability" and "and" diverged from that of experimenters (e.g., Hertwig & Gigerenzer, 1999)", "We found no support for semantic ambiguity". Hertwig & Gigerenzer 1999, tr. 296–297: câu trích theo hồ sơ `trai-nghiem/linda.yml` n11 (review đã mở toàn văn hôm nay). **Lượt 1 lần này không mở lại được** bản PDF ở pure.mpg.de (403, trang kiểm tra bot); không đi đường vòng. Lượt 2 nên tự mở.
- Hồ sơ: n38 (nhãn giữ, thêm `hertwig1999` vào cơ sở), n73, n74 mới. Lượt 2: n38, n73, n74.

## 4. Nhãn hiệu ứng độ dài từ

**Hiện trạng.** `trai-nghiem/tri-nho-tu` (n5): Khá vững. `kham-pha/tri-nho/tri-nho-lam-viec` (n35): khung Vững chắc "trí nhớ ngắn hạn cho lời nói phụ thuộc mạnh vào âm thanh của từ" gộp hiệu ứng tương tự âm và hiệu ứng độ dài từ. `trai-nghiem/do-dai-tri-nho`: đã soát, **không có nhãn nào cho hiệu ứng độ dài từ** (khung Vững chắc của trang là về dung lượng 6–7 chữ số; câu "tên chữ số càng ngắn khi đọc, người ta càng nhớ được nhiều chữ số" không mang nhãn). Trang này không cần mở.

**Nguồn tự mở.** Oberauer và cộng sự 2018 không có trên PMC (idconv: "Identifier not found in PMC"); đọc bản PDF tác giả (cns.nyu.edu, nguồn đã ghi ở hồ sơ). Benchmark 7 (B): "This word-length effect is robust when word length is manipulated through the number of syllables … observed consistently in various languages. Given its restriction to the verbal domain, the rating … is a B." Mức A, B là mức ưu tiên giải thích theo độ rộng, không phải độ chắc của bằng chứng (mục Criteria and Scope). Benchmark 8.1.1 (tương tự âm, A): "observed regardless of whether memoranda are presented visually or auditorily". Guitard, Neath & Surprenant 2025: toàn văn Europe PMC (PMC12956956, CC BY): Thí nghiệm 1 lặp lại hiệu ứng với từ không cân bằng; Thí nghiệm 2 cân bằng thêm số láng giềng chính tả, âm và tần suất thì hiệu ứng mất ("the Bayes factors indicated substantial evidence for the null hypothesis"); và "This result with serial recognition parallels earlier findings with serial recall that the word-length effect disappears when the short and long words are equated … (e.g., Guitard et al., 2018; Jalbert et al., 2011a, b)". Tìm Europe PMC (17/11/2026) không thấy phân tích tổng hợp hay tái lập có đăng ký trước cho riêng hiệu ứng này.

**Quyết định (dùng chung cho mọi trang).** Theo đúng chữ mục 4 ("nhãn nói về một khẳng định cụ thể … khung vững chắc cho hiệu ứng chính và khung đang tranh cãi cho cách giải thích"), tách ba khẳng định:

1. *Dãy chữ hay từ giống nhau về âm thì nhớ kém hơn* (hiệu ứng tương tự âm): **Vững chắc**. Cùng cách đọc thước đo mà trang này đã dùng cho n34 (tổng quan đồng thuận Oberauer 2018 coi như tổng quan chất lượng tốt), mức A, đúng qua các cách trình bày; không có kết quả nào đã đọc cho thấy hiệu ứng mất khi kiểm soát yếu tố khác.
2. *Dãy từ nhiều âm tiết thường nhớ được ít hơn dãy từ ngắn* (hiện tượng, với chất liệu thường dùng): **Khá vững**. Nhiều nghiên cứu cùng chiều ở nhiều ngôn ngữ, nhưng còn giới hạn rõ: Oberauer phát biểu nó như một thao tác ("when word length is manipulated through the number of syllables"), và các nghiên cứu cân bằng kỹ hơn thấy hiệu ứng mất, tức độ dài lẫn với yếu tố từ vựng. Không đạt Vững chắc vì điều kiện "không có thất bại tái lập lớn chưa được giải thích" không còn đúng cho chính cách phát biểu của tổng quan.
3. *Độ dài tự nó (thời gian nhẩm lại) là nguyên nhân*: **Đang tranh cãi** (bằng chứng chất lượng cao mâu thuẫn: Baddeley 1975 so với Jalbert 2011, Guitard 2025). Hai trang nói điều này trong thân khung Khá vững ("chưa chắc độ dài tự nó là nguyên nhân"), không thêm khung riêng.

**Sửa.** `tri-nho-lam-viec`: khung Vững chắc chỉ còn hiệu ứng tương tự âm (ý chính "dãy chữ hay từ giống nhau về âm thì nhớ kém hơn"; câu "phụ thuộc mạnh vào âm thanh" thành "gợi ý âm thanh là dạng mã được ưu tiên", đúng chữ "suggests … preferred form" của Oberauer); thêm khung Khá vững "dãy từ nhiều âm tiết thường nhớ được ít hơn dãy từ ngắn", cùng ý chính và lý lẽ với `tri-nho-tu`, bỏ cách giải thích "nhiễu giữa các mục" (không xác nhận được nguồn); thêm Guitard 2025 vào Nguồn. Hộp Tóm tắt nhanh tự đổi theo. `tri-nho-tu`, `do-dai-tri-nho`: không đổi. Hồ sơ: n35 (sửa), n71 mới; lượt 2: n35, n71.

Trang link tới khung này: không có link `#mục` nào tới `tri-nho-lam-viec` trong `src/content/docs/` (đã tìm).

## 5. Đạo đức nghiên cứu: "disadvantaged"

- Trang: `bang-chung/dao-duc-nghien-cuu`, e4. "các nam giới da đen nghèo ở nông thôn" thành "các nam giới da đen thiệt thòi ở nông thôn". Đã mở lại Federal Register 18/4/1979 (govinfo.gov), tr. 23194: "the Tuskegee syphilis study used disadvantaged, rural black men". Các câu cùng đoạn (e3, e5) không đổi.
- Chưa khóa lại (xem đầu báo cáo). Mục này trong "Việc treo" của `plans/lam-lai/README.md` gạch khi trang khóa lại.

## 6. Big Five mini: thang ở "Các lần làm trước"

- `src/scripts/cong-cu/big-five-mini.js`: hai hàm thuần `banLichSu`, `diemLichSu`. Lần làm bằng Mini-IPIP hiện tổng 4–20 (`r.tong`), cùng thang với màn kết quả; bản cũ 15 câu không có tổng nên giữ trung bình 1–5. Cột "Bản" ghi rõ thang: "Mini-IPIP (tổng 4–20)", "bản cũ 15 câu (trung bình 1–5)". Bản ghi không đổi. Chữ trang không đổi (mã không nằm trong mã băm).
- Kiểm thử: `tests/cong-cu.test.mjs` thêm một phép thử; `tests/trinh-duyet/kiem-cong-cu.mjs` (luồng big-five-mini) bấm "Làm lại", mở "Các lần làm trước", kiểm hàng đầu là 12, 12, 12, 12, 8.

## File đã chạm

- Trang: `src/content/docs/kham-pha/chu-y-tri-giac/ao-giac-thi-giac.md`, `kham-pha/cam-xuc-dong-luc/tri-tue-cam-xuc.md`, `kham-pha/tu-duy/linh-cam-va-xac-suat.md`, `kham-pha/tri-nho/tri-nho-lam-viec.md`, `bang-chung/dao-duc-nghien-cuu.md`.
- Hồ sơ: năm file tương ứng trong `kiem-dinh/` (mo_khoa, lần 2, nhận định); `kiem-dinh/khoa.json` (gỡ năm dòng).
- Mã: `src/scripts/cong-cu/big-five-mini.js`; kiểm thử `tests/cong-cu.test.mjs`, `tests/trinh-duyet/kiem-cong-cu.mjs`.
- Báo cáo: file này, `sua-nho-dot-8-nhan-dinh.yml`.

## Kiểm thử

`npm run build:xem` đạt; `npm test` 118 đạt, 1 bỏ qua (cần bản build cũ), 0 hỏng; `node --test tests/cong-cu.test.mjs` 24/24; kiểm thử trình duyệt với `PSYCHE_TRANG` là năm trang đã sửa và `trai-nghiem/big-five-mini/` (ba trình duyệt, ba cỡ màn hình, axe, luồng công cụ): 234/234. Bản thật (`npm run build`) chưa chạy: năm trang đang mở khóa nên không có trong bản thật.

## Chỗ chưa chắc

- **Tri-tue-cam-xuc, cùng đoạn với ρ ≈ .17:** r = .22 (4 nghiên cứu, N = 220), r = .00 (3 nghiên cứu, N = 223), ΔR² = .002 và .14 (n39, n40, n45, n46), và ở đoạn khác ρ = .39 (thấu hiểu cảm xúc với g), r từ .12 đến .25 (với Big Five) đều chỉ đọc qua bản lưu Internet Archive của bài Joseph & Newman 2010. Lần này không đổi chữ (ngoài phạm vi lời giao); nếu áp cùng quy tắc nguồn thì các số ấy cũng phải viết ở mức tóm tắt hay tìm nguồn mở. Người giao quyết.
- **"Joseph & Newman, 2010b":** tóm tắt 2015 dẫn ρ = .47 từ "2010b"; Crossref không có danh mục tham khảo nên chưa kiểm chắc 2010b là bài J Appl Psychol 95(1) (bài 2010a của hai tác giả không phải phân tích tổng hợp về hiệu suất; lượt 2 lần 1 ghi hệ số hiệu chỉnh đầy đủ .47 trong Bảng 4).
- **Hertwig & Gigerenzer 1999** không mở lại được (pure.mpg.de chặn công cụ tự động); dựa câu trích của review công cụ Linda.
- **Thước đo cho hiệu ứng tương tự âm:** giữ Vững chắc theo cách đọc đã có ở trang (tổng quan đồng thuận Oberauer 2018 đủ cho "tổng quan chất lượng tốt"). Nếu chủ repo đọc chữ "phân tích tổng hợp hay tổng quan hệ thống" chặt hơn, khung này và khung n34 cùng trang đều phải xét lại.

## Sau lượt 2 (17/11/2026)

Lượt 2 (Opus, agent riêng): `plans/lam-lai/bao-cao/sua-nho-dot-8-luot-2.yml`, 9 dung, 2 sai. Đã nhập bằng `node tools/khoa.mjs nhap`. Nhánh đã gộp `origin/main`: không có gì mới, vì main vẫn ở a2146f1, đã có D8-L2 và D8-L3.

- **`linh-cam-va-xac-suat` n73, n74 (sai):** lượt 1 đọc sai Hertwig & Gigerenzer (1999). Câu "None of the predictions … have been corroborated" chỉ nói về các dự đoán mà Agnoli & Krantz (1989) gán cho giả thuyết. Kết luận chung của bài ngược lại: ít nhất một phần người tham gia có hiểu theo cách ấy, và khi Tversky & Kahneman (1983) chặn cách hiểu này thì tỉ lệ lỗi giảm rõ. Đã sửa khung Đang tranh cãi và mục Lý thuyết theo `cau_dung`. Khác `cau_dung` ở một chỗ: khung giữ gạch ngang "— và với cách hiểu đó…" như chữ cũ. `ly_do` của n38 sửa theo. Lượt 1 chưa tự đọc được trích của lượt 2: bản tác giả ở thư viện MPIB tải được nhưng chữ bị mã hóa phông, và lần giải mã bị chặn.
- **`trai-nghiem/linda` (đang mở khóa):** khung n11 có cùng lỗi. Vế Hertwig & Gigerenzer đã sửa theo `cau_dung` của n73. Câu Chandrashekar 2021 vẫn đúng với bài ấy ("We found no support for semantic ambiguity"; giả thuyết ấy là về "and", của Hertwig), nên giữ, nhưng chuyển lên ngay sau luận điểm của Hertwig và bỏ chữ "cũng". Xuất vào `sua-nho-dot-8-nhan-dinh-2.yml`.
- **`tri-nho-lam-viec` n71 (dung, kèm lưu ý):** chữ cũ "xếp vào nhóm phát hiện ổn định" dễ hiểu là mức B nghĩa là ổn định. Chữ mới: Oberauer "gọi hiệu ứng … là ổn định … và xếp nó ở mức B (phạm vi hẹp hơn mức A, vì chỉ thuộc trí nhớ cho lời nói)". Xuất vào `sua-nho-dot-8-nhan-dinh-2.yml`. Công cụ `trai-nghiem/tri-nho-tu` (đã khóa) cũng dùng chữ "xếp vào nhóm phát hiện ổn định". Lượt 2 cho là không sai, nên không mở khóa; nếu muốn hai trang cùng chữ thì mở khóa sửa sau.
- Lượt 2 bổ sung còn chờ: 2 câu (`trai-nghiem/linda` n11, `tri-nho-lam-viec` n71). Còn chờ review: n73, n74 (lượt 1 và lượt 2 khác nhau) và các câu `da-sua`. Sáu trang đang mở khóa: năm trang ở trên và `trai-nghiem/linda`. Chưa trang nào khóa lại; `review`, `kiem_mau` để trống.
- Kiểm thử sau sửa: `npm run build:xem` đạt; `npm test` 118 đạt, 1 bỏ qua; kiểm thử trình duyệt với `PSYCHE_TRANG` là `linh-cam-va-xac-suat`, `tri-nho-lam-viec` và `trai-nghiem/linda`: 234/234 đạt.
