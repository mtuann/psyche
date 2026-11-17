// Phần tính toán của các công cụ (D8-L1; chép và sửa từ ../psyche-zero/tests/unit/stats.test.mjs, progress.test.mjs): kho
// kết quả (khóa "psyche-zero", gộp bản sao lưu), thống kê dùng chung, và hàm thuần của từng công cụ. Module công cụ nạp
// được trong Node vì không đụng tới document lúc nạp (khuôn ở đầu src/scripts/cong-cu/stroop.js). Luồng trên trình duyệt:
// tests/trinh-duyet/kiem-cong-cu.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import * as L from '../src/scripts/cong-cu/chung/luu.js';
import { doLechChuan, dangViTri, gopViTri, ngauNhien, phanVi, tron, trangThaiDoDai, trungBinh, trungVi } from '../src/scripts/cong-cu/chung/thong-ke.js';
import * as stroop from '../src/scripts/cong-cu/stroop.js';
import * as doDai from '../src/scripts/cong-cu/do-dai-tri-nho.js';
import * as aoGiac from '../src/scripts/cong-cu/ao-giac.js';
import * as muThayDoi from '../src/scripts/cong-cu/mu-thay-doi.js';
import * as ebb from '../src/scripts/cong-cu/ebbinghaus.js';
import * as drm from '../src/scripts/cong-cu/tri-nho-sai.js';
import * as wason from '../src/scripts/cong-cu/wason-246.js';
import * as linda from '../src/scripts/cong-cu/linda.js';
import * as bf from '../src/scripts/cong-cu/big-five-mini.js';
import * as neo from '../src/scripts/cong-cu/neo-gia.js';
import * as tu from '../src/scripts/cong-cu/tri-nho-tu.js';
import { CONG_CU } from '../src/plugins/thanh-phan.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

// ---------- Kho kết quả ----------

const LOAI = ['stroop', 'digitspan', 'quiz', 'myths'];
const eq = (a, b) => assert.equal(L.onDinh(a), L.onDinh(b));

function kho(rand) {
	return Array.from({ length: 40 }, (_, i) => {
		const kind = LOAI[i % LOAI.length];
		const t = 1_700_000_000_000 + i * 86_400_000;
		return { id: L.taoId(kind, t, rand), kind, t, score: Math.floor(rand() * 10) };
	});
}
function boNgauNhien(rand, k) {
	const d = L.rong();
	for (let i = Math.floor(rand() * 12); i > 0; i--) {
		const r = k[Math.floor(rand() * k.length)];
		d.records[r.id] = r;
	}
	for (let i = Math.floor(rand() * 3); i > 0; i--) d.prefs[`p${Math.floor(rand() * 3)}`] = { value: Math.floor(rand() * 5), t: 1000 + Math.floor(rand() * 4) };
	return d;
}

test('kho: khóa và phiên bản như site cũ (người dùng cũ giữ được kết quả)', () => {
	assert.equal(L.KHOA, 'psyche-zero');
	assert.equal(L.PHIEN_BAN, 1);
	assert.deepEqual(L.rong(), { v: 1, records: {}, prefs: {} });
});

test('gộp: 300 bộ ngẫu nhiên, không mất, không nhân đôi, giao hoán, kết hợp, lũy đẳng, không sửa đầu vào', () => {
	const rand = ngauNhien(20261013);
	const k = kho(rand);
	for (let i = 0; i < 300; i++) {
		const [a, b, c] = [boNgauNhien(rand, k), boNgauNhien(rand, k), boNgauNhien(rand, k)];
		const [aa, bb] = [L.onDinh(a), L.onDinh(b)];
		const ab = L.gop(a, b);
		assert.equal(L.onDinh(a), aa);
		assert.equal(L.onDinh(b), bb);
		const ids = new Set([...Object.keys(a.records), ...Object.keys(b.records)]);
		assert.equal(Object.keys(ab.records).length, ids.size);
		for (const id of ids) assert.ok(ab.records[id], `mất ${id}`);
		eq(ab, L.gop(b, a));
		eq(L.gop(ab, b), ab);
		eq(L.gop(a, a), L.chuanHoa(a));
		eq(L.gop(L.gop(a, b), c), L.gop(a, L.gop(b, c)));
		for (const p of Object.keys(ab.prefs)) assert.equal(ab.prefs[p].t, Math.max(...[a.prefs[p], b.prefs[p]].filter(Boolean).map((x) => x.t)));
	}
});

test('gộp: cùng id khác nội dung vẫn không phụ thuộc thứ tự; xem trước khi gộp đếm đúng', () => {
	const a = L.rong();
	const b = L.rong();
	a.records.x = { id: 'x', kind: 'quiz', t: 1, score: 1 };
	b.records.x = { id: 'x', kind: 'quiz', t: 1, score: 2 };
	eq(L.gop(a, b), L.gop(b, a));
	b.records.y = { id: 'y', kind: 'stroop', t: 2 };
	b.records.z = { id: 'z', kind: 'stroop', t: 3 };
	assert.deepEqual(L.soSanh(a, b), { added: 2, byKind: { stroop: 2 }, alreadyPresent: 1 });
	assert.deepEqual(L.soSanh(L.gop(a, b), b), { added: 0, byKind: {}, alreadyPresent: 3 });
});

test('chuẩn hóa bỏ dữ liệu hỏng; tóm tắt đếm theo loại và theo ngày', () => {
	for (const rac of [null, undefined, 42, 'x', [], { records: 5 }, { records: { a: null, b: { kind: 1, t: 2 } } }]) assert.deepEqual(L.chuanHoa(rac), L.rong());
	const ok = L.chuanHoa({ records: { a: { kind: 'quiz', t: 5 } }, prefs: { p: { value: 1, t: 2 }, q: 'hỏng' } });
	assert.equal(ok.records.a.id, 'a');
	assert.deepEqual(Object.keys(ok.prefs), ['p']);
	const ngay = new Date(2026, 9, 13, 10).getTime();
	const d = { records: { a: { kind: 'quiz', t: ngay }, b: { kind: 'quiz', t: ngay + 3_600_000 }, c: { kind: 'stroop', t: ngay + 86_400_000 } } };
	assert.deepEqual(L.tomTat(d), { records: 3, byKind: { quiz: 2, stroop: 1 }, days: 2 });
	assert.equal(L.ngay(ngay), '2026-10-13');
});

test('kho: không có localStorage (Node) thì giữ trong bộ nhớ; có thì ghi đúng khóa', () => {
	L.xoaHet();
	const r = L.them('quiz', { score: 3 });
	assert.equal(L.ds('quiz').length, 1);
	assert.equal(L.ds()[0].id, r.id);
	L.xoaHet();
	assert.equal(L.ds().length, 0);
	const bang = new Map();
	globalThis.localStorage = { getItem: (k) => bang.get(k) ?? null, setItem: (k, v) => bang.set(k, String(v)), removeItem: (k) => bang.delete(k) };
	try {
		L.them('stroop', { effect: 80 });
		L.datTuyChon('che-do', 'dem');
		const luu = JSON.parse(bang.get('psyche-zero'));
		assert.equal(luu.v, 1);
		assert.equal(Object.values(luu.records)[0].kind, 'stroop');
		assert.equal(L.layTuyChon('che-do'), 'dem');
		assert.ok(L.coLuu());
	} finally {
		delete globalThis.localStorage;
	}
});

test('kho: ghi hỏng (đầy chỗ) thì bản ghi vẫn còn trong phiên; chữ hỏng được chép sang khóa phụ trước khi bị đè', () => {
	L.xoaHet();
	const bang = new Map();
	let day = false;
	globalThis.localStorage = {
		getItem: (k) => bang.get(k) ?? null,
		setItem: (k, v) => {
			if (day && k === 'psyche-zero') throw new Error('QuotaExceededError');
			bang.set(k, String(v));
		},
		removeItem: (k) => bang.delete(k),
	};
	try {
		L.them('stroop', { effect: 1 });
		day = true;
		const r = L.them('stroop', { effect: 2 });
		assert.equal(L.ds('stroop').length, 2, 'bản ghi vừa làm không mất');
		assert.ok(L.ds().some((x) => x.id === r.id));
		day = false;
		L.them('stroop', { effect: 3 });
		assert.equal(Object.keys(JSON.parse(bang.get('psyche-zero')).records).length, 3, 'ghi lại được thì kho có đủ');
		L.xoaHet();
		bang.set('psyche-zero', '{hỏng');
		assert.equal(L.ds().length, 0);
		L.them('quiz', { score: 1 });
		assert.equal(bang.get('psyche-zero:hong'), '{hỏng');
	} finally {
		delete globalThis.localStorage;
		L.xoaHet();
	}
});

// ---------- Thống kê dùng chung ----------

test('trung vị, phân vị, trung bình, độ lệch chuẩn; trung vị không bị một lượt rất chậm kéo lệch', () => {
	assert.equal(trungVi([3, 1, 2]), 2);
	assert.equal(trungVi([4, 1, 3, 2]), 2.5);
	assert.equal(phanVi([10, 20], 0.25), 12.5);
	assert.equal(trungBinh([1, 2, 3, 6]), 3);
	assert.ok(Math.abs(doLechChuan([2, 4, 4, 4, 5, 5, 7, 9]) - 2.138) < 0.001);
	assert.ok(Number.isNaN(trungVi([])));
	assert.ok(Number.isNaN(doLechChuan([1])));
	assert.equal(trungVi([500, 510, 520, 530, 2400]), 520);
	const a = ngauNhien(42);
	const b = ngauNhien(42);
	for (let i = 0; i < 10; i++) assert.equal(a(), b());
	assert.deepEqual([...tron([1, 2, 3, 4, 5], ngauNhien(1))].sort(), [1, 2, 3, 4, 5]);
});

test('quy trình độ dài trí nhớ: mỗi độ dài 2 lượt, dừng khi sai cả 2 hay ở độ dài tối đa', () => {
	const H = [];
	assert.deepEqual(trangThaiDoDai(H, 3, 12), { done: false, nextLen: 3, span: 0 });
	H.push({ len: 3, correct: true });
	assert.equal(trangThaiDoDai(H, 3, 12).nextLen, 3);
	H.push({ len: 3, correct: false });
	assert.deepEqual(trangThaiDoDai(H, 3, 12), { done: false, nextLen: 4, span: 3 });
	H.push({ len: 4, correct: false }, { len: 4, correct: false });
	assert.deepEqual(trangThaiDoDai(H, 3, 12), { done: true, nextLen: null, span: 3 });
	const T = [];
	for (let l = 3; l <= 5; l++) T.push({ len: l, correct: true }, { len: l, correct: true });
	assert.deepEqual(trangThaiDoDai(T, 3, 5), { done: true, nextLen: null, span: 5 });
});

test('vị trí chuỗi: cộng dồn theo vị trí, nhận dạng chữ U', () => {
	assert.deepEqual(gopViTri([{ positions: [true, true, true] }, { positions: [true, false] }, { positions: [false, false, false, true] }]), [
		{ correct: 2, total: 3 },
		{ correct: 1, total: 3 },
		{ correct: 1, total: 2 },
		{ correct: 1, total: 1 },
	]);
	const p = (c, t) => ({ correct: c, total: t });
	assert.equal(dangViTri([p(9, 10), p(8, 10), p(4, 10), p(3, 10), p(7, 8), p(8, 8)]), 'u');
	assert.equal(dangViTri([p(5, 10), p(5, 10), p(5, 10), p(5, 10)]), 'none');
	assert.equal(dangViTri([p(9, 10), p(8, 10), p(4, 10), p(2, 10)]), 'none');
	assert.equal(dangViTri([p(1, 2)]), 'insufficient');
	assert.equal(dangViTri([p(4, 5), p(4, 5), p(1, 5), p(1, 1)]), 'insufficient');
});

// ---------- Stroop ----------

test('Stroop: khối cân bằng, đúng ràng buộc thứ tự (200 hạt giống), khối nhỏ vẫn xếp được', () => {
	for (let hat = 1; hat <= 200; hat++) {
		const k = stroop.khoiStroop(12, 4, ngauNhien(hat));
		assert.equal(k.length, 36);
		for (const cond of ['congruent', 'incongruent', 'neutral']) {
			const ts = k.filter((t) => t.cond === cond);
			assert.equal(ts.length, 12);
			for (let ink = 0; ink < 4; ink++) assert.equal(ts.filter((t) => t.ink === ink).length, 3);
		}
		for (const t of k) {
			if (t.cond === 'congruent') assert.equal(t.word, t.ink);
			if (t.cond === 'neutral') assert.equal(t.word, -1);
			if (t.cond === 'incongruent') assert.ok(t.word !== t.ink && t.word >= 0 && t.word < 4);
		}
		assert.ok(stroop.hopLeStroop(k), `hạt giống ${hat}`);
	}
	for (let n = 1; n <= 4; n++) for (let hat = 1; hat <= 50; hat++) assert.ok(stroop.hopLeStroop(stroop.khoiStroop(n, 4, ngauNhien(hat))));
	const kk = stroop.khoiStroop(12, 4, ngauNhien(7)).filter((t) => t.cond === 'incongruent');
	for (let ink = 0; ink < 4; ink++) assert.equal(new Set(kk.filter((t) => t.ink === ink).map((t) => t.word)).size, 3);
});

const luot = (cond, rts, them = {}) => rts.map((rt) => ({ cond, rt, correct: true, practice: false, ...them }));

test('Stroop: tóm tắt (trung vị, hiệu ứng, phần trăm, loại lượt, hợp lệ)', () => {
	const s = stroop.tomTatStroop([
		...luot('congruent', [600, 620, 640, 660, 680, 700, 720, 740, 760]),
		...luot('incongruent', [700, 720, 740, 760, 780, 800, 820, 840, 860]),
		...luot('neutral', [650, 670, 690, 710, 730, 750, 770, 790, 810]),
		{ cond: 'congruent', rt: 100, correct: true, practice: true },
		{ cond: 'incongruent', rt: 900, correct: false, practice: false },
		{ cond: 'incongruent', rt: 150, correct: true, practice: false },
		{ cond: 'neutral', rt: 2600, correct: true, practice: false },
		{ cond: 'neutral', rt: null, correct: false, practice: false },
	]);
	assert.deepEqual([s.byCond.congruent.median, s.byCond.incongruent.median, s.byCond.neutral.median], [680, 780, 730]);
	assert.equal(s.effect, 100);
	assert.ok(Math.abs(s.interferencePct - (50 / 730) * 100) < 1e-9);
	assert.equal(s.total, 31);
	assert.equal(s.excluded, 4);
	assert.equal(s.byCond.neutral.errorRate, 1 / 11);
	assert.equal(s.valid, true);
	assert.equal(stroop.tomTatStroop([...luot('congruent', [500, 510]), ...luot('incongruent', [600]), ...luot('neutral', [550])]).valid, false);
	assert.deepEqual([stroop.RT_MIN, stroop.RT_MAX], [200, 2500]);
});

test('Stroop: cấu hình mặc định như trang mô tả (8 khởi động, 2 phần × 12 lượt mỗi điều kiện, 500 ms, 300–700 ms, 3 giây)', () => {
	const C = stroop.cauHinh({});
	assert.deepEqual([C.khoiDong, C.soPhan, C.moiDk, C.dauCong, C.trongMin, C.trongMax, C.hetGio], [8, 2, 12, 500, 300, 700, 3000]);
	assert.deepEqual(stroop.cauHinh({ perCond: '4', blocks: '1', practice: '0' }), { ...C, moiDk: 4, soPhan: 1, khoiDong: 0 });
	// số liệu nghiên cứu: hồ sơ kiem-dinh/trai-nghiem/stroop.yml
	const R = stroop.NGHIEN_CUU.stroop1935;
	assert.equal(Math.round(((R.chuKhongKhop - R.oVuong) / R.oVuong) * 100), R.chamHon);
});

// ---------- Độ dài trí nhớ chữ số ----------

test('chữ số: dãy đúng độ dài, không lặp liền kề, không trùng dãy trước; chấm xuôi, ngược, từng vị trí', () => {
	const r = ngauNhien(3);
	let truoc = null;
	for (let n = 2; n <= 12; n++)
		for (let k = 0; k < 20; k++) {
			const d = doDai.dayChuSo(n, r, truoc);
			assert.equal(d.length, n);
			for (let i = 1; i < n; i++) assert.notEqual(d[i], d[i - 1]);
			if (truoc) assert.notEqual(d.join(''), truoc.join(''));
			truoc = d;
		}
	assert.ok(doDai.chamChuSo([5, 2, 8], '5 2 8', false));
	assert.ok(doDai.chamChuSo([5, 2, 8], '825', true));
	assert.ok(!doDai.chamChuSo([5, 2, 8], '528', true));
	assert.ok(!doDai.chamChuSo([5, 2, 8], '5288', false));
	assert.deepEqual(doDai.chamViTri([5, 2, 8], '529', false), [true, true, false]);
	assert.deepEqual(doDai.chamViTri([5, 2, 8], '52', false), [true, true, false]);
	assert.deepEqual(doDai.chamViTri([5, 2, 8], '528', true), [false, true, false]);
	assert.deepEqual(doDai.QUY_TRINH, { xuoi: { batDau: 3, toiDa: 12 }, nguoc: { batDau: 2, toiDa: 10 }, hienMs: 800, cachMs: 200 });
});

// ---------- Ảo giác ----------

test('Müller-Lyer: độ lệch, cách tính của Segall, điểm bắt đầu 75–125%, mức diễn giải', () => {
	assert.equal(aoGiac.doLech(220, 220), 0);
	assert.ok(Math.abs(aoGiac.doLech(220, 184.8) - 16) < 1e-9);
	assert.ok(Math.abs(aoGiac.theoSegall(84) - 19.0476) < 1e-3);
	assert.equal(aoGiac.theoSegall(100), 0);
	const r = ngauNhien(5);
	for (let i = 0; i < 500; i++) {
		const x = aoGiac.batDauNgauNhien(r);
		assert.ok(Number.isInteger(x) && x >= 75 && x <= 125);
	}
	assert.deepEqual([-10, 0, 8, 16, 30].map(aoGiac.muc), ['nguoc', 'gan-khong', 'nhe', 'tham-khao', 'lon']);
	for (const e of [-10, 0, 8, 16, 30]) assert.ok(aoGiac.dienGiai(e).length > 20);
});

test('mù thay đổi: lượt có đúng một ô đổi sang màu khác; số chu kỳ; hàng cột', () => {
	const r = ngauNhien(9);
	for (let i = 0; i < 200; i++) {
		const L2 = muThayDoi.taoLuot(r);
		const khac = L2.a.map((m, j) => m !== L2.b[j]).filter(Boolean).length;
		assert.equal(khac, 1);
		assert.notEqual(L2.a[L2.doi], L2.b[L2.doi]);
	}
	assert.equal(muThayDoi.soChuKy(1499, 500, 250), 0);
	assert.equal(muThayDoi.soChuKy(1500, 500, 250), 1);
	assert.deepEqual(muThayDoi.hangCot(0), { hang: 1, cot: 1 });
	assert.deepEqual(muThayDoi.hangCot(24), { hang: 5, cot: 5 });
	assert.deepEqual(muThayDoi.THOI_GIAN, { hien: 500, xam: 250, toiDa: 90000 });
});

test('Ebbinghaus: vòng trung tâm 60, vòng bao quanh không đè nhau ở mọi vị trí thanh trượt', () => {
	assert.equal(ebb.HINH.duongKinhTam, 2 * ebb.HINH.banKinhTam);
	for (let r = ebb.HINH.quanhMin; r <= ebb.HINH.quanhMax; r++) assert.ok(ebb.khongDe(r), `bán kính ${r}`);
	const p = ebb.viTriQuanh(0, 0, 10, 6);
	assert.equal(p.length, 6);
	assert.ok(Math.abs(p[0].x) < 1e-9 && Math.abs(p[0].y + 10) < 1e-9);
});

// ---------- D8-L2 ----------

test('trí nhớ sai: 18 từ (12 đã học, từ mồi, 5 nhiễu), từ mồi không nằm trong từ đã học; chấm', () => {
	const b = drm.baiKiemTra(ngauNhien(3));
	assert.equal(b.length, 18);
	assert.deepEqual(['study', 'lure', 'unrelated'].map((k) => b.filter((x) => x.kind === k).length), [12, 1, 5]);
	// từ mồi không được xuất hiện, kể cả trong một từ ghép đã học (site cũ có "buồn ngủ")
	for (const w of drm.DANH_SACH.hoc) assert.ok(!w.split(' ').includes(drm.DANH_SACH.moi), w);
	const s = drm.cham(b.map((x) => ({ kind: x.kind, yes: x.kind !== 'unrelated' })));
	assert.deepEqual(s, { hits: 12, n: 12, lureYes: true, faUnrelated: 0, nUnrelated: 5 });
	assert.equal(drm.DANH_SACH.hienMs + drm.DANH_SACH.nghiMs, 1500);
});

test('Wason: quy tắc thật, đọc số kiểu Việt, chấm quy tắc người dùng viết', () => {
	assert.ok(wason.tuanTheo(2, 4, 6) && wason.tuanTheo(-3, 0.5, 100));
	assert.ok(!wason.tuanTheo(6, 4, 2) && !wason.tuanTheo(1, 1, 2));
	assert.equal(wason.docSo('2,5'), 2.5);
	assert.equal(wason.docSo('−3'), -3);
	assert.equal(wason.docSo('abc'), null);
	assert.equal(wason.docSo(''), null);
	for (const q of ['ba số tăng dần', 'mỗi số bất kỳ, số sau lớn hơn', 'Số sau lớn hơn số trước', 'a < b < c', 'tăng dần bất kỳ']) assert.equal(wason.chamQuyTac(q), 'dung', q);
	for (const q of ['số chẵn tăng dần', 'tăng đều 2 đơn vị', 'mỗi số lớn hơn số trước 2', 'cộng thêm 2, tăng', 'mỗi số lớn hơn số trước 1 đơn vị', 'tăng dần, mỗi số lớn hơn số trước 10', 'mỗi số lớn hơn số trước 3', 'số sau gấp đôi số trước, tăng', 'tăng hai đơn vị']) assert.equal(wason.chamQuyTac(q), 'hep', q);
	for (const q of ['số chẵn', 'giảm dần', 'không biết']) assert.equal(wason.chamQuyTac(q), 'sai', q);
	assert.deepEqual(wason.tomTatDay([{ ok: true }, { ok: false }]), { n: 2, khongTuan: 1, tiLe: 0.5 });
});

test('Linda: A đúng về logic; số liệu nghiên cứu', () => {
	assert.ok(linda.dungLogic('a') && !linda.dungLogic('b'));
	assert.deepEqual(linda.NGHIEN_CUU.tversky1983, { soNguoi: 142, chonB: 85 });
});

test('Big Five mini: Mini-IPIP 20 câu, 4 câu mỗi chiều, khóa như IPIP; chấm tổng 4–20', () => {
	assert.equal(bf.CAU.length, 20);
	for (const { k } of bf.CHIEU) assert.equal(bf.CAU.filter((c) => c.k === k).length, 4, k);
	// khóa nghịch theo Mini-IPIP Scoring Key: E 2, A 2, C 2, N 2, Intellect 3
	const nghich = Object.fromEntries(bf.CHIEU.map(({ k }) => [k, bf.CAU.filter((c) => c.k === k && c.khoa < 0).length]));
	assert.deepEqual(nghich, { E: 2, A: 2, C: 2, N: 2, O: 3 });
	assert.equal(bf.CAU.filter((c) => c.dich === 'site').length, 2);
	// không có hai câu cùng chiều liền nhau
	for (let i = 1; i < 20; i++) assert.notEqual(bf.CAU[i].k, bf.CAU[i - 1].k);
	const tat5 = bf.chamDiem(Array(20).fill(5));
	assert.deepEqual(tat5.tong, { E: 12, A: 12, C: 12, N: 12, O: 8 });
	const tot = bf.chamDiem(bf.CAU.map((c) => (c.khoa > 0 ? 5 : 1)));
	assert.deepEqual(Object.values(tot.tong), [20, 20, 20, 20, 20]);
	assert.equal(tot.scores.E, 5);
	assert.equal(bf.chamDiem([3]).tong.E, null);
	assert.equal(bf.THANG.length, 5);
});

test('mỏ neo: xếp nhóm 50/50, neo kẹp hai phía số thật, đọc ước lượng', () => {
	assert.equal(neo.xepNhom(() => 0.2), 'low');
	assert.equal(neo.xepNhom(() => 0.7), 'high');
	for (const c of neo.CAU_HOI) assert.ok(c.neo.low < c.that && c.that < c.neo.high, c.id);
	assert.equal(neo.docUocLuong('95'), 95);
	assert.equal(neo.docUocLuong('1.500'), 1500);
	assert.equal(neo.docUocLuong('38,6%'), 38.6);
	assert.equal(neo.docUocLuong('0'), null);
	assert.equal(neo.docUocLuong('khoảng 90'), null);
	assert.deepEqual(neo.NGHIEN_CUU.tversky1974, { neo: [10, 65], trungVi: [25, 45] });
});

test('trí nhớ từ: 40 từ một âm tiết khác nhau; rút không lặp; chấm theo NFC, bỏ dấu câu', () => {
	assert.equal(new Set(tu.TU).size, 40);
	for (const w of tu.TU) assert.ok(!/\s/.test(w), w);
	const d = tu.rutTu(12, ngauNhien(4));
	assert.equal(new Set(d).size, 12);
	assert.ok(tu.chamTu(['mèo', 'chó'], '  Mèo,  CHÓ '));
	assert.ok(tu.chamTu(['mèo', 'chó'], 'me\u0300o cho\u0301'));
	assert.ok(!tu.chamTu(['mèo', 'chó'], 'chó mèo'));
	assert.deepEqual(tu.chamViTriTu(['mèo', 'chó', 'gà'], 'mèo gà'), [true, false, false]);
	assert.deepEqual(tu.QUY_TRINH, { batDau: 2, toiDa: 12, hienMs: 900, cachMs: 100 });
});

// ---------- Khuôn: mỗi công cụ đăng ký đủ ----------

test('khuôn công cụ: mỗi công cụ trong CONG_CU có module export mount, có trong bộ tải; không còn mã cũ chép nguyên', () => {
	const tai = fs.readFileSync(path.join(ROOT, 'src/scripts/tai.js'), 'utf8');
	for (const [ten, { lop }] of Object.entries(CONG_CU)) {
		const f = path.join(ROOT, `src/scripts/cong-cu/${ten}.js`);
		const ma = fs.readFileSync(f, 'utf8');
		assert.match(ma, /^export function mount\(el\)/m, `${ten}: thiếu export function mount(el)`);
		assert.match(ma, /el\.dataset\.san = '1'/, `${ten}: mount phải đặt data-san khi dựng xong`);
		assert.ok(!/window\.PZ|PZReady|PZStore|PZUI/.test(ma), `${ten}: còn dùng biến toàn cục của mã cũ`);
		assert.ok(tai.includes(`['.${lop}', () => import('./cong-cu/${ten}.js')`), `${ten}: src/scripts/tai.js chưa nạp`);
	}
	assert.ok(!fs.existsSync(path.join(ROOT, 'src/scripts/cu')), 'src/scripts/cu/ (mã cũ chép nguyên) phải bỏ khi đã thay');
});
