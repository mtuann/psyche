# D6-L2, lượt 1, phần 2/2 (Claude Sonnet 5.5, 10/11/2026)

Trang: `tam-ly-tien-hoa` (lõi, 76 nhận định), `dopamine` (mở rộng, 65), `the-duc-nao` (mở rộng, 74). Hồ sơ: `kiem-dinh/kham-pha/co-so-sinh-hoc/<trang>.yml`. Chưa khóa, chưa có lượt 2.

## Sai nặng đã sửa
- **tam-ly-tien-hoa**: r ≈ 0,03 (Eastwick 2014) bị gán sai nghĩa; đó là chênh lệch giữa hai giới ở mức dự báo của ngoại hình và triển vọng kiếm tiền. Viết lại quanh Eastwick & Finkel (2008, hẹn hò tốc độ). Khung "bác bỏ" tách đôi (ý tiêu chuẩn nêu ra sang khung Khá vững). Buss: 31 phẩm chất (không phải 32); 37/37 là theo chiều, 34 có ý nghĩa; ba ngoại lệ tham vọng; trinh tiết "high value", không phải "indispensable". Walter 2020 chỉ đọc được tóm tắt: bỏ "đăng ký trước", "2016", nhóm 4 nước thiếu số liệu tuổi; Việt Nam chỉ xác nhận qua bốn tác giả ĐHQG Hà Nội.
- **dopamine**: Schultz 1997 là bài tổng hợp ghi chép kèm mô hình TD, không phải một thí nghiệm; Peciña 2005 bỏ "gấp bốn lần" (không có ở tóm tắt); Berridge 1989 "hoàn toàn bình thường" thành "gần như không đổi"; Sepah: trích đúng lời qua bản đăng lại NYT trên Irish Times, bỏ "nhà tâm lý học" và "CBT"; khung muốn/thích từ Vững chắc xuống Khá vững; Berridge & Robinson 1998 nói thẳng dopamine không cần cho học liên hệ khoái cảm: "ba khung không mâu thuẫn" sửa lại.
- **the-duc-nao**: Erickson là 40 phút mỗi buổi, 3 buổi/tuần, tăng dần từ 10 phút, cường độ theo nhịp tim dự trữ (bỏ "nhanh", "hơi thở gấp"); cả hai nhóm cải thiện trí nhớ; nhóm đi bộ KHÔNG có BDNF khác nhóm giãn cơ; BDNF không liên quan trí nhớ. Câu cũ "chưa có bằng chứng não tiết BDNF ra máu khi tập" trái Rasmussen 2009 (não đóng góp 70–80%). Thêm Firth 2018, Wilckens 2021, Balbim 2024 (thể tích hồi hải mã, trái chiều), Ciria 2023 (d = 0,05 sau hiệu chỉnh thiên lệch xuất bản), Dumitru 2025. Khung "vững chắc" (thể tích) và "khá vững" (nhận thức) thành "đang tranh cãi".

## Số liệu
Kết quả: da-sua nhiều nhất; da-lam-mem, da-bo (1 câu ở the-duc-nao, n63) có `doi_chu`; mỗi trang một mục `doi_chu` cho `::tom-tat`. Câu thời sự: 5 (VN ở 3 trang, Vinmec ở dopamine; `het_han` 2028-11-01).

## Chưa chắc, chỗ khó
- Toàn văn không mở được: Walter 2020, Eastwick 2008/2014, Gould & Lewontin, Olds & Milner (APA bị chặn), Fiorillo 2003, Berridge 1989/1998, Peciña 2005 (chỉ tóm tắt). Đã mở toàn văn: Buss 1989, Schultz 1997 (bản gatsby.ucl.ac.uk), Schultz 2016, Erickson 2011 (Wayback), Smith 2010, Aghjayan 2022, Sorrells, Boldrini.
- Nhãn cho nguyên tắc đạo đức/phương pháp ("tự nhiên không có nghĩa là đúng", cách đọc tin) chưa dẫn được giáo trình.
- "Detox dopamine" giữ "đã bị bác bỏ" dù không có kiểm tra thực nghiệm (vắng cơ chế); "dopamine và nghiện điện thoại" ở "đang tranh cãi" là gần nghĩa nhất (thiếu nhãn "chưa đủ bằng chứng").
- Tìm VN bằng Europe PMC (OpenAlex hết lượt), chỉ xem năm kết quả đầu mỗi truy vấn.

## Cần người giao
- `dua_tren`: dopamine nên `[kham-pha/cam-xuc-dong-luc/thuong-va-dong-luc]`; the-duc-nao nên `[kham-pha/tri-nho/vi-sao-ta-quen]` (nao-che-doi không liên quan). Hạn: dopamine 2028-05; the-duc-nao 2027-11 (tranh luận neurogenesis và Ciria còn đang diễn ra). Chưa sửa `src/data/trang.yml`.
- Hình `erickson-hippocampus`: câu "đảo ngược 1–2 năm" là cách tính của tác giả, hình không ghi (không sửa).
- Link ra trang chưa chuyển (gan-bo, thuong-va-dong-luc, cam-xuc-co-ban, doi-pho-stress): kiểm thử link đang qua.
- `tests/chuyen.test.mjs` đang thất bại vì `src/hinh/thi-nghiem-key-ring.html` (không phải của phần này).
- Ghi chú về id: tiêu đề đổi nhãn/chữ đã giữ id cũ bằng `{ #id }` (gồm đuôi chip của id cũ).
