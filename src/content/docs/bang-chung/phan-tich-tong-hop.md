---
title: Gộp hàng trăm nghiên cứu lại thì được gì?
description: Phân tích tổng hợp (meta-analysis) gộp kết quả nhiều nghiên cứu thành một con số. Cách đọc forest plot, hiểu độ lớn hiệu ứng gộp và phát hiện thiên lệch xuất bản qua funnel plot.
sidebar:
  label: Gộp hàng trăm nghiên cứu lại thì được gì? Phân tích tổng hợp
in_duoc: true
---

*Phân tích tổng hợp (meta-analysis)*

## Một tin tức

> **"Hiệu ứng người ngoài cuộc: có thật không?"** — Nếu bạn hỏi câu này, câu trả lời đáng tin nhất không đến từ một thí nghiệm đơn lẻ, dù thí nghiệm đó nổi tiếng đến đâu.

Năm 2011, một nhóm nghiên cứu đã làm điều mà không thí nghiệm đơn lẻ nào làm được: họ **gộp toàn bộ** các nghiên cứu về hiệu ứng người ngoài cuộc từ những năm 1960 đến năm 2010 — hơn 7.700 người tham gia, 105 hiệu ứng độc lập — rồi tính ra một con số chung: **g = −0,35** ([Fischer và cộng sự, 2011](https://doi.org/10.1037/a0023304)).

Một con số duy nhất, tóm tắt 50 năm nghiên cứu. Nghe có vẻ như phép màu thống kê — và đúng là nó gần như vậy. Kỹ thuật đằng sau con số đó có tên là **phân tích tổng hợp**, và một khi biết đọc nó, bạn sẽ có thêm một "kính lúp" cực mạnh để nhìn vào bất kỳ lĩnh vực nào của tâm lý học.

(Bạn có thể đọc thêm về thí nghiệm gốc của hiệu ứng này tại [Darley và Latané](/psyche/thi-nghiem/darley-latane/).)

## Khái niệm

### Phân tích tổng hợp là gì

**Phân tích tổng hợp** (*meta-analysis*) là kỹ thuật gộp **kết quả** của nhiều nghiên cứu độc lập về cùng một câu hỏi thành một ước lượng chung. Lưu ý: gộp kết quả, không phải gộp dữ liệu thô. Mỗi nghiên cứu đóng góp một "phiếu bầu" — và phiếu của nghiên cứu lớn, chính xác được tính **nặng ký hơn** phiếu của nghiên cứu nhỏ.

Hãy tưởng tượng bạn muốn biết "uống trà xanh có giảm lo âu không". Có 20 nghiên cứu: 12 nghiên cứu nói có, 5 nói không, 3 nói "không rõ". Đếm số nghiên cứu thì rối. Phân tích tổng hợp làm việc thông minh hơn: nó quy mỗi nghiên cứu về cùng một thước đo — gọi là **độ lớn hiệu ứng** — rồi tính trung bình có trọng số. Kết quả là một con số duy nhất trả lời: *nhìn chung, hiệu ứng lớn đến đâu, và chúng ta chắc chắn đến mức nào.*

### Đọc forest plot trong một phút

Kết quả của phân tích tổng hợp thường được vẽ thành **forest plot** (biểu đồ rừng) — trông đáng sợ nhưng đọc rất dễ một khi biết quy tắc:

- **Mỗi dòng ngang là một nghiên cứu.** Điểm vuông ở giữa là hiệu ứng nghiên cứu đó đo được; đường ngang hai bên là **khoảng tin cậy** (vùng mà hiệu ứng "thật" nhiều khả năng nằm trong đó).
- **Đường thẳng đứng ở số 0** là vạch "không có hiệu ứng". Nếu đường ngang của một nghiên cứu **cắt qua vạch 0**, nghĩa là nghiên cứu đó chưa đủ bằng chứng để khẳng định hiệu ứng tồn tại.
- **Hình thoi (kim cương) ở dòng cuối** là **ước lượng gộp** — đáp án chung của tất cả nghiên cứu. Hình thoi càng hẹp, đáp án càng chắc chắn.

```
Hiệu ứng →
     -0,8      -0,4       0        0,4       0,8
       |         |        |         |         |
Nghiêm 2001           █—————●—————█
Trần 2005                    █———●—————█
Lê 2008               █————————●——█
GỘP                          ◆
       |         |        |         |         |
                     (vạch 0: không hiệu ứng)
```

*(Hình minh họa cách đọc, không phải dữ liệu thật.)* Trong hình trên: nghiên cứu của Trần cắt qua vạch 0 (chưa chắc chắn), hai nghiên cứu còn lại nằm hẳn bên trái vạch 0, và hình thoi gộp cũng nằm bên trái — kết luận chung: hiệu ứng tồn tại theo hướng âm.

### Độ lớn hiệu ứng gộp: con số −0,35 nghĩa là gì

Quay lại ví dụ thật: phân tích tổng hợp của Fischer và cộng sự (2011) cho hiệu ứng người ngoài cuộc là **g = −0,35**. Đọc con số này thế nào, không cần toán nặng:

- **Dấu âm (−):** hiệu ứng đi đúng hướng như lý thuyết nói — càng đông người chứng kiến, mỗi cá nhân càng *ít* có xu hướng giúp đỡ. Dấu chỉ cho biết *chiều*, không phải "xấu".
- **0,35 là cỡ vừa-phải:** trong tâm lý học, quanh 0,2 thường được xem là nhỏ, quanh 0,5 là trung bình. Vậy −0,35 nằm giữa: **hiệu ứng có thật, rõ ràng, nhưng không phải lúc nào cũng xảy ra**.

Nói bằng ngôn ngữ đời thường: nếu lấy hai tình huống khẩn cấp giống hệt nhau — một nơi chỉ có một người chứng kiến, một nơi có nhiều người — thì người ở một mình **có khả năng giúp đỡ cao hơn ở mức vừa phải**. Không phải "chắc chắn giúp", cũng không phải "chắc chắn làm ngơ". Đó chính là giá trị của con số: nó thay thế những tuyên bố tuyệt đối ("đông người thì không ai giúp!") bằng một bức tranh có sắc thái. (Muốn hiểu sâu hơn về các ngưỡng này, xem [Hiệu ứng lớn hay nhỏ?](/psyche/bang-chung/do-lon-hieu-ung/).)

Một chi tiết thú vị từ chính phân tích này: hiệu ứng **yếu đi** trong các tình huống được cảm nhận là nguy hiểm — khi tình huống rõ ràng là khẩn cấp thật sự, người ta giúp đỡ nhiều hơn bất kể đông hay ít người chứng kiến. Phân tích tổng hợp không chỉ cho một con số chung, mà còn giúp tìm ra **khi nào** hiệu ứng mạnh, khi nào yếu.

### Tính không đồng nhất: các nghiên cứu không giống hệt nhau

105 hiệu ứng trong phân tích của Fischer đến từ 50 năm nghiên cứu, ở nhiều quốc gia, với đủ loại tình huống — từ nhặt bút rơi đến can thiệp vào vụ cướp. Đương nhiên chúng không cho ra cùng một con số. Sự dao động này gọi là **tính không đồng nhất** (*heterogeneity*).

Một phần dao động là ngẫu nhiên — chuyện bình thường. Nhưng nếu dao động **lớn hơn hẳn** mức ngẫu nhiên có thể giải thích, đó là tín hiệu: có yếu tố nào đó đang điều chỉnh hiệu ứng. Các nhà phân tích tổng hợp lúc này đi tìm "thủ phạm" — ví dụ như mức độ nguy hiểm ở trên. Tính không đồng nhất, vì vậy, không phải là lỗi: nó là **manh mối**.

### Thiên lệch xuất bản và funnel plot

Nhớ "ngăn kéo hồ sơ" chứ — các nghiên cứu cho kết quả "không có gì" thường không được đăng? Phân tích tổng hợp có một công cụ để *soi* ra hiện tượng này: **funnel plot** (biểu đồ phễu).

Cách đọc: mỗi chấm là một nghiên cứu, trục ngang là hiệu ứng đo được, trục dọc là độ chính xác (nghiên cứu càng lớn, chấm càng cao). Nếu mọi thứ bình thường, các chấm xếp thành hình **phễu đối xứng**: nghiên cứu lớn chụm lại gần đáp án đúng ở đỉnh phễu, nghiên cứu nhỏ tỏa rộng ở đáy phễu — tỏa đều cả hai bên.

Nhưng nếu **một bên của đáy phễu trống trơn** — ví dụ thiếu hẳn các nghiên cứu nhỏ cho hiệu ứng âm hoặc bằng 0 — thì rất có thể những nghiên cứu đó đã được làm nhưng không được đăng. Phễu bị khuyết một bên là dấu hiệu cảnh báo: con số gộp có thể đang bị **thổi phồng** vì chỉ tính những nghiên cứu "đẹp".

::hinh{ten="funnel-demo"}

## Cách nhận ra

Gặp một phân tích tổng hợp (trên báo hay trong tài liệu), hãy đọc lướt theo checklist này — chỉ mất hai phút:

| Nhìn vào | Hỏi |
|---|---|
| Số nghiên cứu và tổng số người tham gia | Càng nhiều càng tốt. Vài nghiên cứu nhỏ gộp lại vẫn là bằng chứng yếu. |
| Độ lớn hiệu ứng gộp và khoảng tin cậy | Khoảng tin cậy có **cắt qua vạch 0** không? Nếu có, đáp án chung còn chưa chắc chắn. |
| Tính không đồng nhất | Các nghiên cứu có quá khác nhau không? Tác giả có giải thích được vì sao không? |
| Funnel plot | Phễu có đối xứng không, hay khuyết một bên? |
| Ai làm, đăng ở đâu, có đăng ký trước không | Phân tích tổng hợp cũng có thể bị "đào bới" — kế hoạch cần được khóa trước. |

Và một nguyên tắc vàng: **phân tích tổng hợp chỉ tốt bằng các nghiên cứu nó gộp vào**. Gộp 50 nghiên cứu dở không cho ra một kết luận hay — người ta gọi đùa là "rác vào, rác ra".

## Thử một lần

*Forest plot dưới đây là **giả định hoàn toàn**, do site tự viết để luyện tập. Tình huống: bốn nghiên cứu về câu hỏi "uống trà xanh có giảm lo âu không" (hiệu ứng dương = có giảm lo âu).*

```
Hiệu ứng →
     -0,4      -0,2       0        0,2       0,4
       |         |        |         |         |
A (200 người)                    █——●———█
B (40 người)                          █—————●——————█
C (150 người)                    █—●—█
GỘP                              █———◆———█
       |         |        |         |         |
                     (vạch 0: không hiệu ứng)
```

Dựa vào hình, bạn rút ra kết luận gì? (Gợi ý: xem từng nghiên cứu, rồi nhìn hình thoi gộp.)

:::thu-gon[Xem đáp án]
Kết luận **thận trọng**: bằng chứng còn yếu và chưa nhất quán.

- **Nghiên cứu A** (lớn nhất, 200 người): hiệu ứng dương nhỏ, khoảng tin cậy **không** chạm vạch 0 — đây là bằng chứng tốt nhất, nhưng hiệu ứng chỉ ở mức nhỏ.
- **Nghiên cứu B** (nhỏ, 40 người): hiệu ứng trông rất lớn, nhưng khoảng tin cậy **rộng và cắt qua vạch 0** — chưa đủ bằng chứng khẳng định gì. Nghiên cứu nhỏ cho hiệu ứng "khủng" chính là kiểu kết quả hay bị thổi phồng do may rủi.
- **Nghiên cứu C** (khá lớn, 150 người): hiệu ứng gần bằng 0, khoảng tin cậy hẹp quanh vạch 0 — gợi ý "không có gì xảy ra".
- **Hình thoi gộp:** hiệu ứng gộp dương nhưng **rất nhỏ**, và khoảng tin cậy **chạm vạch 0** — đáp án chung chưa chắc chắn.

Ba nghiên cứu lớn cho ba câu chuyện khác nhau (nhỏ-dương, không-chắc, gần-như-không) — đây chính là **tính không đồng nhất**. Kết luận đúng không phải "trà xanh giảm lo âu", mà là: **"chưa đủ bằng chứng; cần thêm các nghiên cứu lớn, đăng ký trước"**. Một tin tức chỉ đưa tin nghiên cứu B ("uống trà xanh giảm lo âu rõ rệt!") sẽ là ví dụ điển hình của việc đọc sai bằng chứng.
:::

## Tự suy ngẫm

1. "Rác vào, rác ra" — theo bạn, một phân tích tổng hợp gộp 100 nghiên cứu nhưng toàn nghiên cứu mẫu nhỏ, không đăng ký trước, thì đáng tin đến mức nào? Con số gộp có che giấu được chất lượng kém không?
2. Funnel plot khuyết một bên gợi ý các nghiên cứu "xấu" đã bị giấu. Ngoài khoa học, bạn có thấy hiện tượng "chỉ khoe thành công, giấu thất bại" ở đâu trong đời sống? Hệ quả của nó là gì?
3. Phân tích của Fischer cho thấy hiệu ứng người ngoài cuộc yếu đi trong tình huống nguy hiểm. Điều này gợi ý gì về cách áp dụng một "quy luật tâm lý" vào đời thực — có nên áp dụng y nguyên mọi tình huống không?
4. Nếu bạn phải quyết định một việc quan trọng (chọn trường, chọn phương pháp học) dựa trên "nhiều người nói", bạn sẽ "gộp" các ý kiến đó như thế nào để không bị một ý kiến cực đoan nhưng ồn ào chi phối?

## Nguồn

- Fischer, P., Krueger, J. I., Greitemeyer, T., Vogrincic, C., Kastenmüller, A., Frey, D., Heene, M., Wicher, M., & Kainbacher, M. (2011). The bystander-effect: A meta-analytic review on bystander intervention in dangerous and non-dangerous emergencies. *Psychological Bulletin*, 137(4), 517–537. <https://doi.org/10.1037/a0023304>
