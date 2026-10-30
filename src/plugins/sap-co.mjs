// Plugin hast cho Sätteri (D1.5): link tới một trang của site chưa có trong bản build (chưa chuyển; ở bản thật: chưa khóa)
// thành chữ thường kèm nhãn "sắp có".
// Chép từ ../opus/src/plugins/sap-co.mjs. Khi trang lên site, link tự hiện lại ở lần build sau. Chỉ xét link tới trang
// (/psyche/…/); link ngoài, #mục trong trang, file tĩnh giữ nguyên. Xét cả link trong HTML thô (khối HTML viết trong trang,
// HTML do chỉ thị dựng), miễn thẻ <a> mở và đóng trong cùng một khối.
// Chữ "sắp có" giữ địa chỉ đích ở data-href: tests/link.test.mjs kiểm đích là trang trong kế hoạch mà bản build chưa có
// (bắt link gõ sai và trang bị bỏ sót khỏi trangTrongBan). Dấu cách thật trước nhãn, để chữ chép ra không dính liền.
import { laFile, trangCuaDiaChi } from '../ban-build.mjs';

const TITLE = 'Trang này sẽ lên site sau khi được kiểm chứng lại';

/** @param {{ base: string, trangCo: () => string[] }} opts trangCo: danh sách trang trong bản build (trangTrongBan). */
export function sapCo({ base, trangCo }) {
	return () => {
		const trang = trangCo();
		const chuaCo = (href) => typeof href === 'string' && href.startsWith(base) && !laFile(href) && !trangCuaDiaChi(href, base, trang);
		return {
			name: 'psyche-sap-co',
			element: {
				filter: ['a'],
				visit(node) {
					if (!chuaCo(node.properties?.href)) return;
					return {
						type: 'element',
						tagName: 'span',
						properties: { class: 'pz-sap-co', 'data-href': node.properties.href, title: TITLE },
						children: [
							...node.children,
							{ type: 'text', value: ' ' },
							{ type: 'element', tagName: 'span', properties: { class: 'pz-sap-co-nhan', 'data-pagefind-ignore': true }, children: [{ type: 'text', value: 'sắp có' }] },
						],
					};
				},
			},
			raw(node) {
				const moi = node.value.replace(/<a\s[^>]*?\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (the, href, chu) =>
					chuaCo(href.replaceAll('&amp;', '&'))
						? `<span class="pz-sap-co" data-href="${href}" title="${TITLE}">${chu} <span class="pz-sap-co-nhan" data-pagefind-ignore>sắp có</span></span>`
						: the,
				);
				if (moi !== node.value) return { type: 'raw', value: moi };
			},
		};
	};
}
