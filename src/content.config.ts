// Bộ sưu tập của site: trang (docs, của Starlight), chữ giao diện (i18n) và năm bộ dữ liệu trong src/data/.
// Schema, kiểm chéo và bộ nạp của dữ liệu ở src/du-lieu.mjs; dữ liệu sai thì build hỏng.
// Tầng, lĩnh vực, dua_tren, hạn xem lại của trang ghi ở src/data/trang.yml, không ghi ở frontmatter (ghi thì build hỏng);
// trạng thái kiểm định đọc từ kiem-dinh/ lúc build (D1.6). Nhờ vậy mã băm của trang không đổi khi các thông tin ấy đổi.
import fs from 'node:fs';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { dungLaiKhiDoi } from './ban-build.mjs';
import { boNap, frontmatterRieng, schema, trangChuaDangKy } from './du-lieu.mjs';

// Đọc và kiểm toàn bộ dữ liệu ngay khi nạp cấu hình; sai thì ném lỗi tại đây. Trang chưa có trong trang.yml cũng vậy.
const chuaDangKy = trangChuaDangKy();
if (chuaDangKy.length)
	throw new Error(`Trang chưa có trong src/data/trang.yml (thêm bản ghi id, tang, linh_vuc):\n- ${chuaDangKy.join('\n- ')}`);

// Bộ nạp bổ sung: chưa có file nào thì thôi, không để glob in cảnh báo mỗi lần build
const boSung = () => {
	const g = glob({ pattern: '**/*.md', base: './src/content/bo-sung' });
	const co = () => fs.existsSync('src/content/bo-sung') && fs.readdirSync('src/content/bo-sung', { recursive: true }).some((f) => String(f).endsWith('.md'));
	return { ...g, load: async (ctx: Parameters<typeof g.load>[0]) => (co() ? g.load(ctx) : ctx.store.clear()) };
};

const duLieu = (ten: keyof typeof schema) => defineCollection({ loader: boNap(ten), schema: schema[ten] });

export const collections = {
	// dựng lại mọi trang khi dữ liệu, plugin, hình, khóa hay danh sách trang đổi (dungLaiKhiDoi, src/ban-build.mjs)
	docs: defineCollection({
		loader: dungLaiKhiDoi(docsLoader()),
		// in_duoc: trang vào Sách in (như site cũ; Sách in sinh lúc build ở đợt 8)
		schema: docsSchema({ extend: frontmatterRieng.extend({ in_duoc: z.boolean().optional() }) }),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
	'linh-vuc': duLieu('linh-vuc'),
	trang: duLieu('trang'),
	nguon: duLieu('nguon'),
	'nghien-cuu': duLieu('nghien-cuu'),
	'ngo-nhan': duLieu('ngo-nhan'),
	// Bổ sung có ngày của trang (D1.4): src/content/bo-sung/<trang>/<ngày>.md, hiện cuối trang (BoSung.astro)
	'bo-sung': defineCollection({
		loader: boSung(),
		schema: z
			.object({
				trang: z.string().regex(/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/, 'đường dẫn trang như "thi-nghiem/asch"'),
				ngay: z.coerce.date(),
				anh_huong_nhan: z.boolean().default(false),
			})
			.strict(),
	}),
};
