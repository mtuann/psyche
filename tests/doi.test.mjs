// Kiểm thử script đối chiếu DOI (D2-0, tools/du_lieu/doi.mjs): luật so một bản ghi nguồn với siêu dữ liệu của Crossref
// và OpenAlex, không gọi mạng. Các ca lấy từ chỗ lệch thật đã gặp khi kiểm định (plans/lam-lai/bao-cao/d2-0.md).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hoTrong, soBanGhi, tuCrossref, tuOpenAlex } from '../tools/du_lieu/doi.mjs';

const cr = (them = {}) =>
	tuCrossref({
		message: {
			author: [{ family: 'Cepeda', given: 'Nicholas J.' }, { family: 'Pashler' }],
			issued: { 'date-parts': [[2006]] },
			title: ['Distributed practice in verbal recall tasks: A review and quantitative synthesis.'],
			'container-title': ['Psychological Bulletin'],
			volume: '132',
			issue: '3',
			page: '354-380',
			type: 'journal-article',
			...them,
		},
	});
const r = (them = {}) => ({
	loai: 'bai-bao',
	tac_gia: 'Cepeda, N. J., & Pashler, H.',
	nam: 2006,
	ten: 'Distributed practice in verbal recall tasks: A review and quantitative synthesis',
	noi_dang: 'Psychological Bulletin, 132(3), 354–380',
	...them,
});

test('khớp: chữ hoa thường, dấu câu cuối, &amp;, "La Berge" như "LaBerge", "Multi-Tasks" như "multitasks"', () => {
	assert.deepEqual(soBanGhi(r(), cr()), []);
	assert.deepEqual(soBanGhi(r({ noi_dang: 'Memory & Cognition, 46(3), 361–369' }), cr({ 'container-title': ['Memory &amp; Cognition'], volume: '46', page: '361-369' })), []);
	assert.deepEqual(soBanGhi(r({ tac_gia: 'LaBerge, S. P.' }), cr({ author: [{ family: 'La Berge' }] })), []);
});

test('lệch: tên lẫn tên tạp chí, tên bằng lời mô tả, thiếu tập, trang đầu sai, năm, tác giả thiếu hay sai thứ tự', () => {
	assert.match(soBanGhi(r({ ten: r().ten + '. Psychological Bulletin, 132(3), 354–380' }), cr()).join(), /^tên:/);
	assert.match(soBanGhi(r({ ten: 'Ôn rải rác giúp nhớ lâu' }), cr()).join(), /^tên:/);
	assert.match(soBanGhi(r({ noi_dang: 'Psychological Bulletin' }), cr()).join(), /nơi đăng: không đọc được/);
	assert.match(soBanGhi(r({ noi_dang: 'Psychological Bulletin, 133(3), 354–380' }), cr()).join(), /tập: nguồn ghi 132/);
	assert.match(soBanGhi(r({ noi_dang: 'Psychological Bulletin, 132(3), 353–380' }), cr()).join(), /trang đầu: nguồn ghi 354/);
	// review D2-0: số tạp chí, trang cuối, tên tạp chí, cắt cụt tên, loại, họ gần giống đều phải bắt
	assert.match(soBanGhi(r({ noi_dang: 'Psychological Bulletin, 132(4), 354–380' }), cr()).join(), /số: nguồn ghi 3/);
	assert.deepEqual(soBanGhi(r({ noi_dang: 'Psychological Bulletin, 132(03), 354–380' }), cr()), []);
	assert.match(soBanGhi(r({ noi_dang: 'Psychological Bulletin, 132(3), 354–387' }), cr()).join(), /trang cuối: nguồn ghi 380/);
	assert.match(soBanGhi(r({ noi_dang: 'Psychological Science, 132(3), 354–380' }), cr()).join(), /tạp chí:/);
	assert.match(soBanGhi(r({ ten: 'Distributed practice in verbal recall tasks: A review' }), cr()).join(), /^tên:/);
	assert.match(soBanGhi(r({ loai: 'sach' }), cr()).join(), /loại: nguồn ghi journal-article/);
	assert.match(soBanGhi(r({ tac_gia: 'Epeda, N. J., & Pashler, H.' }), cr()).join(), /tác giả thứ 1/);
	assert.match(soBanGhi(r({ nam: 2007 }), cr()).join(), /năm: nguồn ghi 2006/);
	assert.match(soBanGhi(r({ tac_gia: 'Cepeda, N. J.' }), cr()).join(), /bản ghi có 1, nguồn có 2 tác giả/);
	assert.match(soBanGhi(r({ tac_gia: 'Cepeda, N. J., & Vul, E.' }), cr()).join(), /tác giả thứ 2 của bản ghi là "Vul"/);
	assert.match(soBanGhi(r(), cr({ author: [] })).join(), /nguồn không ghi tác giả/);
	assert.match(soBanGhi(r(), cr({ 'update-to': [{ type: 'retraction' }] })).join(), /RÚT BÀI/);
});

test('OpenAlex: được bỏ phụ đề của tên; năm khác thì báo (năm đăng trực tuyến do người kiểm lượt 2 xét)', () => {
	const oa = (them = {}) => tuOpenAlex({ title: 'Distributed practice in verbal recall tasks', publication_year: 2006, authorships: [{ author: { display_name: 'Nicholas J. Cepeda' } }, { author: { display_name: 'Harold Pashler' } }], primary_location: { source: { display_name: 'Psychological Bulletin' } }, biblio: { volume: '132', issue: '3', first_page: '354', last_page: '380' }, ...them });
	assert.deepEqual(soBanGhi(r(), oa()), []);
	assert.match(soBanGhi(r(), oa({ publication_year: 2005 })).join(), /năm: nguồn ghi 2005/);
	// Crossref không được bỏ phụ đề
	assert.match(soBanGhi(r(), cr({ title: ['Distributed practice in verbal recall tasks'] })).join(), /^tên:/);
});

test('hoTrong: họ của tác giả kiểu APA, cả chữ viết tắt lạ, "và cộng sự", "…" của APA 7, tổ chức', () => {
	assert.deepEqual(hoTrong('Cepeda, N. J., Pashler, H., & Rohrer, D.'), { ds: ['Cepeda', 'Pashler', 'Rohrer'], conNua: false });
	assert.deepEqual(hoTrong('Evans, J. St. B. T.'), { ds: ['Evans'], conNua: false });
	assert.deepEqual(hoTrong('Klayman, J., & Ha, Y.-w.'), { ds: ['Klayman', 'Ha'], conNua: false });
	assert.deepEqual(hoTrong('Boyce, V., Prystawski, B., và cộng sự'), { ds: ['Boyce', 'Prystawski'], conNua: true });
	assert.deepEqual(hoTrong('A, B., C, D., … Dugravot, A.'), { ds: ['A', 'C', 'Dugravot'], conNua: true });
	assert.deepEqual(hoTrong('OECD'), { ds: ['OECD'], conNua: false });
});
