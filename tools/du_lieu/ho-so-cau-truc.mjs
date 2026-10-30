#!/usr/bin/env node
// Sinh hồ sơ kiểm định cho cấu trúc của site (D2-0): tầng, lĩnh vực của mỗi trang (src/data/trang.yml) và tên, thứ tự,
// màu, biểu tượng của mỗi lĩnh vực (src/data/linh-vuc.yml). Đây là câu về chính site (loai ve-site): đúng khi khớp bản đồ
// Nền tảng chủ repo đã duyệt ngày 29/10/2026 (plans/ben-vung/README.md mục 3), bảng plans/lam-lai/anh-xa.md (sinh bằng
// plans/lam-lai/anh_xa.py) và quyết định giao diện (plans/lam-lai/README.md, Quyết định). Review kiểm từng câu, ghi review.
// Hồ sơ đã có thì không ghi đè, trừ khi --ghi-de.
//   node tools/du_lieu/ho-so-cau-truc.mjs [--ghi-de]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';

const GOC = fileURLToPath(new URL('../../', import.meta.url));
const ghiDe = process.argv.includes('--ghi-de');
const doc = (f) => parse(fs.readFileSync(path.join(GOC, 'src/data', f), 'utf8'));
const linhVuc = doc('linh-vuc.yml');
const tenLv = new Map(linhVuc.map((l) => [l.id, l.ten]));
const TANG = { loi: 'Nền tảng (lõi)', 'mo-rong': 'Mở rộng', 'cap-nhat': 'dòng cập nhật', 'cong-cu': 'công cụ', 'co-han': 'có hạn', 'du-lieu': 'trang sinh từ dữ liệu', khung: 'khung' };
const NGUOI = { luot_1: 'script tools/du_lieu/ho-so-cau-truc.mjs, từ src/data/ (Claude Opus 5.5)', luot_2: 'không cần (câu về chính site, review kiểm)', review: null, kiem_mau: null };
const lan = () => [{ so: 1, ngay: null, nhanh: 'moi/d2-0-du-lieu', ma_bam: null, nguoi: { ...NGUOI } }];
let ghi = 0;
const viet = (bg, hs) => {
	const f = path.join(GOC, 'kiem-dinh/du-lieu', `${bg}.yml`);
	if (fs.existsSync(f) && !ghiDe) return;
	fs.mkdirSync(path.dirname(f), { recursive: true });
	fs.writeFileSync(f, `# Hồ sơ kiểm định cấu trúc của site (D2-0), sinh bằng tools/du_lieu/ho-so-cau-truc.mjs\n` + stringify(hs, { lineWidth: 0 }));
	ghi++;
};
for (const r of doc('trang.yml')) {
	const cau = `Trang ${r.id} thuộc tầng ${TANG[r.tang]} (${r.tang})` + (r.linh_vuc ? `, lĩnh vực ${tenLv.get(r.linh_vuc)} (${r.linh_vuc})` : ', không thuộc lĩnh vực nào') + (r.moi ? '; trang mới, không có ở site cũ' : '');
	viet(`trang/${r.id}`, {
		ban_ghi: `trang/${r.id}`,
		lan: lan(),
		nguon: [],
		nhan_dinh: [{ id: 'n1', cau, loai: 've-site', truong: ['tang', ...(r.linh_vuc ? ['linh_vuc'] : []), ...(r.moi ? ['moi'] : [])], ket_qua: 'dung', ghi_chu: 'đối chiếu dòng của trang trong plans/lam-lai/anh-xa.md (tầng, lĩnh vực, "(mới)"); tests/du-lieu.test.mjs kiểm trang.yml khớp bảng ấy', review: null }],
	});
}
for (const l of linhVuc) {
	viet(`linh-vuc/${l.id}`, {
		ban_ghi: `linh-vuc/${l.id}`,
		lan: lan(),
		nguon: [],
		nhan_dinh: [
			{ id: 'n1', cau: `Lĩnh vực thứ ${l.thu_tu} của bản đồ Nền tảng: ${l.ten}`, loai: 've-site', truong: ['ten', 'thu_tu'], ket_qua: 'dung', ghi_chu: 'đối chiếu bảng 14 lĩnh vực ở plans/lam-lai/anh-xa.md và plans/ben-vung/README.md mục 3 (bản đồ Nền tảng, chủ repo duyệt 29/10/2026)', review: null },
			{ id: 'n2', cau: `Màu của lĩnh vực có sắc độ ${l.mau}, biểu tượng ${l.bieu_tuong}`, loai: 've-site', truong: ['mau', 'bieu_tuong'], ket_qua: 'dung', ghi_chu: 'màu theo bản mẫu giao diện đã chọn (plans/lam-lai/ban-mau/ma/du-lieu.mjs, sắc độ h); biểu tượng D1.3 (src/bieu-tuong.mjs); tests/giao-dien.test.mjs kiểm không trùng', review: null },
		],
	});
}
console.log(`đã ghi ${ghi} hồ sơ cấu trúc`);
