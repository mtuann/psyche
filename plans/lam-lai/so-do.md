# Sơ đồ kế hoạch làm lại

Bản vẽ để nắm nhanh kế hoạch. Chữ trong `README.md` là chuẩn: sơ đồ khác chữ thì sửa sơ đồ. GitHub tự vẽ các khối `mermaid` dưới đây; sửa chúng như sửa chữ.

## 1. Mười đợt, làm lần lượt

```mermaid
flowchart TB
  subgraph G1["Chuẩn bị: site mới chỉ có trang chủ tạm"]
    direction LR
    D0["Đợt 0<br/>Repo mới psyche<br/>kế hoạch"] --> D1["Đợt 1<br/>Nền kỹ thuật<br/>D1.1 đến D1.8"]
  end
  subgraph G2["Nền tảng: đủ 68 trang lõi sau đợt 7"]
    direction LR
    D2["Đợt 2<br/>Dữ liệu dùng chung,<br/>lối vào: 20 trang"] --> D3["Đợt 3<br/>Thí nghiệm kinh điển<br/>16 trang"] --> D4["Đợt 4<br/>Hiểu bằng chứng<br/>13 trang"] --> D5["Đợt 5<br/>Nền tảng phần 1<br/>27 bài đã kiểm ở G1"] --> D6["Đợt 6<br/>Nền tảng phần 2<br/>20 bài"] --> D7["Đợt 7<br/>Sức khỏe tâm thần<br/>4 bài, chờ chuyên gia"]
  end
  subgraph G3["Phần còn lại"]
    direction LR
    D8["Đợt 8<br/>Công cụ, ngộ nhận,<br/>sách in, Thêm: 21 trang"] --> D9["Đợt 9<br/>Hoàn tất,<br/>máy canh hằng tuần"]
  end
  G1 --> G2 --> G3
```

Từ đợt 2, mỗi lô gộp vào `main` là trang của lô lên https://mtuann.github.io/psyche/. Site cũ ở `/psyche-zero/` chạy nguyên suốt thời gian này. Tổng 106 trang cũ và 15 trang mới, 18 lô nội dung.

## 2. Một lô đi qua những bước nào, model nào

```mermaid
flowchart TB
  A["Bạn giao lô<br/>loi-giao/lo.md"] --> B["Agent làm lô (Sonnet; Opus nếu có thành phần mới):<br/>chuyển trang bằng script,<br/>kiểm định lượt 1, hồ sơ"]
  B --> C["Agent khác: lượt 2 độc lập<br/>(Sonnet; Opus cho chỗ khó)"]
  C --> D["CI trên bản xem, song song:<br/>npm test, 3 trình duyệt,<br/>Lighthouse, ảnh chụp"]
  D --> E{"Review<br/>(Claude; mã: Haiku hay Sonnet)"}
  E -->|cần sửa| B
  E -->|đạt| F["Bạn đọc tóm tắt,<br/>xem khoảng 5 nhận định"]
  F --> G["Agent khóa"]
  G --> H["Bạn gộp vào main, push"]
  H --> I["deploy.yml chạy lại trên bản thật,<br/>đạt thì trang lên site"]
```

## 3. Trang nào lên site

```mermaid
flowchart LR
  T["Trang trong<br/>src/content/docs/"] --> Q{"Có trong<br/>kiem-dinh/khoa.json?"}
  Q -->|chưa| X["Chỉ ở bản xem,<br/>có dải Chưa kiểm định;<br/>link tới nó hiện sắp có"]
  Q -->|có| H{"Mã băm<br/>còn khớp?"}
  H -->|khớp| P["Bản thật:<br/>đăng lên site"]
  H -->|lệch| F["Build hỏng:<br/>sửa theo thủ tục mở khóa"]
```

## 4. CI chạy song song

```mermaid
flowchart LR
  P["push nhánh<br/>moi/**, mo/**, them/**"] --> F{"Chỉ đổi plans/,<br/>README, AGENTS?"}
  F -->|có| S["Bỏ qua"]
  F -->|không| M["test.yml: 6 job cùng lúc,<br/>mỗi job tự build bản xem<br/>(lưu đệm node_modules, trình duyệt)"]
  M --> J1["npm test"]
  M --> J2["Chromium"]
  M --> J3["WebKit"]
  M --> J4["Firefox"]
  M --> J5["Lighthouse"]
  M --> J6["Ảnh chụp<br/>(không chặn)"]
  G["push main"] --> B["deploy.yml: build bản thật,<br/>npm test"]
  B --> K["Chromium, Lighthouse<br/>(+ WebKit, Firefox nếu<br/>chưa qua test.yml)"]
  K --> D["Đăng GitHub Pages<br/>khi mọi job đạt"]
```

Thời gian chờ bằng job lâu nhất (khoảng 3–4 phút), không phải tổng các job.

## 5. Lớp dữ liệu, tầng và phần sinh lúc build

```mermaid
flowchart TB
  DATA["src/data/: có schema,<br/>khóa theo bản ghi hay từng trường<br/><br/>nguon.yml: 363 DOI và hơn<br/>nghien-cuu.yml: trang nhà<br/>linh-vuc.yml: 14 lĩnh vực<br/>trang.yml: tầng, hạn xem lại<br/>ngo-nhan.yml: 60 thẻ"]
  PAGES["src/content/docs/: khóa theo trang<br/><br/>Nền tảng (lõi): 68<br/>Mở rộng: 12, có hạn<br/>Công cụ: 13<br/>Có hạn (Hỗ trợ): 1"]
  ADD["Dòng cập nhật: chỉ thêm<br/><br/>src/content/bo-sung/<br/>Nghiên cứu mới<br/>bổ sung Việt Nam"]
  GEN["Sinh lúc build, không viết tay<br/><br/>trang chủ, 14 trang lĩnh vực,<br/>dòng trạng thái kiểm chứng,<br/>link sang bài mở rộng,<br/>trang Ngộ nhận, sách in,<br/>tờ tóm tắt, trang Cập nhật"]
  DATA --> PAGES
  DATA --> GEN
  PAGES --> GEN
  ADD --> GEN
```

Thêm một bài mở rộng, một bổ sung hay một thẻ chỉ thêm file và hồ sơ của nó; trang lõi đã khóa không đổi, danh sách và link tự cập nhật lúc build (`../ben-vung/them-noi-dung.md`).

## 6. Sau khi làm lại: thêm hay sửa nội dung

```mermaid
flowchart TB
  N{"Muốn làm gì?"} -->|chủ đề mới, ứng dụng, thời sự| MR["Bài mở rộng<br/>nhánh them/, V2, có hạn"]
  N -->|chỗ trống kinh điển| L["Bài lõi mới<br/>V3, khóa"]
  N -->|bằng chứng mới, Việt Nam| BS["Bổ sung có ngày<br/>V3 cho bổ sung"]
  BS --> AN{"Đổi nhãn<br/>hay kết luận?"}
  AN -->|có| TL["Tái lập mốc:<br/>mở khóa, gộp, khóa lại"]
  AN -->|không| OK["Bài lõi giữ nguyên khóa"]
  N -->|thấy chỗ sai| MO["Mở khóa nhánh mo/:<br/>chỉ kiểm phần bị chạm"]
  N -->|thẻ ngộ nhận, tin mới| D["Bản ghi hay mục dòng cập nhật<br/>V3, chỉ thêm"]
  MC["Máy canh hằng tuần:<br/>rút bài, hết hạn, link hỏng"] --> N
```
