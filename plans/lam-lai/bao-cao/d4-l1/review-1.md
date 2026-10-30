# D4-L1, review nội dung 1/2: mau-va-chon-mau, p-value, khung-hoang-tai-lap

Model: Claude Opus 5.5 (agent review). Nhánh `moi/d4-l1`, chưa commit, chưa build. Ngày 30/10/2026.

## Phạm vi

Theo chuẩn kiểm định mục 3, bước Review, review xét: mọi câu `ve-site`; mọi câu mà lượt 2 cho kết quả khác `dung`; mọi câu lượt 1 đã sửa, làm mềm hay bỏ; các ghi chú lượt 2 ở p9, p12, p15, k9, k41; mọi nhãn. Mỗi câu đã xét có `review` và câu "Review (Claude Opus 5.5, 30/10/2026): …" ở cuối `ghi_chu`. Lần kiểm định cuối có `nguoi.review`.

| Trang | dung | sai |
|---|---|---|
| bang-chung/mau-va-chon-mau | 27 | 5 |
| bang-chung/p-value | 26 | 3 |
| bang-chung/khung-hoang-tai-lap | 28 | 1 |

## Nguồn review tự mở

- Lusinchi (2012), *Social Science History* 36(1), 23–54, toàn văn (PDF mở của Cambridge). Đây là nguồn mới của hồ sơ `mau-va-chon-mau` (`lusinchi2012`): tr. 26 cho biết khoảng 10 triệu phiếu, danh sách lập từ nhiều nguồn; tr. 33 dẫn số của Squire (61% người có điện thoại và ô tô ủng hộ Roosevelt); tr. 38: người ủng hộ Landon gửi phiếu lại nhiều hơn (khoảng 1/3 so với 1/5); tr. 46 kết luận nguyên nhân chính là thiên lệch do không trả lời.
- Tóm tắt trên OpenAlex của Squire 1988, Lohr & Brick 2017, Arnett 2008.
- OpenStax *Psychology 2e* mục 2.3 ("the vast majority of research in psychology subfields has historically involved students").
- Nosek và cộng sự 2022 (bản Tilburg), mục Replicability ("There is no such thing as an exact replication").
- Greenland và cộng sự 2016 (Europe PMC), định nghĩa p-value ("at least as large as its observed value if every model assumption were correct").

## Câu sai (đã sửa trang và hồ sơ, có `doi_chu`)

- mau m22: "Phần lớn nghiên cứu tâm lý học trước nay dùng sinh viên đại học…" → "Theo giáo trình OpenStax, phần lớn nghiên cứu ở các chuyên ngành tâm lý học trước nay dùng sinh viên đại học…" (da-lam-mem).
- mau m34: "Danh sách gửi phiếu được lập từ danh bạ điện thoại và danh sách đăng ký ô tô" → "Tạp chí gửi khoảng 10 triệu phiếu, theo một danh sách lập từ nhiều nguồn, phần lớn là danh bạ điện thoại và danh sách đăng ký ô tô" (da-sua; Lusinchi 2012).
- mau m36: lượt 1 bỏ câu cũ ("chỉ gia đình khá giả… nghiêng về Landon"), bỏ như vậy là đúng. Nay viết lại theo câu đúng của lượt 2: cách giải thích quen thuộc; trong khảo sát Gallup, chính nhóm có điện thoại và ô tô vẫn ủng hộ Roosevelt; Lusinchi (2012) cho rằng nguyên nhân chính là người ủng hộ Landon gửi phiếu lại nhiều hơn (da-bo → da-sua). Kết luận của Squire (cả mẫu lẫn việc trả lời đều lệch) vẫn giữ.
- mau m50 (khung nhãn): "mẫu lệch, không giống tổng thể, cho kết luận sai" → "… có thể cho kết luận sai" (da-lam-mem).
- mau q1 (lời giải thích của quiz): "… với danh sách gửi phiếu lệch và tỉ lệ trả lời khoảng 24%" → "Mẫu lớn không tự sửa được thiên lệch chọn mẫu. … gửi khoảng 10 triệu phiếu mà vẫn dự đoán sai người thắng cử: chỉ khoảng 24% người nhận trả lời, và người ủng hộ Landon gửi phiếu lại nhiều hơn hẳn." (da-sua).
- p-value p9: "kết quả 9/10 ngửa là chuyện hiếm (1,1%)" → "được từ 9 lần ngửa trở lên là chuyện hiếm (1,1%)" (da-sua).
- p-value p12: "chênh lệch quan sát được là chuyện hiếm ở mức 3%" → "(và các giả định của phép tính đều đúng), thì chênh lệch lớn như thế hoặc lớn hơn chỉ xảy ra với xác suất 3%" (da-sua).
- p-value p43 (thân khung Khá vững): "Mô phỏng và khảo sát cho thấy các cách làm này làm tăng dương tính giả và khá phổ biến" → "Mô phỏng cho thấy các cách làm này làm tăng dương tính giả, và khảo sát cho thấy chúng khá phổ biến" (da-sua).
- khung-hoang k9: "theo đúng thiết kế cũ" → "theo sát thiết kế cũ" (da-lam-mem; Nosek 2022: không có lần làm lại nào giống hệt).

Ngoài ra, ở khung-hoang, description trong frontmatter chuyển từ nháy kép sang nháy đơn theo quy ước; chữ không đổi.

## Câu lượt 2 khác `dung` mà review giữ

- mau m3 (`khong-chac`, đã bỏ): bỏ là đúng.
- mau m33 (lượt 2 `dung` cho câu đã bỏ): giữ việc bỏ. Muốn xếp hạng "cách biệt nhất lịch sử" thì cần nguồn so sánh các kỳ bầu cử.

## Nhãn đã chốt

| Trang, id | Khẳng định | Nhãn | Lý do ngắn |
|---|---|---|---|
| mau m50 | mẫu lệch có thể cho kết luận sai về tổng thể | Vững chắc | Đây là nguyên tắc thống kê nên xét theo mức đồng thuận: giáo trình mở có bình duyệt nêu thẳng, không nguồn nào phản bác, ba bài có bình duyệt phân tích ví dụ Literary Digest |
| mau m52 | kết quả từ mẫu WEIRD không thể mặc nhiên coi là đúng cho mọi người | Khá vững | Khung nói về bằng chứng cụ thể; tổng quan chứ không phải phân tích tổng hợp; Many Labs 2 thấy khác biệt WEIRD nhỏ. Lượt 2 nghiêng về Vững chắc vì coi đây là nguyên tắc; review giữ Khá vững |
| p-value p39 | p-value không phải xác suất giả thuyết đúng, không đo độ lớn | Vững chắc | Nguyên tắc thống kê: tuyên bố chính thức của ASA (đồng thuận rộng) và hướng dẫn Greenland 2016 |
| p-value p41 | p-hacking làm tăng dương tính giả và làm khó tái lập | Khá vững | Vế dương tính giả gần như chắc (mô phỏng), vế tái lập chỉ có lập luận và tương quan; nhãn theo vế yếu hơn |
| khung k38 | hiệu ứng công bố thường lớn hơn khi làm lại | Vững chắc | Đạt mục 4 nguyên văn: ba tái lập lớn cùng chiều, nhiều nước, tổng hợp Nosek 2022 |
| khung k41 | mẫu nhỏ, p-hacking, thiên lệch xuất bản có khả năng góp phần | Khá vững | Cơ chế đã được đồng thuận, nhưng vai trò thực tế chỉ có bằng chứng tương quan; OSC gọi là "plausible explanations" |

## Kiểm

- `node tools/khoa.mjs xuat bang-chung/<trang>` đọc được cả ba hồ sơ.
- Mọi nhận định không `da-bo` và không `ve-site` đều có `nguon`, và nguồn ấy có trong danh sách `nguon` của hồ sơ. Câu `review: sai` không còn câu nào để `ket_qua: dung`.
- Không có khoảng trắng cuối dòng. Mỗi câu quiz vẫn đúng một `+`.

## Còn chưa chắc, việc cho người gom

- `src/data/nguon.yml` chưa có `lusinchi2012` (Lusinchi, D., 2012, Social Science History 36(1), 23–54; DOI hiện hành 10.1017/S014555320001035X, DOI cũ của Duke 10.1215/01455532-1461650). Thêm vào cùng các nguồn mà báo cáo lượt 1 phần 2 đã liệt kê.
- Câu m36 và q1 mới dựa trên bài toàn văn mà lượt 2 đã dẫn (lượt 2 cũng chỉ ra câu đúng), nhưng chữ mới chưa qua lượt 2 riêng. Nếu muốn chặt hơn thì cho lượt 2 đọc lại m34, m36, q1.
- khung-hoang: câu "Kết quả gây chấn động:" ở mục Một tin tức là lời bình không nguồn. Ở mau-va-chon-mau, lượt 1 đã bỏ chữ "gây chấn động" vì cùng lý do (m3). Câu này không có nhận định trong hồ sơ, review không sửa. Nên viết "Kết quả:".
- p-value p10 ("nếu đồng xu công bằng, dữ liệu này hiếm đến mức 1,1%") cũng có thể viết "kết quả như thế này hoặc lạ hơn" cho khớp p9. Hiện vẫn đúng ý, nên chưa sửa.
- Chưa chạy `so-chu.mjs`, chưa build.
