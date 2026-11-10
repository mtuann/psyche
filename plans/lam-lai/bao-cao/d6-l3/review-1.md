# D6-L3, review phần 1 (bốn trang tầng `loi`)

Nhánh `moi/d6-l3`. Ngày 10/11/2026. Claude Opus 5.5 (một agent, tuần tự; không làm lượt 1 hay lượt 2 của lô). Trang: `kham-pha/phat-trien/tre-hoc-the-nao`, `tre-hoc-noi`, `gan-bo`, `ban-sac-tuoi-teen`. Không build, không commit. Tệp tạm: `scratchpad/rv-d6l3a/` (bản tải nguồn, script sửa hồ sơ bằng thư viện `yaml`, giữ nguyên định dạng).

Phạm vi đã xét: mọi câu `ve-site`, mọi câu lượt 2 khác `dung`, mọi câu lượt 1 đã sửa, làm mềm hay bỏ, mọi `nhan`, ba hình. Mỗi câu ghi `review: dung` hay `review: sai` và một đoạn "Review (Claude Opus 5.5, 10/11/2026): …" cuối `ghi_chu`. Câu `review: sai` đã sửa luôn trên trang và trong hồ sơ, mỗi chỗ một mục `doi_chu`. `nguoi.review` ở lần kiểm định cuối đã điền. `node tools/khoa.mjs xuat` đọc được cả bốn hồ sơ; `loiHoSo` của `tools/khoa.mjs` chỉ còn báo thiếu `nguoi.luot_2` và `nguoi.kiem_mau` (để người gom điền).

## Số liệu

| Trang | Nhận định | review dung | review sai | Câu sai |
|---|---|---|---|---|
| tre-hoc-the-nao | 64 | 46 | 9 | n20, n21, n22, n23, n36, n38, n40, n60, n63 |
| tre-hoc-noi | 59 | 42 | 6 | n6, n8, n10, n27, n29, n57 |
| gan-bo | 68 | 50 | 5 | n1, n6, n38, n41, n64 |
| ban-sac-tuoi-teen | 56 | 40 | 5 | n7, n12, n29, n39, n47 |

Các câu không có `review` là câu lượt 1 và lượt 2 cùng `dung`, không phải nhãn, không phải `ve-site` (ngoài phạm vi review).

## Nguồn mở được ở review (giải quyết phần lớn "chưa chắc" của lượt 2)

- Toàn văn, Internet Archive bộ `wikipedia-scholarly-sources-corpus` (tải đúng một tệp trong zip): Baillargeon 1987, Wynn 1992 (bản quét), **McGarrigle & Donaldson 1974** (lượt 1 không mở được; tệp `10.1016%252F0010-0277%252874%252990003-1.pdf`, ngoặc phải mã hóa hai lần), Ainsworth & Bell 1970, Marcia 1966. Bjork & Cummings 1984 (PDF phòng thí nghiệm). Zhu và cộng sự 2023 (PMC, lượt 2 tìm).
- Tóm tắt: Diamond & Goldman-Rakic 1989 (lượt 2 đọc nhầm Diamond 1985), Rivera, Wakeley & Langer 1999, Tsuji & Cristia 2014, Strouse & Samson 2021, Long 2024, Kroger 2010, Meeus 2012, Luyckx 2013, van IJzendoorn & Kroonenberg 1988, Fraley & Spieker 2003.
- **Nguồn bậc 2 mới: OpenStax *Lifespan Development* (2024)**, mở qua REX archive (`openstax.org/apps/archive/<bản>/contents/<uuid sách>@<bản>:<uuid trang>.json`; uuid sách `03481f82-baf1-407d-9bac-e614dae0a694`). Mục 3.4 (tính bền vững của vật thể), 3.5 (mốc ngôn ngữ, bảng 3.10), 4.4 (gắn bó), 5.3 (vùng phát triển gần), 10.1 (Erikson, Marcia). Nên thêm vào bảng "Nguồn và cách mở" của `chuan-kiem-dinh.md`.
- Không có trong bộ Internet Archive: Werker & Tees 1984 (trang vẫn ghi theo Kuhl 2006 kể lại; Lifespan 3.5 cũng dẫn). Bowlby 1958 vẫn chưa mở (câu đã bỏ ở lượt 1). APA Dictionary dựng bằng JavaScript, không đọc được bằng máy.

## Các câu sai (chữ cũ → chữ mới)

**tre-hoc-the-nao**
- n20 (hình): "3,5 tháng: hiểu vật thể tồn tại khi khuất" → "4,5 tháng (và 3,5 tháng, nhóm nhanh chán): nhìn lâu hơn khi vật bị che “biến mất”".
- n21 (hình): "5 tháng: phân biệt 1+1=2 và 1+1=1" → "5 tháng: nhìn lâu hơn khi 1+1=1 (Wynn, 1992); một lần lặp lại không thấy (Wakeley và cộng sự, 2000)".
- n22 (hình): "~4–5 tuổi: bảo toàn khi đề bài có ngữ cảnh" → "4–6 tuổi: dễ bảo toàn hơn khi bị xáo “tình cờ”" (bài: 80 trẻ 4;2–6;3).
- n23 (chú thích hình, lượt 2 quá mạnh): "ba phát hiện hiện đại cho thấy năng lực … xuất hiện sớm hơn" → "ba phát hiện về sau gợi ý … Kết quả của Wynn chưa được lặp lại nhất quán, và cách diễn giải thời gian nhìn còn bàn cãi".
- n36 (nhãn): Khá vững "thứ tự xuất hiện của các năng lực nhận thức tương đối ổn định" (chỉ dựa vào việc giáo trình trình bày theo thứ tự) → Khá vững "với bài bảo toàn gốc của Piaget, trẻ dưới khoảng 7 tuổi thường trả lời sai" (McGarrigle & Donaldson 1974: lặp lại ở nhiều nghiên cứu; 13/80 ở thủ tục chuẩn).
- n38 (lượt 1 bỏ): đưa lại vào khung Đang tranh cãi, đúng nguồn: "50 trong 80 trẻ 4–6 tuổi bảo toàn khi hàng bị một chú gấu “nghịch ngợm” làm xáo trộn, so với 13 khi người làm thí nghiệm tự tay xếp lại" (chữ cũ "4–5 tuổi", "hàng nút" sai chi tiết).
- n40 (nhãn): Đã bị bác bỏ "trẻ sơ sinh hoàn toàn không có khái niệm vật thể…" → Khá vững "trẻ dưới 9 tháng đã phần nào hiểu vật bị che khuất vẫn còn đó" (hai giáo trình OpenStax; giới hạn: Rivera 1999 thấy trẻ vẫn nhìn lâu hơn vòng quay 180° khi không có hộp).
- n60 (câu hỏi 2): "Piaget bắt trẻ phối hợp tay mắt để tìm đồ — khó hơn nhiều so với chỉ nhìn" → "Piaget bắt trẻ thò tay tìm đồ, việc đòi hỏi phối hợp các hành động riêng rẽ; Baillargeon chỉ đo thời gian nhìn" (lượt 1 bỏ "phức tạp hơn nhiều" ở thân bài nhưng sót ở đây).
- n63 (câu hỏi 5): "Thứ tự các năng lực xuất hiện thì tương đối ổn định, nhưng…" → "Với bài bảo toàn gốc của Piaget, nhiều nghiên cứu thấy lại kết quả của ông; nhưng khi đổi cách đo … trẻ nhỏ hơn đã làm được…".

**tre-hoc-noi**
- n6: "Các mốc phát âm được ghi nhận khá ổn định:" và "Những tháng đầu: cooing" → "Trẻ thường đi qua các mốc phát âm theo thứ tự sau; mốc tuổi chỉ là gần đúng (OpenStax Lifespan 3.5)" và "Từ khoảng 2 tháng".
- n8 (hình): "2–4 tháng: cooing" → "~2 tháng: cooing (ê a)" (Lifespan 3.5, bảng 3.10).
- n10 (hình, lượt 2 quá mạnh): "~18 tháng: bùng nổ từ vựng"; "thứ tự các mốc thì rất ổn định" → "16–24 tháng: ghép từ, vốn từ tăng nhanh"; "Trẻ thường đi qua các mốc theo thứ tự này, nhưng … thời điểm khác nhau rất nhiều giữa các trẻ".
- n27 (khung Khá vững): "hiệu quả hơn hẳn nghe thụ động" (hồ sơ đã ghi "hơn" mà trang chưa sửa) → "hiệu quả hơn"; thêm "khoảng chênh nhỏ dần khi trẻ lớn hơn" (Strouse 2021) và câu "không nên trông vào video…" chuyển từ n29.
- n29 (nhãn, lượt 2 quá mạnh): khung Đã bị bác bỏ "cho trẻ xem video dạy ngoại ngữ là đủ…" → bỏ khung (`da-bo`); câu đúng của lượt 2 trùng khung Khá vững n27. Vế "video có phản hồi theo trẻ thì khác video thường" không có nguồn (Strouse 2021 thấy video trực tiếp và ghi sẵn không khác).
- n57 (câu hỏi 3): "dù nghe cùng lượng âm thanh" → "dù nghe cùng thời gian (thậm chí nhiều âm tiết hơn)"; đáp án "yếu tố “mở cổng”…" → "yếu tố mà các tác giả cho là quan trọng với việc học ngôn ngữ ở trẻ nhỏ".

**gan-bo**
- n1 (mô tả, đổi sang `ve-site`) và n6 (đáp án Tự trải nghiệm): "điều quan trọng không phải là bé có khóc…" / "các nhà nghiên cứu không dựa vào việc bé có khóc…" → "chỉ nhìn bé có khóc … thì chưa đủ (bé an toàn và bé kháng cự đều có thể khóc); điều giúp phân biệt nằm nhiều ở lúc mẹ quay lại". OpenStax 2e 9.3: phân loại "based on how the infants … responded to the separation and reunion".
- n38 (nhãn): Vững chắc "các kiểu … có thể được mã hóa tin cậy; kiểu an toàn là phổ biến nhất" → Khá vững "hành vi của bé trong tình huống lạ được chấm khá nhất quán; kiểu an toàn là phổ biến nhất" (độ tin cậy 0,93–0,97 ở Ainsworth & Bell; tổng hợp chỉ có cho kiểu D; giới hạn Fraley & Spieker 2003: biến thiên liên tục, không theo loại).
- n41 (nhãn): Đã bị bác bỏ "bé bám mẹ, khóc khi xa mẹ là hư; bé không khóc mới là ngoan" → Khá vững "chỉ nhìn bé khóc nhiều hay ít khi mẹ đi thì chưa biết gắn bó có an toàn hay không".
- n64 (câu hỏi 1): "điểm mấu chốt để phân loại kiểu gắn bó…" → "bé an toàn và bé kháng cự đều có thể khóc khi mẹ đi. Điều gì giúp phân biệt hai bé?", lời giải thích theo OpenStax và Ainsworth & Bell.

**ban-sac-tuoi-teen**
- n7: "Hai năm trước khi Erikson ra sách, Marcia (khi đó là nghiên cứu sinh ở Đại học Bang Ohio)…" → "Năm 1966 … Marcia công bố một cách đo …, phát triển từ luận án tiến sĩ ở Đại học Bang Ohio" (luận án 1964; bài 1966 ghi SUNY Buffalo).
- n12: đoạn "Ý tưởng" về Erikson (quan sát lâm sàng, "mô tả chi tiết nhất", "sàng lọc… giống bố, cô giáo, siêu nhân"; chưa có nhận định nào trong hồ sơ, dựa vào sách chưa mở) và "lý thuyết lâm sàng… không đo đạc, không nhóm đối chứng" → theo OpenStax Lifespan 10.1, và "Đây là một lý thuyết, không phải kết quả thí nghiệm".
- n29 (nhãn): Vững chắc "4 trạng thái … là có thật và đo được" → Khá vững "4 trạng thái … đo được và phân biệt được với nhau" (Kroger 2010 dùng sẵn khung; xác nhận trực tiếp chỉ ở Meeus 2012).
- n39 (nhãn, lượt 2 quá mạnh): tiêu đề "Xác định mình đang ở đâu, rồi hành xử cho đúng" (Khá vững) → "Khám phá đào sâu đi cùng cam kết chắc hơn" (id cũ giữ), thêm "Chưa có nghiên cứu nào cho thấy việc tự xếp mình vào một trạng thái rồi hành xử theo đó giúp ích".
- n47: "teen có thể trình bày bản thân khác nhau … và việc trình diễn … có thể thay đổi cách thử nghiệm bản sắc" (không nguồn) → một câu hỏi mở thật sự.

## Sửa nhỏ khác (review dung, có `doi_chu`)

- tre-hoc-the-nao: khung Đang tranh cãi thêm McGarrigle & Donaldson (n37); n43 thay Wikipedia bằng OpenStax Lifespan 5.3 (vùng phát triển gần), trang thêm thuật ngữ và link; n48 thêm McGarrigle vào `co_so`; mục Nguồn thêm McGarrigle 1974, Rivera 1999, OpenStax Lifespan.
- tre-hoc-noi: n36 "(theo giáo trình)" → dẫn Lifespan 3.5 ("infants in different cultures achieve language development milestones at about the same ages"); n39 thêm OpenStax 2e 9.3; n48 (tiếng Việt 6 thanh) thay Wikipedia bằng Zhu và cộng sự 2023, trang thêm dẫn.
- ban-sac: khung Vững chắc n30 thêm câu giới hạn (tới khoảng 30 tuổi, chủ yếu phương Tây); hình marcia-matrix thêm một câu chú thích về diffusion.
- Đổi loại thành `ve-site` (mô tả trang, ví dụ giả định, lời dẫn tới Hỗ trợ): tre-hoc-the-nao n1, n52; tre-hoc-noi n1, n45; gan-bo n1, n2, n7, n55; ban-sac n1, n2, n42. Bỏ `nguon` của các câu này (luật `ve-site`).
- Ba chỗ lượt 1 đã ghi "nhiều khả năng là phản ứng phòng thủ" (gan-bo n4, n23, n60): review đã thử làm mềm rồi trả lại, vì Ainsworth & Bell 1970 có đúng chữ "probably defensive".

## Nhãn đã chốt (các khung lượt 1 nêu sát ranh)

| Trang | Khung | Lượt 1 | Chốt |
|---|---|---|---|
| tre-hoc-the-nao | thứ tự giai đoạn (n36) | Khá vững | Khá vững, đổi ý chính (bài bảo toàn gốc lặp lại được) |
| tre-hoc-the-nao | không có khái niệm vật thể (n40) | Đã bị bác bỏ | Khá vững cho mệnh đề thuận |
| tre-hoc-noi | hẹp dần theo tiếng mẹ đẻ (n26) | Vững chắc | Giữ Vững chắc (tổng hợp nguyên âm, 7/9 tương phản phụ âm, thanh điệu, nhiều quần thể; giáo trình bậc 2) |
| tre-hoc-noi | video là đủ (n29) | Đã bị bác bỏ | Bỏ khung, gộp vào Khá vững n27 |
| gan-bo | mã hóa tin cậy (n38) | Vững chắc | Khá vững, đổi ý chính |
| gan-bo | niềm tin "hư/ngoan" (n41) | Đã bị bác bỏ | Khá vững, đổi ý chính |
| ban-sac | 4 trạng thái (n29) | Vững chắc | Khá vững |
| ban-sac | chín dần tới 20+ (n30), mục 4 (n43) | Vững chắc | Giữ (tổng hợp 124 nghiên cứu đo đúng mệnh đề), thêm giới hạn |
| ban-sac | "xong trước 18" (n35) | Đã bị bác bỏ | Giữ (mệnh đề kiểm được, bị tổng hợp phủ định trực tiếp) |
| ban-sac | mục 1 (n39) | Khá vững | Khá vững cho liên hệ quan sát, tiêu đề đổi |

Các nhãn khác (Khá vững, Đang tranh cãi) đều đạt thước đo mục 4; ghi lý do ở từng nhận định.

## Chỗ còn chưa chắc

- Werker & Tees 1984 và Bowlby 1958 vẫn chưa mở; trang chỉ dùng lời kể lại (Kuhl 2006; Lifespan 3.5) hoặc đã bỏ.
- Nhãn Vững chắc của tre-hoc-noi n26 và ban-sac n30, n43 vẫn sát ranh ở vế "nhiều quần thể": tổng hợp không nêu quốc gia trong tóm tắt.
- Wynn 1992 là bản quét chữ OCR lỗi; số t của Bảng 1 lượt 1 ghi chưa đối chiếu lại được, trang không dùng số ấy.
- OpenStax Lifespan 4.4 ghi tỉ lệ 65/20/10/5 cho "nghiên cứu đầu tiên của Ainsworth" (dẫn sách 1978/1979, gộp cả kiểu D của Main & Solomon): không đưa lên trang.
- Mục Ở Việt Nam của tre-hoc-the-nao còn câu "Chúng tôi chưa mở được tổng hợp nào cho việc thứ tự các năng lực có giống nhau ở các nền văn hóa" không có nhận định riêng (câu thay cho n54); đúng với hồ sơ, nhưng có thể thêm `thoi-su` khi gom.

## Việc cho người gom

- Thêm `piaget-timeline`, `lo-trinh-hoc-noi`, `marcia-matrix` vào `HINH_DA_SUA` trong `tests/chuyen.test.mjs` (kèm dòng chú thích "D6-L3 review"). Hiện `node --test tests/chuyen.test.mjs` hỏng đúng ở phép thử hình vì ba hình này. Ba hình chỉ dùng ở một trang mỗi hình.
- Điền `nguoi.luot_2` và `nguoi.kiem_mau` ở lần kiểm định cuối của bốn hồ sơ; rồi `npm run build:xem`, `npm test`, xem lại hiển thị hình piaget-timeline (nhãn chữ đổi sang canh trái, thêm dòng) ở 360 px.
- Nguồn mới chưa có bản ghi ở `src/data/nguon.yml`: McGarrigle & Donaldson 1974, Rivera 1999, Fraley & Spieker 2003, Zhu 2023, OpenStax Lifespan Development (2024).
- Đề xuất thêm vào `plans/ben-vung/chuan-kiem-dinh.md` (Nguồn và cách mở): OpenStax *Lifespan Development* qua REX archive; với DOI có ngoặc trong bộ Internet Archive, ngoặc cũng phải mã hóa hai lần (`%2528`, `%2529`).
- Không chạm trang, hồ sơ, hình của `tuoi-gia`, `tam-ly-hoc-duong`, `mang-xa-hoi-teen`.
