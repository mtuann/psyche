// Route middleware của Starlight (astro.config.mjs, routeMiddleware): bài lặp trong lĩnh vực của Nền tảng không là
// trang đang xem ở chỗ lặp, và Trước, Tiếp bỏ qua chỗ lặp (suaBanLap, src/menu.mjs).
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { suaBanLap } from './menu.mjs';

export const onRequest = defineRouteMiddleware((context) => {
	suaBanLap(context.locals.starlightRoute);
});
