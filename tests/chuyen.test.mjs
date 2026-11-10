// Kiểm thử script chuyển trang và so chữ (D1.5): tools/chuyen/chuyen.mjs đổi cú pháp của site cũ sang cú pháp mới mà
// không đổi chữ; tools/chuyen/so-chu.mjs nhận ra chỗ chỉ khác cách ngắt khối. Phần cần site cũ (../psyche-zero/) tự bỏ
// qua khi không có (như trên GitHub).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DOCS_CU, chuyenTrang, doiLink, doiQuiz, tatCaTrangCu } from '../tools/chuyen/chuyen.mjs';
import { khacNhau } from '../tools/chuyen/so-chu.mjs';

const CO_SITE_CU = fs.existsSync(DOCS_CU);

test('link: file .md thành địa chỉ /psyche/…/ (giữ #mục), link thư mục tính theo địa chỉ trang; link ngoài giữ nguyên', () => {
	assert.equal(doiLink('../../bang-chung/do-lon-hieu-ung.md', 'kham-pha/tri-nho/vi-sao-ta-quen'), '/psyche/bang-chung/do-lon-hieu-ung/');
	assert.equal(doiLink('duong-cong-quen.md#ap-dung', 'kham-pha/tri-nho/vi-sao-ta-quen'), '/psyche/kham-pha/tri-nho/duong-cong-quen/#ap-dung');
	assert.equal(doiLink('../thi-nghiem/index.md', 'bat-dau/index'), '/psyche/thi-nghiem/');
	assert.equal(doiLink('../index.md', 'bat-dau/index'), '/psyche/');
	// MkDocs để nguyên link thư mục: trình duyệt tính theo địa chỉ của trang (trang mục lục: thư mục của nó)
	assert.equal(doiLink('stroop/', 'trai-nghiem/index'), '/psyche/trai-nghiem/stroop/');
	assert.equal(doiLink('../bat-dau/ban-nghi-gi/', 'ngo-nhan/index'), '/psyche/bat-dau/ban-nghi-gi/');
	for (const giu of ['https://doi.org/10.1/x', 'mailto:a@b.c', '#muc']) assert.equal(doiLink(giu, 'a/b'), giu);
	const cb = [];
	doiLink('../../../ngoai.md', 'a/b', cb);
	assert.match(cb[0], /link ra ngoài docs/);
});

test('câu hỏi "Thử suy ngẫm" của site cũ thành khối ```quiz, giữ chữ câu hỏi, lựa chọn, giải thích nhiều đoạn', () => {
	const cu = ['1. Câu một?', '', '    - [ ] Sai', '    - [x] Đúng [xem](../a.md)', '', '    Giải thích một', '    dòng hai.', '', '    Đoạn hai.', '', '2. Câu hai?', '', '    - [x] A', '    - [ ] B', '', '    Vì A.'];
	assert.deepEqual(doiQuiz(cu, 'x/y', []), ['```quiz', '? Câu một?', '- Sai', '+ Đúng [xem](/psyche/a/)', '> Giải thích một dòng hai.', '>', '> Đoạn hai.', '? Câu hai?', '+ A', '- B', '> Vì A.', '```']);
});

test('trang mẫu: tiêu đề từ H1 (title cũ khác thì thành tên menu), khung nhãn, chip, thu gọn, công cụ, hình; bỏ dòng "Rà soát"', () => {
	const md = [
		'---',
		'title: Hiệu ứng Stroop',
		'description: Mô tả.',
		'in_duoc: true',
		'can_ra_soat: true',
		'---',
		'',
		'# Vì sao chữ "ĐỎ" màu *xanh*?',
		'',
		'*Rà soát nội dung lần cuối: tháng 10/2026.*',
		'',
		'',
		'## Mục <span class="pz-tag pz-tag--vung-chac">Vững chắc</span>',
		'',
		'<div class="pz-stroop"></div>',
		'',
		'!!! vung-chac "Vững chắc: quên \\"nhanh\\" lúc đầu"',
		'    Thân **khung**.',
		'',
		'!!! tranh-cai "Đang tranh cãi"',
		'    Không ý chính.',
		'',
		'??? note "Xem đáp án"',
		'    Đáp án.',
		'',
		'!!! warning "Chú ý"',
		'    Cẩn thận.',
		'',
		'<!-- fig:thu -->',
		'<figure class="pz-fig" markdown="0"><svg viewBox="0 0 1 1" role="img" aria-label="x" font-family="system-ui"></svg><figcaption>Chú thích.</figcaption></figure>',
		'<!-- /fig:thu -->',
		'',
	].join('\n');
	const { noiDung, canhBao, hinh } = chuyenTrang(md, { trang: 'trai-nghiem/stroop' });
	assert.equal(
		noiDung,
		[
			'---',
			'title: Vì sao chữ "ĐỎ" màu xanh?',
			'description: Mô tả.',
			'sidebar:',
			'  label: Hiệu ứng Stroop',
			'in_duoc: true',
			'---',
			'',
			'## Mục :nhan[vung-chac]',
			'',
			'::cong-cu{ten="stroop"}',
			'',
			':::vung-chac[quên "nhanh" lúc đầu]',
			'Thân **khung**.',
			':::',
			'',
			':::tranh-cai',
			'Không ý chính.',
			':::',
			'',
			':::thu-gon[Xem đáp án]',
			'Đáp án.',
			':::',
			'',
			':::caution[Chú ý]',
			'Cẩn thận.',
			':::',
			'',
			'::hinh{ten="thu"}',
			'',
		].join('\n'),
	);
	assert.equal(hinh.get('thu'), '<figure class="pz-fig"><svg viewBox="0 0 1 1" role="img" aria-label="x"></svg><figcaption>Chú thích.</figcaption></figure>\n');
	assert.ok(canhBao.some((c) => /bỏ dòng "\*Rà soát/.test(c)));
	assert.ok(canhBao.some((c) => /bỏ trường can_ra_soat/.test(c)));
	assert.ok(canhBao.some((c) => /tiêu đề bỏ định dạng Markdown/.test(c)));
});

test('so chữ: cụm khối chỉ khác cách ngắt khối (danh sách site cũ dồn vào đoạn trên) không tính là khác', () => {
	const ngat = [];
	const cu = ['Mở đầu', 'Cần có: 1. Một điều. 2. Hai điều.', 'Kết'];
	const moi = ['Mở đầu', 'Cần có:', 'Một điều.', 'Hai điều.', 'Kết'];
	assert.deepEqual(khacNhau(cu, moi, ngat), []);
	assert.equal(ngat.length, 1);
	assert.equal(khacNhau(['a b'], ['a c']).length, 2);
});

test('site cũ: mọi trang chuyển được (không lỗi), không còn cú pháp cũ !!!, ???, pz-quiz, <!-- fig:', { skip: !CO_SITE_CU && 'không có ../psyche-zero/' }, () => {
	const loi = [];
	for (const t of tatCaTrangCu()) {
		try {
			const { noiDung } = chuyenTrang(fs.readFileSync(`${DOCS_CU}/${t}.md`, 'utf8'), { trang: t });
			const con = /^\s*(!!!|\?\?\?)|<div class="pz-quiz"|<!-- fig:|markdown="0"/m.exec(noiDung);
			if (con) loi.push(`${t}: còn "${con[0].trim()}"`);
			if (/[ \t]$/m.test(noiDung)) loi.push(`${t}: có khoảng trắng cuối dòng`);
		} catch (e) {
			loi.push(`${t}: ${e.message}`);
		}
	}
	assert.deepEqual(loi, []);
});

/** Hình đã sửa có chủ ý sau khi chép (lô của trang ghi doi_chu ở hồ sơ, kèm lý do và nguồn): thêm tên vào đây. */
// hình đã sửa có chủ ý so với trang cũ (doi_chu ở hồ sơ trang): milgram-obedience (D3-L1: bài 1963 không có "đòi được thả"; 79% là của Thí nghiệm 5);
// harlow-contact (D3-L2: số theo Hình 5 của Harlow 1958, hai nhóm theo nơi có sữa; "mẹ lưới thép"; bỏ "đúng bằng thời gian bú");
// seligman-design (D3-L2: nhóm đối chứng không vào võng; yoked cùng thời lượng trung bình; 6/8 chó yoked thụ động);
// skinner-schedules (D3-L2: nhãn VR "cao, đều, khó tắt dần nhất" như chữ trang)
// tuong-quan (D4-L1): bỏ tên file tools/figures.py (không có ở repo này) khỏi chú thích
// loftus-verbs (D5-L1 review): chú thích "khoảng 14,5 km/giờ" (9 dặm = 14,48 km)
// elm-routes (D5-L4 review): "bền vững / mong manh" thành "tương đối bền / tương đối mong manh, dễ đổi hơn" (Petty & Cacioppo 1986, Hình 1: "relatively enduring", "relatively temporary")
// festinger-diverging (D5-L4 review): chú thích "tích cực hơn hẳn nhóm 20 đô-la" thành "cao hơn, chênh lệch có ý nghĩa thống kê" (Festinger & Carlsmith 1959: p < 0,03 và p < 0,02)
const HINH_DA_SUA = new Set(["tuong-quan", "milgram-obedience", "harlow-contact", "seligman-design", "skinner-schedules", "mean-vs-median", "loftus-verbs", "festinger-diverging", "elm-routes", "gross-model"]);

test('hình tĩnh src/hinh/<tên>.html chép đúng hình của trang cũ (chữ trong hình, aria-label; so-chu không so SVG)', { skip: !CO_SITE_CU && 'không có ../psyche-zero/' }, () => {
	const thu = new URL('../src/hinh/', import.meta.url);
	const ten = fs.existsSync(thu) ? fs.readdirSync(thu).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5)) : [];
	const cu = new Map();
	for (const t of tatCaTrangCu()) for (const [k, v] of chuyenTrang(fs.readFileSync(`${DOCS_CU}/${t}.md`, 'utf8'), { trang: t }).hinh) cu.set(k, v);
	for (const t of ten.filter((x) => !HINH_DA_SUA.has(x))) {
		assert.ok(cu.has(t), `src/hinh/${t}.html: site cũ không có vùng <!-- fig:${t} -->`);
		assert.equal(fs.readFileSync(new URL(`${t}.html`, thu), 'utf8'), cu.get(t), `src/hinh/${t}.html khác hình của trang cũ: sửa có chủ ý thì ghi doi_chu ở hồ sơ trang và thêm tên vào HINH_DA_SUA`);
	}
});
