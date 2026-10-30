#!/usr/bin/env node
// So chữ hiển thị của một trang ở bản build cũ (.cache/site-cu/) và bản build mới (dist/, bản xem), theo từng khối (đoạn,
// mục danh sách, ô bảng…), để biết việc chuyển cú pháp (tools/chuyen/chuyen.mjs) không làm mất hay đổi chữ (D1.5).
//   node tools/chuyen/so-chu.mjs <trang> [<trang>…] [--dist <thư mục build mới>]
//   node tools/chuyen/so-chu.mjs <trang> --doi-chu   in khung doi_chu (YAML) cho các khối khác mà hồ sơ kiem-dinh/<trang>.yml
//                                                    chưa ghi; điền ly_do rồi chép vào hồ sơ
// Câu hỏi so riêng (chữ từng câu, lựa chọn kèm đáp án đúng, giải thích); so cả tiêu đề, mô tả trang và id tiêu đề. Bỏ:
// hình vẽ SVG (chép nguyên từ trang cũ vào src/hinh/; chú thích vẫn so), hình và công cụ chưa chuyển, dòng "Rà soát nội
// dung lần cuối" và nút "In bài này" của site cũ (nay sinh từ hồ sơ; sách in làm ở đợt 8), chữ chỉ dành cho máy đọc màn hình (trừ dấu ": " của khung nhãn, như
// tiêu đề hộp cũ), link #mục cạnh tiêu đề, nhãn "sắp có", mục Bổ sung. Phần tử có data-sinh bỏ hẳn. Chép từ
// ../opus/tools/chuyen/so-chu.mjs rồi sửa cho cú pháp của Psyche Zero.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';

const GOC = fileURLToPath(new URL('../../', import.meta.url));
export const SITE_CU = path.join(GOC, '.cache', 'site-cu');

const KHOI = new Set(['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'tr', 'div', 'details', 'summary', 'pre', 'dt', 'dd', 'figcaption', 'blockquote', 'table', 'ul', 'ol', 'dl', 'section', 'aside', 'figure', 'hr', 'br', 'td', 'th']);
// Thẻ rỗng của HTML (không có thẻ đóng); thẻ SVG thì hoặc tự đóng (/>), hoặc có thẻ đóng riêng
const RONG = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

const giaiMa = (s) =>
	s
		.replace(/&nbsp;/g, ' ')
		.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
		.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

/** Tách HTML thành dãy thẻ, chú thích và chữ. */
function* tach(html) {
	const re = /<!--([\s\S]*?)-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+|<)/g;
	for (const m of html.matchAll(re)) {
		if (m[1] !== undefined) yield { loai: 'chu-thich', chu: m[1].trim() };
		else if (m[3]) {
			const tt = {};
			for (const a of m[4].matchAll(/([^\s=>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) tt[a[1].toLowerCase()] = a[2] ?? a[3] ?? a[4] ?? '';
			yield { loai: m[2] ? 'dong' : 'mo', ten: m[3].toLowerCase(), tt, tuDong: !!m[5] };
		} else yield { loai: 'chu', chu: m[6] };
	}
}

const coLop = (tt, lop) => (tt.class ?? '').split(/\s+/).includes(lop);

/** Cắt phần nội dung chính: phần tử đầu tiên khớp `laGoc(ten, tt)`, đến thẻ đóng tương ứng. Không thấy thì báo lỗi. */
function catNoiDung(html, laGoc, ten) {
	const ra = [];
	let sau = 0;
	let thay = false;
	for (const t of tach(html)) {
		if (!sau) {
			if (t.loai === 'mo' && laGoc(t.ten, t.tt)) sau = 1;
			thay ||= !!sau;
			continue;
		}
		if (t.loai === 'mo' && !t.tuDong && !RONG.has(t.ten)) sau++;
		if (t.loai === 'dong' && --sau === 0) break;
		ra.push(t);
	}
	if (!thay) throw new Error(`không thấy phần nội dung (${ten}) trong trang`);
	return ra;
}

/** Chữ hiện ra của một đoạn HTML ngắn (dữ liệu câu hỏi của trang mới): bỏ thẻ, giải mã, gộp khoảng trắng. */
const chuHienGoc = (html) => giaiMa(String(html ?? '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

/** Một câu hỏi thành một chuỗi để so: câu, các lựa chọn (đáp án đúng có dấu ✓), giải thích. */
const cauHoi = ({ q, opts, why }) => [q, ...opts.map((o) => (o.ok ? '✓ ' : '') + o.t), why].join(' | ');

/**
 * Các khối chữ hiển thị (chuỗi đã gộp khoảng trắng) của dãy thẻ `the`, bỏ cây con khớp `bo(ten, tt)`. Vùng giữa chú thích
 * <!-- fig:X --> và <!-- /fig:X --> bị bỏ nếu `boHinh(X)`.
 */
function khoiChu(the, bo, boHinh = () => false) {
	const khoi = [];
	let dang = '';
	let boSau = 0;
	let boDenHinh = null;
	let trongPre = 0; // trong khối mã: không ngắt khối theo dòng (Starlight bọc mỗi dòng mã trong một div)
	const ngat = () => {
		const s = dang.replace(/\s+/g, ' ').trim();
		if (s) khoi.push(s);
		dang = '';
	};
	for (const t of the) {
		if (boDenHinh) {
			if (t.loai === 'chu-thich' && t.chu === `/fig:${boDenHinh}`) boDenHinh = null;
			continue;
		}
		if (boSau) {
			if (t.loai === 'mo' && !t.tuDong && !RONG.has(t.ten)) boSau++;
			if (t.loai === 'dong') boSau--;
			continue;
		}
		if (t.loai === 'chu-thich') {
			const h = /^fig:([a-z0-9-]+)$/.exec(t.chu);
			if (h && boHinh(h[1])) boDenHinh = h[1];
			continue;
		}
		if (t.loai === 'mo' && bo(t.ten, t.tt)) {
			if (!t.tuDong && !RONG.has(t.ten)) boSau = 1;
			continue;
		}
		if (t.ten === 'pre') trongPre += t.loai === 'mo' ? 1 : -1;
		if (t.loai === 'chu') dang += giaiMa(t.chu);
		else if (trongPre) dang += t.ten === 'div' ? ' ' : ''; // mỗi dòng mã một div; span tô màu không thêm khoảng trắng
		else if (KHOI.has(t.ten)) ngat();
		else if (t.ten === 'td' || t.ten === 'th') dang += ' | ';
	}
	ngat();
	return khoi;
}

/**
 * Câu hỏi của trang cũ: <div class="pz-quiz"> chứa danh sách đánh số; mỗi mục là câu hỏi (đoạn đầu), danh sách lựa chọn
 * (ô đánh dấu, đáp án đúng có checked), rồi các đoạn giải thích.
 */
function phanThanhPhanCu(the) {
	const quiz = [];
	let sau = 0; // độ sâu trong khối pz-quiz
	let c = null;
	let viTri = null; // 'hoi' | 'chon' | 'giai'
	let chu = '';
	let dung = false;
	const xongChu = () => {
		const s = chu.replace(/\s+/g, ' ').trim();
		chu = '';
		return s;
	};
	for (const t of the) {
		if (!sau) {
			if (t.loai === 'mo' && t.ten === 'div' && coLop(t.tt, 'pz-quiz')) sau = 1;
			continue;
		}
		if (t.loai === 'mo' && !t.tuDong && !RONG.has(t.ten)) sau++;
		if (t.loai === 'dong') sau--;
		if (!sau) break;
		if (t.loai === 'mo' && t.ten === 'li' && sau === 3) {
			quiz.push((c = { q: '', opts: [], why: [] }));
			viTri = 'hoi';
		} else if (c && t.loai === 'mo' && t.ten === 'ul') viTri = 'chon';
		else if (c && t.loai === 'mo' && t.ten === 'li' && viTri === 'chon') (chu = ''), (dung = false);
		else if (c && t.loai === 'mo' && t.ten === 'input') dung ||= 'checked' in t.tt;
		else if (c && t.loai === 'dong' && t.ten === 'li' && viTri === 'chon') c.opts.push({ t: xongChu(), ok: dung });
		else if (c && t.loai === 'dong' && t.ten === 'ul') (viTri = 'giai'), (chu = '');
		else if (c && t.loai === 'dong' && t.ten === 'p') {
			if (viTri === 'hoi') c.q = xongChu();
			else if (viTri === 'giai') c.why.push(xongChu());
		} else if (t.loai === 'chu') chu += giaiMa(t.chu);
	}
	return { quiz: quiz.map((x) => cauHoi({ ...x, why: x.why.filter(Boolean).join(' ') })) };
}

/** Như trên cho trang mới: câu hỏi trong data-quiz (HTML của từng phần; nhãn "sắp có" không phải chữ của trang). */
function phanThanhPhanMoi(the) {
	const chuHien = (html) => chuHienGoc(String(html ?? '').replace(/ <span class="pz-sap-co-nhan"[^>]*>sắp có<\/span>/g, ''));
	const quiz = [];
	for (const t of the) {
		if (t.loai !== 'mo') continue;
		if (coLop(t.tt, 'pz-quiz') && t.tt['data-quiz'])
			for (const x of JSON.parse(giaiMa(t.tt['data-quiz'])))
				quiz.push({ q: chuHien(x.q), opts: x.opts.map((o) => ({ t: chuHien(o.t), ok: o.ok })), why: x.why.map(chuHien).join(' ') });
	}
	return { quiz: quiz.map(cauHoi) };
}

/** Id của các tiêu đề h2–h6 trong dãy thẻ (để link #mục của site cũ vẫn đúng). */
const idTieuDe = (the, bo = () => false) =>
	the.filter((t) => t.loai === 'mo' && /^h[2-6]$/.test(t.ten) && t.tt.id && !bo(t.tt.id)).map((t) => t.tt.id);

/** Dòng trạng thái của site cũ, nay sinh từ hồ sơ kiem-dinh/ (tools/chuyen/chuyen.mjs bỏ dòng này khi chuyển). */
const RA_SOAT = /^Rà soát nội dung lần cuối:/;

/** Khối chữ, câu hỏi, id tiêu đề của trang ở bản build cũ. */
export function docCu(html) {
	const the = catNoiDung(html, (ten, tt) => ten === 'article' && coLop(tt, 'md-content__inner'), 'article.md-content__inner của bản cũ');
	const bo = (ten, tt) =>
		ten === 'h1' || ten === 'script' || ten === 'style' || ten === 'svg' || coLop(tt, 'headerlink') || coLop(tt, 'md-content__button') ||
		coLop(tt, 'md-source-file') || coLop(tt, 'pz-quiz') || coLop(tt, 'pz-print-btn');
	return { khoi: khoiChu(the, bo).filter((k) => !RA_SOAT.test(k)), id: idTieuDe(the), ...phanThanhPhanCu(the) };
}

/** Khối chữ, câu hỏi, id tiêu đề của trang ở bản build mới. */
export function docMoi(html) {
	// nhãn "sắp có" (src/plugins/sap-co.mjs) không phải chữ của trang: bỏ cả nhãn lẫn dấu cách plugin đặt trước nó
	html = html.replaceAll(' <span class="pz-sap-co-nhan"', '<span class="pz-sap-co-nhan"');
	const the = catNoiDung(html, (ten, tt) => ten === 'div' && coLop(tt, 'sl-markdown-content'), 'div.sl-markdown-content của bản mới');
	const bo = (ten, tt) =>
		ten === 'script' || ten === 'style' || ten === 'svg' || coLop(tt, 'sl-anchor-link') || coLop(tt, 'sr-only') || coLop(tt, 'pz-quiz') ||
		coLop(tt, 'pz-chua-chuyen') || coLop(tt, 'pz-sap-co-nhan') || coLop(tt, 'pz-bo-sung') || 'data-footnote-backref' in tt || coLop(tt, 'copy');
	return { khoi: khoiChu(the, bo), id: idTieuDe(the, (id) => id === 'footnote-label' || id === 'bo-sung'), ...phanThanhPhanMoi(the) };
}

/**
 * Chữ của một dãy khối, bỏ cách ngắt khối: Python-Markdown của site cũ dồn danh sách viết sát đoạn trên (không có dòng
 * trống) vào đoạn ấy, chữ "1." "-" thành chữ thường; CommonMark của site mới tách thành danh sách. Chữ như nhau, chỉ khác
 * cách ngắt khối.
 */
const chuLien = (ds) => ds.join(' ').replace(/(^|\s)(\d+\.|-)(?=\s)/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Các khối khác nhau giữa hai dãy (so theo dãy con chung dài nhất): [{ cu, moi }] với cu, moi là khối hay null. Một cụm
 * khối khác liền nhau mà chữ liền như nhau (chuLien) chỉ khác cách ngắt khối: không tính là khác, ghi vào `ngat`.
 */
export function khacNhau(a, b, ngat = []) {
	const ra = [];
	let cum = [];
	const dong = () => {
		const cu = cum.filter((d) => d.cu !== null).map((d) => d.cu);
		const moi = cum.filter((d) => d.moi !== null).map((d) => d.moi);
		if (cu.length && moi.length && chuLien(cu) === chuLien(moi)) ngat.push({ cu, moi });
		else ra.push(...cum);
		cum = [];
	};
	for (const d of buoc(a, b)) {
		if (d.giong) dong();
		else cum.push(d);
	}
	dong();
	return ra;
}

/** Mọi bước của phép so (LCS): khối giống nhau ({giong: true}) và khối khác ({cu, moi}, một trong hai là null). */
function buoc(a, b) {
	const n = a.length;
	const m = b.length;
	const L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
	for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
	const ra = [];
	let i = 0;
	let j = 0;
	while (i < n || j < m) {
		if (i < n && j < m && a[i] === b[j]) {
			ra.push({ giong: true });
			i++;
			j++;
		} else if (j < m && (i === n || L[i][j + 1] >= L[i + 1][j])) ra.push({ cu: null, moi: b[j++] });
		else ra.push({ cu: a[i++], moi: null });
	}
	return ra;
}

/**
 * Bỏ khỏi HTML các phần tử có thuộc tính data-sinh (phần sinh từ dữ liệu, chữ do thành phần dựng): chữ của chúng không
 * phải chữ của trang, nên không so với trang cũ.
 */
export function boPhanSinh(html) {
	let ra = html;
	for (let m; (m = /<([a-z][a-z0-9-]*)\b[^>]*\sdata-sinh(?=[\s=>])[^>]*>/i.exec(ra)); ) {
		const ten = m[1].toLowerCase();
		const re = new RegExp(`<(/?)${ten}\\b[^>]*>`, 'gi');
		re.lastIndex = m.index + m[0].length;
		let sau = 1;
		let het = ra.length;
		for (let t; sau && (t = re.exec(ra)); ) if ((sau += t[1] ? -1 : 1) === 0) het = re.lastIndex;
		ra = ra.slice(0, m.index) + ra.slice(het);
	}
	return ra;
}

/**
 * Mọi "khối" so được của một trang, như so-chu tách: khối chữ (đoạn, mục danh sách, dòng bảng…), cộng tiêu đề, mô tả, id
 * tiêu đề và câu hỏi, mỗi thứ một dòng có tiền tố ("tiêu đề: …", "id: …").
 */
export function khoiSo(trang, dist = path.join(GOC, 'dist')) {
	const kq = soTrang(trang, dist);
	const html = fs.readFileSync(path.join(dist, trang.replace(/\/index$/, ''), 'index.html'), 'utf8');
	const cu = docCu(fs.readFileSync(path.join(SITE_CU, trang.replace(/\/index$/, ''), 'index.html'), 'utf8'));
	const moi = docMoi(boPhanSinh(html));
	const them = (k, i) => [`tiêu đề: ${kq.tieuDe[i]}`, `mô tả: ${kq.moTa[i]}`, ...kq.id[i].map((x) => `id: ${x}`), ...kq.quiz[i].map((q) => `câu hỏi: ${q}`)];
	return { cu: [...cu.khoi, ...them(kq, 0)], moi: [...moi.khoi, ...them(kq, 1)] };
}

/** Phần của dãy `a` không có trong dãy `b` (đếm cả số lần lặp). */
export const tru = (a, b) => {
	const con = new Map();
	for (const x of b) con.set(x, (con.get(x) ?? 0) + 1);
	return a.filter((x) => (con.get(x) ? (con.set(x, con.get(x) - 1), false) : true));
};

/**
 * Khung doi_chu cho các khối khác trang cũ mà `daGhi` (doi_chu đang có trong hồ sơ) chưa ghi. Các khối khác liền nhau (theo
 * dãy con chung dài nhất) gộp thành một mục { cu, moi, ly_do: '' }; cu, moi là một khối, danh sách khối, hay null.
 */
export function khungDoiChu(trang, daGhi = [], dist = path.join(GOC, 'dist')) {
	const k = khoiSo(trang, dist);
	const dem = (ds) => {
		const m = new Map();
		for (const x of ds) m.set(x, (m.get(x) ?? 0) + 1);
		return m;
	};
	if (!Array.isArray(daGhi)) throw new Error('doi_chu của hồ sơ phải là danh sách');
	const conCu = dem(daGhi.flatMap((d) => d?.cu ?? []));
	const conMoi = dem(daGhi.flatMap((d) => d?.moi ?? []));
	const lay = (m, x) => (m.get(x) ? (m.set(x, m.get(x) - 1), true) : false);
	const ra = [];
	let muc = null;
	let truoc = -2;
	// khối khác liền nhau trên trang (không có khối giống xen giữa) gộp thành một mục
	buoc(k.cu, k.moi).forEach((d, i) => {
		if (d.giong) return;
		const cu = d.cu !== null && !lay(conCu, d.cu) ? d.cu : null;
		const moi = d.moi !== null && !lay(conMoi, d.moi) ? d.moi : null;
		if (cu === null && moi === null) return;
		if (!muc || i !== truoc + 1) ra.push((muc = { cu: [], moi: [] }));
		if (cu !== null) muc.cu.push(cu);
		if (moi !== null) muc.moi.push(moi);
		truoc = i;
	});
	const gon = (ds) => (ds.length === 0 ? null : ds.length === 1 ? ds[0] : ds);
	return ra.map((m) => ({ cu: gon(m.cu), moi: gon(m.moi), ly_do: '' }));
}

const fileTrang = (goc, trang) => path.join(goc, trang === 'index' ? '' : trang.replace(/\/index$/, ''), 'index.html');

/** So một trang. Trả về { khac, quiz, id, tieuDe, moTa } (mỗi mục là cặp [cũ, mới]); khac rỗng và các cặp bằng nhau là đạt. */
export function soTrang(trang, dist = path.join(GOC, 'dist')) {
	const cuHtml = fs.readFileSync(fileTrang(SITE_CU, trang), 'utf8');
	const moiHtml = boPhanSinh(fs.readFileSync(fileTrang(dist, trang), 'utf8'));
	const cu = docCu(cuHtml);
	const moi = docMoi(moiHtml);
	const h1 = (html, re) =>
		giaiMa((re.exec(html)?.[1] ?? '').replace(/<a class="headerlink"[\s\S]*?<\/a>/, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
	// mô tả: bản cũ đọc og:description (thẻ description của site cũ không thoát dấu nháy), bản mới đọc thẻ description
	const moTa = (html, re) => giaiMa(re.exec(html)?.[1] ?? '');
	const ngat = [];
	return {
		khac: khacNhau(cu.khoi, moi.khoi, ngat),
		ngat,
		quiz: [cu.quiz, moi.quiz],
		id: [cu.id, moi.id],
		tieuDe: [h1(cuHtml, /<h1[^>]*>([\s\S]*?)<\/h1>/), h1(moiHtml, /<h1 id="_top"[^>]*>([\s\S]*?)<\/h1>/)],
		moTa: [moTa(cuHtml, /<meta property="og:description" content="([^"]*)"/), moTa(moiHtml, /<meta name="description" content="([^"]*)"/)],
	};
}

export const dat = (kq) =>
	!kq.khac.length &&
	kq.tieuDe[0] === kq.tieuDe[1] &&
	kq.moTa[0] === kq.moTa[1] &&
	['quiz', 'id'].every((k) => JSON.stringify(kq[k][0]) === JSON.stringify(kq[k][1]));

// ---------- Dòng lệnh ----------
// import.meta.main: đúng cả khi đường dẫn script đi qua liên kết tượng trưng (/tmp trên macOS)
if (import.meta.main) {
	const ts = process.argv.slice(2);
	const iDist = ts.indexOf('--dist');
	const dist = iDist >= 0 ? path.resolve(ts[iDist + 1]) : undefined;
	const trangs = ts.filter((t, i) => !t.startsWith('--') && (iDist < 0 || i !== iDist + 1));
	if (ts.includes('--doi-chu')) {
		for (const trang of trangs) {
			const f = path.join(GOC, 'kiem-dinh', `${trang}.yml`);
			let khung;
			try {
				const daGhi = (fs.existsSync(f) && parse(fs.readFileSync(f, 'utf8'))?.doi_chu) || [];
				khung = khungDoiChu(trang, daGhi, dist);
			} catch (e) {
				process.exitCode = 1;
				console.log(`# ${trang}: KHÔNG SO ĐƯỢC: ${e.message}`);
				continue;
			}
			console.log(`# ${trang}: ${khung.length ? `${khung.length} mục chưa ghi` : 'doi_chu đã đủ'}`);
			if (khung.length) process.stdout.write(stringify({ doi_chu: khung }, { lineWidth: 0 }));
		}
	} else {
		let hong = 0;
		for (const trang of trangs) {
			let kq;
			try {
				kq = soTrang(trang, dist);
			} catch (e) {
				hong++;
				console.log(`${trang}: KHÔNG SO ĐƯỢC: ${e.message}`);
				continue;
			}
			const ghiNgat = kq.ngat.length ? ` (${kq.ngat.length} chỗ chỉ khác cách ngắt khối: danh sách site cũ dồn vào đoạn trên)` : '';
			if (dat(kq)) {
				console.log(`${trang}: chữ giống nhau${ghiNgat}`);
				continue;
			}
			hong++;
			console.log(`${trang}: KHÁC`);
			if (kq.tieuDe[0] !== kq.tieuDe[1]) console.log(`  tiêu đề: "${kq.tieuDe[0]}" / "${kq.tieuDe[1]}"`);
			if (kq.moTa[0] !== kq.moTa[1]) console.log(`  mô tả: "${kq.moTa[0]}" / "${kq.moTa[1]}"`);
			const [qCu, qMoi] = kq.quiz;
			if (qCu.length !== qMoi.length) console.log(`  câu hỏi: cũ ${qCu.length} câu, mới ${qMoi.length} câu`);
			qCu.forEach((q, i) => qMoi[i] !== undefined && q !== qMoi[i] && console.log(`  câu hỏi ${i + 1}:\n    cũ:  ${q}\n    mới: ${qMoi[i]}`));
			const idKhac = kq.id[0].filter((x, i) => x !== kq.id[1][i]);
			if (idKhac.length || kq.id[0].length !== kq.id[1].length) console.log(`  id tiêu đề: cũ ${JSON.stringify(kq.id[0])} / mới ${JSON.stringify(kq.id[1])}`);
			for (const { cu, moi } of kq.khac.slice(0, 20)) console.log(cu !== null ? `  - cũ: ${cu.slice(0, 200)}` : `  + mới: ${moi.slice(0, 200)}`);
			if (kq.khac.length > 20) console.log(`  … còn ${kq.khac.length - 20} khối khác`);
		}
		process.exitCode = hong ? 1 : 0;
	}
}
