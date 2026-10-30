// Chép nguyên từ ../psyche-zero/docs/assets/js/ui.js (commit 1ca5a80) cho D1.4–D1.8; đợt 8 viết lại thành module (plans/lam-lai/README.md, D8-L1).
/*
 * Psyche Zero — tiện ích giao diện dùng chung cho các công cụ.
 */
(function (root) {
  "use strict";

  /** Tạo phần tử: h("button", { class: "x", onclick: fn }, ["chữ", child]) */
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
      else el.setAttribute(k, v === true ? "" : v);
    });
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return el;
  }

  /** Số kiểu Việt Nam: dấu phẩy thập phân, dấu chấm phân cách hàng nghìn. */
  function num(x, digits) {
    if (x == null || isNaN(x)) return "—";
    digits = digits == null ? 0 : digits;
    var s = Math.abs(x).toFixed(digits).split(".");
    var int = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (x < 0 ? "−" : "") + int + (s[1] ? "," + s[1] : "");
  }

  function privacyNote() {
    return h("p", { class: "pz-privacy" }, [
      "🔒 Kết quả chỉ lưu trên trình duyệt của bạn, không gửi đi đâu. Bạn có thể xem, tải về hoặc xóa ở trang ",
      h("a", { href: root.PZ && root.PZ.base ? root.PZ.base + "them/du-lieu-cua-toi/" : "#" }, ["Dữ liệu của tôi"]),
      "."
    ]);
  }

  /** Vùng thông báo cho trình đọc màn hình. */
  function liveRegion() {
    return h("div", { class: "pz-sr-only", "aria-live": "polite", role: "status" });
  }

  function once(el, flag) {
    if (el.getAttribute("data-pz-init") === flag) return false;
    el.setAttribute("data-pz-init", flag);
    return true;
  }

  function reducedMotion() {
    return !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /**
   * Biểu đồ cột ngang đơn giản (SVG, dùng currentColor).
   * rows: [{ label, value, note }]
   */
  function barChart(rows, opts) {
    opts = opts || {};
    var max = opts.max || Math.max.apply(null, rows.map(function (r) { return r.value || 0; })) || 1;
    var W = 320, rowH = 34, labelW = 108, pad = 8;
    var H = rows.length * rowH + pad;
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "pz-bars");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", opts.label || rows.map(function (r) {
      return r.label + ": " + r.text;
    }).join("; "));
    rows.forEach(function (r, i) {
      var y = pad / 2 + i * rowH;
      var w = Math.max(1, ((r.value || 0) / max) * (W - labelW - 70));
      var t = document.createElementNS(ns, "text");
      t.setAttribute("x", 0); t.setAttribute("y", y + 20);
      t.setAttribute("fill", "currentColor"); t.setAttribute("font-size", "13");
      t.textContent = r.label;
      var rect = document.createElementNS(ns, "rect");
      rect.setAttribute("x", labelW); rect.setAttribute("y", y + 6);
      rect.setAttribute("width", w); rect.setAttribute("height", 20);
      rect.setAttribute("rx", 3);
      rect.setAttribute("class", "pz-bar" + (r.cls ? " " + r.cls : ""));
      var v = document.createElementNS(ns, "text");
      v.setAttribute("x", labelW + w + 6); v.setAttribute("y", y + 21);
      v.setAttribute("fill", "currentColor"); v.setAttribute("font-size", "13");
      v.textContent = r.text;
      svg.appendChild(t); svg.appendChild(rect); svg.appendChild(v);
    });
    return svg;
  }

  /**
   * Mục "Vị trí nào bạn nhớ tốt nhất?" dùng chung cho các công cụ độ dài trí nhớ.
   * trials: [{ positions: [bool...], rt: ms }].
   * Trả về div.pz-positions (biểu đồ cột + bảng cho screen reader + diễn giải
   * + thời gian phản ứng trung vị), hoặc null khi chưa đủ dữ liệu.
   * Cần PZStats (stats.js) đã nạp trước ui.js.
   */
  function positionSection(trials) {
    var S = root.PZStats;
    if (!S || !trials || !trials.length) return null;
    var agg = S.aggregatePositions(trials);
    var rows = [];
    agg.forEach(function (p, i) {
      if (!p.total) return;
      var pct = Math.round(p.correct / p.total * 100);
      rows.push({ label: "Vị trí " + (i + 1), value: pct, text: pct + "%" });
    });
    if (!rows.length) return null;
    var pattern = S.serialPattern(agg);
    var interp = pattern === "u"
      ? "Đường cong chữ U này khớp với hiệu ứng vị trí chuỗi trong nghiên cứu trí nhớ: các mục ở đầu dãy (hiệu ứng đầu) và cuối dãy (hiệu ứng cuối) thường được nhớ tốt hơn các mục ở giữa."
      : "Phiên này chưa thấy rõ mẫu hình chữ U — cần nhiều lượt hơn để kết luận. Đây chỉ là số liệu của một lần làm, không phải chẩn đoán.";
    var rts = trials.map(function (t) { return t.rt; })
      .filter(function (x) { return x != null && !isNaN(x); });
    var med = rts.length ? S.median(rts) : NaN;
    var table = h("table", { class: "pz-sr-only" }, [
      h("caption", { text: "Tỉ lệ gõ đúng từng vị trí trong phiên này" }),
      h("thead", {}, [h("tr", {}, [
        h("th", { scope: "col", text: "Vị trí" }),
        h("th", { scope: "col", text: "Số lượt đúng" }),
        h("th", { scope: "col", text: "Tổng số lượt" })
      ])]),
      h("tbody", {}, agg.map(function (p, i) {
        return h("tr", {}, [
          h("th", { scope: "row", text: String(i + 1) }),
          h("td", { text: String(p.correct) }),
          h("td", { text: String(p.total) })
        ]);
      }))
    ]);
    return h("div", { class: "pz-positions" }, [
      h("h4", { text: "Vị trí nào bạn nhớ tốt nhất?" }),
      barChart(rows, {
        max: 100,
        label: "Tỉ lệ gõ đúng theo vị trí: " + rows.map(function (r) {
          return r.label + " " + r.text;
        }).join("; ")
      }),
      table,
      h("p", {}, [interp]),
      h("p", {}, [
        "Thời gian phản ứng trung vị: ",
        h("strong", { text: num(med / 1000, 1) + " giây/lượt" }),
        " (tính từ lúc ô nhập hiện ra đến lúc bạn bấm Xong)."
      ])
    ]);
  }

  root.PZUI = {
    h: h,
    num: num,
    privacyNote: privacyNote,
    liveRegion: liveRegion,
    once: once,
    reducedMotion: reducedMotion,
    barChart: barChart,
    positionSection: positionSection
  };
})(typeof window !== "undefined" ? window : this);
