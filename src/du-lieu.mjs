// Lớp dữ liệu của site (plans/ben-vung/README.md, mục 4.3): schema của năm bộ dữ liệu trong src/data/, các phép kiểm
// chéo giữa chúng, và bộ nạp cho content collections của Astro (src/content.config.ts). Chép từ ../opus/src/du-lieu.mjs
// (việc D1.2 của opus) rồi sửa cho Psyche.
// Dữ liệu sai (YAML hỏng, sai kiểu, trường lạ, trùng id, tham chiếu tới thứ không có) thì ném lỗi, nên build hỏng.
// Kiểm thử dùng thẳng kiemTra() trên bộ dữ liệu hỏng mẫu trong tests/du-lieu-hong/.
// Biến môi trường PSYCHE_DU_LIEU đổi thư mục dữ liệu (mặc định src/data), để thử build với bộ dữ liệu khác.
//
// Tầng, lĩnh vực, bài lõi mà bài mở rộng dựa trên, hạn xem lại của mỗi trang chỉ ghi ở src/data/trang.yml, không ghi ở
// frontmatter: một chỗ cho mỗi điều, và đổi hạn xem lại hay dua_tren không đổi mã băm của trang đã khóa (D1.6). Tầng và
// lĩnh vực khóa theo bản ghi của trang.yml (D2-0): đổi chúng là mở khóa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LineCounter, parseDocument } from 'yaml';
import { z } from 'astro/zod';

/** Tên bộ dữ liệu -> file trong thư mục dữ liệu. */
export const TEP = {
	'linh-vuc': 'linh-vuc.yml',
	trang: 'trang.yml',
	nguon: 'nguon.yml',
	'nghien-cuu': 'nghien-cuu.yml',
	'ngo-nhan': 'ngo-nhan.yml',
};

/**
 * Tầng của trang (plans/ben-vung/README.md, mục 2): loi (Nền tảng), mo-rong (Mở rộng), cap-nhat (dòng cập nhật),
 * cong-cu (công cụ), co-han (thông tin có hạn, như số liên hệ), du-lieu (trang sinh từ bản ghi), khung (mục lục, trang
 * sinh, trang về site).
 */
export const TANG = ['loi', 'mo-rong', 'cap-nhat', 'cong-cu', 'co-han', 'du-lieu', 'khung'];
/** Bốn nhãn mức độ chắc chắn (plans/ben-vung/chuan-kiem-dinh.md, mục 4). */
export const NHAN = ['vung-chac', 'kha-vung', 'tranh-cai', 'bac-bo'];
export const LOAI_NGUON = ['bai-bao', 'sach', 'chuong-sach', 'bao-cao', 'trang-web', 'khac'];

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const chu = z.string().trim().min(1);
const idChu = z.string().regex(ID, 'id chỉ gồm a–z, 0–9 và dấu gạch ngang');
const duongDan = z.string().regex(/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/, 'đường dẫn trang như "thi-nghiem/asch" (bỏ .md, không có / ở đầu, cuối)');
const namThang = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'dạng năm-tháng, ví dụ 2027-11');
const link = z.url({ protocol: /^https?$/, error: 'link phải là http hay https' }); // link thành href trên trang
/** Danh sách không có phần tử lặp. */
const khongLap = (s) => s.refine((a) => new Set(a).size === a.length, 'có phần tử lặp');

/** Schema của từng bộ dữ liệu. Trường lạ là lỗi (strict), để gõ sai tên trường không lọt qua. */
export const schema = {
	// 14 lĩnh vực của bản đồ Nền tảng. mau: sắc độ (hue 0–359) của màu riêng của lĩnh vực (giao diện, D1.3).
	'linh-vuc': z
		.object({
			id: idChu,
			ten: chu,
			thu_tu: z.number().int().min(1),
			mau: z.number().int().min(0).max(359),
			mo_ta: chu.optional(),
			bieu_tuong: idChu.optional(),
		})
		.strict(),

	// Mọi trang của site, kể cả trang chưa chuyển. id là đường dẫn trong src/content/docs/ (bỏ .md), cũng là địa chỉ
	// /psyche/<id>/; địa chỉ giữ nguyên (luật 4) nên dùng làm mã của trang.
	trang: z
		.object({
			id: z.union([z.literal('index'), duongDan]),
			tang: z.enum(TANG),
			linh_vuc: idChu.optional(),
			moi: z.literal(true).optional(), // trang mới, không có ở site cũ
			dua_tren: khongLap(z.array(duongDan).min(1)).optional(), // bài mở rộng: các bài lõi mà nó dựa trên
			kiem_lai_truoc: namThang.optional(), // bài mở rộng, trang có hạn: hạn xem lại, đặt khi khóa
		})
		.strict()
		.superRefine((r, ctx) => {
			if ((r.tang === 'loi' || r.tang === 'mo-rong') && !r.linh_vuc)
				ctx.addIssue({ code: 'custom', path: ['linh_vuc'], message: 'trang lõi, trang mở rộng phải có linh_vuc' });
			if (r.dua_tren && r.tang !== 'mo-rong')
				ctx.addIssue({ code: 'custom', path: ['dua_tren'], message: 'chỉ trang mở rộng (mo-rong) có dua_tren' });
			if (r.kiem_lai_truoc && r.tang !== 'mo-rong' && r.tang !== 'co-han')
				ctx.addIssue({ code: 'custom', path: ['kiem_lai_truoc'], message: 'chỉ trang mở rộng, trang có hạn có kiem_lai_truoc' });
		}),

	// Nguồn: bài báo, sách, báo cáo, trang web mà các trang dẫn. id: họ tác giả đầu và năm (cepeda2006), trùng thì thêm
	// b, c… Mục Nguồn của trang vẫn viết trong trang; bản ghi ở đây để kiểm định, đối chiếu và theo dõi rút bài.
	nguon: z
		.object({
			id: idChu,
			loai: z.enum(LOAI_NGUON),
			tac_gia: chu,
			nam: z.union([
				z.number().int().min(1800).max(2100),
				z.string().regex(/^(?:\d{4}[a-z]?(?:\/\d{4}[a-z]?)?|n\.d\.)$/, 'năm như 2006, 1885/1913, 2006a hay n.d.'),
			]),
			nam_goc: z.number().int().min(1800).max(2100).optional(), // năm của ấn bản gốc (sách in lại, bản dịch)
			ten: chu,
			noi_dang: chu.regex(/^[^,.;:]/, 'nơi đăng không mở đầu bằng dấu câu').optional(),
			doi: z
				.string()
				.regex(/^10\.\d{4,9}\/\S*[^\s.,;]$/, 'DOI như 10.1037/0033-2909.132.3.354: không có https://doi.org/, không có dấu câu ở cuối')
				.optional(),
			url: link.optional(),
			toan_van: z.boolean().optional(), // có đọc được toàn văn không (ghi khi kiểm định)
			rut_bai: z.object({ ngay: z.iso.date(), nguon: link }).strict().optional(), // thông báo rút bài
		})
		.strict()
		.superRefine((r, ctx) => {
			if (r.url && /^https?:\/\/(dx\.)?doi\.org\//i.test(r.url))
				ctx.addIssue({ code: 'custom', path: ['url'], message: 'link doi.org ghi ở trường doi, không ở url' });
			const nam = namSo(r.nam);
			if (r.nam_goc !== undefined && nam !== null && r.nam_goc > nam)
				ctx.addIssue({ code: 'custom', path: ['nam_goc'], message: 'năm của ấn bản gốc sau năm của ấn bản được dẫn' });
			if (nam !== null && !r.id.includes(String(nam)))
				ctx.addIssue({ code: 'custom', path: ['id'], message: `id không có năm ${nam} (id: họ tác giả đầu và năm, như cepeda2006)` });
		}),

	// Hồ sơ nghiên cứu kinh điển: mỗi nghiên cứu một trang nhà (trang kể chi tiết), nơi khác chỉ tóm một câu và link về.
	'nghien-cuu': z
		.object({
			id: idChu,
			ten: chu,
			nguon: khongLap(z.array(idChu).min(1)),
			trang_nha: duongDan,
			ho_so: z.object({ nguoi_tham_gia: chu.optional(), thiet_ke: chu.optional(), ket_qua: chu.optional() }).strict().optional(),
		})
		.strict(),

	// Thẻ ngộ nhận. cap: cấp trong bài thử "Bạn nghĩ gì về tâm trí?" (bài thử lấy thẻ có cấp nhỏ hơn hay bằng mức đã chọn).
	'ngo-nhan': z
		.object({
			id: idChu,
			cap: z.number().int().min(1).max(3),
			khang_dinh: chu,
			nhan: z.enum(NHAN),
			giai_thich: chu,
			nguon: khongLap(z.array(idChu).min(1)),
			trang: duongDan.optional(),
		})
		.strict(),
};

/** Năm (số) của trường nam: 2006, "2006a", "1885/1913" (lấy năm đầu); "n.d." thì null. */
function namSo(nam) {
	const m = /^\d{4}/.exec(String(nam));
	return m ? Number(m[0]) : null;
}

/**
 * Phần thêm vào schema frontmatter của trang (src/content.config.ts): thông tin của trang ghi ở src/data/trang.yml, cùng
 * các trường mà kế hoạch đầu định ghi ở frontmatter (ma, loai, can_ra_soat; báo cáo D1.2). Ghi ở frontmatter thì báo
 * lỗi, không lặng lẽ bỏ qua. Danh sách lấy từ schema của trang.yml, nên thêm trường ở đó thì ở đây tự có.
 */
const oTrangYml = z
	.undefined({ error: 'không ghi ở frontmatter: thông tin này của trang ghi ở src/data/trang.yml (AGENTS.md, mục Dữ liệu)' })
	.optional();
export const TRUONG_O_TRANG_YML = [...Object.keys(schema.trang.shape).filter((k) => k !== 'id'), 'ma', 'loai', 'can_ra_soat'];
export const frontmatterRieng = z.object(Object.fromEntries(TRUONG_O_TRANG_YML.map((k) => [k, oTrangYml])));

/**
 * Loại trang, suy từ đường dẫn (không ghi ở đâu): kham-pha (bài khám phá), suc-khoe (bài Sức khỏe tâm thần),
 * thi-nghiem, phuong-phap (Hiểu bằng chứng), cong-cu (Tự trải nghiệm), trang (trang chủ, mục lục, Bắt đầu, Thêm…).
 * Trang mục lục (index) của mỗi nhóm là trang.
 */
export function loaiTrang(id) {
	if (id === 'index' || id.endsWith('/index')) return 'trang';
	if (id.startsWith('kham-pha/suc-khoe-tam-than/')) return 'suc-khoe';
	const nhom = { 'kham-pha': 'kham-pha', 'thi-nghiem': 'thi-nghiem', 'bang-chung': 'phuong-phap', 'trai-nghiem': 'cong-cu' };
	return nhom[id.split('/')[0]] ?? 'trang';
}

/** Thư mục gốc của dự án: thư mục cha của src/, nơi có file này. */
const GOC = fileURLToPath(new URL('../', import.meta.url));

/** Thư mục dữ liệu: PSYCHE_DU_LIEU (tương đối với thư mục gốc) hay src/data. */
export function thuMuc() {
	return path.resolve(GOC, process.env.PSYCHE_DU_LIEU || 'src/data');
}

const tiengViet = { error: z.locales.vi().localeError }; // lời báo lỗi của Zod bằng tiếng Việt

/**
 * Đọc một file dữ liệu: { tho, dong } (tho: giá trị YAML; dong[i]: số dòng của phần tử thứ i của danh sách gốc), hay
 * ném lỗi với lời báo ngắn (không có file, YAML hỏng kèm dòng, không đọc được).
 */
function docTep(file) {
	let text;
	try {
		text = fs.readFileSync(file, 'utf8');
	} catch (e) {
		throw new Error(e.code === 'ENOENT' ? 'không có file' : `không đọc được: ${e.message}`);
	}
	const lc = new LineCounter();
	const doc = parseDocument(text, { lineCounter: lc });
	if (doc.errors.length) throw new Error('YAML hỏng: ' + doc.errors[0].message.split('\n')[0]);
	const dong = (doc.contents?.items ?? []).map((it) => (it?.range ? lc.linePos(it.range[0]).line : undefined));
	return { tho: doc.toJS(), dong };
}

/**
 * Đọc và kiểm toàn bộ dữ liệu trong `dir`. Trả về { duLieu, loi }: duLieu[ten] là mảng bản ghi đã qua schema,
 * loi là danh sách lỗi (chuỗi), rỗng khi dữ liệu đúng. Lỗi của một bản ghi có số dòng của bản ghi trong file.
 */
export function kiemTra(dir = thuMuc()) {
	const loi = [];
	const duLieu = {};
	const thoCua = {}; // bản ghi như trong file, kể cả bản ghi sai schema: để kiểm "có tồn tại không"
	const hong = new Set(); // bộ không đọc được (thiếu file, YAML hỏng, không phải danh sách, rỗng): bỏ qua kiểm chéo với nó
	for (const [ten, tep] of Object.entries(TEP)) {
		duLieu[ten] = [];
		let tho, dong;
		try {
			({ tho, dong } = docTep(path.join(dir, tep)));
		} catch (e) {
			loi.push(`${tep}: ${e.message}`);
			hong.add(ten);
			continue;
		}
		if (!Array.isArray(tho) || !tho.length) {
			loi.push(`${tep}: ${Array.isArray(tho) ? 'không có bản ghi nào' : 'phải là một danh sách bản ghi'}`);
			hong.add(ten);
			continue;
		}
		thoCua[ten] = tho.filter((r) => r && typeof r === 'object');
		const daCo = new Set();
		tho.forEach((r, i) => {
			const coId = r && r.id !== undefined;
			const o = dong[i] ? ` (dòng ${dong[i]})` : '';
			const tenBanGhi = coId ? `"${r.id}"${o}` : `thứ ${i + 1}${o}`;
			if (coId) {
				if (daCo.has(String(r.id))) loi.push(`${tep}: trùng id "${r.id}"${o}`);
				daCo.add(String(r.id));
			}
			const kq = schema[ten].safeParse(r, tiengViet);
			if (!kq.success) {
				for (const issue of kq.error.issues) {
					const truong = issue.path.length ? issue.path.join('.') + ': ' : '';
					loi.push(`${tep}: bản ghi ${tenBanGhi}: ${truong}${issue.message}`);
				}
			} else {
				duLieu[ten].push(kq.data);
			}
		});
	}
	loi.push(...kiemTraCheo(duLieu, thoCua, hong));
	return { duLieu, loi };
}

/** Chữ thường, bỏ dấu, chỉ còn a–z và 0–9 (để so tên bài, tên tác giả). */
const khongDau = (s) =>
	String(s)
		.replace(/[đĐ]/g, 'd')
		.normalize('NFD')
		.replace(/\p{M}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]/g, '');

/**
 * Kiểm giữa các bộ dữ liệu: tham chiếu tới thứ có thật, thứ tự lĩnh vực đủ và không trùng, mỗi lĩnh vực có trang lĩnh
 * vực và bài lõi, mỗi nguồn một bản ghi, mỗi nguồn thuộc tối đa một hồ sơ nghiên cứu. Để một lỗi không kéo theo hàng
 * loạt lỗi giả (một bản ghi sai thì chỉ kéo theo lỗi tham chiếu thật tới nó, như trang trỏ tới lĩnh vực không còn):
 * - bộ hỏng ở mức file (trong `hong`) thì bỏ qua các phép kiểm cần nó;
 * - "có tồn tại không" và thứ tự, màu của lĩnh vực xét cả bản ghi sai schema (`tho`, bản ghi có id); thuộc tính dùng để
 *   kiểm chéo (như tầng của trang được trỏ tới) chỉ xét khi bản ghi đúng schema.
 */
function kiemTraCheo(d, tho, hong) {
	const loi = [];
	const co = (ten) => !hong.has(ten);
	const ids = (ten) => new Set((tho[ten] ?? []).filter((r) => ['string', 'number'].includes(typeof r.id)).map((r) => String(r.id)));
	const coLinhVuc = ids('linh-vuc');
	const coTrang = ids('trang');
	const coNguon = ids('nguon');
	const trang = new Map(d.trang.map((r) => [r.id, r]));
	/** Lỗi nếu trang `t` không có, hay có, đúng schema mà không phải trang lõi; bản ghi sai schema thì không xét tầng. */
	const phaiLaLoi = (t, goc, truong) => {
		if (!coTrang.has(t)) return `${goc}: ${truong} "${t}" không có trong trang.yml`;
		if (trang.has(t) && trang.get(t).tang !== 'loi') return `${goc}: ${truong} "${t}" không phải trang lõi (tang: loi)`;
		return null;
	};

	// linh-vuc: thứ tự đủ 1…n và không trùng; màu không trùng. Xét cả bản ghi sai schema (thứ tự, màu là số nguyên), để
	// một bản ghi sai kiểu không làm các bản ghi sau lệch thứ tự.
	if (co('linh-vuc')) {
		const lv = tho['linh-vuc'];
		const thuTu = lv.map((r) => r.thu_tu).filter(Number.isInteger);
		for (const so of new Set(thuTu)) if (thuTu.filter((x) => x === so).length > 1) loi.push(`linh-vuc.yml: thu_tu ${so} xuất hiện ${thuTu.filter((x) => x === so).length} lần`);
		// bản ghi có thu_tu không phải số nguyên đã báo ở schema; khi ấy không biết số nào thiếu
		if (thuTu.length === lv.length)
			for (let so = 1; so <= lv.length; so++) if (!thuTu.includes(so)) loi.push(`linh-vuc.yml: thiếu thu_tu ${so} (thứ tự đánh số liền từ 1 tới ${lv.length})`);
		const theoMau = new Map();
		for (const r of lv) {
			if (!Number.isInteger(r.mau)) continue;
			if (theoMau.has(r.mau)) loi.push(`linh-vuc.yml: "${r.id}" trùng màu ${r.mau} với "${theoMau.get(r.mau)}"`);
			theoMau.set(r.mau, r.id);
		}
	}

	// trang: lĩnh vực có thật; dua_tren trỏ tới bài lõi; mỗi lĩnh vực có trang lĩnh vực nen-tang/<id> và ít nhất một bài lõi
	for (const r of d.trang) {
		const goc = `trang.yml: bản ghi "${r.id}"`;
		if (co('linh-vuc') && r.linh_vuc && !coLinhVuc.has(r.linh_vuc)) loi.push(`${goc}: linh_vuc "${r.linh_vuc}" không có trong linh-vuc.yml`);
		for (const t of r.dua_tren ?? []) {
			const l = t === r.id ? `${goc}: dua_tren trỏ tới chính nó` : phaiLaLoi(t, goc, 'dua_tren');
			if (l) loi.push(l);
		}
	}
	if (co('trang') && co('linh-vuc')) {
		// id sai dạng đã báo ở schema; không kéo theo lỗi "thiếu trang lĩnh vực"
		for (const lv of [...coLinhVuc].filter((id) => ID.test(id))) {
			const nha = tho.trang.find((t) => t.id === `nen-tang/${lv}`);
			if (!nha || nha.tang !== 'khung' || nha.linh_vuc !== lv)
				loi.push(`trang.yml: lĩnh vực "${lv}" thiếu trang lĩnh vực nen-tang/${lv} (tang: khung, linh_vuc: ${lv})`);
			if (!tho.trang.some((t) => t.tang === 'loi' && t.linh_vuc === lv)) loi.push(`trang.yml: lĩnh vực "${lv}" không có bài lõi nào`);
		}
	}

	// nguon: mỗi nguồn một bản ghi. Cùng DOI, cùng URL, hay cùng (họ tác giả đầu, năm, 30 chữ đầu của tên) là cùng một
	// nguồn ghi hai lần (thường một lần có DOI, một lần không): gộp thành một bản ghi.
	const thay = new Map();
	for (const r of d.nguon) {
		const khoa = [];
		if (r.doi) khoa.push(['doi', r.doi.toLowerCase()]);
		if (r.url) khoa.push(['url', r.url.toLowerCase().replace(/\/$/, '')]);
		khoa.push(['tác giả, năm, tên', `${khongDau(r.tac_gia.split(',')[0])}:${/^\d{4}[a-z]?/.exec(String(r.nam))?.[0] ?? 'nd'}:${khongDau(r.ten).slice(0, 30)}`]);
		for (const [loaiKhoa, k] of khoa) {
			const kk = loaiKhoa + '|' + k;
			if (thay.has(kk))
				loi.push(`nguon.yml: "${r.id}" và "${thay.get(kk)}" cùng ${loaiKhoa}: là một nguồn, gộp thành một bản ghi (hai bài khác nhau cùng tác giả, cùng năm thì ghi năm 2006a, 2006b như APA)`);
			else thay.set(kk, r.id);
		}
	}

	// nghien-cuu: nguồn có thật, trang nhà là trang lõi, mỗi nguồn thuộc tối đa một hồ sơ (mỗi nghiên cứu một trang nhà)
	const cuaHoSo = new Map();
	for (const r of d['nghien-cuu']) {
		const goc = `nghien-cuu.yml: bản ghi "${r.id}"`;
		const l = co('trang') && phaiLaLoi(r.trang_nha, goc, 'trang_nha');
		if (l) loi.push(l);
		for (const n of r.nguon) {
			if (co('nguon') && !coNguon.has(n)) loi.push(`${goc}: nguồn "${n}" không có trong nguon.yml`);
			if (cuaHoSo.has(n)) loi.push(`${goc}: nguồn "${n}" đã thuộc hồ sơ "${cuaHoSo.get(n)}"`);
			cuaHoSo.set(n, r.id);
		}
	}

	// ngo-nhan: nguồn có thật, trang có thật
	for (const r of d['ngo-nhan']) {
		const goc = `ngo-nhan.yml: bản ghi "${r.id}"`;
		for (const n of r.nguon) if (co('nguon') && !coNguon.has(n)) loi.push(`${goc}: nguồn "${n}" không có trong nguon.yml`);
		if (co('trang') && r.trang && !coTrang.has(r.trang)) loi.push(`${goc}: trang "${r.trang}" không có trong trang.yml`);
	}
	return loi;
}

let daNap; // kiểm một lần cho mọi bộ trong cùng một lần build
function napTatCa(dir) {
	if (!daNap || daNap.dir !== dir) daNap = { dir, ...kiemTra(dir) };
	if (daNap.loi.length)
		throw new Error(`Dữ liệu trong ${path.relative(process.cwd(), dir) || '.'} sai (${daNap.loi.length} lỗi):\n- ${daNap.loi.join('\n- ')}`);
	return daNap.duLieu;
}

/** Phần mở rộng của file trang mà docsLoader của Starlight nạp. */
const DUOI_TRANG = /\.(md|mdx|markdown|mdown|mkdn|mkd|mdwn)$/;

/** Toàn bộ dữ liệu đã qua schema và kiểm chéo, cho thành phần và plugin; dữ liệu sai thì ném lỗi. */
export const duLieuDaKiem = () => napTatCa(thuMuc());

/**
 * Trang trong `docs` (src/content/docs/) chưa có bản ghi trong trang.yml. Bỏ qua trang 404 (trang của khung) và file
 * tên mở đầu bằng "_" (bản nháp: docsLoader của Starlight chỉ nạp file tên không mở đầu bằng "_"). Thư mục tên mở đầu bằng "_"
 * thì vẫn được nạp và đăng, nên trang trong đó vẫn phải có bản ghi.
 * @returns {string[]} đường dẫn trang (bỏ phần mở rộng)
 */
export function trangChuaDangKy(docs = path.join(GOC, 'src/content/docs'), dir = thuMuc()) {
	const coBanGhi = new Set(napTatCa(dir).trang.map((r) => r.id));
	return fs
		.readdirSync(docs, { recursive: true })
		.map((f) => String(f).replace(/\\/g, '/'))
		.filter((f) => DUOI_TRANG.test(f) && !path.posix.basename(f).startsWith('_'))
		.map((f) => f.replace(DUOI_TRANG, ''))
		.filter((t) => t !== '404' && !coBanGhi.has(t))
		.sort();
}

/** Bộ nạp (loader) Astro cho một bộ dữ liệu: dữ liệu sai thì ném lỗi, build hỏng. */
export function boNap(ten) {
	return {
		name: `psyche-du-lieu-${ten}`,
		load: async ({ store, parseData, watcher, logger }) => {
			const dir = thuMuc();
			const nap = async (lai) => {
				if (lai) daNap = undefined;
				const duLieu = napTatCa(dir);
				store.clear();
				for (const r of duLieu[ten]) {
					const id = String(r.id);
					store.set({ id, data: await parseData({ id, data: r }) });
				}
			};
			await nap(false);
			watcher?.add(path.join(dir, TEP[ten]));
			// Đang chạy npm run dev mà file dữ liệu hỏng: báo lỗi, giữ dữ liệu cũ đến khi file sửa xong
			watcher?.on('change', (f) => f === path.join(dir, TEP[ten]) && nap(true).catch((e) => logger.error(e.message)));
		},
	};
}
