# Đối chiếu chức năng với site cũ

Đợt 9, 17/11/2026. Site cũ: repo `psyche-zero` (MkDocs, commit `1ca5a80`, 22/10/2026), đọc ở thư mục cạnh, không sửa gì. Phần A kiểm bằng script (so `tests/trang-site-cu.txt` và `dist/` của `npm run build`; `tests/doi-chieu.test.mjs` kiểm lại mỗi lần chạy `npm test`). Phần B đọc `hooks/`, `overrides/`, `docs/assets/`, `.github/workflows/`, `mkdocs.yml` của site cũ và đối chiếu với mã, bản build của site mới.

**Kết luận:** không thiếu trang nào. Thiếu vài chỗ nhỏ, không chặn việc tắt site cũ: nút "In bài này" ở từng bài, ba hay bốn id tiêu đề cũ đã đổi khi bài được viết lại, hai máy canh hằng tuần của site cũ (link hỏng, nhắc trang Hỗ trợ: việc chính của đợt 9, chưa làm), và trang 404 còn nói "đang được làm lại". Ảnh chia sẻ link (og:image) thiếu thì đã thêm ở `astro.config.mjs` trong lô này. Chi tiết và đề xuất ở mục C.

## A. Trang

106 trang của site cũ (nav của `mkdocs.yml` trùng 106 file `docs/**/*.md`), địa chỉ giữ nguyên (luật 4). Kết quả: 106 trang có trong bản thật (đều đã khóa), 0 trang chỉ ở bản xem, 0 trang gộp, 0 trang bỏ. Site mới có thêm 16 trang: 14 trang lĩnh vực `nen-tang/<mã>/`, `bat-dau/cach-kiem-chung` (trang mới), và `404`. Tổng 121 trang index cộng 404 trong `dist/`.

Cột cuối: số id tiêu đề (h2 trở xuống) của trang cũ không còn ở trang mới (so `site/` của site cũ với `dist/`). Bốn trang đổi hẳn nội dung khi chuyển (Sách in, Cập nhật, Nghiên cứu mới, và trang chủ, các trang mục lục) nên ghi "viết lại", không so.

| Trang cũ (`/psyche-zero/…`) | Trang mới (`/psyche/…`) | Tầng | Lĩnh vực | Trạng thái | Id tiêu đề cũ không còn |
|---|---|---|---|---|---|
| `bang-chung/co-mau-suc-manh` | `bang-chung/co-mau-suc-manh` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/dao-duc-nghien-cuu` | `bang-chung/dao-duc-nghien-cuu` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/do-lon-hieu-ung` | `bang-chung/do-lon-hieu-ung` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật | 1 |
| `bang-chung/do-luong` | `bang-chung/do-luong` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/doc-bai-bao-khoa-hoc` | `bang-chung/doc-bai-bao-khoa-hoc` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật | 1 |
| `bang-chung` | `bang-chung` | khung | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/khung-hoang-tai-lap` | `bang-chung/khung-hoang-tai-lap` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/mau-va-chon-mau` | `bang-chung/mau-va-chon-mau` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/p-value` | `bang-chung/p-value` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/phan-tich-tong-hop` | `bang-chung/phan-tich-tong-hop` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/thi-nghiem-doi-chung` | `bang-chung/thi-nghiem-doi-chung` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/thong-ke-mo-ta` | `bang-chung/thong-ke-mo-ta` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bang-chung/tuong-quan-nhan-qua` | `bang-chung/tuong-quan-nhan-qua` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bat-dau/ban-nghi-gi` | `bat-dau/ban-nghi-gi` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bat-dau/doc-nhan-chac-chan` | `bat-dau/doc-nhan-chac-chan` | loi | Tâm lý học là gì, phương pháp | Đã lên site thật |  |
| `bat-dau` | `bat-dau` | khung |  | Đã lên site thật |  |
| `ho-tro` | `ho-tro` | co-han | Sức khỏe tâm thần, trị liệu | Đã lên site thật |  |
| `(trang chủ)` | `(trang chủ)` | khung |  | Đã lên site thật | 3 |
| `kham-pha/cam-xuc-dong-luc/cam-xuc-co-ban` | `kham-pha/cam-xuc-dong-luc/cam-xuc-co-ban` | loi | Cảm xúc và động lực | Đã lên site thật |  |
| `kham-pha/cam-xuc-dong-luc/dieu-tiet-cam-xuc` | `kham-pha/cam-xuc-dong-luc/dieu-tiet-cam-xuc` | loi | Cảm xúc và động lực | Đã lên site thật |  |
| `kham-pha/cam-xuc-dong-luc/thuong-va-dong-luc` | `kham-pha/cam-xuc-dong-luc/thuong-va-dong-luc` | loi | Cảm xúc và động lực | Đã lên site thật |  |
| `kham-pha/cam-xuc-dong-luc/tri-tue-cam-xuc` | `kham-pha/cam-xuc-dong-luc/tri-tue-cam-xuc` | mo-rong | Cảm xúc và động lực | Đã lên site thật |  |
| `kham-pha/cang-thang-giac-ngu/doi-pho-stress` | `kham-pha/cang-thang-giac-ngu/doi-pho-stress` | loi | Căng thẳng và sức khỏe | Đã lên site thật |  |
| `kham-pha/cang-thang-giac-ngu/giac-mo` | `kham-pha/cang-thang-giac-ngu/giac-mo` | loi | Ý thức và giấc ngủ | Đã lên site thật |  |
| `kham-pha/cang-thang-giac-ngu/ngu-va-tri-nho` | `kham-pha/cang-thang-giac-ngu/ngu-va-tri-nho` | loi | Ý thức và giấc ngủ | Đã lên site thật |  |
| `kham-pha/cang-thang-giac-ngu/stress-co-hai` | `kham-pha/cang-thang-giac-ngu/stress-co-hai` | mo-rong | Căng thẳng và sức khỏe | Đã lên site thật |  |
| `kham-pha/chu-y-tri-giac/ao-giac-thi-giac` | `kham-pha/chu-y-tri-giac/ao-giac-thi-giac` | loi | Cảm giác, tri giác, chú ý | Đã lên site thật |  |
| `kham-pha/chu-y-tri-giac/da-nhiem-so` | `kham-pha/chu-y-tri-giac/da-nhiem-so` | mo-rong | Cảm giác, tri giác, chú ý | Đã lên site thật |  |
| `kham-pha/chu-y-tri-giac/nghe-chon-loc` | `kham-pha/chu-y-tri-giac/nghe-chon-loc` | loi | Cảm giác, tri giác, chú ý | Đã lên site thật |  |
| `kham-pha/chu-y-tri-giac/nhin-ma-khong-thay` | `kham-pha/chu-y-tri-giac/nhin-ma-khong-thay` | loi | Cảm giác, tri giác, chú ý | Đã lên site thật | 2 |
| `kham-pha/co-so-sinh-hoc/dopamine` | `kham-pha/co-so-sinh-hoc/dopamine` | mo-rong | Cơ sở sinh học | Đã lên site thật |  |
| `kham-pha/co-so-sinh-hoc/gen-va-tinh-cach` | `kham-pha/co-so-sinh-hoc/gen-va-tinh-cach` | loi | Cơ sở sinh học | Đã lên site thật |  |
| `kham-pha/co-so-sinh-hoc/nao-che-doi` | `kham-pha/co-so-sinh-hoc/nao-che-doi` | loi | Cơ sở sinh học | Đã lên site thật |  |
| `kham-pha/co-so-sinh-hoc/nao-tuoi-teen` | `kham-pha/co-so-sinh-hoc/nao-tuoi-teen` | loi | Cơ sở sinh học | Đã lên site thật |  |
| `kham-pha/co-so-sinh-hoc/tam-ly-tien-hoa` | `kham-pha/co-so-sinh-hoc/tam-ly-tien-hoa` | loi | Cơ sở sinh học | Đã lên site thật |  |
| `kham-pha/co-so-sinh-hoc/the-duc-nao` | `kham-pha/co-so-sinh-hoc/the-duc-nao` | mo-rong | Cơ sở sinh học | Đã lên site thật |  |
| `kham-pha/hanh-phuc/do-hanh-phuc` | `kham-pha/hanh-phuc/do-hanh-phuc` | loi | Hạnh phúc | Đã lên site thật |  |
| `kham-pha/hanh-phuc/dong-chay-flow` | `kham-pha/hanh-phuc/dong-chay-flow` | mo-rong | Hạnh phúc | Đã lên site thật |  |
| `kham-pha/hanh-phuc/tien-va-hanh-phuc` | `kham-pha/hanh-phuc/tien-va-hanh-phuc` | mo-rong | Hạnh phúc | Đã lên site thật |  |
| `kham-pha` | `kham-pha` | khung |  | Đã lên site thật | 5 |
| `kham-pha/phat-trien/ban-sac-tuoi-teen` | `kham-pha/phat-trien/ban-sac-tuoi-teen` | loi | Phát triển suốt đời | Đã lên site thật |  |
| `kham-pha/phat-trien/gan-bo` | `kham-pha/phat-trien/gan-bo` | loi | Phát triển suốt đời | Đã lên site thật |  |
| `kham-pha/phat-trien/mang-xa-hoi-teen` | `kham-pha/phat-trien/mang-xa-hoi-teen` | mo-rong | Phát triển suốt đời | Đã lên site thật |  |
| `kham-pha/phat-trien/tam-ly-hoc-duong` | `kham-pha/phat-trien/tam-ly-hoc-duong` | mo-rong | Phát triển suốt đời | Đã lên site thật |  |
| `kham-pha/phat-trien/tre-hoc-noi` | `kham-pha/phat-trien/tre-hoc-noi` | loi | Phát triển suốt đời | Đã lên site thật |  |
| `kham-pha/phat-trien/tre-hoc-the-nao` | `kham-pha/phat-trien/tre-hoc-the-nao` | loi | Phát triển suốt đời | Đã lên site thật |  |
| `kham-pha/phat-trien/tuoi-gia` | `kham-pha/phat-trien/tuoi-gia` | loi | Phát triển suốt đời | Đã lên site thật |  |
| `kham-pha/suc-khoe-tam-than/lo-au` | `kham-pha/suc-khoe-tam-than/lo-au` | loi | Sức khỏe tâm thần, trị liệu | Đã lên site thật |  |
| `kham-pha/suc-khoe-tam-than/tim-giup-do` | `kham-pha/suc-khoe-tam-than/tim-giup-do` | loi | Sức khỏe tâm thần, trị liệu | Đã lên site thật |  |
| `kham-pha/suc-khoe-tam-than/tram-cam` | `kham-pha/suc-khoe-tam-than/tram-cam` | loi | Sức khỏe tâm thần, trị liệu | Đã lên site thật |  |
| `kham-pha/suc-khoe-tam-than/tri-lieu-tam-ly` | `kham-pha/suc-khoe-tam-than/tri-lieu-tam-ly` | loi | Sức khỏe tâm thần, trị liệu | Đã lên site thật | 6 |
| `kham-pha/tam-ly-xa-hoi/bat-hoa-nhan-thuc` | `kham-pha/tam-ly-xa-hoi/bat-hoa-nhan-thuc` | loi | Tâm lý xã hội | Đã lên site thật |  |
| `kham-pha/tam-ly-xa-hoi/dinh-kien` | `kham-pha/tam-ly-xa-hoi/dinh-kien` | loi | Tâm lý xã hội | Đã lên site thật |  |
| `kham-pha/tam-ly-xa-hoi/phu-hop-so-dong` | `kham-pha/tam-ly-xa-hoi/phu-hop-so-dong` | loi | Tâm lý xã hội | Đã lên site thật | 1 |
| `kham-pha/tam-ly-xa-hoi/thuyet-phuc` | `kham-pha/tam-ly-xa-hoi/thuyet-phuc` | loi | Tâm lý xã hội | Đã lên site thật |  |
| `kham-pha/tinh-cach/big-five` | `kham-pha/tinh-cach/big-five` | loi | Tính cách | Đã lên site thật |  |
| `kham-pha/tinh-cach/mbti` | `kham-pha/tinh-cach/mbti` | mo-rong | Tính cách | Đã lên site thật |  |
| `kham-pha/tinh-cach/tinh-cach-thay-doi` | `kham-pha/tinh-cach/tinh-cach-thay-doi` | loi | Tính cách | Đã lên site thật |  |
| `kham-pha/tri-nho/bang-ghi-hinh` | `kham-pha/tri-nho/bang-ghi-hinh` | loi | Trí nhớ | Đã lên site thật |  |
| `kham-pha/tri-nho/duong-cong-quen` | `kham-pha/tri-nho/duong-cong-quen` | loi | Trí nhớ | Đã lên site thật |  |
| `kham-pha/tri-nho/phong-cach-hoc` | `kham-pha/tri-nho/phong-cach-hoc` | mo-rong | Trí nhớ | Đã lên site thật |  |
| `kham-pha/tri-nho/tri-nho-lam-viec` | `kham-pha/tri-nho/tri-nho-lam-viec` | loi | Trí nhớ | Đã lên site thật |  |
| `kham-pha/tri-nho/vi-sao-ta-quen` | `kham-pha/tri-nho/vi-sao-ta-quen` | loi | Trí nhớ | Đã lên site thật |  |
| `kham-pha/tri-tue/hieu-ung-flynn` | `kham-pha/tri-tue/hieu-ung-flynn` | loi | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật |  |
| `kham-pha/tri-tue/tri-tue-la-gi` | `kham-pha/tri-tue/tri-tue-la-gi` | loi | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật | 1 |
| `kham-pha/tu-duy/dunning-kruger` | `kham-pha/tu-duy/dunning-kruger` | mo-rong | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật |  |
| `kham-pha/tu-duy/linh-cam-va-xac-suat` | `kham-pha/tu-duy/linh-cam-va-xac-suat` | loi | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật |  |
| `kham-pha/tu-duy/thien-kien-xac-nhan` | `kham-pha/tu-duy/thien-kien-xac-nhan` | loi | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật |  |
| `kham-pha/tu-duy/tin-dieu-vo-ly` | `kham-pha/tu-duy/tin-dieu-vo-ly` | loi | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật | 1 |
| `kham-pha/tu-duy/tu-duy-nhanh-cham` | `kham-pha/tu-duy/tu-duy-nhanh-cham` | loi | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật |  |
| `ngo-nhan` | `ngo-nhan` | du-lieu |  | Đã lên site thật |  |
| `sach` | `sach` | khung |  | Đã lên site thật | viết lại |
| `sach/tom-tat` | `sach/tom-tat` | khung |  | Đã lên site thật | viết lại |
| `them/cap-nhat` | `them/cap-nhat` | cap-nhat |  | Đã lên site thật | viết lại |
| `them/du-lieu-cua-toi` | `them/du-lieu-cua-toi` | cong-cu |  | Đã lên site thật |  |
| `them/gioi-thieu` | `them/gioi-thieu` | khung |  | Đã lên site thật | 1 |
| `them/nghien-cuu-moi` | `them/nghien-cuu-moi` | cap-nhat |  | Đã lên site thật | viết lại |
| `them/nhat-ky` | `them/nhat-ky` | cong-cu |  | Đã lên site thật |  |
| `thi-nghiem/asch` | `thi-nghiem/asch` | loi | Tâm lý xã hội | Đã lên site thật |  |
| `thi-nghiem/bandura` | `thi-nghiem/bandura` | loi | Học tập | Đã lên site thật |  |
| `thi-nghiem/darley-latane` | `thi-nghiem/darley-latane` | loi | Tâm lý xã hội | Đã lên site thật |  |
| `thi-nghiem/harlow` | `thi-nghiem/harlow` | loi | Phát triển suốt đời | Đã lên site thật | 1 |
| `thi-nghiem` | `thi-nghiem` | khung |  | Đã lên site thật |  |
| `thi-nghiem/keo-deo` | `thi-nghiem/keo-deo` | loi | Phát triển suốt đời | Đã lên site thật |  |
| `thi-nghiem/khi-dot-vo-hinh` | `thi-nghiem/khi-dot-vo-hinh` | loi | Cảm giác, tri giác, chú ý | Đã lên site thật |  |
| `thi-nghiem/little-albert` | `thi-nghiem/little-albert` | loi | Học tập | Đã lên site thật |  |
| `thi-nghiem/milgram` | `thi-nghiem/milgram` | loi | Tâm lý xã hội | Đã lên site thật |  |
| `thi-nghiem/pavlov` | `thi-nghiem/pavlov` | loi | Học tập | Đã lên site thật |  |
| `thi-nghiem/pygmalion` | `thi-nghiem/pygmalion` | loi | Tâm lý xã hội | Đã lên site thật |  |
| `thi-nghiem/robbers-cave` | `thi-nghiem/robbers-cave` | loi | Tâm lý xã hội | Đã lên site thật |  |
| `thi-nghiem/schachter-singer` | `thi-nghiem/schachter-singer` | loi | Cảm xúc và động lực | Đã lên site thật | 1 |
| `thi-nghiem/seligman` | `thi-nghiem/seligman` | loi | Học tập | Đã lên site thật |  |
| `thi-nghiem/skinner` | `thi-nghiem/skinner` | loi | Học tập | Đã lên site thật |  |
| `thi-nghiem/zimbardo` | `thi-nghiem/zimbardo` | loi | Tâm lý xã hội | Đã lên site thật | 1 |
| `trai-nghiem/ao-giac-thi-giac` | `trai-nghiem/ao-giac-thi-giac` | cong-cu | Cảm giác, tri giác, chú ý | Đã lên site thật |  |
| `trai-nghiem/big-five-mini` | `trai-nghiem/big-five-mini` | cong-cu | Tính cách | Đã lên site thật | 5 |
| `trai-nghiem/do-dai-tri-nho` | `trai-nghiem/do-dai-tri-nho` | cong-cu | Trí nhớ | Đã lên site thật | 1 |
| `trai-nghiem/ebbinghaus` | `trai-nghiem/ebbinghaus` | cong-cu | Cảm giác, tri giác, chú ý | Đã lên site thật |  |
| `trai-nghiem` | `trai-nghiem` | khung |  | Đã lên site thật |  |
| `trai-nghiem/linda` | `trai-nghiem/linda` | cong-cu | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật |  |
| `trai-nghiem/mu-thay-doi` | `trai-nghiem/mu-thay-doi` | cong-cu | Cảm giác, tri giác, chú ý | Đã lên site thật |  |
| `trai-nghiem/neo-gia` | `trai-nghiem/neo-gia` | cong-cu | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật |  |
| `trai-nghiem/stroop` | `trai-nghiem/stroop` | cong-cu | Cảm giác, tri giác, chú ý | Đã lên site thật |  |
| `trai-nghiem/tri-nho-sai` | `trai-nghiem/tri-nho-sai` | cong-cu | Trí nhớ | Đã lên site thật |  |
| `trai-nghiem/tri-nho-tu` | `trai-nghiem/tri-nho-tu` | cong-cu | Trí nhớ | Đã lên site thật | 1 |
| `trai-nghiem/wason-246` | `trai-nghiem/wason-246` | cong-cu | Tư duy, ngôn ngữ, trí tuệ | Đã lên site thật |  |

Id tiêu đề cũ không còn: 32 id ở 16 trang (bảng trên), tất cả do bài được viết lại khi kiểm định (đổi tên mục, bỏ mục, đánh số lại danh sách); 1.426 id còn lại ở trang chuyển giữ nguyên (`src/plugins/id-cu.mjs`). Link `#mục` cũ tới 32 id này vẫn mở đúng trang, chỉ không cuộn tới mục.

## B. Chức năng

| Chức năng ở site cũ | Ở site mới | Trạng thái |
|---|---|---|
| Tìm kiếm tiếng Việt không dấu (lunr; hook `search_unaccent.py`, `search_trim.py`) | Pagefind, bọc thêm để "d" ra "đ" (`src/tim-kiem/`); `tests/tim-kiem.test.mjs`, `tests/trinh-duyet/kiem-tim-kiem.mjs` (có bốn cụm của site cũ) | Có, đổi công nghệ. Hook cắt chỉ mục không còn cần |
| Neo tiêu đề không dấu, "đ" thành "d" (`vi_slugs.py`) | `src/plugins/id-cu.mjs` | Có (xem mục A: 32 id đổi theo bài viết lại) |
| Câu hỏi nhanh (`quiz.js`, `.pz-quiz`) | Khối ` ```quiz ` (`src/scripts/quiz.js`) | Có, kết quả lưu như cũ |
| Công cụ: Stroop, độ dài trí nhớ (digit-span), ảo giác thị giác, mù thay đổi, Ebbinghaus, trí nhớ sai, Wason 2-4-6, Linda, Big Five mini, neo giả, trí nhớ từ | `src/scripts/cong-cu/` (11 module, cùng tên hay đổi tên: `digit-span` thành `do-dai-tri-nho`) | Có, 11 trên 11 |
| Trò chơi ngộ nhận "Bạn nghĩ gì về tâm trí?" (`myths.js`, `myths.json`: 60 thẻ) | `ngo-nhan.js`, `src/data/ngo-nhan.yml` (60 thẻ, đã kiểm định) | Có |
| Kho kết quả trong trình duyệt, khóa `psyche-zero` (`progress.js`) | `src/scripts/cong-cu/chung/luu.js`, cùng khóa và dạng bản ghi (`tests/cong-cu.test.mjs`, `tests/them.test.mjs`) | Có, tương thích hai chiều |
| Dữ liệu của tôi: xuất, nhập (gộp, không ghi đè), xóa (`mydata.js`) | `them/du-lieu-cua-toi` (`du-lieu-cua-toi.js`); thêm bật, tắt chế độ ngoại tuyến; tên file `psyche-zero-<ngày>.json` như cũ | Có |
| Nhật ký những gì bạn đã thử (`nhat-ky.js`) | `them/nhat-ky` (`nhat-ky.js`) | Có |
| Sách in, tờ tóm tắt (`sach/`, `sach/tom-tat`) | `sach/` sinh lúc build từ bài đã khóa; `sach/tom-tat/`; `tests/sach.test.mjs`. Hiệu năng của `sach/` miễn khỏi luật 7 (chủ repo, 17/11/2026) | Có |
| Dùng khi mất mạng: `sw.js`, `manifest.webmanifest`, biểu tượng, `apple-touch-icon` | `src/scripts/ngoai-tuyen/` (service worker sinh lúc build, phiên bản theo mã băm bản build), manifest, `icons/`, có công tắc ở Dữ liệu của tôi; `tests/trinh-duyet/kiem-ngoai-tuyen.mjs` | Có, làm lại có phiên bản và công tắc |
| Chế độ tối, tự theo hệ thống, nút đổi (Material palette) | Starlight: chọn Sáng, Tối, Hệ thống; mọi thành phần có bản tối; `theme-color` hai bản | Có |
| In trang: CSS in (`@media print`) | `thanh-phan.css` mục "In": ẩn công cụ, mở khối thu gọn, không ngắt khung nhãn | Có |
| Nút "In bài này" cuối mỗi bài (`in_duoc: true`, 77 bài; `overrides/partials/content.html`) | Frontmatter `in_duoc` còn (75 bài, nay nghĩa là "vào Sách in"); nút thì không | **Thiếu** (xem C1) |
| Dải "đang chờ người có chuyên môn đọc lại" (`can_ra_soat`, 6 trang) | `src/components/PageTitle.astro`, dải "Chưa qua rà soát chuyên môn" sinh từ hồ sơ (`nguoi.cho_chuyen_gia`) | Có, đổi cách dựng |
| Dòng "rà soát nội dung lần cuối" viết tay | Sinh từ hồ sơ kiểm định và `trang.yml` (`PageTitle.astro`) | Có, thay bằng dòng trạng thái kiểm định |
| Lời nhắc Hỗ trợ ở chân mọi trang, dòng riêng tư (`partials/copyright.html`) | `src/components/Footer.astro`; `tests/khung.test.mjs` kiểm | Có |
| Thanh tiến trình chuyển trang có tên (`progress.html`); chuyển trang tức thì (`navigation.instant`) | Không còn: Astro tải trang đầy đủ, nhanh (Lighthouse 100) | Bỏ có lý do: không cần, mỗi trang tự nhẹ |
| Thanh trên, menu theo mục, nút lên đầu trang, mục lục bên | Starlight, bố cục C: tám nhóm, Nền tảng chia 14 lĩnh vực, mục lục bên và mục lục điện thoại | Có, thiết kế lại |
| Hook `content_fixes.py` (nhãn cho ô đánh dấu của danh sách việc) | Trang mới không dùng danh sách việc (bản build không có `type="checkbox"`) | Bỏ có lý do |
| Hook `minify_assets.py` | Astro và Vite tự rút gọn | Bỏ có lý do |
| Open Graph, Twitter card, `og:image` (`overrides/main.html`) | Starlight có `og:title`, `og:description`, `og:url`, `og:type`; `og:image`, `twitter:image` và card `summary` thêm ở `astro.config.mjs` (lô này) | Có (đã thêm) |
| `sitemap.xml` | `sitemap-index.xml`, `sitemap-0.xml` (`@astrojs/sitemap`) | Có |
| RSS, `robots.txt` | Site cũ không có | Không áp dụng |
| Trang 404 | `src/content/docs/404.md`: nút về trang chủ, ô tìm kiếm | Có; lời trang còn nói đang làm lại (C3) |
| Font Be Vietnam Pro (Google Fonts, `preconnect`) | Tự host, không nạp gì từ ngoài (kiểm thử chặn) | Có, tốt hơn |
| Workflow `deploy.yml` (build, kiểm thử Python, đăng) | `deploy.yml` (build bản thật, `npm test`, trình duyệt, Lighthouse, đăng) và `test.yml` cho nhánh | Có, mạnh hơn |
| Workflow `links.yml` (lychee hằng tuần, mở issue khi link hỏng) | Chưa có | **Thiếu**: việc "máy canh hằng tuần" của đợt 9 (C2) |
| Workflow `ho-tro-quarterly.yml` (nhắc kiểm trang Hỗ trợ mỗi quý) | Chưa có | **Thiếu**: cùng việc ở trên (C2) |
| Kiểm thử site cũ: `tests/site/a11y`, `flows`, `pages`, `search`, `content`; `unit/` (stats, progress, wordspan); `test_hooks.py`, `test_content.py` | `tests/*.test.mjs` và `tests/trinh-duyet/` (axe, hiển thị ba trình duyệt, luồng công cụ, tìm kiếm, ngoại tuyến); hàm thuần của công cụ ở `tests/cong-cu.test.mjs` | Có, rộng hơn. Kiểm thử hook Python bỏ theo hook |

## C. Chỗ thiếu và đề xuất

1. **Nút "In bài này".** Site cũ có ở 77 bài (cuối bài, `pz-print-btn`, vùng bấm 44 px). Site mới in được bằng Ctrl/Cmd+P và CSS in có sẵn, và có Sách in; thiếu nút bấm. Đề xuất (mã, không chạm chữ trang nên không đổi mã băm): thêm nút vào `src/components/MarkdownContent.astro` cho trang có `in_duoc`, kiểm axe và vùng bấm; hoặc bỏ có chủ ý vì trình duyệt đã có lệnh In. Chưa làm: cần quyết định, và thêm một khối vào 75 trang.
2. **Máy canh hằng tuần** (link hỏng bằng lychee, nhắc Hỗ trợ mỗi quý): có ở site cũ, chưa có ở site mới. Là việc đầu của đợt 9 (cùng kiểm DOI rút bài, khẳng định hết hạn): làm ở lô riêng.
3. **Trang 404** (đã khóa): lời trang còn viết "Psyche đang được làm lại" và "khi được kiểm chứng xong, nó lên đúng địa chỉ này". Hết đúng sau đợt 9. Sửa khi mở khóa (cùng đợt với trang chủ tạm nếu còn lời tương tự).
4. **Id tiêu đề cũ** (mục A): 32 id ở 16 trang không còn. Nếu muốn giữ link `#mục` cũ còn cuộn đúng, thêm `{ #id-cu }` vào tiêu đề tương ứng khi mở khóa lần sau; không đáng mở khóa riêng, vì site cũ đã tắt và link ngoài tới các mục này chắc rất ít.
5. `src/components/Footer.astro` còn địa chỉ dự phòng tới Hỗ trợ của site cũ (khi trang Hỗ trợ chưa có trong bản build); site cũ đã tắt nên đã bỏ dự phòng ấy trong lô này (link luôn là `/psyche/ho-tro/`).
