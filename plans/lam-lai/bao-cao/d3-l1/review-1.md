# D3-L1, review nội dung phần 1: milgram, zimbardo, darley-latane, asch

Người làm: Claude Opus 5.5 (agent review D3-L1), 30/10/2026. Model: Opus. Không làm lượt 1 hay lượt 2 của lô.

## Phạm vi

Có bốn nhóm nhận định: mọi câu `ve-site`; mọi câu có `luot_2` khác `dung`; mọi câu lượt 1 đã sửa, làm mềm hay bỏ (so chữ cuối trên trang với nguồn); mọi câu `nhan`. Tôi soát thêm các câu thời sự (mốc thời gian, `het_han`). Mỗi câu có `review: dung` hay `sai`, và cuối `ghi_chu` có một câu "Review (Claude Opus 5.5, 30/10/2026): …". Lần kiểm định cuối của bốn hồ sơ có `nguoi.review`. `node tools/khoa.mjs xuat thi-nghiem/<trang>` chạy được với cả bốn trang. Tôi không build, không commit.

## Nguồn tự mở

- Milgram (1974), *Obedience to Authority*: toàn văn ở Internet Archive (`ObedienceToAuthority_368`, bản chữ djvu), chương 6, Thí nghiệm 10.
- Darley & Latané (1968): toàn văn, pdf.stafforini.com.
- Latané & Darley (1968), bài khói; Fischer và cộng sự (2011); Asch (1956); Bond & Smith (1996); Markey (2000): đọc toàn văn bằng các bản PDF mà lượt 1 đã tải (thư mục tạm của phiên). Tôi đã kiểm phần đầu của từng bản là đúng bài.
- Le Texier (2019): bản in (gwern.net/doc/psychology/2019-letexier.pdf), đối chiếu với bản thảo OSF.
- Reicher & Haslam (2006), Haney, Banks & Zimbardo (1973): toàn văn.
- Doliński và cộng sự (2017): siêu dữ liệu ở OpenAlex và Crossref.

## Kết quả

| Trang | Đã xét | dung | sai |
|---|---|---|---|
| milgram | 44 | 36 | 8 |
| zimbardo | 48 | 42 | 6 |
| darley-latane | 47 | 47 | 0 |
| asch | 41 | 40 | 1 |

### Câu sai (đã sửa trang, hồ sơ và `doi_chu`)

**milgram**
- n6, Tự trải nghiệm. Cũ: người thí nghiệm "nói đều đều: Thí nghiệm yêu cầu anh tiếp tục" ngay ở 300V. Mới: ông ta bảo coi im lặng là trả lời sai; bạn ngần ngại; ông ta nói, "giọng chắc chắn mà không thô lỗ", "Xin hãy tiếp tục", rồi "Thí nghiệm yêu cầu anh tiếp tục". Căn cứ: Milgram (1963), tr. 374.
- n32, n33, n34, n52. Cũ: "Doliński và Grzyb (2017)". Mới: "Doliński và cộng sự (2017)", hay "nhóm của Doliński". Sửa ở tiêu đề mục (giữ id cũ `{ #dolinski-va-grzyb-2017-lam-lai-o-ba-lan }`), câu dẫn, khung Khá vững và mục Văn hóa. Mục Nguồn của trang nay ghi đủ bảy tác giả và tên bài đúng ("…Obedience in the experimental paradigm developed by Stanley Milgram in the 50 years following the original studies").
- n46, n48, n64, Bridgeport. Cũ: "47,5% so với 62,5%". Mới: "47,5% so với 65% ở điều kiện tương ứng tại Yale". Sửa ở bốn chỗ: Lý thuyết, Áp dụng, Văn hóa, câu hỏi 5. Mục Lý thuyết và lời giải thích câu hỏi 5 thêm ý "mức giảm không có ý nghĩa thống kê". Milgram (1974) được thêm vào mục Nguồn của trang và vào `nguon` của hồ sơ. Căn cứ là chữ của sách: "48 percent of the Bridgeport subjects delivered the maximum shock versus 65 percent in the corresponding condition at Yale" và "not significantly lower". Con số 62,5% chỉ là phép so mà các sách giáo khoa hay dùng, theo Meta-Milgram.
- Theo lời nhắn của người giao, tôi sửa thêm tiêu đề mục. Cũ: "Milgram (1963): 40 người đàn ông ở Yale". Mới: "…ở vùng New Haven { #milgram-1963-40-nguoi-dan-ong-o-yale }". Căn cứ: Milgram (1963) viết "drawn from New Haven and the surrounding communities". Ghi ở n16 và `doi_chu`.

**zimbardo**
- n17. Cũ: "Sau 2 ngày, tù nhân nổi loạn". Mới: "Ngay ngày thứ hai, tù nhân nổi loạn". Căn cứ: Le Texier, "the rebellion on the second day".
- n18. Cũ: "Một loạt vấn đề lộ ra: cai tù đã nhận hướng dẫn chi tiết…". Mới: "Theo Le Texier, hồ sơ lưu trữ cho thấy…: cai tù đã nhận hướng dẫn chi tiết…, trái với báo cáo gốc nói họ cố ý chỉ được hướng dẫn tối thiểu". Căn cứ: Haney (1973), "intentionally given only minimal guidelines".
- n20. Cũ: "hai trong 10 tù nhân". Mới: "hai trong 11 tù nhân mà ông đếm". Bản in của Le Texier ghi "Out of the 11 prisoners"; bản thảo ghi 10.
- n25. Cũ: "Nhà xã hội học Thibault Le Texier". Mới: "Thibault Le Texier, nhà nghiên cứu ở Đại học Nice (Pháp)".
- n59. Trang vẫn còn câu "Độc giả Việt Nam có lẽ thường biết thí nghiệm qua sách và báo phổ thông", dù `ghi_chu` của lượt 1 nói đã bỏ. Câu này không có nguồn. Đã bỏ.
- q3b. Trang vẫn giữ chữ cũ, khác `ghi_chu` của lượt 1. Cũ: "sự bất lực của tập thể và vai trò của người lãnh đạo". Mới: "Theo Reicher và Haslam, … sự bất lực và thất bại của các nhóm". Căn cứ: tóm tắt của Reicher & Haslam (2006).

**asch**
- n39, mục Áp dụng. Cũ: "giảm còn khoảng một phần ba (mẫu chỉ 14 người)". Mới: thêm "nên chính Asch nói chưa chứng minh được chênh lệch bằng thống kê". Căn cứ: Asch (1956), Thí nghiệm 4: "we cannot establish a conclusive difference statistically". Kết quả ghi `da-lam-mem`.

**darley-latane**: không có câu sai. Có 27 câu lượt 2 ghi `khong-chac` chỉ vì không mở được bài gốc. Tôi đã mở toàn văn Darley & Latané (1968), bài khói, Fischer (2011) và Markey (2000): mọi chữ và số khớp.

Hai hình không cần sửa. `milgram-obedience` và `bystander-smoke` khớp bài gốc, nên `HINH_DA_SUA` không đổi.

## Nhãn đã chốt

- **milgram**
  - n35 và n69: **Khá vững**, áp lực quyền lực tạo ra mức vâng lời cao. Tôi giữ quyết định hạ nhãn từ Vững chắc của lượt 1. Lý do:
    - Meta-Milgram chỉ gộp các biến thể nhỏ trong chương trình của chính Milgram.
    - Hai lần làm lại hiện đại đều dừng sớm.
    - Perry (2019) cho thấy người hoài nghi màn kịch lại giật mạnh hơn.
  - n38: **Khá vững**, nấc 150V. Packer (2008), do lượt 2 dẫn, cùng chiều.
  - n39 và n42: **Đang tranh cãi**, vâng lời mù quáng hay vì đồng nhất với mục đích.
- **zimbardo**
  - n37: **Vững chắc**, các sự kiện cơ bản.
  - n47: **Đã bị bác bỏ**, "bịa đặt toàn bộ".
  - Với n37 và n47, tôi viết lại `ly_do` và `co_so` cho rõ: thước đo mục 4 viết cho hiệu ứng. Căn cứ ở đây là hồ sơ lưu trữ và việc cả hai phía cùng thừa nhận: Haney (1973), Le Texier (2019), Haslam, Reicher & Van Bavel (2019), Zimbardo & Haney (2020). Tôi cũng sửa "hơn 12 giờ băng hình" thành "khoảng 12 giờ".
  - n40: **Đang tranh cãi**.
  - n44: **Khá vững**, sát ngưỡng (`ly_do` thêm mô tả mẫu của báo cáo gốc).
- **darley-latane**
  - n29: **Vững chắc**, trong tình huống mập mờ, ở mức cá nhân.
  - n31 và n32: **Khá vững**, hiệu ứng yếu đi khi nguy hiểm rõ.
  - n33: **Đã bị bác bỏ**, câu chuyện 38 nhân chứng.
- **asch**
  - n26: **Vững chắc**.
  - n27 và n28: **Khá vững**, khác biệt văn hóa.
  - n29: **Đang tranh cãi**, có méo mó tri giác hay không.

Bốn câu "chưa tìm thấy ở Việt Nam" (milgram n53, zimbardo n57, darley n39, asch n46) đều có mốc 10/2026, `loai: thoi-su` và `het_han`.

## Chỗ chưa chắc, việc cho người giao

- `src/data/nguon.yml` có bản ghi `dolinski2017` (chưa khóa) sai ba chỗ so với Crossref:
  - tác giả: chỉ có hai, phải là bảy;
  - tên bài: ghi "Obedience to authority today";
  - nơi đăng: ghi 8(3), 282–289, phải là 8(8), 927–933, DOI 10.1177/1948550617693060.

  Đây là dữ liệu dùng chung, ngoài phạm vi review, nên tôi chưa sửa. Cũng chưa có bản ghi `milgram1974` trong `nguon.yml`. Hồ sơ trang đã có nguồn này.
- zimbardo n44 (Khá vững): phần "tự chọn lọc" chỉ dựa một nghiên cứu. Tôi chấp nhận vì báo cáo gốc cũng mô tả mẫu hẹp, nhưng nhãn đang sát ngưỡng.
- Le Texier đếm 11 tù nhân (tính cả người vào thay), báo cáo gốc phân tích 10. Trang viết "11 tù nhân mà ông đếm".
- Lượt 2 chưa kiểm các chữ review mới viết. Các câu ấy bám đúng chữ của nguồn đã trích, và phần lớn là `cau_dung` của lượt 2.
- Tôi lỡ ghi đè ba file tạm có sẵn `a.txt`, `d.txt`, `z.txt` và `ds.py` ở gốc thư mục tạm của phiên, không phải trong repo. Nếu agent khác cần các file ấy thì phải tạo lại.

## File đã chạm

- `src/content/docs/thi-nghiem/{milgram,zimbardo,asch}.md`
- `kiem-dinh/thi-nghiem/{milgram,zimbardo,darley-latane,asch}.yml`
- `plans/lam-lai/bao-cao/d3-l1/review-1.md`
