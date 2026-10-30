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

*Ví dụ trên là **giả định**, nhưng hiểu lầm đằng sau nó thì có thật — và phổ biến đến mức năm 2016, Hiệp hội Thống kê Hoa Kỳ (ASA) phải ra một tuyên bố chính thức chỉ để nói: mọi người đang hiểu sai p-value.*

Tuyên bố do Ronald L. Wasserstein và Nicole A. Lazar soạn thảo, đăng trên tạp chí *The American Statistician*, số 70(2), trang 129–133 ([Wasserstein & Lazar, 2016](https://doi.org/10.1080/00031305.2016.1154108)). Đây là lần đầu tiên trong lịch sử hiệp hội có một tuyên bố chính thức về cách dùng và cách hiểu p-value — một dấu hiệu cho thấy vấn đề đã nghiêm trọng đến mức nào. Tuyên bố nêu sáu nguyên tắc, mà ý chính có thể tóm gọn: p-value không trả lời những câu hỏi mà người ta vẫn tưởng nó trả lời.

## Khái niệm

### p-value thực ra là gì

Hãy tưởng tượng bạn tung một đồng xu 10 lần và được 9 lần ngửa. Đồng xu có gian lận không?

Cách nghĩ đúng đắn không phải "đồng xu gian lận với xác suất bao nhiêu", mà là: **giả sử đồng xu hoàn toàn công bằng**, thì chuyện tung 10 lần mà được từ 9 lần ngửa trở lên hiếm đến mức nào? Tính ra: trong 1024 khả năng đều nhau, có 10 cách được đúng 9 ngửa và 1 cách được 10 ngửa — tổng 11/1024, khoảng **1,1%**.

Con số 1,1% đó chính là một p-value: **xác suất thu được kết quả "lạ" như thế này (hoặc lạ hơn), nếu giả thuyết "không có gì đặc biệt" là đúng.**

Nói gọn theo cách của ASA: p-value cho biết dữ liệu *không tương thích* đến mức nào với một mô hình đã định trước (ở đây là mô hình "đồng xu công bằng").

### Hiểu lầm lớn nhất

**p-value KHÔNG phải xác suất giả thuyết đúng.** Đây là hiểu lầm phổ biến nhất, và là điều tuyên bố ASA 2016 nhấn mạnh đầu tiên.

Quay lại ví dụ tung xu: p = 1,1% **không** có nghĩa là "xác suất đồng xu công bằng chỉ là 1,1%". Nó có nghĩa là: *nếu* đồng xu công bằng, thì kết quả 9/10 ngửa là chuyện hiếm (1,1%). Hai câu này khác nhau hoàn toàn:

- Câu sai: nói về **đồng xu** ("đồng xu công bằng với xác suất 1,1%").
- Câu đúng: nói về **dữ liệu trong một điều kiện giả định** ("nếu đồng xu công bằng, dữ liệu này hiếm đến mức 1,1%").

Vì sao ai cũng nhầm? Vì bộ não ta muốn biết "giả thuyết có đúng không", nhưng p-value chỉ trả lời "dữ liệu có lạ không, nếu giả thuyết đúng". Muốn trả lời câu hỏi thứ nhất cần thêm nhiều thông tin khác mà một mình p-value không có.

Tương tự, p = 0,03 trong quảng cáo thuốc không có nghĩa là "thuốc hiệu quả với xác suất 97%", cũng không có nghĩa "chỉ có 3% là do ngẫu nhiên". Nó chỉ có nghĩa: nếu thuốc thực ra vô tác dụng, thì chênh lệch quan sát được là chuyện hiếm ở mức 3%.

### Khoảng tin cậy: câu hỏi hay hơn "có hay không"

Thay vì chỉ hỏi "có ý nghĩa thống kê không", ta có thể hỏi một câu hữu ích hơn: **"hiệu ứng lớn cỡ nào?"** Câu trả lời là **khoảng tin cậy** (confidence interval).

Ví dụ: một thử nghiệm cho thấy thuốc mới giúp người ta ngủ thêm trung bình 20 phút, với khoảng tin cậy 95% từ 5 đến 35 phút. Đọc như sau:

- Ước lượng tốt nhất: thêm 20 phút.
- Khoảng từ 5 đến 35 phút là vùng "hợp lý" cho hiệu ứng thật — các giá trị nằm trong khoảng này đều tương thích khá tốt với dữ liệu.
- Nếu khoảng này **không chứa số 0** (như ở đây), kết quả được gọi là "có ý nghĩa thống kê ở mức 5%" — đó chính là mối liên hệ với p < 0,05.

Điểm hay của khoảng tin cậy: nó cho thấy cả **hướng, độ lớn và độ chắc chắn** của hiệu ứng. Trong khi đó p-value chỉ cho một phán quyết "có/không" khô khan: hai nghiên cứu cùng p = 0,03 có thể ẩn sau một hiệu ứng to đùng hoặc một hiệu ứng nhỏ xíu không đáng kể.

### Con số 0,05 từ đâu ra?

0,05 không phải chân lý toán học. Đó là một **quy ước** có từ những năm 1920, do nhà thống kê Ronald Fisher đề xuất như một ngưỡng tiện lợi, rồi dần thành "luật bất thành văn": p < 0,05 thì được công bố, p > 0,05 thì khó công bố.

Hệ quả là cả một hệ thống khoa học bắt đầu "săn" con số 0,05 — và đó là cửa ngõ của p-hacking. ASA nhấn mạnh: kết luận khoa học không nên chỉ dựa vào việc p-value có vượt qua một ngưỡng cụ thể hay không. p = 0,049 và p = 0,051 gần như giống nhau về mặt bằng chứng, nhưng một bên được gọi là "thành công", bên kia là "thất bại" — thật vô lý nếu ranh giới mong manh ấy quyết định số phận một nghiên cứu.

### p-hacking là gì

**p-hacking** là việc thử đi thử lại nhiều cách phân tích cho đến khi p-value "rơi" xuống dưới 0,05, rồi chỉ báo cáo cách phân tích "thành công". Một vài chiêu phổ biến:

- Thu thập thêm người tham gia cho đến khi kết quả "đẹp", rồi dừng lại đúng lúc.
- Đo 10 biến kết quả, chỉ báo cáo 2 biến có p < 0,05, lặng lẽ bỏ 8 biến còn lại.
- Loại bỏ vài điểm dữ liệu "ngoại lệ" cho đến khi đạt ngưỡng.
- Thử nhiều cách chia nhóm, nhiều mô hình, chỉ giữ lại cái cho kết quả tốt nhất.

Vì sao nguy hiểm? Mỗi lần thử thêm là một lần "tung xúc xắc" nữa. Thử đủ nhiều, kiểu gì cũng có lần ra kết quả "có ý nghĩa" — dù thực tế chẳng có hiệu ứng gì. Các kết quả p-hacking trông giống hệt kết quả thật trên giấy, nhưng không tái lập được khi người khác làm lại.

Đây chính là tinh thần nguyên tắc thứ tư của ASA: suy luận đúng đòi hỏi **báo cáo đầy đủ và minh bạch** — đã thử bao nhiêu cách, đã đo bao nhiêu biến, phải nói hết ra.

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
| "Thuốc giúp ngủ thêm 20 phút (khoảng tin cậy 95%: 5–35 phút)" | Tốt — cho biết độ lớn và độ chắc chắn của hiệu ứng. |
| "Nhóm nghiên cứu đã thử nhiều cách phân tích và chọn cách cho kết quả tốt nhất" | Dấu hiệu p-hacking — kết quả khó tin được. |

## Thử một lần

(Tình huống dưới đây là **giả định**, do site tự viết để luyện tập.) Một nhóm nghiên cứu thử một loại trà thảo mộc giúp giảm lo âu trên 40 người, chia ngẫu nhiên hai nhóm. Kết quả: nhóm uống trà giảm điểm lo âu nhiều hơn nhóm đối chứng, **p = 0,04**. Trưởng nhóm tuyên bố: "Có 96% chắc chắn trà này giảm lo âu. Hiệu quả đã được chứng minh."

Câu nào dưới đây là diễn giải **đúng** về p = 0,04?

A. Xác suất trà thực sự có tác dụng là 96%.
B. Nếu trà thực ra không có tác dụng gì, thì xác suất thu được chênh lệch lớn như thế này (hoặc lớn hơn) do ngẫu nhiên là khoảng 4%.
C. Kết quả này chứng minh trà giảm lo âu ở mọi người.
D. Vì p < 0,05 nên hiệu ứng chắc chắn lớn và quan trọng.

:::thu-gon[Xem đáp án]
**Đáp án đúng: B.**
- A **sai**: p-value không phải xác suất giả thuyết đúng — đây là hiểu lầm phổ biến nhất, và là điều tuyên bố ASA 2016 nhấn mạnh đầu tiên.
- C **sai**: một nghiên cứu nhỏ trên 40 người không thể "chứng minh" cho mọi người dùng trà. Xem thêm [Ai được hỏi thì kết quả mới đáng tin?](/psyche/bang-chung/mau-va-chon-mau/)
- D **sai**: p-value không đo độ lớn hay tầm quan trọng của hiệu ứng — một hiệu ứng nhỏ xíu vẫn có thể cho p < 0,05 nếu mẫu đủ lớn.
- B **đúng**: p-value là xác suất của dữ liệu (cực đoan như quan sát được, hoặc hơn), *với giả định* giả thuyết "không có tác dụng" là đúng.
:::

## Tự suy ngẫm

1. Vì sao con số 0,05 — một quy ước từ những năm 1920 — lại có quyền lực lớn đến vậy trong khoa học hiện đại?
2. Nếu bạn là biên tập viên một tạp chí khoa học, bạn sẽ làm gì để giảm p-hacking? (Gợi ý: nghĩ về việc yêu cầu đăng ký kế hoạch nghiên cứu *trước* khi thu thập dữ liệu.)
3. Khoảng tin cậy cho biết độ lớn và độ chắc chắn của hiệu ứng, trong khi p-value chỉ cho "có/không". Theo bạn, vì sao báo chí vẫn thích đưa tin p-value hơn?
4. Tuyên bố của ASA nói kết luận khoa học không nên chỉ dựa vào việc p-value có vượt ngưỡng. Điều này thay đổi cách bạn đọc các tin "nghiên cứu chứng minh..." thế nào?

## Nguồn

- Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. *The American Statistician*, 70(2), 129–133. <https://doi.org/10.1080/00031305.2016.1154108>
