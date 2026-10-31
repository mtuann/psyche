---
title: Bao nhiêu người là đủ?
description: Công suất thống kê là xác suất phát hiện hiệu ứng có thật. Quy ước 0,8 của Cohen, bài báo Power failure và vì sao nghiên cứu nhỏ khó tin.
sidebar:
  label: Bao nhiêu người là đủ? Cỡ mẫu và sức mạnh thống kê
in_duoc: true
---

*Cỡ mẫu và công suất thống kê (statistical power)*

## Một tin tức

> Tháng 5 năm 2013, trang tin khoa học Spectrum (nay thuộc The Transmitter) đưa tin về một bài báo vừa đăng trên *Nature Reviews Neuroscience*: phân tích 48 bài tổng hợp nghiên cứu cho thấy công suất thống kê của phần lớn nghiên cứu thần kinh học chỉ dao động từ 8% đến 31%. Với công suất thấp như vậy, một kết quả "dương tính" chỉ phản ánh hiệu ứng có thật khoảng một nửa thời gian, hoặc ít hơn.

Bài báo gốc có cái tên rất trực diện: "Power failure: why small sample size undermines the reliability of neuroscience" — "Mất điện: vì sao cỡ mẫu nhỏ làm suy yếu độ tin cậy của khoa học thần kinh" ([Button và cộng sự, 2013](https://doi.org/10.1038/nrn3475)). Thông điệp của nó cũng trực diện không kém: các nghiên cứu trong lĩnh vực này dùng mẫu quá nhỏ một cách có hệ thống, và điều đó khiến cả một ngành khoa học trở nên kém đáng tin.

Con số 8–31% nghe có vẻ trừu tượng. Bài này sẽ giúp bạn hiểu nó có nghĩa là gì, và vì sao nó quan trọng mỗi khi bạn đọc một tin tức kiểu "các nhà khoa học phát hiện...".

## Khái niệm

### Công suất thống kê là gì?

**Công suất thống kê** (*statistical power*) là xác suất một nghiên cứu **phát hiện được hiệu ứng có thật**. Nói cách khác: giả sử ngoài đời thực hiệu ứng đó thực sự tồn tại, nghiên cứu này có bao nhiêu phần trăm cơ hội "bắt" được nó bằng một kết quả có ý nghĩa thống kê.

Hãy tưởng tượng bạn đi bắt cá bằng lưới:

- **Hiệu ứng** là con cá: có thể to (dễ bắt) hoặc nhỏ (khó bắt).
- **Cỡ mẫu** là độ mịn của mắt lưới: mẫu càng lớn, mắt lưới càng mịn, càng bắt được cá nhỏ.
- **Công suất** là xác suất mẻ lưới của bạn thực sự vớt được cá — *với điều kiện trong hồ có cá*.

Còn **sai lầm loại II** (ký hiệu β) là trường hợp ngược lại: cá có thật mà lưới không bắt được, tức nghiên cứu bỏ sót một hiệu ứng có thật. Công suất và β là hai mặt của một đồng xu: **công suất = 1 − β**. Công suất 0,8 nghĩa là 80% cơ hội bắt được cá, 20% rủi ro để nó lọt lưới.

Lưu ý một điểm tinh tế: công suất **không** nói về việc hiệu ứng có tồn tại hay không. Nó chỉ trả lời câu hỏi: *nếu* hiệu ứng có thật, lưới của ta có đủ mịn để bắt nó không.

### Quy ước 0,8 của Cohen

Năm 1988, nhà tâm lý học Jacob Cohen xuất bản cuốn *Statistical Power Analysis for the Behavioral Sciences* (ấn bản lần thứ hai, nhà xuất bản Lawrence Erlbaum Associates). Trong cuốn sách này, ông đề xuất một quy ước đã trở thành chuẩn mực cho cả ngành: khi thiết kế nghiên cứu, hãy nhắm tới **công suất 0,8** — tức 80% cơ hội phát hiện hiệu ứng có thật, chấp nhận 20% rủi ro bỏ sót.

Con số 0,8 không phải định luật tự nhiên. Đó là một **thỏa hiệp thực tế**: công suất cao hơn đòi hỏi mẫu lớn hơn (tốn kém hơn, lâu hơn), còn công suất thấp hơn thì nghiên cứu gần như đánh bạc với tiền của người tài trợ và thời gian của người tham gia. Cohen chọn 0,8 như một điểm cân bằng hợp lý, và cộng đồng khoa học đã theo quy ước đó từ bấy giờ.

Cũng cần nói thêm: 0,8 là mức *tối thiểu nên đạt*, không phải mức lý tưởng. Trong những lĩnh vực mà sai lầm rất đắt giá (ví dụ thử nghiệm thuốc), người ta thường nhắm tới 0,9 hoặc cao hơn.

### Cỡ mẫu cần bao nhiêu? Một bảng tra cứu minh họa

Cỡ mẫu cần thiết phụ thuộc chủ yếu vào **độ lớn của hiệu ứng** muốn phát hiện: hiệu ứng càng nhỏ, càng cần nhiều người. Bảng dưới đây là ví dụ minh họa theo các bảng tra cứu chuẩn của Cohen (kiểm định so sánh hai nhóm độc lập, mức ý nghĩa 0,05, công suất 0,8):

| Độ lớn hiệu ứng | Ví dụ trực quan | Số người cần cho mỗi nhóm (xấp xỉ) |
|---|---|---|
| Nhỏ (d = 0,2) | Chênh lệch rất khó nhận ra bằng mắt thường | ~400 |
| Trung bình (d = 0,5) | Chênh lệch ở mức có thể cảm nhận được | ~64 |
| Lớn (d = 0,8) | Chênh lệch rõ rệt, ai cũng thấy | ~26 |

Bài học từ bảng này rất rõ: **hiệu ứng nhỏ cần mẫu rất lớn**. Mà trong tâm lý học, phần lớn hiệu ứng thật thuộc loại nhỏ đến trung bình ([Hiệu ứng lớn hay nhỏ?](/psyche/bang-chung/do-lon-hieu-ung/)). Nghĩa là một nghiên cứu chỉ vài chục người thường không đủ "lưới mịn" để bắt được những hiệu ứng điển hình của ngành — trừ khi hiệu ứng đó lớn một cách bất thường.

### "Power failure": khi cả một lĩnh vực thiếu công suất

Trở lại với Button và cộng sự (2013). Nhóm tác giả đã làm một việc đơn giản mà gây chấn động: họ lấy 48 bài phân tích tổng hợp trong khoa học thần kinh (tổng cộng 730 nghiên cứu) và tính ngược lại xem mỗi nghiên cứu có công suất bao nhiêu. Kết quả:

- **Công suất trung vị của toàn lĩnh vực chỉ khoảng 21%** — chưa bằng một phần tư quy ước 0,8.
- Tính lạc quan nhất, con số này nằm trong khoảng **8–31%** tùy tiểu lĩnh vực.
- Nghiên cứu về bất thường thể tích não: công suất trung vị chỉ **8%**.
- Nghiên cứu trên động vật (thường dùng chuột): **18–31%** — và nhóm tác giả còn nêu vấn đề đạo đức: rất nhiều động vật đã bị hy sinh cho những nghiên cứu gần như không có cơ hội tìm ra hiệu ứng thật.

Vì sao công suất thấp lại nguy hiểm đến vậy? Có hai lý do chính:

**1. Hiệu ứng bị "thổi phồng" (winner's curse — "lời nguyền của kẻ thắng").** Khi lưới quá thưa mà vẫn bắt được cá, thì hoặc đó là con cá to bất thường, hoặc đơn giản là may mắn. Tương tự, trong các nghiên cứu thiếu công suất, chỉ những hiệu ứng *trông có vẻ rất lớn* mới vượt qua được ngưỡng ý nghĩa thống kê. Hệ quả: hiệu ứng được báo cáo thường lớn hơn nhiều so với thực tế. Khi người khác làm lại nghiên cứu với mẫu lớn hơn, hiệu ứng "xẹp" xuống — hoặc biến mất hẳn.

**2. Kết quả "dương tính" ít đáng tin.** Đây là điểm mà bài báo trên The Transmitter nhấn mạnh: khi công suất chỉ 8–31%, trong số các kết quả đạt ý nghĩa thống kê, tỷ lệ phản ánh hiệu ứng thật chỉ khoảng một nửa hoặc ít hơn. Nói nôm na: tung đồng xu còn đáng tin hơn.

Hai hệ quả này cũng là một mảnh ghép quan trọng của [khủng hoảng tái lập](/psyche/bang-chung/khung-hoang-tai-lap/): nhiều phát hiện ban đầu rất ấn tượng đến từ các nghiên cứu nhỏ, thiếu công suất, nên khi cộng đồng làm lại một cách cẩn thận hơn, chúng không đứng vững.

## Cách nhận ra

Khi đọc một nghiên cứu — hay một tin tức viết về nghiên cứu — hãy tự hỏi những câu sau:

| Dấu hiệu | Vì sao đáng ngờ |
|---|---|
| Mẫu rất nhỏ (vài chục người trở xuống mỗi nhóm) nhưng kết luận rất lớn | Công suất thấp; hiệu ứng có thể đã bị thổi phồng |
| Không hề nhắc đến việc tính toán cỡ mẫu hay công suất trước khi làm | Nhóm nghiên cứu có thể chưa từng tự hỏi "bao nhiêu là đủ" |
| Hiệu ứng báo cáo lớn một cách bất thường, từ một nghiên cứu đơn lẻ | Đúng kiểu winner's curse: lưới thưa chỉ bắt được "cá to" |
| Giá trị p chỉ vừa đủ dưới 0,05 | Với công suất thấp, p "sát nút" càng dễ chỉ là may rủi ([p-value](/psyche/bang-chung/p-value/)) |
| Phát hiện chưa từng được tái lập | Kết quả từ nghiên cứu nhỏ cần được kiểm chứng lại trước khi tin |

Ngược lại, một nghiên cứu đáng tin thường có: cỡ mẫu được tính toán và giải thích trước khi thu thập dữ liệu, hiệu ứng ở mức vừa phải và ổn định qua nhiều nghiên cứu, và phương pháp được mô tả minh bạch ([Mẫu và chọn mẫu](/psyche/bang-chung/mau-va-chon-mau/)).

Một nguyên tắc bỏ túi: **đừng để con số p-value đánh lừa bạn về độ tin cậy** — một nghiên cứu nhỏ với p < 0,05 có thể kém đáng tin hơn nhiều so với một nghiên cứu lớn với cùng mức p đó.

## Thử một lần

Tình huống sau là **giả định**, do site tự viết để luyện tập:

> Hai nhóm nghiên cứu cùng đặt một câu hỏi: "Liệu một kỹ thuật thư giãn mới có giúp giảm lo âu?"
>
> - **Nghiên cứu A:** 15 người mỗi nhóm. Kết quả: kỹ thuật mới giúp giảm lo âu rất mạnh (hiệu ứng lớn), p = 0,04.
> - **Nghiên cứu B:** 200 người mỗi nhóm. Kết quả: kỹ thuật mới giúp giảm lo âu ở mức vừa phải (hiệu ứng nhỏ), p = 0,008.

Câu hỏi: Nếu chỉ được chọn một nghiên cứu để tin tưởng hơn, bạn chọn nghiên cứu nào? Vì sao? (Gợi ý: nghĩ về công suất và "lời nguyền của kẻ thắng".)

:::thu-gon[Gợi ý đáp án]
**Nên tin nghiên cứu B hơn.** Với 200 người mỗi nhóm, công suất cao hơn nhiều, nên hiệu ứng nhỏ nhưng ổn định của nó đáng tin hơn. Nghiên cứu A chỉ có 15 người mỗi nhóm — công suất rất thấp; một hiệu ứng "rất mạnh" mà vẫn vượt qua được ngưỡng ý nghĩa trong điều kiện đó rất có thể đã bị thổi phồng (winner's curse), và giá trị p = 0,04 sát nút 0,05 càng làm tăng nghi ngờ. Trong khoa học, một hiệu ứng nhỏ nhưng thật (B) có giá trị hơn một hiệu ứng lớn nhưng mong manh (A).
:::

## Tự suy ngẫm

1. Cỡ mẫu lớn có tự động làm cho một nghiên cứu tốt hơn không? Điều gì vẫn có thể sai ngay cả khi có hàng nghìn người tham gia? (Gợi ý: nghĩ về cách chọn mẫu và cách đo lường.)
2. Quy ước công suất 0,8 là một "chuẩn vàng" hay chỉ là một thỏa hiệp thực tế? Theo bạn, điều gì nên quyết định con số mục tiêu trong từng nghiên cứu cụ thể?
3. Một nghiên cứu nhỏ tìm ra hiệu ứng rất lớn và có ý nghĩa thống kê — ta nên vui mừng hay nên nghi ngờ? Vì sao cả hai phản ứng đều có phần đúng?
4. Công suất thấp liên quan như thế nào đến việc nhiều phát hiện khoa học không tái lập được? Hiểu điều này thay đổi cách bạn đọc tin tức khoa học ra sao?

## Nguồn

- Button, K. S., Ioannidis, J. P. A., Mokrysz, C., Nosek, B. A., Flint, J., Robinson, E. S. J., & Munafò, M. R. (2013). Power failure: why small sample size undermines the reliability of neuroscience. *Nature Reviews Neuroscience*, *14*(5), 365–376. <https://doi.org/10.1038/nrn3475>
- Cohen, J. (1988). *Statistical power analysis for the behavioral sciences* (2nd ed.). Hillsdale, NJ: Lawrence Erlbaum Associates.
- The Transmitter (17/5/2013). Power failure. <https://www.thetransmitter.org/spectrum/power-failure/?fspec=1>
