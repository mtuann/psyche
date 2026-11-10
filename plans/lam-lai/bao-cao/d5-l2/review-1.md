# Review nội dung D5-L2, phần 1: Linh cảm và xác suất, Não có hai chế độ nghĩ, Dunning–Kruger

Ngày 10/11/2026. Người review: Claude Opus 5.5 (không làm lượt 1 hay lượt 2 của lô). Nhánh `moi/d5-l2`. Chưa build, chưa commit.

## Phạm vi

Hai trang tầng `loi` (`kham-pha/tu-duy/linh-cam-va-xac-suat`, `kham-pha/tu-duy/tu-duy-nhanh-cham`) và một trang `mo-rong` (`kham-pha/tu-duy/dunning-kruger`). Mỗi trang xét: mọi câu `ve-site`, mọi câu lượt 2 khác `dung`, mọi câu lượt 1 đã sửa, làm mềm hay bỏ, mọi câu `nhan`, câu `thoi-su`. Mỗi câu đã xét có `review: dung` hay `review: sai`, `ghi_chu` có thêm "Review (Claude Opus 5.5, 10/11/2026): …". `nguoi.review` của lần kiểm định cuối đã ghi. Câu sai đã sửa thẳng trên trang và hồ sơ, có mục `doi_chu`.

| Trang | Đã review | Đúng | Sai (đã sửa) |
|---|---|---|---|
| Linh cảm và xác suất | 48 | 41 | 7 |
| Não có hai chế độ nghĩ | 48 | 43 | 5 |
| Dunning–Kruger | 53 | 50 | 3 |

Sau review: `node tools/khoa.mjs xuat kham-pha/tu-duy/<trang>` đọc được cả ba hồ sơ; không còn `ket_qua: null`; mọi nhận định không `da-bo`, không `ve-site` có `nguon`, và mọi id nguồn có trong danh sách nguồn của hồ sơ.

## Nguồn đã tự mở

- Tversky & Kahneman (1983), toàn văn (Internet Archive, bộ `wikipedia-scholarly-sources-corpus`): mục Transparent Tests, Bảng 1, tr. 297–300.
- Chandrashekar và cộng sự (2021), toàn văn (open.lnu.se). Mẫu là 1.032 người Mỹ trên MTurk (tác giả ở Hồng Kông; lượt 2 ghi "Hồng Kông" là nhầm nơi tuyển mẫu). Bài James: "a likely failed replication, with no conjunction effect".
- Frederick (2005), toàn văn (bản JSTOR lưu ở `bear.warrington.ufl.edu/brenner/mar7588/Papers/frederick-jep2005.pdf`; `pdf.stafforini.com` nay trả 404, trang AEA chặn bot): tr. 26–28.
- Kruger & Dunning (1999), toàn văn (`gwern.net/doc/psychology/1999-kruger.pdf`): anosognosia, bốn hình (Figure 1–4).
- Tóm tắt: Yechiam & Zeif (2023) qua Europe PMC; Krueger & Mueller (2002) qua Europe PMC và Crossref (tên tác giả chạy lại); bản thảo Le, Jin, Nguyen & Vuong (2023) và bộ dữ liệu Huynh và cộng sự (2022) qua Crossref.
- Ig Nobel 2000 (improbable.com/ig-about/winners/); Wikisource *Nam ngạn chích cẩm* (Phạm Quang Sán, 1918; mục 8 chữ, mục 9 chữ) qua API của Wikisource.
- Tìm thời sự: Europe PMC ngày 10/11/2026 cho Linda, CRT, Dunning–Kruger kèm "Vietnam OR Vietnamese". OpenAlex hết lượt miễn phí trong phiên này.

## Câu sai đã sửa

### Linh cảm và xác suất

- **n34 (khung nhãn):** `:::vung-chac[lỗi conjunction fallacy trong bài toán Linda]` … "Vì vậy hiện tượng vững, còn mức độ thì thay đổi nhiều theo cách hỏi." → `:::kha-vung[…]` … "Mức "khá vững" vì chưa có phân tích tổng hợp về chính mức độ của lỗi, mới có một lần làm lại lớn có đăng ký trước, và tỉ lệ mắc lỗi thay đổi nhiều theo cách hỏi." Theo lượt 2: Yechiam & Zeif đo tác dụng của thưởng; chỉ một tái lập lớn có đăng ký trước, bài James thất bại.
- **n51 (chip mục 2):** bỏ `:nhan[kha-vung]` ở "Bài kiểm tra đặt cược", giữ id cũ `{ #2-bai-kiem-tra-dat-cuoc-kha-vung }`. Bằng chứng cho riêng việc tưởng tượng đặt cược chỉ là so sánh giữa hai nhóm UBC (56% và 85%).
- **n54:** thêm câu "Đây là gợi ý thực hành: bằng chứng cho riêng việc tưởng tượng chỉ là phép so sánh giữa hai nhóm khác nhau nói trên, chưa phải thử nghiệm có kiểm soát. Với tiền thưởng thật, … thấy lỗi giảm, nhưng chỉ ở mức nhỏ."
- **n33 (hình `linda-venn`):** "dù 85% người tham gia nghiên cứu gốc vẫn chọn (b)" → "dù ở một phiên bản của nghiên cứu gốc (chọn một trong hai, 142 sinh viên UBC), 85% vẫn chọn (b)". Giữ khuôn SVG; thêm `linda-venn` vào `HINH_DA_SUA` (`tests/chuyen.test.mjs`) kèm chú thích.
- **n67 (ve-site, quiz câu 4):** "— dù bản thân hiệu ứng thì vững chắc" → ", còn bản thân hiệu ứng thì được xếp khá vững".
- **n69 (quiz câu 2):** giải thích "… là điều làm bài báo này nổi tiếng: … số đông, kể cả người rành xác suất, đều mắc phải" → "Ở phiên bản xếp hạng tám phát biểu, ngay cả nhóm rành xác suất cũng mắc lỗi (85%). Khi chỉ phải chấm hai phát biểu, phần lớn người đã học nhiều thống kê làm đúng, nhưng vẫn có 36% mắc lỗi." Đáp án đúng thêm "(sinh viên chưa học thống kê)".
- **n72 (quiz câu 5):** "Vì sao phiên bản "đặt cược 10 đô la" làm giảm tỉ lệ mắc lỗi (từ 85% xuống 56%)?" → "Ở phiên bản "đặt cược 10 đô la", tỉ lệ mắc lỗi là 56%, thấp hơn mức 85% của phiên bản chọn một trong hai (ở một nhóm sinh viên khác). Tversky và Kahneman giải thích chênh lệch này thế nào?". Lựa chọn và giải thích viết lại: nói rõ đây là phỏng đoán; "cược vào (a) không bao giờ kém cược vào (b)" (sát "dominates").
- Kèm theo: mục 4 "Kiểm tra tỉ lệ gốc" (lượt 1 đã bỏ chip) thêm id cũ `{ #4-kiem-tra-ti-le-goc-kha-vung }`.

### Não có hai chế độ nghĩ

- **n43 (khung nhãn):** bỏ `:::bac-bo[Hệ 1 và Hệ 2 là hai 'bộ phận' riêng biệt trong não]`; thay bằng `:::note[Hệ 1 và Hệ 2 không phải hai "bộ phận" của não]`, thêm câu "Đây là lưu ý về cách hiểu mô hình, không phải một kết quả thực nghiệm nên không gắn nhãn." Lý do (theo lượt 2): không có phép kiểm thất bại nào, nên không đạt thước đo "Đã bị bác bỏ".
- **n51 (ve-site):** câu hồ sơ "bốn khung (…, Đã bị bác bỏ)" → "ba khung nhãn và một khung ghi chú".
- **n45 (thời sự):** "chưa tìm thấy nghiên cứu nào kiểm tra CRT hay phân biệt Hệ 1/Hệ 2 trên người Việt." → "… kiểm tra riêng CRT …" + "CRT mới được dùng như một thước đo phụ, chẳng hạn trong một bản thảo phân tích dữ liệu về gian lận của 493 sinh viên ở năm nước, trong đó có Việt Nam (Le và cộng sự, 2023)." Thêm nguồn `le2023` (bản thảo OSF, doi 10.31219/osf.io/4y9td) vào hồ sơ và mục Nguồn. Hạn giữ 2028-11-01.
- **n52 (quiz câu 1):** "Vì sao hầu hết mọi người trả lời "10 xu"" → "Vì sao nhiều người trả lời "10 xu"" (cùng lý do n3).
- **n53 (quiz câu 2):** "việc bắt được lỗi đó gần như đồng nghĩa với việc giải đúng" → "muốn giải đúng thường phải kìm đáp án ấy lại". Frederick chỉ nói "tantamount to solving" cho bài bóng và chày; với cả ba câu: "reaching the correct answer often requires the suppression of an erroneous answer".
- n14, n15, n16 (lượt 2 `khong-chac`): đã mở toàn văn Frederick 2005, chữ trang đúng (tr. 27), `review: dung`.

### Dunning–Kruger

- **n37:** mục Nguồn, Krueger & Mueller (2002): "— phê bình thống kê đầu tiên: …", không DOI → thêm `<https://doi.org/10.1037/0022-3514.82.2.180>`, "— phê bình thống kê: …".
- **n64 (ve-site):** bỏ câu "Đây là tâm điểm tranh luận hiện nay." ở khung Đang tranh cãi: câu nói về ngành, không về site, và không có nguồn.
- **n95 (ve-site):** "rồi qua cả những phê bình gay gắt nhất về nó — vì câu chuyện này phức tạp hơn meme … rất nhiều" → "rồi qua các phê bình về nó, vì câu chuyện này phức tạp hơn meme … lan truyền trên mạng".

## Nhãn đã chốt

- Linh cảm: Khá vững (lỗi conjunction ở Linda; hạ từ Vững chắc), Đang tranh cãi (vì sao ta mắc bẫy), chip Vững chắc (quy tắc P(A và B) ≤ P(A)), chip Khá vững (nghĩ bằng tần suất). Chip đặt cược: bỏ.
- Não có hai chế độ nghĩ: Khá vững (có hai kiểu xử lý), Khá vững (Hệ 2 thường "lười"), Đang tranh cãi (priming hành vi), chip Đang tranh cãi (checklist). Khung Đã bị bác bỏ: thành khung ghi chú, không nhãn.
- Dunning–Kruger: Vững chắc (tự xếp mình trên trung bình, Zell 2020), Khá vững (phản hồi và huấn luyện; cả chip lời khuyên 2), Đang tranh cãi (đường cong thật hay nhiễu), Đã bị bác bỏ ("núi ngu dốt" là đồ thị của bài gốc: bác bằng chính bài gốc), chip Đang tranh cãi (người giỏi ước lượng lệch), đoạn "cách đọc thận trọng" (Đang tranh cãi, không chip).

## Chỗ còn chưa chắc

- Hộp `::tom-tat` của hai trang lõi đổi theo nhãn mới (Linh cảm: "Khá vững" thay "Vững chắc"; Não có hai chế độ nghĩ: còn ba dòng).
- Id cũ của tiêu đề: tôi chỉ thêm `{ #… }` cho hai tiêu đề của Linh cảm, suy từ ghi chú của lượt 1 ("chip Khá vững"), không mở được site cũ trong phiên này (máy chặn `../psyche-zero/`). Các tiêu đề lượt 1 đã đổi chip hay đổi chữ ở Não có hai chế độ nghĩ (mục 1, 2, 3) và Dunning–Kruger (lời khuyên 1, 3, 4) chưa giữ id cũ: người gom chạy `node tools/chuyen/so-chu.mjs` để thấy id khác và thêm `{ #id-cu }`.
- Charness (2010): số liệu theo bản working paper 2009; chưa đối chiếu bản in.
- Kahneman (2011): lượt 1 đọc bản quét; lượt 2 không mở được sách, chỉ đối chiếu Nobel lecture và trích thứ cấp. Review không mở lại sách; các câu chỉ dựa vào sách (n8–n12, n22, n35–n39, n47, n48) giữ `dung` theo trích của lượt 1.
- Khung Khá vững của Dunning–Kruger (phản hồi và huấn luyện) sát mức dưới: hai hướng nghiên cứu, Ryvkin chỉ đọc tóm tắt.
- Le và cộng sự (2023) là bản thảo chưa bình duyệt; trang ghi rõ. Chưa rõ trong 493 người có bao nhiêu người Việt.
- `nguoi.luot_2` của cả ba hồ sơ vẫn `null` (lệnh `nhap` không điền): người gom điền trước khi khóa.
- Tìm thời sự mới qua OpenAlex (lượt 1) và Europe PMC (review), đều bằng tiếng Anh; chưa quét tạp chí tiếng Việt.

## File đã chạm

- `src/content/docs/kham-pha/tu-duy/linh-cam-va-xac-suat.md`, `tu-duy-nhanh-cham.md`, `dunning-kruger.md`
- `src/hinh/linda-venn.html`, `tests/chuyen.test.mjs` (`HINH_DA_SUA`)
- `kiem-dinh/kham-pha/tu-duy/linh-cam-va-xac-suat.yml`, `tu-duy-nhanh-cham.yml`, `dunning-kruger.yml`

Model: Claude Opus 5.5.
