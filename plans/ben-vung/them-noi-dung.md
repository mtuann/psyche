# Thêm và cập nhật nội dung sau khi làm lại

Áp dụng khi đợt 9 của kế hoạch làm lại xong (trước đó chỉ làm trang có trong kế hoạch, `../lam-lai/README.md`). Nguyên tắc của `README.md`: **mỗi lần chỉ kiểm phần mới; trang lõi đã khóa không bị sửa thẳng.** Muốn thêm điều gì vào một bài lõi thì viết thành đơn vị riêng (bổ sung, bài mở rộng); site tự gắn nó vào bài lúc build.

## 1. Muốn làm gì thì dùng đơn vị nào

| Muốn | Đơn vị | Nhánh | Kiểm định | Đụng trang đã khóa? | Model gợi ý | Thời gian ước tính |
|---|---|---|---|---|---|---|
| Viết bài về chủ đề ứng dụng, thời sự, bằng chứng còn biến động | Bài mở rộng (`mo-rong`) | `them/<tên>` | V2 trở lên: lượt 1 đủ, lượt 2 kiểm mẫu; hạn xem lại 12–18 tháng | Không: link từ bài lõi sinh từ `dua_tren` | Sonnet viết và lượt 1; Sonnet lượt 2 | 1 phiên |
| Lấp một chỗ trống kinh điển (bảng ở `README.md` mục 3) | Bài lõi mới (`loi`) | `them/<tên>` | V3: hai lượt đủ; khóa | Không | Sonnet; Opus cho phần nhãn, chỗ khó | 1–2 phiên |
| Có bằng chứng mới cho một bài lõi (phân tích tổng hợp, tái lập lớn) | Bổ sung `bang-chung-moi` | `them/bo-sung-<trang>-<yyyy-mm>` | V3 cho bổ sung | Không; nếu đổi nhãn hay kết luận thì tái lập mốc (mục 5) | Sonnet; Opus nếu đổi nhãn | 30–90 phút |
| Tìm được nghiên cứu ở Việt Nam | Bổ sung `viet-nam` | như trên | V3 cho bổ sung | Không | Sonnet | 30–90 phút |
| Thấy bài lõi có chỗ sai | Mở khóa | `mo/<tên>` | Chỉ phần bị chạm, cùng đoạn, các nơi trong `o_dau` | Có, theo thủ tục (`chuan-kiem-dinh.md` mục 8) | Sonnet; Opus cho Sức khỏe tâm thần | 30–60 phút |
| Thêm một thẻ ngộ nhận | Bản ghi `src/data/ngo-nhan.yml` | `them/ngo-nhan-<id>` | V3 hai lượt; khóa bản ghi | Không: trang Ngộ nhận sinh từ dữ liệu | Sonnet | 20–40 phút |
| Thêm tin Nghiên cứu mới | Mục của dòng cập nhật | `them/nghien-cuu-moi-<yyyy-mm>` | V3 cho mục mới | Không | Sonnet | 20–40 phút mỗi tin |
| Thêm công cụ tự trải nghiệm | Trang công cụ (`cong-cu`) | `them/cong-cu-<tên>` | Số liệu trong mã vào hồ sơ; kiểm thử luồng trên ba trình duyệt | Không | Opus cho mã mới; Sonnet cho số liệu | 1–2 phiên |
| Kiểm lại số liên hệ của Hỗ trợ (hằng quý) | Trang có hạn (`co-han`) | `mo/ho-tro-<yyyy>-q<quý>` | Mọi số liên hệ, trên trang của chính đơn vị | Có (trang có hạn: mỗi lần kiểm là một lần kiểm định mới) | Sonnet | 30 phút |
| Máy canh báo cờ | Theo cờ (mục 7) | | | | Haiku phân loại cờ; Sonnet xử lý | |

Thời gian là ước tính cho một phiên Claude, không tính thời gian bạn duyệt và chờ CI (khoảng 3–4 phút mỗi lần push). Mọi việc đều theo "Ba mức review" của `../lam-lai/README.md` cho phần mã, và kiểm định hai lượt cho phần nội dung.

## 2. Quy trình chung

1. **Phiếu đề xuất** (vài dòng, trong báo cáo của nhánh): đơn vị nào, tầng nào, lĩnh vực nào, `dua_tren` (bài mở rộng), các nghiên cứu sẽ nhắc tới đã có trang nhà ở đâu (`src/data/nghien-cuu.yml`).
2. **Hồ sơ trước, chữ sau.** Agent viết lập danh sách khẳng định, nguồn, câu trích trong hồ sơ (`node tools/khoa.mjs mau <trang>`), rồi mới viết bài từ hồ sơ. Không có trong hồ sơ thì không có trong bài. Nghiên cứu đã có trang nhà: một câu và link về nhà.
3. **Viết** theo khuôn của loại trang (`AGENTS.md`, "Mẫu trang"), có khung nhãn với `co_so`, khẳng định thời sự kèm mốc và hạn.
4. **Kiểm tự động:** `npm run build:xem`, `npm test`; push nhánh để CI chạy kiểm thử trình duyệt và Lighthouse song song.
5. **Kiểm định độc lập** bởi agent khác, chỉ trên đơn vị mới (`../lam-lai/loi-giao/luot-2-trang.md`).
6. **Review** theo `chuan-kiem-dinh.md` mục 3; bạn xem ngẫu nhiên vài nhận định.
7. **Gộp và khóa:** bài lõi, bổ sung, thẻ: `node tools/khoa.mjs khoa`; bài mở rộng: đặt `kiem_lai_truoc` trong `src/data/trang.yml` rồi khóa. Thêm một dòng vào trang Cập nhật (sinh từ dữ liệu). Gộp vào `main`, push; deploy tự chạy.

Không đụng trang lõi nào khác, trừ khi đơn vị mới mâu thuẫn với một khẳng định đã khóa; khi đó viết một bổ sung `anh_huong_nhan: true` (mục 5).

## 3. Bài mở rộng mới

- Bản ghi trong `src/data/trang.yml`: `tang: mo-rong`, `linh_vuc`, `dua_tren: [<đường dẫn bài lõi>]` (không ghi ở frontmatter). Trang lõi trong `dua_tren` tự có mục "Đọc thêm" trỏ tới bài mới (sinh lúc build), không phải mở khóa.
- Lượt 2 kiểm mẫu khoảng 8 nhận định, cộng mọi nhận định loại `nhan`, `lam-sang`; mẫu có câu sai thì kiểm hết.
- Hạn xem lại 12–18 tháng (`kiem_lai_truoc`); máy canh nhắc trước 30 ngày. Tới hạn: kiểm lại phần thời sự và nhãn; bằng chứng đã chín thì có thể nâng thành bài lõi (kiểm V3, khóa).

## 4. Bài lõi mới

- Chỉ cho chủ đề trong bảng chỗ trống kinh điển (`README.md` mục 3) hay chủ đề bạn duyệt thêm vào bảng ấy.
- Như một trang của đợt 3–6: V3, hai lượt đủ, khóa. Nghiên cứu kinh điển mới (chưa có trang nhà) thì thêm hồ sơ vào `nghien-cuu.yml`, bài mới là trang nhà của nó.
- Trang lĩnh vực, trang chủ, sách in tự cập nhật lúc build.

## 5. Bổ sung cho bài lõi

- File `src/content/bo-sung/<trang lõi>/<yyyy-mm>-<tên>.md`, ngắn (một vài đoạn), frontmatter `loai: bang-chung-moi | viet-nam | dinh-chinh`, `muc: <id tiêu đề của mục trong bài>`, `anh_huong_nhan: true/false`, có hồ sơ riêng (`kiem-dinh/bo-sung/…`).
- Lúc build, bổ sung hiện thành khung "Cập nhật tháng MM/YYYY" ở cuối mục tương ứng của bài lõi, và tự liệt kê ở trang Cập nhật. Bài lõi không đổi, khóa giữ nguyên.
- `anh_huong_nhan: true` (bằng chứng mới làm đổi nhãn hay kết luận): khung hiện ngay đầu bài, và bài vào hàng đợi **tái lập mốc**. Tái lập mốc cũng làm khi bài đã tích từ 3 bổ sung: mở khóa, gộp các bổ sung vào bài, kiểm định chỉ phần đổi, khóa lại, ghi trang Cập nhật. Việc này phải hiếm và có chủ đích.
- Sai trong một bổ sung thì đính chính bằng một bổ sung mới (`loai: dinh-chinh`), không sửa ngược.

## 6. Thẻ ngộ nhận, Nghiên cứu mới

- **Thẻ ngộ nhận:** một bản ghi trong `src/data/ngo-nhan.yml` (khẳng định phổ biến, kết luận theo thước đo nhãn, giải thích, nguồn, trang liên quan). Hai lượt, khóa bản ghi. Trang Ngộ nhận và trò chơi sinh từ thẻ.
- **Nghiên cứu mới:** mỗi tin một mục có ngày trong dòng cập nhật, nói rõ nghiên cứu là gì, mẫu, kết quả, giới hạn, và có liên quan bài nào. Không viết lại tin cũ khi có tin mới: thêm tin mới, link tin cũ. Hằng quý gom tin thành bổ sung cho bài lõi khi bằng chứng đã đủ.

## 7. Khi máy canh báo cờ

| Cờ | Làm gì |
|---|---|
| Bài nguồn bị rút hay đính chính | Mở đúng các khẳng định dẫn nguồn ấy (hồ sơ ghi), kiểm: không ảnh hưởng thì ghi chú vào hồ sơ; ảnh hưởng nhỏ thì viết bổ sung; ảnh hưởng tới nhãn hay kết luận thì tái lập mốc |
| Khẳng định thời sự hết hạn | Kiểm lại câu ấy trên nguồn hiện hành; viết bổ sung có mốc mới, hay mở khóa nếu câu nằm trong thân bài lõi (ít gặp: lô chuyển đã đưa câu thời sự ra khỏi thân bài khi được) |
| Bài mở rộng tới hạn | Mục 3 |
| Link hỏng | Thay bằng link còn sống của cùng nguồn (DOI, bản lưu); đổi link trong bài khóa là thay đổi cơ học, mở khóa có lý do |
| Bằng chứng mới (hằng quý, tùy chọn) | Đọc danh sách ứng viên; đáng kể thì viết bổ sung `bang-chung-moi` |

Không quét lại toàn site: chỉ mở đúng trang, đúng khẳng định mà cờ trỏ tới.

## 8. Lời giao việc mẫu

**Thêm một bài mở rộng hay bài lõi mới:**

> Bạn thêm bài **<tiêu đề>** (tầng `<mo-rong | loi>`, lĩnh vực `<mã>`, đường dẫn `<nhóm>/<slug>`) vào repo psyche, nhánh `them/<slug>` tạo từ `main`. Model: Sonnet (Opus cho phần nhãn, chỗ khó). Đọc `AGENTS.md`, `plans/ben-vung/them-noi-dung.md` mục 2 và 3 (hay 4), `plans/ben-vung/chuan-kiem-dinh.md`. Lập hồ sơ trước (`node tools/khoa.mjs mau <trang>`): khẳng định, nguồn đã mở, câu trích; rồi viết bài từ hồ sơ theo khuôn của loại trang. Nghiên cứu đã có trang nhà thì tóm một câu, link về nhà. Khi xong: `npm run build:xem`, `npm test` đạt; commit; báo cáo `plans/ben-vung/bao-cao/them-<slug>.md` (phiếu đề xuất, số nhận định theo loại, nguồn, model đã dùng); xuất danh sách cho lượt 2 (`node tools/khoa.mjs xuat <trang>`). Không push.

**Viết một bổ sung:**

> Bạn viết bổ sung `<loai>` cho bài `<trang lõi>` của repo psyche, mục `<id tiêu đề>`, nhánh `them/bo-sung-<slug>-<yyyy-mm>`. Model: Sonnet (Opus nếu có thể đổi nhãn). Đọc `plans/ben-vung/them-noi-dung.md` mục 5 và hồ sơ của bài lõi (`kiem-dinh/<trang lõi>.yml`) để biết bài đang nói gì và dựa vào nguồn nào. Không sửa bài lõi. Lập hồ sơ cho bổ sung, viết ngắn, ghi `anh_huong_nhan` và lý do. Khi xong như trên.
