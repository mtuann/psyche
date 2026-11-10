# Báo cáo: dọn dữ liệu nguồn dùng chung

Nhánh `them/nguon-don` (tách từ `main`). Làm ngày 9/11/2026. Mức review: Lớn (dữ liệu dùng chung). Không đổi trang, không đổi hồ sơ trang, không khóa.

## Việc

Hồ sơ của các trang đã khóa ở đợt 2–4 dẫn 184 nguồn chưa có bản ghi trong `src/data/nguon.yml` (`.cache/nguon-thieu.json`): 81 mục có DOI, 103 mục không có DOI. Việc này thêm bản ghi cho các nguồn có DOI và sửa ba bản ghi sai. Trang vẫn giữ danh sách nguồn viết tay.

## Kết quả

- **Thêm 76 bản ghi**, ở cuối `nguon.yml` và có chú thích đầu khối:
  - 74 bản ghi từ 81 mục có DOI. 7 mục còn lại đã có bản ghi: 6 bản ghi trùng id (`dolinski2017`, `squire1988`, `kidd2013`, `levin1997`, `levin2000`, `powell2021`), và `suomi1976`, có từ bản ghi `suomi1972` sau khi sửa.
  - 2 bản ghi từ nhóm không DOI mà tìm được DOI chắc chắn khớp: `asch1955` và `lusinchi2012`.
  - Bản ghi dựng từ Crossref. Sau đó sửa theo kiểu APA: tên bài viết hoa kiểu câu, bỏ thẻ HTML và `&amp;`; bỏ "The" ở đầu tên tạp chí; thêm số bài ở Frontiers; trang viết dấu gạch ngang dài.
- **Sửa 7 bản ghi** bằng `don-nguon/sua.yml`, áp với `tools/du_lieu/ap-sua.mjs`:
  - `dolinski2017`: đủ 7 tác giả, tên đúng, 8(8), 927–933, thêm DOI.
  - `suomi1972` thành `suomi1976` (cả id). Bản ghi cũ ghép nhầm hai bài: tên bài là của Suomi, Delizio và Harlow (1976), *American Journal of Psychiatry*, 133(11), 1279–1285 (PubMed 824960); còn tác giả, năm, tập lấy sai. Không có bài nào năm 1972 mang tên này. PubMed có năm bài của Suomi và Harlow năm 1972; bài duy nhất ở *American Journal of Psychiatry* là "Monkey psychiatrists", 128(8). Đây là một nguồn, nên tôi sửa bản ghi thành bài 1976, không thêm bản ghi thứ hai. Không file nào dẫn `suomi1972`; hồ sơ `thi-nghiem/harlow` và trang đều dẫn `suomi1976`.
  - `squire1988`: thêm DOI 10.1086/269085 (Crossref khớp).
  - `kidd2013`, `levin1997`, `levin2000`, `powell2021`: thêm DOI mà hồ sơ trang dẫn (Crossref khớp).
- **Có hồ sơ V1: 81 bản ghi** (`kiem-dinh/du-lieu/nguon/`, đều chưa khóa). Hồ sơ sinh bằng `tools/du_lieu/ho-so-nguon.mjs --luot-2 plans/lam-lai/bao-cao/don-nguon/doi-luot-2.yml`, sau đó sửa thêm hai chỗ mà script không tự làm:
  - `nhanh` ghi `them/nguon-don`.
  - Nhận định của các trường sửa ở `don-nguon/sua.yml` (và tên của `szczucka2012`) ghi `ket_qua: da-sua` kèm lý do. Script chỉ đọc file sửa trong `d2-0/`.

## Đối chiếu

Đối chiếu 83 bản ghi bằng `node tools/du_lieu/doi.mjs --chi …`. Có 64 mục khớp cả Crossref lẫn OpenAlex (62 mục trong 81, cộng `asch1955` và `lusinchi2012`). 19 mục lệch được một agent riêng (Claude Sonnet 5.5) kiểm lượt 2 bằng Europe PMC, PubMed, Semantic Scholar hay trang nhà xuất bản; kết quả ở `don-nguon/doi-luot-2.yml`.

| Mục | Lệch | Quyết |
|---|---|---|
| `kidd2013`, `powell2021`, `daderman2023`, `yan2024`, `taber2018`, `nosek2022`, `benjamin2020`, `perry2020`, `germar2014` | Năm theo OpenAlex là năm đăng trực tuyến | Bản ghi đúng (năm in). `germar2014`: OpenAlex ghi "Voß", các nguồn khác ghi "Voss" |
| `suomi1976` | Crossref không ghi tác giả | PubMed: Suomi, Delizio, Harlow |
| `bangdiwala2016` | Crossref ghi trang "522-24" | Europe PMC: 522–524 |
| `jefferson2007` | Crossref ghi tập 2010, số 1 | PubMed 17443635: 2007, số 2, MR000016. Bản ghi giữ "2007(2), MR000016" |
| `barnett2005`, `krypotos2015` | Crossref chỉ ghi một tác giả | Đủ tác giả theo Europe PMC; Barnett in năm 2005 |
| `bouton2004` | Tên trên Crossref có thêm "Table 1." | Đó là lỗi của Crossref |
| `cochondrouet2023` | OpenAlex tách họ thành "Drouet" | Europe PMC: họ là "Cochon Drouet" |
| `szczucka2012` | Bản ghi viết "Dutton" | Bản in viết "Datton" (lỗi chính tả của chính bài in). Đã sửa bản ghi theo bản in; nay khớp cả hai |

**Còn lệch, chưa có hồ sơ (2 mục):**

- `staddon1971`: Crossref, OpenAlex và Semantic Scholar đều ghi "supersitition". Bản ghi viết "superstition" (gần như chắc là tên đúng), nhưng chưa ai thấy bản in hay trang PsycNet. Cần người mở được PsycNet hay bản PDF.
- `stanczak2022`: Crossref xếp "PROFAN Consortium" là tác giả thứ 2; Semantic Scholar, HAL và OpenAlex không có consortium. Bản ghi giữ thứ tự của Crossref. Chưa xác nhận được vị trí thật.

## Id khác hồ sơ trang

Bản ghi theo quy ước id; hồ sơ trang vẫn dùng id cũ, vì việc này không sửa hồ sơ trang. Lô sau, khi mở hồ sơ ấy, có thể đổi cho khớp.

- `haslam2014meta` thành `haslam2014b`: `haslam2014` đã là bài khác của Haslam và cộng sự.
- `perry2019` thành `perry2020`: năm in, 83(1).
- `daderman2022` thành `daderman2023`: năm in, 42(33). Trang ghi năm 2022.
- `cochon2023` thành `cochondrouet2023`: họ là "Cochon Drouet".
- `szucs2021` là bản đính chính ("Correction: …"). Crossref xếp loại journal-article, nên `loai: bai-bao` và tên giữ chữ "Correction:".

## 103 mục không DOI: phân loại

**(a) Bài báo, sách thật (10 mục):**

- Thêm 2 mục, khớp tác giả, năm, tên, nơi đăng:
  - `asch1955`: DOI 10.1038/scientificamerican1155-31.
  - `lusinchi2012`: DOI 10.1017/s014555320001035x, DOI mà trang dẫn. Crossref còn một DOI cũ của Duke cho cùng bài, 10.1215/01455532-1461650; chỉ ghi một DOI.
- `harlow1958b`: cùng bài với `harlow1958`, đã có bản ghi kèm DOI; hồ sơ chỉ dẫn bản quét khác. Không thêm.
- `gantt1928` (Pavlov, *Lectures on conditioned reflexes*, Gantt dịch, 1928): APA PsycBooks có DOI 10.1037/11081-000, nhưng Crossref ghi nhà xuất bản "Liverwright", còn trang ghi International Publishers. **Chủ repo quyết** có dùng DOI này không. Chưa thêm.
- Không có DOI trên Crossref, để lô dùng chúng kiểm:
  - `sollaci2004`: *J Med Libr Assoc* năm 2004 chỉ có PMC.
  - `milgram1974`, `bandura1973`, `fisher1925`, `aera2014`: sách.
  - `whr2024-ch2`: chương báo cáo.

**(b) Văn bản chính thức, giáo trình mở, trang web (90 mục, để lại):**

- OpenStax (37 mục):
  - `openstax23`, `openstax-psy2e`, `openstax-stats2e`, `openstax-stats2e-binomial`, `openstax22`, `openstax-stats-1-1`, `openstax-stats-2-5`, `openstax-stats-2-6`, `openstax2e`.
  - `os1-1`, `os2-1`, `os2-3`, `os3-1`, `os3-3`, `os3-5`, `os4-1`, `os4-2`, `os5-1`, `os6-1`, `os7-1`, `os7-2`, `os7-3`, `os7-4`, `os8-1`, `os8-3`, `os9-1`, `os10-1`, `os10-4`, `os11-1`, `os11-7`, `os12-1`, `os14-1`, `os14-3`, `os14-4`, `os14-5`, `os15`, `os16`.
- Cochrane Handbook (5 mục): `cochrane-ch6`, `cochrane-ch10`, `cochrane-ch12`, `cochrane-ch13`, `cochrane-ch15`.
- Đạo đức, chuẩn mực (8 mục): `belmont1979`, `apa2017`, `cfr45-46`, `helsinki2024`, `icmje2026`, `asa-thong-cao`, `phs-policy`, `swls-thang`.
- Thống kê Việt Nam và bản tin (6 mục): `nso-thongcao`, `nso-dacta`, `nso-ksms-trang`, `vietstock2025`, `transmitter2013`, `bps2013`.
- Pháp luật Việt Nam (7 mục): `luat-vien-thong-2023`, `tt22-2014-btttt`, `qd01-2008-byt`, `luat-kbcb-2023`, `nd96-2023`, `tt26-2025-byt`, `nd110-2024`.
- Đường dây và cơ sở hỗ trợ (10 mục): `tongdai111`, `bc111-2025`, `ngaymai`, `csaga`, `hope-hyvongsong`, `findahelpline-vn`, `bvtttw1-luu`, `tamthantw2`, `bvtt-tphcm`, `nhs-careers-cp`.
- Tờ thông tin y tế (12 mục): `who-depression`, `who-tram-cam`, `samhsa-signs`, `nimh-help`, `who-suicide-friend`, `paho-living-depression`, `healthdirect-psych`, `healthdirect-mhp`, `healthdirect-counsellors`, `healthdirect-sw`, `nice-cg113`, `nhs-phobia`.
- Khác (5 mục): `ucsb1936`, `nobel1904`, `ovid`, `jigsaworg`, `prisonexp`.

**(c) Không phải nguồn xuất bản (3 mục, để lại):**

- `whr2024-du-lieu`, `whr2023-du-lieu`: file dữ liệu.
- `tim-kiem-vn`: một lần tìm kiếm.

## Kiểm thử

- `npm run build:xem`: đạt.
- `npm test`: 82 đạt, 0 hỏng, 1 bỏ qua.
- `node tools/khoa.mjs tinh`: mọi mục đã khóa vẫn khớp. Không bản ghi nào bị sửa đã khóa trước đó.

## Chỗ chưa chắc, cần chủ repo

1. `staddon1971` và `stanczak2022` chưa có hồ sơ (xem trên).
2. `gantt1928`: dùng DOI của APA PsycBooks hay không.
3. `szczucka2012` ghi "Datton" như bản in. Nếu muốn ghi "Dutton [sic]" thì phải sửa cả hồ sơ.
4. Kiểm mẫu trước khi khóa 81 hồ sơ.
5. Ngoài phạm vi, chỉ ghi lại: `haslam2014` (BJSP 54(1)) có lẽ in năm 2015.

## Model

- Claude Opus 5.5: dựng bản ghi, lượt 1, quyết chỗ lệch, phân loại, báo cáo.
- Claude Sonnet 5.5, agent riêng: lượt 2 của 19 mục lệch.

## Review, kiểm mẫu, khóa (09/11/2026)

- Review: Claude Sonnet 5.5, agent riêng, mức Lớn. Đối chiếu tự động 76/76 bản ghi mới với Crossref, xem kỹ 16 bản ghi, xét mọi sửa và chỗ lệch; thử khóa 81 hồ sơ trên bản sao. Phải sửa: không có. Nên sửa: thêm "[sic]" sau "Datton" ở `szczucka2012` (chủ repo chọn, đã làm); chữ ghi chú nhắc `suomi1972` ở hồ sơ đã khóa `kiem-dinh/thi-nghiem/harlow.yml` sửa khi mở khóa trang ấy.
- Kiểm mẫu: chủ repo, 5 nhận định ngẫu nhiên (`don-nguon-kiem-mau.yml`), đạt 09/11/2026.
- Chủ repo quyết: chưa thêm `gantt1928` (DOI APA PsycBooks ghi nhà xuất bản khác bản trang dẫn).
- Khóa 81 bản ghi (`#doi,loai,nam,noi_dang,tac_gia,ten`) bằng `tools/du_lieu/khoa-loat.mjs`. Tổng bản ghi đã khóa: 637. `staddon1971`, `stanczak2022` chưa có hồ sơ, chưa khóa.
