// Kiểm thử link (D1.5): link tới trang chưa có trong bản build thành chữ "sắp có" (src/plugins/sap-co.mjs), và chữ ấy
// trỏ tới một trang trong kế hoạch (src/data/trang.yml) mà bản build chưa có; mọi link nội bộ trong bản build (cả link
// tương đối) tới trang, file và #mục có thật; trang 404 bằng tiếng Việt, dẫn về trang chủ, ô tìm kiếm và bản cũ. Chép từ
// ../opus/tests/link.test.mjs rồi sửa. PSYCHE_DIST đổi thư mục build được kiểm (mặc định dist/), như khi chạy thử chuyển
// cả site cũ trong một bản chép (plans/lam-lai/bao-cao/d1-5.md).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { markdownToHtml } from 'satteri';
import { parse } from 'yaml';
import { sapCo } from '../src/plugins/sap-co.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.resolve(ROOT, process.env.PSYCHE_DIST || 'dist');
const BASE = '/psyche/';

test('link tới trang chưa có trong bản build thành chữ thường kèm nhãn "sắp có"; link khác giữ nguyên', () => {
	const plugin = sapCo({ base: BASE, trangCo: () => ['index', 'thi-nghiem/asch'] });
	const md = [
		'[Asch](/psyche/thi-nghiem/asch/#thiet-ke)',
		'[Milgram *vâng lời*](/psyche/thi-nghiem/milgram/#a)',
		'[Trang chủ](/psyche/)',
		'[APA](https://www.apa.org/)',
		'[Biểu tượng](/psyche/favicon.svg)',
		'[Mục](#muc)',
	].join(' · ');
	const html = markdownToHtml(md, { hastPlugins: [plugin] }).html;
	assert.match(html, /<a href="\/psyche\/thi-nghiem\/asch\/#thiet-ke">Asch<\/a>/);
	assert.match(html, /<span class="pz-sap-co" data-href="\/psyche\/thi-nghiem\/milgram\/#a" title="[^"]+">Milgram <em>vâng lời<\/em> <span class="pz-sap-co-nhan" data-pagefind-ignore[^>]*>sắp có<\/span><\/span>/);
	assert.doesNotMatch(html, /<a [^>]*href="\/psyche\/thi-nghiem\/milgram\//, 'không còn thẻ <a> tới trang chưa có');
	for (const giu of ['href="/psyche/"', 'href="https://www.apa.org/"', 'href="/psyche/favicon.svg"', 'href="#muc"']) assert.ok(html.includes(giu), giu);
	// link trong lời giải thích của câu hỏi (data-quiz), như HTML thô
	const q = markdownToHtml('<div class="pz-quiz" data-quiz="[{&quot;q&quot;:&quot;Hỏi&quot;,&quot;opts&quot;:[],&quot;why&quot;:[&quot;Xem &lt;a href=\\&quot;/psyche/thi-nghiem/milgram/\\&quot;&gt;Milgram&lt;/a&gt;&quot;]}]"></div>', { hastPlugins: [plugin] }).html;
	assert.doesNotMatch(htmlCauHoi(q), /<a /);
	assert.match(htmlCauHoi(q), /<span class="pz-sap-co" data-href="\/psyche\/thi-nghiem\/milgram\/"[^>]*>Milgram <span class="pz-sap-co-nhan"/);
	// HTML thô viết trong trang
	const tho = markdownToHtml('<p><a href="/psyche/thi-nghiem/milgram/">Milgram</a> và <a href="/psyche/thi-nghiem/asch/">Asch</a></p>', { hastPlugins: [plugin] }).html;
	assert.match(tho, /<span class="pz-sap-co" data-href="\/psyche\/thi-nghiem\/milgram\/" title="[^"]+">Milgram <span class="pz-sap-co-nhan" data-pagefind-ignore>sắp có<\/span><\/span>/);
	assert.match(tho, /<a href="\/psyche\/thi-nghiem\/asch\/">Asch<\/a>/);
});

/** HTML của câu hỏi trong một trang (data-quiz: JSON đã thoát; quiz.js đưa vào trang khi dựng câu hỏi bấm được). */
const htmlCauHoi = (html) =>
	[...html.matchAll(/\sdata-quiz="([^"]*)"/g)]
		.flatMap(([, ma]) => JSON.parse(ma.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')))
		.flatMap((c) => [c.q, ...c.opts.map((o) => o.t), ...c.why])
		.join('\n');

const trangDist = () => {
	if (!fs.existsSync(path.join(DIST, 'index.html'))) throw new Error('Chưa có dist/: chạy `npm run build` trước `npm test`.');
	return fs.readdirSync(DIST, { recursive: true }).filter((f) => f.endsWith('.html') && !String(f).startsWith('pagefind'));
};

/** Địa chỉ trên site của một file trong dist/: "thi-nghiem/asch/index.html" thành "/psyche/thi-nghiem/asch/". */
const diaChiCua = (f) => BASE + f.replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '$1');

test('mọi link nội bộ trong nội dung các trang của bản build (cả link tương đối) tới trang, file và #mục có thật', () => {
	const id = new Map();
	const idCua = (f) => {
		if (!id.has(f)) id.set(f, new Set([...fs.readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
		return id.get(f);
	};
	const hong = [];
	for (const f of trangDist()) {
		const html = fs.readFileSync(path.join(DIST, f), 'utf8');
		const noiDung = html.slice(html.indexOf('<main'), html.indexOf('</main>')) + htmlCauHoi(html);
		for (const [, goc] of noiDung.matchAll(/\shref="([^"]+)"/g)) {
			const href = goc.replaceAll('&amp;', '&');
			if (href.startsWith('#')) {
				if (href.length > 1 && !idCua(path.join(DIST, f)).has(decodeURIComponent(href.slice(1)))) hong.push(`${f}: không có ${href}`);
				continue;
			}
			if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue;
			const url = new URL(href, 'http://x' + diaChiCua(f));
			if (!url.pathname.startsWith(BASE)) {
				hong.push(`${f}: ${href} ra ngoài site`);
				continue;
			}
			const p = url.pathname;
			const muc = url.hash.slice(1);
			const dich = path.join(DIST, decodeURI(p).slice(BASE.length), p.endsWith('/') ? 'index.html' : '');
			if (!fs.existsSync(dich)) hong.push(`${f}: không có ${p.endsWith('/') ? 'trang' : 'file'} ${href}`);
			else if (muc && !idCua(dich).has(decodeURIComponent(muc))) hong.push(`${f}: ${href} không có #${muc}`);
		}
	}
	assert.deepEqual(hong, []);
});

test('chữ "sắp có" trỏ tới một trang trong kế hoạch mà bản build chưa có (bắt link gõ sai, trang bị bỏ sót khỏi bản build)', () => {
	const keHoach = new Set(parse(fs.readFileSync(path.join(ROOT, 'src/data/trang.yml'), 'utf8')).map((t) => t.id));
	const hong = [];
	for (const f of trangDist()) {
		const html = fs.readFileSync(path.join(DIST, f), 'utf8');
		for (const [the] of (html + htmlCauHoi(html)).matchAll(/<span class="pz-sap-co"[^>]*>/g)) {
			const href = /\sdata-href="([^"]*)"/.exec(the)?.[1]?.replaceAll('&amp;', '&');
			if (!href) {
				hong.push(`${f}: "sắp có" không có data-href`);
				continue;
			}
			const p = decodeURI(new URL(href, 'http://x').pathname.slice(BASE.length)).replace(/\/$/, '');
			if (fs.existsSync(path.join(DIST, p, 'index.html'))) hong.push(`${f}: ${href} có trong bản build mà vẫn hiện "sắp có"`);
			else if (![p || 'index', `${p}/index`].some((t) => keHoach.has(t))) hong.push(`${f}: ${href} không phải trang nào trong kế hoạch (gõ sai?)`);
		}
	}
	assert.deepEqual(hong, []);
});

test('trang 404 không có trong menu, nên không trang nào link tới nó', () => {
	const fm = parse(/^---\n([\s\S]*?)\n---/.exec(fs.readFileSync(path.join(ROOT, 'src/content/docs/404.md'), 'utf8'))[1]);
	assert.equal(fm.sidebar?.hidden, true, 'src/content/docs/404.md cần sidebar: { hidden: true }');
	assert.equal(fm.pagefind, false, 'trang 404 không vào chỉ mục tìm kiếm');
	const co = trangDist().filter((f) => fs.readFileSync(path.join(DIST, f), 'utf8').includes(`href="${BASE}404/"`));
	assert.deepEqual(co, []);
});

test('trang 404 bằng tiếng Việt, báo site đang làm lại, dẫn về trang chủ, ô tìm kiếm và bản cũ', () => {
	trangDist();
	const html = fs.readFileSync(path.join(DIST, '404.html'), 'utf8');
	assert.match(html, /<html lang="vi"/);
	assert.match(html, /<title>Không thấy trang \| Psyche<\/title>/);
	assert.match(html, /Psyche đang được làm lại/);
	assert.match(html, /<a [^>]*href="\/psyche\/"[^>]*>\s*Về trang chủ/);
	assert.match(html, /<a [^>]*href="#tim-trang-khac"[^>]*data-mo-tim-kiem/);
	assert.match(html, /<a [^>]*href="https:\/\/mtuann.github.io\/psyche-zero\/"[^>]*data-ban-cu/);
	assert.match(html, /id="tim-trang-khac"/);
	assert.doesNotMatch(html, /rel="(prev|next)"/, 'trang 404 không có link "Trước", "Tiếp"');
	assert.doesNotMatch(html, /Page not found|This page/);
});
