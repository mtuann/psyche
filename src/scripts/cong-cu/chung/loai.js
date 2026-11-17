// Tên và trang của từng loại bản ghi trong kho kết quả (chung/luu.js), cho hai trang đọc kho: Dữ liệu của tôi và Nhật ký
// (D8-L4; viết lại từ KINDS của ../psyche-zero/docs/assets/js/nhat-ky.js và mydata.js). `kind` và tên trường như site
// cũ, gồm cả loại của công cụ chưa chuyển (D8-L2, D8-L3): người dùng cũ đã có bản ghi ấy. Hàm thuần (kiểm thử trong Node).
import { so } from './giao-dien.js';

/** kind -> { ten: tên hoạt động, trang: trang của công cụ (đường dẫn trong src/content/docs/) hay null }. */
export const LOAI = {
	stroop: { ten: 'Hiệu ứng Stroop', trang: 'trai-nghiem/stroop' },
	digitspan: { ten: 'Độ dài trí nhớ chữ số', trang: 'trai-nghiem/do-dai-tri-nho' },
	illusion: { ten: 'Ảo giác Müller-Lyer', trang: 'trai-nghiem/ao-giac-thi-giac' },
	changeblind: { ten: 'Mù thay đổi', trang: 'trai-nghiem/mu-thay-doi' },
	ebbinghaus: { ten: 'Ảo giác Ebbinghaus', trang: 'trai-nghiem/ebbinghaus' },
	falsememory: { ten: 'Trí nhớ sai', trang: 'trai-nghiem/tri-nho-sai' },
	wason: { ten: 'Trò chơi 2-4-6 của Wason', trang: 'trai-nghiem/wason-246' },
	linda: { ten: 'Bài toán Linda', trang: 'trai-nghiem/linda' },
	bigfive: { ten: 'Bài thử Big Five rút gọn', trang: 'trai-nghiem/big-five-mini' },
	anchoring: { ten: 'Hiệu ứng mỏ neo', trang: 'trai-nghiem/neo-gia' },
	wordspan: { ten: 'Độ dài trí nhớ từ', trang: 'trai-nghiem/tri-nho-tu' },
	myths: { ten: 'Bạn nghĩ gì về tâm trí? (thẻ ngộ nhận)', trang: 'bat-dau/ban-nghi-gi' },
	quiz: { ten: 'Thử suy ngẫm', trang: null },
};

/** Tên của một loại cho người đọc; loại lạ (bản sao lưu từ nơi khác) giữ nguyên mã. */
export const tenLoai = (kind) => LOAI[kind]?.ten ?? kind;

/**
 * Trang của câu hỏi trong bản ghi "quiz" (trường quiz: "/psyche/kham-pha/x#quiz-0", hay "/psyche-zero/kham-pha/x/#quiz-0"
 * của site cũ: cùng đường dẫn trang, luật 4 của kế hoạch). Trả về "kham-pha/x" hay null.
 */
export function trangCuaQuiz(quiz) {
	if (typeof quiz !== 'string') return null;
	const m = /^\/psyche(?:-zero)?\/([^#?]*)/.exec(quiz);
	if (!m) return null;
	const t = m[1].replace(/\/+$/, '');
	return t ? t : 'index';
}

/**
 * Tên và trang của một bản ghi: { ten, trang } (trang chỉ khi có trong `trangCo`, { đường dẫn: tên trang }, để không đặt
 * link tới trang chưa lên site). Câu hỏi "Thử suy ngẫm" lấy tên bài từ `trangCo`.
 */
export function nhanBanGhi(r, trangCo = {}) {
	if (r.kind === 'quiz') {
		const t = trangCuaQuiz(r.quiz);
		const ten = t && trangCo[t];
		return { ten: ten ? `Thử suy ngẫm: ${ten}` : 'Thử suy ngẫm', trang: ten ? t : null };
	}
	const l = LOAI[r.kind];
	if (!l) return { ten: String(r.kind), trang: null };
	return { ten: l.ten, trang: l.trang && trangCo[l.trang] ? l.trang : null };
}

const n = (x, c = 0) => so(typeof x === 'number' ? x : NaN, c);

/**
 * Một dòng tóm tắt bản ghi, theo loại. Chỉ nhắc lại con số công cụ đã cho người dùng xem, không xếp hạng, không diễn giải
 * về người dùng (không chẩn đoán); bài Big Five chỉ ghi là đã làm.
 */
export function tomTatBanGhi(r) {
	switch (r.kind) {
		case 'stroop':
			return `Hiệu ứng ${n(r.effect)} ms (chậm hơn ${n(r.pct, 1)}%)`;
		case 'digitspan':
			return `Nhớ xuôi ${n(r.forward)}, ngược ${n(r.backward)} chữ số`;
		case 'illusion':
			return `Lệch ${n(r.errorPct, 1)}% so với bằng nhau`;
		case 'changeblind':
			return r.found ? `Tìm thấy chỗ đổi sau ${n(r.seconds, 1)} giây` : 'Chưa tìm thấy chỗ đổi';
		case 'ebbinghaus':
			return 'Đã đo: hai vòng trung tâm bằng nhau';
		case 'falsememory':
			return `Nhận đúng ${n(r.hits)}/${n(r.of)} từ đã học${r.lureYes ? '; đã "nhớ" từ mồi chưa từng thấy' : ''}`;
		case 'wason':
			return `Thử ${n(r.triples)} dãy, ${r.ruleOk === true ? 'đoán đúng quy tắc' : r.ruleOk === 'hep' ? 'đoán gần đúng (quy tắc hơi hẹp)' : 'chưa đoán đúng quy tắc'}`;
		case 'linda':
			return r.correct ? 'Chọn phương án đúng về xác suất' : 'Chọn phương án nhiều người chọn (sai về xác suất)';
		case 'bigfive':
			return 'Đã làm bài thử (điểm từng chiều xem ở trang công cụ)';
		case 'anchoring':
			return `Đã làm (nhóm mỏ neo ${r.group === 'low' ? 'thấp' : 'cao'})`;
		case 'wordspan':
			return `Nhớ ${n(r.span)} từ`;
		case 'myths':
		case 'quiz':
			return `Đúng ${n(r.score)}/${n(r.total)} câu`;
		default:
			return 'Đã thử';
	}
}
