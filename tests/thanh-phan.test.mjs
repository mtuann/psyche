// Kiểm thử thành phần trong trang (D1.4): plugin Markdown của dự án dựng đúng khung nhãn, chip nhãn, khối thu gọn, khung
// "Ở Việt Nam", câu hỏi, công cụ, hình, danh sách nguồn; viết sai thì báo lỗi rõ. Chạy thẳng Sätteri trên đoạn Markdown
// mẫu, không cần build (như ../opus/tests/thanh-phan.test.mjs). Câu hỏi và công cụ trên trình duyệt: tests/trinh-duyet/.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { markdownToHtml } from 'satteri';
import { duLieuDaKiem } from '../src/du-lieu.mjs';
import { psycheMarkdown } from '../src/plugins/psyche-markdown.mjs';
import { CONG_CU, THU_MUC_HINH, canTaiScript, docQuiz, dongNguon, hinh, md } from '../src/plugins/thanh-phan.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DOCS = path.join(ROOT, 'src/content/docs');

/** Dựng một đoạn Markdown như trang src/content/docs/<trang>.md. */
function dung(chu, trang = 'kham-pha/tri-nho/thu') {
	const plugin = psycheMarkdown({ docsDir: DOCS })({ fileURL: pathToFileURL(path.join(DOCS, trang + '.md')) });
	return markdownToHtml(chu, { mdastPlugins: [plugin], features: { directive: true, smartPunctuation: false } }).html.trim();
}

test('khung nhãn: bốn nhãn, ý chính trong ngoặc vuông (có Markdown), nội dung Markdown; nhãn đọc được đủ "Nhãn: ý chính"', () => {
	const html = dung(':::vung-chac[Quên nhanh lúc đầu, *chậm dần* về sau]\nĐã tìm thấy **lại**.\n\nĐoạn hai.\n:::');
	assert.match(html, /^<aside class="pz-nhan pz-nhan--vung-chac" aria-label="Vững chắc: Quên nhanh lúc đầu, chậm dần về sau">/);
	assert.match(html, /<p class="pz-nhan__dau"><span class="pz-nhan__muc">Vững chắc<\/span><span class="pz-an">: <\/span><span class="pz-nhan__y">Quên nhanh lúc đầu, <em>chậm dần<\/em> về sau<\/span><\/p>/);
	assert.match(html, /<p>Đã tìm thấy <strong>lại<\/strong>.<\/p><p>Đoạn hai.<\/p><\/aside>/);
	for (const [ma, ten] of [['kha-vung', 'Khá vững'], ['tranh-cai', 'Đang tranh cãi'], ['bac-bo', 'Đã bị bác bỏ']])
		assert.match(dung(`:::${ma}[Ý]\nx\n:::`), new RegExp(`class="pz-nhan pz-nhan--${ma}" aria-label="${ten}: Ý"`));
	assert.throws(() => dung(':::vung-chac\nx\n:::'), /:::vung-chac cần ý chính trong ngoặc vuông/);
});

test('chip nhãn, khối thu gọn, khung "Ở Việt Nam"; aside của Starlight để nguyên', () => {
	assert.equal(dung('Ôn rải rác :nhan[vung-chac] nhé.'), '<p>Ôn rải rác <span class="pz-tag pz-tag--vung-chac">Vững chắc</span> nhé.</p>');
	assert.throws(() => dung('x :nhan[chac] y'), /:nhan\[chac\]: nhãn phải là một trong/);
	assert.equal(
		dung(':::thu-gon[Xem đáp án]\nQuên **nhanh**.\n:::'),
		'<details class="pz-thu-gon"><summary>Xem đáp án</summary><div class="pz-thu-gon__noi"><p>Quên <strong>nhanh</strong>.</p></div></details>',
	);
	assert.throws(() => dung(':::thu-gon\nx\n:::'), /:::thu-gon cần chữ của nút/);
	assert.match(dung(':::o-viet-nam\nChưa có.\n:::'), /^<aside class="pz-vn" aria-label="Ở Việt Nam"><p class="pz-vn__ten">Ở Việt Nam<\/p><p>Chưa có.<\/p><\/aside>/);
	assert.match(dung(':::o-viet-nam[Ở Việt Nam và châu Á]\nx\n:::'), /<p class="pz-vn__ten">Ở Việt Nam và châu Á<\/p>/);
	// :::note… do Starlight dựng (plugin của Starlight không chạy ở đây, nên chỉ thị còn nguyên trong cây)
	assert.doesNotMatch(dung(':::note\nGhi chú.\n:::'), /pz-/);
	assert.throws(() => dung(':::canh-bao\nx\n:::'), /không có khối :::canh-bao/);
	assert.throws(() => dung(':::thu-gon[X]{mo="1"}\nx\n:::'), /:::thu-gon không nhận thuộc tính/);
});

test('khối ```quiz: đúng một đáp án đúng, ít nhất hai lựa chọn, có giải thích; bản tĩnh đọc được khi chưa có JavaScript', () => {
	const qs = docQuiz('? Câu *một*?\n- Sai\n+ Đúng\n> Vì thế.\n>\n> Đoạn hai.\n? Câu hai?\n+ A\n- B\n> Giải.');
	assert.equal(qs.length, 2);
	assert.deepEqual(qs[0].why, ['Vì thế.', 'Đoạn hai.']);
	assert.throws(() => docQuiz('? Câu?\n- A\n- B\n> x'), /có 0 đáp án đúng/);
	assert.throws(() => docQuiz('? Câu?\n+ A\n+ B\n> x'), /có 2 đáp án đúng/);
	assert.throws(() => docQuiz('? Câu?\n+ A\n> x'), /ít nhất hai lựa chọn/);
	assert.throws(() => docQuiz('? Câu?\n+ A\n- B'), /chưa có giải thích/);
	assert.throws(() => docQuiz('Câu?\n+ A'), /dòng không hiểu/);
	assert.throws(() => docQuiz(''), /khối quiz rỗng/);
	const html = dung('```quiz\n? Câu *một*?\n- Sai\n+ Đúng\n> Vì <b>thế</b>.\n```');
	assert.match(html, /^<div class="pz-quiz not-content" data-quiz="/);
	assert.match(html, /<li class="pz-cau"><p class="pz-cau__hoi">Câu <em>một<\/em>\?<\/p><ul class="pz-cau__chon"><li>Sai<\/li><li class="pz-cau__dung">Đúng <span class="pz-an">\(đáp án\)<\/span><\/li><\/ul>/);
	// thẻ HTML thô trong chữ của câu hỏi hiện thành chữ
	assert.match(html, /<div class="pz-cau__giai"><p>Vì &lt;b&gt;thế&lt;\/b&gt;.<\/p><\/div>/);
	assert.throws(() => dung('```quiz\n? Câu?\n- A\n```'), /kham-pha\/tri-nho\/thu\.md: khối quiz: câu "Câu\?" có 0 đáp án đúng/);
	assert.ok(canTaiScript(html));
	assert.ok(!canTaiScript(dung('Chữ thường.')));
});

test('md(): link chỉ tới địa chỉ an toàn, ảnh thành chữ thay thế', () => {
	assert.equal(md('[x](javascript:alert(1))'), 'x');
	assert.equal(md('[x](../bang-chung/do-lon-hieu-ung/)'), '<a href="../bang-chung/do-lon-hieu-ung/">x</a>');
	assert.equal(md('![ảnh](a.png)'), 'ảnh');
});

test('::cong-cu: công cụ đã chuyển thành khối có lớp của công cụ; thông số lạ là lỗi; công cụ chưa chuyển hiện ô "chưa chuyển"', () => {
	assert.equal(dung('::cong-cu{ten="stroop"}'), '<div class="pz-cong-cu pz-stroop not-content" data-cong-cu="stroop" data-pagefind-ignore></div>');
	assert.match(dung('::cong-cu{ten="stroop" blocks="1"}'), /data-blocks="1"/);
	assert.throws(() => dung('::cong-cu{ten="stroop" mau="do"}'), /công cụ "stroop" không nhận thông số mau/);
	assert.throws(() => dung('::cong-cu'), /::cong-cu thiếu thuộc tính ten/);
	assert.match(dung('::cong-cu{ten="linda"}'), /<p class="pz-chua-chuyen" data-chua-chuyen="linda"/);
	assert.ok(canTaiScript(dung('::cong-cu{ten="stroop"}')));
	// mỗi công cụ đã chuyển có module ở src/scripts/cong-cu/ và có trong bộ tải
	const tai = fs.readFileSync(path.join(ROOT, 'src/scripts/tai.js'), 'utf8');
	for (const [ten, { lop }] of Object.entries(CONG_CU)) {
		assert.ok(fs.existsSync(path.join(ROOT, `src/scripts/cong-cu/${ten}.js`)), `thiếu src/scripts/cong-cu/${ten}.js`);
		assert.ok(tai.includes(`['.${lop}', () => import('./cong-cu/${ten}.js')`), `src/scripts/tai.js chưa nạp ${ten}`);
	}
});

test('::hinh: hình tĩnh trong src/hinh/ đúng khuôn; hình chưa chuyển hiện ô "chưa chuyển"; tên lạ là lỗi', () => {
	assert.match(dung('::hinh{ten="khong-co-hinh-nay"}'), /data-chua-chuyen="khong-co-hinh-nay"/);
	assert.throws(() => dung('::hinh{ten="../x"}'), /chỉ gồm a–z/);
	assert.throws(() => dung('::hinh{ten="a" mau="1"}'), /::hinh không nhận thuộc tính mau/);
	for (const f of fs.existsSync(THU_MUC_HINH) ? fs.readdirSync(THU_MUC_HINH).filter((f) => f.endsWith('.html')) : []) {
		const html = hinh(f.slice(0, -5), 'thu');
		assert.match(html, /^<figure class="pz-fig"/, f);
		// không màu viết cứng: mọi màu theo currentColor (bản sáng, tối)
		assert.doesNotMatch(html, /(fill|stroke)="#/, `${f}: màu viết cứng`);
	}
});

test('::nguon: danh sách nguồn từ nguon.yml theo thứ tự ghi; id không có là lỗi', () => {
	const html = dung('::nguon{id="murre2015,cepeda2006"}');
	assert.match(html, /^<ul class="pz-nguon"><li id="nguon-murre2015">Murre/);
	assert.ok(html.indexOf('nguon-murre2015') < html.indexOf('nguon-cepeda2006'));
	assert.match(html, /<em>Psychological Bulletin<\/em>, 132\(3\), 354–380\. <a href="https:\/\/doi.org\/10.1037\/0033-2909.132.3.354">/);
	assert.throws(() => dung('::nguon{id="khong-co2099"}'), /không có nguồn khong-co2099/);
	assert.throws(() => dung('::nguon'), /::nguon thiếu thuộc tính id/);
	// mọi bản ghi dựng được thành một dòng
	for (const r of duLieuDaKiem().nguon) assert.ok(dongNguon(r).includes(`(${r.nam})`), r.id);
});

// Chữ dạng ":x" (lúc 9:30) không phải :nhan thì plugin để nguyên chỉ thị, và plugin khôi phục chỉ thị của Starlight trả lại
// thành chữ; plugin ấy không chạy ở đây (đã xem trên bản build), nên chỉ kiểm chỉ thị một dòng.
test('chỉ thị một dòng lạ là lỗi', () => {
	assert.throws(() => dung('::hop-tac-pham'), /không có chỉ thị ::hop-tac-pham/);
	assert.throws(() => dung('::hinh[chữ]{ten="a"}'), /::hinh không nhận chữ/);
});

test('bổ sung có ngày: trang mà bổ sung gắn vào có trong trang.yml', () => {
	const goc = path.join(ROOT, 'src/content/bo-sung');
	const trang = new Set(duLieuDaKiem().trang.map((r) => r.id));
	const ds = fs.existsSync(goc) ? fs.readdirSync(goc, { recursive: true }).map(String).filter((f) => f.endsWith('.md')) : [];
	for (const f of ds) {
		const t = /^trang:\s*(\S+)/m.exec(fs.readFileSync(path.join(goc, f), 'utf8'))?.[1];
		assert.ok(trang.has(t), `src/content/bo-sung/${f}: trang "${t}" không có trong src/data/trang.yml`);
	}
});
