---
title: Gộp hàng trăm nghiên cứu lại thì được gì?
description: Phân tích tổng hợp (meta-analysis) gộp kết quả nhiều nghiên cứu thành một ước lượng chung. Cách đọc forest plot, hiểu độ lớn hiệu ứng gộp và nhận ra dấu hiệu thiên lệch xuất bản qua funnel plot.
sidebar:
  label: Gộp hàng trăm nghiên cứu lại thì được gì? Phân tích tổng hợp
in_duoc: true
---

*Phân tích tổng hợp (meta-analysis)*

## Một tin tức

> **"Hiệu ứng người ngoài cuộc: có thật không?"** — Nếu bạn hỏi câu này, một thí nghiệm đơn lẻ, dù nổi tiếng đến đâu, khó trả lời trọn vẹn. Gộp nhiều nghiên cứu lại là cách thường dùng để có một ước lượng chính xác hơn.

Năm 2011, Fischer và cộng sự gộp các nghiên cứu về hiệu ứng người ngoài cuộc mà họ tìm được, từ thập niên 1960 đến năm 2010: 105 hiệu ứng độc lập từ 53 bài báo, hơn 7.700 người tham gia. Con số chung họ tính ra là **g = −0,35** ([Fischer và cộng sự, 2011](https://doi.org/10.1037/a0023304)).

Một con số tóm tắt nhiều thập niên nghiên cứu. Kỹ thuật đằng sau con số đó có tên là **phân tích tổng hợp**. Nó không phải phép màu: tài liệu hướng dẫn của Cochrane nhấn mạnh rằng phân tích tổng hợp có thể gây hiểu lầm nghiêm trọng nếu thiếu chú ý đến thiết kế nghiên cứu, thiên lệch trong từng nghiên cứu, khác biệt giữa các nghiên cứu và thiên lệch khi báo cáo ([Cochrane Handbook, chương 10](https://training.cochrane.org/handbook/current/chapter-10)).

(Bạn có thể đọc thêm về thí nghiệm gốc của hiệu ứng này tại [Darley và Latané](/psyche/thi-nghiem/darley-latane/).)

## Khái niệm

### Phân tích tổng hợp là gì

**Phân tích tổng hợp** (*meta-analysis*) là kỹ thuật thống kê gộp **kết quả** của hai hay nhiều nghiên cứu riêng lẻ thành một ước lượng chung. Cách phổ biến là gộp kết quả đã tóm tắt của từng nghiên cứu (độ lớn hiệu ứng và sai số của nó), không phải gộp lại dữ liệu thô của từng người; cũng có loại phân tích dùng dữ liệu thô của từng người tham gia. Ước lượng chung là một trung bình có trọng số: ước lượng của nghiên cứu lớn, chính xác hơn được tính **nặng hơn** ước lượng của nghiên cứu nhỏ.

*Ví dụ giả định:* bạn muốn biết "uống trà xanh có giảm lo âu không", và có 20 nghiên cứu: 12 nghiên cứu nói có, 5 nói không, 3 nói "không rõ". Cách đếm xem bao nhiêu nghiên cứu "nói có" (đếm phiếu theo ý nghĩa thống kê) bị Cochrane Handbook coi là có hạn chế nghiêm trọng và không chấp nhận được ([chương 12](https://training.cochrane.org/handbook/current/chapter-12)). Phân tích tổng hợp thì quy kết quả của mỗi nghiên cứu về cùng một thước đo, gọi là **độ lớn hiệu ứng**, rồi tính trung bình có trọng số. Kết quả là một ước lượng chung kèm khoảng tin cậy: *nhìn chung, hiệu ứng lớn đến đâu, và ước lượng ấy chính xác đến mức nào.*

### Đọc forest plot trong một phút

Kết quả của phân tích tổng hợp thường được vẽ thành **forest plot** (biểu đồ rừng). Quy tắc đọc:

- **Mỗi dòng ngang là một nghiên cứu.** Điểm (khối vuông) là hiệu ứng nghiên cứu đó ước lượng; đường ngang hai bên là **khoảng tin cậy**, tức dải hiệu ứng tương thích với kết quả của nghiên cứu ấy.
- **Đường thẳng đứng ở số 0** là vạch "không có hiệu ứng". Nếu đường ngang của một nghiên cứu **cắt qua vạch 0**, "không có hiệu ứng" vẫn nằm trong các giá trị tương thích với kết quả của nghiên cứu đó: riêng nghiên cứu ấy chưa đủ để khẳng định có hiệu ứng, và cũng chưa đủ để khẳng định không có.
- **Hình thoi (kim cương) ở dòng cuối** là **ước lượng gộp**. Độ rộng của hình thoi cho biết ước lượng gộp chính xác đến đâu: càng hẹp, ước lượng càng chính xác.

```
Hiệu ứng →
        -0,8      -0,4        0        0,4       0,8
          |         |         |         |         |
Nghiêm 2001    █————●—————█
Trần 2005             █——————●—————█
Lê 2008       █————●—————█
GỘP                 █—◆———█
          |         |         |         |         |
                              ^ vạch 0: không hiệu ứng
```

*(Hình minh họa cách đọc, không phải dữ liệu thật.)* Trong hình trên: nghiên cứu của Trần cắt qua vạch 0, hai nghiên cứu còn lại nằm hẳn bên trái vạch 0, và hình thoi gộp cũng nằm hẳn bên trái, hẹp hơn các nghiên cứu riêng lẻ. Kết luận từ hình: ước lượng gộp cho thấy hiệu ứng theo hướng âm.

### Độ lớn hiệu ứng gộp: con số −0,35 nghĩa là gì

Quay lại ví dụ thật: Fischer và cộng sự (2011) tính ra **g = −0,35** cho hiệu ứng người ngoài cuộc (mô hình hiệu ứng cố định). Đọc con số này thế nào:

- **g** là chênh lệch trung bình giữa hai nhóm, chia cho độ lệch chuẩn (có hiệu chỉnh cho mẫu nhỏ). Ở đây là nhóm có người khác chứng kiến trừ nhóm không có, nên **dấu âm (−)** nghĩa là có người khác chứng kiến thì người ta giúp ít hơn: đúng hướng lý thuyết dự đoán. Dấu chỉ cho biết *chiều*, không phải "xấu".
- **Độ lớn:** theo quy ước của Cohen (1988), khoảng 0,2 gọi là nhỏ, 0,5 là trung bình; Fischer và cộng sự gọi g = −0,35 là hiệu ứng "nhỏ đến vừa". Các mốc này mang tính quy ước, không nên áp dụng cứng nhắc ([Lakens, 2013](https://doi.org/10.3389/fpsyg.2013.00863)).
- **g không phải là xác suất.** g = −0,35 không có nghĩa là "35% người sẽ bỏ đi".

Muốn hiểu sâu hơn về các mốc này, xem [Hiệu ứng lớn hay nhỏ?](/psyche/bang-chung/do-lon-hieu-ung/).

Một chi tiết từ chính phân tích này: hiệu ứng **yếu đi** khi tình huống được cảm nhận là nguy hiểm, khi có kẻ gây hại có mặt, và khi cái giá của việc can thiệp là rủi ro thể chất. Trong một số tình huống nguy hiểm, có thêm người chứng kiến thậm chí đi kèm với giúp đỡ nhiều hơn. Phân tích tổng hợp không chỉ cho một con số chung, mà còn cho thấy **khi nào** hiệu ứng mạnh, khi nào yếu. Lưu ý: đây là so sánh giữa các nghiên cứu được mã hóa lại, không phải thí nghiệm mới cho riêng từng yếu tố.

### Tính không đồng nhất: các nghiên cứu không giống hệt nhau

Các hiệu ứng trong phân tích của Fischer đến từ nhiều thập niên nghiên cứu và nhiều loại tình huống, từ làm rơi bút đến một vụ trộm có kẻ gây hại có mặt. Chúng không cho ra cùng một con số. Sự dao động giữa các nghiên cứu gọi là **tính không đồng nhất** (*heterogeneity*).

Một phần dao động là do may rủi lấy mẫu. Nếu dao động **lớn hơn mức may rủi có thể giải thích**, đó là dấu hiệu rằng các nghiên cứu không cùng ước lượng một hiệu ứng: có thể do khác biệt về người tham gia, tình huống hay phương pháp. Trong phân tích của Fischer, kiểm định cho thấy dao động vượt mức may rủi, và các tác giả đi tìm các yếu tố điều chỉnh như mức nguy hiểm ở trên. Tính không đồng nhất, vì vậy, không phải lỗi: nó có thể là **manh mối**. Nhưng việc tìm nguyên nhân của nó là so sánh giữa các nghiên cứu, nên cần thận trọng khi đọc.

### Thiên lệch xuất bản và funnel plot

Các nghiên cứu có kết quả "có ý nghĩa thống kê" dễ được công bố, dễ được tìm thấy hơn các nghiên cứu có kết quả "không có ý nghĩa thống kê" ([Cochrane Handbook, chương 13](https://training.cochrane.org/handbook/current/chapter-13)). Phân tích tổng hợp có một công cụ để *soi* hiện tượng này: **funnel plot** (biểu đồ phễu).

Cách đọc: mỗi chấm là một nghiên cứu, trục ngang là hiệu ứng đo được, trục dọc là độ chính xác (nghiên cứu càng lớn, chấm càng cao). Nghiên cứu nhỏ cho ước lượng dao động rộng hơn, nên nếu mọi thứ bình thường, các chấm xếp thành hình **phễu đối xứng**: nghiên cứu lớn chụm lại gần đáp án ở đỉnh phễu, nghiên cứu nhỏ tỏa rộng ở đáy phễu.

Nếu **một góc đáy phễu trống**, ví dụ thiếu các nghiên cứu nhỏ không có ý nghĩa thống kê, thì có thể các nghiên cứu đó đã được làm nhưng chưa được công bố. Khi đó ước lượng gộp có xu hướng **phóng đại** hiệu ứng. Nhưng phễu lệch chỉ là một dấu hiệu: nó cũng có thể do các lý do khác ngoài thiên lệch xuất bản (Cochrane gọi chung là hiệu ứng nghiên cứu nhỏ). Trong phân tích của Fischer, đồ thị phễu tương đối đối xứng, và thử trim-and-fill không đổi ước lượng.

::hinh{ten="funnel-demo"}

## Cách nhận ra

Gặp một phân tích tổng hợp (trên báo hay trong tài liệu), hãy đọc lướt theo bảng này:

| Nhìn vào | Hỏi |
|---|---|
| Số nghiên cứu và tổng số người tham gia | Gộp càng nhiều dữ liệu, ước lượng càng chính xác. Nhưng khi chỉ có vài nghiên cứu nhỏ, mức dao động giữa các nghiên cứu được ước lượng rất kém và khoảng tin cậy có thể sai. |
| Độ lớn hiệu ứng gộp và khoảng tin cậy | Khoảng tin cậy có **cắt qua vạch 0** không? Nếu có, ước lượng gộp chưa loại trừ được "không có hiệu ứng". |
| Tính không đồng nhất | Các nghiên cứu có quá khác nhau không? Cochrane khuyến nghị chỉ gộp khi người tham gia, can thiệp và kết quả đo đủ giống nhau để cho một con số có nghĩa. |
| Funnel plot | Phễu có đối xứng không, hay khuyết một góc? Phễu lệch chưa chứng minh có thiên lệch xuất bản. |
| Kế hoạch phân tích | Câu hỏi, tiêu chí chọn nghiên cứu và các phân tích nhóm con có được định trước trong đề cương không? Cochrane khuyến nghị định trước các phân tích nhóm con. |

Và một nguyên tắc: **phân tích tổng hợp chỉ tốt bằng các nghiên cứu nó gộp vào và cách chọn chúng**. Theo Cochrane, kết quả có thể gây hiểu lầm nếu thiếu chú ý đến câu hỏi, tiêu chí chọn nghiên cứu, thiên lệch trong từng nghiên cứu và các bước khác trước khi gộp.

## Mức độ chắc chắn

:::vung-chac[Phân tích tổng hợp gộp kết quả theo trọng số, và kết luận chỉ đáng tin bằng chất lượng các nghiên cứu được gộp]
Đây là nguyên tắc phương pháp, không phải phát hiện thực nghiệm, nên nhãn dựa trên đồng thuận của tài liệu hướng dẫn: Cochrane Handbook (chương 10, 12, 13) nêu cùng những điều này.
:::

:::kha-vung[Fischer và cộng sự (2011): hiệu ứng người ngoài cuộc có độ lớn gộp g = −0,35, và yếu đi khi nguy hiểm rõ ràng]
Đây là một phân tích tổng hợp dựa trên mã hóa lại các nghiên cứu cũ, không phải thí nghiệm mới cho từng yếu tố điều chỉnh; các biến điều chỉnh còn tương quan với nhau. Đây cũng là mức mà trang [Darley và Latané](/psyche/thi-nghiem/darley-latane/) dùng cho phát hiện "khi nguy hiểm rõ ràng, hiệu ứng yếu đi".
:::

## Bài tập

### Thử một lần { #thu-mot-lan }

*Forest plot dưới đây là **giả định hoàn toàn**, do site tự viết để luyện tập. Tình huống: ba nghiên cứu về câu hỏi "uống trà xanh có giảm lo âu không" (hiệu ứng dương = có giảm lo âu).*

```
Hiệu ứng →
            -0,2    0    0,2   0,4   0,6   0,8   1,0
              |     |     |     |     |     |     |
A, n=200             █——————●——————█
B, n=40          █————————————————●———————————————█
C, n=150    █———————●———————█
GỘP                 █————◆————█
              |     |     |     |     |     |     |
                    ^ vạch 0: không hiệu ứng
```

Dựa vào hình, bạn rút ra kết luận gì? (Gợi ý: xem từng nghiên cứu, rồi nhìn hình thoi gộp.)

:::thu-gon[Xem đáp án]
Kết luận **thận trọng**: bằng chứng còn yếu và chưa chắc.

- **Nghiên cứu A** (lớn nhất, 200 người): hiệu ứng dương nhỏ, khoảng tin cậy hẹp nhất trong ba nghiên cứu và **không** chạm vạch 0, nhưng khoảng tin cậy chỉ vừa nhích khỏi vạch 0.
- **Nghiên cứu B** (nhỏ, 40 người): điểm hiệu ứng lớn nhất ba nghiên cứu, nhưng khoảng tin cậy **rất rộng và cắt qua vạch 0**: chưa đủ để khẳng định gì. Nghiên cứu nhỏ cho ước lượng dao động rộng hơn, nên một con số "khủng" từ nghiên cứu nhỏ cần dè dặt.
- **Nghiên cứu C** (150 người): hiệu ứng gần bằng 0, khoảng tin cậy cắt qua vạch 0 ở cả hai phía.
- **Hình thoi gộp:** hiệu ứng gộp dương nhưng **nhỏ**, và khoảng tin cậy **chạm sát vạch 0**: ước lượng chung chưa chắc.

Ba nghiên cứu cho ba con số khác nhau, nhưng các khoảng tin cậy chồng lên nhau nhiều, nên hình này chưa cho thấy dao động vượt mức may rủi. Kết luận hợp lý không phải "trà xanh giảm lo âu", cũng không phải "trà xanh vô tác dụng": khi khoảng tin cậy rộng và bao gồm cả "không có hiệu ứng", nhầm "chưa có bằng chứng về hiệu ứng" với "có bằng chứng là không có hiệu ứng" là một lỗi thường gặp. Một tin tức chỉ đưa tin nghiên cứu B ("uống trà xanh giảm lo âu rõ rệt!") sẽ ưu ái một nghiên cứu hơn các nghiên cứu còn lại mà không có lý do chính đáng.
:::

### Kiểm tra nhanh

```quiz
? Trên một forest plot, đường ngang của một nghiên cứu cắt qua vạch 0. Điều này nói gì?
- Nghiên cứu đó chắc chắn sai nên bị loại khỏi phân tích.
+ "Không có hiệu ứng" vẫn nằm trong các giá trị tương thích với kết quả của nghiên cứu đó, nên riêng nó chưa đủ để khẳng định có hiệu ứng.
- Hiệu ứng thật chắc chắn bằng đúng 0.
> Đường ngang là khoảng tin cậy, dải hiệu ứng tương thích với kết quả của nghiên cứu. Khi nó chứa giá trị không hiệu ứng, kết quả chưa loại trừ được "không có hiệu ứng", nhưng cũng không chứng minh được rằng hiệu ứng bằng 0.
? Vì sao trong tính trung bình có trọng số, nghiên cứu lớn thường được tính nặng hơn nghiên cứu nhỏ?
- Vì nghiên cứu lớn luôn được thiết kế tốt hơn.
+ Vì nghiên cứu lớn cho ước lượng chính xác hơn, tức sai số chuẩn nhỏ hơn.
- Vì nghiên cứu lớn có nhiều tác giả hơn.
> Với phương pháp phương sai nghịch đảo, trọng số của mỗi nghiên cứu tỉ lệ nghịch với phương sai của ước lượng, nên nghiên cứu có sai số chuẩn nhỏ (thường là nghiên cứu lớn) được tính nặng hơn.
? Một funnel plot bị khuyết một góc ở đáy phễu. Cách hiểu nào hợp lý nhất?
- Chứng minh chắc chắn rằng có thiên lệch xuất bản.
- Chứng tỏ ước lượng gộp chắc chắn là đúng.
+ Có thể do thiếu các nghiên cứu nhỏ chưa được công bố, nhưng cũng có thể do các lý do khác; cần xem xét thêm.
> Cochrane mô tả phễu lệch như dấu hiệu của hiệu ứng nghiên cứu nhỏ, có thể do thiên lệch báo cáo nhưng cũng có thể do các lý do khác.
```

## Thử suy ngẫm { #tu-suy-ngam }

1. Một phân tích tổng hợp gộp 100 nghiên cứu nhưng toàn nghiên cứu mẫu nhỏ, không có kế hoạch định trước, thì đáng tin đến mức nào? Con số gộp có che giấu được chất lượng kém không?
2. Funnel plot khuyết một góc có thể gợi ý các nghiên cứu nhỏ, không có kết quả nổi bật, chưa được công bố. Ngoài khoa học, bạn có thấy hiện tượng "chỉ khoe thành công, giấu thất bại" ở đâu trong đời sống? Hệ quả của nó là gì?
3. Phân tích của Fischer cho thấy hiệu ứng người ngoài cuộc yếu đi trong tình huống nguy hiểm. Điều này gợi ý gì về cách áp dụng một "quy luật tâm lý" vào đời thực: có nên áp dụng y nguyên mọi tình huống không?
4. Nếu bạn phải quyết định một việc quan trọng (chọn trường, chọn phương pháp học) dựa trên "nhiều người nói", bạn sẽ "gộp" các ý kiến đó như thế nào để không bị một ý kiến cực đoan nhưng ồn ào chi phối?

## Nguồn

- Fischer, P., Krueger, J. I., Greitemeyer, T., Vogrincic, C., Kastenmüller, A., Frey, D., Heene, M., Wicher, M., & Kainbacher, M. (2011). The bystander-effect: A meta-analytic review on bystander intervention in dangerous and non-dangerous emergencies. *Psychological Bulletin*, 137(4), 517–537. <https://doi.org/10.1037/a0023304>
- Higgins, J. P. T., et al. (Eds.). *Cochrane Handbook for Systematic Reviews of Interventions*, chương 10 (Analysing data and undertaking meta-analyses), chương 12 (Synthesizing and presenting findings using other methods), chương 13 (Assessing risk of bias due to missing evidence in a synthesis), chương 15 (Interpreting results and drawing conclusions). <https://training.cochrane.org/handbook/current>
- Lakens, D. (2013). Calculating and reporting effect sizes to facilitate cumulative science: A practical primer for t-tests and ANOVAs. *Frontiers in Psychology*, 4, 863. <https://doi.org/10.3389/fpsyg.2013.00863>
