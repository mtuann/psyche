# D4-L1, lượt 1, phần 1/2

Model: Claude Sonnet 5.5. Ngày 30/10/2026. Nhánh `moi/d4-l1`. Chưa build, chưa commit.

## Việc đã làm

Lượt 1 cho `bang-chung/index`, `tuong-quan-nhan-qua`, `thi-nghiem-doi-chung`, `do-lon-hieu-ung`: tách nhận định, tìm nguồn, ghi hồ sơ, sửa trang.

| Trang | Nhận định | Loại | Kết quả |
|---|---|---|---|
| index | 5 | 5 `ve-site` | 2 dung, 2 da-sua, 1 da-lam-mem |
| tuong-quan-nhan-qua | 43 | 18 phat-hien, 8 loi-khuyen, 6 dinh-nghia, 4 so-lieu, 3 lich-su, 3 ve-site, 1 nhan | 22 dung, 18 da-sua, 2 da-lam-mem, 1 da-bo |
| thi-nghiem-doi-chung | 35 | 17 phat-hien, 6 dinh-nghia, 6 loi-khuyen, 2 so-lieu, 2 lich-su, 2 nhan | 20 dung, 13 da-sua, 2 da-lam-mem |
| do-lon-hieu-ung | 37 | 11 so-lieu, 8 phat-hien, 5 dinh-nghia, 4 nhan, 4 loi-khuyen, 3 tai-lap, 2 lich-su | 30 dung, 4 da-sua, 3 da-lam-mem |

File đã chạm: ba trang bài và `index.md` ở `src/content/docs/bang-chung/`; bốn hồ sơ `kiem-dinh/bang-chung/{index,tuong-quan-nhan-qua,thi-nghiem-doi-chung,do-lon-hieu-ung}.yml` (có `doi_chu`); `src/hinh/tuong-quan.html` (chú thích bỏ tên file `tools/figures.py` không có ở repo này; hình chỉ dùng ở hai trang của phần 1). `node tools/khoa.mjs xuat` đọc được cả bốn; thử `khoa` trên bản sao (không ghi vào worktree) chỉ còn thiếu lượt 2, review, kiểm mẫu, review của câu `ve-site`.

## Đã sửa, đã làm mềm, đã bỏ (chính)

- tuong-quan t1 (da-bo): "tiêu đề từng xuất hiện trên nhiều báo năm 2012" không có nguồn, đổi thành ví dụ minh họa.
- t4–t6, t28, q1: nghiên cứu cà phê điều chỉnh "theo tuổi", không phải "chưa tính hút thuốc"; đảo chiều khi điều chỉnh thêm hút thuốc và các yếu tố khác, không phải "chỉ một yếu tố".
- t21–t26, q2: câu "bác sĩ tim mạch" (Messerli chuyên về tăng huyết áp), "nửa đùa nửa thật" (không kiểm được), "Chẳng ai nghĩ sô-cô-la giúp đoạt Nobel" (sai: chính Messerli nêu giả thuyết flavanol) và "rất có thể do giàu có" (Doi 2014 thấy kinh tế chỉ là yếu tố phụ). Thay bằng Maurage 2013 và Doi 2014 (thêm vào mục Nguồn), cả đáp án quiz.
- t20, q4: "cách duy nhất loại bỏ biến gây nhiễu" thành "cách mạnh nhất để cân bằng"; ngẫu nhiên chỉ cân bằng khi đủ đông (OpenStax).
- thi-nghiem-doi-chung d2, d4, d6, d12–d14, d17–d20, d22, d26, q4: hồi quy về trung bình ("thường", không "gần như chắc chắn"); Wolraich (không nói "tăng động", có giới hạn "chưa loại trừ tác dụng nhỏ"); Cochrane 2010 không nói giả dược "có tác dụng nhỏ" mà nói ảnh hưởng lên đau từ không đáng kể đến quan trọng; bỏ ví dụ "lịch sự", bỏ câu về giả dược "mở" (không nguồn), bỏ "đối chứng yếu/mạnh", sửa đăng ký trước theo Nosek 2018.
- do-lon-hieu-ung h11–h13, h16, h27, h31: thêm điều kiện "phân bố chuẩn, cùng độ lệch chuẩn" cho 69% và 71%; "Cohen tự coi…" thành lời Lakens kể lại; bỏ "tương đối" ở nhãn của Gignac; thiên lệch xuất bản theo Franco 2014; "nhất quán qua các dự án" thành hai dự án đã đọc; đổi tiêu đề "ví dụ trên site này".
- index: bỏ "hàng chục tin tức mỗi ngày", "ba câu hỏi", "Mỗi bài" (thành "Các bài thường"); danh sách tay 12 bài thành `::danh-sach-bai{nhom="bang-chung"}`.

## Nguồn hay dùng

OpenStax *Psychology 2e* mục 2.2 và 2.3 (toàn văn); Freedman 2012 (toàn văn PMC3439152); Kayser 2012 (toàn văn, kể lại Messerli); Lakens 2013 (toàn văn PMC3840331); Bangdiwala 2016 (toàn văn, trích tuyên bố p-value của ASA); tóm tắt qua Europe PMC/OpenAlex cho Wolraich, Hróbjartsson, Barnett, Benedetti, Nosek, Maurage, Doi, Richard, Funder & Ozer, Klein, Vohs, Hattie, Franco, OSC, Pashler, Treur.

## Chỗ chưa chắc, chỗ khó

- **Không mở được bản gốc:** Messerli 2012 (NEJM chặn; số r và 23 nước lấy từ Kayser); Gignac & Szodorai 2016 (đọc qua Dåderman 2022 và Weinerová 2022); Rowland 2014 (g = 0,50 qua Fraundorf 2023, Yan 2024, Opitz 2024); Cohen 1988 (sách, qua Lakens). Một bản PDF của Rowland có ở trang giảng dạy của EPFL nhưng đó là bản sao paywall, tôi không tải (quyền chặn); lượt 2 thử toàn văn khác nếu cần.
- **Chồng lấn 92/80/69% (h9, h11, h32):** chưa có nguồn bậc 1–2 định nghĩa số đo "chồng lấn"; ghi là phép tính (Python, 2Φ(−d/2)); xác suất vượt trội 56/64/71% có định nghĩa ở Lakens. Lượt 2 cần kiểm phép tính.
- **Nhãn:** các khung nhãn trong hai bài (Vững chắc "tương quan không đủ…", "ngẫu nhiên có đối chứng", "có ý nghĩa thống kê ≠ lớn") là nguyên tắc phương pháp; thước đo mục 4 viết cho phát hiện thực nghiệm nên áp hơi khập khiễng, ghi rõ trong `ly_do`. Nhãn Khá vững của giả dược dựa một tổng quan Cochrane 2010; tôi chưa tìm tổng quan mới hơn: review xem lại.
- **Bảng ví dụ ở do-lon-hieu-ung (h23–h25):** nhãn Rowland (Vững chắc), phong cách học (Đã bị bác bỏ), cạn kiệt ý chí (Đang tranh cãi) phải khớp trang nhà khi làm (`duong-cong-quen`, `phong-cach-hoc`; cạn kiệt ý chí chưa thấy trang trong `trang.yml`). Chưa đọc các tái lập khác của cạn kiệt ý chí (Hagger 2016).
- Câu `ve-site` của index (i5: "Các bài thường bắt đầu…") chỉ kiểm được trên 6 bài đã chuyển; 6 bài còn lại chưa chuyển.
- t31 (phân loại động từ nhân quả/tương quan) là hướng dẫn đọc của site; nguồn không liệt kê động từ.

## Người giao phải sửa hay quyết

- Hai bài phần 1 có link `/psyche/bang-chung/…` tới trang phần 2 và các trang chưa chuyển: giữ nguyên, chữ "sắp có" tự xử lý.
- `index.md` đã dùng danh sách sinh từ dữ liệu: mô tả của mỗi bài hiện ra ở mục lục, nên mô tả (frontmatter) của 12 bài nên được rà (một dòng, không thêm con số).
- Không đụng thành phần, dữ liệu, kiểm thử. `src/data/nguon.yml` chưa thêm Maurage 2013, Doi 2014, Lakens 2013, Bangdiwala 2016, Franco 2014, Treur 2024, Benedetti 2025, Barnett 2005, Nosek 2018 (đã có ở nơi khác hay chưa): bổ sung khi các trang khác dẫn lại.
