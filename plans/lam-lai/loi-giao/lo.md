# Giao lô <D đợt-L lô>

Model: Sonnet cho lô chuyển chữ và kiểm định (đợt 3–6); Opus cho lô có thành phần hay công cụ mới (đợt 8) và lô Sức khỏe tâm thần (đợt 7). Xem `loi-giao/README.md`.

Bạn làm lô **<D…-L…>** trong `plans/lam-lai/README.md` của repo psyche.

- Worktree: `<đường dẫn>`, nhánh `moi/<d…-l…>` đã tạo từ `main`, đã `npm ci`.
- Site cũ đã build ở `.cache/site-cu/`, dùng cho `so-chu`.

## Đọc trước

1. `AGENTS.md`.
2. Trong `plans/lam-lai/README.md`: Quyết định, Bảy luật, Quy tắc chung (cả "Ba mức review"), Quy trình mỗi lô, mục của đợt.
3. Danh sách trang của lô: `plans/lam-lai/anh-xa.md`.
4. `plans/ben-vung/chuan-kiem-dinh.md`, nhất là mục 1 (loại nhận định, kể cả `ve-site`), 2 (thứ bậc nguồn, "Nguồn và cách mở"), 4 (thước đo nhãn).
5. `plans/lam-lai/loi-giao/README.md`: chọn model, cách chạy cho đỡ tốn, quy tắc chung.
6. Báo cáo của lô trước và các dòng "Việc còn mở" giao cho lô này. Đợt 5: báo cáo G1 của các trang (`../psyche-zero/plans/bao-cao/g1-l0*.md`).

## Việc

- Chuyển từng trang bằng `tools/chuyen/`, rồi so chữ (`tools/chuyen/so-chu.mjs`). Chữ khác trang cũ phải ghi `doi_chu` trong hồ sơ.
- Thành phần, hình, công cụ mà trang cần lần đầu: làm, đăng ký, CSS, kiểm thử trong `tests/`, như `AGENTS.md` mục "Mẫu trang và khối đặc biệt".
- Kiểm định lượt 1 theo mức của tầng, ghi hồ sơ (`node tools/khoa.mjs mau <trang>`). Lô nhiều trang thì chia phần cho tối đa 2 agent con theo `loi-giao/luot-1-trang.md` (ghi model khi khởi chạy), rồi đọc lại hồ sơ của chúng:
  - Mỗi nhận định một loại đúng. Câu về chính site là `ve-site`, có `ghi_chu` ghi đã kiểm ở đâu.
  - Mỗi khung nhãn mức độ chắc chắn có `co_so` (nguồn đạt thước đo ở chuẩn mục 4).
  - Khẳng định thời sự viết kèm mốc thời gian ("Tính đến 11/2026…") và có `het_han`.
  - Nghiên cứu đã có trang nhà ở nơi khác: trang này chỉ tóm một câu, không thêm con số mới, link về nhà.
  - Không viết điều gì như chẩn đoán hay lời khuyên điều trị; điều về sức khỏe tâm thần dẫn tới Hỗ trợ.
- Chỗ khó (nguồn mâu thuẫn, tái lập thất bại, đổi nhãn, nghiên cứu bị rút): ghi `ghi_chu: "chỗ khó: …"` để người giao chuyển cho Opus ở lượt 2.
- Chưa khóa gì. Chỉ chạm file của lô; kiểm thử phạm vi chặn chỗ khác.

## Quy tắc

- Theo `loi-giao/README.md`: tối đa 2 agent con; không đưa thông tin cá nhân của chủ repo ra ngoài.
- Commit message tiếng Việt, kết thúc bằng dòng Co-Authored-By của model đang dùng.
- Giao diện theo mục Giao diện của `AGENTS.md`: ba cỡ màn hình, ba trình duyệt, vùng bấm 44 px, không lùi Lighthouse, hình bằng SVG hay HTML/CSS có bản sáng và tối.
- Kiểm thử trình duyệt chờ điều kiện, không chờ cố định.

## Khi xong

1. `npm run build:xem` và `npm test` đạt. Chạy kiểm thử trình duyệt liên quan với `PSYCHE_TRANG` cho trang của lô (máy có trình duyệt Playwright; không thì để CI chạy).
2. Commit.
3. Viết báo cáo `plans/lam-lai/bao-cao/<d…-l…>.md`: việc đã làm và file đã chạm; số nhận định theo loại, đã sửa, đã bỏ; chỗ chưa chắc, chỗ khó; kết quả kiểm thử; nguồn đã dùng; model đã dùng cho từng phần; tối đa 4 ảnh tiêu biểu.
4. Xuất danh sách cho lượt 2: `node tools/khoa.mjs xuat <D…-L…>`. Lệnh tự bỏ câu về chính site.
5. Trả lời ngắn: đã làm gì, còn gì, cần chủ repo quyết gì.
