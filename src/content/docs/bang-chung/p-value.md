---
title: p < 0,05 nghĩa là gì?
description: p = 0,03 không có nghĩa là giả thuyết đúng 97%. Hiểu đúng p-value, cách đọc khoảng tin cậy, và vì sao việc "săn" ý nghĩa thống kê làm hỏng khoa học.
sidebar:
  label: p < 0,05 nghĩa là gì? p-value và khoảng tin cậy
in_duoc: true
---

*p-value và khoảng tin cậy*

## Một tin tức

> **"Thuốc mới giảm mất ngủ: hiệu quả đã được chứng minh (p < 0,05)"** — một dòng tít quảng cáo kiểu này rất quen thuộc.

*Ví dụ trên là **giả định**, nhưng hiểu lầm đằng sau nó thì có thật: năm 2016, Hiệp hội Thống kê Hoa Kỳ (ASA) ra một tuyên bố chính thức vì cách dùng và cách hiểu p-value hay bị sai lệch.*

Tuyên bố do Ronald L. Wasserstein và Nicole A. Lazar soạn thảo, đăng trên tạp chí *The American Statistician*, số 70(2), trang 129–133 ([Wasserstein & Lazar, 2016](https://doi.org/10.1080/00031305.2016.1154108)). Theo thông cáo của ASA, đây là lần đầu Ban Giám đốc ASA, đại diện cho cộng đồng thống kê, ra một tuyên bố về những vấn đề này. Tuyên bố nêu sáu nguyên tắc, nhiều nguyên tắc trong đó nhằm sửa các hiểu lầm và cách dùng sai p-value.

## Khái niệm

### p-value thực ra là gì

Hãy tưởng tượng bạn tung một đồng xu 10 lần và được 9 lần ngửa. Đồng xu có gian lận không?

Cách nghĩ đúng đắn không phải "đồng xu gian lận với xác suất bao nhiêu", mà là: **giả sử đồng xu hoàn toàn công bằng**, thì chuyện tung 10 lần mà được từ 9 lần ngửa trở lên hiếm đến mức nào? Tính ra: trong 1024 khả năng đều nhau, có 10 cách được đúng 9 ngửa và 1 cách được 10 ngửa — tổng 11/1024, khoảng **1,1%**.

Con số 1,1% đó chính là một p-value: **xác suất thu được kết quả "lạ" như thế này (hoặc lạ hơn), nếu giả thuyết "không có gì đặc biệt" là đúng.**

Nói gọn theo cách của ASA: p-value cho biết dữ liệu *không tương thích* đến mức nào với một mô hình đã định trước (ở đây là mô hình "đồng xu công bằng").

### Hiểu lầm lớn nhất

**p-value KHÔNG phải xác suất giả thuyết đúng.** Đây là một hiểu lầm thường gặp, và là nguyên tắc thứ hai của tuyên bố ASA 2016.

Quay lại ví dụ tung xu: p = 1,1% **không** có nghĩa là "xác suất đồng xu công bằng chỉ là 1,1%". Nó có nghĩa là: *nếu* đồng xu công bằng, thì được từ 9 lần ngửa trở lên là chuyện hiếm (1,1%). Hai câu này khác nhau hoàn toàn:

- Câu sai: nói về **đồng xu** ("đồng xu công bằng với xác suất 1,1%").
- Câu đúng: nói về **dữ liệu trong một điều kiện giả định** ("nếu đồng xu công bằng, dữ liệu này hiếm đến mức 1,1%").

Vì sao dễ nhầm? Câu hỏi ta muốn trả lời thường là "giả thuyết có đúng không", nhưng p-value chỉ trả lời "dữ liệu có lạ không, nếu giả thuyết đúng". Một mình p-value không phải thước đo tốt cho bằng chứng về một mô hình hay giả thuyết.

Tương tự, p = 0,03 trong quảng cáo thuốc không có nghĩa là "thuốc hiệu quả với xác suất 97%", cũng không có nghĩa "chỉ có 3% là do ngẫu nhiên". Nó chỉ có nghĩa: nếu thuốc thực ra vô tác dụng (và các giả định của phép tính đều đúng), thì chênh lệch lớn như thế hoặc lớn hơn chỉ xảy ra với xác suất 3%.

### Khoảng tin cậy: câu hỏi hay hơn "có hay không"

Thay vì chỉ hỏi "có ý nghĩa thống kê không", ta có thể hỏi một câu hữu ích hơn: **"hiệu ứng lớn cỡ nào?"** Câu trả lời là **khoảng tin cậy** (confidence interval).

Ví dụ giả định: một thử nghiệm cho thấy thuốc mới giúp người ta ngủ thêm trung bình 20 phút, với khoảng tin cậy 95% từ 5 đến 35 phút. Đọc như sau:

- Ước lượng tốt nhất: thêm 20 phút.
- Các giá trị trong khoảng từ 5 đến 35 phút tương thích với dữ liệu hơn các giá trị nằm ngoài khoảng, với điều kiện mô hình thống kê đúng.
- Nếu khoảng này **không chứa số 0** (như ở đây), kết quả được gọi là "có ý nghĩa thống kê ở mức 5%" — đó chính là mối liên hệ với p < 0,05.

Điểm hay của khoảng tin cậy: nó cho thấy những **độ lớn** của hiệu ứng tương thích với dữ liệu, kể cả hướng của hiệu ứng. Trong khi đó p-value không đo độ lớn hay tầm quan trọng của kết quả: hai nghiên cứu cùng p = 0,03 có thể ẩn sau một hiệu ứng lớn hoặc một hiệu ứng nhỏ không đáng kể.

### Con số 0,05 từ đâu ra?

0,05 là một **quy ước**, không phải chân lý toán học. Ronald Fisher nêu nó trong sách năm 1925 như một điểm tiện lợi để quyết định một chênh lệch có được coi là đáng kể hay không. Theo Jessica Utts, chủ tịch ASA năm 2016, ở một số lĩnh vực p-value đã trở thành "người gác cổng" quyết định công trình có được công bố hay không.

Theo Utts, thiên lệch biên tập này dẫn tới "ngăn kéo hồ sơ" (*file drawer*, nghiên cứu có kết quả có ý nghĩa thống kê dễ được đăng hơn nhiều) và tới p-hacking. ASA nhấn mạnh: kết luận khoa học không nên chỉ dựa vào việc p-value có vượt qua một ngưỡng cụ thể hay không. p = 0,049 và p = 0,051 gần như giống nhau về mặt bằng chứng, vì p-value thay đổi liên tục, nhưng một bên được gọi là "thành công", bên kia là "thất bại". Ranh giới mong manh ấy không nên quyết định số phận một nghiên cứu.

### p-hacking là gì

**p-hacking** là việc thử đi thử lại nhiều cách phân tích cho đến khi p-value "rơi" xuống dưới 0,05, rồi chỉ báo cáo cách phân tích "thành công". Một vài chiêu phổ biến:

- Quyết định có thu thêm dữ liệu hay không sau khi đã xem kết quả có ý nghĩa chưa.
- Đo nhiều biến kết quả (ví dụ 10 biến), chỉ báo cáo vài biến có p < 0,05 và bỏ qua các biến còn lại.
- Quyết định có loại một số điểm dữ liệu hay không sau khi xem việc loại ấy làm kết quả đổi thế nào.
- Chỉ báo cáo những nghiên cứu hay điều kiện cho kết quả "thành công".

Vì sao nguy hiểm? Những cách làm này có thể làm tăng khả năng tìm ra bằng chứng "ủng hộ" một giả thuyết sai. Kết quả có được theo cách ấy ít có khả năng tái lập hơn khi người khác làm lại.

Đây chính là tinh thần nguyên tắc thứ tư của ASA: suy luận đúng đòi hỏi **báo cáo đầy đủ và minh bạch**.

## Cách nhận ra

Khi thấy "p < 0,05" hay "có ý nghĩa thống kê" trong tin tức, làm ba việc:

1. **Hỏi về độ lớn, không chỉ hỏi có/không.** Hiệu ứng là bao nhiêu? Khoảng tin cậy rộng hay hẹp? Một hiệu ứng nhỏ xíu vẫn có thể cho p < 0,05 nếu mẫu đủ lớn.
2. **Coi chừng ngưỡng ma thuật.** Đừng để ranh giới 0,05 quyết định tất cả — hãy xem toàn bộ bằng chứng.
3. **Tìm dấu hiệu p-hacking:** nghiên cứu có đăng ký trước kế hoạch phân tích không? Có báo cáo tất cả các biến đã đo không, hay chỉ khoe cái "đẹp"?

Bảng tra cứu nhanh:

| Cách diễn đạt | Đánh giá |
|---|---|
| "p = 0,03, tức giả thuyết đúng 97%" | **Sai.** p-value không phải xác suất giả thuyết đúng. |
| "Kết quả có ý nghĩa thống kê (p < 0,05)" | Đúng về mặt kỹ thuật, nhưng chưa nói hiệu ứng lớn hay nhỏ, quan trọng hay không. |
| "Thuốc giúp ngủ thêm 20 phút (khoảng tin cậy 95%: 5–35 phút)" | Tốt hơn: cho biết độ lớn và phạm vi các giá trị tương thích với dữ liệu. |
| "Nhóm nghiên cứu đã thử nhiều cách phân tích và chọn cách cho kết quả tốt nhất" | Dấu hiệu p-hacking: nên dè dặt với kết quả. |

## Mức độ chắc chắn

:::vung-chac[p-value không phải xác suất giả thuyết đúng, và không đo độ lớn hay tầm quan trọng của hiệu ứng]
Đây là định nghĩa và nguyên tắc thống kê, không phải phát hiện thực nghiệm. Tuyên bố của ASA (2016) và bài hướng dẫn của Greenland và cộng sự (2016) cùng nêu điều này.
:::

:::kha-vung[p-hacking và báo cáo chọn lọc làm tăng khả năng có kết quả "có ý nghĩa" sai, và làm kết quả khó tái lập hơn]
Mô phỏng cho thấy các cách làm này làm tăng dương tính giả, và khảo sát cho thấy chúng khá phổ biến. Nhưng mức đóng góp của chúng vào tỉ lệ không tái lập quan sát được ở các dự án tái lập lớn chưa được đo trực tiếp.
:::

## Bài tập

### Thử một lần { #thu-mot-lan }

(Tình huống dưới đây là **giả định**, do site tự viết để luyện tập.) Một nhóm nghiên cứu thử một loại trà thảo mộc giúp giảm lo âu trên 40 người, chia ngẫu nhiên hai nhóm. Kết quả: nhóm uống trà giảm điểm lo âu nhiều hơn nhóm đối chứng, **p = 0,04**. Trưởng nhóm tuyên bố: "Có 96% chắc chắn trà này giảm lo âu. Hiệu quả đã được chứng minh."

Câu nào dưới đây là diễn giải **đúng** về p = 0,04?

A. Xác suất trà thực sự có tác dụng là 96%.
B. Nếu trà thực ra không có tác dụng gì, thì xác suất thu được chênh lệch lớn như thế này (hoặc lớn hơn) do ngẫu nhiên là khoảng 4%.
C. Kết quả này chứng minh trà giảm lo âu ở mọi người.
D. Vì p < 0,05 nên hiệu ứng chắc chắn lớn và quan trọng.

:::thu-gon[Xem đáp án]
**Đáp án đúng: B.**
- A **sai**: p-value không phải xác suất giả thuyết đúng. Đây là hiểu lầm thường gặp, và là nguyên tắc thứ hai của tuyên bố ASA 2016.
- C **sai**: một nghiên cứu nhỏ trên 40 người không thể "chứng minh" cho mọi người dùng trà. Xem thêm [Ai được hỏi thì kết quả mới đáng tin?](/psyche/bang-chung/mau-va-chon-mau/)
- D **sai**: p-value không đo độ lớn hay tầm quan trọng của hiệu ứng. Một hiệu ứng rất nhỏ vẫn có thể cho p < 0,05 nếu mẫu đủ lớn.
- B **đúng**: p-value là xác suất của dữ liệu (cực đoan như quan sát được, hoặc hơn), *với giả định* giả thuyết "không có tác dụng" là đúng.
:::

### Kiểm tra nhanh

```quiz
? Một nghiên cứu báo cáo p = 0,001. Điều nào đúng về hiệu ứng được nghiên cứu?
- Hiệu ứng chắc chắn lớn và quan trọng.
+ p-value không cho biết hiệu ứng lớn hay nhỏ, quan trọng hay không.
- Xác suất giả thuyết đúng là 99,9%.
> Theo nguyên tắc thứ năm của ASA, p-value hay ý nghĩa thống kê không đo độ lớn của hiệu ứng hay tầm quan trọng của kết quả. Nguyên tắc thứ hai nói p-value không phải xác suất giả thuyết đúng.
? Nghiên cứu A có p = 0,049, nghiên cứu B có p = 0,051. Cách đọc nào hợp lý nhất?
- A "thành công", B "thất bại", vì chỉ A vượt ngưỡng 0,05.
+ Bằng chứng của hai nghiên cứu gần giống nhau; ngưỡng 0,05 là quy ước, không nên để một ngưỡng duy nhất quyết định kết luận.
- Cả hai đều chứng minh giả thuyết.
> Nguyên tắc thứ ba của ASA: kết luận khoa học không nên chỉ dựa vào việc p-value có vượt một ngưỡng nhất định hay không.
? Điều nào dưới đây là dấu hiệu có thể của p-hacking?
- Đăng ký kế hoạch phân tích trước khi thu thập dữ liệu.
+ Đo nhiều biến kết quả rồi chỉ báo cáo những biến có p dưới 0,05.
- Báo cáo khoảng tin cậy cùng với p-value.
> Báo cáo chọn lọc những kết quả có p dưới 0,05 là một trong các cách làm đáng ngờ được khảo sát ở các nhà tâm lý học. Đăng ký trước kế hoạch và báo cáo đầy đủ là cách hạn chế vấn đề này.
```

## Thử suy ngẫm { #tu-suy-ngam }

1. Vì sao con số 0,05, một quy ước nêu từ năm 1925, lại có quyền lực lớn đến vậy ở một số lĩnh vực khoa học?
2. Nếu bạn là biên tập viên một tạp chí khoa học, bạn sẽ làm gì để giảm p-hacking? (Gợi ý: nghĩ về việc yêu cầu đăng ký kế hoạch nghiên cứu *trước* khi thu thập dữ liệu.)
3. Nếu một bản tin chỉ nêu p-value mà không nêu khoảng tin cậy, theo bạn điều gì quan trọng bị bỏ sót?
4. Tuyên bố của ASA nói kết luận khoa học không nên chỉ dựa vào việc p-value có vượt ngưỡng. Điều này thay đổi cách bạn đọc các tin "nghiên cứu chứng minh..." thế nào?

## Nguồn

- American Statistical Association. (2016, 7 tháng 3). *American Statistical Association releases statement on statistical significance and p-values* (thông cáo). <https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf>
- Fisher, R. A. (1925). *Statistical methods for research workers*. Oliver & Boyd, tr. 46–47. <https://psychclassics.yorku.ca/Fisher/Methods/chap3.htm>
- Greenland, S., Senn, S. J., Rothman, K. J., Carlin, J. B., Poole, C., Goodman, S. N., & Altman, D. G. (2016). Statistical tests, P values, confidence intervals, and power: A guide to misinterpretations. *European Journal of Epidemiology*, 31(4), 337–350. <https://doi.org/10.1007/s10654-016-0149-3>
- John, L. K., Loewenstein, G., & Prelec, D. (2012). Measuring the prevalence of questionable research practices with incentives for truth telling. *Psychological Science*, 23(5), 524–532. <https://doi.org/10.1177/0956797611430953>
- Nosek, B. A., et al. (2022). Replicability, robustness, and reproducibility in psychological science. *Annual Review of Psychology*, 73, 719–748. <https://doi.org/10.1146/annurev-psych-020821-114157>
- Spielman, R. M., et al. (2020). *Psychology 2e*, mục 2.3: Analyzing findings. OpenStax. <https://openstax.org/books/psychology-2e/pages/2-3-analyzing-findings>
- Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. *The American Statistician*, 70(2), 129–133. <https://doi.org/10.1080/00031305.2016.1154108>
