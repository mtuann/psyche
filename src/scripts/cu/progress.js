// Chép nguyên từ ../psyche-zero/docs/assets/js/progress.js (commit 1ca5a80) cho D1.4–D1.8; đợt 8 viết lại thành module (plans/lam-lai/README.md, D8-L1).
/*
 * Psyche Zero — lưu trữ cục bộ.
 *
 * Mọi dữ liệu nằm trong MỘT khóa localStorage, có số phiên bản. Không có gì
 * được gửi đi đâu.
 *
 * Mô hình dữ liệu (v1):
 * {
 *   v: 1,
 *   records: { [id]: { id, kind, t, ...dữ liệu } },   // kết quả bài thử, quiz, thẻ ngộ nhận
 *   prefs:   { [key]: { value, t } }                   // tùy chọn, ghi sau thắng
 * }
 *
 * Mỗi bản ghi có id duy nhất và không bao giờ bị sửa sau khi tạo. Vì vậy gộp
 * hai bản sao lưu = hợp các bản ghi theo id: không mất dữ liệu, gộp lại nhiều
 * lần không nhân đôi, thứ tự gộp không đổi kết quả.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PZStore = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var KEY = "psyche-zero";
  var VERSION = 1;

  function empty() {
    return { v: VERSION, records: {}, prefs: {} };
  }

  /** Chuẩn hóa dữ liệu bất kỳ (có thể hỏng hoặc từ phiên bản cũ) thành dạng v1. */
  function normalize(data) {
    var out = empty();
    if (!data || typeof data !== "object") return out;
    var recs = data.records;
    if (recs && typeof recs === "object") {
      Object.keys(recs).forEach(function (id) {
        var r = recs[id];
        if (r && typeof r === "object" && typeof r.kind === "string" && typeof r.t === "number") {
          out.records[id] = Object.assign({}, r, { id: id });
        }
      });
    }
    var prefs = data.prefs;
    if (prefs && typeof prefs === "object") {
      Object.keys(prefs).forEach(function (k) {
        var p = prefs[k];
        if (p && typeof p === "object" && typeof p.t === "number") out.prefs[k] = { value: p.value, t: p.t };
      });
    }
    return out;
  }

  function stable(x) {
    // JSON với khóa đã sắp xếp: so sánh và phân xử hòa độc lập với thứ tự khóa.
    if (Array.isArray(x)) return "[" + x.map(stable).join(",") + "]";
    if (x && typeof x === "object") {
      return "{" + Object.keys(x).sort().map(function (k) {
        return JSON.stringify(k) + ":" + stable(x[k]);
      }).join(",") + "}";
    }
    return JSON.stringify(x);
  }

  /**
   * Gộp hai bộ dữ liệu. Hàm thuần: không sửa đầu vào.
   * - records: hợp theo id. Nếu cùng id mà khác nội dung (không nên xảy ra),
   *   chọn bản có chuỗi chuẩn hóa nhỏ hơn để kết quả không phụ thuộc thứ tự.
   * - prefs: bản có t lớn hơn thắng; hòa thì so chuỗi chuẩn hóa.
   */
  function merge(a, b) {
    a = normalize(a);
    b = normalize(b);
    var out = empty();
    [a, b].forEach(function (src) {
      Object.keys(src.records).forEach(function (id) {
        var r = src.records[id];
        var cur = out.records[id];
        if (!cur || stable(r) < stable(cur)) out.records[id] = r;
      });
      Object.keys(src.prefs).forEach(function (k) {
        var p = src.prefs[k];
        var cur = out.prefs[k];
        if (!cur || p.t > cur.t || (p.t === cur.t && stable(p) < stable(cur))) out.prefs[k] = p;
      });
    });
    return out;
  }

  /** Xem trước kết quả gộp: bao nhiêu bản ghi mới, theo loại. */
  function diff(current, incoming) {
    current = normalize(current);
    incoming = normalize(incoming);
    var added = {}, nAdded = 0, nSame = 0;
    Object.keys(incoming.records).forEach(function (id) {
      if (current.records[id]) nSame += 1;
      else {
        nAdded += 1;
        var k = incoming.records[id].kind;
        added[k] = (added[k] || 0) + 1;
      }
    });
    return { added: nAdded, byKind: added, alreadyPresent: nSame };
  }

  function summary(data) {
    data = normalize(data);
    var byKind = {};
    var days = {};
    Object.keys(data.records).forEach(function (id) {
      var r = data.records[id];
      byKind[r.kind] = (byKind[r.kind] || 0) + 1;
      days[dayKey(r.t)] = true;
    });
    return { records: Object.keys(data.records).length, byKind: byKind, days: Object.keys(days).length };
  }

  function dayKey(t) {
    var d = new Date(t);
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  }

  function newId(kind, t, rand) {
    rand = rand || Math.random;
    return kind + "-" + t.toString(36) + "-" + Math.floor(rand() * 1e9).toString(36);
  }

  /* ---- Lớp truy cập localStorage (chỉ dùng trong trình duyệt) ---- */

  function storage() {
    try {
      var s = (typeof window !== "undefined") && window.localStorage;
      if (!s) return null;
      var probe = KEY + ":probe";
      s.setItem(probe, "1");
      s.removeItem(probe);
      return s;
    } catch (e) {
      return null; // chế độ riêng tư, bị chặn...
    }
  }

  var memory = null; // dự phòng khi không có localStorage: chỉ sống trong phiên

  function load() {
    var s = storage();
    if (!s) return normalize(memory);
    try {
      return normalize(JSON.parse(s.getItem(KEY) || "null"));
    } catch (e) {
      return empty();
    }
  }

  function save(data) {
    data = normalize(data);
    var s = storage();
    if (!s) { memory = data; return false; }
    try {
      s.setItem(KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      memory = data;
      return false;
    }
  }

  /** Thêm một bản ghi. Trả về bản ghi đã lưu. */
  function add(kind, payload) {
    var t = Date.now();
    var rec = Object.assign({}, payload, { kind: kind, t: t });
    rec.id = newId(kind, t);
    var data = load();
    data.records[rec.id] = rec;
    save(data);
    return rec;
  }

  function list(kind) {
    var data = load();
    return Object.keys(data.records)
      .map(function (id) { return data.records[id]; })
      .filter(function (r) { return !kind || r.kind === kind; })
      .sort(function (a, b) { return a.t - b.t; });
  }

  function getPref(key, fallback) {
    var p = load().prefs[key];
    return p ? p.value : fallback;
  }

  function setPref(key, value) {
    var data = load();
    data.prefs[key] = { value: value, t: Date.now() };
    save(data);
  }

  function importData(incoming) {
    var merged = merge(load(), incoming);
    save(merged);
    return merged;
  }

  function clear() {
    var s = storage();
    memory = null;
    if (s) s.removeItem(KEY);
  }

  function available() {
    return !!storage();
  }

  return {
    KEY: KEY,
    VERSION: VERSION,
    empty: empty,
    normalize: normalize,
    merge: merge,
    diff: diff,
    summary: summary,
    stable: stable,
    dayKey: dayKey,
    newId: newId,
    load: load,
    save: save,
    add: add,
    list: list,
    getPref: getPref,
    setPref: setPref,
    importData: importData,
    clear: clear,
    available: available
  };
});
