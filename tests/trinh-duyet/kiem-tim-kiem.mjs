// Tìm kiếm trên bản build (chép từ ../opus/tests/trinh-duyet/, việc D1.8 của opus): bộ truy vấn của Psyche (trang đích
// phải nằm trong 5 kết quả đầu; truy vấn nào có trang đích chưa có trong bản build thì bỏ qua), và gõ "dang" phải ra trang
// chỉ có chữ "đang", cả qua API lẫn qua ô tìm kiếm của Starlight. API là pagefind.js của bản build (bản bọc,
// src/tim-kiem/pagefind.js).
import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { DIST, TRINH_DUYET, dongMayChu, goc, khongChromium } from './chung.mjs';

after(dongMayChu);

const BASE = '/psyche/';

/**
 * [câu tìm, trang phải nằm trong 5 kết quả đầu]. Bốn cụm đầu chép từ ../psyche-zero/tests/site/search.test.mjs; các cụm
 * sau là tên bài, tên thí nghiệm, gõ có dấu và không dấu (kể cả "d" thay "đ"). Trang đích lên site ở lô nào thì truy vấn
 * của nó bắt đầu chạy từ lô ấy; truy vấn không đạt thì lô ấy sửa (thứ hạng, hay câu tìm nếu câu tìm không hợp lý).
 */
const BO = [
	['niềm tin về stress', 'kham-pha/cang-thang-giac-ngu/stress-co-hai/'],
	['trí nhớ làm việc', 'kham-pha/tri-nho/tri-nho-lam-viec/'], ['tri nho lam viec', 'kham-pha/tri-nho/tri-nho-lam-viec/'],
	['giấc mơ', 'kham-pha/cang-thang-giac-ngu/giac-mo/'], ['giac mo', 'kham-pha/cang-thang-giac-ngu/giac-mo/'],
	['thiên kiến xác nhận', 'kham-pha/tu-duy/thien-kien-xac-nhan/'], ['thien kien xac nhan', 'kham-pha/tu-duy/thien-kien-xac-nhan/'],
	['định kiến', 'kham-pha/tam-ly-xa-hoi/dinh-kien/'], ['dinh kien', 'kham-pha/tam-ly-xa-hoi/dinh-kien/'],
	['bat hoa nhan thuc', 'kham-pha/tam-ly-xa-hoi/bat-hoa-nhan-thuc/'], ['duong cong quen', 'kham-pha/tri-nho/duong-cong-quen/'],
	['phong cach hoc', 'kham-pha/tri-nho/phong-cach-hoc/'], ['Dunning Kruger', 'kham-pha/tu-duy/dunning-kruger/'],
	['Big Five', 'kham-pha/tinh-cach/big-five/'], ['MBTI', 'kham-pha/tinh-cach/mbti/'],
	['dopamine', 'kham-pha/co-so-sinh-hoc/dopamine/'], ['hieu ung Flynn', 'kham-pha/tri-tue/hieu-ung-flynn/'],
	['tram cam', 'kham-pha/suc-khoe-tam-than/tram-cam/'], ['lo au', 'kham-pha/suc-khoe-tam-than/lo-au/'],
	['Milgram', 'thi-nghiem/milgram/'], ['Asch', 'thi-nghiem/asch/'], ['Darley Latané', 'thi-nghiem/darley-latane/'],
	['keo deo', 'thi-nghiem/keo-deo/'], ['khi dot vo hinh', 'thi-nghiem/khi-dot-vo-hinh/'], ['Pavlov', 'thi-nghiem/pavlov/'],
	['Stroop', 'trai-nghiem/stroop/'], ['bai toan Linda', 'trai-nghiem/linda/'],
	// ba trang thử của D1.8: có chữ "đ" gõ thành "d"
	['bai toan duong thang', 'thi-nghiem/asch/'], ['duong cong quen Ebbinghaus', 'kham-pha/tri-nho/vi-sao-ta-quen/'],
	['tuong quan nhan qua', 'bang-chung/tuong-quan-nhan-qua/'], ['khung hoang tai lap', 'bang-chung/khung-hoang-tai-lap/'],
	['phan tich tong hop', 'bang-chung/phan-tich-tong-hop/'],
];
const coTrang = (t) => fs.existsSync(path.join(DIST, t, 'index.html'));

/**
 * Câu tìm của phép thử chữ "đ": gõ "dang" (không dấu) phải ra cả trang chỉ có từ "đang". Chọn "dang" vì trang chủ tạm đã
 * có chữ "đang" (phép thử có việc để làm ngay từ D1.1, review D1.1) và chữ này có ở gần như mọi bài.
 */
const TU = 'dang';

/**
 * Bỏ các phần tử có data-pagefind-ignore (Pagefind không lập chỉ mục chúng, như lời nhắc Hỗ trợ ở chân trang, có chữ
 * "đang"), đếm thẻ lồng cùng tên để bỏ đúng cả phần tử.
 */
function boPhanBoQua(html) {
	let ra = html;
	for (;;) {
		const m = /<([a-z][\w-]*)\b[^>]*\sdata-pagefind-ignore\b[^>]*>/i.exec(ra);
		if (!m) return ra;
		const the = new RegExp(`<(/?)${m[1]}\\b[^>]*>`, 'gi');
		the.lastIndex = m.index + m[0].length;
		let sau = 1;
		let k;
		while (sau && (k = the.exec(ra))) sau += k[1] ? -1 : 1;
		ra = ra.slice(0, m.index) + (k ? ra.slice(the.lastIndex) : '');
	}
}

/**
 * Trang mà câu tìm TU chỉ khớp được qua chữ "đ": sau khi bỏ dấu (như Pagefind làm), phần Pagefind lập chỉ mục (thẻ main
 * có data-pagefind-body của Starlight, trừ phần data-pagefind-ignore) có từ "đang" mà không có từ "dang" (dạng, dáng…).
 * Trang không có data-pagefind-body (pagefind: false) không vào chỉ mục nên không tính.
 * Không có bản bọc pagefind.js thì gõ TU không ra các trang này.
 */
const chiCoD = () =>
	fs
		.readdirSync(DIST, { recursive: true })
		.filter((f) => f.endsWith('index.html'))
		.filter((f) => {
			const html = fs.readFileSync(path.join(DIST, f), 'utf8');
			// trang không vào chỉ mục (pagefind: false ở frontmatter, như search: exclude của site cũ) thì bỏ qua
			if (!html.includes('data-pagefind-body')) return false;
			const tu = new Set(
				// chân bài của Starlight (nút "Trước", "Tiếp" mang tên trang khác) không phải chữ của trang
				boPhanBoQua(html.slice(html.indexOf('<main'), html.indexOf('</main>')).replace(/<footer\b[\s\S]*<\/footer>/, ''))
					.replace(/<[^>]+>/g, ' ')
					.toLowerCase()
					.normalize('NFD')
					.replace(/[̀-ͯ]/g, '')
					.split(/[^a-zđ0-9]+/),
			);
			return tu.has('đ' + TU.slice(1)) && !tu.has(TU);
		})
		.map((f) => BASE + f.replace(/index\.html$/, ''));

/**
 * Tùy chọn xếp hạng mà ô tìm kiếm của Starlight đưa cho Pagefind: astro.config.mjs không đặt `pagefind`, nên là mặc định
 * của Starlight. API dùng cùng tùy chọn thì thứ hạng như ô tìm kiếm (rút từ review D1.8 của opus).
 */
const { PagefindConfigDefaults } = await import(pathToFileURL(path.resolve(import.meta.dirname, '../../node_modules/@astrojs/starlight/dist/schemas/pagefind.js')).href);
const XEP_HANG = PagefindConfigDefaults().ranking;

/** Trang (địa chỉ, bỏ #mục) của `toiDa` kết quả đầu (không ghi: mọi kết quả), theo thứ tự, không trùng. */
async function tim(p, cau, toiDa) {
	return p.evaluate(
		async ([cau, toiDa, xepHang, base]) => {
			const pf = await import(base + 'pagefind/pagefind.js');
			await pf.options({ ranking: xepHang });
			const kq = await pf.search(cau);
			const ds = await Promise.all(kq.results.slice(0, toiDa ?? undefined).map((r) => r.data()));
			return { so: kq.results.length, trang: [...new Set(ds.map((d) => d.url.split('#')[0]))] };
		},
		[cau, toiDa ?? null, XEP_HANG, BASE],
	);
}

test('tìm kiếm qua pagefind.js của bản build', { skip: khongChromium }, async (t) => {
	const trinhDuyet = await chromium.launch();
	try {
		const p = await trinhDuyet.newPage();
		await p.goto(await goc(), { waitUntil: 'load' });
		const co = BO.filter(([, trang]) => coTrang(trang));
		for (const [cau, trang] of co)
			await t.test(`"${cau}" ra ${trang} trong 5 kết quả đầu`, async () => {
				const ds = (await tim(p, cau, 5)).trang;
				assert.ok(ds.includes(BASE + trang), `5 kết quả đầu: ${ds.join(', ')}`);
			});
		const chiD = chiCoD();
		await t.test(`"${TU}" ra cả trang chỉ có từ "đ${TU.slice(1)}…" (${chiD.length} trang)`, { skip: !chiD.length && `bản build chưa có trang chỉ có "đ${TU.slice(1)}" mà không có "${TU}"` }, async () => {
			// mọi kết quả, không chỉ những kết quả đầu: site lớn thì có hàng chục trang như vậy
			const { trang } = await tim(p, TU);
			assert.deepEqual(chiD.filter((x) => !trang.includes(x)), [], `kết quả: ${trang.join(', ')}`);
		});
		t.diagnostic(`${co.length}/${BO.length} truy vấn có trang đích trong bản build`);
	} finally {
		await trinhDuyet.close();
	}
});

for (const [ten, loai] of Object.entries(TRINH_DUYET))
	test(`${ten}: ô tìm kiếm của Starlight dùng bản bọc: gõ "${TU}" ra đúng số kết quả như pagefind.js của bản build, không lỗi`, async () => {
		const trinhDuyet = await loai.launch();
		try {
			const p = await trinhDuyet.newPage({ viewport: { width: 1280, height: 800 } });
			const loi = [];
			p.on('pageerror', (e) => loi.push(String(e)));
			p.on('console', (m) => m.type() === 'error' && loi.push(m.text()));
			const chiD = chiCoD();
			// Các file của Pagefind đã tải (mã, số byte): ở repo opus, một lần đăng site hỏng vì Pagefind nhận chỉ mục rỗng
			// trên máy của GitHub; hỏng lần sau thì biết file nào về rỗng
			const pagefind = [];
			p.on('response', async (r) => {
				if (!r.url().includes('/pagefind/')) return;
				const dai = await r.body().then((b) => b.length, () => '?');
				pagefind.push(`${r.status()} ${dai} B ${r.url().replace(/^.*\/pagefind\//, '')}`);
			});
			p.on('requestfailed', (r) => r.url().includes('/pagefind/') && pagefind.push(`hỏng ${r.url().replace(/^.*\/pagefind\//, '')}: ${r.failure()?.errorText}`));
			await p.goto(await goc(), { waitUntil: 'load' });
			// Ô tìm kiếm chạy trước, như với người đọc thật: nó gọi options() trước khi Pagefind khởi tạo, lúc mà options()
			// thay hết tùy chọn cũ. Gọi pagefind.js trước thì Pagefind đã khởi tạo đúng basePath, che mất lỗi này.
			await p.click('site-search button[data-open-modal]');
			await p.locator('.pagefind-ui__search-input').fill(TU);
			await p
				.waitForFunction(() => /\d+ kết quả|Không có kết quả/.test(document.querySelector('.pagefind-ui__message')?.textContent ?? ''), null, { timeout: 15000 })
				.catch(() => assert.fail(`ô tìm kiếm không ra kết quả; lỗi: ${loi.join(' | ') || 'không có'}; file của Pagefind: ${pagefind.join(', ') || 'chưa tải file nào'}`));
			const tin = await p.locator('.pagefind-ui__message').innerText();
			const { so } = await tim(p, TU);
			// Bản build có trang chỉ tìm ra được qua chữ "đ" thì phải có kết quả: không có nghĩa là pagefind.js chưa được bọc
			if (chiD.length) assert.ok(so > 0, `${chiD.length} trang chỉ có "đ${TU.slice(1)}" mà pagefind.js không ra kết quả nào: bản bọc chưa chạy?`);
			// Ô tìm kiếm ra đúng số kết quả như bản bọc: ô tìm kiếm dùng bản gốc thì thiếu các trang chỉ có chữ "đ"
			assert.equal(Number(/(\d+) kết quả/.exec(tin)?.[1] ?? 0), so, `ô tìm kiếm báo "${tin}"`);
			assert.deepEqual(loi, []);
		} finally {
			await trinhDuyet.close();
		}
	});
