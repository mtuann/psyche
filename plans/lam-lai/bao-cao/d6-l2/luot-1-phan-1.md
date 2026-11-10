# D6-L2, lượt 1, phần 1/2 (não chẻ đôi, gen và tính cách, não tuổi teen)

Ngày 10/11/2026, nhánh `moi/d6-l2`, model Claude Sonnet 5.5. Chưa commit, chưa khóa. Hồ sơ: `kiem-dinh/kham-pha/co-so-sinh-hoc/{nao-che-doi,gen-va-tinh-cach,nao-tuoi-teen}.yml`.

## Số nhận định

| Trang | Tổng | Loại | Kết quả |
|---|---|---|---|
| nao-che-doi | 75 | phát hiện 30, lịch sử 20, số liệu 6, công cụ 4, thời sự 3, nhãn 6, định nghĩa 2, lâm sàng 2, lời khuyên 1, về site 1 | đúng 38, làm mềm 20, sửa 17, bỏ 0 |
| gen-va-tinh-cach | 70 | phát hiện 24, số liệu 17, lịch sử 12, định nghĩa 6, nhãn 5, lời khuyên 3, thời sự 2, về site 1 | đúng 38, làm mềm 15, sửa 16, bỏ 1 (n7) |
| nao-tuoi-teen | 59 | phát hiện 38, số liệu 8, lịch sử 5, nhãn 5, lời khuyên 1, thời sự 1, về site 1 | đúng 15, làm mềm 8, sửa 34, bỏ 2 (n42, n43) |

Mỗi nhận định có `ket_qua`; mỗi câu sửa, làm mềm, bỏ có `ghi_chu` (chữ cũ, chữ mới, lý do) và có mục `doi_chu`; mỗi trang có một mục `doi_chu` cho `::tom-tat`. Không ghi `luot_2`, `review`. Câu `ve-site` (một mỗi trang) chưa có `review`: việc của review.

## Chỗ sai thật (đã sửa trên trang)

- Galvan 2006: trang ghi "37 người: 16 + 13 + 12" (cộng ra 41). Đúng: quét 41 người, phân tích 37 (13 trẻ em, 12 vị thành niên, 12 người lớn) sau khi loại 4 người cử động quá mức (nao-tuoi-teen n14).
- Bài báo PNAS 1962 chỉ mô tả một bệnh nhân (W.J.): cựu chiến binh bị thương năm 1944, động kinh 15 năm; không ghi "chấn thương đầu", "lính nhảy dù" (lính nhảy dù theo Gazzaniga 2005), không có "khoảng mười bệnh nhân", và W.J. không vẽ được hình nửa trái; tay trái chỉ chọn đúng ở mức 30% trên ngẫu nhiên với hình đơn giản (n12–n25 của nao-che-doi).
- Cặp Jim (gen-va-tinh-cach): bỏ các chi tiết không có trong Time 1987 và LiveScience 2014 (Linda/Betty, James Alan, Miller Lite, thực thi pháp luật; n7).
- Gardner & Steinberg 2005: bỏ tên "Chicken" (không có trong nguồn đã mở), số liệu từng nhóm tuổi dẫn theo mô tả của Steinberg 2008.
- Khoảng "40–60%" mâu thuẫn ngay trong câu với 66% và 70%: đổi thành 40–70% (tính cách 40%, Vukasović & Bratko 2015).
- Phục hồi chức năng sau đột quỵ nối với ca J.W., "cửa sổ vàng" để học, "bạn bè theo hướng tích cực", lời khuyên quản lý tiền tiêu vặt: không có nguồn, bỏ hoặc đổi thành "chưa kiểm tra" (nao-che-doi n57; nao-tuoi-teen n40, n42, n43).

## Nhãn đã đổi (kiểm theo thước đo mục 4)

- nao-che-doi: khung đầu "Vững chắc" thành "Khá vững" (nhóm rất nhỏ, chưa có tổng hợp), chip Áp dụng 1 "Vững chắc" thành "Đã bị bác bỏ" (n35, n50). Khung "bác bỏ" (n43) mới có một phép kiểm tra lớn trực tiếp (Nielsen 2013, 1.011 người) cộng một tổng quan: mức đạt tối thiểu, **review nên xem lại**.
- gen-va-tinh-cach: khung đầu "Vững chắc" thành "Khá vững" (mẫu nhỏ, chủ yếu phương Tây; n35). Khung "bác bỏ" về hiểu sai heritability (n43) là sai về định nghĩa, không phải kiểm tra thực nghiệm: **review nên xem lại**.
- nao-tuoi-teen: khung đầu "Vững chắc" thành "Khá vững" (khung gộp hai ý; Shulman 2016 nói đỉnh phần thưởng có thể ở cuối tuổi teen, một số nghiên cứu và phân tích tổng hợp của Defoe 2015 không thấy; n28). Khung tranh cãi (n31) dựa vào bản chất giá trị của câu hỏi: **chỗ khó**.
- Đổi nhãn đầu trang làm đổi dòng Tóm tắt nhanh; đã ghi ở `doi_chu`.

## Câu thời sự (đều `het_han: 2028-11-01`)

nao-che-doi n60, n63, n64; gen-va-tinh-cach n55, n58; nao-tuoi-teen n45. Tìm bằng Europe PMC ngày 10/11/2026 (OpenAlex bị giới hạn lượt, không dùng được); chưa tìm Google Scholar hay tạp chí trong nước. Thấy một báo cáo lâm sàng cắt thể chai ở 16 trẻ Việt Nam (Nguyen 2020), đã nêu trên trang. Câu "huyền thoại não trái/phải rất phổ biến ở Việt Nam" không kiểm được (bài VTC News 2016 tìm thấy nhưng trả 523, không mở được): đổi thành khảo sát giáo viên Anh và Hà Lan (Dekker 2012).

## Chưa chắc, chỗ khó

- Toàn văn không mở được (chỉ tóm tắt): Gazzaniga & Sperry 1967, Sperry 1968, Gazzaniga & LeDoux 1978 (sách), Gazzaniga 1996, Polderman 2015, Plomin & Daniels 1987, Vukasović & Bratko 2015, Gardner & Steinberg 2005, Steinberg 2009, Knecht 2000, Defoe 2015. Thí nghiệm móng vuốt gà/xẻng viết "theo Gazzaniga kể lại" (McGill, Weber State, bậc 3). Cặp chữ KEY/RING không tìm thấy ở nguồn đã mở: trang gọi là ví dụ minh họa.
- Nguồn đọc được toàn văn nhờ: Internet Archive (Sperry 1961, Turkheimer 2003, Steinberg và cộng sự 2008, Nisbett & Wilson 1977, Neisser 1996), gwern.net (Bouchard 1990), bản tác giả (Gazzaniga 2005), nobelprize.org (Sperry 1981), PMC (Nielsen, Corballis, Shulman, Haworth, Jansen), Wayback Machine cho PDF PNAS và J Neurosci (Gogtay, Galvan, Gazzaniga 1962) và bản PMC của Steinberg 2008. Các trang nhà xuất bản trả phí qua Wayback không dùng.

## Người giao cần sửa hay quyết

1. Hình `src/hinh/thi-nghiem-key-ring.html` (nao-che-doi): chú thích ghi "Nguồn: mô tả theo Gazzaniga & Sperry (1967)" và gọi là thí nghiệm kinh điển; chưa kiểm được cặp KEY/RING ở bài Brain 1967. Giữ nguyên, ghi ở n27, n34.
2. Hình `src/hinh/tinh-di-truyen-theo-tuoi.html` (gen-va-tinh-cach): cột "~70% trưởng thành" (Bouchard) đặt cạnh ba cột Haworth cùng thang dễ gây ấn tượng một dãy liên tục. Số đều đúng; giữ nguyên (n30–n34).
3. Thư mục lạ `kiem-dinh/kham-pha/co-so-sinh-hoc/nao-che-doi kham-pha` (tên có dấu cách, bên trong có thư mục `co-so-sinh-hoc`) có sẵn trong worktree, không phải của lượt này: nên xóa.
4. `kham-pha/tinh-cach/*` chưa có trang trên main (chỉ hồ sơ trong `kiem-dinh/du-lieu/trang`); đối chiếu di truyền và tính cách chỉ với `kham-pha/tri-tue/tri-tue-la-gi` (cùng số Haworth 41% và 66%, cùng cách nói heritability: khớp). Link `/psyche/kham-pha/tinh-cach/big-five/` trong gen-va-tinh-cach đang là chữ "sắp có".
5. Nguồn thêm vào danh sách "Nguồn" của trang (chưa có bản ghi ở `src/data/nguon.yml`; không sửa dữ liệu dùng chung): Corballis 2014, Dekker 2012, Gazzaniga 2005, Knecht 2000, Nguyen 2020, Nielsen 2013 (đã có), Nisbett & Wilson 1977, Sperry 1981 (bài giảng Nobel), Neisser 1996, Turkheimer 2003, Vukasović & Bratko 2015, Leo 1987 (Time), Lewis 2014 (LiveScience), Defoe 2015. Có thể cần thêm vào `nguon.yml` nếu kiểm thử đòi.
6. Chưa chạy build, `npm test` đầy đủ (chỉ `node --test tests/thanh-phan.test.mjs`: đạt) và `node tools/khoa.mjs xuat` cho cả ba trang (đọc được).
