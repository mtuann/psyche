// Bộ sưu tập của site: trang (docs, của Starlight), chữ giao diện (i18n) và năm bộ dữ liệu trong src/data/.
// Schema, kiểm chéo và bộ nạp của dữ liệu ở src/du-lieu.mjs; dữ liệu sai thì build hỏng.
// Tầng, lĩnh vực, dua_tren, hạn xem lại của trang ghi ở src/data/trang.yml, không ghi ở frontmatter (ghi thì build hỏng);
// trạng thái kiểm định đọc từ kiem-dinh/ lúc build (D1.6). Nhờ vậy mã băm của trang không đổi khi các thông tin ấy đổi.
import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { boNap, frontmatterRieng, schema, trangChuaDangKy } from './du-lieu.mjs';

// Đọc và kiểm toàn bộ dữ liệu ngay khi nạp cấu hình; sai thì ném lỗi tại đây. Trang chưa có trong trang.yml cũng vậy.
const chuaDangKy = trangChuaDangKy();
if (chuaDangKy.length)
	throw new Error(`Trang chưa có trong src/data/trang.yml (thêm bản ghi id, tang, linh_vuc):\n- ${chuaDangKy.join('\n- ')}`);

const duLieu = (ten: keyof typeof schema) => defineCollection({ loader: boNap(ten), schema: schema[ten] });

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: frontmatterRieng }) }),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
	'linh-vuc': duLieu('linh-vuc'),
	trang: duLieu('trang'),
	nguon: duLieu('nguon'),
	'nghien-cuu': duLieu('nghien-cuu'),
	'ngo-nhan': duLieu('ngo-nhan'),
};
