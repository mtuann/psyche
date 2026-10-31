---
title: Trung bình có nói dối?
description: Trung bình, trung vị, yếu vị là ba cách tóm tắt một dãy số. Hiểu phân phối lệch để không bị con số trung bình đánh lừa trong tin tức.
sidebar:
  label: Trung bình có nói dối? Thống kê mô tả
in_duoc: true
---

*Thống kê mô tả*

## Một tin tức

> **"Năm 2024 thu nhập bình quân của người Việt tăng mạnh, đạt 5,4 triệu đồng"** — tiêu đề kiểu này xuất hiện trên nhiều báo sau khi Cục Thống kê công bố Khảo sát mức sống dân cư năm 2024.

Con số là thật: thu nhập bình quân đầu người mỗi tháng theo giá hiện hành đạt 5,4 triệu đồng, tăng 9,1% so với năm 2023. Nghe qua, nhiều người sẽ nghĩ: "người Việt bình thường kiếm khoảng 5,4 triệu mỗi tháng".

Nhưng cùng một báo cáo lại cho biết: nhóm 20% hộ giàu nhất có thu nhập bình quân 11,8 triệu đồng/người/tháng, còn nhóm 20% nghèo nhất chỉ 1,6 triệu đồng/người/tháng — chênh nhau **7,4 lần** ([Vietstock, 5/2025](https://vietstock.vn/2025/05/nam-2024-thu-nhap-binh-quan-cua-nguoi-viet-tang-manh-dat-54-trieu-dong-761-1309745.htm)).

Vậy "người bình thường" kiếm 5,4 triệu hay 1,6 triệu? Con số 5,4 triệu không sai về mặt tính toán. Nó chỉ **không kể câu chuyện của phần đông**. Một nhóm nhỏ người giàu đã kéo con số trung bình lên cao, che mất thực tế của hàng chục triệu người ở phía dưới.

Đáng chú ý hơn: trong các bản tin, gần như không báo nào đưa **trung vị** thu nhập — con số cho biết người đứng chính giữa xã hội kiếm bao nhiêu. Sự vắng mặt đó không phải ngẫu nhiên: trung bình cộng vừa dễ tính, vừa cho con số "đẹp" hơn để làm tiêu đề. Nhưng đẹp không có nghĩa là trung thực.

Bài này giải thích vì sao điều đó xảy ra, và cách đọc để không bị đánh lừa.

## Khái niệm

**Thống kê mô tả** (*descriptive statistics*) là cách tóm tắt một dãy số dài bằng vài con số ngắn gọn, để ta nắm được "bức tranh chung" mà không cần đọc từng số liệu. Ba con số tóm tắt phổ biến nhất là trung bình, trung vị và yếu vị.

### Trung bình (mean)

**Trung bình cộng** là tổng tất cả các giá trị chia cho số lượng giá trị. Đây là "trung bình" mà báo chí nhắc tới trong hầu hết các tin tức.

Điểm mạnh: dùng được mọi giá trị trong dãy số, tiện cho tính toán tiếp theo. Điểm yếu chí mạng: **rất nhạy với giá trị cực đoan**. Một người duy nhất kiếm 1 tỉ mỗi tháng cũng đủ kéo trung bình của cả xóm lên trời.

### Trung vị (median)

**Trung vị** là giá trị đứng ở chính giữa khi đã xếp dãy số theo thứ tự từ bé đến lớn: một nửa số giá trị nằm dưới nó, một nửa nằm trên nó. (Nếu dãy có số lượng chẵn, trung vị là trung bình của hai giá trị giữa.)

Điểm mạnh: **không bị giá trị cực đoan kéo đi**. Dù người giàu nhất xóm kiếm thêm 10 tỉ nữa, trung vị vẫn đứng yên.

### Yếu vị (mode)

**Yếu vị** là giá trị xuất hiện nhiều lần nhất trong dãy số. Nó ít được báo chí nhắc tới, nhưng rất hữu ích với dữ liệu phân loại — những thứ không thể cộng hay chia: "cỡ áo nào bán chạy nhất", "khung giờ nào đông khách nhất", "lý do nghỉ việc nào được nêu nhiều nhất". Thử tính "trung bình" của màu áo, bạn sẽ thấy ngay vì sao cần yếu vị.

### Một ví dụ giả định

Hãy tưởng tượng thu nhập tháng (triệu đồng) của 10 người trong một xóm *(dãy số giả định, do site tự đặt ra để minh họa)*:

6, 7, 7, 8, 8, 9, 9, 10, 11, 60

- **Trung bình** = (6 + 7 + 7 + 8 + 8 + 9 + 9 + 10 + 11 + 60) / 10 = 135 / 10 = **13,5**
- **Trung vị** = giá trị giữa (vị trí thứ 5 và 6): (8 + 9) / 2 = **8,5**
- **Yếu vị** = **7, 8 và 9** (mỗi số xuất hiện 2 lần)

Người giàu nhất kiếm 60 triệu đã một mình kéo trung bình lên 13,5 triệu — cao hơn thu nhập của 9 trên 10 người trong xóm. Trong khi đó trung vị 8,5 triệu kể đúng câu chuyện của "người ở giữa": một nửa xóm kiếm dưới 8,5 triệu, một nửa kiếm trên.
::hinh{ten="mean-vs-median"}


### Phân phối lệch

Khi vẽ dãy số thành biểu đồ, nhiều dữ liệu đời thực **lệch** về một phía thay vì cân đối như hình chuông:

- **Lệch phải** (đuôi dài về phía giá trị lớn): thu nhập, giá nhà, số lượt xem video, tài sản. Vài giá trị khổng lồ ở đuôi phải kéo trung bình lên cao hơn trung vị.
- **Lệch trái** (đuôi dài về phía giá trị nhỏ): tuổi thọ ở nước phát triển (phần đông sống lâu, một số ít mất sớm), điểm thi khi đề quá dễ.
- **Đối xứng**: chiều cao người trưởng thành, điểm IQ. Lúc này trung bình và trung vị gần như bằng nhau.

Quy tắc nhớ nhanh: **đuôi lệch về phía nào, trung bình bị kéo về phía đó**. Với thu nhập — luôn lệch phải — trung bình hầu như luôn cao hơn trung vị, và trung vị mới là con số gần với "người điển hình" hơn.

Một chi tiết thú vị: trong phân phối lệch phải, ba con số thường xếp theo thứ tự yếu vị < trung vị < trung bình. Đuôi phải dài "kéo" trung bình đi xa nhất, trung vị đi theo một đoạn ngắn hơn, còn yếu vị — đỉnh của phân phối, nơi đông người nhất — đứng yên ở vị trí khiêm tốn nhất. Nhìn thứ tự này là biết ngay dữ liệu đang lệch về đâu.

### Khi nào dùng con số nào

| Tình huống | Nên dùng | Vì sao |
|---|---|---|
| Dữ liệu cân đối, không có giá trị quá khác biệt (chiều cao, nhiệt độ) | Trung bình | Dùng hết thông tin, tiện tính toán |
| Dữ liệu lệch hoặc có giá trị cực đoan (thu nhập, giá nhà, thời gian chờ) | Trung vị | Không bị vài giá trị khổng lồ đánh lừa |
| Dữ liệu phân loại, cần biết "cái nào phổ biến nhất" (cỡ áo, màu xe) | Yếu vị | Trung bình của "màu sắc" là vô nghĩa |
| Muốn mô tả đầy đủ và trung thực nhất | Cả trung bình lẫn trung vị | Khoảng cách giữa hai con số tự nó đã kể một câu chuyện |

## Cách nhận ra

Mỗi khi đọc tin tức có chữ "trung bình", hãy tra cứu nhanh bốn câu hỏi này:

| Câu hỏi | Dấu hiệu đáng ngờ |
|---|---|
| 1. Đây là trung bình *nào*? | Bài báo chỉ ghi "trung bình" mà không nói rõ — mặc định hiểu là trung bình cộng, con số dễ bị bóp méo nhất |
| 2. Dữ liệu có giá trị cực đoan không? | Thu nhập, tài sản, doanh thu: luôn có vài "đại gia" ở đuôi phân phối |
| 3. Bài báo có đưa trung vị không? | Chỉ đưa trung bình mà giấu trung vị — bạn đang chỉ được xem một nửa bức tranh |
| 4. "Trung bình" của *ai*? | "Thu nhập bình quân đầu người" tính cả trẻ em và người không đi làm; "thu nhập bình quân của người lao động" là nhóm khác hẳn |

Một mẹo thực tế: khi thấy "trung bình" đi kèm các từ như thu nhập, lương, giá nhà, tài sản — hãy mặc định nghi ngờ và đi tìm con số trung vị. Nếu bài báo không cho, chính sự vắng mặt đó cũng là một thông tin.

## Thử một lần

**Bài tập:** Dãy số dưới đây là thu nhập tháng *(triệu đồng, số liệu giả định)* của 10 nhân viên một công ty khởi nghiệp:

5, 6, 6, 7, 7, 8, 8, 9, 10, 80

1. Tính trung bình, trung vị và yếu vị của dãy số.
2. Nếu bạn là phóng viên và chỉ được đưa **một** con số lên tiêu đề, bạn chọn con số nào? Vì sao?

:::thu-gon[Gợi ý đáp án]
1. **Trung bình** = (5 + 6 + 6 + 7 + 7 + 8 + 8 + 9 + 10 + 80) / 10 = 146 / 10 = **14,6**. **Trung vị** = (7 + 8) / 2 = **7,5**. **Yếu vị** = **6, 7, 8** (mỗi số xuất hiện 2 lần).
2. Không có đáp án duy nhất đúng, nhưng cần lý giải được. Nếu đưa "thu nhập trung bình 14,6 triệu", độc giả sẽ tưởng nhân viên công ty này khá giả — trong khi 9 trên 10 người kiếm từ 10 triệu trở xuống, và người duy nhất kiếm 80 triệu (có thể là nhà sáng lập) đã kéo trung bình lên gấp đôi. Trung vị 7,5 triệu kể đúng câu chuyện của nhân viên điển hình hơn. Bài học: con số đúng về mặt tính toán vẫn có thể gây hiểu lầm nếu chọn sai con số để đưa tin.
:::

## Tự suy ngẫm

1. Vì sao báo chí và các thông cáo báo chí thích đưa "trung bình" hơn "trung vị"? Ai được lợi khi độc giả chỉ nhìn thấy con số trung bình?
2. Ngoài thu nhập, hãy kể hai ví dụ trong đời sống mà con số trung bình có thể gây hiểu lầm (gợi ý: điểm số, thời gian dùng điện thoại, số bạn bè trên mạng xã hội).
3. Một trường học khoe "điểm trung bình của học sinh là 8,5". Ngoài con số này, bạn muốn biết thêm con số nào nữa trước khi tin rằng "học sinh trường này học giỏi"? Vì sao?
4. Trung vị có bao giờ gây hiểu lầm không? Hãy thử nghĩ một tình huống mà chỉ nhìn trung vị cũng chưa đủ.

## Nguồn

- Cục Thống kê, Báo cáo Khảo sát mức sống dân cư năm 2024 (số liệu dẫn qua Vietstock, 5/2025): thu nhập bình quân đầu người 5,4 triệu đồng/tháng; nhóm 20% giàu nhất 11,8 triệu đồng, nhóm 20% nghèo nhất 1,6 triệu đồng. <https://vietstock.vn/2025/05/nam-2024-thu-nhap-binh-quan-cua-nguoi-viet-tang-manh-dat-54-trieu-dong-761-1309745.htm>
