// Dựng HTML cho các thành phần trong trang (D1.4), chạy lúc build. Plugin psyche-markdown.mjs gọi các hàm ở đây khi gặp
// khối ```quiz hay một chỉ thị (::cong-cu, ::hinh, ::nguon, :nhan). Chữ trong câu hỏi và chữ lấy từ dữ liệu là Markdown
// trong dòng (*nghiêng*, [link](…)), dựng bằng chính Sätteri để giống phần còn lại của trang; thẻ HTML thô hiện thành chữ.
// md(), esc(), câu hỏi: chép từ ../opus/src/plugins/thanh-phan.mjs rồi sửa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { markdownToHtml } from 'satteri';
import { parse } from 'yaml';
import { diaChi } from '../ban-build.mjs';

export const esc = (s) =>
	String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Bốn nhãn mức độ chắc chắn (plans/ben-vung/chuan-kiem-dinh.md mục 4): mã -> chữ trên trang. */
export const TEN_NHAN = { 'vung-chac': 'Vững chắc', 'kha-vung': 'Khá vững', 'tranh-cai': 'Đang tranh cãi', 'bac-bo': 'Đã bị bác bỏ' };

/**
 * Địa chỉ link được dùng trong chữ của câu hỏi và dữ liệu: trên site (/…, không phải //máy-khác hay /\máy-khác mà
 * trình duyệt đọc như //), #mục, tương đối
 * (../x/), http(s), mailto. Khác (như javascript:, data:) thì bỏ link.
 */
const DIA_CHI_DUOC = /^(\/(?![/\\])|#|\.{1,2}\/|https?:\/\/|mailto:)/i;
const chuCua = (n) => (typeof n.value === 'string' ? n.value : (n.children ?? []).map(chuCua).join(''));

/** Plugin mdast cho chữ trong dòng: thẻ HTML thô thành chữ, link lạ thành chữ thường, ảnh thành chữ thay thế. */
const chuAnToan = {
	name: 'chu-an-toan',
	html: (node) => ({ type: 'text', value: node.value }),
	link: (node) => (DIA_CHI_DUOC.test(node.url.trim()) ? undefined : { type: 'text', value: chuCua(node) }),
	image: (node) => ({ type: 'text', value: node.alt ?? '' }),
	linkReference: (node) => ({ type: 'text', value: chuCua(node) }),
	imageReference: (node) => ({ type: 'text', value: node.alt ?? '' }),
};

/** Markdown trong dòng -> HTML (bỏ thẻ <p> bao ngoài). */
export function md(s) {
	const { html } = markdownToHtml(String(s), { mdastPlugins: [chuAnToan], features: { smartPunctuation: false } });
	return html.trim().replace(/^<p>([\s\S]*)<\/p>$/, '$1');
}

/** Chip nhãn trong câu (:nhan[vung-chac]), dạng HTML (cho chữ dựng từ dữ liệu). */
export function chipNhan(ma) {
	if (!TEN_NHAN[ma]) throw new Error(chipNhan.loi(ma));
	return `<span class="pz-tag pz-tag--${ma}">${TEN_NHAN[ma]}</span>`;
}
chipNhan.loi = (ma) => `:nhan[${ma}]: nhãn phải là một trong ${Object.keys(TEN_NHAN).join(', ')}`;

// ---------- Tóm tắt đầu bài (D3-L1) ----------

/**
 * ::tom-tat: hộp "Tóm tắt nhanh" từ các khung nhãn :::<nhãn>[ý chính] của trang (chữ nguồn), theo thứ tự trong trang,
 * mỗi ý một dòng kèm chip nhãn. Ý chính viết thường đầu câu trong khung nên viết hoa chữ đầu. Trang không có khung nhãn
 * thì lỗi (hộp rỗng).
 */
export function tomTat(nguonTrang) {
	const y = [...String(nguonTrang).matchAll(/^:::(vung-chac|kha-vung|tranh-cai|bac-bo)\[(.+)\]\s*$/gm)];
	if (!y.length) throw new Error('::tom-tat: trang không có khung nhãn nào (:::vung-chac[…] …) để tóm tắt');
	const hoa = (x) => x.replace(/^(\P{L}*)(\p{L})/u, (_, a, b) => a + b.toLocaleUpperCase('vi'));
	return (
		`<aside class="pz-tom-tat" aria-label="Tóm tắt nhanh"><p class="pz-tom-tat__ten">Tóm tắt nhanh</p><ul>` +
		y.map(([, ma, ten]) => `<li>${chipNhan(ma)} ${md(hoa(ten))}</li>`).join('') +
		`</ul></aside>`
	);
}

// ---------- Câu hỏi kiểm tra nhanh ----------

/**
 * Đọc khối ```quiz: "? câu hỏi", "+ đáp án đúng", "- đáp án sai", "> giải thích" (nhiều dòng > nối thành một đoạn;
 * dòng "> " trống tách đoạn). Mỗi câu đúng một đáp án đúng, ít nhất hai lựa chọn, có giải thích (site cũ: mỗi câu đều có).
 */
export function docQuiz(src) {
	const qs = [];
	let q = null;
	for (const raw of src.split(/\r?\n/)) {
		const line = raw.trim();
		if (!line) continue;
		const tag = line[0];
		const text = line.slice(1).trim();
		if (tag === '?') qs.push((q = { q: text, opts: [], why: [''] }));
		else if (q && (tag === '+' || tag === '-')) q.opts.push({ t: text, ok: tag === '+' });
		else if (q && tag === '>') {
			if (!text) q.why.push('');
			else q.why[q.why.length - 1] += (q.why.at(-1) ? ' ' : '') + text;
		} else throw new Error(`khối quiz: dòng không hiểu "${line}" (dòng phải mở bằng ?, +, - hoặc >)`);
	}
	if (!qs.length) throw new Error('khối quiz rỗng');
	for (const x of qs) {
		x.why = x.why.filter(Boolean);
		const dung = x.opts.filter((o) => o.ok).length;
		if (dung !== 1) throw new Error(`khối quiz: câu "${x.q}" có ${dung} đáp án đúng (+), phải đúng một`);
		if (x.opts.length < 2) throw new Error(`khối quiz: câu "${x.q}" cần ít nhất hai lựa chọn`);
		if (!x.why.length) throw new Error(`khối quiz: câu "${x.q}" chưa có giải thích (dòng >)`);
	}
	return qs;
}

/**
 * Khối ```quiz: danh sách câu hỏi, lựa chọn và giải thích dựng sẵn bằng HTML (đọc được khi chưa có JavaScript và khi
 * in; đáp án đúng có chữ "(đáp án)" cho trình đọc màn hình); src/scripts/quiz.js biến thành nút bấm, trộn thứ tự lựa
 * chọn, báo đúng sai và hiện giải thích.
 */
export function quiz(src) {
	const qs = docQuiz(src);
	const data = qs.map((x) => ({ q: md(x.q), opts: x.opts.map((o) => ({ t: md(o.t), ok: o.ok })), why: x.why.map(md) }));
	return (
		`<div class="pz-quiz not-content" data-quiz="${esc(JSON.stringify(data))}">` +
		`<ol class="pz-quiz__ds">` +
		data
			.map(
				(x) =>
					`<li class="pz-cau"><p class="pz-cau__hoi">${x.q}</p><ul class="pz-cau__chon">` +
					x.opts.map((o) => `<li${o.ok ? ' class="pz-cau__dung"' : ''}>${o.t}${o.ok ? ' <span class="pz-an">(đáp án)</span>' : ''}</li>`).join('') +
					`</ul><div class="pz-cau__giai">${x.why.map((p) => `<p>${p}</p>`).join('')}</div></li>`,
			)
			.join('') +
		`</ol></div>`
	);
}

// ---------- Công cụ ----------

/**
 * Công cụ có trên site mới: tên (như ::cong-cu{ten="…"} và lớp pz-<tên> của site cũ) -> lớp của khối và thông số nhận
 * được (data-* của khối ở site cũ). Module của công cụ đăng ký ở src/scripts/tai.js. Đợt 8 chuyển 10 công cụ còn lại.
 */
export const CONG_CU = {
	stroop: { lop: 'pz-stroop', thongSo: ['per-cond', 'blocks', 'practice'] },
};

/** Ô "chưa chuyển" cho công cụ, hình chưa có trên site mới; chỉ dùng được ở trang chưa khóa (D1.6 chặn). */
export function chuaChuyen(loai, ten, trang) {
	console.warn(`[psyche] ${trang}: ${loai} "${ten}" chưa có trên site mới`);
	return `<p class="pz-chua-chuyen" data-chua-chuyen="${esc(ten)}" data-pagefind-ignore>${esc(loai[0].toUpperCase() + loai.slice(1))} "${esc(ten)}" chưa chuyển sang site mới.</p>`;
}

/**
 * ::cong-cu{ten="stroop" …}: khối trống có lớp của công cụ; src/scripts/tai.js nạp module khi khối tới gần màn hình
 * (khoảng 600 px). Thông số khác là data-* của khối (như site cũ). Kết quả lưu trong trình duyệt, khóa "psyche-zero"
 * như site cũ (src/scripts/cu/progress.js).
 */
export function congCu({ ten, ...thongSo }, trang) {
	const cc = CONG_CU[ten];
	if (!cc) return chuaChuyen('công cụ', ten, trang);
	const la = Object.keys(thongSo).filter((k) => !cc.thongSo.includes(k));
	if (la.length) throw new Error(`công cụ "${ten}" không nhận thông số ${la.join(', ')} (chỉ nhận: ${cc.thongSo.join(', ') || 'không có'})`);
	const data = Object.entries(thongSo)
		.map(([k, v]) => ` data-${k}="${esc(v)}"`)
		.join('');
	return `<div class="pz-cong-cu ${cc.lop} not-content" data-cong-cu="${ten}"${data} data-pagefind-ignore></div>`;
}

// ---------- Hình ----------

/** Thư mục hình tĩnh: src/hinh/<tên>.html (SVG của hình cũ, chữ thật, màu theo biến của site). */
export const THU_MUC_HINH = fileURLToPath(new URL('../hinh/', import.meta.url));

/**
 * ::hinh{ten="…"}: hình tĩnh src/hinh/<tên>.html (một <figure class="pz-fig">: SVG có role="img" và aria-label, chú
 * thích là chữ thật). Hình cũ chép bằng node tools/chuyen/chuyen.mjs (vùng <!-- fig:tên --> của trang cũ). Màu: chữ và
 * nét theo currentColor; hai đường dữ liệu theo lớp pz-fig-a (chàm), pz-fig-b (hồng), mỗi lớp có bản sáng và tối.
 */
export function hinh(ten, trang) {
	if (!/^[a-z0-9-]+$/.test(ten)) throw new Error(`::hinh: tên "${ten}" chỉ gồm a–z, 0–9, gạch ngang`);
	const f = path.join(THU_MUC_HINH, `${ten}.html`);
	if (!fs.existsSync(f)) return chuaChuyen('hình', ten, trang);
	const html = fs.readFileSync(f, 'utf8').trim();
	if (!/^<figure class="pz-fig"[\s>]/.test(html) || !/<figcaption>/.test(html))
		throw new Error(`src/hinh/${ten}.html phải là một <figure class="pz-fig"> có <figcaption>`);
	if (!/<svg\b[^>]*\srole="img"[^>]*\saria-label="[^"]+"/.test(html)) throw new Error(`src/hinh/${ten}.html: <svg> cần role="img" và aria-label`);
	return html;
}

// ---------- Danh sách nguồn ----------

/** Một nguồn theo kiểu APA, từ bản ghi của src/data/nguon.yml: tác giả (năm). Tên. Nơi đăng. Link. */
export function dongNguon(r) {
	const ten = r.loai === 'sach' ? `*${r.ten}*` : r.ten;
	const noi = r.noi_dang ? ` ${r.loai === 'bai-bao' ? r.noi_dang.replace(/^([^,]+)/, '*$1*') : r.noi_dang}` : '';
	const link = r.doi ? `https://doi.org/${r.doi}` : r.url;
	const cham = (s) => (/[.?!]$/.test(s) ? s : s + '.');
	return md(`${cham(r.tac_gia)} (${r.nam}). ${cham(ten)}${noi ? cham(noi) : ''}${link ? ` <${link}>` : ''}`);
}

/**
 * ::nguon{id="cepeda2006,murre2015"}: danh sách nguồn dựng từ src/data/nguon.yml, theo thứ tự ghi. Id không có thì build
 * hỏng. Trang chuyển từ site cũ vẫn giữ mục Nguồn viết tay (so chữ với trang cũ); chỉ thị này cho trang mới.
 * @param {string} ds id cách nhau bằng dấu phẩy
 * @param {{ id: string }[]} nguon bản ghi của nguon.yml
 */
export function danhSachNguon(ds, nguon) {
	const theoId = new Map(nguon.map((r) => [r.id, r]));
	const ids = String(ds ?? '')
		.split(',')
		.map((x) => x.trim())
		.filter(Boolean);
	if (!ids.length) throw new Error('::nguon cần id, ví dụ ::nguon{id="cepeda2006,murre2015"}');
	const thieu = ids.filter((id) => !theoId.has(id));
	if (thieu.length) throw new Error(`::nguon: không có nguồn ${thieu.join(', ')} trong src/data/nguon.yml`);
	return `<ul class="pz-nguon">${ids.map((id) => `<li id="nguon-${id}">${dongNguon(theoId.get(id))}</li>`).join('')}</ul>`;
}

/** HTML đã dựng có khối cần JavaScript (câu hỏi, công cụ) không: MarkdownContent.astro chỉ tải bộ tải ở những trang này. */
export const canTaiScript = (html) => /\sclass="(?:[^"]*\s)?(?:pz-quiz|pz-cong-cu)[\s"]/.test(html);

// ---------- Danh sách sinh từ dữ liệu (D2-L1): trang chủ, Khám phá, trang lĩnh vực ----------
// Chỉ liệt kê trang có trong bản build (bản thật: trang đã khóa); tên và mô tả lấy từ frontmatter của chính trang ấy, nên
// danh sách không có chữ nào ngoài chữ của trang đã khóa. Trang chưa có hiện "sắp có" (link qua src/plugins/sap-co.mjs).

/** Frontmatter của một trang trong src/content/docs/ ({} nếu không có file). */
export function frontmatter(trang, docsDir) {
	const f = path.join(docsDir, `${trang}.md`);
	if (!fs.existsSync(f)) return {};
	const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(f, 'utf8'));
	if (!m) throw new Error(`${path.relative(process.cwd(), f)}: không đọc được frontmatter (danh sách cần title của trang)`);
	return parse(m[1]) ?? {};
}

/** Mục danh sách của một trang: link, tên (title), mô tả. */
function mucBai(trang, docsDir, base, { moTa = true } = {}) {
	const fm = frontmatter(trang, docsDir);
	const ten = esc(fm.title ?? trang);
	return `<li><a href="${diaChi(trang, base)}">${ten}</a>${moTa && fm.description ? `<span class="pz-ds-bai__mo">${esc(fm.description)}</span>` : ''}</li>`;
}

/** Bài (lõi, mở rộng) là bài khám phá, thí nghiệm hay phương pháp; trang mục lục, Bắt đầu (như Cách đọc nhãn), Hỗ trợ không tính (review D2-L1). */
const laBai = (r) => /^(kham-pha|thi-nghiem|bang-chung)\//.test(r.id) && !r.id.endsWith('/index') && (r.tang === 'loi' || r.tang === 'mo-rong');
const baiKhamPha = (r, linhVuc) => r.linh_vuc === linhVuc && laBai(r);

/**
 * ::danh-sach-bai{linh_vuc="tri-nho"} hay ::danh-sach-bai{nhom="thi-nghiem"}: bài của một lĩnh vực (laBai: lõi và
 * mở rộng, theo thứ tự của trang.yml) hay của một nhóm (thư mục), chỉ bài có trong bản build. Còn bài chưa lên thì một
 * dòng "Còn N bài sắp có". Không có bài nào thì chỉ dòng ấy.
 */
export function danhSachBai({ linh_vuc, nhom }, { banGhi, trangCo, docsDir, base }) {
	if (!linh_vuc === !nhom) throw new Error('::danh-sach-bai cần đúng một trong linh_vuc, nhom');
	const co = new Set(trangCo);
	const thuoc = banGhi.filter((r) =>
		linh_vuc ? baiKhamPha(r, linh_vuc) : r.id.startsWith(`${nhom}/`) && !r.id.endsWith('/index'),
	);
	if (linh_vuc && !thuoc.length) throw new Error(`::danh-sach-bai: lĩnh vực "${linh_vuc}" không có bài nào trong src/data/trang.yml`);
	const len = thuoc.filter((r) => co.has(r.id));
	const con = thuoc.length - len.length;
	return (
		`<div class="pz-ds-bai not-content">` +
		(len.length ? `<ul>${len.map((r) => mucBai(r.id, docsDir, base)).join('')}</ul>` : '') +
		(con ? `<p class="pz-ds-bai__con">${len.length ? 'Còn' : 'Có'} ${con} bài sắp có: mỗi bài lên site sau khi được kiểm chứng lại.</p>` : '') +
		`</div>`
	);
}

/**
 * ::the-linh-vuc: 14 thẻ lĩnh vực theo thu_tu (màu, biểu tượng, tên; số bài đã lên). Thẻ là link tới trang lĩnh vực khi
 * trang ấy có trong bản build.
 */
export function theLinhVuc({ linhVuc, banGhi, trangCo, base, svg }) {
	const co = new Set(trangCo);
	return (
		`<ul class="pz-the-lv not-content">` +
		[...linhVuc]
			.sort((a, b) => a.thu_tu - b.thu_tu)
			.map((l) => {
				const bai = banGhi.filter((r) => baiKhamPha(r, l.id));
				const len = bai.filter((r) => co.has(r.id)).length;
				const dem = len ? `${len}/${bai.length} bài đã lên` : `${bai.length} bài, sắp có`;
				const noi = `${svg(l.bieu_tuong ?? '')}<span class="pz-the-lv__ten">${esc(l.ten)}</span><span class="pz-the-lv__dem">${dem}</span>`;
				const trang = `nen-tang/${l.id}`;
				const the = co.has(trang) ? `<a href="${diaChi(trang, base)}">${noi}</a>` : `<span>${noi}</span>`;
				return `<li class="pz-o-lv" style="--h: ${l.mau}">${the}</li>`;
			})
			.join('') +
		`</ul>`
	);
}

/**
 * ::bai-moi{so="6"}: bài (lõi, mở rộng, thí nghiệm, phương pháp) mới khóa gần nhất, theo ngày của lần kiểm định cuối
 * trong hồ sơ; ::cong-cu-noi-bat: trang công cụ (tầng cong-cu) có trong bản build. Không có trang nào thì một câu báo
 * trang sẽ lên sau khi được kiểm chứng.
 */
export function baiMoi({ so = '6' }, { banGhi, trangCo, docsDir, base, ngayKhoa }) {
	const n = Number(so);
	if (!Number.isInteger(n) || n < 1) throw new Error('::bai-moi: so phải là số nguyên dương');
	const co = new Set(trangCo);
	const ds = banGhi
		.filter((r) => co.has(r.id) && laBai(r) && ngayKhoa(r.id))
		.sort((a, b) => String(ngayKhoa(b.id)).localeCompare(String(ngayKhoa(a.id))))
		.slice(0, n);
	if (!ds.length) return `<p class="pz-ds-bai__con not-content">Bài đầu tiên lên site sau khi được kiểm chứng lại từ đầu.</p>`;
	return `<div class="pz-ds-bai not-content"><ul>${ds.map((r) => mucBai(r.id, docsDir, base)).join('')}</ul></div>`;
}

export function congCuNoiBat({ banGhi, trangCo, docsDir, base }) {
	const co = new Set(trangCo);
	const ds = banGhi.filter((r) => r.tang === 'cong-cu' && co.has(r.id) && !r.id.endsWith('/index'));
	if (!ds.length) return `<p class="pz-ds-bai__con not-content">Công cụ tự trải nghiệm lên site sau khi số liệu trong công cụ được kiểm chứng lại.</p>`;
	return `<div class="pz-ds-bai not-content"><ul>${ds.map((r) => mucBai(r.id, docsDir, base)).join('')}</ul></div>`;
}
