# D4-L2, review 2 (thong-ke-mo-ta, do-luong, doc-bai-bao-khoa-hoc)

Model: Claude Sonnet 5.5 (agent review D4-L2, 30/10/2026). Nhánh `moi/d4-l2`, chưa commit.

## Số câu

| Trang | Tổng | Có review | dung | sai |
|---|---|---|---|---|
| thong-ke-mo-ta | 39 | 29 | 27 | 2 |
| do-luong | 47 | 33 | 31 | 2 |
| doc-bai-bao-khoa-hoc | 55 | 38 | 32 | 6 |

Review gồm mọi câu `ve-site`, `thoi-su`, `nhan`, mọi câu lượt 1 đã sửa hay làm mềm; không câu nào có lượt 2 khác `dung`.

## Câu sai đã sửa (chữ cũ, chữ mới)

- tk18 (hình mean-vs-median): nhãn "Trung bình/Trung vị" ở mép phải đè lên cột, ghi chú cũ nói nhãn nằm trên đường (thực tế nằm dưới), chú thích còn "kể đúng câu chuyện" -> chú giải hai đường ở góc trên trái, nhãn giá trị có viền nền, chú thích "cho biết". Thêm `mean-vs-median` vào `HINH_DA_SUA` (`tests/chuyen.test.mjs`).
- tk21: "trung bình bị kéo về phía đó nhiều hơn trung vị" -> "trung bình thường bị kéo..." (có "thường"; von Hippel 2005).
- dl1: tít trong nháy kép "Việt Nam xếp thứ 54 ... hạnh phúc" và "các báo trong nước đưa ngày 21/3/2024" -> không nháy, "ý chính của tin, diễn đạt lại", "báo Vietnam Investment Review đưa tin ngày 21/3/2024".
- dl27: "Alpha trên khoảng 0,90 đến 0,95 có thể do câu hỏi lặp lại" -> "Alpha quá cao có thể do ...; mức tối đa 0,90 từng được khuyến nghị" (0,95 không có trong Tavakol và Dennick); hàng bảng đổi thành "Cao hơn khoảng 0,90".
- d6, d46: "quy trình đó đã bị xâm phạm" / "quy trình phản biện đã bị xâm phạm" -> "có lo ngại rằng quy trình đó đã bị xâm phạm" / "lo ngại rằng ..." (nguồn: "concerns that the peer review process has been compromised").
- d20: "Một thứ tự thường gặp" -> "Một thứ tự để thử (site tự gợi ý, không phải thứ tự chuẩn của nguồn nào)" (Carey và ICMJE không nêu thứ tự đọc).
- d47: "tổng quan của Cochrane kết luận rằng hiện còn ít bằng chứng" -> "... năm 2007 ... khi đó còn ít bằng chứng".
- d49: ý chính khung "IMRaD là cấu trúc chuẩn" -> "cấu trúc thường dùng", thêm câu giới hạn (số liệu Sollaci và Pereira chỉ bốn tạp chí nội khoa đến thập niên 1980).
- d51: "Khoảng 15 người mỗi nhóm là mẫu nhỏ" (nguồn trong hồ sơ không đỡ) -> thêm Simmons, Nelson và Simonsohn (2018) vào hồ sơ và trang: "mặc định coi nghiên cứu dưới 50 người mỗi nhóm là thiếu sức mạnh thống kê, trừ khi có bằng chứng ngược lại" (tr. 258, bản mở đã đọc).

Mỗi chỗ có mục `doi_chu`. Không đổi tiêu đề mục nào, id mục giữ nguyên. Câu đã sửa sau lượt 2 chỉ làm chặt chữ (thêm "thường", "lo ngại", "năm 2007", bỏ mốc 0,95); riêng d51 thêm nguồn mới, người giao có thể cho lượt 2 nhìn lại câu này.

## Các ghi chú lượt 2 được hỏi

- tk33: nhãn chốt Khá vững (không cao hơn). Đọc toàn văn von Hippel (bản mở jse.amstat.org): 14/18 giáo trình dạy quy tắc; vi phạm "không hiếm" ở dữ liệu rời rạc, phân phối liên tục "ngoan" hơn. Đã đổi `vonhippel2005` thành `toan_van: true`.
- dl30: đối chiếu PMC12187714 (Metsämuuronen và Niemensivu 2025): hai câu Nunnally đúng nguyên văn, đúng trang 245 và 246, kèm "if important decisions are to be made". Trang ghi rõ "theo trích của". Dung.
- dl22: Crossref xác nhận tên bài, Psychometrika 16(3), 297-334, 9/1951. Dung.
- d20: sai (xem trên). d51: sai về nguồn (xem trên), nội dung đúng.

## Nhãn đã chốt

| Trang | Khung | Nhãn |
|---|---|---|
| thong-ke-mo-ta | tk32 (trung bình, trung vị, yếu vị; nhạy giá trị cực đoan) | Vững chắc |
| thong-ke-mo-ta | tk33 (lệch phải: trung bình thường > trung vị) | Khá vững |
| do-luong | dl41 (tin cậy cần nhưng không đủ cho giá trị) | Vững chắc |
| do-luong | dl42 (mốc alpha là quy ước, tùy mục đích) | Khá vững |
| doc-bai-bao-khoa-hoc | d48 (phản biện không bảo đảm đúng) | Vững chắc |
| doc-bai-bao-khoa-hoc | d49 (IMRaD thường dùng; Methods) | Vững chắc, sau khi sửa "chuẩn" thành "thường dùng" |

Tất cả xét theo đồng thuận giáo trình và hướng dẫn (nguyên tắc phương pháp), ghi trong `ly_do`.

## Câu `ve-site` và `thoi-su`

- tk18 sai (đã sửa); d37 dung (bảy link có trong `trang.yml`, bản build, đúng dạng); d50 dung.
- tk6, dl33: có mốc "Tính đến 10/2026", `het_han` 30/10/2027, nguồn. dl33 tra lại OpenAlex: 31.756.

## Kiểm tra

- `node tools/khoa.mjs xuat bang-chung/<trang>` đọc được cả ba; mọi câu không `da-bo`, không `ve-site` có `nguon` (đã kiểm tự động); `nguoi.review` ghi ở lần cuối.
- `npm run build:xem`, `npm test`: 82/82 đạt.
- `test:trinh-duyet` (Chromium): ba trang của review này đạt axe và kiểm cỡ màn hình. Hỏng ở `bang-chung/phan-tich-tong-hop/` (không thuộc review này): `landmark-unique` ở khối `pre` thứ 14 (forest plot), 360 px tối và 768 px.

## Chỗ chưa chắc

- Hình mean-vs-median: đã xem bản sáng bằng ảnh chụp Chromium; chưa chụp bản tối (viền nền dùng `var(--sl-color-bg)`).
- d47: tổng quan Cochrane 2007 có bản mới hơn không, chưa tra.
- dl17 (giá trị "nhất thiết tin cậy"): đúng ở mức giáo trình nhập môn; tâm trắc học nâng cao có sắc thái.
