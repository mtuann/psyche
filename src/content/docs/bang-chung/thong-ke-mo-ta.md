---
title: Trung bình có nói dối?
description: Trung bình, trung vị, yếu vị là ba cách tóm tắt một dãy số. Hiểu phân phối lệch để biết khi nào con số trung bình dễ gây hiểu lầm trong tin tức.
sidebar:
  label: Trung bình có nói dối? Thống kê mô tả
in_duoc: true
---

*Thống kê mô tả*

## Một tin tức

> **"Năm 2024 thu nhập bình quân của người Việt tăng mạnh, đạt 5,4 triệu đồng"** — tiêu đề Vietstock đăng ngày 19/5/2025, sau khi Cục Thống kê công bố kết quả Khảo sát mức sống dân cư năm 2024.

Con số là thật: theo Cục Thống kê, thu nhập bình quân đầu người mỗi tháng theo giá hiện hành năm 2024 đạt 5,4 triệu đồng, tăng 9,1% so với năm 2023 ([Cục Thống kê, 5/2025](https://www.nso.gov.vn/tin-tuc-thong-ke/2025/05/thong-cao-bao-chi-ket-qua-khao-sat-muc-song-dan-cu-nam-2024/)). Câu hỏi là: 5,4 triệu có phải số tiền mà một người Việt "bình thường" kiếm được không?

Cùng báo cáo ấy cho biết: nhóm 20% dân số có thu nhập cao nhất có thu nhập bình quân 11,8 triệu đồng/người/tháng, còn nhóm 20% dân số có thu nhập thấp nhất chỉ 1,6 triệu đồng/người/tháng, chênh nhau **7,4 lần** ([Cục Thống kê, 5/2025](https://www.nso.gov.vn/tin-tuc-thong-ke/2025/05/thong-cao-bao-chi-ket-qua-khao-sat-muc-song-dan-cu-nam-2024/); [Vietstock, 19/5/2025](https://vietstock.vn/2025/05/nam-2024-thu-nhap-binh-quan-cua-nguoi-viet-tang-manh-dat-54-trieu-dong-761-1309745.htm)).

Con số 5,4 triệu là trung bình cộng của cả nước, gộp nhóm thu nhập cao và nhóm thu nhập thấp vào một con số. Tính từ chính số liệu trên: nhóm 20% cao nhất chiếm khoảng 44% tổng thu nhập (11,8 × 20% ÷ 5,4), nhóm 20% thấp nhất khoảng 6% (1,6 × 20% ÷ 5,4). Trung bình không cho biết người đứng chính giữa kiếm bao nhiêu: đó là việc của **trung vị**. Tính đến 10/2026, cả thông cáo của Cục Thống kê lẫn bài của Vietstock mà chúng tôi đọc đều không nêu trung vị thu nhập.

Bài này giải thích trung bình, trung vị và yếu vị khác nhau thế nào, và cách đọc để không hiểu nhầm một con số trung bình.

## Khái niệm

**Thống kê mô tả** (*descriptive statistics*) là việc tổ chức và tóm tắt dữ liệu, bằng biểu đồ hoặc bằng các con số. Ba con số tóm tắt "trung tâm" của một dãy số là trung bình, trung vị và yếu vị; trong đó trung bình và trung vị được dùng rộng rãi nhất.

### Trung bình (mean)

**Trung bình cộng** là tổng tất cả các giá trị chia cho số lượng giá trị. Trong đời thường, người ta thường dùng từ "trung bình" (*average*) để chỉ trung bình cộng.

Điểm mạnh: dùng mọi giá trị trong dãy số. Điểm yếu: **nhạy với giá trị cực đoan**. Ví dụ trong giáo trình OpenStax: một thị trấn có 50 người, một người kiếm 5.000.000 USD mỗi năm và 49 người còn lại mỗi người kiếm 30.000 USD. Trung bình là 129.400 USD, trong khi trung vị là 30.000 USD, con số mô tả "trung tâm" của dãy số tốt hơn.

### Trung vị (median)

**Trung vị** là giá trị đứng ở chính giữa khi đã xếp dãy số theo thứ tự từ bé đến lớn: một nửa số giá trị nằm dưới nó, một nửa nằm trên nó. (Nếu dãy có số lượng chẵn, trung vị là trung bình của hai giá trị giữa.)

Điểm mạnh: **không bị giá trị cực đoan kéo đi**. Nếu người kiếm nhiều nhất kiếm thêm nữa, trung vị vẫn đứng yên.

### Yếu vị (mode)

**Yếu vị** là giá trị xuất hiện nhiều lần nhất trong dãy số. Một dãy số có thể có nhiều yếu vị nếu các giá trị đó cùng xuất hiện nhiều nhất. Khác với trung bình và trung vị, yếu vị tính được cả cho dữ liệu phân loại, những thứ không thể cộng hay xếp thứ tự bằng số: ví dụ trong một dãy gồm "đỏ, đỏ, đỏ, xanh lá, xanh lá, vàng", yếu vị là "đỏ". Thử tính "trung bình" của màu áo, bạn sẽ thấy ngay vì sao cần yếu vị.

### Một ví dụ giả định

Hãy tưởng tượng thu nhập tháng (triệu đồng) của 10 người trong một xóm *(dãy số giả định, do site tự đặt ra để minh họa)*:

6, 7, 7, 8, 8, 9, 9, 10, 11, 60

- **Trung bình** = (6 + 7 + 7 + 8 + 8 + 9 + 9 + 10 + 11 + 60) / 10 = 135 / 10 = **13,5**
- **Trung vị** = giá trị giữa (vị trí thứ 5 và 6): (8 + 9) / 2 = **8,5**
- **Yếu vị** = **7, 8 và 9** (mỗi số xuất hiện 2 lần)

Người kiếm nhiều nhất (60 triệu) đã một mình kéo trung bình lên 13,5 triệu, cao hơn thu nhập của 9 trên 10 người trong xóm. Trong khi đó trung vị 8,5 triệu cho biết "người ở giữa": một nửa xóm kiếm dưới 8,5 triệu, một nửa kiếm trên.
::hinh{ten="mean-vs-median"}


### Phân phối lệch

Khi vẽ dãy số thành biểu đồ, hình dạng của nó có thể **đối xứng** hoặc **lệch** về một phía:

- **Đối xứng**: hình bên trái và bên phải một đường thẳng đứng là ảnh phản chiếu của nhau. Lúc này trung bình và trung vị gần như bằng nhau.
- **Lệch phải** (đuôi dài về phía giá trị lớn): vài giá trị rất lớn ở đuôi phải kéo trung bình lên, nên trung bình thường lớn hơn trung vị.
- **Lệch trái** (đuôi dài về phía giá trị nhỏ): trung bình thường nhỏ hơn trung vị.

Quy tắc nhớ nhanh: **đuôi lệch về phía nào, trung bình bị kéo về phía đó** nhiều hơn trung vị. Vì vậy khoảng cách giữa trung bình và trung vị gợi ý dữ liệu có lệch hay không.

Một chi tiết thêm: trong phân phối lệch phải, ba con số thường xếp theo thứ tự yếu vị < trung vị < trung bình. Yếu vị nằm ở đỉnh của phân phối, trung bình bị đuôi phải kéo đi xa nhất. Đây là quy tắc thường đúng chứ không phải luật: nó có thể sai, nhất là với dữ liệu rời rạc hay phân phối nhiều đỉnh, nên đừng kết luận về hình dạng của dữ liệu chỉ từ hai con số.

### Khi nào dùng con số nào

| Tình huống | Thường dùng | Vì sao |
|---|---|---|
| Dữ liệu đối xứng, không có giá trị quá khác biệt | Trung bình | Dùng mọi giá trị; ở phân phối đối xứng trung bình và trung vị gần như bằng nhau |
| Dữ liệu lệch hoặc có giá trị cực đoan | Trung vị | Không bị vài giá trị rất lớn hay rất nhỏ kéo đi |
| Dữ liệu phân loại, cần biết "cái nào phổ biến nhất" | Yếu vị | Trung bình của "màu sắc" là vô nghĩa; yếu vị tính được cho dữ liệu phân loại |
| Muốn mô tả đầy đủ hơn | Cả trung bình lẫn trung vị | Khoảng cách giữa hai con số gợi ý dữ liệu có lệch hay không |

## Cách nhận ra

Mỗi khi đọc tin tức có chữ "trung bình", hãy tra cứu nhanh bốn câu hỏi này:

| Câu hỏi | Dấu hiệu cần chú ý |
|---|---|
| 1. Đây là trung bình *nào*? | Bài báo chỉ ghi "trung bình" mà không nói rõ: thường là trung bình cộng, con số nhạy với giá trị cực đoan |
| 2. Dữ liệu có giá trị cực đoan không? | Nếu có vài giá trị rất lớn, trung bình bị kéo lên so với trung vị |
| 3. Bài báo có đưa trung vị không? | Nếu chỉ có trung bình, bạn chưa biết dữ liệu lệch đến đâu, vì khoảng cách giữa trung bình và trung vị gợi ý mức lệch |
| 4. "Trung bình" của *ai*? | "Thu nhập bình quân đầu người" chia tổng thu nhập của hộ cho cả dân số, kể cả trẻ em; thu nhập bình quân tháng của người lao động là một chỉ tiêu khác |

Một mẹo thực tế: khi bài báo chỉ nêu trung bình, hãy tìm xem có nêu trung vị hay phân phối (như các nhóm 20%) không. Nếu không, bạn chưa thể biết con số trung bình đại diện cho "người điển hình" đến đâu.

## Mức độ chắc chắn

:::vung-chac[Trung bình, trung vị và yếu vị mô tả các khía cạnh khác nhau của một dãy số; trung bình nhạy với giá trị cực đoan, trung vị thì không]
Đây là định nghĩa và tính chất thống kê, không phải phát hiện thực nghiệm. Giáo trình OpenStax *Introductory Statistics 2e* (mục 2.5 và 2.6) nêu đầy đủ những điều này, với các ví dụ tính được.
:::

:::kha-vung[Khi dữ liệu lệch phải, trung bình thường lớn hơn trung vị, và yếu vị thường nhỏ nhất]
Quy tắc này được dạy rộng rãi và đúng ở nhiều bộ dữ liệu, nhưng không đúng với mọi bộ dữ liệu: giáo trình OpenStax nêu rõ có ngoại lệ, và von Hippel (2005) cho thấy nó sai "với tần suất đáng ngạc nhiên", nhất là ở dữ liệu rời rạc.
:::

## Bài tập

### Thử một lần { #thu-mot-lan }

**Bài tập:** Dãy số dưới đây là thu nhập tháng *(triệu đồng, số liệu giả định)* của 10 nhân viên một công ty khởi nghiệp:

5, 6, 6, 7, 7, 8, 8, 9, 10, 80

1. Tính trung bình, trung vị và yếu vị của dãy số.
2. Nếu bạn là phóng viên và chỉ được đưa **một** con số lên tiêu đề, bạn chọn con số nào? Vì sao?

:::thu-gon[Gợi ý đáp án]
1. **Trung bình** = (5 + 6 + 6 + 7 + 7 + 8 + 8 + 9 + 10 + 80) / 10 = 146 / 10 = **14,6**. **Trung vị** = (7 + 8) / 2 = **7,5**. **Yếu vị** = **6, 7, 8** (mỗi số xuất hiện 2 lần).
2. Không có đáp án duy nhất đúng, nhưng cần lý giải được. Nếu đưa "thu nhập trung bình 14,6 triệu", độc giả dễ tưởng nhân viên công ty này khá giả, trong khi 9 trên 10 người kiếm từ 10 triệu trở xuống và một người kiếm 80 triệu đã kéo trung bình lên gần gấp đôi trung vị. Trung vị 7,5 triệu cho biết nhân viên ở giữa kiếm bao nhiêu. Bài học: con số đúng về mặt tính toán vẫn có thể gây hiểu lầm nếu chọn sai con số để đưa tin.
:::

### Kiểm tra nhanh

```quiz
? Dữ liệu lệch phải (đuôi dài về phía giá trị lớn). Điều nào thường đúng?
- Trung vị luôn lớn hơn trung bình.
+ Trung bình thường lớn hơn trung vị, vì đuôi dài kéo trung bình đi nhiều hơn.
- Trung bình và trung vị luôn bằng nhau.
> Với dữ liệu lệch phải, trung bình thường lớn hơn trung vị vì trung bình chịu ảnh hưởng của giá trị cực đoan mà trung vị không chịu. Chữ "thường" quan trọng: giáo trình nêu rõ quy tắc có ngoại lệ.
? Ba mươi người ghi lại màu áo họ thích nhất. Con số nào hợp để cho biết màu nào được chọn nhiều nhất?
- Trung bình.
- Trung vị.
+ Yếu vị.
> Yếu vị là giá trị xuất hiện nhiều nhất và tính được cả cho dữ liệu phân loại. Trung bình cần cộng các giá trị, trung vị cần xếp dãy số theo thứ tự từ bé đến lớn, nên cả hai không hợp với màu sắc.
? Trong một nhóm 10 người, thu nhập của người kiếm nhiều nhất tăng gấp mười lần. Điều gì xảy ra với trung bình và trung vị?
+ Trung bình tăng mạnh, trung vị không đổi.
- Cả hai cùng tăng gấp mười lần.
- Trung bình không đổi, trung vị tăng mạnh.
> Trung vị chỉ phụ thuộc vào các giá trị ở giữa dãy đã xếp thứ tự, nên khi giá trị lớn nhất tăng thêm thì trung vị không đổi. Trung bình dùng mọi giá trị nên tăng theo.
```

## Thử suy ngẫm { #tu-suy-ngam }

1. Khi một bản tin chỉ nêu trung bình thu nhập, người đọc dễ hiểu nhầm điều gì? Bạn muốn biết thêm con số nào để hiểu đúng?
2. Ngoài thu nhập, hãy kể hai ví dụ trong đời sống mà con số trung bình có thể gây hiểu lầm (gợi ý: điểm số, thời gian dùng điện thoại, số bạn bè trên mạng xã hội).
3. Một trường học khoe "điểm trung bình của học sinh là 8,5". Ngoài con số này, bạn muốn biết thêm con số nào nữa trước khi tin rằng "học sinh trường này học giỏi"? Vì sao?
4. Trung vị có bao giờ gây hiểu lầm không? Hãy thử nghĩ một tình huống mà chỉ nhìn trung vị cũng chưa đủ.

## Nguồn

- Cục Thống kê. (2025, 16 tháng 5). *Thông cáo báo chí kết quả khảo sát mức sống dân cư năm 2024*. <https://www.nso.gov.vn/tin-tuc-thong-ke/2025/05/thong-cao-bao-chi-ket-qua-khao-sat-muc-song-dan-cu-nam-2024/>
- Cục Thống kê. *Thu nhập bình quân đầu người 01 tháng: khái niệm, phương pháp tính* (hệ thống chỉ tiêu thống kê). <https://www.nso.gov.vn/du-lieu-dac-ta/2023/12/htcttkqg-thu-thap-binh-quan-dau-nguoi-01-thang/>
- Vietstock. (2025, 19 tháng 5). *Năm 2024 thu nhập bình quân của người Việt tăng mạnh, đạt 5,4 triệu đồng*. <https://vietstock.vn/2025/05/nam-2024-thu-nhap-binh-quan-cua-nguoi-viet-tang-manh-dat-54-trieu-dong-761-1309745.htm>
- Illowsky, B., & Dean, S. (2023). *Introductory Statistics 2e*, mục 1.1 (Definitions of statistics, probability, and key terms), 2.5 (Measures of the center of the data), 2.6 (Skewness and the mean, median, and mode). OpenStax. <https://openstax.org/books/introductory-statistics-2e/pages/2-5-measures-of-the-center-of-the-data>
- von Hippel, P. T. (2005). Mean, median, and skew: Correcting a textbook rule. *Journal of Statistics Education*, 13(2). <https://doi.org/10.1080/10691898.2005.11910556>
