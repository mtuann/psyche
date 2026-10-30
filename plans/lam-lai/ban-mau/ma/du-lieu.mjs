// BẢN MẪU GIAO DIỆN (không đăng). Dữ liệu tạm cho menu và trang chủ mẫu: 14 lĩnh vực của kế hoạch
// (plans/lam-lai/anh-xa.md), câu hỏi lấy từ tên bài của site cũ. Site thật sinh các danh sách này từ src/data/ và chỉ
// liệt kê trang đã khóa (D1.2, D2-L1).

const B = '/psyche/';

/** Lĩnh vực: mã, tên, tên ngắn, sắc độ màu (hue) dùng ở phương án B và C, hai câu hỏi mẫu [tên, đường dẫn]. */
export const LINH_VUC = [
	{ ma: 'phuong-phap', ten: 'Tâm lý học là gì, phương pháp', ngan: 'Phương pháp', h: 232, hoi: [['Uống cà phê giúp sống lâu hơn?', 'bang-chung/tuong-quan-nhan-qua'], ['Vì sao cần nhóm đối chứng?', 'bang-chung/thi-nghiem-doi-chung']] },
	{ ma: 'co-so-sinh-hoc', ten: 'Cơ sở sinh học', ngan: 'Sinh học', h: 350, hoi: [['Não có thực sự chia hai nửa độc lập?', 'kham-pha/co-so-sinh-hoc/nao-che-doi'], ['Gen quyết định bao nhiêu phần con người ta?', 'kham-pha/co-so-sinh-hoc/gen-va-tinh-cach']] },
	{ ma: 'tri-giac-chu-y', ten: 'Cảm giác, tri giác, chú ý', ngan: 'Tri giác', h: 195, hoi: [['Mắt thấy có phải là thật?', 'kham-pha/chu-y-tri-giac/ao-giac-thi-giac'], ['Giữa bữa tiệc ồn ào, sao bạn vẫn nghe thấy tên mình?', 'kham-pha/chu-y-tri-giac/nghe-chon-loc']] },
	{ ma: 'y-thuc-giac-ngu', ten: 'Ý thức và giấc ngủ', ngan: 'Giấc ngủ', h: 262, hoi: [['Ngủ có giúp nhớ bài?', 'kham-pha/cang-thang-giac-ngu/ngu-va-tri-nho'], ['Giấc mơ có ý nghĩa gì?', 'kham-pha/cang-thang-giac-ngu/giac-mo']] },
	{ ma: 'hoc-tap', ten: 'Học tập', ngan: 'Học tập', h: 145, hoi: [['Pavlov và phản xạ có điều kiện', 'thi-nghiem/pavlov'], ['Bandura và búp bê Bobo', 'thi-nghiem/bandura']] },
	{ ma: 'tri-nho', ten: 'Trí nhớ', ngan: 'Trí nhớ', h: 215, hoi: [['Vì sao ta quên?', 'kham-pha/tri-nho/vi-sao-ta-quen'], ['Trí nhớ có giống cuốn băng ghi hình?', 'kham-pha/tri-nho/bang-ghi-hinh']] },
	{ ma: 'tu-duy-tri-tue', ten: 'Tư duy, ngôn ngữ, trí tuệ', ngan: 'Tư duy', h: 38, hoi: [['Vì sao linh cảm hay đánh lừa ta?', 'kham-pha/tu-duy/linh-cam-va-xac-suat'], ['IQ đo được gì?', 'kham-pha/tri-tue/tri-tue-la-gi']] },
	{ ma: 'phat-trien', ten: 'Phát triển suốt đời', ngan: 'Phát triển', h: 100, hoi: [['Bé bám mẹ là tốt hay xấu?', 'kham-pha/phat-trien/gan-bo'], ['Già có lẫn không?', 'kham-pha/phat-trien/tuoi-gia']] },
	{ ma: 'cam-xuc-dong-luc', ten: 'Cảm xúc và động lực', ngan: 'Cảm xúc', h: 12, hoi: [['Cảm xúc có mấy loại cơ bản?', 'kham-pha/cam-xuc-dong-luc/cam-xuc-co-ban'], ['Thưởng có làm mất hứng thú?', 'kham-pha/cam-xuc-dong-luc/thuong-va-dong-luc']] },
	{ ma: 'tinh-cach', ten: 'Tính cách', ngan: 'Tính cách', h: 290, hoi: [['Tính cách có mấy chiều?', 'kham-pha/tinh-cach/big-five'], ['Tính cách có thay đổi theo tuổi?', 'kham-pha/tinh-cach/tinh-cach-thay-doi']] },
	{ ma: 'tam-ly-xa-hoi', ten: 'Tâm lý xã hội', ngan: 'Xã hội', h: 325, hoi: [['Vì sao ta làm theo số đông?', 'kham-pha/tam-ly-xa-hoi/phu-hop-so-dong'], ['Vì sao ta khó đổi ý khi đã chọn?', 'kham-pha/tam-ly-xa-hoi/bat-hoa-nhan-thuc']] },
	{ ma: 'cang-thang-suc-khoe', ten: 'Căng thẳng và sức khỏe', ngan: 'Căng thẳng', h: 25, hoi: [['Stress có luôn có hại?', 'kham-pha/cang-thang-giac-ngu/stress-co-hai'], ['Đối phó stress thế nào cho đúng?', 'kham-pha/cang-thang-giac-ngu/doi-pho-stress']] },
	{ ma: 'hanh-phuc', ten: 'Hạnh phúc', ngan: 'Hạnh phúc', h: 52, hoi: [['Hạnh phúc có đo được không?', 'kham-pha/hanh-phuc/do-hanh-phuc'], ['Nhiều tiền có hạnh phúc hơn?', 'kham-pha/hanh-phuc/tien-va-hanh-phuc']] },
	{ ma: 'suc-khoe-tam-than', ten: 'Sức khỏe tâm thần, trị liệu', ngan: 'Sức khỏe tâm thần', h: 172, hoi: [['Buồn thường và trầm cảm khác nhau thế nào?', 'kham-pha/suc-khoe-tam-than/tram-cam'], ['Khi nào nên tìm sự giúp đỡ chuyên môn?', 'kham-pha/suc-khoe-tam-than/tim-giup-do']] },
];

export const TANG = { loi: 'Nền tảng', 'mo-rong': 'Chủ đề mở rộng', 'cong-cu': 'Tự trải nghiệm' };
export const LOAI = { 'kham-pha': 'Bài khám phá', 'thi-nghiem': 'Thí nghiệm kinh điển' };

/** Trang đã có trong bản mẫu (các trang khác hiện "sắp có"). */
export const DA_CO = new Set(['kham-pha/tri-nho/vi-sao-ta-quen', 'thi-nghiem/asch']);

export const href = (duong) => B + duong + '/';

const SAP_CO = { text: 'sắp có', variant: 'default' };
const muc = (label, duong) => (DA_CO.has(duong) ? { label, slug: duong } : { label, link: href(duong), badge: SAP_CO });

const TRI_NHO = [
	['Vì sao ta quên?', 'kham-pha/tri-nho/vi-sao-ta-quen'],
	['Trí nhớ có giống cuốn băng ghi hình?', 'kham-pha/tri-nho/bang-ghi-hinh'],
	['Học dồn có nhớ lâu?', 'kham-pha/tri-nho/duong-cong-quen'],
	['Não "nháp" thông tin thế nào?', 'kham-pha/tri-nho/tri-nho-lam-viec'],
];

const THI_NGHIEM = [
	['Milgram: vâng lời quyền uy', 'milgram'],
	['Asch: làm theo số đông', 'asch'],
	['Darley và Latané: người ngoài cuộc', 'darley-latane'],
	['Khỉ đột vô hình', 'khi-dot-vo-hinh'],
	['Zimbardo: nhà tù Stanford', 'zimbardo'],
	['Pygmalion: kỳ vọng của thầy', 'pygmalion'],
	['Robbers Cave: hai nhóm trại hè', 'robbers-cave'],
	['Kẹo dẻo: chờ để được hai', 'keo-deo'],
	['Pavlov: phản xạ có điều kiện', 'pavlov'],
	['Skinner: thưởng và phạt', 'skinner'],
	['Harlow: khỉ con và mẹ vải', 'harlow'],
	['Bandura: búp bê Bobo', 'bandura'],
	['Little Albert', 'little-albert'],
	['Schachter và Singer: hai yếu tố của cảm xúc', 'schachter-singer'],
	['Seligman: bất lực tập nhiễm', 'seligman'],
];

const BANG_CHUNG = [
	['Tương quan và nhân quả', 'tuong-quan-nhan-qua'],
	['Vì sao cần nhóm đối chứng?', 'thi-nghiem-doi-chung'],
	['Hiệu ứng lớn hay nhỏ?', 'do-lon-hieu-ung'],
	['Mẫu và chọn mẫu', 'mau-va-chon-mau'],
	['Giá trị p', 'p-value'],
	['Khủng hoảng tái lập', 'khung-hoang-tai-lap'],
	['Phân tích tổng hợp', 'phan-tich-tong-hop'],
	['Đọc một bài báo khoa học', 'doc-bai-bao-khoa-hoc'],
];

const TRAI_NGHIEM = [
	['Hiệu ứng Stroop', 'stroop'],
	['Bạn nhớ được bao nhiêu chữ số?', 'do-dai-tri-nho'],
	['Ảo giác thị giác', 'ao-giac-thi-giac'],
	['Mù thay đổi', 'mu-thay-doi'],
	['Nhiệm vụ 2-4-6 của Wason', 'wason-246'],
	['Bài toán Linda', 'linda'],
];

export const SIDEBAR = [
	{
		label: 'Bắt đầu',
		items: [
			muc('Tâm lý học là gì, và không là gì?', 'bat-dau'),
			muc('Cách đọc nhãn mức độ chắc chắn', 'bat-dau/doc-nhan-chac-chan'),
			muc('Cách Psyche kiểm chứng', 'bat-dau/cach-kiem-chung'),
		],
	},
	{
		label: 'Nền tảng',
		collapsed: true,
		items: LINH_VUC.map((lv) => ({
			label: lv.ten,
			collapsed: true,
			items: (lv.ma === 'tri-nho' ? TRI_NHO : lv.hoi).map(([t, d]) => muc(t, d)),
		})),
	},
	{ label: 'Thí nghiệm kinh điển', collapsed: true, items: THI_NGHIEM.map(([t, d]) => muc(t, 'thi-nghiem/' + d)) },
	{ label: 'Hiểu bằng chứng', collapsed: true, items: BANG_CHUNG.map(([t, d]) => muc(t, 'bang-chung/' + d)) },
	{ label: 'Tự trải nghiệm', collapsed: true, items: TRAI_NGHIEM.map(([t, d]) => muc(t, 'trai-nghiem/' + d)) },
	muc('Ngộ nhận phổ biến', 'ngo-nhan'),
	muc('Hỗ trợ', 'ho-tro'),
];
