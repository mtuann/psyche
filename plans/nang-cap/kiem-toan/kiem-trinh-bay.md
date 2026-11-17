# Kiểm trình bày: hình, bài dài, lối vào, công cụ, tìm kiếm

Bản build thật (`dist/`, main ccc49d1), Chromium của Playwright, 360 px (tối, cảm ứng, x2) và 1280 px (sáng). Không sửa gì trong repo. Ảnh chụp, số đo thô và script đo (`hinh.mjs`: đo cỡ chữ, chữ đè, chữ ra ngoài SVG) nằm ở thư mục tạm của phiên kiểm toán, không lưu trong repo; tên ảnh nhắc trong file này chỉ để tra trong phiên ấy.

Cách đo cỡ chữ hình: cỡ chữ trong SVG (`font-size`, đơn vị viewBox) nhân tỉ lệ vẽ thật (bề rộng SVG trên màn / bề rộng viewBox). Ở 360 px, SVG rộng 328 px; ở 1280 px, rộng 632 px (khung `.pz-fig` tối đa 40rem).

---

## (a) 27 hình và quy chuẩn hình

### Phát hiện chung về hình

- **Chữ trong hình nhỏ hơn rất nhiều so với chữ bài.** Chữ bài 16 px, chú thích hình khoảng 14 px, còn chữ trong SVG ở 360 px: nhỏ nhất 4,6 px (skinner-schedules), trung bình nhỏ nhất khoảng 5,5 px, lớn nhất 7,8 px (erickson-hippocampus). **21/27 hình có chữ dưới 6 px, 26/27 dưới 7 px.** Không hình nào có chữ nhỏ nhất đạt 9 px, nói gì tới 11 px.
- Nguyên nhân: viewBox rộng 640 đến 720 (hầu hết), thu về 328 px thì tỉ lệ 0,46 đến 0,51; chữ gốc 10 đến 12 viewBox-px thành 4,6 đến 6,1 px. Chỉ erickson-hippocampus (viewBox 460) và cuijpers-funnel (580) khá hơn.
- **Ở 1280 px cũng nhỏ:** nhỏ nhất 8,8 đến 15 px; 9 hình có chữ dưới 10 px (skinner 8,8; gross 9,2; seligman 9,2; funnel-demo 9,3; elm, baddeley, gf-gc, gas-curve 9,8; mean-vs-median 9,9), vì khung hình dừng ở 640 px và viewBox 680 đến 720 bị thu nhẹ.
- Không có tràn ngang trang (scrollWidth = 360 ở mọi trang có hình). Màu hai chế độ dùng được: chàm và hồng đều đọc được ở nền tối và sáng (xem `h-*-m.png` và `h-*-d.png`). Chỉ có hai chỗ nhạt: cặp cột "Thước đo khác" của osc-replication (hai màu nhạt hơn, ở nền sáng rất nhạt), và nhóm A/B của hieu-ung-d chồng nhau thành màu tím mờ.
- Không hình nào có `<title>`/`<desc>`; chỉ có `aria-label` (một câu, không nêu số liệu). Số liệu chỉ có trong chữ SVG (trình đọc màn hình bỏ qua vì `role="img"`) và một phần trong chú thích. **Người dùng trình đọc màn hình không lấy được số liệu của đa số hình** (trừ hình có số lặp trong chú thích: milgram, bystander, festinger, cuijpers, mean-vs-median...).
- Chú thích dài ngắn lệch nhau: 105 đến 545 ký tự (trung vị khoảng 290). Mười hình mở bằng câu "Sơ đồ minh họa ước lệ, không theo tỉ lệ số liệu." và ba hình (gross-model, seligman-design, skinner-schedules) còn lặp câu ấy ngay trong SVG, nên người đọc thấy hai lần (ảnh `h-skinner-schedules-m.png`, `h-gross-model-m.png`).
- Nguồn: 8 hình ghi "Nguồn: ..." trong chú thích (duong-cong-quen, loftus, festinger, key-ring, linda, osc, bystander, milgram). 13 hình khác nêu tác giả và năm trong chú thích nhưng không đánh dấu "Nguồn:" (cuijpers, marcia, gf-gc, tinh-di-truyen, erickson, harlow, seligman, skinner, piaget...). 6 hình không có năm (baddeley, elm, lo-trinh-hoc-noi, gas-curve, gross, flow, funnel-demo là sơ đồ ước lệ; hieu-ung-d, tuong-quan, mean-vs-median là dữ liệu giả lập đã nói rõ "giả định"/"giả lập").
- Mọi sửa trong `src/hinh/*.html` làm đổi mã băm của trang dùng nó (`src/khoa.mjs`, `maBamTrangFile` gồm nội dung hình), tức **mở khóa trang**. Chỉ CSS và plugin dựng trang là không chạm khóa.

### Bảng 27 hình

Cột "Nhỏ nhất 360" là px trên màn (chữ nhỏ nhất); "1280" là cùng đại lượng ở 1280. viewBox là rộng×cao.

| Hình | Trang | viewBox | Nhỏ nhất 360 | 1280 | Vấn đề | Đề xuất sửa |
|---|---|---|---|---|---|---|
| duong-cong-quen | kham-pha/tri-nho/vi-sao-ta-quen | 640×330 | 5,6 | 10,9 | Bảy mốc thời gian dưới trục ở 5,6 px, hai đường cong + chú giải trong vùng vẽ. Có "Nguồn: Murre và Dros (2015), Bảng 3". | Bản hẹp 360 rộng: bỏ mốc "9 giờ" và "2 ngày", chú giải đặt trên cùng. Giữ nguồn. |
| baddeley-model | kham-pha/tri-nho/tri-nho-lam-viec | 680×440 | 5,1 | 9,8 | Dòng phụ trong ô ("giữ thông tin âm thanh, lời nói") 5,1 px; mũi tên hai chiều quá nhỏ; không ghi nguồn. | Bản hẹp xếp dọc, chữ phụ lên 12 viewBox-px; thêm "Theo Baddeley (2000)" nếu có trong hồ sơ. |
| loftus-verbs | kham-pha/tri-nho/bang-ghi-hinh | 640×350 | 5,6 | 10,9 | Nhãn động từ và số liệu 5,6 px. Có nguồn. | Bản hẹp, số liệu đặt trên cột, chữ 12. |
| cuijpers-funnel | kham-pha/suc-khoe-tam-than/tri-lieu-tam-ly | 580×648 | 6,2 | 12,0 | Hai biểu đồ chồng trong một SVG cao 648 (ở 360 cao 370 px). Chú thích 449 ký tự lặp lại số liệu (tốt cho trình đọc màn hình, nặng cho mắt). Không "Nguồn:". | Giữ; thêm dòng "Nguồn: Cuijpers và cộng sự (2023)"; rút chú thích. |
| elm-routes | kham-pha/tam-ly-xa-hoi/thuyet-phuc | 680×482 | 5,1 | 9,8 | Nhãn "Có"/"Không" và dòng phụ tiếng Anh ("central route") 5,1 px. Không nguồn. | Bản hẹp: sơ đồ dọc, ô rộng 300; ghi "Theo Petty và Cacioppo". |
| festinger-diverging | kham-pha/tam-ly-xa-hoi/bat-hoa-nhan-thuc | 680×300 | 5,3 | 10,2 | **Nhãn "+5 (cực thích)" bị cắt ở mép phải** (tâm x=650, rộng quá viewBox) ở cả 360 và 1280; tiêu đề trục lọt mép. Ảnh `h-festinger-diverging-m.png`. | Neo `text-anchor="end"` cho nhãn cuối, hoặc rút thành "+5"; bản hẹp xếp cột. |
| piaget-timeline | kham-pha/phat-trien/tre-hoc-the-nao | 640×300 | 6,1 | 11,9 | **Đường dẫn của chấm cắt ngang chữ chú thích** ("3,5 tháng", "Wakeley") ở cả hai cỡ; chữ chú thích dài 1 dòng 6 px. Ảnh `h-piaget-timeline-m.png`. | Đặt chú thích sang trái/phải đường dẫn không cắt; ở bản hẹp chuyển ba phát hiện thành danh sách dưới trục thời gian. |
| marcia-matrix | kham-pha/phat-trien/ban-sac-tuoi-teen | 680×452 | 5,5 | 10,7 | Ma trận 2×2 đọc được, nhưng nhãn trục và dòng "chọn sẵn theo người khác" 5,5 px. | Bản hẹp, ô rộng hơn, bỏ lề trái thừa. |
| gf-gc-curves | kham-pha/phat-trien/tuoi-gia | 680×432 | 5,1 | 9,8 | Chú giải Gf/Gc trong góc vùng vẽ 5,1 px; trục tuổi không có số (đã nói trong chú thích 545 ký tự, dài nhất site). | Nhãn đường cong ngay trên đường (đã có "Gf", "Gc"), bỏ chú giải thứ hai; rút chú thích. |
| lo-trinh-hoc-noi | kham-pha/phat-trien/tre-hoc-noi | 640×310 | 6,1 | 11,9 | **Hình hỏng bố cục ở mọi cỡ**: hai nhãn "~12 tháng: từ đầu tiên" và "16–24 tháng: ghép từ..." đè lên nhau; chấm mốc không thẳng hàng với nhãn tháng 0/6/12/18/24 (mốc 24 nằm giữa khoảng trống); các đường dẫn cắt qua chữ. Ảnh `h-lo-trinh-hoc-noi-m.png`, `h-lo-trinh-hoc-noi-d.png`. Không nguồn. | Vẽ lại: trục 0-24 tháng đều, nhãn xếp so le không đè, hoặc chuyển thành danh sách mốc theo trục dọc (ở bản hẹp). Cần mở khóa trang. **Ưu tiên A.** |
| gas-curve | kham-pha/cang-thang-giac-ngu/stress-co-hai | 680×432 | 5,1 | 9,8 | Tên ba giai đoạn và "mức bình thường" 5,1 px; không nguồn. | Bản hẹp; chữ 12; ghi "Theo Selye (1936/1950)" nếu có trong hồ sơ. |
| thi-nghiem-key-ring | kham-pha/co-so-sinh-hoc/nao-che-doi | 640×340 | 5,6 | 10,9 | Có chữ 22 (KEY/RING) lẫn chữ 11: tương phản cỡ lớn, nhưng chú thích ô 5,6 px. Có nguồn. | Bản hẹp. |
| tinh-di-truyen-theo-tuoi | kham-pha/co-so-sinh-hoc/gen-va-tinh-cach | 640×330 | 5,6 | 10,9 | Cột cuối từ nguồn khác (Bouchard) đã giải thích trong chú thích 462 ký tự; nhãn trục 5,6 px. Chú thích nêu nguồn nhưng không "Nguồn:". | Khác biệt cột cuối nên thể hiện bằng khoảng cách/vạch đứt trong hình (nếu chưa có); bản hẹp. |
| erickson-hippocampus | kham-pha/co-so-sinh-hoc/the-duc-nao | 460×448 | **7,8** | 15,1 | Tốt nhất bộ: viewBox hẹp, thành 7,8 px. Vẫn dưới 11 px; ở 1280 phóng tới 15 px (lớn hơn chữ bài). | Mẫu để mở rộng (viewBox ≈360 là đạt 11 px). Giới hạn bề rộng hình theo viewBox. |
| linda-venn | kham-pha/tu-duy/linh-cam-va-xac-suat | 640×430 | 6,1 | 11,9 | Chữ trong tập hợp 6 px; chữ "(a)", "(b)" 17 nên trội. Có nguồn. | Bản hẹp. Hình đáng giữ (ví dụ tốt về hình giải thích). |
| gross-model | kham-pha/cam-xuc-dong-luc/dieu-tiet-cam-xuc | 720×360 | **4,8** | 9,2 | Năm bước nằm một hàng ngang trong 720 viewBox; chữ "Tình huống", "Chú ý"... 6 px, dòng 5 chiến lược 4,8 px; **dòng "Sơ đồ minh họa ước lệ" lặp trong SVG và trong chú thích**. Ảnh `h-gross-model-m.png`. | Bản hẹp: 5 bước xếp dọc hoặc 2 hàng; bỏ dòng lặp trong SVG; chiến lược thành danh sách. |
| flow-channel | kham-pha/hanh-phuc/dong-chay-flow | 680×470 | 5,3 | 10,2 | Nhãn vùng ("Lo âu", "Chán nản", "Thờ ơ") 5,3 px; nhãn trục 5,3 px; có dòng chú thích trong SVG (5,3 px). | Bản hẹp, vùng chữ lớn hơn. |
| hieu-ung-d | bang-chung/do-lon-hieu-ung | 680×242 | 5,8 | 11,2 | Ba cặp phân bố 5,8 px; dòng "Chồng lấn: 92% / B cao hơn A: 56% số cặp" là số liệu chính, nhỏ nhất. | Bản hẹp: xếp dọc ba cặp (cao 3×120), số liệu 12. |
| osc-replication | bang-chung/khung-hoang-tai-lap | 640×400 | 5,6 | 10,9 | Hai ghi chú dưới hình ("39%: đánh giá chủ quan...") 5,6 px, quan trọng cho nghĩa; cột "Thước đo khác" màu nhạt (độ tương phản thấp). Có nguồn. | Đưa hai ghi chú ra chú thích HTML (chữ thường) hoặc ≥ 11; đậm màu cột cuối. |
| tuong-quan | bang-chung/tuong-quan-nhan-qua | 700×210 | 6,6 | 12,6 | Bốn ô tán xạ cạnh nhau, chữ r = ... 6,6 px; chấm nhỏ. Là dữ liệu giả lập (đã nói). | Bản hẹp 2×2 (rộng 160 mỗi ô). |
| mean-vs-median | bang-chung/thong-ke-mo-ta | 640×400 | 5,1 | 9,9 | Số trên mỗi cột (6, 7, 8...) 5,1 px **đè lên vạch trung bình và trung vị** (`h-mean-vs-median-m.png`, `light4.png`). | Bỏ số trên cột nhỏ (đã có trong chú thích), chỉ ghi số cột 60; hoặc đẩy nhãn lên trên vạch. |
| funnel-demo | bang-chung/phan-tich-tong-hop | 680×445 | 4,8 | 9,3 | Hai phễu cạnh nhau, nhãn trục 4,8 px. Chú thích 335 ký tự (dài, nhưng giải thích tốt). | Bản hẹp: hai phễu chồng dọc. |
| harlow-contact | thi-nghiem/harlow | 640×340 | 5,6 | 10,9 | Số giờ trên cột và nhãn "mẹ vải/mẹ dây" 5,6 px. Chú thích nêu Harlow (1958) nhưng không "Nguồn:". | Bản hẹp; thêm "Nguồn:". |
| seligman-design | thi-nghiem/seligman | 720×486 | 4,8 | 9,2 | Sơ đồ thiết kế ba nhóm × hai giai đoạn, 6 cỡ chữ khác nhau (10,5 đến 13), 4,8 px ở dòng ghi chú cuối; **dòng "Sơ đồ minh họa ước lệ" lặp**. Ảnh `tong-m1.png`. | Bản hẹp: ba nhóm xếp dọc; bỏ ghi chú cuối khỏi SVG (đã có trong chú thích). |
| skinner-schedules | thi-nghiem/skinner | 720×548 | **4,6** | 8,8 | Nhỏ nhất bộ. Bốn đồ thị 2×2, nhãn trục "đáp ứng", "thời gian" xoay 4,6 px, ghi chú dưới mỗi đồ thị ("cao, vỡ nhịp sau thưởng") là nội dung chính; **dòng ước lệ lặp**. Ảnh `h-skinner-schedules-m.png`. | Bản hẹp: bốn đồ thị xếp dọc, ghi chú phía trên, chữ 12; bỏ nhãn trục lặp. |
| bystander-smoke | thi-nghiem/darley-latane | 640×400 | 5,6 | 10,9 | Cột 75% / 38% / 10%, nhãn nhóm 5,6 px. Có nguồn. | Bản hẹp, cột ngang với nhãn bên trái. |
| milgram-obedience | thi-nghiem/milgram | 640×340 | 5,6 | 10,9 | Số "26/40", "450V" nhỏ; chú thích ngắn nhất (105 ký tự) và có nguồn: tốt. | Bản hẹp. |

Ghi chú về bốn hình tốt nhất để lấy làm mẫu: erickson-hippocampus (cỡ chữ), linda-venn (giải thích bằng hình), milgram-obedience (chú thích ngắn, có nguồn), cuijpers-funnel (có tiêu đề trong hình, số trên cột).

### Quy chuẩn hình đề xuất

1. **Cỡ chữ tối thiểu trên màn: 11 px; số liệu và nhãn chính 12 px trở lên.** Công thức khi thiết kế: chữ nhỏ nhất (viewBox-px) ≥ 11 × (bề rộng viewBox / 328) để đạt 11 px ở 360 px. Với viewBox 360 thì chữ nhỏ nhất là 12 viewBox-px (cho 10,9 px: coi như đạt); với viewBox 680 phải ≥ 23 viewBox-px, vô lý, nên không thể giữ nguyên một SVG rộng 680 cho điện thoại.
2. **Hai bản bố cục (bản hẹp và bản rộng) cho mọi hình có nhiều hơn một nhóm chữ.** Bản hẹp: viewBox rộng 340 đến 360, xếp dọc (hai cột thành hai hàng, phễu chồng, 2×2 thành 1 cột), cao tới 500. Bản rộng: như hiện nay nhưng chữ ≥ 12 viewBox-px (ở 632 px còn ≥ 11 px). Hiện bằng CSS (`@container` hoặc `@media (max-width: 40rem)` đổi `display` của hai `<svg>`); `display:none` loại bản ẩn khỏi cây trợ năng. Một hình, một nhóm chữ (hình nhỏ, như tuong-quan, erickson) chỉ cần bản hẹp-và-rộng chung (viewBox 360).
3. **Chữ trong hình là chữ thật (giữ).** Tối đa 3 cỡ chữ mỗi hình (tiêu đề 14, nhãn 12, ghi chú 11); bỏ cỡ lẻ (10, 10,5, 11,5, 12,5, 13,5) như seligman có 6 cỡ.
4. **Không để chữ đè nhau hoặc bị cắt:** thêm bước kiểm tự động (Playwright đo `getBoundingClientRect` của mọi `<text>`: không đè nhau, không ra ngoài SVG, cỡ ≥ 11 px ở 360 px). Script của tôi (`hinh.mjs`) làm được và có thể thành `tests/hinh.test.mjs`.
5. **Đánh số hình: "Hình 1" ở đầu chú thích**, tự sinh bằng CSS counter hoặc plugin dựng trang (không sửa trang khóa). Hiện mỗi bài tối đa một hình, nên số 1 luôn là 1; đánh số vẫn có ích khi bài nêu "xem hình dưới đây" và khi bài sau này có nhiều hình.
6. **Chú thích ba phần cố định:** (1) một câu nói hình cho thấy gì, (2) ghi chú cách đọc (nếu cần), (3) dòng cuối "Nguồn: tác giả (năm)" hoặc "Sơ đồ minh họa, không theo tỉ lệ." hoặc "Dữ liệu giả lập." Mỗi hình đủ ba dòng này; chú thích dài hơn khoảng 300 ký tự thì đẩy ý phụ vào bảng số liệu. Bỏ dòng lặp ngay trong SVG (gross, seligman, skinner).
7. **Bảng số liệu thu gọn cho trình đọc màn hình và người cần số chính xác:** `<details class="pz-fig-so">` dưới chú thích với tiêu đề "Xem số liệu của hình" chứa bảng 2 đến 3 cột (đúng các số đã có trong hình). Có thể kết hợp `aria-describedby` nối `aria-label` ngắn với một đoạn mô tả ẩn bằng chữ. Chữ thuộc hình nên khóa cùng trang. Hình ước lệ không số liệu: chỉ cần mô tả bằng một đoạn văn (đã có trong chú thích).
8. **Hình rộng trên điện thoại:** ưu tiên bản hẹp (mục 2). Hình bắt buộc rộng (đường cong 7 mốc như duong-cong-quen): khối cuộn ngang nhận focus ("Hình N, cuộn ngang được") như bảng, SVG min-width 34rem. Chỉ dùng khi bản hẹp không có cách xếp hợp lý.
9. **Màu:** mỗi hình tối đa hai màu dữ liệu (chàm, hồng) cộng xám; số liệu không chỉ khác nhau bằng màu (thêm nét đứt hoặc nhãn trực tiếp: đã có ở duong-cong-quen và mean-vs-median). Cột "nhạt hơn" (osc) vẫn phải đạt 3:1 với nền ở cả hai chế độ.
10. **Bề rộng khung:** `max-width` của `.pz-fig` theo viewBox (erickson 460 thì khung ≈ 460), tránh phóng chữ 15 px ở 1280 trong khi hình khác 9 px.

---

## (b) Cải tiến trình bày, xếp ưu tiên

Ký hiệu công sức: S ≤ nửa ngày, M một đến vài ngày, L cả tuần. "Mở khóa" = phải sửa file `.md` hoặc `src/hinh/*.html` của trang đã khóa.

### Ưu tiên A

**A1. Trang chủ không có menu nào, và không dẫn tới Khám phá, Thí nghiệm, Ngộ nhận, Hiểu bằng chứng, Sách in.**
- Vấn đề: ở 360 px thanh trên của trang chủ chỉ có logo, tìm kiếm và chọn giao diện, không có nút menu; ở 1280 px cũng không có thanh bên (trang splash). Liên kết trong trang chủ chỉ đi tới: Bắt đầu đọc (`/bat-dau/`), Cách kiểm chứng, 11 công cụ, 14 trang lĩnh vực, 6 bài "Mới kiểm chứng", Dữ liệu của tôi, Nhật ký, Hỗ trợ. **Không có liên kết nào tới `/kham-pha/`, `/thi-nghiem/`, `/ngo-nhan/`, `/bang-chung/`, `/trai-nghiem/` (mục lục), `/sach/`**, đo bằng danh sách `href` của trang chủ (`lk.mjs`). Người mới chỉ thấy các nhóm này sau khi bấm sang một trang con có menu. Ảnh: `v-home-m-1.png`, `home-full-m.png`, `v-home-d-1.png`.
- Đề xuất: thêm dải "Đi theo cách của bạn" sau hero: 5 thẻ lớn (Bài khám phá, Thí nghiệm kinh điển, Ngộ nhận phổ biến, Hiểu bằng chứng, Tự trải nghiệm) mỗi thẻ có một câu và số bài; đặt trước "Thử với chính bạn". Cho trang chủ có nút menu (thanh bên hiện ở trang con) hoặc dải liên kết nhóm trên thanh trên.
- Công sức: S đến M (`Hero.astro`/trang chủ là trang splash, kiểm có nằm trong 121 trang khóa; nếu trang chủ khóa thì mở khóa một trang).
- Mở khóa: có thể (nếu nội dung nằm trong `index.md`); thêm dải qua component thì không. Rủi ro: thấp; thêm 5 thẻ làm trang chủ dài thêm khoảng 500 px, chú ý LCP (không ảnh).

**A2. Hình quá nhỏ ở điện thoại: 21/27 hình có chữ dưới 6 px.**
- Vấn đề và số đo: phần (a). Ảnh `h-skinner-schedules-m.png`, `h-gross-model-m.png`, `tong-m1.png`, `tong-m2.png`, `tong-m3.png`.
- Đề xuất: quy chuẩn (a) mục 1 đến 4. Làm theo lô: trước hết hình mà chữ là nội dung chính (skinner, seligman, gross, funnel-demo, hieu-ung-d, osc, flow, mean-vs-median).
- Công sức: L (27 hình, mỗi hình khoảng nửa giờ đến vài giờ + kiểm định lại phần chạm). Có thể làm dần theo thứ tự ưu tiên.
- Mở khóa: **có** (chữ và số trong hình là nhận định; mã băm gồm hình). Rủi ro: sửa số liệu sai khi vẽ lại; phải có test đo chữ và so lại chữ với bản cũ (tool `so-chu` cho hình, hoặc kiểm bằng văn bản `text` của SVG: tập chữ phải y nguyên).
- Giải pháp nhẹ tạm thời (không mở khóa, CSS-only): trên màn hẹp cho `.pz-fig` `overflow-x:auto` + `svg {min-width: 34rem}` (≈544 px, chữ nhỏ nhất 8 đến 10 px) kèm focus bằng plugin; kém hơn bản hẹp vì người dùng phải kéo ngang, nhưng không chạm trang.

**A3. Một hình hỏng bố cục và vài hình có chữ bị cắt/đè.**
- Vấn đề: `lo-trinh-hoc-noi` (nhãn đè nhau, chấm lệch nhãn tháng, đường dẫn cắt chữ, ở cả 360 và 1280; ảnh `h-lo-trinh-hoc-noi-m.png`, `-d.png`); `festinger-diverging` ("+5 (cực thích)" bị cắt mép phải); `piaget-timeline` (đường dẫn cắt chữ); `mean-vs-median` (số cột đè vạch).
- Đề xuất: sửa ngay bốn hình này, kể cả ở bản rộng.
- Công sức: S mỗi hình (M tổng); mở khóa 4 trang (tre-hoc-noi, bat-hoa-nhan-thuc, tre-hoc-the-nao, thong-ke-mo-ta). Rủi ro: thấp.

**A4. Bài dài: mục "Nghiên cứu then chốt" dài tới 8.100 px, và bài giấc mơ dài 27.353 px (khoảng 35 màn hình).**
- Số đo ở 360 px: giac-mo 27.353 px, 5.867 chữ, 10 mục cấp 2, 14 mục cấp 3; riêng mục "Nghiên cứu then chốt" từ y=2.030 đến 10.154 (8.124 px, 30% bài). milgram 15.991 px, tram-cam 15.140, vi-sao-ta-quen 13.385, p-value 12.353. Chữ bài 16 px, cao dòng 28 px, rộng 328 px (≈ 38 ký tự mỗi dòng, thoải mái). Ảnh `d-giac-mo-3-giua.png`, `d-giac-mo-2-toc.png`.
- Đề xuất: (1) đầu mỗi mục cấp 2 dài hơn 2.000 px (tính ở 360 px) hiện một dải "Trong mục này" liệt kê các mục cấp 3 (14 mục của giac-mo) dạng liên kết; (2) khi mục cấp 3 có nhãn, dải thể hiện nhãn bằng viên màu như tóm tắt; (3) giữa các mục cấp 3 của bài trên 3.500 chữ chèn dòng "Tóm lại ở mục này" chỉ khi tác giả viết (cần mở khóa); bản tự dựng chỉ gồm dải liên kết.
- Công sức: S đến M (plugin hoặc `MarkdownContent.astro` dựng từ cây tiêu đề; không đọc nội dung). Mở khóa: không (dựng từ tiêu đề). Rủi ro: thêm khoảng 20 đến 30 dòng HTML mỗi bài dài; không ảnh hưởng hiệu năng đáng kể; thêm `nav aria-label="Trong mục này"` cần axe sạch.

**A5. Mục lục "Trên trang này" ở điện thoại: dùng được nhưng đóng.**
- Vấn đề: thanh cố định 48 px dưới thanh trên 56 px, tức 104 px (13% của màn 780 px) luôn che nội dung khi cuộn. Nút mở danh sách đầy đủ (16 đến 25 mục) và đóng lại: tốt, nhưng chỉ cho tên mục hiện tại, không cho thấy tiến độ/vị trí trong bài. Mục lục của bài giấc mơ có 25 mục, cuộn trong khung cao khoảng 560 px. Ảnh `d-vi-sao-ta-quen-2-toc.png`, `d-giac-mo-2-toc.png`.
- Đề xuất: (1) thêm vạch tiến độ đọc mảnh (2 px) dưới thanh mục lục, bằng CSS `animation-timeline: scroll()` (không JS; Chromium và Safari 26+, thiếu thì ẩn); (2) trong danh sách mục lục ở bài dài, hiện số mục "3/10". Không cần đổi gì khác.
- Công sức: S. Mở khóa: không. Rủi ro: thấp (thêm 1 phần tử trang trí `aria-hidden`).

**A6. Ngộ nhận: một trang 48.766 px (123 thẻ), không lọc, mục lục chỉ 3 mục.**
- Vấn đề: ở 360 px trang `/ngo-nhan/` dài 48.766 px, 9.156 chữ; chỉ chia theo ba nhãn (Đã bị bác bỏ, Đang tranh cãi, Vững chắc). Mục lục di động chỉ có 4 mục. Không lọc theo lĩnh vực, không tìm trong trang (người dùng phải dùng tìm kiếm cả site). Người vào tìm "não trái" hay "10% bộ não" phải cuộn dài. Ảnh `entry3.png` (cột trái), `v-nn-m-1.png`.
- Đề xuất: (1) chia theo lĩnh vực trong mỗi nhãn (tiêu đề cấp 3 thành mục lục); (2) hàng viên lọc theo lĩnh vực ở đầu trang (liên kết tới mục, không JS); (3) đầu mỗi thẻ rút gọn: chỉ hiện câu ngộ nhận + một dòng nhãn, bấm mở phần giải thích (`details`; khi in mở hết). Thẻ hiện nay dài 250 đến 400 px.
- Công sức: M. Mở khóa: không (`::danh-sach` sinh từ dữ liệu; thẻ lấy từ nguồn dữ liệu, không phải trang khóa riêng; kiểm `src/content` của ngộ nhận). Rủi ro: thẻ thu gọn có thể giấu nguồn khỏi người đọc nhanh; cần để nguồn trong phần mở, và kiểm axe cho 123 `details`.

**A7. Tiêu đề cấp 3 lớn hơn cấp 2 ở điện thoại.**
- Vấn đề: ở 360 px h2 = 23,2 px, h3 = 24 px (`getComputedStyle`; h2 dùng `clamp(1.45rem, 1.15rem + 1vw, 1.8rem)` trong `psyche.css`, h3 theo Starlight 1.5rem). Dưới khoảng 560 px, h3 bằng hoặc lớn hơn h2. Trong bài "Vì sao ta quên?" mục "2. Tự kiểm tra thay vì đọc lại" (h3, hai dòng) trông to hơn "Thử suy ngẫm" (h2). Số "01 ... 09" và đường kẻ phía trên h2 giữ được thứ bậc, nhưng cấp 3 vẫn phải nhỏ hơn. Ảnh `dm-vsq-a.png` (cột 3, 4).
- Đề xuất: h3 `clamp(1.15rem, 1.05rem + 0.5vw, 1.35rem)`, h2 giữ. CSS 3 dòng.
- Công sức: S. Mở khóa: không. Rủi ro: thấp; kiểm lại ảnh chụp trang mẫu (`tools/trang-mau.mjs`), chiều dài trang giảm nhẹ.

### Ưu tiên B

**B1. Thời gian đọc và dòng mở đầu ở đầu bài.**
- Vấn đề: tiêu đề bài và dòng trạng thái ("Kiểm chứng hai lượt độc lập, khóa ngày ...") không cho biết bài dài bao nhiêu. Bài từ 2.300 đến 5.900 chữ (10 đến 27 phút). Đo: không bài nào ghi "phút đọc" (trừ khi trong nội dung).
- Đề xuất: thêm "khoảng 12 phút đọc" vào `PageTitle.astro` (tính từ số chữ của nội dung, 200 chữ/phút cho tiếng Việt; làm tròn 5 phút). Với bài trên 20 phút (giac-mo) có thể gợi ý "bài dài: dùng mục lục". Kèm số nhãn ("3 khung nhãn") không cần.
- Công sức: S. Mở khóa: không. Rủi ro: tính sai thời gian (khối tóm tắt, nguồn, quiz lẫn vào); chỉ đếm văn bản trước `## Nguồn`.

**B2. Hộp tóm tắt đầu bài.**
- Quan sát: tốt, nhưng cao 191 px (vi-sao-ta-quen, 2 mục), 285 px (milgram, 3), 369 (tram-cam, 3), **444 px (giac-mo, 5 mục: 57% khung nhìn 780 px)**; trên bài giấc mơ đẩy "Tự trải nghiệm" xuống y=947. Phần giữa tiêu đề và hộp có khoảng trống khoảng 80 px. Ảnh `dm-vsq-b.png` (cột 3, 4), `d-giac-mo-1-dau.png`.
- Đề xuất: giữ hộp nhưng thu khoảng trống trên (margin ~ 80 px thành 24 px); khi có từ 5 ý trở lên, chỉ hiện viên nhãn + ý, cắt dòng (ví dụ line-clamp hai dòng) hoặc đặt trong `details` mở sẵn trên màn rộng, đóng trên màn hẹp. Cũng thêm dòng "Đọc kỹ: mục Mức độ chắc chắn" là liên kết tới `#muc-do-chac-chan` ở cuối hộp.
- Công sức: S (CSS + một liên kết trong plugin tom-tat). Mở khóa: không. Rủi ro: hộp đóng khiến người đọc không thấy tóm tắt; nên mở mặc định.

**B3. Phần Nguồn chiếm 17% đến 21% chiều dài bài.**
- Số đo (360 px): giac-mo từ y=22.702 đến 27.353 (4.651 px, 17%); vi-sao-ta-quen từ 10.606 đến 13.385 (2.779 px, kể cả Trước/Tiếp và chân trang). URL DOI dài bị ngắt giữa số ("10.1177/17456916155 96787"), xem `dm-vsq-b.png`.
- Đề xuất: (1) CSS `overflow-wrap:anywhere` cho URL nguồn và thu cỡ chữ về 14 px, giãn dòng 1,45; (2) đóng nguồn trong `details` "Nguồn (N)" chỉ ở màn hẹp và nếu bài trên 3.000 chữ; mở khi tới bằng liên kết `#nguon`; khi in mở hết. Trích dẫn trong bài là liên kết DOI chứ không trỏ vào danh sách, nên đóng không làm gãy liên kết.
- Công sức: M. Mở khóa: không (`::nguon` do plugin; nhưng trang khóa có "mục Nguồn viết tay" từ site cũ: kiểm chỗ này). Rủi ro: Pagefind/tìm kiếm (nội dung trong `details` vẫn được lập chỉ mục), `#nguon` và axe (`details` cần `summary` 44 px).

**B4. Khối "Đọc thêm" và "Ngộ nhận liên quan" nằm trước "Thử suy ngẫm".**
- Quan sát: thứ tự cuối bài là Ở Việt Nam, Ngộ nhận liên quan (kèm "Đọc thêm"), Thử suy ngẫm, Nguồn, Trước/Tiếp. Sau quiz người đọc không thấy gợi ý đọc tiếp ngoài Trước/Tiếp (nút Trước/Tiếp theo thứ tự menu chứ không theo chủ đề: bài "Vì sao ta quên?" có "Trước: Tổng quan" và "Tiếp: Trí nhớ có giống cuốn băng ghi hình?"). Ảnh `dm-vsq-b.png` (cột 1), `dm-vsq-a.png` (cột 4).
- Đề xuất: sau Thử suy ngẫm, lặp một khối "Đọc tiếp" dựng từ dữ liệu (cùng lĩnh vực, ngộ nhận và thí nghiệm liên quan; tối đa 3). Đặt trước Nguồn. Không bắt buộc mở khóa nếu dựng bằng component từ `trang.yml` và `lien-quan`.
- Công sức: M. Mở khóa: không. Rủi ro: trùng với mục "Đọc thêm" trong bài; phải loại trùng.

**B5. Màu liên kết thẻ ở trang chủ chế độ sáng.**
- Vấn đề: tiêu đề thẻ trên trang chủ (11 thẻ "Thử với chính bạn", 6 "Mới kiểm chứng") trong chế độ sáng dùng màu liên kết mặc định của trình duyệt `rgb(0,0,238)` có gạch chân, thấy trong `v-home-d-1.png`; ở tối thì màu chàm nhạt. Đã khớp tương phản (đạt), nhưng lệch bảng màu site.
- Đề xuất: đặt `color: var(--sl-color-text-accent)` cho tiêu đề thẻ trang chủ, bỏ gạch chân (giữ `text-decoration-thickness` khi hover). Công sức S; không mở khóa (CSS).

**B6. Trang lĩnh vực mỏng.**
- Quan sát: `/nen-tang/tri-nho/` dài 2.058 px ở 360, 335 chữ: một đoạn giới thiệu, một đoạn nói "một trong 14 lĩnh vực", rồi danh sách 5 thẻ bài (tiêu đề + 2 đến 3 dòng) và Hỗ trợ. Không có: ai nên đọc bài nào trước, lộ trình đọc, số công cụ/thí nghiệm/ngộ nhận thuộc lĩnh vực, hình ảnh, "câu hỏi lớn của lĩnh vực". Màu và biểu tượng lĩnh vực (trang Khám phá có) không xuất hiện ở trang lĩnh vực. Ảnh `v-lv-m-1.png`, `entry2.png` (cột 1).
- Đề xuất: đầu trang hiện viên màu lĩnh vực + biểu tượng; ba dòng "Bắt đầu từ: [bài lõi]", "Thí nghiệm kinh điển: [n bài]", "Tự thử: [công cụ]"; đánh số 1, 2, 3 cho bài theo thứ tự đọc (đã có trong `trang.yml`); đoạn đầu ghi "5 bài, khoảng 60 phút đọc". Có thể dựng từ dữ liệu (`::danh-sach-bai`, `::cong-cu-noi-bat`).
- Công sức: M. Mở khóa: trang lĩnh vực nằm trong 121 trang khóa? kiểm; phần thêm làm bằng component thì không.

**B7. Khám phá và Thí nghiệm: tốt nhưng dài.**
- Quan sát: Khám phá 19.417 px ở 360 (14 thẻ lĩnh vực "n/n bài đã lên", rồi 14 danh sách thẻ bài); Thí nghiệm 5.741 px. Thẻ bài 100 đến 130 px mỗi cái, một câu tóm tắt có số liệu (rất tốt, kéo người đọc). Thẻ lĩnh vực có màu + biểu tượng nhưng chỉ liên kết tới trang lĩnh vực; không có lối vào thẳng từ thẻ tới danh sách trong trang. Ảnh `v-khampha-m-1.png`, `entry3.png` (cột giữa, phải).
- Đề xuất: viên liên kết lĩnh vực ngang cố định trên Khám phá (cuộn ngang, 44 px); nút "Lên đầu trang" (xem C1).
- Công sức: S đến M. Mở khóa: không.

### Ưu tiên C

**C1. Nút "Lên đầu trang" ở bài dài.** Không có (chỉ có liên kết "Bỏ qua để đến nội dung" và mục lục). Với 15.000 đến 27.000 px, người đọc cuộn 20 đến 35 màn để về mục lục. Đề xuất: nút tròn 44 px ở góc dưới phải, hiện khi cuộn quá 3 màn và đang cuộn lên (CSS scroll-driven hoặc 10 dòng JS), `aria-label="Lên đầu trang"`. Công sức S; không mở khóa. Rủi ro: che nội dung cuối trang, chạm vào ô công cụ; ẩn trên trang công cụ và khi bàn phím ảo hiện.

**C2. Mở đầu mục bằng một dòng ý chính.** Bài giấc mơ: mỗi mục cấp 3 trong "Nghiên cứu then chốt" bắt đầu bằng tên nghiên cứu, ý chính nằm sau đó vài đoạn. Dòng "Ý chính: ..." in đậm ngay dưới tiêu đề giúp đọc lướt. Cái giá: sửa chữ của bài (mở khóa, kiểm định lại phần chạm); thêm chữ mới là nhận định mới. Chỉ làm khi trang đã mở khóa vì lý do khác. Công sức M cho một bài.

**C3. Nhãn trong khung dài.** Khung nhãn ("Khá vững", "Đang tranh cãi") dài 200 đến 400 px; có ý chính ở dòng đầu (tốt). Có thể cho phép thu gọn phần chi tiết trong khung (chỉ hiện ý chính + 3 dòng, "Đọc tiếp"). Giá: thêm tương tác; rủi ro mất nội dung với người đọc lướt. Để sau.

**C4. Chú thích hình dài.** 10 chú thích trên 330 ký tự (gf-gc 545, marcia 481, tinh-di-truyen 462, cuijpers 449); đặt "Xem số liệu" (a, mục 7) và rút chú thích về khoảng 200 ký tự. Làm cùng đợt sửa hình.

**C5. URL nguồn ngắt giữa số.** Đã nêu ở B3; một dòng CSS (`overflow-wrap:anywhere`, `hyphens:none`) nếu không làm B3.

**C6. Sách in.** `/sach/` ở 360 px dài 1.277.905 px và 282.178 chữ (cả sách trên một trang): đúng thiết kế (in một lần), nhưng vài chục MB bộ nhớ khi cuộn trên điện thoại cũ; Pagefind đã loại? (kiểm). Chỉ ghi nhận; mở đầu trang có hướng dẫn in (hộp "Khi in") rất tốt. Đề xuất cho người đọc màn hình: thêm liên kết nhảy tới từng lĩnh vực ở đầu (đã có "Mục lục"). Không sửa.

**C7. Lộ trình đọc.** `bat-dau/` dẫn qua ba bước (thử đoán, Bạn nghĩ gì về tâm trí?, Đọc nhãn) rồi tới `/bang-chung/`; chưa có "lộ trình theo mối quan tâm" (ví dụ "Muốn hiểu giấc ngủ và căng thẳng: đọc 1, 2, 3"). Có thể thêm 3 lộ trình dựng từ dữ liệu (`them-noi-dung.md`). Công sức M; không mở khóa nếu là trang mới.

### Công cụ, tìm kiếm, menu (chỉ vấn đề rõ ràng)

- **Công cụ (stroop, do-dai-tri-nho, big-five-mini; `c-*.png`, `tools-search.png`)**: bố cục sạch ở 360 px: khung công cụ nằm ở mục "Tự trải nghiệm", nút chính cao 45 px (Tiếp tục 106×45, Bắt đầu 103×45, "Bắt đầu phần xuôi" 185×45), nút phụ "Quay lại" cao khoảng 40 px? (đo thấy nút chính 45 px; nút phụ trông thấp hơn, kiểm `.pz-nut` thường), chọn phiên bản bằng radio có vùng bấm to, hướng dẫn gõ bàn phím (D F J K) hiện cả trên điện thoại (không có bàn phím, dư nhưng vô hại). Công cụ lên ở y≈560 đến 640 px (màn đầu tiên và nửa), tức người dùng thấy ngay. Trang công cụ dài 8.800 đến 10.600 px sau công cụ, như bài khám phá. Không có lỗi tràn ngang. Một đề xuất nhỏ (C): nút "Đọc giải thích" (liên kết nhảy tới `#dieu-gi-dang-xay-ra`) ở kết quả công cụ.
- **Tìm kiếm** (Pagefind trên bản build): tìm "trí nhớ", "tri nho" (không dấu), "milgram", "p-value", "giấc mơ", "trầm cảm" đều ra 5 kết quả đầu hợp lý, có mục con và đoạn trích tô đậm; "tri nho" cho "106 kết quả". Không dấu chạy tốt. Từ "gieo" ra 2 kết quả không liên quan rõ (Pygmalion, não hai chế độ: khớp mờ). Không có vấn đề rõ ràng; có thể ưu tiên tiêu đề hơn đoạn trích (kết quả "milgram" thứ 2 là bài "Ai bảo vệ người tham gia nghiên cứu?"). Ảnh `s-tim-1.png`.
- **Menu bên ở điện thoại**: mở bằng nút tròn trên thanh trên, hiện 8 nhóm, Nền tảng mở sẵn với 14 lĩnh vực, lĩnh vực của trang hiện tại mở và tô trang đang đọc. Tốt (`s-menu-1.png`). Vấn đề nhỏ: trên trang chủ không có menu (A1).
- **Trợ năng/ổn định**: lần chạy đầu một lượt tải `/ho-tro/` bị quá thời gian 30 giây trong một phiên Playwright dùng lại một tab sau vài trang (không tái hiện được khi tải riêng hay khi chặn service worker; có thể do `sw.js` hoặc máy chủ thử, không kết luận). Nếu tái hiện thì là lỗi nghiêm trọng vì đây là trang Hỗ trợ; nên chạy thử riêng với service worker bật.

---

## (c) Điểm tốt nên giữ

- **Chữ bài đọc thoải mái ở 360 px**: 16 px, cao dòng 28 px, rộng 328 px (khoảng 38 ký tự/dòng), tiêu đề cấp 2 đánh số 01, 02... với đường kẻ phía trên giúp mắt neo (`dm-vsq-a.png`).
- **Hộp "Tóm tắt nhanh" dựng từ ý chính các khung nhãn**: người đọc thấy ngay nhãn chắc chắn và kết luận mà không cần cuộn; không thêm chữ mới nên không cần nhận định riêng.
- **Khung nhãn có màu và viên nhãn rõ** (Vững chắc xanh lá, Khá vững xanh lam, Đang tranh cãi vàng, Đã bị bác bỏ đỏ), dòng ý chính in đậm trên cùng; phân biệt được bằng chữ lẫn màu.
- **Mục lục di động cố định, có tên mục hiện tại**, vùng bấm đủ lớn, danh sách cuộn được (`d-vi-sao-ta-quen-2-toc.png`).
- **Dòng trạng thái kiểm định dưới tiêu đề** ("Kiểm chứng hai lượt độc lập, khóa ngày ...") kèm dấu kiểm; bài sức khỏe tâm thần có khung "Chưa qua rà soát chuyên môn" và liên kết Hỗ trợ ngay đầu bài (`d-tram-cam-1-dau.png`).
- **Khối thu gọn "Xem đáp án" và Thử suy ngẫm** (quiz) dùng được bằng cảm ứng, nút cao ≥ 44 px (đo: `summary` 44 px; câu trả lời cao khoảng 48 px).
- **Công cụ** nằm đầu bài, không cần cuộn nhiều; nút chính 45 px; kết quả kèm số liệu nghiên cứu.
- **Trước/Tiếp** là hai khối lớn, dễ bấm; chân trang có lời nhắc Hỗ trợ ở mọi trang.
- **Thẻ trang chủ và Khám phá có một câu có số liệu** ("65% đi đến 450V", "36% có ý nghĩa thống kê"): rất hấp dẫn, giữ cách viết này.
- **Thanh bên 1280 px**: Nền tảng mở sẵn với lĩnh vực hiện tại, trang đang đọc tô đậm, mục lục phải "Trên trang này" có mục con (`d1280-vsq.png`).
- **Tìm kiếm** không dấu hoạt động; kết quả theo trang có mục con và trích dẫn.
- **Một số hình làm tốt**: erickson-hippocampus (cỡ chữ lớn nhất bộ), linda-venn (hình giải thích), cuijpers-funnel (số trên cột, tiêu đề trong hình), milgram-obedience (chú thích 105 ký tự có nguồn).
- **Không tràn ngang** ở mọi trang đã đo (scrollWidth = 360).
