# Lời giao chung: đề xuất `lien_quan` cho khối "Đọc tiếp" (kế hoạch nâng cấp L1)

Repo: /Users/mitu/Desktop/work/projects/psyche (site tâm lý học tiếng Việt). CHỈ ĐỌC repo: không sửa file nào trong repo, không chạy build, không git. Ghi kết quả vào đúng file đầu ra được giao (ngoài repo).

Bối cảnh: mỗi bài có một khối "Đọc tiếp" trước mục Nguồn, hiện **tối đa 4 trang liên quan**, chỉ tên trang (tiêu đề), không câu mô tả. Dữ liệu là trường `lien_quan` trong `src/data/trang.yml`. Đọc `plans/nang-cap/README.md` mục 3.5 (L1).

Cách chọn cho mỗi bài (đọc bài ở `src/content/docs/<id>.md`):
1. 1 bài Khám phá (`kham-pha/...`) gần chủ đề, **ưu tiên bài khác lĩnh vực** (người đọc đi sang mảng khác).
2. 1 trang thí nghiệm (`thi-nghiem/...`) liên quan (ví dụ trang nhà của nghiên cứu mà bài nhắc tới; xem `src/data/nghien-cuu.yml` trường `trang_nha`).
3. 1 bài Hiểu bằng chứng (`bang-chung/...`) giải thích khái niệm bài thật sự dùng (phân tích tổng hợp, tương quan/nhân quả, độ lớn hiệu ứng d, r, p-value, cỡ mẫu, khủng hoảng tái lập, thí nghiệm đối chứng, đo lường, chọn mẫu…).
4. 1 công cụ (`trai-nghiem/...`) nếu thật sự liên quan (danh sách: stroop, do-dai-tri-nho, ao-giac-thi-giac, mu-thay-doi, tri-nho-sai, wason-246, linda, big-five-mini, neo-gia, ebbinghaus, tri-nho-tu).
- Không có mục nào thật sự hợp thì bỏ mục ấy (ít hơn 4 là được; 0 cũng được). Không chọn cho đủ.
- Trang thí nghiệm: mục 2 thay bằng 1 thí nghiệm khác liên quan hay bỏ; mục 1 là bài Khám phá dùng thí nghiệm ấy. Trang Hiểu bằng chứng: mục 3 là một bài Hiểu bằng chứng khác liền mạch; mục 1, 2 là bài/thí nghiệm minh họa tốt cho khái niệm.
- Chỉ dùng id có trong `src/data/trang.yml` VÀ đã khóa (có khóa `"<id>"` trong phần `trang` của `kiem-dinh/khoa.json`). Không trỏ tới chính nó. Không trùng.
- Không chọn trang mà bài đã link nhiều lần ngay trong thân bài nếu có lựa chọn khác tốt hơn (khối này để mở lối mới); nhưng link một lần trong thân thì vẫn được chọn.
- Bài Sức khỏe tâm thần (`kham-pha/suc-khoe-tam-than/...`): không chọn công cụ có thể bị hiểu là tự đánh giá tâm thần; ưu tiên `kham-pha/suc-khoe-tam-than/tim-giup-do` khi hợp.
- Không chọn bài mở rộng mà `dua_tren` của nó đã trỏ tới bài đang xét (phần ấy đã tự hiện ở "Bài mở rộng dựa trên bài này").

Đầu ra: file YAML, mỗi bài một mục, theo thứ tự id trong danh sách giao:
```yaml
- id: kham-pha/tri-nho/vi-sao-ta-quen
  lien_quan: [kham-pha/co-so-sinh-hoc/ngu-va-tri-nho, thi-nghiem/..., bang-chung/..., trai-nghiem/ebbinghaus]
  ly_do:
    kham-pha/co-so-sinh-hoc/ngu-va-tri-nho: một dòng ngắn tiếng Việt vì sao liên quan (nêu chỗ trong bài)
    ...
```
Kiểm YAML hợp lệ trước khi xong (dùng `node -e` với `require('/Users/mitu/Desktop/work/projects/psyche/node_modules/yaml')`). Tránh nháy kép lồng trong chuỗi nháy kép.

Báo cáo cuối (dưới 120 chữ): số bài, số bài ít hơn 4 mục và vì sao, chỗ phân vân.
