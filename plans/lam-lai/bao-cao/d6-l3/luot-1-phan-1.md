# D6-L3, lượt 1, phần 1/2

Nhánh `moi/d6-l3`. Ngày 10/11/2026. Claude Sonnet 5.5 (một agent, tuần tự). Bốn trang tầng `loi`: `kham-pha/phat-trien/tre-hoc-the-nao`, `tre-hoc-noi`, `gan-bo`, `ban-sac-tuoi-teen`. Chưa kiểm ở site cũ; lượt 1 đủ, từ đầu. Chưa khóa, chưa commit, chưa build.

## Số liệu

247 nhận định: 119 `phat-hien`, 38 `so-lieu`, 31 `nhan`, 28 `lich-su`, 12 `dinh-nghia`, 8 `thoi-su`, 5 `loi-khuyen`, 4 `ve-site`, 2 `tai-lap`. Kết quả: 68 `dung`, 117 `da-sua`, 58 `da-lam-mem`, 4 `da-bo`; không có `null`. Mỗi trang một mục `doi_chu` cho `::tom-tat` và mỗi chỗ sửa một mục (trang: 39, 39, 54, 39). Tỉ lệ sửa cao vì ba lần phát hiện cùng một kiểu: lời giải thích, con số hay chi tiết hành vi mà trang cũ viết chắc hơn nguồn đã mở.

## Nguồn đã mở toàn văn

Baillargeon 1987, Wynn 1992 (bản quét), Kuhl 2006, Ainsworth & Bell 1970, Fearon 2010, Groh 2012, Marcia 1966 (Internet Archive, bộ `wikipedia-scholarly-sources-corpus`); Bjork & Cummings 1984 (PDF của phòng thí nghiệm); Kuhl 2003 (PDF của phòng thí nghiệm Kuhl); Meeus 2012, Golinkoff 2019 (PubMed Central qua NCBI E-utilities); OpenStax Psychology 2e chương 9. Chỉ tóm tắt: Diamond 1989, Wakeley 2000, Lillard 2013, Carbonneau 2013, Strouse 2021, Tsuji 2014, Mattock 2006, Sperry 2019, Fenson 1994, Bergelson 2012, Madigan 2019, Tomasello 1986, Kroger 2010, Luyckx 2013, Nguyễn 2020, Groh 2017, van IJzendoorn 1988 và 1999, Rothbaum 2000, De Wolff 1997, Fox 1991, Gradisar 2016, Price 2012, Hoang 2022. Chưa mở được: Werker & Tees 1984, McGarrigle & Donaldson 1974, Bowlby 1958 và 1969, Main & Solomon, Erikson 1968, Hart & Risley 1995 (sách), Piaget (sách). Một bản in lại có hạn chế bản quyền của Werker & Tees (trang học liệu) không được tải.

## Phát hiện chính (đã sửa trên trang)

- **Thiết kế và con số trong nghiên cứu gốc sai hay thiếu:** Kuhl 2003 chỉ 21 trẻ hoàn thành thí nghiệm 1 (không phải 32) và nhóm DVD nghe nhiều âm tiết hơn nhóm gặp người thật (không phải "cùng lượng âm thanh"); Kuhl 2006 trẻ Nhật giảm không có ý nghĩa thống kê; Marcia 1966 moratorium biến thiên điểm nhiều hơn (không "linh hoạt dưới áp lực"); Fearon 2010 kháng cự d = 0,11 có khoảng tin cậy gồm 0; Wynn 1992 dùng "item" (không nói búp bê).
- **Gán nhầm hay không có trong nguồn:** "phân bố chuẩn 70/20/10" gán cho Ainsworth & Bell 1970 (bài 1970 mô tả 56 bé và không nêu bộ ba A, B, C hay tỉ lệ); số 65/21/14 và "32 mẫu, 1.990 lượt" của van IJzendoorn & Kroonenberg 1988 chỉ có ở Wikipedia, tóm tắt không có; "Marcia là học trò của Erikson" và "người đầu tiên đo bản sắc" (bài 1966 liệt kê các cách đo trước và ghi luận án ở Ohio State); "30 triệu từ trước 3 tuổi" (Golinkoff: đến 4 tuổi); mốc "8–9 tháng" của Piaget (Baillargeon: khoảng 9 tháng).
- **Bản lặp lại mới thêm:** Wakeley 2000 không lặp lại kết quả Wynn (câu thêm ở `tre-hoc-the-nao`).
- **Nhãn đổi:** `tre-hoc-the-nao` Vững chắc → Khá vững (ý cốt lõi của Piaget); chơi giả vờ Khá vững → Đang tranh cãi (Lillard 2013); `tre-hoc-noi` lời khuyên 1 Vững chắc → Khá vững (Madigan 2019, tương quan); `gan-bo` mục 2 ("bỏ mặc bé khóc") Khá vững → Đang tranh cãi (Gradisar 2016, Price 2012 không thấy tác hại lên gắn bó), mục 4 Vững chắc → Khá vững; `ban-sac-tuoi-teen` mục 2 Khá vững → Đang tranh cãi. Id mục giữ bằng `{ #id-cu }`.
- **Câu bỏ (`da-bo`):** McGarrigle & Donaldson 1974 (chi tiết 4–5 tuổi, chú gấu, hàng nút: không mở được bài); đoạn "liên văn hóa" ở `tre-hoc-the-nao`; đoạn Bowlby 1958 ở `gan-bo` (tiêu đề đổi, id cũ giữ); đoạn "psychosocial moratorium" ở `ban-sac-tuoi-teen`.
- **Không viết như chẩn đoán:** thêm lời rào và link `[Hỗ trợ](/psyche/ho-tro/)` ở `tre-hoc-noi` (bỏ ngưỡng "18 tháng chưa có từ"), `gan-bo` (ba mô tả minh họa không dùng để xếp loại một em bé; mục 4), `ban-sac-tuoi-teen` (mục Tự trải nghiệm, Luyckx, Áp dụng 3, Ngộ nhận 1; bỏ danh sách "mất ngủ, chán ăn, mất hứng thú" làm ngưỡng). Harlow: một câu ở `gan-bo` kèm link về `/psyche/thi-nghiem/harlow/`.
- **Câu `thoi-su` (8):** "Tính đến 11/2026…" cho bốn trang (Piaget, hẹp dần thính giác, tình huống lạ, bốn trạng thái của Marcia), cộng ông bà ở Việt Nam (Hoang 2022), giả thuyết foreclosure và bản sắc mạng xã hội; `het_han` 2028-11-01. Lần tìm: Crossref và Europe PMC (OpenAlex bị giới hạn lượt trong ngày).

## Chỗ chưa chắc, chỗ khó (để lượt 2 và review)

- **Chữ cũ giữ vì có vẻ đúng nhưng chưa mở nguồn (đã ghi `da-lam-mem` hay `da-sua` ở hồ sơ):** Hindi và Salish trong Werker & Tees (đã bỏ khỏi trang); phân loại A, B, C dựa vào đoàn tụ (sách 1978); chi tiết hành vi kiểu D (Main & Solomon); "amae" ở Rothbaum 2000 (đã bỏ); các ý riêng của Erikson 1968.
- **Chỗ chỉ có nguồn bậc 3:** Vygotsky và vùng phát triển gần (Wikipedia); tiếng Việt có 6 thanh (Wikipedia). Cả hai đã viết ở mức định nghĩa chung, ghi `ghi_chu`: lượt 2 tìm nguồn bậc 2.
- **Nhãn sát ranh thước đo** (ghi "chỗ khó" ở hồ sơ): `tre-hoc-noi` hẹp dần Vững chắc (tổng hợp nguyên âm; chưa có cho phụ âm); `gan-bo` khung Vững chắc "mã hóa tin cậy" (độ tin cậy của cả bốn kiểu chưa đủ nguồn) và khung Đã bị bác bỏ (niềm tin về giá trị, khó áp thước đo); `ban-sac-tuoi-teen` hai khung Vững chắc (chỉ Mỹ và Hà Lan đã đọc); `tre-hoc-the-nao` khung Đã bị bác bỏ (một bộ thí nghiệm cộng một phê bình, không có tổng hợp) và khung thứ tự giai đoạn (chỉ giáo trình).
- **Phủ câu:** hồ sơ gộp các câu chuyển tiếp và ví dụ minh họa vào nhận định gần nhất; có thể còn vài câu kể chuyện chưa có nhận định riêng (như các câu mô tả trong phần Tự trải nghiệm). Lượt 2 sẽ thấy nếu cần tách.

## Việc cho người giao (hình, thành phần, dữ liệu: không sửa ở lô này)

- Hình `piaget-timeline`: nhãn "3,5 tháng: hiểu vật thể tồn tại khi khuất" (chỉ nhóm nhanh chán, theo Baillargeon); mục "5 tháng: 1+1" và chú thích "ba phát hiện hiện đại" không nêu Wakeley 2000 không lặp lại được; mục "~4–5 tuổi (McGarrigle & Donaldson)" không kiểm được. Quyết định có sửa chữ hình hay bỏ mục thứ ba.
- Hình `lo-trinh-hoc-noi`: "2–4 tháng: cooing" không có nguồn đã mở; "~18 tháng: bùng nổ từ vựng" (giáo trình chỉ nêu ghép từ); chú thích "thứ tự các mốc rất ổn định".
- Hình `marcia-matrix`: đặt Diffusion ở "khám phá thấp"; Marcia 1966 viết diffusion có thể đã hay chưa từng trải qua khủng hoảng (trang đã thêm lời giới hạn).
- Link nội bộ tới `kham-pha/co-so-sinh-hoc/nao-tuoi-teen` và `kham-pha/suc-khoe-tam-than/tim-giup-do` (có trong `src/data/trang.yml`, trang chưa chuyển): hợp lệ khi lô D6-L2 và D7 xong.
- Nguồn mới của lô chưa có bản ghi ở `src/data/nguon.yml` (nhiều nguồn không DOI hay chỉ tóm tắt): thêm khi dọn nguồn.
