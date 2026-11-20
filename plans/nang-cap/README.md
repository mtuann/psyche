# Kế hoạch nâng cấp: nội dung, hình, trình bày và mở rộng

Sau khi làm lại xong (17/11/2026), site có 121 trang đã khóa, nội dung đã kiểm định hai lượt. Kế hoạch này làm cho nội dung ấy **dễ đọc, dễ hiểu, dễ khám phá và an toàn hơn**:
- hình ở chỗ hình nói tốt hơn chữ, và không nói mạnh hơn chữ;
- câu hỏi kiểm tra thật sự kiểm hiểu;
- các bài nối với nhau;
- trình bày tốt trên điện thoại;
- nội dung còn thiếu.

Kiến trúc khóa và chuẩn kiểm định giữ nguyên (`../ben-vung/`). Kế hoạch chỉ thêm một trường hợp mở khóa có giới hạn (mục 4), và mở rộng công cụ khóa ở phần cần (luồng K).

| File | Nội dung |
|---|---|
| `README.md` (file này) | Hiện trạng, nguyên tắc, các luồng việc, loại thay đổi khi nâng cấp bài, thứ tự đợt, đo kết quả, việc cần quyết, rủi ro, cách lập kế hoạch, phản biện |
| `hinh.md` | Quy chuẩn hình, hệ dựng hình (`::bieu-do` sinh từ dữ liệu), việc cho 27 hình cũ, danh sách hình mới (28 mức A, 10 mức B, 2 mức C) |
| `kiem-toan/` | Sáu báo cáo kiểm toán ngày 17/11/2026: bốn nhóm trang (nội dung, hình; từng trang một), trình bày (đo trên bản build), độ phủ (so giáo trình). Là đầu mối, chưa kiểm định: lô làm việc kiểm lại (mục 9) |
| `phan-bien/` | Hai bản phản biện bản nháp, viết trong dự án (phiên AI, không phải phản biện bên ngoài): nội dung và người đọc; kỹ thuật, kiểm định và chi phí. Cách xử lý từng điểm: mục 10 |

**Trạng thái: chủ repo bảo bắt đầu làm ngày 20/11/2026** ("bắt đầu làm đi, làm từng phần theo kế hoạch nâng cấp"). Hiểu là duyệt mục 7, ý 1–3 theo đề xuất. Ý 4 (hạn tìm chuyên gia), ý 5 (Search Console, link báo lỗi), ý 6 (nhịp) và câu chữ S5 vẫn chờ chủ repo. Kế hoạch đã qua một vòng phản biện (mục 10). **Tiến độ:** NC0 xong 20/11/2026 (S1–S5, T1–T4, K1, L1 mã và dữ liệu, H1; chủ repo kiểm mẫu đạt; `bao-cao/nc0-kiem-mau.md`); trừ nút menu trang chủ (chờ quyết). Tiếp theo: NC1. Các việc đã làm khi duyệt:
- mục 3.7 thay mục 9 của `../ben-vung/them-noi-dung.md`; mục "Đọc thêm" ở mục 3 của file ấy đổi theo việc L1;
- `AGENTS.md` trỏ tới file này.

Kế hoạch đề xuất sửa `../ben-vung/chuan-kiem-dinh.md` ở sáu chỗ. Mỗi chỗ sửa ở nhánh của việc tương ứng, sau khi chủ repo duyệt (mục 7, ý 1):

| Mục của chuẩn | Đề xuất | Việc |
|---|---|---|
| 1 (loại nhận định) | Thêm loại `hinh`: tiêu đề, nhãn nhóm, chú thích, dòng giới hạn của hình | K2 |
| 3 (lượt 2 theo tầng) | `hinh` luôn qua lượt 2, kể cả ở bài mở rộng. Bài nhạy cảm kiểm đủ mọi nhận định. "Lượt 2 nhẹ" cho trường hợp 5 (mục 4) | K2; M |
| 5 (Sức khỏe tâm thần) | Áp các luật an toàn cho bài nhạy cảm ngoài lĩnh vực Sức khỏe tâm thần (mục 3.7) | M |
| 6 (khóa dữ liệu) | Khóa trường `lien_quan` của bộ `trang`, `dua_tren` của bài mở rộng, trường mới của `linh-vuc` | K1 |
| 7 (mã băm) | File dữ liệu của `::bieu-do` vào mã băm của trang | H2b |
| 8 (mở khóa) | Trường hợp 5: nâng cấp có kế hoạch (mục 4) | K2 |

`AGENTS.md` sửa theo từng việc: mục Khóa, Dữ liệu (`lien_quan`), CI (job `hinh`), bảng Mẫu trang (`::bieu-do`).

## 0. Tóm tắt

1. **Nội dung đúng nhưng khó đọc.** Bài Khám phá trung vị khoảng 3.300 chữ. Cùng một kết quả thường kể 3–7 lần trong một bài (khoảng 40 trên 51 trang được kiểm toán).
2. **Hình ít, nhỏ, có chỗ nói quá.**
   - 51 trên 78 bài nội dung không có hình.
   - Chữ trong cả 27 hình chỉ còn 4,6–7,8 px trên điện thoại.
   - Bốn hình lỗi bố cục. Một hình cột cắt trục (`loftus-verbs`, trục từ 25); một hình đặt cột của mẫu khác cùng trục (`tinh-di-truyen-theo-tuoi`).
   - Quy chuẩn mới: một trục một đại lượng, cột từ 0, giới hạn then chốt nằm trong hình (`hinh.md` mục 3.2).
3. **Câu hỏi đoán được.**
   - 370 trên 396 câu (93%) có đáp án đúng là lựa chọn dài nhất.
   - Khoảng 30% câu còn gợi ý khác: chỉ đáp án đúng có rào đón ("khoảng", "có thể"). Sự thận trọng, tinh thần của site, đã thành dấu hiệu nhận ra đáp án.
4. **Các bài ít nối với nhau.**
   - 7/51 bài Khám phá link tới bài Hiểu bằng chứng, 4/51 tới trang thí nghiệm, 2/51 tới công cụ. Trang thí nghiệm link sang Khám phá ở 1/15.
   - Mục "Đọc thêm" từ bài lõi tới bài mở rộng (`dua_tren`), mà `them-noi-dung.md` mục 3 nói là sinh lúc build, chưa được làm: 12 bài mở rộng chỉ có lối vào qua menu.
   - Trang chủ không dẫn tới Khám phá, Thí nghiệm, Hiểu bằng chứng, Ngộ nhận, Tự trải nghiệm, Sách in, và không có nút menu ở màn 360 px.
5. **Lỗi đang hiện trên site:**
   - một ghi chú nội bộ lọt vào bài Giấc mơ;
   - ba câu "khi công cụ … lên site" ở hai bài, dù công cụ đã lên;
   - ba trang Sức khỏe tâm thần có đoạn gần thành bảng tự chấm, hay có thể bị đọc như lời khuyên bỏ thuốc. Các trang này đang chờ một chuyên gia chưa có tên, không có hạn.
6. **Lĩnh vực còn mỏng.**
   - Ý thức và giấc ngủ, Căng thẳng và sức khỏe mỗi lĩnh vực chỉ có 2 bài. Học tập chưa có bài Khám phá nào (chỉ 5 trang thí nghiệm).
   - Mục "Ở Việt Nam" của phần lớn bài chỉ ghi chưa tìm thấy nghiên cứu.
7. **Làm theo thứ tự:**
   - **NC0:** sửa cái đang hiện (lỗi, Hỗ trợ, ba trang Sức khỏe tâm thần, lối vào trang chủ); dựng "Đọc tiếp" từ dữ liệu; đặt quy chuẩn và kiểm thử hình;
   - **NC1:** dựng bộ hình sinh từ dữ liệu và công cụ khóa cho nâng cấp; trang Đọc tin, lộ trình đọc;
   - **N:** nâng cấp bài theo lô tối đa 8 trang. Mỗi bài mở khóa một lần, chỉ các loại thay đổi rẻ kiểm (mục 4);
   - **M:** song song, mở rộng 18 bài theo danh sách đã xếp lại (mục 3.7), có luật an toàn cho bài nhạy cảm.
8. **Chi phí:** giai đoạn 1 (NC0, NC1, N1, M1, cộng hai công cụ) khoảng 45–65 phiên, mang phần lớn giá trị; cả kế hoạch khoảng 85–120 phiên. Đây là ước lượng, không phải cam kết: lô N1a đo thật rồi chỉnh.

## 1. Hiện trạng (đo ngày 17/11/2026, main `ccc49d1`)

| Chỉ số | Giá trị | Nguồn đo |
|---|---|---|
| Trang trên site | 121 (cộng 404), đều đã khóa | `kiem-dinh/khoa.json`, sitemap của site thật |
| Bài nội dung | 78: 51 Khám phá (39 lõi, 12 mở rộng), 15 thí nghiệm, 12 Hiểu bằng chứng; thêm 11 công cụ ở `trai-nghiem/` | `src/content/docs/`, `src/data/trang.yml` |
| Độ dài bài Khám phá | Trung vị khoảng 3.300 chữ. Dài nhất khoảng 5.300–5.700 chữ trước mục Nguồn (`tam-ly-hoc-duong`, `giac-mo`, `tri-tue-cam-xuc`). Bài Giấc mơ dài khoảng 27.000 px ở màn 360 px | Đếm chữ; `kiem-toan/kiem-trinh-bay.md` |
| Hình | 27 hình trên 27 bài; 51 bài không hình. Chữ trong hình 4,6–7,8 px ở 360 px (21 hình dưới 6 px). Bốn hình lỗi bố cục. Hai hình lỗi thiết kế: `loftus-verbs` (cột, trục từ 25), `tinh-di-truyen-theo-tuoi` (cột của mẫu khác đặt cùng trục) | `hinh.md` mục 1 |
| Câu hỏi "Thử suy ngẫm" | 396 câu, 391 câu có 3 lựa chọn. 370 câu có đáp án đúng dài nhất (93%), trung vị dài gấp 2,3 lần đáp án sai dài nhất. Đáp án đúng dài trung vị 117 ký tự; 10% từ 199 ký tự, tức 4–6 dòng ở 360 px | Đếm khối ` ```quiz ` |
| Liên kết trong thân bài | Khám phá tới Hiểu bằng chứng 7/51, tới thí nghiệm 4/51, tới công cụ 2/51. Trang thí nghiệm (15, không tính mục lục) tới Khám phá 1/15, tới Hiểu bằng chứng 2/15 | grep `/psyche/<mục>/` |
| Bài lõi dẫn tới bài mở rộng | Chưa có. `dua_tren` chỉ có ở schema và kiểm chéo, không mã nào dựng "Đọc thêm". 12 bài mở rộng chỉ có lối vào qua menu | grep `src/`; `dist/` |
| Trang chủ | Không link tới `/kham-pha/`, `/thi-nghiem/`, `/bang-chung/`, `/ngo-nhan/`, `/trai-nghiem/`, `/sach/`. Không có nút menu ở 360 px | `dist/index.html`; `kiem-toan/kiem-trinh-bay.md` A1 |
| Ngộ nhận | 60 thẻ: 42 Đã bị bác bỏ, 16 Đang tranh cãi, 2 Vững chắc, 0 Khá vững. Một trang dài khoảng 49.000 px ở 360 px, không lọc | `src/data/ngo-nhan.yml`; `kiem-toan/kiem-trinh-bay.md` |
| Bài theo lĩnh vực (Khám phá và thí nghiệm) | Ý thức và giấc ngủ 2; Căng thẳng và sức khỏe 2; Tính cách 3; Hạnh phúc 3. Học tập: 5 trang thí nghiệm, 0 bài Khám phá | `src/data/trang.yml` |
| Việt Nam | 44 câu "chưa tìm thấy nghiên cứu" ở Khám phá; 15/15 trang thí nghiệm chỉ ghi như vậy. Bổ sung có ngày chưa có khóa nên chưa lên site thật | grep; `AGENTS.md` |
| Lỗi đang hiện | Ghi chú nội bộ ở `kham-pha/cang-thang-giac-ngu/giac-mo` (mục Các lý thuyết). "khi công cụ … lên site" ở `kham-pha/tri-nho/tri-nho-lam-viec` và `kham-pha/chu-y-tri-giac/ao-giac-thi-giac` (3 câu). 4 hình lỗi bố cục | Đã kiểm lại trên repo |
| Sức khỏe tâm thần | `tram-cam`: danh sách triệu chứng kèm "ít nhất hai tuần", "suy giảm rõ", gần như tiêu chí chẩn đoán; `lo-au`: tương tự. `tri-lieu-tam-ly`: "hơn thuốc ở 6–12 tháng (g = 0,34)" chưa kèm lời dặn đừng tự ý ngừng thuốc. Bốn trang hiện dải "Chưa qua rà soát chuyên môn" | `kiem-toan/kiem-sinh-hoc-cam-xuc.md`; đã mở trang |

Điểm tốt nên giữ (theo `kiem-toan/kiem-trinh-bay.md`, mục c):
- chữ bài dễ đọc ở 360 px;
- hộp "Tóm tắt nhanh" dựng từ khung nhãn;
- khung nhãn rõ;
- dòng trạng thái kiểm định;
- công cụ ở màn đầu;
- thẻ bài có một câu kèm số liệu;
- tìm kiếm không dấu;
- không trang nào tràn ngang.

## 2. Nguyên tắc

1. **Sửa cái người đọc đang thấy trước, an toàn trước hết.** Trước hết là trang Hỗ trợ và đoạn có thể bị đọc như tự chẩn đoán; rồi chữ lỗi, lối vào cụt, hình không đọc được, câu hỏi đoán được. Thêm bài mới sau, hay song song.
2. **Giữ khóa.**
   - Nâng cấp bài là một lần mở khóa có kế hoạch (trường hợp 5, mục 4), chỉ gồm các loại thay đổi trong bảng mục 4. Phần lớn kiểm bằng máy.
   - Viết chữ mới vẫn theo chuẩn cũ: V3 cho lõi, hay làm thành đơn vị thêm.
   - Mỗi bài mở khóa một lần trong kế hoạch, trừ chín trang có lỗi đang hiện (S1, S2, S3, S5): sửa ngay, nâng cấp sau.
3. **Hình khi hình nói tốt hơn chữ, và không nói mạnh hơn chữ** (`hinh.md` mục 2, 3.2).
   - Một trục chỉ một đại lượng; cột từ 0; giới hạn then chốt nằm trong hình.
   - Số và nhãn trong hình khớp hồ sơ: máy kiểm. So sánh có hợp lệ không: lượt 2 kiểm.
4. **Cái dựng được từ dữ liệu thì dựng từ dữ liệu:** "Đọc tiếp", bài mở rộng của bài lõi, trang lĩnh vực, lối vào trang chủ. Không mở khóa trang; bản ghi dữ liệu vẫn phải khóa (câu `ve-site`, review).
5. **Mỗi lỗi chung có kiểm thử chặn** (cỡ chữ và thiết kế hình, độ dài đáp án, liên kết), để bài mới và bài vừa nâng cấp không lặp lại lỗi cũ.
6. **Đo độ đúng và lợi ích cho người đọc, không đo sản lượng.** Không đặt đích "thêm bao nhiêu hình", "cắt bao nhiêu phần trăm" (mục 6).
7. **An toàn theo nội dung, không theo lĩnh vực.** Đề xuất mở rộng chuẩn: bài chạm trẻ em, chuyện lâm sàng hay tự hại theo các luật an toàn của `chuan-kiem-dinh.md` mục 5 và qua lượt 2 đủ, dù thuộc lĩnh vực nào (mục 3.7). Nay mục 5 chỉ áp cho lĩnh vực Sức khỏe tâm thần.

## 3. Các luồng việc

**Phiên** (đơn vị ước tính) là một phiên Claude chính, kể cả các agent nó giao (lượt 2, review); khoảng nửa ngày theo lịch.
- Mốc so: kế hoạch làm lại kiểm định đầy đủ 121 trang trong 30–40 phiên, khoảng 0,3 phiên mỗi trang (`../lam-lai/README.md`).
- Lô N1a đo thời gian và token thật; các lô sau chỉnh theo đó.

| Luồng | Làm gì | Chạm trang khóa? | Model chính | Phiên |
|---|---|---|---|---|
| S. Sửa ngay | Lỗi đang hiện, Hỗ trợ, ba trang Sức khỏe tâm thần | Có: 9 trang, trường hợp mở khóa 1 | Sonnet; Opus cho S5 | 3–4 |
| T. Trình bày | Thành phần, CSS, trang chủ, trang lĩnh vực, trang Ngộ nhận, link báo lỗi | Không, trừ trang chủ (trang khung) | Sonnet; review Haiku | 4–6 |
| H. Hệ hình | Quy chuẩn và kiểm thử hình, bộ dựng `::bieu-do`, đưa dữ liệu hình vào mã băm | Không (mã) | Opus thiết kế; Sonnet | 4–7 |
| K. Khóa và kiểm bằng máy | Khóa dữ liệu của lớp nối; công cụ khóa cho trường hợp 5; kiểm bằng máy theo loại thay đổi; cổng phạm vi; kiểm thử câu hỏi | Không (mã) | Opus (khóa); Sonnet | 4–7 |
| L. Liên kết, lớp nối | "Đọc tiếp" và bài mở rộng của bài lõi; lộ trình đọc; trang "Đọc tin tâm lý trên báo"; từ điển | Không | Sonnet; Opus review khóa | 9–13 |
| N. Nâng cấp bài | 78 bài và 2 trang mục lục, 12 lô tối đa 8 trang: hình, câu hỏi, bỏ lặp, liên kết | Có, mỗi trang một lần (mục 4) | Sonnet; Opus cho Sức khỏe tâm thần | 23–33 |
| M. Mở rộng | 18 bài mới (M1, M2), 6–8 thẻ ngộ nhận | Không | Sonnet; Opus cho nhãn, câu lâm sàng, bài nhạy cảm | 24–32 |
| V. Việt Nam | Khóa cho bổ sung có ngày; lô tìm nghiên cứu Việt Nam | Không | Opus (khóa); Sonnet (tìm) | 6–9 |
| C. Công cụ | 2 mô phỏng phương pháp, 2 công cụ cho lĩnh vực chưa có | Không: mỗi công cụ một trang `trai-nghiem/` mới | Opus cho mã; Sonnet cho số liệu | 6–8 |

### 3.1 S. Sửa ngay

| Việc | Trang | Cách kiểm |
|---|---|---|
| S4 (làm đầu tiên). Thử trang Hỗ trợ với service worker bật. Một lần tải `/ho-tro/` quá 30 giây trong phiên kiểm toán, chưa tái hiện được. Gộp với việc treo "Firefox `kiem-ngoai-tuyen` thỉnh thoảng hỏng" (`../lam-lai/README.md`), cùng vùng mã | `src/scripts/ngoai-tuyen/` | Playwright: tải nhiều trang liền rồi `/ho-tro/`, có service worker. Không lặp lại được thì ghi kết luận |
| S1. Bỏ ghi chú nội bộ trong ngoặc: '(câu cũ "chính Hobson … mềm hóa lập trường" đã bỏ vì chưa mở được nguồn)'. Câu ngay trước ("Chúng tôi chưa xác nhận được việc Hobson sau này điều chỉnh lập trường") đã đủ ý, nên chỉ xóa | `kham-pha/cang-thang-giac-ngu/giac-mo` | Chỉ xóa chữ: review diff |
| S2. Đổi ba câu "khi công cụ … lên site" thành link thẳng tới công cụ đã có | `kham-pha/tri-nho/tri-nho-lam-viec`, `kham-pha/chu-y-tri-giac/ao-giac-thi-giac` | Câu `ve-site`: review; kiểm thử link |
| S5. Lô thận trọng tạm cho ba trang Sức khỏe tâm thần. Chỉ sửa theo hướng thận trọng hơn: (1) thay danh sách giống tiêu chí chẩn đoán bằng mô tả cách người có chuyên môn đánh giá và các dấu hiệu nên đi khám, dẫn tới `tim-giup-do`; (2) thêm "đừng tự ý ngừng hay đổi thuốc; hãy bàn với bác sĩ" cạnh câu so trị liệu với thuốc; (3) mục Áp dụng của `tri-lieu-tam-ly` không thành lời khuyên cá nhân. Dải "Chưa qua rà soát chuyên môn" giữ nguyên tới khi chuyên gia đọc | `kham-pha/suc-khoe-tam-than/tram-cam`, `lo-au`, `tri-lieu-tam-ly` | Chữ mới: V3, Opus lượt 1 và lượt 2 độc lập. Chủ repo duyệt câu chữ trước khi khóa |
| S3 (sau H1). Vẽ lại ba hình lỗi bố cục theo `hinh.md` mục 3.1–3.2 (cỡ chữ, hai bản bố cục, luật số liệu), kèm bảng "Xem số liệu" viết tay; giữ đúng chữ và số, không thêm chữ mới. Số "Hình N" do H3 thêm sau bằng plugin, không mở khóa lại. Nhờ vậy lô N3 không phải vẽ lại ba hình này. Hình thứ tư (`mean-vs-median`) làm trong lô N1d | `kham-pha/phat-trien/tre-hoc-noi`, `kham-pha/tam-ly-xa-hoi/bat-hoa-nhan-thuc`, `kham-pha/phat-trien/tre-hoc-the-nao` | Máy so tập số và tập từ với bản cũ (`hinh.md` mục 3.4); ảnh 360 và 1280 px. `lo-trinh-hoc-noi` đặt lại chấm cho đúng mốc tháng: lượt 2 nhẹ về cách vẽ |

- Mở khóa theo trường hợp 1 của chuẩn (lỗi phát hiện khi kiểm toán), không chờ trường hợp 5. Cách kiểm như loại thay đổi tương ứng ở mục 4.
- Nhánh: `mo/sua-ngay` (S1, S2), `mo/sktt-than-trong` (S5), `mo/hinh-loi` (S3).
- Review: Nhỏ cho chữ, Vừa cho hình, Lớn cho S5.

### 3.2 T. Trình bày (không mở khóa, trừ trang chủ)

Chi tiết và số đo: `kiem-toan/kiem-trinh-bay.md` mục (b).

| Mức | Việc | Công sức | Đợt |
|---|---|---|---|
| A | T1. Cách tạm cho 27 hình cũ ở màn hẹp: khung cuộn ngang nhận focus, SVG rộng tối thiểu khoảng 34rem (`hinh.md` mục 4.4) | S | NC0 |
| A | T2. Tiêu đề cấp 3 đang lớn hơn cấp 2 ở 360 px (24 so với 23,2 px): sửa cỡ h3 | S | NC0 |
| A | T3. Thẻ ở trang chủ chế độ sáng dùng màu link mặc định của trình duyệt: đặt màu của site | S | NC0 |
| A | T4. Trang chủ có lối vào năm mục chính (Khám phá, Thí nghiệm, Hiểu bằng chứng, Ngộ nhận, Tự trải nghiệm), mỗi thẻ một câu và số bài, dựng từ dữ liệu; thêm link Sách in và nút menu ở 360 px. `index.md` là trang khung đã khóa (5 câu `ve-site`): mở khóa theo trường hợp 1 (kiểm toán phát hiện trang chủ là lối vào cụt), chủ repo xác nhận khi duyệt (mục 7, ý 1). Chỉ thị mới ở `psyche-markdown.mjs` | S–M | NC0 |
| A | T6. Trang Ngộ nhận (chi tiết dưới bảng) | M | NC1 |
| A | T12. Link "Báo lỗi trang này" ở khung mọi trang: mở issue điền sẵn đường dẫn trang, không thông tin cá nhân. Trang Giới thiệu đã có link báo lỗi tới Issues (D8-L4; repo công khai từ 11/2026). Chủ repo quyết (mục 7, ý 5) | S | NC1 |
| B | T7. Trang lĩnh vực: màu và biểu tượng của lĩnh vực; "bắt đầu từ bài nào" (trường mới ở `linh-vuc.yml`, khóa qua K1); số thí nghiệm, công cụ, ngộ nhận thuộc lĩnh vực; thời gian đọc | M | NC1 |
| B | T8. Thời gian đọc ở đầu bài (đếm chữ trước mục Nguồn). Bớt khoảng trống trên hộp tóm tắt. Hộp từ 5 ý thì gọn lại trên màn hẹp | S | NC1 |
| B | T9. Mục Nguồn: URL DOI không ngắt giữa số. Bài trên 3.000 chữ thì thu gọn danh sách ở màn hẹp; mở khi tới `#nguon` và khi in | M | NC1 |
| B | T5. Đầu mục cấp 2 dài (từ khoảng 2.000 px ở 360 px) có dải "Trong mục này" dựng từ tiêu đề cấp 3. Chỉ có ích khi lô N đã thêm tiêu đề cấp 3 ở bài Khám phá | S–M | Sau N2a |
| C | T10. Vạch tiến độ đọc mảnh dưới thanh mục lục điện thoại. CSS bọc trong `@supports`, vì `animation-timeline` chưa chắc có ở Firefox; ba trình duyệt không được hỏng | S | Sau |
| C | T11. Nút "Lên đầu trang" ở bài dài; ở kết quả công cụ có link "Đọc giải thích" | S | Sau |

**T6, trang Ngộ nhận:**
- Chia theo lĩnh vực trong mỗi nhãn. Hàng viên lọc là link tới `#mục`, không JS.
- Các thẻ "Vững chắc" và "Khá vững" đặt dưới một mục riêng, ví dụ "Nghe như lời đồn nhưng có cơ sở", để người đọc không hiểu "ngộ nhận" là "sai".
- Thẻ thu gọn (`<details>`, mở hết khi in):
  - hiện nhãn trước, khẳng định sau, chữ thường không in đậm. Ví dụ: "Đã bị bác bỏ · Người ta hay nói: 'Con người chỉ dùng 10% bộ não.'";
  - không dựng chữ mới;
  - không lấy câu đầu của phần giải thích làm tóm tắt. Câu đầu của thẻ `can-kiet-y-chi` là "Một phân tích tổng hợp trước đây từng thấy hiệu ứng ở mức vừa."; đọc riêng thì nghe như ủng hộ ngộ nhận.
- Kỹ thuật: tiêu đề con do chỉ thị sinh không vào mục lục của Starlight. Sửa `tests/ngo-nhan.test.mjs` (đang kiểm cấu trúc theo nhãn) cùng nhánh.

Giữ luật 7 của kế hoạch làm lại: Lighthouse điện thoại từ 95 (hiệu năng), 100 (trợ năng, thực hành tốt, SEO); không lỗi axe; vùng bấm từ 44 px.

### 3.3 H. Hệ hình

Chi tiết: `hinh.md`.

- **H1. Quy chuẩn và kiểm thử hình** (NC0; `hinh.md` mục 3):
  - `tests/hinh.test.mjs`: khuôn file, hai bản bố cục, id không trùng, `data-pagefind-ignore`.
  - `tests/trinh-duyet/kiem-hinh.mjs`:
    - đo mọi chữ ở 360 px (từ 11 px, không đè, không ra ngoài);
    - chạy trên mọi trang có hình, không chỉ trang mẫu;
    - là một job `hinh` mới trong `test.yml`, `deploy.yml` và danh sách `phan` của `.github/actions/kiem-thu/action.yml`.
  - Hình theo chuẩn mới mang `data-chuan="2"`. Kiểm thử chặn hình có dấu ấy và chỉ cảnh báo hình cũ, nên không có danh sách chờ mà mọi lô cùng sửa.
  - Sửa `tests/chuyen.test.mjs` dòng 145–154 (hình phải trùng site cũ, chạy ở máy có `../psyche-zero/`): bỏ qua hình có `data-chuan="2"`.
  - Review Lớn (chạm workflow deploy).
- **H2a. Bộ dựng `::bieu-do{ten="…"}`** (NC1; `hinh.md` mục 4.1):
  - bảy loại (cột, cột ngang, cột nhóm, đường, chấm và khoảng tin cậy, trước–sau, dòng thời gian) và hình nhiều ô;
  - hai bố cục; bảng "Xem số liệu"; dòng giới hạn; dòng nguồn từ `nguon.yml`;
  - từ chối hai đại lượng trên một trục, và `min` khác 0 cho cột;
  - kiểm thử Node phân tích SVG đầu ra, so với yml; mẫu chuẩn (golden) cho mỗi loại;
  - Opus thiết kế; review Lớn.
- **H2b. Dữ liệu hình vào mã băm của trang, và H3** (NC1, sau H2a):
  - Chạm các chỗ liệt kê ở `hinh.md` mục 4.1 (`src/khoa.mjs`, hai plugin, `tools/khoa.mjs`, `src/ban-build.mjs`, kiểm thử, chuẩn và `AGENTS.md`). Trang không dùng `::bieu-do` giữ nguyên mã băm: `node tools/khoa.mjs tinh` sạch trên `khoa.json` thật.
  - Cùng nhánh, H3: đánh số "Hình N" và khuôn chú thích cho mọi hình bằng plugin (không mở khóa).
  - Opus; review Lớn.
- Vẽ lại 27 hình cũ và làm hình mới nằm trong các lô N (mục 3.6), để mỗi trang chỉ mở khóa một lần. Riêng ba hình lỗi bố cục thì làm ở S3.

### 3.4 K. Khóa và kiểm bằng máy

Kiến trúc khóa giữ nguyên. Luồng này thêm những gì trường hợp 5 và lớp nối cần, theo phản biện kỹ thuật (mục 10). Mọi việc ở nhánh `moi/nc0-…`, `moi/nc1-…`: không khớp mẫu nhánh lô `moi/d…`, nên không qua cổng phạm vi.

| Việc | Làm gì | Đợt | Model, review | Phiên |
|---|---|---|---|---|
| K1. Khóa dữ liệu của lớp nối | Trường `lien_quan` mới trong `trang.yml`: tối đa 4 đường dẫn; schema ở `src/du-lieu.mjs`. Bộ `trang` đã cho câu `ve-site` cả bản ghi (`VE_SITE_BO`), nên không cần bộ dữ liệu mới. Khóa của bản ghi `trang` mở rộng thêm `lien_quan`, và thêm `dua_tren` ở 12 bài mở rộng (nay chỉ khóa `linh_vuc`, `moi`, `tang`; trường hiện lên site thì phải khóa). Trường mới của `linh-vuc.yml` cho T7 thêm vào `VE_SITE_BO['linh-vuc']`. Khóa rộng hơn không phải mở khóa: trường đã khóa không đổi, và `tests/pham-vi.test.mjs` đã cho thay khóa `trang/<id>#linh_vuc,moi,tang` bằng khóa có thêm trường. Bản ghi có `lien_quan` thì thêm câu `ve-site` vào hồ sơ `kiem-dinh/du-lieu/trang/<id>.yml`, review, khóa lại với trường mới; bản ghi chưa có giữ khóa cũ. Kiểm thử, bộ hỏng mẫu; `chuan-kiem-dinh.md` mục 6 | NC0 | Opus; Lớn | 1–2 |
| K2. Công cụ khóa cho trường hợp 5 | `tools/khoa.mjs`: `mo --lo <lô> --truong-hop 5 --loai <loại,…>` mở cả lô, ghi `truong_hop`, `loai_thay_doi` vào lần mở khóa. `xuat --cham`: chỉ xuất nhận định bị chạm, mới, loại `hinh`, câu hỏi viết lại, kèm bảng dữ liệu của hình. Loại nhận định mới `hinh` (tiêu đề, chú thích, dòng giới hạn của hình) thuộc `LUON_KIEM`, nên luôn qua lượt 2 kể cả ở bài mở rộng. Bảng `bo_lap` trong hồ sơ. Câu chữ trường hợp 5 vào `chuan-kiem-dinh.md` mục 8 | NC1 | Opus; Lớn | 1–2 |
| K3. Kiểm bằng máy theo loại thay đổi | `tools/so-nang-cap.mjs`: so trang và hình với bản ở `main` theo `loai_thay_doi` của hồ sơ (mục 4). Hàm tách câu dùng chung, có kiểm thử. Chạy trong `npm test` cho trang có lần kiểm định cuối là trường hợp 5 | NC1 | Sonnet; Lớn | 1–2 |
| K4. Cổng phạm vi và bài mới | `plans/nang-cap/anh-xa-lo.md` (bảng lô N, M). `tests/pham-vi.test.mjs` nhận nhánh `mo/nc-<lô>` và báo cáo ở `plans/nang-cap/bao-cao/`. Đếm lô động thay cho `lo.length === 17`. `../lam-lai/anh-xa.md` có mục "Trang thêm sau kế hoạch làm lại", để thêm bài không làm đỏ `pham-vi` và `du-lieu.test`. Làm đầu NC1, vì L2, L3, C1, C2 thêm trang mới | NC1 | Sonnet; Lớn | 0,5–1 |
| K5. Kiểm thử câu hỏi | `tests/cau-hoi.test.mjs` (mục 4). Trang chặn hay chỉ cảnh báo suy từ hồ sơ, không có file danh sách miễn | NC1 | Sonnet; Vừa | 0,5 |

### 3.5 L. Liên kết và lớp nối

- **L1. Khối "Đọc tiếp"** (NC0, sau K1; mức A). Đây cũng là mục "Đọc thêm" mà `them-noi-dung.md` mục 3 hứa mà chưa làm; khi duyệt, đổi tên ở đó thành "Đọc tiếp".
  - Một khối chèn trước mục Nguồn (trang không có mục ấy thì cuối nội dung). Plugin đặt dấu chỗ lúc dựng, nên không đổi file `.md`, không đổi mã băm. Có kiểm thử cho các khuôn trang (Khám phá, thí nghiệm, Hiểu bằng chứng, bài mở rộng).
  - Phần "Đọc tiếp" lấy từ `lien_quan`, tối đa 4 mục, chỉ tên trang, không câu mô tả mới:
    - 1 bài Khám phá gần chủ đề (ưu tiên bài khác lĩnh vực);
    - 1 thí nghiệm hay thẻ ngộ nhận liên quan;
    - 1 bài Hiểu bằng chứng giải thích khái niệm bài dùng (phân tích tổng hợp, r, d, tái lập, đối chứng);
    - 1 công cụ.
  - Phần "Bài mở rộng dựa trên bài này" sinh từ `dua_tren` của các bài mở rộng. Các bài M mở rộng cần nó.
  - Chỉ hiện trường đã khóa (`truongDaKhoa`).
  - Dữ liệu cho khoảng 80 trang: 2–3 lô con theo nhóm lĩnh vực, mỗi lô một lượt review `ve-site` (Sonnet). Phán đoán từng trang, nên tốn bằng cỡ một lô thường.
  - Lấp phần lớn chỗ thiếu liên kết ở mục 1 trước cả lô N. Lô N chỉ thêm link trong thân bài ở lần đầu nhắc khái niệm hay nghiên cứu có trang nhà; "Đọc tiếp" lo phần còn lại.
- **L2. Lộ trình đọc** (NC1; mức B). Một trang khung `bat-dau/lo-trinh`, câu `ve-site`, không bộ dữ liệu mới. Bốn lộ trình:
  - "Mới bắt đầu" (6–8 bài);
  - "Phụ huynh" (8 bài đã có, theo `kiem-toan/kiem-do-phu.md` mục 3.2; thêm bài 6, 18 khi lên);
  - "Đọc tin tâm lý" (bài Hiểu bằng chứng theo thứ tự);
  - "Sinh viên" (theo khung giáo trình).
- **L3. Trang "Đọc tin tâm lý trên báo"** (NC1; mức A).
  - Bài lõi mới ở Hiểu bằng chứng (V3), đúng sứ mệnh của site.
  - Đi qua một tít báo dựng sẵn, ghi rõ là giả định, dẫn tới các bài phương pháp.
- **L4. Từ điển thuật ngữ Việt–Anh** (giai đoạn 2; mức B).
  - Trang `/thuat-ngu/` sinh từ `src/data/thuat-ngu.yml`: thuật ngữ, tiếng Anh, định nghĩa 1–2 câu, trang giải thích, nguồn.
  - Định nghĩa là nhận định (V3), mỗi mục một hồ sơ `kiem-dinh/du-lieu/thuat-ngu/<id>.yml`. Làm theo lô 60–80 mục.
  - Thêm bộ dữ liệu vào công cụ khóa (`TEP_DU_LIEU`, schema, bộ hỏng mẫu, kiểm thử): review Lớn, Opus.
  - Không tự gắn link vào bài: lô N gắn tay khi cần.

### 3.6 N. Nâng cấp bài theo lô

Mỗi bài trong lô **mở khóa một lần** (trường hợp 5, mục 4) và làm các việc dưới đây theo thẻ của trang trong `kiem-toan/` (mục "Vấn đề nội dung", "Hình", "Hình mới"). Kiểm toán là đầu mối: lô kiểm lại mọi phát hiện trước khi sửa.

1. **Hình.**
   - Vẽ lại hình cũ theo quy chuẩn, hay chuyển sang `::bieu-do`.
   - Thêm hình mới mức A của trang (`hinh.md` mục 6); mức B nếu tiện.
   - Lượt 2 về hình (`hinh.md` mục 3.5) thấy so sánh không hợp lệ thì bỏ hay hạ hình, ghi lý do.
2. **Câu hỏi** (cách viết ở mục 4):
   - viết lại để không đoán được, không đổi điều câu hỏi kiểm;
   - mỗi trang thay một câu chỉ hỏi nhớ số bằng một câu nhãn hay câu tình huống;
   - sửa câu coi suy luận chưa kiểm là đáp án đúng (ví dụ câu 1 của `phong-cach-hoc`).
3. **Bỏ lặp**, chỉ ở bài từ khoảng 3.000 chữ (đếm trước mục Nguồn).
   - Một kết quả có đủ số liệu ở tối đa hai chỗ: mục kể nghiên cứu và khung nhãn. Ở Áp dụng, Ngộ nhận và Ở Việt Nam thì giữ ý, bớt số và chi tiết. Không tính câu hỏi, lời giải thích và hộp tóm tắt (lặp có chủ đích).
   - Hai cách làm, đều kiểm bằng máy (mục 4): (a) xóa cả câu; (b) rút gọn trong câu: câu mới là câu cũ bỏ đi các cụm liền nhau, cộng tối đa một cụm nối trong danh sách cho phép ("(xem mục …)", link về trang nhà).
   - Không đặt đích độ dài; độ dài chỉ ghi lại. Ưu tiên các bài dài nhất: `tam-ly-hoc-duong`, `giac-mo`, `tri-tue-cam-xuc`, `tri-lieu-tam-ly`, `mang-xa-hoi-teen`, `the-duc-nao`.
4. **Chia mục dài.**
   - Thêm tiêu đề cấp 3, chuyển đoạn, không đổi chữ. Tiêu đề mới chỉ gọi tên chủ đề hay nghiên cứu (danh từ, tác giả và năm). Không động từ kết luận, không chip nhãn; tiêu đề có kết luận thì đi đường chữ mới.
   - Được bọc phần "Thiết kế" và "Kết quả" của nghiên cứu phụ trong `:::thu-gon[Chi tiết thiết kế và số liệu]`: bài ngắn đi trên điện thoại mà không mất chữ.
   - Không bọc khung nhãn, mục "Ở Việt Nam", câu về an toàn, hay nghiên cứu chính của trang.
5. **Liên kết trong thân bài**, ở chỗ cần:
   - lần đầu nhắc khái niệm thống kê thì link tới bài Hiểu bằng chứng;
   - lần đầu nhắc nghiên cứu có trang nhà thì link tới trang ấy;
   - phần "Tự trải nghiệm" link tới công cụ đã có.
6. **Việc nhỏ đang chờ mở khóa:**
   - id tiêu đề cũ `{ #id-cu }` (32 id ở 16 trang, `../lam-lai/doi-chieu.md` mục C): loại `lien-ket`;
   - số đọc qua bản lưu Internet Archive của bài trả phí (`../lam-lai/README.md`, "Việc treo", ví dụ `tri-tue-cam-xuc`): thay bằng nguồn mở, hay viết ở mức tóm tắt. Đây là đổi chữ và nguồn: loại `chu-moi` (V3), không phải `lien-ket`.
7. **Kể lại nghiên cứu đã có trang nhà** thì rút về một câu và link, theo cách (b) ở việc 3. Ví dụ: phần Roediger–Karpicke ở `vi-sao-ta-quen` lặp `duong-cong-quen` với bộ số khác.

Không làm trong lô N:
- thêm nghiên cứu mới vào bài (nghiên cứu mới đi thành bổ sung có ngày);
- đổi nhãn (theo thủ tục tái lập mốc);
- tách bài, chuyển nhận định sang trang khác;
- viết lại cả bài.

| Lô | Trang | Hình mới mức A | Phiên |
|---|---|---|---|
| N1a (lô đo) | Thí nghiệm: asch, bandura, darley-latane, harlow, keo-deo, khi-dot-vo-hinh, little-albert, milgram | 3 | 2–3 |
| N1b | Thí nghiệm: pavlov, pygmalion, robbers-cave, schachter-singer, seligman, skinner, zimbardo; mục lục `thi-nghiem/` | 4 | 2–3 |
| N1c | Hiểu bằng chứng: co-mau-suc-manh, dao-duc-nghien-cuu, do-lon-hieu-ung, do-luong, doc-bai-bao-khoa-hoc, khung-hoang-tai-lap | 1 | 2–3 |
| N1d | Hiểu bằng chứng: mau-va-chon-mau, p-value, phan-tich-tong-hop, thi-nghiem-doi-chung, thong-ke-mo-ta, tuong-quan-nhan-qua; mục lục `bang-chung/` | 1 | 2–3 |
| N2a | Trí nhớ, tri giác: vi-sao-ta-quen, bang-ghi-hinh, phong-cach-hoc, duong-cong-quen, tri-nho-lam-viec, ao-giac-thi-giac, nhin-ma-khong-thay, nghe-chon-loc | 4 | 2–3 |
| N2b | Tư duy, trí tuệ: da-nhiem-so, thien-kien-xac-nhan, linh-cam-va-xac-suat, tu-duy-nhanh-cham, tin-dieu-vo-ly, dunning-kruger, tri-tue-la-gi, hieu-ung-flynn | 4 | 2–3 |
| N3a | Xã hội, tính cách: phu-hop-so-dong, bat-hoa-nhan-thuc, thuyet-phuc, dinh-kien, big-five, tinh-cach-thay-doi, mbti | 2 | 2–3 |
| N3b | Phát triển: tre-hoc-the-nao, tre-hoc-noi, gan-bo, ban-sac-tuoi-teen, tam-ly-hoc-duong, mang-xa-hoi-teen, tuoi-gia | 3 | 2–3 |
| N4a | Cơ sở sinh học: nao-che-doi, gen-va-tinh-cach, nao-tuoi-teen, dopamine, tam-ly-tien-hoa, the-duc-nao | 1 | 1,5–2 |
| N4b | Cảm xúc, căng thẳng: cam-xuc-co-ban, thuong-va-dong-luc, dieu-tiet-cam-xuc, tri-tue-cam-xuc, stress-co-hai, doi-pho-stress | 3 | 1,5–2 |
| N4c | Giấc ngủ, hạnh phúc: ngu-va-tri-nho, giac-mo, tien-va-hanh-phuc, do-hanh-phuc, dong-chay-flow | 2 | 1,5–2 |
| N5 | Sức khỏe tâm thần: tram-cam, lo-au, tim-giup-do, tri-lieu-tam-ly | Chỉ cùng chuyên gia | 2–3, cộng thời gian chuyên gia |

Lô tối đa 8 trang, vì kiểm thử trình duyệt, axe và Lighthouse chỉ chạy trên tối đa 8 trang đổi (`TOI_DA_TRANG_DOI` trong `tools/trang-mau.mjs`). Hình thì job `hinh` quét toàn site.

Mỗi lô:
1. nhánh `mo/nc-<lô>` (cổng phạm vi, K4); `node tools/khoa.mjs mo --lo <lô> --truong-hop 5 --loai …`;
2. đo đoán mù trước khi sửa (mục 4; Haiku);
3. agent làm (Sonnet);
4. kiểm bằng máy (`tools/so-nang-cap.mjs`, kiểm thử hình, câu hỏi, link);
5. lượt 2 nhẹ do agent khác làm (Sonnet), trên `xuat --cham`;
6. đo đoán mù sau khi sửa; review diff; chủ repo xem ngẫu nhiên khoảng 5 thay đổi (`xuat --mau 5`);
7. rebase lên `main`, `node tools/khoa.mjs tinh` sạch, rồi khóa lại;
8. gộp tuần tự. Không gộp song song hai lô cùng chạm `src/data/nguon.yml` hay `trang.yml`.

Báo cáo ở `plans/nang-cap/bao-cao/<lô>.md`: thời gian, model, số đo hình, tỉ lệ đoán mù trước và sau, số nhận định bị lượt 2 chấm `sai` hay `qua-manh`. Sau N1a, chủ repo xem số đo rồi quyết đi tiếp như kế hoạch hay chỉnh.

### 3.7 M. Mở rộng nội dung (thay mục 9 của `../ben-vung/them-noi-dung.md`)

Xếp lại theo kiểm toán độ phủ (`kiem-toan/kiem-do-phu.md`) và phản biện (mục 10). Ba thay đổi so với mục 9:
- **giấc ngủ lên đầu:** lĩnh vực mỏng, người đọc cần nhiều;
- **thêm chủ đề đời sống người đọc cần, có đủ bằng chứng để viết kèm nhãn:** nuôi dạy con, màn hình, quan hệ, công việc, thi cử, trắc nghiệm. Phần lớn là bài mở rộng, vì bằng chứng còn biến động;
- **tầng theo độ chín của bằng chứng** (`../ben-vung/README.md` mục 2), không theo chỉ tiêu. Đích: mỗi lĩnh vực có ít nhất 3 bài (lõi hay mở rộng, kể cả thí nghiệm), trong đó ít nhất một bài trả lời một câu hỏi đời thường.

Số của bài là mã cố định (giữ từ bản nháp, để đối chiếu với phản biện), không phải thứ tự.

Bài mới viết theo chuẩn mới ngay từ đầu: hình theo `hinh.md`, câu hỏi theo mục 4 (có một câu nhãn), link trong thân bài, trường `lien_quan`. Phiếu đề xuất (`them-noi-dung.md` mục 3) thêm hai dòng:
- đã tìm nghiên cứu và số liệu chính thức Việt Nam ở đâu, ngày tìm. Tìm được thì đưa thẳng vào bài, theo luật ở mục 3.8;
- với bài nhạy cảm: rủi ro và cách viết (bảng dưới).

**M1** (8 bài; 10–14 phiên):

| # | Bài (dạng câu hỏi) | Lĩnh vực | Tầng | Ghi chú |
|---|---|---|---|---|
| 1 | Ngủ bao nhiêu là đủ, và vì sao đồng hồ sinh học quan trọng? | Ý thức và giấc ngủ | lõi | Mục 9, A. Gồm cả ngủ trưa. "Ngủ trước 11 giờ để gan thải độc" viết ở mục Ngộ nhận của bài; thẻ ngộ nhận, nếu làm, đi cùng bài |
| 2 | Học bằng liên tưởng và hệ quả: điều kiện hóa là gì? | Học tập | lõi | Mục 9, A. Bài nối 5 trang thí nghiệm, mỗi thí nghiệm một câu và link |
| 3 | Giả dược có tác dụng thật không? | Căng thẳng và sức khỏe | lõi | Mục 9, A. Nối công cụ C1: hồi quy về trung bình là một phần của "đáp ứng giả dược" |
| 4 | Nhu cầu nào thúc đẩy ta? Từ tháp Maslow tới thuyết tự quyết | Cảm xúc và động lực | lõi | Mục 9, A; khớp thẻ `thap-maslow` |
| 5 | Quan hệ gần gũi có làm ta khỏe và hạnh phúc hơn? | Hạnh phúc | mở rộng | Bằng chứng chủ yếu là liên hệ quan sát. `dua_tren`: `do-hanh-phuc`, `gan-bo` |
| 6 | Đánh con có làm con ngoan hơn? | Phát triển | mở rộng | Nhu cầu phụ huynh cao, có phân tích tổng hợp lớn |
| 8 | Thiền và chánh niệm: khoa học nói gì? | Căng thẳng và sức khỏe | mở rộng | Mục 9, A tách đôi; thôi miên đã có thẻ `thoi-mien` |
| 18 | Màn hình ảnh hưởng thế nào tới trẻ dưới 5 tuổi, và các khuyến nghị dựa trên gì? | Phát triển | mở rộng | Từ M2 lên, vì nhu cầu phụ huynh cao. Nên có chuyên gia đọc |

**M2** (10 bài; 14–18 phiên):

| # | Bài | Lĩnh vực | Tầng | Ghi chú |
|---|---|---|---|---|
| 7 | Neuron và chất dẫn truyền thần kinh: tín hiệu đi thế nào? | Cơ sở sinh học | lõi | Mục 9, A; bài nền cho `dopamine` (`dua_tren`). Từ M1 xuống |
| 9 | Vì sao ta vội cho rằng người khác "vốn tính thế"? (lỗi quy kết cơ bản) | Tâm lý xã hội | lõi | Mục 9, B. Phân biệt với bất đối xứng người làm–người xem và thiên lệch vị kỷ; khác biệt giữa các nền văn hóa (cần mở nguồn). Kèm công cụ C3 |
| 10 | Tính cách hay hoàn cảnh quyết định ta làm gì? | Tính cách | lõi | Mục 9, B, đổi góc. Với bài 9: mỗi nghiên cứu chỉ kể chi tiết ở một bài |
| 11 | Căng thẳng kéo dài làm cơ thể ra sao? | Căng thẳng và sức khỏe | lõi | Chỉ phần đã chín: căng thẳng và miễn dịch, nghiên cứu cảm lạnh. "Suy tuyến thượng thận" làm khung ngộ nhận (cần mở nguồn) |
| 12 | Mức hạnh phúc của mỗi người có thay đổi được không? | Hạnh phúc | lõi | Chỉ phần đã chín: thích nghi khoái lạc, điểm đặt. "Chiếc bánh 40%" vào khung tranh cãi |
| 13 | Tin rằng mình có thể tiến bộ có giúp học tốt hơn? | Phát triển | mở rộng | |
| 14 | Kiệt sức vì công việc: chuyện thật hay chỉ là mệt? | Căng thẳng và sức khỏe | mở rộng | |
| 15 | Lo âu thi cử: vì sao, và cách nào có bằng chứng giúp? | Phát triển | mở rộng | Không tách từ `tam-ly-hoc-duong` (tách là chuyển nhận định giữa trang, mục 4 không có). Bài mới link tới bài ấy trong thân bài; chiều ngược qua `lien_quan`. Nghiên cứu Trần 2024 tóm một câu và link về |
| 16 | Não có còn thay đổi sau tuổi thơ? (tính dẻo) | Cơ sở sinh học | lõi | Mục 9, A |
| 19 | Trắc nghiệm tính cách, năng khiếu nào đáng tin? | Tính cách | lõi | Thay bài 17 (các loại trí nhớ, xuống M3). Phần đã chín: độ tin cậy, độ hiệu lực của phép đo. MBTI trong tuyển dụng, thần số học, sinh trắc vân tay làm thẻ ngộ nhận. Nối `mbti`, `big-five`, `tri-tue-la-gi` |

**M3** (chọn dần, chủ repo duyệt từng bài; thứ tự theo danh sách câu hỏi đời thường ở mục 6 khi có):
- Cần chuyên gia, Opus hai lượt, theo hạn chuyên gia (mục 7, ý 4):
  - "Thế nào là rối loạn tâm thần, và vì sao còn kỳ thị?" (nhu cầu cao nhất theo `kiem-do-phu.md`);
  - sang chấn tâm lý;
  - "ADHD và tự kỷ: khi nào nên đưa con đi đánh giá?" (`kiem-do-phu.md` mục 2.2).
- Có những loại trí nhớ nào? (bài 17, từ M2 xuống).
- Lịch sử và các trường phái (mục 9, A, hạ xuống).
- Chơi game bao nhiêu thì thành vấn đề.
- Làm việc nhóm và lười nhóm.
- Hấp dẫn (mục 9, B, tách riêng).
- Thuyết tâm trí (mục 9, B).
- Ngôn ngữ có định hình tư duy (mục 9, B).
- Giải quyết vấn đề và sáng tạo (mục 9, B, gộp).
- Phát triển đạo đức (mục 9, B, hạ).
- Cơn đau.
- Ảnh chụp não nói được gì.
- Điện thoại ban đêm và giấc ngủ tuổi teen (có thể thành bổ sung cho bài 1).

**Bài nhạy cảm** (bài 3, 6, 8, 11, 14, 15, 18; bài 1 ở phần thuốc ngủ; các bài M3 cần chuyên gia; thẻ ngộ nhận lâm sàng): đề xuất áp các luật an toàn của `../ben-vung/chuan-kiem-dinh.md` mục 5, dù thuộc lĩnh vực nào (sửa chuẩn: bảng ở đầu file).
- Lượt 2 kiểm mọi nhận định (V3), kể cả bài mở rộng. Opus cho nhãn và câu `lam-sang`.
- Hỗ trợ ở đầu và cuối bài. Bài 6, 15, 18 dẫn tới Tổng đài 111 (đã có ở trang Hỗ trợ).
- Không có danh sách dấu hiệu để tự chấm.
- Không khuyên dùng, ngừng hay thay điều trị.
- Nói về tự hại theo hướng dẫn đưa tin an toàn: không gắn với một nguyên nhân, không kể trường hợp cụ thể.

| Bài | Rủi ro, cách viết (điều cần mở nguồn ghi rõ) |
|---|---|
| 1. Giấc ngủ | Không khuyên dùng thuốc ngủ hay melatonin; mất ngủ kéo dài thì đi khám; khuyến nghị theo tuổi ghi nguồn và năm |
| 3. Giả dược | Không gợi ý thay điều trị bằng "niềm tin". Phân biệt hiệu ứng giả dược với diễn tiến tự nhiên và hồi quy về trung bình. Hiệu ứng chủ yếu ở triệu chứng tự báo (cần mở nguồn) |
| 6. Đánh con | Nói cả sự tuân thủ ngay lúc ấy lẫn kết cục lâu dài; nói rõ tranh luận về nhân quả; nêu các cách thay thế đã có thử nghiệm; giọng không lên lớp. Điều luật là câu `thoi-su`, có hạn |
| 8. Thiền | Chỉ bàn chương trình thế tục đã có thử nghiệm (MBSR, MBCT); không đánh giá giáo lý hay việc tu tập. Nêu tác dụng phụ. MBCT là câu `lam-sang`, không khuyên thay điều trị |
| 11. Căng thẳng kéo dài | Triệu chứng cơ thể cần đi khám trước khi quy cho căng thẳng |
| 14. Kiệt sức | Kiệt sức là "hiện tượng nghề nghiệp" trong ICD-11, không phải chẩn đoán (cần mở nguồn). Phân biệt với trầm cảm. Không thang tự chấm |
| 15. Lo âu thi cử | Không gắn tự tử với điểm thi, không kể trường hợp cụ thể |
| 18. Màn hình | Không danh sách dấu hiệu tự kỷ. "Tự kỷ ảo" không phải chẩn đoán (cần kiểm ICD-11, DSM-5-TR). Thấy dấu hiệu chậm phát triển thì đưa trẻ đi đánh giá. Nói rõ độ chắc chắn của khuyến nghị WHO năm 2019 (cần mở nguồn) |

**Thẻ ngộ nhận mới** (chọn 6–8 trong các ứng viên dưới, song song M2; thẻ gắn với một bài M thì đi cùng bài ấy):
- **Không chỉ thẻ "sai".** Nay 60 thẻ có 2 Vững chắc, 0 Khá vững. Chọn thêm vài khẳng định nghe như lời đồn mà có thể có cơ sở, gắn với bài mới: ví dụ ngủ trưa ngắn và sự tỉnh táo buổi chiều (bài 1), giả dược và triệu chứng tự báo (bài 3). Nhãn theo thước đo của chuẩn, không theo chỉ tiêu. Khẳng định trùng thẻ đã có, kể cả ở dạng ngược, thì bỏ.
- **Viết đúng khẳng định cần chấm:**
  - "Đánh đòn làm con ngoan hơn về lâu dài", không phải "Đánh con làm con ngoan" (sự tuân thủ ngay lúc ấy có liên hệ thuận với đòn roi; cần mở nguồn);
  - "Qua 3 tuổi là muộn, không bù được", không phải "0–3 tuổi quan trọng".
- **Khẳng định phổ biến ở Việt Nam** (xác nhận mức phổ biến trước khi viết):
  - sinh trắc vân tay cho biết năng khiếu bẩm sinh;
  - thần số học cho biết tính cách;
  - phải ngủ trước 11 giờ đêm để gan thải độc;
  - cung hoàng đạo và tính cách; thứ tự sinh; quảng cáo tiềm thức; đa trí tuệ.
- **Thẻ lâm sàng** ("năm giai đoạn đau buồn"; "xem màn hình nhiều gây tự kỷ ảo"): Opus, dẫn tới Hỗ trợ. Thẻ "tự kỷ ảo" cần chuyên gia.

**Thêm một bài: danh sách việc** (thiếu một việc thì kiểm thử đỏ):
- bản ghi `src/data/trang.yml`: `tang`, `linh_vuc`, `chu_de`, `lien_quan`; bài mở rộng thêm `dua_tren`, `kiem_lai_truoc`;
- bảng `../lam-lai/anh_xa.py`, sinh lại `anh-xa.md` (mục "Trang thêm sau kế hoạch làm lại", K4);
- `src/data/nguon.yml`; `src/data/nghien-cuu.yml` nếu bài là trang nhà mới;
- hồ sơ `kiem-dinh/<trang>.yml`;
- trang ngoài 14 lĩnh vực (lộ trình, từ điển, đọc tin) thì thêm nhóm ở `src/menu.mjs`;
- `AGENTS.md` (số trang, bộ dữ liệu, bảng mẫu trang khi có khối mới);
- bài lõi: `../ben-vung/README.md` mục 3 (bảng chỗ trống).

**Gánh nặng về sau.**
- M1–M2 thêm 7 bài mở rộng (5, 6, 8, 13, 14, 15, 18): khoảng 7 lần xem lại mỗi 12–18 tháng.
- Bài lõi mới cần chủ repo thêm chủ đề vào bảng chỗ trống: bài 11, 12, 19 chưa có trong bảng; bài 10 thay chủ đề "Các cách tiếp cận tính cách" của bảng.

### 3.8 V. Việt Nam

- **V0. Khóa cho bổ sung có ngày** (NC1; Opus, review Lớn):
  - hồ sơ `kiem-dinh/bo-sung/…`;
  - mã băm riêng;
  - bản thật hiện bổ sung đã khóa.

  Đây là điều kiện để mọi bổ sung (Việt Nam, bằng chứng mới) lên site.
- **V1. Lô tìm nghiên cứu Việt Nam theo chủ đề** (giai đoạn 2). Mỗi phát hiện là một bổ sung `viet-nam`, kiểm V3. Luật:
  - chỉ dùng bài có bình duyệt hay số liệu chính thức (cơ quan thống kê quốc gia, ghi đúng tên cơ quan tại thời điểm công bố; UNICEF MICS; khảo sát quốc gia); không suy từ tin báo;
  - số liệu Việt Nam đo khác cách đo của nghiên cứu nước ngoài thì không xếp hạng, không so trực tiếp. Mẫu tốt: `mang-xa-hoi-teen` ("đo khác nên không so trực tiếp được");
  - không viết "người Việt…" từ một mẫu; ghi mẫu, năm và cách đo ngay trong câu;
  - bổ sung cho trang Sức khỏe tâm thần: Opus, theo chuẩn mục 5.

  Hướng tìm (chưa kiểm):
  - sức khỏe tâm thần vị thành niên (khảo sát NAMHS 2021, đã có ở `mang-xa-hoi-teen` và `tam-ly-hoc-duong`) cho `tram-cam`, `lo-au`;
  - thụ đắc thanh điệu cho `tre-hoc-noi`;
  - dùng điện thoại khi lái xe máy cho `da-nhiem-so`;
  - nghiên cứu đa quốc gia có mẫu Việt Nam.
- **Đích:**
  - giai đoạn 1: có đường khóa (V0); bài M1 tự có số liệu Việt Nam khi tìm được (ví dụ giấc ngủ học sinh, sinh viên cho bài 1; kỷ luật trẻ em theo MICS cho bài 6);
  - cả kế hoạch: khoảng 10–15 bổ sung.
  - Không đủ nguồn thì giữ câu "chưa tìm thấy" có mốc; máy canh nhắc khi tới hạn.

### 3.9 C. Công cụ mới

- Theo khuôn công cụ (`AGENTS.md`). Mỗi công cụ một trang `trai-nghiem/<tên>` mới, như 11 công cụ hiện có, nên không mở khóa bài phương pháp.
- Bài liên quan dẫn tới công cụ qua `lien_quan` ("Đọc tiếp"). Link trong thân bài thêm khi bài ấy được nâng cấp sau khi công cụ đã lên.
- Opus viết mã; số liệu nghiên cứu vào hồ sơ; kiểm thử luồng trên ba trình duyệt.

| Mức | Công cụ | Bài liên quan | Vì sao | Đợt |
|---|---|---|---|---|
| A | C1. Hồi quy về trung bình (mô phỏng) | `bang-chung/thi-nghiem-doi-chung`, bài 3 | Khái niệm chưa có chỗ dạy, dùng ở nhiều bài (Dunning–Kruger, can thiệp, giả dược) | Song song NC1, trước N1 |
| A | C2. Cỡ mẫu và công suất (kéo thanh) | `bang-chung/co-mau-suc-manh` | Dạy "nghiên cứu nhỏ hay sai" tốt hơn chữ | Song song NC1, trước N1 |
| B | C3. Lỗi quy kết (kiểu Jones–Harris) | Bài 9 | Lĩnh vực xã hội chưa có công cụ. Đề tài bài luận thật trung tính, không dùng chuyện đang nóng ở Việt Nam (như dạy thêm) | Cùng bài 9 |
| B | C4. Lịch tăng cường (nút nhấn) | `thi-nghiem/skinner`, bài 2 | Lĩnh vực học tập chưa có công cụ. Không nói "mạng xã hội gây nghiện" | Sau M1 |
| C | p "săn" ngẫu nhiên; độ chồng lấp theo d; gộp phân tích tổng hợp | `p-value`, `do-lon-hieu-ung`, `phan-tich-tong-hop` | Làm khi C1, C2 được dùng | Sau |

Không công cụ tự chẩn đoán. Công cụ cho ra con số về người dùng thì nói rõ đó là một lần đo.

### 3.10 File chạm, nhánh và mức review

| Việc | File chính | Nhánh | Review |
|---|---|---|---|
| S1, S2 | 3 trang `.md`, hồ sơ, `kiem-dinh/khoa.json` | `mo/sua-ngay` | Nhỏ; review câu `ve-site` |
| S3 | 3 file `src/hinh/*.html`, 3 trang (mã băm), hồ sơ | `mo/hinh-loi` | Vừa |
| S4 | `src/scripts/ngoai-tuyen/`, `tests/trinh-duyet/kiem-ngoai-tuyen.mjs` | `moi/nc0-ho-tro` | Vừa |
| S5 | 3 trang Sức khỏe tâm thần, hồ sơ | `mo/sktt-than-trong` | Lớn (Opus); chủ repo duyệt câu chữ |
| T1–T3 | `src/styles/psyche.css`, `thanh-phan.css` | `moi/nc0-trinh-bay` | Vừa |
| T4 | `src/content/docs/index.md` (mở khóa), `src/plugins/psyche-markdown.mjs` (chỉ thị mới), `src/components/` (nút menu) | `moi/nc0-trang-chu` | Vừa |
| K1 | `src/du-lieu.mjs`, `src/khoa.mjs`, `tools/khoa.mjs`, `src/data/trang.yml`, `linh-vuc.yml`, `tests/du-lieu.test.mjs`, `tests/du-lieu-hong/`, `tests/khoa.test.mjs`, `chuan-kiem-dinh.md`, `AGENTS.md` | `moi/nc0-khoa-du-lieu` | Lớn (Opus) |
| L1 | Thành phần "Đọc tiếp", plugin đặt dấu chỗ, `src/data/trang.yml` (`lien_quan`), `kiem-dinh/du-lieu/trang/` | `moi/nc0-doc-tiep` (mã); `moi/nc0-lien-quan-<nhóm>` (dữ liệu) | Vừa (mã); review `ve-site` (dữ liệu) |
| H1 | `tests/hinh.test.mjs`, `tests/trinh-duyet/kiem-hinh.mjs`, `.github/workflows/test.yml`, `deploy.yml`, `.github/actions/kiem-thu/action.yml`, `tests/chuyen.test.mjs` | `moi/nc0-kiem-hinh` | Lớn (workflow deploy) |
| H2a | `src/plugins/bieu-do.mjs`, `src/plugins/thanh-phan.mjs`, `src/styles/thanh-phan.css`, `tests/bieu-do.test.mjs`, `tests/tim-kiem.test.mjs`, `tests/sach.test.mjs` | `moi/nc1-bieu-do` | Lớn |
| H2b, H3 | `src/khoa.mjs`, `src/plugins/psyche-markdown.mjs`, `thanh-phan.mjs`, `tools/khoa.mjs`, `src/ban-build.mjs`, `tests/khoa.test.mjs`, `tests/thanh-phan.test.mjs`, `chuan-kiem-dinh.md`, `AGENTS.md` | `moi/nc1-bieu-do-khoa` | Lớn (Opus) |
| K2 | `tools/khoa.mjs`, `tests/khoa.test.mjs`, `chuan-kiem-dinh.md` mục 8 | `moi/nc1-khoa-nang-cap` | Lớn (Opus) |
| K3 | `tools/so-nang-cap.mjs`, `tests/so-nang-cap.test.mjs` | `moi/nc1-so-nang-cap` | Lớn |
| K4 | `plans/nang-cap/anh-xa-lo.md`, `tests/pham-vi.test.mjs`, `../lam-lai/anh_xa.py`, `anh-xa.md` | `moi/nc1-pham-vi` | Lớn |
| K5 | `tests/cau-hoi.test.mjs` | `moi/nc1-cau-hoi` | Vừa |
| V0 | `src/khoa.mjs`, `tools/khoa.mjs`, thành phần bổ sung, `kiem-dinh/bo-sung/` | `moi/nc1-khoa-bo-sung` | Lớn (Opus) |
| T6–T9, T12 | `src/plugins/thanh-phan.mjs` (ngộ nhận), `tests/ngo-nhan.test.mjs`, `src/components/`, CSS, `linh-vuc.yml` | `moi/nc1-trinh-bay` | Vừa |
| L2, L3 | Trang mới, `trang.yml`, `anh-xa`, `src/menu.mjs`, hồ sơ | `them/nc1-lo-trinh`, `them/nc1-doc-tin` | Theo chuẩn bài mới |
| Lô N | Trang của lô, hồ sơ, `src/hinh/`, `khoa.json`, `nguon.yml` | `mo/nc-<lô>` (cổng phạm vi) | Lượt 2 nhẹ, review diff |
| Bài M | Danh sách việc ở mục 3.7 | `them/<tên>` | Theo `them-noi-dung.md` |

## 4. Nâng cấp bài: loại thay đổi và mức kiểm (đề xuất trường hợp mở khóa 5)

Đề xuất thêm vào `../ben-vung/chuan-kiem-dinh.md` mục 8:

> **5. Nâng cấp có kế hoạch** theo `plans/nang-cap/README.md`: chỉ các loại thay đổi trong bảng mục 4 của kế hoạch ấy, mỗi trang một lần, theo lô trong `plans/nang-cap/anh-xa-lo.md`. Lệnh `node tools/khoa.mjs mo --lo <lô> --truong-hop 5 --loai <loại,…>`; lượt 2 chỉ kiểm phần bị chạm (`xuat --cham`). Thay đổi khác loại thì theo trường hợp 1–4, hay thành đơn vị thêm. Không dùng cho: đổi nhãn, thêm nghiên cứu, tách bài hay chuyển nhận định sang trang khác, viết lại cả bài.

**Lượt 2 nhẹ** (dùng trong bảng): lượt 2 do một agent khác làm độc lập, như chuẩn mục 3, nhưng chỉ trên phần bị chạm (danh sách `xuat --cham`, K2) và theo câu hỏi của từng loại thay đổi, thay vì mọi nhận định của trang.

| Loại (`loai_thay_doi`) | Ví dụ | Máy kiểm (K3, kiểm thử) | Người, agent kiểm | Model |
|---|---|---|---|---|
| `ve-site`: bỏ chữ lỗi, câu về site hết đúng | Câu về site hết đúng gặp trong lô N (cách kiểm như S1, S2) | Kiểm thử link | Review câu `ve-site` | Sonnet; review Haiku |
| `ve-lai-hinh`: vẽ lại hình, cùng số và chữ | Phần lớn 27 hình cũ | So với bản ở `main` (`git show main:src/hinh/<tên>.html`; bản hẹp tách `<tspan>`, nên không so chuỗi nguyên): tập số bằng nhau; tập từ mới nằm trong tập từ cũ, cộng dòng nguồn dựng từ dữ liệu. Chỉ được bớt câu lặp trong SVG. Đo cỡ chữ; ảnh 360 và 1280 px | | Sonnet |
| `sua-thiet-ke-hinh`: vẽ lại hình có đổi cách vẽ hay thêm chữ (dòng giới hạn, nhãn, thành phần) | `loftus-verbs` (trục từ 25), `tinh-di-truyen-theo-tuoi` (cột của mẫu khác); dòng giới hạn thêm vào hình cũ | Như trên, trừ chỗ đổi có lý do ghi ở hồ sơ (`doi_chu`). Chữ thêm là nhận định `hinh` | Lượt 2 nhẹ về cách vẽ (`hinh.md` mục 3.5); nhận định `hinh` qua lượt 2 | Sonnet; lượt 2 Sonnet |
| `hinh-moi`: hình mới từ nhận định đã có | Phần lớn hình mới | `hinh.md` mục 3.4: số trọn vẹn, có dấu, khớp câu của nhận định; `gia_tri` bằng số của `hien`; cụm `khop` có trong câu; `suy_ra` tính lại được; một đại lượng mỗi trục; cột từ 0 | Lượt 2 nhẹ về cách vẽ. Nhận định loại `hinh` (tiêu đề, chú thích, dòng giới hạn) luôn qua lượt 2 | Sonnet; lượt 2 Sonnet |
| `hinh-so-moi`: hình cần số chưa có trên trang | `ca-phe-dao-chieu` (số từ bảng của Freedman 2012, nguồn đã có ở hồ sơ và trang) | Như `hinh-moi` | V3 đủ, như nhận định mới. Chỉ dùng nguồn đã có ở hồ sơ của trang; nguồn mới thì đi bổ sung có ngày | Sonnet; lượt 2 độc lập |
| `cau-hoi`: viết lại câu hỏi | 370 câu | Kiểm thử câu hỏi (dưới bảng); đo đoán mù | Lượt 2: đáp án đúng vẫn đúng theo lời giải thích và hồ sơ; mỗi đáp án sai sai rõ ở một chi tiết, và không trái nhận định nào của trang (phương án nhiễu là ví dụ giả định, chuẩn mục 1); đúng một đáp án đúng; câu không đổi điều nó kiểm | Sonnet; lượt 2 Sonnet, không Haiku |
| `cau-hoi-moi`: câu nhãn, câu tình huống | Mỗi trang một câu | Câu nhãn: đáp án là `nhan` của một nhận định có sẵn, lời giải thích dùng `ly_do` của nó. Câu tình huống: tình huống là ví dụ giả định; mỗi câu của lời giải thích trỏ tới một id nhận định có sẵn | Lượt 2 nhẹ | Sonnet |
| `bo-lap`: bỏ lặp (xóa câu, rút trong câu) | Kết quả kể 3–7 lần | Xem dưới bảng | Review đọc diff: nhận định còn đủ. Lượt 2 nhẹ đọc các đoạn bị đánh dấu | Sonnet; review Sonnet |
| `cau-truc`: thêm tiêu đề cấp 3, chuyển đoạn, bọc thu gọn | Chia mục dài | Tập câu không đổi (bỏ dòng tiêu đề và dòng `:::`) | Tiêu đề mới chỉ gọi tên chủ đề hay nghiên cứu: review như câu `ve-site` | Sonnet |
| `lien-ket`: link nội bộ, id tiêu đề cũ | Mục 3.6, việc 5; id tiêu đề cũ ở việc 6 | Kiểm thử link có sẵn | | Haiku |
| `chu-moi`: chữ mới, viết lại câu, đổi nguồn | Câu nối khi gộp mục; giải thích thuật ngữ; thay số đọc qua bản lưu Internet Archive | | V3 cho câu chạm, như mở khóa thường (mục 8 hiện hành) | Sonnet; lượt 2 độc lập |

Máy chỉ bắt "số và nhãn có trong hồ sơ, chữ không mất". "Gán đúng nhóm, thang đúng, nhận định còn đủ" là việc của lượt 2 nhẹ và review.

**Máy kiểm bỏ lặp** (`bo-lap`). So với bản ở `main`; câu tách bằng hàm dùng chung. Máy kiểm:
- mọi câu của bản mới là câu cũ, hay câu cũ bỏ đi các cụm liền nhau cộng tối đa một cụm nối cho phép;
- không mất chuỗi số, cặp "họ tác giả (năm)", link nội bộ, `{ #id }`, khung nhãn, khối quiz nào: mỗi thứ còn ít nhất một lần;
- cụm bị bỏ không chứa từ phủ định, từ rào đón hay tên nhãn ("không", "chưa", "chỉ", "khoảng", "có thể", "theo", "nhưng", "ở mẫu"…; danh sách ở `so-nang-cap.mjs`, chỉnh sau N1a);
- mỗi câu bị xóa hay rút có dòng `bo_lap` trong hồ sơ (câu, id nhận định, chuỗi còn lại ở đâu); máy kiểm chuỗi ấy có thật trong trang mới;
- câu ngay sau chỗ xóa mà mở đầu bằng "Điều này", "Con số ấy", "Kết quả này", "Như vậy" thì đánh dấu, để lượt 2 nhẹ đọc lại cả đoạn.

Lý do: `cau` của hồ sơ là câu diễn đạt lại, chỉ 6% có nguyên văn trong trang. `o_dau` chỉ có ở 3 hồ sơ và không mã nào đọc. Nên máy không tự biết "nhận định còn ở chỗ khác": bảng `bo_lap` và review lo phần ấy.

**Kiểm thử câu hỏi** (`tests/cau-hoi.test.mjs`, K5). Mỗi trang:
- đáp án đúng dài nhất ở không quá một nửa số câu;
- đáp án đúng ngắn nhất ở không quá một nửa số câu (chặn sửa quá tay);
- không câu nào có đáp án đúng dài hơn 1,5 lần đáp án sai dài nhất;
- cảnh báo (không chặn):
  - chỉ đáp án đúng có từ rào đón ("khoảng", "có thể", "chưa", "nhưng"), hay chỉ đáp án sai có từ tuyệt đối ("chắc chắn", "hoàn toàn", "đã chứng minh");
  - chỉ đáp án đúng có số;
  - lựa chọn dài hơn 120 ký tự (nay 186 trên 1.183 lựa chọn).

Chặn ở trang mới và trang có lần kiểm định cuối là trường hợp 5; trang khác chỉ cảnh báo.

**Đo đoán mù** (đo, không phải kiểm thử). Mỗi lô, trước và sau khi sửa, một agent Haiku trả lời từng câu:
- (a) chỉ với các lựa chọn;
- (b) với câu hỏi và lựa chọn, không có bài.

Ghi tỉ lệ đúng vào báo cáo lô. Đích cho (a): không quá 40% (may rủi là 33% với ba lựa chọn).

**Cách viết câu hỏi** (lời giao của lô N và bài M):
- Ba lựa chọn cùng khuôn câu, cùng giọng thận trọng.
- Đáp án sai sai vì một chi tiết (chiều, độ lớn, nhóm, thiết kế), không phải vì nói tuyệt đối. Lấy đáp án sai từ ngộ nhận thật, hay cách hiểu sai hay gặp: tương quan thành nhân quả; có ý nghĩa thống kê thành hiệu ứng lớn.
- Ví dụ về cách viết (lô kiểm lại theo hồ sơ), câu 3 của `keo-deo`:
  - (đúng) "Có liên hệ, nhỏ hơn bản gốc, và nhỏ đi nhiều khi tính đến hoàn cảnh gia đình."
  - (sai) "Có liên hệ, lớn hơn bản gốc, và giữ nguyên khi tính đến hoàn cảnh gia đình."
  - (sai) "Không có liên hệ nào, ngay cả trước khi tính đến hoàn cảnh gia đình."
- Câu nhãn: "Trang này xếp khẳng định X ở mức nào?", bốn lựa chọn là bốn nhãn. Đây là câu hỏi cốt lõi của site: chắc chắn đến đâu.
- Lời giải thích kết thúc bằng link về mục tương ứng ("xem mục …", câu `ve-site`), để người trả lời sai quay lại đúng chỗ.

## 5. Thứ tự đợt

| Đợt | Việc | Điều kiện | Phiên | Người đọc thấy |
|---|---|---|---|---|
| NC0 | S4 trước; S1, S2, S5; T1–T4; K1; L1; H1; rồi S3 | Chủ repo duyệt kế hoạch (mục 7); câu chữ S5 chủ repo duyệt trước khi khóa | 10–15 | Hỗ trợ đã thử với service worker. Hết chữ lỗi và ba hình hỏng. Ba trang Sức khỏe tâm thần thận trọng hơn. Trang chủ có lối vào và menu. Hình cũ đọc được (cuộn ngang). Mọi bài có "Đọc tiếp"; bài lõi dẫn tới bài mở rộng |
| NC1 | K4 trước; H2a, H2b (gồm H3); K2, K3, K5; V0; T6–T9, T12; L2, L3 | NC0 xong; mục 7, ý 1 và 2 | 12–18 | Trang Ngộ nhận lọc được; trang lĩnh vực đầy đủ hơn; hình đánh số; link báo lỗi; lộ trình đọc; trang "Đọc tin tâm lý trên báo" |
| Song song | C1, C2 | Sau K4; xong trước N1 | 3–4 | Hai mô phỏng phương pháp |
| N1 | N1a (lô đo), N1b, N1c, N1d | H2b, K2–K5 xong | 8–12 | 29 trang: hình đọc được, 9 hình mới mức A, câu hỏi không đoán được, link hai chiều |
| M1 | 8 bài | H2b, K1, K2, K4, K5 xong; song song N1 | 10–14 | Giấc ngủ, điều kiện hóa, giả dược, nhu cầu, quan hệ, đánh con, thiền, màn hình với trẻ nhỏ |
| N2–N4 | 7 lô Khám phá; T5 sau N2a | N1 xong (chỉnh lời giao theo N1); thứ tự theo số liệu Search Console nếu có | 13–18 | 47 bài Khám phá nâng cấp |
| M2 | 10 bài; 6–8 thẻ ngộ nhận | M1 xong | 14–18 | Thêm bài cho xã hội, tính cách, căng thẳng, hạnh phúc, sinh học |
| V1, C3, C4, L4 | Bổ sung Việt Nam; hai công cụ; từ điển | V0 (V1); bài 9 (C3) | 12–17 | Bổ sung Việt Nam; công cụ cho xã hội, học tập; từ điển |
| N5 | 4 bài Sức khỏe tâm thần; bài M3 cần chuyên gia | Có chuyên gia | 2–3, cộng thời gian chuyên gia | Dải "Chưa qua rà soát chuyên môn" tự mất |

**Giai đoạn 1** gồm NC0, NC1, N1, M1 (cộng C1, C2 song song): khoảng 45–65 phiên.
- **Điểm dừng:** sau mỗi đợt, và sau lô N1a (chi phí, đoán mù, lỗi lượt 2). Dừng ở đâu thì site vẫn tốt hơn trước.
- **Lịch:** kế hoạch làm lại (ước 30–40 phiên) xong đợt 1–9 trong khoảng ba tuần, với 2–3 agent nặng cùng lúc. Theo nhịp ấy, giai đoạn 1 mất khoảng 4–6 tuần, tùy nhịp chủ repo duyệt và gộp.

Model: theo `../lam-lai/loi-giao/README.md`.
- **Opus:** K1, K2, thiết kế H2a, H2b, V0, mã công cụ, S5, N5. Ở bài nhạy cảm: nhãn và câu lâm sàng. Thẻ ngộ nhận lâm sàng.
- **Sonnet:** lô N, bài mới; lượt 1 và lượt 2 (cả lượt 2 câu hỏi); H1, K3–K5, L, T.
- **Haiku:** link, đếm, đọc diff mức Vừa, đo đoán mù.

Tối đa 2–3 agent nặng cùng lúc; ghi model đã dùng vào báo cáo.

## 6. Đo kết quả

Đo độ đúng và lợi ích, không đo sản lượng. Số bài có hình và độ dài bài chỉ ghi lại để theo dõi, không phải đích.

| Chỉ số | Nay | Sau giai đoạn 1 | Sau cả kế hoạch |
|---|---|---|---|
| Hình có chữ dưới 11 px ở 360 px | 27/27 | 0 ở trang đã nâng cấp; hình còn lại có cách tạm | 0 |
| Hình trái luật một đại lượng mỗi trục, cột từ 0 | 2 (`loftus-verbs`, `tinh-di-truyen-theo-tuoi`) | 0 ở trang đã nâng cấp | 0 |
| Hình mới qua lượt 2 "vẽ đúng ý" ngay lần đầu | Chưa có | Ghi theo lô | Ghi theo lô |
| Đoán mù khi chỉ có lựa chọn | Chưa đo (đo ở N1a trước khi sửa) | Không quá 40% ở trang đã nâng cấp | Không quá 40% toàn site |
| Câu có đáp án đúng dài nhất | 370/396 (93%) | Không quá một nửa ở mỗi trang đã nâng cấp (kiểm thử chặn) | Không quá một nửa ở mỗi trang |
| Trang có câu nhãn hay câu tình huống | 0 | Mọi trang đã nâng cấp, mọi bài mới | Mọi bài nội dung |
| Kết quả có đủ số liệu ở quá hai chỗ (không tính câu hỏi) | Khoảng 40/51 bài Khám phá có kết quả kể 3–7 lần (kiểm toán) | 0 ở trang đã nâng cấp | 0 |
| Lỗi do nâng cấp sinh ra | | Theo lô: số nhận định trên phần đã sửa bị lượt 2 hay kiểm mẫu chấm `sai`, `qua-manh`; số issue báo lỗi trong 3 tháng sau khi khóa lại | Như trên |
| Bài Khám phá có đường tới bài Hiểu bằng chứng liên quan (thân bài hay "Đọc tiếp") | 7/51 | 51/51 | Mọi bài |
| Bài mở rộng được bài lõi của nó dẫn tới | 0/12 (chỉ qua menu) | 12/12 và bài mới | Mọi bài |
| Trang thí nghiệm link tới bài Khám phá | 1/15 | 15/15 | 15/15 |
| Trang chủ dẫn tới năm mục chính và Sách in | 0/6 | 6/6 | 6/6 |
| Lĩnh vực dưới 3 bài (Khám phá và thí nghiệm) | 2 (Ý thức và giấc ngủ, Căng thẳng và sức khỏe); Học tập chưa có bài Khám phá | 0 (sau M1) | 0 |
| Câu hỏi đời thường ưu tiên đã có bài trả lời | Chưa có danh sách | Danh sách 15–20 câu (từ Search Console nếu bật, không thì từ `kiem-do-phu.md`) | Ghi số đã có bài |
| Bổ sung Việt Nam đã khóa | 0 | 0 (V0 xong: có đường khóa); bài M1 tự có số liệu Việt Nam khi tìm được | Khoảng 10–15 |
| Lighthouse, axe | Đạt luật 7 | Không lùi | Không lùi |

## 7. Việc cần chủ repo quyết

1. **Duyệt cách làm với khóa và chuẩn:**
   - trường hợp mở khóa 5 và bảng mục 4 (gồm cách bỏ lặp mới, lượt 2 nhẹ);
   - sáu chỗ sửa `chuan-kiem-dinh.md` (bảng ở đầu file này), gồm áp luật an toàn cho bài nhạy cảm ngoài lĩnh vực Sức khỏe tâm thần;
   - luồng K: K1 ở NC0, K2–K5 ở NC1;
   - mở khóa trang chủ cho T4 theo trường hợp 1.

   Đây là điều kiện của NC0 (K1, T4) và mọi lô N. Đề xuất: duyệt.
2. **Duyệt hệ hình:**
   - quy chuẩn `hinh.md` mục 3 (gồm luật một đại lượng mỗi trục, cột từ 0, giới hạn trong hình);
   - bộ dựng `::bieu-do`; một bài nhiều hình;
   - cách tạm cuộn ngang cho hình cũ;
   - danh sách hình đã sửa theo phản biện.

   Đề xuất: duyệt.
3. **Duyệt phần thêm mới:** danh sách mở rộng M1, M2; trang mới L2 (lộ trình), L3 (đọc tin), L4 (từ điển); công cụ C1–C4; thẻ ngộ nhận mới. So với bản nháp, ở M1, M2:
   - bài 5 thành bài mở rộng;
   - bài 18 lên M1, bài 7 xuống M2;
   - tiêu đề bài 9, 15, 18 đổi;
   - bài 19 (trắc nghiệm) thay bài 17;
   - đích "ít nhất 3 bài mỗi lĩnh vực" thay đích "3 bài lõi".

   Thêm vào bảng chỗ trống kinh điển các bài lõi mới: 11, 12, 19.
4. **Chuyên gia.** Đặt hạn tìm chuyên gia (đề xuất: hết tháng 2/2027) cho:
   - lô N5;
   - các bài M3 về sức khỏe tâm thần, "ADHD và tự kỷ";
   - đọc bài 18.

   Trong lúc chờ, lô S5 làm ba trang Sức khỏe tâm thần thận trọng hơn. Chủ repo duyệt câu chữ của S5.
5. **Phản hồi của người đọc:**
   - Đăng ký Google Search Console bằng thẻ meta xác minh: không nạp script, không theo dõi người đọc (cần kiểm cách xác minh cho đường dẫn `/psyche/`). Số liệu truy vấn dùng để xếp lô N2–N4 và chọn bài M3.
   - Link "Báo lỗi trang này" (T12).

   Đề xuất: bật cả hai.
6. **Nhịp:** bao nhiêu phiên mỗi tuần. Đề xuất: bắt đầu NC0 ngay sau khi duyệt; N1 và M1 song song sau NC1; dừng xem số đo sau N1a.

**Chủ repo quyết (20/11/2026), theo đề xuất của phiên chính:**
- Ý 1–3: duyệt (bắt đầu NC0 cùng ngày; NC0 xong 20/11/2026).
- Ý 4: hạn tìm chuyên gia **hết 2/2027**; tới hạn chưa có người thì chủ repo quyết tiếp.
- Ý 5: bật link "Báo lỗi trang này" (T12, NC1). Bật Google Search Console bằng thẻ meta xác minh; chủ repo tự xác minh bằng tài khoản của mình, phiên làm việc chỉ thêm thẻ khi có mã.
- Ý 6: **3–4 phiên mỗi tuần**, tối đa 2–3 agent nặng cùng lúc. Kiểm mẫu của chủ repo gom theo mốc (sau phần khóa và hình, sau phần trình bày, sau trang mới), không hỏi lẻ từng phần.
- T4: **chưa làm nút menu** ở trang chủ (đổi mẫu `splash` sang `doc` nhiều rủi ro, ít lợi; năm thẻ lối vào đã lấp lối vào cụt). Xem lại khi có số liệu Search Console.
- S5, việc tùy chọn: làm cả ba trong một lô sửa nhỏ (`mo/sktt-sua-nho`): giữ số 42%/19% (Cuijpers 2023) ở mục kể nghiên cứu, bỏ ở chỗ lặp; sửa câu hỏi 2 của `tram-cam`, câu hỏi 3 của `lo-au`; thêm "hay sớm hơn nếu thấy quá sức" ở mục tìm giúp đỡ của `tram-cam`.
- Thứ tự tiếp: lô sửa nhỏ S5, rồi NC1 theo mục 5. 7 thông báo đính chính chủ repo tự mở bằng trình duyệt; phiên làm việc soạn danh sách link và câu cần đối chiếu.

## 8. Rủi ro và cách giữ

| Rủi ro | Cách giữ |
|---|---|
| Mở khóa nhiều trang làm kiểm định lỏng | Chỉ các loại thay đổi ở mục 4, ghi trong hồ sơ (`loai_thay_doi`). Máy kiểm theo loại (`so-nang-cap.mjs`); lượt 2 nhẹ do agent khác làm; review diff; chủ repo xem mẫu. Chữ mới vẫn V3 |
| Hình nói mạnh hơn chữ: khác đại lượng trên một trục, trục cắt, đường nối giữa các nghiên cứu, xếp theo giá trị | Luật `hinh.md` mục 3.2; bộ dựng từ chối hai đại lượng một trục và `min` cho cột; lượt 2 về hình; dòng giới hạn trong hình; lô được bỏ hình |
| Hình vẽ sai số (20/27 hình cũ từng sai) | Hình sinh từ dữ liệu: số trọn vẹn khớp nhận định, `gia_tri` khớp `hien`, `khop` cho nhãn. Vẽ lại hình cũ: so tập số với bản ở `main` |
| Bộ dựng có lỗi làm sai hình ở nhiều trang đã khóa mà build không hỏng (mã băm khóa yml, không khóa bộ dựng) | Kiểm thử phân tích SVG đầu ra, so với yml; mẫu chuẩn cho mỗi loại; review Lớn khi sửa bộ dựng |
| Bỏ lặp cắt mất lý lẽ hay sự thận trọng | Tối đa hai chỗ đủ số, không xóa hết; từ rào đón, phủ định, tên nhãn được bảo vệ; bảng `bo_lap`; đánh dấu câu "Điều này…"; review đọc diff; không đích độ dài |
| Sửa câu hỏi quá tay (đáp án đúng thành ngắn nhất; đáp án sai sai về sự thật) | Kiểm thử hai chiều; đoán mù; lượt 2 Sonnet kiểm đáp án sai không trái nhận định |
| Bài nhạy cảm viết lỏng tay | Luật bài nhạy cảm (mục 3.7): lượt 2 đủ, Opus cho nhãn và câu lâm sàng, Hỗ trợ đầu và cuối bài, không tự chấm |
| Ba trang Sức khỏe tâm thần chờ chuyên gia không hạn | S5 ngay; hạn tìm chuyên gia (mục 7, ý 4) |
| Lô lớn vượt khả năng kiểm thử trình duyệt | Lô tối đa 8 trang; job `hinh` quét toàn site |
| Xung đột file chung khi chạy song song (`khoa.json`, `nguon.yml`, `trang.yml`) | Rebase lên `main` rồi mới khóa; `tinh` sạch trước khi mở PR; gộp tuần tự; danh sách miễn của kiểm thử câu hỏi suy từ hồ sơ |
| Kiểm toán sai | Kiểm toán là đầu mối, không phải kết luận: lô kiểm lại mọi phát hiện trước khi sửa. Đã thấy vài chỗ báo nhầm (mục 9) |
| Chữ trong SVG vào chỉ mục tìm kiếm hai ba lần | `data-pagefind-ignore` cho SVG; kiểm thử tìm kiếm |
| Thêm hình, khối làm chậm trang | SVG nội tuyến, không ảnh; đo kích thước HTML trước và sau N1; sau N1 chọn một trang nhiều hình làm trang mẫu Lighthouse cố định |
| Mở rộng làm tăng việc xem lại | Tầng theo độ chín; 7 bài mở rộng ở M1–M2, mỗi bài ghi hạn xem lại |
| Chi phí vượt dự tính | Điểm dừng sau mỗi đợt; N1a đo rồi chỉnh ước tính (như D3-L1 của kế hoạch làm lại) |

## 9. Kế hoạch được lập thế nào

Ngày 17/11/2026, phiên Cowork của chủ repo (Claude Opus 5.5):
1. Đọc repo (main `ccc49d1`) và kế hoạch hiện hành; dựng bản build thật.
2. Giao sáu agent Claude Sonnet 5.5 kiểm toán song song, mỗi agent một phạm vi, chỉ đọc:
   - bốn nhóm trang (nội dung và hình, từng trang một);
   - trình bày (đo trên bản build ở 360 và 1280 px);
   - độ phủ (so giáo trình OpenStax Psychology 2e, phản biện mục 9 của `them-noi-dung.md`).

   Kết quả ở `kiem-toan/`.
3. Soạn bản nháp kế hoạch. Đếm lại trên repo các con số của mục 1: câu hỏi, liên kết, lỗi đang hiện; thẻ ngộ nhận theo nhãn; link ở trang chủ; bài theo lĩnh vực.
4. Hai agent phản biện bản nháp độc lập, chỉ đọc, không đọc bản của nhau. Kết quả ở `phan-bien/`:
   - Claude Opus 5.5: giá trị cho người đọc, độ đúng của nội dung, an toàn;
   - Claude Sonnet 5.5: khả thi kỹ thuật, kiểm định, chi phí.
5. Kiểm lại trên repo các điểm then chốt của phản biện trước khi sửa (mục 10):
   - chỉ 322 trên 5.451 nhận định (6%) có `cau` nguyên văn trong trang; `o_dau` chỉ có ở 3 hồ sơ;
   - không mã nào dựng "Đọc thêm" từ `dua_tren`;
   - `VE_SITE_BO` (`tools/khoa.mjs`); `tests/pham-vi.test.mjs` chỉ nhận nhánh `moi/d…` và đếm cứng 17 lô; `TOI_DA_TRANG_DOI = 8`;
   - `src/ban-build.mjs` chỉ theo dõi `src/hinh/*.html`; `tests/chuyen.test.mjs` dòng 145–154;
   - trục 25–45 của `loftus-verbs`;
   - số câu hỏi: 391 câu có 3 lựa chọn, đáp án đúng trung vị 117 ký tự;
   - câu ở ba trang Sức khỏe tâm thần;
   - số liệu của vài hình đề xuất (YRBS 37% năm 2019, Linda 89, 90, 85%, Bleidorn 2022).

   Đây là phản biện trong dự án, do các phiên AI làm, không phải phản biện bên ngoài.

Đính chính kiểm toán (đã kiểm lại, không phải lỗi):
- số trong hình `harlow-contact` (≈19 giờ…), `hieu-ung-d` (80%, 64%) và `festinger-diverging` (p < 0,02) có trong hồ sơ của trang;
- `lo-trinh-hoc-noi` ghi "16–24 tháng" còn bài ghi "khoảng 18 tháng": khác cách nói, không mâu thuẫn. Hình này vẫn lỗi bố cục (S3).
- Kiểm toán ghi như thể có quy tắc "một bài một hình"; không có quy tắc ấy.

## 10. Phản biện và cách xử lý

Hai bản phản biện ở `phan-bien/`: `1-noi-dung.md` (ký hiệu P, N, G) và `2-ky-thuat.md` (ký hiệu A, B, C). Phần lớn điểm được nhận. Bốn điểm nhận một phần (1-N1, 1-N3, 1-N6, 2-B5), ghi lý do. Sau khi sửa, một agent Claude Sonnet 5.5 soát lần cuối (nhất quán số, tham chiếu, mục này so với thân bài); các điểm nó nêu đã sửa.

| Điểm | Nội dung | Xử lý | Ở đâu |
|---|---|---|---|
| 1-P1 | Hình đặt lên một trục những hệ số khác loại (keo-deo, iq, the-duc, mixed-ei, swls, cong-suat, linda, on-dinh) | Nhận: luật một đại lượng mỗi trục, trường `dai_luong`, thiết kế lại từng hình | `hinh.md` 3.2, 6 |
| 1-P2 | Chưa có luật cột từ 0; `loftus-verbs` cắt trục (đã kiểm: trục 25–45) | Nhận: luật cột từ 0; vẽ lại hình có lỗi thiết kế là loại thay đổi riêng, có lượt 2 | `hinh.md` 3.2, 5; mục 4 |
| 1-P3 | Kiểm "chuỗi số" không bắt nhãn sai; ví dụ YAML lặp lại lỗi đã sửa ở `milgram` (n46) | Nhận: `gia_tri` khớp `hien`, so số trọn vẹn có dấu, `khop`; thay ví dụ bằng ví dụ giả định | `hinh.md` 3.4, 4.1 |
| 1-P4 | Bài mở rộng nhạy cảm chưa có luật an toàn | Nhận: luật bài nhạy cảm, bảng rủi ro | 3.7 |
| 1-P5 | Tiêu đề bài 9 tả sai khái niệm | Nhận: đổi tiêu đề; phiếu đề xuất phân biệt các khái niệm | 3.7 |
| 1-P6 | "Chỉ xóa câu" mâu thuẫn việc 7, cắt lý lẽ; đích gọn 10–15% thưởng việc cắt | Nhận: tối đa hai chỗ đủ số, rút trong câu được, bảo vệ từ rào đón; bỏ đích độ dài | 3.6, 4, 6 |
| 1-P7 | Ba trang Sức khỏe tâm thần có lỗi an toàn mà chờ không hạn | Nhận: S5 trong NC0; hạn tìm chuyên gia | 3.1; 7 |
| 1-P8 | Sơ đồ bắt nạt có nút "không phải bắt nạt"; hình gắn bó dễ thành xếp loại trẻ | Nhận: ba câu hỏi, không nút kết luận; dòng an toàn, dòng giới hạn trong hình | `hinh.md` 3.3, 6 |
| 1-N1 | Lối vào trang chủ lên NC0; S4 trước; L2, L3 lên NC1; hạ T10; bỏ tự gắn link; quyết thứ tự N2–N4 sau khoảng 4 tuần số liệu Search Console | **Nhận một phần.** Nhận năm ý đầu. Thứ tự N2–N4 dùng số liệu Search Console nếu chủ repo bật (mục 7, ý 5); không có thì giữ thứ tự theo nhóm lĩnh vực, không chờ | 3.2, 3.5, 5 |
| 1-N2 | Hứa 5 bổ sung Việt Nam trong giai đoạn 1 mà không có V1 | Nhận: đích giai đoạn 1 là 0 (có đường khóa); bài mới tự đưa số liệu Việt Nam | 3.8, 6 |
| 1-N3 | Cân độ dài chưa đủ; khoảng 30% câu có gợi ý khác | Nhận: kiểm thử hai chiều, cảnh báo rào đón, câu nhãn, câu tình huống, đo đoán mù. **Nhận một phần** trần 100 ký tự mỗi lựa chọn: thành cảnh báo ở 120 ký tự, vì nay 21% lựa chọn quá 100 ký tự và luật độ dài đã chặn gợi ý chính | 4 |
| 1-N4 | Tầng theo độ chín, không theo chỉ tiêu; bản nháp đếm sai số bài mở rộng | Nhận: bài 5 thành mở rộng; bài 11, 12 chỉ phần đã chín; đích "3 bài mỗi lĩnh vực" | 3.7 |
| 1-N5 | Đổi chỗ 18 và 7; bài 15 thành lo âu thi cử, không tách bài; thêm ADHD và tự kỷ vào M3; cân nhắc thay bài 17 | Nhận cả bốn; bài 19 (trắc nghiệm) thay bài 17 | 3.7 |
| 1-N6 | Thẻ ngộ nhận mới nghiêng "bác bỏ"; thẻ thu gọn dễ làm lan ngộ nhận | **Nhận một phần.** Nhận cách viết khẳng định, thẻ riêng Việt Nam, thẻ thu gọn hiện nhãn trước. Không đặt chỉ tiêu "ít nhất 3 thẻ Khá vững hay Vững chắc": nhãn theo thước đo, nên chỉ ưu tiên chọn khẳng định có thể có cơ sở | 3.2 (T6), 3.7 |
| 1-N7 | Sửa từng hình (yrbs, deci, pygmalion); hạ weird, iat, gardner-steinberg; lô được bỏ hình | Nhận, và đi xa hơn: bỏ `weird-96-12`, `iat-r-nho`, cả `dunning-kruger-nhom` (chỉ một hai con số, trái mục 2 của `hinh.md`); `gardner-steinberg-ban-be` xuống C | `hinh.md` 3.5, 6 |
| 1-N8 | Chỉ số đếm sản lượng | Nhận: chỉ số độ đúng, lỗi mới, đoán mù. Search Console và link báo lỗi thành việc cần quyết | 6; 7 |
| 1-N9 | Bổ sung Việt Nam thiếu luật chống so sánh, khái quát sai | Nhận | 3.8 |
| 1-N10 | Tiêu đề cấp 3 mới có thể mang kết luận | Nhận: chỉ gọi tên, review như câu `ve-site` | 3.6, 4 |
| 1-N11 | "Đọc tiếp" thiếu bài cùng chủ đề | Nhận: bốn mục, có một bài Khám phá | 3.5 |
| 1-G1–G6 | Thu gọn chi tiết ở bài dài; đề tài công cụ; tên cơ quan thống kê; phạm vi bài 1, 3; bảng HTML thay "bảng thành hình"; mục "Nghe như lời đồn nhưng có cơ sở" | Nhận cả sáu | 3.6; 3.9; 3.8; 3.7; `hinh.md` 2; 3.2 (T6) |
| 2-A1 | Máy không kiểm được "nhận định còn ở chỗ khác" | Nhận (đã kiểm: 6% `cau` nguyên văn; `o_dau` ở 3 hồ sơ): so với bản ở `main`, bảng `bo_lap`; phần "còn đủ" do review | 4; K3 |
| 2-A2 | Kiểm "chuỗi số" yếu; tiêu đề, chú thích hình là chữ mới không ai khóa | Nhận: `trang`, `suy_ra`, chuẩn hóa số; nhận định loại `hinh` luôn qua lượt 2 | `hinh.md` 3.4; K2 |
| 2-A3 | Đưa yml vào mã băm chạm ít nhất 9 chỗ; mã băm không khóa bộ dựng | Nhận: H2b liệt kê đủ; kiểm thử phân tích SVG đầu ra và mẫu chuẩn | 3.3; `hinh.md` 4.1 |
| 2-A4 | Bộ dữ liệu mới phải khóa; `VE_SITE_BO` không cho | Nhận theo hướng gọn: `lien_quan` là trường của `trang.yml`; lộ trình là trang khung; từ điển đi đường nhận định; K1 trong NC0 | 3.4, 3.5 |
| 2-A5 | Công cụ khóa chưa hỗ trợ trường hợp 5 và lượt 2 nhẹ | Nhận: K2–K4 | 3.4 |
| 2-B1 | Nhánh `mo/` không có cổng phạm vi | Nhận: `mo/nc-<lô>` có cổng; việc mã ở `moi/nc0-…`, `moi/nc1-…` | 3.4, 3.10 |
| 2-B2 | Lô 29 trang vượt `TOI_DA_TRANG_DOI = 8` | Nhận: 12 lô tối đa 8 trang; job `hinh` quét toàn site | 3.6 |
| 2-B3 | Hai SVG: Pagefind, id trùng, sách in, màn 320 px | Nhận | `hinh.md` 3.1, 3.4 |
| 2-B4 | "Đọc thêm" từ `dua_tren` chưa có; chỗ chèn "Đọc tiếp"; T5, T6, T10 khó hơn | Nhận (đã kiểm): L1 gồm phần ấy; T5 sau N1; T6, T10 ghi rõ cách làm | 3.2, 3.5 |
| 2-B5 | "Phiên" chưa định nghĩa; NC0, NC1 ước thấp; S2, S3 làm trang mở khóa hai lần; C1, C2 sau N1; M1 bắt đầu quá sớm | **Nhận một phần.** Nhận: định nghĩa phiên, ước lại; C1, C2 thành trang riêng, song song NC1; M1 sau H2b, K1, K4, K5. Giữ S2 vì câu sai đang hiện, rẻ kiểm. Giữ S3 cho 3 trang, vẽ thẳng theo chuẩn mới nên N3 không vẽ lại; `mean-vs-median` vào N1d | 3, 3.1, 5 |
| 2-B6 | Job `hinh` trong CI; xung đột file chung; danh sách miễn suy từ hồ sơ; danh sách việc khi thêm bài; Sonnet cho lượt 2 câu hỏi | Nhận | 3.3, 3.6, 3.7, 4 |
| 2-C1–C5 | Một yml một trang; trang mẫu Lighthouse nhiều hình; lưu số đo hình; bảng file chạm; gộp S4 với lỗi Firefox ngoại tuyến | Nhận cả năm | 3.3, 3.10, 3.1, 8 |

