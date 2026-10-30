// Khóa trang và bản ghi (D1.6; plans/ben-vung/chuan-kiem-dinh.md mục 6–7): mã băm, đọc kiem-dinh/khoa.json, kiểm mã băm
// lúc build. Dùng chung cho bản build (src/content.config.ts, src/ban-build.mjs) và công cụ tools/khoa.mjs, để chỉ có một
// cách tính mã băm. Chép từ ../opus/src/khoa.mjs rồi sửa cho Psyche (bộ dữ liệu, chuẩn hóa NFC; bản build ở
// src/ban-build.mjs).
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

export const GOC = fileURLToPath(new URL('../', import.meta.url));

const maBam = (chu) => 'sha256:' + createHash('sha256').update(chu).digest('hex');

/**
 * Chuẩn hóa nguồn Markdown trước khi băm (chuan-kiem-dinh.md mục 7): Unicode NFC, xuống dòng kiểu \n, bỏ khoảng trắng
 * cuối dòng, đúng một \n ở cuối file.
 */
export const chuanHoaTrang = (chu) =>
	chu
		.normalize('NFC')
		.replace(/\r\n?/g, '\n')
		.split('\n')
		.map((l) => l.replace(/[ \t]+$/, ''))
		.join('\n')
		.replace(/\n*$/, '\n');

export const maBamTrang = (chu) => maBam(chuanHoaTrang(chu));

/**
 * Mã băm của trang như lúc khóa: nguồn Markdown, cộng nội dung từng hình tĩnh ::hinh{ten="x"} mà trang dùng
 * (src/hinh/x.html, theo thứ tự trong trang), để chữ và số trong hình cũng được khóa (D3-L1). Trang không có hình thì mã
 * băm như maBamTrang của riêng nguồn.
 */
export function maBamTrangFile(f, goc = GOC) {
	const chu = fs.readFileSync(f, 'utf8');
	const hinh = [...chu.matchAll(/^::hinh\{[^}]*\bten="([^"]*)"/gm)].map(([, ten]) => {
		const fh = path.join(goc, 'src', 'hinh', `${ten}.html`);
		return fs.existsSync(fh) ? `\n<!-- hinh:${ten} -->\n${fs.readFileSync(fh, 'utf8')}` : '';
	});
	return maBamTrang(chu + hinh.join(''));
}

/** JSON của bản ghi với khóa xếp theo chữ cái ở mọi cấp, không khoảng trắng. */
export const jsonChuan = (x) =>
	JSON.stringify(x, (_, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) : v));

export const maBamBanGhi = (banGhi) => maBam(jsonChuan(banGhi));

/** Đường dẫn file của trang trong src/content/docs/ ("thi-nghiem/index" -> …/thi-nghiem/index.md). */
export const fileTrang = (trang, goc = GOC) => path.join(goc, 'src', 'content', 'docs', `${trang}.md`);

/**
 * Bộ dữ liệu -> file trong src/data/ (TEP của src/du-lieu.mjs). Khóa của bản ghi là "<bộ>/<id>": khóa cả bản ghi; hay
 * "<bộ>/<id>#<trường>,<trường>": chỉ khóa các trường đã kiểm định (chuan-kiem-dinh.md mục 7), ví dụ D2-0 khóa tác giả,
 * năm, tên bài, nơi đăng của nguồn, và tầng, lĩnh vực của trang ("trang/thi-nghiem/asch#linh_vuc,tang").
 */
const TEP_DU_LIEU = { 'linh-vuc': 'linh-vuc.yml', trang: 'trang.yml', nguon: 'nguon.yml', 'nghien-cuu': 'nghien-cuu.yml', 'ngo-nhan': 'ngo-nhan.yml' };

/** Tách khóa bản ghi: { banGhi: "<bộ>/<id>", truong: danh sách trường xếp theo chữ cái, hay null (cả bản ghi) }. */
export function tachKhoaBanGhi(k) {
	const [banGhi, ds] = k.split('#');
	const truong = ds === undefined ? null : [...new Set(ds.split(',').map((t) => t.trim()).filter(Boolean))].sort();
	return { banGhi, truong: truong?.length ? truong : null };
}

/** Khóa bản ghi viết chuẩn: trường xếp theo chữ cái, không trùng ("trang/x#linh_vuc,tang"). */
export const chuanKhoaBanGhi = (k) => {
	const { banGhi, truong } = tachKhoaBanGhi(k);
	return truong ? `${banGhi}#${truong.join(',')}` : banGhi;
};

/** Phần được khóa của bản ghi: cả bản ghi, hay chỉ các trường đã khai (trường bản ghi chưa có thì bỏ qua). */
export const phanKhoa = (r, truong) => (truong ? Object.fromEntries(truong.filter((t) => t in r).map((t) => [t, r[t]])) : r);

/**
 * Mã băm hiện tại của một khóa bản ghi (cả bản ghi hay từng phần), hay undefined nếu bản ghi không có. `nho`: Map giữ các
 * bộ dữ liệu đã đọc trong một lần kiểm, để không parse lại YAML cho từng khóa.
 */
export function maBamKhoaBanGhi(k, goc = GOC, nho) {
	const { banGhi, truong } = tachKhoaBanGhi(k);
	const r = docBanGhi(banGhi, goc, nho);
	return r && maBamBanGhi(phanKhoa(r, truong));
}

/** Bản ghi "<bộ>/<id>" đọc thẳng từ YAML (chưa qua schema), hay undefined. */
export function docBanGhi(khoaBanGhi, goc = GOC, nho = new Map()) {
	const [bo, ...phan] = khoaBanGhi.split('#')[0].split('/');
	const id = phan.join('/');
	if (!TEP_DU_LIEU[bo]) return undefined;
	const f = path.join(goc, 'src', 'data', TEP_DU_LIEU[bo]);
	if (!nho.has(f)) nho.set(f, parse(fs.readFileSync(f, 'utf8')) ?? []);
	const ds = nho.get(f);
	return ds.find((r) => String(r.id) === id);
}

/** Nội dung kiem-dinh/khoa.json: { trang: { đường dẫn: mã băm }, ban_ghi: { "<bộ>/<id>[#<trường>,…]": mã băm } }. */
export function docKhoa(goc = GOC) {
	const f = path.join(goc, 'kiem-dinh', 'khoa.json');
	let k = {};
	try {
		if (fs.existsSync(f)) k = JSON.parse(fs.readFileSync(f, 'utf8'));
	} catch (e) {
		// file chung của mọi lô: hay hỏng vì xung đột khi gộp nhánh
		throw new Error(`kiem-dinh/khoa.json không đọc được (${e.message}); sửa file cho đúng JSON, như khi gỡ xung đột git`);
	}
	return { trang: k.trang ?? {}, ban_ghi: k.ban_ghi ?? {} };
}

/**
 * Hàm (bộ, id, trường) -> trường ấy của bản ghi đã khóa chưa, theo khoa.json: khóa cả bản ghi, hay một khóa từng phần có
 * trường ấy. Dùng khi thành phần hiện dữ liệu trên trang đã khóa (D2-0 trở đi).
 */
export function truongDaKhoa(khoa = docKhoa()) {
	const theo = new Map(); // "<bộ>/<id>" -> true (cả bản ghi) hay Set các trường đã khóa
	for (const k of Object.keys(khoa.ban_ghi)) {
		const { banGhi, truong } = tachKhoaBanGhi(k);
		if (!truong) theo.set(banGhi, true);
		else if (theo.get(banGhi) !== true) theo.set(banGhi, new Set([...(theo.get(banGhi) ?? []), ...truong]));
	}
	return (bo, id, ten) => {
		const t = theo.get(`${bo}/${id}`);
		return t === true || (t instanceof Set && t.has(ten));
	};
}

/**
 * Kiểm mọi mục đã khóa: trang và bản ghi phải còn, mã băm phải khớp. Trả về danh sách lỗi (chuỗi); rỗng là đạt.
 * Build gọi hàm này ở cả bản thật và bản xem (src/content.config.ts): lệch thì build hỏng.
 */
export function kiemKhoa(goc = GOC) {
	const { trang, ban_ghi } = docKhoa(goc);
	const loi = [];
	const nho = new Map();
	const cachMo = (muc) => `sửa theo thủ tục mở khóa: node tools/khoa.mjs mo ${muc} --ly-do "…" (plans/ben-vung/chuan-kiem-dinh.md mục 8)`;
	for (const [t, ma] of Object.entries(trang)) {
		const f = fileTrang(t, goc);
		if (!fs.existsSync(f)) loi.push(`trang ${t} đã khóa nhưng không còn file ${path.relative(goc, f)}`);
		else if (maBamTrangFile(f, goc) !== ma) loi.push(`trang ${t} đã khóa mà nội dung đã đổi (mã băm lệch, tính cả hình của trang); ${cachMo(t)}`);
	}
	for (const [k, ma] of Object.entries(ban_ghi)) {
		const moi = maBamKhoaBanGhi(k, goc, nho);
		if (!moi) loi.push(`bản ghi ${k} đã khóa nhưng không còn trong src/data/`);
		else if (moi !== ma) loi.push(`bản ghi ${k} đã khóa mà đã đổi (mã băm lệch); ${cachMo(`du-lieu/${k}`)}`);
	}
	return loi;
}
