#!/usr/bin/env node
// Áp một file sửa dữ liệu (danh sách { ban_ghi, ly_do, moi: { trường: giá trị } }) vào một bộ của src/data/, giữ chú
// thích và thứ tự trường của file YAML (D2-0). In cũ và mới của từng trường; bản ghi không có thì báo lỗi, không ghi gì.
//   node tools/du_lieu/ap-sua.mjs <bộ> <file sửa>      ví dụ: node tools/du_lieu/ap-sua.mjs nguon plans/lam-lai/bao-cao/d2-0/sua-doi.yml
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, parseDocument } from 'yaml';
import { TEP } from '../../src/du-lieu.mjs';

const GOC = fileURLToPath(new URL('../../', import.meta.url));
const [bo, fileSua] = process.argv.slice(2);
if (!TEP[bo] || !fileSua) {
	console.error('Cách dùng: node tools/du_lieu/ap-sua.mjs <bộ> <file sửa>');
	process.exit(2);
}
const f = path.join(GOC, 'src/data', TEP[bo]);
const doc = parseDocument(fs.readFileSync(f, 'utf8'));
const sua = parse(fs.readFileSync(path.resolve(GOC, fileSua), 'utf8'));
const muc = new Map(doc.contents.items.map((it) => [String(it.get('id')), it]));
const thieu = sua.filter((s) => !muc.has(s.ban_ghi)).map((s) => s.ban_ghi);
if (thieu.length) {
	console.error(`không có bản ghi: ${thieu.join(', ')}; chưa ghi gì`);
	process.exit(1);
}
for (const s of sua) {
	const it = muc.get(s.ban_ghi);
	for (const [k, v] of Object.entries(s.moi)) {
		const cu = it.get(k);
		if (cu === v) continue;
		console.log(`${s.ban_ghi}.${k}: ${JSON.stringify(cu)} -> ${JSON.stringify(v)}`);
		it.set(k, v);
	}
}
fs.writeFileSync(f, doc.toString({ lineWidth: 0 }));
