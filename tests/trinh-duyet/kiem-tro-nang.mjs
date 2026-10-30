// Trợ năng (axe-core, WCAG 2.2 AA và best-practice) trên các trang mẫu, Chromium, 360 px tối và 1280 px sáng, sau khi
// các khối đã khởi tạo và đã bấm thử một câu hỏi (để kiểm cả trạng thái sau khi dùng). Chép từ ../opus/tests/trinh-duyet/.
import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import { TRANG, cuonHet, dongMayChu, goc, khongChromium, tenTrang } from './chung.mjs';

after(dongMayChu);
const AXE = createRequire(import.meta.url).resolve('axe-core/axe.min.js');
const NHAN = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

test('axe: không vi phạm', { skip: khongChromium }, async (t) => {
	const trinhDuyet = await chromium.launch();
	try {
		// hai tổ hợp đủ cả hai cỡ và hai chế độ màu (bốn tổ hợp gấp đôi thời gian mà chưa bắt thêm lỗi nào): độ tương phản
		// theo chế độ màu, bố cục theo cỡ màn hình
		for (const [w, h, scheme] of [
			[360, 780, 'dark'],
			[1280, 800, 'light'],
		]) {
			const ctx = await trinhDuyet.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
			for (const trang of TRANG)
				await t.test(`${w} px, ${scheme === 'dark' ? 'tối' : 'sáng'}: ${tenTrang(trang)}`, async () => {
					const p = await ctx.newPage();
					await p.goto((await goc()) + trang, { waitUntil: 'load' });
					await cuonHet(p);
					const nut = p.locator('.pz-quiz button').first();
					if (await nut.count()) await nut.click();
					await p.addScriptTag({ path: AXE });
					const vp = await p.evaluate(
						async (nhan) =>
							(await axe.run(document, { runOnly: { type: 'tag', values: nhan } })).violations.map(
								(v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`,
							),
						NHAN,
					);
					assert.deepEqual(vp, []);
					await p.close();
				});
			await ctx.close();
		}
	} finally {
		await trinhDuyet.close();
	}
});
