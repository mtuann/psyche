#!/usr/bin/env node
// Đối chiếu siêu dữ liệu của nguồn có DOI trong src/data/nguon.yml (D2-0, mức V1 của plans/ben-vung/chuan-kiem-dinh.md
// mục 3): tác giả đầu, năm, tên bài, nơi đăng (tạp chí, tập, số, trang) so với hai nguồn độc lập: Crossref (lượt 1) và
// OpenAlex (lượt 2). Không sửa src/data/: in bảng khớp, lệch ra file YAML để người làm xem và quyết.
//   node tools/du_lieu/doi.mjs [--ra <file>] [--chi <id,id>]
// Phản hồi lưu đệm ở .cache/doi/ (git bỏ qua), chạy lại không gọi mạng. Gọi chậm (khoảng 4 lần mỗi giây). User-Agent là
// của dự án, không có email (AGENTS.md, Mạng).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';

const GOC = fileURLToPath(new URL('../../', import.meta.url));
const DEM = path.join(GOC, '.cache', 'doi');
const UA = 'psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)';

const ngu = (ms) => new Promise((r) => setTimeout(r, ms));

/** JSON của một địa chỉ, có lưu đệm; 404 thì null. */
async function layJson(nguon, doi, url) {
	const f = path.join(DEM, nguon, encodeURIComponent(doi.toLowerCase()) + '.json');
	if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, 'utf8'));
	for (let lan = 0; lan < 3; lan++) {
		const r = await fetch(url, { headers: { 'User-Agent': UA } });
		await ngu(250);
		if (r.status === 404) {
			fs.mkdirSync(path.dirname(f), { recursive: true });
			fs.writeFileSync(f, 'null');
			return null;
		}
		if (r.ok) {
			const j = await r.json();
			fs.mkdirSync(path.dirname(f), { recursive: true });
			fs.writeFileSync(f, JSON.stringify(j));
			return j;
		}
		await ngu(2000 * (lan + 1));
	}
	throw new Error(`${nguon} ${doi}: không lấy được`);
}

/** Siêu dữ liệu chuẩn hóa từ Crossref: { ho, nam, ten, tapChi, tap, so, trang }. */
export function tuCrossref(j) {
	const m = j?.message;
	if (!m) return null;
	const nam = (m['published-print'] ?? m['published'] ?? m.issued)?.['date-parts']?.[0]?.[0];
	const tacGia = m.author ?? m.editor ?? [];
	return {
		ho: tacGia[0]?.family ?? tacGia[0]?.name ?? null,
		cacHo: tacGia.map((a) => a.family ?? a.name).filter(Boolean),
		nam: nam ?? null,
		namCacBan: [m.issued, m['published-print'], m['published-online'], m.published].map((x) => x?.['date-parts']?.[0]?.[0]).filter(Boolean),
		ten: [m.title?.[0], m.subtitle?.[0]].filter(Boolean).join(': '),
		tenChinh: m.title?.[0] ?? '',
		tapChi: m['container-title']?.[0] ?? null,
		tap: m.volume ?? null,
		so: m.issue ?? null,
		trang: m.page ?? m['article-number'] ?? null,
		loai: m.type,
		rut: (m['update-to'] ?? []).filter((u) => /retraction|withdrawal/i.test(u.type)).map((u) => u.type),
	};
}

/** Siêu dữ liệu chuẩn hóa từ OpenAlex. */
export function tuOpenAlex(j) {
	if (!j) return null;
	const b = j.biblio ?? {};
	const ten = j.authorships?.[0]?.author?.display_name ?? '';
	return {
		// OpenAlex chỉ có tên đầy đủ: họ là từ cuối (người Việt, "van der Kamp"… thì so cả tên, xem soBanGhi)
		ho: ten.split(' ').at(-1) || null,
		hoDu: ten,
		// tên đầy đủ của mọi tác giả: họ của bản ghi phải nằm trong tên tương ứng
		cacTen: (j.authorships ?? []).map((a) => a.author?.display_name).filter(Boolean),
		boPhuDe: true,
		nam: j.publication_year ?? null,
		namCacBan: [j.publication_year].filter(Boolean),
		ten: j.title ?? '',
		tenChinh: j.title ?? '',
		tapChi: j.primary_location?.source?.display_name ?? null,
		tap: b.volume ?? null,
		so: b.issue ?? null,
		trang: b.first_page ? (b.last_page && b.last_page !== b.first_page ? `${b.first_page}-${b.last_page}` : b.first_page) : null,
		rut: j.is_retracted ? ['is_retracted'] : [],
	};
}

/** Chữ để so: bỏ dấu, chữ thường, chỉ chữ và số, khoảng trắng gộp; "&" như "and". */
export const chuan = (s) =>
	String(s ?? '')
		.replace(/<[^>]+>/g, '')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&quot;/g, '"')
		.normalize('NFKD')
		.replace(/\p{Mn}/gu, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D')
		.replace(/ø/g, 'o')
		.replace(/ı/g, 'i')
		.replace(/æ/g, 'ae')
		.toLowerCase()
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();
/** Như chuan, bỏ cả khoảng trắng: "La Berge" như "LaBerge", "multi-tasks" như "multitasks". */
const liem = (s) => chuan(s).replace(/ /g, '');
/** a là đầu của b hay b là đầu của a (bỏ "the" ở đầu). */
const dauNhau = (a, b) => {
	const [x, y] = [liem(a).replace(/^the/, ''), liem(b).replace(/^the/, '')];
	return Boolean(x && y) && (x.startsWith(y) || y.startsWith(x));
};

/**
 * Họ của các tác giả trong tac_gia kiểu APA ("Họ, T. T., Họ2, T., & Họ3, T."), theo thứ tự; conNua: danh sách viết tắt
 * ("và cộng sự", "et al.", "…" của APA 7). Tổ chức (không có chữ viết tắt tên) là một tên.
 */
export function hoTrong(tg) {
	const ds = [];
	let conNua = false;
	for (let t of String(tg).split(/,\s*/)) {
		t = t.replace(/^&\s*/, '').trim();
		if (!t) continue;
		if (/^(và cộng sự|et al\.?)$/i.test(t)) {
			conNua = true;
			continue;
		}
		if (/^(…|\.\.\.)\s*/.test(t)) {
			// APA 7: 19 tác giả đầu, "…", tác giả cuối
			conNua = true;
			t = t.replace(/^(…|\.\.\.)\s*/, '');
			if (!t) continue;
		}
		// chữ viết tắt của tên: "J.", "M. C.", "J. St. B. T.", "Y.-w.", "Jr."
		if (/^((\p{Lu}\p{Ll}?\.|\p{Lu}\.-\p{Ll}+\.?)[\s-]?)+$/u.test(t) || /^(Jr\.|Sr\.|II|III)$/.test(t)) continue;
		ds.push(t);
	}
	return { ds, conNua };
}

/** Các họ của bản ghi khớp danh sách tác giả của nguồn (thứ tự, số lượng); trả về chuỗi lệch hay null. */
function lechDanhSach(r, m) {
	const nguon = m.cacHo ?? m.cacTen;
	if (!nguon?.length) return 'nguồn không ghi tác giả';
	const { ds, conNua } = hoTrong(r.tac_gia);
	const khop = (h, x) => (m.cacHo ? liem(x).endsWith(liem(h)) || liem(h).endsWith(liem(x)) : liem(x).includes(liem(h)));
	// "…" của APA 7: tác giả cuối của bản ghi là tác giả cuối của nguồn
	const cuoi = conNua && /…|\.\.\./.test(r.tac_gia) ? ds.pop() : null;
	const sai = ds.findIndex((h, i) => !nguon[i] || !khop(h, nguon[i]));
	if (sai >= 0) return `danh sách tác giả: tác giả thứ ${sai + 1} của bản ghi là "${ds[sai]}", nguồn ghi "${nguon[sai] ?? '(không có)'}"`;
	if (cuoi && !khop(cuoi, nguon.at(-1))) return `danh sách tác giả: tác giả cuối "${cuoi}", nguồn ghi "${nguon.at(-1)}"`;
	if (!conNua && nguon.length > ds.length) return `danh sách tác giả: bản ghi có ${ds.length}, nguồn có ${nguon.length} tác giả`;
	return null;
}

/**
 * So một bản ghi với siêu dữ liệu `m`. Trả về danh sách lệch (chuỗi), rỗng là khớp. Luật:
 * - tác giả: họ của tác giả đầu (theo nguồn) đứng đầu tac_gia;
 * - năm: năm của bản ghi (số đầu, hay số sau dấu / cho sách in lại) là một trong các năm của nguồn;
 * - tên: tên chính của nguồn và tên của bản ghi, sau chuẩn hóa, cái này là đầu của cái kia (bản ghi có thể ghi kèm hay
 *   bỏ phụ đề);
 * - nơi đăng (bài báo): tên tạp chí đứng đầu noi_dang; tập, số, trang của nguồn (nếu có) có trong noi_dang.
 */
export function soBanGhi(r, m) {
	if (!m) return ['nguồn không có DOI này'];
	const lech = [];
	// họ đứng trước dấu phẩy đầu tiên của tac_gia (APA: "Họ, T."); tổ chức thì tên tổ chức
	const hoGhi = liem(r.tac_gia.split(',')[0]);
	const coTrongTen = m.hoDu && liem(m.hoDu).includes(hoGhi);
	if (m.ho && !coTrongTen && !(hoGhi.endsWith(liem(m.ho)) || hoGhi.startsWith(liem(m.ho)) || liem(m.ho).endsWith(hoGhi)))
		lech.push(`tác giả đầu: nguồn ghi "${m.ho}", bản ghi "${r.tac_gia.slice(0, 40)}"`);
	else {
		const ds = lechDanhSach(r, m);
		if (ds) lech.push(`tác giả: ${ds}`);
	}
	const nam = String(r.nam).match(/\d{4}/g)?.map(Number) ?? [];
	if (m.namCacBan.length && !nam.some((n) => m.namCacBan.includes(n))) lech.push(`năm: nguồn ghi ${[...new Set(m.namCacBan)].join(', ')}, bản ghi ${r.nam}`);
	// tên của bản ghi là tên đầy đủ (có phụ đề) hay tên chính (bỏ phụ đề) của nguồn; dài hơn tên đầy đủ (lẫn tên tạp chí,
	// tập, trang) là lệch (review lượt 2 của D2-0: philpot2020)
	const [ten, tenDu, tenChinh] = [liem(r.ten), liem(m.ten), liem(m.tenChinh)];
	// OpenAlex hay bỏ phụ đề: bản ghi được dài hơn khi phần thêm là phụ đề, đứng ngay sau dấu hai chấm hay dấu hỏi
	const chiThemPhuDe = m.boPhuDe && ten.startsWith(tenDu) && /^\s*[:?]/.test(String(r.ten).slice(String(m.ten).replace(/[.?\s]+$/, '').length));
	if (m.tenChinh && !chiThemPhuDe && !(ten === tenDu || ten === tenChinh || (tenDu.startsWith(ten) && ten.length >= tenChinh.length)))
		lech.push(`tên: nguồn ghi "${m.ten}", bản ghi "${r.ten}"`);
	if (r.loai === 'bai-bao') {
		if (m.tapChi && !dauNhau(m.tapChi, String(r.noi_dang ?? '').split(/,\s*\d/)[0]))
			lech.push(`tạp chí: nguồn ghi "${m.tapChi}", bản ghi "${r.noi_dang ?? '(không có)'}"`);
		const so = String(r.noi_dang ?? '');
		if (m.tap && !new RegExp(`(^|\\D)${m.tap}(\\D|$)`).test(so)) lech.push(`tập: nguồn ghi ${m.tap}, bản ghi "${so}"`);
		const dau = String(m.trang ?? '').split(/[-–]/)[0];
		if (dau && !so.includes(dau)) lech.push(`trang: nguồn ghi ${m.trang}, bản ghi "${so}"`);
	}
	if (m.rut?.length) lech.push(`RÚT BÀI hay đính chính theo nguồn: ${m.rut.join(', ')}`);
	return lech;
}

if (import.meta.main) {
	const ts = process.argv.slice(2);
	const lay = (k) => (ts.includes(k) ? ts[ts.indexOf(k) + 1] : undefined);
	const ra = lay('--ra') ?? path.join(GOC, '.cache', 'doi', 'doi-chieu.yml');
	const chi = lay('--chi')?.split(',');
	const ds = parse(fs.readFileSync(path.join(GOC, 'src/data/nguon.yml'), 'utf8')).filter((r) => r.doi && (!chi || chi.includes(r.id)));
	const kq = [];
	let i = 0;
	for (const r of ds) {
		const doi = r.doi;
		const cr = tuCrossref(await layJson('crossref', doi, `https://api.crossref.org/works/${encodeURIComponent(doi)}`));
		const oa = tuOpenAlex(await layJson('openalex', doi, `https://api.openalex.org/works/doi:${encodeURIComponent(doi)}`));
		const l1 = soBanGhi(r, cr);
		const l2 = soBanGhi(r, oa);
		kq.push({ id: r.id, doi, luot_1: l1.length ? l1 : 'khop', luot_2: l2.length ? l2 : 'khop', crossref: cr, openalex: oa });
		if (++i % 25 === 0) console.error(`${i}/${ds.length}`);
	}
	fs.mkdirSync(path.dirname(ra), { recursive: true });
	fs.writeFileSync(ra, stringify(kq, { lineWidth: 0 }));
	const dem = (f) => kq.filter(f).length;
	console.log(
		`${kq.length} nguồn có DOI: cả hai khớp ${dem((x) => x.luot_1 === 'khop' && x.luot_2 === 'khop')}, chỉ Crossref khớp ${dem((x) => x.luot_1 === 'khop' && x.luot_2 !== 'khop')}, ` +
			`chỉ OpenAlex khớp ${dem((x) => x.luot_1 !== 'khop' && x.luot_2 === 'khop')}, cả hai lệch ${dem((x) => x.luot_1 !== 'khop' && x.luot_2 !== 'khop')}. Ghi ở ${path.relative(GOC, ra)}`,
	);
}
