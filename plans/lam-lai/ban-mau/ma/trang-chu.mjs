// BẢN MẪU GIAO DIỆN (không đăng): sinh src/content/docs/index.md cho một phương án.
//   node src/mau/trang-chu.mjs A > src/content/docs/index.md
// Site thật sinh các danh sách của trang chủ từ dữ liệu, chỉ trang đã khóa (D2-L1).
import { LINH_VUC, href } from './du-lieu.mjs';

const mau = (process.argv[2] || 'A').toUpperCase();

const NHAN = [
	['vung-chac', 'Vững chắc'],
	['kha-vung', 'Khá vững'],
	['tranh-cai', 'Đang tranh cãi'],
	['bac-bo', 'Đã bị bác bỏ'],
];
const hangNhan = `<p class="pz-hang-nhan not-content">${NHAN.map(([m, t]) => `<span class="pz-tag pz-tag--${m}">${t}</span>`).join(' ')}</p>`;

const dau = ({ title, tagline, actions }) => `---
title: Psyche
description: Tâm lý học bằng bằng chứng, bằng tiếng Việt, cho người không học chuyên ngành.
template: splash
head:
  - tag: title
    content: Psyche
hero:
${title ? `  title: ${JSON.stringify(title)}\n` : ''}  tagline: ${JSON.stringify(tagline)}
  actions:
${actions
	.map(
		([text, link, variant, icon]) =>
			`    - text: ${JSON.stringify(text)}\n      link: ${link}\n      variant: ${variant}${icon ? `\n      icon: ${icon}` : ''}`,
	)
	.join('\n')}
---
`;

const ghiChu = `:::note[Đây là site giáo dục]
Psyche giúp bạn hiểu tâm lý học như một ngành khoa học. Site không chẩn đoán và không thay thế chuyên gia. Nếu bạn đang gặp khó khăn, hãy xem [trang Hỗ trợ](${href('ho-tro')}).
:::
`;

const THU = [
	['Hiệu ứng Stroop', 'trai-nghiem/stroop', 'Đọc chữ thì dễ, gọi tên màu mực mới khó. Đo xem não bạn "cãi nhau" mất bao nhiêu mili giây.'],
	['Bạn nhớ được bao nhiêu chữ số?', 'trai-nghiem/do-dai-tri-nho', 'Giới hạn của trí nhớ ngắn hạn, và vì sao con số "7" nổi tiếng không hẳn đúng.'],
	['Bạn nghĩ gì về tâm trí?', 'bat-dau/ban-nghi-gi', '20 khẳng định quen thuộc. Đúng, sai hay còn tranh cãi?'],
];

function A() {
	return `${dau({
		tagline: 'Tâm lý học bằng bằng chứng, bằng tiếng Việt, cho người không học chuyên ngành. Mỗi trang trả lời một câu hỏi: bằng chứng nói gì, và chắc chắn đến đâu?',
		actions: [
			['Bắt đầu đọc', href('bat-dau'), 'primary', 'right-arrow'],
			['Thử với chính bạn', href('trai-nghiem'), 'secondary'],
		],
	})}
## Thử với chính bạn

<div class="pz-luoi not-content">${THU.map(([t, d, m]) => `<a href="${href(d)}"><strong>${t}</strong><span>${m}</span></a>`).join('')}</div>

## Mới kiểm chứng

<div class="pz-luoi not-content"><a href="${href('kham-pha/tri-nho/vi-sao-ta-quen')}"><strong>Vì sao ta quên?</strong><span>Một người đàn ông tự học thuộc hàng nghìn âm tiết vô nghĩa, và điều ông phát hiện vẫn đúng sau 140 năm.</span></a><a href="${href('thi-nghiem/asch')}"><strong>Khi cả phòng đều nói sai, bạn có dám nói đúng?</strong><span>Thí nghiệm Asch: bảy người nói sai một đáp án thấy rõ, và người thứ tám làm gì.</span></a></div>

## Khám phá theo lĩnh vực

<div class="pz-luoi pz-luoi--lv not-content">${LINH_VUC.map((lv) => `<a href="${href('nen-tang/' + lv.ma)}"><strong>${lv.ten}</strong><span>${lv.hoi.map(([t]) => t).join(' · ')}</span></a>`).join('')}</div>

## Hiểu bằng chứng

Tin tức nói "nghiên cứu cho thấy…" mỗi ngày. Ba bài ngắn giúp bạn tự đánh giá:

- [Uống cà phê giúp sống lâu hơn? Tương quan và nhân quả](${href('bang-chung/tuong-quan-nhan-qua')})
- [Vì sao cần nhóm đối chứng?](${href('bang-chung/thi-nghiem-doi-chung')})
- [Hiệu ứng lớn hay nhỏ?](${href('bang-chung/do-lon-hieu-ung')})

## Lần đầu đến đây?

Hãy đọc [Tâm lý học là gì, và không là gì?](${href('bat-dau')}), rồi xem [cách đọc các nhãn mức độ chắc chắn](${href('bat-dau/doc-nhan-chac-chan')}) mà site dùng ở mọi trang:

${hangNhan}

${ghiChu}`;
}

function B() {
	const so = (i) => String(i + 1).padStart(2, '0');
	return `${dau({
		title: 'Tâm lý học,<br>bằng bằng chứng.',
		tagline: 'Mỗi trang trả lời một câu hỏi về con người: bằng chứng nói gì, và chắc chắn đến đâu? Viết bằng tiếng Việt, cho người không học chuyên ngành.',
		actions: [
			['Bắt đầu từ đây', href('bat-dau'), 'primary', 'right-arrow'],
			['14 lĩnh vực', '"#linh-vuc"', 'minimal'],
		],
	})}
## Ba bước đầu tiên { #bat-dau }

<ol class="pz-buoc-b not-content"><li><a href="${href('bat-dau/doc-nhan-chac-chan')}"><b>Đọc bốn nhãn</b><span>Vững chắc, khá vững, đang tranh cãi, đã bị bác bỏ: nhãn nói gì, và không nói gì.</span></a></li><li><a href="${href('trai-nghiem/stroop')}"><b>Thử trên chính mình</b><span>Hiệu ứng Stroop: gọi tên màu mực, đo xem não bạn "cãi nhau" mất bao lâu.</span></a></li><li><a href="${href('kham-pha/tri-nho/vi-sao-ta-quen')}"><b>Đọc một câu hỏi</b><span>Vì sao ta quên? Đường cong của Ebbinghaus, và lần làm lại sau 130 năm.</span></a></li></ol>

## 14 lĩnh vực { #linh-vuc }

<ol class="pz-o-lv not-content">${LINH_VUC.map((lv, i) => `<li style="--h: ${lv.h}"><a href="${href('nen-tang/' + lv.ma)}"><span class="pz-o-lv__so">${so(i)}</span><b>${lv.ten}</b><span>${lv.hoi[0][0]}</span></a></li>`).join('')}</ol>

## Mới kiểm chứng

<ul class="pz-moi not-content"><li><a href="${href('kham-pha/tri-nho/vi-sao-ta-quen')}">Vì sao ta quên?</a><span>Trí nhớ · Bài khám phá</span></li><li><a href="${href('thi-nghiem/asch')}">Khi cả phòng đều nói sai, bạn có dám nói đúng?</a><span>Tâm lý xã hội · Thí nghiệm kinh điển</span></li></ul>

<p class="pz-ghi-b">Danh sách tự cập nhật khi một trang được khóa. Psyche là site giáo dục: không chẩn đoán, không thay thế chuyên gia. Nếu bạn đang gặp khó khăn, hãy xem <a href="${href('ho-tro')}">trang Hỗ trợ</a>.</p>
`;
}

function C() {
	return `${dau({
		title: 'Vì sao ta nhớ những điều chưa từng xảy ra?',
		tagline: 'Và trong vô số điều "tâm lý học nói rằng…" trên mạng, điều nào thật sự có bằng chứng? Mỗi trang ở đây trả lời một câu hỏi: bằng chứng nói gì, và chắc chắn đến đâu.',
		actions: [
			['Bắt đầu đọc', href('bat-dau'), 'primary', 'right-arrow'],
			['Cách Psyche kiểm chứng', href('bat-dau/cach-kiem-chung'), 'secondary'],
		],
	})}
<div class="pz-noi-bat not-content"><a class="pz-noi-bat__chinh" href="${href('kham-pha/tri-nho/vi-sao-ta-quen')}"><span class="pz-noi-bat__loai">Bài khám phá · Trí nhớ</span><strong>Vì sao ta quên?</strong><span class="pz-noi-bat__mo">Một người đàn ông tự học thuộc hàng nghìn âm tiết vô nghĩa, và điều ông phát hiện vẫn đúng sau 140 năm.</span><span class="pz-noi-bat__nhan"><span class="pz-tag pz-tag--vung-chac">Vững chắc</span> <span class="pz-tag pz-tag--tranh-cai">Đang tranh cãi</span></span></a><a class="pz-noi-bat__phu" href="${href('thi-nghiem/asch')}"><span class="pz-noi-bat__loai">Thí nghiệm kinh điển · Tâm lý xã hội</span><strong>Khi cả phòng đều nói sai, bạn có dám nói đúng?</strong><span class="pz-noi-bat__mo">Thí nghiệm Asch, và 133 lần làm lại ở 17 nước.</span></a><a class="pz-noi-bat__phu" href="${href('trai-nghiem/stroop')}"><span class="pz-noi-bat__loai">Tự trải nghiệm · Tri giác</span><strong>Hiệu ứng Stroop</strong><span class="pz-noi-bat__mo">Đọc chữ thì dễ, gọi tên màu mực mới khó.</span></a></div>

## Theo lĩnh vực

<div class="pz-muc-luc not-content">${LINH_VUC.map((lv) => `<section style="--h: ${lv.h}"><h3><a href="${href('nen-tang/' + lv.ma)}">${lv.ten}</a></h3><ul>${lv.hoi.map(([t, d]) => `<li><a href="${href(d)}">${t}</a></li>`).join('')}</ul></section>`).join('')}</div>

<div class="pz-dai not-content"><p class="pz-dai__ten">Cách Psyche kiểm chứng</p><ol><li><b>Hồ sơ trước, chữ sau</b><span>Mỗi khẳng định có nguồn gốc, cỡ mẫu, số liệu ghi trong hồ sơ trước khi viết.</span></li><li><b>Kiểm chứng hai lượt</b><span>Hai lượt độc lập đối chiếu với nghiên cứu gốc; chỗ nào lệch thì sửa hoặc bỏ.</span></li><li><b>Khóa, rồi mới lên site</b><span>Trang đã kiểm thì khóa. Thay đổi về sau ghi thành bổ sung có ngày, không sửa lặng lẽ.</span></li></ol>${hangNhan}</div>

${ghiChu}`;
}

process.stdout.write({ A, B, C }[mau]());
