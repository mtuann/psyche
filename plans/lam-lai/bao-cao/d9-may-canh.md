# Đợt 9: máy canh hằng tuần (them/may-canh, 17/11/2026)

Model: Claude Opus 5.5 (một agent, không dùng agent con). Mức review: lớn (workflow mới, công cụ đọc hồ sơ và khóa); chưa có review.

## Việc đã làm

Máy canh theo `plans/ben-vung/README.md` mục 4.7 và kế hoạch đợt 9: chạy mỗi thứ Hai trên GitHub Actions, mở issue nêu đúng trang, đúng nhận định. Không chặn deploy, không đăng gì, không sửa trang hay hồ sơ.

| Nhãn issue | Việc | Cách |
|---|---|---|
| `rut-bai` | DOI bị rút, bày tỏ quan ngại, đính chính, có bản mới | `tools/may-canh.mjs rut-bai`: mọi DOI ở `src/data/nguon.yml` cộng link doi.org trong danh sách `nguon` của hồ sơ `kiem-dinh/**` (765 DOI). Hỏi Crossref 40 DOI mỗi lần: `/works?filter=doi:…,doi:…&select=DOI,updated-by`. Trường `updated-by` gồm thông báo của nhà xuất bản và của Retraction Watch (`source: retraction-watch`). DOI không có trong kết quả lô thì hỏi riêng `/works/<doi>` (404: "không có ở Crossref") |
| `thoi-su` | Khẳng định thời sự tới hạn | `thoi-su`: nhận định `loai: thoi-su` (trừ `da-bo`) của mục đã khóa (trang, bản ghi; khóa từng phần thì chỉ nhận định về trường đã khóa), `het_han` đã qua hay còn dưới 30 ngày |
| `kiem-lai` | Trang tới hạn xem lại | `kiem-lai`: `kiem_lai_truoc` ở `trang.yml`. Hạn là ngày 1 của tháng ghi ("xem lại trước 11/2027"), báo trước 30 ngày |
| `link-hong` | Link hỏng | lychee trên `src/content/docs/**/*.md` và `src/data/*.yml` (như `kiem-link.yml` của opus). Bỏ qua chính site và repo. Mã thoát 2 thì mở issue; 1 hay 3 làm hỏng job |

- **Một issue mỗi nhãn:** có việc thì mở issue, hay cập nhật issue đang mở (`peter-evans/create-issue-from-file@v6`, `issue-number`). Hết việc thì `gh issue close` kèm lời ghi. Cách làm như `ra-lai.yml` của opus.
- **Lỗi mạng không thành "bị rút":** gọi lỗi thì thử lại tới 4 lần (lỗi mạng, 429, 5xx; theo `Retry-After`, không thì chờ 2, 4, 8 giây). Mỗi lần gọi nghỉ 1 giây. DOI vẫn không hỏi được thì ghi riêng vào issue. Không có phát hiện mà có DOI lỗi mạng thì thoát mã 3: job hỏng, issue giữ nguyên, không đóng nhầm.
- **Mạng:** chỉ gửi User-Agent `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`, không email, không `mailto`. Kiểm thử kiểm điều này.
- **OpenAlex** (`is_retracted`, chỉ là tín hiệu) chỉ chạy khi có secret `OPENALEX_API_KEY`. Lý do: OpenAlex nay trả 429 cho mọi yêu cầu không có khóa ("Insufficient budget… Use your own key"). Muốn xin khóa thì phải gửi email, nên chủ repo tự quyết.
- **Đã xét:** `tools/may-canh-da-xet.yml` (danh sách `doi`, `thong_bao`, `ngay`, `ket_luan`; hiện trống) giữ các thông báo đã xét, để máy canh không báo lại; thông báo mới của cùng DOI vẫn được báo. Nguồn có `rut_bai` ở `nguon.yml` thì thông báo rút của nó coi như đã xét. Script kiểm file này, sai thì thoát 2.
- **Cách xử lý ghi trong issue:** theo `plans/ben-vung/them-noi-dung.md` mục 7. Issue `thoi-su` nhắc thêm rằng `khoa.mjs khoa` từ chối khẳng định đã tới hạn.
- **Hằng quý:** `ho-tro-quarterly.yml` (giữ tên file như site cũ, đổi tên workflow) thêm job `nghien-cuu-moi`. Job mở issue nhắc tìm tin Nghiên cứu mới (kèm ngày của tin mới nhất, đọc từ trang) và nhắc xử lý các issue của máy canh.
- **Cờ dòng lệnh:** `--ngay 2027-06-01` chạy thử theo ngày; `--truoc N` đổi ngưỡng báo trước; `--khong-mang` không gọi mạng; `--luu`, `--tu` lưu kết quả Crossref ra JSON hay đọc lại từ đó; `--ra issue.md` ghi nội dung issue; `tat-ca` chạy cả ba việc.

- **Sửa sau review (17/11/2026):**
  - Script sập (YAML hỏng, lỗi chưa bắt, promise bị từ chối) thì thoát 2, không còn 1. Workflow thêm phòng hờ: mã 1 mà không có `issue.md` thì làm hỏng job.
  - `ho-tro-quarterly.yml` thêm `contents: read`.
  - Ngày phải là ngày có thật (đi một vòng qua `Date` vẫn ra đúng chuỗi).
  - `het_han` thiếu hay sai dạng không còn bị bỏ qua: vào issue `thoi-su` thành nhóm "ngày hạn sai", xếp đầu. Hiện không có câu nào như vậy.
  - Biến `PSYCHE_MAY_CANH_GOC` trỏ dữ liệu sang bản chép khác, dùng cho kiểm thử.
  - Đã kiểm `peter-evans/create-issue-from-file@v6` và `lycheeverse/lychee-action@v2`: hai tag có thật (bản mới nhất v6.0.0, v2.9.0).

## File đã chạm

- Mới: `tools/may-canh.mjs`, `tools/may-canh-da-xet.yml`, `tests/may-canh.test.mjs`, `.github/workflows/may-canh.yml`, báo cáo này.
- Sửa: `.github/workflows/ho-tro-quarterly.yml` (job `nghien-cuu-moi`), `AGENTS.md` (mục "CI và đăng site", một đoạn), `plans/lam-lai/cong-nghe.md` (mục 8, một đoạn).
- Chép rồi sửa từ `../opus/tools/ra-lai.mjs`, `../opus/.github/workflows/ra-lai.yml`, `kiem-link.yml`; nguồn ghi ở đầu file. `../opus`, `../psyche-zero` không bị chạm.

## Kiểm thử

- `tests/may-canh.test.mjs`, 15 phép thử (thêm: ngày có thật, `het_han` sai, script sập thoát 2), không gọi mạng (dùng repo mẫu trong thư mục tạm và fetch giả):
  - ngày; chuẩn hóa DOI;
  - trạng thái khóa (cả bản ghi, từng phần);
  - thời sự (chỉ mục đã khóa, phần đã khóa, bỏ `da-bo`, ngưỡng);
  - kiểm lại;
  - bảng DOI → trang, nhận định, thẻ ngộ nhận, hồ sơ nghiên cứu;
  - nhóm thông báo, gộp nguồn, đã xét, `rut_bai`;
  - nội dung issue;
  - thử lại khi lỗi mạng, 429, 5xx;
  - lô Crossref có DOI thiếu và lô lỗi mạng (DOI lỗi không thành phát hiện);
  - chạy script trên repo thật với `--khong-mang` và `--ngay`.
- `npm run build:xem && npm test`: 150 phép thử, 149 đạt, 1 bỏ qua (phép thử cần site cũ), 0 hỏng.
- Workflow đã đọc lại bằng YAML parser. Đoạn script của job quý đã chạy thử ở máy, thay `gh` bằng `echo`. Các workflow chưa chạy trên GitHub (nhánh chưa push), nên chưa có actionlint.

## Kết quả lần chạy thật (17/11/2026, máy chủ repo)

**Rút bài:** 765 DOI, 20 lần gọi Crossref, khoảng 27 giây. Hỏi được 763 DOI, 0 lỗi mạng.

- **Không có DOI nào bị rút hay bị bày tỏ quan ngại**, kể cả theo dữ liệu Retraction Watch.
- Trước đó đã thử cách gọi trên một bài đã biết bị rút: Stapel & Lindenberg 2011, `10.1126/science.1201068`. Script nhận đúng thông báo rút `retraction-watch` (2/12/2011).
- **18 DOI có đính chính và 1 DOI có bản mới** (chưa xét; lần chạy đầu trên GitHub sẽ mở issue `rut-bai` liệt kê đủ nhận định):

| DOI | Nguồn | Thông báo | Dùng ở |
|---|---|---|---|
| 10.1038/s41562-023-01554-4 | ciria2023 | correction **2/9/2026** | `kham-pha/co-so-sinh-hoc/the-duc-nao` (6 nhận định). **Đính chính mới, đáng xem trước** |
| 10.1002/14651858.cd004687.pub3 | abbass2006 (Cochrane) | **bản mới** pub4 (2014) | hồ sơ `kham-pha/suc-khoe-tam-than/tri-lieu-tam-ly`: site dẫn bản cũ của tổng quan Cochrane |
| 10.1037/h0046234 | schachter1962 | correction 2006 | `thi-nghiem/schachter-singer` (41) |
| 10.1177/1529100619832930 | barrett2019 | correction 2019 | `kham-pha/cam-xuc-dong-luc/cam-xuc-co-ban` (22), thẻ `cam-xuc-bam-sinh`, `nhin-mat-biet-cam-xuc` |
| 10.1038/nrn3475 | button2013 | erratum 2013 | `bang-chung/co-mau-suc-manh` (16) |
| 10.1037/0033-2909.101.2.171 | flynn1987 | correction 2008 | `kham-pha/tri-tue/hieu-ung-flynn` (13), `tri-tue-la-gi` (2) |
| 10.3758/s13414-017-1408-4 | wiradhany2017 | correction 2017 | `kham-pha/chu-y-tri-giac/da-nhiem-so` (10) |
| 10.1037/0012-1649.41.4.625 | gardner2005 | correction 2012 | `kham-pha/co-so-sinh-hoc/nao-tuoi-teen` (8) |
| 10.1038/358749a0 | wynn1992 | hai correction 1992, 1993 | `kham-pha/phat-trien/tre-hoc-the-nao` (7) |
| 10.1007/s10608-012-9476-1 | hofmann2012 | correction 2014 | `kham-pha/suc-khoe-tam-than/tri-lieu-tam-ly` (6) |
| 10.1177/2515245919847202 | funder2019 | correction 2020 | `bang-chung/do-lon-hieu-ung` (6) |
| 10.3102/0034654316689306 | adesope2017 | correction 2017 | `kham-pha/tri-nho/duong-cong-quen` (4), `vi-sao-ta-quen` (1) |
| 10.1371/journal.pbio.2000797 | szucs2017 | correction 2021 | `bang-chung/co-mau-suc-manh` (4) |
| 10.1177/0956797614535810 | macnamara2014 | correction 2018 | thẻ `muoi-nghin-gio` (3) |
| 10.1016/j.cub.2018.12.038 | zust2019 | erratum 2019 | `kham-pha/cang-thang-giac-ngu/ngu-va-tri-nho` (2) |
| 10.1037/1093-4510.4.3.228 | burton2001 | correction 2006 | `ao-giac-thi-giac` (2), `trai-nghiem/ebbinghaus` (1) |
| 10.1037/a0035618 | kowalski2014 | correction 2014 | `kham-pha/phat-trien/tam-ly-hoc-duong` (2) |
| 10.1037/bul0000015 | johnsen2015 | correction 2016 | `tri-lieu-tam-ly` (1) |
| 10.1037/pspp0000096 | soto2017 | correction 2017 | chỉ có bản ghi ở `nguon.yml` |

- Phần lớn là đính chính cũ, có lẽ chỉ sửa lỗi in hay tên tác giả. Mỗi đính chính cần một người đọc rồi ghi vào `tools/may-canh-da-xet.yml`. Lần này chưa ai đọc chúng, cũng chưa sửa gì.
- Hai DOI không có ở Crossref:
  - `10.36131/cnfioritieditore20260106`: DOI của mEDRA, máy canh không xét được.
  - `10.2307/1127007`: doi.org trả 404. Đây là link của nguồn `erikson1968` (một cuốn sách) trong hồ sơ `kham-pha/phat-trien/ban-sac-tuoi-teen.yml`. DOI sai, chỉ nằm ở hồ sơ, không có trên trang.

**Thời sự:** hôm nay không có khẳng định nào tới hạn. Các mục đã khóa có 152 khẳng định thời sự. Hạn gần nhất:

| Hạn | Số khẳng định | Mục |
|---|---|---|
| 30/1/2027 | 33 | `ho-tro/index` |
| 1/3/2027 | 2 | `trai-nghiem/neo-gia` |
| 1/5/2027 | 1 | `kham-pha/suc-khoe-tam-than/tim-giup-do` |

Issue `thoi-su` đầu tiên sẽ mở khoảng 31/12/2026.

**Kiểm lại:** hôm nay không có trang nào tới hạn. Có 12 trang có hạn xem lại. Sớm nhất là `kham-pha/phat-trien/mang-xa-hoi-teen` (trước 5/2027, máy canh báo từ 1/4/2027), rồi 3 trang hạn 11/2027.

**Link (lychee 0.24.2 ở máy, cùng tham số như workflow):**

| | Số link |
|---|---|
| Tổng | 1734 |
| Không trùng | 924 |
| Lỗi | 9 |
| Hết giờ | 1 |

Các lỗi:

- `kham-pha/co-so-sinh-hoc/the-duc-nao`: `https://doi.org/10.1055/s-0037-1613072` (Fujimura 2002). DOI còn, nhưng trang của nhà xuất bản Thieme mà nó trỏ tới trả 404.
- `kham-pha/cang-thang-giac-ngu/stress-co-hai`: `https://openstax.org/books/psychology-2e/` trả 404 (link sách thiếu trang mục).
- `ho-tro/index`: `binhphuoc.gov.vn/…/luat24.pdf` có lỗi chứng chỉ TLS sai tên miền.
- `trai-nghiem/big-five-mini`: 5 link `ipip.ori.org` bị ngắt kết nối. Có thể máy chủ ấy chặn, cần xem lại trên GitHub.
- `kham-pha/cang-thang-giac-ngu/giac-mo`: gutenberg.org trả 503 (giới hạn tần suất, tạm thời).
- Hết giờ: `mpi.gov.vn` trong `nguon.yml`.

Ở máy này, lychee thoát mã 2, nên workflow sẽ mở issue `link-hong`.

## Chỗ chưa chắc

- `updated-by` của Crossref là đường chính. Retraction Watch nằm trong Crossref (đã thấy `source: retraction-watch`). Nhưng thông báo nhà xuất bản không đăng ký với Crossref, và Retraction Watch chưa thu thập, thì không thấy được. OpenAlex chỉ chạy khi có khóa.
- Lô 40 DOI dùng `filter=doi:a,doi:b`. Một DOI có dấu phẩy sẽ làm hỏng bộ lọc; hiện không có DOI nào như vậy. Lô bị 400 thì script hỏi từng DOI.
- Bảng DOI → nhận định dựa trên link doi.org trong `nguon` của hồ sơ, cộng nguồn trùng id với bản ghi có DOI. Hồ sơ dẫn bài qua link PMC mà id khác quy ước thì sẽ sót.
- Cách đọc `kiem_lai_truoc` là "trước ngày 1 của tháng", để khớp chữ "xem lại trước 11/2027" trên trang. Nếu chủ repo hiểu là "trong tháng ấy" thì hạn lùi một tháng.
- Lychee trên GitHub có thể khác ở máy (ipip.ori.org, gutenberg). Có thể cần thêm `--exclude` sau lần chạy đầu.
- Nhãn issue (`rut-bai`, `thoi-su`, `kiem-lai`, `link-hong`) tự tạo khi `create-issue-from-file` mở issue đầu tiên (như opus). Issue quý không gắn nhãn (như job Hỗ trợ cũ), vì `gh issue create --label` hỏng khi nhãn chưa có.
- Workflow chưa chạy trên GitHub. Sau khi gộp, nên bấm chạy tay một lần (tab Actions, "Máy canh hằng tuần").
