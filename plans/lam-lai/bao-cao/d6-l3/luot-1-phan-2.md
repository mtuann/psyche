# D6-L3, lượt 1, phần 2/2 (tuoi-gia, tam-ly-hoc-duong, mang-xa-hoi-teen)

Agent: Claude Sonnet 5.5, 10/11/2026. Hồ sơ: `kiem-dinh/kham-pha/phat-trien/{tuoi-gia,tam-ly-hoc-duong,mang-xa-hoi-teen}.yml`. Chưa khóa, chưa commit. `node tools/khoa.mjs khoa … --goc <bản chép>` chỉ còn đòi lượt 2, review, kiểm mẫu (không báo thiếu `ket_qua`, `doi_chu`, `co_so`, `het_han`).

## Số nhận định

| Trang | Tổng | dung | da-sua | da-lam-mem | da-bo |
|---|---|---|---|---|---|
| tuoi-gia (loi) | 76 | 22 | 36 | 15 | 3 |
| tam-ly-hoc-duong (mo-rong) | 89 | 21 | 53 | 6 | 9 |
| mang-xa-hoi-teen (mo-rong) | 66 | 19 | 35 | 9 | 3 |

Theo loại, cả ba trang: phat-hien 84, so-lieu 46, lam-sang 17, dinh-nghia 19, nhan 24 (6 + 11 + 7), loi-khuyen 14, lich-su 11, ve-site 9, thoi-su 5, cong-cu 3.

## Sai nặng (đã sửa trang)

- **tam-ly-hoc-duong**: PISA 2015: Singapore không "cao nhất" mà thứ ba (0,57; Brazil và Costa Rica 0,60), Phần Lan không "thấp nhất" (Hà Lan, Thụy Sĩ thấp hơn); Việt Nam không có số liệu. OR phạm tội 1,9 sửa thành 1,8 (Ttofi 2011). "35% so với 15%" và "300.000" của Modecki không kiểm được (chỉ có "gấp đôi"): bỏ. "100 chương trình" (Gaffney 2019) là 100 đánh giá. Phát hiện "work with peers → tăng nạn nhân" (Ttofi 2011) gắn ví dụ "ép hòa giải" không có trong nguồn, và Gaffney 2021 (thành phần khác, số thành phần không liên quan hiệu quả) làm yếu nó: viết lại. Bỏ các câu về Olweus (1970s, tự tử, "đầu tiên"), bốn nguyên tắc OBPP, Nho giáo/thể diện, suneung, báo chí, giáo viên chủ nhiệm, "kẻ bắt nạt có địa vị cao" (không có nguồn đã mở). Bỏ "115" và danh sách dấu hiệu giống lâm sàng; dẫn Hỗ trợ. Thêm số liệu quốc gia: NAMHS (bắt nạt ở Việt Nam 1,2% trong 3 tháng).
- **mang-xa-hoi-teen**: "YRBS không hỏi gì về mạng xã hội" sai với 2023 (có câu hỏi mới); "chưa có khảo sát quốc gia cho teen Việt" sai (NAMHS 2021: rối loạn tâm thần 12 tháng 3,3%; GSHS 2019); nơi đăng của Vu & Nguyen 2024 là VNU Journal of Economics and Business (không phải "Đại học Thương mại"), mẫu quả cầu tuyết; "2012, đa số teen có smartphone", "99,75%" của Przybylski, "35/15" không kiểm được: bỏ; "dậy thì" trong Orben 2022 chỉ là suy đoán của tác giả. Số CDC (42/57/29, 36, 22/30/14, 19, 10, 40/53, 30, 65) khớp báo cáo CDC. Thêm CDC 2025 (33%, nữ 43%) và phân tích tổng hợp 2026 (Teague, JAMA Pediatrics, 153 nghiên cứu dọc, r 0,09–0,21).
- **tuoi-gia**: Cattell 1963 nói Gf đỉnh 14–15 tuổi, giảm từ 22; Gc "giảm muộn và ít hơn", không "tăng suốt trung niên và giữ vững": đổi. "Vốn từ tăng đến 70" đổi thành "đến thập niên 60" (Salthouse 2019). Charles 2003 (144, 64 người, khoảng tuổi) và "loại trừ tâm trạng" không kiểm được (chỉ tóm tắt): bỏ. Reed 2014 không nói "đảo ngược". Salthouse & Babcock không nói "gần như toàn bộ". Bảng "bình thường/đi khám" viết lại theo NHS và WHO (NHS có liệt kê cả "khó tìm từ" là dấu hiệu sớm); bỏ "quên rồi nhớ lại = bình thường". Nhãn Vững chắc → Khá vững cho Gf/Gc.

## Nhãn đã đổi

- tuoi-gia: Gf/Gc Vững chắc → Khá vững; "khi nào nói chuyện với bác sĩ" Vững chắc → Khá vững (tiêu đề đổi, giữ id cũ).
- mang-xa-hoi-teen: "bảo vệ giấc ngủ" Vững chắc → Khá vững (giữ id cũ). Mục 4 bỏ chip Vững chắc (giữ id cũ).
- tam-ly-hoc-duong: chip các mục 2–3 giữ; hai mục kết quả nhãn đổi nội dung (định nghĩa, tự tử); mục 4 giữ id cũ.
- Chip bỏ: tuoi-gia mục 2, 3 (gợi ý suy luận, giữ id cũ).

## Chỗ chưa chắc, chỗ khó (có ghi `ghi_chu` trong hồ sơ)

- Không mở được toàn văn: Ttofi & Farrington 2011 (chỉ bản ghi NCJRS), Modecki 2014, Charles 2003, Reed 2014, Olweus 1993/2013, sách Haidt, Odgers (Nature), Surgeon General (hhs.gov 403), UNESCO 2019 (chỉ bản tin LHQ), Salmivalli 1996 (chỉ tiêu đề). Các câu liên quan viết ở mức tóm tắt hay "theo X kể lại", `da-lam-mem`.
- tuoi-gia n27: hình `gf-gc-curves` (Gc "giữ vững đến tuổi già") mạnh hơn nguồn. Không sửa hình; ghi `dung` kèm "chỗ khó".
- mang-xa-hoi-teen n30 (nhãn xu hướng CDC) dùng khảo sát giám sát lặp lại thay phân tích tổng hợp; n46 (cửa sổ nhạy cảm: một nghiên cứu, chưa tái lập); tam-ly-hoc-duong n50 (nhãn bác bỏ "trừng phạt nặng": APA nói kỷ luật học đường nói chung).
- tam-ly-hoc-duong n77 và Ho 2025: tóm tắt không nêu thiết kế (cắt ngang hay dọc).

## Người giao phải sửa hay quyết

1. Liên kết sang trang chưa có trong worktree (lô khác): `kham-pha/tinh-cach/tinh-cach-thay-doi`, `kham-pha/co-so-sinh-hoc/nao-tuoi-teen`, `kham-pha/suc-khoe-tam-than/tim-giup-do`, `kham-pha/suc-khoe-tam-than/tram-cam`. Kiểm khi gom nhánh.
2. Hình `gf-gc-curves` (chú thích Gc), xem trên.
3. `kiem_lai_truoc`: đề xuất mang-xa-hoi-teen 2027-05 (tranh luận nhanh, YRBS 2027); tam-ly-hoc-duong giữ 2028-05 hoặc 2027-11 (có số liệu thời sự). `dua_tren` ở trang.yml khớp các link.
4. Các câu `thoi-su` (hạn): tuoi-gia n62 (2028-11), n64 (UNFPA, 2027-11); tam-ly-hoc-duong n75 (2028-11); mang-xa-hoi-teen n13 (CDC 2025, 2027-11), n55 (2028-11). OpenAlex hết lượt trong ngày, các lần tìm dùng Europe PMC.
5. Test `chuyen.test.mjs` hiện thất bại vì `src/hinh/piaget-timeline.html` (phần 1, không phải của lô này).
6. Lượt 2 nên ưu tiên: nhãn ở n43, n44, n56, n60 (tuoi-gia), n30, n33, n46 (mang-xa-hoi-teen), n50, n56 (tam-ly-hoc-duong); các câu `thoi-su`; n4 (Olweus 1993) và n53 (Salmivalli 1996) của tam-ly-hoc-duong.

## Nguồn hay dùng

Europe PMC (tóm tắt, PMC toàn văn qua NCBI E-utilities), Internet Archive (Cattell 1963; bộ wikipedia-scholarly-sources-corpus không có các bài khác), kho Oxford ORA (bản tác giả Orben & Przybylski 2019), PDF CDC, tờ thông tin WHO, NHS, UNFPA, OECD (bản Overview), Crossref.
