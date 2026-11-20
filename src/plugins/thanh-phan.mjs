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
 * được (data-* của khối ở site cũ). Module src/scripts/cong-cu/<tên>.js (khuôn: đầu src/scripts/cong-cu/stroop.js), nạp ở
 * src/scripts/tai.js. D8-L1 làm 5 công cụ; D8-L2, D8-L4 làm các công cụ còn lại theo cùng khuôn.
 */
export const CONG_CU = {
	stroop: { lop: 'pz-stroop', thongSo: ['per-cond', 'blocks', 'practice'] },
	'do-dai-tri-nho': { lop: 'pz-do-dai-tri-nho', thongSo: [] },
	'ao-giac': { lop: 'pz-ao-giac', thongSo: [] },
	'mu-thay-doi': { lop: 'pz-mu-thay-doi', thongSo: [] },
	ebbinghaus: { lop: 'pz-ebbinghaus', thongSo: [] },
	// D8-L4: hai trang đọc kho kết quả trong trình duyệt (src/scripts/cong-cu/chung/luu.js). canTrang: khối mang danh sách
	// trang có trong bản build và tên của chúng (data-trang), để công cụ chỉ đặt link tới trang có thật
	'du-lieu-cua-toi': { lop: 'pz-du-lieu-cua-toi', thongSo: [], canTrang: true },
	'nhat-ky': { lop: 'pz-nhat-ky', thongSo: [], canTrang: true },
	// trò chơi "Bạn nghĩ gì về tâm trí?" (D8-L3): limit (số thẻ mỗi lượt), level (chỉ thẻ có cap từ 1 đến level), như
	// data-limit, data-level của site cũ; thẻ lấy từ src/data/ngo-nhan.yml lúc build (duLieuNgoNhan), nhúng vào data-the
	'ngo-nhan': { lop: 'pz-ngo-nhan', thongSo: ['limit', 'level'], duLieu: 'ngo-nhan' },
	'tri-nho-sai': { lop: 'pz-tri-nho-sai', thongSo: [] },
	'wason-246': { lop: 'pz-wason-246', thongSo: [] },
	linda: { lop: 'pz-linda', thongSo: [] },
	'big-five-mini': { lop: 'pz-big-five-mini', thongSo: [] },
	'neo-gia': { lop: 'pz-neo-gia', thongSo: [] },
	'tri-nho-tu': { lop: 'pz-tri-nho-tu', thongSo: [] },
};

/** Ô "chưa chuyển" cho công cụ, hình chưa có trên site mới; chỉ dùng được ở trang chưa khóa (D1.6 chặn). */
export function chuaChuyen(loai, ten, trang) {
	console.warn(`[psyche] ${trang}: ${loai} "${ten}" chưa có trên site mới`);
	return `<p class="pz-chua-chuyen" data-chua-chuyen="${esc(ten)}" data-pagefind-ignore>${esc(loai[0].toUpperCase() + loai.slice(1))} "${esc(ten)}" chưa chuyển sang site mới.</p>`;
}

/**
 * ::cong-cu{ten="stroop" …}: khối trống có lớp của công cụ; src/scripts/tai.js nạp module khi khối tới gần màn hình
 * (khoảng 600 px). Thông số khác là data-* của khối (như site cũ). Kết quả lưu trong trình duyệt, khóa "psyche-zero"
 * như site cũ (src/scripts/cong-cu/chung/luu.js).
 */
export function congCu({ ten, ...thongSo }, trang, duLieu = {}) {
	const cc = CONG_CU[ten];
	if (!cc) return chuaChuyen('công cụ', ten, trang);
	const la = Object.keys(thongSo).filter((k) => !cc.thongSo.includes(k));
	if (la.length) throw new Error(`công cụ "${ten}" không nhận thông số ${la.join(', ')} (chỉ nhận: ${cc.thongSo.join(', ') || 'không có'})`);
	const data = Object.entries(thongSo)
		.map(([k, v]) => ` data-${k}="${esc(v)}"`)
		.join('');
	// công cụ cần danh sách trang có trong bản build (D8-L4, canTrang: Dữ liệu của tôi, Nhật ký): data-trang
	const dsTrang = cc.canTrang ? ` data-trang="${esc(JSON.stringify(duLieu.trang ? duLieu.trang() : {}))}"` : '';
	// công cụ dựng từ dữ liệu (trò chơi ngộ nhận): dữ liệu lúc build, dạng JSON trong data-the
	let them = '';
	if (cc.duLieu) {
		if (!duLieu[cc.duLieu]) throw new Error(`công cụ "${ten}" cần dữ liệu "${cc.duLieu}" lúc build`);
		them = ` data-the="${esc(JSON.stringify(duLieu[cc.duLieu]()))}"`;
	}
	return `<div class="pz-cong-cu ${cc.lop} not-content" data-cong-cu="${ten}"${data}${dsTrang}${them} data-pagefind-ignore></div>`;
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
	return cuonHinh(html, ten);
}

/**
 * Cách tạm cho hình cũ ở màn hẹp (kế hoạch nâng cấp, việc T1; plans/nang-cap/hinh.md mục 4.4): bọc <svg> trong khung
 * cuộn ngang nhận focus; CSS giữ SVG rộng tối thiểu min(34rem, bề rộng viewBox), nên chữ trong hình không nhỏ quá khi màn
 * hẹp, người đọc kéo ngang để xem. Chỉ đổi HTML dựng ra, không đổi file src/hinh/ (mã băm của trang giữ nguyên). Hình
 * theo chuẩn mới (data-chuan="2" ở <figure>, có bản hẹp riêng) không bọc.
 */
export function cuonHinh(html, ten) {
	if (/^<figure\b[^>]*\sdata-chuan="2"/.test(html)) return html;
	const svg = /<svg\b[^>]*>[\s\S]*<\/svg>/.exec(html);
	if (!svg) return html;
	const nhan = /\saria-label="([^"]+)"/.exec(svg[0])[1];
	const rong = Number(/\sviewBox="[\d.]+ [\d.]+ ([\d.]+) [\d.]+"/.exec(svg[0])?.[1]) || 544;
	const khung = `<div class="pz-fig__cuon" tabindex="0" role="region" aria-label="Hình: ${nhan} (cuộn ngang được)" style="--pz-fig-rong:${rong}px">`;
	return html.slice(0, svg.index) + khung + svg[0] + '</div>' + html.slice(svg.index + svg[0].length);
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

/**
 * Tên của các trang có trong bản build, cho công cụ cần đặt link (CONG_CU[…].canTrang): { "trai-nghiem/stroop": "Hiệu
 * ứng Stroop", … }, chỉ trang tầng cong-cu, bài thử và bài (laBai), để khối không quá lớn.
 */
export function tenCacTrang({ banGhi, trangCo, docsDir }) {
	const co = new Set(trangCo);
	return Object.fromEntries(
		banGhi
			.filter((r) => co.has(r.id) && (r.tang === 'cong-cu' || laBai(r) || ['bat-dau/ban-nghi-gi', 'trai-nghiem/index'].includes(r.id)))
			.map((r) => [r.id, String(frontmatter(r.id, docsDir).title ?? r.id)]),
	);
}

// ---------- Tờ tóm tắt, Sách in (D8-L4): sinh lúc build, chỉ từ trang có trong bản build ----------

/** Bài vào Sách in và Tờ tóm tắt: bài (laBai) có trong bản build, theo lĩnh vực (thu_tu) rồi thứ tự của trang.yml. */
export function baiTheoLinhVuc({ banGhi, linhVuc, trangCo }) {
	const co = new Set(trangCo);
	return [...linhVuc]
		.sort((a, b) => a.thu_tu - b.thu_tu)
		.map((lv) => ({ lv, bai: banGhi.filter((r) => baiKhamPha(r, lv.id) && co.has(r.id)) }))
		.filter((x) => x.bai.length);
}

/** Số bài (laBai) có trong trang.yml mà chưa có trong bản build. */
export const soBaiChuaLen = ({ banGhi, trangCo }) => {
	const co = new Set(trangCo);
	return banGhi.filter((r) => laBai(r) && !co.has(r.id)).length;
};

/** Ý chính của các khung nhãn trong chữ nguồn của một trang, theo thứ tự: [{ ma, y }]. */
export const yChinh = (nguon) => [...String(nguon).matchAll(/^:::(vung-chac|kha-vung|tranh-cai|bac-bo)\[(.+)\]\s*$/gm)].map(([, ma, y]) => ({ ma, y }));

const hoaDau = (x) => x.replace(/^(\P{L}*)(\p{L})/u, (_, a, b) => a + b.toLocaleUpperCase('vi'));
const CHUA_KIEM = '<span class="pz-sach__chua">chưa kiểm định, chỉ có ở bản xem</span>';

/**
 * ::to-tom-tat: mỗi lĩnh vực một mục; mỗi bài: tên (link về bài), mô tả, và các ý chính kèm nhãn mức độ chắc chắn (như
 * hộp "Tóm tắt nhanh" của bài). Chữ đều lấy từ trang có trong bản build (bản thật: đã khóa); bài chưa khóa (chỉ ở bản
 * xem) được đánh dấu. Cuối cùng một dòng đếm bài chưa lên.
 */
export function toTomTat(d) {
	const { docsDir, base, ngayKhoa } = d;
	const nhom = baiTheoLinhVuc(d);
	const con = soBaiChuaLen(d);
	const doc = (t) => fs.readFileSync(path.join(docsDir, `${t}.md`), 'utf8');
	return (
		`<div class="pz-to-tom-tat not-content">` +
		nhom
			.map(
				({ lv, bai }) =>
					`<section class="pz-to-tom-tat__lv" style="--h: ${lv.mau}" aria-labelledby="lv-${lv.id}"><h2 id="lv-${lv.id}">${esc(lv.ten)}</h2><ul>` +
					bai
						.map((r) => {
							const fm = frontmatter(r.id, docsDir);
							const y = yChinh(doc(r.id));
							return (
								`<li><p class="pz-to-tom-tat__ten"><a href="${diaChi(r.id, base)}">${esc(fm.title ?? r.id)}</a>${ngayKhoa(r.id) ? '' : ` ${CHUA_KIEM}`}</p>` +
								(fm.description ? `<p class="pz-to-tom-tat__mo">${esc(fm.description)}</p>` : '') +
								(y.length ? `<ul class="pz-to-tom-tat__y">${y.map(({ ma, y }) => `<li>${chipNhan(ma)} ${md(hoaDau(y))}</li>`).join('')}</ul>` : '') +
								`</li>`
							);
						})
						.join('') +
					`</ul></section>`,
			)
			.join('') +
		(nhom.length ? '' : `<p class="pz-ds-bai__con">Chưa có bài nào lên site.</p>`) +
		(con ? `<p class="pz-ds-bai__con">Còn ${con} bài sắp có: mỗi bài vào tờ tóm tắt sau khi được kiểm chứng lại.</p>` : '') +
		`</div>`
	);
}

/** ::sach-in: chỗ đặt nội dung sách, do src/components/SachIn.astro dựng (MarkdownContent.astro thay chỗ này). */
export const CHO_SACH = '<div class="pz-sach-cho" data-sach-in></div>';

/**
 * HTML đã dựng của một bài, đặt vào Sách in (SachIn.astro): mọi id thêm tiền tố của bài (link #mục trong bài, hình SVG
 * dùng url(#…), aria-*) để không trùng giữa các bài; tiêu đề lùi hai bậc (bài là h3 dưới h2 của lĩnh vực); vùng có tên
 * (aside, role="region") thêm tên bài vào tên, để các vùng không trùng tên trong cùng trang (axe landmark-unique); công cụ
 * tương tác thay bằng một dòng link về trang; câu hỏi giữ bản tĩnh (bỏ dữ liệu cho bản bấm được).
 */
export function baiTrongSach(html, { tienTo, ten, diaChiBai }) {
	const p = (id) => `${tienTo}--${id}`;
	const nhieu = (v) => v.split(/\s+/).filter(Boolean).map(p).join(' ');
	const tenBai = esc(ten);
	return String(html)
		.replace(/<div class="pz-cong-cu [^"]*"[^>]*><\/div>/g, `<p class="pz-sach__cong-cu">Công cụ tương tác: trải nghiệm ở <a href="${diaChiBai}">trang của bài trên web</a>.</p>`)
		// câu hỏi chỉ giữ bản tĩnh: bỏ dữ liệu của bản bấm được và đổi lớp, để không có gì chờ được dựng (bộ tải, kiểm thử)
		.replace(/\sdata-quiz="[^"]*"/g, '')
		.replace(/class="pz-quiz not-content"/g, 'class="pz-quiz-sach not-content"')
		.replace(/(\s)id="([^"]+)"/g, (_, s, id) => `${s}id="${p(id)}"`)
		.replace(/(\s(?:xlink:)?href)="#([^"]+)"/g, (_, a, id) => `${a}="#${p(id)}"`)
		.replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${p(id)})`)
		.replace(/(\s(?:aria-labelledby|aria-describedby|aria-controls|for))="([^"]+)"/g, (_, a, v) => `${a}="${nhieu(v)}"`)
		.replace(/<(\/?)h([2-6])\b/g, (_, c, n) => `<${c}h${Math.min(6, Number(n) + 2)}`)
		.replace(/\blevel-h([2-6])\b/g, (_, n) => `level-h${Math.min(6, Number(n) + 2)}`)
		.replace(/<(aside|div|section)\b([^>]*)\saria-label="([^"]*)"/g, (m, the, tt, nhan) =>
			the === 'aside' || /\srole="region"/.test(m) ? `<${the}${tt} aria-label="${nhan} (bài: ${tenBai})"` : m,
		);
}

// ---------- Thẻ ngộ nhận (D8-L3): trang Ngộ nhận và trò chơi "Bạn nghĩ gì về tâm trí?" ----------
// Dữ liệu một chỗ: src/data/ngo-nhan.yml (khóa từng thẻ, kiem-dinh/du-lieu/ngo-nhan/<id>.yml). Cả trang lẫn trò chơi chỉ
// dùng thẻ có trong bản build: bản xem mọi thẻ; bản thật chỉ thẻ đã khóa đủ các trường hiện ra (TRUONG_THE). Chữ của thẻ
// là chữ thường (không Markdown), thoát HTML khi dựng.

/** Trường của thẻ hiện ra trên trang và trong trò chơi: thẻ chỉ lên bản thật khi mọi trường này đã khóa. */
// trang (link "Đọc thêm") và cap (cấp trong trò chơi) cũng hiện ra, nên cũng phải khóa: đổi chúng sau khi khóa thì build hỏng (review D8-L3)
export const TRUONG_THE = ['khang_dinh', 'nhan', 'giai_thich', 'nguon', 'trang', 'cap'];

/** Đáp án của trò chơi theo nhãn (như site cũ): Vững chắc, Khá vững là Đúng; Đã bị bác bỏ là Sai; Đang tranh cãi là Còn tranh cãi. */
export const DAP_AN_NHAN = { 'vung-chac': 'dung', 'kha-vung': 'dung', 'bac-bo': 'sai', 'tranh-cai': 'tranh-cai' };

/** Một nguồn dạng chữ thường (cho trò chơi): tác giả (năm). Tên. Nơi đăng. Link riêng. */
export function chuNguon(r) {
	const cham = (s) => (/[.?!]$/.test(s) ? s : s + '.');
	return { chu: `${cham(r.tac_gia)} (${r.nam}). ${cham(r.ten)}${r.noi_dang ? ` ${cham(r.noi_dang)}` : ''}`, link: r.doi ? `https://doi.org/${r.doi}` : (r.url ?? null) };
}

/**
 * Thẻ có trong bản build, theo thứ tự của ngo-nhan.yml: { the, con } (con: số thẻ chưa lên). `coThe(id)`: thẻ đã khóa đủ
 * TRUONG_THE chưa (bản xem: luôn có).
 */
export function theTrongBan(ngoNhan, coThe) {
	const the = ngoNhan.filter((r) => coThe(r.id));
	return { the, con: ngoNhan.length - the.length };
}

/** Bài liên quan của thẻ: { link, ten } khi trang ấy có trong bản build, không thì null. */
function baiLienQuan(r, { trangCo, docsDir, base }) {
	if (!r.trang || !trangCo.includes(r.trang)) return null;
	return { link: diaChi(r.trang, base), ten: frontmatter(r.trang, docsDir).title ?? r.trang };
}

/** Dữ liệu của trò chơi: thẻ trong bản build, nguồn dạng chữ, bài liên quan. Tên trường ngắn để khối nhẹ. */
export function duLieuNgoNhan({ ngoNhan, nguon, coThe, trangCo, docsDir, base }) {
	const theoId = new Map(nguon.map((r) => [r.id, r]));
	return theTrongBan(ngoNhan, coThe).the.map((r) => ({
		id: r.id,
		cap: r.cap,
		k: r.khang_dinh,
		n: r.nhan,
		g: r.giai_thich,
		ng: r.nguon.map((id) => chuNguon(theoId.get(id))),
		bai: baiLienQuan(r, { trangCo, docsDir, base }),
	}));
}

/**
 * ::ngo-nhan{nhan="bac-bo"}: các thẻ mang một nhãn, mỗi thẻ một khung nhãn (như :::bac-bo[…]): khẳng định là ý chính,
 * giải thích, bài liên quan (khi trang ấy có trong bản build), nguồn (APA, từ nguon.yml). Thẻ chưa lên bản build: một
 * dòng "Còn N thẻ … sắp có".
 */
export function trangNgoNhan({ nhan }, { ngoNhan, nguon, coThe, trangCo, docsDir, base }) {
	if (!TEN_NHAN[nhan]) throw new Error(`::ngo-nhan: nhan phải là một trong ${Object.keys(TEN_NHAN).join(', ')}`);
	const theoId = new Map(nguon.map((r) => [r.id, r]));
	const cua = ngoNhan.filter((r) => r.nhan === nhan);
	if (!cua.length) throw new Error(`::ngo-nhan: không có thẻ nào mang nhãn ${nhan} trong src/data/ngo-nhan.yml (bỏ mục này khỏi trang)`);
	const { the, con } = theTrongBan(cua, coThe);
	const ten = TEN_NHAN[nhan];
	const khung = (r) => {
		const bai = baiLienQuan(r, { trangCo, docsDir, base });
		return (
			`<aside class="pz-nhan pz-nhan--${nhan} pz-the-nn" id="the-${esc(r.id)}" aria-label="${esc(`${ten}: ${r.khang_dinh}`)}">` +
			`<p class="pz-nhan__dau"><span class="pz-nhan__muc">${ten}</span><span class="pz-an">: </span><span class="pz-nhan__y">${esc(r.khang_dinh)}</span></p>` +
			`<p>${esc(r.giai_thich)}</p>` +
			(bai ? `<p>Đọc thêm: <a href="${bai.link}">${esc(bai.ten)}</a></p>` : '') +
			`<p class="pz-the-nn__nguon"><em>Nguồn:</em> ${r.nguon.map((id) => dongNguon(theoId.get(id))).join('; ')}</p>` +
			`</aside>`
		);
	};
	return (
		`<div class="pz-ds-the">` +
		the.map(khung).join('') +
		(con ? `<p class="pz-ds-bai__con">${the.length ? 'Còn' : 'Có'} ${con} thẻ mang nhãn ${ten} sắp có: mỗi thẻ lên site sau khi được kiểm chứng lại.</p>` : '') +
		`</div>`
	);
}
