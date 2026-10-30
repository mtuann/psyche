#!/usr/bin/env node
// Chuyển trang của site cũ sang cú pháp site mới (D1.5): đọc ../psyche-zero/docs/<trang>.md, ghi src/content/docs/<trang>.md
// và hình của trang vào src/hinh/<tên>.html.
//   node tools/chuyen/chuyen.mjs <trang> [<trang>…] [--ghi-de] [--ra <thư mục gốc khác>]
//   node tools/chuyen/chuyen.mjs --tat-ca --ra <thư mục>      chạy thử trên mọi trang cũ, ghi ra thư mục khác
//   <trang>: đường dẫn trong ../psyche-zero/docs/, không có đuôi .md, ví dụ thi-nghiem/asch
// Chỉ đổi cú pháp, không đổi chữ (luật 6 của kế hoạch); cú pháp mới: AGENTS.md, mục "Mẫu trang và khối đặc biệt". Chỗ
// script không tự quyết thì in cảnh báo; trang đích đã có thì không ghi đè nếu thiếu --ghi-de. Kiểm chữ sau khi chuyển:
// tools/chuyen/so-chu.mjs. Khung lấy từ ../opus/tools/chuyen/chuyen.mjs; luật chuyển viết riêng cho cú pháp của Psyche Zero.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';
import { DUONG_GOC } from '../../src/ban-build.mjs';
import { TEN_NHAN } from '../../src/plugins/thanh-phan.mjs';

const GOC = fileURLToPath(new URL('../../', import.meta.url));
export const DOCS_CU = path.resolve(GOC, '..', 'psyche-zero', 'docs');
const RONG = /^\s*$/;

/** Hộp !!! của MkDocs không phải khung nhãn -> aside của Starlight. */
const ASIDE = { note: 'note', info: 'note', tip: 'tip', warning: 'caution', danger: 'danger' };
/** Lớp công cụ của site cũ (<div class="pz-…"></div>, loader.js) -> tên ở ::cong-cu (D8-L1, D8-L2 làm thành phần). */
const CONG_CU = {
	stroop: 'stroop', digitspan: 'do-dai-tri-nho', myths: 'ngo-nhan', mydata: 'du-lieu-cua-toi', nhatky: 'nhat-ky', 'ao-giac': 'ao-giac',
	'mu-thay-doi': 'mu-thay-doi', 'tri-nho-sai': 'tri-nho-sai', wason: 'wason-246', linda: 'linda', ebbinghaus: 'ebbinghaus',
	trinhotu: 'tri-nho-tu', bigfive: 'big-five-mini', neogia: 'neo-gia',
};
/** Lớp pz- của HTML thô được giữ nguyên (site mới có CSS); lớp khác còn sót thì cảnh báo. */
const LOP_DA_CO = new Set(['pz-page-break']);
/** Dòng trạng thái của site cũ ("*Rà soát nội dung lần cuối: tháng 10/2026.*"): nay sinh từ hồ sơ kiem-dinh/ (D1.6). */
export const DONG_RA_SOAT = /^\*Rà soát nội dung lần cuối:[^*]*\*$/;
/** Trường frontmatter cũ bỏ đi: thông tin nay ở trang.yml hay hồ sơ (can_ra_soat, kiem_tra_lan_cuoi), hay của Material. */
const BO_FM = ['can_ra_soat', 'kiem_tra_lan_cuoi', 'hide'];

/** Chữ trong ngoặc vuông của chỉ thị: thoát [ và ]. */
const nhanChiThi = (s) => s.replace(/([[\]])/g, '\\$1');

/**
 * Đổi một URL trong link Markdown: file .md (đường dẫn tương đối theo thư mục của trang) thành địa chỉ trên site mới
 * /psyche/<trang>/ (index.md thành thư mục), giữ #mục. Link ngoài, mailto:, #mục trong trang giữ nguyên.
 */
export function doiLink(url, trang, canhBao = []) {
	if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('#')) return url;
	if (url.startsWith('/')) {
		canhBao.push(`link tuyệt đối, giữ nguyên: ${url}`);
		return url;
	}
	const [duongDan, muc] = url.split('#');
	const dich = path.posix.normalize(path.posix.join(path.posix.dirname(trang), decodeURI(duongDan)));
	if (dich.startsWith('..')) {
		canhBao.push(`link ra ngoài docs/: ${url}`);
		return url;
	}
	const sau = muc !== undefined ? `#${muc}` : '';
	// link dạng thư mục ("stroop/", "../bat-dau/ban-nghi-gi/"): MkDocs để nguyên, trình duyệt tính theo địa chỉ của trang
	// (/psyche-zero/<trang>/, trang mục lục: thư mục của nó), không theo file
	if (duongDan.endsWith('/')) {
		const tu = /(^|\/)index$/.test(trang) ? path.posix.dirname(trang) : trang;
		const t = path.posix.normalize(path.posix.join(tu === '.' ? '' : tu, decodeURI(duongDan))).replace(/\/$/, '');
		if (t.startsWith('..')) {
			canhBao.push(`link ra ngoài site: ${url}`);
			return url;
		}
		if (fs.existsSync(DOCS_CU) && ![`${t}.md`, `${t}/index.md`].some((f) => fs.existsSync(path.join(DOCS_CU, f))))
			canhBao.push(`link tới trang không có ở site cũ: ${url}`);
		return DUONG_GOC + (t && t !== '.' ? t + '/' : '') + sau;
	}
	if (duongDan.endsWith('.md')) {
		const t = dich.slice(0, -3);
		if (fs.existsSync(DOCS_CU) && !fs.existsSync(path.join(DOCS_CU, t + '.md'))) canhBao.push(`link tới trang không có ở site cũ: ${url}`);
		return DUONG_GOC + (t === 'index' ? '' : t.replace(/\/index$/, '') + '/') + sau;
	}
	canhBao.push(`link không phải trang (file tĩnh?), giữ nguyên: ${url}`);
	return url;
}

/** Link trong một dòng: Markdown [chữ](url "tiêu đề"), định nghĩa [id]: url, href="…" của HTML thô; bỏ qua `mã`. */
function doiLinkTrongDong(dong, trang, canhBao) {
	const dinhNghia = /^(\s*\[[^\]]+\]:\s*)(\S+)(.*)$/.exec(dong);
	if (dinhNghia) return dinhNghia[1] + doiLink(dinhNghia[2], trang, canhBao) + dinhNghia[3];
	return dong
		.split(/(`+[^`]*`+)/)
		.map((phan, i) =>
			i % 2
				? phan
				: phan
						.replace(/\]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g, (_, u, t) => `](${doiLink(u, trang, canhBao)}${t})`)
						.replace(/(<a\b[^>]*?\shref=")([^"]+)"/g, (_, dau, u) => `${dau}${doiLink(u, trang, canhBao)}"`),
		)
		.join('');
}

/** Chip nhãn <span class="pz-tag pz-tag--x">Chữ</span> -> :nhan[x]; chữ khác tên nhãn thì giữ HTML, cảnh báo. */
function doiChip(dong, canhBao) {
	return dong.replace(/<span class="pz-tag pz-tag--([a-z-]+)">([^<]*)<\/span>/g, (the, ma, chu) => {
		if (TEN_NHAN[ma] === chu.trim()) return `:nhan[${ma}]`;
		canhBao.push(`chip nhãn "${chu}" (pz-tag--${ma}) khác tên nhãn: giữ HTML`);
		return the;
	});
}

/** Khối thụt 4 dấu cách sau dòng mở (của !!!, ???): [các dòng thân đã bỏ thụt, chỉ số dòng sau khối]. */
function layKhoi(dong, i, thut) {
	const than = [];
	let j = i + 1;
	const vao = thut + '    ';
	while (j < dong.length && (RONG.test(dong[j]) || dong[j].startsWith(vao))) {
		than.push(RONG.test(dong[j]) ? '' : dong[j].slice(vao.length));
		j++;
	}
	while (than.length && than.at(-1) === '') {
		than.pop();
		j--;
	}
	while (than.length && than[0] === '') than.shift();
	return [than, j];
}

/**
 * Câu hỏi "Thử suy ngẫm" của site cũ (thân của <div class="pz-quiz" markdown>): danh sách đánh số, mỗi câu có các lựa
 * chọn "- [ ]" / "- [x]" thụt 4 dấu cách, rồi giải thích (một hay nhiều đoạn). Trả về các dòng của khối ```quiz.
 */
export function doiQuiz(than, trang, canhBao) {
	const ra = ['```quiz'];
	let cau = null;
	const xong = () => {
		if (!cau) return;
		ra.push(`? ${cau.hoi.join(' ')}`, ...cau.chon);
		cau.giai.forEach((doan, k) => ra.push(...(k ? ['>'] : []), `> ${doan.join(' ')}`));
		if (!cau.giai.length) canhBao.push(`câu hỏi "${cau.hoi.join(' ')}" không có giải thích`);
		cau = null;
	};
	for (const l of than) {
		const so = /^\d+\.\s+(.*)$/.exec(l);
		if (so) {
			xong();
			cau = { hoi: [so[1].trim()], chon: [], giai: [], dangDoan: false };
			continue;
		}
		if (!cau) {
			if (!RONG.test(l)) canhBao.push(`chữ trong khối câu hỏi nằm ngoài câu nào: "${l.trim()}"`);
			continue;
		}
		const chon = /^\s{4}- \[([ xX])\]\s+(.*)$/.exec(l);
		if (chon) {
			cau.chon.push(`${chon[1] === ' ' ? '-' : '+'} ${doiLinkTrongDong(chon[2].trim(), trang, canhBao)}`);
			continue;
		}
		if (RONG.test(l)) {
			cau.dangDoan = false;
			continue;
		}
		const chu = doiLinkTrongDong(l.trim(), trang, canhBao);
		if (!cau.chon.length) cau.hoi.push(chu);
		else if (cau.dangDoan) cau.giai.at(-1).push(chu);
		else {
			cau.giai.push([chu]);
			cau.dangDoan = true;
		}
	}
	xong();
	ra.push('```');
	return ra;
}

/** Hình cũ (vùng <!-- fig:tên -->): chép <figure> thành src/hinh/<tên>.html, bỏ markdown="0" và font riêng của SVG. */
export function hinhTuVung(dong) {
	return dong
		.join('\n')
		.trim()
		.replace(/^<figure class="pz-fig" markdown="0">/, '<figure class="pz-fig">')
		.replace(/(<svg\b[^>]*?)\s+font-family="[^"]*"/, '$1')
		.concat('\n');
}

/**
 * Chuyển phần thân (không có frontmatter, không có H1) của một trang. Trả về các dòng mới. `nc`: { trang, canhBao, hinh }
 * (hinh: Map tên -> HTML của hình gặp trong trang). Không đụng vào bên trong khối mã.
 */
function chuyenThan(dong, nc) {
	const { trang, canhBao } = nc;
	const ra = [];
	let rao = null;
	let sauHtml = 0; // khối HTML có Markdown bên trong đang mở
	for (let i = 0; i < dong.length; i++) {
		const l = dong[i];
		const mo = /^(\s*)(`{3,}|~{3,})/.exec(l);
		if (rao) {
			ra.push(l);
			if (mo && mo[2][0] === rao[0] && mo[2].length >= rao.length && l.trim() === mo[2]) rao = null;
			continue;
		}
		if (mo) {
			rao = mo[2];
			ra.push(l);
			continue;
		}

		if (DONG_RA_SOAT.test(l.trim())) {
			canhBao.push(`bỏ dòng "${l.trim()}": dòng trạng thái nay sinh từ hồ sơ kiểm định`);
			while (RONG.test(dong[i + 1] ?? '') && (ra.length === 0 || RONG.test(ra.at(-1)))) i++;
			continue;
		}
		if (/^\s*# /.test(l)) canhBao.push(`tiêu đề cấp 1 thứ hai trở đi giữ nguyên: ${l.trim()}`);

		// Hình: vùng <!-- fig:tên --> … <!-- /fig:tên --> do tools/figures.py của site cũ sinh
		const hinh = /^\s*<!-- fig:([a-z0-9-]+) -->\s*$/.exec(l);
		if (hinh) {
			let j = i + 1;
			while (j < dong.length && !dong[j].includes(`<!-- /fig:${hinh[1]} -->`)) j++;
			if (j === dong.length) throw new Error(`${trang}: thiếu <!-- /fig:${hinh[1]} -->`);
			const html = hinhTuVung(dong.slice(i + 1, j));
			if (!/^<figure class="pz-fig">/.test(html)) canhBao.push(`hình ${hinh[1]}: vùng không phải một <figure class="pz-fig">`);
			if (/(fill|stroke)="#/.test(html)) canhBao.push(`hình ${hinh[1]}: có màu viết cứng, sửa thành currentColor hay lớp pz-fig-a, pz-fig-b`);
			nc.hinh.set(hinh[1], html);
			ra.push(`::hinh{ten="${hinh[1]}"}`);
			i = j;
			continue;
		}

		// Công cụ: <div class="pz-tên" data-…></div> rỗng, JavaScript của site cũ điền vào
		const cc = /^\s*<div class="pz-([a-z0-9-]+)"((?:\s+data-[a-z0-9-]+(?:="[^"]*")?)*)\s*><\/div>\s*$/.exec(l);
		if (cc && CONG_CU[cc[1]]) {
			const tt = [...cc[2].matchAll(/data-([a-z0-9-]+)(?:="([^"]*)")?/g)].map(([, k, v]) => ` ${k}="${v ?? ''}"`);
			ra.push(`::cong-cu{ten="${CONG_CU[cc[1]]}"${tt.join('')}}`);
			continue;
		}

		// Câu hỏi: <div class="pz-quiz" markdown> … </div>
		if (/^<div class="pz-quiz" markdown>\s*$/.test(l)) {
			let j = i + 1;
			while (j < dong.length && dong[j].trim() !== '</div>') j++;
			if (j === dong.length) throw new Error(`${trang}: khối pz-quiz không có </div>`);
			ra.push(...doiQuiz(dong.slice(i + 1, j), trang, canhBao));
			i = j;
			continue;
		}

		// Hộp !!! (khung nhãn hay aside) và khối ??? (thu gọn)
		const hop = /^(\s*)(!!!|\?\?\?\+?)\s+([a-z-]+)((?:\s+[a-z0-9-]+)*)\s*(?:"(.*)"|'(.*)')?\s*$/.exec(l);
		if (hop) {
			const [, thut, dau, loai, lop, nhayKep, nhayDon] = hop;
			const tieuDeCu = nhayKep ?? nhayDon ?? '';
			const tieuDe = tieuDeCu.replace(/\\"/g, '"');
			if (lop.trim()) canhBao.push(`hộp ${dau} ${loai} có lớp riêng (${lop.trim()}): bỏ lớp`);
			const [than, j] = layKhoi(dong, i, thut);
			const thanMoi = chuyenThan(than, nc).map((x) => (x ? thut + x : x));
			let moDau;
			if (dau === '!!!' && TEN_NHAN[loai]) {
				// "Vững chắc: ý chính" -> ý chính; khung nhãn tự hiện chữ của nhãn
				// tiêu đề chỉ là tên nhãn (trang giới thiệu nhãn): khung không có ý chính
				const m = new RegExp(`^${TEN_NHAN[loai]}\\s*:\\s*(.+)$`).exec(tieuDe);
				const y = m ? m[1] : tieuDe === TEN_NHAN[loai] ? '' : tieuDe;
				if (!m && y) canhBao.push(`khung ${loai} có tiêu đề không mở bằng "${TEN_NHAN[loai]}:": "${tieuDe}" (giữ cả tiêu đề làm ý chính)`);
				moDau = `:::${loai}${y ? `[${nhanChiThi(y)}]` : ''}`;
			} else if (dau === '!!!') {
				const kieu = ASIDE[loai] ?? (canhBao.push(`hộp !!! ${loai} chưa có trong bảng: thành note`), 'note');
				moDau = `:::${kieu}${tieuDe ? `[${nhanChiThi(tieuDe)}]` : ''}`;
			} else {
				if (dau === '???+') canhBao.push(`khối ???+ (mở sẵn) "${tieuDe}": khối thu gọn mới luôn đóng`);
				moDau = `:::thu-gon[${nhanChiThi(tieuDe || 'Xem thêm')}]`;
			}
			ra.push(thut + moDau, ...thanMoi, `${thut}:::`);
			i = j - 1;
			continue;
		}

		// HTML có Markdown bên trong (md_in_html): bỏ thuộc tính markdown, cách dòng trống để Markdown bên trong được đọc
		const md = /^(\s*<[a-z]+\b[^>]*?)\s+markdown(?:="[^"]*")?(\s*>)\s*$/.exec(l);
		if (md) {
			ra.push(md[1] + md[2], '');
			sauHtml++;
			continue;
		}
		if (sauHtml && /^\s*<\/(div|section|article|aside)>\s*$/.test(l)) {
			if (ra.length && ra.at(-1) !== '') ra.push('');
			ra.push(l);
			sauHtml--;
			continue;
		}
		ra.push(doiChip(doiLinkTrongDong(l, trang, canhBao), canhBao));
	}
	return ra;
}

/** Tiêu đề của Starlight là chữ thường, không đọc Markdown: bỏ dấu nghiêng, đậm, mã, link. */
const tieuDeTho = (s) => s.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/(\*\*|\*|__|_|`)(.+?)\1/g, '$2');

/**
 * Chuyển nguyên một trang. Trả về { noiDung, canhBao, hinh } (hinh: Map tên -> HTML hình).
 * Tiêu đề trang là H1 của trang cũ (chữ người đọc thấy); title cũ khác H1 thì thành tên trong menu (sidebar.label).
 */
export function chuyenTrang(md, { trang }) {
	const canhBao = [];
	const hinh = new Map();
	let fmCu = {};
	let than = md;
	const fm = /^---\n([\s\S]*?)\n---\n/.exec(md);
	if (fm) {
		fmCu = parse(fm[1]) ?? {};
		than = md.slice(fm[0].length);
	}
	const dong = than.replace(/\r\n/g, '\n').split('\n');
	while (dong.length && RONG.test(dong[0])) dong.shift();
	// tiêu đề trang: dòng "# …" đầu tiên (thường là dòng đầu; vài trang có hộp cảnh báo hay khối HTML đứng trước)
	const iH1 = dong.findIndex((l) => /^# \S/.test(l));
	if (iH1 < 0) throw new Error(`${trang}: không có tiêu đề # …`);
	if (iH1 > 0) canhBao.push(`có ${dong.slice(0, iH1).filter((l) => !RONG.test(l)).length} dòng đứng trước tiêu đề # …: nay nằm sau tiêu đề (đầu bài)`);
	const h1 = /^# (.+?)\s*$/.exec(dong[iH1]);
	dong.splice(iH1, 1);
	while (RONG.test(dong[iH1] ?? 'x') && (iH1 === 0 || RONG.test(dong[iH1 - 1]))) dong.splice(iH1, 1);
	while (dong.length && RONG.test(dong[0])) dong.shift();
	const tieuDe = tieuDeTho(h1[1]);
	if (tieuDe !== h1[1]) canhBao.push(`tiêu đề bỏ định dạng Markdown: ${h1[1]}`);

	const { title, description, search, ...con } = fmCu;
	for (const k of BO_FM) if (k in con) (canhBao.push(`bỏ trường ${k} của frontmatter cũ`), delete con[k]);
	const dau = { title: tieuDe, ...(description && { description }) };
	if (title && title !== tieuDe) dau.sidebar = { label: title };
	if (search?.exclude) dau.pagefind = false;
	Object.assign(dau, con);
	const moi = chuyenThan(dong, { trang, canhBao, hinh });
	while (moi.length && moi.at(-1) === '') moi.pop();
	const conSot = new Set(
		moi
			.join('\n')
			.match(/class="[^"]*"/g)
			?.flatMap((c) => c.slice(7, -1).split(/\s+/))
			.filter((c) => c.startsWith('pz-') && !LOP_DA_CO.has(c)),
	);
	for (const c of conSot) canhBao.push(`lớp ${c} còn trong HTML thô: site cũ có CSS hay JavaScript cho lớp này, site mới chưa có`);
	// trang không được có khoảng trắng cuối dòng (chuan-kiem-dinh.md mục 7: không vào mã băm)
	const noiDung = `---\n${stringify(dau, { lineWidth: 0 })}---\n\n${moi.join('\n')}\n`.replace(/[ \t]+$/gm, '');
	return { noiDung, canhBao, hinh };
}

/** Mọi trang của site cũ (đường dẫn trong docs/, bỏ .md), theo thứ tự chữ cái. */
export function tatCaTrangCu() {
	return fs
		.readdirSync(DOCS_CU, { recursive: true })
		.map(String)
		.filter((f) => f.endsWith('.md'))
		.map((f) => f.replace(/\\/g, '/').replace(/\.md$/, ''))
		.sort();
}

// ---------- Dòng lệnh ----------
if (import.meta.main) {
	const thamSo = process.argv.slice(2);
	const ghiDe = thamSo.includes('--ghi-de');
	const iRa = thamSo.indexOf('--ra');
	const goc = iRa >= 0 ? path.resolve(thamSo[iRa + 1]) : GOC;
	if (!fs.existsSync(DOCS_CU)) {
		console.error(`Không có ${DOCS_CU}: clone site cũ cạnh thư mục này (AGENTS.md, Site cũ và repo mẫu)`);
		process.exit(2);
	}
	const trangs = thamSo.includes('--tat-ca') ? tatCaTrangCu() : thamSo.filter((t, i) => !t.startsWith('--') && (iRa < 0 || i !== iRa + 1));
	if (!trangs.length) {
		console.error('Cần ít nhất một trang, ví dụ: node tools/chuyen/chuyen.mjs thi-nghiem/asch');
		process.exit(2);
	}
	let loi = 0;
	let soCanhBao = 0;
	for (const trang of trangs.map((t) => t.replace(/\.md$/, ''))) {
		const nguon = path.join(DOCS_CU, trang + '.md');
		const dich = path.join(goc, 'src', 'content', 'docs', trang + '.md');
		try {
			if (!fs.existsSync(nguon)) throw new Error(`không có ${path.relative(GOC, nguon)}`);
			if (fs.existsSync(dich) && !ghiDe) throw new Error(`${path.relative(goc, dich)} đã có; thêm --ghi-de nếu muốn chuyển lại`);
			const { noiDung, canhBao, hinh } = chuyenTrang(fs.readFileSync(nguon, 'utf8'), { trang });
			fs.mkdirSync(path.dirname(dich), { recursive: true });
			fs.writeFileSync(dich, noiDung);
			for (const [ten, html] of hinh) {
				const f = path.join(goc, 'src', 'hinh', `${ten}.html`);
				if (fs.existsSync(f) && fs.readFileSync(f, 'utf8') !== html) {
					if (!ghiDe) {
						canhBao.push(`src/hinh/${ten}.html đã có và khác hình của trang cũ: giữ file cũ (--ghi-de để chép lại)`);
						continue;
					}
				}
				fs.mkdirSync(path.dirname(f), { recursive: true });
				fs.writeFileSync(f, html);
			}
			soCanhBao += canhBao.length;
			console.log(`${trang}: đã ghi ${path.relative(goc, dich)}${hinh.size ? ` và ${hinh.size} hình` : ''}${canhBao.length ? `, ${canhBao.length} cảnh báo:` : ''}`);
			for (const c of [...new Set(canhBao)]) console.log(`  - ${c}`);
		} catch (e) {
			console.error(`${trang}: ${e.message}`);
			loi++;
		}
	}
	if (trangs.length > 1) console.log(`\n${trangs.length} trang, ${loi} lỗi, ${soCanhBao} cảnh báo.`);
	process.exit(loi ? 1 : 0);
}
