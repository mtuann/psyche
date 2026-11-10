# D6-L1 phần 1/2, lượt 1: Căng thẳng–giấc ngủ

Nhánh `moi/d6-l1`, ngày 10/11/2026, Claude Sonnet 5.5. Bốn trang `kham-pha/cang-thang-giac-ngu/`: `ngu-va-tri-nho`, `doi-pho-stress`, `giac-mo` (tầng `loi`), `stress-co-hai` (tầng `mo-rong`, kiểm đủ như lõi). Chưa khóa, chưa lượt 2. `node tools/khoa.mjs xuat` chạy được cho cả bốn trang.

## Số nhận định (315)

| Trang | Tổng | dung | da-sua | da-lam-mem | da-bo |
|---|---|---|---|---|---|
| ngu-va-tri-nho | 75 | 22 | 25 | 27 | 1 |
| doi-pho-stress | 77 | 21 | 33 | 22 | 1 |
| giac-mo | 77 | 10 | 36 | 31 | 0 |
| stress-co-hai | 86 | 45 | 17 | 24 | 0 |

Mọi nhận định có `ket_qua`; mỗi trang có mục `doi_chu` (kể cả hộp `::tom-tat`).

## Sửa chính

- **ngu-va-tri-nho:** khung "Vững chắc" hạ Khá vững (Berres & Erdfelder 2021 g = 0,44 rồi 0,28; Hu 2020 g = 0,27); "đừng thức trắng đêm" hạ Khá vững (không có nghiên cứu so thức để học thêm với ngủ đủ); Gais 2006 là học sinh Mỹ, trong-nhóm (trang cũ nói "Đức", "hai nhóm", "chứng minh nhóm ngủ học ít giờ hơn"); số Rasch 2007 (97% so với 86%); thêm Ataei 2023, Züst 2019, Le 2026 (khảo sát Việt Nam); thời sự có mốc.
- **doi-pho-stress:** Forsythe & Compas 1987 chỉ thấy lệch pha ở sự kiện lớn; Folkman 1986 không đề xuất giả thuyết khớp; thêm Conway & Terry, Cheng 2014, Penley 2002, Webb 2012; hai khung Vững chắc hạ Khá vững; mục Áp dụng 3 hạ Đang tranh cãi.
- **giac-mo:** Eichenlaub 2014 trang cũ nhầm nguồn (PET 41 người là Neuropsychopharmacology, không phải Cerebral Cortex); bỏ "361 ca" của Solms (không kiểm được); bỏ câu "chính Hobson mềm hóa lập trường", "sợ hãi là cảm xúc phổ biến nhất", "ba thủ thuật" của Freud; Valli & Revonsuo 2009 trong tóm tắt nói ngược với câu trang gán cho nó; hai khung Vững chắc hạ Khá vững; mục Áp dụng 4 hạ Đang tranh cãi; câu "đều từ mẫu phương Tây" sai (trẻ em Kurd, tổng hợp nhiều nước); thêm mốc và lần tìm cho câu Việt Nam.
- **stress-co-hai:** Bosshard & Gomez 2024 tên bài trong mục Nguồn sai ("systematic review and meta-analysis" so với "meta-analysis of randomized controlled trials", Crossref); khung "stress mạn tính" thêm Kivimäki 2012, Richardson 2012 và giới hạn; khung niềm tin stress viết lại có các nhóm khác (Yeager 2022, Langrafe 2025, Nguyen 2023, Wu 2026) và các tổng hợp (Liu 2019, Bosshard 2024); Crum 2013 kiểm theo toàn văn (η² 0,02/0,04, Study 1 niềm tin không giải thích thêm hiệu suất).

## Chỗ chưa chắc, chỗ khó

- Chỉ đọc tóm tắt: Berres, Hu, Ataei, Züst, Le (ngu); Lazarus & Folkman 1984, Folkman & Lazarus 1988, Kendall & Terry, Conway & Terry, Zakowski, Bonanno & Burton, Cheng, Penley, Webb, Kuo (doi-pho-stress); Selye 1936 (chỉ phần xem trước), Crum 2023, Yeager, Langrafe, Liu, Bosshard, Kivimäki, Richardson, Wendsche, McEwen & Stellar (stress-co-hai); Solms (sách 1997 và BBS 2000), Hobson 2000, Valli 2005/2009, Zadra, LaBerge 1981, Eichenlaub (Cerebral Cortex) (giac-mo).
- giac-mo: câu "phương pháp Freud khó kiểm chứng" (n13, n48) chưa có nguồn bậc 2 mở được; nhãn "Bác bỏ" biểu tượng cố định (n46) dựa vào lần tìm không hệ thống; mức kiểm soát mơ tỉnh và hiệu quả mơ tỉnh với ác mộng không có nguồn, đã viết mềm; chi tiết "chuỗi đảo mắt" LaBerge chưa kiểm; câu "cơ mắt không bị liệt" (n35) chưa kiểm.
- Các câu `thoi-su` (Việt Nam, tái lập Crum 2013, giải mộng) dựa vào truy vấn Europe PMC ngày 10/11/2026, chưa đọc hết danh sách, chưa tìm tạp chí trong nước; OpenAlex hết hạn mức trong ngày.
- stress-co-hai n31: "lớp tâm lý học" của nghiên cứu 3 Crum chưa kiểm tên môn.

## Việc người giao phải sửa hay quyết

1. **`src/data/trang.yml`, stress-co-hai:** giữ `dua_tren: [kham-pha/cang-thang-giac-ngu/doi-pho-stress]` (trang nhắc lại appraisal và link tới bài ấy). `kiem_lai_truoc: 2028-05` hợp (câu thời sự hết hạn 11/2028; Crum 2013 và stress mindset đang có thêm thử nghiệm nên nên xem lại).
2. **`src/data/nguon.yml`:** chưa có bản ghi cho nhiều nguồn mới (Berres, Hu, Ataei, Züst, Le, Cheng, Penley, Webb, Kuo, Conway & Terry; Crum 2023, Yeager, Langrafe, Liu, Bosshard, Nguyen, Wu, Kivimäki, Richardson, Wendsche; Solms 2000, Hobson 2000, Valli, Zadra, Vallat, Eichenlaub NPP). Các trang dùng mục Nguồn viết tay nên không lỗi. Mục Nguồn của giac-mo có "Freud (1900) … London: Hogarth Press" (Hogarth là 1953): cần sửa.
3. **Link phụ thuộc chưa có trong worktree:** `/psyche/ho-tro/` (ngu, doi-pho-stress, stress-co-hai, giac-mo), `kham-pha/cam-xuc-dong-luc/dieu-tiet-cam-xuc` (doi-pho-stress, stress-co-hai), `bang-chung/tuong-quan-nhan-qua` (stress-co-hai). Các trang này phải lên trước khi khóa.
4. Hộp `::tom-tat` đổi theo tiêu đề khung mới (giac-mo, ngu); tiêu đề mục giữ id cũ bằng `{ #id-cu }` (ngu mục Áp dụng 2; giac-mo mục Áp dụng 3, 4 và Eichenlaub).
5. Lượt 2: nên kiểm lại chỗ khó nêu trên; câu `ve-site` chưa có `review`.

## Ghi chú quy trình

Bốn agent con (Sonnet) làm song song; ba agent (ngu, stress-co-hai, giac-mo) dừng vì hết hạn mức khi đã sửa trang nhưng chưa ghi hồ sơ (giac-mo chưa sửa trang). Phần còn lại (hồ sơ ba trang, sửa giac-mo) làm sau đó, tuần tự. Nguồn trích đã tự kiểm bằng script so khớp từng câu trích với văn bản đã tải.
