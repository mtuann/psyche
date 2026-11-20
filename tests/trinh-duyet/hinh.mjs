// Đo hình trên trình duyệt (kế hoạch nâng cấp H1; quy chuẩn plans/nang-cap/hinh.md mục 3.1, 3.4). Chạy riêng (npm run
// test:hinh, job "hinh" của CI), không nằm trong npm run test:trinh-duyet (tên file không khớp kiem-*.mjs). Chromium.
// - Mọi trang của bản build có hình tĩnh (.pz-fig), không chỉ trang mẫu: lô nâng cấp có thể đổi nhiều trang hơn số trang
//   mẫu.
// - Ở 360 px và 1280 px: đo mọi <text> đang hiện: cỡ chữ thật (cỡ trong SVG nhân tỉ lệ dựng), chữ đè nhau, chữ ra ngoài
//   SVG. Hình theo chuẩn mới (data-chuan="2"): chặn khi chữ dưới 11 px ở 360 px, đè nhau hay ra ngoài; hình cũ chỉ ghi ra
//   (cảnh báo) cùng số đo. 320 px: chỉ cảnh báo (chữ khoảng 10 px là chấp nhận).
// - axe ở hai chế độ sáng, tối, chỉ trong vùng hình.
// Số đo (chữ nhỏ nhất của mỗi hình) in ra để chép vào báo cáo lô.
import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import { DIST, choTimKiem, dongMayChu, goc, khongChromium } from './chung.mjs';

after(dongMayChu);
const AXE = createRequire(import.meta.url).resolve('axe-core/axe.min.js');
const NHAN = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const CHU_TOI_THIEU = 11;

/** Trang của bản build có hình tĩnh, trừ Sách in (gộp mọi hình, đo ở trang của từng bài). */
const TRANG_HINH = fs
	.readdirSync(DIST, { recursive: true })
	.map((f) => String(f).replace(/\\/g, '/'))
	.filter((f) => f.endsWith('index.html') && !f.startsWith('sach/') && fs.readFileSync(path.join(DIST, f), 'utf8').includes('<figure class="pz-fig"'))
	.map((f) => f.slice(0, -'index.html'.length))
	.sort();

/** Chạy trong trang: số đo của mỗi hình đang hiện. */
function doHinh() {
	const ra = [];
	for (const fig of document.querySelectorAll('.sl-markdown-content figure.pz-fig')) {
		const ten = fig.closest('[id]')?.id ?? '';
		for (const svg of fig.querySelectorAll('svg')) {
			const hop = svg.getBoundingClientRect();
			if (!hop.width || getComputedStyle(svg).display === 'none') continue;
			const tiLe = hop.width / (svg.viewBox.baseVal?.width || hop.width);
			const chu = [...svg.querySelectorAll('text')]
				.map((t) => ({ t, r: t.getBoundingClientRect() }))
				.filter(({ r }) => r.width > 0 && r.height > 0);
			const co = chu.map(({ t }) => parseFloat(getComputedStyle(t).fontSize) * tiLe);
			const ngoai = chu.filter(({ r }) => r.left < hop.left - 1 || r.right > hop.right + 1 || r.top < hop.top - 1 || r.bottom > hop.bottom + 1).map(({ t }) => t.textContent.trim());
			const de = [];
			for (let i = 0; i < chu.length; i++)
				for (let j = i + 1; j < chu.length; j++) {
					const a = chu[i].r;
					const b = chu[j].r;
					const x = Math.min(a.right, b.right) - Math.max(a.left, b.left);
					const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
					// đè thật (quá 2 px mỗi chiều), không tính hai dòng sát nhau
					if (x > 2 && y > 2) de.push(`${chu[i].t.textContent.trim()} / ${chu[j].t.textContent.trim()}`);
				}
			ra.push({
				ten: svg.getAttribute('aria-label')?.slice(0, 60) ?? ten,
				chuan2: fig.dataset.chuan === '2',
				nhoNhat: co.length ? Math.min(...co) : null,
				ngoai,
				de,
			});
		}
	}
	return ra;
}

test('hình: cỡ chữ, chữ đè, chữ ra ngoài (360, 1280 px; 320 px cảnh báo); axe sáng, tối trong vùng hình', { skip: khongChromium || (!TRANG_HINH.length && 'bản build không có hình') }, async (t) => {
	const trinhDuyet = await chromium.launch();
	const canhBao = [];
	const soDo = new Map();
	try {
		for (const [w, scheme] of [
			[360, 'dark'],
			[1280, 'light'],
			[320, 'light'],
		]) {
			const ctx = await trinhDuyet.newContext({ viewport: { width: w, height: 800 }, colorScheme: scheme });
			for (const trang of TRANG_HINH)
				await t.test(`${w} px: ${trang}`, async () => {
					const p = await ctx.newPage();
					await p.goto((await goc()) + trang, { waitUntil: 'load' });
					await p.evaluate(() => document.fonts.ready);
					const loi = [];
					for (const h of await p.evaluate(doHinh)) {
						const ghi = h.chuan2 && w !== 320 ? loi : canhBao;
						const nhan = `${trang} ${w} px «${h.ten}»`;
						if (w === 360) soDo.set(`${trang} «${h.ten}»`, h.nhoNhat);
						if (w !== 1280 && h.nhoNhat !== null && h.nhoNhat < CHU_TOI_THIEU - (w === 320 ? 1 : 0)) ghi.push(`${nhan}: chữ nhỏ nhất ${h.nhoNhat.toFixed(1)} px`);
						if (h.de.length) ghi.push(`${nhan}: chữ đè nhau: ${h.de.slice(0, 3).join('; ')}`);
						if (h.ngoai.length) ghi.push(`${nhan}: chữ ra ngoài hình: ${h.ngoai.slice(0, 3).join('; ')}`);
					}
					if (w !== 320) {
						await p.addScriptTag({ path: AXE });
						const vp = await p.evaluate(
							async (nhan) =>
								(await axe.run({ include: [['.sl-markdown-content figure.pz-fig']] }, { runOnly: { type: 'tag', values: nhan } })).violations.map(
									(v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`,
								),
							NHAN,
						);
						loi.push(...vp.map((v) => `${trang} ${w} px axe ${v}`));
					}
					await choTimKiem(p);
					await p.close();
					assert.deepEqual(loi, []);
				});
			await ctx.close();
		}
	} finally {
		await trinhDuyet.close();
	}
	t.diagnostic(`số đo ở 360 px (chữ nhỏ nhất, px): ${[...soDo].map(([k, v]) => `${k} ${v?.toFixed(1)}`).join('; ')}`);
	if (canhBao.length) t.diagnostic(`cảnh báo (hình cũ, hay 320 px; không chặn), ${canhBao.length} mục: ${canhBao.join(' | ')}`);
});
