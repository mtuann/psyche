# D6-L2, review phần 1 (não chẻ đôi, gen và tính cách, não tuổi teen)

Ngày 10/11/2026, nhánh `moi/d6-l2`, model Claude Opus 5.5 (agent review; không làm lượt 1, lượt 2 của lô). Chưa commit, chưa khóa, chưa build. Hồ sơ: `kiem-dinh/kham-pha/co-so-sinh-hoc/{nao-che-doi,gen-va-tinh-cach,nao-tuoi-teen}.yml`; mỗi câu đã xét có `review` và đoạn "Review (Claude Opus 5.5, 10/11/2026): …" cuối `ghi_chu`; `lan[-1].nguoi.review` đã ghi.

## Phạm vi và kết quả

Xét: mọi câu `ve-site`, mọi câu `nhan`, mọi câu lượt 1 đã sửa, làm mềm, bỏ, mọi câu lượt 2 khác `dung`; quét cả trang tìm chữ cũ mà hồ sơ ghi đã sửa.

| Trang | Đã xét | dung | sai |
|---|---|---|---|
| nao-che-doi | 41 | 39 | 2 (n34, n37) |
| gen-va-tinh-cach | 37 | 28 | 9 (n34, n36, n37, n38, n49, n51, n53, n56, n58) |
| nao-tuoi-teen | 50 | 44 | 6 (n37, n40, n42, n43, n46, n53) |

## Câu sai (đã sửa trang và hồ sơ, có `doi_chu`)

nao-che-doi
- n37 (khung Khá vững đầu): "có các đường chia sẻ nguồn lực xử lý dưới thể chai" → "ngay cả sau khi đã bị tách bằng phẫu thuật, chúng vẫn dùng chung nguồn lực xử lý (Gazzaniga, 2005)". Nguồn không nói tới đường dưới thể chai.
- n34 (hình `thi-nghiem-key-ring`): "thí nghiệm kinh điển của Gazzaniga và Sperry (1967) … Nguồn: mô tả theo Gazzaniga & Sperry (1967)" → "Sơ đồ minh họa kiểu bài kiểm tra mà nhóm Sperry và Gazzaniga dùng … Cặp chữ KEY/RING là ví dụ minh họa. Nguồn: cách làm theo Gazzaniga, Bogen & Sperry (1962)"; tiêu đề hình "Ví dụ KEY / RING …", aria-label đổi. Kèm câu hỏi 1 "Trong thí nghiệm KEY/RING" → "Trong ví dụ KEY/RING" (n27).

gen-va-tinh-cach
- n36: bỏ vế "năm nghiên cứu … cho 0,68–0,78 (Neisser và cộng sự, 1996)"; giữ "bốn nghiên cứu nuôi tách nhau, ở Mỹ, Anh và Đan Mạch, cho tương quan IQ từ 0,64 đến 0,74 (Bouchard và cộng sự, 1990, Bảng 2)". Lý do: hai lượt cho hai khoảng khác nhau, review không mở được Neisser 1996 bằng đường hợp lệ.
- n37: "chủ yếu người da trắng ở các nước phương Tây" → "đều ở các nước phương Tây".
- n38: "49% trên hàng chục nghìn tính trạng" → "49% trên 17.804 tính trạng".
- n49: bỏ chip Khá vững ở Áp dụng 1 (lời khuyên chưa được kiểm), giữ id cũ.
- n51: trang còn "Đây là điểm nhiều người nhầm nhất:" dù hồ sơ ghi đã bỏ → đã bỏ.
- n53: "Giới hạn. … các mẫu nuôi tách nhau và con nuôi chủ yếu là người da trắng và có ít gia đình nghèo nhất (Neisser …)" → "Giới hạn. Dữ liệu trong bài chủ yếu đến từ các xã hội phương Tây." (Haworth 2010: Mỹ, Úc, Hà Lan, Anh; Bouchard 1990: Mỹ, Anh, Đan Mạch).
- n56: dẫn "(Neisser và cộng sự, 1996)" cho danh sách Mỹ, Anh, Đan Mạch → "(Bouchard và cộng sự, 1990, Bảng 2)".
- n58: "là chuyện được bàn ở mọi gia đình Việt" → "chính là điều nghiên cứu sinh đôi tìm cách trả lời".
- n34 (hình `tinh-di-truyen-theo-tuoi`): chú thích thêm "từ một nghiên cứu khác (Bouchard và cộng sự, 1990; sinh đôi nuôi tách nhau), nên không phải điểm tiếp theo trên cùng một đường với ba cột đầu". Số trong hình đều đúng.

nao-tuoi-teen
- n46: "Steinberg (2009) bàn về … của Mỹ. Như chính ông nhấn mạnh, khoa học chỉ nên là một trong các cân nhắc" → nêu ba vấn đề và kết luận của ông: khoa học phát triển "ủng hộ mạnh việc duy trì một hệ thống tư pháp riêng" cho người chưa thành niên, kèm lời cảnh báo "không thể và không nên được quyết định chỉ bởi" nghiên cứu phát triển. Khung Đang tranh cãi thêm một câu cùng nội dung (n31).
- n37, n40: bỏ chip Khá vững ở Áp dụng 1 và 2 (lời khuyên chưa được kiểm), giữ id cũ.
- n42, n43: tiêu đề còn là lời khuyên trái thân mục: "3. Dùng sức mạnh của bạn bè theo hướng tích cực" → "3. Bạn bè có thể là ảnh hưởng tích cực?"; "4. Tận dụng 'cửa sổ' học hỏi của não đang tỉa" → "4. Tuổi teen có 'cửa sổ' học hỏi riêng?" (id cũ giữ).
- n53: câu hỏi 1 còn "đạt đỉnh nhạy cảm" (hồ sơ ghi đã đổi) → "nhạy cảm cao".

## Nhãn đã chốt

- nao-che-doi: n35 Khá vững (đổi từ Vững chắc: đúng); n38 Khá vững; n41 Đang tranh cãi (bất đồng diễn giải Sperry/Gazzaniga; trong bốn nhãn là nhãn đúng); n43 và chip Áp dụng 1 (n50) Đã bị bác bỏ: giữ. Phép kiểm tra trực tiếp lớn (Nielsen 2013, 1.011 người) thất bại, Corballis 2014 và Dekker 2012 cùng chiều, không có bằng chứng ủng hộ; thẻ ngộ nhận `nao-trai-phai` (đã khóa) dùng `bac-bo` cùng căn cứ. n54 Khá vững.
- gen-va-tinh-cach: n35 Khá vững (co_so, ly_do viết lại, bỏ số Neisser); n38 Khá vững; n40 Đang tranh cãi; n43 Đã bị bác bỏ: giữ, dù là sai về định nghĩa chứ không phải bác bỏ bằng thực nghiệm. Thân khung nói rõ "sai về định nghĩa"; thẻ `gen-quyet-dinh` trong ngo-nhan.yml dùng `bac-bo`. n49 bỏ.
- nao-tuoi-teen: n28 Khá vững (đổi từ Vững chắc: đúng); n29 Khá vững; n31 Đang tranh cãi: giữ, vì là câu hỏi giá trị, và nay thân khung nêu lập trường của Steinberg. n37, n40 bỏ.

## Nguồn đã mở lại ở review

Toàn văn: Gazzaniga 2005 (bản tác giả), Sperry 1981 (nobelprize.org), Gazzaniga, Bogen & Sperry 1962 (authors.library.caltech.edu), Nielsen 2013, Corballis 2014, Dekker 2012 (Europe PMC), Gogtay 2004 (PDF PNAS, Wayback 31/01/2022), Galvan 2006 (PDF J Neurosci, Wayback 28/10/2026), Steinberg 2008 (PMC2396566, Wayback 26/08/2024), Haworth 2010 (PMC qua NCBI E-utilities), Time 12/1/1987 (time.com/archive). Tóm tắt (Europe PMC): Gazzaniga 1996, Knecht 2000, Nguyen 2020, Bouchard 1990, Polderman 2015, Vukasović & Bratko 2015, Turkheimer 2003, Steinberg 2009, Steinberg và cộng sự 2008, Defoe 2015, Gardner & Steinberg 2005. Siêu dữ liệu ba danh sách Nguồn so với Crossref: khớp hết (n75, n70, n58). Đã thêm DOI cho Gazzaniga và cộng sự 1996.

Các câu lượt 2 ghi `khong-chac` ở nao-tuoi-teen (n5, n6, n8, n10, n12–n14, n19, n35, n38, n41, n50, n55) nay đã đối chiếu với toàn văn: đều đúng.

## Còn chưa chắc

- Gazzaniga & Sperry 1967 (Brain), Sperry 1968: không mở được (không có trong bộ `wikipedia-scholarly-sources-corpus`). Cặp chữ KEY/RING vẫn là ví dụ minh họa.
- Neisser 1996 và Bouchard 1990 (toàn văn): bản sao trên Internet Archive và gwern.net bị chặn ở review vì là bản của bài có tường phí. Các câu còn dựa vào câu trích Neisser của lượt 1 (gen n43 định nghĩa, n47, n51 chiều cao, "heritability does not imply immutability") chưa được review đọc lại. Lượt 2 xác nhận ý bằng nguồn khác.
- Gardner & Steinberg 2005: chỉ tóm tắt; số liệu theo Steinberg 2008 (trang đã ghi).
- Khung Đang tranh cãi của nao-tuoi-teen chưa có nguồn của phía phản đối (ví dụ giới luật học phê bình việc dùng khoa học não trong tư pháp).
- gen n8 "khoảng 50 giờ kiểm tra" (hai lượt cùng `dung`, ngoài phạm vi review): Time 1987 nói "six-day tests", Bouchard 1990 nói "a week". Nên kiểm lại khi gom.

## Việc cho người gom

1. Thêm `thi-nghiem-key-ring` và `tinh-di-truyen-theo-tuoi` vào `HINH_DA_SUA` trong `tests/chuyen.test.mjs` (hai hình đã sửa chú thích, có `doi_chu`).
2. `lan[-1].nguoi.luot_2` của ba hồ sơ vẫn `null`: điền tên agent lượt 2.
3. Khung đầu nao-che-doi đổi một câu (n37), không đổi nhãn. Theo `trang.yml` hiện tại, không trang nào có `dua_tren` trỏ tới nao-che-doi, và không trang nào trong co-so-sinh-hoc lặp lại câu cũ.
4. Chưa chạy `npm run build:xem`, `npm test`. Đã chạy `node tools/khoa.mjs xuat` và `tinh` cho ba trang: đọc được. Ba trang không có khoảng trắng cuối dòng; mọi nhận định không `da-bo`, không `ve-site` có `nguon` nằm trong `nguon` của hồ sơ.
5. Thư mục lạ `kiem-dinh/kham-pha/co-so-sinh-hoc/nao-che-doi kham-pha` (báo cáo lượt 1, mục 3): review không đụng tới.
