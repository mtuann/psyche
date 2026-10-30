// Biểu tượng của nhóm menu và của 14 lĩnh vực (D1.3): nét vẽ trên khung 24 × 24, màu theo chữ (currentColor), để cùng
// một hình dùng được ở nền sáng, nền tối và trong màu của lĩnh vực. Biểu tượng chỉ để trang trí (aria-hidden): tên nhóm,
// tên lĩnh vực luôn viết bằng chữ cạnh nó. Lĩnh vực chọn biểu tượng bằng trường bieu_tuong của src/data/linh-vuc.yml.

/** Tên biểu tượng -> các nét (phần trong thẻ <svg>). */
export const BIEU_TUONG = {
	// nhóm menu
	'bat-dau': '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
	'nen-tang': '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
	'thi-nghiem': '<path d="M9 3h6"/><path d="M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7.5 14h9"/>',
	'bang-chung': '<path d="M4 20h16"/><path d="M7 16v-5"/><path d="M12 16V6"/><path d="M17 16v-8"/>',
	'trai-nghiem': '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5.5 3.5-5.5 3.5z"/>',
	'ngo-nhan': '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7"/><path d="M12 17h.01"/>',
	'ho-tro': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
	them: '<circle cx="6" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18" cy="12" r="1.3"/>',
	// lĩnh vực
	'kinh-lup': '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>',
	'no-ron': '<circle cx="12" cy="12" r="3"/><path d="M12 9V4M9.4 13.5 5 16M14.6 13.5 19 16M12 4l-2-1.5M12 4l2-1.5M5 16l-.5 2.5M19 16l.5 2.5"/>',
	mat: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
	trang: '<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/>',
	chuong: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
	'den-tri-nho': '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
	'manh-ghep': '<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z"/>',
	mam: '<path d="M12 21v-9"/><path d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6z"/><path d="M12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z"/>',
	tim: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
	'mat-na': '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
	'nhom-nguoi': '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M15.5 5.2a3.2 3.2 0 0 1 0 5.6M17.5 14a6 6 0 0 1 3.5 6"/>',
	song: '<path d="M3 12h3.5l2.5-6 4 12 2.5-6H21"/>',
	'mat-troi': '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
	'ban-tay': '<path d="M12 20s-6-3.5-6-8a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 4.5-6 8-6 8z"/><path d="M3 15c2 0 3 1 4.5 2.5M21 15c-2 0-3 1-4.5 2.5"/>',
};

/** Thẻ <svg> của một biểu tượng (trang trí), hay chuỗi rỗng nếu không có tên ấy. */
export function svg(ten, lop = 'pz-icon') {
	const net = BIEU_TUONG[ten];
	if (!net) return '';
	return (
		`<svg class="${lop}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" ` +
		`stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${net}</svg>`
	);
}
