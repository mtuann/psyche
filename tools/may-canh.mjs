#!/usr/bin/env node
// Máy canh hằng tuần (đợt 9; plans/ben-vung/README.md mục 4.7). Phỏng theo ../opus/tools/ra-lai.mjs (D8-L1 của opus):
// mỗi việc in danh sách, ghi nội dung issue, thoát 1 khi có việc; workflow .github/workflows/may-canh.yml giữ đúng một issue
// mở cho mỗi nhãn. Ba việc:
//
//   rut-bai   DOI bị rút, bày tỏ quan ngại, đính chính hay có bản mới: mọi DOI ở src/data/nguon.yml và ở link doi.org trong danh
//             sách nguồn của hồ sơ kiem-dinh/**/*.yml, hỏi Crossref (trường updated-by: thông báo của nhà xuất bản và dữ
//             liệu Retraction Watch mà Crossref phát hành mở). Có OPENALEX_API_KEY thì hỏi thêm cờ is_retracted của OpenAlex
//             (chỉ là tín hiệu). Issue nêu trang, bản ghi và nhận định dùng nguồn ấy. Thông báo đã xét (site đã nói rõ, hay
//             đính chính không chạm điều site dùng) ghi ở tools/may-canh-da-xet.yml thì không báo lại; nguồn có rut_bai ở
//             nguon.yml thì thông báo rút bài của nó coi như đã xét.
//   thoi-su   khẳng định thời sự (loai: thoi-su) có het_han tới hạn hay còn dưới 30 ngày, trong hồ sơ của mục đã khóa (trang,
//             bản ghi dữ liệu; khóa từng phần thì chỉ nhận định về trường đã khóa).
//   kiem-lai  trang có kiem_lai_truoc (src/data/trang.yml, năm-tháng: hạn là ngày 1 của tháng ấy) tới hạn hay còn dưới 30 ngày.
//
//   node tools/may-canh.mjs <rut-bai|thoi-su|kiem-lai|tat-ca> [--ngay 2027-06-01] [--truoc 30] [--ra issue.md]
//                           [--khong-mang] [--luu crossref.json] [--tu crossref.json]
//     --ngay        coi như hôm nay là ngày ấy (để thử); mặc định ngày UTC hiện tại
//     --truoc       báo trước bao nhiêu ngày (mặc định 30)
//     --ra          ghi nội dung issue (Markdown) vào file (chỉ khi chạy một việc)
//     --khong-mang  không gọi mạng: rut-bai chỉ đếm DOI và ánh xạ, coi như không có việc
//     --luu, --tu   lưu kết quả Crossref vào file JSON; đọc lại từ file thay vì gọi mạng (thử, xem lại)
//   Mã thoát: 0 không có việc; 1 có việc (mở hay cập nhật issue); 2 lỗi tham số, dữ liệu hay script; 3 (rut-bai) không có
//   phát hiện nhưng có DOI không hỏi được vì lỗi mạng: không mở, không đóng issue.
//
// Yêu cầu gửi ra ngoài chỉ mang User-Agent của dự án (AGENTS.md, mục Mạng), không email, không tham số mailto. Lỗi mạng
// không bao giờ thành "bị rút": DOI hỏi không được thì ghi riêng. Phần tính là hàm thuần, kiểm thử ở tests/may-canh.test.mjs
// (không gọi mạng: fetch giả).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse } from 'yaml';
import { tachKhoaBanGhi } from '../src/khoa.mjs';
import { ngayViet, thangViet } from '../src/kiem-dinh.mjs';

const GOC = fileURLToPath(new URL('../', import.meta.url));
export const SITE = 'https://mtuann.github.io/psyche/';
export const REPO = 'https://github.com/mtuann/psyche/blob/main/';
export const UA = 'psyche-kiem-dinh/1.0 (https://mtuann.github.io/psyche/)';
export const TEP_DA_XET = 'tools/may-canh-da-xet.yml';
/** Số DOI mỗi lần hỏi Crossref (filter=doi:…,doi:…). */
export const LO = 40;
/** Giới hạn độ dài nội dung issue của GitHub là 65536 ký tự; chừa chỗ. */
const DAI_TOI_DA = 60000;

// ---------------------------------------------------------------- ngày

/** Ngày UTC hiện tại, "2026-11-17" (như máy của GitHub). */
export const homNay = (d = new Date()) => d.toISOString().slice(0, 10);
/** Ngày `ngay` cộng `so` ngày ("2026-11-17", 30 -> "2026-12-17"). */
export const congNgay = (ngay, so) => new Date(Date.parse(`${ngay}T00:00:00Z`) + so * 86400000).toISOString().slice(0, 10);
/** Số ngày từ `a` tới `b` (âm khi b trước a). */
export const soNgay = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
/** Ngày có thật dạng năm-tháng-ngày: đi một vòng qua Date vẫn ra đúng chuỗi (loại 2026-02-31, 2027-1-5). */
export const laNgay = (s) => {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(String(s))) return false;
	const d = new Date(`${s}T00:00:00Z`);
	return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
};
const conLai = (so) => (so < 0 ? `quá hạn ${-so} ngày` : so === 0 ? 'tới hạn hôm nay' : `còn ${so} ngày`);

// ---------------------------------------------------------------- đọc repo

/** Địa chỉ trang trên site: "index" -> gốc, "thi-nghiem/index" -> ".../thi-nghiem/", "thi-nghiem/asch" -> ".../thi-nghiem/asch/". */
export const diaChi = (id) => SITE + (id === 'index' ? '' : id.replace(/(^|\/)index$/, '$1').replace(/\/?$/, '/'));

/** Mục của hồ sơ: { muc: "thi-nghiem/asch" | "du-lieu/nguon/x", trang?: id trang, banGhi?: "nguon/x" }, hay null. */
export function mucCuaHoSo(tep, hs) {
	if (hs?.ban_ghi) return { muc: `du-lieu/${hs.ban_ghi}`, banGhi: String(hs.ban_ghi) };
	const m = /^src\/content\/docs\/(.+)\.md$/.exec(String(hs?.trang ?? ''));
	if (m) return { muc: m[1], trang: m[1] };
	// hồ sơ thiếu trường trang: suy từ đường dẫn file (kiem-dinh/<trang>.yml)
	const id = tep.replace(/\\/g, '/').replace(/^kiem-dinh\//, '').replace(/\.yml$/, '');
	return id.startsWith('du-lieu/') ? { muc: id, banGhi: id.slice('du-lieu/'.length) } : { muc: id, trang: id };
}

/**
 * Trạng thái khóa của mục: { khoa: false } hay { khoa: true, truong: null (cả bản ghi) | [trường đã khóa] }.
 * @param {{ trang?: string, banGhi?: string }} m kết quả của mucCuaHoSo
 * @param {{ trang?: Record<string,string>, ban_ghi?: Record<string,string> }} khoa nội dung kiem-dinh/khoa.json
 */
export function trangThaiKhoa(m, khoa) {
	if (m.trang) return { khoa: !!khoa?.trang?.[m.trang], truong: null };
	let truong = [];
	for (const k of Object.keys(khoa?.ban_ghi ?? {})) {
		const t = tachKhoaBanGhi(k);
		if (t.banGhi !== m.banGhi) continue;
		if (!t.truong) return { khoa: true, truong: null };
		truong = [...new Set([...truong, ...t.truong])];
	}
	return truong.length ? { khoa: true, truong: truong.sort() } : { khoa: false, truong: null };
}

/** Nhận định thuộc phần đã khóa (khóa từng phần: nhận định không ghi truong thì luôn tính, như tools/khoa.mjs). */
const trongPhanKhoa = (n, tt) => !tt.truong || !Array.isArray(n.truong) || n.truong.some((t) => tt.truong.includes(t));

/** Đọc mọi thứ máy canh cần từ repo `goc`. */
export function docKho(goc = GOC) {
	const doc = (f, mac) => {
		const p = path.join(goc, f);
		return fs.existsSync(p) ? (parse(fs.readFileSync(p, 'utf8')) ?? mac) : mac;
	};
	const thuMuc = path.join(goc, 'kiem-dinh');
	const hoSo = fs.existsSync(thuMuc)
		? fs
				.readdirSync(thuMuc, { recursive: true })
				.map((f) => String(f).replace(/\\/g, '/'))
				.filter((f) => f.endsWith('.yml'))
				.sort()
				.map((f) => {
					const tep = `kiem-dinh/${f}`;
					return { tep, hs: parse(fs.readFileSync(path.join(goc, tep), 'utf8')) ?? {} };
				})
		: [];
	const khoaTep = path.join(thuMuc, 'khoa.json');
	return {
		nguon: doc('src/data/nguon.yml', []),
		trang: doc('src/data/trang.yml', []),
		ngoNhan: doc('src/data/ngo-nhan.yml', []),
		nghienCuu: doc('src/data/nghien-cuu.yml', []),
		khoa: fs.existsSync(khoaTep) ? JSON.parse(fs.readFileSync(khoaTep, 'utf8')) : { trang: {}, ban_ghi: {} },
		hoSo,
		daXet: doc(TEP_DA_XET, []),
	};
}

// ---------------------------------------------------------------- thời sự, kiểm lại

/**
 * Khẳng định thời sự tới hạn: nhận định loai thoi-su (không bị bỏ) trong hồ sơ của mục đã khóa, het_han từ hôm nay cộng
 * `truoc` ngày trở về trước. Nhận định có het_han thiếu hay không phải ngày có thật thì cũng đưa vào (sai: true, xếp
 * đầu), để không mất theo dõi. Còn lại hạn sớm nhất trước.
 * @returns {{ muc, tep, trang?, banGhi?, id, cau, het_han, con: number | null, sai?: true }[]}
 */
export function thoiSuToiHan(kho, ngay, truoc = 30) {
	const moc = congNgay(ngay, truoc);
	const ra = [];
	for (const { tep, hs } of kho.hoSo) {
		const m = mucCuaHoSo(tep, hs);
		const tt = trangThaiKhoa(m, kho.khoa);
		if (!tt.khoa) continue;
		for (const n of hs.nhan_dinh ?? []) {
			if (n?.loai !== 'thoi-su' || n.ket_qua === 'da-bo' || !trongPhanKhoa(n, tt)) continue;
			const han = String(n.het_han ?? '');
			if (!laNgay(han)) {
				ra.push({ ...m, tep, id: n.id, cau: String(n.cau ?? ''), het_han: han, con: null, sai: true });
				continue;
			}
			if (han > moc) continue;
			ra.push({ ...m, tep, id: n.id, cau: String(n.cau ?? ''), het_han: han, con: soNgay(ngay, han) });
		}
	}
	return ra.sort((a, b) => !!b.sai - !!a.sai || a.het_han.localeCompare(b.het_han) || a.muc.localeCompare(b.muc) || String(a.id).localeCompare(String(b.id)));
}

/**
 * Trang có kiem_lai_truoc tới hạn: hạn là ngày 1 của tháng ghi ("xem lại trước 11/2027"), báo từ `truoc` ngày trước hạn.
 * @returns {{ id, tang, kiem_lai_truoc, han, con: number, khoa: boolean }[]}
 */
export function kiemLaiToiHan(kho, ngay, truoc = 30) {
	const moc = congNgay(ngay, truoc);
	return (kho.trang ?? [])
		.filter((r) => /^\d{4}-\d{2}$/.test(String(r.kiem_lai_truoc ?? '')))
		.map((r) => {
			const han = `${r.kiem_lai_truoc}-01`;
			return { id: r.id, tang: r.tang, kiem_lai_truoc: String(r.kiem_lai_truoc), han, con: soNgay(ngay, han), khoa: !!kho.khoa?.trang?.[r.id] };
		})
		.filter((r) => r.han <= moc)
		.sort((a, b) => a.han.localeCompare(b.han) || a.id.localeCompare(b.id));
}

const catCau = (s, n = 220) => {
	const t = String(s).replace(/\s+/g, ' ').trim().replace(/\|/g, '\\|');
	return t.length > n ? `${t.slice(0, n - 1)}…` : t;
};
const tenMuc = (r) => (r.trang ? `[\`${r.trang}\`](${diaChi(r.trang)})` : `bản ghi \`${r.banGhi}\``);

/** Nội dung issue cho khẳng định thời sự tới hạn. */
export function issueThoiSu(ds, ngay, truoc = 30) {
	const han = (r) => (r.sai ? `**ngày hạn sai**: \`${catCau(r.het_han || '(trống)', 40)}\`` : `${ngayViet(r.het_han)} (${conLai(r.con)})`);
	const dong = ds.map((r) => `| ${tenMuc(r)} | \`${r.id}\` | ${catCau(r.cau)} | ${han(r)} | [hồ sơ](${REPO}${r.tep}) |`);
	const sai = ds.filter((r) => r.sai).length;
	return gioiHan([
		`Lần kiểm tra tự động ngày ${ngayViet(ngay)}: \`node tools/may-canh.mjs thoi-su\` thấy ${ds.length - sai} khẳng định thời sự (\`loai: thoi-su\`) trong hồ sơ của mục đã khóa có \`het_han\` đã tới hay còn dưới ${truoc} ngày.`,
		...(sai ? ['', `**Ngày hạn sai: ${sai} khẳng định** có \`het_han\` thiếu hay không phải ngày có thật (năm-tháng-ngày, như 2027-01-05): sửa \`het_han\` trong hồ sơ (không vào mã băm của trang), không thì máy canh không biết khi nào tới hạn.`] : []),
		'',
		'| Mục | Nhận định | Câu | Hạn | Hồ sơ |',
		'|---|---|---|---|---|',
		...dong,
		'',
		'Cách xử lý (`plans/ben-vung/them-noi-dung.md` mục 7; `chuan-kiem-dinh.md` mục 1, 8): kiểm lại từng câu trên nguồn hiện hành (số liệu mới nhất, tìm lại "chưa tìm thấy nghiên cứu ở Việt Nam", số liên hệ trên trang chính thức), rồi:',
		'',
		'- câu cần sửa: viết bổ sung có mốc mới (`src/content/bo-sung/`), hay mở khóa nếu câu nằm trong thân trang (`node tools/khoa.mjs mo <mục> --ly-do "khẳng định thời sự tới hạn (máy canh)"`, nhánh `mo/thoi-su-<yyyy-mm>`), sửa câu và mốc "Tính đến …", qua lượt 2, khóa lại. `tools/khoa.mjs khoa` từ chối khẳng định thời sự đã tới hạn, nên phải đặt `het_han` mới trước khi khóa;',
		'- câu vẫn đúng như đã viết (mốc "Tính đến …" vẫn đúng): ghi lần kiểm lại vào `ghi_chu` của nhận định và đặt `het_han` mới trong hồ sơ (hồ sơ không vào mã băm của trang);',
		'- trang Hỗ trợ: theo issue nhắc hằng quý (`ho-tro-quarterly.yml`).',
		'',
		'Issue tự đóng khi không còn khẳng định nào tới hạn.',
		'',
	]);
}

/** Nội dung issue cho trang tới hạn kiểm lại. */
export function issueKiemLai(ds, ngay, truoc = 30) {
	const dong = ds.map(
		(r) => `| [\`${r.id}\`](${diaChi(r.id)}) | ${r.tang ?? ''} | trước ${thangViet(r.kiem_lai_truoc)} (${conLai(r.con)}) | ${r.khoa ? 'đã khóa' : 'chưa khóa: đặt lại `kiem_lai_truoc` khi khóa'} |`,
	);
	return gioiHan([
		`Lần kiểm tra tự động ngày ${ngayViet(ngay)}: \`node tools/may-canh.mjs kiem-lai\` thấy ${ds.length} trang có hạn xem lại (\`kiem_lai_truoc\` trong \`src/data/trang.yml\`) đã tới hay còn dưới ${truoc} ngày.`,
		'',
		'| Trang | Tầng | Hạn xem lại | Trạng thái |',
		'|---|---|---|---|',
		...dong,
		'',
		'Cách xem lại (`plans/ben-vung/them-noi-dung.md` mục 3, 7; `chuan-kiem-dinh.md` mục 3): kiểm lại phần thời sự và nhãn; bằng chứng đã chín thì có thể nâng thành bài lõi. Mỗi lần xem lại là một lần kiểm định mới, trên nhánh `mo/kiem-lai-<trang>`:',
		'',
		'1. `node tools/khoa.mjs mo <trang> --ly-do "xem lại theo hạn (kiem_lai_truoc)"`;',
		'2. tìm bằng chứng mới (phân tích tổng hợp, tái lập, rút bài) cho các nhận định của trang, nhất là nhãn; sửa trang khi cần, điền lần mới trong `lan` của hồ sơ, qua lượt 2 theo tầng;',
		'3. đặt `kiem_lai_truoc` mới trong `src/data/trang.yml` (12–18 tháng sau ngày kiểm), rồi `node tools/khoa.mjs khoa <trang>`.',
		'',
		'Issue tự đóng khi không còn trang nào tới hạn.',
		'',
	]);
}

// ---------------------------------------------------------------- DOI

/** DOI viết chuẩn để so: bỏ tiền tố, giải mã %xx, chữ thường, bỏ dấu câu dính ở cuối. null nếu không phải DOI. */
export function chuanDoi(s) {
	if (s == null) return null;
	let d = String(s).trim();
	try {
			d = decodeURIComponent(d);
		} catch {
			/* giữ nguyên */
		}
		d = d.replace(/^(https?:\/\/)?(dx\.)?doi\.org\//i, '').replace(/^doi:\s*/i, '').replace(/[.,;\]>]+$/, '');
		// ngoặc đóng ở cuối chỉ bỏ khi thừa (DOI có thể chứa ngoặc: 10.1016/S0140-6736(20)…)
		while (d.endsWith(')') && (d.match(/\(/g) ?? []).length < (d.match(/\)/g) ?? []).length) d = d.slice(0, -1).replace(/[.,;\]>]+$/, '');
		return /^10\.\d{4,9}\/\S+$/.test(d) ? d.toLowerCase() : null;
	}

	/** DOI trong một link doi.org (https://doi.org/…, http://dx.doi.org/…); link khác thì null. */
	export const doiTuLink = (link) => {
		const m = /^https?:\/\/(dx\.)?doi\.org\/(.+)$/i.exec(String(link ?? '').trim());
		return m ? chuanDoi(m[2]) : null;
	};

	/**
	 * Bảng DOI -> nơi dùng: { doi, nguon: [bản ghi nguon.yml], dung: [{ muc, trang?, banGhi?, tep, khoa, nguonId, nhanDinh: [{ id, cau }] }],
	 * ngoNhan: [id thẻ], nghienCuu: [id hồ sơ nghiên cứu] }. Hồ sơ nối với DOI qua link doi.org trong danh sách nguon; nguồn của
	 * hồ sơ không có link DOI mà trùng id với bản ghi có DOI ở nguon.yml thì cũng nối (cùng quy ước id).
	 */
	export function bangDoi(kho) {
		const bang = new Map();
		const lay = (doi) => {
			if (!bang.has(doi)) bang.set(doi, { doi, nguon: [], dung: [], ngoNhan: [], nghienCuu: [] });
			return bang.get(doi);
		};
		const doiCuaId = new Map();
		for (const r of kho.nguon ?? []) {
			const d = chuanDoi(r.doi);
			if (!d) continue;
			lay(d).nguon.push(r);
			doiCuaId.set(r.id, d);
		}
		for (const { tep, hs } of kho.hoSo) {
			const m = mucCuaHoSo(tep, hs);
			// hồ sơ của chính bản ghi nguồn (link tới api.crossref.org) không phải nơi dùng
			if (m.banGhi?.startsWith('nguon/')) continue;
			const tt = trangThaiKhoa(m, kho.khoa);
			for (const ng of hs.nguon ?? []) {
				const link = String(ng?.link ?? '');
				const d = doiTuLink(link) ?? (/doi\.org/i.test(link) ? null : doiCuaId.get(ng?.id));
				if (!d) continue;
				const muc = lay(d);
				if (muc.dung.some((u) => u.tep === tep && u.nguonId === ng.id)) continue;
				const nhanDinh = (hs.nhan_dinh ?? []).filter((n) => (n?.nguon ?? []).includes(ng.id) && n.ket_qua !== 'da-bo').map((n) => ({ id: n.id, cau: String(n.cau ?? '') }));
				muc.dung.push({ ...m, tep, khoa: tt.khoa, nguonId: ng.id, nhanDinh });
			}
		}
		for (const t of kho.ngoNhan ?? []) for (const id of t.nguon ?? []) if (doiCuaId.has(id)) lay(doiCuaId.get(id)).ngoNhan.push(t.id);
		for (const h of kho.nghienCuu ?? []) for (const id of h.nguon ?? []) if (doiCuaId.has(id)) lay(doiCuaId.get(id)).nghienCuu.push(h.id);
		return bang;
	}

	/** Loại thông báo của Crossref (update-type) -> nhóm của máy canh: rút, quan ngại, đính chính, bản mới (như bản cập nhật của tổng quan Cochrane). */
	export function nhomCapNhat(type) {
		const t = String(type ?? '').toLowerCase().replace(/-/g, '_');
		if (['retraction', 'partial_retraction', 'withdrawal', 'removal'].includes(t)) return 'rut';
		if (t === 'expression_of_concern') return 'quan-ngai';
		if (['new_version', 'new_edition'].includes(t)) return 'ban-moi';
		return 'dinh-chinh'; // correction, erratum, corrigendum, addendum, clarification và loại khác
	}
	export const TEN_NHOM = { rut: 'Bị rút (toàn bộ hay một phần)', 'quan-ngai': 'Bày tỏ quan ngại (expression of concern)', 'dinh-chinh': 'Đính chính', 'ban-moi': 'Có bản mới' };
	const THU_TU = ['rut', 'quan-ngai', 'dinh-chinh', 'ban-moi'];

	const ngayCapNhat = (u) => {
		const p = u?.updated?.['date-parts']?.[0];
		return p?.length ? [p[0], String(p[1] ?? 1).padStart(2, '0'), String(p[2] ?? 1).padStart(2, '0')].join('-') : null;
	};

	/** Kiểm file đã xét: danh sách { doi, thong_bao, ngay, ket_luan }; trả về danh sách lỗi. */
	export function loiDaXet(ds) {
		if (!Array.isArray(ds)) return [`${TEP_DA_XET}: phải là danh sách`];
		const loi = [];
		ds.forEach((r, i) => {
			const ten = `${TEP_DA_XET}, mục ${i + 1}`;
			for (const k of ['doi', 'thong_bao']) if (!chuanDoi(r?.[k])) loi.push(`${ten}: ${k} phải là DOI (10.xxxx/…)`);
			if (!laNgay(String(r?.ngay ?? ''))) loi.push(`${ten}: ngay phải dạng năm-tháng-ngày`);
			if (typeof r?.ket_luan !== 'string' || !r.ket_luan.trim()) loi.push(`${ten}: thiếu ket_luan (đã xét gì, site xử lý ra sao)`);
			for (const k of Object.keys(r ?? {})) if (!['doi', 'thong_bao', 'ngay', 'ket_luan'].includes(k)) loi.push(`${ten}: trường lạ ${k}`);
		});
		return loi;
	}

	/**
	 * Phát hiện từ kết quả Crossref: mỗi thông báo (rút, quan ngại, đính chính) chưa xét của một DOI site dùng.
	 * @param {Map} bang kết quả của bangDoi
	 * @param {Map<string, object[]>} capNhat DOI -> updated-by của Crossref (chỉ DOI hỏi được)
	 * @param {{ doi, thong_bao }[]} daXet
	 * @param {Set<string>} openAlex DOI mà OpenAlex gắn is_retracted (tín hiệu)
	 * @returns {{ doi, nhom, thong_bao: { doi, loai, nhan, ngay, nguon }[], muc }[]} xếp theo nhóm (rút trước) rồi DOI
	 */
	export function phatHien(bang, capNhat, daXet = [], openAlex = new Set()) {
		const xet = new Set(daXet.map((r) => `${chuanDoi(r.doi)} ${chuanDoi(r.thong_bao)}`));
		const ra = [];
		for (const [doi, muc] of bang) {
			const ds = (capNhat.get(doi) ?? [])
				.map((u) => ({ doi: chuanDoi(u?.DOI), loai: String(u?.type ?? ''), nhan: u?.label ?? u?.type, ngay: ngayCapNhat(u), nguon: u?.source ?? null, nhom: nhomCapNhat(u?.type) }))
				.filter((u) => u.doi && u.doi !== doi)
				// nguồn đã ghi rut_bai ở nguon.yml: site đã biết bài bị rút
				.filter((u) => !(u.nhom === 'rut' && muc.nguon.some((r) => r.rut_bai)))
				.filter((u) => !xet.has(`${doi} ${u.doi}`));
			// cùng một thông báo có thể có hai bản ghi (nhà xuất bản và Retraction Watch): gộp theo DOI thông báo
			const theoDoi = new Map();
			for (const u of ds) {
				const cu = theoDoi.get(u.doi);
				theoDoi.set(u.doi, cu ? { ...cu, nguon: [...new Set([cu.nguon, u.nguon].flat().filter(Boolean))] } : { ...u, nguon: [u.nguon].filter(Boolean) });
			}
			const tb = [...theoDoi.values()];
			if (tb.length) ra.push({ doi, nhom: THU_TU.find((n) => tb.some((u) => u.nhom === n)), thong_bao: tb, muc });
			else if (openAlex.has(doi) && !muc.nguon.some((r) => r.rut_bai)) ra.push({ doi, nhom: 'rut', thong_bao: [], openAlex: true, muc });
		}
		return ra.sort((a, b) => THU_TU.indexOf(a.nhom) - THU_TU.indexOf(b.nhom) || a.doi.localeCompare(b.doi));
	}

	const trichNguon = (r) => [r.tac_gia, r.nam ? `(${r.nam})` : '', r.ten ? `*${r.ten}*` : '', r.noi_dang ?? ''].filter(Boolean).join(' ').replace(/\s+/g, ' ');

	/** Phần Markdown cho một phát hiện; `gon`: bỏ chữ của nhận định (khi issue quá dài). */
	function khoiPhatHien(p, gon = false) {
		const d = [];
		const ten = p.muc.nguon.length ? p.muc.nguon.map((r) => `\`${r.id}\` ${trichNguon(r)}`).join('; ') : '(không có bản ghi ở nguon.yml, chỉ có ở hồ sơ)';
		d.push(`### [${p.doi}](https://doi.org/${p.doi})`, '', `Nguồn: ${ten}`, '');
		if (p.openAlex) d.push('- OpenAlex gắn `is_retracted` mà Crossref không có thông báo rút: chỉ là tín hiệu (OpenAlex từng gắn nhầm bài chỉ có đính chính), cần xem tay trên trang nhà xuất bản.');
		for (const u of p.thong_bao)
			d.push(`- ${u.nhan ?? u.loai}${u.ngay ? ` (${ngayViet(u.ngay)})` : ''}: [${u.doi}](https://doi.org/${u.doi})${u.nguon.length ? `, theo ${u.nguon.join(', ')}` : ''}`);
		d.push('');
		const noi = [];
		for (const u of p.muc.dung) {
			const dau = `- ${u.trang ? `trang [\`${u.trang}\`](${diaChi(u.trang)})` : `bản ghi \`${u.banGhi}\``}${u.khoa ? ' (đã khóa)' : ' (chưa khóa)'}, nguồn \`${u.nguonId}\` trong [hồ sơ](${REPO}${u.tep})`;
			if (!u.nhanDinh.length) noi.push(`${dau}: không nhận định nào nêu nguồn này`);
			else if (gon) noi.push(`${dau}: nhận định ${u.nhanDinh.map((n) => `\`${n.id}\``).join(', ')}`);
			else {
				noi.push(`${dau}:`);
				for (const n of u.nhanDinh.slice(0, 8)) noi.push(`  - \`${n.id}\`: ${catCau(n.cau, 200)}`);
				if (u.nhanDinh.length > 8) noi.push(`  - và ${u.nhanDinh.length - 8} nhận định khác`);
			}
		}
		for (const id of p.muc.ngoNhan) noi.push(`- thẻ ngộ nhận \`${id}\` (\`src/data/ngo-nhan.yml\`)`);
		for (const id of p.muc.nghienCuu) noi.push(`- hồ sơ nghiên cứu \`${id}\` (\`src/data/nghien-cuu.yml\`)`);
		if (!noi.length) noi.push('- chỉ có bản ghi ở `src/data/nguon.yml`, chưa trang hay hồ sơ nào dẫn');
		d.push('Dùng ở:', '', ...noi, '');
		return d.join('\n');
	}

	/**
	 * Nội dung issue cho DOI bị rút, quan ngại, đính chính.
	 * @param {{ soDoi: number, khongCo: string[], loi: string[], openAlex: string }} thongTin
	 */
	export function issueRutBai(ds, ngay, thongTin) {
		const dem = THU_TU.map((n) => [n, ds.filter((p) => p.nhom === n).length]).filter(([, so]) => so);
		const dau = [
			`Lần kiểm tra tự động ngày ${ngayViet(ngay)}: \`node tools/may-canh.mjs rut-bai\` hỏi Crossref ${thongTin.soDoi} DOI (\`src/data/nguon.yml\` và link doi.org trong hồ sơ \`kiem-dinh/\`), thấy ${ds.length} DOI có thông báo chưa xét: ${dem.map(([n, so]) => `${TEN_NHOM[n].toLowerCase()} ${so}`).join(', ')}.`,
			'',
			`Crossref gộp thông báo của nhà xuất bản và dữ liệu Retraction Watch (nguồn \`retraction-watch\`). OpenAlex: ${thongTin.openAlex}.`,
		];
		if (thongTin.loi.length) dau.push('', `**${thongTin.loi.length} DOI không hỏi được vì lỗi mạng** (lần sau hỏi lại; không tính là bị rút): ${thongTin.loi.slice(0, 30).join(', ')}${thongTin.loi.length > 30 ? '…' : ''}`);
		const cuoi = [
			'## Cách xử lý',
			'',
			'Với mỗi DOI: mở thông báo, đọc nó sửa hay rút điều gì, đối chiếu với đúng các nhận định ở trên, không quét lại cả trang (`plans/ben-vung/them-noi-dung.md` mục 7; `chuan-kiem-dinh.md` mục 8):',
			'',
			'- không chạm điều site dùng (đính chính lỗi in, tác giả, tài trợ, bảng site không dẫn): ghi vào `ghi_chu` của nhận định trong hồ sơ;',
			'- chạm nhẹ (một con số, một chi tiết): viết bổ sung (`src/content/bo-sung/`, `loai: dinh-chinh`), hay mở khóa nếu câu sai nằm trong thân trang (`node tools/khoa.mjs mo <trang> --ly-do "nguồn bị rút hay đính chính: <doi>"`);',
			'- **có bản mới** (như tổng quan Cochrane được cập nhật): xem bản mới có đổi kết luận site dùng không; đổi thì làm như đính chính, không thì ghi vào hồ sơ;',
			'- chạm nhãn hay kết luận, hay bài bị rút: tái lập mốc (mở khóa, bỏ hay viết lại nhận định, xem lại nhãn); bài bị rút thì ghi `rut_bai: { ngay, nguon }` cho bản ghi ở `src/data/nguon.yml`. Trang cố ý kể bài bị rút (ví dụ để nói về gian lận) thì nói rõ điều ấy trong trang;',
			`- Xét xong mỗi thông báo (dù có sửa trang hay không), thêm một mục vào \`${TEP_DA_XET}\` (\`doi\`, \`thong_bao\`, \`ngay\`, \`ket_luan\`) để máy canh không báo lại.`,
			'',
			'Issue tự cập nhật mỗi tuần và tự đóng khi không còn thông báo nào chưa xét.',
			'',
		];
		if (thongTin.khongCo.length) cuoi.splice(-2, 0, `${thongTin.khongCo.length} DOI không có ở Crossref (DOI của DataCite, OSF, Zenodo, hay DOI sai): máy canh không xét được, ví dụ ${thongTin.khongCo.slice(0, 10).join(', ')}.`, '');
		let than = ds.map((p) => khoiPhatHien(p));
		const tong = (t) => [...dau, '', ...t, ...cuoi].join('\n').length;
		// quá dài thì bỏ chữ của nhận định ở phần đính chính, rồi ở mọi phần, rồi cắt bớt
		if (tong(than) > DAI_TOI_DA) than = ds.map((p) => khoiPhatHien(p, p.nhom === 'dinh-chinh' || p.nhom === 'ban-moi'));
		if (tong(than) > DAI_TOI_DA) than = ds.map((p) => khoiPhatHien(p, true));
		let bo = 0;
		while (tong(than) > DAI_TOI_DA && than.length > 1) {
			than.pop();
			bo++;
		}
		if (bo) than.push(`… và ${bo} DOI nữa (issue quá dài): chạy \`node tools/may-canh.mjs rut-bai\` để xem đủ.\n`);
		return [...dau, '', ...than, ...cuoi].join('\n');
	}

	const gioiHan = (dong) => {
		const s = dong.join('\n');
		return s.length > DAI_TOI_DA ? `${s.slice(0, DAI_TOI_DA)}\n\n… (cắt bớt: chạy script để xem đủ)\n` : s;
	};

	// ---------------------------------------------------------------- mạng

	const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

	/**
	 * GET JSON có thử lại: lỗi mạng, 429, 5xx thì thử lại (theo Retry-After nếu có, không thì 2, 4, 8 giây). Trả về
	 * { ok: true, json } | { ok: false, status, loi }. 4xx khác (trừ 429) không thử lại.
	 */
	export async function layJson(url, { fetch = globalThis.fetch, cho = nghi, lan = 4, headers = {} } = {}) {
		let loi = null;
		for (let i = 0; i < lan; i++) {
			if (i) await cho(loi?.doi ?? 2000 * 2 ** (i - 1));
			try {
				const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json', ...headers }, signal: AbortSignal.timeout(60000) });
				if (r.ok) return { ok: true, json: await r.json() };
				const thuLai = r.status === 429 || r.status >= 500;
				const sau = Number(r.headers?.get?.('retry-after'));
				loi = { status: r.status, loi: `HTTP ${r.status}`, doi: Number.isFinite(sau) && sau > 0 ? Math.min(sau, 120) * 1000 : undefined };
				if (!thuLai) return { ok: false, ...loi };
			} catch (e) {
				loi = { status: 0, loi: String(e?.message ?? e) };
			}
		}
		return { ok: false, ...loi };
	}

	/**
	 * Hỏi Crossref trường updated-by của các DOI, mỗi lần LO DOI (filter=doi:…), nghỉ `nhip` ms giữa hai lần. Lô bị 400 (một
	 * DOI lạ làm hỏng bộ lọc) thì hỏi từng DOI qua /works/<doi>.
	 * @returns {Promise<{ capNhat: Map<string, object[]>, khongCo: string[], loi: string[] }>} capNhat: DOI hỏi được (kể cả
	 *   không có thông báo: mảng rỗng); khongCo: Crossref không có DOI ấy; loi: không hỏi được (lỗi mạng)
	 */
	export async function hoiCrossref(dois, { fetch = globalThis.fetch, cho = nghi, nhip = 1000, ghi = () => {} } = {}) {
		const capNhat = new Map();
		const khongCo = [];
		const loi = [];
		const lanDau = { v: true };
		const doiLuot = async () => {
			if (!lanDau.v) await cho(nhip);
			lanDau.v = false;
		};
		for (let i = 0; i < dois.length; i += LO) {
			const lo = dois.slice(i, i + LO);
			await doiLuot();
			const loc = lo.map((d) => `doi:${d}`).join(',');
			const url = `https://api.crossref.org/works?filter=${encodeURIComponent(loc)}&select=DOI,updated-by&rows=${LO * 2}`;
			const r = await layJson(url, { fetch, cho });
			ghi(`Crossref ${i + 1}–${i + lo.length}/${dois.length}: ${r.ok ? 'xong' : r.loi}`);
			if (r.ok) {
				const thay = new Map((r.json?.message?.items ?? []).map((it) => [chuanDoi(it.DOI), it['updated-by'] ?? []]));
				for (const d of lo) if (thay.has(d)) capNhat.set(d, thay.get(d));
				// không có trong kết quả lô: hỏi riêng để phân biệt "không có ở Crossref" với DOI viết khác (chữ hoa, ký tự lạ)
				for (const d of lo.filter((x) => !thay.has(x))) await hoiMot(d);
			} else if (r.status >= 400 && r.status < 500 && r.status !== 429) for (const d of lo) await hoiMot(d);
			else loi.push(...lo);
		}
		async function hoiMot(d) {
			await doiLuot();
			const r = await layJson(`https://api.crossref.org/works/${encodeURIComponent(d)}`, { fetch, cho });
			if (r.ok) capNhat.set(d, r.json?.message?.['updated-by'] ?? []);
			else if (r.status === 404) khongCo.push(d);
			else loi.push(d);
		}
		return { capNhat, khongCo, loi };
	}

	/** Cờ is_retracted của OpenAlex (cần khóa API: OpenAlex không còn cho dùng miễn phí không khóa). Lỗi thì trả null. */
	export async function hoiOpenAlex(dois, khoaApi, { fetch = globalThis.fetch, cho = nghi, nhip = 1000 } = {}) {
		const rut = new Set();
		for (let i = 0; i < dois.length; i += 50) {
			if (i) await cho(nhip);
			const lo = dois.slice(i, i + 50);
			const url = `https://api.openalex.org/works?filter=${encodeURIComponent(`doi:${lo.join('|')}`)}&select=doi,is_retracted&per-page=50&api_key=${encodeURIComponent(khoaApi)}`;
			const r = await layJson(url, { fetch, cho });
			if (!r.ok) return null;
			for (const w of r.json?.results ?? []) if (w.is_retracted) rut.add(chuanDoi(w.doi));
		}
		return rut;
	}

	// ---------------------------------------------------------------- chạy

	const chay = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;
	if (chay) {
		// script sập (hồ sơ YAML hỏng, khoa.json hỏng, lỗi chưa bắt) thì thoát 2, không bao giờ 1 ("có việc"): workflow báo hỏng
		const sap = (e) => {
			console.error(`tools/may-canh.mjs sập: ${e?.stack ?? e}`);
			process.exit(2);
		};
		process.on('unhandledRejection', sap);
		process.on('uncaughtException', sap);
		try {
		const thamSo = process.argv.slice(2);
		const lay = (ten) => {
			const i = thamSo.indexOf(ten);
			return i >= 0 ? thamSo[i + 1] : undefined;
		};
		const viec = thamSo[0];
		const VIEC = ['rut-bai', 'thoi-su', 'kiem-lai', 'tat-ca'];
		const ngay = lay('--ngay') ?? homNay();
		const truoc = Number(lay('--truoc') ?? 30);
		const thoat = (ma, ...loi) => {
			for (const l of loi) console.error(l);
			process.exit(ma);
		};
		if (!VIEC.includes(viec)) thoat(2, `việc phải là ${VIEC.join(', ')} (nhận: ${viec ?? 'không có'})`);
		if (!laNgay(ngay)) thoat(2, `--ngay phải dạng năm-tháng-ngày, ví dụ 2027-06-01 (nhận: ${ngay})`);
		if (!Number.isInteger(truoc) || truoc < 0) thoat(2, `--truoc phải là số ngày (nhận: ${lay('--truoc')})`);
		const ra = lay('--ra');
		if (ra && viec === 'tat-ca') thoat(2, '--ra chỉ dùng với một việc');
		// PSYCHE_MAY_CANH_GOC: đọc dữ liệu từ bản chép khác của repo (kiểm thử)
		const kho = docKho(process.env.PSYCHE_MAY_CANH_GOC || GOC);
		const loiXet = loiDaXet(kho.daXet);
		if (loiXet.length) thoat(2, ...loiXet);

		const ma = [];
		if (viec === 'thoi-su' || viec === 'tat-ca') {
			const ds = thoiSuToiHan(kho, ngay, truoc);
			console.log(`Thời sự: ${ds.length} khẳng định của mục đã khóa tới hạn hay còn dưới ${truoc} ngày (tính từ ${ngayViet(ngay)}).`);
			for (const r of ds) console.log(`  ${r.muc} ${r.id}: het_han ${r.het_han || '(trống)'} (${r.sai ? 'ngày hạn sai' : conLai(r.con)})`);
			if (ra) fs.writeFileSync(ra, issueThoiSu(ds, ngay, truoc));
			ma.push(ds.length ? 1 : 0);
		}
		if (viec === 'kiem-lai' || viec === 'tat-ca') {
			const ds = kiemLaiToiHan(kho, ngay, truoc);
			console.log(`Kiểm lại: ${ds.length} trang có kiem_lai_truoc tới hạn hay còn dưới ${truoc} ngày.`);
			for (const r of ds) console.log(`  ${r.id}: trước ${thangViet(r.kiem_lai_truoc)} (${conLai(r.con)})${r.khoa ? '' : ', chưa khóa'}`);
			if (ra) fs.writeFileSync(ra, issueKiemLai(ds, ngay, truoc));
			ma.push(ds.length ? 1 : 0);
		}
		if (viec === 'rut-bai' || viec === 'tat-ca') {
			const bang = bangDoi(kho);
			const dois = [...bang.keys()].sort();
			const dung = [...bang.values()].filter((m) => m.dung.length || m.ngoNhan.length || m.nghienCuu.length).length;
			console.log(`Rút bài: ${dois.length} DOI (${dung} có trang, hồ sơ hay thẻ dẫn).`);
			const tu = lay('--tu');
			if (thamSo.includes('--khong-mang') && !tu) {
				console.log('  --khong-mang: không hỏi Crossref.');
				ma.push(0);
			} else {
				const kq = tu
					? (() => {
							const j = JSON.parse(fs.readFileSync(tu, 'utf8'));
							return { capNhat: new Map(Object.entries(j.capNhat)), khongCo: j.khongCo ?? [], loi: j.loi ?? [] };
						})()
					: await hoiCrossref(dois, { ghi: (s) => console.log(`  ${s}`) });
				if (lay('--luu')) fs.writeFileSync(lay('--luu'), JSON.stringify({ ngay, capNhat: Object.fromEntries(kq.capNhat), khongCo: kq.khongCo, loi: kq.loi }, null, 1));
				let oa = 'không hỏi (chưa có OPENALEX_API_KEY)';
				let rutOa = new Set();
				if (process.env.OPENALEX_API_KEY && !tu) {
					const r = await hoiOpenAlex(dois, process.env.OPENALEX_API_KEY);
					oa = r ? `đã hỏi cờ is_retracted, ${r.size} DOI có cờ` : 'hỏi không được (lỗi mạng hay hết lượt), bỏ qua lần này';
					rutOa = r ?? new Set();
				}
				const ds = phatHien(bang, kq.capNhat, kho.daXet, rutOa);
				console.log(`  hỏi được ${kq.capNhat.size}, không có ở Crossref ${kq.khongCo.length}, lỗi mạng ${kq.loi.length}; OpenAlex: ${oa}.`);
				for (const p of ds) console.log(`  ${TEN_NHOM[p.nhom]}: ${p.doi} ${p.thong_bao.map((u) => `${u.loai} ${u.doi}`).join('; ')}${p.openAlex ? ' (cờ OpenAlex)' : ''}`);
				if (ra) fs.writeFileSync(ra, issueRutBai(ds, ngay, { soDoi: dois.length, khongCo: kq.khongCo, loi: kq.loi, openAlex: oa }));
				// lỗi mạng mà không có phát hiện: không biết chắc, nên không đóng issue (mã 3)
				ma.push(ds.length ? 1 : kq.loi.length ? 3 : 0);
			}
		}
		process.exit(viec === 'tat-ca' ? Math.max(...ma.map((x) => (x === 3 ? 1 : x))) : ma[0]);
	} catch (e) {
		sap(e);
	}
}
