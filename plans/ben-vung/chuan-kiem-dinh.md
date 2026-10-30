# Chuẩn kiểm định và khóa nội dung

Tài liệu này định nghĩa thế nào là một trang "đã kiểm định", hồ sơ ghi gì, và cách khóa để trang không phải đọc lại. Áp dụng cho mọi trang lên site mới (`../lam-lai/README.md`, luật 1) và cho mọi nội dung thêm sau này (`them-noi-dung.md`). Khung lấy từ `../opus/plans/ben-vung/chuan-kiem-dinh.md`; loại nhận định, thứ bậc nguồn và thước đo nhãn viết riêng cho tâm lý học, theo kinh nghiệm G1-L01–L04 của site cũ (607 khẳng định, 1/6 sai hay đáng ngờ).

## 1. Nhận định

Nhận định là mọi câu có thể đúng hoặc sai: trong thân bài, bảng, khung nhãn, câu hỏi và lời giải thích, chú thích, chữ của hình, thông số của công cụ. Mỗi nhận định một dòng trong hồ sơ.

Ví dụ trong bảng và trong mục 6 chỉ minh họa loại câu và định dạng; chúng chưa phải nội dung đã kiểm định.

| Loại (`loai`) | Ví dụ | Theo thời gian | Nguồn cần có |
|---|---|---|---|
| `phat-hien` | "Trong các thí nghiệm của Asch, khoảng ba phần tư người tham gia chiều theo nhóm ít nhất một lần." | lịch sử: khóa vĩnh viễn | bài gốc |
| `so-lieu` | cỡ mẫu, tỉ lệ, hệ số tương quan, độ lớn hiệu ứng, số lần tái lập | lịch sử (số của một nghiên cứu) hay nhận định (ước lượng tổng hợp) | bài gốc; phân tích tổng hợp |
| `lich-su` | người, năm, nơi, bối cảnh, ai đề xuất khái niệm, ai bị phê bình vì gì | lịch sử | bài gốc, tài liệu lưu trữ, nghiên cứu lịch sử tâm lý học |
| `dinh-nghia` | "Bất hòa nhận thức là cảm giác khó chịu khi…" | nhận định, ít đổi | APA Dictionary of Psychology, giáo trình mở, bài gốc của khái niệm |
| `nhan` | khung nhãn mức độ chắc chắn và câu kết luận về tình trạng bằng chứng | nhận định: xem lại khi có sự kiện | phân tích tổng hợp, tổng quan hệ thống, tái lập lớn; đạt thước đo ở mục 4 |
| `tai-lap` | "Năm 2024, một đợt tái lập ở 39 phòng thí nghiệm không thấy hiệu ứng…" | lịch sử (sự kiện đã xảy ra) | bài tái lập, báo cáo có đăng ký trước |
| `lam-sang` | triệu chứng, tiêu chí, tỉ lệ mắc, hiệu quả điều trị, khi nào cần giúp đỡ | nhận định | ICD-11, hướng dẫn lâm sàng (WHO, NICE), tổng quan hệ thống; mục 5 |
| `loi-khuyen` | "Ôn rải rác giúp nhớ lâu hơn học dồn." | nhận định | như loại của điều được khuyên; không có loại lời khuyên miễn nguồn |
| `cong-cu` | thông số của công cụ: số lượt, cách tính điểm, thang đo, chuẩn so sánh | lịch sử | bài gốc của thang đo, của thí nghiệm |
| `thoi-su` | số liệu mới nhất, xếp hạng, "chưa tìm thấy nghiên cứu ở Việt Nam", số điện thoại, giá, ứng dụng | thời sự: viết kèm mốc, có `het_han` | nguồn hiện hành, trang chính thức |
| `ve-site` | câu về chính site: "xem trang Asch", "site chia 14 lĩnh vực", số câu hỏi của một bài thử | | không; review kiểm thẳng trên trang và dữ liệu, ghi `review: dung` hay `sai`; không qua lượt 2 |

- Câu viết chung chung đến mức không kiểm được ("điều này rất thú vị") thì viết lại cho cụ thể hoặc bỏ.
- **Khác opus:** không có loại lời khuyên được miễn nguồn. Lời khuyên về học tập, giấc ngủ, căng thẳng, cảm xúc đều là khẳng định về bằng chứng, nên đi đủ hai lượt.
- Câu vừa nói về site vừa có điều cần nguồn thì tách đôi.
- Lời giải thích của câu hỏi không được dựa vào vị trí lựa chọn ("đáp án thứ hai"): thứ tự lựa chọn trộn mỗi lần.
- Ví dụ giả định (một tình huống minh họa, phương án nhiễu của câu hỏi) không phải nhận định, nhưng không được trái với nhận định nào của trang; ghi `gia-dinh` ở `ghi_chu` của hồ sơ khi dễ nhầm.

## 2. Thứ bậc nguồn

1. **Bậc 1, nguồn gốc:** bài báo có bình duyệt của chính nghiên cứu được kể (thiết kế, mẫu, kết quả); báo cáo tái lập; bài gốc của thang đo; tài liệu lưu trữ và nghiên cứu lịch sử có bình duyệt (cho câu `lich-su`). Đọc toàn văn khi mở được; chỉ đọc được tóm tắt thì ghi `toan_van: false` và chỉ dùng cho điều tóm tắt có nói.
2. **Bậc 2, tổng hợp và chuẩn:** phân tích tổng hợp, tổng quan hệ thống (Cochrane, *Psychological Bulletin*, *Annual Review of Psychology*); tái lập lớn có đăng ký trước (Many Labs, Registered Replication Reports); ICD-11, DSM-5-TR (tài liệu chính thức của APA), hướng dẫn lâm sàng (WHO, NICE); APA Dictionary of Psychology; giáo trình mở có bình duyệt (OpenStax *Psychology 2e*, Noba), dẫn đúng chương; sách chuyên khảo của nhà xuất bản học thuật.
3. **Bậc 3, phổ thông:** Wikipedia, báo, blog, sách đại chúng, video. Chỉ để tìm nguồn bậc 1–2; không dùng làm nguồn duy nhất cho nhận định nào.

- Câu nói nghiên cứu X đã làm và đã thấy gì: bậc 1. Không mở được bài gốc thì viết "theo <tác giả bậc 2> kể lại" và dẫn nguồn bậc 2 đã kiểm.
- Câu về tình trạng bằng chứng hiện nay (nhãn, "đa số nghiên cứu cho thấy"): bậc 2, cộng các tái lập bậc 1 liên quan.
- Hai nguồn tốt mâu thuẫn nhau: ghi cả hai vào hồ sơ; trên trang viết theo bằng chứng mạnh hơn (tổng hợp lớn hơn, có đăng ký trước, mới hơn) hay nói rõ là còn tranh cãi; ghi lý do. Đây là chỗ khó: lượt 2 dùng Opus.
- Sách in mà agent không đọc được chỉ là nguồn phụ: nhận định ấy phải có thêm một nguồn bậc 1–2 đọc được.

### Nguồn và cách mở

Thấy cách mới thì thêm vào đây, để lô sau khỏi mò lại.

| Nguồn | Cách đọc được |
|---|---|
| Crossref (siêu dữ liệu DOI) | `https://api.crossref.org/works/<DOI>`. Máy ảo của Cowork bị chặn (ngày 23/10/2026): gọi từ máy chủ repo hay GitHub Actions. User-Agent: `psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)`, không ghi email |
| doi.org | `https://doi.org/<DOI>` chuyển tới trang nhà xuất bản; nhiều nhà xuất bản chặn bot: dùng PubMed Central, Europe PMC, bản tác giả |
| PubMed, PubMed Central | Trang web chặn bot: đọc bản ghi qua NCBI E-utilities (`eutils.ncbi.nlm.nih.gov`), toàn văn mở qua PMC; dẫn link PubMed hay PMC |
| Europe PMC | API REST (`ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:<DOI>`) cho tóm tắt và link toàn văn mở |
| OSF, PsyArXiv | Bản đăng ký trước, dữ liệu, bản thảo của các đợt tái lập; ghi rõ là bản thảo nếu chưa bình duyệt |
| Classics in the History of Psychology | `psychclassics.yorku.ca`: toàn văn nhiều bài kinh điển đã hết bản quyền |
| Internet Archive | Sách cũ (ví dụ bản dịch Ebbinghaus 1885): ghi lần in và số trang |
| ICD-11 | Bản trực tuyến của WHO (`icd.who.int`), dẫn mã và tên mục |
| APA Dictionary of Psychology | `dictionary.apa.org`, dẫn mục từ |
| OpenStax *Psychology 2e* | `openstax.org/books/psychology-2e/`, dẫn đúng mục |
| Retraction Watch | Bộ dữ liệu do Crossref phát hành mở; thông báo rút bài trên trang nhà xuất bản là nguồn chính |
| Việt Nam | Trang chính thức của cơ quan nhà nước, WHO và UNICEF tại Việt Nam, tạp chí khoa học trong nước có bình duyệt; báo chính thức chỉ khi không có nguồn tốt hơn, ghi rõ loại nguồn. Số liên hệ của Hỗ trợ: kiểm trên trang của chính đơn vị |

- Hết lượt của công cụ tìm kiếm thì tìm tạm qua `https://html.duckduckgo.com/html/?q=<từ khóa>`; vẫn chỉ ghi vào hồ sơ trang đã mở, không ghi trang kết quả tìm kiếm.
- Bản tóm tắt của công cụ đọc web có khi sai hay thiếu. Con số, chiều của kết quả, tên điều kiện thí nghiệm thì đọc chữ thật của bài (bảng, mục Kết quả).
- **Không đưa email hay thông tin cá nhân của chủ repo vào yêu cầu gửi ra ngoài.**

## 3. Kiểm định: mức theo tầng

Mức kiểm theo tầng của trang (`tang` trong `src/data/trang.yml`):

| Tầng | Mức | Lượt 1 | Lượt 2 | Thêm |
|---|---|---|---|---|
| Nền tảng (`loi`); dữ liệu dùng chung; thẻ ngộ nhận | V3 | agent làm lô, mọi nhận định có nguồn và câu trích | agent khác, độc lập, mọi nhận định trừ `ve-site` | review kiểm câu `ve-site`, nhãn, chỗ lệch |
| Mở rộng (`mo-rong`) | V2 trở lên | như lõi | agent khác kiểm mẫu: khoảng 8 nhận định mỗi trang, script chọn ngẫu nhiên, cộng mọi nhận định loại `nhan` và `lam-sang`; mẫu có câu sai thì kiểm hết | `kiem_lai_truoc` 12–18 tháng |
| Công cụ (`cong-cu`) | V3 cho số liệu | thông số và số liệu nghiên cứu trong mã vào hồ sơ | như lõi | kiểm thử luồng của công cụ |
| Có hạn (`co-han`, ví dụ Hỗ trợ) | V3 | như lõi | như lõi | hồ sơ ghi ngày kiểm; hết hạn thì kiểm lại |
| Dòng cập nhật (`cap-nhat`), bổ sung | V3 cho mục mới | như lõi, chỉ mục mới | như lõi, chỉ mục mới | mỗi mục một ngày, chỉ thêm |
| Khung (`khung`), trang sinh (`du-lieu`) | | danh sách và con số sinh từ dữ liệu đã khóa, kiểm thử tự động; chữ viết tay (lời giới thiệu) kiểm như lõi | | hồ sơ có thể không có nhận định, kèm `ghi_chu` |

**Mức kiểm chứng:**

- **V1:** siêu dữ liệu (DOI, tác giả, năm, tên bài, nơi đăng) khớp Crossref hay nhà xuất bản. Site cũ đã xong cho 363 DOI; D2-0 khóa lại ở site mới.
- **V2:** con số và kết luận then chốt khớp tóm tắt hay nguồn bậc 2 đáng tin.
- **V3:** mọi khẳng định khớp nguồn gốc, ưu tiên toàn văn; mọi mục "không kiểm được" được xử lý dứt điểm một lần: lấy toàn văn, viết lại ở mức tóm tắt xác nhận được, hay ghi rõ "theo X kể lại" kèm nguồn bậc 2 đã kiểm. Không có "chế độ tiết kiệm" cho trang lõi.

**Các bước:**

1. **Lượt 1 (agent A):** tách trang thành danh sách nhận định; kiểm từng mục; ghi nguồn, câu trích, vị trí, kết quả vào hồ sơ; sửa trang nếu sai (mỗi chỗ sửa có nguồn). Lời giao: `../lam-lai/loi-giao/lo.md`, `luot-1-trang.md`.
2. **Lượt 2 (agent B, độc lập):** nhận danh sách do `node tools/khoa.mjs xuat` tách ra (bỏ câu `ve-site`; trang mở rộng chỉ mẫu), không kèm nguồn và kết luận của lượt 1; không dùng chung trang nguồn đã tải; tự tìm nguồn và cho kết quả (`dung`, `sai`, `qua-manh`, `khong-chac`). Sonnet cho việc đối chiếu; Opus cho chỗ khó. Lời giao: `luot-2-trang.md`.
3. **Review** (mặc định Claude; không phải người đã làm lượt 1 hay lượt 2): mọi nhận định hai lượt cho kết quả khác nhau, mọi chỗ đã sửa, mọi nhãn (có `co_so` đạt mục 4), mọi câu `ve-site`. **Soát loại:** câu `ve-site` thật sự chỉ nói về site; khẳng định thời sự có mốc và hạn. Loại sai thì đổi và đưa câu ấy vào lượt 2 (`node tools/khoa.mjs xuat … --con-lai`).
4. **Chủ repo kiểm mẫu:** đọc bản tóm tắt hồ sơ trong báo cáo của lô, xem ngẫu nhiên khoảng 5 nhận định mỗi lô (`node tools/khoa.mjs xuat <lô> --mau 5`), ghi kết quả vào hồ sơ. Mẫu sai thì kiểm lại cả lô.

Trang được khóa khi mọi nhận định có kết quả `dung`, `da-sua`, `da-lam-mem` hoặc `da-bo`, đã qua đủ lượt theo tầng, không còn chỗ hai lượt khác nhau chưa giải quyết, mọi khung nhãn có `co_so`, khẳng định thời sự có `het_han`, và phần kể lại nghiên cứu đã có trang nhà ở nơi khác đã rút gọn.

## 4. Thước đo nhãn

Bốn nhãn của site, từ trang "Cách đọc nhãn". Mỗi khung nhãn là một nhận định loại `nhan`, có `co_so` trong hồ sơ: các nguồn làm căn cứ và vì sao đạt mức ấy.

| Nhãn | Điều kiện |
|---|---|
| **Vững chắc** | Có ít nhất một phân tích tổng hợp hay tổng quan hệ thống chất lượng tốt, hoặc từ hai lần tái lập lớn có đăng ký trước, cùng chiều; không có thất bại tái lập lớn chưa được giải thích; đúng ở nhiều quần thể |
| **Khá vững** | Nhiều nghiên cứu cùng chiều nhưng còn giới hạn: chưa có tái lập lớn, mẫu chủ yếu phương Tây, kết quả giữa các nghiên cứu khác nhau nhiều, nghi thiên lệch xuất bản |
| **Đang tranh cãi** | Bằng chứng chất lượng cao mâu thuẫn nhau; hoặc một tái lập lớn có đăng ký trước thất bại; hoặc hiệu ứng nhỏ hơn nhiều so với tuyên bố ban đầu |
| **Đã bị bác bỏ** | Các kiểm tra đủ mạnh liên tục thất bại; hoặc bằng chứng gốc không còn giá trị (rút bài, gian lận, lỗi phân tích) |

- Nhãn nói về một khẳng định cụ thể, không về cả chủ đề: một bài có thể có khung "vững chắc" cho hiệu ứng chính và khung "đang tranh cãi" cho cách giải thích.
- Đổi nhãn của trang đã khóa là mở khóa (mục 8), trừ khi bổ sung có `anh_huong_nhan: true` đưa trang vào hàng đợi tái lập mốc (`them-noi-dung.md`).

## 5. Riêng trang Sức khỏe tâm thần

- Lượt 1 và lượt 2 dùng Opus. Nguồn bậc 2 về lâm sàng (ICD-11, hướng dẫn WHO, NICE, tổng quan hệ thống); tỉ lệ mắc ở Việt Nam theo nghiên cứu có bình duyệt hay cơ quan chính thức, ghi mốc.
- Không viết điều gì như chẩn đoán ("nếu bạn có 3 dấu hiệu sau thì bạn bị…"), không khuyên dùng hay ngừng thuốc. Danh sách dấu hiệu luôn kèm "chỉ chuyên gia mới chẩn đoán được" và đường tới Hỗ trợ.
- Đầu và cuối trang có lời dẫn tới Hỗ trợ; nói về tự hại theo hướng dẫn đưa tin an toàn (không mô tả cách thức, có thông tin trợ giúp).
- `can_ra_soat: true` cho tới khi chuyên gia (do chủ repo chọn) đọc và ghi kết quả vào hồ sơ (`nguoi.chuyen_gia`, ngày). Chỉ khi đó trang mới được khóa.

## 6. Hồ sơ

Mỗi trang một file: `kiem-dinh/<đường dẫn trong src/content/docs/, bỏ .md>.yml`, ví dụ `kiem-dinh/thi-nghiem/asch.yml`. Bản ghi dữ liệu: `kiem-dinh/du-lieu/<bộ>/<id>.yml`, cùng cấu trúc, `trang` thay bằng `ban_ghi`.

```yaml
trang: src/content/docs/thi-nghiem/asch.md
nguon_cu: ../psyche-zero/docs/thi-nghiem/asch.md   # trang cũ đã chuyển sang (nếu có)
tang: loi
muc: V3
lan:                       # mỗi lần kiểm định một mục, lần mới thêm vào cuối
  - so: 1
    ngay: 2026-11-05
    nhanh: moi/d3-l1
    ma_bam: sha256:3f2a…    # mã băm của trang lúc khóa (node tools/khoa.mjs khoa ghi)
    nguoi: {luot_1: "sonnet", luot_2: "sonnet; opus cho n14", review: Claude, kiem_mau: "chủ repo, 5/42 nhận định"}
nguon:
  - id: asch1956            # khóa trong src/data/nguon.yml
    toan_van: true
nhan_dinh:
  - id: n3
    cau: "Trong các thí nghiệm của Asch, khoảng ba phần tư người tham gia chiều theo nhóm ít nhất một lần."
    loai: phat-hien
    nguon: [asch1956]
    trich: "<câu nguyên văn trong nguồn>"
    vi_tri: "tr. 10, bảng 3"
    luot_2: dung
    ket_qua: dung
    o_dau:                  # nơi khác có khẳng định này, kèm chuỗi bắt buộc có
      kham-pha/tam-ly-xa-hoi/phu-hop-so-dong.md: "ba phần tư"
  - id: n14
    cau: "Hiệu ứng chiều theo nhóm kiểu Asch: khá vững."
    loai: nhan
    nhan: kha-vung
    co_so: [bond1996, "<tái lập gần nhất>"]
    ly_do: "Phân tích tổng hợp 133 nghiên cứu ở 17 nước cùng chiều; độ lớn giảm theo thời gian và khác giữa các nền văn hóa."
    luot_2: dung
    ket_qua: dung
  - id: n20
    cau: "Tính đến 11/2026, chúng tôi chưa tìm thấy nghiên cứu kiểu Asch trên người Việt."
    loai: thoi-su
    het_han: 2028-11-01
    ket_qua: dung
```

- Giá trị `ket_qua`: `dung`, `da-sua` (kèm `ghi_chu`: chữ cũ, chữ mới, lý do), `da-lam-mem` (câu nói mạnh hơn bằng chứng, đã viết lại; kèm `ghi_chu`), `da-bo` (đã bỏ câu khỏi trang, kèm `ghi_chu`).
- Kết quả lượt 2 vào hồ sơ bằng `node tools/khoa.mjs nhap <file lượt 2>`, không chép tay. Lệnh in các nhận định cần review.
- Link trong nguồn phải là trang đã mở và đọc, không phải kết quả tìm kiếm.
- Hồ sơ bản ghi dữ liệu ghi thêm `truong` ở mỗi nhận định (các trường mà nhận định nói tới), để biết khóa trường nào.
- Định dạng cuối cùng chốt ở D1.6 (công cụ khóa kiểm), có thể thêm trường; đổi thì sửa mục này.

## 7. Khóa

- `kiem-dinh/khoa.json` ánh xạ đường dẫn trang → mã băm SHA-256 của nguồn Markdown lúc khóa.
- Mã băm tính trên cả file, kể cả frontmatter, sau khi chuẩn hóa: Unicode NFC, xuống dòng kiểu `\n`, bỏ khoảng trắng cuối dòng, đúng một `\n` ở cuối file. Vì khoảng trắng cuối dòng không vào mã băm, trang không được có khoảng trắng cuối dòng (ngắt dòng cứng viết `<br>`); kiểm thử chặn. Trang không chứa vùng do công cụ sinh (hình, danh sách, dòng trạng thái đều sinh lúc build từ dữ liệu), nên khóa xong thì file không đổi nữa.
- Bản build thật chỉ đưa trang có trong `khoa.json`; trang có trong `khoa.json` mà mã băm khác thì build hỏng, thông báo kèm cách mở khóa.
- Bản ghi trong `src/data/` khóa theo từng bản ghi: cả bản ghi, hay từng phần (chỉ các trường đã kiểm định; mã băm tính trên JSON của phần được khóa, tên trường xếp theo chữ cái). Thêm bản ghi mới được; sửa hay xóa phần đã khóa thì phải mở khóa.
- Thành phần, plugin, JavaScript, CSS không nằm trong khóa; chúng được giữ đúng bằng kiểm thử tự động. Phần do dữ liệu sinh ra (danh sách, con số) đổi khi thêm nội dung mà không phá khóa, và vẫn đúng vì mọi trường trang hiện ra đã được kiểm định và khóa.

## 8. Mở khóa

Chỉ trong bốn trường hợp:

1. Có lỗi được báo (issue, góp ý, phát hiện khi review trang khác).
2. Nguồn thay đổi: bài bị rút hay đính chính, link nguồn chết, ấn bản mới (máy canh báo).
3. Tái lập mốc: bổ sung có `anh_huong_nhan: true`, hay trang đã tích từ 3 bổ sung trở lên (`them-noi-dung.md`).
4. Thay đổi cơ học trên nhiều trang (đổi tên nhãn, sửa định dạng), có lý do và diff được xem.

Cách làm: `node tools/khoa.mjs mo <trang> --ly-do "..."` (ghi lý do vào hồ sơ, gỡ dòng trong `khoa.json`, thêm một mục mới vào `lan`); sửa; kiểm định **chỉ những nhận định bị chạm** cộng các nhận định cùng đoạn và các nơi trong `o_dau`; điền mục mới trong `lan`; khóa lại (`node tools/khoa.mjs khoa <trang>`). Commit mở khóa và commit khóa lại nằm cùng một nhánh (`mo/<tên ngắn>`), review như một việc lẻ; trên `main` trang luôn ở trạng thái khóa. Trang lõi bị sửa một định nghĩa hay một nhãn thì liệt kê các trang link tới đoạn đó và ghi trong báo cáo trang nào cần sửa theo.

## 9. Lời giao việc kiểm định mẫu

Ở `../lam-lai/loi-giao/`: lượt 1 nằm trong lời giao lô; lượt 2 cho trang và cho dữ liệu; lượt 1 cho dữ liệu; review mã. Dùng lại, chỉ đổi phần trong `<>`.

> Bạn **mở khóa và sửa** trang `<đường dẫn>` của repo psyche vì `<lý do: lỗi được báo, nguồn đổi, tái lập mốc>`. Model: Sonnet (Opus nếu là trang Sức khỏe tâm thần hay đổi nhãn). Đọc `AGENTS.md` và `plans/ben-vung/chuan-kiem-dinh.md` mục 8. Tạo nhánh `mo/<tên ngắn>` từ `main`. Chạy `node tools/khoa.mjs mo <trang> --ly-do "..."`, sửa, kiểm định lại những nhận định bị chạm, cùng đoạn và các nơi trong `o_dau`, điền mục mới trong `lan` của hồ sơ; lượt 2 cho phần đã sửa do agent khác làm; khóa lại. Liệt kê trong báo cáo các trang link tới đoạn đã sửa. Khi xong: `npm run build` và `npm test` đạt; commit; báo cáo `plans/ben-vung/bao-cao/mo-<tên ngắn>.md`. Không push.
