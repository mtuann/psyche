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
npm run build     # bản thật vào dist/: chỉ trang đã khóa; deploy dùng bản này
npm run build:xem # bản xem vào dist/: thêm trang chưa khóa, có dải "Chưa kiểm định"; không đăng
npm run preview   # xem dist/ vừa build: http://localhost:4321/psyche/
npm test          # kiểm thử trên dist/: chạy sau npm run build hay npm run build:xem
npm run test:trinh-duyet  # kiểm thử trình duyệt trên trang mẫu của dist/: ba trình duyệt, ba cỡ màn hình, axe, tìm kiếm
npm run lighthouse        # Lighthouse ở tối đa ba trang mẫu của dist/, kiểm luật 7 của kế hoạch
```

- Kiểm thử ở `tests/*.test.mjs`, chạy bằng trình kiểm thử có sẵn của Node (`node --test`, các file chạy song song). Thêm kiểm thử thì thêm file `tests/<tên>.test.mjs`.
- Kiểm thử trình duyệt ở `tests/trinh-duyet/kiem-*.mjs` (Playwright), không nằm trong `npm test`. Chờ điều kiện (khối dựng xong, `document.fonts.ready`), không chờ cố định. Lần đầu cài trình duyệt: `npx playwright install chromium webkit firefox`. Chỉ một trình duyệt: `PSYCHE_TRINH_DUYET=chromium npm run test:trinh-duyet`; thêm trang: `PSYCHE_TRANG="thi-nghiem/asch/" npm run test:trinh-duyet`. Phép thử chỉ chạy trên Chromium (axe, API tìm kiếm) tự bỏ qua khi không có Chromium.
- Lighthouse cần Chromium của Playwright (hay `CHROME_PATH`); đo qua máy chủ HTTP/2 tự ký (`tools/may-chu.mjs`), như GitHub Pages.
- Máy ảo của Cowork không tải được trình duyệt Playwright (CDN bị chặn): ở đó chỉ chạy build và `npm test`; kiểm thử trình duyệt để CI chạy, hay chạy ở máy có trình duyệt.

## Dữ liệu

Từ D1.2. Năm bộ dữ liệu trong `src/data/`, schema và kiểm chéo ở `src/du-lieu.mjs` (Zod, trường lạ là lỗi, lời báo tiếng Việt). Dữ liệu sai thì build hỏng; `PSYCHE_DU_LIEU=tests/du-lieu-hong npm run build` thử với bộ hỏng mẫu (phải hỏng). Dữ liệu chưa kiểm định, chưa khóa: kiểm định và khóa ở D2-0.

| File | Nội dung |
|---|---|
| `linh-vuc.yml` | 14 lĩnh vực: `id`, `ten`, `thu_tu`, `mau` (sắc độ màu của lĩnh vực, 0–359) |
| `trang.yml` | Mọi trang của site, kể cả trang chưa chuyển: `id` (đường dẫn trong `src/content/docs/`, bỏ `.md`), `tang`, `linh_vuc`, `moi` (trang mới), `dua_tren` (bài mở rộng: các bài lõi nó dựa trên), `kiem_lai_truoc` (bài mở rộng, trang có hạn; năm-tháng, đặt khi khóa) |
| `nguon.yml` | Nguồn mà các trang dẫn: `id` (họ tác giả đầu và năm, như `cepeda2006`; trùng thì thêm b, c…), `loai`, `tac_gia`, `nam`, `ten`, `noi_dang`, `doi` (không có `https://doi.org/`) hay `url`; `toan_van`, `rut_bai` ghi khi kiểm định. Mỗi nguồn một bản ghi |
| `nghien-cuu.yml` | Hồ sơ nghiên cứu kinh điển: `nguon` (các bài gốc), `trang_nha` (trang lõi kể chi tiết; nơi khác chỉ tóm một câu và link về). Một nguồn chỉ thuộc một hồ sơ |
| `ngo-nhan.yml` | 60 thẻ ngộ nhận: `khang_dinh`, `nhan` (một trong bốn nhãn), `giai_thich`, `nguon`, `trang`, `cap` (cấp trong bài thử "Bạn nghĩ gì về tâm trí?") |

- **Thông tin của trang** (tầng, lĩnh vực, `dua_tren`, hạn xem lại) chỉ ghi ở `trang.yml`, không ghi ở frontmatter: một chỗ cho mỗi điều, và gia hạn xem lại hay sửa `dua_tren` không đổi mã băm của trang đã khóa. Tầng và lĩnh vực thì D2-0 khóa theo từng bản ghi của `trang.yml` (tầng quyết định mức kiểm định): đổi chúng là mở khóa. Frontmatter có `tang`, `linh_vuc`… (mọi trường của `trang.yml`, cả `ma`, `loai`, `can_ra_soat` của kế hoạch đầu) thì build hỏng. Thêm trang thì thêm bản ghi vào `trang.yml`, không thì build hỏng (file tên mở đầu bằng `_` là nháp, Starlight không nạp, không cần bản ghi; thư mục tên mở đầu bằng `_` thì vẫn được nạp và đăng, nên trang trong đó vẫn cần). `trang.yml` phải khớp bảng `plans/lam-lai/anh-xa.md` (kiểm thử): đổi tầng, lĩnh vực thì sửa cả bảng trong `plans/lam-lai/anh_xa.py` và sinh lại `anh-xa.md`.
- **Loại trang** (bài khám phá, Sức khỏe tâm thần, thí nghiệm, phương pháp, công cụ, trang khác) suy từ đường dẫn: `loaiTrang()` trong `src/du-lieu.mjs`. **Trang Sức khỏe tâm thần** là bài lõi có `linh_vuc: suc-khoe-tam-than` (4 bài: `kham-pha/suc-khoe-tam-than/tram-cam`, `lo-au`, `tim-giup-do`, `tri-lieu-tam-ly`): chỉ khóa khi hồ sơ có chữ ký chuyên gia (`nguoi.chuyen_gia`, ngày; D1.6 kiểm), không cần cờ riêng.
- **Mỗi nguồn một bản ghi:** cùng DOI, cùng URL, hay cùng (họ tác giả đầu, năm, 30 chữ đầu của tên) là một nguồn, build báo lỗi nếu có hai bản ghi. Link chỉ nhận http và https. Lời báo lỗi của bản ghi có số dòng trong file.
- `tools/du_lieu/tach.py` tách dữ liệu một lần từ `../psyche-zero/` (cần PyYAML: `python3 -m pip install -r requirements.txt`). `src/data/` đã có dữ liệu thì script từ chối ghi, trừ khi có `--ghi-de`. Từ đợt 2, `src/data/` sửa tay theo hồ sơ kiểm định.
- Kiểm thử: `tests/du-lieu.test.mjs`; bộ hỏng mẫu `tests/du-lieu-hong/`, mỗi lỗi cố ý một chú thích "lỗi" (kèm hai chấm). Thêm phép kiểm thì thêm lỗi mẫu tương ứng.

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

Từ D1.6, như opus: trang và bản ghi dữ liệu lên site thật khi đã khóa (mã băm trong `kiem-dinh/khoa.json`, hồ sơ trong `kiem-dinh/<trang>.yml`, bản ghi `kiem-dinh/du-lieu/<bộ>/<id>.yml`; `plans/ben-vung/chuan-kiem-dinh.md` mục 6–8). Trang đã khóa mà đổi thì build hỏng (cả hai bản), kèm lệnh mở khóa. Mã: `src/khoa.mjs` (mã băm: NFC, `\n`, bỏ khoảng trắng cuối dòng), `src/ban-build.mjs` (bản thật bỏ trang chưa khóa), `src/components/Banner.astro` (dải "Chưa kiểm định" ở bản xem).

```bash
node tools/khoa.mjs mau <mục>…                 # hồ sơ mẫu (mục: thi-nghiem/asch, index, 404, du-lieu/nguon/asch1956[#nam,tac_gia])
node tools/khoa.mjs khoa <mục>…                # kiểm hồ sơ đủ rồi ghi mã băm vào khoa.json và vào lần cuối của hồ sơ
node tools/khoa.mjs mo <mục> --ly-do "…"       # mở khóa: ghi lý do, thêm lần kiểm định mới
node tools/khoa.mjs tinh [<mục>…]              # mã băm; không có mục thì kiểm mọi mục đã khóa
node tools/khoa.mjs xuat D3-L1                 # danh sách nhận định cho lượt 2 (theo mức của tầng); --mau 5: kiểm mẫu của chủ repo
node tools/khoa.mjs nhap <file lượt 2>         # đưa kết quả lượt 2 vào hồ sơ
```

- Khóa đòi: mọi nhận định có `loai` (chuẩn mục 1), `ket_qua` (`dung`, `da-sua`, `da-lam-mem`, `da-bo`; ba loại sau cần `ghi_chu`), nguồn có trong `nguon` của hồ sơ, lượt 2 theo tầng (kết quả `dung`, `sai`, `qua-manh`, `khong-chac`; `sai`, `qua-manh` cần `cau_dung`; lõi: mọi nhận định; mở rộng: 8 nhận định ngẫu nhiên cộng mọi `nhan`, `lam-sang`, mẫu có câu `sai` hay `qua-manh` thì kiểm hết); nhãn có `nhan`, `co_so`, `ly_do`; thời sự có `het_han` chưa tới; câu `ve-site` không qua lượt 2 mà có `review`; `tang` của hồ sơ khớp `trang.yml`; mọi trang có nhận định thuộc lĩnh vực Sức khỏe tâm thần có `nguoi.chuyen_gia`; chỉ trang khung, trang sinh từ dữ liệu và 404 được khóa không có nhận định; bài mở rộng có `dua_tren`, `kiem_lai_truoc` ở `trang.yml`; trang không còn ô "chưa chuyển", không có khoảng trắng cuối dòng.
- Trang chủ tạm và trang 404 đã khóa (D1.6, hồ sơ không có nhận định, có `ghi_chu`).
- Nhánh lô `moi/dN-lM` chỉ chạm phạm vi của lô; nhánh gom `moi/dN-gom` chỉ chạm phạm vi các lô của đợt (`tests/pham-vi.test.mjs`, trang lấy từ `plans/lam-lai/anh-xa.md`). Sửa `src/plugins/psyche-markdown.mjs` (chỉ thị mới) chỉ ở lô được giao.

## Giao diện

- Giữ font (Be Vietnam Pro, tự host), màu (chàm `#3b3f8f`, hồng `#b4387a`, bốn màu nhãn) và giọng văn của site cũ. Màu ở `src/styles/psyche.css`, có bản sáng và tối; khối trong bài ở `src/styles/thanh-phan.css`.
- Bố cục C (D1.3): thanh trên và dải chàm đậm; menu tám nhóm, Nền tảng chia 14 lĩnh vực (`src/menu.mjs`, `src/components/Sidebar.astro`), mỗi lĩnh vực một màu (`mau`) và một biểu tượng (`bieu_tuong`, `src/bieu-tuong.mjs`); viên loại bài, lĩnh vực, tầng phía trên tiêu đề và dòng trạng thái kiểm định phía dưới (`src/components/PageTitle.astro`, đọc `trang.yml` và `kiem-dinh/`).
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

## Chuyển trang, so chữ, link

Từ D1.5. Lô chuyển trang bằng script, không chép tay (luật 6):

```bash
PYTHONDONTWRITEBYTECODE=1 ../psyche-zero/.venv/bin/mkdocs build -q -f ../psyche-zero/mkdocs.yml -d "$PWD/.cache/site-cu"   # bản build cũ để so chữ (-d tuyệt đối)
node tools/chuyen/chuyen.mjs thi-nghiem/asch [--ghi-de]      # ghi src/content/docs/thi-nghiem/asch.md và hình vào src/hinh/
npm run build:xem && node tools/chuyen/so-chu.mjs thi-nghiem/asch   # chữ hiển thị như trang cũ; khác thì ghi doi_chu ở hồ sơ
node tools/chuyen/so-chu.mjs thi-nghiem/asch --doi-chu       # khung doi_chu cho các chỗ khác
```

- Script đổi: H1 thành `title` (title cũ khác H1 thì thành `sidebar.label`, tên trong menu); `!!! vung-chac "Vững chắc: ý"` thành `:::vung-chac[ý]`; `!!! warning`, `note` thành aside của Starlight; `??? note "…"` thành `:::thu-gon[…]`; `<div class="pz-quiz" markdown>` thành ` ```quiz `; `<div class="pz-stroop"></div>` thành `::cong-cu{ten="stroop"}`; vùng `<!-- fig:x -->` thành `::hinh{ten="x"}` (chép `<figure>` vào `src/hinh/x.html`); chip `pz-tag` thành `:nhan[…]`; link `.md` và link thư mục thành `/psyche/<trang>/`. Bỏ dòng "*Rà soát nội dung lần cuối…*" (nay sinh từ hồ sơ) và `can_ra_soat`, `kiem_tra_lan_cuoi`, `hide` ở frontmatter. Chỗ không tự quyết thì in cảnh báo.
- `so-chu.mjs` so từng khối chữ, câu hỏi, tiêu đề, mô tả, id tiêu đề; cụm khối chỉ khác cách ngắt khối (site cũ dồn danh sách vào đoạn trên) không tính là khác.
- Id tiêu đề giữ kiểu site cũ (`src/plugins/id-cu.mjs`, như `vi_slugs.py`: "đ" thành "d"), nên link `#mục` cũ còn đúng.
- Link tới trang chưa có trong bản build thành chữ kèm nhãn "sắp có" (`src/plugins/sap-co.mjs`), tự thành link khi trang lên; `tests/link.test.mjs` kiểm mọi link và `#mục` nội bộ, và chữ "sắp có" trỏ tới trang có trong `trang.yml`. Link nội bộ viết `/psyche/<trang>/`.
- Trang 404 (`src/content/docs/404.md`): báo site đang làm lại, nút về trang chủ, mở ô tìm kiếm, và mở đúng địa chỉ ấy ở Psyche Zero.

## Mẫu trang và khối đặc biệt

Chốt ở D1.4 (`src/plugins/psyche-markdown.mjs`, `src/plugins/thanh-phan.mjs`; kiểm thử `tests/thanh-phan.test.mjs`). Trang viết `.md`, không nhúng JSX. Viết sai (khối, chỉ thị không có ở đây, thiếu nhãn, thuộc tính lạ, câu hỏi không đúng một đáp án đúng) thì build hỏng. Cú pháp cũ của site MkDocs chỉ để tra khi chuyển trang (`tools/chuyen/`, D1.5).

| Khối | Cách viết | Hiện ra |
|---|---|---|
| Khung nhãn mức độ chắc chắn | `:::vung-chac[Ý chính]` … `:::` (cả `kha-vung`, `tranh-cai`, `bac-bo`); không ghi lại chữ "Vững chắc:"; chỉ trang giới thiệu nhãn (`bat-dau/doc-nhan-chac-chan`) được bỏ ý chính, trang khác thì build hỏng | Khung nền màu nhạt của nhãn, nhãn dạng viên, ý chính in đậm; trình đọc màn hình đọc "Vững chắc: ý chính" |
| Chip nhãn trong câu | `:nhan[vung-chac]` | Viên nhỏ "Vững chắc" |
| Khối thu gọn | `:::thu-gon[Xem đáp án]` … `:::` | Nút bấm để mở (vùng bấm 44 px); khi in thì mở hết |
| Khung "Ở Việt Nam" | `:::o-viet-nam` … `:::`, tiêu đề khác: `:::o-viet-nam[Ở Việt Nam và châu Á]` | Khung viền hồng có tiêu đề nhỏ |
| Câu hỏi kiểm tra nhanh | Khối ` ```quiz `: `? câu hỏi`, `+ đáp án đúng`, `- đáp án sai`, `> giải thích` (dòng `>` trống tách đoạn) | Mỗi câu chọn một lần, báo đúng sai, hiện giải thích, cuối cùng điểm và "Làm lại"; thứ tự lựa chọn trộn mỗi lần, nên giải thích không được dựa vào vị trí lựa chọn. Kết quả lưu ở khóa `psyche-zero` như site cũ. Mỗi câu đúng một `+`, ít nhất hai lựa chọn, có giải thích |
| Công cụ | `::cong-cu{ten="stroop"}`, thông số như `data-*` của site cũ: `::cong-cu{ten="stroop" blocks="1"}` | Công cụ nạp khi khối tới gần màn hình (`src/scripts/tai.js`); lưu trong trình duyệt ở khóa `psyche-zero`. Công cụ đã có: `CONG_CU` trong `src/plugins/thanh-phan.mjs`; chưa có thì ô "chưa chuyển" (chỉ ở trang chưa khóa) |
| Hình | `::hinh{ten="duong-cong-quen"}` (tên như vùng `<!-- fig:… -->` của site cũ) | Hình tĩnh `src/hinh/<tên>.html`: một `<figure class="pz-fig">`, SVG có `role="img"` và `aria-label`, chữ thật, màu theo `currentColor` và lớp `pz-fig-a` (chàm), `pz-fig-b` (hồng), không viết cứng mã màu. Chưa có thì ô "chưa chuyển" |
| Danh sách nguồn | `::nguon{id="cepeda2006,murre2015"}` | Danh sách APA dựng từ `src/data/nguon.yml`. Trang chuyển từ site cũ giữ mục Nguồn viết tay |
| Ghi chú, mẹo, chú ý | `:::note`, `:::tip`, `:::caution`, `:::danger`, tiêu đề tùy chọn `:::tip[…]` | Aside của Starlight |
| Bổ sung có ngày | File `src/content/bo-sung/<trang>/<năm-tháng-ngày>.md`, frontmatter `trang`, `ngay`, `anh_huong_nhan` (`src/content/bo-sung/README.txt`) | Mục "Bổ sung" cuối trang, mới nhất trước; không sửa trang nên không đổi mã băm. Chưa có khóa riêng (đợt 9), nên chỉ hiện ở bản xem |
| Id cố định cho tiêu đề | `## Tiêu đề { #id }` | Giữ id cũ để link `#mục` cũ còn chạy |

- Script công cụ của site cũ chép nguyên ở `src/scripts/cu/` (nạp qua `src/scripts/cong-cu/<tên>.js`, `nen.js`); đợt 8 viết lại thành module. Kiểm thử trình duyệt chờ `data-san` mà `mount()` của công cụ đặt khi dựng xong.
- Tóm tắt đầu bài, hồ sơ nghiên cứu (bản mẫu C) chưa làm: lô đầu tiên cần chúng (D2-L1, D3-L1) làm thành phần.

## Cách làm việc

- Mỗi việc một nhánh (`plans/lam-lai/README.md`, "Quy tắc chung"); không push (chủ repo push). Không sửa `.claude/`.
- Commit message tiếng Việt, kết thúc bằng dòng Co-Authored-By của model đã làm.
- Báo cáo mỗi việc ở `plans/lam-lai/bao-cao/<mã>.md`: việc đã làm, file đã chạm, kết quả kiểm thử, model đã dùng, chỗ chưa chắc.
