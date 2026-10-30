# Ánh xạ trang: site cũ sang site mới

Sinh bằng `python3 plans/lam-lai/anh_xa.py > plans/lam-lai/anh-xa.md` (đọc nav của `../psyche-zero/mkdocs.yml`). Đừng sửa tay: sửa bảng trong `anh_xa.py` rồi sinh lại.

- **Địa chỉ giữ nguyên** (luật 4): `../psyche-zero/docs/<trang>.md` thành `src/content/docs/<trang>.md`; `/psyche-zero/<trang>/` thành `/psyche/<trang>/`.
- **Tầng**: `loi` (Nền tảng: kiểm V3, khóa), `mo-rong` (V2 trở lên, có hạn xem lại), `cong-cu` (công cụ: số liệu trong mã vào hồ sơ), `co-han` (thông tin có hạn, như số liên hệ), `cap-nhat` (dòng cập nhật: chỉ thêm), `du-lieu` (trang sinh từ dữ liệu đã khóa từng bản ghi), `khung` (mục lục, trang sinh, trang về site). Định nghĩa: `plans/ben-vung/README.md`.
- **Lĩnh vực**: 14 lĩnh vực nền tảng; trang lĩnh vực mới ở `/psyche/nen-tang/<mã>/` liệt kê bài theo trường `linh_vuc`.

Site cũ có **106 trang** trong nav; site mới thêm **15 trang mới**. Theo tầng (trang cũ): loi 68, cong-cu 13, mo-rong 12, khung 9, cap-nhat 2, du-lieu 1, co-han 1.

| Đợt | Nội dung | Lô | Trang cũ |
|---|---|---|---|
| 2 | Dữ liệu dùng chung và lối vào | D2-L1 | 5 |
| 3 | Thí nghiệm kinh điển | D3-L1, D3-L2 | 16 |
| 4 | Hiểu bằng chứng | D4-L1, D4-L2 | 13 |
| 5 | Nền tảng phần 1 (27 bài đã kiểm ở G1-L01–L04) | D5-L1, D5-L2, D5-L3, D5-L4 | 27 |
| 6 | Nền tảng phần 2 | D6-L1, D6-L2, D6-L3 | 20 |
| 7 | Sức khỏe tâm thần | D7-L1 | 4 |
| 8 | Công cụ, ngộ nhận, sách in, Thêm | D8-L1, D8-L2, D8-L3, D8-L4 | 21 |

Lĩnh vực của trang lõi (đếm cả trang Thí nghiệm, Hiểu bằng chứng):

| Lĩnh vực | Mã | Trang lõi |
|---|---|---|
| Tâm lý học là gì, phương pháp | `phuong-phap` | 14 |
| Cơ sở sinh học | `co-so-sinh-hoc` | 4 |
| Cảm giác, tri giác, chú ý | `tri-giac-chu-y` | 4 |
| Ý thức và giấc ngủ | `y-thuc-giac-ngu` | 2 |
| Học tập | `hoc-tap` | 5 |
| Trí nhớ | `tri-nho` | 4 |
| Tư duy, ngôn ngữ, trí tuệ | `tu-duy-tri-tue` | 6 |
| Phát triển suốt đời | `phat-trien` | 7 |
| Cảm xúc và động lực | `cam-xuc-dong-luc` | 4 |
| Tính cách | `tinh-cach` | 2 |
| Tâm lý xã hội | `tam-ly-xa-hoi` | 10 |
| Căng thẳng và sức khỏe | `cang-thang-suc-khoe` | 1 |
| Hạnh phúc | `hanh-phuc` | 1 |
| Sức khỏe tâm thần, trị liệu | `suc-khoe-tam-than` | 4 |

## D2-L1 (20 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `index` | Trang chủ | khung |  | Trang chủ mới: danh sách bài sinh từ dữ liệu, chỉ trang đã khóa |
| `bat-dau/index` | Bắt đầu | khung |  |  |
| `bat-dau/doc-nhan-chac-chan` | Bắt đầu | loi | phuong-phap | Định nghĩa bốn nhãn: thêm thước đo nhãn (ben-vung mục 5.4) |
| `kham-pha/index` | Nền tảng | khung |  | Mục lục 14 lĩnh vực, sinh từ dữ liệu |
| `ho-tro/index` | Hỗ trợ | co-han | suc-khoe-tam-than | số liên hệ kiểm lại mỗi quý |
| `bat-dau/cach-kiem-chung` (mới) | Bắt đầu | khung | phuong-phap | Cách Psyche kiểm chứng: ba tầng, hồ sơ, khóa, thước đo nhãn |
| `nen-tang/phuong-phap` (mới) | Nền tảng | khung | phuong-phap | Trang lĩnh vực: Tâm lý học là gì, phương pháp; danh sách bài sinh từ dữ liệu |
| `nen-tang/co-so-sinh-hoc` (mới) | Nền tảng | khung | co-so-sinh-hoc | Trang lĩnh vực: Cơ sở sinh học; danh sách bài sinh từ dữ liệu |
| `nen-tang/tri-giac-chu-y` (mới) | Nền tảng | khung | tri-giac-chu-y | Trang lĩnh vực: Cảm giác, tri giác, chú ý; danh sách bài sinh từ dữ liệu |
| `nen-tang/y-thuc-giac-ngu` (mới) | Nền tảng | khung | y-thuc-giac-ngu | Trang lĩnh vực: Ý thức và giấc ngủ; danh sách bài sinh từ dữ liệu |
| `nen-tang/hoc-tap` (mới) | Nền tảng | khung | hoc-tap | Trang lĩnh vực: Học tập; danh sách bài sinh từ dữ liệu |
| `nen-tang/tri-nho` (mới) | Nền tảng | khung | tri-nho | Trang lĩnh vực: Trí nhớ; danh sách bài sinh từ dữ liệu |
| `nen-tang/tu-duy-tri-tue` (mới) | Nền tảng | khung | tu-duy-tri-tue | Trang lĩnh vực: Tư duy, ngôn ngữ, trí tuệ; danh sách bài sinh từ dữ liệu |
| `nen-tang/phat-trien` (mới) | Nền tảng | khung | phat-trien | Trang lĩnh vực: Phát triển suốt đời; danh sách bài sinh từ dữ liệu |
| `nen-tang/cam-xuc-dong-luc` (mới) | Nền tảng | khung | cam-xuc-dong-luc | Trang lĩnh vực: Cảm xúc và động lực; danh sách bài sinh từ dữ liệu |
| `nen-tang/tinh-cach` (mới) | Nền tảng | khung | tinh-cach | Trang lĩnh vực: Tính cách; danh sách bài sinh từ dữ liệu |
| `nen-tang/tam-ly-xa-hoi` (mới) | Nền tảng | khung | tam-ly-xa-hoi | Trang lĩnh vực: Tâm lý xã hội; danh sách bài sinh từ dữ liệu |
| `nen-tang/cang-thang-suc-khoe` (mới) | Nền tảng | khung | cang-thang-suc-khoe | Trang lĩnh vực: Căng thẳng và sức khỏe; danh sách bài sinh từ dữ liệu |
| `nen-tang/hanh-phuc` (mới) | Nền tảng | khung | hanh-phuc | Trang lĩnh vực: Hạnh phúc; danh sách bài sinh từ dữ liệu |
| `nen-tang/suc-khoe-tam-than` (mới) | Nền tảng | khung | suc-khoe-tam-than | Trang lĩnh vực: Sức khỏe tâm thần, trị liệu; danh sách bài sinh từ dữ liệu |

## D3-L1 (8 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `thi-nghiem/index` | Thí nghiệm kinh điển | khung |  |  |
| `thi-nghiem/milgram` | Thí nghiệm kinh điển | loi | tam-ly-xa-hoi | trang nhà của nghiên cứu |
| `thi-nghiem/asch` | Thí nghiệm kinh điển | loi | tam-ly-xa-hoi | trang nhà của nghiên cứu |
| `thi-nghiem/darley-latane` | Thí nghiệm kinh điển | loi | tam-ly-xa-hoi | trang nhà của nghiên cứu |
| `thi-nghiem/khi-dot-vo-hinh` | Thí nghiệm kinh điển | loi | tri-giac-chu-y | trang nhà của nghiên cứu |
| `thi-nghiem/zimbardo` | Thí nghiệm kinh điển | loi | tam-ly-xa-hoi | trang nhà của nghiên cứu |
| `thi-nghiem/pygmalion` | Thí nghiệm kinh điển | loi | tam-ly-xa-hoi | trang nhà của nghiên cứu |
| `thi-nghiem/robbers-cave` | Thí nghiệm kinh điển | loi | tam-ly-xa-hoi | trang nhà của nghiên cứu |

## D3-L2 (8 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `thi-nghiem/keo-deo` | Thí nghiệm kinh điển | loi | phat-trien | trang nhà của nghiên cứu |
| `thi-nghiem/pavlov` | Thí nghiệm kinh điển | loi | hoc-tap | trang nhà của nghiên cứu |
| `thi-nghiem/skinner` | Thí nghiệm kinh điển | loi | hoc-tap | trang nhà của nghiên cứu |
| `thi-nghiem/harlow` | Thí nghiệm kinh điển | loi | phat-trien | trang nhà của nghiên cứu |
| `thi-nghiem/bandura` | Thí nghiệm kinh điển | loi | hoc-tap | trang nhà của nghiên cứu |
| `thi-nghiem/little-albert` | Thí nghiệm kinh điển | loi | hoc-tap | trang nhà của nghiên cứu |
| `thi-nghiem/schachter-singer` | Thí nghiệm kinh điển | loi | cam-xuc-dong-luc | trang nhà của nghiên cứu |
| `thi-nghiem/seligman` | Thí nghiệm kinh điển | loi | hoc-tap | trang nhà của nghiên cứu |

## D4-L1 (7 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `bang-chung/index` | Hiểu bằng chứng | khung | phuong-phap |  |
| `bang-chung/tuong-quan-nhan-qua` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/thi-nghiem-doi-chung` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/do-lon-hieu-ung` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/mau-va-chon-mau` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/p-value` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/khung-hoang-tai-lap` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |

## D4-L2 (6 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `bang-chung/phan-tich-tong-hop` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/thong-ke-mo-ta` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/do-luong` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/co-mau-suc-manh` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/doc-bai-bao-khoa-hoc` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |
| `bang-chung/dao-duc-nghien-cuu` | Hiểu bằng chứng | loi | phuong-phap | chuẩn hóa theo khuôn 7 mục, có câu hỏi |

## D5-L1 (7 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `kham-pha/tri-nho/vi-sao-ta-quen` | Nền tảng | loi | tri-nho |  |
| `kham-pha/tri-nho/bang-ghi-hinh` | Nền tảng | loi | tri-nho |  |
| `kham-pha/tri-nho/phong-cach-hoc` | Chủ đề mở rộng | mo-rong | tri-nho | hạn xem lại 12–18 tháng |
| `kham-pha/tri-nho/duong-cong-quen` | Nền tảng | loi | tri-nho |  |
| `kham-pha/tri-nho/tri-nho-lam-viec` | Nền tảng | loi | tri-nho |  |
| `kham-pha/tri-tue/tri-tue-la-gi` | Nền tảng | loi | tu-duy-tri-tue |  |
| `kham-pha/tri-tue/hieu-ung-flynn` | Nền tảng | loi | tu-duy-tri-tue |  |

## D5-L2 (5 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `kham-pha/tu-duy/thien-kien-xac-nhan` | Nền tảng | loi | tu-duy-tri-tue |  |
| `kham-pha/tu-duy/linh-cam-va-xac-suat` | Nền tảng | loi | tu-duy-tri-tue |  |
| `kham-pha/tu-duy/tu-duy-nhanh-cham` | Nền tảng | loi | tu-duy-tri-tue |  |
| `kham-pha/tu-duy/tin-dieu-vo-ly` | Nền tảng | loi | tu-duy-tri-tue |  |
| `kham-pha/tu-duy/dunning-kruger` | Chủ đề mở rộng | mo-rong | tu-duy-tri-tue | hạn xem lại 12–18 tháng |

## D5-L3 (7 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `kham-pha/chu-y-tri-giac/ao-giac-thi-giac` | Nền tảng | loi | tri-giac-chu-y |  |
| `kham-pha/chu-y-tri-giac/nhin-ma-khong-thay` | Nền tảng | loi | tri-giac-chu-y |  |
| `kham-pha/chu-y-tri-giac/nghe-chon-loc` | Nền tảng | loi | tri-giac-chu-y |  |
| `kham-pha/chu-y-tri-giac/da-nhiem-so` | Chủ đề mở rộng | mo-rong | tri-giac-chu-y | hạn xem lại 12–18 tháng |
| `kham-pha/tinh-cach/big-five` | Nền tảng | loi | tinh-cach |  |
| `kham-pha/tinh-cach/tinh-cach-thay-doi` | Nền tảng | loi | tinh-cach |  |
| `kham-pha/tinh-cach/mbti` | Chủ đề mở rộng | mo-rong | tinh-cach | hạn xem lại 12–18 tháng |

## D5-L4 (8 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `kham-pha/tam-ly-xa-hoi/phu-hop-so-dong` | Nền tảng | loi | tam-ly-xa-hoi |  |
| `kham-pha/tam-ly-xa-hoi/bat-hoa-nhan-thuc` | Nền tảng | loi | tam-ly-xa-hoi |  |
| `kham-pha/tam-ly-xa-hoi/thuyet-phuc` | Nền tảng | loi | tam-ly-xa-hoi |  |
| `kham-pha/tam-ly-xa-hoi/dinh-kien` | Nền tảng | loi | tam-ly-xa-hoi |  |
| `kham-pha/cam-xuc-dong-luc/cam-xuc-co-ban` | Nền tảng | loi | cam-xuc-dong-luc |  |
| `kham-pha/cam-xuc-dong-luc/thuong-va-dong-luc` | Nền tảng | loi | cam-xuc-dong-luc |  |
| `kham-pha/cam-xuc-dong-luc/dieu-tiet-cam-xuc` | Nền tảng | loi | cam-xuc-dong-luc |  |
| `kham-pha/cam-xuc-dong-luc/tri-tue-cam-xuc` | Chủ đề mở rộng | mo-rong | cam-xuc-dong-luc | hạn xem lại 12–18 tháng |

## D6-L1 (7 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `kham-pha/cang-thang-giac-ngu/stress-co-hai` | Chủ đề mở rộng | mo-rong | cang-thang-suc-khoe | hạn xem lại 12–18 tháng |
| `kham-pha/cang-thang-giac-ngu/ngu-va-tri-nho` | Nền tảng | loi | y-thuc-giac-ngu |  |
| `kham-pha/cang-thang-giac-ngu/doi-pho-stress` | Nền tảng | loi | cang-thang-suc-khoe |  |
| `kham-pha/cang-thang-giac-ngu/giac-mo` | Nền tảng | loi | y-thuc-giac-ngu |  |
| `kham-pha/hanh-phuc/tien-va-hanh-phuc` | Chủ đề mở rộng | mo-rong | hanh-phuc | hạn xem lại 12–18 tháng |
| `kham-pha/hanh-phuc/do-hanh-phuc` | Nền tảng | loi | hanh-phuc |  |
| `kham-pha/hanh-phuc/dong-chay-flow` | Chủ đề mở rộng | mo-rong | hanh-phuc | hạn xem lại 12–18 tháng |

## D6-L2 (6 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `kham-pha/co-so-sinh-hoc/nao-che-doi` | Nền tảng | loi | co-so-sinh-hoc |  |
| `kham-pha/co-so-sinh-hoc/gen-va-tinh-cach` | Nền tảng | loi | co-so-sinh-hoc |  |
| `kham-pha/co-so-sinh-hoc/nao-tuoi-teen` | Nền tảng | loi | co-so-sinh-hoc |  |
| `kham-pha/co-so-sinh-hoc/dopamine` | Chủ đề mở rộng | mo-rong | co-so-sinh-hoc | hạn xem lại 12–18 tháng |
| `kham-pha/co-so-sinh-hoc/tam-ly-tien-hoa` | Nền tảng | loi | co-so-sinh-hoc |  |
| `kham-pha/co-so-sinh-hoc/the-duc-nao` | Chủ đề mở rộng | mo-rong | co-so-sinh-hoc | hạn xem lại 12–18 tháng |

## D6-L3 (7 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `kham-pha/phat-trien/tre-hoc-the-nao` | Nền tảng | loi | phat-trien |  |
| `kham-pha/phat-trien/tre-hoc-noi` | Nền tảng | loi | phat-trien |  |
| `kham-pha/phat-trien/gan-bo` | Nền tảng | loi | phat-trien |  |
| `kham-pha/phat-trien/ban-sac-tuoi-teen` | Nền tảng | loi | phat-trien |  |
| `kham-pha/phat-trien/tam-ly-hoc-duong` | Chủ đề mở rộng | mo-rong | phat-trien | hạn xem lại 12–18 tháng |
| `kham-pha/phat-trien/mang-xa-hoi-teen` | Chủ đề mở rộng | mo-rong | phat-trien | hạn xem lại 12–18 tháng |
| `kham-pha/phat-trien/tuoi-gia` | Nền tảng | loi | phat-trien |  |

## D7-L1 (4 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `kham-pha/suc-khoe-tam-than/tram-cam` | Nền tảng | loi | suc-khoe-tam-than | khóa sau khi chuyên gia đọc |
| `kham-pha/suc-khoe-tam-than/lo-au` | Nền tảng | loi | suc-khoe-tam-than | khóa sau khi chuyên gia đọc |
| `kham-pha/suc-khoe-tam-than/tim-giup-do` | Nền tảng | loi | suc-khoe-tam-than | khóa sau khi chuyên gia đọc |
| `kham-pha/suc-khoe-tam-than/tri-lieu-tam-ly` | Nền tảng | loi | suc-khoe-tam-than | khóa sau khi chuyên gia đọc |

## D8-L1 (6 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `trai-nghiem/index` | Tự trải nghiệm | khung |  |  |
| `trai-nghiem/stroop` | Tự trải nghiệm | cong-cu | tri-giac-chu-y | số liệu nghiên cứu trong mã đưa vào hồ sơ |
| `trai-nghiem/do-dai-tri-nho` | Tự trải nghiệm | cong-cu | tri-nho | số liệu nghiên cứu trong mã đưa vào hồ sơ |
| `trai-nghiem/ao-giac-thi-giac` | Tự trải nghiệm | cong-cu | tri-giac-chu-y | số liệu nghiên cứu trong mã đưa vào hồ sơ |
| `trai-nghiem/mu-thay-doi` | Tự trải nghiệm | cong-cu | tri-giac-chu-y | số liệu nghiên cứu trong mã đưa vào hồ sơ |
| `trai-nghiem/ebbinghaus` | Tự trải nghiệm | cong-cu | tri-giac-chu-y | số liệu nghiên cứu trong mã đưa vào hồ sơ |

## D8-L2 (6 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `trai-nghiem/tri-nho-sai` | Tự trải nghiệm | cong-cu | tri-nho | số liệu nghiên cứu trong mã đưa vào hồ sơ |
| `trai-nghiem/wason-246` | Tự trải nghiệm | cong-cu | tu-duy-tri-tue | số liệu nghiên cứu trong mã đưa vào hồ sơ |
| `trai-nghiem/linda` | Tự trải nghiệm | cong-cu | tu-duy-tri-tue | số liệu nghiên cứu trong mã đưa vào hồ sơ |
| `trai-nghiem/big-five-mini` | Tự trải nghiệm | cong-cu | tinh-cach | số liệu nghiên cứu trong mã đưa vào hồ sơ |
| `trai-nghiem/neo-gia` | Tự trải nghiệm | cong-cu | tu-duy-tri-tue | số liệu nghiên cứu trong mã đưa vào hồ sơ |
| `trai-nghiem/tri-nho-tu` | Tự trải nghiệm | cong-cu | tri-nho | số liệu nghiên cứu trong mã đưa vào hồ sơ |

## D8-L3 (2 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `bat-dau/ban-nghi-gi` | Bắt đầu | loi | phuong-phap | 20 khẳng định đúng, sai, tranh cãi: kiểm cùng thẻ ngộ nhận |
| `ngo-nhan/index` | Ngộ nhận | du-lieu |  | trang sinh từ 60 thẻ trong src/data/; khóa từng thẻ |

## D8-L4 (7 trang)

| Trang | Nhóm menu | Tầng | Lĩnh vực | Ghi chú |
|---|---|---|---|---|
| `sach/index` | Thêm | khung |  | sinh lúc build từ trang đã khóa, không commit file sinh |
| `sach/tom-tat` | Thêm | khung |  | sinh lúc build từ trang đã khóa, không commit file sinh |
| `them/gioi-thieu` | Thêm | khung |  |  |
| `them/du-lieu-cua-toi` | Thêm | cong-cu |  | dữ liệu trong trình duyệt, khóa psyche-zero |
| `them/nhat-ky` | Thêm | cong-cu |  | dữ liệu trong trình duyệt, khóa psyche-zero |
| `them/nghien-cuu-moi` | Thêm | cap-nhat |  | dòng cập nhật: chỉ thêm, có ngày |
| `them/cap-nhat` | Thêm | cap-nhat |  | dòng cập nhật: chỉ thêm, có ngày |

