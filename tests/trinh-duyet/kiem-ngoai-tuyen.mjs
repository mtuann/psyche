// Dùng khi mất mạng (D8-L4): service worker /psyche/sw.js đăng ký sau khi trang tải xong, điều khiển trang; trang đã mở
// đọc lại được khi mất mạng; trang chưa mở thì hiện trang "Đang mất mạng" (có lời dẫn tới Hỗ trợ, trang Hỗ trợ lưu sẵn);
// bộ nhớ đệm mang đúng phiên bản của bản build; người đọc tắt (tùy chọn "ngoai-tuyen" trong khóa "psyche-zero") thì service
// worker bị gỡ và bộ nhớ đệm bị xóa ở lần mở trang sau. Máy chủ kiểm thử là http://127.0.0.1 (trình duyệt coi là an toàn,
// cho đăng ký service worker). Bản build tắt (PSYCHE_NGOAI_TUYEN=tat) thì bỏ qua.
import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DIST, TRANG, TRINH_DUYET, dongMayChu, goc } from './chung.mjs';

after(dongMayChu);

const co = (t) => fs.existsSync(path.join(DIST, t, 'index.html'));
const phienBan = /const PHIEN_BAN = '([0-9a-f]+)';/.exec(fs.readFileSync(path.join(DIST, 'sw.js'), 'utf8'))?.[1];
// trang đã mở để lưu, trang chưa mở: lấy trang có trong bản build
const DA_MO = ['thi-nghiem/asch', 'bat-dau', 'them/gioi-thieu'].find(co);
const CHUA_MO = ['bang-chung', 'kham-pha', 'thi-nghiem'].find((t) => co(t) && t !== DA_MO);

// Mỗi trang nạp ô tìm kiếm (module ui-core của Pagefind) lúc trình duyệt rảnh, sau DOMContentLoaded. Chuyển trang khi module
// còn đang nạp thì Firefox báo lỗi "error loading dynamically imported module" (lỗi của phép thử, không phải của trang;
// nguồn của lần hỏng thỉnh thoảng ngày 17/11/2026, nc0 S4). Nên trước khi rời một trang có mạng, chờ ô tìm kiếm dựng xong.
const choTimKiem = (p) => p.waitForFunction(() => !!document.querySelector('#starlight__search .pagefind-ui'), null, { timeout: 20000 });

async function kiemMatMang(ctx, p, g, tieuDe) {
	await ctx.setOffline(true);
	try {
		await p.goto(g + DA_MO + '/', { waitUntil: 'load' });
		assert.equal(await p.title(), tieuDe, 'trang đã mở đọc lại được khi mất mạng');
		if (CHUA_MO) {
			const r = await p.goto(g + CHUA_MO + '/', { waitUntil: 'load' });
			assert.equal(r?.status(), 503);
			await p.getByRole('heading', { name: 'Đang mất mạng' }).waitFor();
			if (co('ho-tro')) {
				await p.getByRole('link', { name: 'Trang Hỗ trợ' }).click();
				await p.waitForURL(/\/ho-tro\/$/);
				assert.match(await p.title(), /Hỗ trợ/);
			}
		}
	} finally {
		await ctx.setOffline(false);
	}
}

for (const [ten, loai] of Object.entries(TRINH_DUYET)) {
	test(`dùng khi mất mạng, ${ten}`, { skip: (!phienBan && 'sw.js tự gỡ (PSYCHE_NGOAI_TUYEN=tat)') || (!DA_MO && 'không có trang mẫu') }, async () => {
		const trinhDuyet = await loai.launch();
		const ctx = await trinhDuyet.newContext();
		try {
			const p = await ctx.newPage();
			const loi = [];
			p.on('pageerror', (e) => loi.push(String(e)));
			const g = await goc();
			await p.goto(g, { waitUntil: 'load' });
			await p.waitForFunction(() => !!navigator.serviceWorker?.controller, null, { timeout: 20000 });
			await choTimKiem(p);
			assert.deepEqual(
				await p.evaluate(async () => (await caches.keys()).filter((k) => k.startsWith('psyche-moi-'))),
				[`psyche-moi-${phienBan}`],
				'bộ nhớ đệm mang phiên bản của bản build',
			);
			await p.goto(g + DA_MO + '/', { waitUntil: 'load' });
			const tieuDe = await p.title();
			await choTimKiem(p);
			if (co('ho-tro'))
				await p.waitForFunction(async () => !!(await caches.match(location.origin + '/psyche/ho-tro/')), null, { timeout: 10000 });

			// Firefox của Playwright: chế độ mất mạng giả (setOffline) không chặn yêu cầu đi qua service worker, nên phần đọc khi
			// mất mạng chỉ kiểm trên Chromium và WebKit; Firefox vẫn kiểm đăng ký, phiên bản, lưu sẵn Hỗ trợ và tắt
			if (ten !== 'firefox') await kiemMatMang(ctx, p, g, tieuDe);

			// người đọc tắt: lần mở trang sau gỡ service worker, xóa bộ nhớ đệm
			await p.evaluate(() => localStorage.setItem('psyche-zero', JSON.stringify({ v: 1, records: {}, prefs: { 'ngoai-tuyen': { value: false, t: Date.now() } } })));
			await p.goto(g, { waitUntil: 'load' });
			await p.waitForFunction(
				async () => (await navigator.serviceWorker.getRegistrations()).length === 0 && !(await caches.keys()).some((k) => k.startsWith('psyche-moi-')),
				null,
				{ timeout: 20000, polling: 250 },
			);
			assert.deepEqual(loi, [], 'lỗi trên trang');
		} finally {
			await ctx.close();
			await trinhDuyet.close();
		}
	});
}

const NHIEU_TRANG = [...new Set([...TRANG, 'thi-nghiem/asch/', 'kham-pha/', 'thi-nghiem/', 'ngo-nhan/', 'trai-nghiem/', 'bang-chung/'])]
	.filter((t) => t && !t.endsWith('.html') && t !== 'ho-tro/' && co(t))
	.slice(0, 10);

// nc0 S4: trong phiên kiểm toán 17/11/2026 có một lần tải /ho-tro/ quá 30 giây khi service worker bật (chưa tái hiện). Mở
// liền các trang mẫu (service worker điều khiển, lưu dần vào bộ nhớ đệm), rồi mở trang Hỗ trợ: phải tải xong dưới 10 giây,
// cả lần đầu và lần sau (lần sau đi qua bản lưu sẵn lúc cài).
for (const [ten, loai] of Object.entries(TRINH_DUYET)) {
	test(`trang Hỗ trợ mở nhanh sau nhiều trang, có service worker, ${ten}`, { skip: (!phienBan && 'sw.js tự gỡ (PSYCHE_NGOAI_TUYEN=tat)') || (!co('ho-tro') && 'không có trang Hỗ trợ') }, async () => {
		const trinhDuyet = await loai.launch();
		const ctx = await trinhDuyet.newContext();
		try {
			const p = await ctx.newPage();
			const loi = [];
			p.on('pageerror', (e) => loi.push(String(e)));
			const g = await goc();
			await p.goto(g, { waitUntil: 'load' });
			await p.waitForFunction(() => !!navigator.serviceWorker?.controller, null, { timeout: 20000 });
			await choTimKiem(p);
			for (const t of NHIEU_TRANG) {
				await p.goto(g + t, { waitUntil: 'load' });
				await choTimKiem(p);
			}
			for (const lan of ['lần đầu', 'lần sau']) {
				const bd = Date.now();
				await p.goto(g + 'ho-tro/', { waitUntil: 'load', timeout: 30000 });
				const ms = Date.now() - bd;
				assert.match(await p.title(), /Hỗ trợ/);
				assert.ok(ms < 10000, `trang Hỗ trợ (${lan}) tải mất ${ms} ms`);
				assert.ok(await p.evaluate(() => !!navigator.serviceWorker.controller), 'service worker điều khiển trang Hỗ trợ');
				await choTimKiem(p);
			}
			assert.deepEqual(loi, [], 'lỗi trên trang');
		} finally {
			await ctx.close();
			await trinhDuyet.close();
		}
	});
}
