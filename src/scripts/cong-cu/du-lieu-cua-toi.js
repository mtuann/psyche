// Công cụ "Dữ liệu của tôi" (::cong-cu{ten="du-lieu-cua-toi"}; D8-L4, viết lại từ ../psyche-zero/docs/assets/js/mydata.js).
// Khuôn của một công cụ: đầu stroop.js. Xem, tải bản sao lưu (JSON), khôi phục (gộp, không ghi đè: chung/luu.js gop,
// soSanh, nhap), xóa toàn bộ kết quả lưu trong trình duyệt (khóa "psyche-zero"); bật, tắt "dùng khi mất mạng" (service
// worker, src/scripts/ngoai-tuyen/). Không gửi gì đi đâu: file sao lưu tạo và đọc ngay trong trình duyệt.

import { canhBao, h, khung, nut, so } from './chung/giao-dien.js';
import { tenLoai } from './chung/loai.js';
import { chuanHoa, coLuu, datTuyChon, doc, layTuyChon, ngay, nhap, soSanh, tomTat, xoaHet } from './chung/luu.js';

/** Tùy chọn "dùng khi mất mạng" trong kho (đoạn đăng ký ở src/scripts/ngoai-tuyen/dang-ky.js đọc cùng khóa). */
export const TUY_CHON_NGOAI_TUYEN = 'ngoai-tuyen';

/** Tên file sao lưu theo ngày, như site cũ. */
export const tenFile = (t) => `psyche-zero-${ngay(t)}.json`;

/** Dòng theo loại: [[tên loại, số bản ghi]], theo số giảm dần rồi theo tên. */
export const dongTheoLoai = (byKind) =>
	Object.entries(byKind)
		.map(([k, sl]) => [tenLoai(k), sl])
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'vi'));

/** Đọc chữ của file sao lưu: bộ dữ liệu đã chuẩn hóa, hay null nếu không phải JSON của Psyche (không có records). */
export function docSaoLuu(chu) {
	let x;
	try {
		x = JSON.parse(chu);
	} catch {
		return null;
	}
	if (!x || typeof x !== 'object' || typeof x.records !== 'object' || x.records === null) return null;
	return chuanHoa(x);
}

const goc = () => new URL('../../', location.href).pathname; // trang ở /psyche/them/du-lieu-cua-toi/

export function mount(el) {
	const K = khung(el);
	const bao = h('p', { class: 'pz-du-lieu__bao', role: 'status' });
	el.append(bao);
	const thongBao = (chu) => {
		bao.textContent = chu;
	};

	function taiVe() {
		const d = doc();
		const url = URL.createObjectURL(new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' }));
		const a = h('a', { href: url, download: tenFile(Date.now()), hidden: true });
		document.body.append(a);
		a.click();
		setTimeout(() => {
			URL.revokeObjectURL(url);
			a.remove();
		}, 0);
		thongBao(`Đã tạo file sao lưu ${tenFile(Date.now())}.`);
	}

	const chonFile = h('input', { type: 'file', accept: 'application/json,.json', hidden: true });
	chonFile.addEventListener('change', () => {
		const f = chonFile.files?.[0];
		chonFile.value = '';
		if (!f) return;
		f.text().then((chu) => {
			const moi = docSaoLuu(chu);
			if (!moi) {
				thongBao('File này không đọc được: không phải file sao lưu của Psyche (JSON).');
				return;
			}
			xemTruoc(moi);
		});
	});

	function xemTruoc(moi) {
		const d = soSanh(doc(), moi);
		const theoLoai = dongTheoLoai(d.byKind);
		K.hien([
			h('div', { class: 'pz-du-lieu__hop' }, [
				h('h2', { text: 'Xem trước khi gộp' }),
				h('p', {}, [
					d.added
						? `Sẽ thêm ${so(d.added)} bản ghi mới. ${so(d.alreadyPresent)} bản ghi đã có sẵn được giữ nguyên. Không có gì bị xóa hay ghi đè.`
						: `File này không có bản ghi nào mới (${so(d.alreadyPresent)} bản ghi đã có sẵn).`,
				]),
				theoLoai.length ? h('ul', {}, theoLoai.map(([ten, sl]) => h('li', { text: `${ten}: thêm ${so(sl)}` }))) : null,
				h('div', { class: 'pz-cc__nut' }, [
					d.added
						? nut(
								'Gộp vào dữ liệu hiện có',
								() => {
									nhap(moi);
									ve();
									thongBao(`Đã gộp ${so(d.added)} bản ghi.`);
								},
								{ chinh: true, tuDong: true },
							)
						: null,
					nut(
						'Hủy',
						() => {
							ve();
							thongBao('Đã hủy, không gộp gì.');
						},
						{ tuDong: !d.added },
					),
				]),
			]),
		]);
	}

	function hoiXoa() {
		const sl = tomTat(doc()).records;
		K.hien([
			h('div', { class: 'pz-du-lieu__hop pz-du-lieu__hop--xoa' }, [
				h('h2', { text: 'Xóa toàn bộ kết quả?' }),
				h('p', { text: `${so(sl)} bản ghi trên trình duyệt này sẽ bị xóa, không lấy lại được. Bạn nên tải bản sao lưu trước.` }),
				h('div', { class: 'pz-cc__nut' }, [
					nut(
						'Xóa hẳn',
						() => {
							const giu = layTuyChon(TUY_CHON_NGOAI_TUYEN, null);
							xoaHet();
							// giữ lựa chọn tắt "dùng khi mất mạng": xóa kết quả không phải là bật lại
							if (giu === false) datTuyChon(TUY_CHON_NGOAI_TUYEN, false);
							ve();
							thongBao('Đã xóa toàn bộ kết quả.');
						},
						{ chinh: true },
					),
					nut(
						'Không xóa',
						() => {
							ve();
							thongBao('Đã hủy, không xóa gì.');
						},
						{ tuDong: true },
					),
				]),
			]),
		]);
	}

	// ---------- Dùng khi mất mạng ----------
	const coSw = 'serviceWorker' in navigator;
	const ngoaiTuyen = h('div', { class: 'pz-du-lieu__ngoai-tuyen' });
	function veNgoaiTuyen() {
		const bat = layTuyChon(TUY_CHON_NGOAI_TUYEN, true) !== false;
		ngoaiTuyen.replaceChildren(
			h('h2', { text: 'Dùng khi mất mạng' }),
			h('p', {}, [
				coSw
					? bat
						? 'Đang bật: trình duyệt lưu các trang bạn đã mở (và trang Hỗ trợ) trên máy này, để đọc lại được khi mất mạng. Mỗi lần site cập nhật, bản lưu cũ được thay.'
						: 'Đang tắt: trình duyệt không lưu trang nào để đọc khi mất mạng.'
					: 'Trình duyệt này không hỗ trợ lưu trang để đọc khi mất mạng.',
			]),
			coSw
				? h('div', { class: 'pz-cc__nut' }, [
						nut(bat ? 'Tắt và xóa các trang đã lưu' : 'Bật lại', () => (bat ? tat() : batLai()), { 'data-ngoai-tuyen': bat ? 'tat' : 'bat' }),
					])
				: null,
		);
	}
	async function tat() {
		datTuyChon(TUY_CHON_NGOAI_TUYEN, false);
		try {
			for (const r of await navigator.serviceWorker.getRegistrations()) if (new URL(r.scope).pathname.startsWith(goc())) await r.unregister();
			if (globalThis.caches) for (const k of await caches.keys()) if (k.startsWith('psyche-')) await caches.delete(k);
		} catch {}
		veNgoaiTuyen();
		thongBao('Đã tắt dùng khi mất mạng và xóa các trang đã lưu.');
		ngoaiTuyen.querySelector('button')?.focus();
	}
	async function batLai() {
		datTuyChon(TUY_CHON_NGOAI_TUYEN, true);
		try {
			await navigator.serviceWorker.register(`${goc()}sw.js`, { scope: goc() });
		} catch {}
		veNgoaiTuyen();
		thongBao('Đã bật lại dùng khi mất mạng.');
		ngoaiTuyen.querySelector('button')?.focus();
	}

	function ve() {
		const sum = tomTat(doc());
		const theoLoai = dongTheoLoai(sum.byKind);
		K.hien([
			coLuu() ? null : canhBao('Trình duyệt đang chặn lưu dữ liệu', 'Có thể bạn đang ở chế độ riêng tư hay đã tắt lưu dữ liệu trang web. Kết quả chỉ giữ đến khi bạn đóng trang.'),
			h('p', {}, [
				sum.records ? `Trên trình duyệt này đang có ${so(sum.records)} bản ghi, trong ${so(sum.days)} ngày khác nhau:` : 'Chưa có kết quả nào lưu trên trình duyệt này.',
			]),
			theoLoai.length ? h('ul', { class: 'pz-du-lieu__loai' }, theoLoai.map(([ten, sl]) => h('li', { text: `${ten}: ${so(sl)}` }))) : null,
			h('div', { class: 'pz-cc__nut' }, [
				nut('Tải bản sao lưu (JSON)', taiVe, { chinh: true, disabled: !sum.records, tuDong: true }),
				nut('Khôi phục từ file…', () => chonFile.click()),
				nut('Xóa toàn bộ kết quả', hoiXoa, { disabled: !sum.records }),
			]),
			chonFile,
			ngoaiTuyen,
		]);
		veNgoaiTuyen();
	}

	ve();
	el.dataset.san = '1';
}
