Bổ sung có ngày cho trang đã khóa (D1.4; plans/ben-vung/them-noi-dung.md). Mỗi bổ sung một file Markdown:
src/content/bo-sung/<đường dẫn trang>/<năm-tháng-ngày>.md, frontmatter:

---
trang: kham-pha/tri-nho/vi-sao-ta-quen   # trang mà bổ sung gắn vào (phải có trong src/data/trang.yml)
ngay: 2027-03-15                          # ngày đăng bổ sung
anh_huong_nhan: false                     # true: bổ sung làm đổi nhãn mức độ chắc chắn, phải mở khóa trang
---

Chữ của bổ sung (Markdown, dùng được mọi khối của trang). Bổ sung hiện cuối trang, mục "Bổ sung", mới nhất trước.
Bổ sung không sửa trang đã khóa, nên không đổi mã băm của trang; mỗi bổ sung có hồ sơ kiểm định riêng (đợt 9).
