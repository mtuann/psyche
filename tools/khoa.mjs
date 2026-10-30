#!/usr/bin/env node
// Khóa trang và bản ghi đã kiểm định (D1.6; plans/ben-vung/chuan-kiem-dinh.md mục 3, 6–8). Chép từ ../opus/tools/khoa.mjs
// rồi sửa cho Psyche: loại nhận định và kết quả của chuẩn kiểm định, mức lượt 2 theo tầng, trang Sức khỏe tâm thần cần
// chữ ký chuyên gia, bài mở rộng cần dua_tren và hạn xem lại, trang đã khóa không còn ô "chưa chuyển".
//   node tools/khoa.mjs mau <mục>…                    tạo hồ sơ mẫu kiem-dinh/<mục>.yml; bản ghi đang khóa từng phần thì
//                                                     thêm một lần kiểm định mới (để điền) vào lan, để khóa thêm trường hay
//                                                     khóa cả bản ghi. Mục đang khóa thì từ chối: muốn sửa thì mo
//   node tools/khoa.mjs khoa <mục>…                   kiểm hồ sơ đủ; ghi mã băm vào kiem-dinh/khoa.json và vào lần cuối
//                                                     trong lan của hồ sơ (lần đó phải chưa có mã băm). Mục đang khóa thì
//                                                     từ chối; khóa từng phần cũ của bản ghi phải còn khớp
//   node tools/khoa.mjs mo <mục> --ly-do "…"          gỡ khóa; ghi lý do và thêm một lần mới (để điền) vào lan của hồ sơ
//   node tools/khoa.mjs tinh [<mục>…]                 in mã băm; không có mục thì kiểm mọi mục đã khóa (lệch thì thoát 1)
//   node tools/khoa.mjs xuat <lô hay trang>… [--mau <n> | --con-lai] [--ra <file>]
//       danh sách nhận định cho lượt 2 (không nguồn, không kết quả; bỏ câu về chính site; bài mở rộng chỉ 8 nhận định
//       ngẫu nhiên mỗi trang, cộng mọi nhận định loại nhan và lam-sang); --con-lai: chỉ phần còn thiếu sau khi
//       đã nhập kết quả (mẫu chưa đủ, hay mẫu có câu sai nên phải kiểm mọi câu còn lại);
//       --mau n: n nhận định chọn ngẫu nhiên, kèm nguồn,
//       cho chủ repo kiểm mẫu. Lô ("D3-L2", trang lấy từ plans/lam-lai/anh-xa.md) thì mặc định ghi vào
//       plans/lam-lai/bao-cao/d3-l2-nhan-dinh.yml (với --mau: d3-l2-kiem-mau.yml); trang thì in ra màn hình
//   node tools/khoa.mjs nhap <file kết quả lượt 2>
//       đưa kết quả lượt 2 (danh sách { trang, id, luot_2: dung|sai|qua-manh|khong-chac, nguon: [link], cau_dung?, ghi_chu? },
//       plans/lam-lai/loi-giao/luot-2-trang.md) vào hồ sơ: luot_2 của từng nhận định, kèm luot_2_nguon, luot_2_ghi_chu. Kiểm hết trước,
//       một dòng sai thì không ghi gì. In các nhận định cần review (hai lượt khác nhau, lượt 1 đã sửa, bỏ hay chưa có kết quả)
//       và số nhận định còn thiếu lượt 2 trong các hồ sơ ấy
// <mục>: đường dẫn trang ("thi-nghiem/asch", "thi-nghiem/index", "index", "404") hay bản ghi "du-lieu/<bộ>/<id>"
// ("du-lieu/nguon/asch1956"). Khóa từng phần bản ghi: "du-lieu/<bộ>/<id>#<trường>,<trường>" (chỉ các trường đã kiểm
// định, chuan-kiem-dinh.md mục 7); khóa cả bản ghi thì thay các khóa từng phần của nó. Hồ sơ vẫn là một file cho mỗi
// bản ghi. --goc <thư mục>: chạy trên bản chép của repo (kiểm thử).
import { execFileSync } from 'node:child_process';
import { randomInt } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { parse, parseDocument, stringify } from 'yaml';
import { NHAN, loaiTrang, schema } from '../src/du-lieu.mjs';
import { GOC, chuanKhoaBanGhi, docBanGhi, docKhoa, fileTrang, maBamKhoaBanGhi, maBamTrangFile, tachKhoaBanGhi } from '../src/khoa.mjs';
import { CONG_CU, THU_MUC_HINH } from '../src/plugins/thanh-phan.mjs';

/** Kết quả lượt 1 của một nhận định (chuan-kiem-dinh.md mục 6). */
const KET_QUA = ['dung', 'da-sua', 'da-lam-mem', 'da-bo'];
/** Kết quả lượt 2 (chuan-kiem-dinh.md mục 3; loi-giao/luot-2-trang.md): qua-manh là câu nói mạnh hơn bằng chứng. */
const LUOT_2 = ['dung', 'sai', 'qua-manh', 'khong-chac'];
/** Kết quả lượt 2 bác câu của lượt 1: cần cau_dung; mẫu có câu như vậy thì lượt 2 kiểm hết. */
const BAC = ['sai', 'qua-manh'];
/** Loại nhận định (chuan-kiem-dinh.md mục 1). */
export const LOAI = ['phat-hien', 'so-lieu', 'lich-su', 'dinh-nghia', 'nhan', 'tai-lap', 'lam-sang', 'loi-khuyen', 'cong-cu', 'thoi-su', 've-site'];
/** Bài mở rộng: lượt 2 kiểm mẫu chừng này nhận định mỗi trang, cộng mọi nhận định loại LUON_KIEM (chuan-kiem-dinh.md mục 3). */
export const MAU_MO_RONG = 8;
const LUON_KIEM = ['nhan', 'lam-sang'];
/** Câu nói về chính site (loai ve-site): review kiểm trên trang và dữ liệu, không qua lượt 2. */
const VE_SITE = 've-site';
/** Trường của bản ghi dữ liệu được ghi là câu về chính site: cấu trúc của site, không phải điều về tâm lý học. */
const VE_SITE_BO = { trang: null, 'linh-vuc': ['ten', 'thu_tu', 'mau', 'bieu_tuong'], 'nghien-cuu': ['trang_nha'] };
const VE_SITE_DU_LIEU = 'bộ trang; tên, thứ tự, màu, biểu tượng của lĩnh vực; trang nhà của nghiên cứu';
const veSiteDuoc = (bg, truong) => {
	const bo = bg.split('/')[0];
	if (!(bo in VE_SITE_BO)) return false;
	return VE_SITE_BO[bo] === null || (Array.isArray(truong) && truong.length > 0 && truong.every((t) => VE_SITE_BO[bo].includes(t)));
};

/** Mức kiểm định theo tầng (chuan-kiem-dinh.md mục 3), ghi vào hồ sơ mẫu. */
const MUC = { loi: 'V3', 'mo-rong': 'V2', 'cong-cu': 'V3', 'co-han': 'V3', 'cap-nhat': 'V3', khung: null, 'du-lieu': null };

/** Bản ghi của trang trong src/data/trang.yml, hay undefined (trang 404). */
const banGhiTrang = (muc, goc) => (parse(fs.readFileSync(path.join(goc, 'src/data/trang.yml'), 'utf8')) ?? []).find((r) => r.id === muc);
/** Tầng của trang trong src/data/trang.yml, hay null nếu trang không có ở đó (như trang 404). */
const tangTrong = (muc, goc) => banGhiTrang(muc, goc)?.tang ?? null;

/** `n` phần tử chọn ngẫu nhiên của `ds` (cả `ds` nếu ít hơn). */
const chonNgauNhien = (ds, n) => {
	const conLai = [...ds];
	const ra = [];
	while (ra.length < n && conLai.length) ra.push(conLai.splice(randomInt(conLai.length), 1)[0]);
	return ra;
};

/** Mục là bản ghi ("du-lieu/<bộ>/<id>[#<trường>,…]")? Trả về khóa viết chuẩn ("<bộ>/<id>[#…]") hay null. */
const laBanGhi = (muc) => (muc.startsWith('du-lieu/') ? chuanKhoaBanGhi(muc.slice('du-lieu/'.length)) : null);
/** Hồ sơ của mục: một file cho mỗi trang hay mỗi bản ghi (khóa từng phần dùng chung hồ sơ của bản ghi). */
const fileHoSo = (muc, goc) => path.join(goc, 'kiem-dinh', `${muc.split('#')[0]}.yml`);
/** Ngày theo giờ máy (không theo UTC: ở Việt Nam, trước 7 giờ sáng UTC còn là hôm trước). */
const homNay = () => {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
/** Trường của từng bộ dữ liệu theo schema (src/du-lieu.mjs): khóa từng phần chỉ nhận các tên này. */
const TRUONG = Object.fromEntries(Object.entries(schema).map(([bo, s]) => [bo, Object.keys(s.shape)]));
/** Những người phải ghi ở mỗi lần kiểm định (chuan-kiem-dinh.md mục 3, 5). */
const NGUOI = ['luot_1', 'luot_2', 'review', 'kiem_mau'];
const lanMoi = (so, goc) => ({ so, ngay: null, nhanh: nhanh(goc), ma_bam: null, nguoi: Object.fromEntries(NGUOI.map((k) => [k, null])) });

function nhanh(goc) {
	try {
		return execFileSync('git', ['-C', goc, 'rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
	} catch {
		return 'không rõ';
	}
}

/** Mã băm hiện tại của một mục; lỗi nếu trang hay bản ghi không có. */
function maBamMuc(muc, goc) {
	const bg = laBanGhi(muc);
	if (bg) {
		const ma = maBamKhoaBanGhi(bg, goc);
		if (!ma) throw new Error(`không có bản ghi ${tachKhoaBanGhi(bg).banGhi} trong src/data/`);
		return ma;
	}
	const f = fileTrang(muc, goc);
	if (!fs.existsSync(f)) throw new Error(`không có trang ${path.relative(goc, f)}`);
	return maBamTrangFile(f, goc);
}

function ghiKhoa(khoa, goc) {
	const sapXep = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
	fs.mkdirSync(path.join(goc, 'kiem-dinh'), { recursive: true });
	fs.writeFileSync(path.join(goc, 'kiem-dinh', 'khoa.json'), JSON.stringify({ trang: sapXep(khoa.trang), ban_ghi: sapXep(khoa.ban_ghi) }, null, 2) + '\n');
}

/** Chỉ thị ::cong-cu, ::hinh của trang mà site mới chưa có (sẽ hiện ô "chưa chuyển"). */
function chuaChuyenTrong(noiDung, goc) {
	const ra = [];
	for (const [, loai, ten] of noiDung.matchAll(/^::(cong-cu|hinh)\{[^}]*\bten="([^"]*)"/gm)) {
		if (loai === 'cong-cu' && !CONG_CU[ten]) ra.push(`::cong-cu{ten="${ten}"}`);
		if (loai === 'hinh' && !fs.existsSync(path.join(goc, path.relative(GOC, THU_MUC_HINH), `${ten}.html`))) ra.push(`::hinh{ten="${ten}"}`);
	}
	return ra;
}

/**
 * Lỗi của hồ sơ trước khi khóa (chuan-kiem-dinh.md mục 3, 5, 6): mọi nhận định có loại, kết quả, nguồn có trong danh sách
 * nguồn, đã qua lượt 2 theo mức của tầng; chỗ sửa và bỏ có ghi chú; chỗ hai lượt khác nhau đã giải quyết; nhãn có cơ sở;
 * khẳng định thời sự có hạn. Riêng trang: tầng khớp trang.yml; trang Sức khỏe tâm thần có chữ ký chuyên gia; bài mở rộng
 * có dua_tren và hạn xem lại; không còn ô "chưa chuyển"; không có khoảng trắng cuối dòng.
 */
export function loiHoSo(hs, muc, goc, { khiKhoa = false } = {}) {
	const loi = [];
	const bg = laBanGhi(muc) && tachKhoaBanGhi(laBanGhi(muc)).banGhi;
	// khóa từng phần bản ghi: chỉ xét nhận định nói về trường được khóa (nhận định không ghi truong thì luôn xét); nhận
	// định về trường chưa khóa được để chưa có kết quả (review D2-0: asch1951 khóa trừ noi_dang)
	const truongKhoa = bg ? tachKhoaBanGhi(laBanGhi(muc)).truong : null;
	const ds = (hs.nhan_dinh ?? []).filter((n) => !truongKhoa || !Array.isArray(n.truong) || n.truong.some((t) => truongKhoa.includes(t)));
	if (bg ? hs.ban_ghi !== bg : hs.trang !== `src/content/docs/${muc}.md`)
		loi.push(bg ? `ban_ghi phải là "${bg}"` : `trang phải là "src/content/docs/${muc}.md"`);
	if (!Array.isArray(hs.lan) || !hs.lan.length) loi.push('thiếu lan (các lần kiểm định)');
	else for (const k of NGUOI) if (!hs.lan.at(-1).nguoi?.[k]) loi.push(`lần kiểm định cuối: thiếu nguoi.${k}`);
	// tầng lấy từ src/data/trang.yml (mức kiểm theo tầng): hồ sơ ghi khác thì sửa hồ sơ, không tin hồ sơ
	const rec = bg ? undefined : banGhiTrang(muc, goc);
	const tang = rec?.tang ?? null;
	if (!bg && (hs.tang ?? null) !== tang) loi.push(`hồ sơ ghi tang: ${hs.tang ?? null} mà src/data/trang.yml ghi ${tang}: sửa tang trong hồ sơ`);
	// bài Sức khỏe tâm thần (kham-pha/suc-khoe-tam-than/, loaiTrang) ở mọi tầng; trang Hỗ trợ, trang lĩnh vực cùng lĩnh vực thì
	// không (Hỗ trợ kiểm số liên hệ ở nguồn chính thức, chuan-kiem-dinh.md mục 3)
	if (loaiTrang(muc) === 'suc-khoe' && !hs.lan?.at(-1)?.nguoi?.chuyen_gia)
		loi.push('trang Sức khỏe tâm thần: chỉ khóa khi chuyên gia đã đọc (lần kiểm định cuối: nguoi.chuyen_gia, tên và ngày; plans/ben-vung/chuan-kiem-dinh.md mục 5)');
	if (tang === 'mo-rong') {
		if (!rec.dua_tren?.length) loi.push('bài mở rộng: src/data/trang.yml chưa có dua_tren (các bài lõi mà bài này dựa trên)');
		if (!rec.kiem_lai_truoc) loi.push('bài mở rộng: src/data/trang.yml chưa có kiem_lai_truoc (hạn xem lại, 12–18 tháng)');
	}
	// chỉ trang khung, trang sinh từ dữ liệu và trang 404 (không có tầng) được khóa với hồ sơ không có nhận định; bản ghi thì
	// cần ghi_chu giải thích. Trang lõi, mở rộng, công cụ, có hạn, cập nhật luôn có nhận định (review D1.6)
	if (!ds.length) {
		if (bg && !hs.ghi_chu) loi.push('chưa có nhận định nào: bản ghi cần ít nhất một nhận định đã kiểm, hay ghi_chu giải thích vì sao không có');
		if (!bg && tang && tang !== 'khung' && tang !== 'du-lieu') loi.push(`chưa có nhận định nào: trang tầng ${tang} cần ít nhất một nhận định đã kiểm`);
	}
	const nguon = new Set((hs.nguon ?? []).map((n) => n.id));
	const ids = ds.map((n) => n.id).filter(Boolean);
	for (const id of new Set(ids.filter((x, i) => ids.indexOf(x) !== i))) loi.push(`nhận định ${id}: id trùng`);
	// lượt 2 chỉ kiểm mẫu ở bài mở rộng; câu về chính site không qua lượt 2
	const mau = tang === 'mo-rong';
	for (const n of ds) {
		const ten = `nhận định ${n.id ?? '(không id)'}`;
		if (!n.id || !n.cau) loi.push(`${ten}: thiếu id hay cau`);
		if (!LOAI.includes(n.loai)) loi.push(`${ten}: loai phải là ${LOAI.join(', ')}`);
		if (!KET_QUA.includes(n.ket_qua)) loi.push(`${ten}: ket_qua phải là ${KET_QUA.join(', ')}`);
		const motLuot = n.loai === VE_SITE || (mau && !LUON_KIEM.includes(n.loai));
		if (!LUOT_2.includes(n.luot_2) && !(motLuot && n.luot_2 == null)) loi.push(`${ten}: chưa có kết quả lượt 2 (luot_2: ${LUOT_2.join(', ')})`);
		if (['da-sua', 'da-lam-mem', 'da-bo'].includes(n.ket_qua) && !n.ghi_chu) loi.push(`${ten}: ${n.ket_qua} cần ghi_chu (chữ cũ, chữ mới, lý do)`);
		if (n.loai === 'nhan') {
			if (!NHAN.includes(n.nhan)) loi.push(`${ten}: nhận định loại nhan cần nhan (${NHAN.join(', ')})`);
			if (!n.co_so?.length) loi.push(`${ten}: nhãn cần co_so (phân tích tổng hợp, tổng quan, tái lập; thước đo ở chuan-kiem-dinh.md mục 4)`);
			if (!n.ly_do) loi.push(`${ten}: nhãn cần ly_do`);
		}
		if (n.loai === 'thoi-su' && !/^\d{4}-\d{2}-\d{2}$/.test(String(n.het_han ?? ''))) loi.push(`${ten}: khẳng định thời sự cần het_han (năm-tháng-ngày)`);
		// tới hạn chỉ chặn lúc khóa; mục đã khóa mà tới hạn thì máy canh báo (đợt 9), không làm hỏng deploy (review D1.6)
		else if (khiKhoa && n.loai === 'thoi-su' && String(n.het_han) <= homNay()) loi.push(`${ten}: khẳng định thời sự đã tới hạn (het_han ${n.het_han}): kiểm lại rồi đặt hạn mới`);
		// câu về chính site: review kiểm trên trang, thành phần hay dữ liệu đã khóa và ghi kết quả (review); ghi_chu ghi đã
		// kiểm ở đâu. Không qua lượt 2, nên không cho dùng để né lượt 2: không có ở bản ghi dữ liệu, không kèm nguồn ngoài
		if (n.loai === VE_SITE) {
			// bản ghi dữ liệu: chỉ cấu trúc của site là câu về chính site (tầng, lĩnh vực của trang; tên, thứ tự, màu của lĩnh
			// vực; trang nhà của nghiên cứu), đối chiếu với bản đồ Nền tảng đã duyệt (plans/ben-vung/README.md mục 3, anh-xa.md);
			// mọi điều khác trong dữ liệu cần nguồn
			if (bg && !veSiteDuoc(bg, n.truong)) loi.push(`${ten}: bản ghi dữ liệu không có câu về chính site, trừ cấu trúc của site (${VE_SITE_DU_LIEU})`);
			if (n.nguon?.length) loi.push(`${ten}: câu về chính site không ghi nguồn ngoài; có điều cần nguồn ngoài thì xếp loại khác (qua lượt 2)`);
			if (!n.ghi_chu) loi.push(`${ten}: câu về chính site cần ghi_chu ghi đã kiểm trên trang, thành phần hay dữ liệu nào`);
			if (!['dung', 'sai'].includes(n.review)) loi.push(`${ten}: câu về chính site cần kết quả review (review: dung hay sai)`);
			if (n.review === 'sai' && n.ket_qua === 'dung') loi.push(`${ten}: review ghi sai mà kết quả dung: sửa câu (da-sua) hay bỏ (da-bo)`);
		}
		if (n.ket_qua !== 'da-bo' && n.loai !== VE_SITE) {
			if (!n.nguon?.length) loi.push(`${ten}: thiếu nguon`);
			for (const id of n.nguon ?? []) if (!nguon.has(id)) loi.push(`${ten}: nguồn "${id}" không có trong danh sách nguon`);
		}
		if ((BAC.includes(n.luot_2) || n.luot_2 === 'khong-chac') && n.ket_qua === 'dung' && !n.ghi_chu)
			loi.push(`${ten}: lượt 2 cho "${n.luot_2}" mà kết quả "dung": ghi_chu cách đã giải quyết`);
	}
	if (mau) {
		const nhom = ds.filter((n) => n.loai !== VE_SITE && !LUON_KIEM.includes(n.loai));
		const co = nhom.filter((n) => LUOT_2.includes(n.luot_2)).length;
		// mẫu có nhận định sai thì lượt 2 kiểm cả trang (chuan-kiem-dinh.md mục 3)
		const sai = ds.some((n) => BAC.includes(n.luot_2));
		const can = sai ? nhom.length : Math.min(MAU_MO_RONG, nhom.length);
		if (co < can) loi.push(sai ? `bài mở rộng: mẫu lượt 2 có nhận định sai, nên lượt 2 phải kiểm cả trang (mới có ${co}/${can})` : `bài mở rộng: lượt 2 phải kiểm mẫu ít nhất ${can} nhận định (mới có ${co})`);
	}
	if (!bg) {
		const f = fileTrang(muc, goc);
		const noiDung = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
		for (const x of chuaChuyenTrong(noiDung, goc)) loi.push(`trang còn ${x} chưa có trên site mới (ô "chưa chuyển"): làm thành phần trước khi khóa`);
		if (/[ \t]$/m.test(noiDung)) loi.push('trang có khoảng trắng cuối dòng (không vào mã băm, chuan-kiem-dinh.md mục 7): bỏ đi, ngắt dòng cứng viết <br>');
	}
	return loi;
}

/**
 * Nhận định của hồ sơ cần lượt 2, theo mức của tầng (chuan-kiem-dinh.md mục 3): mọi nhận định trừ câu về chính site; bài
 * mở rộng thì một mẫu (`chon(ds, k)` chọn k câu) cộng mọi nhận định loại nhan, lam-sang. `conLai`: chỉ phần còn thiếu,
 * tính cả kết quả lượt 2 đã nhập: mẫu chưa đủ thì thêm cho đủ, mẫu đã có câu sai thì mọi câu còn lại.
 */
function conCanLuot2(hs, chon = chonNgauNhien, conLai = false) {
	const co = (n) => conLai && LUOT_2.includes(n.luot_2);
	const ds = (hs.nhan_dinh ?? []).filter((n) => n.loai !== VE_SITE);
	if (hs.tang !== 'mo-rong') return ds.filter((n) => !co(n));
	const luon = ds.filter((n) => LUON_KIEM.includes(n.loai) && !co(n));
	const nhom = ds.filter((n) => !LUON_KIEM.includes(n.loai));
	const chua = nhom.filter((n) => !co(n));
	if (conLai && ds.some((n) => BAC.includes(n.luot_2))) return [...luon, ...chua];
	return [...luon, ...chon(chua, Math.max(0, Math.min(MAU_MO_RONG, nhom.length) - nhom.filter(co).length))];
}

/** Mã lô chuẩn ("d3-l2" -> "D3-L2"), hay null nếu không phải mã lô. */
export const maLo = (x) => (/^d\d+-l\d+$/i.test(x) ? x.toUpperCase() : null);

/** Các trang của lô ("D3-L1") theo bảng của lô trong plans/lam-lai/anh-xa.md. */
export function trangCuaLo(lo, goc = GOC) {
	const chu = fs.readFileSync(path.join(goc, 'plans', 'lam-lai', 'anh-xa.md'), 'utf8');
	const dong = chu.split('\n');
	const dau = dong.findIndex((l) => l.startsWith(`## ${maLo(lo)} `));
	if (dau < 0) throw new Error(`không có lô ${lo} trong plans/lam-lai/anh-xa.md`);
	const trang = [];
	for (const l of dong.slice(dau + 1)) {
		if (l.startsWith('#')) break;
		// trang mới ghi thêm "(mới)" sau đường dẫn
		const m = /^\| `([^`]+)`(?: \(mới\))? \|/.exec(l);
		if (m) trang.push(m[1]);
	}
	return trang;
}

/** Hồ sơ mẫu cho một trang hay một bản ghi (cấu trúc: chuan-kiem-dinh.md mục 6). */
function hoSoMau(muc, goc) {
	const bg = laBanGhi(muc);
	maBamMuc(muc, goc); // trang hay bản ghi phải có
	const dau = `# Hồ sơ kiểm định, cấu trúc ở plans/ben-vung/chuan-kiem-dinh.md mục 6. Điền xong thì khóa: node tools/khoa.mjs khoa ${muc}\n`;
	if (bg) return dau + stringify({ ban_ghi: tachKhoaBanGhi(bg).banGhi, muc: 'V3', lan: [lanMoi(1, goc)], nguon: [], nhan_dinh: [] });
	const tang = tangTrong(muc, goc);
	const cu = path.join(goc, '..', 'psyche-zero', 'docs', `${muc}.md`);
	const hs = {
		trang: `src/content/docs/${muc}.md`,
		...(fs.existsSync(cu) && { nguon_cu: `../psyche-zero/docs/${muc}.md` }),
		tang,
		muc: MUC[tang] ?? null,
		lan: [lanMoi(1, goc)],
		nguon: [],
		nhan_dinh: [],
	};
	return dau + stringify(hs);
}

/**
 * Ghi ngày, nhánh và mã băm vào lần cuối trong lan của hồ sơ (lần đó chưa có mã băm: khoa đã kiểm); khóa từng phần
 * thì ghi cả các trường đã khóa.
 */
function ghiLan(fHoSo, ma, goc, truong) {
	const doc = parseDocument(fs.readFileSync(fHoSo, 'utf8'));
	const cuoi = doc.get('lan').items.at(-1);
	for (const [k, v] of Object.entries({ ngay: homNay(), nhanh: nhanh(goc), ma_bam: ma })) cuoi.set(k, v);
	if (truong) cuoi.set('truong', doc.createNode(truong, { flow: true }));
	fs.writeFileSync(fHoSo, doc.toString({ lineWidth: 0 }));
}

export function lenh(thamSo, goc = GOC, in_ = console.log) {
	const [viec, ...con] = thamSo;
	const lay = (ten) => {
		const i = con.indexOf(ten);
		return i >= 0 ? con.splice(i, 2)[1] : undefined;
	};
	const iGoc = con.indexOf('--goc');
	if (iGoc >= 0) goc = path.resolve(con.splice(iGoc, 2)[1]);
	const khoa = docKhoa(goc);

	if (viec === 'mau') {
		for (const t of con) {
			const f = fileHoSo(t, goc);
			if (fs.existsSync(f)) {
				// hồ sơ đã có: chỉ bản ghi đang khóa từng phần được thêm lần mới (khóa thêm trường hay khóa cả bản ghi). Trang hay
				// bản ghi đang khóa thì phải mở khóa (lệnh mo tự thêm lần mới), để mọi lần sửa đều có lý do (chuẩn mục 7)
				const bg = laBanGhi(t);
				const ten = bg ? `du-lieu/${tachKhoaBanGhi(bg).banGhi}` : t;
				if (bg ? khoa.ban_ghi[tachKhoaBanGhi(bg).banGhi] : khoa.trang[t])
					throw new Error(`${ten} đang khóa: muốn sửa thì mở khóa trước (node tools/khoa.mjs mo ${ten} --ly-do "…"); lệnh mo tự thêm lần kiểm định mới vào hồ sơ`);
				const doc = parseDocument(fs.readFileSync(f, 'utf8'));
				const lan = doc.get('lan');
				if (!lan?.items.at(-1)?.get('ma_bam')) throw new Error(`${path.relative(goc, f)} đã có, lần cuối trong lan chưa khóa: điền lần đó rồi khóa`);
				lan.add(doc.createNode(lanMoi(lan.items.length + 1, goc)));
				fs.writeFileSync(f, doc.toString({ lineWidth: 0 }));
				in_(`đã thêm lần kiểm định ${lan.items.length} vào ${path.relative(goc, f)}`);
				continue;
			}
			fs.mkdirSync(path.dirname(f), { recursive: true });
			fs.writeFileSync(f, hoSoMau(t, goc));
			in_(`đã tạo ${path.relative(goc, f)}`);
		}
		return 0;
	}
	if (viec === 'khoa') {
		for (const muc of con) {
			const f = fileHoSo(muc, goc);
			if (!fs.existsSync(f)) throw new Error(`${muc}: chưa có hồ sơ ${path.relative(goc, f)} (tạo bằng: node tools/khoa.mjs mau ${muc})`);
			const bg = laBanGhi(muc);
			const { banGhi, truong } = bg ? tachKhoaBanGhi(bg) : {};
			const mo = (x) => `node tools/khoa.mjs mo ${x} --ly-do "…"`;
			// đã khóa thì phải mở khóa trước (chuan-kiem-dinh.md mục 7): không khóa đè
			if (!bg && khoa.trang[muc]) throw new Error(`${muc}: trang đã khóa. Muốn sửa thì mở khóa trước: ${mo(muc)}`);
			if (bg && khoa.ban_ghi[banGhi]) throw new Error(`${muc}: bản ghi ${banGhi} đã khóa cả bản ghi. Muốn sửa thì mở khóa trước: ${mo(`du-lieu/${banGhi}`)}`);
			if (bg && khoa.ban_ghi[bg]) throw new Error(`${muc}: khóa này đã có. Muốn sửa thì mở khóa trước: ${mo(`du-lieu/${bg}`)}`);
			// khóa từng phần cũ của bản ghi phải còn khớp: khóa mới không được che chỗ đã sửa ở trường đã khóa
			const phanCu = bg ? Object.keys(khoa.ban_ghi).filter((k) => k.startsWith(`${banGhi}#`)) : [];
			for (const k of phanCu)
				if (maBamKhoaBanGhi(k, goc) !== khoa.ban_ghi[k]) throw new Error(`${muc}: khóa du-lieu/${k} đã lệch (trường đã khóa bị sửa). Mở khóa trước: ${mo(`du-lieu/${k}`)}`);
			if (truong) {
				const bo = banGhi.split('/')[0];
				const la = truong.filter((t) => !TRUONG[bo]?.includes(t));
				if (la.length) throw new Error(`${muc}: bộ ${bo} không có trường ${la.join(', ')} (trường có: ${(TRUONG[bo] ?? []).join(', ')})`);
				const r = docBanGhi(banGhi, goc);
				const chuaCo = r ? truong.filter((t) => !(t in r)) : [];
				if (chuaCo.length) in_(`  chú ý: bản ghi ${banGhi} chưa có trường ${chuaCo.join(', ')}; khóa vẫn giữ trường ấy chưa có`);
			}
			const hs = parse(fs.readFileSync(f, 'utf8')) ?? {};
			if (hs.lan?.at(-1)?.ma_bam)
				throw new Error(`${muc}: lần cuối trong lan của hồ sơ đã có mã băm. Trang hay bản ghi đã khóa thì sửa theo thủ tục mở khóa: node tools/khoa.mjs mo ${muc} --ly-do "…"`);
			const loi = loiHoSo(hs, muc, goc, { khiKhoa: true });
			if (loi.length) throw new Error(`${muc}: hồ sơ chưa đủ để khóa:\n- ${loi.join('\n- ')}`);
			const ma = maBamMuc(muc, goc);
			// khóa cả bản ghi thay mọi khóa từng phần cũ; khóa từng phần mới thay khóa cũ có các trường nằm trọn trong nó
			for (const k of phanCu) if (!truong || tachKhoaBanGhi(k).truong.every((t) => truong.includes(t))) delete khoa.ban_ghi[k];
			if (bg) khoa.ban_ghi[bg] = ma;
			else khoa.trang[muc] = ma;
			ghiLan(f, ma, goc, truong);
			ghiKhoa(khoa, goc);
			in_(`đã khóa ${muc} (${ma.slice(0, 19)}…)`);
		}
		return 0;
	}
	if (viec === 'mo') {
		const lyDo = lay('--ly-do');
		const [muc] = con;
		if (!muc || !lyDo) throw new Error('cần mục và --ly-do "…"');
		const bg = laBanGhi(muc);
		const bang = bg ? khoa.ban_ghi : khoa.trang;
		const k = bg ?? muc;
		if (!(k in bang)) {
			const banGhi = bg && tachKhoaBanGhi(bg).banGhi;
			if (bg && banGhi !== bg && khoa.ban_ghi[banGhi]) throw new Error(`${muc} chưa khóa riêng: bản ghi đang khóa cả bản ghi, mở bằng: node tools/khoa.mjs mo du-lieu/${banGhi} --ly-do "…"`);
			const phan = bg ? Object.keys(khoa.ban_ghi).filter((x) => x.startsWith(`${banGhi}#`)) : [];
			throw new Error(`${muc} chưa khóa` + (phan.length ? `; bản ghi đang khóa từng phần: ${phan.map((x) => `du-lieu/${x}`).join(', ')}` : ''));
		}
		// lý do mở khóa ghi vào hồ sơ: không có hồ sơ, hay hồ sơ hỏng, thì không mở (đọc hồ sơ trước khi gỡ khóa)
		const f = fileHoSo(muc, goc);
		if (!fs.existsSync(f)) throw new Error(`${muc}: không có hồ sơ ${path.relative(goc, f)} để ghi lý do mở khóa`);
		const doc = parseDocument(fs.readFileSync(f, 'utf8'));
		if (doc.errors.length || !doc.get('lan')?.items) throw new Error(`${muc}: hồ sơ ${path.relative(goc, f)} hỏng (đọc YAML lỗi hay thiếu lan): sửa hồ sơ trước khi mở khóa`);
		delete bang[k];
		ghiKhoa(khoa, goc);
		if (!doc.has('mo_khoa')) doc.set('mo_khoa', doc.createNode([]));
		doc.get('mo_khoa').add(doc.createNode({ ngay: homNay(), nhanh: nhanh(goc), ly_do: lyDo }));
		const lan = doc.get('lan');
		lan.add(doc.createNode(lanMoi(lan.items.length + 1, goc)));
		fs.writeFileSync(f, doc.toString({ lineWidth: 0 }));
		in_(`đã mở khóa ${muc}: sửa, kiểm định lại những nhận định bị chạm và các nhận định cùng đoạn, điền lần mới trong lan của hồ sơ, rồi khóa lại`);
		return 0;
	}
	if (viec === 'tinh') {
		const ds = con.length ? con : [...Object.keys(khoa.trang), ...Object.keys(khoa.ban_ghi).map((k) => `du-lieu/${k}`)];
		let lech = 0;
		for (const muc of ds) {
			const bg = laBanGhi(muc);
			const daKhoa = bg ? khoa.ban_ghi[bg] : khoa.trang[muc];
			let ma;
			try {
				ma = maBamMuc(muc, goc);
			} catch (e) {
				in_(`${muc}  ${e.message}`);
				lech++;
				continue;
			}
			const tt = !daKhoa ? 'chưa khóa' : daKhoa === ma ? 'khớp' : 'LỆCH';
			if (tt === 'LỆCH') lech++;
			in_(`${muc}  ${ma}  ${tt}`);
		}
		return lech ? 1 : 0;
	}
	if (viec === 'xuat') {
		const mau = Number(lay('--mau') ?? 0);
		const iConLai = con.indexOf('--con-lai');
		const conLai = iConLai >= 0 && Boolean(con.splice(iConLai, 1));
		const lo = con.length === 1 && maLo(con[0]);
		const ra = lay('--ra') ?? (lo ? `plans/lam-lai/bao-cao/${lo.toLowerCase()}-${mau ? 'kiem-mau' : conLai ? 'nhan-dinh-con-lai' : 'nhan-dinh'}.yml` : undefined);
		const tatCa = [];
		for (const t of con.flatMap((x) => (maLo(x) ? trangCuaLo(x, goc) : [x]))) {
			const f = fileHoSo(t, goc);
			if (!fs.existsSync(f)) throw new Error(`${t}: chưa có hồ sơ`);
			const hs = parse(fs.readFileSync(f, 'utf8')) ?? {};
			const nguon = new Map((hs.nguon ?? []).map((n) => [n.id, n]));
			// kiểm mẫu của chủ repo: mọi nhận định; lượt 2: những nhận định còn cần lượt 2 (conCanLuot2)
			const cho = mau ? (hs.nhan_dinh ?? []) : conCanLuot2(hs, chonNgauNhien, conLai);
			for (const n of cho)
				tatCa.push(
					mau
						? { trang: t, id: n.id, cau: n.cau, loai: n.loai, nguon: (n.nguon ?? []).map((id) => ({ ten: nguon.get(id)?.ten, link: nguon.get(id)?.link })), ket_qua_luot_1: n.ket_qua, ...(n.ghi_chu && { ghi_chu: n.ghi_chu }) }
						: { trang: t, id: n.id, cau: n.cau, loai: n.loai },
				);
		}
		const ds = mau ? chonNgauNhien(tatCa, mau) : tatCa;
		const chu = stringify(ds, { lineWidth: 0 });
		if (ra) {
			fs.mkdirSync(path.dirname(path.resolve(goc, ra)), { recursive: true });
			fs.writeFileSync(path.resolve(goc, ra), chu);
			in_(`đã ghi ${ds.length} nhận định vào ${ra}`);
		} else in_(chu.trimEnd());
		return 0;
	}
	if (viec === 'nhap') {
		const [file] = con;
		if (!file) throw new Error('cần file kết quả lượt 2, ví dụ plans/lam-lai/bao-cao/d3-l1-luot-2.yml');
		const ds = parse(fs.readFileSync(path.resolve(goc, file), 'utf8'));
		if (!Array.isArray(ds)) throw new Error(`${file}: phải là danh sách kết quả`);
		const loi = [];
		const hoSo = new Map(); // file hồ sơ -> { doc, dong: [[nhận định, dòng kết quả]] }, hay null nếu hồ sơ không nhập được
		const daGap = new Set();
		ds.forEach((d, i) => {
			const ten = `dòng ${i + 1} (${d?.trang ?? '?'}, ${d?.id ?? '?'})`;
			if (!d?.trang || !d?.id) return loi.push(`${ten}: thiếu trang hay id`);
			if (!LUOT_2.includes(d.luot_2)) return loi.push(`${ten}: luot_2 phải là ${LUOT_2.join(', ')}`);
			// `nguon:` để trống (null) như không ghi
			if (d.nguon != null && (!Array.isArray(d.nguon) || d.nguon.some((x) => typeof x !== 'string')))
				return loi.push(`${ten}: nguon phải là danh sách link`);
			if (BAC.includes(d.luot_2) && !d.cau_dung) loi.push(`${ten}: ${d.luot_2} cần cau_dung (câu viết lại cho đúng mức bằng chứng)`);
			if (daGap.has(`${d.trang}#${d.id}`)) return loi.push(`${ten}: trùng dòng trước`);
			daGap.add(`${d.trang}#${d.id}`);
			const f = fileHoSo(d.trang, goc);
			if (!hoSo.has(f)) {
				// hồ sơ hỏng hay đã khóa thì không nhập vào (báo một lần cho mỗi hồ sơ)
				let doc = null;
				if (!fs.existsSync(f)) loi.push(`${ten}: chưa có hồ sơ ${path.relative(goc, f)}`);
				else {
					doc = parseDocument(fs.readFileSync(f, 'utf8'));
					if (doc.errors.length) loi.push(`${ten}: hồ sơ ${path.relative(goc, f)} đọc YAML lỗi (${doc.errors[0].message})`), (doc = null);
					else if (doc.get('lan')?.items?.at(-1)?.get('ma_bam'))
						loi.push(`${ten}: hồ sơ ${path.relative(goc, f)} đã khóa (lần cuối trong lan có mã băm): mở khóa trước`), (doc = null);
				}
				hoSo.set(f, doc && { doc, dong: [] });
			}
			const hs = hoSo.get(f);
			if (!hs) return;
			const trungId = (hs.doc.get('nhan_dinh')?.items ?? []).filter((x) => x.get('id') === d.id);
			if (trungId.length > 1) return loi.push(`${ten}: hồ sơ có ${trungId.length} nhận định cùng id ${d.id}`);
			const nd = trungId[0];
			if (!nd) return loi.push(`${ten}: hồ sơ không có nhận định ${d.id}`);
			if (d.luot_2 !== 'khong-chac' && !d.nguon?.length) loi.push(`${ten}: ${d.luot_2} cần nguon (link đã mở)`);
			hs.dong.push([nd, d]);
		});
		if (loi.length) throw new Error(`${file}: chưa nhập gì, vì:\n- ${loi.join('\n- ')}`);
		const dem = Object.fromEntries(LUOT_2.map((k) => [k, 0]));
		const canReview = [];
		let thieu = 0;
		// dựng hết rồi mới ghi: lỗi lúc dựng thì chưa file nào bị ghi
		const ghiRa = [];
		for (const [f, { doc, dong }] of hoSo) {
			for (const [nd, d] of dong) {
				nd.set('luot_2', d.luot_2);
				// nhập lại thì thay hẳn phần của lượt 2, không để sót link hay ghi chú của lần trước
				nd.delete('luot_2_nguon');
				nd.delete('luot_2_ghi_chu');
				if (d.nguon?.length) {
					// link trong nháy kép: link có "?" mà không nháy thì PyYAML (YAML 1.1) đọc không được
					const ds = doc.createNode(d.nguon, { flow: true });
					for (const x of ds.items) if (typeof x.value === 'string') x.type = 'QUOTE_DOUBLE';
					nd.set('luot_2_nguon', ds);
				}
				const ghiChu = [d.cau_dung && `câu đúng: ${d.cau_dung}`, d.ghi_chu].filter(Boolean).join('; ');
				if (ghiChu) nd.set('luot_2_ghi_chu', ghiChu);
				dem[d.luot_2]++;
				const kq = nd.get('ket_qua');
				if (d.luot_2 !== 'dung' || kq !== 'dung') canReview.push(`${d.trang} ${d.id}: lượt 1 ${kq ?? 'chưa có kết quả'}, lượt 2 ${d.luot_2}`);
			}
			ghiRa.push([f, doc.toString({ lineWidth: 0 })]);
			thieu += conCanLuot2(doc.toJSON(), (ds, k) => ds.slice(0, k), true).length;
		}
		for (const [f, chu] of ghiRa) fs.writeFileSync(f, chu);
		in_(`đã nhập ${ds.length} kết quả lượt 2 vào ${hoSo.size} hồ sơ: ${LUOT_2.map((k) => `${dem[k]} ${k}`).join(', ')}`);
		if (thieu) in_(`các hồ sơ ấy còn ${thieu} nhận định cần lượt 2 (theo mức của tầng): xuất phần còn thiếu bằng node tools/khoa.mjs xuat … --con-lai`);
		if (canReview.length) in_(`cần review (${canReview.length}):\n  ${canReview.join('\n  ')}`);
		return 0;
	}
	throw new Error('việc phải là mau, khoa, mo, tinh, xuat hay nhap (xem đầu file tools/khoa.mjs)');
}

// import.meta.main: đúng cả khi đường dẫn script đi qua liên kết tượng trưng (/tmp trên macOS)
if (import.meta.main) {
	try {
		process.exit(lenh(process.argv.slice(2)));
	} catch (e) {
		console.error(e.message);
		process.exit(1);
	}
}
