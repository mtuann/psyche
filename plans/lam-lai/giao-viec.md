# Giao việc cho người mới

Cho chủ repo khi giao một phần việc làm lại site cho agent, LLM hay người khác; và cho người nhận biết đọc gì trước. Theo `../opus/plans/lam-lai/giao-viec.md`.

## 1. Bản chuẩn nằm ở đâu

- **Bản chuẩn là các file `.md` trong repo `mtuann/psyche`:** `AGENTS.md`, `plans/lam-lai/`, `plans/ben-vung/`. Sơ đồ nằm trong `so-do.md`, viết bằng Mermaid: GitHub tự vẽ thành hình.
- **Tài liệu Claude Docs là bản trình bày cho người,** có biểu đồ và sơ đồ: "Kế hoạch phát triển bền vững Psyche Zero" (https://claude.ai/artifact/DBNUuAk5yomzGsf55NxoEe; tab kiến trúc bền vững, tab kế hoạch làm lại). Chỉ người được chia sẻ mới mở được.
- Hai bản khác nhau thì file trong repo đúng. Sửa kế hoạch: sửa file trong repo trước, rồi nhờ Claude cập nhật tài liệu cho khớp.

## 2. Chọn model cho từng phần việc

Chủ repo yêu cầu (29/10/2026): agent dùng model hợp việc để tiết kiệm, không phải lúc nào cũng dùng model mạnh nhất. Bảng đủ và lý do: `loi-giao/README.md`. Tóm tắt:

| Việc | Model |
|---|---|
| Thiết kế mã mới (đợt 1, công cụ ở đợt 8), lô có thành phần mới | Opus |
| Chuyển chữ bằng script, kiểm định lượt 1 và lượt 2 thông thường | Sonnet |
| Chỗ khó: nguồn mâu thuẫn, tái lập thất bại, xếp nhãn tranh cãi, mọi việc ở trang Sức khỏe tâm thần | Opus |
| Review mã mức Vừa, kiểm lại cơ học (YAML đọc được, link, đếm, so chữ, định dạng) | Haiku |
| Review mã mức Lớn (khóa, deploy, lọc HTML hay link) | Sonnet; Opus khi đụng bảo mật hay công cụ khóa |

Tối đa 2–3 agent nặng cùng lúc; agent làm lô dùng tối đa 2 agent con.

## 3. Gửi gì cho người nhận

**Người nhận làm trong repo** (Claude Code, Cowork, Codex, người lập trình):

- Quyền vào repo `mtuann/psyche`. Họ tự đọc file theo mục 4.
- Làm ở máy khác thì clone thêm hai repo cạnh: `git clone https://github.com/mtuann/psyche-zero.git ../psyche-zero` (site cũ, chỉ đọc) và, nếu cần chép mã dùng chung, `git clone https://github.com/mtuann/opus.git ../opus` (chỉ đọc).
- Lời giao việc chép từ `loi-giao/` hay mục "Lời giao việc mẫu" của `README.md` (đổi số đợt, lô). Một phiên một việc.

**Người nhận không vào được repo** (LLM trong khung chat): đính kèm file theo việc.

| Việc | File đính kèm |
|---|---|
| Góp ý kế hoạch | `plans/lam-lai/README.md`, `so-do.md`, `cong-nghe.md`, `plans/ben-vung/README.md` |
| Kiểm định lượt 2 một lô | `plans/ben-vung/chuan-kiem-dinh.md` và file nhận định của lô (`plans/lam-lai/bao-cao/d<đợt>-l<lô>-nhan-dinh.yml`); không gửi hồ sơ của lượt 1 |
| Kiểm một trang cũ | `plans/ben-vung/chuan-kiem-dinh.md`, trang trong `../psyche-zero/docs/`, mục "Quy tắc nội dung" của `AGENTS.md` |
| Viết code, chuyển trang | Không hợp: việc cần chạy build và kiểm thử; giao cho agent làm trong repo |

## 4. Người nhận đọc theo thứ tự nào

1. `AGENTS.md`: quy tắc chung. Claude Code tự đọc qua `CLAUDE.md`; agent khác phải được bảo đọc (lời giao việc mẫu đã ghi).
2. `plans/lam-lai/README.md`: Quyết định, Tiến độ, Bảy luật, Quy tắc chung, rồi đúng mục đợt của việc mình.
3. Theo việc: `cong-nghe.md` (mọi việc code); `anh-xa.md` (danh sách trang của lô); `../ben-vung/chuan-kiem-dinh.md` (mọi lô có kiểm định); `../ben-vung/them-noi-dung.md` (thêm nội dung sau đợt 9).
4. Khi cần biết vì sao: `so-do.md`, `../ben-vung/README.md`, báo cáo G1 của site cũ (`../psyche-zero/plans/bao-cao/`).

Không cần đọc: `../psyche-zero/plans/ke-hoach.md` (kế hoạch G0–G3 của site cũ, đã thay bằng kế hoạch này; chỉ đọc báo cáo G1-L01–L04 khi làm đợt 5), `../psyche-zero/AGENTS.md` (sổ tay site cũ, chỉ để tra cú pháp cũ khi chuyển trang).

## 5. Một vòng giao việc

1. Ghi các quyết định còn chờ ở mục "Quyết định" của `README.md` (đánh `[x]`, ghi lựa chọn), commit, push.
2. Mở một phiên mới cho người nhận trong thư mục `psyche/`, dán lời giao việc, chọn model theo mục 2.
3. Người nhận làm trên nhánh riêng, viết báo cáo trong `plans/lam-lai/bao-cao/`, không push.
4. Nhờ review theo "Ba mức review" của `README.md` (mức nhỏ không cần); người review ghi kết quả vào cuối báo cáo.
5. Đọc kết luận review; với lô nội dung, đọc tóm tắt hồ sơ và xem ngẫu nhiên khoảng 5 nhận định; gộp vào `main` khi đủ điều kiện, push.
6. Cuối mỗi đợt: review cả đợt, cập nhật bảng Tiến độ.

Phiên mới không nhớ phiên cũ: điều gì cần nhớ phải nằm trong file (báo cáo, bảng Tiến độ, mục Quyết định).
