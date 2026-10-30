# D3-L1, lượt 1, phần 1/2, chỗ khó: asch, milgram, darley-latane, khi-dot-vo-hinh

Model: Claude Opus 5.5 (chỗ khó, sau lượt 1 của Sonnet ở `luot-1-phan-1.md`). Ngày 30/10/2026. Nhánh `moi/d3-l1`. Không build, không commit. `node tools/khoa.mjs xuat thi-nghiem/<trang>` đọc được cả bốn hồ sơ; không còn `ket_qua: null`; trang không có khoảng trắng cuối dòng. `nguoi.luot_1` thêm "; chỗ khó: Claude Opus 5.5". Mỗi chỗ đã sửa có `ghi_chu` (chữ cũ, chữ mới, lý do) mở đầu bằng "Chỗ khó (Claude Opus 5.5)", và có mục `doi_chu` dạng tóm tắt. Khi build, chạy `so-chu.mjs --doi-chu` để bổ sung khung cho từng khối.

File đã chạm: bốn trang `src/content/docs/thi-nghiem/{asch,milgram,darley-latane,khi-dot-vo-hinh}.md` (khi-dot-vo-hinh: chỉ hồ sơ), bốn hồ sơ `kiem-dinh/thi-nghiem/…yml`, báo cáo này. Không sửa `src/hinh/bystander-smoke.html`, `tests/chuyen.test.mjs` (hình khói đúng, không cần ở `HINH_DA_SUA`).

## Nguồn mới mở được

- **Latané & Darley (1968), bài khói**, JPSP 10(3), 215–221: toàn văn, PDF ở Internet Archive (bộ `wikipedia-scholarly-sources-corpus`, tìm qua DuckDuckGo). Mở được 19 câu đang treo ở darley-latane.
- **Fischer và cộng sự (2011)**: toàn văn ở cùng bộ của Internet Archive (`…/10.1037%252Fa0023304.pdf`). Có mô hình 5 bước, định nghĩa vô tri tập thể, mô hình ngẫu nhiên, thiên lệch xuất bản, Beaman 1978.
- **Markey (2000)**, Computers in Human Behavior 16(2), 183–188: toàn văn, bản tác giả lưu ở Wayback Machine (link từ Semantic Scholar).
- **OpenStax Psychology 2e**, mục 12.4: định nghĩa ảnh hưởng thông tin (theo Deutsch & Gerard 1955).
- Berns và cộng sự (2005) (tóm tắt, PubMed qua E-utilities), Germar và cộng sự (2014) (tóm tắt OpenAlex, siêu dữ liệu Crossref). OpenAlex xác nhận Asch (1955) *Scientific American* 193(5), 31–35 (mục 9 của báo cáo trước: đúng).
- Thêm vào "Nguồn và cách mở" của chuẩn (người giao quyết): Internet Archive có bộ `wikipedia-scholarly-sources-corpus` chứa PDF nhiều bài APA cũ; OpenAlex (`api.openalex.org/works/doi:<DOI>`) cho tóm tắt khi Crossref không có.

## 25 câu `null`: đã quyết thế nào

**darley-latane (19 câu)**
- Số của thí nghiệm khói (n16–n22, n44): khớp bài gốc. Câu hỏi 1 (n44) và 38% theo nhóm (n17): `dung`. Các câu còn lại: `da-sua`, vì trang thêm điều bài gốc có: 18/24, 1/10, 3/24 người, mức kỳ vọng hơn 98% số nhóm, "6 phút kể từ lúc nhận ra khói", người tham gia là nam sinh viên Columbia. Sai đã sửa: "dụi mắt **vì cay**", "**nhiều người** trong 90%" (bài: cả 9 người ho, dụi mắt, mở cửa sổ); lý do "mỗi nhóm dừng ngay khi có người đầu tiên lên tiếng" không đúng ý bài; "khói xám từ khe cửa" trong cảnh tưởng tượng (bài: khói trắng, lỗ thông gió). Thêm n54 (phỏng vấn sau thí nghiệm: người không báo đã gạt ý nghĩ đó là lửa).
- Vô tri tập thể (n4, n45): `dung` theo Fischer, tr. 518, cộng mô tả cơ chế trong bài khói. Lời giải thích câu hỏi 2 ("Không ai vô cảm cả…"): `da-sua`, viết theo phỏng vấn sau thí nghiệm.
- Mô hình 5 bước (n23, n24, n46): `da-sua`. Sách 1970 chưa đọc được, nên trang viết "theo Fischer và cộng sự kể lại". Hai bước cuối viết theo Fischer ("tin mình biết cách giúp", "quyết định giúp"). Câu "đám đông khiến ta dễ vấp ở cả 5 bước" không có nguồn; thay bằng điều hai bài 1968 cho thấy ở ba bước đầu (nhận ra khói trong 5 giây đầu: 63% người ngồi một mình, 26% người ngồi cùng người khác).
- "Mô hình 5 bước là khung giải thích được dùng rộng rãi" (n25, trong khung Vững chắc): `da-sua`, thay bằng câu của Fischer: các nghiên cứu vẫn chưa rõ về quá trình tâm lý đứng sau hiệu ứng.
- Lời khuyên: "chỉ đích danh" (n36, câu hỏi 5 n48) `da-sua` theo Markey 2000 (gọi tên thì được trả lời nhanh hơn, 36 so với 52 giây, và hiệu ứng số người biến mất), ghi rõ đó là lời nhờ nhỏ trên mạng; thêm n55 cho các con số. Lời khuyên "đặt tên tình huống thành tiếng" (n37) `da-sua`: viết lại thành "nói với người bên cạnh", kèm Fischer (người chứng kiến thật, trao đổi thật thì thêm người lại giúp nhiều hơn). Lời khuyên "chuẩn bị trước" (n38, không có nguồn dù đã ghi `da-lam-mem`): thay bằng Beaman 1978 theo Fischer kể lại.
- Hình (n49): `dung`, xem mục Hình.
- Ngoài danh sách null: toàn văn Fischer không có biến "nạn nhân bị đe dọa thân thể". Đã sửa ở đoạn Fischer và câu hỏi 4 (n27, n47).

**milgram (4 câu)**
- Lừa đảo giả danh (n48): `da-sua`. Bỏ "công thức giống hệt" và "cách chống" (không có nguồn chính thức; tìm trang Bộ Công an không ra). Giữ điều thí nghiệm cho thấy (Bridgeport 47,5% so với 62,5%) và nói rõ phần lừa đảo là phép so sánh của trang.
- "Biết trước bốn câu thúc ép giúp nhận ra chúng" (n50): `da-bo`. Câu "Người dám dừng lại thường là người có một đồng minh" (n49) cũng được làm mềm.
- Câu hỏi 5 (n64): `da-sua`. Thay câu loại suy bằng câu hỏi về số liệu Bridgeport, đổi loại thành `so-lieu`.
- Hình (n65): `da-sua`, xem mục Hình.

**asch (2 câu)**
- Định nghĩa ảnh hưởng thông tin (n34): `dung` theo OpenStax 2e, mục 12.4.
- Ví dụ đánh giá nhà hàng (n36): `dung`. Câu này là định nghĩa ("khi vấn đề mơ hồ…", OpenStax), không phải lời khuyên, nên đổi loại thành `dinh-nghia`; ví dụ nhà hàng là `gia-dinh`.

## Nhãn đã chốt

| Trang | Khung | Chốt | Cơ sở |
|---|---|---|---|
| asch | Vững chắc (nhóm nhất trí làm lệch phán đoán) | giữ | Có phân tích tổng hợp Bond & Smith 1996 (133 nghiên cứu, 17 nước); Franzen & Mader 2023 làm lại khớp bản gốc; không thấy thất bại lớn chưa giải thích |
| asch | Đang tranh cãi (có "nhìn" khác đi không) | giữ, thêm nguồn | Asch 1956 (khâu phán đoán) đối lại Berns 2005 (fMRI) và Germar 2014 (mô hình khuếch tán) nghiêng về tri giác; thêm một câu và hai nguồn vào khung (n60) |
| milgram | Vững chắc → **Khá vững** (vâng lời cao trong phòng thí nghiệm) | hạ | Meta-Milgram chỉ gộp các biến thể nhỏ của chính Milgram; không có tái lập lớn đăng ký trước; Burger và Doliński dừng sớm; Perry 2019: người hoài nghi giật mạnh hơn. Đã đổi khung, thêm câu "Vì sao chỉ khá vững" (n69) |
| darley-latane | Vững chắc (hiệu ứng trong tình huống mập mờ) | giữ | Toàn văn Fischer 2011: mô hình ngẫu nhiên g = −0,33, có ý nghĩa; trim-and-fill không đổi ước lượng; có cả nghiên cứu thực địa. Philpot 2020 nói về mức đám đông, không mâu thuẫn |
| darley-latane | Đã bị bác bỏ (38 nhân chứng Genovese) | giữ | Manning 2007 (lưu trữ: bằng chứng gốc không còn giá trị); Fischer 2011 chấp nhận kết luận ấy. Nhãn nói về câu chuyện, không về hiệu ứng |
| khi-dot-vo-hinh | Vững chắc (mù không chú ý) | giữ | Ekelund 2022 gộp tỉ lệ mù của 14 nghiên cứu (62% ở người mới, 56% ở chuyên gia), thêm Nobre 2020 (59 thí nghiệm); có ở nhiều quần thể |
| khi-dot-vo-hinh | Khá vững (ngoài đời, nhân chứng) | giữ | Chabris 2011 và Hyman 2010 cùng chiều, nhưng mỗi bối cảnh ít nghiên cứu; không có nguồn nào cho "cuộc tranh luận" của khung cũ |

Đổi nhãn milgram làm đổi hộp Tóm tắt nhanh (dựng từ khung). Chưa kiểm các trang khác có nhắc "Milgram: vững chắc" hay không: người giao tìm theo `o_dau`, hay tìm chuỗi trong `src/content/docs`.

## Hình

- `bystander-smoke.html`: đối chiếu với bài gốc, các số đều đúng: 75%, 38% (tính theo nhóm), 3/8, 10%, mốc 6 phút kể từ lúc nhận ra khói. Chú thích và aria-label cũng đúng. Không sửa, không thêm vào `HINH_DA_SUA`.
- `milgram-obedience.html` (người giao đã sửa): ghi n65 `da-sua` và mục `doi_chu` ở hồ sơ milgram. Bài gốc ghi: "No subject stopped prior to administering Shock Level 20 … kicks on the wall and no longer provides answers". `HINH_DA_SUA` đã có tên hình kèm chú thích.

## Dữ liệu dùng chung (`src/data/nguon.yml`, không sửa: người giao)

- `dolinski2017` sai: tên bài ("…Obedience to authority today"), số "8(3), 282–289", 2 tác giả, không có DOI. Crossref ghi: "Would you deliver an electric shock in 2015? Obedience in the experimental paradigm developed by Stanley Milgram in the 50 years following the original studies", SPPS 8(8), 927–933, 7 tác giả (Doliński, Grzyb, Folwarczny, Grzybała, Krzyszycha, Martynowska, Trojanowski), DOI 10.1177/1948550617693060.
- `latane1968`, `latane1970`, `fischer2011`, `darley1968`: khớp nguồn đã mở.
- Chưa có bản ghi (các trang dùng mục Nguồn viết tay): `markey2000`, `berns2005`, `germar2014`, `openstax2e`, cộng danh sách ở mục 7 của báo cáo trước.

## Chỗ còn chưa chắc

1. Manning 2007, Berns 2005, Germar 2014, Ekelund 2022, Nobre 2020, Franzen 2023, Perry 2019, Doliński 2017 mới đọc tóm tắt; lượt 2 nên mở toàn văn những bài làm căn cứ cho nhãn (Manning, Perry).
2. Hạ nhãn Milgram là một phán đoán theo thước đo. Có thể giữ Vững chắc nếu tính thêm Blass 1999 (tổng hợp các lần làm lại ở nhiều nước; mới đọc tóm tắt OpenAlex, không có con số) hay các lần làm lại đầy đủ đến 450V trước năm 1974 (chưa mở). Lượt 2 hay review dùng Opus.
3. Asch, Đang tranh cãi: hai nghiên cứu hiện đại là nghiên cứu đơn lẻ, dùng bài toán khác (xoay hình trong đầu, phán đoán thị giác nhanh). Chưa tìm tổng quan về câu hỏi tri giác hay phán đoán.
4. Beaman 1978 chỉ có theo lời Fischer kể lại, chưa mở bài gốc.
5. Số trang trong `vi_tri` của Fischer lấy theo đầu trang của bản PDF (517–537); một vài chỗ có thể lệch một trang.
6. Chưa build: các trang đã sửa (khung `kha-vung` mới của milgram, câu hỏi mới của darley-latane và milgram) cần xem ở bản xem và chạy `so-chu.mjs`.
