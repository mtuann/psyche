# Review nội dung D5-L1, phần 1: Trí nhớ làm việc, IQ, hiệu ứng Flynn

Ngày 09/11/2026. Người review: Claude Opus 5.5 (không làm lượt 1 hay lượt 2 của lô). Nhánh `moi/d5-l1`. Chưa build, chưa commit.

## Phạm vi

Ba trang tầng `loi`: `kham-pha/tri-nho/tri-nho-lam-viec`, `kham-pha/tri-tue/tri-tue-la-gi`, `kham-pha/tri-tue/hieu-ung-flynn`. Mỗi trang xét: mọi câu `ve-site`, mọi câu lượt 2 khác `dung`, mọi câu lượt 1 đã sửa hay làm mềm, mọi câu `nhan`, câu `ket_qua: null`. Mỗi câu đã xét có `review: dung` hay `review: sai`, và `ghi_chu` có thêm đoạn "Review (Claude Opus 5.5, 09/11/2026): …". `nguoi.review` của lần kiểm định cuối đã ghi.

| Trang | Đã review | Đúng | Sai (đã sửa) |
|---|---|---|---|
| Trí nhớ làm việc | 50 | 45 | 5 |
| IQ đo được gì? | 42 | 33 | 9 |
| Hiệu ứng Flynn | 44 | 42 | 2 |

Câu lượt 1 đã sửa hay làm mềm mà lượt 2 ghi `dung` và review không thấy vấn đề: đã đối chiếu chữ trên trang với `trich` và nguồn trong hồ sơ, ghi `review: dung` kèm câu ngắn. Nguồn được mở lại cho các câu lượt 2 khác `dung`, các câu nhãn đang bị bàn và các câu đã sửa.

## Nguồn đã tự mở

- Baddeley & Hitch (1974), toàn văn (PDF nova.edu): thí nghiệm III, Bảng III.
- Baddeley (2000), toàn văn (Internet Archive, bộ `wikipedia-scholarly-sources-corpus`). Trang 421 dựng thành ảnh để xem Hình 1.
- Baddeley (2021), toàn văn (Europe PMC, PMC11979773).
- Baddeley, Thomson & Buchanan (1975), toàn văn.
- Gathercole & Baddeley (1989), Gathercole và cộng sự (1992), toàn văn (Internet Archive).
- Oberauer và cộng sự (2018), toàn văn: các Benchmark 5.2, 6.1, 7, 8.1 và tiêu chí xếp hạng.
- Mattys và cộng sự (2018), toàn văn (PMC).
- Dickens & Flynn (2001), toàn văn (gwern.net).
- Waterhouse (2006), toàn văn (Internet Archive).
- Tài liệu giới thiệu WAIS-5 của Pearson (PDF).
- Chỉ đọc tóm tắt: Baddeley, Lewis & Vallar (1984) và Trahan và cộng sự (2014) qua OpenAlex; Sackett và cộng sự (2022) qua OpenAlex; McGill và cộng sự (2018) qua Europe PMC.
- Không có trong bộ Internet Archive, OpenAlex ghi đóng: Baddeley, Papagno & Vallar (1988); Ellis & Hennelly (1980). Hai câu này dùng bài toàn văn của chính nhóm tác giả hay của bài khác kể lại.

## Câu sai đã sửa

### Trí nhớ làm việc

- **n8:** "khi phải giữ tới 8 chữ số … chậm hơn khoảng một nửa, nhưng tỉ lệ sai gần như không đổi (khoảng 5%)" → "liên tục đọc to, lặp đi lặp lại một dãy 6 chữ số ngẫu nhiên … thời gian suy luận tăng từ khoảng 2,8 lên 4,3 giây (chậm hơn khoảng một nửa), nhưng tỉ lệ sai chỉ nhích từ khoảng 8% lên 10%". Theo Bảng III của chương 1974. Con số "8 chữ số, 5%" là Baddeley (2021) nhớ lại.
- **n25:** thêm câu "Về sau, Baddeley, Lewis và Vallar (1984) thấy hiệu ứng mất cả với tài liệu nghe nếu ức chế kéo dài sang cả lúc nhớ lại." Câu về bài 1975 vẫn đúng. Thêm nguồn BLV 1984.
- **n43:** "Ở trẻ em … dự báo vốn từ một năm sau chứ không phải ngược lại" → "Ở trẻ 4–5 tuổi … dự báo vốn từ một năm sau (Gathercole và Baddeley, 1989). Từ khoảng 5 tuổi trở đi thì chiều ngược lại trội hơn: vốn từ trở thành yếu tố dẫn dắt mối quan hệ này (Gathercole và cộng sự, 1992)". Thêm nguồn 1992.
- **n50:** "với việc đòi hỏi ngôn ngữ, ngay cả nhạc không lời cũng có thể gây nhiễu nhẹ" → "nhiễu do âm thanh chủ yếu thấy ở các việc ghi nhớ bằng lời. Nhưng với việc phải nhớ chữ hay số theo đúng thứ tự, ngay cả nhạc không lời cũng có thể làm nhớ kém đi". Theo Oberauer 2018, Benchmark 6.1.
- **n54 (ve-site):** "Site có công cụ … Thử làm rồi đọc phần giải thích: bạn sẽ thấy con số của mình nằm đâu so với nghiên cứu, và vì sao 7 ± 2 …" → "Khi công cụ [đo độ dài trí nhớ chữ số] lên site, bạn có thể tự đo cả nhớ xuôi lẫn nhớ ngược." Công cụ chưa có trong `src/content/docs/trai-nghiem/`.
  - Bỏ chip `:nhan[kha-vung]` ở tiêu đề mục 5, vì không có nhận định nhãn nào cho chip này. Giữ id cũ `{ #5-tu-do-ban-nhap-cua-minh-kha-vung }`.
  - n55 (vế "7 ± 2" của câu ấy): đúng nguồn, nhưng tả nội dung của công cụ chưa có, nên đã bỏ (`da-bo`). Ý này vẫn có ở mục Ngộ nhận.

### IQ đo được gì?

- **n9:** "Thang Wechsler dành cho người lớn (WAIS) đo bốn nhóm năng lực" → "Bản thứ tư … (WAIS-IV) cho bốn chỉ số … Bản thứ năm (WAIS-5, 2024) có năm chỉ số chính: hiểu ngôn ngữ, thị giác–không gian, lý luận lỏng, trí nhớ làm việc và tốc độ xử lý". Thêm nguồn Pearson.
- **n24:** "Phân tích tổng hợp chính thức đầu tiên về hiệu ứng Flynn" → "Một phân tích tổng hợp lớn về hiệu ứng Flynn". Trahan và cộng sự đã công bố một phân tích tổng hợp năm 2014.
- **n29 (khung Khá vững):** "r ≈ .4–.6 với học vấn và hiệu suất công việc" → "r = .56 với học vấn (Strenze, 2007). Với hiệu suất công việc, ước lượng cũ là r = .53 (Hunter và Hunter, 1984); một phân tích lại gần đây cho rằng … thấp hơn khoảng .10–.20 (Sackett và cộng sự, 2022)".
  - Mục Strenze 2015 (n16) thêm cùng lưu ý sau "r = .53". Thêm nguồn Sackett 2022.
- **n31 (ý chính khung Đang tranh cãi):** "khác biệt IQ … do gen quyết định bao nhiêu phần" → "khác biệt IQ giữa người với người gắn với khác biệt gen đến mức nào".
- **n40, n41:** tiêu đề "Dùng IQ để hiểu điểm mạnh–yếu nhận thức, không để dán nhãn :nhan[vung-chac]" → "Đừng dùng điểm IQ để dán nhãn :nhan[kha-vung]". Giữ id cũ.
  - Thân mục thêm: "việc đọc 'điểm mạnh, điểm yếu' từ chênh lệch giữa các điểm thành phần để chẩn đoán hay chọn cách dạy đã bị nhiều nghiên cứu và tổng quan đặt nghi vấn (McGill và cộng sự, 2018)". Thêm nguồn McGill 2018.
- **n48 (thời sự):** "chưa tìm thấy nghiên cứu công bố nào về khả năng dự báo của IQ" → "… nào dùng bài test IQ chuẩn hóa để đo khả năng dự báo của IQ". Lượt 2 đã thấy một khảo sát năm 2020 gọi bài CRT là "IQ".
- **n56:** "Hai khái niệm đo hai thứ khác nhau và không thay thế nhau" → "EQ không thay thế được IQ. Điểm các bài đo EQ tương quan dương với IQ, chưa được tách rõ khỏi tính cách và trí thông minh chung, và bằng chứng cho EQ như một năng lực riêng còn thiếu (Waterhouse, 2006)".
- **n57 (ve-site):** "điểm IQ tăng 3 điểm mỗi thập kỷ" → "điểm IQ tăng khoảng 3 điểm mỗi thập kỷ".

### Hiệu ứng Flynn

- **n20:** "Phân tích tổng hợp chính thức đầu tiên về hiệu ứng Flynn" → "Một phân tích tổng hợp lớn về hiệu ứng Flynn, công bố sau phân tích tổng hợp của Trahan và cộng sự (2014)".
- **n39:** "Dickens và Flynn (2001) lập luận rằng … — đúng kiểu tư duy mà bài Raven đo lường. Cách hiểu này nhấn mạnh thói quen tư duy …" → "Dickens và Flynn (2001) gợi ý vài yếu tố có thể đã khởi động hiệu ứng: … Theo họ, những thay đổi này có thể khiến thế hệ sau coi trọng việc giải quyết vấn đề trừu tượng hơn hẳn thế hệ trước, rồi được hiệu ứng bội số khuếch đại. Chính họ nói rõ chưa chứng minh được yếu tố nào trong số này thật sự góp phần."

Mỗi chỗ sửa có mục `doi_chu` trong hồ sơ.

## Các quyết định khác

- **Câu `ket_qua: null` (trí nhớ làm việc, n32: chú thích hình `baddeley-model`):** chuyển thành `dung`. Hình 1 của Baddeley (2000) nối cả ba thành phần với cơ chế điều hành trung ương bằng mũi tên hai đầu. Không sửa hình, không thêm vào `HINH_DA_SUA`.
- **Soát loại (trí nhớ làm việc, n26):** câu ở thân bài nhưng hồ sơ ghi `loai: nhan` mà không có `nhan`, `co_so`, `ly_do`, nên khóa sẽ hỏng. Đã đổi sang `phat-hien`; lượt 2 đã kiểm câu này.
- **Nhãn chưa có `nguon`:** mọi câu loại `nhan` chưa có `nguon` được lấy `nguon` từ `co_so`. Nay mọi câu không `da-bo` và không `ve-site` đều có `nguon`.
- **Nguồn trong hồ sơ trí nhớ làm việc:** `bh1974`, `baddeley2000`, `gb1989` nay là toàn văn. Thêm `gathercole1992`, `blv1984`. Hồ sơ IQ thêm `pearson-wais5`, `trahan2014`, `sackett2022`, `mcgill2018`.

## Nhãn đã chốt

- **Trí nhớ làm việc:**
  - Vững chắc: hai việc cùng kênh nhiễu nhau hơn khác kênh (n34), giữ dù lượt 2 ghi chưa chắc.
  - Vững chắc: trí nhớ lời nói phụ thuộc mạnh vào âm thanh (n35). Giữ, không hạ theo lượt 2: khung chỉ nói hiệu ứng, còn cơ chế đã ghi là còn tranh cãi; Oberauer 2018 xếp tương tự âm A, độ dài từ B, đều "robust".
  - Khá vững: bộ đệm tập (n36).
  - Đang tranh cãi: giới hạn của bàn nháp (n37).
  - Lời khuyên 1–4 Khá vững. Mục 5 bỏ chip.
- **IQ:**
  - Vững chắc: positive manifold.
  - Khá vững: dự báo học tập, công việc (thân khung đã sửa).
  - Đang tranh cãi: phần khác biệt gắn với gen (ý chính đã sửa).
  - Đã bị bác bỏ: "IQ cao đảm bảo thành công".
  - Lời khuyên: 1 hạ từ Vững chắc xuống **Khá vững**; 2 Khá vững; 3 Vững chắc; 4 Khá vững.
- **Flynn:** giữ nguyên.
  - Vững chắc: khoảng 3 điểm mỗi thập kỷ.
  - Khá vững: tăng mạnh nhất ở suy luận trừu tượng.
  - Đang tranh cãi: nguyên nhân; đảo chiều.
  - Lời khuyên: 1 Vững chắc; 2, 3 Khá vững.

## Kiểm

- `loiHoSo` (tools/khoa.mjs) trên ba hồ sơ chỉ còn hai lỗi chung: thiếu `nguoi.luot_2` và `nguoi.kiem_mau` ở lần kiểm định cuối. Đây là việc của người gom và của chủ repo.
- Không còn `ket_qua: null`. `node tools/khoa.mjs xuat <trang>` đọc được cả ba trang.
- Trang không có khoảng trắng cuối dòng. Mô tả trong frontmatter không đổi.
- Không build, không chạy `npm test` (theo lời giao).

## Chỗ chưa chắc

- **Id viết tay ngay sau chip nhãn:** tiêu đề "### 1. Đừng dùng điểm IQ để dán nhãn :nhan[kha-vung] { #… }" là chỗ đầu tiên trên site đặt id viết tay ngay sau chip nhãn. Cần build để chắc id được nhận và chip vẫn hiện.
- **Sackett 2022:** chỉ đọc tóm tắt, nên trang không ghi con số riêng cho IQ. Mở toàn văn được thì có thể ghi rõ.
- **n34, n35 (trí nhớ làm việc):** giữ Vững chắc, ngược ý lượt 2. Căn cứ là tổng quan đồng thuận Oberauer 2018, không phải phân tích tổng hợp. Chủ repo có thể muốn xem.
- **Câu khuyến nghị về công cụ (n60):** câu "công cụ đo trên site chỉ nên dùng để tự khám phá" ở mục Việt Nam vẫn nói tới công cụ chưa lên. Review để nguyên vì là khuyến nghị; nên viết lại khi công cụ lên.
- **Câu chỉ dựa vào bài kể lại hay tóm tắt:**
  - BPV 1988 (PV) theo Baddeley 2021 và Gathercole & Baddeley 1989 kể lại.
  - Ellis & Hennelly 1980 theo Mattys 2018 kể lại.
  - Warne & Burningham 2019 chỉ đọc tóm tắt (lượt 1 đã ghi).
