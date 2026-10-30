# Kế hoạch làm lại site theo đợt

Site mới (Astro và Starlight) dựng trong **repo mới `mtuann/psyche`**, ở thư mục `psyche/` cạnh thư mục cũ, lịch sử git bắt đầu từ đầu, đăng ở https://mtuann.github.io/psyche/. Tên site: Psyche (bản trước tên Psyche Zero). Site cũ (MkDocs) **giữ nguyên** ở repo `mtuann/psyche-zero` và https://mtuann.github.io/psyche-zero/; thư mục cạnh `../psyche-zero/` chỉ để đọc và chép nội dung, không sửa. Nội dung chuyển sang theo 10 đợt (0 đến 9), làm lần lượt. Trang chỉ lên site sau khi đã kiểm chứng và khóa, nên trong lúc làm lại, site mới chỉ có những phần đã xong và lớn dần sau mỗi lô; người đọc vẫn đọc bản cũ ở `/psyche-zero/`.

Cách làm theo repo `mtuann/opus` (thư mục cạnh `../opus/`), đã chạy qua 5 đợt: cùng công nghệ, cùng quy trình lô, cùng kiểm thử và CI. Chỗ khác là nội dung: tâm lý học, nên chuẩn kiểm định, loại nhận định và thứ bậc nguồn viết riêng (`../ben-vung/chuan-kiem-dinh.md`).

File này là bản chuẩn cho người làm và agent. Bản cho người đọc, có hình: `so-do.md` (GitHub tự vẽ) và tài liệu Claude Docs "Kế hoạch phát triển bền vững Psyche Zero" (https://claude.ai/artifact/DBNUuAk5yomzGsf55NxoEe, hai tab: kiến trúc bền vững, kế hoạch làm lại; chỉ người được chủ repo chia sẻ mới mở được). Hai bản khác nhau thì file này đúng.

| File | Nội dung |
|---|---|
| `README.md` (file này) | Quyết định, tiến độ, luật, các đợt, rủi ro, quy trình mỗi lô, review |
| `giao-viec.md` | Giao việc cho người mới và cho agent: đọc gì, chọn model nào, gửi gì |
| `so-do.md` | Sơ đồ: các đợt, một lô, trang nào lên site, CI song song, lớp dữ liệu |
| `cong-nghe.md` | Công nghệ, phiên bản, thư mục, bản thật và bản xem, CI và deploy, kiểm thử |
| `anh-xa.md` | Mỗi trang cũ thuộc nhóm menu, tầng, lĩnh vực, đợt, lô nào; sinh lại bằng `python3 plans/lam-lai/anh_xa.py > plans/lam-lai/anh-xa.md` |
| `loi-giao/` | Lời giao việc mẫu cho agent: làm lô, lượt 1, lượt 2, review mã; bảng model |
| `bao-cao/` | Báo cáo của từng việc, từng lô |
| `../ben-vung/README.md` | Kiến trúc bền vững: ba tầng, ba loại khẳng định, hồ sơ, khóa, phần động, máy canh |
| `../ben-vung/chuan-kiem-dinh.md` | Nhận định, thứ bậc nguồn, kiểm định hai lượt, thước đo nhãn, hồ sơ, khóa, mở khóa |
| `../ben-vung/them-noi-dung.md` | Sau khi làm lại: thêm bài, bổ sung, thẻ ngộ nhận; cập nhật bài đã khóa |

## Quyết định

Chủ repo chọn ngày 29/10/2026 ("đồng ý với plan và step"; dùng Astro và Starlight; giữ nguyên trang cũ, không động vào thư mục cũ, làm lại ở thư mục mới `psyche`; agent dùng model hợp việc; CI tối ưu, kiểm thử song song):

- [x] **Repo và thư mục:** repo mới `mtuann/psyche`, thư mục `psyche/` cạnh `psyche-zero/`, git từ đầu. Repo cũ, thư mục cũ và site cũ để nguyên: không sửa, không tag, không tắt Pages. Thay cho phương án cũ (thư mục `web/` trong repo cũ, chuyển trang bằng `git mv`).
- [x] **Công nghệ:** Astro 7.4.2 và Starlight 0.42.7, Pagefind 1.5.2, Node 24, như repo opus. Không cần đợt thử riêng (phương án cũ: đợt thử Astro 6): opus đã thử và dùng qua 5 đợt; phần riêng của Psyche (thành phần, công cụ) thử ngay ở đợt 1. Lý do: `cong-nghe.md` mục 1.
- [x] **Địa chỉ:** site mới ở `https://mtuann.github.io/psyche/`, đường dẫn trang như cũ (`/psyche-zero/thi-nghiem/asch/` thành `/psyche/thi-nghiem/asch/`). Không có bản beta công khai: bản xem (có trang chưa khóa) chỉ dựng ở máy và CI, như opus.
- [x] **Tên site:** Psyche (bỏ "Zero", như Opus). Đổi được khi duyệt D1.1. Khóa dữ liệu trong trình duyệt giữ là `psyche-zero` (cùng tên miền nên người dùng cũ giữ được kết quả các bài thử).
- [x] **Kiến trúc bền vững** (tab "Kế hoạch phát triển bền vững", `../ben-vung/README.md`): ba tầng (Nền tảng khóa; Mở rộng có hạn xem lại; Dòng cập nhật chỉ thêm), ba loại khẳng định (lịch sử, nhận định, thời sự), hồ sơ kiểm chứng đi kèm từng trang, khóa bằng mã băm, mỗi nghiên cứu một trang nhà, phần hay đổi sinh lúc build, máy canh thay việc đọc lại.
- [x] **Bản đồ Nền tảng:** duyệt như đề xuất (`../ben-vung/README.md` mục 3): 68 trang lõi (39 bài Khám phá, 15 Thí nghiệm, 12 Hiểu bằng chứng, Cách đọc nhãn, Bạn nghĩ gì về tâm trí?), 12 bài mở rộng, 13 trang công cụ; 14 lĩnh vực. Khoảng 18 chỗ trống kinh điển làm sau khi xong đợt 9, theo `../ben-vung/them-noi-dung.md`.
- [x] **Thước đo nhãn** (vững chắc, khá vững, đang tranh cãi, đã bị bác bỏ): duyệt như đề xuất (`../ben-vung/chuan-kiem-dinh.md` mục 4).
- [x] **Mức kiểm định theo tầng:** lõi đủ hai lượt độc lập (V3); mở rộng hai lượt, lượt 2 kiểm mẫu (V2); công cụ: số liệu trong mã vào hồ sơ; thẻ ngộ nhận và dữ liệu dùng chung: hai lượt. Bạn chỉ đọc tóm tắt hồ sơ và xem ngẫu nhiên khoảng 5 nhận định mỗi lô.
- [x] **Quy trình như opus:** đợt và lô, mỗi lô một nhánh, ba mức review, lượt 2 do agent khác làm độc lập, các lô làm lần lượt, tối đa 2–3 agent nặng cùng lúc, model theo phần việc (`loi-giao/README.md`).
- [x] **Giao diện:** giữ font (Be Vietnam Pro), màu (chàm `#3b3f8f`, hồng `#b4387a`, bốn màu nhãn) và giọng văn của site cũ. **Bố cục** (chủ repo chọn ngày 29/10/2026 trong ba bản mẫu A, B, C): phương án C "Tạp chí", lấy thêm màu riêng của từng lĩnh vực ở phương án B. Trang chủ mở bằng một câu hỏi trên dải chàm đậm liền thanh trên, thẻ bài nổi bật, mục lục theo lĩnh vực, dải "Cách Psyche kiểm chứng"; trong bài: viên loại bài, lĩnh vực, tầng phía trên tiêu đề, dòng trạng thái kiểm định dưới tiêu đề, hộp tóm tắt đầu bài, mục lớn đánh số, khung nhãn nền màu nhạt có nhãn dạng viên. Bản mẫu và ảnh: `ban-mau/`. D1.3 làm bản thật.
- [x] **Hiển thị tầng:** menu theo lĩnh vực (Nền tảng gồm 14 lĩnh vực); tầng hiện bằng viên "Nền tảng", "Mở rộng" cạnh tiêu đề trang, như bản mẫu C (chọn cùng bố cục, 29/10/2026).
- [x] **CI:** như opus (mỗi phần một job, chạy song song; deploy chạy lại trên bản thật), thêm: bỏ qua lần push chỉ đổi kế hoạch, lưu đệm `node_modules` và trình duyệt. Làm trước ở D1.1 (theo yêu cầu của chủ repo), hoàn tất ở D1.7. Chi tiết: `cong-nghe.md` mục 8.
- [x] **Sách in, Tờ tóm tắt, trang Ngộ nhận** sinh lúc build từ trang và dữ liệu đã khóa; không commit file sinh.
- [x] **Repo riêng tư** `mtuann/psyche` (chủ repo tạo ngày 29/10/2026; có GitHub Pro nên vẫn đăng Pages, trang Pages công khai). Site không link tới repo (người đọc mở ra trang 404); `tests/khung.test.mjs` chặn. Repo công khai sau này thì bỏ phép thử ấy.
- [x] **Giấy phép nội dung:** CC BY-SA 4.0 như opus (chủ repo chọn ngày 30/10/2026); toàn văn trong `LICENSE-CONTENT`, chân mọi trang ghi giấy phép. Mã nguồn chưa chọn giấy phép.

Câu hỏi còn chờ; hỏi chủ repo trước lô ghi bên cạnh:

- Ai rà soát chuyên môn 4 trang Sức khỏe tâm thần (điều kiện để khóa). Trước đợt 7.
- Khi site mới đủ (đợt 9): có thêm dải "Psyche đã chuyển sang /psyche/" lên site cũ không. Việc này phải sửa repo cũ, nên chỉ làm khi chủ repo cho phép rõ.

## Tiến độ

| Đợt | Nội dung | Lô | Sau đợt này site thật có thêm | Ước tính | Trạng thái |
|---|---|---|---|---|---|
| 0 | Dựng repo mới, kế hoạch | | Chưa đăng gì | 0,5 ngày | Xong 29/10/2026 (`bao-cao/d0.md`) |
| 1 | Nền kỹ thuật | D1.1–D1.8 | Trang chủ tạm, trang 404 ở `/psyche/`; ba trang thử ở bản xem | 1,5–2 ngày | Xong 30/10/2026 (`bao-cao/d1-1.md` … `d1-8.md`): review và kiểm lại đạt, CI 6/6 job, gộp vào `main` (`1e25fa8`), deploy đăng trang chủ tạm và 404 mới |
| 2 | Dữ liệu dùng chung và lối vào | D2-0, D2-L1 | Trang chủ thật, Bắt đầu, Cách đọc nhãn, Hỗ trợ, Cách Psyche kiểm chứng, 14 trang lĩnh vực (20 trang) | 1,5–2 ngày | Xong 30/10/2026 (`bao-cao/d2-0.md`, `d2-l1.md`): 556 bản ghi và 20 trang đã khóa |
| 3 | Thí nghiệm kinh điển | D3-L1, D3-L2 | 15 thí nghiệm và mục lục (36 trang) | 2–3 ngày | Chưa làm |
| 4 | Hiểu bằng chứng | D4-L1, D4-L2 | 12 bài phương pháp và mục lục (49 trang) | 1,5–2 ngày | Chưa làm |
| 5 | Nền tảng phần 1 | D5-L1–D5-L4 | 27 bài đã kiểm ở G1-L01–L04 của site cũ (76 trang) | 1,5–2 ngày | Chưa làm |
| 6 | Nền tảng phần 2 | D6-L1–D6-L3 | 20 bài: căng thẳng, giấc ngủ, hạnh phúc, cơ sở sinh học, phát triển (96 trang) | 2–3 ngày | Chưa làm |
| 7 | Sức khỏe tâm thần | D7-L1 | 4 bài, khóa sau khi chuyên gia đọc (100 trang) | 1 ngày, cộng thời gian chờ chuyên gia | Chưa làm |
| 8 | Công cụ, ngộ nhận, sách in, Thêm | D8-L1–D8-L4 | 11 công cụ, 60 thẻ ngộ nhận, Sách in, Tờ tóm tắt, Nghiên cứu mới, dùng khi mất mạng; đủ 106 trang cũ (121 trang) | 2–3 ngày | Chưa làm |
| 9 | Hoàn tất | | Máy canh hằng tuần; site mới không còn cần `../psyche-zero/` | 0,5–1 ngày | Chưa làm |

- Ước tính theo nhịp của opus (đợt 0–1 trong khoảng 1,5 ngày; sau đó 25–45 trang mỗi ngày khi bộ máy đã chạy), cộng phần nặng hơn của tâm lý học: mỗi trang cũ có khoảng 22 khẳng định (G1-L01–L04: 607 khẳng định trên 27 bài), nhiều số liệu và nghiên cứu gốc phải mở. Tổng khoảng **14–19 ngày làm việc, 30–40 phiên**; theo lịch thì 3–5 tuần, tùy nhịp bạn duyệt và gộp, giới hạn sử dụng, và thời gian chờ chuyên gia.
- Số trang trong cột "site có thêm" là cộng dồn, tính cả trang mục lục và 15 trang mới. Danh sách trang của từng lô: `anh-xa.md`. Người review cập nhật bảng này cuối mỗi đợt.

## Bảy luật

1. **Cổng vào:** trang chỉ lên site khi có hồ sơ kiểm định đủ và mã băm trong `kiem-dinh/khoa.json`; bản build thật tự bỏ trang chưa khóa. Không chép nguyên trạng.
2. **Site cũ chỉ đọc:** không sửa, commit, tag hay push gì trong `../psyche-zero/`; thư mục đó chỉ là nguồn để chuyển và để so chữ. Mỗi review đợt kiểm `git -C ../psyche-zero status --short` không có gì mới do agent tạo.
3. **Dữ liệu trước, trang sau:** thông tin dùng ở nhiều nơi (nguồn, hồ sơ nghiên cứu kinh điển, lĩnh vực, thẻ ngộ nhận) vào `src/data/` (có schema) trước khi trang dùng nó được chuyển. Mỗi nghiên cứu một trang nhà: nơi khác tóm một câu và link về nhà.
4. **Giữ đường dẫn:** `../psyche-zero/docs/<trang>.md` thành `src/content/docs/<trang>.md`; `/psyche-zero/<trang>/` thành `/psyche/<trang>/`. Trang gộp hay bỏ ghi trong `anh-xa.md`. Link tới trang chưa lên site hiện chữ "sắp có" và tự thành link khi trang lên.
5. **Mỗi đợt một chủ đề, mỗi lô một nhánh,** có tiêu chí xong.
6. **Chuyển bằng script, sửa qua kiểm định:** cú pháp đổi bằng `tools/chuyen/`; chữ chỉ đổi khi hồ sơ ghi lý do và nguồn.
7. **Không lùi chuẩn:** Lighthouse trên điện thoại: hiệu năng từ 95; trợ năng, thực hành tốt và SEO đều 100. Không lỗi axe (WCAG 2.2 AA). Ba trình duyệt (Chromium, WebKit, Firefox), ba cỡ màn hình (360, 768, 1280 px), vùng bấm từ 44 px. Chân mọi trang có lời nhắc Hỗ trợ.

## Quy tắc chung

- Lệnh: `npm ci`; `npm run build` (bản thật, chỉ trang đã khóa từ D1.6); `npm run build:xem` (bản xem, thêm trang chưa khóa, không đăng); `npm test`; `npm run test:trinh-duyet`; `npm run lighthouse`. Chi tiết và phiên bản: `cong-nghe.md`. Site cũ build lại để so chữ, ra ngoài thư mục cũ: `PYTHONDONTWRITEBYTECODE=1 mkdocs build -f ../psyche-zero/mkdocs.yml -d "$PWD/.cache/site-cu"`, chạy từ `psyche/` với môi trường Python của site cũ. Đường dẫn `-d` phải tuyệt đối: MkDocs tính đường dẫn tương đối theo thư mục chứa `mkdocs.yml`, nên đường dẫn tương đối sẽ ghi vào `../psyche-zero/`.
- Nhánh: `moi/d1-<số việc>-<tên ngắn>` cho việc ở đợt 1; `moi/d<đợt>-l<lô>` cho một lô (ví dụ `moi/d3-l1`); `moi/d<đợt>-gom` cho nhánh gom lượt 2 của đợt; `mo/<tên ngắn>` cho mở khóa; `them/<tên ngắn>` cho nội dung thêm sau khi làm lại. Đợt 0 commit thẳng lên `main` vì repo mới chưa có commit nào.
- Báo cáo: `plans/lam-lai/bao-cao/<mã>.md` (ví dụ `d0.md`, `d1-3.md`, `d3-l1.md`): việc đã làm và file đã chạm, số nhận định theo loại, đã sửa và đã bỏ, chỗ chưa chắc, kết quả kiểm thử, nguồn đã dùng, model đã dùng. Người review ghi tiếp vào cuối file.
- Một lô chỉ chạm: trang của lô trong `src/content/docs/`; dữ liệu liên quan trong `src/data/`; thành phần, script và file tĩnh mà trang của lô cần lần đầu (cùng kiểm thử); hồ sơ trong `kiem-dinh/`; báo cáo của lô. Kiểm thử phạm vi (D1.6) chặn chỗ khác.
- Không push (bạn push). Không sửa `.claude/`. Không sửa trang đã khóa: kiểm thử khóa chặn; cần sửa thì theo thủ tục mở khóa (`../ben-vung/chuan-kiem-dinh.md` mục 8).
- Không thêm trang ngoài kế hoạch cho đến hết đợt 9; sau đó thêm theo `../ben-vung/them-noi-dung.md`.
- **Không đưa email hay thông tin cá nhân của chủ repo vào yêu cầu gửi ra ngoài** (User-Agent, tham số, nội dung). Dịch vụ đòi thông tin liên hệ thì dùng `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`.
- Commit message tiếng Việt, kết thúc bằng dòng Co-Authored-By của model đã làm.
- **Người review:** mặc định là Claude (phiên Cowork hay Claude Code của bạn); có thể là người hay LLM khác, miễn không làm lượt 1 hay lượt 2 của chính lô đó.

### Ba mức review

Như opus. Nhánh có sửa ở nhiều mức thì theo mức cao nhất.

| Mức | Loại sửa | Chạy trên máy | Review | Gộp khi |
|---|---|---|---|---|
| **Nhỏ** | Chữ trong kế hoạch, báo cáo, tài liệu; một link; config một dòng; sửa đã có kiểm thử bắt | `npm run build` và `npm test`. Chỉ đổi `plans/` thì không cần chạy | Không | `test.yml` trên GitHub đạt (push chỉ đổi `plans/` không chạy CI) |
| **Vừa** | Mã thành phần, CSS, plugin, script | Kiểm thử liên quan | Haiku (hay Sonnet), chỉ đọc diff, không build lại | CI đạt và review không có chỗ phải sửa |
| **Lớn** | Công cụ khóa, dữ liệu dùng chung, workflow deploy, phần lọc HTML hay link | Chạy đủ: hai bản build, `npm test` cho mỗi bản, kiểm thử trình duyệt | Sonnet (Opus khi đụng khóa hay bảo mật), có vòng kiểm lại | CI đạt; review và vòng kiểm lại không còn chỗ phải sửa |

- Ba lớp chặn: `npm test` trên máy; `test.yml` trên GitHub (thêm kiểm thử trình duyệt, Lighthouse); `deploy.yml` chạy lại trên bản thật trước khi đăng, hỏng thì không đăng và site giữ bản cũ. Lỡ sai thì `git revert` commit đó.
- Gom nhiều sửa nhỏ vào một nhánh, kiểm một lần. Sửa theo review mà nhỏ và có kiểm thử kèm thì bỏ vòng kiểm lại; CI làm việc đó.
- Người review không chạy lại toàn bộ kiểm thử: CI đã chạy. Chỉ đọc diff và chạy đúng phép thử liên quan.
- Lượt 2 kiểm định nội dung của mỗi lô không phải review mã: vẫn giữ, theo `../ben-vung/chuan-kiem-dinh.md`.

## Đợt 0. Dựng repo mới

Claude dựng thư mục `psyche/` ngày 29/10/2026: `.gitignore`, `AGENTS.md`, `CLAUDE.md`, `README.md`, `plans/` (kế hoạch này, kế hoạch bền vững, lời giao việc, ánh xạ trang); cùng phiên làm luôn D1.1 (mục dưới). Chưa có git: thư mục máy ảo không xóa được file, nên `git init` và commit do bạn chạy (`bao-cao/d0.md` có sẵn lệnh). Site cũ ở thư mục cạnh `../psyche-zero/`, không chép sang: agent đọc thẳng ở đó.

1. **Bạn:** xem các file, `git init`, commit đợt 0 lên `main`, tạo nhánh `moi/d1-1-khoi-tao` cho D1.1, tạo repo trống `mtuann/psyche` trên GitHub (không thêm README hay giấy phép), push cả hai nhánh.
2. Repo cũ không cần làm gì.

**Xong khi:** repo mới có commit đầu tiên trên GitHub.

## Đợt 1. Nền kỹ thuật

Mỗi việc một nhánh, làm theo thứ tự. Site mới chưa đăng gì cho đến khi bạn bật Pages (D1.7). Mẫu: đợt 1 của opus (`../opus/plans/lam-lai/bao-cao/d1-*.md`): mã dùng chung (tìm kiếm, máy chủ tĩnh, kiểm thử trình duyệt, Lighthouse, công cụ khóa) chép rồi sửa cho Psyche, không viết lại.

- **D1.1 Khởi tạo** (xong 29/10/2026): Astro 7.4.2 và Starlight 0.42.7 ở thư mục gốc theo `cong-nghe.md`; `site: 'https://mtuann.github.io'`, `base: '/psyche'`, địa chỉ dạng thư mục, tiếng Việt; font tự host và màu của site cũ; trang chủ tạm ("Psyche đang được làm lại; từng phần sẽ lên sau khi được kiểm chứng lại từ đầu"); lời nhắc Hỗ trợ ở chân mọi trang (tạm trỏ tới trang Hỗ trợ của site cũ); `.nvmrc` 24. Làm trước phần của các việc sau: tìm kiếm không dấu (D1.8 của opus), máy chủ tĩnh, kiểm thử trình duyệt, Lighthouse, ảnh chụp và hai workflow CI (D1.7 của opus), vì chủ repo yêu cầu CI song song ngay từ đầu.
- **D1.2 Dữ liệu và schema** (xong 29/10/2026, `bao-cao/d1-2.md`): bộ dữ liệu trong `src/data/` với schema và kiểm chéo (`src/du-lieu.mjs`): `linh-vuc.yml` (14 lĩnh vực, màu), `trang.yml` (tầng, lĩnh vực, `dua_tren`, hạn xem lại của mọi trang, sinh lần đầu từ `anh_xa.py`), `nguon.yml` (khóa, DOI hay URL, tác giả, năm, tên bài, nơi đăng; có toàn văn không, trạng thái rút bài ghi khi kiểm định), `nghien-cuu.yml` (hồ sơ nghiên cứu kinh điển, trang nhà), `ngo-nhan.yml` (60 thẻ). Thông tin của trang ghi ở `trang.yml`, không ghi ở frontmatter (khác kế hoạch đầu: một chỗ cho mỗi điều; bỏ `ma`, vì đường dẫn đã cố định theo luật 4; loại trang suy từ đường dẫn; `can_ra_soat` thay bằng chữ ký chuyên gia trong hồ sơ, D1.6 kiểm). Script tách một lần trong `tools/du_lieu/`, đọc `../psyche-zero/` (mục Nguồn của trang, DOI trong trang, `docs/assets/data/myths.json`). Dữ liệu sai thì build hỏng; có bộ dữ liệu hỏng mẫu để thử. Chưa khóa dữ liệu ở việc này.
- **D1.3 Giao diện** (làm xong 30/10/2026, `bao-cao/d1-3.md`)**:** Claude làm hai, ba bản mẫu (thanh trên, menu theo lĩnh vực, nhãn tầng trên tiêu đề trang, dòng trạng thái kiểm chứng, thẻ lĩnh vực ở trang chủ), chủ repo chọn; làm bản đã chọn. Đã chọn 29/10/2026: phương án C cộng màu lĩnh vực của B (`ban-mau/README.md`). Mỗi lĩnh vực một màu và một biểu tượng. Menu bên dùng được trên Safari cũ (như `Sidebar.astro` của opus).
- **D1.4 Thành phần nội dung** (làm xong 30/10/2026, `bao-cao/d1-4.md`)**:** nhãn mức độ chắc chắn (bốn khung và chip nhãn), câu hỏi kiểm tra nhanh (đúng một đáp án, có giải thích, trộn thứ tự lựa chọn), khung công cụ (nạp mã khi gần màn hình; lưu trong trình duyệt bằng khóa `psyche-zero`), hình tĩnh từ dữ liệu (SVG, có bản sáng và tối, chữ là chữ thật), khối thu gọn, khung "Ở Việt Nam", chỗ cho bổ sung có ngày, danh sách nguồn. Chốt cú pháp trong trang và ghi vào mục "Mẫu trang và khối đặc biệt" của `AGENTS.md`. Logic lấy từ `../psyche-zero/docs/assets/js/`.
- **D1.5 Script chuyển, so chữ, link** (làm xong 30/10/2026, `bao-cao/d1-5.md`)**:** `tools/chuyen/` đọc `../psyche-zero/docs/<trang>.md`, ghi `src/content/docs/<trang>.md`: hộp nhãn `!!!` thành khung nhãn, `???` thành khối thu gọn, `<div class="pz-quiz">` thành câu hỏi, `<div class="pz-tool">` thành chỉ thị công cụ, vùng `<!-- fig: -->` thành chỉ thị hình, link tới file `.md` thành link theo địa chỉ, giữ id tiêu đề cũ. `tools/chuyen/so-chu.mjs`: chữ hiển thị của một trang ở bản build cũ và bản xem giống nhau, trừ chỗ hồ sơ ghi `doi_chu`. Chạy thử trên cả 103 trang nguồn, không commit trang. Link tới trang không có trong bản build hiện "sắp có"; kiểm link và anchor nội bộ trên cả hai bản. Trang 404 thân thiện: báo site đang làm lại, dẫn về trang chủ, ô tìm kiếm và bản cũ.
- **D1.6 Khóa, phạm vi, bản thật và bản xem** (làm xong 30/10/2026, `bao-cao/d1-6.md`)**:** `tools/khoa.mjs` (`mau`, `khoa`, `tinh`, `mo`, `xuat`, `nhap`) theo `../ben-vung/chuan-kiem-dinh.md`, chép từ opus rồi sửa loại nhận định; `kiem-dinh/khoa.json`; kiểm thử khóa; kiểm thử phạm vi lô (so nhánh `moi/dN-lM` với `anh-xa.md`). `npm run build` chỉ đưa trang đã khóa; `npm run build:xem` đưa cả trang chưa khóa, có dải "Chưa kiểm định". Khóa trang chủ tạm và trang 404.
- **D1.7 CI và deploy** (làm xong 30/10/2026, `bao-cao/d1-7.md`)**:** hai workflow đã có từ D1.1; việc này thêm kiểm thử khóa, phạm vi, link vào CI, đo Lighthouse ở ba trang mẫu, rồi đăng. Pages của repo bật từ khi đăng trang chủ tạm (D1.1, Settings → Pages, Source: GitHub Actions).
- **D1.8 Thử** (làm xong 30/10/2026, `bao-cao/d1-8.md`)**:** chuyển ba trang bằng `tools/chuyen/`: một bài lõi có khung nhãn và câu hỏi (`kham-pha/tri-nho/vi-sao-ta-quen`), một thí nghiệm (`thi-nghiem/asch`), một công cụ (`trai-nghiem/stroop`); chưa kiểm định, chưa khóa, nên chỉ có ở bản xem. Chạy bộ truy vấn tìm kiếm (`tests/trinh-duyet/kiem-tim-kiem.mjs`) trên bản xem.

**Xong khi:** ba trang thử hiện đúng ở bản xem (ảnh chụp 360 px và 1280 px), đạt luật 7, và không có trong bản thật; bộ dữ liệu hỏng làm build hỏng; gõ "dinh kien" ra trang có chữ "định kiến"; https://mtuann.github.io/psyche/ hiện trang chủ tạm, địa chỉ không có ra trang 404 mới.

## Đợt 2. Dữ liệu dùng chung và lối vào (D2-0, D2-L1)

Như đợt 2 của opus: tách phần dữ liệu thành việc riêng, làm trước.

- **D2-0 Dữ liệu** (làm xong 30/10/2026, `bao-cao/d2-0.md`: 556 bản ghi đã khóa; nguồn không DOI khác, nguồn thẻ ngộ nhận và mô tả lĩnh vực để cho lô dùng chúng)**:** kiểm định và khóa bản ghi dùng ở nhiều trang. `nguon.yml`: 381 DOI của site cũ khớp Crossref (374 đã có bản ghi từ D1.2, 7 DOI còn lại thêm ở đây: `bao-cao/d1-2.md`) (V1: tác giả, năm, tên bài, nơi đăng; khóa từng trường), cộng nguồn của 60 thẻ ngộ nhận; Crossref gọi từ máy bạn hay GitHub Actions (máy ảo của Cowork bị chặn). `nghien-cuu.yml`: khoảng 20 nghiên cứu được nhắc ở từ 3 trang trở lên, mỗi hồ sơ một trang nhà; khóa phần thông tin xuất bản ở đây, phần kết quả khóa cùng trang nhà. `linh-vuc.yml`: tên, mô tả, thứ tự của 14 lĩnh vực. `trang.yml`: tầng và lĩnh vực của mọi trang. Lượt 1 và lượt 2 theo `loi-giao/luot-1-du-lieu.md`, `luot-2-du-lieu.md`.
- **D2-L1 Lối vào** (làm xong 30/10/2026, `bao-cao/d2-l1.md`) (`anh-xa.md`, 20 trang): trang chủ thật (giới thiệu, thẻ lĩnh vực, công cụ và bài mới nhất, sinh từ dữ liệu, chỉ trang đã khóa); Bắt đầu; Cách đọc nhãn (thêm thước đo nhãn, `../ben-vung/chuan-kiem-dinh.md` mục 4); Hỗ trợ (kiểm lại mọi số liên hệ, ghi ngày kiểm và hạn kiểm lại; đổi link ở chân trang sang trang mới; chép workflow nhắc kiểm tra mỗi quý `ho-tro-quarterly.yml` của site cũ); Khám phá (mục lục 14 lĩnh vực); trang mới "Cách Psyche kiểm chứng"; 14 trang lĩnh vực `/psyche/nen-tang/<mã>/` (vài câu giới thiệu kiểm định như lõi, danh sách bài sinh từ `trang.yml`, bài chưa lên hiện "sắp có").

**Xong khi:** 20 trang trên site thật, bản ghi dùng chung đã khóa, link ở chân trang trỏ tới Hỗ trợ của site mới.

## Đợt 3. Thí nghiệm kinh điển (D3-L1, D3-L2)

15 thí nghiệm là trang nhà của các nghiên cứu kinh điển nhất, nên làm trước bài Khám phá: bài Khám phá sau đó chỉ tóm một câu và link về đây. Mỗi trang 10 mục như site cũ; phần "Ngày nay nhìn lại" ghi tái lập và phê bình (ví dụ tư liệu lưu trữ của Milgram, phê bình thí nghiệm nhà tù Stanford), có ngày.

- **D3-L1** (8 trang: mục lục, Milgram, Asch, Darley–Latané, Zimbardo, Robbers Cave, Pygmalion, Khỉ đột vô hình): làm trọn vẹn, như D3-L1 của opus: chuyển, lượt 1, lượt 2, review, kiểm mẫu, khóa. Đo thời gian và token để chỉnh lời giao, ước tính các đợt sau.
- **D3-L2** (8 trang: Pavlov, Skinner, Little Albert, Seligman, Bandura, Harlow, Kẹo dẻo, Schachter–Singer): lượt 1 trên nhánh lô; rồi nhánh `moi/d3-gom`: lượt 2, review, kiểm mẫu, khóa.

**Xong khi:** 16 trang khóa; hồ sơ nghiên cứu của đợt có trang nhà; bộ truy vấn tìm kiếm của các trang này đạt.

## Đợt 4. Hiểu bằng chứng (D4-L1, D4-L2)

Chuẩn hóa 9 bài lệch khung theo khuôn 7 mục, mỗi bài có câu hỏi (việc G2 của site cũ), rồi kiểm định và khóa: khung trước, khóa sau, khỏi khóa hai lần. D4-L1 (mục lục và 6 bài), D4-L2 (6 bài), rồi nhánh gom.

**Xong khi:** 13 trang khóa; câu hỏi qua kiểm thử schema.

## Đợt 5. Nền tảng phần 1 (D5-L1 đến D5-L4)

27 bài đã kiểm ở G1-L01–L04 của site cũ (`../psyche-zero/plans/bao-cao/g1-l0*.md`): Trí nhớ, Trí tuệ, Tư duy, Chú ý–tri giác, Tính cách, Tâm lý xã hội, Cảm xúc–động lực.

- Lượt 1: nhập kết quả G1 vào hồ sơ (câu trích, nguồn, kết quả), không nghiên cứu lại phần đã KHỚP có câu trích; kiểm bổ sung phần làm ở "chế độ tiết kiệm" và mọi mục KHÔNG KIỂM ĐƯỢC (lấy toàn văn, viết lại ở mức tóm tắt xác nhận được, hay ghi "theo X kể lại"). Chuyển khẳng định thời sự sang dạng có mốc ("Tính đến 11/2026…"). Rút gọn phần kể lại nghiên cứu đã có trang nhà ở đợt 3.
- Lượt 2: độc lập, đủ, như mọi trang lõi.
- Bài mở rộng (phong cách học, Dunning–Kruger, MBTI…): lượt 2 kiểm mẫu, đặt `kiem_lai_truoc`.

**Xong khi:** 27 trang khóa (bài lõi) hay đặt hạn (bài mở rộng); không còn mục KHÔNG KIỂM ĐƯỢC chưa xử lý.

## Đợt 6. Nền tảng phần 2 (D6-L1 đến D6-L3)

20 bài chưa kiểm ở site cũ: Căng thẳng–giấc ngủ và Hạnh phúc (D6-L1, 7 bài), Cơ sở sinh học (D6-L2, 6 bài), Phát triển suốt đời (D6-L3, 7 bài). Lượt 1 đủ, lượt 2 đủ; mở rộng đặt hạn. Mỗi lô lượt 1 riêng, rồi nhánh gom.

**Xong khi:** 20 trang khóa hay đặt hạn.

## Đợt 7. Sức khỏe tâm thần (D7-L1)

4 bài (trầm cảm, lo âu, tìm giúp đỡ, trị liệu tâm lý). Rủi ro cao nhất cho người đọc, nên: lượt 1 và lượt 2 dùng Opus; nguồn bậc cao (hướng dẫn lâm sàng, tổng quan hệ thống, ICD-11, DSM-5-TR qua tài liệu chính thức); không viết điều gì như chẩn đoán; mỗi trang có lời dẫn tới Hỗ trợ ở đầu và cuối. Trang lên site với dải "chờ rà soát chuyên môn" chỉ khi chủ repo đồng ý; **khóa sau khi chuyên gia đọc** (người do chủ repo chọn, câu hỏi còn chờ).

**Xong khi:** 4 trang kiểm định xong; khóa khi có kết quả rà soát chuyên môn.

## Đợt 8. Công cụ, ngộ nhận, sách in, Thêm (D8-L1 đến D8-L4)

- **D8-L1, D8-L2** (11 công cụ và mục lục): chuyển 19 module JavaScript (4.398 dòng) sang `src/scripts/`, giữ khóa lưu `psyche-zero`; số liệu nghiên cứu trong mã (Stroop 1935, Rensink 1997, Segall 1966…) vào hồ sơ của trang; kiểm thử luồng của từng công cụ trên ba trình duyệt.
- **D8-L3** (Ngộ nhận, Bạn nghĩ gì về tâm trí?): 60 thẻ trong `ngo-nhan.yml` kiểm định hai lượt, khóa từng thẻ; trang Ngộ nhận và trò chơi sinh từ thẻ.
- **D8-L4** (Sách in, Tờ tóm tắt, Thêm): sách in và tờ tóm tắt sinh lúc build từ trang đã khóa; Giới thiệu, Dữ liệu của tôi, Nhật ký; Nghiên cứu mới và Cập nhật thành dòng cập nhật (mỗi mục có ngày, chỉ thêm); dùng khi mất mạng (service worker phạm vi `/psyche/`).

**Xong khi:** đủ 106 trang cũ trên site mới; 60 thẻ khóa; công cụ chạy trên ba trình duyệt.

## Đợt 9. Hoàn tất

- Máy canh hằng tuần (GitHub Actions): DOI bị rút hay đính chính (Crossref, Retraction Watch, OpenAlex), khẳng định thời sự và trang mở rộng tới hạn, link hỏng (như `links.yml` dùng lychee của site cũ); mở issue nêu đúng trang, đúng khẳng định. Hằng quý: Hỗ trợ, Nghiên cứu mới.
- Bảng đối chiếu chức năng với site cũ (không thiếu gì); Lighthouse và axe trên mọi trang một lần.
- Hỏi chủ repo có thêm dải chuyển hướng lên site cũ không (câu hỏi còn chờ). Mặc định: không động vào site cũ.

**Xong khi:** site mới không còn cần `../psyche-zero/` để build hay kiểm thử.

## Rủi ro

| Rủi ro | Cách giữ |
|---|---|
| Site mới thưa trong nhiều tuần | Site cũ vẫn chạy nguyên ở `/psyche-zero/`; trang chủ tạm dẫn về đó; lô nhỏ để site mới lớn đều |
| Sai sót nội dung về sức khỏe tâm thần | Đợt 7 riêng, Opus làm cả hai lượt, khóa sau chuyên gia; lời nhắc Hỗ trợ ở mọi trang |
| Kiểm định tốn hơn dự tính (bài dài, nhiều số liệu) | D3-L1 làm trọn vẹn để đo; model theo phần việc; lượt 2 chia phần khi quá 150 nhận định; mẫu lời giao ở `loi-giao/` |
| Chạm giới hạn sử dụng giữa chừng (đợt 2 của opus gặp hai lần) | Tối đa 2–3 agent nặng; việc nặng bắt đầu đầu khung giới hạn; agent dừng thì gửi tin cho chính nó làm tiếp |
| Agent sửa nhầm site cũ qua `../psyche-zero/` | Luật 2; kiểm `git -C ../psyche-zero status --short` mỗi review đợt |
| Hai bản song song lâu ngày, người đọc bối rối | Trang chủ tạm và trang 404 nói rõ; đợt 9 chủ repo quyết dải chuyển hướng |
| Astro hay Starlight đổi API | Ghim phiên bản; nâng mỗi tháng trên nhánh riêng, cùng lúc với opus; ít ghi đè thành phần |
| Crossref, OpenAlex, PubMed chặn máy ảo | Gọi từ máy bạn hay GitHub Actions; cách vòng ghi ở `../ben-vung/chuan-kiem-dinh.md` mục 3 |

## Quy trình mỗi lô

1. Bạn giao lô bằng `loi-giao/lo.md`, chọn model theo bảng ở `loi-giao/README.md`.
2. Agent chuyển trang bằng `tools/chuyen/`, kiểm định lượt 1, ghi hồ sơ (chưa khóa). Câu về chính site ghi loại `ve-site`, có ghi chú đã kiểm ở đâu.
3. Agent khác kiểm định lượt 2 độc lập (`loi-giao/luot-2-trang.md`), mức theo tầng của trang. Danh sách do `node tools/khoa.mjs xuat` tách; kết quả vào hồ sơ bằng `node tools/khoa.mjs nhap`.
4. Người gộp push nhánh lô; `test.yml` chạy trên bản xem (build, kiểm thử, ba trình duyệt, Lighthouse, ảnh chụp), song song. Phải đạt trước khi gộp.
5. Review báo cáo, hồ sơ và ảnh chụp: chỗ hai lượt lệch nhau, mọi chỗ sửa, câu về chính site, nhãn mức độ chắc chắn có `co_so`. Phần mã review theo "Ba mức review".
6. Bạn đọc tóm tắt hồ sơ và xem ngẫu nhiên khoảng 5 nhận định (`node tools/khoa.mjs xuat <lô> --mau 5`); agent khóa; bạn gộp vào `main` và push. Trang của lô lên site thật.

Các lô làm lần lượt; chỉ chồng phần việc nhẹ (chờ CI, chờ bạn kiểm mẫu) với việc của lô sau. Cuối mỗi đợt, người review xét cả đợt theo "Xong khi" và cập nhật bảng Tiến độ.

## Lời giao việc mẫu

Ở `loi-giao/`: `lo.md` (một lô), `luot-1-trang.md` (agent làm lô giao cho agent con), `luot-2-trang.md`, `luot-1-du-lieu.md`, `luot-2-du-lieu.md` (việc dữ liệu như D2-0), `review-ma.md`. Chỉ đổi phần trong `<>`. Lô sau thấy thiếu thì sửa file ở đó, đừng soạn lời mới.

**Một việc của đợt 1:**

> Bạn làm việc **D1.<số>** trong `plans/lam-lai/README.md` của repo psyche (thư mục hiện tại), trên nhánh `moi/d1-<số>-<tên ngắn>` tạo từ `main`. Đọc `AGENTS.md`, `plans/lam-lai/README.md` (Quyết định, Bảy luật, Quy tắc chung, Đợt 1), `plans/lam-lai/cong-nghe.md`, báo cáo của việc trước. Mã dùng chung có sẵn ở `../opus/` (chỉ đọc): chép rồi sửa cho Psyche khi hợp. `../psyche-zero/` chỉ đọc. Khi xong: `npm run build`, `npm test` đạt; kiểm thử trình duyệt liên quan đạt; commit; viết `plans/lam-lai/bao-cao/d1-<số>.md`. Không push.

**Review một lô (nội dung):**

> Bạn review lô **D<đợt>-L<lô>** của repo psyche, nhánh `moi/d<đợt>-l<lô>`. Đọc mục "Review những gì" dưới đây, `plans/ben-vung/chuan-kiem-dinh.md`, báo cáo của lô và hồ sơ trong `kiem-dinh/` của các trang trong lô. Kiểm lại mọi nhận định hai lượt cho kết quả khác nhau, mọi chỗ đã sửa (mở đúng nguồn ghi trong hồ sơ), mọi nhãn mức độ chắc chắn (có `co_so` đạt thước đo), mọi câu `ve-site` (ghi `review: dung` hay `sai`). Không chạy lại toàn bộ kiểm thử. Ghi vào cuối báo cáo, mục "Review": chỗ phải sửa (file, dòng, lý do, nguồn), chỗ nên sửa, kết luận gộp được hay chưa. Không sửa trang. Không push.

## Review những gì

- **Mỗi lô:** phạm vi file; nhãn loại nhận định đúng (câu `ve-site` chỉ nói về site); hồ sơ đủ; nhãn mức độ chắc chắn có `co_so`; khẳng định thời sự có mốc và hạn; nghiên cứu có trang nhà ở nơi khác thì trang này chỉ tóm một câu; mọi chỗ hai lượt lệch nhau và mọi chỗ đã sửa; trang dựng đúng trên ảnh chụp; thành phần mới có kiểm thử; `git -C ../psyche-zero status --short` không có gì do agent tạo.
- **Đợt 1:** chạy lại build và kiểm thử; đọc schema, plugin, script chuyển; so chữ ba trang thử với site cũ; thử dữ liệu hỏng; bản thật không có trang chưa khóa; link "sắp có" và trang 404; đo Lighthouse.
- **Cuối mỗi đợt:** tiêu chí "Xong khi"; số trang đã khóa khớp `anh-xa.md`; site thật hiện đúng phần đã khóa, không link chết.
