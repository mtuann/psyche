# Sửa theo máy canh (mo/sua-may-canh, 17/11/2026)

Model: Claude Opus 5.5 (một agent, không dùng agent con). Chủ repo duyệt làm lô này ngày 17/11/2026. Mức review: lớn (hồ sơ và trang đã khóa, workflow máy canh).

Đầu vào: lần chạy thật của máy canh (`plans/lam-lai/bao-cao/d9-may-canh.md`). Đã chạy lại `node tools/may-canh.mjs rut-bai` (Crossref, 17/11/2026) và lychee 0.24.2 với cùng tham số của workflow.

## Kết quả ngắn

- **Đính chính, bản mới:** đã xét 11/18 DOI có đính chính (12 thông báo) và bản mới của Abbass 2006. Tất cả ghi vào `tools/may-canh-da-xet.yml`. Không cái nào chạm điều trang dùng, nên **không mở khóa trang nào vì đính chính**. 7 DOI còn lại **chưa xét**: không đọc được thông báo bằng đường hợp lệ (xem dưới). Máy canh sẽ còn báo chúng.
- **DOI sai của erikson1968:** đã bỏ khỏi hồ sơ. Mã băm không đổi, không cần mở khóa.
- **Link:** sửa 2 link chết thật. Việc này buộc **mở khóa 2 trang**: `kham-pha/cang-thang-giac-ngu/stress-co-hai` và `ho-tro/index`. Thêm 4 luật `--exclude` có ghi lý do cho link còn sống mà máy chủ chặn yêu cầu tự động.
- `npm run build:xem && npm test`: đạt (151 đạt, 1 bỏ qua).
- **Chú ý:** `npm run build && npm test` (bản thật) **hỏng** khi hai trang còn mở. Bản thật bỏ `ho-tro/index`, nên link Hỗ trợ ở chân mọi trang và phép đối chiếu với site cũ đều hỏng. Phải khóa lại cả hai trang trước khi gộp vào `main`.

## 1. Đính chính (18 DOI) và bản mới (1)

Đọc thông báo ở nguồn mở: trang nhà xuất bản khi mở (Springer, Nature, PLOS), tóm tắt PubMed qua E-utilities, tóm tắt OpenAlex (một số thông báo được lưu nguyên văn ở đó).

### Đã xét, không chạm điều site dùng (ghi `may-canh-da-xet.yml`)

| DOI (nguồn) | Thông báo | Đính chính sửa gì | Kết luận |
|---|---|---|---|
| ciria2023 | s41562-026-02532-2 (2/9/2026), nature.com | 109 bài đủ tiêu chí, nhưng 100 bài không trùng mới vào phân tích; một trích dẫn nhầm, ảnh hưởng dưới mức thập phân đã báo; thêm báo cáo lệch đăng ký trước. Tác giả ghi không đổi ước lượng hay kết luận | `the-duc-nao` dùng 24 phân tích tổng hợp, d = 0,22 / 0,13 / 0,05 và kết luận. Không chạm |
| hofmann2012 | s10608-013-9595-3, Springer | Bảng 1: "Borderline Personality Disorder" → "Body Dysmorphic Disorder" | `tri-lieu-tam-ly` không dùng Bảng 1 |
| zust2019 | j.cub.2019.09.066 (OpenAlex, nguyên văn) | Ô của Bảng S4 (tài liệu bổ sung) chép nhầm; lỗi chữ ở S6; tác giả ghi không ảnh hưởng kết quả | `ngu-va-tri-nho` không dùng |
| johnsen2015 | bul0000050 (PubMed 26890388) | Vài số trong sơ đồ chọn bài; số nghiên cứu phân tích và kết luận không đổi | n31 chỉ dùng kết luận |
| soto2017 | pspp0000155 (PubMed 28617026) | Trích dẫn McCrae & Costa 2008 → 2010; ghi chú Bảng 6 | Chưa trang nào dẫn |
| wynn1992 | 360768b0 và 361374a0, PDF nature.com | Bảng 1, thí nghiệm 2: thời gian nhìn bị đảo (LT(1) = 8,05, LT(2) = 10,98); không đổi kết luận | `tre-hoc-the-nao` không dùng thời gian nhìn |
| button2013 | nrn3502, nature.com | Định nghĩa R (tỉ lệ cược trước nghiên cứu), tr. 366 | `co-mau-suc-manh` không dùng R |
| szucs2017 | pbio.3001151, PLOS | Công suất 0,12 / 0,46 / 0,78 | Trang đã dùng số đính chính từ lần khóa (c30) |
| wiradhany2017 | s13414-017-1456-9, Springer | Cỡ nhóm HMM/LMM của nghiên cứu 1 bị đảo (10 và 13) | `da-nhiem-so` không dùng cỡ nhóm |
| funder2019 | 2515245920979282 | **Chỉ đọc được câu đầu** (OpenAlex): mục "Squaring the Correlation" có câu không chính xác về r | `do-lon-hieu-ung` không dẫn mục này. Chỗ chưa chắc: chưa đọc toàn văn |
| adesope2017 | 0034654317700823 | **Chỉ đọc được câu đầu** (OpenAlex): sửa bản OnlineFirst, tr. 4, phần dẫn nhập | Trang dùng số tóm tắt và kết quả của bản in 87(3). Chỗ chưa chắc: như trên |
| abbass2006 (bản mới) | cd004687.pub4 (2014), tóm tắt Europe PMC 24984083 | 33 nghiên cứu, 2.173 người; STPP hơn đối chứng ở ngắn hạn và trung hạn; dài hạn hiệu ứng lớn hơn nhưng một số không có ý nghĩa; vẫn "promise… modest to large gains", dặn thận trọng | Xem dưới |

**Abbass 2006 → bản 2014.** Câu n46 của `tri-lieu-tam-ly` kể điều Shedler (2010) dẫn từ bản 2006 (0,97; 1,51), kèm lời dặn thận trọng của chính bản 2006. Câu ấy vẫn đúng khi đọc như lời kể về bản 2006. Bản 2014 không bác kết luận này: vẫn có lợi, vẫn dặn thận trọng. Không đổi chữ trang. Không đổi bản ghi `abbass2006` sang pub4: trang dẫn đúng bản 2006, và số 0,97 / 1,51 không có ở bản 2014. Gợi ý cho lần mở trang sau: thêm một câu về bản cập nhật 2014. Bài này là bài Sức khỏe tâm thần, nên sửa chữ cần qua quy trình, và cần cờ `cho_chuyen_gia` khi khóa lại.

### Chưa xét: không đọc được thông báo (máy canh còn báo)

| DOI (nguồn) | Thông báo | Dùng ở | Vì sao chưa |
|---|---|---|---|
| **macnamara2014** | 10.1177/0956797618769891 (2018, 3 trang) | thẻ `muoi-nghin-gio` (g1: 26%, 21%, 18%, 4%, <1%) | Sage chặn yêu cầu tự động (403). Câu đầu (OpenAlex) cho thấy họ đã **dùng sai công thức điều chỉnh cỡ mẫu** (Cheung & Chan). Một bài bình luận nói r chung đổi từ 0,35 lên 0,38, nên **các tỉ lệ phần trăm theo lĩnh vực có thể đã đổi**. **Ưu tiên cao nhất**: cần người mở được bản đính chính (trình duyệt) để so g1 |
| barrett2019 | 10.1177/1529100619889954 (2 trang) | `cam-xuc-co-ban`, hai thẻ ngộ nhận | Sage 403; PubMed và OpenAlex không có nội dung |
| gardner2005 | 10.1037/a0026993 | `nao-tuoi-teen` (n18–n20: 306 người, "gấp đôi", "50%") | APA PsycNet chỉ dựng bằng JavaScript; không có ở PubMed hay Europe PMC |
| flynn1987 | 10.1037/h0090408 | `hieu-ung-flynn`, `tri-tue-la-gi` | Như trên |
| burton2001 | 10.1037/1093-4510.5.1.37 | `ao-giac-thi-giac`, `trai-nghiem/ebbinghaus` | Như trên (lượt 2 trước đây cũng ghi không mở được) |
| kowalski2014 | 10.1037/a0036634 | `tam-ly-hoc-duong` | Như trên |
| schachter1962 | 10.1037/h0038845 (Erratum 1963, Psychol Rev 70(1), 121) | `thi-nghiem/schachter-singer` | Như trên |

Không dùng bản lưu Internet Archive, và không đổi User-Agent để vượt tường chặn. Lúc làm, công cụ tìm kiếm web và việc tra bản lưu bị chặn quyền trong phiên này. Cách làm tiếp: người có trình duyệt mở 7 thông báo (cả 7 đều miễn phí ở trang nhà xuất bản: Sage "bronze OA", APA thường mở đính chính), đối chiếu với các nhận định trong issue `rut-bai`, rồi ghi vào `tools/may-canh-da-xet.yml`. Nếu Macnamara đổi số: mở khóa bản ghi `du-lieu/ngo-nhan/muoi-nghin-gio`.

## 2. DOI sai `10.2307/1127007` (erikson1968)

Đây là DOI của một bài khác (JSTOR), không phải sách *Identity: Youth and Crisis*. Nó chỉ nằm ở danh sách `nguon` của `kiem-dinh/kham-pha/phat-trien/ban-sac-tuoi-teen.yml`, không có trên trang. Đã sửa theo cách hồ sơ khác ghi sách (như `bandura1977` ở `thi-nghiem/bandura.yml`): bỏ `link`, ghi "(sách, New York: Norton; không có DOI)". `node tools/khoa.mjs tinh`: mọi mục khớp, mã băm không đổi (hồ sơ không thuộc mã băm của trang), nên không mở khóa. Bản ghi `erikson1968` ở `nguon.yml` vốn đã đúng (sách, không DOI). Máy canh nay đếm 764 DOI.

## 3. Link (lychee chạy lại 17/11/2026)

| Link | Trang | Kết luận | Đã làm |
|---|---|---|---|
| `openstax.org/books/psychology-2e/` | `stress-co-hai` (mục Nguồn) | 404 thật | Đổi sang `…/pages/14-introduction` (trang mở đầu chương 14, mục lục 14.1–14.5, trả 200). **Mở khóa** |
| `binhphuoc.gov.vn/…/luat24.pdf` | `ho-tro/index` (khối Nguồn đã dùng để kiểm chứng) | Chứng chỉ TLS sai tên miền (lychee, curl) | Đổi sang bản Công báo trên `datafiles.chinhphu.vn/cpp/files/vbpq/2024/01/luat24.pdf` (đã mở: 56 trang, Điều 25 đúng; lượt 2 lần 1 đã dùng bản này), chữ link "Cổng Thông tin điện tử Chính phủ"; nguồn `luat-vien-thong-2023` của hồ sơ đổi theo. **Mở khóa** |
| `doi.org/10.1055/s-0037-1613072` (Fujimura 2002) | `the-duc-nao` | DOI đúng (Crossref: đúng bài, Thromb Haemost 87, 728–734). Trang của Thieme trả 404 cho DOI | Không sửa trang. `--exclude` riêng DOI này, có ghi lý do |
| `doi.org/10.1891/0889-8391.28.3.156` (mới, Ngo 2014) | `tim-giup-do`, `tri-lieu-tam-ly` | DOI đúng (Crossref). Springer Publishing chuyển vòng qua trang đăng nhập, quá 10 lần chuyển | Không sửa. `--exclude "^https://doi\.org/10\.1891/"` |
| `ipip.ori.org` (5 link) | `trai-nghiem/big-five-mini` | Lychee bị ngắt kết nối; curl (User-Agent của dự án) nhận 200 | Không sửa. `--exclude` |
| `gutenberg.org/ebooks/66048` | `giac-mo` | 503 cho cả lychee và curl (giới hạn tần suất với yêu cầu tự động) | Không sửa. `--exclude`; chưa xác nhận lại bằng trình duyệt |
| `mpi.gov.vn/…` (`nguon.yml`) | | Hết giờ | Không đổi; theo dõi lần chạy sau |

Các luật `--exclude` nằm ở `.github/workflows/may-canh.yml`, có chú thích lý do và ngày xét. Gợi ý: kiểm lại các link ấy bằng tay khi xét Hỗ trợ hằng quý.

## Trang đã mở khóa (chưa khóa lại, theo lời giao)

1. **`kham-pha/cang-thang-giac-ngu/stress-co-hai`** (mở rộng). Chỉ đổi link OpenStax ở mục Nguồn. Hồ sơ: thêm nguồn `os14`, `lan` số 2 (`luot_1` đã điền), `ghi_chu` của **n81** ghi chữ cũ và chữ mới, n81 thêm `os14`.
2. **`ho-tro/index`** (có hạn). Chỉ đổi link và chữ link của dòng Luật Viễn thông. Hồ sơ: nguồn `luat-vien-thong-2023` đổi link, `lan` số 2, `ghi_chu` của **n75** ghi chữ cũ và chữ mới. Không kiểm lại các số liên hệ; hạn kiểm lại vẫn là 30/01/2027.

### Nhận định cần kiểm lại trước khi khóa

| Trang | Nhận định | Loại | Cần |
|---|---|---|---|
| `stress-co-hai` | n81 (mục Nguồn, dòng OpenStax: link mới trỏ đúng chương 14 của *Psychology 2e*, có 14.1, 14.2, 14.4) | `lich-su` | Lượt 2 độc lập |
| `ho-tro/index` | n75 (khối "Nguồn đã dùng để kiểm chứng": link mới là đúng Luật 24/2023/QH15, Công báo số 29+30, Điều 25) | `ve-site` | Review (câu `ve-site` không qua lượt 2). Lượt 2 có thể mở lại link mới cho n5, n10, n11 (dùng nguồn `luat-vien-thong-2023`, chữ không đổi) |

Sau đó: điền `luot_2`, `review`, `kiem_mau` của lần 2 rồi chạy `node tools/khoa.mjs khoa kham-pha/cang-thang-giac-ngu/stress-co-hai ho-tro/index`. Chỉ gộp vào `main` khi hai trang đã khóa lại: bản thật thiếu `ho-tro/index` thì `npm test` hỏng (đã thử: 2 phép kiểm hỏng, link nội bộ và đối chiếu site cũ).

## File đã chạm

- `tools/may-canh-da-xet.yml`: 13 mục
- `kiem-dinh/kham-pha/phat-trien/ban-sac-tuoi-teen.yml`: erikson1968
- `src/content/docs/kham-pha/cang-thang-giac-ngu/stress-co-hai.md`, `kiem-dinh/kham-pha/cang-thang-giac-ngu/stress-co-hai.yml`
- `src/content/docs/ho-tro/index.md`, `kiem-dinh/ho-tro/index.yml`
- `kiem-dinh/khoa.json`: gỡ hai dòng, do `khoa.mjs mo` làm
- `.github/workflows/may-canh.yml`: 4 `--exclude`
- Báo cáo này

## Kiểm thử

- `npm run build:xem && npm test`: 152 phép kiểm, 151 đạt, 1 bỏ qua, 0 hỏng.
- `node tools/khoa.mjs tinh`: mọi mục đã khóa khớp.
- `node tools/may-canh.mjs rut-bai --tu <kết quả Crossref đã lưu>`: còn 7 DOI có đính chính chưa xét, đúng như bảng trên.
- `npm run build && npm test` (bản thật): hỏng 2 phép kiểm, do hai trang đang mở (xem trên).

## Chỗ chưa chắc

- 7 đính chính chưa đọc được, nhất là **Macnamara 2014**, có thể đã đổi các số phần trăm mà thẻ `muoi-nghin-gio` dùng.
- Funder 2019 và Adesope 2017: kết luận dựa trên câu đầu của thông báo, chưa đọc toàn văn.
- Exclude cả tên miền `ipip.ori.org`, `gutenberg.org` và tiền tố DOI `10.1891/` thì máy canh không thấy nếu chúng chết thật về sau; cần kiểm bằng tay.
- Fujimura: DOI đúng nhưng người đọc bấm vào sẽ gặp 404 của Thieme. Có thể thêm link PubMed khi trang `the-duc-nao` được mở vì lý do khác.
