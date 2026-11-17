// Đối chiếu với site cũ (đợt 9; plans/lam-lai/doi-chieu.md): mọi trang của site cũ có trang cùng địa chỉ trong bản build
// (luật 4: địa chỉ giữ nguyên). Danh sách 106 trang cũ chụp ở tests/trang-site-cu.txt, nên không cần ../psyche-zero/.
// Bản thật: mọi trang đã khóa, không còn trang "chỉ ở bản xem"; bản xem: có đủ trang. Chưa build thì bỏ qua.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.resolve(ROOT, process.env.PSYCHE_DIST || 'dist');
const TRANG_CU = fs.readFileSync(path.join(ROOT, 'tests/trang-site-cu.txt'), 'utf8').split('\n').filter(Boolean);

test('mọi trang của site cũ có trang cùng địa chỉ trong bản build', { skip: !fs.existsSync(path.join(DIST, 'index.html')) && 'chưa build' }, () => {
	const thieu = TRANG_CU.filter((t) => !fs.existsSync(path.join(DIST, t.replace(/(^|\/)index$/, ''), 'index.html')));
	assert.deepEqual(thieu, []);
});
