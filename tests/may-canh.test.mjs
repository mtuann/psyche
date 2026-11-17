// Kiểm thử máy canh (tools/may-canh.mjs, đợt 9): phần tính trên một bản chép nhỏ của repo (hồ sơ, khoa.json, dữ liệu), và
// phần hỏi Crossref với fetch giả: không gọi mạng. Cuối cùng chạy script trên repo thật với --khong-mang.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parse, stringify } from 'yaml';
import {
	UA,
	bangDoi,
	chuanDoi,
	congNgay,
	diaChi,
	docKho,
	doiTuLink,
	hoiCrossref,
	issueKiemLai,
	issueRutBai,
	issueThoiSu,
	kiemLaiToiHan,
	layJson,
	loiDaXet,
	nhomCapNhat,
	phatHien,
	soNgay,
	thoiSuToiHan,
	trangThaiKhoa,
} from '../tools/may-canh.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

/** Bản chép nhỏ: hai trang (một khóa, một chưa), một bản ghi khóa từng phần, nguon.yml có DOI. */
function repoMau() {
	const goc = fs.mkdtempSync(path.join(os.tmpdir(), 'psyche-may-canh-'));
	const ghi = (f, x) => {
		fs.mkdirSync(path.dirname(path.join(goc, f)), { recursive: true });
		fs.writeFileSync(path.join(goc, f), typeof x === 'string' ? x : stringify(x));
	};
	ghi('src/data/nguon.yml', [
		{ id: 'stapel2011', loai: 'bai-bao', tac_gia: 'Stapel, D. A., & Lindenberg, S.', nam: 2011, ten: 'Coping with chaos', noi_dang: 'Science', doi: '10.1126/science.1201068' },
		{ id: 'a2000', loai: 'bai-bao', tac_gia: 'A, B.', nam: 2000, ten: 'Bài A', doi: '10.1000/ABC' },
		{ id: 'b2001', loai: 'bai-bao', tac_gia: 'B, C.', nam: 2001, ten: 'Bài B', doi: '10.1000/b', rut_bai: { ngay: '2020-01-01', nguon: 'https://x.org/' } },
		{ id: 'sach', loai: 'sach', tac_gia: 'C', nam: 1999, ten: 'Sách' },
	]);
	ghi('src/data/trang.yml', [
		{ id: 'kham-pha/x/mot', tang: 'mo-rong', kiem_lai_truoc: '2027-06' },
		{ id: 'kham-pha/x/hai', tang: 'mo-rong', kiem_lai_truoc: '2028-06' },
		{ id: 'kham-pha/x/ba', tang: 'loi' },
	]);
	ghi('src/data/ngo-nhan.yml', [{ id: 'the-a', nguon: ['a2000'] }]);
	ghi('src/data/nghien-cuu.yml', [{ id: 'hs-stapel', nguon: ['stapel2011'] }]);
	ghi('kiem-dinh/khoa.json', JSON.stringify({ trang: { 'kham-pha/x/mot': 'sha256:1' }, ban_ghi: { 'ngo-nhan/the-a#cap,trang': 'sha256:2' } }));
	ghi('kiem-dinh/kham-pha/x/mot.yml', {
		trang: 'src/content/docs/kham-pha/x/mot.md',
		nguon: [
			{ id: 'stapel', ten: 'Stapel 2011', link: 'https://doi.org/10.1126/SCIENCE.1201068' },
			{ id: 'a2000', ten: 'A 2000 (PMC)', link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1/' },
			{ id: 'tim', ten: 'Tìm Europe PMC', link: 'https://www.ebi.ac.uk/europepmc/' },
		],
		nhan_dinh: [
			{ id: 'n1', cau: 'Stapel nói rác làm người ta định kiến hơn.', loai: 'phat-hien', nguon: ['stapel'], ket_qua: 'dung' },
			{ id: 'n2', cau: 'Câu đã bỏ.', loai: 'phat-hien', nguon: ['stapel'], ket_qua: 'da-bo' },
			{ id: 'n3', cau: 'Tính đến 11/2026, chưa tìm thấy nghiên cứu ở Việt Nam.', loai: 'thoi-su', nguon: ['tim'], het_han: '2027-01-30', ket_qua: 'dung' },
			{ id: 'n4', cau: 'Thời sự xa.', loai: 'thoi-su', nguon: ['tim'], het_han: '2028-11-01', ket_qua: 'dung' },
			{ id: 'n5', cau: 'Thời sự đã bỏ.', loai: 'thoi-su', nguon: ['tim'], het_han: '2026-01-01', ket_qua: 'da-bo' },
			{ id: 'n6', cau: 'A nói vậy.', loai: 'phat-hien', nguon: ['a2000'], ket_qua: 'dung' },
		],
	});
	// chưa khóa: thời sự tới hạn không báo
	ghi('kiem-dinh/kham-pha/x/hai.yml', {
		trang: 'src/content/docs/kham-pha/x/hai.md',
		nguon: [{ id: 'tim', link: 'https://x.org/' }],
		nhan_dinh: [{ id: 'n1', cau: 'Chưa khóa.', loai: 'thoi-su', nguon: ['tim'], het_han: '2026-01-01', ket_qua: 'dung' }],
	});
	// khóa từng phần: chỉ nhận định về trường đã khóa (hay không ghi truong)
	ghi('kiem-dinh/du-lieu/ngo-nhan/the-a.yml', {
		ban_ghi: 'ngo-nhan/the-a',
		nguon: [{ id: 'tim', link: 'https://x.org/' }],
		nhan_dinh: [
			{ id: 'n1', cau: 'Về cấp.', loai: 'thoi-su', truong: ['cap'], nguon: ['tim'], het_han: '2026-12-01', ket_qua: 'dung' },
			{ id: 'n2', cau: 'Về giải thích (chưa khóa).', loai: 'thoi-su', truong: ['giai_thich'], nguon: ['tim'], het_han: '2026-12-01', ket_qua: 'dung' },
		],
	});
	// hồ sơ của chính bản ghi nguồn: không phải nơi dùng
	ghi('kiem-dinh/du-lieu/nguon/a2000.yml', { ban_ghi: 'nguon/a2000', nguon: [{ id: 'crossref', link: 'https://doi.org/10.1000/abc' }], nhan_dinh: [] });
	ghi('tools/may-canh-da-xet.yml', '# trống\n[]\n');
	return { goc, xoa: () => fs.rmSync(goc, { recursive: true, force: true }) };
}

test('ngày: cộng ngày, đếm ngày qua cuối năm', () => {
	assert.equal(congNgay('2026-12-20', 30), '2027-01-19');
	assert.equal(soNgay('2026-11-17', '2027-01-30'), 74);
	assert.equal(soNgay('2027-02-01', '2027-01-30'), -2);
});

test('DOI: viết chuẩn, đọc từ link doi.org, bỏ link khác', () => {
	assert.equal(chuanDoi('10.1037/0021-843X.87.1.49'), '10.1037/0021-843x.87.1.49');
	assert.equal(chuanDoi('https://doi.org/10.1000/ABC.'), '10.1000/abc');
	assert.equal(chuanDoi('doi:10.1000/a%28b%29'), '10.1000/a(b)');
	assert.equal(chuanDoi('(xem 10.1000/x)'.slice(5)), '10.1000/x', 'ngoặc đóng thừa ở cuối bị bỏ');
	assert.equal(chuanDoi('không phải'), null);
	assert.equal(doiTuLink('http://dx.doi.org/10.1000/X'), '10.1000/x');
	assert.equal(doiTuLink('https://api.crossref.org/works/10.1000%2Fx'), null);
	assert.equal(diaChi('thi-nghiem/index'), 'https://mtuann.github.io/psyche/thi-nghiem/');
	assert.equal(diaChi('index'), 'https://mtuann.github.io/psyche/');
});

test('trạng thái khóa: trang, bản ghi cả và từng phần', () => {
	const khoa = { trang: { a: 'x' }, ban_ghi: { 'nguon/x': 'y', 'ngo-nhan/t#cap': 'z', 'ngo-nhan/t#trang': 'w' } };
	assert.deepEqual(trangThaiKhoa({ trang: 'a' }, khoa), { khoa: true, truong: null });
	assert.deepEqual(trangThaiKhoa({ trang: 'b' }, khoa), { khoa: false, truong: null });
	assert.deepEqual(trangThaiKhoa({ banGhi: 'nguon/x' }, khoa), { khoa: true, truong: null });
	assert.deepEqual(trangThaiKhoa({ banGhi: 'ngo-nhan/t' }, khoa), { khoa: true, truong: ['cap', 'trang'] });
	assert.deepEqual(trangThaiKhoa({ banGhi: 'ngo-nhan/u' }, khoa), { khoa: false, truong: null });
});

test('thời sự tới hạn: chỉ mục đã khóa, phần đã khóa, bỏ câu da-bo, báo trước 30 ngày', (t) => {
	const r = repoMau();
	t.after(r.xoa);
	const kho = docKho(r.goc);
	assert.deepEqual(thoiSuToiHan(kho, '2026-10-01').map((x) => `${x.muc} ${x.id}`), [], 'câu tới hạn ở trang chưa khóa, câu da-bo không tính');
	assert.deepEqual(
		thoiSuToiHan(kho, '2026-11-20').map((x) => `${x.muc} ${x.id} ${x.con}`),
		['du-lieu/ngo-nhan/the-a n1 11'],
	);
	const ds = thoiSuToiHan(kho, '2027-01-15');
	assert.deepEqual(ds.map((x) => `${x.muc} ${x.id} ${x.con}`), ['du-lieu/ngo-nhan/the-a n1 -45', 'kham-pha/x/mot n3 15']);
	assert.equal(thoiSuToiHan(kho, '2027-01-15', 10).length, 1, 'ngưỡng 10 ngày');
	const md = issueThoiSu(ds, '2027-01-15');
	assert.match(md, /\| \[`kham-pha\/x\/mot`\]\(https:\/\/mtuann\.github\.io\/psyche\/kham-pha\/x\/mot\/\) \| `n3` \| Tính đến 11\/2026/);
	assert.match(md, /quá hạn 45 ngày/);
	assert.match(md, /bản ghi `ngo-nhan\/the-a`/);
	assert.match(md, /tools\/khoa\.mjs mo/);
});

test('kiểm lại: hạn là ngày 1 của tháng kiem_lai_truoc, báo trước 30 ngày, kèm trạng thái khóa', (t) => {
	const r = repoMau();
	t.after(r.xoa);
	const kho = docKho(r.goc);
	assert.deepEqual(kiemLaiToiHan(kho, '2027-05-01'), []);
	const ds = kiemLaiToiHan(kho, '2027-05-02');
	assert.deepEqual(ds.map((x) => [x.id, x.con, x.khoa]), [['kham-pha/x/mot', 30, true]]);
	assert.deepEqual(kiemLaiToiHan(kho, '2028-07-01').map((x) => [x.id, x.khoa]), [['kham-pha/x/mot', true], ['kham-pha/x/hai', false]]);
	const md = issueKiemLai(kiemLaiToiHan(kho, '2028-07-01'), '2028-07-01');
	assert.match(md, /trước 6\/2027 \(quá hạn 396 ngày\) \| đã khóa/);
	assert.match(md, /chưa khóa: đặt lại `kiem_lai_truoc`/);
});

test('bảng DOI: nguon.yml, link doi.org của hồ sơ, id trùng nguon.yml; bỏ hồ sơ bản ghi nguồn và nhận định da-bo', (t) => {
	const r = repoMau();
	t.after(r.xoa);
	const bang = bangDoi(docKho(r.goc));
	assert.deepEqual([...bang.keys()].sort(), ['10.1000/abc', '10.1000/b', '10.1126/science.1201068']);
	const st = bang.get('10.1126/science.1201068');
	assert.deepEqual(st.nguon.map((x) => x.id), ['stapel2011']);
	assert.deepEqual(st.dung.map((u) => [u.muc, u.nguonId, u.khoa, u.nhanDinh.map((n) => n.id)]), [['kham-pha/x/mot', 'stapel', true, ['n1']]]);
	assert.deepEqual(st.nghienCuu, ['hs-stapel']);
	// a2000: hồ sơ trang dẫn qua link PMC, cùng id với bản ghi có DOI; hồ sơ của bản ghi nguồn bị bỏ
	const a = bang.get('10.1000/abc');
	assert.deepEqual(a.dung.map((u) => [u.muc, u.nhanDinh.map((n) => n.id)]), [['kham-pha/x/mot', ['n6']]]);
	assert.deepEqual(a.ngoNhan, ['the-a']);
});

test('nhóm thông báo của Crossref', () => {
	assert.equal(nhomCapNhat('retraction'), 'rut');
	assert.equal(nhomCapNhat('partial_retraction'), 'rut');
	assert.equal(nhomCapNhat('withdrawal'), 'rut');
	assert.equal(nhomCapNhat('expression_of_concern'), 'quan-ngai');
	assert.equal(nhomCapNhat('correction'), 'dinh-chinh');
	assert.equal(nhomCapNhat('erratum'), 'dinh-chinh');
	assert.equal(nhomCapNhat('new_version'), 'ban-moi');
});

const tb = (doi, type, source = 'publisher') => ({ DOI: doi, type, label: type, source, updated: { 'date-parts': [[2011, 12, 2]] } });

test('phát hiện: rút trước đính chính, bản mới sau cùng; gộp hai nguồn của một thông báo; bỏ đã xét, rut_bai đã ghi', (t) => {
	const r = repoMau();
	t.after(r.xoa);
	const bang = bangDoi(docKho(r.goc));
	const capNhat = new Map([
		['10.1126/science.1201068', [tb('10.1126/science.334.6060.1202-a', 'retraction', 'retraction-watch'), tb('10.1126/SCIENCE.334.6060.1202-A', 'retraction')]],
		['10.1000/abc', [tb('10.1000/abc-sua', 'correction'), tb('10.1000/abc-v2', 'new_version')]],
		['10.1000/b', [tb('10.1000/b-rut', 'retraction')]],
	]);
	const ds = phatHien(bang, capNhat);
	assert.deepEqual(ds.map((p) => [p.doi, p.nhom, p.thong_bao.map((u) => u.doi)]), [
		['10.1126/science.1201068', 'rut', ['10.1126/science.334.6060.1202-a']],
		['10.1000/abc', 'dinh-chinh', ['10.1000/abc-sua', '10.1000/abc-v2']],
	]);
	assert.deepEqual(ds[1].thong_bao.map((u) => u.nhom), ['dinh-chinh', 'ban-moi']);
	assert.deepEqual(ds[0].thong_bao[0].nguon, ['retraction-watch', 'publisher']);
	const daXet = [{ doi: '10.1000/ABC', thong_bao: '10.1000/abc-sua', ngay: '2026-11-17', ket_luan: 'không chạm số site dùng' }];
	assert.deepEqual(loiDaXet(daXet), []);
	assert.deepEqual(phatHien(bang, capNhat, daXet).map((p) => [p.doi, p.nhom]), [['10.1126/science.1201068', 'rut'], ['10.1000/abc', 'ban-moi']], 'đã xét đính chính, còn bản mới');
	// DOI không hỏi được (không có trong capNhat) không bao giờ thành phát hiện; cờ OpenAlex chỉ là tín hiệu
	assert.deepEqual(phatHien(bang, new Map()), []);
	const oa = phatHien(bang, new Map(), [], new Set(['10.1000/abc', '10.1000/b']));
	assert.deepEqual(oa.map((p) => [p.doi, p.openAlex]), [['10.1000/abc', true]]);
	const md = issueRutBai(ds, '2026-11-17', { soDoi: 3, khongCo: ['10.9/x'], loi: ['10.9/y'], openAlex: 'không hỏi' });
	assert.match(md, /bị rút \(toàn bộ hay một phần\) 1, đính chính 1/);
	assert.match(md, /retraction \(2\/12\/2011\): \[10\.1126\/science\.334\.6060\.1202-a\]/);
	assert.match(md, /trang \[`kham-pha\/x\/mot`\].*\(đã khóa\), nguồn `stapel`/);
	assert.match(md, /`n1`: Stapel nói rác/);
	assert.doesNotMatch(md, /Câu đã bỏ/);
	assert.match(md, /hồ sơ nghiên cứu `hs-stapel`/);
	assert.match(md, /thẻ ngộ nhận `the-a`/);
	assert.match(md, /1 DOI không hỏi được vì lỗi mạng/);
	assert.match(md, /1 DOI không có ở Crossref/);
	assert.match(md, /tools\/may-canh-da-xet\.yml/);
});

test('file đã xét: báo trường thiếu, sai, lạ', () => {
	assert.deepEqual(loiDaXet([]), []);
	assert.match(loiDaXet({}).join(), /danh sách/);
	const loi = loiDaXet([{ doi: 'x', thong_bao: '10.1/a', ngay: '2026-13-01', la: 1 }]).join('\n');
	assert.match(loi, /doi phải là DOI/);
	assert.match(loi, /ngay phải dạng/);
	assert.match(loi, /thiếu ket_luan/);
	assert.match(loi, /trường lạ la/);
	assert.deepEqual(loiDaXet(parse(fs.readFileSync(path.join(ROOT, 'tools/may-canh-da-xet.yml'), 'utf8')) ?? []), [], 'file đã xét của repo hợp lệ');
});

/** fetch giả: `tra(url, lan)` trả { status, json, headers }; ghi lại các URL và header đã gọi. */
function fetchGia(tra) {
	const goi = [];
	const f = async (url, opt) => {
		goi.push({ url, headers: opt?.headers });
		const r = await tra(url, goi.filter((g) => g.url === url).length);
		if (r instanceof Error) throw r;
		return { ok: r.status >= 200 && r.status < 300, status: r.status, headers: { get: (k) => r.headers?.[k] ?? null }, json: async () => r.json };
	};
	return { f, goi };
}
const khongCho = async () => {};

test('gọi mạng: User-Agent của dự án, không email; thử lại khi lỗi mạng, 429, 5xx; không thử lại 404', async () => {
	const { f, goi } = fetchGia((url, lan) => (lan < 3 ? (lan === 1 ? new Error('ECONNRESET') : { status: 503 }) : { status: 200, json: { ok: 1 } }));
	assert.deepEqual(await layJson('https://api.crossref.org/x', { fetch: f, cho: khongCho }), { ok: true, json: { ok: 1 } });
	assert.equal(goi.length, 3);
	assert.equal(goi[0].headers['User-Agent'], UA);
	assert.doesNotMatch(JSON.stringify(goi) + UA, /@|mailto/);
	const het = fetchGia(() => ({ status: 429, headers: { 'retry-after': '5' } }));
	const cho = [];
	const r = await layJson('u', { fetch: het.f, cho: async (ms) => cho.push(ms) });
	assert.equal(r.ok, false);
	assert.equal(het.goi.length, 4);
	assert.deepEqual(cho, [5000, 5000, 5000]);
	const k = fetchGia(() => ({ status: 404 }));
	assert.equal((await layJson('u', { fetch: k.f, cho: khongCho })).status, 404);
	assert.equal(k.goi.length, 1);
});

test('hỏi Crossref: theo lô; DOI thiếu trong lô thì hỏi riêng (404: không có ở Crossref); lỗi mạng thì ghi riêng, không thành phát hiện', async () => {
	const dois = Array.from({ length: 45 }, (_, i) => `10.1000/d${i}`);
	const { f, goi } = fetchGia((url) => {
		if (url.includes('/works?')) {
			const lo = decodeURIComponent(/filter=([^&]+)/.exec(url)[1]).split(',').map((x) => x.slice(4));
			// lô đầu: Crossref trả DOI chữ hoa, thiếu d3; d0 có thông báo rút
			if (lo.includes('10.1000/d0'))
				return { status: 200, json: { message: { items: lo.filter((d) => d !== '10.1000/d3').map((d) => ({ DOI: d.toUpperCase(), ...(d === '10.1000/d0' ? { 'updated-by': [tb('10.1000/r0', 'retraction')] } : {}) })) } } };
			return new Error('mạng hỏng'); // lô sau: lỗi mạng mọi lần thử
		}
		return { status: 404 };
	});
	const kq = await hoiCrossref(dois, { fetch: f, cho: khongCho });
	assert.equal(kq.capNhat.size, 39);
	assert.equal(kq.capNhat.get('10.1000/d0')[0].type, 'retraction');
	assert.deepEqual(kq.capNhat.get('10.1000/d1'), []);
	assert.deepEqual(kq.khongCo, ['10.1000/d3']);
	assert.deepEqual(kq.loi, dois.slice(40));
	assert.ok(goi.some((g) => g.url === 'https://api.crossref.org/works/10.1000%2Fd3'));
	assert.match(goi[0].url, /select=DOI%2Cupdated-by|select=DOI,updated-by/);
	const bang = new Map(dois.map((d) => [d, { doi: d, nguon: [], dung: [], ngoNhan: [], nghienCuu: [] }]));
	assert.deepEqual(phatHien(bang, kq.capNhat).map((p) => p.doi), ['10.1000/d0']);
});

test('script trên repo thật (không mạng): đọc được dữ liệu, mã thoát đúng, cờ --ngay', () => {
	const chay = (...a) => spawnSync(process.execPath, [path.join(ROOT, 'tools/may-canh.mjs'), ...a], { encoding: 'utf8' });
	const r = chay('rut-bai', '--khong-mang');
	assert.equal(r.status, 0, r.stderr);
	assert.match(r.stdout, /Rút bài: \d+ DOI/);
	assert.equal(chay('thoi-su', '--ngay', '2099-01-01').status, 1, 'năm 2099 mọi khẳng định thời sự đã tới hạn');
	assert.equal(chay('kiem-lai', '--ngay', '2099-01-01').status, 1);
	assert.equal(chay('thoi-su', '--ngay', '2027-13-01').status, 2);
	assert.equal(chay('khong-co').status, 2);
	const tep = path.join(os.tmpdir(), `psyche-may-canh-${process.pid}.md`);
	try {
		assert.equal(chay('kiem-lai', '--ngay', '2099-01-01', '--ra', tep).status, 1);
		assert.match(fs.readFileSync(tep, 'utf8'), /^Lần kiểm tra tự động ngày 1\/1\/2099/);
	} finally {
		fs.rmSync(tep, { force: true });
	}
});
