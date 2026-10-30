# Lượt 2 cho nhận định của trang (lô <D…-L…>, phần <x>)

Model: Sonnet; Opus cho phần chỉ gồm chỗ khó (nguồn mâu thuẫn, nhãn, tái lập, sức khỏe tâm thần).

Bạn kiểm định **lượt 2**, độc lập với lượt 1, cho phần nhận định ở `<file danh sách>`. Mỗi mục có:
- `trang`;
- `id`;
- `cau`: câu nhận định, tiếng Việt;
- `loai`.

**Không mở:**
- `kiem-dinh/` (hồ sơ của lượt 1);
- `plans/lam-lai/bao-cao/`, trừ file danh sách được giao;
- trang trong `src/content/docs/` và trang của site cũ.

Không chạy lệnh git. Không dùng trang nguồn mà lượt 1 đã tải.

**Chỉ đọc:**
- `plans/ben-vung/chuan-kiem-dinh.md`: mục 1, 2 (kể cả "Nguồn và cách mở") và 4;
- `plans/lam-lai/loi-giao/README.md`, mục quy tắc chung.

## Nguồn

- Điều một nghiên cứu đã làm và đã thấy (thiết kế, cỡ mẫu, kết quả, năm): bài gốc, qua DOI ở trang nhà xuất bản, PubMed Central, hay bản tác giả; ghi nếu chỉ đọc được tóm tắt.
- Tình trạng bằng chứng (nhãn): phân tích tổng hợp, tổng quan hệ thống (Cochrane, Psychological Bulletin, Annual Review), tái lập lớn có đăng ký trước (Many Labs, Registered Replication Report).
- Sức khỏe tâm thần: ICD-11 (bản trực tuyến của WHO), hướng dẫn lâm sàng (WHO, NICE), tổng quan hệ thống; DSM-5-TR qua tài liệu chính thức của APA.
- Định nghĩa khái niệm: APA Dictionary of Psychology, giáo trình mở (OpenStax *Psychology 2e*, Noba) dẫn đúng chương.
- Bài cũ: toàn văn hay có ở Internet Archive (bộ `wikipedia-scholarly-sources-corpus`), psychclassics.yorku.ca, gwern.net, CiteSeerX, PubMed Central; tóm tắt qua OpenAlex khi Crossref không có. Cố mở bài gốc ở các nơi này trước khi ghi `khong-chac`.
- Wikipedia, báo, blog chỉ để tìm nguồn.

## Kết quả

- `dung`: đúng như câu viết.
- `sai`: kèm `cau_dung` (câu đúng, tiếng Việt) và nguồn.
- `qua-manh`: câu nói mạnh hơn bằng chứng (nhân quả thay cho tương quan, "luôn" thay cho "thường", nhãn cao hơn thước đo); kèm `cau_dung`.
- `khong-chac`: nguồn bậc 1–2 không xác nhận được, hay các nguồn mâu thuẫn. Giải thích ở `ghi_chu`.

Chỉ dẫn trang đã thật sự mở và có nói điều ấy. Bản tóm tắt của công cụ đọc web có thể sai: chỗ quan trọng (con số, chiều của kết quả) thì đọc chữ thật của bài.

## Đầu ra

Danh sách YAML ở `<file kết quả>`, đúng thứ tự đầu vào:

```yaml
- trang: <trang>
  id: n12
  luot_2: dung
  nguon: ["https://doi.org/10.1037/h0093718"]
  trich: "…"
  ghi_chu: "…"
```

- `nguon` (link đã mở) bắt buộc, trừ khi `khong-chac`.
- `cau_dung` bắt buộc khi `sai` hay `qua-manh`.
- Link viết trong nháy kép.
- Kiểm file đọc được, chạy ở thư mục repo: `node -e "import('yaml').then(y=>console.log(y.parse(require('fs').readFileSync(process.argv[1],'utf8')).length))" <file>`.

## Quy tắc

- Chỉ ghi file kết quả. Không commit, không push.
- Không đưa thông tin cá nhân của chủ repo ra ngoài.
- Xong thì trả lời: số `dung`, `sai`, `qua-manh`, `khong-chac`; mọi mục không phải `dung` kèm một dòng lý do.
