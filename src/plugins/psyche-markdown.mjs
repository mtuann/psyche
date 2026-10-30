// Plugin Markdown của dự án cho Sätteri (cây mdast), đăng ký ở astro.config.mjs (D1.4). Cú pháp: AGENTS.md, mục "Mẫu
// trang và khối đặc biệt". Lúc build, nó đổi:
// - khung nhãn :::vung-chac[Ý chính] … ::: (cả kha-vung, tranh-cai, bac-bo) thành khung nền màu nhạt có nhãn dạng viên
//   (ý chính chỉ bỏ được ở trang giới thiệu bốn nhãn);
// - :::thu-gon[Xem đáp án] … ::: thành khối bấm để mở; :::o-viet-nam … ::: thành khung "Ở Việt Nam";
// - :::ho-so-nghien-cuu … ::: (hộp hồ sơ nghiên cứu) và ::tom-tat (hộp tóm tắt đầu bài, dựng từ các khung nhãn của
//   chính trang) của bố cục C;
// - chip nhãn trong câu :nhan[vung-chac];
// - khối ```quiz thành câu hỏi kiểm tra nhanh;
// - chỉ thị một dòng ::cong-cu{ten="…"}, ::hinh{ten="…"}, ::nguon{id="…"} thành công cụ, hình tĩnh, danh sách nguồn.
// Chỉ thị khối của Starlight (:::note, :::tip, :::caution, :::danger) để nguyên cho Starlight.
// Viết sai (chỉ thị không có tên ở đây, thiếu nhãn của khung, thuộc tính lạ, câu hỏi không đúng một đáp án đúng) thì ném
// lỗi: build hỏng.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { duLieuDaKiem } from '../du-lieu.mjs';
import { docKhoa } from '../khoa.mjs';
import fs from 'node:fs';
import { parse } from 'yaml';
import { DUONG_GOC, trangTrongBan } from '../ban-build.mjs';
import { svg } from '../bieu-tuong.mjs';
import { TEN_NHAN, baiMoi, tomTat, chipNhan, congCu, congCuNoiBat, danhSachBai, danhSachNguon, hinh, quiz, theLinhVuc } from './thanh-phan.mjs';

/** Aside của Starlight: không đụng tới. */
const ASIDE_STARLIGHT = new Set(['note', 'tip', 'caution', 'danger']);

/** Trang được viết khung nhãn không có ý chính: trang giới thiệu bốn nhãn. */
const KHONG_Y_CHINH = new Set(['bat-dau/doc-nhan-chac-chan']);

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
			({ nhan, con, trang }, loi) => {
				// "Vững chắc: ý chính" là chữ của tiêu đề (trình đọc màn hình, tìm kiếm, so chữ); dấu hai chấm chỉ ẩn cho mắt.
				// Không có ý chính thì tiêu đề chỉ là tên nhãn: chỉ ở trang giới thiệu bốn nhãn (KHONG_Y_CHINH)
				const co = Boolean(nhan?.length);
				if (!co && !KHONG_Y_CHINH.has(trang))
					throw loi(`:::${ma} cần ý chính trong ngoặc vuông, ví dụ :::${ma}[Quên nhanh lúc đầu, chậm dần về sau]`);
				return khoi('aside', { class: `pz-nhan pz-nhan--${ma}`, 'aria-label': co ? `${ten}: ${nhan.map(chu).join('')}` : ten }, [
					khoi('p', { class: 'pz-nhan__dau' }, [
						{ type: 'html', value: `<span class="pz-nhan__muc">${ten}</span>` + (co ? '<span class="pz-an">: </span>' : '') },
						...(co ? [khoi('span', { class: 'pz-nhan__y' }, nhan)] : []),
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
	// hộp hồ sơ nghiên cứu (bố cục C, D3-L1): danh sách "- **Mục** nội dung" thành bảng hai cột; số liệu là chữ của trang,
	// lấy từ phần kể nghiên cứu của chính trang
	'ho-so-nghien-cuu': ({ nhan, con }, loi) => {
		const [ds] = con;
		if (con.length !== 1 || ds.type !== 'list')
			throw loi(':::ho-so-nghien-cuu chỉ chứa một danh sách, mỗi dòng "- **Mục** nội dung", ví dụ "- **Tác giả, năm** Solomon Asch, 1951"');
		const dong = ds.children.map((muc) => {
			const [p, ...thua] = muc.children ?? [];
			const [muc0, ...sau] = p?.children ?? [];
			if (p?.type !== 'paragraph' || thua.length || muc0?.type !== 'strong' || !chu({ children: sau }).trim())
				throw loi(`:::ho-so-nghien-cuu: dòng "${chu(muc).trim().slice(0, 40)}" phải là "**Mục** nội dung"`);
			const [dau, ...con2] = sau;
			const bo = dau.type === 'text' ? [{ ...dau, value: dau.value.replace(/^[\s:]+/, '') }, ...con2] : sau;
			return khoi('div', {}, [khoi('dt', {}, muc0.children), khoi('dd', {}, bo)]);
		});
		const ten = nhan?.length ? nhan : [{ type: 'text', value: 'Hồ sơ nghiên cứu' }];
		return khoi('aside', { class: 'pz-ho-so', 'aria-label': ten.map(chu).join('') }, [khoi('p', { class: 'pz-ho-so__ten' }, ten), khoi('dl', {}, dong)]);
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
	// danh sách sinh từ dữ liệu (D2-L1): chỉ trang có trong bản build, tên và mô tả từ frontmatter của chính trang
	'danh-sach-bai': { thuocTinh: ['linh_vuc', 'nhom'], ve: ({ tt, ds }) => danhSachBai(tt, ds()) },
	'the-linh-vuc': { ve: ({ ds }) => theLinhVuc(ds()) },
	'bai-moi': { thuocTinh: ['so'], ve: ({ tt, ds }) => baiMoi(tt, ds()) },
	'cong-cu-noi-bat': { ve: ({ ds }) => congCuNoiBat(ds()) },
	hinh: { thuocTinh: ['ten*'], ve: ({ tt, trang }) => hinh(tt.ten, trang) },
	nguon: { thuocTinh: ['id*'], ve: ({ tt }) => danhSachNguon(tt.id, duLieuDaKiem().nguon) },
	// hộp tóm tắt đầu bài (D3-L1): ý chính của các khung nhãn trong trang, theo thứ tự; không có chữ nào ngoài chữ của khung
	'tom-tat': { ve: ({ nguonTrang }) => tomTat(nguonTrang()) },
};

/**
 * Dữ liệu cho danh sách sinh từ dữ liệu: bản ghi trang (thứ tự menu), lĩnh vực, trang trong bản build, ngày khóa (ngày
 * của lần kiểm định cuối trong hồ sơ kiem-dinh/<trang>.yml của trang đã khóa).
 */
function duLieuDanhSach(docsDir) {
	const duLieu = duLieuDaKiem();
	const goc = new URL('../../', import.meta.url);
	const khoa = docKhoa().trang;
	const ngayKhoa = (t) => {
		if (!(t in khoa)) return null;
		const f = new URL(`kiem-dinh/${t}.yml`, goc);
		return fs.existsSync(f) ? String(parse(fs.readFileSync(f, 'utf8'))?.lan?.at(-1)?.ngay ?? '') || null : null;
	};
	return { banGhi: duLieu.trang, linhVuc: duLieu['linh-vuc'], trangCo: trangTrongBan(), docsDir, base: DUONG_GOC, svg, ngayKhoa };
}

/** Kiểm thuộc tính của một chỉ thị theo khai báo; trả về thông báo lỗi hay null. */
function loiThuocTinh(ten, { thuocTinh = [] }, tt) {
	const nhan = thuocTinh.map((t) => t.replace('*', ''));
	const la = Object.keys(tt).filter((k) => !nhan.includes(k));
	if (la.length && !nhan.includes('…')) return `::${ten} không nhận thuộc tính ${la.join(', ')} (chỉ nhận: ${nhan.join(', ')})`;
	const thieu = thuocTinh.filter((t) => t.endsWith('*') && !tt[t.slice(0, -1)]).map((t) => t.slice(0, -1));
	return thieu.length ? `::${ten} thiếu thuộc tính ${thieu.join(', ')}, ví dụ ::${ten}{${thieu[0]}="…"}` : null;
}

/**
 * @param {{ docsDir: string, khoa?: () => { trang: object } }} opts docsDir: thư mục trang (src/content/docs), để biết
 *   đường dẫn của trang đang dựng; khoa: đọc kiem-dinh/khoa.json (kiểm thử thay bằng bản giả).
 */
export function psycheMarkdown({ docsDir, khoa = docKhoa }) {
	return ({ fileURL }) => {
		const file = fileURL ? fileURLToPath(fileURL) : '';
		const trang = path.relative(docsDir, file).replace(/\\/g, '/').replace(/\.mdx?$/, '');
		const loi = (msg) => new Error(`${file ? path.relative(process.cwd(), file) : '(chữ)'}: ${msg}`);
		let soBang = 0;
		return {
			name: 'psyche-markdown',
			// bảng rộng cuộn ngang trên màn hình hẹp: bọc trong vùng nhận focus để người dùng bàn phím cuộn được (axe
			// scrollable-region-focusable, trang Hỗ trợ ở 360 px); mỗi vùng một tên riêng (landmark-unique)
			table(node) {
				if (node.data?.pzBoc) return;
				node.data = { ...node.data, pzBoc: true };
				return khoi('div', { className: ['pz-bang'], tabIndex: 0, role: 'region', ariaLabel: `Bảng ${++soBang}, cuộn ngang được` }, [node]);
			},
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
				return dung({ ...tachNhan(node), trang }, loi);
			},
			textDirective(node) {
				// chỉ :nhan[…]; chữ khác dạng ":x" (giờ, tỉ lệ) để Starlight trả lại nguyên chữ
				if (node.name !== 'nhan') return;
				// nút có chữ thật (không phải HTML thô), để chữ của chip vào id của tiêu đề như ở site cũ (src/plugins/id-cu.mjs)
				const ma = chu(node).trim();
				if (!TEN_NHAN[ma]) throw loi(chipNhan.loi(ma));
				return khoi('span', { class: `pz-tag pz-tag--${ma}` }, [{ type: 'text', value: TEN_NHAN[ma] }]);
			},
			leafDirective(node) {
				const muc = CHI_THI[node.name];
				// Starlight không dùng chỉ thị một dòng; tên lạ là gõ sai, để nguyên thì trang hiện dòng "::tên"
				if (!muc) throw loi(`không có chỉ thị ::${node.name} (có: ${Object.keys(CHI_THI).map((t) => '::' + t).join(', ')})`);
				const tt = node.attributes ?? {};
				if (node.children?.length) throw loi(`::${node.name} không nhận chữ, viết "::${node.name}{…}" trên một dòng riêng`);
				const sai = loiThuocTinh(node.name, muc, tt);
				if (sai) throw loi(sai);
				let html;
				try {
					html = muc.ve({ tt, trang, ds: () => duLieuDanhSach(docsDir), nguonTrang: () => fs.readFileSync(file, 'utf8') });
				} catch (e) {
					throw loi(e.message);
				}
				// ô "chưa chuyển" chỉ ở trang chưa khóa (bản xem): trang đã khóa phải có đủ hình, công cụ
				if (html.includes('data-chua-chuyen=') && trang in khoa().trang)
					throw loi(`trang đã khóa mà ::${node.name}{ten="${tt.ten}"} chưa có trên site mới: làm thành phần (hình: src/hinh/${tt.ten}.html) trước khi khóa`);
				return { type: 'html', value: html };
			},
		};
	};
}
