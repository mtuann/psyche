# Sổ tay cho agent: Psyche (repo psyche)

Psyche (bản trước tên Psyche Zero) là site tâm lý học bằng tiếng Việt cho người không học chuyên ngành: mỗi trang trả lời một câu hỏi, **bằng chứng nói gì, và chắc chắn đến đâu?** Site đang được làm lại trong repo này (`mtuann/psyche`, site ở https://mtuann.github.io/psyche/). Kế hoạch hiện hành: `plans/lam-lai/README.md`; khi sổ tay này khác kế hoạch thì kế hoạch đúng. Người mới đọc `plans/lam-lai/giao-viec.md`.

## Site cũ và repo mẫu

- Site cũ (MkDocs, repo `mtuann/psyche-zero`, https://mtuann.github.io/psyche-zero/) ở thư mục cạnh `../psyche-zero/`. **Chỉ đọc**: không sửa, không commit, không tag, không push gì ở đó; site cũ chạy nguyên trong suốt thời gian làm lại. Máy khác: `git clone https://github.com/mtuann/psyche-zero.git ../psyche-zero`.
- Repo opus (`../opus/`, cùng công nghệ, đã qua 5 đợt) là mẫu: mã dùng chung (tìm kiếm, máy chủ tĩnh, kiểm thử trình duyệt, Lighthouse, công cụ khóa, script chuyển) chép từ đó rồi sửa cho Psyche, ghi nguồn ở đầu file. Chỉ đọc.

## Mạng

Không đưa email hay thông tin cá nhân của chủ repo vào yêu cầu gửi ra ngoài (header User-Agent, tham số, nội dung). Dịch vụ nào đòi thông tin liên hệ thì dùng `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`. Nguồn hay bị chặn và cách vòng: `plans/ben-vung/chuan-kiem-dinh.md`, mục "Nguồn và cách mở". Lời giao việc mẫu cho agent: `plans/lam-lai/loi-giao/`.

## Thư mục

Như `plans/lam-lai/cong-nghe.md` mục 3.

## Lệnh

Node theo `.nvmrc` (24; Astro 7.4 cần Node từ 22.23.4). Phiên bản gói ghim chính xác trong `package.json` và `package-lock.json`; nâng theo `plans/lam-lai/cong-nghe.md` mục 2.

```bash
npm ci            # cài đúng các gói trong package-lock.json
npm run dev       # máy chủ thử, tự tải lại khi sửa: http://localhost:4321/psyche/ (tìm kiếm chỉ chạy ở bản build)
npm run build     # bản thật vào dist/ (từ D1.6: chỉ trang đã khóa); deploy dùng bản này
npm run build:xem # bản xem vào dist/ (từ D1.6: thêm trang chưa khóa, có dải "Chưa kiểm định"); không đăng
npm run preview   # xem dist/ vừa build: http://localhost:4321/psyche/
npm test          # kiểm thử trên dist/: chạy sau npm run build hay npm run build:xem
npm run test:trinh-duyet  # kiểm thử trình duyệt trên trang mẫu của dist/: ba trình duyệt, ba cỡ màn hình, axe, tìm kiếm
npm run lighthouse        # Lighthouse ở tối đa ba trang mẫu của dist/, kiểm luật 7 của kế hoạch
```

- Kiểm thử ở `tests/*.test.mjs`, chạy bằng trình kiểm thử có sẵn của Node (`node --test`, các file chạy song song). Thêm kiểm thử thì thêm file `tests/<tên>.test.mjs`.
- Kiểm thử trình duyệt ở `tests/trinh-duyet/kiem-*.mjs` (Playwright), không nằm trong `npm test`. Chờ điều kiện (khối dựng xong, `document.fonts.ready`), không chờ cố định. Lần đầu cài trình duyệt: `npx playwright install chromium webkit firefox`. Chỉ một trình duyệt: `PSYCHE_TRINH_DUYET=chromium npm run test:trinh-duyet`; thêm trang: `PSYCHE_TRANG="thi-nghiem/asch/" npm run test:trinh-duyet`. Phép thử chỉ chạy trên Chromium (axe, API tìm kiếm) tự bỏ qua khi không có Chromium.
- Lighthouse cần Chromium của Playwright (hay `CHROME_PATH`); đo qua máy chủ HTTP/2 tự ký (`tools/may-chu.mjs`), như GitHub Pages.
- Máy ảo của Cowork không tải được trình duyệt Playwright (CDN bị chặn): ở đó chỉ chạy build và `npm test`; kiểm thử trình duyệt để CI chạy, hay chạy ở máy có trình duyệt.

## Tìm kiếm

Pagefind (Starlight) bỏ dấu khi so: gõ "tri nho" ra "trí nhớ". Chữ "đ" là chữ riêng, nên lúc build `src/tim-kiem/tich-hop.mjs` bọc `dist/pagefind/pagefind.js`: mỗi từ bắt đầu bằng "d" được tìm thêm bản "đ" (tối đa 3 từ), rồi gộp kết quả; gõ "dinh kien" ra "định kiến". Trước khi bọc, kiểm chỉ mục đủ; thiếu thì dựng lại. Kiểm thử: `tests/tim-kiem.test.mjs`, `tests/trinh-duyet/kiem-tim-kiem.mjs`.

## CI và đăng site

- `.github/workflows/test.yml`: nhánh `moi/**`, `mo/**`, `them/**`, pull request, hay bấm chạy tay. Sáu job chạy song song, mỗi job tự build bản xem: `npm test`, kiểm thử trình duyệt trên chromium, webkit, firefox (mỗi trình duyệt một job), Lighthouse, ảnh chụp. Không đăng gì.
- `.github/workflows/deploy.yml`: mỗi lần push lên `main`. Build bản thật, `npm test`, rồi các job trình duyệt song song (commit đã qua `test.yml` ở nhánh thì chỉ chromium và Lighthouse). Đạt hết thì đăng `dist/` lên GitHub Pages; hỏng bước nào thì không đăng, site giữ bản trước.
- Push chỉ đổi `plans/`, `README.md`, `AGENTS.md`, `CLAUDE.md`, giấy phép thì cả hai workflow bỏ qua. Lưu đệm `node_modules` và trình duyệt Playwright. Các bước dùng chung ở `.github/actions/kiem-thu/action.yml`. Chi tiết và lý do: `plans/lam-lai/cong-nghe.md` mục 8.
- Ảnh chụp các trang nhánh đã đổi và trang mẫu (360 và 1280 px) là tệp `anh-chup` của lần chạy, giữ 7 ngày: `gh run download <số lần chạy> -n anh-chup`. Báo cáo của lô chỉ giữ tối đa 4 ảnh tiêu biểu.
- Trên GitHub không có `../psyche-zero/` và `.cache/site-cu/`: kiểm thử cần chúng tự bỏ qua.

## Review và gộp

Ba mức theo rủi ro; bảng đủ ở `plans/lam-lai/README.md`, mục "Ba mức review". Nhánh có sửa ở nhiều mức thì theo mức cao nhất.

- **Nhỏ** (chữ trong kế hoạch, báo cáo, tài liệu; một link; config một dòng): `npm run build`, `npm test`; không review; gộp khi `test.yml` đạt.
- **Vừa** (thành phần, CSS, plugin, script): kiểm thử liên quan; Haiku (hay Sonnet) chỉ đọc diff.
- **Lớn** (công cụ khóa, dữ liệu dùng chung, workflow deploy, lọc HTML hay link): chạy đủ; Sonnet (Opus khi đụng khóa, bảo mật) review, có vòng kiểm lại.
- Lượt 2 kiểm định nội dung của mỗi lô không phải review mã: vẫn giữ.

## Model cho agent

Dùng model hợp việc, không phải lúc nào cũng dùng model mạnh nhất (chủ repo yêu cầu 29/10/2026). Bảng và lý do: `plans/lam-lai/loi-giao/README.md`. Tóm tắt: Haiku cho việc kiểm được bằng máy (đọc diff mức vừa, YAML, link, đếm, so chữ); Sonnet cho chuyển trang, kiểm định lượt 1 và lượt 2 thông thường, review mã mức lớn; Opus cho thiết kế mã mới, lô Sức khỏe tâm thần và chỗ khó (nguồn mâu thuẫn, nhãn, tái lập, rút bài). Tối đa 2–3 agent nặng cùng lúc; ghi model đã dùng vào báo cáo.

## Khóa

Từ D1.6, như opus (`../opus/AGENTS.md`, mục Khóa): trang và bản ghi dữ liệu lên site thật khi đã khóa (mã băm trong `kiem-dinh/khoa.json`, hồ sơ trong `kiem-dinh/<trang>.yml`; `plans/ben-vung/chuan-kiem-dinh.md` mục 6–8). Trang đã khóa mà đổi thì build hỏng; sửa theo thủ tục mở khóa. Lệnh (`tools/khoa.mjs`) ghi vào đây khi D1.6 xong.

## Giao diện

- Giữ font (Be Vietnam Pro, tự host), màu (chàm `#3b3f8f`, hồng `#b4387a`, bốn màu nhãn) và giọng văn của site cũ. Màu ở `src/styles/psyche.css`, có bản sáng và tối. Bố cục chốt ở D1.3.
- Mọi trang và thành phần phải hiển thị tốt ở 360 px, 768 px và 1280 px, trên Chromium, WebKit (Safari) và Firefox: không tràn ngang; trên màn hình cảm ứng, vùng bấm từ 44 px. Không lỗi axe (WCAG 2.2 AA). Không lùi chuẩn Lighthouse ở luật 7 của kế hoạch.
- Hình và sơ đồ vẽ bằng SVG hoặc HTML và CSS ngay trong trang, theo màu của site, có bản sáng và tối; chữ trong hình là chữ thật. Hình chỉ để trang trí thì đặt `aria-hidden`.
- Chân mọi trang có lời nhắc Hỗ trợ (`src/components/Footer.astro`, `tests/khung.test.mjs` kiểm). Đừng bỏ.
- Không nạp gì từ nguồn ngoài (font, script, stylesheet): kiểm thử chặn.

## Quy tắc nội dung

Từ site cũ (`../psyche-zero/README.md`, "Nguyên tắc nội dung"), cộng chuẩn kiểm định mới (`plans/ben-vung/chuan-kiem-dinh.md`):

- Kiểm chứng trước khi viết; không bịa tên nghiên cứu, năm, cỡ mẫu, số liệu. Không chắc thì bỏ hoặc diễn đạt thận trọng. Hồ sơ trước, chữ sau.
- Mọi kết luận quan trọng có một trong bốn nhãn (*Vững chắc*, *Khá vững*, *Đang tranh cãi*, *Đã bị bác bỏ*), theo thước đo nhãn; ưu tiên phân tích tổng hợp; nói thẳng về kết quả tái lập.
- Mỗi nghiên cứu một trang nhà: nơi khác tóm một câu, không thêm con số mới, link về nhà.
- Khẳng định thời sự (số liệu mới nhất, "chưa tìm thấy nghiên cứu ở Việt Nam", số liên hệ) viết kèm mốc thời gian ("Tính đến 11/2026…") và có hạn trong hồ sơ.
- Không có công cụ tự chẩn đoán; không viết điều gì như chẩn đoán hay lời khuyên điều trị. Trang sức khỏe tâm thần khóa sau khi chuyên gia đọc.
- Trang Hỗ trợ chỉ đưa thông tin kiểm chứng được từ nguồn chính thức, ghi ngày kiểm.
- Văn tiếng Việt rõ, câu ngắn, thuật ngữ tiếng Anh để trong ngoặc ở lần đầu.

## Mẫu trang và khối đặc biệt

Chốt ở D1.4–D1.5 (khung nhãn, câu hỏi, công cụ, hình, khối thu gọn, "Ở Việt Nam", bổ sung, "sắp có") và ghi vào đây. Cú pháp cũ của site MkDocs chỉ để tra khi chuyển trang.

## Cách làm việc

- Mỗi việc một nhánh (`plans/lam-lai/README.md`, "Quy tắc chung"); không push (chủ repo push). Không sửa `.claude/`.
- Commit message tiếng Việt, kết thúc bằng dòng Co-Authored-By của model đã làm.
- Báo cáo mỗi việc ở `plans/lam-lai/bao-cao/<mã>.md`: việc đã làm, file đã chạm, kết quả kiểm thử, model đã dùng, chỗ chưa chắc.
