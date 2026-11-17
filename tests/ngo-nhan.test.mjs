// Thẻ ngộ nhận (D8-L3): trò chơi "Bạn nghĩ gì về tâm trí?" (src/scripts/cong-cu/ngo-nhan.js), trang Ngộ nhận
// (::ngo-nhan, src/plugins/thanh-phan.mjs) và dữ liệu một chỗ (src/data/ngo-nhan.yml). Luồng trên trình duyệt:
// tests/trinh-duyet/kiem-cong-cu.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { LUA_CHON, TEN_NHAN as TEN_NHAN_TRO, boThe, dapAn, ketQua, phimChon } from '../src/scripts/cong-cu/ngo-nhan.js';
import { ngauNhien } from '../src/scripts/cong-cu/chung/thong-ke.js';
import { DAP_AN_NHAN, TEN_NHAN, TRUONG_THE, congCu, duLieuNgoNhan, theTrongBan, trangNgoNhan } from '../src/plugins/thanh-phan.mjs';
import { duLieuDaKiem } from '../src/du-lieu.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');

const THE = [
	{ id: 'a', cap: 1, khang_dinh: 'A <b>', nhan: 'bac-bo', giai_thich: 'Giải thích "A" & B.', nguon: ['n1'] },
	{ id: 'b', cap: 2, khang_dinh: 'B', nhan: 'tranh-cai', giai_thich: 'GB', nguon: ['n1', 'n2'], trang: 'x/y' },
	{ id: 'c', cap: 3, khang_dinh: 'C', nhan: 'vung-chac', giai_thich: 'GC', nguon: ['n2'] },
	{ id: 'd', cap: 1, khang_dinh: 'D', nhan: 'bac-bo', giai_thich: 'GD', nguon: ['n2'], trang: 'chua/len' },
];
const NGUON = [
	{ id: 'n1', loai: 'bai-bao', tac_gia: 'Họ, A.', nam: 2001, ten: 'Tên một', noi_dang: 'Tạp chí, 1(2), 3–4', doi: '10.1/abc' },
	{ id: 'n2', loai: 'trang-web', tac_gia: 'WHO', nam: 2026, ten: 'Tên hai', url: 'https://www.who.int/x' },
];
const docsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-ngo-nhan-'));
fs.mkdirSync(path.join(docsDir, 'x'), { recursive: true });
fs.writeFileSync(path.join(docsDir, 'x', 'y.md'), '---\ntitle: Bài Y\n---\n');
process.on('exit', () => fs.rmSync(docsDir, { recursive: true, force: true }));
const ctx = (coThe = () => true) => ({ ngoNhan: THE, nguon: NGUON, coThe, trangCo: ['x/y'], docsDir, base: '/psyche/' });

test('đáp án theo nhãn: trò chơi và plugin cùng một bảng, như "Cách chấm" của trang', () => {
	for (const ma of Object.keys(TEN_NHAN)) assert.equal(dapAn(ma), DAP_AN_NHAN[ma], ma);
	assert.deepEqual(TEN_NHAN_TRO, TEN_NHAN);
	assert.deepEqual(
		LUA_CHON.map((x) => x.ma),
		['dung', 'sai', 'tranh-cai'],
	);
	assert.throws(() => dapAn('khac'));
	const ban = fs.readFileSync(path.join(ROOT, 'src/content/docs/bat-dau/ban-nghi-gi.md'), 'utf8');
	assert.match(ban, /\*\*Vững chắc\*\* hoặc \*\*Khá vững\*\*: đáp án là \*Đúng\*/);
	assert.match(ban, /\*\*Đã bị bác bỏ\*\*: đáp án là \*Sai\*/);
	assert.match(ban, /\*\*Đang tranh cãi\*\*: đáp án là \*Còn tranh cãi\*/);
});

test('bộ thẻ một lượt: lọc theo cấp, trộn, cắt theo limit; không sửa đầu vào', () => {
	const the = THE.map((t) => ({ id: t.id, cap: t.cap }));
	const sao = JSON.stringify(the);
	assert.equal(boThe(the, {}, ngauNhien(1)).length, 4);
	assert.deepEqual(boThe(the, { level: 1 }, ngauNhien(1)).map((t) => t.id).sort(), ['a', 'd']);
	assert.equal(boThe(the, { limit: 2 }, ngauNhien(1)).length, 2);
	assert.equal(boThe(the, { limit: 20 }, ngauNhien(1)).length, 4);
	assert.deepEqual(boThe(the, { limit: 3 }, ngauNhien(7)), boThe(the, { limit: 3 }, ngauNhien(7)));
	assert.equal(JSON.stringify(the), sao);
});

test('kết quả lưu như site cũ: score, total, wrong (id thẻ trả lời khác bằng chứng)', () => {
	assert.deepEqual(
		ketQua([
			{ id: 'a', nhan: 'bac-bo', chon: 'sai' },
			{ id: 'b', nhan: 'tranh-cai', chon: 'dung' },
			{ id: 'c', nhan: 'kha-vung', chon: 'dung' },
		]),
		{ score: 2, total: 3, wrong: ['b'] },
	);
	assert.deepEqual(ketQua([]), { score: 0, total: 0, wrong: [] });
});

test('phím tắt 1, 2, 3; bỏ qua khi đang gõ vào ô nhập hay có phím bổ trợ', () => {
	const o = (tag, khac = {}) => ({ closest: (s) => (s.split(', ').includes(tag) ? {} : null), isContentEditable: false, ...khac });
	assert.equal(phimChon({ key: '1', target: o('div') }), 0);
	assert.equal(phimChon({ key: '3', target: o('button') }), 2);
	assert.equal(phimChon({ key: '4', target: o('div') }), -1);
	assert.equal(phimChon({ key: '1', target: o('input') }), -1);
	assert.equal(phimChon({ key: '2', target: o('textarea') }), -1);
	assert.equal(phimChon({ key: '2', target: o('div', { isContentEditable: true }) }), -1);
	assert.equal(phimChon({ key: '1', ctrlKey: true, target: o('div') }), -1);
});

test('trang Ngộ nhận: thẻ của một nhãn trong khung nhãn, chữ thoát HTML, bài liên quan chỉ khi trang có trong bản build', () => {
	const html = trangNgoNhan({ nhan: 'bac-bo' }, ctx());
	assert.equal((html.match(/class="pz-nhan pz-nhan--bac-bo pz-the-nn"/g) || []).length, 2);
	assert.match(html, /aria-label="Đã bị bác bỏ: A &lt;b&gt;"/);
	assert.match(html, /<span class="pz-nhan__y">A &lt;b&gt;<\/span>/);
	assert.match(html, /Giải thích &quot;A&quot; &amp; B\./);
	assert.match(html, /id="the-a"/);
	assert.doesNotMatch(html, /chua\/len/, 'trang chưa có trong bản build thì không link');
	assert.match(html, /<em>Nguồn:<\/em> .*Họ, A\. \(2001\)\. Tên một\./);
	assert.doesNotMatch(html, /sắp có/);
	const b = trangNgoNhan({ nhan: 'tranh-cai' }, ctx());
	assert.match(b, /Đọc thêm: <a href="\/psyche\/x\/y\/">Bài Y<\/a>/);
	assert.throws(() => trangNgoNhan({ nhan: 'kha-vung' }, ctx()), /không có thẻ nào mang nhãn kha-vung/);
	assert.throws(() => trangNgoNhan({ nhan: 'xau' }, ctx()), /nhan phải là/);
});

test('bản thật: chỉ thẻ đã khóa lên trang và vào trò chơi; thẻ còn lại chỉ được đếm', () => {
	const chiA = (id) => id === 'a';
	assert.deepEqual(theTrongBan(THE, chiA), { the: [THE[0]], con: 3 });
	const html = trangNgoNhan({ nhan: 'bac-bo' }, ctx(chiA));
	assert.equal((html.match(/pz-the-nn"/g) || []).length, 1);
	assert.match(html, /Còn 1 thẻ mang nhãn Đã bị bác bỏ sắp có/);
	assert.match(trangNgoNhan({ nhan: 'vung-chac' }, ctx(chiA)), /^<div class="pz-ds-the"><p class="pz-ds-bai__con">Có 1 thẻ/);
	const du = duLieuNgoNhan(ctx(chiA));
	assert.deepEqual(
		du.map((t) => t.id),
		['a'],
	);
	assert.deepEqual(du[0], { id: 'a', cap: 1, k: 'A <b>', n: 'bac-bo', g: 'Giải thích "A" & B.', ng: [{ chu: 'Họ, A. (2001). Tên một. Tạp chí, 1(2), 3–4.', link: 'https://doi.org/10.1/abc' }], bai: null });
	assert.deepEqual(duLieuNgoNhan(ctx())[1].bai, { link: '/psyche/x/y/', ten: 'Bài Y' });
	assert.deepEqual(duLieuNgoNhan(ctx())[2].ng, [{ chu: 'WHO. (2026). Tên hai.', link: 'https://www.who.int/x' }]);
	assert.deepEqual(TRUONG_THE, ['khang_dinh', 'nhan', 'giai_thich', 'nguon']);
});

test('khối trò chơi: thẻ nhúng vào data-the (JSON đã thoát), thông số limit, level như site cũ', () => {
	const html = congCu({ ten: 'ngo-nhan', limit: '20' }, 'bat-dau/ban-nghi-gi', { 'ngo-nhan': () => duLieuNgoNhan(ctx()) });
	assert.match(html, /^<div class="pz-cong-cu pz-ngo-nhan not-content" data-cong-cu="ngo-nhan" data-limit="20" data-the="\[/);
	const json = /data-the="([^"]*)"/.exec(html)[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
	assert.equal(JSON.parse(json).length, 4);
	assert.throws(() => congCu({ ten: 'ngo-nhan' }, 'x'), /cần dữ liệu "ngo-nhan"/);
	assert.throws(() => congCu({ ten: 'ngo-nhan', so: '3' }, 'x', { 'ngo-nhan': () => [] }), /không nhận thông số so/);
});

test('dữ liệu thật: mỗi nhãn đang dùng có mục trên trang Ngộ nhận; trò chơi có trên trang Bạn nghĩ gì', () => {
	const d = duLieuDaKiem();
	const trang = fs.readFileSync(path.join(ROOT, 'src/content/docs/ngo-nhan/index.md'), 'utf8');
	const coMuc = new Set([...trang.matchAll(/^::ngo-nhan\{nhan="([a-z-]+)"\}$/gm)].map((m) => m[1]));
	for (const nhan of new Set(d['ngo-nhan'].map((r) => r.nhan))) assert.ok(coMuc.has(nhan), `trang Ngộ nhận thiếu ::ngo-nhan{nhan="${nhan}"}`);
	assert.match(fs.readFileSync(path.join(ROOT, 'src/content/docs/bat-dau/ban-nghi-gi.md'), 'utf8'), /^::cong-cu\{ten="ngo-nhan" limit="20"\}$/m);
	assert.equal(d['ngo-nhan'].length, 60);
});

test('bản build: số thẻ trên trang Ngộ nhận bằng số thẻ trong trò chơi', { skip: !fs.existsSync(path.join(DIST, 'ngo-nhan/index.html')) && 'chưa build' }, () => {
	const trang = fs.readFileSync(path.join(DIST, 'ngo-nhan/index.html'), 'utf8');
	const soThe = (trang.match(/ pz-the-nn" id="the-/g) || []).length;
	const fTro = path.join(DIST, 'bat-dau/ban-nghi-gi/index.html');
	if (!fs.existsSync(fTro)) return;
	const m = /data-the="([^"]*)"/.exec(fs.readFileSync(fTro, 'utf8'));
	assert.ok(m, 'trang Bạn nghĩ gì không có khối trò chơi');
	const json = m[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
	const the = JSON.parse(json);
	assert.equal(the.length, soThe);
	for (const t of the) {
		assert.ok(t.k && t.g && t.ng.length, `thẻ ${t.id} thiếu chữ hay nguồn`);
		assert.doesNotThrow(() => dapAn(t.n));
		for (const n of t.ng) assert.ok(!n.link || /^https:\/\//.test(n.link), `thẻ ${t.id}: link nguồn ${n.link}`);
	}
});
