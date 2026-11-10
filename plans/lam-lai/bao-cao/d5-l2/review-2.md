# D5-L2 review 2: thien-kien-xac-nhan, tin-dieu-vo-ly

Claude Sonnet 5.5, 10/11/2026. Chưa build, chưa commit.

| Trang | Câu | review dung | review sai |
|---|---|---|---|
| thien-kien-xac-nhan | 59 | 36 | 5 (n25, n28, n48, n49, n58) |
| tin-dieu-vo-ly | 69 | 37 | 5 (t1, t3, t7, t38, t42) |

## Câu sai (chữ cũ -> chữ mới)

thien-kien-xac-nhan
- n28 (nhãn): "Vững chắc" -> "Khá vững" (Hart 2009 mẫu chủ yếu phương Tây, không có tái lập lớn); thêm câu giới hạn; quiz giải thích "vững chắc" -> "khá vững".
- n48: không chip, "chưa dẫn nghiên cứu" -> chip Đang tranh cãi và câu về Nemeth, Brown & Rogers 2001 (tóm tắt OpenAlex); thêm nguồn vào hồ sơ và mục Nguồn.
- n49 (thời sự): "các dạng thiên kiến xác nhận tương tự" -> "nghiên cứu thực nghiệm ... đo bằng hành vi"; nêu khảo sát tự báo cáo VN30 2026 (DOI 10.71374/jfar.v26.i2.75). Hạn 2028-11-01 giữ.
- n25, n58: "cả hai đều nói mình tin chắc hơn trước" -> "nói thái độ của mình đã cực đoan hơn theo hướng quan điểm ban đầu" (đúng tóm tắt Lord 1979); sửa cả quiz câu 4.

tin-dieu-vo-ly
- t1: ẩn dụ thẩm phán/luật sư nay ghi là cách nói của trang (mô tả và thân bài).
- t3: "Phản ứng thường gặp" -> "Một phản ứng đã được ghi nhận" (không có số đo tần suất).
- t7: "thiên kiến xác nhận là một phần hẹp hơn" -> "giao nhau chứ không nằm gọn trong nhau".
- t38: "không thấy người ta tin chắc hơn" -> "không thấy bằng chứng của phản tác dụng (backlash)" (đúng tóm tắt Guess và Coppock).
- t42: thêm câu mở khung Đã bị bác bỏ: bị bác bỏ là ý "chỉ cần đủ sự thật là đủ", không phải "thông tin vô ích".

## Nhãn đã chốt

thien-kien: khung hành vi Khá vững (n28); tranh cãi cách diễn giải Đang tranh cãi (n32); chip mục 1 Đang tranh cãi (n42); chip mục 2 Khá vững (n46); chip mục 4 Đang tranh cãi (n48, mới).
tin-dieu: Khá vững (t33), Đang tranh cãi (t35, t40), Đã bị bác bỏ (t42, giữ, đã thu hẹp), chip Khá vững (t49). Đều giữ.

## Chưa chắc

- Hart 2009 "chủ yếu phương Tây": theo lượt 2; PMC chặn, tôi không mở được toàn văn để đếm nước.
- Số 0,21 và 0,04 của Wason (n19): theo toàn văn lượt 2; tôi không mở được PDF (tên tệp không có trong bộ Internet Archive theo đường dẫn đã thử). n41 có trích cũ là chỉ số khác (1.79/0.24), đã thay bằng trích của n19.
- Nemeth 2001 chỉ đọc tóm tắt; câu "nghiên cứu trước đó cho thấy vai này có vẻ củng cố ý ban đầu" là của chính tóm tắt, không phải kết quả của bài này.
- Nguồn mới Nemeth 2001 và VN30 2026 chưa có bản ghi trong `src/data/nguon.yml`.
- `node tools/khoa.mjs xuat` chạy được cho cả hai trang.
