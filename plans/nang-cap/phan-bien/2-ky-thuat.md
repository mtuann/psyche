# Phản biện 2: khả thi kỹ thuật, kiểm định và chi phí

> Ghi chú khi lưu vào repo (17/11/2026): bản phản biện này đọc **bản nháp** của kế hoạch, nên số mục, số bài, tên hình trong đây là của bản nháp. Cách xử lý từng điểm: `../README.md` mục 10.

Đối tượng: `plans/nang-cap/README.md`, `hinh.md` (bản nháp 17/11/2026). Đã đối chiếu với repo (bản sao main `ccc49d1`, chỉ đọc). Số đếm tự chạy trên hồ sơ `kiem-dinh/` và `src/content/docs/`. Dòng ghi theo file đã đọc; chỗ không kiểm được ghi "chưa kiểm".

Kết luận ngắn: hướng đi đúng và kiến trúc khóa giữ được, nhưng ba dòng "Máy" trong bảng mục 4 chưa làm được bằng dữ liệu hiện có, bộ dựng `::bieu-do` chạm nhiều file hơn kế hoạch kể, và bộ dữ liệu mới (`lien-quan`, `lo-trinh`, `thuat-ngu`) không "không mở khóa" như mô tả: chúng phải được khóa, mà quy tắc hiện hành không cho câu `ve-site` ở các bộ ấy.

---

## A. Phải sửa

### A1. Dòng "Bỏ câu lặp (chỉ xóa)": máy không có dữ liệu để kiểm "nhận định còn ở chỗ khác"
- Chỗ: README mục 4, bảng, dòng "Bỏ câu lặp"; mục 3.5 việc 3.
- Vấn đề: kế hoạch kiểm "nhận định của câu bỏ còn ở chỗ khác trong bài (theo `cau` và `o_dau`)". Dữ liệu không đủ.
- Căn cứ (đếm trên repo): 5.451 nhận định; chỉ 322 (6%) có `cau` nằm nguyên văn trong trang, vì `cau` là câu diễn đạt lại của nhận định chứ không phải trích trang. `o_dau` chỉ có ở 3 hồ sơ (`tri-nho-lam-viec`, `ao-giac-thi-giac`, `linh-cam-va-xac-suat`) và không có dòng mã nào đọc nó (`tools/khoa.mjs`, `src/`, `tests/`; chỉ có trong `chuan-kiem-dinh.md` dòng 145 và `ben-vung/README.md` dòng 119). `vi_tri` (115 trên 133 nhận định ở mẫu đọc) là vị trí trong nguồn, không phải trong trang. Nơi nhận định xuất hiện trong trang chỉ ở `ghi_chu` văn tự do (ví dụ `kiem-dinh/thi-nghiem/milgram.yml` n1).
- Đề xuất: thay cột "Kiểm" của dòng này bằng những gì đo được so với bản ở `main` (`git show main:<file>`, như `tests/pham-vi.test.mjs` đã dùng git):
  1. xóa thuần: mọi câu của bản mới là câu nguyên văn của bản cũ (NFC, tách câu); không câu mới;
  2. không mất số: mọi chuỗi số, cặp "họ tác giả (năm)", link nội bộ, `{ #id }`, khung nhãn, khối quiz có ở bản cũ còn ít nhất một lần ở bản mới;
  3. ghi trong hồ sơ lần mới một bảng `bo_lap` (câu bị xóa, id nhận định, chuỗi còn lại ở chỗ nào); máy kiểm chuỗi ấy có thật trong trang mới. Phần "nhận định còn đủ" do review đọc diff, không phải máy.
  Câu chữ thay: "Máy: tập câu bản mới ⊆ bản cũ; không mất số, họ tác giả–năm, link, id; mỗi câu bị xóa có dòng `bo_lap` trỏ tới chuỗi còn trong trang. Review: đọc diff".
- Cùng sửa cho dòng "Thêm tiêu đề cấp 3, chuyển đoạn (tập câu không đổi)": làm được bằng so tập câu sau khi bỏ dòng `###`; cần quy ước tách câu (viết hàm dùng chung, có test).

### A2. Dòng "Hình mới từ nhận định đã có": phép kiểm "chuỗi số" yếu và để hở phần chữ mới của hình
- Chỗ: README mục 4; `hinh.md` mục 3.2 (7), 4.1.
- Vấn đề 1: số trong hồ sơ viết nhiều kiểu ("0,56", ".56", "26/40", "65%"); giá trị suy ra (35% = 100 − 65) không có chuỗi nào. Trong 784 nhận định `so-lieu`, 735 có chữ số. Chuỗi có mặt chỉ chứng minh con số xuất hiện trong một câu, không chứng minh gán đúng nhóm, đúng thang (đây chính là lỗi đã gặp ở 20/27 hình cũ).
- Vấn đề 2: tiêu đề hình, `chu_thich`, nhãn trục, nhãn nhóm là chữ mới, không nhận định nào khóa. `loiHoSo` (`tools/khoa.mjs` 135-232) không bắt buộc có nhận định cho hình; `conCanLuot2` (239-248) cũng không biết hình.
- Đề xuất:
  1. yml thêm `trang:` (hình dùng ở trang nào, để id không mơ hồ) và mỗi mục `nhan_dinh: [n12, n13]`, `suy_ra: "100-n12"` cho giá trị tính ra;
  2. kiểm thử chuẩn hóa số (bỏ 0 đầu, `,` = `.`, `%`) và chấp nhận `suy_ra` có công thức kiểm được; không khớp thì lỗi chỉ đúng datum;
  3. `loiHoSo`: mỗi `::bieu-do` của trang cần ít nhất một nhận định loại mới `hinh` (có `hinh: <tên>`) cho tiêu đề và chú thích, thuộc `LUON_KIEM` để luôn qua lượt 2 kể cả bài mở rộng (mẫu 8 câu có thể bỏ sót). `xuat` in kèm bảng dữ liệu của hình để lượt 2 nhẹ đối chiếu thang, nhóm.
  4. ghi rõ trong mục 4 rằng máy chỉ bắt "số có trong hồ sơ", còn "gán đúng nhóm, thang đúng" là việc lượt 2 nhẹ (Sonnet, không Haiku).

### A3. File yml của hình vào mã băm: kế hoạch chỉ nêu `src/khoa.mjs`, thực tế chạm ít nhất 9 chỗ; sót một chỗ là để lọt
- Chỗ: README mục 3.3 (H2), `hinh.md` mục 4.1 ("Khóa: …").
- Không xung đột với `::hinh` (hai chỉ thị riêng, hai regex), miễn đừng dùng chung. Danh sách việc:
  1. `src/khoa.mjs` 35-49: `hinhCuaTrang` chỉ khớp `::hinh{ten="…"}`; thêm `bieuDoCuaTrang` và ghép `<!-- bieu-do:<tên> -->` + yml chuẩn hóa vào `maBamTrangFile`; sửa thông báo ở `kiemKhoa` dòng 148. Trang không dùng `::bieu-do` phải giữ mã băm cũ (121 trang đã khóa không được lệch; thêm test hồi quy trên `khoa.json` thật: `node tools/khoa.mjs tinh` phải sạch).
  2. `src/plugins/psyche-markdown.mjs` 103-111 và 237: ép mỗi `::bieu-do` một dòng đúng khuôn (như `::hinh`) và chặn ô "chưa chuyển" ở trang đã khóa.
  3. `src/plugins/thanh-phan.mjs`: hàm dựng, đọc yml, kiểm schema (`loai`, `nguon` có trong `nguon.yml`).
  4. `tools/khoa.mjs` 121-127 `chuaChuyenTrong`: đang cứng `::hinh`; thêm `::bieu-do` thiếu yml.
  5. `src/ban-build.mjs` dòng 73: danh sách file theo dõi chỉ `trong('src/hinh', '.html')`; thêm `.yml`, không thì sửa yml không dựng lại ở `dev`/bộ đệm.
  6. `tests/khoa.test.mjs` 30-51 (mẫu cho `::hinh`) và 113-116; `tests/thanh-phan.test.mjs` 94-137 (một dòng đúng khuôn).
  7. `tests/chuyen.test.mjs` 145-154: mọi `src/hinh/*.html` không có trong `HINH_DA_SUA` phải trùng hình của site cũ. Hình vẽ tay mới (`muller-lyer-ebbinghaus`, `wason-tap-long-nhau`…) và hình vẽ lại sẽ làm phép này đỏ ở máy có `../psyche-zero/` (CI bỏ qua vì không có site cũ). Đề xuất: gỡ phép kiểm (site cũ đã tắt, AGENTS.md nói chỉ để tra) hay đổi thành "hình mới không cần có ở site cũ", không bắt agent nhớ thêm tên vào tập.
  8. `plans/ben-vung/chuan-kiem-dinh.md` mục 7 và `AGENTS.md` mục Khóa, bảng Mẫu trang (thêm dòng `::bieu-do`).
  9. `tests/pham-vi.test.mjs` không cần sửa cho `src/hinh/` (đã trong CHUNG dòng 26), nhưng `src/khoa.mjs`, `tools/khoa.mjs`, `tests/khoa.test.mjs` không thuộc CHUNG: H2 phải đi nhánh riêng (xem B1).
- Lỗ hổng cần nói thẳng: mã băm chỉ khóa yml, không khóa bộ dựng. Một lỗi ở bộ dựng (thang, làm tròn, nhầm nhóm) làm sai hình ở hàng chục trang đã khóa mà `build` không hỏng. Với 20/27 hình cũ từng sai số, đây là rủi ro đúng chỗ kế hoạch bảo vệ.
  Đề xuất bổ sung vào H1/H2: kiểm thử Node (chạy trong `npm test`, không cần trình duyệt) phân tích SVG đầu ra của mọi `::bieu-do`, rút cặp (nhãn, giá trị hiển thị) từ `<text>` và bảng "Xem số liệu", so với yml; thêm mẫu hồi quy (golden) cho từng `loai`.

### A4. Bộ dữ liệu mới không thể "không mở khóa": cần khóa bản ghi và sửa quy tắc `ve-site`
- Chỗ: README mục 3.4 (L1, L2, L4), mục 2 (nguyên tắc 4), mục 3.2 T7.
- Căn cứ: `AGENTS.md` mục Dữ liệu và Khóa: bản thật chỉ hiện bản ghi đã khóa; "mọi trường trang hiện ra phải đã khóa" (`truongDaKhoa`, `src/khoa.mjs` 121-132). `VE_SITE_BO` (`tools/khoa.mjs` 53) chỉ cho `trang`, bốn trường của `linh-vuc`, `trang_nha` của `nghien-cuu`, `trang` và `cap` của `ngo-nhan`; `veSiteDuoc` (54-58) từ chối bộ khác. Bộ mới còn cần: `TEP_DU_LIEU` (`src/khoa.mjs` 65), schema `src/du-lieu.mjs`, bộ hỏng mẫu `tests/du-lieu-hong/`, `tests/du-lieu.test.mjs` ("đủ số bản ghi"), `tests/khoa.test.mjs` 432-458, sửa "Năm bộ dữ liệu" ở `AGENTS.md`.
- Vấn đề: kế hoạch nói "Quan hệ giữa trang là câu `ve-site`: review, không qua lượt 2" nhưng chuẩn hiện không cho. Việc này là sửa công cụ khóa (mức review Lớn, Opus) và chưa nằm trong ước tính NC0 (6–8 phiên cho 8 đầu việc).
- Tương tự T7: "bắt đầu từ bài nào" cần trường mới ở `linh-vuc.yml`; khóa hiện tại là `#bieu_tuong,mau,ten,thu_tu` (`khoa.json` 127-130), nên trường mới phải thêm vào khóa (khóa rộng hơn được phép, `pham-vi.test.mjs` 117-122) và vào `VE_SITE_BO['linh-vuc']`.
- Đề xuất:
  1. thêm đầu việc "H0/L0. Mở rộng khóa dữ liệu cho `lien-quan`, `lo-trinh` (cấu trúc site: ve-site) và trường mới của `linh-vuc`" vào NC0, Opus, review Lớn, 1–2 phiên; sửa `chuan-kiem-dinh.md` mục 6;
  2. cân nhắc đặt quan hệ liên quan thành trường `lien_quan` trong `trang.yml` (bộ `trang` đã cho `ve-site` cả bản ghi) thay vì bộ mới: khỏi đổi `VE_SITE_BO`, `TEP_DU_LIEU`, schema bộ;
  3. `thuat-ngu` (định nghĩa, V3) đi đường nhận định thường, mỗi mục một hồ sơ `kiem-dinh/du-lieu/thuat-ngu/<id>.yml`: tính vào ước 60–80 mục.
  4. mục 2, nguyên tắc 4: sửa "Đổi được mà không mở khóa trang" thành "không mở khóa trang; bản ghi dữ liệu mới vẫn phải khóa".

### A5. Công cụ khóa chưa hỗ trợ "trường hợp mở khóa 5" và "lượt 2 nhẹ"
- Chỗ: README mục 4 và 3.5; câu hỏi của người giao.
- Căn cứ: `tools/khoa.mjs` `lenh('mo')` 374-401 chỉ ghi `ly_do` tự do, mở một trang mỗi lệnh; `loiHoSo` không biết loại thay đổi; `lenh('xuat')` 422-451 dùng `conCanLuot2` (239-248): với bài lõi trả về MỌI nhận định không `ve-site` (bình quân 45 nhận định mỗi trang, bài dài 400+). Dùng nguyên thì "lượt 2 nhẹ" thành lượt 2 đầy đủ cho 78 bài. `trangCuaLo` (254-267) chỉ đọc `## D<n>-L<m>` trong `plans/lam-lai/anh-xa.md`, nên lô N không có nguồn danh sách trang.
- Đề xuất, việc cụ thể (Opus viết, review Lớn, 1–2 phiên):
  1. `mo <trang> --truong-hop 5 --lo N1 --loai hinh-moi,cau-hoi,bo-lap` ghi `mo_khoa[].truong_hop`, `loai_thay_doi`; thêm `mo --lo N1` mở cả lô (78 lệnh tay dễ sót);
  2. `xuat --cham <file id>` hay `--moi` chỉ xuất nhận định bị chạm/mới (từ `bo_lap`, `hinh`, câu hỏi);
  3. `tools/so-nang-cap.mjs`: máy kiểm theo loại (tập câu, tập số, tập chữ hình hẹp/rộng so với cũ, độ dài đáp án) đọc `loai_thay_doi` của hồ sơ; chạy trong `npm test` cho trang có lần kiểm mới kiểu 5;
  4. `plans/nang-cap/anh-xa-lo.md` (bảng lô N, mở rộng `maLo` ở dòng 251);
  5. thêm trường hợp 5 vào `chuan-kiem-dinh.md` mục 8 bằng câu chữ chính xác, kèm test.
- Lưu ý khi so hình vẽ lại: bản hẹp xếp dọc đổi cách ngắt dòng (`<text>` tách thành nhiều `<tspan>`), nên so theo tập token số và tập từ chuẩn hóa, không theo chuỗi nguyên; hình cũ chỉ còn ở git (`git show main:src/hinh/x.html`), vì file bị ghi đè.

---

## B. Nên sửa

### B1. Nhánh `mo/nang-cap-<lô>`: không bị chặn, nhưng cũng không có cổng phạm vi
- Căn cứ: `tests/pham-vi.test.mjs` 82: `/^moi\/(d\d+-(?:l\d+|gom))$/i`; nhánh `mo/…` trả `null` nên bỏ qua. `test.yml` có chạy cho `mo/**`. Kế hoạch (mục 3.5) viết "như một lô của kế hoạch làm lại" và trông đợi cổng ấy.
- Nếu muốn cổng: thêm `^mo\/nang-cap-(n\d+)$`, trang lấy từ `anh-xa-lo.md` (A5.4); báo cáo ở `plans/nang-cap/bao-cao/` (test cứng `plans/lam-lai/bao-cao/` ở dòng 64) cần thêm vào quy tắc; thêm test mẫu cho nhánh nang-cap trong repo thử (đoạn 196-247); sửa `assert.equal(lo.length, 17)` (dòng 129) nếu thêm tiêu đề lô vào `anh-xa.md`.
- Phạm vi CHUNG (dòng 25-33) cho `src/data`, `src/components`, `src/hinh`, `kiem-dinh/khoa.json`, `tests/` trừ hai file canh cổng. Hệ quả: H2 (`src/khoa.mjs`, `tools/khoa.mjs`, `tests/khoa.test.mjs`), T (`src/styles/psyche.css`, `src/menu.mjs`), chỉ thị mới (`psyche-markdown.mjs`) phải ở nhánh `moi/nc0-…`, `moi/nc1-…` (không khớp mẫu `moi/d…` nên không bị cổng) hay ghi rõ tên nhánh trong mục 5. Hiện kế hoạch chỉ đặt tên `mo/sua-ngay` và `mo/nang-cap-<lô>`.

### B2. Lô N quá lớn so với cách hạ tầng kiểm thử bao phủ
- Căn cứ: lô cũ 4–8 trang (`anh-xa.md`; D5-L1 7 trang, D6-L3 7 trang, D3-L1 8 trang). `tools/trang-mau.mjs` `TOI_DA_TRANG_DOI = 8`: kiểm thử trình duyệt, axe, Lighthouse chỉ chạy trên tối đa 8 trang đổi cộng trang đầu tiên (theo chữ cái) có mỗi loại khối; khối `'hình'` là `class="pz-fig"`.
- Hệ quả: N1 29 trang thì 21 trang không được trình duyệt, axe, Lighthouse chạm tới. Mục 8 nói "Lighthouse trong CI" để giữ rủi ro hình nặng trang: với hình mới nhiều, phần lớn trang đã đổi không được đo.
- Đề xuất: N1 chia bốn lô ≤ 8 trang (N1a/b thí nghiệm, N1c/d Hiểu bằng chứng và mục lục); N2–N4 chia theo 7–8 trang; mỗi lô quét hình toàn site bằng script mới (xem B6) và một lần `PSYCHE_TOAN_SITE=1` trước khi gộp.

### B3. Hai SVG (hẹp, rộng): Pagefind, axe, sách in, service worker, Lighthouse
- Pagefind: chỉ mục lấy chữ trong HTML tĩnh, `display:none` không loại. Chữ SVG (nhãn, số) dễ vào chỉ mục hai lần cộng bảng "Xem số liệu" lần ba; làm nhiễu đoạn trích và xếp hạng (`src/tim-kiem/xep-hang.mjs`). Chưa kiểm xem Pagefind có đọc `<text>` trong SVG nội tuyến không; nên kiểm trước. Đề xuất: `data-pagefind-ignore` cho cả hai SVG (giữ `figcaption` và bảng, nơi có số một lần), thêm ca vào `tests/tim-kiem.test.mjs`.
- axe và id: bản ẩn bằng `display:none` ra khỏi cây trợ năng, tốt; không dùng `visibility`/`opacity`. Nếu SVG dùng `<defs>`, marker, gradient thì id trùng giữa hai bản (axe `duplicate-id`): bộ dựng sinh id kèm tên hình và biến thể. `baiTrongSach` (`thanh-phan.mjs` 409-427) tiền tố id khi vào sách, vẫn cần id duy nhất trước đó.
- Sách in `/sach/`: `baiTrongSach` đưa nguyên HTML hình vào cột sách hẹp; `@container` chọn bản theo bề rộng khung, và `@media print` (`thanh-phan.css` ~981) cần quy định rõ chọn bản nào. Thêm ca vào `tests/sach.test.mjs`: mỗi `figure` có đúng một SVG hiển thị ở khung hẹp và ở in.
- Service worker: không thêm tài nguyên (SVG nội tuyến; `sw.js` phiên bản theo mã băm bản build), nên không đổi cơ chế; nhưng HTML mỗi trang to ra (hai SVG và bảng), nên đo kích thước HTML tổng trước và sau N1. Chưa kiểm xem `sw.js` có giới hạn dung lượng precache không.
- Lighthouse: xem B2.
- 11 px ở 360 px: phép đo `kiem-hinh` chỉ ở 360; ở màn 320 px (SE đời cũ) chữ 12 đơn vị viewBox 360 chỉ còn khoảng 10,2 px. Thêm một ca 320 px hoặc ghi rõ 360 px là sàn.

### B4. Đọc tiếp, Trong mục này, trang Ngộ nhận, vạch tiến độ: cách dựng khó hơn kế hoạch nghĩ ở ba chỗ
- "Đọc tiếp" "loại trùng với Đọc thêm đã có": trong `src/` không thấy mã nào dựng "Đọc thêm" cho bài (chỉ `thanh-phan.mjs` 494 cho thẻ ngộ nhận); `dua_tren` chỉ nằm ở `du-lieu.mjs`, `content.config.ts`, `trang.yml`, trái với lời của `them-noi-dung.md` mục 3. Cần kiểm lại; nếu chưa có thì "Đọc thêm" cho bài mở rộng là việc chưa làm và M1 phụ thuộc nó.
- Chỗ chèn: `MarkdownContent.astro` hiện chỉ nối `BoSung` sau nội dung (sau Nguồn). "Sau Thử suy ngẫm" nghĩa là giữa nội dung, nên cần một plugin chèn dấu chỗ trước mục Nguồn (không đổi file `.md`, không đổi mã băm) hay tách HTML theo `id`. Ghi rõ cách chèn và thêm test; bài thí nghiệm, Hiểu bằng chứng, mở rộng có thể khác thứ tự mục.
- Trang chủ (T4): `index.md` đã khóa, có 5 câu `ve-site`: thêm chỉ thị vào `.md` là mở khóa (kế hoạch đã ghi); chỉ thị mới như `::the-linh-vuc` nằm trong `psyche-markdown.mjs`: ngoài CHUNG, xem B1.
- T5 "Trong mục này": chỉ có ích sau khi lô N thêm tiêu đề cấp 3; làm trước N thì phần lớn bài chưa có gì để hiện. Đề xuất chuyển T5 sau N1 hay làm cùng.
- T6 Ngộ nhận: tiêu đề con do chỉ thị sinh trong HTML không vào mục lục của Starlight (chỉ tiêu đề Markdown vào); viên lọc dùng `#id` (kiểm bởi `link.test.mjs`). `tests/ngo-nhan.test.mjs` 81-133 kiểm cấu trúc theo nhãn và số thẻ bằng số thẻ trò chơi; phải sửa kèm. "Thẻ thu gọn" bằng `<details>` thì giải thích và nguồn vẫn vào Pagefind (ổn) và phải mở khi in.
- T10 vạch tiến độ bằng CSS: `animation-timeline: scroll()` chưa chắc có ở Firefox (chưa kiểm); bọc `@supports`, ba trình duyệt không được hỏng.

### B5. Ước tính phiên và thứ tự đợt
- Căn cứ: `plans/lam-lai/README.md` dòng 62: 121 trang kiểm định đầy đủ trong 30–40 phiên (khoảng 0,3 phiên mỗi trang). D3-L1 (8 trang): khoảng 6 giờ, nhiều agent. Kế hoạch nâng cấp tính: N 40–45 phiên cho 78 trang (0,55 mỗi trang), N1 14–16 phiên cho 29 trang. M: 31 phiên cho 18 bài (1,7 mỗi bài), trong khi `them-noi-dung.md` mục 1 tính bài mở rộng 1 phiên, bài lõi 1–2 phiên.
- Nhận xét: "phiên" chưa có định nghĩa (một lô 6–8 trang với 5–8 agent thật sự là 0,5–1 ngày). Nếu 1 phiên ≈ 1 lô thì N1 = 4 lô = 14–16 phiên là cao gấp đôi mà việc nhẹ hơn (không kiểm định lại cả bài); nhưng mã mới (bộ dựng, so-nang-cap, kiem-hinh) và 10 hình dữ liệu ở N1 có rủi ro làm đội. M gần cận trên của khung `them-noi-dung.md`, chấp nhận được. NC0 (6–8) và NC1 (8–10) thấp: xem dưới.
- Đề xuất: định nghĩa "phiên" ở đầu mục 3; ghi N1a làm mẫu đo (như D3-L1 đã làm) rồi chỉnh các lô sau; đừng giữ khoảng 100–120 như cam kết.
- NC0 thiếu: A4 (khóa bộ dữ liệu mới, 1–2 phiên), A5 một phần; L1 cần viết `lien-quan` cho 78+ bài (phán đoán từng bài, mỗi bản ghi một hồ sơ `ve-site`), bản thân bằng cỡ một lô lớn; H1 là khung Playwright mới. Ước NC0 thực tế 10–13.
- NC1: H2 (Opus, review Lớn) cộng golden test (A3), V0 (Opus, review Lớn), T4, T6, T7, T9, H3, `cau-hoi.test`. 8–10 là thấp; 12–16.
- Phụ thuộc cần sửa:
  1. S3 (vẽ lại 4 hình, mở khóa 4 trang) và S1, S2 (3 trang) chạy trước N, rồi N lại mở khóa chính các trang ấy (`thong-ke-mo-ta` N1; `tre-hoc-noi`, `bat-hoa-nhan-thuc`, `tre-hoc-the-nao` N3; `giac-mo` N4; `tri-nho-lam-viec`, `ao-giac-thi-giac` N2): vi phạm nguyên tắc 2 "mở khóa một lần". Giữ S1 (ghi chú nội bộ lọt ra site, gấp), đẩy S2, S3 vào lô N của từng trang; T1 (cuộn ngang) là cách tạm cho đến lúc đó.
  2. C (công cụ) ghi điều kiện "H1": công cụ không cần H1. Ngược lại N1 muốn trang bằng chứng link tới C1, C2 ("Tự trải nghiệm link tới công cụ", mục 3.5 việc 5) trong khi C1, C2 làm sau N1: trang `thi-nghiem-doi-chung`, `co-mau-suc-manh` phải mở khóa lần hai. Đưa C1, C2 (mức A) trước N1, hay chỉ chỉ thị `::cong-cu` ở lô sau và đừng link trước.
  3. L1 "Đọc tiếp" phủ 51/51 (mục 6) trước N, trong khi N việc 5 lại thêm link trong thân bài: hai lần làm một việc. Quy định N chỉ thêm link thân bài ở chỗ cần (lần đầu nhắc khái niệm), "Đọc tiếp" lo phần còn lại.
  4. M1 "chạy song song từ NC1" nhưng bài mới cần `::bieu-do` (H2), `lien-quan` (L1/A4) và `cau-hoi.test` (chặn bài mới): bắt đầu M1 sau khi H2 và A4 đã gộp, không phải đầu NC1.
  5. Cột "Điều kiện" của V1: V0 trước V1 đúng; hai bài M dùng bổ sung (M6, M1) đợi V1.
- Tách/gộp: tách H2 thành H2a (bộ dựng, bảy `loai`, golden test) và H2b (đưa vào mã băm, A3), review riêng; gộp H3 với H2b; gộp T5 vào sau N1.

### B6. CI, rủi ro bị bỏ sót
- `kiem-hinh.mjs` cho cả site chạy ở Chromium 360 và 1280 px (cộng 320): thêm một job `hinh` vào ma trận `test.yml` và `deploy.yml`, và vào danh sách cứng ở `.github/actions/kiem-thu/action.yml` dòng 12 và 18 (kế hoạch không nêu). Phần lâu nhất hiện khoảng 4 phút (`test.yml` dòng 29): một job riêng không làm chậm thêm. Chạy trên mọi trang có `pz-fig`, không chỉ trang mẫu (B2). Chỉ Chromium cho `<text>` đè nhau là hợp lý (cùng font tự host).
- Đổi mã băm hàng loạt: 78 trang mở khóa rồi khóa lại; `build` hỏng nếu quên khóa lại, `deploy` giữ bản cũ. Ghi vào quy trình lô: `node tools/khoa.mjs tinh` sạch trước khi mở PR.
- Xung đột khi nhiều lô song song (2–3 agent nặng) cùng sửa file chung: `kiem-dinh/khoa.json` (825 dòng, mỗi trang một dòng, `docKhoa` đã có cảnh báo "hay hỏng vì xung đột khi gộp nhánh"), `src/data/nguon.yml` (nguồn mới thêm cuối file), `src/data/trang.yml`, `plans/lam-lai/anh-xa.md`, và file mới `lien-quan.yml` (mọi lô N, M đều sửa). Đề xuất: (1) tách `lien-quan` theo lĩnh vực hay nằm trong `trang.yml`; (2) mỗi lô rebase lên `main` rồi mới `khoa` (mã băm tính trên file hiện có); (3) gộp lô tuần tự, không gộp song song hai lô chạm `nguon.yml`; (4) danh sách miễn của `cau-hoi.test.mjs` suy từ hồ sơ (lần có `truong_hop: 5`), không dùng file danh sách mà mọi lô đều sửa. Bài mới thì chặn ngay.
- Bài mới (M) và các file kế hoạch không nêu: thêm bản ghi `trang.yml`, bảng `plans/lam-lai/anh_xa.py` rồi sinh lại `anh-xa.md` (`tests/du-lieu.test.mjs` 47 bắt lệch; `tests/pham-vi.test.mjs` 127-139 bắt `lo.length === 17` và "mỗi trang thuộc đúng một lô, đủ mọi trang của `trang.yml`": thêm bài là đỏ cho tới khi sửa), `src/menu.mjs` (`tests/giao-dien.test.mjs` 90: mọi trang thuộc đúng một nhóm; trang mới ngoài lĩnh vực như lộ trình, thuật ngữ, đọc tin cần nhóm), `chu_de` ở `trang.yml` cho tìm kiếm, `nghien-cuu.yml` nếu bài là trang nhà mới, hồ sơ `kiem-dinh/`, `AGENTS.md` (số trang, "Năm bộ dữ liệu", bảng Mẫu trang), `plans/lam-lai/cong-nghe.md` mục 3 (thư mục) và mục 8 (CI), `plans/ben-vung/README.md` mục 3 (bảng chỗ trống: README nâng cấp đã nêu). Đề xuất: sửa `pham-vi.test.mjs` đếm lô động và thêm mục "trang mở rộng ngoài kế hoạch làm lại" vào `anh-xa.md`; liệt kê checklist "thêm một bài" trong mục 3.6.
- Câu hỏi quiz (370 câu): đáp án sai viết lại là chữ mới ngoài hồ sơ; "sai rõ" với số liệu thì phải kiểm. Lượt 2 cho câu hỏi dùng Sonnet; không dùng Haiku cho phần này (README mục 4 ghi "Haiku hay Sonnet").
- Chỗ đúng, nên giữ: tách S/T không chạm khóa; điểm dừng sau mỗi đợt; N chỉ xóa câu; kiểm thử độ dài câu hỏi (`docQuiz` đã ép đúng một `+`, nên phép đếm độ dài làm được trên khối ` ```quiz `); H1 đo chữ trên trình duyệt thật.

---

## C. Gợi ý

1. Hình dùng nhiều trang: hiện mỗi hình một trang (đếm `::hinh` trong `src/content/docs/`: không hình nào dùng hai lần), nên cảnh báo "mở khóa mọi trang dùng nó" chưa xảy ra; yml của `::bieu-do` nên giữ ràng buộc một yml một trang (kiểm bằng test), để khỏi tái tạo vấn đề.
2. Lighthouse: sau N1 chọn một trang nhiều hình làm trang mẫu cố định (`PSYCHE_TRANG`) để ngân sách hiệu năng có số đo thật.
3. `kiem-hinh`: lưu số đo (số chữ nhỏ nhất theo hình) vào báo cáo lô để thấy xu hướng, như `plans/nang-cap/bao-cao/<lô>.md` đã dự kiến.
4. Nên có một bảng "file chạm" cho từng đầu việc H, L, T trong kế hoạch (như phạm vi `THEM` của `pham-vi.test.mjs`), để biết nhánh nào cần cổng, nhánh nào không.
5. S4 (service worker, `/ho-tro/` hơn 30 giây): có thể gộp với việc treo "Firefox `kiem-ngoai-tuyen` thỉnh thoảng hỏng" (`lam-lai/README.md` 208) vì cùng một vùng mã `src/scripts/ngoai-tuyen/`.
