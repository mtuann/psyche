---
title: Vì sao một con số ngẫu nhiên có thể "kéo" ước lượng của bạn đi chệch?
description: "Demo hiệu ứng mỏ neo (anchoring): bạn được xếp ngẫu nhiên vào nhóm neo cao hoặc thấp, rồi ước lượng hai con số về Việt Nam."
sidebar:
  label: Hiệu ứng mỏ neo
---

*Hiệu ứng mỏ neo (anchoring effect)*

## Tự trải nghiệm

::cong-cu{ten="neo-gia"}

<noscript><p>Công cụ này cần JavaScript. Bạn vẫn có thể đọc phần giải thích bên dưới.</p></noscript>

## Điều gì đang xảy ra?

Khi phải ước lượng một con số mà mình không biết chắc, ta hiếm khi tính toán từ đầu. Thay vào đó, ta **bám vào một con số có sẵn** — dù con số đó từ đâu ra — rồi điều chỉnh dần về phía đáp án mình tin là đúng. Vấn đề là ta thường **điều chỉnh không đủ**: ước lượng cuối cùng vẫn bị "kéo" về phía con số ban đầu. Con số ban đầu đó được gọi là **mỏ neo** (anchor), và hiện tượng này là **hiệu ứng mỏ neo**.

Điểm gây ngạc nhiên: mỏ neo không cần phải có lý do gì cả. Trong nghiên cứu gốc, con số neo đến từ một vòng quay may rủi quay ngay trước mặt người tham gia, nhưng ước lượng của họ vẫn bị kéo đi.

## Nghiên cứu then chốt

### Tversky và Kahneman (1974): vòng quay may rủi

Người tham gia trả lời hai bước: con số cần ước lượng (tỉ lệ nước châu Phi trong Liên Hợp Quốc) lớn hơn hay nhỏ hơn số vừa quay được, rồi con số cụ thể là bao nhiêu; nhóm nhận số 10 cho ước lượng trung vị 25, nhóm nhận số 65 cho 45, và thưởng tiền cho độ chính xác không làm giảm hiệu ứng ([Tversky và Kahneman, 1974](https://doi.org/10.1126/science.185.4157.1124); kể chi tiết ở bài [Vì sao linh cảm hay đánh lừa ta?](/psyche/kham-pha/tu-duy/linh-cam-va-xac-suat/)). Công cụ ở trang này mô phỏng hai bước đó, với hai câu hỏi về Việt Nam.

### Chuyên gia cũng không miễn nhiễm

Englich, Mussweiler và Strack (2006) cho người làm nghề luật ở Đức đọc hồ sơ một vụ án giả định, soạn sát thực tế, rồi đưa ra mức án. Ở nghiên cứu 3, các luật sư trẻ vừa bắt đầu làm thẩm phán tự tung một cặp xúc xắc để "xác định ngẫu nhiên" mức án mà công tố đề nghị; xúc xắc bị làm cho luôn ra tổng 3 hoặc 9 (tháng án treo). Nhóm tung được 9 đưa ra mức án trung bình **7,81 tháng**, nhóm tung được 3 chỉ **5,28 tháng**. Ở nghiên cứu 2, với các thẩm phán và công tố viên có trung bình hơn 13 năm kinh nghiệm và mức đề nghị được báo là chọn ngẫu nhiên, hiệu ứng vẫn xuất hiện; các tác giả kết luận chuyên môn và kinh nghiệm không làm giảm hiệu ứng ([Englich, Mussweiler và Strack, 2006](https://doi.org/10.1177/0146167205282152)).

## Mức độ chắc chắn

:::kha-vung[con số neo làm dịch chuyển ước lượng]
Trong dự án tái lập Many Labs (36 mẫu, 6.344 người, ở Mỹ và nhiều nước khác), bốn câu hỏi mỏ neo đều cho hiệu ứng có ý nghĩa thống kê ở mọi mẫu, và thuộc nhóm hiệu ứng lớn nhất của dự án ([Klein và cộng sự, 2014](https://doi.org/10.1027/1864-9335/a000178)). Nhãn là *Khá vững* chứ chưa phải *Vững chắc* vì ở đây mới dẫn một lần tái lập lớn; chúng tôi chưa đối chiếu phân tích tổng hợp nào.
:::

:::kha-vung[hiệu ứng tồn tại ngay cả khi neo hoàn toàn ngẫu nhiên và người quyết định là chuyên gia]
Từ vòng quay may rủi của Tversky và Kahneman (1974) đến xúc xắc của Englich và cộng sự (2006): neo không cần liên quan, người quyết định không cần "ngây thơ". Bằng chứng về chuyên gia đến từ một số ít nghiên cứu với vài chục người mỗi nghiên cứu.
:::

:::tranh-cai[cơ chế chính xác là gì?]
Tversky và Kahneman cho rằng ta điều chỉnh không đủ từ điểm neo. Mussweiler và Strack đề xuất một cơ chế khác — **khả năng tiếp cận chọn lọc**: khi trả lời câu hỏi so sánh ("lớn hơn hay nhỏ hơn X?"), những hiểu biết phù hợp với con số neo trở nên dễ nhớ ra hơn, và chúng kéo ước lượng về phía neo ([Mussweiler và Strack, 1999](https://doi.org/10.1006/jesp.1998.1364)). Ở nghiên cứu 4 của Englich và cộng sự (2006), sau mức đề nghị cao, các lý lẽ buộc tội được nhận ra nhanh hơn, đúng như cơ chế này dự đoán. Hai cách giải thích không loại trừ nhau.
:::

## Các lý thuyết giải thích

- **Điều chỉnh không đủ (anchoring-and-adjustment):** ta bắt đầu từ con số neo rồi "nhích" dần về phía đáp án mình tin đúng, nhưng thường dừng lại quá sớm (Tversky và Kahneman, 1974).
- **Khả năng tiếp cận chọn lọc (selective accessibility):** câu hỏi so sánh buộc ta phải nghĩ về con số neo; quá trình đó làm những thông tin "hợp" với phía neo trở nên dễ nhớ hơn, và chúng chi phối ước lượng tiếp theo (Mussweiler và Strack, 1999; Englich và cộng sự, 2006).

## Cách công cụ hoạt động

:::thu-gon[Chi tiết thiết kế]
- **Xếp nhóm:** khi bạn bấm "Bắt đầu", công cụ xếp bạn ngẫu nhiên vào nhóm neo **thấp** hoặc **cao**, mỗi nhóm xác suất 50%. Bạn không biết mình thuộc nhóm nào cho đến trang kết quả.
- **Câu 1 — dân số Việt Nam:** neo thấp **40 triệu người**, neo cao **200 triệu người**. Số chính thức mới nhất tính đến 11/2026: dân số trung bình năm 2025 ước tính **102,3 triệu người** ([Cục Thống kê, thông cáo báo chí tháng 1/2026](https://www.nso.gov.vn/tin-tuc-thong-ke/2026/01/thong-cao-bao-chi-ve-tinh-hinh-dan-so-lao-dong-viec-lam-quy-iv-va-nam-2025/)).
- **Câu 2 — dân số thành thị:** neo thấp **15%**, neo cao **70%**. Số chính thức, cùng nguồn: dân số thành thị năm 2025 chiếm **38,6%**.
- Hai neo của mỗi câu được chọn sao cho "kẹp" hai phía của đáp án đúng — giống thiết kế 10/65 trong nghiên cứu gốc.
- **Lưu ý:** công cụ không gửi dữ liệu đi đâu; ước lượng của bạn chỉ lưu trên trình duyệt của bạn.
:::

## Ở Việt Nam

**Tính đến 11/2026, chúng tôi chưa tìm thấy nghiên cứu về hiệu ứng mỏ neo trên mẫu người Việt.** Hai câu hỏi trong công cụ dùng số liệu dân số Việt Nam để bạn thấy gần gũi hơn, nhưng đó là số liệu dân số, **không phải** dữ liệu tâm lý học về người Việt. Vì vậy, công cụ không cho biết người Việt có dễ bị neo hơn hay kém hơn các mẫu đã nghiên cứu.

## Ngộ nhận liên quan

- **"Biết con số neo là vô nghĩa thì sẽ không bị ảnh hưởng."** Sai: trong nghiên cứu của Englich và cộng sự (2006), người làm nghề luật *biết* mức đề nghị do xúc xắc quyết định mà vẫn bị kéo.
- **"Mỏ neo chỉ có tác dụng khi con số có vẻ liên quan."** Không: những con số rõ ràng là ngẫu nhiên — vòng quay may rủi, xúc xắc — vẫn tạo ra hiệu ứng. Englich và cộng sự (2006) còn so mức đề nghị do xúc xắc quyết định với cùng mức ấy do công tố đưa ra (ở một nghiên cứu khác, cùng hồ sơ vụ án) và không thấy hai loại khác nhau về tác dụng.
- **"Chỉ người thiếu hiểu biết mới bị neo."** Sai. Chuyên gia trong đúng lĩnh vực của mình vẫn bị ảnh hưởng: Englich và cộng sự (2006) thấy chuyên môn và kinh nghiệm xét xử không làm giảm hiệu ứng.
- **"Ước lượng của tôi khác xa đáp án nên tôi 'thua'."** Không. Công cụ này không chấm đúng/sai — nó chỉ cho bạn thấy *quy trình* mà một con số cho trước có thể len vào ước lượng của mình.

## Thử suy ngẫm

```quiz
? Trong nghiên cứu gốc của Tversky và Kahneman (1974), hai nhóm nhận neo 10 và 65 cho ước lượng trung vị là bao nhiêu (tỉ lệ quốc gia châu Phi trong LHQ)?
- 10% và 65% — mọi người chỉ nhắc lại con số neo.
+ 25% và 45% — neo kéo ước lượng đi, nhưng mọi người vẫn điều chỉnh một phần về phía đáp án mình tin.
- 45% và 25% — nhóm neo thấp lại ước lượng cao hơn.
> Neo 10 → trung vị 25%; neo 65 → trung vị 45%. Mọi người không "nuốt chửng" con số neo, nhưng cũng không thoát được nó: họ điều chỉnh từ điểm neo mà điều chỉnh không đủ.
? Vì sao thí nghiệm gốc hỏi câu so sánh ("lớn hơn hay nhỏ hơn X?") trước khi hỏi con số cụ thể?
- Để kiểm tra kiến thức địa lý của người tham gia.
+ Để "cài" con số neo vào đầu người tham gia — câu so sánh buộc họ phải suy nghĩ nghiêm túc về con số đó trước khi ước lượng.
- Vì câu so sánh dễ trả lời hơn nên dùng để khởi động.
> Đây chính là bước tạo neo trong thiết kế thí nghiệm. Theo mô hình khả năng tiếp cận chọn lọc, khi trả lời câu so sánh, ta lục tìm những lý do ủng hộ phía của con số neo — và những lý do đó "dính" lại sang bước ước lượng.
? Trả thưởng cho đáp án chính xác có làm mất hiệu ứng mỏ neo không?
- Có — có động lực tiền bạc là hết thiên kiến.
+ Không — trong nghiên cứu gốc, thưởng cho độ chính xác cũng không làm giảm hiệu ứng.
- Chưa có ai thử điều này.
> Đây là một chi tiết quan trọng: hiệu ứng mỏ neo không phải do "lười suy nghĩ". Ngay cả khi có động lực làm chính xác, người ta vẫn không điều chỉnh đủ xa khỏi điểm neo.
? Bạn được xếp vào nhóm neo thấp và ước lượng dân số Việt Nam là 60 triệu. Có thể kết luận bạn "đã bị neo" không?
- Có — 60 triệu thấp hơn đáp án đúng nên chắc chắn là do neo.
+ Chưa thể kết luận từ một người: cần so sánh trung bình của cả nhóm neo thấp với nhóm neo cao. Đây là minh họa, không phải thí nghiệm.
- Không — vì 60 triệu cũng gần đúng rồi.
> Ước lượng của một người có thể thấp vì nhiều lý do (đoán mò, làm tròn, kiến thức sẵn có...). Hiệu ứng mỏ neo là một phát hiện ở cấp độ nhóm: trung bình nhóm neo thấp < trung bình nhóm neo cao một cách có hệ thống.
? Mô hình "khả năng tiếp cận chọn lọc" (Mussweiler & Strack) giải thích hiệu ứng mỏ neo thế nào?
- Con người lười tính toán nên đoán bừa quanh con số neo.
+ Khi trả lời câu hỏi so sánh, ta lục trong trí nhớ những lý do ủng hộ phía của con số neo; những lý do đó "dính" lại và kéo ước lượng tuyệt đối về phía neo.
- Con số neo làm hỏng trí nhớ dài hạn của người tham gia.
> Ví dụ: với câu "dân số Việt Nam lớn hơn hay nhỏ hơn 40 triệu?", bạn sẽ nghĩ đến những gì mình biết về các tỉnh đông dân, mật độ đô thị... — những mảnh ký ức "hợp" với phía "lớn hơn 40 triệu". Khi sang bước ước lượng con số cụ thể, chính những mảnh ký ức đó đang ở "đầu lưỡi" và chi phối đáp án của bạn.
```

## Nguồn

- Englich, B., Mussweiler, T., & Strack, F. (2006). Playing dice with criminal sentences: The influence of irrelevant anchors on experts' judicial decision making. *Personality and Social Psychology Bulletin*, 32(2), 188–200. <https://doi.org/10.1177/0146167205282152>
- Mussweiler, T., & Strack, F. (1999). Hypothesis-consistent testing and semantic priming in the anchoring paradigm: A selective accessibility model. *Journal of Experimental Social Psychology*, 35(2), 136–164. <https://doi.org/10.1006/jesp.1998.1364>
- Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: Heuristics and biases. *Science*, 185(4157), 1124–1131. <https://doi.org/10.1126/science.185.4157.1124>
- Cục Thống kê (2026). *Thông cáo báo chí về tình hình dân số, lao động, việc làm quý IV và năm 2025*. <https://www.nso.gov.vn/tin-tuc-thong-ke/2026/01/thong-cao-bao-chi-ve-tinh-hinh-dan-so-lao-dong-viec-lam-quy-iv-va-nam-2025/>
- Klein, R. A., Ratliff, K. A., Vianello, M., Adams, R. B., Jr., Bahník, Š., Bernstein, M. J., … Nosek, B. A. (2014). Investigating variation in replicability: A "many labs" replication project. *Social Psychology*, 45(3), 142–152. <https://doi.org/10.1027/1864-9335/a000178>
