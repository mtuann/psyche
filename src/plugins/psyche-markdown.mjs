// Plugin Markdown của dự án cho Sätteri (cây mdast), đăng ký ở astro.config.mjs (D1.4). Cú pháp: AGENTS.md, mục "Mẫu
// trang và khối đặc biệt". Lúc build, nó đổi:
// - khung nhãn :::vung-chac[Ý chính] … ::: (cả kha-vung, tranh-cai, bac-bo) thành khung nền màu nhạt có nhãn dạng viên;
// - :::thu-gon[Xem đáp án] … ::: thành khối bấm để mở; :::o-viet-nam … ::: thành khung "Ở Việt Nam";
// - chip nhãn trong câu :nhan[vung-chac];
// - khối ```quiz thành câu hỏi kiểm tra nhanh;
// - chỉ thị một dòng ::cong-cu{ten="…"}, ::hinh{ten="…"}, ::nguon{id="…"} thành công cụ, hình tĩnh, danh sách nguồn.
// Chỉ thị khối của Starlight (:::note, :::tip, :::caution, :::danger) để nguyên cho Starlight.
// Viết sai (chỉ thị không có tên ở đây, thiếu nhãn của khung, thuộc tính lạ, câu hỏi không đúng một đáp án đúng) thì ném
// lỗi: build hỏng.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { duLieuDaKiem } from '../du-lieu.mjs';
import { TEN_NHAN, chipNhan, congCu, danhSachNguon, hinh, quiz } from './thanh-phan.mjs';

/** Aside của Starlight: không đụng tới. */
const ASIDE_STARLIGHT = new Set(['note', 'tip', 'caution', 'danger']);

/** Nút mdast tự đặt, Sätteri dựng thành phần tử `the` (data.hName) với thuộc tính `tt`, giữ nguyên các con. */
const khoi = (the, tt, children) => ({ type: 'pz-khoi', data: { hName: the, hProperties: tt }, children });
const chu = (n) => (typeof n.value === 'string' ? n.value : (n.children ?? []).map(chu).join(''));

/** Tách nhãn [ … ] của chỉ thị khối: { nhan: các nút trong dòng của nhãn hay null, con: phần còn lại }. */
function tachNhan(node) {
	const [dau, ...sau] = node.children ?? [];
	if (dau?.type === 'paragraph' && dau.data?.directiveLabel) return { nhan: dau.children, con: sau };
	return { nhan: null, con: node.children ?? [] };
}

/** Chỉ thị khối của dự án: tên -> hàm dựng nút mdast từ { nhan, con, tt }. */
const KHOI = {
	...Object.fromEntries(
		Object.entries(TEN_NHAN).map(([ma, ten]) => [
			ma,
			({ nhan, con }, loi) => {
				if (!nhan?.length) throw loi(`:::${ma} cần ý chính trong ngoặc vuông, ví dụ :::${ma}[Quên nhanh lúc đầu, chậm dần về sau]`);
				// "Vững chắc: ý chính" là chữ của tiêu đề (trình đọc màn hình, tìm kiếm, so chữ); dấu hai chấm chỉ ẩn cho mắt
				return khoi('aside', { class: `pz-nhan pz-nhan--${ma}`, 'aria-label': `${ten}: ${nhan.map(chu).join('')}` }, [
					khoi('p', { class: 'pz-nhan__dau' }, [
						{ type: 'html', value: `<span class="pz-nhan__muc">${ten}</span><span class="pz-an">: </span>` },
						khoi('span', { class: 'pz-nhan__y' }, nhan),
					]),
					...con,
				]);
			},
		]),
	),
	'thu-gon': ({ nhan, con }, loi) => {
		if (!nhan?.length) throw loi(':::thu-gon cần chữ của nút trong ngoặc vuông, ví dụ :::thu-gon[Xem đáp án]');
		return khoi('details', { class: 'pz-thu-gon' }, [khoi('summary', {}, nhan), khoi('div', { class: 'pz-thu-gon__noi' }, con)]);
	},
	'o-viet-nam': ({ nhan, con }) =>
		khoi('aside', { class: 'pz-vn', 'aria-label': 'Ở Việt Nam' }, [
			khoi('p', { class: 'pz-vn__ten' }, nhan?.length ? nhan : [{ type: 'text', value: 'Ở Việt Nam' }]),
			...con,
		]),
};

/** Chỉ thị một dòng: tên -> { thuocTinh: nhận được (dấu * là bắt buộc; "…" là nhận thêm mọi thuộc tính), ve }. */
const CHI_THI = {
	'cong-cu': { thuocTinh: ['ten*', '…'], ve: ({ tt, trang }) => congCu(tt, trang) },
	hinh: { thuocTinh: ['ten*'], ve: ({ tt, trang }) => hinh(tt.ten, trang) },
	nguon: { thuocTinh: ['id*'], ve: ({ tt }) => danhSachNguon(tt.id, duLieuDaKiem().nguon) },
};

/** Kiểm thuộc tính của một chỉ thị theo khai báo; trả về thông báo lỗi hay null. */
function loiThuocTinh(ten, { thuocTinh = [] }, tt) {
	const nhan = thuocTinh.map((t) => t.replace('*', ''));
	const la = Object.keys(tt).filter((k) => !nhan.includes(k));
	if (la.length && !nhan.includes('…')) return `::${ten} không nhận thuộc tính ${la.join(', ')} (chỉ nhận: ${nhan.join(', ')})`;
	const thieu = thuocTinh.filter((t) => t.endsWith('*') && !tt[t.slice(0, -1)]).map((t) => t.slice(0, -1));
	return thieu.length ? `::${ten} thiếu thuộc tính ${thieu.join(', ')}, ví dụ ::${ten}{${thieu[0]}="…"}` : null;
}

/** @param {{ docsDir: string }} opts docsDir: thư mục trang (src/content/docs), để biết đường dẫn của trang đang dựng. */
export function psycheMarkdown({ docsDir }) {
	return ({ fileURL }) => {
		const file = fileURL ? fileURLToPath(fileURL) : '';
		const trang = path.relative(docsDir, file).replace(/\\/g, '/').replace(/\.mdx?$/, '');
		const loi = (msg) => new Error(`${file ? path.relative(process.cwd(), file) : '(chữ)'}: ${msg}`);
		return {
			name: 'psyche-markdown',
			code(node) {
				if (node.lang !== 'quiz') return;
				try {
					return { type: 'html', value: quiz(node.value) };
				} catch (e) {
					throw loi(e.message);
				}
			},
			containerDirective(node) {
				if (ASIDE_STARLIGHT.has(node.name)) return;
				const dung = KHOI[node.name];
				if (!dung)
					throw loi(`không có khối :::${node.name} (có: ${[...Object.keys(KHOI), ...ASIDE_STARLIGHT].map((t) => ':::' + t).join(', ')})`);
				if (Object.keys(node.attributes ?? {}).length) throw loi(`:::${node.name} không nhận thuộc tính`);
				return dung(tachNhan(node), loi);
			},
			textDirective(node) {
				// chỉ :nhan[…]; chữ khác dạng ":x" (giờ, tỉ lệ) để Starlight trả lại nguyên chữ
				if (node.name !== 'nhan') return;
				try {
					return { type: 'html', value: chipNhan(chu(node).trim()) };
				} catch (e) {
					throw loi(e.message);
				}
			},
			leafDirective(node) {
				const muc = CHI_THI[node.name];
				// Starlight không dùng chỉ thị một dòng; tên lạ là gõ sai, để nguyên thì trang hiện dòng "::tên"
				if (!muc) throw loi(`không có chỉ thị ::${node.name} (có: ${Object.keys(CHI_THI).map((t) => '::' + t).join(', ')})`);
				const tt = node.attributes ?? {};
				if (node.children?.length) throw loi(`::${node.name} không nhận chữ, viết "::${node.name}{…}" trên một dòng riêng`);
				const sai = loiThuocTinh(node.name, muc, tt);
				if (sai) throw loi(sai);
				try {
					return { type: 'html', value: muc.ve({ tt, trang }) };
				} catch (e) {
					throw loi(e.message);
				}
			},
		};
	};
}
