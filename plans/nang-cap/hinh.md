# Hình: quy chuẩn, hệ dựng hình và danh sách hình

Thuộc `README.md` (kế hoạch nâng cấp). Số đo ở mục 1 lấy từ `kiem-toan/kiem-trinh-bay.md`: đo trên bản build thật, Chromium, màn 360 px và 1280 px.

Bản này đã sửa theo phản biện (`README.md` mục 10):
- luật một đại lượng mỗi trục, cột từ 0, giới hạn then chốt nằm trong hình;
- kiểm thử chặt hơn: số trọn vẹn, nhãn, giá trị suy ra, đầu ra của bộ dựng;
- thiết kế lại hay hạ một số hình đề xuất.

## 1. Hiện trạng

- **27 hình trên 27 bài.** 51 trong 78 bài nội dung (51 Khám phá, 15 thí nghiệm, 12 Hiểu bằng chứng) chưa có hình. Một bài dùng được nhiều hình; hiện chưa bài nào có hai hình.
- **Chữ trong hình quá nhỏ trên điện thoại.**
  - Ở màn 360 px, chữ nhỏ nhất của mỗi hình chỉ còn 4,6 px (`skinner-schedules`) đến 7,8 px (`erickson-hippocampus`). 21 trên 27 hình dưới 6 px, trong khi chữ bài là 16 px.
  - Lý do: viewBox rộng 640–720 bị thu về 328 px.
  - Ở 1280 px vẫn có 9 hình dưới 10 px.
- **Bốn hình lỗi bố cục:**
  - `lo-trinh-hoc-noi`: nhãn đè nhau, chấm lệch mốc tháng.
  - `festinger-diverging`: nhãn "+5 (cực thích)" bị cắt mép.
  - `piaget-timeline`: đường dẫn cắt ngang chữ.
  - `mean-vs-median`: số đè vạch trung bình.
- **Hai hình lỗi thiết kế:**
  - `loftus-verbs`: hình cột với trục từ 25 (31,8 đến 40,8 dặm/giờ). Cột "smashed" vì vậy cao gấp khoảng 2,3 lần cột "contacted", dù số chỉ hơn khoảng 28%. Chú thích thiếu "9 người mỗi nhóm".
  - `tinh-di-truyen-theo-tuoi`: cột cuối (MISTRA, khoảng 70%, người trưởng thành) từ mẫu và nguồn khác, đặt cùng trục với các cột theo tuổi. Khác biệt chỉ nằm ở chú thích dài 462 ký tự.
- **Trình đọc màn hình không lấy được số liệu.** Không hình nào có bảng số liệu; `aria-label` chỉ là một câu.
- **Chú thích không đều.** Độ dài 105–545 ký tự. Chỉ 8 hình ghi "Nguồn:". Ba hình lặp câu "Sơ đồ minh họa ước lệ" cả trong SVG lẫn chú thích.
- **Hình vẽ tay dễ sai.** 20/27 hình đã phải sửa khi kiểm định vì số hay chú thích lệch bài gốc (`HINH_DA_SUA` trong `tests/chuyen.test.mjs`).

## 2. Khi nào dùng hình

Hình phải nói điều chữ nói kém hơn, và không nói mạnh hơn chữ. Dùng hình khi:

- so từ ba giá trị **cùng đại lượng** trở lên: cùng loại số (tỉ lệ, d, r, ρ đã hiệu chỉnh, β…), cùng kết cục, cùng cách đo hay cách hỏi;
- cần thấy diễn biến theo thời gian hay theo tuổi của cùng một nhóm, cùng một thước đo;
- cần thấy thiết kế thí nghiệm: nhóm, điều kiện, trình tự buổi;
- có mô hình nhiều thành phần và quan hệ, quy trình nhiều bước, ma trận 2×2;
- có dòng thời gian của các lần nghiên cứu, tái lập và phê bình (từ ba mốc). Các lần đo khác nhau thì dòng thời gian ghi kết luận bằng chữ, không đặt số lên một trục;
- kích thích là chính bằng chứng (ảo giác thị giác);
- có bảng số dài khó đọc.

Không dùng hình khi:
- chỉ có một hai con số, hay chỉ một cặp so sánh được;
- chữ đã gọn; hình chỉ lặp lại chữ; hình để trang trí;
- số chỉ có ở tóm tắt mà không mở được nguồn;
- các con số khác đại lượng, mà chữ của trang cẩn thận không so trực tiếp. Hình phải giữ sự cẩn thận ấy (tách ô, dòng thời gian, bảng), hay không vẽ;
- vị trí và độ dài không mang nghĩa ("bảng thành hình"). Khi ấy dùng bảng HTML hay danh sách co giãn: đọc tốt hơn trên điện thoại, tìm được, trình đọc màn hình đọc được.

## 3. Quy chuẩn hình

Áp cho mọi hình mới và mọi hình vẽ lại. Hình theo chuẩn mới mang dấu `data-chuan="2"` trên `<figure>`. Kiểm thử chặn hình có dấu ấy và chỉ cảnh báo hình cũ chưa có, nên không cần danh sách chờ mà mọi lô cùng sửa.

### 3.1 Cỡ chữ và bố cục

1. **Cỡ chữ.**
   - Chữ nhỏ nhất **11 px** ở màn 360 px; số liệu và nhãn chính từ **12 px**.
   - Tối đa ba cỡ chữ mỗi hình (tiêu đề 14, nhãn 12, ghi chú 11).
   - 360 px là sàn đo. Ở 320 px chữ còn khoảng 10 px: kiểm thử chỉ cảnh báo.
2. **Hai bố cục** cho hình có từ hai nhóm chữ:
   - bản hẹp: viewBox rộng 340–360, xếp dọc; hai cột thành hai hàng, ma trận 2×2 thành một cột;
   - bản rộng: chữ từ 12 đơn vị viewBox.

   CSS đổi `display` theo bề rộng khung (`@container`). Bản đang ẩn dùng `display: none` (không dùng `visibility`, `opacity`), để ra khỏi cây trợ năng. Khi in thì hiện bản rộng; trong cột hẹp của sách in (`/sach/`) thì theo `@container`. Hình nhỏ một nhóm chữ chỉ cần một bản, viewBox khoảng 360.
3. **Tìm kiếm và id.** Hai bản SVG mang `data-pagefind-ignore`: số đã có ở chú thích và bảng số liệu, khỏi vào chỉ mục hai ba lần. id trong SVG (`<defs>`, marker, gradient) kèm tên hình và tên bản, không trùng.
4. Hình buộc phải rộng (trục thời gian nhiều mốc) thì đặt trong khối cuộn ngang nhận focus, như bảng ("Hình N, cuộn ngang được").
5. Khung hình rộng tối đa bằng viewBox, để hình hẹp không phóng chữ quá to ở màn rộng.

### 3.2 Chữ, màu, số liệu

6. Chữ trong hình là chữ thật. Không để chữ đè nhau hay ra ngoài khung.
7. Mỗi hình tối đa hai màu dữ liệu: chàm `pz-fig-a`, hồng `pz-fig-b`, cộng xám. Màu đạt 3:1 với nền ở cả hai chế độ. Không phân biệt nhóm chỉ bằng màu: thêm nét đứt hay nhãn đặt ngay cạnh dữ liệu.
8. **Một trục, một đại lượng.** Chỉ đặt trên cùng một trục các giá trị cùng đại lượng: cùng loại số (r đơn, ρ đã hiệu chỉnh, β, d, g, tỉ lệ…), cùng kết cục, cùng cách hiệu chỉnh, cùng cách hỏi. Khác thì tách ô có tiêu đề riêng, hay dùng dòng thời gian, bảng chữ.
9. **Không nối** bằng đường hay mũi tên các giá trị của những nghiên cứu khác nhau. Đường chỉ nối cùng một nhóm theo thời gian, hay các bước của cùng một phân tích. Không nối qua những năm không có số.
10. **Giá trị không ngang hàng thì vẽ khác.**
    - Giá trị mà chính trang gọi là cũ, đang bị xem lại hay ước tính ("khoảng", "≈", "~") thì vẽ bằng chấm rỗng, có nhãn (ví dụ "ước lượng cũ").
    - Mỗi giá trị tổng hợp ghi k hay n.
    - Nguồn đã kiểm không có khoảng tin cậy thì ghi "không có khoảng tin cậy", không vẽ khoảng.
11. **Cột bắt đầu từ 0.** Hình cột (cột, cột ngang, cột nhóm) luôn từ 0; bộ dựng không nhận `min` cho cột. Số không nên vẽ từ 0 thì dùng chấm và ghi rõ trục.
12. **Thứ tự không gợi điều chữ không nói.** Xếp theo thiết kế (điều kiện, cách hỏi, thời gian). Không xếp theo giá trị khi các giá trị đến từ những nhóm hay cách hỏi khác nhau: xếp theo giá trị gợi ra một xu hướng.
13. **Mỗi con số trong hình là một nhận định có trong hồ sơ.** Chữ khác của hình (tiêu đề, nhãn nhóm, chú thích, dòng giới hạn) là nhận định loại `hinh`, luôn qua lượt 2 (`README.md`, K2).

### 3.3 Chú thích, giới hạn, an toàn, trợ năng

14. Đánh số "Hình N" tự động (plugin dựng trang), không viết tay.
15. **Chú thích ba phần:**
    - một câu nói hình cho thấy gì;
    - cách đọc, nếu cần;
    - dòng cuối là một trong ba: "Nguồn: tác giả (năm)" (dựng từ `src/data/nguon.yml`), "Sơ đồ minh họa, không theo tỉ lệ", hay "Dữ liệu giả lập".

    Chú thích quá khoảng 300 ký tự thì đưa ý phụ vào bảng số liệu. Không lặp câu chú thích trong SVG.
16. **Giới hạn then chốt nằm trong hình,** một dòng chữ 11 px, vì hình hay bị chụp và chia sẻ rời khỏi bài. Ví dụ: nước, mẫu, "không so trực tiếp", "tương quan", "không dùng để tự đánh giá", "sơ đồ minh họa, không phải dữ liệu".
17. **Hình chạm trẻ em, lâm sàng hay an toàn** (bắt nạt, gắn bó, lo âu):
    - không có nút kết luận kiểu "không phải X";
    - không thành công cụ tự xếp loại;
    - dòng cuối dẫn tới Hỗ trợ khi hợp (câu `ve-site`).

    Hình về Sức khỏe tâm thần chỉ làm cùng chuyên gia.
18. Hình có số liệu thì kèm khối thu gọn "Xem số liệu của hình": bảng 2–3 cột, đúng các số trong hình, cho trình đọc màn hình và người cần số chính xác. `aria-label` nói hình về gì; bảng mang số.

### 3.4 Kiểm thử (việc H1, H2a)

- **`tests/hinh.test.mjs`** (Node, trong `npm test`). Mọi hình:
  - khuôn file; hai bản bố cục khi cần;
  - không câu chú thích lặp trong SVG; id không trùng; SVG có `data-pagefind-ignore`.

  Hình sinh từ dữ liệu, thêm:
  - một yml cho đúng một trang (`trang`);
  - một `dai_luong` mỗi trục (mỗi ô); cột không có `min`;
  - `gia_tri` bằng số đọc từ `hien`;
  - số so trọn vẹn, có dấu, sau khi chuẩn hóa (`,` và `.`, số 0 đầu, `%`), với câu của nhận định ghi ở `nhan_dinh`. "0,04" không được khớp trong "−0,04", "0,05" không được khớp trong "10,05";
  - cụm `khop` có trong câu của nhận định;
  - `suy_ra` tính lại ra đúng số;
  - mọi `nguon` có trong `nguon.yml`.
- **Đầu ra của bộ dựng** (cũng trong `npm test`). Phân tích SVG và bảng "Xem số liệu" của mọi `::bieu-do`, rút cặp (nhãn, số hiển thị), so với yml; mẫu chuẩn (golden) cho mỗi `loai`.
  - Lý do: mã băm khóa yml, không khóa bộ dựng. Lỗi ở bộ dựng (thang, làm tròn, nhầm nhóm) sẽ làm sai hình ở nhiều trang đã khóa mà build không hỏng.
- **`tests/trinh-duyet/kiem-hinh.mjs`** (Playwright, Chromium). Một job `hinh` riêng trong CI: `test.yml`, `deploy.yml`, và danh sách `phan` của `.github/actions/kiem-thu/action.yml`. Job này:
  - chạy trên mọi trang có `pz-fig`, không chỉ trang mẫu, vì lô N có thể đổi nhiều trang hơn `TOI_DA_TRANG_DOI = 8`;
  - ở 360 và 1280 px (320 px chỉ cảnh báo), đo mọi `<text>`: từ 11 px ở 360 px, không đè nhau, không ra ngoài SVG;
  - chạy axe ở hai chế độ sáng, tối;
  - lưu số đo (chữ nhỏ nhất theo hình) vào báo cáo lô.

  Phiên kiểm toán đã có script đo làm mẫu.
- **Tìm kiếm và sách in.**
  - `tests/tim-kiem.test.mjs`: chữ trong SVG không vào chỉ mục. Kiểm trước xem Pagefind có đọc `<text>` của SVG nội tuyến không.
  - `tests/sach.test.mjs`: mỗi `figure` có đúng một SVG hiển thị ở khung hẹp, khung rộng và khi in.
- **Vẽ lại hình cũ.** So tập số và tập từ chuẩn hóa của bản mới với bản ở `main` (`git show main:src/hinh/<tên>.html`). Bản hẹp tách `<text>` thành nhiều `<tspan>`, nên không so chuỗi nguyên. Khác nhau thì phải có lý do ở hồ sơ (`doi_chu`).
- **Phép kiểm cũ.** `tests/chuyen.test.mjs` (dòng 145–154) đòi mọi hình không có trong `HINH_DA_SUA` trùng hình của site cũ. Phép này chạy ở máy có `../psyche-zero/`, và sẽ đỏ với mọi hình mới hay vẽ lại. Sửa thành: bỏ qua hình có `data-chuan="2"`. Site cũ đã tắt; phép kiểm chỉ còn để tra.

### 3.5 Lượt 2 về hình

Agent lượt 2 (Sonnet, không Haiku) trả lời bảy câu cho mỗi hình mới hay hình sửa thiết kế:

1. Các giá trị trên một trục có cùng đại lượng (loại số, kết cục, mẫu, cách hiệu chỉnh) không?
2. Cột có bắt đầu từ 0 không?
3. Số xấp xỉ, ước lượng cũ có được vẽ khác không?
4. Có k, n và khoảng tin cậy, hay có ghi là không có?
5. Nhãn có khớp điều kiện, nhóm trong câu của nhận định không?
6. Thứ tự sắp xếp hay đường nối có gợi ý xu hướng, nhân quả mà chữ không nói không?
7. Giới hạn then chốt có nằm trong hình không? Hình có nói mạnh hơn chữ của trang không?

Lô được bỏ hay hạ một hình (kể cả mức A) khi lượt 2 thấy so sánh không hợp lệ; ghi lý do trong báo cáo lô.

## 4. Hệ dựng hình

### 4.1 Hình sinh từ dữ liệu: `::bieu-do{ten="…"}` (mới)

Phần lớn hình đề xuất (mục 6) là biểu đồ đơn giản. Dựng chúng từ một file dữ liệu thay cho SVG vẽ tay. Ví dụ dưới là **giả định**: trang, số, id nhận định và nguồn đều không có thật.

```yaml
# src/hinh/vi-du-ti-le.yml (VÍ DỤ GIẢ ĐỊNH, không phải dữ liệu thật)
trang: kham-pha/vi-du/bai-vi-du    # một yml cho đúng một trang; id nhận định là của hồ sơ trang này
loai: cot-ngang                     # cot | cot-ngang | cot-nhom | duong | cham-khoang | truoc-sau | dong-thoi-gian
tieu_de: Tỉ lệ người làm theo yêu cầu, theo điều kiện
dai_luong: ti-le                    # một đại lượng cho cả trục; khác thì tách ô (o:)
truc: { ten: '% người làm theo', max: 100 }   # cột luôn từ 0: không có min
du_lieu:
  - nhan: Có một người phản đối
    gia_tri: 20
    hien: 20%
    nhan_dinh: [n7]
    khop: có một người phản đối     # cụm này phải có trong câu của n7
  - nhan: Không ai phản đối
    gia_tri: 65
    hien: 65%
    nhan_dinh: [n8]
    khop: không ai phản đối
    suy_ra: 26/40                   # câu của n8 ghi "26 trên 40 người"; kiểm thử tính lại ra 65%
gioi_han: Một thí nghiệm, sinh viên một trường; không so với nghiên cứu khác.   # dòng giới hạn trong hình
chu_thich: Ít người làm theo hơn hẳn khi có một người phản đối.
nguon: [vidu1999]
```

- **Hình nhiều ô** (giá trị khác đại lượng, như thời gian và số con ở `seligman-ket-qua`): `o: [{ tieu_de, dai_luong, truc, du_lieu }, …]`, mỗi ô một đại lượng, một trục.
- **Dòng thời gian:** mỗi mốc có `moc` (năm, ngày hay buổi), `nhan`, `nhan_dinh`; số (nếu có) nằm trong nhãn chữ, không trên trục.

Bộ dựng (`src/plugins/bieu-do.mjs`, gọi từ `thanh-phan.mjs`) cho ra:
- hai SVG, bản hẹp và bản rộng, đúng quy chuẩn mục 3, có `data-chuan="2"`;
- bảng "Xem số liệu";
- số hình, chú thích, dòng giới hạn, dòng nguồn.

Bộ dựng từ chối, và build hỏng với lời báo chỉ đúng giá trị, khi:
- hai `dai_luong` trên một trục;
- có `min` cho cột;
- `gia_tri` khác số của `hien`;
- thiếu `nhan_dinh`, trừ hình `gia_lap: true` (dữ liệu giả lập: dòng cuối chú thích bắt buộc là "Dữ liệu giả lập"; hồ sơ ghi `gia-dinh` theo chuẩn mục 1).

Lợi ích:
- hình mới rẻ: chỉ ghi dữ liệu và id nhận định;
- số và nhãn khớp hồ sơ do máy kiểm; so sánh có hợp lệ không do lượt 2 kiểm (mục 3.5);
- mọi biểu đồ cùng một kiểu;
- đổi quy chuẩn (cỡ chữ, màu) thì chỉ sửa bộ dựng, không sửa từng file SVG.

**Khóa (việc H2b).** File `.yml` của hình vào mã băm của trang dùng nó, như `src/hinh/*.html` hiện nay. Không dùng chung với `::hinh`: hai chỉ thị, hai biểu thức riêng. Chạm:
- `src/khoa.mjs`: hàm tìm hình của trang (nay chỉ khớp `::hinh`), `maBamTrangFile`, lời báo ở `kiemKhoa`;
- `src/plugins/psyche-markdown.mjs`: mỗi `::bieu-do` một dòng đúng khuôn; chặn ô "chưa chuyển" ở trang đã khóa;
- `src/plugins/thanh-phan.mjs`: hàm dựng, đọc yml, kiểm schema;
- `tools/khoa.mjs` (`chuaChuyenTrong`): `::bieu-do` thiếu yml;
- `src/ban-build.mjs`: theo dõi cả `src/hinh/*.yml` (nay chỉ `.html`);
- `tests/khoa.test.mjs`, `tests/thanh-phan.test.mjs`;
- `../ben-vung/chuan-kiem-dinh.md` mục 7; `AGENTS.md` (mục Khóa, bảng Mẫu trang).

Trang không dùng `::bieu-do` phải giữ nguyên mã băm: kiểm thử hồi quy `node tools/khoa.mjs tinh` sạch trên `khoa.json` thật. Mức review Lớn, Opus review.

### 4.2 Hình vẽ tay: `::hinh{ten="…"}` (giữ)

Dành cho:
- sơ đồ mô hình (Baddeley, ELM, Gross);
- thiết kế thí nghiệm phức tạp;
- kích thích thị giác (Müller-Lyer);
- ma trận khái niệm.

Vẫn theo quy chuẩn mục 3: hai bản bố cục, cỡ chữ, chú thích, dòng giới hạn, `data-chuan="2"`. Không cần ô "Xem số liệu" khi hình không có số; khi đó chú thích tả đủ ý bằng chữ. Số trong hình vẽ tay vẫn là nhận định; vẽ lại thì máy so tập số với bản cũ.

### 4.3 Hình tương tác: làm thành công cụ

Mô phỏng giúp hiểu hơn hẳn hình tĩnh thì làm theo khuôn công cụ (`AGENTS.md`, "Khuôn công cụ"), ở luồng C của `README.md`, mỗi công cụ một trang `trai-nghiem/`:
- hồi quy về trung bình;
- cỡ mẫu và công suất;
- p "săn" ngẫu nhiên;
- độ chồng lấp theo d;
- gộp phân tích tổng hợp.

Không làm biểu đồ tương tác chung cho mọi hình: tốn mã, khó giữ Lighthouse, ít lợi.

### 4.4 Tạm thời, trước khi vẽ lại

Một dòng CSS cho hình cũ ở màn hẹp: khung cuộn ngang nhận focus, SVG rộng tối thiểu khoảng 34rem. Chữ nhỏ nhất lên khoảng 8–10 px. Không chạm trang khóa (luồng T, việc T1). Bỏ khi hình đã có bản hẹp.

## 5. 27 hình hiện có: việc cho từng hình

Bảng đủ (cỡ chữ đo được, vấn đề, cách sửa) ở `kiem-toan/kiem-trinh-bay.md`, mục (a). Tóm lại:

| Nhóm | Hình | Việc | Khi nào |
|---|---|---|---|
| Lỗi bố cục, sửa ngay | `lo-trinh-hoc-noi`, `festinger-diverging`, `piaget-timeline` | Vẽ lại theo mục 3.1–3.2 (sau H1), kèm bảng "Xem số liệu" viết tay; giữ đúng chữ và số, không thêm chữ. `lo-trinh-hoc-noi` đặt lại chấm cho đúng mốc tháng: lượt 2 nhẹ về cách vẽ | S3 (NC0) |
| Lỗi bố cục, trong lô | `mean-vs-median` | Như trên | N1d |
| Lỗi thiết kế | `loftus-verbs`, `tinh-di-truyen-theo-tuoi` | `loftus-verbs`: chấm, hay cột từ 0; ghi "9 người mỗi nhóm". `tinh-di-truyen-theo-tuoi`: cột MISTRA thành ô riêng, hay có vạch ngăn và nhãn "người trưởng thành, mẫu khác". Lượt 2 nhẹ về cách vẽ | N2a, N4a |
| Chuyển sang hình sinh từ dữ liệu khi vẽ lại | `milgram-obedience` (gộp vào `milgram-bien-the`), `bystander-smoke`, `harlow-contact`, `osc-replication`, `duong-cong-quen` (đường; ghi số ở ba mốc, thêm nhãn điểm 31 ngày), `gf-gc-curves` | Ghi dữ liệu kèm id nhận định; kiểm các luật ở mục 3.2 | Lô N của trang |
| Vẽ lại theo quy chuẩn (sơ đồ) | `baddeley-model`, `elm-routes`, `gross-model`, `gas-curve`, `flow-channel`, `marcia-matrix`, `seligman-design`, `skinner-schedules`, `thi-nghiem-key-ring`, `linda-venn`, `funnel-demo`, `tuong-quan`, `hieu-ung-d`, `cuijpers-funnel` | Bản hẹp xếp dọc, chữ 11–12 px, bỏ câu lặp, thêm dòng nguồn (loại `ve-lai-hinh`). Thêm dòng giới hạn hay thành phần là chữ mới (loại `sua-thiet-ke-hinh`, nhận định `hinh`): ví dụ `baddeley-model` sửa mũi tên hai chiều, thêm "trí nhớ dài hạn" (V3) | Lô N của trang |
| Gần đạt, chỉnh nhẹ | `erickson-hippocampus` | Giới hạn bề rộng khung, kiểm cỡ chữ | N4a |

Hình cũ đã qua kiểm định (20 hình có trong `HINH_DA_SUA`). Vẽ lại cùng số là thay đổi cơ học, kiểm bằng máy (mục 3.4), không cần kiểm định lại số. Vẽ lại có sửa thiết kế thì thêm lượt 2 nhẹ (mục 3.5).

## 6. Hình mới đề xuất

Rút từ bốn file kiểm toán theo nhóm trang, rồi sửa theo phản biện.
- **Cột "Dựng":** D là hình sinh từ dữ liệu (`::bieu-do`), T là hình vẽ tay (`::hinh`), B là bảng HTML (không SVG).
- **Id nhận định** là id phiên kiểm toán tìm bằng tra con số trong hồ sơ: lô làm hình phải kiểm lại.
- **Mức:**
  - A★: đáng làm nhất (rủi ro thấp, lợi rõ);
  - A: làm trong lô nâng cấp của trang;
  - B: làm nếu tiện;
  - C: có thì hay.
- Lô được bỏ hay hạ một hình khi lượt 2 thấy so sánh không hợp lệ (mục 3.5).

| Mức | Hình | Trang | Lô | Loại, thiết kế | Dữ liệu (theo kiểm toán) | Dựng |
|---|---|---|---|---|---|---|
| A★ | muller-lyer-ebbinghaus | kham-pha/chu-y-tri-giac/ao-giac-thi-giac | N2a | Kích thích thị giác | Không số; thay ký tự `>---<` bài đang dùng | T |
| A★ | wason-tap-long-nhau | kham-pha/tu-duy/thien-kien-xac-nhan | N2b | Sơ đồ tập lồng nhau | Các dãy số đã có (n2–n6) | T |
| A★ | roediger-doc-lai-vs-kiem-tra | kham-pha/tri-nho/duong-cong-quen | N2a | Trước–sau, một nghiên cứu, một thước đo | 83–71 thành 40–61 (n19–n25) | D |
| A★ | nghe-hai-tai-thiet-ke | kham-pha/chu-y-tri-giac/nghe-chon-loc | N2a | Thiết kế | Không số | T |
| A★ | deci-1999-d | kham-pha/cam-xuc-dong-luc/thuong-va-dong-luc | N4b | Cột hai chiều (d âm, dương), một phân tích tổng hợp. Cột lời khen (d ≈ +0,33) vẽ như số xấp xỉ, ghi "rõ hơn ở sinh viên so với trẻ em" | −0,40; −0,36; −0,28; ≈0; ≈+0,33 (n30–n34) | D |
| A★ | webb-d | kham-pha/cam-xuc-dong-luc/dieu-tiet-cam-xuc | N4b | Cột hai chiều, một phân tích tổng hợp | Tám d+ (n35–n39) | D |
| A★ | rasch-2007-thiet-ke | kham-pha/cang-thang-giac-ngu/ngu-va-tri-nho | N4c | Thiết kế bắt chéo | 97% so với 86% (n31) | T |
| A★ | milgram-bien-the | thi-nghiem/milgram | N1a | Cột ngang (tỉ lệ đi đến 450V), 4 trong 21 biến thể; 43,6% (gộp 21 biến thể) là vạch tham chiếu. Nhãn theo hồ sơ: Bridgeport so với "điều kiện tương ứng tại Yale" (n46), không với 65% của bài 1963 (điều kiện không có tiếng kêu) | 47,5% (n46); 4/40; 26/40 ở người tham gia nữ; 43,6% | D |
| A★ | seligman-ket-qua | thi-nghiem/seligman | N1b | Hai ô: thời gian thoát (giây); số con không học được cách thoát (trên 8) | 27,00 / 25,93 / 48,22 giây; 0/8, 1/8, 6/8 | D |
| A★ | forest-plot-huong-dan | bang-chung/phan-tich-tong-hop | N1d | Chấm và khoảng tin cậy; `gia_lap: true` | Dữ liệu giả lập (thay khối chữ ký tự) | D |
| A | iq-du-bao-gi | kham-pha/tri-tue/tri-tue-la-gi | N2b | Cột ngang, chỉ ba ρ đã hiệu chỉnh của Strenze 2007. Ước lượng .53 của Hunter và Hunter (1984), mà trang nói đã bị hiệu chỉnh quá tay, và .17, .05 của hai phân tích tổng hợp khác ghi bằng chữ dưới hình, không cùng trục | .56, .43, .20 (n14); .53; .17, .05 (n16) | D |
| A | linda-cung-cach-hoi | kham-pha/tu-duy/linh-cam-va-xac-suat | N2b | Cột, chỉ các nhóm cùng cách hỏi: ba nhóm trình độ. Các biến thể cách hỏi khác ghi bằng bảng, không xếp theo giá trị | 89%, 90%, 85% (ngây thơ, trung gian, tinh vi) | D |
| A | phong-cach-hoc-bat-cheo | kham-pha/tri-nho/phong-cach-hoc | N2a | Ma trận bắt chéo ước lệ; trong hình ghi "Sơ đồ minh họa, không phải dữ liệu" | Không số | T |
| A | flynn-toc-do | kham-pha/tri-tue/hieu-ung-flynn | N2b | Cột. Lô kiểm cùng đại lượng (cùng loại điểm, cùng cách tính mỗi thập kỷ); khác thì tách ô | 3,0; 7; 2,8; 2,31 điểm mỗi thập kỷ (n11–n21, n30) | D |
| A | ekman-fore-my | kham-pha/cam-xuc-dong-luc/cam-xuc-co-ban | N4b | Cột nhóm, vạch may rủi 17% | Tám tỉ lệ đúng Fore và Mỹ (n14, n15) | D |
| A | the-duc-tung-tong-hop | kham-pha/co-so-sinh-hoc/the-duc-nao | N4a | Mỗi phân tích tổng hợp một ô trước–sau hiệu chỉnh của chính nó (Ciria 2023: toàn bộ nhận thức; Aghjayan 2022: trí nhớ sự kiện, người khoảng 71 tuổi). Không trục chung; không vẽ khoảng tin cậy (trang không có). Bỏ Balbim 2024 (đo thể tích hồi hải mã, không phải nhận thức) | 0,22 → 0,13 → 0,05; 0,28 → 0,18 (n31, n36, n38); lô kiểm số nào của nguồn nào | D |
| A | yrbs-buon-ba | kham-pha/phat-trien/mang-xa-hoi-teen | N3b | Đường; có điểm 37% năm 2019 (trang dùng điểm này để nói "đã tăng từ trước đại dịch"). Không nối qua năm không có số. Trong hình: "Mỹ, tự báo cáo. YRBS 2021 không hỏi về mạng xã hội, nên không cho biết nguyên nhân" | Các mốc 2011–2025 (n9, n17) | D |
| A | tranh-luan-tien-hanh-phuc | kham-pha/hanh-phuc/tien-va-hanh-phuc | N4c | Dòng thời gian | 6 mốc 1974–2024; ngưỡng 75.000 và 100.000 USD (n12, n22, n38, n39) | D |
| A | mbti-mot-cum-bi-cat | kham-pha/tinh-cach/mbti | N3a | Phân bố ước lệ; trong hình ghi "Sơ đồ minh họa, không phải dữ liệu" | Không số mới (n2, n3) | T |
| A | on-dinh-thu-hang | kham-pha/tinh-cach/tinh-cach-thay-doi | N3a | Chấm theo nhóm tuổi trên trục rời, không nối đường; ~.74 vẽ như ước lượng. Trong hình ghi kết quả Bleidorn 2022: ít bằng chứng cho việc tăng thêm sau tuổi 25 | .31, .54, .64, ~.74 (n5) | D |
| A | bon-kieu-gan-bo | kham-pha/phat-trien/gan-bo | N3b | Bảng HTML, không SVG. Dòng "Phân loại trong thủ tục phòng thí nghiệm, không dùng để xếp loại một em bé cụ thể" (câu đã có ở trang) | Không số | B |
| A | ba-cau-hoi-bat-nat | kham-pha/phat-trien/tam-ly-hoc-duong | N3b | Ba câu hỏi, không nút kết luận "không phải bắt nạt". Dòng cuối: đánh, đe dọa, làm nhục vẫn cần người lớn can thiệp dù chưa đủ ba dấu hiệu (nhận định, V3; không có trong hồ sơ thì bỏ câu này); và dẫn tới Tổng đài 111 ở trang Hỗ trợ (câu `ve-site`) | Ba tình huống đã có trên trang | T |
| A | pygmalion-raudenbush | thi-nghiem/pygmalion | N1b | Cột; ghi số thí nghiệm trên mỗi cột; mức chung là vạch tham chiếu | 0,32; 0,26; −0,04; chung 0,11 (18 thí nghiệm) | D |
| A | keo-deo-cac-lan-nghien-cuu | thi-nghiem/keo-deo | N1a | Dòng thời gian các lần nghiên cứu (năm, n, mẫu, kết cục, kết luận bằng chữ), không trục số. Các số khác loại: r đơn ở mẫu nhỏ; β có kiểm soát; r trung bình của 11 chỉ số | r(35) = .57 với SAT toán (n28); β 0,08 và 0,05, n = 552 (n37); r 0,02 khi gần 50 tuổi, n = 113 (n67) | D |
| A | robbers-cave-ba-giai-doan | thi-nghiem/robbers-cave | N1b | Thiết kế kèm số | 6,4% / 7,5% rồi 36,4% / 23,2% | T |
| A | little-albert-trinh-tu | thi-nghiem/little-albert | N1a | Dòng thời gian | Năm buổi, bảy lần ghép đôi, 31 ngày | D |
| A | zimbardo-dong-thoi-gian | thi-nghiem/zimbardo | N1b | Dòng thời gian | 1971, 1973, BBC 2006, Carnahan 2007, Le Texier 2019, 2020 | D |
| A | cong-suat-hai-nhom | bang-chung/co-mau-suc-manh | N1c | Hai ô có nhãn, mốc 80%: công suất trung vị theo lĩnh vực; công suất giả định cho hiệu ứng nhỏ, vừa, lớn | 8, 11, 18, 21, 23, 31%; 12, 46, 78% | D |
| B | khop-nhau-2x2 | kham-pha/cang-thang-giac-ngu/doi-pho-stress | N4b | Ma trận 2×2 | Không số mới (n31, n35–n37) | T |
| B | buss-so-mau | kham-pha/co-so-sinh-hoc/tam-ly-tien-hoa | N4a | Cột | 36, 34, 29, 23 trên 37 mẫu | D |
| B | hieu-ung-nho-niem-tin | kham-pha/cang-thang-giac-ngu/stress-co-hai | N4b | Chấm; lô kiểm cùng đại lượng và có khoảng tin cậy hay không | Liu 0,43 và −0,08; Bosshard 0,23 và 0,18 (n44, n45) | D |
| B | kuhl-2006 | kham-pha/phat-trien/tre-hoc-noi | N3b | Trước–sau | 63,7 → 73,8 (Mỹ); 64,7 → 59,9 (Nhật) (n13, n15) | D |
| B | ocean-5-chieu | kham-pha/tinh-cach/big-five | N3a | Năm thanh liên tục | Không số (n14) | T |
| B | mixed-ei-hai-o | kham-pha/cam-xuc-dong-luc/tri-tue-cam-xuc | N4b | Hai ô riêng, có chữ giải thích: ρ 0,47 và 0,29; β −0,02 sau khi kiểm soát bảy khái niệm (đóng góp riêng, không phải "cùng hiệu ứng nhỏ đi"). Hay không làm | n48–n53, n68 | D |
| B | asch-bien-the, schachter-ma-tran, bandura-thiet-ke, phan-phoi-lech | thi-nghiem/asch, schachter-singer, bandura; bang-chung/thong-ke-mo-ta | N1a, N1b, N1d | Cột, ma trận, thiết kế, phân bố | Xem `kiem-toan/kiem-thi-nghiem-bang-chung.md` | D, T |
| C | gardner-steinberg-ban-be | kham-pha/co-so-sinh-hoc/nao-tuoi-teen | N4a | Số lấy từ lời kể ("gấp đôi", "khoảng 50%"): không vẽ thành cột cao chính xác | Theo lời kể của Steinberg 2008 | D |
| C | swls-cac-he-so | kham-pha/hanh-phuc/do-hanh-phuc | N4c | Bốn loại hệ số khác nhau (alpha, đo lại, hội tụ, người quen chấm): chỉ làm thành bảng | 0,87; 0,82; 0,47–0,75; 0,42 (n3, n20–n22) | B |
| Bỏ | iat-r-nho, dunning-kruger-nhom, weird-96-12 | kham-pha/tam-ly-xa-hoi/dinh-kien, kham-pha/tu-duy/dunning-kruger, bang-chung/mau-va-chon-mau | | Chỉ hai số, hay chỉ một cặp so được (mục 2) | r 0,14 và 0,07; 10/14 và 17/14; 96% so với 12% | |
| Cần nguồn mới | ca-phe-dao-chieu | bang-chung/tuong-quan-nhan-qua | N1d | Cột | Số từ bảng của Freedman 2012 chưa có trên trang: kiểm V3 như nhận định mới | D |
| Cần chuyên gia | vong-tranh-ne | kham-pha/suc-khoe-tam-than/lo-au | N5 | Sơ đồ cơ chế, không số | Chỉ làm cùng chuyên gia; không gợi ý tự chẩn đoán | T |

Tổng:
- 28 mục mức A (10 mục A★): 27 hình (19 dựng từ dữ liệu, 8 vẽ tay) và 1 bảng thay hình (`bon-kieu-gan-bo`);
- 10 mục mức B; 2 mục mức C; 3 hình bỏ.

Làm hết mức A thì 49/78 bài nội dung có hình hay bảng thay hình (nay 27); thêm mức B thì 56. Đây là hệ quả, không phải đích (`README.md` mục 6).
