# Phản biện 1: giá trị cho người đọc và độ đúng của nội dung

> Ghi chú khi lưu vào repo (17/11/2026): bản phản biện này đọc **bản nháp** của kế hoạch, nên số mục, số bài, tên hình trong đây là của bản nháp. Cách xử lý từng điểm: `../README.md` mục 10.

Bản đọc trong dự án của một phiên AI riêng (Claude Opus 5.5, vai tổng biên tập kiêm nhà tâm lý học, chỉ đọc repo). Đây không phải phản biện bên ngoài, và phiên này không đọc phản biện của phiên khác. Ngày 17/11/2026, main `ccc49d1`.

**Đã đọc:** `plans/nang-cap/README.md`, `hinh.md`; `kiem-toan/kiem-do-phu.md`, `kiem-trinh-bay.md`, cùng các thẻ trang liên quan trong bốn file kiểm toán nội dung; `plans/ben-vung/README.md`, `chuan-kiem-dinh.md`, `them-noi-dung.md`.
**Đã mở trang và hồ sơ để kiểm:**
- `thi-nghiem/keo-deo` (hồ sơ n28, n37, n67);
- `thi-nghiem/milgram` (hồ sơ n12, n31, n46, n48, n64);
- `kham-pha/tri-tue/tri-tue-la-gi` (hồ sơ n14, n16, n17);
- `kham-pha/tu-duy/linh-cam-va-xac-suat`, `kham-pha/co-so-sinh-hoc/the-duc-nao`;
- `kham-pha/phat-trien/mang-xa-hoi-teen` (hồ sơ n9, n17);
- `kham-pha/cam-xuc-dong-luc/thuong-va-dong-luc`, `kham-pha/tinh-cach/tinh-cach-thay-doi`, `kham-pha/phat-trien/tam-ly-hoc-duong`, `kham-pha/phat-trien/gan-bo`;
- `src/hinh/loftus-verbs.html`, `src/data/ngo-nhan.yml`, `ho-tro/index.md`, `index.md`.

**Đếm lại bằng script chỉ đọc:**
- câu hỏi: 396 câu, 370 câu có đáp án đúng dài nhất, khớp kế hoạch;
- số chữ trước mục Nguồn của 51 bài Khám phá;
- gợi ý ngoài độ dài trong câu hỏi: đếm thô, có xem tay một mẫu.

**Nhãn nguồn:** câu nào dựa vào hiểu biết về tài liệu mà phiên này chưa mở được ghi "(theo hiểu biết, cần mở nguồn)". Các câu khác dựa trên file của repo đã mở.

## Tóm tắt

1. **Rủi ro nội dung lớn nhất nằm ở danh sách hình.** Nhiều hình đề xuất đặt lên một trục những con số khác loại hệ số, khác kết cục, khác mẫu. Hình kiểu "co dần" sẽ nói mạnh hơn chữ. Quy chuẩn hình chưa cấm trục cắt (đã có một hình cũ cắt trục). Kiểm thử "nối số với nhận định" chỉ bắt được số sai, không bắt được nhãn sai.
2. **An toàn chưa theo kịp mở rộng.** Các bài về trẻ em, lâm sàng, thi cử (3, 6, 8, 11, 14, 15, 18) chưa có luật nào ngoài "Opus cho phần nhãn". Các lỗi an toàn đã biết ở bốn trang Sức khỏe tâm thần đang hiện thì chờ chuyên gia không hạn.
3. **Ba cách sửa nội dung cần đổi.** "Bỏ lặp chỉ xóa câu" mâu thuẫn với chính việc 7 của kế hoạch và sẽ cắt câu đang gánh lý lẽ. "Cân độ dài" chưa đủ để câu hỏi hết đoán được. Tiêu đề bài 9 tả sai khái niệm.
4. **Thứ tự và chỉ số cần đổi.** Lối vào trang chủ (cả nút menu) nên lên NC0. Chỉ số đang đếm sản lượng (bài có hình, phần trăm cắt bớt), chưa đo độ đúng hay lợi ích cho người đọc.

**Ánh xạ tới bảy câu hỏi:**

| Câu hỏi | Điểm |
|---|---|
| 1. Thứ tự | N1, N2, P7 |
| 2. Câu hỏi kiểm tra | N3 |
| 3. Bỏ lặp | P6, N10, G1 |
| 4. Hình | P1, P2, P3, P8, N7, G5 |
| 5. Mở rộng | P4, P5, N4, N5, N6, G4 |
| 6. Trung lập, an toàn | P4, P7, P8, N6, N7 (yrbs), N9, G2 |
| 7. Chỉ số | N8 |

---

## Phải sửa

### P1. Hình đặt lên cùng một trục những con số không cùng đại lượng

- **Chỗ:**
  - `hinh.md` mục 2 (dòng "so từ ba con số cùng thang"), mục 3.2, mục 6;
  - các hình keo-deo-co-lai, mixed-ei-sup-do, tong-hop-hieu-ung-the-duc, iq-du-bao-gi, swls-cac-he-so, cong-suat-cac-linh-vuc, linda-ti-le-theo-bien-the, on-dinh-thu-hang.
- **Vấn đề:** "cùng thang" đang được hiểu là cùng đơn vị hiển thị (0–1, %). Vì vậy các hình "co dần", "bậc thang" nối những hệ số khác loại, khác kết cục, khác mẫu. Người đọc sẽ đọc độ dốc là "hiệu ứng thật đã nhỏ đi bao nhiêu", đúng loại kết luận mà chữ của các trang đang cẩn thận tránh. Bản tóm trong `hinh.md` còn bỏ mất phần lớn cảnh báo mà kiểm toán đã ghi.
- **Căn cứ** (đã mở trang và hồ sơ):
  - **keo-deo:**
    - 0,57 là r đơn giản ở điều kiện "chẩn đoán", với SAT toán, trong một mẫu nhỏ (n28 trích "r(35) = .57");
    - 0,08 và 0,05 là β có kiểm soát, với thành tích ở tuổi 15, n = 552 (n37);
    - 0,02 là r trung bình của 11 chỉ số tài chính và học vấn khi gần 50 tuổi, n = 113 (n67);
    - "khoảng một nửa" không có số trên trang (r = 0,24 chỉ nằm ở `ghi_chu` của n37, nên vẽ ra là số mới, phải V3).
    - Đặt 0,57 và 0,02 trên một trục gợi ý "co 28 lần".
  - **iq-du-bao-gi:**
    - .56, .43 và .20 là ρ đã hiệu chỉnh của Strenze 2007 (n14);
    - .53 là ước lượng của Hunter và Hunter (1984), mà chính trang nói đã "bị hiệu chỉnh quá tay" (dòng 66, Sackett 2022);
    - .17 và .05 lấy từ hai phân tích tổng hợp khác (n16).
    - `hinh.md` tóm thành "r .56, .43, .53, .20, .17, .05 (hai nguồn Strenze)" và bỏ mất cảnh báo.
  - **tong-hop-hieu-ung-the-duc:** ba nguồn đo ba thứ khác nhau.
    - Ciria 2023 đo toàn bộ nhận thức (`the-duc-nao` dòng 62).
    - Aghjayan 2022 đo trí nhớ sự kiện ở người khoảng 71 tuổi (dòng 56, 123).
    - Balbim 2024 đo thể tích hồi hải mã, không phải nhận thức (dòng 60).
    - 0,13 và 0,28 không có khoảng tin cậy trên trang, nên không vẽ được dạng "chấm và khoảng tin cậy".
  - **mixed-ei-sup-do:** ρ 0,47 và 0,29 đặt cạnh β −0,02 sau khi kiểm soát bảy khái niệm. β ấy là đóng góp riêng, không phải "cùng hiệu ứng nhỏ đi".
  - **swls-cac-he-so:** alpha, tương quan đo lại, hội tụ và người quen chấm là bốn loại hệ số khác nhau (kiểm toán đã ghi).
  - **cong-suat-cac-linh-vuc:** 8, 11, 18, 21, 23, 31% là công suất trung vị; 12, 46, 78% là công suất giả định cho hiệu ứng nhỏ, vừa, lớn. Kiểm toán đã ghi, `hinh.md` bỏ mất.
  - **linda:** chín tỉ lệ đến từ chín nhóm người với cách hỏi khác nhau. Xếp theo giá trị sẽ gợi ý "đặt cược làm lỗi giảm từ 85% xuống 56%", trong khi trang nói rõ đó là so hai nhóm khác nhau (`linh-cam-va-xac-suat` dòng 86, câu hỏi dòng 140).
  - **on-dinh-thu-hang:** đường .31 → .74 làm nổi đoạn sau 30 tuổi, trong khi trang ghi Bleidorn 2022 thấy ít bằng chứng cho việc tăng thêm sau tuổi 25 (`tinh-cach-thay-doi` dòng 43, 72).
- **Đề xuất:**
  1. Thêm vào `hinh.md` mục 3.2:
     - "7a. Chỉ đặt trên cùng một trục các giá trị cùng đại lượng: cùng loại hệ số (r, ρ đã hiệu chỉnh, β, d, g, tỉ lệ), cùng kết cục, cùng cách hiệu chỉnh. Khác thì tách ô có tiêu đề riêng, hay dùng dòng thời gian hoặc bảng chữ."
     - "7b. Không nối bằng đường hay mũi tên các giá trị của những nghiên cứu khác nhau. Đường chỉ nối cùng một nhóm theo thời gian, hay các bước của cùng một phân tích."
     - "7c. Giá trị mà chính trang gọi là cũ, đang bị xem lại hay ước tính ('khoảng', '~') thì vẽ khác (chấm rỗng, nhãn 'ước lượng cũ'), không ngang hàng với các giá trị khác."
     - "7d. Mỗi giá trị tổng hợp ghi k hay n. Nguồn đã kiểm không có khoảng tin cậy thì ghi 'không có khoảng tin cậy'."
  2. Bộ dựng `::bieu-do`:
     - mỗi giá trị có trường `dai_luong` (`r-don`, `rho-hieu-chinh`, `beta`, `d`, `g`, `ti-le`…);
     - bộ dựng từ chối đặt hai `dai_luong` khác nhau trên một trục.
  3. Sửa thiết kế ngay trong `hinh.md` mục 6, trước khi giao lô:
     - **keo-deo-co-lai:** thành dòng thời gian các lần nghiên cứu (năm, n, mẫu, kết cục, kết luận bằng chữ), không trục số.
     - **mixed-ei:** tách hai ô, hay bỏ.
     - **the-duc:** mỗi phân tích tổng hợp một ô "trước–sau" của chính nó; bỏ Balbim khỏi trục nhận thức.
     - **iq:** bỏ .53, hay vẽ chấm rỗng ghi "ước lượng cũ, đang bị xem lại"; tách Strenze 2007 khỏi "các phân tích tổng hợp khác".
     - **swls:** hạ xuống C.
     - **cong-suat:** chia hai nhóm có nhãn.
     - **linda:** xếp theo cách hỏi, không theo giá trị, hay chỉ vẽ phép so sánh cùng cách hỏi (89, 90, 85% ở ba nhóm trình độ).
     - **on-dinh:** chấm theo nhóm tuổi trên trục rời, không nối đường; ghi kết quả Bleidorn 2022 ngay trong hình.

### P2. Không có luật "cột bắt đầu từ 0", và một hình cũ đang cắt trục

- **Chỗ:**
  - `hinh.md` mục 3.2; mục 4.1 (ví dụ YAML có `truc: { min: … }`); mục 5 (loftus-verbs xếp vào nhóm "chuyển sang hình sinh từ dữ liệu");
  - README mục 4, dòng "Vẽ lại hình, cùng chữ và số".
- **Vấn đề, căn cứ:**
  - `src/hinh/loftus-verbs.html` là hình cột với trục 25–45. Cột "smashed" vì vậy cao gấp khoảng 2,3 lần cột "contacted", dù số chỉ hơn khoảng 28% (`kiem-nhan-thuc.md`, thẻ bang-ghi-hinh).
  - Quy chuẩn hình không cấm điều này.
  - Kiểu thay đổi "vẽ lại, cùng chữ và số", kiểm bằng máy, sẽ giữ nguyên lỗi.
- **Đề xuất:**
  - Thêm luật vào `hinh.md`: "Hình cột (cot, cot-ngang, cot-nhom) luôn bắt đầu từ 0; bộ dựng không nhận `min` khác 0 cho cột. Số không nên vẽ từ 0 thì dùng chấm và ghi rõ trục."
  - Ghi vào bảng ở README mục 4: "Vẽ lại một hình cũ có lỗi thiết kế (trục cắt; gộp nguồn, như cột Bouchard của tinh-di-truyen-theo-tuoi) không phải thay đổi cơ học. Thêm lượt 2 nhẹ về cách vẽ."

### P3. Kiểm thử "nối số với nhận định" không bắt được lỗi hay gặp nhất: số đúng, nhãn sai

- **Chỗ:**
  - `hinh.md` mục 3.2 luật 7, mục 3.4, mục 4.1 (ví dụ YAML và dòng lợi ích "Không vẽ sai số");
  - README mục 4, dòng "Hình mới từ nhận định đã có".
- **Vấn đề:** kiểm thử chỉ đòi chuỗi số có mặt trong câu của nhận định. Nó không kiểm:
  - (a) nhãn hay điều kiện đi kèm số;
  - (b) dấu và ranh giới của số: "0,04" vẫn khớp trong "−0,04", "0,05" vẫn khớp trong "10,05";
  - (c) `gia_tri` (độ dài cột) có bằng số trong `hien` (chữ hiện ra) hay không.
- **Căn cứ:**
  - Ví dụ YAML trong `hinh.md` ghi `nhan: Yale, 1963` (65%) đặt cạnh Bridgeport (47,5%).
  - Hồ sơ milgram n46 ghi: 65% của bài 1963 thuộc điều kiện không có tiếng kêu; Bridgeport được Milgram so với "điều kiện tương ứng tại Yale" (Haslam 2014: giống điều kiện 5). Lượt 2 và review đều chấm câu cũ là `sai`.
  - Một hình dựng theo ví dụ ấy sẽ qua kiểm thử mà dựng lại đúng cái lỗi hồ sơ đã sửa.
  - Id trong ví dụ cũng sai: n12 là câu "30 nấc từ 15V đến 450V", n31 là câu về đạo đức; nhận định 47,5% là n46.
- **Đề xuất:**
  1. Kiểm thử đòi `gia_tri` bằng số đọc từ `hien`; so số theo từng số trọn vẹn, có dấu.
  2. Thêm trường `khop`: một cụm chữ của nhãn hay điều kiện (ví dụ "Bridgeport", "điều kiện tương ứng") phải có trong `cau` của nhận định.
  3. Sửa ví dụ: `nhan: Yale (điều kiện tương ứng)`, `nhan_dinh: n46`.
  4. Mục 4.1, thay "Không vẽ sai số: kiểm thử nối từng giá trị với hồ sơ" bằng "Số và nhãn khớp hồ sơ do máy kiểm; so sánh có hợp lệ không do lượt 2 kiểm."

### P4. Bài mở rộng nhạy cảm chưa có luật an toàn, chỉ có "Opus cho phần nhãn"

- **Chỗ:** README mục 3.6 (bảng M1, M2); mục 5, dòng Model ("Opus: … bài 1, 6, 8 (phần nhãn)").
- **Vấn đề:**
  - `chuan-kiem-dinh.md` mục 5 (không chẩn đoán; Hỗ trợ ở đầu và cuối trang; đưa tin an toàn khi nói về tự hại; không khuyên dùng hay ngừng thuốc) chỉ áp cho lĩnh vực Sức khỏe tâm thần.
  - Các bài 3, 6, 8, 11, 14, 15, 18 chạm trẻ em, chuyện lâm sàng hay tự hại nhưng thuộc lĩnh vực khác.
  - Bài mở rộng (6, 8, 14, 15, 18) chỉ có lượt 2 kiểm mẫu khoảng 8 câu.
  - Bài 3 (giả dược) có câu lâm sàng nhưng không nằm trong danh sách bài dùng Opus.
- **Căn cứ** (rủi ro cụ thể):
  - **Bài 18:** "tự kỷ ảo" là cụm rất phổ biến trên báo và mạng Việt (theo hiểu biết). Viết lỏng tay dễ khiến phụ huynh chờ "cai màn hình" thay vì đưa con đi đánh giá phát triển. Khuyến nghị năm 2019 của WHO cho trẻ dưới 5 tuổi dựa trên bằng chứng có độ chắc chắn thấp (theo hiểu biết, cần mở nguồn).
  - **Bài 6:** chạm chuyện bảo vệ trẻ em. Trang Hỗ trợ có Tổng đài 111 (`ho-tro/index.md` dòng 28) nhưng kế hoạch không đòi dẫn tới.
  - **Bài 15:** người đọc là học sinh đang thi, và báo hay gắn tự tử với điểm thi (theo hiểu biết).
  - **Bài 8:** MBCT là câu lâm sàng; thiền có tác dụng phụ; người đọc Việt có bối cảnh Phật giáo.
  - **Bài 14:** kiệt sức và trầm cảm chồng lên nhau.
- **Đề xuất:**
  - Thêm vào 3.6: "Bài chạm trẻ em, chuyện lâm sàng hay tự hại (3, 6, 8, 11, 14, 15, 18) theo `chuan-kiem-dinh.md` mục 5, dù thuộc lĩnh vực nào:
    - lượt 2 kiểm đủ mọi nhận định (V3); Opus cho nhãn và câu `lam-sang`;
    - Hỗ trợ ở đầu và cuối bài; bài 6, 15, 18 dẫn tới Tổng đài 111;
    - không có danh sách dấu hiệu để tự chấm;
    - không khuyên dùng, ngừng hay thay điều trị (cả thuốc ngủ và melatonin ở bài 1);
    - nói về tự hại theo hướng dẫn đưa tin an toàn: không gắn với một nguyên nhân, không kể trường hợp cụ thể."
  - Thêm cột "Rủi ro, cách viết" vào bảng M1–M2 (câu chữ đề xuất ở Phụ lục A).

### P5. Tiêu đề bài 9 tả sai khái niệm

- **Chỗ:** README 3.6, M2 bài 9.
- **Vấn đề:**
  - "Vì sao ta đổ lỗi cho người khác mà tha cho mình?" tả bất đối xứng người làm–người xem (actor–observer), hay thiên lệch vị kỷ (self-serving bias).
  - Lỗi quy kết cơ bản là chuyện khác: quy hành vi của người khác cho tính cách và xem nhẹ hoàn cảnh (Jones–Harris).
  - Bất đối xứng người làm–người xem yếu hơn nhiều so với cách kể phổ biến (phân tích tổng hợp Malle 2006; theo hiểu biết, cần mở nguồn).
  - Công cụ C3 (kiểu Jones–Harris) đo lỗi quy kết cơ bản, không đo việc "tha cho mình".
- **Đề xuất:**
  - Đổi tiêu đề thành "Vì sao ta vội cho rằng người khác 'vốn tính thế'? (lỗi quy kết cơ bản)".
  - Phiếu đề xuất ghi: phân biệt lỗi này với bất đối xứng người làm–người xem và thiên lệch vị kỷ; nêu khác biệt giữa các nền văn hóa (cần mở nguồn).
  - Bài 10 (tính cách hay hoàn cảnh) hỏi cùng một câu: mỗi nghiên cứu chỉ kể chi tiết ở một trong hai bài.

### P6. "Bỏ lặp chỉ bằng cách xóa câu" mâu thuẫn với chính kế hoạch và sẽ cắt câu đang gánh lý lẽ

- **Chỗ:**
  - README 3.5 việc 3 ("Chỉ xóa câu… Đích: bài gọn 10–15%") và việc 7 ("rút về một câu và link");
  - mục 4, dòng "Bỏ câu lặp (chỉ xóa)";
  - mục 6, dòng độ dài.
- **Vấn đề, căn cứ:**
  - **Mâu thuẫn:** việc 7 cần viết một câu tóm kèm link, điều việc 3 và bảng mục 4 cấm. Agent sẽ phạm luật, hoặc bỏ việc 7.
  - **Lặp ở site này thường có chủ đích.** Khung nhãn, Áp dụng và Ngộ nhận là những chỗ người đọc điện thoại nhảy tới từ mục lục.
    - `tri-tue-la-gi` kể Ritchie và Tucker-Drob ba lần, mỗi lần cho một lập luận khác: dòng 66 bác "nhân quả một chiều", dòng 93 làm chứng cho lời khuyên, dòng 113 bác ngộ nhận "IQ cố định".
    - Xóa cả câu ở dòng 93 thì lời khuyên mất bằng chứng. Ở dòng 113 chỉ cần bớt một vế, việc mà "xóa câu" không làm được.
  - **Chỉ tiêu "gọn 10–15%" thưởng cho việc cắt.** Kế hoạch cũng không miễn câu hỏi và lời giải thích, vốn lặp số có chủ đích (tự kiểm tra).
- **Đề xuất:** thay việc 3 và dòng tương ứng ở bảng mục 4 bằng đoạn sau.

  > "Bỏ lặp: một kết quả có đủ số liệu ở tối đa hai chỗ (mục kể nghiên cứu và khung nhãn). Ở Áp dụng, Ngộ nhận và Ở Việt Nam thì giữ ý, bớt số và chi tiết. Không tính câu hỏi, lời giải thích và hộp tóm tắt.
  >
  > Hai cách làm, đều kiểm bằng máy:
  > (a) xóa cả câu;
  > (b) rút gọn trong câu: câu mới là câu cũ bỏ đi các cụm liền nhau, cộng tối đa một cụm nối trong danh sách cho phép ('(xem mục …)', link về trang nhà).
  >
  > Máy chặn khi cụm bị xóa chứa từ phủ định, từ rào đón hay tên nhãn ('không', 'chưa', 'chỉ', 'khoảng', 'có thể', 'theo', 'nhưng', 'ở mẫu'…). Máy đánh dấu câu nằm ngay sau chỗ xóa nếu nó mở đầu bằng 'Điều này', 'Con số ấy', 'Kết quả này', 'Như vậy'; lượt 2 nhẹ đọc lại cả đoạn ấy. Việc 7 làm theo cách (b)."

  Bỏ đích 10–15%: độ dài chỉ ghi lại để theo dõi, không phải đích. Ưu tiên các bài dài nhất (đếm trước mục Nguồn):

  | Bài | Số chữ |
  |---|---|
  | tam-ly-hoc-duong | khoảng 5.660 |
  | giac-mo | khoảng 5.290 |
  | tri-tue-cam-xuc | khoảng 5.130 |
  | tri-lieu-tam-ly | khoảng 4.910 |
  | mang-xa-hoi-teen | khoảng 4.480 |
  | the-duc-nao | khoảng 4.350 |

  Bài dưới khoảng 3.000 chữ thì không bỏ lặp.

### P7. Lỗi an toàn đã biết ở bốn trang Sức khỏe tâm thần đang hiện, mà chờ không hạn

- **Chỗ:** README 3.5 lô N5; mục 5, dòng N5 (điều kiện "Có chuyên gia"); mục 7 ý 4 ("các việc ấy chờ").
- **Vấn đề, căn cứ:** `kiem-sinh-hoc-cam-xuc.md` gắn [A][CG] cho ba trang.
  - **tram-cam:** bốn gạch đầu dòng liệt kê gần đủ tiêu chí, kèm mốc hai tuần, gần thành một bảng tự kiểm.
  - **lo-au:** ba gạch đầu dòng gần như ba bảng tiêu chí.
  - **tri-lieu-tam-ly:** câu "hơn thuốc ở 6–12 tháng (g = 0,34)" có thể bị đọc là nên bỏ thuốc; mục Áp dụng #2 và #3 gần thành lời khuyên cá nhân.

  Các trang này đang lên site với dải "Chưa qua rà soát chuyên môn". Kế hoạch sửa hình và câu hỏi cho mọi trang khác trước, còn các trang rủi ro nhất thì chờ một chuyên gia chưa có tên, không có hạn.
- **Đề xuất:** viết lại mục 7 ý 4 như sau.

  > "Chủ repo tìm chuyên gia trước <ngày>. Trong lúc chờ, lô N0-SKTT (Opus hai lượt, 1–2 phiên) chỉ sửa theo hướng thận trọng hơn:
  > - thay danh sách giống tiêu chí chẩn đoán bằng mô tả cách chuyên gia đánh giá và các dấu hiệu nên đi khám (dẫn tới `tim-giup-do`);
  > - thêm 'đừng tự ý ngừng hay đổi thuốc; hãy bàn với bác sĩ' cạnh câu so trị liệu với thuốc.
  >
  > Chủ repo duyệt. Dải 'Chưa qua rà soát chuyên môn' giữ nguyên tới khi chuyên gia đọc."

  Đưa N0-SKTT vào NC0 hay NC1. Bài "Thế nào là rối loạn tâm thần, và vì sao còn kỳ thị?" (nhu cầu cao nhất theo `kiem-do-phu`) gắn cùng hạn ấy, không để chờ không hạn.

### P8. Hình "sơ đồ lọc" bắt nạt có thể thành công cụ gạt bỏ lời kể của trẻ

- **Chỗ:** `hinh.md` mục 6, hình ba-tieu-chi-bat-nat (mức A, trang `tam-ly-hoc-duong`); cùng luật cho hình bon-kieu-gan-bo.
- **Vấn đề, căn cứ:**
  - Một sơ đồ có nhánh "Không → không phải bắt nạt" sẽ cứng hơn chữ của trang. Trang chỉ nói: khi đủ ba dấu hiệu thì phải xử lý nghiêm, và đây "không phải công cụ chẩn đoán" (dòng 115).
  - Định nghĩa thống nhất của CDC (Gladden và cộng sự 2014) có vế "lặp lại, hay rất có thể lặp lại" (theo hiểu biết, cần mở nguồn). Bộ lọc "chỉ xảy ra một lần thì không phải" vì vậy còn chặt hơn nguồn.
  - Hình dễ bị chụp lại và chia sẻ cho phụ huynh, giáo viên.
- **Đề xuất:**
  - Vẽ ba câu hỏi, không có nút kết luận "không phải bắt nạt".
  - Dòng cuối trong hình: "Dù chưa đủ ba dấu hiệu, đánh, đe dọa hay làm nhục vẫn cần người lớn can thiệp. Lo cho an toàn của trẻ: Tổng đài 111." Câu đầu là nhận định, kiểm V3 (nếu không có trong hồ sơ, bỏ câu ấy); câu sau là câu `ve-site`, dẫn trang Hỗ trợ.
  - Hình bon-kieu-gan-bo ghi ngay trong hình: "Phân loại trong thủ tục phòng thí nghiệm, không dùng để xếp loại một em bé cụ thể" (câu đã có ở `gan-bo` dòng 28).

---

## Nên sửa

### N1. Thứ tự: đưa lối vào và các trang nhiều người cần lên trước; bỏ việc ít lợi

- **Chỗ:** README 3.2; mục 5 (các đợt NC0, NC1 và hàng V1, C, L2–L4).
- **Vấn đề:**
  - Nguyên tắc 1 xếp "lối vào cụt" vào việc làm trước, nhưng T4 (lối vào từ trang chủ) lại nằm ở NC1.
  - Trang chủ là trang splash, không có nút menu ở 360 px (`kiem-trinh-bay.md` A1). Việc thêm nút menu không có trong T1–T11.
  - L3 ("Đọc tin tâm lý trên báo") đúng sứ mệnh của site, chỉ một trang, mà bị đẩy xuống cuối.
  - Lộ trình "Phụ huynh" làm được ngay từ 8 bài có sẵn (`kiem-do-phu.md` 3.2), vì dữ liệu lộ trình thêm sau được, không cần chờ bài M6 và M18.
- **Đề xuất:**
  - **NC0:** S4 làm đầu tiên (Hỗ trợ là trang cho lúc khủng hoảng); rồi S1–S3, T4 cùng nút menu trang chủ, T2, T3, T5, T1, L1, H1.
  - **NC1:** thêm L2 (lộ trình "Mới bắt đầu" và "Phụ huynh") và L3.
  - **Hạ hay bỏ:** hạ T10 xuống mức C; bỏ phần tự gắn link của L4 (giữ trang từ điển, gắn link tay khi nâng cấp bài).
  - **Thứ tự N2–N4:** quyết sau khi có khoảng 4 tuần số liệu của Search Console (xem N8).

### N2. Giai đoạn 1 hứa 5 bổ sung Việt Nam mà không có V1; bài mới nên tự tìm số liệu Việt Nam

- **Chỗ:**
  - README 3.7 ("Đích: 5 bổ sung trong giai đoạn 1");
  - mục 5: giai đoạn 1 gồm NC0, NC1, N1, M1; V1 nằm ở hàng sau;
  - mục 6, dòng "Bổ sung Việt Nam đã khóa: khoảng 5".
- **Đề xuất:**
  - Chọn một trong hai:
    - đưa V1 vào giai đoạn 1 (5 bổ sung, ưu tiên `tram-cam` và `lo-au` với số liệu NAMHS, dùng Opus) và cộng thêm phiên;
    - hoặc sửa mục 6 thành 0.
  - Bỏ dòng V1 "kỷ luật trẻ em (MICS) cho bài M6". Bài mới chưa khóa thì đưa số liệu Việt Nam thẳng vào bài.
  - Thêm vào phiếu đề xuất của mỗi bài M một dòng: "đã tìm nghiên cứu và số liệu chính thức Việt Nam ở đâu, ngày tìm".

### N3. Câu hỏi: cân độ dài chưa đủ để hết đoán, càng chưa đủ để kiểm hiểu

- **Chỗ:** README 3.5 việc 2; mục 4, dòng "Cân lại câu hỏi" và đoạn "Kiểm thử độ dài câu hỏi"; mục 6, dòng câu hỏi.
- **Căn cứ** (script trên `src/content/docs`):
  - 391/396 câu có 3 lựa chọn, tức đoán mò đúng 33%.
  - Ngoài độ dài còn gợi ý khác. Biểu thức đếm thô gắn cờ 167/396 câu (42%) ở một trong hai dạng:
    - chỉ đáp án đúng có rào đón ("khoảng", "có thể", "nhưng", "chưa");
    - đáp án sai có từ tuyệt đối ("chắc chắn", "hoàn toàn", "nào cả", "đã chứng minh").
  - Xem tay 12 câu bị gắn cờ, chọn ngẫu nhiên: 9 câu có gợi ý thật. Ước tính khoảng 30% số câu có gợi ý ngoài độ dài; đây là ước lượng thô.
  - Ví dụ:
    - `keo-deo`: mọi đáp án sai đều cực đoan ("Không còn chút tương quan nào ngay từ đầu", "Ý chí là bẩm sinh nên không cần dạy gì cả").
    - `ao-giac-thi-giac`: "Thợ mộc nhìn chính xác hơn người khác".
  - Sự thận trọng, vốn là tinh thần của site, đã thành dấu hiệu để nhận ra đáp án đúng.
  - Có câu chỉ hỏi nhớ số (`tinh-cach-thay-doi`: ".64 và khoảng .74"), mà luật "không đổi điều câu hỏi kiểm" sẽ giữ nguyên.
  - Đáp án đúng dài trung vị 117 ký tự; 10% số đáp án dài hơn 199 ký tự, tức 4–6 dòng mỗi lựa chọn trên màn 360 px.
- **Đề xuất:**
  1. **Kiểm thử** (`tests/cau-hoi.test.mjs`) thêm:
     - đáp án đúng là lựa chọn ngắn nhất ở không quá một nửa số câu (để chặn việc sửa quá tay);
     - cảnh báo khi chỉ đáp án đúng có rào đón, hay chỉ đáp án đúng có số;
     - mỗi lựa chọn dài tối đa khoảng 100 ký tự.
  2. **Lời giao:** "Ba lựa chọn cùng khuôn câu, cùng giọng thận trọng. Đáp án sai sai vì một chi tiết (chiều, độ lớn, nhóm, thiết kế), không phải vì nói tuyệt đối. Lấy đáp án sai từ ngộ nhận thật hay cách hiểu sai hay gặp (tương quan thành nhân quả; có ý nghĩa thống kê thành hiệu ứng lớn)."
     Ví dụ viết lại câu 3 của `keo-deo`:
     - (đúng) Có liên hệ, nhỏ hơn bản gốc, và nhỏ đi nhiều khi tính đến hoàn cảnh gia đình.
     - (sai) Có liên hệ, lớn hơn bản gốc, và giữ nguyên khi tính đến hoàn cảnh gia đình.
     - (sai) Không có liên hệ nào, ngay cả trước khi tính đến hoàn cảnh gia đình.
  3. **Hai dạng câu rẻ kiểm**, mỗi trang thay một trong năm câu (ưu tiên thay câu chỉ hỏi nhớ số):
     - **(a) Câu nhãn:** "Trang này xếp khẳng định X ở mức nào?", bốn lựa chọn là bốn nhãn. Đáp án là `nhan` của một nhận định có sẵn, lời giải thích dùng `ly_do` của nó. Máy kiểm được sự khớp, và không sinh nhận định mới. Đây đúng là câu hỏi cốt lõi của site: chắc chắn đến đâu.
     - **(b) Câu tình huống áp dụng:** tình huống ghi `gia-dinh`; mỗi câu trong lời giải thích trỏ tới một id nhận định có sẵn, kiểm như loại "hình mới từ nhận định đã có".
  4. Mỗi lời giải thích kết thúc bằng link về mục tương ứng của trang ("xem mục …"), để người trả lời sai quay lại đúng chỗ. Đây là câu `ve-site`, rẻ kiểm.
  5. **Đo** (sửa dòng câu hỏi ở mục 6): dùng phép "đoán mù". Một model nhỏ trả lời:
     - chỉ với các lựa chọn (không câu hỏi, không bài);
     - với câu hỏi và lựa chọn, nhưng không có bài.

     Đích: khi chỉ có lựa chọn, tỉ lệ đúng không quá 40% (gần mức may rủi).

### N4. Tầng của bài nên theo độ chín của bằng chứng, không theo chỉ tiêu "3 bài lõi mỗi lĩnh vực"

- **Chỗ:** README 3.6 (thay đổi thứ ba; bài 5, 11, 12 là lõi); mục 6, dòng "Lĩnh vực dưới 3 bài lõi"; mục 7 ý 3.
- **Vấn đề, căn cứ:**
  - `ben-vung/README.md` mục 2 định nghĩa: lõi là chủ đề có "bằng chứng đã chín"; mở rộng là chủ đề có "bằng chứng còn biến động".
  - Bài 5 (quan hệ gần gũi) dựa chủ yếu vào liên hệ quan sát. `kiem-do-phu.md` (mục 2.1 và bảng mục 4, #8) đề xuất làm bài mở rộng; kế hoạch đổi thành bài lõi để đủ chỉ tiêu.
  - Khóa V3 một bài chưa chín thì về sau phải tái lập mốc.
  - Đếm sai: bảng M1–M2 có 6 bài mở rộng (6, 8, 13, 14, 15, 18), nhưng README ghi 7 (ở 3.6 và mục 8).
- **Đề xuất:**
  - Bài 5 thành bài mở rộng (`dua_tren`: do-hanh-phuc, gan-bo).
  - Bài 11 và 12 giữ tầng lõi nếu gói trong phần kinh điển:
    - bài 11: căng thẳng và hệ miễn dịch, nghiên cứu cảm lạnh;
    - bài 12: thích nghi khoái lạc, điểm đặt.

    Phần đang tranh cãi ("chiếc bánh 40%" của hạnh phúc, "suy tuyến thượng thận") đưa vào khung tranh cãi hay thẻ ngộ nhận (cần mở nguồn).
  - Bỏ chỉ tiêu "mỗi lĩnh vực ít nhất 3 bài lõi". Thay bằng: "mỗi lĩnh vực có ít nhất 3 bài (lõi hay mở rộng), trong đó có ít nhất một bài trả lời một câu hỏi đời thường".

### N5. Danh sách bài mở rộng: đổi chỗ, đổi khung, thêm chủ đề

- **Chỗ:** README 3.6, bảng M1, M2 và danh sách M3.
- **Đề xuất:**
  - **Đổi chỗ bài 18 và bài 7:** đưa bài 18 (màn hình với trẻ dưới 5 tuổi) lên M1, đẩy bài 7 (neuron) xuống M2. Nhu cầu của phụ huynh cao hơn hẳn; bài 7 là bài định nghĩa, ít người tìm.
    - Đổi tiêu đề bài 18 từ dạng kê đơn ("nên xem bao lâu") thành "Màn hình ảnh hưởng thế nào tới trẻ dưới 5 tuổi, và các khuyến nghị dựa trên gì?"
  - **Bài 15:** đổi thành "Lo âu thi cử: vì sao, và cách nào có bằng chứng giúp?" (mở rộng).
    - "Học thêm" chủ yếu là bằng chứng kinh tế và giáo dục. Ghép vào sẽ lại thành bài hai chủ đề, đúng lỗi mà kiểm toán chê ở `tam-ly-hoc-duong`.
    - Không "tách" bài từ `tam-ly-hoc-duong`. Tách là mở khóa trang và chuyển nhận định sang trang khác, một loại thay đổi mà mục 4 chưa có.
    - Bài mới link tới `tam-ly-hoc-duong` ngay trong thân bài. Chiều ngược lại đi qua `lien-quan.yml` (việc L1, không mở khóa); `dua_tren` không dùng được ở đây, vì nó chỉ trỏ tới bài lõi mà `tam-ly-hoc-duong` là bài mở rộng. Nghiên cứu Trần 2024 tóm một câu và link về.
  - **M3:** thêm "ADHD và tự kỷ: khi nào nên đưa con đi đánh giá?" (cần chuyên gia, Opus hai lượt). `kiem-do-phu.md` mục 2.2 (ý 10) có đề xuất này, kế hoạch bỏ mất.
  - **Cân nhắc thay bài 17** (các loại trí nhớ) bằng "Bài trắc nghiệm tính cách, năng khiếu nào đáng tin?" (MBTI, trắc nghiệm trong tuyển dụng, thần số học, sinh trắc vân tay). Lý do:
    - nhu cầu ở Việt Nam cao (theo hiểu biết);
    - bằng chứng về đo lường đã chín;
    - nối được với mbti, big-five, tri-tue-la-gi.
  - **Sửa câu ở 3.6:** thay "các chủ đề đời sống có bằng chứng chín" bằng "các chủ đề đời sống người đọc cần, có đủ bằng chứng để viết kèm nhãn (phần lớn là bài mở rộng, vì bằng chứng còn biến động)".

### N6. Thẻ ngộ nhận mới vẫn nghiêng về "bác bỏ"; thẻ thu gọn dễ làm lan ngộ nhận

- **Chỗ:** README 3.6, đoạn "Thẻ ngộ nhận mới"; 3.2, việc T6.
- **Căn cứ:**
  - `ngo-nhan.yml` có 42 thẻ "Đã bị bác bỏ", 16 "Đang tranh cãi", 2 "Vững chắc" (gian-cach, tu-kiem-tra), 0 "Khá vững".
  - Bảy khẳng định đề xuất thêm đều là để bác.
- **Đề xuất:**
  - **Chỉ tiêu:** trong 6–8 thẻ mới, ít nhất 3 thẻ có nhãn "Khá vững" hay "Vững chắc".
  - **Viết đúng khẳng định cần chấm:**
    - "Đánh đòn làm con ngoan hơn về lâu dài", không phải "Đánh con làm con ngoan". Sự tuân thủ ngay lúc ấy có liên hệ thuận với đòn roi (Gershoff 2002; theo hiểu biết, cần mở nguồn).
    - "Qua 3 tuổi là muộn, không bù được", không phải "0–3 tuổi quan trọng".
    - "Năm giai đoạn đau buồn" là thẻ lâm sàng: dùng Opus, có dẫn tới Hỗ trợ.
  - **Thêm các khẳng định phổ biến riêng ở Việt Nam** (theo hiểu biết; cần xác nhận mức phổ biến trước khi viết):
    - "Sinh trắc vân tay cho biết năng khiếu, trí thông minh bẩm sinh của trẻ";
    - "Thần số học cho biết tính cách";
    - "Phải ngủ trước 11 giờ đêm để gan thải độc";
    - "Xem màn hình nhiều gây 'tự kỷ ảo'" (cần chuyên gia).
  - **T6:**
    - Thẻ thu gọn hiện nhãn trước, khẳng định sau, chữ thường không in đậm. Ví dụ: "Đã bị bác bỏ · Người ta hay nói: 'Con người chỉ dùng 10% bộ não.'"
    - Không dựng thêm chữ mới.
    - Không lấy câu đầu của phần giải thích làm tóm tắt. Câu đầu của thẻ can-kiet-y-chi là "Một phân tích tổng hợp trước đây từng thấy hiệu ứng ở mức vừa."; đọc riêng thì nghe như ủng hộ ngộ nhận.

### N7. Sửa từng hình trước khi giao lô

- **Chỗ:** `hinh.md` mục 3.3 và mục 6.
- **Đề xuất theo hình:**
  - **yrbs-buon-ba:**
    - thêm điểm 37% năm 2019 (có trong n17). Đây đúng là điểm trang dùng để nói "đã tăng từ trước đại dịch" (dòng 55);
    - không nối đường qua những năm không có số;
    - ghi trong hình: "Mỹ, tự báo cáo. YRBS 2021 không hỏi về mạng xã hội, nên không cho biết nguyên nhân."
    - Lý do: bài nằm giữa tranh luận Haidt–Orben. Một đường dốc đặt cạnh chữ "mạng xã hội" là lập luận của một phe.
  - **deci-1999-d:** cột "lời khen +0,33" ghi thêm "rõ hơn ở sinh viên so với trẻ em" (`thuong-va-dong-luc` dòng 59). Người đọc chính của bài là phụ huynh.
  - **pygmalion-raudenbush:** ghi số thí nghiệm trên mỗi cột (4, 3, 8) và ghi "15 trên 18 thí nghiệm".
  - **Hạ hay bỏ các hình trái luật "từ ba con số" của chính mục 2:**
    - weird-96-12: chỉ có một cặp so được (96% so với 12%); 68% (Mỹ) không có số dân để so.
    - iat-r-nho: chỉ có hai số.
    - gardner-steinberg-ban-be: số lấy từ lời kể ("gấp đôi", "khoảng 50%"), không vẽ thành cột cao chính xác; hạ xuống C.
- **Thêm vào mục 3.3:** "Giới hạn then chốt (nước, mẫu, 'không so trực tiếp', 'tương quan', 'không dùng để tự đánh giá', 'sơ đồ minh họa, không phải dữ liệu') nằm ngay trong hình, một dòng chữ 11 px, vì hình hay bị chụp và chia sẻ rời khỏi bài." Áp cho phong-cach-hoc-bat-cheo và mbti-mot-cum-bi-cat (hình ước lệ trông như dữ liệu).
- **Thêm vào đầu mục 6:** "Lô được bỏ hay hạ một hình mức A khi lượt 2 thấy so sánh không hợp lệ; ghi lý do."
- **Danh sách câu hỏi cho lượt 2 nhẹ về hình** (README mục 4):
  - các giá trị có cùng đại lượng không?
  - cột có bắt đầu từ 0 không?
  - số xấp xỉ có được vẽ như số xấp xỉ không?
  - có k, n và khoảng tin cậy, hay có ghi là không có?
  - nhãn có khớp điều kiện trong câu của nhận định không?
  - thứ tự sắp xếp có gợi ý nhân quả không?
  - giới hạn then chốt có nằm trong hình không?
- **Đáng làm nhất** (rủi ro thấp, lợi rõ):
  - roediger-doc-lai-vs-kiem-tra, muller-lyer-ebbinghaus, forest-plot-huong-dan, webb-d;
  - seligman-ket-qua, vẽ hai ô;
  - milgram-bien-the, sau khi sửa P3: 43,6% là vạch tham chiếu, ghi "4 trong khoảng 20 biến thể";
  - deci-1999-d, sau khi sửa như trên;
  - các hình thiết kế: nghe-hai-tai-thiet-ke, rasch-2007-thiet-ke, wason-tap-long-nhau.

### N8. Chỉ số đếm sản lượng, không đo lợi ích hay độ đúng

- **Chỗ:** README mục 6.
- **Vấn đề:**
  - "Bài có hình 27 → 51–60" thưởng cho việc thêm hình, trái `hinh.md` mục 2.
  - "Giảm 10–15% độ dài" thưởng cho việc cắt.
  - "Câu đúng dài nhất dưới 50%" đo đúng thứ mà kiểm thử ép, nên sẽ đạt dù câu hỏi vẫn đoán được.
  - "Lĩnh vực dưới 3 bài lõi" chỉ là cân đối nội bộ.
  - Không có chỉ số nào cho lỗi mới sinh ra khi mở khóa, hay cho người đọc thật; site không có số liệu truy cập.
- **Đề xuất thay và thêm:**
  - **Hình:** thay dòng "bài có hình" bằng "tỉ lệ hình mới qua lượt 2 'vẽ đúng ý' ngay lần đầu; 0 hình đặt các đại lượng khác nhau trên một trục".
  - **Câu hỏi:** thêm vào dòng câu hỏi "đoán mù khi chỉ có lựa chọn: tối đa 40% đúng; mỗi trang có ít nhất một câu nhãn hay câu tình huống".
  - **Lặp:** thay dòng độ dài bằng "không kết quả nào có đủ số liệu ở quá hai chỗ (không tính câu hỏi)"; độ dài chỉ ghi lại.
  - **Lỗi mới:** thêm "số nhận định trên phần đã sửa bị lượt 2 hay kiểm mẫu chấm `sai` hoặc `qua-manh`, theo từng lô; số issue báo lỗi trong 3 tháng sau khi khóa lại".
  - **Người đọc:**
    - Đăng ký Google Search Console bằng thẻ meta xác minh: không nạp script, không theo dõi người đọc (theo hiểu biết, cần kiểm cách xác minh cho đường dẫn `/psyche/`). Số liệu cho biết truy vấn và lượt nhấp theo trang, dùng để xếp lô N2–N4 và chọn bài M3.
    - Thêm link "Báo lỗi trang này" vào khung trang, mở issue điền sẵn đường dẫn của trang.
    - Đưa hai việc này thành ý 6 của mục 7.
  - **Lĩnh vực:** thay dòng "lĩnh vực dưới 3 bài lõi" bằng "số câu hỏi đời thường ưu tiên đã có bài trả lời", với một danh sách 15–20 câu lập từ số liệu Search Console.

### N9. Bổ sung Việt Nam: thiếu luật chống so sánh và khái quát sai

- **Chỗ:** README 3.7, việc V1.
- **Căn cứ:**
  - `kiem-do-phu.md` 3.4 đã cảnh báo: "mẫu nhỏ, đo khác, dễ so sánh sai; … không suy ra 'người Việt khác'". Kế hoạch không chép cảnh báo này.
  - `mang-xa-hoi-teen` dòng 105 là mẫu tốt ("đo khác nên không so trực tiếp được").
- **Đề xuất:** thêm vào V1: "Số liệu Việt Nam đo khác cách đo của nghiên cứu nước ngoài thì không xếp hạng hay so trực tiếp. Không viết 'người Việt…' từ một mẫu. Ghi mẫu, năm và cách đo ngay trong câu."

### N10. "Thêm tiêu đề cấp 3 (không đổi chữ)" có thể thêm nhận định

- **Chỗ:** README 3.5 việc 4; mục 4, dòng "Thêm tiêu đề cấp 3, chuyển đoạn".
- **Căn cứ:** tiêu đề ở site thường mang kết luận và chip nhãn. Ví dụ:
  - `duong-cong-quen`: "Roediger và Karpicke (2006): tự kiểm tra thắng đọc lại";
  - `tam-ly-hoc-duong`: "2. Người chứng kiến: hướng đi hứa hẹn, bằng chứng chưa thống nhất :nhan[tranh-cai]".

  Phép kiểm bằng máy "tập câu không đổi" bỏ qua tiêu đề.
- **Đề xuất:** "Tiêu đề mới chỉ gọi tên chủ đề hay nghiên cứu (danh từ, tên tác giả và năm); không có động từ kết luận, không có chip nhãn; review như câu `ve-site`. Tiêu đề có kết luận thì đi đường chữ mới."

### N11. Khối "Đọc tiếp" chỉ dẫn tới phương pháp, thí nghiệm và công cụ

- **Chỗ:** README 3.4, việc L1.
- **Vấn đề:** người đọc phổ thông đi theo chủ đề (giấc ngủ → trí nhớ → căng thẳng) nhiều hơn theo phương pháp. `kiem-trinh-bay.md` B4 đề xuất cả bài cùng lĩnh vực và ngộ nhận liên quan.
- **Đề xuất:** "Đọc tiếp" tối đa 4 mục:
  - 1 bài Khám phá gần chủ đề (ưu tiên bài khác lĩnh vực);
  - 1 thí nghiệm hay ngộ nhận liên quan;
  - 1 bài Hiểu bằng chứng;
  - 1 công cụ.

  Chỉ ghi tên trang, không viết câu mô tả mới.

---

## Gợi ý

- **G1. Thu gọn chi tiết ở bài dài.**
  - Cho phép bọc phần "Thiết kế" và "Kết quả" của các nghiên cứu phụ trong `:::thu-gon[Chi tiết thiết kế và số liệu]`. Máy kiểm tập câu không đổi, như khi thêm tiêu đề.
  - Không bọc khung nhãn, mục "Ở Việt Nam", câu về an toàn, hay nghiên cứu chính của trang.
  - Cách này làm bài ngắn đi trên điện thoại mà không mất chữ, rẻ hơn bỏ lặp.
- **G2. Công cụ.**
  - C3: chọn đề tài bài luận thật trung tính. Kiểm toán gợi ý đề tài "học thêm", một chuyện đang nóng ở Việt Nam (quy định về dạy thêm năm 2025; theo hiểu biết).
  - C4: giữ lưu ý của kiểm toán "không nói mạng xã hội gây nghiện"; kế hoạch bỏ mất.
- **G3. Tên cơ quan thống kê.** V1 ghi "Tổng cục Thống kê"; từ năm 2025 cơ quan này là Cục Thống kê thuộc Bộ Tài chính (theo hiểu biết, cần kiểm). Dẫn đúng tên cơ quan tại thời điểm công bố số liệu.
- **G4. Phạm vi bài 1 và bài 3.**
  - Bài 1: thêm ngủ trưa vào phạm vi (thói quen phổ biến ở Việt Nam, cả ở trường); chuyện "gan thải độc" làm khung ngộ nhận.
  - Bài 3: nối với công cụ C1, vì hồi quy về trung bình là một phần của "đáp ứng giả dược".
- **G5. "Bảng thành hình"** (linda, bon-kieu-gan-bo). Trên điện thoại, một bảng HTML hay danh sách co giãn đọc tốt hơn SVG chữ 11 px, lại tìm kiếm được và trình đọc màn hình đọc được. Chỉ vẽ SVG khi vị trí hay độ dài mang nghĩa.
- **G6. Trang Ngộ nhận.** Đặt các thẻ "Vững chắc" và "Khá vững" dưới một mục riêng, ví dụ "Nghe như lời đồn nhưng có cơ sở", để người đọc không hiểu "ngộ nhận" là "sai".

## Phụ lục A. Câu chữ cho cột "Rủi ro, cách viết" của bảng M1–M2

| Bài | Rủi ro, cách viết |
|---|---|
| 1. Giấc ngủ | Không khuyên dùng thuốc ngủ hay melatonin; mất ngủ kéo dài thì đi khám; khuyến nghị theo tuổi ghi nguồn và năm. |
| 3. Giả dược | Không gợi ý thay điều trị bằng "niềm tin"; phân biệt hiệu ứng giả dược với diễn tiến tự nhiên và hồi quy về trung bình; hiệu ứng chủ yếu ở triệu chứng tự báo (theo hiểu biết, cần mở nguồn); Opus cho nhãn. |
| 6. Đánh con | Nói cả sự tuân thủ ngay lúc ấy lẫn kết cục lâu dài; nói rõ tranh luận về nhân quả; nêu các cách thay thế đã có thử nghiệm; giọng không lên lớp; điều luật ghi là `thoi-su`, có hạn; dẫn Hỗ trợ và Tổng đài 111. |
| 8. Thiền | Chỉ bàn chương trình thế tục đã có thử nghiệm (MBSR, MBCT); không đánh giá giáo lý hay việc tu tập ở chùa; nêu tác dụng phụ; MBCT là câu `lam-sang`, không khuyên thay điều trị; dẫn Hỗ trợ. |
| 11. Căng thẳng kéo dài | Triệu chứng cơ thể cần đi khám trước khi quy cho căng thẳng; "suy tuyến thượng thận" làm khung ngộ nhận (cần mở nguồn). |
| 14. Kiệt sức | Kiệt sức là "hiện tượng nghề nghiệp" theo ICD-11, không phải chẩn đoán (cần mở nguồn); phân biệt với trầm cảm; không có thang tự chấm; dẫn Hỗ trợ. |
| 15. Lo âu thi cử | Theo hướng dẫn đưa tin an toàn: không gắn tự tử với điểm thi, không kể trường hợp cụ thể; Hỗ trợ ở đầu và cuối bài; Tổng đài 111. |
| 18. Màn hình | Không có danh sách dấu hiệu tự kỷ; "tự kỷ ảo" không phải chẩn đoán (cần kiểm ICD-11, DSM-5-TR); thấy dấu hiệu chậm phát triển thì đưa trẻ đi đánh giá; nói rõ độ chắc chắn của khuyến nghị WHO; nên có chuyên gia đọc. |
