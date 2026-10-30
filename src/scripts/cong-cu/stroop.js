// Công cụ "Hiệu ứng Stroop" (::cong-cu{ten="stroop"}): script của site cũ chép nguyên (src/scripts/cu/), nạp theo đúng
// thứ tự phụ thuộc của ../psyche-zero/docs/assets/js/loader.js. Kết quả lưu trong trình duyệt, khóa "psyche-zero".
import { chayInit } from './nen.js';
import '../cu/stats.js';
import '../cu/progress.js';
import '../cu/ui.js';
import '../cu/stroop.js';

export function mount(el) {
	chayInit();
	el.dataset.san = '1'; // đã dựng xong (kiểm thử trình duyệt chờ dấu này)
}
