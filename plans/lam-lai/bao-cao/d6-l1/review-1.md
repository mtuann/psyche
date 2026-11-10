# D6-L1, review nội dung: Căng thẳng–giấc ngủ (4 trang)

Nhánh `moi/d6-l1`, ngày 10/11/2026, Claude Opus 5.5 (agent review; không làm lượt 1, lượt 2). Bốn trang `kham-pha/cang-thang-giac-ngu/`: `ngu-va-tri-nho`, `doi-pho-stress`, `giac-mo` (lõi), `stress-co-hai` (mở rộng). Không build, không commit. Không chạm `kham-pha/hanh-phuc/*`, hình, kiểm thử.

## Phạm vi đã xét

Mọi câu `ve-site`, mọi câu `nhan`, mọi câu `luot_2` khác `dung`, mọi câu lượt 1 đã sửa, làm mềm, bỏ (đối chiếu chữ cuối trên trang với hồ sơ và nguồn). Mỗi câu có `review` và ghi chú "Review (Claude Opus 5.5, 10/11/2026): …" ở cuối `ghi_chu`; câu sai có `cau` mới, `ket_qua`, `nguon`, `trich` và mục `doi_chu`. `nguoi.review` ghi ở lần kiểm định cuối của cả bốn hồ sơ.

## Kết quả

| Trang | Đã xét | dung | sai |
|---|---|---|---|
| ngu-va-tri-nho | 62 | 60 | 2 |
| doi-pho-stress | 64 | 59 | 5 |
| giac-mo | 70 | 54 | 16 |
| stress-co-hai | 52 | 44 | 8 |

Nguồn mở lại toàn văn ở review: Diekelmann & Born 2010, Rasch 2007, Crum 2013, Folkman 1986, Voss 2014 (Internet Archive, bộ `wikipedia-scholarly-sources-corpus`, mỗi lần một tệp); Forsythe & Compas 1987 (Vanderbilt); Finkel 2025 (arXiv); Keller 2012 (bản thảo tác giả, PMC qua E-utilities); Freud bản Brill 1913 (Gutenberg #66048); OpenStax 4.3, 14.1. Nhờ vậy nhóm Rasch 2007, Diekelmann 2010, Voss 2014, Folkman 1986 (cỡ mẫu, danh sách lựa chọn đánh giá thứ cấp), Keller (nhân quả ngược) mà lượt 2 ghi `khong-chac` đều xác nhận `dung`.

## Câu sai (chữ cũ → chữ mới)

**ngu-va-tri-nho**
- n38: "tác dụng nhỏ nhưng ổn định (g = 0,27)" → "tác dụng nhỏ (g = 0,27)" (hồ sơ ghi đã bỏ "ổn định" nhưng trang chưa bỏ).
- n53: "Nghiên cứu của Gais … cùng phân tích tổng hợp … kể cả sau khi ngủ bù" → tách: Gais (14 học sinh) thấy kém hơn kể cả khi đã ngủ bù; Berres & Erdfelder 2021 thấy người ngủ nhớ nhiều hơn người thức cùng khoảng thời gian.

**doi-pho-stress**
- n17: "…giữ khoảng cách, tạm thời phân tâm" → "…giữ khoảng cách, tự kiềm chế cảm xúc" (danh sách của Folkman 1986).
- n22: "đe dọa sức khỏe tinh thần" → "đe dọa sự an lành (well-being) của mình".
- n28: "biến động … nhiều hơn là ổn định" → "Nhìn chung … nhiều hơn là ổn định, nhưng không đều: đánh giá thứ cấp biến động nhiều, đối phó cảm xúc ổn định ở mức vừa".
- n54: Áp dụng 1 `:nhan[kha-vung]` → `:nhan[tranh-cai]`, thêm "nhưng giả thuyết này còn đang tranh cãi".
- n59: Áp dụng 6 `:nhan[vung-chac]` (chỉ dựa trang NHS) → bỏ nhãn, đổi loại thành `loi-khuyen`.

**giac-mo**
- n2, n3: "não hoạt động gần như mạnh bằng lúc thức … chỉ thường mờ nhạt và ít như phim hơn" → "sóng não rất giống lúc thức … mơ cũng xảy ra ở các giai đoạn ngủ khác." (hồ sơ ghi đã sửa, trang chưa sửa).
- n13, n48: "khó kiểm chứng và khó tái lập … hai nhà phân tâm giải ra hai nghĩa" (không nguồn) → Freud tự diễn giải từng giấc mơ; OpenStax 4.3: khác Freud và Jung, ý tưởng của Cartwright có bằng chứng thực nghiệm.
- n22: "trẻ em Kurd từng trải qua sang chấn chiến tranh với trẻ em Phần Lan sống trong môi trường an toàn" → ba nhóm theo tóm tắt Valli 2005 (trang chưa sửa theo hồ sơ).
- n26: "mẫu 65 sinh viên (35 nam, 30 nữ)" → bỏ cỡ mẫu (không mở lại được toàn văn Marzano); khung n44 bỏ "65 sinh viên".
- n29: "41 tình nguyện viên nam … 21 … 20" → mức tóm tắt (người khỏe mạnh; 5,2 và 0,5 lần/tuần).
- n35: "cơ bắp bị liệt nhưng cơ mắt thì không (OpenStax …)" → "các cơ gần như bị liệt trừ cơ tuần hoàn, hô hấp, còn mắt vẫn chuyển động nhanh" (OpenStax 4.3).
- n46: khung `:::bac-bo[mỗi biểu tượng … tra sách là ra]` → bỏ khung (`da-bo`), giữ thành đoạn thường nói rõ không gắn nhãn vì chưa có phép kiểm tra nào.
- n53, n55, n59: chip Áp dụng 1 (kha-vung), 2 (bac-bo), 4 (tranh-cai) → bỏ chip, giữ id cũ, đổi loại thành `loi-khuyen`; Áp dụng 2 "không có cơ sở khoa học" → "chúng tôi không tìm thấy nghiên cứu nào ủng hộ".
- n57: "chưa dẫn được tổng quan hệ thống nào" → dẫn văn bản lập trường AASM 2018 (Morgenthaler và cộng sự): liệu pháp mơ tỉnh ở nhóm "có thể dùng", không ở nhóm "được khuyến nghị"; nhãn giữ Đang tranh cãi; id tiêu đề sửa thành id thật của site cũ (`…-dang-tranh-cai`).
- n62: "Trong văn hóa dân gian Việt Nam có truyền thống giải mộng … được nhiều người kể lại"; "đây là quan niệm dân gian" → "… là ví dụ minh họa của chúng tôi"; "những câu như vậy không phải kết luận khoa học" (đổi loại thành `ve-site`).
- q1: "phát ra các xung điện ngẫu nhiên … mớ tín hiệu lộn xộn" → "kích hoạt não trước theo chu kỳ … (một phần ngẫu nhiên, một phần đặc hiệu)" (hồ sơ ghi đã sửa, trang chưa sửa).
- n73 (Nguồn): Freud "London: Hogarth Press" → bản Brill 1913, New York: Macmillan (bản đã dẫn, Gutenberg #66048), ghi bản gốc tiếng Đức 1900; Voss 2014 tác giả "Holzmann, Tuin, & Hobson" (sai, là bài 2009) → đủ 7 tác giả theo Crossref, 17(6); Cerebral Cortex 24 → 24(5); thêm Morgenthaler 2018, OpenStax 4.3.

**stress-co-hai**
- n3: "Điều nghiên cứu liên hệ với nguy cơ sức khỏe là căng thẳng kéo dài mà không có lúc phục hồi" → nghiên cứu theo dõi thấy mức căng thẳng cao đi kèm nguy cơ tim mạch; mô hình Selye gợi ý điều đáng lo là kéo dài không phục hồi.
- n26: "từ nhỏ đến vừa (η² = 0,02; 0,04)" → "nhỏ".
- n36: "so với nhóm không báo cáo nhiều stress lẫn không tin…" → "so với nhóm gần như không có stress và cho rằng stress hầu như không ảnh hưởng đến sức khỏe" (nhóm tham chiếu ở bảng Cox).
- n52, n53: khung "stress mạn tính, kéo dài …"; "căng thẳng nghề nghiệp kéo dài (HR 1,23)" → "mức căng thẳng cao, như căng thẳng trong công việc, …"; "căng thẳng trong công việc (job strain, đo lúc bắt đầu theo dõi; HR 1,23)"; giới hạn thêm "đo tại một thời điểm".
- n64: "Điều dễ rút ra nhất từ mô hình của Selye và từ các nghiên cứu về stress mạn tính" → "Điều mô hình của Selye gợi ý"; Wendsche 2016 → 2017 (Crossref).
- n67: Áp dụng 3 `:nhan[kha-vung]` (hồ sơ tự ghi không có thử nghiệm) → bỏ chip, giữ id cũ, loại `loi-khuyen`.
- n81 (Nguồn): Selye 138(3479); Yeager đủ 9 tác giả, 607(7919); Bosshard 14(1); McEwen & Stellar thêm DOI; Wendsche 2017; thêm Wu 2026 (được nhắc ở thân bài mà thiếu trong Nguồn, thêm cả link ở thân bài).
- Sửa nhỏ thêm (review `dung`): n42 "học sinh Mỹ" → "học sinh, sinh viên Mỹ" (tóm tắt Yeager 2022).

## Id tiêu đề

Lượt 1 đổi nhãn, chữ tiêu đề ở doi-pho-stress mà không giữ id cũ: đã thêm `{ #id-cu }` cho Folkman & Lazarus 1988, Folkman 1986, Áp dụng 1, 2, 3, 4, 6. giac-mo: id cũ mục Áp dụng 3 lượt 1 ghi sai (`…-tranh-cai`), sửa thành `…-dang-tranh-cai`; Áp dụng 1, 2 thêm id cũ khi bỏ chip. stress-co-hai Áp dụng 3 thêm id cũ. So bằng `slugCu` của `src/plugins/id-cu.mjs` với tiêu đề trang cũ: không còn id cũ nào mất.

## Nhãn đã chốt

- **ngu-va-tri-nho:** Khá vững (SWS củng cố trí nhớ tường thuật; Áp dụng 1, 2, 3), Đang tranh cãi (vai trò REM), Đã bị bác bỏ (thức trắng thay cho ngủ giúp nhớ hơn: phát biểu hẹp, ngược với tổng hợp 271 mẫu).
- **doi-pho-stress:** Khá vững (không chiến lược nào tốt cho mọi tình huống; đánh giá định hình phản ứng stress; Áp dụng 2, 4, 5), Đang tranh cãi (giả thuyết khớp nhau; Áp dụng 1, 3); Áp dụng 6 không nhãn.
- **giac-mo:** Khá vững (mơ không đồng nhất REM; mơ tỉnh có thật; đe dọa thường gặp trong một số loại mơ; nhớ mơ gắn với tỉnh đủ lâu), Đang tranh cãi (chức năng tiến hóa; Áp dụng 3 theo AASM 2018); bỏ nhãn Bác bỏ (biểu tượng cố định) và chip Áp dụng 1, 2, 4.
- **stress-co-hai:** Khá vững (niềm tin đổi được qua can thiệp ngắn; mức căng thẳng cao đi kèm nguy cơ tim mạch vành; Áp dụng 2), Đang tranh cãi (đổi niềm tin giúp khỏe, làm tốt hơn; Áp dụng 1); Áp dụng 3 không nhãn.

## Khác

- Link Hỗ trợ: cả bốn trang viết `/psyche/ho-tro/`, đúng quy ước AGENTS.md ("Link nội bộ viết `/psyche/<trang>/`") và các trang đã khóa (seligman, little-albert, cach-kiem-chung). Không đổi.
- `kiem_lai_truoc` của stress-co-hai (2028-05) sớm hơn `het_han` sớm nhất (2028-11-01): giữ.
- Mô tả của giac-mo, stress-co-hai có dấu hai chấm: chuyển sang nháy đơn.
- giac-mo: các id nguồn `marzano-abs`, `revonsuo-abs`, `hobson-abs`, `eich-npp-abs`, `vallat2017full`, `saunders-abs` không có trong `nguon` của hồ sơ: đổi về id đã khai. Mọi nhận định không `da-bo`, không `ve-site` của bốn hồ sơ nay có `nguon` (câu `nhan` lấy theo `co_so`). Thêm nguồn `aasm2018` (giac-mo), `nhs-stress` (stress-co-hai).
- Lượt 1 có nhiều chỗ hồ sơ ghi "chữ mới" mà trang chưa đổi (giac-mo n2, n3, n22, n35, q1; ngu n38; doi-pho n17): đã sửa trang. Đã quét tự động "chữ cũ còn trên trang" cho cả bốn trang; phần còn lại là trùng chữ hợp lệ.
- `node tools/khoa.mjs xuat kham-pha/cang-thang-giac-ngu/<trang>` đọc được cả bốn trang. Trang không có khoảng trắng cuối dòng.

## Chỗ còn chưa chắc

- Marzano 2011 và Eichenlaub 2014 (NPP): không mở được toàn văn (PMC không cho tải XML, trang nhà xuất bản chặn máy, không có trong bộ Internet Archive); đã hạ về mức tóm tắt. Một lần tải PDF qua bản lưu CiteSeerX (LaBerge 1981) bị chặn theo quy tắc không tải bản sao; LaBerge chỉ theo tóm tắt (chi tiết "chuỗi đảo mắt" trang đã ghi là chưa kiểm).
- doi-pho-stress: "phân tích tổng hợp 329 nghiên cứu" (Cheng 2014): tóm tắt chỉ ghi k = 329, chưa chắc k là số nghiên cứu hay số mẫu.
- ngu-va-tri-nho: "(như trò chơi Concentration)" là phép so sánh của trang, không có trong toàn văn Rasch 2007.
- doi-pho-stress dùng Finkel 2025 (bản thảo arXiv) để dẫn lại chữ của sách Lazarus & Folkman 1984 (theo X kể lại); sách gốc chưa mở.
- Các nhãn Khá vững cho lời khuyên ở doi-pho-stress (Áp dụng 4, 5) dựa chủ yếu vào tổng hợp Cheng 2014 (mức nhỏ); chấp nhận được nhưng sát ngưỡng.

## Việc cho người gom

1. `lan[-1].nguoi.luot_2` của cả bốn hồ sơ đang `null`: điền khi gom.
2. Câu có chữ mới dựa trên nguồn review tự thêm, chưa qua lượt 2 độc lập: giac-mo n13, n48 (OpenStax 4.3), n57 (AASM 2018); stress-co-hai n3, n52. Nếu muốn, `node tools/khoa.mjs xuat … --con-lai` cho các câu này.
3. Đổi loại: doi-pho n59, giac-mo n53, n55, n59, stress n67 (`nhan` → `loi-khuyen`); giac-mo n62 (→ `ve-site`, còn trường `luot_2` cũ). Kiểm `khoa` chấp nhận khi khóa.
4. Link phụ thuộc trang chưa có trong worktree: `kham-pha/cam-xuc-dong-luc/dieu-tiet-cam-xuc` (doi-pho-stress, stress-co-hai).
5. `HINH_DA_SUA`: review không sửa hình nào (gas-curve giữ nguyên).
6. Hộp Tóm tắt nhanh của giac-mo mất một dòng (khung Bác bỏ bỏ), của stress-co-hai đổi tiêu đề khung n52.
