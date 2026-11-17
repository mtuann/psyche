---
title: Dữ liệu của tôi
description: Xem, tải bản sao lưu, khôi phục hoặc xóa kết quả các bài thử được lưu trên trình duyệt của bạn; bật, tắt việc lưu trang để đọc khi mất mạng.
---

Kết quả các bài thử, lượt chơi thẻ ngộ nhận và các phần "Thử suy ngẫm" được lưu **chỉ trên trình duyệt này** (trong `localStorage`). Psyche không có máy chủ lưu dữ liệu, và không gửi kết quả của bạn đi đâu.

Vì dữ liệu nằm trên trình duyệt, nó sẽ mất nếu bạn xóa dữ liệu duyệt web, và không tự đồng bộ sang thiết bị khác. Bạn có thể tải một file sao lưu và khôi phục ở nơi khác. Kết quả đã lưu khi dùng Psyche Zero (bản cũ của site) vẫn còn ở đây, vì hai bản dùng chung chỗ lưu.

::cong-cu{ten="du-lieu-cua-toi"}

<noscript><p>Trang này cần JavaScript.</p></noscript>

## Khôi phục hoạt động thế nào?

Khôi phục là **gộp, không ghi đè**: các bản ghi trong file được thêm vào những gì đang có trên trình duyệt; không có gì bị xóa. Gộp cùng một file nhiều lần không tạo bản ghi trùng lặp. Trước khi gộp, bạn sẽ thấy số bản ghi mới sẽ được thêm vào.

## Đọc khi mất mạng

Khi bật (mặc định), trình duyệt lưu các trang bạn đã mở trên máy này, cùng trang Hỗ trợ, để đọc lại được khi mất mạng. Mỗi lần site cập nhật, các trang đã lưu bị xóa để khỏi đọc phải bản cũ; trang nào bạn mở lại thì được lưu bản mới. Trang chưa mở lần nào thì chưa đọc được khi mất mạng. Tắt thì các trang đã lưu bị xóa; kết quả bài thử không bị ảnh hưởng.
