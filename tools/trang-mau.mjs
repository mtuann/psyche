// Trang mẫu cho kiểm thử trình duyệt và Lighthouse (chép từ ../opus/tools/, việc D1.7 của opus): lấy từ chính bản build,
// để trang của mọi lô đều được kiểm. Thứ tự: trang chủ, trang 404, các trang nhánh đang làm đã đổi so với main (tối đa TOI_DA_TRANG_DOI: trang của lô), rồi
// với mỗi loại khối, trang đầu tiên (theo thứ tự chữ cái) có khối ấy; cộng trang ghi trong biến môi trường PSYCHE_TRANG
// ("thi-nghiem/asch/,trai-nghiem/stroop/").
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = fileURLToPath(new URL('../', import.meta.url));

/**
 * Dấu hiệu của từng loại khối trong HTML đã dựng. D1.1 mới có bảng và khối thu gọn của Markdown; thành phần của Psyche
 * (nhãn mức độ chắc chắn, câu hỏi, công cụ, hình, "sắp có") thêm dấu hiệu vào đây ở lô làm ra chúng (D1.4, D1.5).
 */
export const KHOI = {
	'bảng': '<table',
	'khối thu gọn': '<details',
	'hộp ghi chú': 'class="starlight-aside',
};

/** Số trang đã đổi của nhánh được lấy làm mẫu: một lô có tới khoảng 8 trang. */
export const TOI_DA_TRANG_DOI = 8;

/** File HTML của một trang mẫu ("" là trang chủ, "404.html", "thi-nghiem/x/"). */
export const fileCua = (dist, t) => path.join(dist, t.endsWith('.html') ? t : path.join(t, 'index.html'));

/** Mọi trang của bản build, theo thứ tự chữ cái: "", "404.html", "thi-nghiem/asch/"… */
function tatCa(dist) {
	return fs
		.readdirSync(dist, { recursive: true })
		.map((f) => f.replace(/\\/g, '/'))
		.filter((f) => f.endsWith('index.html') && !f.startsWith('pagefind/') && !f.startsWith('_astro/'))
		.map((f) => f.slice(0, -'index.html'.length))
		.sort();
}

/** Trang (trong src/content/docs/) nhánh đang làm đã đổi so với main; rỗng nếu đang ở main hay không đọc được git. */
export function trangDaDoi(goc = GOC) {
	const git = (...ts) => execFileSync('git', ['-C', goc, ...ts], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
	try {
		const nen = ['main', 'origin/main'].find((b) => {
			try {
				return git('rev-parse', '--verify', '--quiet', `${b}^{commit}`);
			} catch {
				return false;
			}
		});
		if (!nen) return [];
		const doi = git('diff', '--name-only', '--diff-filter=AM', git('merge-base', 'HEAD', nen), '--', 'src/content/docs');
		return doi
			.split('\n')
			.map((f) => /^src\/content\/docs\/(.+)\.md$/.exec(f)?.[1])
			.filter(Boolean)
			.map((t) => (t === 'index' ? '' : t.replace(/(^|\/)index$/, '') + '/').replace(/^\/$/, ''));
	} catch {
		return [];
	}
}

/** Danh sách trang mẫu của bản build ở `dist`. */
export function trangMau(dist, goc = GOC) {
	if (!fs.existsSync(path.join(dist, 'index.html'))) throw new Error(`Chưa có ${path.relative(goc, dist) || dist}/index.html: chạy npm run build (hay build:xem) trước.`);
	const co = tatCa(dist);
	const html = new Map(co.map((t) => [t, fs.readFileSync(fileCua(dist, t), 'utf8')]));
	const ra = ['', ...(fs.existsSync(path.join(dist, '404.html')) ? ['404.html'] : [])];
	ra.push(...trangDaDoi(goc).filter((t) => html.has(t)).slice(0, TOI_DA_TRANG_DOI));
	for (const dau of Object.values(KHOI)) {
		const t = co.find((x) => x && html.get(x).includes(dau));
		if (t !== undefined) ra.push(t);
	}
	for (const t of (process.env.PSYCHE_TRANG ?? '').split(',').map((x) => x.trim()).filter(Boolean)) {
		const t2 = t.endsWith('.html') || t.endsWith('/') ? t : t + '/';
		if (!fs.existsSync(fileCua(dist, t2))) throw new Error(`PSYCHE_TRANG: bản build không có trang ${t2}`);
		ra.push(t2);
	}
	return [...new Set(ra)];
}
