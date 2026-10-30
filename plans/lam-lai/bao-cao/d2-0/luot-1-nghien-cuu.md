# D2-0, lượt 1: bộ `nghien-cuu` và 19 nguồn không DOI

Model: Claude Sonnet 5.5 (agent lượt 1). Không sửa `src/data/`, không build, không commit.

## Số liệu

- 23 hồ sơ `kiem-dinh/du-lieu/nghien-cuu/<id>.yml`: 55 nhận định (31 ở 15 hồ sơ thí nghiệm gồm 15 `n-tn` và `n1`, riêng skinner thêm `n2`; 24 ở 8 hồ sơ "Tác giả (năm)": `n1` tên, `n2` nguồn, `n-tn`).
- 19 hồ sơ `kiem-dinh/du-lieu/nguon/<id>.yml`: 95 nhận định (n1 tác giả, n2 năm, n3 tên, n4 nơi đăng, n5 DOI hay loại).
- Kết quả: `dung` đa số; `da-sua` 11 (10 DOI mới ở n5, 1 số của tập skinner1948 ở n4); `null` 2 (xem dưới).
- Nhận định `n-tn` là `ve-site`, `ket_qua: dung`, `review: null`, không ghi nguồn. Mọi hồ sơ: `luot_1` điền, `luot_2`, `review`, `kiem_mau` null, không có `luot_2` ở nhận định.

## File sửa (người gom áp)

- `sua-nghien-cuu.yml` (đầu file `# bộ: nghien-cuu`): `ten` của 8 hồ sơ.
- `sua-nguon-khong-doi.yml`: 10 DOI (darley1968, latane1968, skinner1948, bandura1963, harlow1959, harlow1965, mischel1972, mischel1988, mischel1989, shoda1990), và `noi_dang` của skinner1948 thành `38(2), 168–172`.
- Sau khi áp, hồ sơ nguon của 10 bài trên có n5 `da-sua` đã đúng với dữ liệu mới; `ho-so-nguon.mjs` có thể sinh lại phần của chúng nhưng không nên ghi đè hồ sơ này (hồ sơ này có Crossref làm nguồn, luot_2 null).
- Tên mới: Henrich ("mẫu WEIRD có đại diện cho cả loài người?"), Cepeda, Cowan, Simons và Chabris 2011 ("người Mỹ tin gì về cách trí nhớ hoạt động?": bài này là khảo sát niềm tin về trí nhớ, không phải thí nghiệm khỉ đột), Miller (giữ ví dụ), Rowland, Segall, Tversky và Kahneman.

## Danh sách `nguon` của 23 hồ sơ: kết luận

Đúng là bài gốc ở 22 hồ sơ; không thiếu bài gốc chính mà trang nhà nhắc, trừ hai chỗ phải quyết:

1. keo-deo: thiếu Mischel và Ebbesen (1970), "Attention in delay of gratification", JPSP 16(3), 329–337, DOI 10.1037/h0029815 (Crossref có; chưa mở toàn văn, trang cũ không dẫn). Có thể thêm vào `nguon.yml` và hồ sơ.
2. skinner: Skinner (1953) *Science and human behavior* là sách lý thuyết chung, không phải báo cáo thí nghiệm: `n2` để `null` (chưa chắc), người gom quyết giữ trong `nguon` hay không.

Ghi chú nhỏ khác:
- Mischel, Shoda và Rodriguez (1989, Science) là bài tổng hợp chương trình của chính nhóm (tóm tắt nói "research program"); để trong n1, `dung`, có ghi chú. Harlow (1958, "The nature of love") là bài diễn văn tổng hợp; Rosenthal và Jacobson (1968, Urban Review) là bài tóm tắt 5 trang. Cả ba đều của chính người làm, chỉ khác loại bài.
- asch1951 và robbers-cave: Asch (1951) chỉ có mục thư mục; Robbers Cave dẫn bản in lại 1988 (bản gốc 1961 đã có `nam_goc`).
- Harlow và Zimmermann 1958 (Proc. Am. Philos. Soc.) có thể cũng là bài gốc, chưa tra, không thêm.
- Milgram: sách *Obedience to authority* (1974) không có trong nguon (trang cũ không dẫn); không thêm.
- Các nguồn khác ở trang nhà (Bond & Smith, Franzen, Le Texier, Watts, Fischer…) là tái lập, phân tích tổng hợp, phê bình; đúng khi không thuộc `nguon` của hồ sơ.
- 8 hồ sơ "Tác giả (năm)": nguon một bài, chính bài ấy; không có gì thiếu.

## Trang nhà

Giữ đề xuất của script ở cả 23 hồ sơ (n-tn `dung`). Đã mở bản cũ của 15 trang Thí nghiệm (phần Nguồn) và đếm chỗ nhắc từng nghiên cứu ở 8 hồ sơ còn lại trong `../psyche-zero/docs`:
- simons2011: `nhin-ma-khong-thay` chỉ nhắc khảo sát 2011 ở một đoạn; trang kể chính về Simons và Chabris 1999. Vẫn là trang kể chi tiết nhất về khảo sát; người gom xem có hợp lý không.
- miller1956 và cowan2001 cùng trang `tri-nho-lam-viec`, rowland2014 và cepeda2006 cùng `duong-cong-quen`; Rowland chỉ có vài dòng ở đó (chưa có trang riêng), nhưng không có trang nào khác tốt hơn.
- tversky1974: trang cũ có công cụ `trai-nghiem/neo-gia` nhắc nhiều hơn, nhưng là công cụ; giữ `linh-cam-va-xac-suat`.

## 19 nguồn không DOI: kết quả V1

- 10 bài báo: Crossref khớp tác giả, năm, tên, tập, trang; thêm DOI (n5 `da-sua`). Chỗ lưu ý: harlow1959 Crossref ghi tên số ít "Affectional Response…", Europe PMC (MEDLINE) ghi số nhiều như dữ liệu; mischel1972 Crossref ghi "Raskoff Zeiss, Antonette" (họ kép), dữ liệu "Zeiss, A. R.", coi là cùng người.
- haney1973: không có DOI. Crossref chỉ có báo cáo kỹ thuật DTIC 1972 cùng tên (10.21236/ad0751041), không phải bài tạp chí: không gán. Đọc bản PDF scan (OCR) ở prisonexp.org: tên, tác giả, tập 1, trang 69–97 (29 trang) khớp.
- 8 sách và chương sách: Open Library, Wellcome, Everand, Classics in the History of Psychology. Chỗ chưa chắc:
  - asch1951 n4 `null`: số trang 177–190 chỉ thấy ở bibbase (mục thư mục thứ cấp); Wellcome xác nhận sách, biên tập Guetzkow, Carnegie Press, Pittsburgh, 1951, nhưng không có mục lục. Hai bản in lại có DOI trên Crossref (10.1525/9780520313514-017; 10.4324/9781315290614-27) có trang khác vì là sách khác.
  - skinner1938: Open Library có hai bản ghi, nhà xuất bản "D. Appleton-Century Company" (bản 1938 đúng như dữ liệu "Appleton-Century") và "Appleton-Century-Crofts" (tên về sau).
  - pavlov1927: dữ liệu để "(G. V. Anrep, Trans.)" trong `ten`; theo APA đó là ghi chú người dịch, nên người gom quyết tách hay giữ.
  - sherif1988: "White, B. J." là B. Jack White (Everand); nhà in bản 1961 hai nguồn ghi khác nhau (University Book Exchange; Institute of Group Relations).
  - rosenthal1968b: hai bản ghi Open Library gõ lệch nhẹ phụ đề; tên theo dữ liệu.
  - Không tra DOI của các sách (chỉ bài báo).

## Chỗ chưa chắc chung

- Nhiều bài 1960 (Milgram, Watson, Schachter, Bandura, Seligman…) bản ghi Crossref và PubMed chỉ có tên, tác giả, nơi đăng, không có tóm tắt: nhận định "được công bố ở…" dựa trên đó, chưa đọc toàn văn; không nói gì về thiết kế hay kết quả.
- Pagefind không liên quan; không chạy kiểm thử.
- Rate limit của NCBI E-utilities làm vài tóm tắt PubMed không đọc được (Rowland dùng Europe PMC).

## Nguồn hay dùng

Crossref (`api.crossref.org/works/<DOI>`, UA `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`), Europe PMC REST (tóm tắt và tên MEDLINE), NCBI efetch (có giới hạn 3 lần/giây), Open Library (`/books/<id>.json`), Wellcome Collection, psychclassics.yorku.ca, prisonexp.org (PDF scan, đọc bằng PyMuPDF và tesseract), Everand, bibbase.org.
