// @ts-check
// Cấu hình site Psyche (Astro và Starlight). Phiên bản và lý do: plans/lam-lai/cong-nghe.md.
// D1.1: khung, font, màu, tìm kiếm không dấu. Dữ liệu, thành phần, khóa và hai bản build thêm ở D1.2–D1.6.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import { timKiemKhongDau } from './src/tim-kiem/tich-hop.mjs';

const site = 'https://mtuann.github.io';
const base = '/psyche';

// Font của màn hình đầu (chữ thường và chữ đậm của tiêu đề, bộ latin và vietnamese): nạp trước để chữ hiện đúng font
// ngay lần vẽ đầu. Phải khớp font khai báo trong src/styles/fonts.css (tests/khung.test.mjs kiểm).
const preloadFonts = [
	'be-vietnam-pro-400-normal-latin',
	'be-vietnam-pro-400-normal-vietnamese',
	'be-vietnam-pro-700-normal-latin',
	'be-vietnam-pro-700-normal-vietnamese',
].map((name) => ({
	tag: /** @type {const} */ ('link'),
	attrs: { rel: 'preload', href: `${base}/fonts/${name}.woff2`, as: 'font', type: 'font/woff2', crossorigin: '' },
}));

export default defineConfig({
	site,
	base,
	// Địa chỉ dạng thư mục như site cũ: /psyche/kham-pha/tri-nho/vi-sao-ta-quen/
	trailingSlash: 'always',
	build: { format: 'directory' },
	markdown: {
		// Sätteri, bộ xử lý Markdown mặc định của Astro 7 (plans/lam-lai/cong-nghe.md mục 2). Plugin của dự án (nhãn mức độ
		// chắc chắn, câu hỏi, công cụ, hình, "sắp có") thêm ở D1.4–D1.5.
		processor: satteri({
			features: {
				smartPunctuation: false, // giữ nguyên dấu nháy, gạch ngang như chữ của site cũ (Astro mặc định bật)
				headingAttributes: true, // ## Tiêu đề { #id }: id viết tay, để giữ link #mục của site cũ (D1.5)
				definitionList: true,
				gfm: { footnotes: { label: 'Chú thích', backLabel: 'Quay lại chỗ chú thích {reference}' } },
			},
		}),
	},
	integrations: [
		starlight({
			title: 'Psyche',
			description: 'Tâm lý học bằng bằng chứng, bằng tiếng Việt, cho người không học chuyên ngành.',
			defaultLocale: 'root',
			locales: { root: { label: 'Tiếng Việt', lang: 'vi' } },
			// Dấu ψ của site cũ (favicon), vẽ bằng nét để không phụ thuộc font có chữ Hy Lạp
			logo: { src: './src/assets/logo.svg' },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/fonts.css', './src/styles/psyche.css'],
			components: {
				Footer: './src/components/Footer.astro',
				Hero: './src/components/Hero.astro',
			},
			head: [
				...preloadFonts,
				// Màu thanh trình duyệt trên điện thoại: trùng nền thanh trên cùng của site (src/styles/psyche.css)
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#3b3f8f', media: '(prefers-color-scheme: light)' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#23244a', media: '(prefers-color-scheme: dark)' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${base}/icons/icon-192.png` } },
			],
		}),
		// sau Starlight: bọc pagefind.js mà Starlight vừa dựng (gõ "d" thay "đ" vẫn tìm ra)
		timKiemKhongDau(),
	],
});
