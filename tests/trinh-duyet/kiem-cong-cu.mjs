// Luồng của từng công cụ (D8-L1; plans/lam-lai/README.md, đợt 8: "kiểm thử luồng của từng công cụ trên ba trình duyệt"):
// làm trọn một lượt từ màn đầu tới màn kết quả, bằng chuột, chạm hay bàn phím; kết quả lưu ở khóa "psyche-zero" đúng dạng
// của site cũ (kind, tên trường); không lỗi trên trang; ở 360 px không tràn ngang. Hẹn giờ của công cụ chạy bằng đồng hồ
// giả của Playwright (page.clock): phép thử cho thời gian trôi tới khi điều kiện đúng, không chờ cố định. Trên Chromium thêm
// axe ở màn kết quả. Trang lấy thẳng từ bản build; bản build không có trang (bản thật, công cụ chưa khóa) thì bỏ qua.
// Lô sau thêm công cụ của mình vào LUONG.
import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { DIST, TRINH_DUYET, dongMayChu, goc, nguCanh } from './chung.mjs';

after(dongMayChu);
const AXE = createRequire(import.meta.url).resolve('axe-core/axe.min.js');
const NHAN_AXE = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

const coTrang = (trang, lop) => {
	const f = path.join(DIST, trang, 'index.html');
	return fs.existsSync(f) && fs.readFileSync(f, 'utf8').includes(`class="pz-cong-cu ${lop} `);
};

/** Cho đồng hồ giả chạy từng bước tới khi `dk` (hàm chạy trong trang) đúng; quá `toiDa` ms thì lỗi. */
async function toiKhi(p, dk, arg, { buoc = 50, toiDa = 20000, ten = 'điều kiện' } = {}) {
	for (let t = 0; t <= toiDa; t += buoc) {
		if (await p.evaluate(dk, arg)) return;
		await p.clock.runFor(buoc);
	}
	throw new Error(`đồng hồ chạy ${toiDa} ms mà chưa tới ${ten}`);
}

/** Bản ghi của một loại trong khóa "psyche-zero". */
const banGhi = (p, kind) =>
	p.evaluate((k) => Object.values(JSON.parse(localStorage.getItem('psyche-zero') || '{}').records || {}).filter((r) => r.kind === k), kind);

async function moTrang(ctx, trang, lop) {
	const p = await ctx.newPage();
	const loi = [];
	p.on('pageerror', (e) => loi.push(String(e)));
	p.on('console', (m) => m.type() === 'error' && loi.push(`console: ${m.text()}`));
	await p.clock.install();
	await p.goto((await goc()) + trang, { waitUntil: 'load' });
	const el = p.locator(`.${lop}`);
	await el.scrollIntoViewIfNeeded();
	await toiKhi(p, (l) => document.querySelector(`.${l}`)?.dataset.san === '1', lop, { ten: 'công cụ dựng xong' });
	return { p, el, loi };
}

const bam = (el, chu) => el.getByRole('button', { name: chu, exact: true }).click();

const LUONG = {
	/** Stroop, phiên bản đếm: khởi động 8 lượt bằng nút, phần chính 72 lượt bằng phím số; mọi lượt đúng. */
	stroop: {
		trang: 'trai-nghiem/stroop/',
		lop: 'pz-stroop',
		async chay({ p, el }) {
			await el.getByLabel('Phiên bản đếm (không dùng màu)').check();
			await bam(el, 'Tiếp tục');
			await bam(el, 'Bắt đầu khởi động');
			const traLoi = async (bangNut) => {
				await toiKhi(p, () => {
					const s = document.querySelector('.pz-stroop .pz-stim');
					return s && !s.classList.contains('pz-stim--fix') && s.textContent.trim() !== '';
				}, null, { ten: 'kích thích hiện' });
				await p.clock.runFor(450);
				const n = await p.evaluate(() => document.querySelector('.pz-stroop .pz-stim').textContent.trim().split(' ').length);
				if (bangNut) await el.locator(`.pz-answer[data-answer="${n - 1}"]`).click();
				else await p.keyboard.press(String(n));
			};
			for (let i = 0; i < 8; i++) await traLoi(true);
			await toiKhi(p, () => /Xong phần khởi động: đúng 8 \/ 8/.test(document.querySelector('.pz-stroop').textContent), null, { ten: 'xong khởi động' });
			await bam(el, 'Bắt đầu phần chính');
			// gõ vào một ô nhập của trang (như ô tìm kiếm) giữa bài: phím là chữ, không thành đáp án (review D8-L1)
			await toiKhi(p, () => {
				const s = document.querySelector('.pz-stroop .pz-stim');
				return s && !s.classList.contains('pz-stim--fix') && s.textContent.trim() !== '';
			}, null, { ten: 'kích thích hiện' });
			await p.evaluate(() => {
				const o = document.createElement('input');
				o.id = 'pz-thu-go';
				o.setAttribute('aria-label', 'thử gõ');
				document.body.append(o);
				o.focus();
			});
			await p.keyboard.type('1234dfjk');
			assert.equal(await p.evaluate(() => document.getElementById('pz-thu-go').value), '1234dfjk');
			await p.evaluate(() => document.getElementById('pz-thu-go').remove());
			for (let i = 0; i < 36; i++) await traLoi(false);
			await bam(el, 'Tiếp tục');
			for (let i = 0; i < 36; i++) await traLoi(false);
			await el.getByRole('heading', { name: 'Kết quả của bạn' }).waitFor();
			const [r] = await banGhi(p, 'stroop');
			assert.equal(r.mode, 'count');
			assert.equal(r.valid, true);
			assert.equal(r.n, 72);
			assert.deepEqual(r.errors, { congruent: 0, neutral: 0, incongruent: 0 });
			for (const k of ['congruent', 'neutral', 'incongruent', 'effect', 'pct']) assert.equal(typeof r[k], 'number', k);
			assert.equal(r.input, 'keyboard');
		},
	},
	/** Độ dài trí nhớ chữ số: xuôi đúng ở 3 chữ số, sai hai lượt 4 chữ số; ngược đúng ở 2, sai hai lượt 3. */
	'do-dai-tri-nho': {
		trang: 'trai-nghiem/do-dai-tri-nho/',
		lop: 'pz-do-dai-tri-nho',
		async chay({ p, el }) {
			// mỗi chữ số hiện 800 ms, cách nhau 200 ms trống: đọc mỗi 100 ms, lấy chữ số mỗi lần chữ trên màn đổi
			const docDay = async () => {
				const day = [];
				let truoc = '';
				for (let t = 0; t < 20000; t += 100) {
					const [chu, hoi] = await p.evaluate(() => [document.querySelector('.pz-do-dai-tri-nho .pz-stim')?.textContent ?? '', !!document.querySelector('.pz-do-dai-tri-nho form')]);
					if (hoi) return day;
					if (/^\d$/.test(chu) && chu !== truoc) day.push(chu);
					truoc = chu;
					await p.clock.runFor(100);
				}
				throw new Error('dãy số không kết thúc');
			};
			const luot = async (dung, nguoc) => {
				const day = await docDay();
				const go = nguoc ? [...day].reverse() : day;
				await el.getByRole('textbox').fill(dung ? go.join('') : '0'.repeat(day.length));
				await el.getByRole('button', { name: 'Xong' }).click();
				await el.getByText(dung ? 'Đúng!' : /Chưa đúng/).waitFor();
				await bam(el, 'Tiếp');
				return day.length;
			};
			await bam(el, 'Bắt đầu phần xuôi');
			assert.deepEqual([await luot(true), await luot(true), await luot(false), await luot(false)], [3, 3, 4, 4]);
			await el.getByText('Phần xuôi: bạn nhớ được 3 chữ số.').waitFor();
			await bam(el, 'Bắt đầu phần ngược');
			assert.deepEqual([await luot(true, true), await luot(true, true), await luot(false, true), await luot(false, true)], [2, 2, 3, 3]);
			await el.getByRole('heading', { name: 'Vị trí nào bạn nhớ tốt nhất?' }).waitFor();
			const [r] = await banGhi(p, 'digitspan');
			assert.equal(r.forward, 3);
			assert.equal(r.backward, 2);
			assert.equal(r.positions.length, 4);
			assert.equal(typeof r.rtMs, 'number');
		},
	},
	/** Müller-Lyer: chỉnh bằng phím (Home rồi 34 lần mũi tên phải: 84%), chốt; lệch 16%, theo cách tính của Segall 19%. */
	'ao-giac': {
		trang: 'trai-nghiem/ao-giac-thi-giac/',
		lop: 'pz-ao-giac',
		async chay({ p, el }) {
			await bam(el, 'Bắt đầu');
			const truot = el.getByRole('slider');
			await truot.focus();
			await p.keyboard.press('Home');
			for (let i = 0; i < 34; i++) await p.keyboard.press('ArrowRight');
			await el.getByText('Đoạn dưới đang bằng 84% đoạn trên').waitFor();
			await bam(el, 'Chốt đáp án');
			await el.getByText('là độ lệch của bạn').waitFor();
			assert.match(await el.textContent(), /16,0%.*19,0%/s);
			const [r] = await banGhi(p, 'illusion');
			assert.deepEqual([r.errorPct, r.setPct], [16, 84]);
		},
	},
	/** Mù thay đổi: tìm ô đổi bằng cách so hai phiên bản; bấm nhầm một ô, rồi đi bằng phím mũi tên tới ô đúng, Enter. */
	'mu-thay-doi': {
		trang: 'trai-nghiem/mu-thay-doi/',
		lop: 'pz-mu-thay-doi',
		async chay({ p, el }) {
			await bam(el, 'Bắt đầu');
			const mau = () => p.evaluate(() => [...document.querySelectorAll('.pz-mu-thay-doi .pz-o-mau')].map((o) => o.style.background));
			const a = await mau();
			await p.clock.runFor(750);
			const b = await mau();
			const doi = a.findIndex((x, i) => x !== b[i]);
			assert.ok(doi >= 0, 'không thấy ô đổi màu giữa hai phiên bản');
			await el.locator(`.pz-o-mau[data-o="${(doi + 1) % 25}"]`).click();
			// tiêu điểm về ô đầu, đi tới ô đổi bằng phím mũi tên
			await el.locator('.pz-o-mau[data-o="0"]').focus();
			for (let i = 0; i < Math.floor(doi / 5); i++) await p.keyboard.press('ArrowDown');
			for (let i = 0; i < doi % 5; i++) await p.keyboard.press('ArrowRight');
			assert.equal(await p.evaluate(() => document.activeElement?.dataset.o), String(doi));
			await p.keyboard.press('Enter');
			await el.getByRole('heading', { name: 'Kết quả của bạn' }).waitFor();
			const [r] = await banGhi(p, 'changeblind');
			assert.equal(r.found, true);
			assert.equal(r.wrong, 1);
			assert.equal(typeof r.seconds, 'number');
		},
	},
	/** Ebbinghaus: thu nhỏ vòng bao quanh bằng phím (5 lần mũi tên trái: 35), đo; hai vòng trung tâm bằng nhau. */
	ebbinghaus: {
		trang: 'trai-nghiem/ebbinghaus/',
		lop: 'pz-ebbinghaus',
		async chay({ p, el }) {
			await bam(el, 'Bắt đầu');
			await el.getByRole('slider').focus();
			for (let i = 0; i < 5; i++) await p.keyboard.press('ArrowLeft');
			await el.getByText('bán kính 35 px').waitFor();
			await bam(el, 'Đo kích thước thật');
			await el.getByText('60 px = 60 px').waitFor();
			const [r] = await banGhi(p, 'ebbinghaus');
			assert.deepEqual([r.surR, r.centerD], [35, 60]);
		},
	},
};

for (const [ten, loai] of Object.entries(TRINH_DUYET)) {
	test(`công cụ, ${ten}`, async (t) => {
		const trinhDuyet = await loai.launch();
		try {
			for (const [cc, L] of Object.entries(LUONG)) {
				await t.test(cc, { skip: !coTrang(L.trang, L.lop) && 'bản build không có trang' }, async () => {
					// 360 px cảm ứng, chế độ tối: cỡ khó nhất cho bố cục
					const ctx = await nguCanh(trinhDuyet, ten, { w: 360, h: 780, camUng: true, toi: true });
					try {
						const mo = await moTrang(ctx, L.trang, L.lop);
						await L.chay(mo);
						assert.deepEqual(mo.loi, [], 'lỗi trên trang');
						const tran = await mo.p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
						assert.ok(tran <= 0, `tràn ngang ${tran} px ở màn kết quả`);
						if (ten === 'chromium') {
							await mo.p.addScriptTag({ path: AXE });
							const vp = await mo.p.evaluate(
								async ([chon, nhan]) =>
									(await axe.run(document.querySelector(chon), { runOnly: { type: 'tag', values: nhan } })).violations.map(
										(v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`,
									),
								[`.${L.lop}`, NHAN_AXE],
							);
							assert.deepEqual(vp, [], 'axe ở màn kết quả');
						}
					} finally {
						await ctx.close();
					}
				});
			}
		} finally {
			await trinhDuyet.close();
		}
	});
}
