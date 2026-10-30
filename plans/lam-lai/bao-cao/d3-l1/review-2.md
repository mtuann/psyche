# D3-L1: review nội dung, phần 2 (khi-dot-vo-hinh, pygmalion, robbers-cave, index)

Model: Claude Sonnet 5.5 (agent review), 30/10/2026. Không build, không commit.

## Kết quả

| Trang | review dung | review sai (đã sửa) |
|---|---|---|
| khi-dot-vo-hinh | 32 | 1 (n13) |
| pygmalion | 43 | 3 (b2, nv, q3b) |
| robbers-cave | 40 | 6 (s2, s3, s5, a3, a6, nk1c) |
| index | 16 | 2 (s4, p4) |

Mọi câu `ve-site`, mọi câu lượt 2 khác `dung`, mọi câu lượt 1 sửa/làm mềm/bỏ và mọi câu `nhan` đã có `review` và một câu "Review (Claude Sonnet 5.5, 30/10/2026): ..." ở cuối `ghi_chu`. `nguoi.review` ghi ở lần kiểm định cuối của cả bốn hồ sơ. `node tools/khoa.mjs xuat` đọc được cả bốn.

## Câu sai (chữ cũ -> chữ mới), đã sửa trang, hồ sơ và `doi_chu`

- khi-dot-vo-hinh n13: "não có thể bỏ qua hoàn toàn những thứ bất ngờ" -> "ta có thể không thấy những thứ bất ngờ nhưng nổi bật" (hồ sơ đã đúng, trang còn chữ cũ; trái Nobre 2020).
- pygmalion b2: "19 cỡ hiệu ứng từ 18 nghiên cứu" -> "Cỡ hiệu ứng của 18 nghiên cứu" (19 chỉ là số ca ở Bảng 5).
- pygmalion nv (nhãn): :::vung-chac -> :::kha-vung "kỳ vọng của người khác có thể tự ứng nghiệm, nhưng thường nhỏ". Lý do: phân tích tổng hợp mở được (Raudenbush) cho d = 0,11 và "có đạt ý nghĩa hay không tùy cách kiểm định"; tổng quan 345 nghiên cứu là của chính Rosenthal và chỉ đọc qua Raudenbush; không tái lập lớn đăng ký trước; Snow 1995 phản bác. Không đạt Vững chắc theo mục 4.
- pygmalion q3b (lượt 2: quá mạnh): "thông tin bịa đặt gần như vô tác dụng; kỳ vọng chỉ gieo được trên mảnh đất trống" -> nói riêng về thí nghiệm gieo thông tin bịa đặt về IQ (chỉ rõ trong khoảng hai tuần đầu), kỳ vọng tự nhiên vẫn có tác động nhỏ.
- robbers-cave s2: "học sinh lớp 5 học tốt" -> "có học lực trung bình trở lên" ("average or above").
- robbers-cave s3: thêm chú "hai em của Eagles bị cho về nhà vì nhớ nhà cuối giai đoạn 1, nên từ giai đoạn 2 nhóm này còn 9 em" (chương 5, đọc lại).
- robbers-cave s5: "không biết đến sự tồn tại của nhau" -> "không tiếp xúc với nhau (đến những ngày cuối mới biết trại còn có nhóm khác)".
- robbers-cave a3: "Theo Aronson và cộng sự (1978) và trang giới thiệu" -> "Theo lời tự thuật của chính Aronson trên jigsaw.org (chưa đọc sách 1978)".
- robbers-cave a6: jigsaw là "nguyên lý từ trại hè 1954 trở thành kỹ thuật" / "phiên bản đời thực" -> "tinh thần gần với"; thêm rằng Aronson tự nghĩ ra năm 1971, không nói lấy từ Sherif.
- robbers-cave nk1c (lượt 2: khong-chac): "các em quy nguồn cơn cho ban điều hành thay vì cho nhóm kia; lần Robbers Cave được lên kế hoạch để tránh điều đó" -> "nguồn cơn của xung đột bị quy cho ban điều hành trại; Sherif viết kinh nghiệm ấy rất có ích" (chương 5 [p. 96], bậc 1).
- index s4: "Bài nào trên site này cũng gắn nhãn" -> "Mỗi bài thí nghiệm ở đây đều gắn nhãn".
- index p4: "40 người đàn ông ở Yale" -> "40 người đàn ông ở vùng New Haven" (Milgram 1963: "drawn from New Haven and the surrounding communities"; Yale chỉ là nơi làm).

Sửa nhỏ không đổi hồ sơ nhận định riêng, ghi ở `doi_chu`: pygmalion "Tự trải nghiệm" (bài kiểm tra cuối năm học trước, danh sách đầu năm học mới, theo Thorndike: 5/1964 và 9/1964) và câu chuột "rõ nhất" -> p một phía 0,01 như cau r3.

## Câu lượt 2 khong-chac đã xử lý

- khi-dot-vo-hinh n15, n16, n41: tải PDF Springer của Levin & Simons 1997 và Simons & Levin 1998; tóm tắt xác nhận từng ý (diễn viên biến thành người khác qua cú cắt; "only half"; phụ thuộc nhóm xã hội). Giữ, review dung.
- khi-dot-vo-hinh n17: tóm tắt Hyman chỉ nói người dùng điện thoại ít nhận ra chú hề; việc so với cả ba nhóm kia chỉ có ở bản tin thứ cấp (25% so với 51%, 61%, 71%). Giữ, ghi chưa mở toàn văn.
- pygmalion v1, robbers-cave v2: khẳng định "chưa tìm thấy ... Việt Nam" đã `thoi-su`, "Tính đến 10/2026", `het_han` 2028-10-30; tìm thêm, không thấy. Giữ, ghi tìm kiếm hạn chế.
- robbers-cave v3: đoạn suy đoán văn hóa Việt Nam đã bỏ khỏi trang; kiểm lại, đúng.
- index p1, p4: xem trên.

## Nhãn

- khi-dot-vo-hinh: Vững chắc (hiện tượng) giữ; Khá vững (độ khó, độ giống) và Khá vững (ngoài đời thật) giữ. Chỗ chưa chắc: Ekelund 2022 và Nobre 2020 là tổng hợp gián tiếp (chuyên môn, xử lý ngầm), chưa có tái lập lớn đăng ký trước.
- pygmalion: hạ Vững chắc xuống Khá vững (nv); Khá vững (nk) và Đang tranh cãi (nt) giữ. Hai khung Khá vững cùng trang, phạm vi khác nhau (kỳ vọng nói chung, và kỳ vọng của giáo viên có điều kiện).
- robbers-cave: Khá vững hai khung và Đang tranh cãi giữ; hạ Vững chắc của lượt 1 là hợp lý. Nhãn Đang tranh cãi hơi sát ranh với Khá vững vì chưa mở phê bình hiện đại bậc 1–2 (Perry 2018).

## Chỗ còn chưa chắc

- pygmalion: Rosenthal & Fode 1963 (r1-r6) và Rosenthal & Rubin 1978 chỉ dựa trích lượt 1 và lượt 2; review không tải lại. Ov. Met. 10 (e1) chưa đọc dòng tượng thành người.
- pygmalion nv đổi nhãn: các trang khác hay ngộ nhận (`src/data/ngo-nhan.yml`, trang lĩnh vực) có thể dẫn nhãn Pygmalion cũ; chưa kiểm, cần chủ lô soát.
- robbers-cave: sách Aronson 1978 chưa đọc; nhận định đạo đức hiện hành (s18, g4, q5b) không dẫn chuẩn cụ thể.
- index: tám trang chưa chuyển chưa có trên bản thật; câu s2, s3 chỉ kiểm bảy trang đã chuyển.
- Trang `thi-nghiem/milgram`: tiêu đề mục "Milgram (1963): 40 người đàn ông ở Yale" cùng vấn đề với index p4; để agent review milgram xử lý (không động vào).
- Chưa build, chưa chạy `npm test`: cần chạy sau khi hai agent review xong (đặc biệt kiểm thử khớp hồ sơ-trang và tóm tắt đầu bài vì khung pygmalion đổi nhãn).

## File đã chạm

- src/content/docs/thi-nghiem/{khi-dot-vo-hinh,pygmalion,robbers-cave,index}.md
- kiem-dinh/thi-nghiem/{khi-dot-vo-hinh,pygmalion,robbers-cave,index}.yml
