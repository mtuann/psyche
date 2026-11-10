# D5-L4 phần 2/2, lượt 1 (Cảm xúc và động lực)

Ngày 10/11/2026. Trang: cam-xuc-co-ban, thuong-va-dong-luc, dieu-tiet-cam-xuc (lõi); tri-tue-cam-xuc (mở rộng). Chưa build, chưa commit.

| Trang | Nhận định | dung | da-sua | da-lam-mem |
|---|---|---|---|---|
| cam-xuc-co-ban | 85 | 57 | 14 | 14 |
| thuong-va-dong-luc | 84 | 55 | 9 | 20 |
| dieu-tiet-cam-xuc | 74 | 28 | 25 | 21 |
| tri-tue-cam-xuc | 113 | 53 | 29 | 31 |

G1-L04 chỉ ghi bảng "Cần sửa" (chế độ tiết kiệm): các mục đã áp được đối chiếu lại, phần còn lại kiểm bổ sung từ toàn văn.

## Điểm chính
- cam-xuc-co-ban: bảng Ekman 1969 đối chiếu ảnh chụp bảng gốc; sửa "đúng trên may rủi trong mọi cảm xúc" (ngạc nhiên và buồn ở nhóm Fore bị gọi là sợ, giận), ví dụ truyện 1971 ("con", không phải "bạn" chết), khung Vững chắc thu hẹp phạm vi, bỏ "tuyển dụng", câu châu Á tiết chế cảm xúc thay bằng Matsumoto 2008.
- Đổi nhãn (dieu-tiet-cam-xuc, cần chủ repo xác nhận): kìm nén có cái giá Vững chắc sang Khá vững; "không chiến lược nào luôn tốt" Đang tranh cãi sang Khá vững; Áp dụng 1 Vững chắc sang Khá vững. Hộp tóm tắt đổi theo.
- Thời sự: dieu-tiet n63 sửa vì đã có hai nghiên cứu ở Việt Nam (người bỏng, 2026).

## Chỗ khó, chưa chắc
- cam-xuc-co-ban n32, n68: Jack 2012 chỉ đọc tóm tắt ("Eastern"), chữ "Đông Á" chưa đối chiếu toàn văn; có bài phản hồi Sauter & Eisner 2013 không nêu trên trang. Cân nhắc hạ khung Vững chắc xuống Khá vững.
- dieu-tiet: Gross 1998, Richards & Gross 2000, Webb 2012 chỉ tóm tắt. thuong-va-dong-luc: Eisenberger & Cameron, Cameron & Pierce chỉ tóm tắt.
- tri-tue-cam-xuc n70: khung Đã bị bác bỏ, bằng chứng chỉ đo hiệu suất công việc; cân nhắc Đang tranh cãi. n97: chưa xác nhận REIS là tự báo cáo.
- OpenAlex bị giới hạn lượt (429) ngày 10/11/2026: các câu "chưa tìm thấy ở Việt Nam" dùng Europe PMC và Crossref; chưa tìm Google Scholar, tạp chí trong nước.

## Người giao cần quyết
- tri-tue-cam-xuc: giữ `dua_tren`; n91 hết hạn 2027-11-01 nên đặt `kiem_lai_truoc` <= 2027-11 hoặc bỏ n91. Hồ sơ dùng id nguồn nội bộ; nếu chuẩn cần id trong `src/data/nguon.yml` thì đổi. `nguon.yml` thiếu Butler, Lee & Gross 2007.
- Nhãn hình gross-model "Kiềm chế biểu hiện" khác "kìm nén" ở thân bài. dieu-tiet n73 và thuong-va-dong-luc n75 link tới trang chưa chuyển (hiện "sắp có").
- Lượt 2 cần tự mở lại toàn văn các nguồn chỉ có tóm tắt.
