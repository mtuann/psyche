---
title: Bao nhiêu người là đủ?
description: Công suất thống kê là xác suất phát hiện hiệu ứng có thật. Quy ước 0,8 của Cohen, bài báo Power failure và vì sao kết quả từ nghiên cứu nhỏ cần đọc thận trọng.
sidebar:
  label: Bao nhiêu người là đủ? Cỡ mẫu và sức mạnh thống kê
in_duoc: true
---

*Cỡ mẫu và công suất thống kê (statistical power)*

## Một tin tức

> Tháng 5 năm 2013, trang tin khoa học Spectrum (nay thuộc The Transmitter) đưa tin về một bài báo vừa đăng trên *Nature Reviews Neuroscience*: công suất thống kê của các nghiên cứu thần kinh học chỉ vào khoảng 8% đến 31%. Bản tin viết rằng với công suất thấp như vậy, một kết quả "dương tính" chỉ đúng khoảng một nửa số lần hoặc ít hơn.

Bài báo gốc có cái tên rất trực diện: "Power failure: why small sample size undermines the reliability of neuroscience" ("Mất điện: vì sao cỡ mẫu nhỏ làm suy yếu độ tin cậy của khoa học thần kinh", [Button và cộng sự, 2013](https://doi.org/10.1038/nrn3475)). Tóm tắt của bài nói rằng công suất thống kê trung bình của các nghiên cứu thần kinh học rất thấp, và hệ quả gồm việc ước lượng hiệu ứng bị phóng đại và kết quả khó tái lập.

Con số 8–31% nghe có vẻ trừu tượng. Bài này giải thích nó có nghĩa là gì, và vì sao nó đáng để ý mỗi khi bạn đọc một tin kiểu "các nhà khoa học phát hiện...".

## Khái niệm

### Công suất thống kê là gì?

**Công suất thống kê** (*statistical power*) là xác suất một nghiên cứu **phát hiện được hiệu ứng có thật**. Nói cách khác: giả sử ngoài đời thực hiệu ứng đó thực sự tồn tại, nghiên cứu này có bao nhiêu phần trăm cơ hội cho ra một kết quả có ý nghĩa thống kê.

Hãy tưởng tượng bạn đi bắt cá bằng lưới:

- **Hiệu ứng** là con cá: có thể to (dễ bắt) hoặc nhỏ (khó bắt).
- **Cỡ mẫu** là độ mịn của mắt lưới: mẫu càng lớn, mắt lưới càng mịn, càng bắt được cá nhỏ.
- **Công suất** là xác suất mẻ lưới của bạn thực sự vớt được cá, *với điều kiện trong hồ có cá*.

Còn **sai lầm loại II** (ký hiệu β) là trường hợp ngược lại: cá có thật mà lưới không bắt được, tức nghiên cứu cho kết quả không có ý nghĩa dù hiệu ứng có thật. Công suất và β là hai mặt của một đồng xu: **công suất = 1 − β**. Công suất 0,8 nghĩa là 80% cơ hội bắt được cá, 20% rủi ro để nó lọt lưới.

Lưu ý một điểm tinh tế: công suất **không** nói về việc hiệu ứng có tồn tại hay không. Nó chỉ trả lời câu hỏi: *nếu* hiệu ứng có thật ở một độ lớn đã giả định, lưới của ta có đủ mịn để bắt nó không.

### Quy ước 0,8 của Cohen

Năm 1988, nhà tâm lý học Jacob Cohen xuất bản cuốn *Statistical Power Analysis for the Behavioral Sciences* (ấn bản lần thứ hai, nhà xuất bản Lawrence Erlbaum Associates). Trong sách, ông đề nghị một quy ước: khi nhà nghiên cứu không có cơ sở nào khác để chọn mức công suất mong muốn, hãy dùng **0,8**, tức β = 0,2. Cohen gọi giá trị này là "tùy ý nhưng hợp lý" (*arbitrary but reasonable*).

Lý do chính của ông: mức α = 0,05 đã là một quy ước ngầm, và β = 0,20 được chọn với ý rằng sai lầm loại I nghiêm trọng gấp khoảng bốn lần sai lầm loại II (0,20 chia 0,05). Cohen hy vọng quy ước này sẽ bị bỏ qua mỗi khi nhà nghiên cứu có cơ sở riêng để chọn mức khác ([Lakens, 2022](https://doi.org/10.1525/collabra.33267), trích Cohen, 1988).

Nên con số 0,8 không phải định luật tự nhiên. Lakens (2022) viết rằng khuyến nghị mặc định 80% "thiếu một lý lẽ vững", và điều nên rút ra từ Cohen là cần biện minh tỉ lệ sai lầm theo mức nghiêm trọng của từng loại sai lầm. Công suất cao hơn đòi hỏi mẫu lớn hơn; Lakens cho rằng nếu cân nhắc kỹ chi phí so với lợi ích, công suất 90% hay 95% có thể sẽ phổ biến hơn với các bài báo chỉ báo cáo một nghiên cứu.

### Cỡ mẫu cần bao nhiêu? Một bảng tra cứu minh họa

Cỡ mẫu cần thiết phụ thuộc chủ yếu vào **độ lớn của hiệu ứng** muốn phát hiện: hiệu ứng càng nhỏ, càng cần nhiều người. Cohen (1992, "A power primer") lập bảng cỡ mẫu cần để đạt công suất 0,8 cho các hiệu ứng nhỏ, trung bình và lớn theo quy ước của ông. Bảng dưới đây là ví dụ minh họa do chúng tôi tính lại cho trường hợp so sánh hai nhóm độc lập bằng phép kiểm định t hai phía, mức ý nghĩa 0,05, hiệu ứng đo bằng d của Cohen (chênh lệch giữa hai nhóm tính theo độ lệch chuẩn):

| Độ lớn hiệu ứng | Số người cần cho mỗi nhóm để đạt công suất 0,8 (xấp xỉ) | Công suất nếu chỉ có 15 người mỗi nhóm (xấp xỉ) |
|---|---|---|
| Nhỏ (d = 0,2) | 394 | 8% |
| Trung bình (d = 0,5) | 64 | 26% |
| Lớn (d = 0,8) | 26 | 56% |

Bài học từ bảng này rất rõ: **hiệu ứng nhỏ cần mẫu rất lớn**. Mà trong tâm lý học xã hội, tổng hợp hơn 25.000 nghiên cứu cho thấy hiệu ứng điển hình có r khoảng 0,21 ([Richard và cộng sự, 2003](https://doi.org/10.1037/1089-2680.7.4.331)), tương đương d khoảng 0,43, tức giữa mức nhỏ và mức trung bình (phép đổi của chúng tôi). Với d khoảng 0,43, cần khoảng 86 người mỗi nhóm để đạt công suất 0,8 (tính lại), nên một nghiên cứu chỉ vài chục người mỗi nhóm thường không đủ "lưới mịn" để bắt được hiệu ứng điển hình như vậy ([Hiệu ứng lớn hay nhỏ?](/psyche/bang-chung/do-lon-hieu-ung/)).

Lakens (2022) cảnh báo không nên dùng các mốc nhỏ, trung bình, lớn của Cohen để tính cỡ mẫu cho nghiên cứu thật, và ghi rằng chính Cohen về sau tỏ ý tiếc đã đề xuất chúng. Bảng trên chỉ để thấy mối liên hệ giữa độ lớn hiệu ứng và cỡ mẫu.

### "Power failure": khi cả một lĩnh vực thiếu công suất

Trở lại với Button và cộng sự (2013). Nhóm tác giả lấy dữ liệu từ 49 bài phân tích tổng hợp trong khoa học thần kinh (gồm 730 nghiên cứu riêng lẻ) và ước tính công suất của nghiên cứu có cỡ trung vị trong mỗi bài tổng hợp. Kết quả:

- **Công suất trung vị của toàn lĩnh vực khoảng 21%**, thấp hơn nhiều so với quy ước 0,8 (chỉ bằng khoảng một phần tư).
- Phần bàn luận của bài ước tính công suất trung bình của các nghiên cứu thần kinh học có lẽ **không quá khoảng 8% đến 31%**.
- Nghiên cứu cấu trúc não bằng hình ảnh (so sánh nhóm bệnh với nhóm đối chứng): công suất trung vị chỉ **8%**.
- Hai bài tổng hợp về nghiên cứu trên động vật cho **18%** và **31%**.
- Nhóm tác giả cũng nêu khía cạnh đạo đức: nghiên cứu không đáng tin cậy là nghiên cứu lãng phí.

Ở tâm lý học và khoa học thần kinh nhận thức, một phân tích khác của 26.841 phép kiểm định t trong 3.801 bài báo cho thấy công suất trung vị để phát hiện hiệu ứng nhỏ, trung bình và lớn lần lượt là 0,12, 0,46 và 0,78, theo bản đính chính năm 2021 ([Szucs & Ioannidis, 2017](https://doi.org/10.1371/journal.pbio.2000797); [đính chính, 2021](https://doi.org/10.1371/journal.pbio.3001151)).

Cần thận trọng với các con số này. Nord và cộng sự (2017) tính lại trên cả 730 nghiên cứu và thấy trung vị 23%, gần với 21% của Button, nhưng công suất không đồng đều giữa các nhóm nghiên cứu: thấp nhất ở nghiên cứu gen ứng viên (trung vị 11%). Họ kết luận rằng công suất thấp "không phải vấn đề phổ biến ở mọi nơi" (*far from a universal problem*), dù nhiều nghiên cứu vẫn thiếu công suất, có cái rất nghiêm trọng ([Nord và cộng sự, 2017](https://doi.org/10.1523/JNEUROSCI.3592-16.2017)).

Vì sao công suất thấp đáng lo? Có hai lý do chính:

**1. Hiệu ứng bị "thổi phồng" (winner's curse: "lời nguyền của kẻ thắng").** Khi lưới quá thưa mà vẫn bắt được cá, thì hoặc đó là con cá to bất thường, hoặc đơn giản là may mắn. Tương tự, trong các nghiên cứu thiếu công suất, chỉ những hiệu ứng *quan sát được lớn* mới vượt qua ngưỡng ý nghĩa thống kê. Hệ quả: hiệu ứng ước lượng từ các kết quả có ý nghĩa thường lớn hơn hiệu ứng thật, và kết quả khó tái lập hơn ([Button và cộng sự, 2013](https://doi.org/10.1038/nrn3475); [Lakens, 2022](https://doi.org/10.1525/collabra.33267)).

**2. Kết quả "dương tính" ít chắc chắn hơn.** Công suất thấp không chỉ làm giảm khả năng phát hiện hiệu ứng thật, mà còn làm giảm khả năng một kết quả có ý nghĩa thống kê phản ánh hiệu ứng thật (Button và cộng sự, 2013). Bản tin Spectrum nêu ước tính rằng ở công suất 8–31%, kết quả dương tính đúng khoảng một nửa số lần hoặc ít hơn.

Công suất thấp được nêu là một lý do khiến kết quả khó tái lập (Button và cộng sự, 2013), nên nó là một mảnh ghép của câu chuyện [khủng hoảng tái lập](/psyche/bang-chung/khung-hoang-tai-lap/).

## Cách nhận ra

Khi đọc một nghiên cứu, hay một tin tức viết về nghiên cứu, hãy tự hỏi những câu sau:

| Dấu hiệu | Vì sao đáng ngờ |
|---|---|
| Mẫu rất nhỏ (vài chục người trở xuống mỗi nhóm) nhưng kết luận rất lớn | Công suất có thể thấp; hiệu ứng có thể đã bị phóng đại |
| Không hề nhắc đến việc biện minh cỡ mẫu trước khi thu thập dữ liệu | Người đọc khó biết nghiên cứu có đủ sức phát hiện hiệu ứng đáng quan tâm không |
| Hiệu ứng báo cáo lớn một cách bất thường, từ một nghiên cứu đơn lẻ | Đúng kiểu winner's curse: lưới thưa chỉ bắt được "cá to" |
| Phát hiện chưa từng được tái lập | Kết quả từ nghiên cứu nhỏ cần được kiểm chứng lại trước khi tin |

Ngược lại, một nghiên cứu đáng tin hơn thường giải thích vì sao chọn cỡ mẫu ấy ngay từ trước khi thu thập dữ liệu ([Lakens, 2022](https://doi.org/10.1525/collabra.33267)). Về cách chọn người tham gia, xem [Mẫu và chọn mẫu](/psyche/bang-chung/mau-va-chon-mau/).

Một nguyên tắc bỏ túi: **đừng để một giá trị p dưới 0,05 làm bạn yên tâm về độ tin cậy.** Một kết quả có ý nghĩa thống kê từ nghiên cứu công suất thấp có thể ít phản ánh hiệu ứng thật hơn bạn tưởng ([p-value](/psyche/bang-chung/p-value/)).

## Mức độ chắc chắn

:::vung-chac[Công suất thấp làm nghiên cứu dễ bỏ sót hiệu ứng thật, và làm các kết quả có ý nghĩa thống kê thiên về phóng đại hiệu ứng]
Đây là hệ quả của cách phép kiểm định thống kê hoạt động, không phải phát hiện thực nghiệm. Button và cộng sự (2013) và Lakens (2022) cùng nêu điều này.
:::

:::kha-vung[Công suất của nhiều nghiên cứu thần kinh học và tâm lý học thấp hơn nhiều so với mức 0,8, nhưng thấp đến đâu còn tùy cách ước tính]
Ba phân tích độc lập (Button 2013, Szucs và Ioannidis 2017, Nord 2017) cùng chiều. Nhưng con số phụ thuộc giả định về hiệu ứng thật, và Nord thấy công suất không đồng đều giữa các nhóm nghiên cứu.
:::

## Bài tập

### Thử một lần { #thu-mot-lan }

Tình huống sau là **giả định**, do site tự viết để luyện tập:

> Hai nhóm nghiên cứu cùng đặt một câu hỏi: "Liệu một kỹ thuật thư giãn mới có giúp giảm lo âu?"
>
> - **Nghiên cứu A:** 15 người mỗi nhóm. Kết quả: kỹ thuật mới giúp giảm lo âu rất mạnh (hiệu ứng lớn), p = 0,04.
> - **Nghiên cứu B:** 200 người mỗi nhóm. Kết quả: kỹ thuật mới giúp giảm lo âu ở mức vừa phải (hiệu ứng nhỏ), p = 0,008.

Câu hỏi: Nếu chỉ được chọn một nghiên cứu để tin tưởng hơn, bạn chọn nghiên cứu nào? Vì sao? (Gợi ý: nghĩ về công suất và "lời nguyền của kẻ thắng".)

:::thu-gon[Gợi ý đáp án]
**Nên tin nghiên cứu B hơn.** Với 200 người mỗi nhóm, mẫu lớn hơn nhiều, nên hiệu ứng ước lượng ít có khả năng bị thổi phồng hơn. Nghiên cứu A chỉ có 15 người mỗi nhóm: công suất chỉ khoảng 56% ngay cả khi hiệu ứng thật là lớn (d = 0,8), và khoảng 26% nếu là trung bình (d = 0,5). Trong điều kiện đó, một hiệu ứng "rất mạnh" vượt được ngưỡng ý nghĩa rất có thể đã bị thổi phồng (winner's curse). Tuy vậy, cả hai đều chỉ là một nghiên cứu đơn lẻ: tin B hơn không có nghĩa là chắc chắn, và cả hai vẫn cần được tái lập.
:::

### Kiểm tra nhanh

```quiz
? Một nghiên cứu được thiết kế với công suất thống kê 0,8. Điều đó có nghĩa là gì?
- Có 80% khả năng hiệu ứng được nghiên cứu là có thật.
+ Nếu hiệu ứng có thật ở độ lớn đã giả định, nghiên cứu có khoảng 80% cơ hội cho kết quả có ý nghĩa thống kê.
- 80% người tham gia sẽ cho kết quả đúng như giả thuyết.
> Công suất là xác suất cho kết quả có ý nghĩa khi hiệu ứng có thật, bằng 1 trừ xác suất sai lầm loại II. Nó không nói hiệu ứng có tồn tại hay không.
? Vì sao các kết quả có ý nghĩa thống kê từ nghiên cứu công suất thấp thường phóng đại hiệu ứng?
- Vì mẫu nhỏ luôn cho hiệu ứng lớn hơn thực tế.
+ Vì khi công suất thấp, chỉ những hiệu ứng quan sát được lớn mới vượt qua ngưỡng ý nghĩa, nên các kết quả có ý nghĩa thiên về ước lượng cao.
- Vì nhà nghiên cứu cố tình chọn mẫu sao cho hiệu ứng lớn.
> Đây là cơ chế winner's curse: ngưỡng ý nghĩa lọc giữ lại các kết quả may mắn lớn hơn hiệu ứng thật.
? Để so sánh hai nhóm độc lập (mức ý nghĩa 0,05, công suất 0,8), cần khoảng bao nhiêu người mỗi nhóm cho hiệu ứng nhỏ (d = 0,2)?
- Khoảng 26 người.
- Khoảng 64 người.
+ Khoảng 394 người.
> Hiệu ứng càng nhỏ càng cần nhiều người: d = 0,2 cần khoảng 394 người mỗi nhóm, d = 0,5 cần khoảng 64, d = 0,8 cần khoảng 26.
```

## Thử suy ngẫm { #tu-suy-ngam }

1. Cỡ mẫu lớn có tự động làm cho một nghiên cứu tốt hơn không? Điều gì vẫn có thể sai ngay cả khi có hàng nghìn người tham gia? (Gợi ý: nghĩ về cách chọn mẫu và cách đo lường.)
2. Quy ước công suất 0,8 là một "chuẩn vàng" hay chỉ là một thỏa hiệp thực tế? Theo bạn, điều gì nên quyết định con số mục tiêu trong từng nghiên cứu cụ thể?
3. Một nghiên cứu nhỏ tìm ra hiệu ứng rất lớn và có ý nghĩa thống kê: ta nên vui mừng hay nên nghi ngờ? Vì sao cả hai phản ứng đều có phần đúng?
4. Công suất thấp liên quan như thế nào đến việc nhiều phát hiện khoa học không tái lập được? Hiểu điều này thay đổi cách bạn đọc tin tức khoa học ra sao?

## Nguồn

- Button, K. S., Ioannidis, J. P. A., Mokrysz, C., Nosek, B. A., Flint, J., Robinson, E. S. J., & Munafò, M. R. (2013). Power failure: why small sample size undermines the reliability of neuroscience. *Nature Reviews Neuroscience*, *14*(5), 365–376. <https://doi.org/10.1038/nrn3475>
- Cohen, J. (1988). *Statistical power analysis for the behavioral sciences* (2nd ed.). Hillsdale, NJ: Lawrence Erlbaum Associates.
- Cohen, J. (1992). A power primer. *Psychological Bulletin*, *112*(1), 155–159. <https://doi.org/10.1037/0033-2909.112.1.155>
- Lakens, D. (2022). Sample size justification. *Collabra: Psychology*, *8*(1), 33267. <https://doi.org/10.1525/collabra.33267>
- Nord, C. L., Valton, V., Wood, J., & Roiser, J. P. (2017). Power-up: A reanalysis of "power failure" in neuroscience using mixture modeling. *Journal of Neuroscience*, *37*(34), 8051–8061. <https://doi.org/10.1523/JNEUROSCI.3592-16.2017>
- Richard, F. D., Bond, C. F., & Stokes-Zoota, J. J. (2003). One hundred years of social psychology quantitatively described. *Review of General Psychology*, *7*(4), 331–363. <https://doi.org/10.1037/1089-2680.7.4.331>
- Szucs, D., & Ioannidis, J. P. A. (2017). Empirical assessment of published effect sizes and power in the recent cognitive neuroscience and psychology literature. *PLOS Biology*, *15*(3), e2000797. <https://doi.org/10.1371/journal.pbio.2000797>
- Szucs, D., & Ioannidis, J. P. A. (2021). Correction: Empirical assessment of published effect sizes and power in the recent cognitive neuroscience and psychology literature. *PLOS Biology*, *19*(3), e3001151. <https://doi.org/10.1371/journal.pbio.3001151>
- The Transmitter (17/5/2013). Power failure. <https://www.thetransmitter.org/spectrum/power-failure/?fspec=1>
