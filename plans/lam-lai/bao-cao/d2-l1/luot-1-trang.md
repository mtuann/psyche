# D2-L1, lượt 1 cho phần trang (không gồm Hỗ trợ)

Model: Claude Sonnet 5.5 (agent lượt 1, D2-L1). Ngày 30/10/2026. Chưa chạy build (worktree dùng chung).

## Phạm vi

Trang chủ `index`, `bat-dau/index`, `bat-dau/doc-nhan-chac-chan`, `bat-dau/cach-kiem-chung`, `kham-pha/index`, 14 trang `nen-tang/<id>`. Hồ sơ ở `kiem-dinh/` (trang chủ: lần kiểm định số 2 trong `index.yml`).

## Số nhận định: 137

- Theo loại: ve-site 60, dinh-nghia 40, phat-hien 14, so-lieu 8, nhan 6, tai-lap 5, lich-su 3, thoi-su 1.
- Theo kết quả lượt 1: dung 82, da-sua 40, da-lam-mem 9, da-bo 3, chưa quyết 3 (`doc-nhan-chac-chan` n13, n15, n16).
- Câu `ve-site` chưa có `review` (để null). Lượt 2 chưa làm.

## Nguồn

- OpenStax Psychology 2e (mở được, đọc toàn văn từng mục): định nghĩa 14 lĩnh vực.
- APA Dictionary of Psychology là ứng dụng một trang, công cụ đọc web không lấy được mục từ: không dùng.
- Bài gốc đọc toàn văn: Open Science Collaboration 2015 (bản thảo tác giả trên OSF), Henrich và cộng sự 2010, Cepeda và cộng sự 2006, Bushman 2002. Chỉ đọc tóm tắt (Europe PMC, Crossref): Simons và Chabris 2011, Bond và DePaulo 2006, Kjærvik và Bushman 2024, Loftus 2005, Klein và cộng sự 2018, Hagger 2016, Vohs 2021, Nosek 2018 và 2022, Pashler 2008, Hattie và O'Leary 2025, Nielsen 2013.
- Không mở được: Loftus và Palmer 1974 (ScienceDirect chặn).

## Chỗ sửa (chi tiết ở `doi_chu` và `ghi_chu` của hồ sơ)

- `bat-dau/index`: bỏ ba ý về thiên kiến và câu "đủ dùng trong đời sống" (không nguồn); "Psyche Zero" thành "Psyche"; "tạp chí hàng đầu" thành "lớn"; "mở ra khủng hoảng tái lập" thành "một mốc của"; bỏ "nhiều nghiên cứu giờ đăng ký trước, dữ liệu công khai", thay bằng Many Labs 2; WEIRD thêm mốc và link về trang nhà; ô đại chúng của bảng bỏ "thường"; thêm link nguồn vào đáp án.
- `bat-dau/doc-nhan-chac-chan`: thêm mục Thước đo (bảng chuẩn mục 4, giải thích thuật ngữ); viết lại bốn khung (điều kiện của thước đo, ví dụ có nguồn); khung "Đã bị bác bỏ" bỏ tiêu đề tùy biến, ý chính là hai điều kiện; bỏ "theo thứ tự ưu tiên"; bỏ câu "ý nghĩa thống kê chưa chắc đáng kể" (không nguồn); bỏ vế "những người ủng hộ cho rằng cách thử nghiệm chưa phù hợp"; "mẫu nhỏ, phân tích linh hoạt" viết mềm theo OSC.
- `bat-dau/cach-kiem-chung`, trang chủ: "người làm, người khác, người review" đổi trung tính ("lượt"), vì lượt 1, 2 và review do agent làm; chỉ bài nền tảng đủ hai lượt; "bổ sung ở cuối bài" thành "đúng mục của bài"; điều kiện mở khóa khớp mục 8.
- `nen-tang/`: sửa định nghĩa phát-trien (thụ thai đến cuối đời, tâm lý xã hội), tam-ly-xa-hoi (bỏ "chỉ trong tưởng tượng"), cam-xuc-dong-luc, hanh-phuc, tri-nho ("tập hợp các quá trình"), tri-giac-chu-y (chú ý), suc-khoe-tam-than (bỏ "thường gặp", "có bằng chứng"); mọi trang: "chưa hiện ở đây, chỉ được đếm ở cuối danh sách".
- `kham-pha/index`: "đi theo cùng một trình tự" thành "thường đi theo".

## Chưa chắc và chỗ khó

1. Khung "Khá vững" ở `doc-nhan-chac-chan` (n13, n15, n16): không mở được bài gốc Loftus và Palmer; câu "chưa có tái lập lớn" chỉ có nguồn bậc 3 (blog Zwaan, 9/2025). Người gom quyết: lấy bài gốc, hay đổi ví dụ khác cho khung này.
2. Nhãn "Vững chắc" của khẳng định "tâm lý học tự sửa sai" (`bat-dau/index` n34): nhãn cho cả ngành, thước đo viết cho hiệu ứng cụ thể.
3. Ví dụ "Vững chắc" (spacing) thước đo đòi nhiều quần thể: Cepeda chỉ gồm bài tập ngôn từ.
4. Ví dụ "Đang tranh cãi" (cạn kiệt ý chí): hai tái lập cùng chiều có thể đáng xếp "Đã bị bác bỏ"; giữ "Đang tranh cãi" cho khớp site cũ và thẻ ngộ nhận.
5. Hai hàng của bảng so sánh (`bat-dau/index` n9, n16) chỉ là mô tả, không số liệu.
6. APA Dictionary chưa đối chiếu cho các định nghĩa.

## Việc cho người gom

- Có ghi rõ trên trang công khai rằng lượt kiểm do AI làm, chủ repo kiểm mẫu (hiện dùng chữ trung tính)?
- OSC 2015 và Bond và DePaulo 2006 chưa có hồ sơ `nghien-cuu.yml`; `bat-dau/index` kể ba con số của OSC. Thêm hồ sơ hay rút số?
- Link tới trang chưa lên (hiện "sắp có"): `ban-nghi-gi` ("20 câu", `ve-site` n38 chờ D8-L3), `bang-chung/*`, `them/cap-nhat`, `kham-pha/tri-nho/*`, `kham-pha/chu-y-tri-giac/nhin-ma-khong-thay`.
- Con số d = 0,04 (Hattie 2025) ở khung "bác bỏ" và "839 lần đánh giá" ở khung "Vững chắc" thuộc nghiên cứu có trang nhà ("nơi khác chỉ tóm một câu, không thêm số mới"): giữ hay rút về nhà.
- Đã đổi trang nên mã băm các trang này chưa khóa; `index` chưa khóa (đã mở khóa từ trước).
