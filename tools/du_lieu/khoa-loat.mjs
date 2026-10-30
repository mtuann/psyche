#!/usr/bin/env node
// Khóa một loạt bản ghi dữ liệu sau review và kiểm mẫu (D2-0): điền người review, người kiểm mẫu vào lần kiểm định cuối
// của từng hồ sơ (chỉ ô còn trống), điền kết quả review của câu về chính site (chỉ ô còn trống), rồi khóa từng phần theo
// trường đã kiểm định (node tools/khoa.mjs khoa du-lieu/<bộ>/<id>#<trường>,…). Hồ sơ chưa đủ thì in lỗi, bỏ qua, khóa tiếp
// cái khác; cuối cùng in số đã khóa và danh sách chưa khóa.
//   node tools/khoa.mjs … không đổi; script này chỉ gọi lenh() của nó.
//   node tools/du_lieu/khoa-loat.mjs --review "…" --kiem-mau "…" [--ve-site dung] <bộ>:<trường,…> [<bộ>:<trường,…>…]
//   ví dụ: node tools/du_lieu/khoa-loat.mjs --review "Claude Sonnet 5.5, agent review D2-0" --kiem-mau "chủ repo, 5 nhận định"
//            nguon:doi,loai,nam,noi_dang,tac_gia,ten trang:linh_vuc,moi,tang
// Chỉ khóa bản ghi có hồ sơ trong kiem-dinh/du-lieu/<bộ>/; bản ghi chưa khóa. Trường bản ghi không có thì khóa bỏ qua.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';
import { docKhoa } from '../../src/khoa.mjs';
import { lenh } from '../khoa.mjs';

const GOC = fileURLToPath(new URL('../../', import.meta.url));
const ts = process.argv.slice(2);
const lay = (k) => {
	const i = ts.indexOf(k);
	return i >= 0 ? ts.splice(i, 2)[1] : undefined;
};
const review = lay('--review');
const kiemMau = lay('--kiem-mau');
const veSite = lay('--ve-site');
if (!review || !kiemMau || !ts.length) {
	console.error('cần --review "…", --kiem-mau "…" và ít nhất một <bộ>:<trường,…>');
	process.exit(2);
}
const khoa = docKhoa(GOC);
let da = 0;
const chua = [];
for (const muc of ts) {
	const [bo, truong] = muc.split(':');
	const thu = path.join(GOC, 'kiem-dinh/du-lieu', bo);
	const ds = fs.existsSync(thu) ? fs.readdirSync(thu, { recursive: true }).map(String).filter((f) => f.endsWith('.yml')) : [];
	for (const f of ds.sort()) {
		const id = f.replace(/\.yml$/, '').replace(/\\/g, '/');
		if (Object.keys(khoa.ban_ghi).some((k) => k.split('#')[0] === `${bo}/${id}`)) continue;
		const file = path.join(thu, f);
		const doc = parseDocument(fs.readFileSync(file, 'utf8'));
		const nguoi = doc.get('lan').items.at(-1).get('nguoi');
		if (!nguoi.get('review')) nguoi.set('review', review);
		if (!nguoi.get('kiem_mau')) nguoi.set('kiem_mau', kiemMau);
		if (veSite) for (const n of doc.get('nhan_dinh')?.items ?? []) if (n.get('loai') === 've-site' && n.get('review') == null) n.set('review', veSite);
		fs.writeFileSync(file, doc.toString({ lineWidth: 0 }));
		try {
			lenh(['khoa', `du-lieu/${bo}/${id}#${truong}`], GOC, () => {});
			da++;
		} catch (e) {
			chua.push(`${bo}/${id}: ${e.message.split('\n').slice(0, 3).join(' ')}`);
		}
	}
}
console.log(`đã khóa ${da} bản ghi; chưa khóa ${chua.length}:`);
for (const x of chua) console.log('  - ' + x);
