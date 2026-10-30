#!/usr/bin/env node
// Sinh hồ sơ kiểm định cho nguồn có DOI (D2-0, mức V1: plans/ben-vung/chuan-kiem-dinh.md mục 3, 6): mỗi nguồn một file
// kiem-dinh/du-lieu/nguon/<id>.yml, mỗi trường một nhận định (tác giả, năm, tên bài, nơi đăng, loại và DOI).
// - Lượt 1: Crossref (phản hồi đã lưu ở .cache/doi/ bởi tools/du_lieu/doi.mjs); chỗ dữ liệu đã sửa theo Crossref lấy từ
//   các file sửa (plans/lam-lai/bao-cao/d2-0/sua-*.yml) và ghi ket_qua: da-sua.
// - Lượt 2: OpenAlex (nguồn độc lập); chỗ OpenAlex không khớp mà người kiểm lượt 2 (agent) đã mở trang nhà xuất bản thì lấy
//   kết quả của người ấy (--luot-2 <file>: danh sách { id, ket_qua, nguon, ghi_chu }).
// Nguồn còn lệch sau hai lượt thì không sinh hồ sơ (in ra để xử lý tay). Hồ sơ đã có thì không ghi đè, trừ khi --ghi-de.
//   node tools/du_lieu/ho-so-nguon.mjs [--luot-2 <file>] [--ghi-de] [--nguoi-luot-1 "…"] [--nguoi-luot-2 "…"]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';
import { soBanGhi, tuCrossref, tuOpenAlex } from './doi.mjs';

const GOC = fileURLToPath(new URL('../../', import.meta.url));
const ts = process.argv.slice(2);
const lay = (k, md) => (ts.includes(k) ? ts[ts.indexOf(k) + 1] : md);
const ghiDe = ts.includes('--ghi-de');
const NGUOI_1 = lay('--nguoi-luot-1', 'script tools/du_lieu/doi.mjs (Crossref); Claude Opus 5.5 xem và sửa chỗ lệch');
const NGUOI_2 = lay('--nguoi-luot-2', 'script tools/du_lieu/doi.mjs (OpenAlex); Claude Sonnet 5.5 (agent riêng) mở trang nhà xuất bản ở chỗ lệch');

const docDem = (nguon, doi) => {
	const f = path.join(GOC, '.cache', 'doi', nguon, encodeURIComponent(doi.toLowerCase()) + '.json');
	return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : undefined;
};

/** Chỗ đã sửa theo các file sửa: id -> { trường: { cu, moi, ly_do } } (cũ lấy từ bản ghi trước khi sửa, nếu có). */
function daSua() {
	const thu = path.join(GOC, 'plans/lam-lai/bao-cao/d2-0');
	const ra = new Map();
	for (const f of fs.existsSync(thu) ? fs.readdirSync(thu).filter((x) => /^sua-.*\.yml$/.test(x)).sort() : []) {
		for (const s of parse(fs.readFileSync(path.join(thu, f), 'utf8')) ?? []) {
			const m = ra.get(s.ban_ghi) ?? {};
			for (const k of Object.keys(s.moi)) m[k] = { ly_do: s.ly_do, file: f };
			ra.set(s.ban_ghi, m);
		}
	}
	return ra;
}

const LOAI_CROSSREF = { 'journal-article': 'bai-bao', book: 'sach', monograph: 'sach', 'edited-book': 'sach', 'book-chapter': 'chuong-sach', 'reference-entry': 'chuong-sach', report: 'bao-cao' };
const TEN_LOAI = { 'bai-bao': 'bài báo', sach: 'sách', 'chuong-sach': 'chương sách', 'bao-cao': 'báo cáo', 'trang-web': 'trang web', khac: 'tài liệu khác' };

const tacGiaCr = (j) => (j?.message?.author ?? j?.message?.editor ?? []).map((a) => [a.family ?? a.name, a.given].filter(Boolean).join(', ')).join('; ');
const tacGiaOa = (j) => (j?.authorships ?? []).map((a) => a.author?.display_name).filter(Boolean).join('; ');

const luot2 = new Map((lay('--luot-2') ? parse(fs.readFileSync(path.resolve(GOC, lay('--luot-2')), 'utf8')) : []).map((x) => [x.id, x]));
const sua = daSua();
const nguon = parse(fs.readFileSync(path.join(GOC, 'src/data/nguon.yml'), 'utf8')).filter((r) => r.doi);
const conLech = [];
let ghi = 0;
let boQua = 0;
for (const r of nguon) {
	const jc = docDem('crossref', r.doi);
	const jo = docDem('openalex', r.doi);
	if (jc === undefined || jo === undefined) {
		conLech.push(`${r.id}: chưa có phản hồi lưu đệm (chạy node tools/du_lieu/doi.mjs)`);
		continue;
	}
	const cr = tuCrossref(jc);
	const oa = tuOpenAlex(jo);
	const l1 = soBanGhi(r, cr);
	const l2 = soBanGhi(r, oa);
	const k2 = luot2.get(r.id);
	// lượt 1 phải khớp Crossref, trừ khi người kiểm lượt 2 đã mở trang nhà xuất bản và xác nhận (năm số hóa của Crossref)
	if (l1.length && k2?.ket_qua !== 'dung') {
		conLech.push(`${r.id}: Crossref lệch (${l1.join('; ')})`);
		continue;
	}
	if (l2.length && !k2) {
		conLech.push(`${r.id}: OpenAlex lệch, chưa có kết quả lượt 2 của người kiểm (${l2.join('; ')})`);
		continue;
	}
	if (k2 && k2.ket_qua !== 'dung') {
		conLech.push(`${r.id}: người kiểm lượt 2 ghi ${k2.ket_qua} (${k2.ghi_chu ?? ''})`);
		continue;
	}
	const f = path.join(GOC, 'kiem-dinh/du-lieu/nguon', `${r.id}.yml`);
	if (fs.existsSync(f) && !ghiDe) {
		boQua++;
		continue;
	}
	const linkCr = `https://api.crossref.org/works/${encodeURIComponent(r.doi)}`;
	const linkOa = `https://api.openalex.org/works/doi:${encodeURIComponent(r.doi)}`;
	const s = sua.get(r.id) ?? {};
	/** Lượt 2 của một nhận định: OpenAlex khớp, hay kết quả của người kiểm khi OpenAlex lệch ở trường ấy. */
	const l2Cua = (tu) => {
		const lechTruong = l2.filter((x) => x.startsWith(tu));
		const lech1 = l1.filter((x) => x.startsWith(tu));
		if (!lechTruong.length && !lech1.length) return { luot_2: 'dung', luot_2_nguon: [linkOa] };
		return {
			luot_2: 'dung',
			luot_2_nguon: k2.nguon,
			luot_2_ghi_chu: `${[...lech1.map((x) => 'Crossref: ' + x), ...lechTruong.map((x) => 'OpenAlex: ' + x)].join('; ')}. Người kiểm lượt 2 mở trang nhà xuất bản: ${k2.ghi_chu}`,
		};
	};
	const ket = (...truong) => {
		const cs = truong.map((t) => s[t]).filter(Boolean);
		return cs.length ? { ket_qua: 'da-sua', ghi_chu: `đã sửa theo Crossref (${cs[0].file}): ${cs[0].ly_do}` } : { ket_qua: 'dung' };
	};
	const nd = [
		{ id: 'n1', cau: `Tác giả: ${r.tac_gia}`, loai: 'lich-su', truong: ['tac_gia'], nguon: ['crossref'], trich: tacGiaCr(jc) || '(Crossref không ghi tác giả)', ...ket('tac_gia'), ...l2Cua('tác giả'), luot_2_trich: tacGiaOa(jo) || undefined },
		{ id: 'n2', cau: `Năm xuất bản: ${r.nam}`, loai: 'lich-su', truong: ['nam'], nguon: ['crossref'], trich: `năm in hay xuất bản: ${cr.nam}; các năm Crossref ghi: ${[...new Set(cr.namCacBan)].join(', ')}`, ...ket('nam'), ...l2Cua('năm') },
		{ id: 'n3', cau: `Tên: ${r.ten}`, loai: 'lich-su', truong: ['ten'], nguon: ['crossref'], trich: cr.ten, ...ket('ten'), ...l2Cua('tên') },
		...(r.noi_dang
			? [{ id: 'n4', cau: `Nơi đăng: ${r.noi_dang}`, loai: 'lich-su', truong: ['noi_dang'], nguon: ['crossref'], trich: [cr.tapChi, cr.tap && `tập ${cr.tap}`, cr.so && `số ${cr.so}`, cr.trang && `trang ${cr.trang}`].filter(Boolean).join(', ') || '(Crossref không ghi nơi đăng)', ...ket('noi_dang'), ...l2Cua('tạp chí') }]
			: []),
		{
			id: 'n5',
			cau: `DOI ${r.doi} trỏ tới tài liệu này, một ${TEN_LOAI[r.loai]}`,
			loai: 'lich-su',
			truong: ['doi', 'loai'],
			nguon: ['crossref'],
			trich: `loại theo Crossref: ${cr.loai}`,
			...ket('doi', 'loai'),
			luot_2: 'dung',
			luot_2_nguon: [linkOa],
		},
	];
	for (const n of nd) for (const k of Object.keys(n)) if (n[k] === undefined) delete n[k];
	if (LOAI_CROSSREF[cr.loai] && LOAI_CROSSREF[cr.loai] !== r.loai) nd.at(-1).ghi_chu = [nd.at(-1).ghi_chu, `Crossref ghi loại ${cr.loai}, bản ghi ghi ${r.loai}`].filter(Boolean).join('; ');
	const hs = {
		ban_ghi: `nguon/${r.id}`,
		muc: 'V1',
		lan: [{ so: 1, ngay: null, nhanh: 'moi/d2-0-du-lieu', ma_bam: null, nguoi: { luot_1: NGUOI_1, luot_2: NGUOI_2, review: null, kiem_mau: null } }],
		nguon: [
			{ id: 'crossref', ten: `Bản ghi Crossref của DOI ${r.doi}`, link: linkCr },
			{ id: 'openalex', ten: `Bản ghi OpenAlex của DOI ${r.doi}`, link: linkOa },
		],
		nhan_dinh: nd,
	};
	fs.mkdirSync(path.dirname(f), { recursive: true });
	fs.writeFileSync(f, `# Hồ sơ kiểm định (D2-0, V1: siêu dữ liệu xuất bản), sinh bằng tools/du_lieu/ho-so-nguon.mjs. Khóa: node tools/khoa.mjs khoa du-lieu/nguon/${r.id}#…\n` + stringify(hs, { lineWidth: 0 }));
	ghi++;
}
console.log(`${nguon.length} nguồn có DOI: ghi ${ghi} hồ sơ, giữ ${boQua} hồ sơ đã có, ${conLech.length} còn lệch:`);
for (const x of conLech) console.log('  - ' + x);
