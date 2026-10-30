# Công nghệ của site mới

**Đã chọn** (mục "Quyết định" của `README.md`, 29/10/2026): Astro 7.4.2 và Starlight 0.42.7, build tĩnh, trong repo mới `mtuann/psyche`, deploy lên GitHub Pages ở https://mtuann.github.io/psyche/. Giống hệt bộ công nghệ của repo opus (`../opus/plans/lam-lai/cong-nghe.md`), nên mã dùng chung và kinh nghiệm của opus dùng lại được. Site cũ (MkDocs) ở repo `mtuann/psyche-zero`, thư mục cạnh `../psyche-zero/`, giữ nguyên.

## 1. Vì sao

| Tiêu chí | MkDocs 1.6.1 + Material 9.7.7 (site cũ) | Zensical | Astro 7 + Starlight |
|---|---|---|---|
| Tình trạng (kiểm 20–29/10/2026) | Material chỉ còn bảo trì đến 05/05/2027; MkDocs 1.x không còn bản mới, repo đóng góp ngoài từ 02/10/2026; MkDocs 2.0 bỏ plugin | Bản 0.0.x, chưa chạy được hook tự viết, chưa có API module công khai | Astro 7 (bản 7.4.2), Starlight 0.42.7; opus đã chạy qua 5 đợt |
| Dữ liệu có schema (nguồn, nghiên cứu, thẻ ngộ nhận) | Tự viết hook | Chưa làm được | Content collections, schema Zod |
| Trang và danh sách sinh từ dữ liệu (trang lĩnh vực, sách in, ngộ nhận) | Hook tự viết, file sinh nằm trong git | Chưa làm được | Code Astro thường, sinh lúc build |
| Tìm kiếm tiếng Việt | lunr và hook `search_unaccent` | Plugin thay thế | Pagefind có sẵn, bỏ dấu khi so; chữ "đ" xử lý bằng bản bọc (mục 6) |
| Công cụ JavaScript (11 trang) | `loader.js` nạp theo nhu cầu | | Script của Astro, nạp khi gần màn hình |

Site cũ dùng 5 hook tự viết (vi_slugs, content_fixes, search_unaccent, minify_assets, search_trim) và cú pháp riêng của Material ở 103 file nguồn (275 hộp `!!!`, 83 khối `???`, 78 câu hỏi, 19 khung công cụ, 27 vùng hình, 336 chip nhãn). Đằng nào cũng phải chuyển: Material hết bảo trì, và mọi trang đằng nào cũng đi qua kiểm định lại.

## 2. Phiên bản và môi trường

- Node 24 trong `.nvmrc`: Astro 7.4 cần Node từ 22.23.4; Node 24 là bản LTS (hỗ trợ đến 30/4/2028). Node 26 thành LTS ngày 28/10/2026: chuyển ở lần nâng cấp sau, cùng opus.
- Gói ghim chính xác trong `package.json` và `package-lock.json` (`tests/khung.test.mjs` kiểm): `astro` 7.4.2, `@astrojs/starlight` 0.42.7, `pagefind` 1.5.2, `@astrojs/markdown-satteri` 0.4.5 và `satteri` 0.10.5 (bộ xử lý Markdown mặc định của Astro 7), `yaml` 2.9.1 (dữ liệu, từ D1.2); để kiểm thử: `playwright` 1.64.1, `axe-core` 4.13.0, `lighthouse` 13.5.0. Cùng phiên bản với opus: `package-lock.json` của D1.1 chép từ opus, chỉ đổi tên gói.
- Nâng mỗi tháng một lần trên nhánh `moi/nang-cap-<tháng>`, sau khi opus đã nâng và chạy ổn; gộp khi mọi kiểm thử đạt. Bản bọc tìm kiếm (`src/tim-kiem/`) dựa vào cách hàm `options` của Pagefind 1.5: xem lại khi nâng Pagefind.
- Python 3.12 cho `tools/du_lieu/` (từ D1.2) và cho `plans/lam-lai/anh_xa.py` (không cần gói ngoài).

## 3. Thư mục

```text
astro.config.mjs            # site 'https://mtuann.github.io', base '/psyche', Starlight, Sätteri, tìm kiếm không dấu
package.json, package-lock.json, tsconfig.json, .nvmrc
src/content.config.ts       # bộ sưu tập: trang, chữ giao diện; D1.2 thêm frontmatter riêng và dữ liệu
src/content/docs/           # trang; cùng đường dẫn với ../psyche-zero/docs/
src/content/i18n/vi.json    # chữ tiếng Việt của ô tìm kiếm
src/components/             # Hero.astro (trang chủ, 404), Footer.astro (lời nhắc Hỗ trợ); D1.3–D1.4 thêm
src/styles/                 # fonts.css (Be Vietnam Pro tự host), psyche.css (màu, chữ, thanh trên)
src/tim-kiem/               # bọc pagefind.js lúc build: gõ "d" vẫn ra chữ "đ" (chép từ opus)
src/assets/logo.svg         # dấu ψ
public/                     # favicon, biểu tượng, font
tests/                      # kiểm thử trên bản build (node --test)
tests/trinh-duyet/          # kiểm thử trình duyệt (Playwright): hiển thị, trợ năng, tìm kiếm
tools/may-chu.mjs           # máy chủ tĩnh cho kiểm thử trình duyệt và Lighthouse (HTTP/2 như GitHub Pages)
tools/trang-mau.mjs         # trang mẫu lấy từ bản build: trang chủ, 404, trang nhánh đã đổi, mỗi loại khối một trang
tools/chup-anh.mjs          # ảnh chụp cho review (CI chụp, không commit)
tools/lighthouse/kiem.mjs   # đo Lighthouse, kiểm luật 7
.github/workflows/          # test.yml (nhánh), deploy.yml (main)
.github/actions/kiem-thu/   # các bước dùng chung của hai workflow
plans/                      # kế hoạch, báo cáo (không đăng lên site)
# thêm ở các việc sau:
src/data/                   # D1.2: nguon.yml, nghien-cuu.yml, linh-vuc.yml, trang.yml, ngo-nhan.yml
src/plugins/                # D1.4–D1.5: plugin Markdown (khung nhãn, câu hỏi, công cụ, hình, "sắp có")
src/scripts/                # D1.4, đợt 8: module JavaScript chuyển từ ../psyche-zero/docs/assets/js/
kiem-dinh/                  # D1.6: hồ sơ kiểm định, khoa.json
tools/chuyen/               # D1.5: script chuyển cú pháp, so chữ
tools/du_lieu/              # D1.2: script tách dữ liệu một lần
tools/khoa.mjs              # D1.6: hồ sơ mẫu, khóa, tính, mở khóa, xuất và nhập lượt 2
# git bỏ qua: node_modules/, dist/, .astro/, .cache/, .claude/, lighthouse-ket-qua/, anh-chup/
```

## 4. Nội dung trong trang

- Trang viết `.md` (không `.mdx`), như opus: thành phần gọi bằng chỉ thị (`::cong-cu{ten="stroop"}`) hay khối có tên (```` ```quiz ````) do plugin của dự án dựng, không nhúng JSX. Trang không chứa trạng thái kiểm định (đọc từ `kiem-dinh/` lúc build), nên khóa xong thì file không đổi nữa.
- Cú pháp chốt ở D1.4–D1.5 và ghi vào `AGENTS.md`, mục "Mẫu trang và khối đặc biệt". Đề xuất cho D1.4: bốn khung nhãn là aside riêng (`:::vung-chac[Vững chắc]`), chip nhãn trong câu là chỉ thị (`:nhan[kha-vung]`), câu hỏi là khối ```` ```quiz ```` (dòng `+` là đáp án đúng, dòng `>` là giải thích, như opus).
- Phần hay đổi không viết trong trang đã khóa: link sang bài mở rộng (lập chỉ mục ngược từ `dua_tren`), bổ sung có ngày (`src/content/bo-sung/`), dòng trạng thái kiểm chứng, danh sách bài của lĩnh vực đều sinh lúc build từ dữ liệu (`../ben-vung/README.md` mục 4).

## 5. Bản thật và bản xem

Từ D1.6, như opus:

- `npm run build` (bản thật, deploy dùng bản này): chỉ trang có trong `kiem-dinh/khoa.json` và mã băm khớp. Trang đã khóa mà đổi thì build hỏng, kèm cách mở khóa.
- `npm run build:xem` (biến môi trường `PSYCHE_BAN=xem`): thêm trang chưa khóa, mỗi trang có dải "Chưa kiểm định" ở đầu. Không đăng ở đâu; CI của nhánh dựng bản này.
- Link tới trang không có trong bản đang dựng thành chữ "sắp có" (D1.5), cả link do JavaScript sinh.

Trước D1.6 hai lệnh dựng như nhau (chưa có trang nào cần lọc).

## 6. Tìm kiếm

Pagefind (Starlight dùng sẵn) tự bỏ dấu thanh và dấu mũ khi so: gõ "tri nho" ra "trí nhớ". Chữ "đ" là chữ riêng nên gõ "dinh kien" không ra "định kiến". `src/tim-kiem/` (chép từ opus) bọc `pagefind.js` của bản build: mỗi từ bắt đầu bằng "d" được tìm thêm bản "đ" (tối đa 3 từ, 8 biến thể), rồi gộp kết quả. Trước khi bọc, kiểm chỉ mục Pagefind đủ (opus từng gặp chỉ mục ghi dở trên máy của GitHub); thiếu thì dựng lại. Kiểm thử: `tests/tim-kiem.test.mjs`; `tests/trinh-duyet/kiem-tim-kiem.mjs` (bộ 30 truy vấn, chạy dần khi trang đích lên site).

## 7. Kiểm thử

| Lớp | Lệnh | Kiểm gì | Chạy ở |
|---|---|---|---|
| Khung | `npm test` (`tests/*.test.mjs`, `node --test`, các file chạy song song) | tiếng Việt, địa chỉ dưới `/psyche/` dạng thư mục, tài nguyên nội bộ có thật, font tự host, không nạp gì từ ngoài, lời nhắc Hỗ trợ ở mọi trang, phiên bản ghim, chỉ mục Pagefind đủ, bản bọc tìm kiếm | máy, CI |
| Trình duyệt | `npm run test:trinh-duyet` (Playwright) | trang mẫu trên Chromium, WebKit, Firefox × 360, 768, 1280 px: không tràn ngang, không lỗi JavaScript, không file tải hỏng, vùng bấm 44 px, hàng không lệch; axe (WCAG 2.2 AA) ở hai tổ hợp cỡ và màu; ô tìm kiếm | CI (mỗi trình duyệt một job); máy có trình duyệt Playwright |
| Lighthouse | `npm run lighthouse` | trang chủ và hai trang mẫu, ba lần mỗi trang, trung vị; luật 7 | CI |
| Ảnh chụp | `node tools/chup-anh.mjs` | trang nhánh đã đổi và trang mẫu, 360 và 1280 px; để review xem, không phải phép kiểm | CI (tệp `anh-chup`, giữ 7 ngày) |

- Kiểm thử chờ điều kiện (khối dựng xong, `document.fonts.ready`), không chờ cố định: chờ cố định từng làm CI của opus chập chờn trên WebKit.
- Trang mẫu lấy từ bản build (`tools/trang-mau.mjs`): trang chủ, trang 404, trang nhánh đang làm đã đổi so với `main` (tối đa 8), rồi mỗi loại khối một trang. Thành phần mới thì thêm dấu hiệu vào `KHOI` của file ấy. Chạy riêng một trang: `PSYCHE_TRANG="thi-nghiem/asch/" npm run test:trinh-duyet`; riêng một trình duyệt: `PSYCHE_TRINH_DUYET=webkit npm run test:trinh-duyet`.
- Từ D1.2–D1.6 thêm: schema dữ liệu (bộ dữ liệu hỏng mẫu), khóa, phạm vi lô, link và anchor, so chữ với site cũ (tự bỏ qua khi không có `../psyche-zero/`, như trên GitHub).

## 8. CI và deploy

Mục tiêu: nhanh (các phần chạy song song, thời gian chờ bằng phần lâu nhất, khoảng 3–4 phút), ít tốn (không chạy khi không cần, lưu đệm), và không đăng bản hỏng.

```text
push nhánh moi/**, mo/**, them/** (hay pull request)            push main
        │  bỏ qua nếu chỉ đổi plans/, README, AGENTS, CLAUDE, LICENSE        │  bỏ qua như bên trái
        ▼                                                                    ▼
test.yml: 6 job song song, mỗi job tự build bản xem          deploy.yml: job build (bản thật, npm test)
  npm-test │ chromium │ webkit │ firefox │ lighthouse │ anh-chup        ▼
  (một job hỏng, các job khác vẫn chạy tới cuối)            job trình duyệt song song: chromium, lighthouse
                                                            (+ webkit, firefox nếu commit chưa qua test.yml)
                                                                     ▼
                                                            job đăng: deploy-pages (chỉ khi mọi job đạt)
```

- **Song song theo phần:** mỗi phần kiểm thử một job (`strategy.matrix`), `fail-fast: false` để thấy hết lỗi trong một lần. Build bản này chỉ vài giây, nên mỗi job tự build thay vì chuyền `dist/` qua artifact (tải lên, tải về mất lâu hơn build). Khi build vượt khoảng 60 giây (site lớn), chuyển sang một job build tải `dist/` lên, các job kiểm thử tải về.
- **Không chạy lặp:** `concurrency` hủy lần chạy cũ của cùng nhánh khi có push mới; deploy xếp hàng, không hủy (bản cũ không ghi đè bản mới). Commit gộp vào `main` kiểu fast-forward đã qua `test.yml` ở nhánh, nên deploy chỉ chạy lại Chromium và Lighthouse trên bản thật (bản thật dựng khác bản xem); push thẳng lên `main` thì chạy đủ.
- **Không chạy khi không cần:** push chỉ đổi `plans/`, `README.md`, `AGENTS.md`, `CLAUDE.md`, giấy phép thì cả hai workflow bỏ qua. Đánh đổi đã biết (review D1.1): nhánh có commit cuối chỉ đổi kế hoạch thì commit ấy không có lần chạy `test.yml` riêng, nên khi gộp, deploy chạy đủ bốn phần thay vì hai. Vẫn an toàn (chạy nhiều hơn, không ít hơn); muốn tiết kiệm thì để báo cáo vào cùng commit với mã.
- **Lưu đệm:** `node_modules` theo `package-lock.json`, hệ điều hành, kiến trúc và phiên bản Node (trúng thì bỏ `npm ci`, đỡ khoảng 15–20 giây mỗi job). Lưu ngay sau `npm ci`, trước khi build (`actions/cache/restore` rồi `actions/cache/save`), để bộ đệm build của Astro (`node_modules/.astro`, trang đã dựng) không lọt vào và bị dùng lại cho bản build khác: lưu ở cuối job thì lọt, và dòng loại trừ `!node_modules/.astro` không có tác dụng khi lưu cả thư mục (review D1.1 thử với `@actions/glob` và `tar`). Trình duyệt Playwright lưu đệm theo phiên bản và trình duyệt (đỡ khoảng 2 phút); thư viện hệ thống cài mỗi lần.
- **Giới hạn:** job kiểm thử dừng sau 30 phút, job đăng sau 15 phút. Quyền tối thiểu: chỉ job đăng có `pages: write`, `id-token: write`.
- **Khi kiểm thử trình duyệt dài ra** (đợt 8, công cụ): chia tiếp mỗi trình duyệt thành hai job theo file kiểm thử (`kiem-*.mjs`), vẫn song song.
- Các bước dùng chung ở `.github/actions/kiem-thu/action.yml`. Hỏng Lighthouse thì JSON được tải lên lần chạy (giữ 14 ngày). Ảnh chụp: `gh run download <số lần chạy> -n anh-chup`.
- **Bạn** bật Pages (Settings → Pages, Source: GitHub Actions) trước khi gộp D1.7; trước đó `deploy.yml` hỏng ở bước đăng, không ảnh hưởng gì.
- Thử như CI trên máy: clone repo vào thư mục không có `psyche-zero` cạnh nó, `npm ci`, build, kiểm thử; phép thử cần site cũ tự bỏ qua.

## Nguồn

- Repo opus: `../opus/plans/lam-lai/cong-nghe.md` (lý do chọn Astro 7, Sätteri, Pagefind; kết quả thử ở đợt 1), `../opus/.github/`, `../opus/tests/`, `../opus/tools/`.
- Bảo trì Material for MkDocs, MkDocs 2.0, Zensical: rà soát ngày 20/10/2026, ghi ở tab "Kế hoạch làm lại site" của tài liệu Claude Docs (mục Công nghệ, Nguồn).
