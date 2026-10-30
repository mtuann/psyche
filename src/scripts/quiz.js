// Câu hỏi kiểm tra nhanh (khối ```quiz), như "Thử suy ngẫm" của ../psyche-zero/docs/assets/js/quiz.js: mỗi câu chọn
// một lần, hiện đúng sai và lời giải thích, cuối cùng là số câu đúng và nút "Làm lại". Khác site cũ: thứ tự lựa chọn trộn
// mỗi lần dựng (nên lời giải thích không được dựa vào vị trí lựa chọn). Câu hỏi, lựa chọn và lời giải thích đã dựng sẵn
// bằng HTML lúc build (src/plugins/thanh-phan.mjs); bản tĩnh ẩn đi khi bản bấm được dựng xong, vẫn hiện khi in.
// Kết quả lưu như site cũ: bản ghi "quiz" trong khóa "psyche-zero" (src/scripts/cu/progress.js).
import './cu/progress.js';

const kho = () => /** @type {any} */ (window).PZStore;

function tron(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

/** Thẻ HTML với lớp và nội dung HTML (chữ đã dựng lúc build từ Markdown của trang, không phải chữ người dùng nhập). */
function the(ten, lop, html) {
	const e = document.createElement(ten);
	if (lop) e.className = lop;
	if (html !== undefined) e.innerHTML = html;
	return e;
}

export function mount(root, thuTu = 0) {
	if (root.dataset.ready) return;
	root.dataset.ready = '1';
	const qs = JSON.parse(root.dataset.quiz);
	const id = (location.pathname.replace(/\/+$/, '') || '/') + '#quiz-' + thuTu;
	const tinh = root.querySelector('.pz-quiz__ds');
	const song = the('div', 'pz-quiz__song');
	const diem = the('p', 'pz-quiz__diem');
	diem.setAttribute('role', 'status');
	let daTraLoi = 0;
	let dung = 0;

	qs.forEach((q, qi) => {
		const hop = the('fieldset', 'pz-cau');
		const hoi = the('legend', 'pz-cau__hoi', `<span class="pz-cau__so">${qi + 1}.</span> ${q.q}`);
		const chon = the('div', 'pz-cau__chon');
		const giai = the('div', 'pz-cau__giai', q.why.map((p) => `<p>${p}</p>`).join(''));
		giai.hidden = true;
		const nut = tron(q.opts.map((o) => ({ ...o }))).map((o) => {
			const b = the('button', 'pz-chon', o.t);
			b.type = 'button';
			b.addEventListener('click', () => tra(o, b));
			return { o, b };
		});
		chon.append(...nut.map((x) => x.b));
		hop.append(hoi, chon, giai);
		song.append(hop);

		function tra(o, b) {
			if (hop.dataset.xong) return;
			hop.dataset.xong = '1';
			daTraLoi++;
			if (o.ok) dung++;
			for (const x of nut) {
				x.b.disabled = true;
				if (x.o.ok) x.b.classList.add('pz-chon--dung');
				if (x.b === b && !o.ok) x.b.classList.add('pz-chon--sai');
				if (x.b === b) x.b.setAttribute('aria-pressed', 'true');
			}
			const ket = the('p', `pz-cau__ket ${o.ok ? 'pz-cau__ket--dung' : 'pz-cau__ket--sai'}`);
			ket.textContent = o.ok ? 'Chính xác.' : 'Chưa đúng. Đáp án đúng được đánh dấu ở trên.';
			ket.tabIndex = -1;
			giai.prepend(ket);
			giai.hidden = false;
			ket.focus({ preventScroll: true });
			if (daTraLoi === qs.length) xong();
			else diem.textContent = `Đã trả lời ${daTraLoi} / ${qs.length} câu.`;
		}
	});

	function xong() {
		diem.textContent =
			`Bạn trả lời đúng ${dung} / ${qs.length} câu. Điểm số không quan trọng bằng phần giải thích: ` +
			'nhầm lẫn rồi được giải thích là một cách nhớ rất tốt. ';
		kho()?.add('quiz', { quiz: id, score: dung, total: qs.length });
		const lai = the('button', 'pz-nut', 'Làm lại');
		lai.type = 'button';
		lai.addEventListener('click', () => {
			song.remove();
			diem.remove();
			delete root.dataset.ready;
			mount(root, thuTu);
			root.querySelector('.pz-chon')?.focus();
		});
		diem.append(lai);
	}

	tinh.hidden = true;
	root.classList.add('pz-quiz--song');
	root.append(song, diem);
}
