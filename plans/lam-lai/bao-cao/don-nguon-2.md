# Báo cáo: dọn dữ liệu nguồn lần 2

Nhánh `them/don-nguon-2` (từ `main`). Làm ngày 17/11/2026. Mức review: Lớn (dữ liệu dùng chung). Không đổi trang, không đổi hồ sơ trang, không khóa. Model: Claude Sonnet 5.5.

## Việc

Hồ sơ của các mục đã khóa (trang đợt 5–8, thẻ ngộ nhận, các lần mở khóa) dẫn nguồn chưa có bản ghi trong `src/data/nguon.yml`. Danh sách đủ, kèm kết quả từng mục: `don-nguon-2/nguon-thieu.yml`.

## Kết quả

- **559 nguồn thiếu**: 308 mục có DOI trong link (240 đã thêm, 68 trùng id khác), 251 mục không DOI.
- **Thêm 240 bản ghi** (cuối `nguon.yml`, có chú thích đầu khối), dựng từ Crossref; số bài, tập, trang thiếu bổ sung từ OpenAlex; tên bài đưa về viết hoa kiểu câu (heuristic, rồi sửa tay danh từ riêng); bỏ thẻ HTML, ký tự ẩn, dấu sao chú thích; tác giả theo APA 7 (đủ tác giả, bỏ nơi công tác Crossref chèn làm tác giả). Không có bản ghi không DOI nào được thêm (xem dưới).
- **Sửa 5 bản ghi đã có** (`don-nguon-2/sua.yml`, áp bằng `ap-sua.mjs`): `deese1959` (bỏ "or nonoccurrence" khỏi tên; thêm DOI 10.1037/h0046671, Crossref khớp); `cameron1994`, `eisenberger1996`, `vanijzendoorn1999` (thêm DOI mà hồ sơ dẫn dưới id khác); `eichenlaub2014` (thêm DOI, số 5).
- **Hồ sơ V1: 189 bản ghi** (`kiem-dinh/du-lieu/nguon/`, chưa khóa; gồm 4 bản ghi đã sửa, nhận định của trường sửa ghi `da-sua`). Sinh bằng `tools/du_lieu/ho-so-nguon.mjs`, rồi chỉnh `nhanh` và người làm.
- **Còn lệch cho lượt 2: 56 mục** (chưa có hồ sơ): `don-nguon-2/can-luot-2.yml`, mỗi mục kèm chỗ lệch và ghi chú lượt 1. Phần lớn (32) chỉ là OpenAlex ghi năm đăng trực tuyến. Đáng xem: `cipriani2018`, `moncrieff2023`, `teague2026` (OpenAlex ghi nhầm tạp chí), `abbass2006` (Cochrane, Crossref xếp reference-entry), `balbim2024`, `barrett2017scan` (năm in theo id, Crossref chỉ có năm trực tuyến), `itc2017` (Crossref không ghi tác giả), `ghio2014` (tập "152-154"), `matsumoto2008`, `nuhfer2016`, `nuhfer2017`, `karyotaki2021`, `knecht2000`, `kovacs1981`, `hanoi2026` (lệch do cách so thẻ HTML thoát).
- Một ràng buộc của schema: id phải chứa năm của bản ghi, nên `guitard2025`, `harris2021`, `itc2017` ghi năm theo id (đăng trực tuyến 2025, 2021, 2017; năm in 2026, 2023, 2018) và `balbim2024`, `barrett2017scan` ghi năm in theo id (2024, 2017); mục `can-luot-2.yml` ghi từng trường hợp.

## Không thêm được, cần chủ repo hay lô sau

- **68 mục trùng id khác**: hồ sơ dẫn cùng một nguồn bằng hai id (id cũ như `milgram`, `cepeda`, `harlow58`, `tversky`, `sk48`… cùng DOI với bản ghi `milgram1963`, `cepeda2006`, `harlow1958`, `tversky1974`, `skinner1948`…). Mỗi nguồn một bản ghi nên không thêm; danh sách đủ (id hồ sơ = id bản ghi) ở `nguon-thieu.yml` (`ket_qua: trung-id-khac`). Khi mở khóa hồ sơ ấy thì đổi id cho khớp. Trong đó có sáu mục id cũ tên khác hẳn: `perry2019` (= `perry2020`), `daderman2022` (= `daderman2023`), `cochon2023` (= `cochondrouet2023`), `haslam2014meta` (= `haslam2014b`), `clinton2024`, `nguyenma2025`.
- **Hai hồ sơ dùng một id cho hai bài khác nhau** (thêm một DOI, chưa thêm DOI kia): `chen2025` (Eye and Brain 17 và Perception 55(4), 10.1177/03010066251395949), `hanoi2026` (ETSD 36(3) và Clin Neuropsychiatry, 10.36131/cnfioritieditore20260106; Crossref không có DOI sau), `nguyen2026` (Acta Psychologica và J Eng Educ Transformations, 10.16920/jeet/2026/v39i4/26113). Đã thêm DOI đầu (hồ sơ liệt kê trước). Cần đổi id ở một trong hai hồ sơ.
- **`gardner1983`** ghi DOI của Neisser 1996 (trùng `neisser1996`, cùng DOI): có lẽ id hay DOI trong hồ sơ `kham-pha/tri-tue/tri-tue-la-gi` sai (Gardner 1983 là sách *Frames of Mind*). Không thêm.
- Id không khớp năm: `wendsche2016` (Crossref 2017), `mischel70` và `crossref-krueger` (id không có năm bốn chữ số): đổi id trong hồ sơ.
- `vaidis2024c`: tác giả đầu Crossref là Sleegers, không phải Vaidis; id có lẽ sai tác giả.
- **251 mục không DOI** (OpenStax, Cochrane Handbook, WHO, NICE, NHS, văn bản pháp luật, đường dây, trang web, lần tìm kiếm `tim-*`, sách như `milgram1974`, `fisher1925`, `bandura1973`, `pavlov-*`, `sk38`, `sk53`…): không thêm; phần lớn là trang web hay văn bản cần trang chính thức đủ ngày và tên. Còn lại trong `nguon-thieu.yml` (`ket_qua: de-lan-sau`). Một số id không DOI có DOI ngay ở link `api.crossref.org/works/…` đã nằm trong nhóm trùng id khác ở trên.

## Kiểm thử

- `npm run build`: đạt (122 trang, không trùng nguồn).
- `npm test`: 134 đạt, 0 hỏng, 1 bỏ qua.
- `node tools/khoa.mjs tinh`: mọi mục đã khóa vẫn khớp (không bản ghi đã khóa bị sửa).
- Đối chiếu: `node tools/du_lieu/doi.mjs` (Crossref, OpenAlex) trên 245 bản ghi mới và sửa: 189 khớp cả hai, 56 vào `can-luot-2.yml`.

## Chỗ chưa chắc

1. Tên bài: hạ chữ hoa tự động có thể còn sót danh từ riêng; đã xem toàn bộ danh sách và sửa tay những chỗ thấy. Review nên mở mẫu.
2. Trang chỉ có trang đầu trong Crossref (ví dụ `kovacs1981`, `fox1991`, `tomasello1986`, `karyotaki2021`, `teague2026`, `clarfield2003`): ghi trang đầu, chưa có trang cuối.
3. `chandrashekar2021` ghi "Article MP.2020.2474" (lấy từ hậu tố DOI); `edmar2026`, `le2023` là bản in trước (PsyArXiv, OSF Preprints).
4. Chưa kiểm mẫu, chưa review, chưa khóa 189 hồ sơ mới.

## Review tên bài (Claude Opus 5.5, người gộp, 17/11/2026)

Xem mẫu 25 tên trong 240 bản ghi mới: đúng kiểu APA trừ chữ đầu sau dấu hai chấm chưa viết hoa và vài tên riêng bị hạ chữ ("memrise", "big five"). Sửa 31 tên trong `src/data/nguon.yml` (chỉ bản ghi mới). Hồ sơ V1 (`kiem-dinh/du-lieu/nguon/`, chưa khóa) còn câu tên cũ: sinh lại hồ sơ khi khóa các bản ghi này.
