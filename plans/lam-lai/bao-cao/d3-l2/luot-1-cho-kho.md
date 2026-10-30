# D3-L2, lượt 1, chỗ khó: 8 trang thí nghiệm

Model: Claude Opus 5.5 (một agent, không giao tiếp cho agent con). Ngày 30/10/2026. Nhánh `moi/d3-l2`. Làm tiếp sau hai phần lượt 1 của Sonnet (`luot-1-phan-1.md`, `luot-1-phan-2.md`). Không build, không commit. `node tools/khoa.mjs xuat thi-nghiem/<trang>` chạy được cho cả 8 trang. Không còn nhận định nào `ket_qua: null`. Mọi nhận định `nhan` có `nhan`, `co_so`, `ly_do`; mọi nguồn ghi ở `nguon`, `co_so` đều có trong `nguon` của hồ sơ. Trang không có khoảng trắng cuối dòng. `nguoi.luot_1` của 8 hồ sơ có thêm "; chỗ khó: Claude Opus 5.5".

File đã chạm: 8 trang `src/content/docs/thi-nghiem/{keo-deo,pavlov,skinner,harlow,bandura,little-albert,schachter-singer,seligman}.md`, 8 hồ sơ `kiem-dinh/thi-nghiem/<trang>.yml`, ba hình `src/hinh/{harlow-contact,seligman-design,skinner-schedules}.html`, `tests/chuyen.test.mjs` (dòng `HINH_DA_SUA` và chú thích), báo cáo này.

## 1. 17 câu `null`: đã quyết

| Trang | id | Kết quả | Cách quyết |
|---|---|---|---|
| pavlov | n29 | da-sua | Không mở được Todes. Mở được chú thích của chính người dịch Gantt (1928, *Lectures on Conditioned Reflexes*, tr. 79, bản quét Internet Archive): "Conditional (условный) and not conditioned is Prof Pavlov's term…". Trang dẫn Gantt thay cho Todes, chuyển câu thuật ngữ ra khỏi khung nhãn, bỏ Todes 2014 khỏi mục Nguồn |
| pavlov | n30 | da-sua | Nhãn Đang tranh cãi giữ, có căn cứ mở được: Miller, Barnet & Grahame 1995 (Psychol Bull, tóm tắt: mô hình Rescorla–Wagner có dự đoán đúng lẫn sai), Maes và cộng sự 2016 (toàn văn: 15 thí nghiệm trên chuột nhắt và chuột cống không thu được hiệu ứng chặn) |
| pavlov | n32 | da-sua | Kamin 1969 vẫn chưa mở; mô tả hiệu ứng chặn theo Maes 2016 (phần mở đầu, Bảng 1) |
| pavlov | n37 | da-sua | Mở được toàn văn Jarius & Wildemann 2015 (tài liệu bổ sung của Springer): họ rà bản dịch Gantt, thấy nhiều chỗ nhắc chuông, kết luận "dog-and-bell scenario indeed has a factual basis" |
| harlow | n52 | da-sua | Mở bản quét bài in có hình, đọc Hình 5; sửa hình (mục 2), thêm n56–n60 cho từng con số |
| bandura | n39 | da-sua | OpenStax 6.4: "Bandura described specific steps… attention, retention, reproduction, and motivation"; bỏ năm 1977 và tên sách (không mở được), mục Nguồn thay Bandura 1977 bằng OpenStax 6.4 |
| little-albert | n46 | da-sua | Tổng quan Krypotos và cộng sự 2015 (toàn văn, PMC4508580) kể thuyết hai yếu tố của Mowrer (1951) và các điểm nó không giải thích được; viết lại theo đó, thêm vào mục Nguồn |
| schachter-singer | n32 | da-sua | Marshall & Zimbardo, Maslach 1979: vẫn chỉ có nhan đề. Mục viết lại chỉ theo nhan đề và bài phản hồi của Schachter & Singer cùng số (JPSP 37(6), 989–995); đổi tiêu đề mục (không có link `#mục` nào trỏ tới) |
| schachter-singer | n33 | da-bo | "Diễn viên vui vẻ ít ảnh hưởng": chỉ nguồn bậc 3 |
| schachter-singer | n34 | da-sua | Chỉ dựa vào nhan đề của Maslach ("Negative emotional biasing of unexplained arousal"); bỏ Marshall & Zimbardo |
| schachter-singer | n35 | da-bo | "Ám thị thôi miên": chỉ nguồn bậc 3 |
| schachter-singer | n59 | da-sua | Bỏ ví dụ cà phê, cầu thang và lời khuyên "đừng ra quyết định lớn"; dẫn phân tích tổng hợp Foster và cộng sự 1998 (kích thích làm tăng sự hấp dẫn) |
| schachter-singer | n64 | da-bo | Bỏ câu hỏi 3 (đáp án chỉ dựa vào nguồn bậc 3) |
| seligman | n7 | da-bo | Câu hỏi mở về "ý chí" của con người: không kiểm được, trái với ngộ nhận cuối trang |
| seligman | n30 | da-sua | Sửa hình (mục 2) |

## 2. Hình đã sửa (tên đã thêm vào `HINH_DA_SUA`, có `doi_chu`)

- **harlow-contact.** Đọc Hình 5 (tr. 674, "MEAN HOURS PER DAY", 1–25 ngày tuổi) và Hình 6 của bản quét. Hình cũ gộp thành một cột "mẹ vải 17–18 giờ" và một cột "mẹ sắt (có sữa) dưới 1 giờ", chú thích "đúng bằng thời gian bú rồi quay về ngay": sai, vì bài gốc tách hai nhóm 4 khỉ theo nơi có sữa, nhóm có sữa ở mẹ lưới thép ở trên mẹ lưới thép khoảng 1–2 giờ/ngày, và bài không đo thời gian bú. Hình mới có bốn cột lúc 21–25 ngày tuổi: sữa ở mẹ vải: mẹ vải ≈ 19 giờ, mẹ lưới thép dưới 1 giờ; sữa ở mẹ lưới thép: mẹ vải ≈ 16 giờ, mẹ lưới thép ≈ 2 giờ. Chú thích ghi rõ là số đọc gần đúng từ đồ thị. "Mẹ sắt" đổi thành "mẹ lưới thép". Chữ trang ("phần lớn thời gian") khớp hình.
- **seligman-design.** Nhóm đối chứng: "Không vào võng / không bị sốc trước" (cũ: "Đeo đai"); yoked: "Sốc cùng thời lượng trung bình" (cũ: "y hệt"); kết quả: "Thoát sốc bình thường" và "Phần lớn thụ động (6/8)" (cũ: "Học nhảy tốt", "Nằm im chịu đựng"); thêm số con mỗi nhóm; chú thích viết lại theo Seligman & Maier 1967 (tr. 2–3, Bảng 1).
- **skinner-schedules.** Nhãn VR "cao, đều, khó tắt dần nhất" (cũ: "rất cao, đều, bền nhất"); chú thích: "mẫu hình mà Skinner (1953) gắn với máy đánh bạc".

Ba hình giữ khuôn SVG, `currentColor`, `pz-fig-a`, `pz-fig-b`, `role="img"`, `aria-label` (đã viết lại theo chữ mới).

## 3. Nhãn đã chốt

| Trang | Khung | Lượt 1 | Chốt | Căn cứ chính |
|---|---|---|---|---|
| pavlov | học liên hệ giữa các kích thích | Vững chắc | **Vững chắc** | thêm phân tích tổng hợp điều kiện hóa nỗi sợ ở người (Duits 2015, 44 nghiên cứu), tổng quan Vervliet 2013, Hofmann 2010 |
| pavlov | tắt dần, phục hồi tự nhiên, khái quát hóa, phân biệt | Khá vững ("chi tiết thủ tục gốc") | **Vững chắc** (đổi tên khung) | Vervliet 2013 (Annual Review, động vật và người), Bouton 2004, Duits 2015 |
| pavlov | ghép đôi hay học dự báo | Đang tranh cãi (null) | **Đang tranh cãi** | Miller 1995, Maes 2016 |
| pavlov | chuông | Đã bị bác bỏ ("chính, hay duy nhất") | **Đã bị bác bỏ**, tên mới "Pavlov chỉ dùng chuông, hay ngược lại, chưa từng dùng chuông" | Pavlov 1927, Thomas 1997, Jarius & Wildemann 2015 (ở một số thí nghiệm chuông là kích thích âm mạnh nhất, nên "không phải kích thích chính" không bác được) |
| skinner | hậu quả đổi xác suất hành vi; lịch trình | Khá vững | **Vững chắc**, thu hẹp "ở động vật thí nghiệm" cho phần lịch trình | bằng chứng tích lũy, phân tích tổng hợp 47 so sánh về quản lý dự phòng ở người (Prendergast 2006, d = 0,42) |
| skinner | củng cố ngắt quãng bền hơn | Khá vững | Khá vững | không mở được tổng quan (Lewis 1960 chỉ nhan đề) |
| skinner | hai khung Đang tranh cãi | Đang tranh cãi | Đang tranh cãi | khẳng định "mọi hành vi" là diễn giải, không đủ cho Đã bị bác bỏ |
| keo-deo | hai khung Khá vững | Khá vững | Khá vững | |
| keo-deo | "định đoạt tương lai" | Đang tranh cãi | **Đã bị bác bỏ** (tên mới "thời gian chờ kẹo dẻo lúc nhỏ "định đoạt" tương lai") | Watts 2018, cùng hai phân tích có đăng ký trước: Benjamin 2020 (113 người của mẫu Bing ở tuổi gần 50, r trung bình 0,02) và Sperber 2024 (702 người ở tuổi 26) |
| harlow | ba khung | Khá vững, Khá vững, Đang tranh cãi | giữ | 4 + 4 khỉ, một phòng thí nghiệm |
| bandura | học qua quan sát | Khá vững | Khá vững | phân tích tổng hợp Taylor 2005 (117 nghiên cứu về huấn luyện theo mẫu) có kèm thực hành, nên không kiểm riêng vế "chỉ bằng quan sát, không cần thưởng" |
| bandura | giới tính (n34) | Khá vững | **bỏ khung** | một thí nghiệm, ô 6 trẻ; kết quả vẫn kể ở mục Kết quả và Lý thuyết |
| bandura | bạo lực truyền thông | Đang tranh cãi | Đang tranh cãi | |
| little-albert | nỗi sợ điều kiện hóa được ở người | Vững chắc | Vững chắc | Duits 2015, thêm Vervliet 2013 vào `co_so` (không dẫn trên trang) |
| little-albert | "không gỡ nỗi sợ ở Albert" (n35) | Vững chắc | **đổi thành `:::note`**, loại `phat-hien` | sự thật lịch sử, không phải nhãn bằng chứng |
| little-albert | hai khung Đang tranh cãi | Đang tranh cãi | giữ | |
| schachter-singer | quy nhầm kích thích làm mạnh cảm xúc | Khá vững | Khá vững | thêm phân tích tổng hợp Foster 1998; chỉ về sự hấp dẫn, quy nhầm chưa phải toàn bộ cơ chế |
| schachter-singer | phiên bản mạnh | Đang tranh cãi | Đang tranh cãi | Cotton 1981, Reisenzein 1983, nhan đề Maslach 1979; khung Đã bị bác bỏ cũ vẫn bỏ |
| seligman | hiệu ứng ở động vật; mạch thần kinh 2016 | Khá vững | Khá vững | tổng quan hệ thống Pryce 2011 không mở được (trang chặn bot) |
| seligman | trầm cảm ở người | Đang tranh cãi (căn cứ yếu) | **Đang tranh cãi**, căn cứ mới | Costello 1978 (tổng quan phê bình: "little or no support"), Abramson 1978 (chính tác giả cải biên thuyết), Sweeney 1986 (phân tích tổng hợp 104 nghiên cứu: quy kết liên hệ với điểm trầm cảm, là tương quan), Maier 2016. Không viết gì như chẩn đoán; giữ lời dẫn `/psyche/ho-tro/` |

## 4. Pavlov: rút phần Watson & Rayner

Hai đoạn kể và câu hỏi 4 (Albert) thay bằng một câu tóm, link về `/psyche/thi-nghiem/little-albert/`, không có số. n19–n26, n50 thành `da-bo`, có câu mới n56. Beck 2009, Powell 2014 rời mục Nguồn của trang.

## 5. Sửa thêm khi đọc

- keo-deo, câu hỏi 2: lời giải thích còn chữ "con em trí thức Stanford" (lượt 1 đã sửa ở chỗ khác): đã đổi.
- pavlov: khối "Xem đáp án" và câu hỏi 2 viết cho đúng phạm vi đã đếm (bảy bài giảng 1927).

## 6. `src/data/nguon.yml` (không sửa; người giao sửa trước khi khóa)

- Chưa có bản ghi: `gantt1928`, `miller1995`, `maes2016`, `duits2015`, `vervliet2013`, `bouton2004` (pavlov); `prendergast2006` (skinner); `benjamin2020`, `sperber2024` (keo-deo); `taylor2005` (bandura, chỉ ở hồ sơ); `krypotos2015` (little-albert); `schachter1979`, `foster1998` (schachter-singer); `costello1978`, `sweeney1986` (seligman); `openstax2e` (nhiều trang). Các bản ghi còn thiếu mà lượt 1 đã nêu vẫn còn.
- `todes2014` có trong `nguon.yml` nhưng trang pavlov không còn dẫn.
- Benjamin và cộng sự: DOI `10.1016/j.jebo.2019.08.016` (bản trực tuyến 2019), in năm 2020 (tập 179): trang ghi 2020.
- `suomi1972` sai (lượt 1 đã nêu).

## 7. Chỗ còn chưa chắc (lượt 2 nên xem)

- harlow: bốn con số đọc từ đồ thị (≈ 19, dưới 1, ≈ 16, ≈ 2 giờ), sai số khoảng ±1 giờ; hình ghi "≈" và "đọc gần đúng".
- schachter-singer: n34 chỉ dựa vào nhan đề của Maslach. Marshall & Zimbardo, Maslach, Schachter & Singer 1979 vẫn cần người mở bản PsycNet.
- skinner n59 (loại `lam-sang`): "phần thưởng có điều kiện" là nghĩa của tên gọi contingency management, tóm tắt Prendergast không định nghĩa.
- seligman: nếu mở được Pryce 2011 (tổng quan hệ thống) thì có thể nâng khung hiệu ứng ở động vật.
- Nhiều căn cứ mới chỉ đọc tóm tắt (Miller 1995, Duits 2015, Vervliet 2013, Bouton 2004, Prendergast 2006, Benjamin 2020, Sperber 2024, Costello 1978, Sweeney 1986, Foster 1998). Toàn văn đã đọc: Jarius & Wildemann 2015, Maes 2016, Gantt 1928 (chú thích), Harlow 1958 (bản quét có hình), Krypotos 2015, OpenStax 6.4.
- Không chạm (ngoài phạm vi): câu chuẩn đạo đức động vật chỉ dẫn OpenStax (pavlov n18, skinner, harlow); little-albert n57 (Powell 2014 chưa đọc kết luận về nỗi sợ suốt đời).

## Nguồn và cách mở (đề xuất thêm vào chuẩn)

- Tài liệu bổ sung (ESM) của Springer ở `static-content.springer.com/esm/…` có khi là bản đầy đủ của thư ngắn (Jarius & Wildemann 2015); link lấy từ trang nhóm tác giả.
- Bản dịch Pavlov của Gantt (1928) có OCR ở Internet Archive (`in.ernet.dli.2015.190960`, tệp `_djvu.txt`).
- Bản quét có hình của Harlow 1958 ở `scottbarrykaufman.com/wp-content/uploads/2015/02/Harlow-1958.pdf`; ảnh trang tách được bằng `pypdf` (`page.images`), cắt bằng Pillow.
- Europe PMC `…/rest/<PMCID>/fullTextXML` cho toàn văn PMC.
