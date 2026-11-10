// Tùy chọn xếp hạng của Pagefind cho ô tìm kiếm (astro.config.mjs, starlight({ pagefind })) và cho kiểm thử tìm kiếm
// (tests/trinh-duyet/kiem-tim-kiem.mjs), một chỗ cho cả hai. Chỉ ghi chỗ khác mặc định của Starlight.
// termFrequency 0,1 → 0,5 (D5-L4): tiếng Việt tách theo âm tiết, các âm như "quan", "qua", "nhân" có ở hầu hết bài, nên
// khi site có hơn 70 trang, "tuong quan nhan qua" đẩy trang Tương quan và nhân quả xuống thứ 6. Với 0,5, trang chứa cả cụm
// nhiều lần được ưu tiên hơn trang chỉ có lẻ tẻ từng âm; 24 truy vấn của kiểm thử đều ra trang đích trong 5 kết quả đầu
// (0,1: hỏng 1; termSaturation 0,5–0,8: hỏng 5; termSimilarity 2: hỏng 3; pageLength 0,3: hỏng 1).
export const XEP_HANG = { termFrequency: 0.5 };
