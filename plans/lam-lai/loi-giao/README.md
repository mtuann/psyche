# Lời giao việc mẫu

Dùng lại cho mọi lô, chỉ đổi phần trong `<>`. Lô sau thấy thiếu thì sửa file ở đây, đừng soạn lời mới. Rút từ `../opus/plans/lam-lai/loi-giao/` (đợt 2–5 của opus), sửa cho nội dung tâm lý học.

| File | Giao cho | Model |
|---|---|---|
| `lo.md` | agent làm lô: chuyển trang, thành phần, kiểm định lượt 1, hồ sơ, báo cáo | Sonnet nếu lô chủ yếu chuyển chữ và kiểm định (đợt 3–6); Opus nếu lô có thành phần hay công cụ mới (đợt 8), hay là lô Sức khỏe tâm thần (đợt 7) |
| `luot-1-trang.md` | lượt 1 cho một phần trang của lô, khi agent làm lô giao cho agent con | Sonnet; Opus cho trang Sức khỏe tâm thần |
| `luot-2-trang.md` | lượt 2 cho nhận định của trang | Sonnet; Opus cho phần có nhận định khó (mục "Chỗ khó" dưới đây) |
| `luot-1-du-lieu.md` | lượt 1 cho bản ghi dữ liệu (nguồn, nghiên cứu, thẻ ngộ nhận) | Sonnet |
| `luot-2-du-lieu.md` | lượt 2 cho bản ghi dữ liệu | Sonnet; khớp siêu dữ liệu DOI hàng loạt: Haiku |
| `review-ma.md` | review phần mã của lô hay nhánh, theo "Ba mức review" của kế hoạch | Haiku (mức vừa); Sonnet (mức lớn); Opus khi đụng khóa, bảo mật |

## Chọn model thế nào

Chủ repo yêu cầu ngày 29/10/2026: dùng model hợp việc để tiết kiệm; không phải lúc nào cũng dùng Opus. Người giao việc (thường là Claude ở phiên chính) chọn theo bảng trên và các nguyên tắc sau:

- **Haiku** cho việc có đáp án kiểm được bằng máy hay bằng mắt nhanh: đọc diff tìm lỗi rõ, YAML đọc được, link sống, đếm, so chữ, khớp DOI với Crossref, soát định dạng hồ sơ. Rẻ và nhanh; sai thì kiểm thử hay bước sau bắt được.
- **Sonnet** cho việc đọc hiểu và đối chiếu: chuyển trang, tách nhận định, mở nguồn và so với câu trên trang, viết lại câu sai, lượt 2 thông thường, review mã mức lớn. Phần lớn công việc của các đợt 3–6 là loại này.
- **Opus** cho việc cần phán đoán hay thiết kế, nơi một lỗi khó bị bắt lại: thiết kế thành phần, công cụ khóa, workflow; lô Sức khỏe tâm thần; nhận định có **chỗ khó** (dưới đây). Chỉ giao phần khó cho Opus, không giao cả lô.
- **Chỗ khó** (chuyển sang Opus): hai nguồn tốt mâu thuẫn nhau; xếp hay đổi nhãn mức độ chắc chắn; tái lập thất bại hay đang tranh cãi; nghiên cứu bị rút, đính chính, nghi gian lận; số liệu phải tính lại từ bảng của bài gốc; mọi khẳng định về chẩn đoán, điều trị, tự hại.
- Agent con kế thừa quy tắc của người giao, nhưng model ghi rõ trong lời giao (`model: sonnet`, `model: haiku`) khi khởi chạy.
- Mỗi báo cáo ghi model đã dùng cho từng phần (lượt 1, lượt 2, review), để đo và chỉnh bảng này sau D3-L1.

## Cách chạy cho đỡ tốn

Như opus (chủ repo opus chọn ngày 24/10/2026, sau khi đợt 2 chạm giới hạn sử dụng hai lần):

- **Tối đa 2–3 agent nặng cùng lúc**, tính cả agent con. Agent làm lô dùng tối đa 2 agent con.
- Việc nặng (lượt 1, lượt 2) bắt đầu ở đầu một khung giới hạn. Bị dừng giữa chừng thì gửi tin cho chính agent ấy để nó làm tiếp, đừng mở agent mới.
- Lượt 2 chia phần khi một phần quá khoảng 150 nhận định; ít hơn thì một agent.
- Các lô làm lần lượt. Chỉ chồng phần việc nhẹ (chờ CI, chờ chủ repo kiểm mẫu) với việc của lô sau.
- Review mã chỉ đọc diff và chạy đúng phép thử liên quan; CI chạy đủ, song song.
- Ảnh chụp do CI chụp khi push nhánh (tệp `anh-chup` của lần chạy, giữ 7 ngày). Báo cáo giữ tối đa 4 ảnh tiêu biểu.
- Đợt 5: nhập kết quả G1 có câu trích thay vì nghiên cứu lại; chỉ kiểm thêm phần thiếu.
- Không làm: dùng chung trang nguồn đã tải giữa hai lượt (để giữ độc lập); chạy song song hai lô.

## Quy tắc chung cho mọi lời giao

- Không push. Không sửa `../psyche-zero/` (site cũ) hay `../opus/`. Không sửa `.claude/`.
- **Không đưa email hay thông tin cá nhân của chủ repo vào yêu cầu gửi ra ngoài** (header User-Agent, tham số, nội dung). Dịch vụ nào đòi thông tin liên hệ thì dùng `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`. Nhắc quy tắc này cho agent con.
- Nguồn bị chặn và cách vòng: `plans/ben-vung/chuan-kiem-dinh.md`, mục "Nguồn và cách mở".
- Node 24: `export PATH=<thư mục có node 24>:$PATH` (theo máy); repo ghi `.nvmrc`.
