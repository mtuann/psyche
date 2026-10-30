// Bộ sưu tập của site: trang (docs, của Starlight) và chữ giao diện (i18n).
// D1.2 thêm frontmatter riêng (ma, loai, tang, linh_vuc…) và các bộ dữ liệu trong src/data/ (nguồn, nghiên cứu, lĩnh vực,
// ngộ nhận); trạng thái kiểm định không ghi trong trang mà đọc từ kiem-dinh/ lúc build (D1.6), để mã băm của trang
// không đổi khi khóa. Kế hoạch: plans/lam-lai/README.md, Đợt 1.
import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
