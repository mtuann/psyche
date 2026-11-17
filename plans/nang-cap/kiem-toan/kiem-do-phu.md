# Kiểm độ phủ nội dung và đề xuất mở rộng (psyche, 17/11/2026)

Chỉ đọc repo, không sửa gì. Số liệu đếm từ `src/data/trang.yml`, `src/content/docs/`, `src/data/ngo-nhan.yml`.

**Nguồn và độ chắc.** Mục lục OpenStax *Psychology 2e* và các chủ đề cốt lõi của APA Introductory Psychology Initiative: **theo hiểu biết, chưa mở nguồn**. Đã thử mở openstax.org, chỉ lấy được mục lục chương 1 (1.1 What Is Psychology?, 1.2 History of Psychology, 1.3 Contemporary Psychology, 1.4 Careers in Psychology), khớp với hiểu biết. Mọi tên nghiên cứu, năm, tạp chí ở dưới đều **theo hiểu biết, chưa mở nguồn**; agent viết bài phải mở và đọc từng nguồn trước khi dùng. Mục "Việt Nam" chỉ là hướng tìm, chưa kiểm chứng.

---

## 0. Tóm tắt

**Hiện trạng đếm được.** 68 bài lõi, 12 mở rộng, 13 công cụ (11 + 2 trang dữ liệu cá nhân), 60 thẻ ngộ nhận (nhãn: 42 bác bỏ, 16 tranh cãi, 2 vững chắc; **không thẻ nào ở nhãn "khá vững"**), 27 hình, 0 bổ sung. Lõi + mở rộng theo lĩnh vực: Phương pháp 14+0; Xã hội 10+0; Phát triển 7+2; Tư duy–trí tuệ 6+1; Học tập 5 (chỉ thí nghiệm) +0; Cảm xúc 4+1; Cơ sở sinh học 4+2; Trí nhớ 4+1; Tri giác 4+1; SKTT 4+0; Tính cách 2+1; Ý thức–giấc ngủ 2+0; Căng thẳng–sức khỏe 1+1; Hạnh phúc 1+2.

**Năm lỗ hổng lớn nhất:**

1. **Cả mảng "sống hằng ngày" của người đọc Việt Nam gần như trống:** giấc ngủ (chỉ có "ngủ và trí nhớ", "giấc mơ"), nuôi dạy con (0 bài; từ khóa "nuôi dạy" chỉ lướt qua trong 4 bài), công việc và kiệt sức (OpenStax chương 13 không có gì; "burnout" 0 trang), các mối quan hệ và cô đơn (0 bài; "cô đơn" chỉ 1 trang), chơi game, tự trọng, màn hình với trẻ nhỏ.
2. **Hai lĩnh vực "mỏng" theo mục 9 đúng là hai lĩnh vực người đọc cần nhất** (Căng thẳng và sức khỏe, Hạnh phúc), nhưng mục 9 chỉ cho Căng thẳng một bài (giả dược) và đẩy Hạnh phúc xuống đợt C. Trong khi đợt A dành 2 chỗ cho Cơ sở sinh học (neuron, tính dẻo) vốn đã 4 lõi + 2 mở rộng.
3. **Sức khỏe tâm thần chỉ có 2 rối loạn (trầm cảm, lo âu) trên 16 chương OpenStax về rối loạn và trị liệu.** Thiếu: định nghĩa "rối loạn" và kỳ thị, sang chấn, rối loạn phát triển thần kinh (ADHD, tự kỷ: 0 trang nhắc; phụ huynh Việt hay hỏi), tâm thần phân liệt, thuốc. Ba trong bốn bài SKTT chưa có mục "Ở Việt Nam" dù site đã cầm sẵn dữ liệu NAMHS 2021.
4. **Công cụ chỉ ở nhận thức và tính cách** (Tri giác 4, Trí nhớ 3, Tư duy 3, Tính cách 1). Học tập, xã hội, cảm xúc, phát triển, sức khỏe: 0.
5. **Thiếu "lớp nối":** không từ điển Việt–Anh, không lộ trình đọc, không trang "đọc tin tâm lý trên báo", không chủ đề "văn hóa và tâm lý" (APA IPI coi đa dạng văn hóa là chủ đề xuyên suốt; site chỉ có mục "Ở Việt Nam" lẻ tẻ và bài mẫu WEIRD).

**Phản biện chính về mục 9** (chi tiết mục 2):

- Đảo thứ tự đợt A: giấc ngủ lên đầu; điều kiện hóa giữ vị trí nhưng coi là bài "lót" rẻ; neuron và tính dẻo xuống sau.
- **Tách "Thiền và thôi miên":** hai nền bằng chứng khác hẳn (thiền/chánh niệm đang tranh cãi, rất hợp người đọc Việt; thôi miên đã có thẻ `thoi-mien`).
- **Đợt C không nên chờ chuyên gia mới bắt đầu:** cơ chế `nguoi.cho_chuyen_gia` (đã dùng cho 4 bài SKTT) cho đăng trước. "Thế nào là rối loạn tâm thần và kỳ thị" là nhu cầu cao nhất của người Việt, nên lên đợt B.
- Hạnh phúc đừng để cuối: "quan hệ gần gũi và hạnh phúc" là bài mở rộng có bằng chứng chín, làm sớm.
- Thiếu các chủ đề giá trị cao: nuôi dạy (phạt đòn), làm việc nhóm (lười nhóm), burnout, tư duy phát triển, lo thi cử, màn hình–game, ảnh chụp não.
- Ưu tiên bài **mở rộng** cho chủ đề còn biến động (V2, rẻ hơn V3), nhưng tính thêm gánh xem lại hằng năm.

---

## 1. Độ phủ so với giáo trình nhập môn

Ký hiệu hình thức: **L** bài lõi, **M** bài mở rộng, **B** bổ sung có ngày cho bài đã khóa (không mở khóa), **N** thẻ ngộ nhận, **T** mục từ điển, **H** hình hay công cụ riêng. "Mở khóa" ghi rõ khi cần.

### 1.1 Theo chương OpenStax (theo hiểu biết, chưa mở nguồn trừ chương 1)

| Chương | Đã có trên site | Khái niệm cốt lõi còn thiếu → hình thức |
|---|---|---|
| 1 Introduction | `bat-dau/index` (tâm lý học là gì và không là gì), Bạn nghĩ gì về tâm trí? | Lịch sử và trường phái (Wundt, James, Freud, hành vi, nhận thức, nhân văn) → **L** (mục 9 đã có). Các ngành và nghề (lâm sàng, tư vấn học đường, công nghiệp–tổ chức) khác nhau thế nào → **T** + một mục trong lộ trình; không cần bài riêng (`tim-giup-do` đã nói vai trò chuyên môn). Phân biệt tâm lý học dân gian với khoa học → đã ở `bat-dau/index`. |
| 2 Research | 12 bài Hiểu bằng chứng | Thiết kế quan sát: khảo sát, nghiên cứu trường hợp (0 trang), quan sát tự nhiên, cắt ngang và dọc (có nhắc, không có bài) → **M** hay **B** cho `tuong-quan-nhan-qua`; Hawthorne và đặc điểm đòi hỏi (demand characteristics) (0 trang) → **T**; thiên lệch công bố (0 trang; "đăng ký trước" có 22 trang) → **T** + **B** cho `khung-hoang-tai-lap`; Ảnh chụp não nói được gì (suy luận ngược, fMRI) → **L** (mục 2.3). |
| 3 Biopsychology | `nao-che-doi`, `gen-va-tinh-cach`, `nao-tuoi-teen`, `tam-ly-tien-hoa`; mở rộng `dopamine`, `the-duc-nao` | Neuron, synapse, chất dẫn truyền → **L** (mục 9); tính dẻo → **L** (mục 9) + **N** "người lớn não không đổi" (đã có `than-kinh-moi`, kiểm khớp); hệ thần kinh tự chủ, hóc-môn (cortisol, oxytocin; chỉ lướt 4 trang) → nên là một mục trong bài neuron hay căng thẳng, không bài riêng; các vùng não và chức năng (amygdala, hồi hải mã, vỏ trước trán: lẻ tẻ trong 3 bài) → **T**; phương pháp chụp não → **L** như trên. |
| 4 States of Consciousness | `ngu-va-tri-nho`, `giac-mo` | Giấc ngủ và nhịp sinh học (0 trang "nhịp sinh học", 0 "melatonin") → **L** (ưu tiên 1); thôi miên → **N** có sẵn, bài tùy chọn; thiền/chánh niệm (1 trang nhắc) → **M**; chất kích thích (rượu, caffeine, nicotine) → **M** muộn (chủ đề thuộc sức khỏe; nguồn WHO); mất ngủ (rối loạn) → **L** SKTT, đợt C. |
| 5 Sensation and Perception | 3 lõi + 1 mở rộng + 1 thí nghiệm + 4 công cụ | Tri giác là suy đoán (trên xuống, bảng ghi mục 3) → **L**; tổ chức tri giác (Gestalt), tri giác chiều sâu → **T** hoặc mục trong bài trên; **cơn đau** (cổng kiểm soát, đau mạn tính) → **M** thuộc Căng thẳng–sức khỏe; vị giác, khứu giác, thăng bằng → **T**; ngưỡng cảm giác và "quảng cáo tiềm thức" (0 trang) → **N**. |
| 6 Learning | 5 thí nghiệm, 0 bài | Điều kiện hóa → **L** (mục 9); ác cảm vị giác Garcia (1 trang nhắc) và học tiềm ẩn (Tolman) → mục trong bài điều kiện hóa; "phạt" (so với thưởng) → trong **M** phạt đòn (mục 2.3); học qua quan sát đã ở Bandura. |
| 7 Thinking and Intelligence | 6 lõi + 1 mở rộng | Ngôn ngữ định hình tư duy (Sapir–Whorf; 0 trang) → **L** (mục 9); giải quyết vấn đề và sáng tạo (cố định chức năng, ủ ý, brainstorming nhóm) → **M** (gộp, mục 2.1); đa trí tuệ Gardner (2 trang chỉ nhắc) → **N**; khái niệm, nguyên mẫu (prototype) → **T**; song ngữ và nhận thức → **M**. |
| 8 Memory | 4 lõi + 1 mở rộng + công cụ | Các loại trí nhớ (giác quan, ngắn hạn/dài hạn, ngoại diễn, ngữ nghĩa, thủ tục; ca H.M. 0 trang) → **L**; mã hóa sâu (Craik–Lockhart) → mục trong bài trên; kỹ thuật nhớ (lộ trình, vị trí) → **T**. Quên, ký ức sai, trí nhớ làm việc đã đủ. |
| 9 Lifespan Development | 5 lõi, 2 mở rộng, 3 thí nghiệm | Thuyết tâm trí → **L**; phát triển đạo đức → **L** (muộn); khí chất (Thomas–Chess) → **T** hay mục; phong cách nuôi dạy và phạt → **M**; màn hình và trẻ nhỏ → **M**; tự trọng → **M**; thai kỳ và sơ sinh (chất gây dị tật, khả năng cảm giác của trẻ sơ sinh) → **T**, bài muộn; trưởng thành và giữa đời (hôn nhân, làm cha mẹ) → **M** quan hệ; **đau buồn mất người thân và "năm giai đoạn"** (0 trang) → **N** trước, bài sau (lâm sàng). |
| 10 Emotion and Motivation | 4 lõi + 1 mở rộng + Schachter | Nhu cầu và động lực (Maslow tới thuyết tự quyết) → **L** (mục 9); đường cong Yerkes–Dodson (0 trang) → **N**; thuyết cảm xúc (James–Lange, Cannon–Bard) → **T** hay một mục (Schachter đã là nhà); động cơ thành tích (grit) → gộp vào **M** tư duy phát triển. Ăn uống, cân nặng, tình dục: không đề xuất (bằng chứng và nguồn kém hợp một site nhập môn; không có nhu cầu rõ). |
| 11 Personality | `big-five`, `tinh-cach-thay-doi`, `mbti` | Các cách tiếp cận (tâm động học, nhân văn, hành vi, nhận thức–xã hội) → **L** nhưng nên đổi khung: "Tính cách do người hay do hoàn cảnh?" (tranh luận người–tình huống, Mischel) → mục 2.1; trắc nghiệm phóng chiếu (Rorschach, vẽ cây-nhà-người) → **N** nếu xác nhận phổ biến ở Việt Nam; tính cách và văn hóa → **B** hay **M** văn hóa. |
| 12 Social Psychology | 4 lõi + 6 thí nghiệm | Lỗi quy kết cơ bản → **L** (mục 9) + công cụ; hấp dẫn và quan hệ → **L** + **M**; **hành vi nhóm** (lười nhóm, phân cực nhóm, tư duy nhóm) → **L/M** (thiếu hẳn); bản ngã và tự trọng → **M**; hung hăng (Bandura nhà), giúp đỡ (Darley nhà) đã đủ. |
| 13 Industrial–Organizational | **0** | Hài lòng công việc và động lực lao động, tuyển dụng (phỏng vấn, trắc nghiệm), lãnh đạo, làm việc nhóm, kiệt sức → **M** (mục 2.3); cần quyết định có thêm lĩnh vực thứ 15 không (mục 2.1). |
| 14 Stress, Lifestyle, Health | `doi-pho-stress`, `stress-co-hai` | Hỗ trợ xã hội làm đệm stress, giả dược, đau, kiệt sức, thiền, giấc ngủ, hành vi sức khỏe, stress và miễn dịch (Cohen: cảm lạnh) → **L/M** theo mục 3; kiểu hành vi A (Type A) → **N** hay **T**. |
| 15 Psychological Disorders | `tram-cam`, `lo-au`, `tim-giup-do` | Thế nào là rối loạn (ICD, DSM, ranh giới bình thường–bệnh), kỳ thị → **L**; sang chấn và PTSD → **L**; ADHD, tự kỷ → **L/M** (cân nhắc, mục 2.3); tâm thần phân liệt, lưỡng cực, rối loạn ăn uống, nhân cách → để sau, chỉ khi có chuyên gia; tự hại và tự tử → **không làm bài**; nâng cấp trang Hỗ trợ (đã `co-han`). |
| 16 Therapy and Treatment | `tri-lieu-tam-ly` (CBT) | Tâm động học, nhân văn → mục trong **L** "trường phái" hay **B** cho `tri-lieu-tam-ly`; thuốc tâm thần (nguồn NICE, WHO) → **L** SKTT, đợt C, Opus; thẻ "thuốc chống trầm cảm gây nghiện" → **N** cần chuyên gia; tư vấn khác trị liệu khác coaching → **T**. |

### 1.2 Theo APA Introductory Psychology Initiative (theo hiểu biết, chưa mở nguồn)

Năm trụ nội dung (sinh học, nhận thức, phát triển, xã hội–tính cách, sức khỏe tinh thần và thể chất) cộng bốn chủ đề xuyên suốt (tư duy khoa học và phản biện, đạo đức, đa dạng văn hóa–xã hội, ứng dụng). Site phủ tốt tư duy khoa học và đạo đức (`bang-chung/*`). Thiếu rõ: **đa dạng văn hóa** (không bài nào) và **ứng dụng ngoài giáo dục** (công việc, nuôi dạy, sức khỏe).

---

## 2. Phản biện danh sách đã duyệt (mục 9)

### 2.1 Từng dòng

| Mục 9 | Nhận xét | Đề xuất |
|---|---|---|
| Điều kiện hóa (A) | Đúng là lỗ lớn nhất của một lĩnh vực: Học tập có 5 thí nghiệm và 0 bài. **Chi phí thấp**: phần lớn câu trong bài tóm lại khẳng định đã khóa ở 5 trang nhà; chỉ cần mở nguồn cho Garcia, Rescorla, "phạt khác thưởng". Nhưng sức hút với người đọc trung bình thấp. | Giữ ở A, coi là bài lót làm cùng lô giấc ngủ. Hình tự nhiên: bảng 2×2 (thêm/bớt × dễ chịu/khó chịu → tăng/giảm hành vi) và lịch tăng cường (đã có hình `skinner-schedules`, tái dùng nếu bài mới không lặp). |
| Neuron và chất dẫn truyền (A) | Cần cho `dopamine` (`dua_tren`). Nhưng thiên về định nghĩa (loại `dinh-nghia`, OpenStax + APA Dictionary là đủ), rẻ kiểm. Nhu cầu người đọc vừa. | Giữ, nhưng sau giấc ngủ. Gộp "hóc-môn và hệ thần kinh tự chủ" thành một mục (stress, cortisol) để khỏi mọc thêm bài. |
| Tính dẻo của não (A) | Giá trị cao vì thẻ `than-kinh-moi`, "não người lớn không đổi" và phụ huynh quan tâm. Bằng chứng chín cho tính dẻo là có (Maguire taxi; Erickson ở `the-duc-nao` đã nằm trên site). | Giữ, rút xuống đợt A cuối. Cẩn thận ranh "tính dẻo" thành từ khóa bán hàng ("rèn não"). |
| Giấc ngủ và nhịp sinh học (A) | Nhu cầu cao nhất trong 8 dòng của A: thức khuya ôn thi, điện thoại, giờ giấc trường học; 3 thẻ ngộ nhận liên quan (`thuc-khuya-on-thi`, `ngu-it-da-quen`, `hoc-khi-ngu`) cho thấy chủ đề này có chỗ đứng. Bằng chứng chín (đồng thuận AASM/SRS, nghiên cứu Roenneberg, Carskadon). | **Làm đầu tiên.** Nên kèm một mở rộng "giấc ngủ teen và điện thoại ban đêm" (mục 4, #10). |
| Thiền và thôi miên (A) | **Nên tách.** Thôi miên: bằng chứng chủ yếu về giảm đau và gợi ý, thẻ `thoi-mien` đã bác "nhớ chính xác". Thiền/chánh niệm: tranh cãi lớn (Goyal 2014; Galante 2021; Van Dam 2018 "Mind the Hype"; tác dụng phụ), và người đọc Việt vừa quan tâm thiền thế tục vừa có bối cảnh Phật giáo: bài phải giới hạn rõ ở chương trình thế tục có thử nghiệm, không đụng giáo lý. Bằng chứng còn biến động nên là mở rộng, không phải lõi. | Chuyển "thiền/chánh niệm" thành **M** (có hạn xem lại); bỏ thôi miên khỏi A (có thẻ rồi; làm bài khi rảnh). |
| Hiệu ứng giả dược (A) | Có trùng một phần với `thi-nghiem-doi-chung` (nhắc giả dược). Nhu cầu người Việt: có (thuốc "bổ", "liệu pháp"), nhưng chạm lâm sàng. | Giữ nhưng hạ xuống cuối A hay đầu B; làm sau khi có bài cơn đau để hai bài không lặp nhau. |
| Nhu cầu và động lực (A) | Thẻ `thap-maslow` đã có; giáo trình Việt (GDCD, quản trị, marketing) dạy tháp Maslow nên nhu cầu thật. Cần xử lý đúng "tháp" không phải của Maslow (theo hiểu biết: Bridgman 2019). | Giữ ở A, ưu tiên sau giấc ngủ. |
| Lịch sử và trường phái (A) | Là bản đồ tốt nhưng ít lôi cuốn người đọc ngoại ngành; chủ yếu câu `lich-su`, ít tranh cãi. Dễ rơi vào huyền thoại ("phòng thí nghiệm đầu tiên 1879"). | Hạ xuống **đầu B**; viết sau điều kiện hóa để dẫn chiếu. Tận dụng cho cả "các cách tiếp cận tính cách". |
| Lỗi quy kết cơ bản (B) | Tốt, có sẵn thí nghiệm kinh điển (Jones–Harris 1967) làm công cụ. | Giữ B; kèm công cụ (mục 5). |
| Hấp dẫn và các mối quan hệ (B) | **Tách làm hai**: (a) L "Điều gì khiến ta bị hấp dẫn?" (gần gũi, tiếp xúc lặp lại, giống nhau; bằng chứng chín nhưng lưu ý tái lập và trùng với phần chọn bạn đời đã có ở `tam-ly-tien-hoa`, nên chỉ một câu và link); (b) M "Quan hệ gần gũi, cô đơn và hạnh phúc" thuộc Hạnh phúc (Holt-Lunstad). Ghép chung lõi sẽ đòi kiểm định V3 cho bằng chứng còn biến động. | Tách, đưa (b) lên sớm (mục 4, #8). |
| Thuyết tâm trí (B) | Giá trị trung bình cho người đọc phổ thông; bằng chứng chín (Wellman 2001). | Giữ B, cuối. Có thể làm công cụ "niềm tin sai" nhưng xem mục 5. |
| Phát triển đạo đức (B) | Chủ yếu lịch sử và phê bình (Kohlberg, Gilligan, văn hóa), giá trị thấp cho người đọc. | Hạ xuống C hay gộp vào "trường phái". |
| Ngôn ngữ định hình tư duy (B) | Hấp dẫn, có móc Việt: tiếng Việt dùng chung "xanh" cho cả hai màu (xác minh trước khi viết). | Giữ B, nằm giữa. |
| Giải quyết vấn đề (B) | Nên **gộp** với sáng tạo (cố định chức năng, ủ ý, brainstorming nhóm kém hơn làm riêng) và làm **mở rộng**. | Gộp, hạ xuống cuối B. |
| Các cách tiếp cận tính cách (B) | Khung "bốn trường phái" nghe như giáo trình, ít nhu cầu. | Đổi khung thành "Tính cách do người hay do hoàn cảnh?" (tranh luận người–tình huống); phần trường phái chuyển sang bài lịch sử. |
| Thế nào là rối loạn tâm thần; Sang chấn (C) | Đợt C ghi "làm khi đã có chuyên gia". Nhưng cơ chế `nguoi.cho_chuyen_gia` đã cho phép đăng trước kèm dải "Chưa qua rà soát chuyên môn" (dùng cho cả 4 bài SKTT). Nhu cầu của người Việt ở đây là cao nhất trong cả danh sách (kỳ thị, hiểu lầm "bệnh tâm thần"). | Đưa "Thế nào là rối loạn tâm thần" lên đầu B; làm với Opus cả hai lượt, đăng trước với dải cảnh báo; Sang chấn ngay sau. |
| Hạnh phúc (C) | Hạnh phúc chỉ 1 lõi + 2 mở rộng, nhưng "Chưa có trong bảng chỗ trống" làm nó rơi cuối. Bằng chứng cho các mối quan hệ và hạnh phúc chín hơn nhiều bài khác. | Làm bài mở rộng ngay (#8), vì mở rộng không cần ghi vào bảng chỗ trống. |

### 2.2 Chỗ trống khái niệm không có trong mục 9

Giá trị cao, bằng chứng đủ chín để viết theo chuẩn của site:

1. **Nuôi dạy con và phạt đòn** (có tục ngữ "thương cho roi cho vọt"): tổng quan và phân tích tổng hợp lớn, hướng dẫn chính thức của AAP, WHO.
2. **Làm việc nhóm: lười nhóm** (bài tập nhóm, công ty): phân tích tổng hợp Karau & Williams 1993.
3. **Kiệt sức vì công việc**: định nghĩa chính thức của ICD-11 (hiện tượng nghề nghiệp, không phải bệnh), có tranh cãi về khái niệm.
4. **Tư duy phát triển** (học đường): các phân tích tổng hợp cho hiệu ứng nhỏ, có tranh luận; hợp bài mở rộng.
5. **Lo lắng thi cử**: chạm thi cử, nguồn có (Cassady; von der Embse), tách khỏi rối loạn lo âu.
6. **Màn hình với trẻ nhỏ, chơi game**: có hướng dẫn WHO, ICD-11, nghiên cứu lớn.
7. **Ảnh chụp não và tin "vùng não sáng lên"**: khớp trục "đọc tin" của site.
8. **Văn hóa và tâm lý** (cá nhân và tập thể, WEIRD): thiếu theo APA IPI.
9. **Tự trọng**, **cô đơn**.
10. **ADHD và tự kỷ** cho phụ huynh: nhu cầu cao nhưng chạm lâm sàng; chỉ làm với Opus, đăng trước kèm dải cảnh báo, sau khi xong "Thế nào là rối loạn".

### 2.3 Thứ tự và chi phí

- **Không dồn lĩnh vực nhiều bài** (Cơ sở sinh học đã 6 bài, Xã hội 10) trước lĩnh vực mỏng cần người đọc nhất (Căng thẳng 2, Hạnh phúc 3, Ý thức 2).
- **Chi phí V3** (hai lượt đủ, mỗi bài lõi 1–2 phiên) cao với bài lõi. Bằng chứng đang biến động (thiền, tư duy phát triển, game, burnout, màn hình, quan hệ) nên đi **mở rộng** (V2, lượt 2 mẫu 8 câu): rẻ hơn, nhưng mỗi bài thêm 1 lần kiểm lại 12–18 tháng. Thêm 10 bài mở rộng là ~10 phiên kiểm lại/năm; chấp nhận được, ghi vào kế hoạch.
- **Bài "lót" rẻ trước**: điều kiện hóa, lịch sử, neuron (nhiều định nghĩa, ít tranh cãi). Bài rủi ro nhãn (thiền, giả dược, rối loạn, sang chấn) dùng Opus cho phần nhãn.
- **Lô lớn đề xuất:** Lô 1 (giấc ngủ, điều kiện hóa, nuôi dạy/phạt đòn, tư duy phát triển, lười nhóm, kiệt sức, 3 thẻ ngộ nhận mới); Lô 2 (rối loạn và kỳ thị, quan hệ và hạnh phúc, thiền, giấc ngủ teen, neuron, nhu cầu và động lực); Lô 3 (còn lại).

---

## 3. Nội dung ngoài bài viết

### 3.1 Từ điển thuật ngữ Việt–Anh

- **Giá trị: cao.** Người đọc gặp tiếng Anh trong ngoặc ở lần đầu, nhưng không có chỗ tra lại; sinh viên và người đọc báo cần đối chiếu. Cải thiện tìm kiếm (gõ "heuristic" ra "đường tắt tư duy").
- **Hình thức:** trang `du-lieu` sinh từ `src/data/thuat-ngu.yml` như trang Ngộ nhận. Mỗi mục: tên Việt, tên Anh, định nghĩa một hai câu, link tới trang đã giải thích. Đưa định nghĩa lấy từ câu đã khóa của trang liên quan (không viết mới), nguồn APA Dictionary khi cần.
- **Chi phí:** mã (schema Zod, trang sinh, tìm kiếm, kiểm thử): 1–2 phiên Opus, review mức lớn. Nội dung: lô 60–80 mục × 1 phiên Sonnet mỗi lô, hai lượt. Mỗi định nghĩa là câu loại `dinh-nghia`.
- **Rủi ro:** định nghĩa lệch với câu trong bài; nhiều thuật ngữ Việt hóa không thống nhất (chọn một bản dịch và giữ). Cách giảm: chỉ dùng thuật ngữ đã xuất hiện ở trang khóa, `o_dau` trỏ về trang gốc để kiểm thử chéo.

### 3.2 Lộ trình đọc

- **Giá trị: cao, chi phí thấp.** 120 trang không có thứ tự gợi ý. Ba lộ trình: **người mới** (10 bài: `bat-dau/*`, `bang-chung` chọn lọc, `tu-duy-nhanh-cham`, `thien-kien-xac-nhan`…), **phụ huynh** (có thể làm sớm từ bài sẵn có: `tre-hoc-the-nao`, `gan-bo`, `tre-hoc-noi`, `keo-deo`, `harlow`, `nao-tuoi-teen`, `mang-xa-hoi-teen`, `tam-ly-hoc-duong`; hoàn chỉnh sau mục 4 #3, #5, #17), **sinh viên** (`duong-cong-quen`, `ngu-va-tri-nho`, `phong-cach-hoc`, `dunning-kruger`, phương pháp).
- **Hình thức:** trang `khung`, ít khẳng định (chủ yếu `ve-site`), nên dễ qua kiểm định. 1 phiên Sonnet mỗi trang, lượt 2 nhẹ.
- **Rủi ro:** trang khung đã khóa theo `trang.yml`; thêm trang mới phải thêm bản ghi, menu (`src/menu.mjs`). Lộ trình chết khi trang "sắp có" lên, nên viết lộ trình sau khi bài chính có.

### 3.3 Trang "Đọc tin tâm lý trên báo"

- **Giá trị: cao.** Gom các bài Hiểu bằng chứng thành một danh sách kiểm 6–8 câu hỏi khi gặp tít báo ("Nghiên cứu cho thấy…": có nhóm đối chứng không, mẫu là ai, tương quan hay nhân quả, độ lớn, đã tái lập chưa, ai tài trợ). Hợp tinh thần site; dễ chia sẻ.
- **Hình thức:** bài lõi lĩnh vực Phương pháp (hay trang `bat-dau`), một khối "thử với tít báo": dùng **tít dựng sẵn, ghi rõ giả định** (`gia-dinh`), không trích báo thật để tránh sai lệch hay bản quyền. 1 phiên. **Hình:** quy trình 6 bước (sơ đồ).
- **Rủi ro:** lặp lại 12 bài Hiểu bằng chứng; mỗi câu chỉ một câu và link về bài nhà. Một ví dụ thật từ báo Việt Nam có thể làm nên bài nhưng phải kiểm: để dành làm bổ sung sau.

### 3.4 Bổ sung "Ở Việt Nam"

Tình trạng (đếm bằng grep): 71 trang có mục "## Ở Việt Nam…", 71 trang có câu "chưa tìm thấy" (68 trang có cả hai; một số câu nằm ở trang công cụ, `cach-kiem-chung`, `ho-tro`); ba bài SKTT (`tram-cam`, `lo-au`, `tim-giup-do`) **không có mục này**; `mang-xa-hoi-teen`, `tam-ly-hoc-duong` đã có số liệu Việt (NAMHS 2021, nghiên cứu Huế 2024, Dam 2023). Bổ sung `viet-nam` nên ưu tiên (hướng tìm, **chưa kiểm chứng**):

| Bài | Hướng tìm | Ghi chú |
|---|---|---|
| `tram-cam`, `lo-au` | NAMHS 2021 (dữ liệu đã có trong site, trang khác dẫn) và điều tra quốc gia về sức khỏe tâm thần người lớn nếu có; Opus | `lam-sang`, cần cẩn trọng; dải chuyên gia |
| `ngu-va-tri-nho` | Nghiên cứu về giấc ngủ học sinh Việt Nam (thời gian ngủ, giờ vào học) | Hợp với bài giấc ngủ mới |
| `tuoi-gia` | Khảo sát tuổi già, VNHS/chương trình UNFPA | Đã có chút dữ liệu |
| `gan-bo`, `tre-hoc-noi` | Nghiên cứu thụ đắc thanh điệu trẻ Việt; gắn bó ở trẻ Việt | Mục 6 README đã gợi ý |
| `dinh-kien`, `phu-hop-so-dong` | Nghiên cứu đa quốc gia có mẫu Việt Nam (Hofstede-kiểu); Asch đa văn hóa (Bond & Smith 1996 có mẫu châu Á, **kiểm xem có Việt Nam không**) | Chỉ ghi khi có mẫu Việt Nam |
| `the-duc-nao`, `tien-va-hanh-phuc` | Gallup World Poll, World Happiness Report có Việt Nam; ghi rõ "xếp hạng" là thời sự | `thoi-su`, có hạn |
| `da-nhiem-so`, `mang-xa-hoi-teen` | Điều tra học sinh dùng điện thoại; ghi nhận lái xe máy và điện thoại | Mục 6 README |

- **Giá trị: trung bình đến cao** (thể hiện tinh thần "cho người Việt"). **Chi phí:** 30–90 phút mỗi bổ sung, Sonnet; Opus cho SKTT. **Rủi ro:** mẫu nhỏ, đo khác, dễ so sánh sai; mỗi bổ sung phải ghi đúng giới hạn, không suy ra "người Việt khác".

### 3.5 Công cụ cho lĩnh vực chưa có

Quy tắc: không tự chẩn đoán; số liệu trong mã phải vào hồ sơ (`NGHIEN_CUU`).

| Lĩnh vực | Ứng viên | Đánh giá |
|---|---|---|
| Học tập | **Lịch tăng cường**: nút nhấn, thưởng theo tỉ lệ cố định/biến thiên/khoảng; biểu đồ nhịp nhấn. Khớp hình `skinner-schedules`; liên hệ "cuộn mạng xã hội". Cần chú ý không tuyên bố mạng xã hội "gây nghiện". | **A.** 1–2 phiên Opus. Sau bài điều kiện hóa. |
| Xã hội | **Lỗi quy kết** theo Jones–Harris 1967 (đọc bài luận do được giao/tự chọn, đoán quan điểm tác giả). Chủ đề trung tính (ví dụ "học thêm"). | **A.** 1–2 phiên Opus, khuôn của `neo-gia`. Số liệu gốc cần mở bài. |
| Sức khỏe | **Giờ ngủ giữa (chronotype thô)** theo MCTQ, hay nhật ký giấc ngủ có tính hiệu suất. Chỉ là tự theo dõi, **không** gọi "rối loạn". Cần kiểm bản quyền thang. | B. 2 phiên Opus, sau bài giấc ngủ. |
| Cảm xúc | Không có ứng viên tốt: nhận diện khuôn mặt cần ảnh (cấm); thang cảm xúc tự báo gần với đo trạng thái. | C. Đề nghị bỏ; thay bằng hình. |
| Phát triển | Bài thử niềm tin sai cho người lớn ít giá trị. | C. Bỏ. |

### 3.6 Thẻ ngộ nhận mới

Cơ chế: mỗi thẻ 20–40 phút Sonnet, hai lượt, khóa bản ghi. Đề xuất các khẳng định phổ biến (cần xác nhận mức phổ biến ở Việt Nam bằng báo/mạng trước khi viết). **Nhãn dưới đây là nhãn dự kiến, theo hiểu biết, chưa mở nguồn.**

| Khẳng định | Nhãn dự kiến | Nguồn hướng tìm | Trang liên quan |
|---|---|---|---|
| "Thương cho roi cho vọt": đánh con làm con ngoan | bác bỏ hay khá vững "gây hại" (xem kỹ nhãn) | Gershoff & Grogan-Kaylor 2016 | skinner, bandura, bài mới |
| "0–3 tuổi là giai đoạn vàng; qua rồi là muộn" | tranh cãi | Bruer 1999; tổng quan về giai đoạn nhạy cảm | tre-hoc-the-nao, gan-bo |
| Cung hoàng đạo quyết định tính cách | bác bỏ | Carlson 1985 (Nature) | big-five, mbti |
| Thứ tự sinh (con cả/út) quyết định tính cách | bác bỏ | Damian & Roberts 2015; Rohrer 2015 | gen-va-tinh-cach, big-five |
| Quảng cáo tiềm thức điều khiển hành vi mua | bác bỏ phần lớn | Karremans 2006; Pratkanis 1992 (huyền thoại Vicary) | thuyet-phuc |
| Mỗi người có nhiều loại thông minh (Gardner) nên chọn cách dạy hợp | tranh cãi | Waterhouse 2006; bài đã nhắc Gardner trong `tri-tue-la-gi` | tri-tue-la-gi, phong-cach-hoc |
| Đau buồn đi qua "năm giai đoạn" | bác bỏ phần lớn | Stroebe, Schut & Boerner 2017 | cần liên kết bài mới |
| Áp lực vừa phải thì làm tốt nhất (Yerkes–Dodson) | tranh cãi | Corbett 2015 | stress-co-hai, tam-ly-hoc-duong |
| Nam và nữ đến từ hai hành tinh khác nhau | bác bỏ phần lớn | Hyde 2005 (đồng dạng giới tính) | nao-nam-nu (thẻ có sẵn), tinh-cach |
| Thuốc chống trầm cảm gây nghiện | lâm sàng; cần chuyên gia | NICE, WHO | tram-cam |

- **Giá trị: cao** (rẻ, hợp mục tiêu "đập ngộ nhận" có nhãn rõ). Gợi ý thêm vài thẻ **"khá vững"** để cân bằng (hiện 0 thẻ), ví dụ "ngủ đủ giúp học tốt hơn" hay "ôn rải rác tốt hơn học dồn", tránh ấn tượng site chỉ biết bác bỏ.
- **Rủi ro:** thẻ lâm sàng (thuốc, đau buồn) cần Opus và nguồn hướng dẫn; "đánh con" cần phân biệt "liên quan" với "gây ra" và ghi rõ không phải lời khuyên điều trị hay nuôi dạy cá nhân.

### 3.7 Khác

- **Nâng bài mở rộng thành lõi** khi tới hạn (mục 9 đã có): không đề xuất thêm.
- **Trang Hỗ trợ:** không phải trọng tâm đợt này; đã `co-han`.
- **Cập nhật trang chủ/lĩnh vực:** sinh tự động.

---

## 4. Danh sách đề xuất cuối cùng (27 mục, xếp hạng)

Chi phí = số phiên Claude (theo `them-noi-dung.md` mục 1) cho viết + lượt 1; lượt 2 độc lập tính thêm ~0,5 phiên mỗi bài lõi, ~0,3 mỗi bài mở rộng. Cột "Nguồn" đều **theo hiểu biết, chưa mở nguồn**. "H" là hình hay công cụ tự nhiên cho chủ đề; hình chỉ dùng số đã có trong hồ sơ hay "cần nguồn mới".

| # | Tiêu đề (câu hỏi) | Lĩnh vực | Tầng | Vì sao | Nguồn chính có khả năng dùng | Chi phí | Phụ thuộc | Hình/công cụ |
|---|---|---|---|---|---|---|---|---|
| 1 | Ngủ bao nhiêu là đủ, và vì sao đồng hồ cơ thể quan trọng? | Ý thức–giấc ngủ | L | Lĩnh vực chỉ 2 bài, chủ đề nhu cầu cao nhất (thi cử, điện thoại); 3 thẻ liên quan | Watson 2015 (AASM/SRS), Hirshkowitz 2015 (NSF), Roenneberg (jet lag xã hội), Carskadon (teen), OpenStax 4.2 | 2 | `ngu-va-tri-nho`, `giac-mo`, `nao-tuoi-teen`; thẻ `thuc-khuya-on-thi`, `ngu-it-da-quen` | Hình: khuyến nghị giờ ngủ theo tuổi (số từ hướng dẫn, cần mở nguồn); công cụ sau (mục 3.5) |
| 2 | Học bằng liên tưởng và hệ quả: điều kiện hóa là gì? | Học tập | L | Lấp lĩnh vực 5 thí nghiệm, 0 bài; bài lót rẻ | OpenStax 6.1–6.3; Garcia 1966; Rescorla 1988; 5 trang nhà | 1–2 | pavlov, skinner, bandura, little-albert, seligman (tóm một câu, link nhà) | Hình: ma trận 2×2 củng cố/phạt; công cụ lịch tăng cường (#20) |
| 3 | Đánh con có làm con ngoan hơn? | Phát triển | M | Nhu cầu phụ huynh cao; bằng chứng chín; tục ngữ phổ biến | Gershoff & Grogan-Kaylor 2016 (J Fam Psychol); Gershoff 2002; hướng dẫn AAP 2018; WHO; UNICEF MICS Việt Nam (tìm) | 2 (Opus phần nhãn) | skinner, bandura, gan-bo, harlow | Hình: độ lớn hiệu ứng nhiều kết cục (cần số từ meta); thẻ N cùng chủ đề |
| 4 | Thế nào là "rối loạn tâm thần", và vì sao còn kỳ thị? | Sức khỏe tâm thần | L | Nhu cầu cao nhất ở SKTT; nền cho mọi bài lâm sàng; đăng trước với dải cảnh báo | ICD-11 và DSM-5-TR (chính thức); Thornicroft 2022 (Lancet, kỳ thị); NAMHS 2021 | 2 (Opus hai lượt) | tram-cam, lo-au, tim-giup-do | Hình: phổ bình thường–rối loạn (chữ, không số) |
| 5 | Tin rằng mình "có thể tiến bộ" có giúp học giỏi hơn? | Phát triển (hay Cảm xúc–động lực) | M | Học đường; tranh luận sống; nhỏ mà có điều kiện | Sisk 2018 (Psychol Sci); Macnamara & Burgoyne 2023 (Psychol Bull); Yeager 2019 (Nature) | 1–2 | keo-deo, pygmalion, tam-ly-hoc-duong; thẻ `khen-thong-minh` | Hình: độ lớn hiệu ứng ở vài phân tích tổng hợp (cần số từ nguồn) |
| 6 | Kiệt sức vì công việc: chuyện thật hay chỉ là mệt? | Căng thẳng–sức khỏe | M | Lĩnh vực 1+1; lấp chương I-O; nhãn chắc ở định nghĩa, tranh cãi ở khái niệm | ICD-11 (QD85, hiện tượng nghề nghiệp); Maslach & Leiter 2016 (World Psychiatry); Bianchi 2015 (trùng trầm cảm); Rotenstein 2018 (JAMA) | 1–2 (Opus nhãn) | stress-co-hai, doi-pho-stress, tram-cam (đối chiếu) | Hình: ba chiều kiệt sức (chữ) hay bảng so burnout–trầm cảm |
| 7 | Làm việc nhóm có hiệu quả hơn làm một mình? | Tâm lý xã hội | L (cần chủ repo duyệt thêm vào bảng) hay M | Bài tập nhóm, công ty; kinh điển giáo trình, thiếu ở site | Karau & Williams 1993 (JPSP); Latané 1979 (lười nhóm); Mullen 1991 (brainstorming nhóm) | 1–2 | darley-latane (trùng "phân tán trách nhiệm": một câu + link), phu-hop-so-dong | Hình: kết quả khi nhóm lớn dần (cần số từ nguồn) |
| 8 | Quan hệ gần gũi có làm ta sống khỏe và hạnh phúc hơn? | Hạnh phúc | M | Hạnh phúc 1 lõi; bằng chứng chín; gồm cô đơn, gia đình nhiều thế hệ | Holt-Lunstad 2010 (PLoS Med), 2015; Waldinger & Schulz 2023 (sách, nguồn phụ) | 1–2 | do-hanh-phuc, tien-va-hanh-phuc, gan-bo, tuoi-gia | Hình: độ lớn tương đương yếu tố nguy cơ (cần số) |
| 9 | Neuron và chất dẫn truyền: tín hiệu đi thế nào? | Cơ sở sinh học | L | Nền cho `dopamine` (`dua_tren`); định nghĩa, ít tranh cãi, rẻ | OpenStax 3.1, 3.2; APA Dictionary | 1 | dopamine (mở rộng sẽ link về) | Hình: sơ đồ synapse (không cần số) |
| 10 | Điện thoại ban đêm và giấc ngủ của tuổi teen | Phát triển (hay Ý thức) | M | Giao điểm giấc ngủ, mạng xã hội, thi cử; Việt Nam rất liên quan | Carter 2016 (JAMA Pediatrics); Hale & Guan 2015 | 1 | #1, mang-xa-hoi-teen, nao-tuoi-teen | Hình: tổng hợp kết quả (cần số) |
| 11 | Thiền và chánh niệm: khoa học nói gì (khác với tôn giáo)? | Căng thẳng–sức khỏe | M | Quan tâm rộng ở Việt Nam; bằng chứng tranh cãi; giới hạn ở chương trình thế tục | Goyal 2014 (JAMA IM); Galante 2021 (Lancet Public Health); Van Dam 2018 (Perspect Psychol Sci) | 1–2 (Opus nhãn) | stress-co-hai, doi-pho-stress | Hình: hiệu ứng so với điều trị đối chứng tích cực (cần số) |
| 12 | Giả dược có hiệu quả thật không? | Căng thẳng–sức khỏe | L | Bài mục 9; cần nối với đau | Hróbjartsson & Gøtzsche (Cochrane 2010); Kaptchuk; OpenStax 14 | 1–2 | thi-nghiem-doi-chung (tránh lặp), #15 | Hình: ba thành phần (chữ) |
| 13 | Não có thay đổi sau tuổi thơ không? (tính dẻo) | Cơ sở sinh học | L | Mục 9; khớp thẻ `than-kinh-moi`; phụ huynh | Maguire 2000; Erickson 2011 (nhà ở `the-duc-nao`); OpenStax 3.1 | 1–2 | #9, the-duc-nao, nao-tuoi-teen | Hình: dòng thời gian tính dẻo (chữ) |
| 14 | Nhu cầu nào thúc đẩy ta? (Maslow và thuyết tự quyết) | Cảm xúc–động lực | L | Mục 9; Maslow dạy ở trường; thẻ `thap-maslow` | Deci & Ryan 2000; Bridgman 2019 (nguồn gốc "tháp"); thuong-va-dong-luc | 1–2 | thuong-va-dong-luc | Hình: so "tháp" với ba nhu cầu SDT |
| 15 | Cơn đau là gì, và vì sao đau mạn tính khó hiểu? | Căng thẳng–sức khỏe | M | Lấp chương 5 và 14; liên giả dược; định nghĩa chính thức | IASP 2020 (định nghĩa); Melzack & Wall (cổng, lịch sử); NICE/WHO (đau mạn) | 1–2 (Opus nhãn) | #12 | Hình: mô hình sinh–tâm–xã hội |
| 16 | Vì sao ta đổ lỗi cho người khác nhưng tha cho mình? (lỗi quy kết cơ bản) | Tâm lý xã hội | L | Mục 9; có công cụ tự nhiên | Jones & Harris 1967; Ross 1977; Gawronski 2004 (tổng quan) | 1–2 | thien-kien-xac-nhan, dinh-kien | Công cụ (#19, mục 3.5) |
| 17 | Nên cho trẻ dưới 5 tuổi xem màn hình bao lâu? | Phát triển | M | Phụ huynh Việt hỏi nhiều; có hướng dẫn WHO | WHO 2019 (hướng dẫn trẻ dưới 5 tuổi); Madigan 2019 (JAMA Pediatrics); AAP | 1 | tre-hoc-noi, mang-xa-hoi-teen | Hình: khuyến nghị theo tuổi (số từ WHO) |
| 18 | Chơi game bao nhiêu thì thành vấn đề? | Phát triển | M | Thẻ `game-bao-luc` đã tạo nhu cầu; chủ đề cha mẹ; ICD-11 có mục rối loạn game | Przybylski & Weinstein 2017 (Psychol Sci); ICD-11 (6C51); Prescott 2018 (đã trên site) | 1–2 (Opus phần lâm sàng) | bandura, mang-xa-hoi-teen | Hình: đường cong "vừa phải" (cần số) |
| 19 | Công cụ lỗi quy kết (Jones–Harris) | Tâm lý xã hội | Công cụ | Lĩnh vực xã hội chưa có công cụ | Jones & Harris 1967 | 1–2 Opus | #16 | Công cụ |
| 20 | Công cụ lịch tăng cường (nút nhấn) | Học tập | Công cụ | Lĩnh vực học tập chưa có công cụ | Ferster & Skinner 1957 (nhà ở `skinner`) | 1–2 Opus | #2, skinner | Công cụ |
| 21 | Ảnh chụp não nói được gì (và không nói được gì)? | Cơ sở sinh học | L | Khớp trục "đọc tin": "vùng não sáng lên" | Poldrack 2006; Eklund 2016 (PNAS); Marek 2022 (Nature) | 1–2 | #9, bang-chung/khung-hoang-tai-lap | Hình: sơ đồ suy luận ngược |
| 22 | Vì sao thi cử làm ta run? (lo lắng thi cử) | Phát triển (hay Căng thẳng) | M | Học đường; tách khỏi rối loạn lo âu; thẻ Yerkes–Dodson | Cassady & Johnson 2002; von der Embse 2018 (tổng hợp); Corbett 2015 | 1 | tam-ly-hoc-duong, lo-au (ranh) | Hình: bảng chiến lược có bằng chứng (chữ) |
| 23 | Điều gì khiến ta bị hấp dẫn? | Tâm lý xã hội | L | Mục 9 (tách đôi); lưu ý trùng tâm lý tiến hóa | Zajonc 1968; Festinger 1950; Eastwick & Finkel 2008; Joel 2017 | 1–2 | tam-ly-tien-hoa, #8 | Hình: tiếp xúc lặp lại (cần số) |
| 24 | Ngôn ngữ có định hình tư duy? | Tư duy–ngôn ngữ | L | Mục 9; móc "xanh" tiếng Việt (xác minh) | Berlin & Kay 1969; Winawer 2007 (PNAS); Regier & Kay 2009 | 1–2 | tre-hoc-noi | Hình: phổ màu (chữ); không số mới |
| 25 | Có những loại trí nhớ nào? | Trí nhớ | L | Lỗ hổng khái niệm cốt lõi ở chương 8 | Scoville & Milner 1957 (H.M.); Squire; Craik & Lockhart 1972; OpenStax 8.1 | 1–2 | vi-sao-ta-quen, tri-nho-lam-viec | Hình: sơ đồ các loại |
| 26 | Sang chấn tâm lý: điều gì xảy ra sau biến cố? | Sức khỏe tâm thần | L | Mục 9 (C); giữ, Opus hai lượt, đăng trước kèm dải cảnh báo | ICD-11 (PTSD, PTSD phức tạp); hướng dẫn WHO, NICE; Bonanno (kháng chịu) | 2 | #4 | Hình: ít (chữ) |
| 27 | Lịch sử tâm lý học: ai nghĩ gì, và huyền thoại nào cần bỏ? | Phương pháp | L | Mục 9; bản đồ giúp định hướng; rẻ | Classics in the History of Psychology; Benjamin; OpenStax 1.2 | 1–2 | điều kiện hóa (#2), tri-lieu-tam-ly | Hình: dòng thời gian |

**Để sau (chưa vào 27):** thuyết tâm trí; phát triển đạo đức; giải quyết vấn đề và sáng tạo; tính cách (người–tình huống); thôi miên; song ngữ và nhận thức; văn hóa và tâm lý; tự trọng; ADHD và tự kỷ (Opus, đăng trước, sau #4); thuốc tâm thần; rối loạn ăn uống; lưỡng cực; tâm thần phân liệt; mất ngủ (rối loạn); đau buồn mất người thân (bài).

**Ngoài bài viết, nên làm song song:** lộ trình đọc người mới và sinh viên (3.2); trang "Đọc tin tâm lý trên báo" (3.3); 6–8 thẻ ngộ nhận đầu bảng ở 3.6; bổ sung `viet-nam` cho `tram-cam`/`lo-au`/`ngu-va-tri-nho` (3.4); từ điển (3.1) bắt đầu bằng phần mã.

**Tổng chi phí ước tính cho 27 mục:** khoảng 40–50 phiên Claude cộng lượt 2; khoảng 6–8 phiên cho từ điển, lộ trình, thẻ.
