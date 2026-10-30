# D3-L2, lượt 1, phần 2/2: bandura, little-albert, schachter-singer, seligman

Model: Claude Sonnet 5.5 (agent lượt 1; hai fork cùng model làm từng cặp trang). Ngày 30/10/2026. Nhánh `moi/d3-l2`. Không build, không commit. `node tools/khoa.mjs xuat thi-nghiem/<trang>` chạy được cho cả bốn trang. Trang không có khoảng trắng cuối dòng. Mỗi trang thêm hộp hồ sơ nghiên cứu và `doi_chu` cho hộp `::tom-tat` và hộp hồ sơ.

## Số nhận định (tổng 276)

| Trang | Tổng | dung | da-sua | da-lam-mem | da-bo | null |
|---|---|---|---|---|---|---|
| bandura | 62 | 10 | 36 | 14 | 1 | 1 |
| little-albert | 66 | 10 | 50 | 2 | 3 | 1 |
| schachter-singer | 75 | 25 | 36 | 4 | 4 | 6 |
| seligman | 73 | 19 | 45 | 5 | 2 | 2 |

Mỗi trang có 1-2 câu `thoi-su` (`het_han: 2028-10-01`), 4-5 câu `ve-site`, 3-4 nhãn.

## Sai so với nguồn, đã sửa (chi tiết ở `ghi_chu`)

- **bandura:** tuổi 37-69 tháng; 24 trẻ mỗi nhóm; bước gây bực nhẹ nằm sau lần xem; nhà nghiên cứu ở trong phòng; bỏ số Bảng 1 (bản psychclassics không có bảng); nhóm mẫu hiền lành không ít gây hấn chung; 1963: 96 trẻ, bốn nhóm; Anderson 2010 là về trò chơi điện tử; ngộ nhận về Bobo và "cấm trẻ xem bạo lực" sửa/bỏ; lời khuyên không nguồn làm mềm.
- **little-albert:** mốc 9 tháng (con vật) và 8 tháng 26 ngày (tiếng động); viết lại các buổi theo nhật ký gốc; Cover Jones (Peter 2 tuổi 10 tháng, khoảng ba năm sau Albert, bỏ "giải mẫn cảm", "tiền thân liệu pháp phơi nhiễm"); bỏ chi tiết danh tính không nguồn; bỏ lời khuyên, đoạn đạo đức/Việt Nam.
- **schachter-singer:** nhóm giả dược; số liệu theo Bảng 2-5; bỏ "cười ha hả", chi tiết Capilano, bullet Cannon-Bard, "áp dụng" không nguồn; bullet về đổi nguồn quy kết mâu thuẫn Reisenzein 1983 đã sửa; bỏ đoạn Việt Nam.
- **seligman:** nhóm đối chứng không đeo đai; nhóm yoked cùng thời lượng sốc trung bình; số liệu 24 chó, 27,00/25,93/48,22 giây, 6/8 yoked thất bại, 5/6 sau 7 ngày; phát hiện thuộc phòng Solomon; "đặt tên" thành "gợi ý từ"; thần kinh học 2016 chủ yếu trên chuột; bỏ bullet khuyên, quiz và ngộ nhận kiểu lời khuyên điều trị, thay bằng link `/psyche/ho-tro/`.

## Nhãn đổi (đều ghi `chỗ khó`)

- bandura: Vững chắc thành Khá vững (n33); khung giới tính Khá vững yếu (n34), lượt 2 cân nhắc bỏ/hạ; Đang tranh cãi sửa cho đúng trò chơi điện tử (n35).
- little-albert: Khá vững "khái quát hóa" thành Đang tranh cãi (n36); Vững chắc "không gỡ nỗi sợ ở Albert" (n35) là sự thật lịch sử, lượt 2 xem nên đổi thành khung ghi chú; n33 giữ (Duits 2015, chỉ gián tiếp).
- schachter-singer: Vững chắc thành Khá vững, gộp với khung Khá vững (còn 1 khung); Đang tranh cãi đổi chữ; khung Đã bị bác bỏ bỏ (không nguồn).
- seligman: Vững chắc thành Khá vững; khung Đang tranh cãi về trầm cảm giữ nhưng căn cứ yếu, lượt 2 cân nhắc.

## Chưa chắc (`ket_qua: null`)

- bandura n39 (bốn quá trình, sách không mở được); n26, n27 (1963 đọc qua bản quét SlideShare tóm lược, chưa đối chiếu bản APA).
- little-albert n46 (Mowrer); n57 (Powell 2014 chưa đọc kết luận).
- schachter-singer n32-n35, n64 (Marshall & Zimbardo 1979, Maslach 1979: chỉ nhan đề); n59 (ngộ nhận lời khuyên không nguồn). Bài gốc tự mâu thuẫn số người (184 so với Bảng 1 cộng ra 174), trang giữ 184 theo câu "all but 1 of 185".
- seligman n7 (câu hỏi mở), n30 (hình sai).

## Hình sai, chưa sửa: cần người giao

`src/hinh/seligman-design.html`: ô nhóm đối chứng ghi "Đeo đai / không bị sốc" (sai: không đeo đai, chỉ tập trong hộp shuttle); "chịu sốc y hệt nhóm 1" và chú thích "y hệt nhau" chỉ đúng theo trung bình, nên là "cùng thời lượng trung bình"; "nằm im chịu đựng" cho cả nhóm yoked hơi mạnh (6/8), gợi ý "phần lớn thụ động". 24 giờ, 10 lượt, 1967 đúng. Bandura và little-albert không có hình.

## Người giao cần xử lý

- `src/data/nguon.yml` chưa có `duits2015` (DOI 10.1002/da.22353); little-albert dẫn trong mục Nguồn viết tay.
- Mục Nguồn viết tay của bandura chưa có DOI Bandura 1963 (`10.1037/h0048687` đã có trong `nguon.yml`).
- Tiêu đề mục "Mary Cover Jones (1924): câu trả lời đạo đức đến sau" giữ nguyên (đổi sẽ đổi id mục).
- Marshall & Zimbardo, Maslach: cần người mở bản PsycNet. "Chưa tìm thấy ở Việt Nam" (bandura, little-albert) chỉ tra OpenAlex; schachter-singer, seligman đã tra PubMed và Crossref.
- Tham chiếu chéo trong `ghi_chu` của schachter-singer (n13, n33, n41-43, n22): lượt 2 đọc lại.

## Nguồn

Toàn văn: Bandura-Ross-Ross 1961, Watson & Rayner 1920, Cover Jones 1924 (psychclassics, không có bảng); Schachter & Singer 1962 (gwern); Seligman & Maier 1967 (CiteSeerX); Maier & Seligman 2016 (PMC4920136). Chỉ tóm tắt (OpenAlex): Bandura 1963/1965, Anderson 2010, Ferguson & Kilburn 2010, Beck 2009, Fridlund 2012, Powell 2014, Powell & Schmaltz 2021, Harris 1979, Duits 2015, Reisenzein 1983, Cotton 1981, Dutton & Aron 1974, Overmier & Seligman 1967, Hiroto & Seligman 1975.
