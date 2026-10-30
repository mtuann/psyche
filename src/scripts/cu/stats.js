// Chép nguyên từ ../psyche-zero/docs/assets/js/stats.js (commit 1ca5a80) cho D1.4–D1.8; đợt 8 viết lại thành module (plans/lam-lai/README.md, D8-L1).
/*
 * Psyche Zero — các hàm thống kê và sinh chuỗi kích thích (hàm thuần, có kiểm thử).
 * Dùng được cả trong trình duyệt (window.PZStats) và Node (module.exports).
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PZStats = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function sorted(xs) {
    return xs.slice().sort(function (a, b) { return a - b; });
  }

  function mean(xs) {
    if (!xs.length) return NaN;
    var s = 0;
    for (var i = 0; i < xs.length; i++) s += xs[i];
    return s / xs.length;
  }

  /** Độ lệch chuẩn mẫu (chia n − 1). */
  function sd(xs) {
    if (xs.length < 2) return NaN;
    var m = mean(xs), s = 0;
    for (var i = 0; i < xs.length; i++) s += (xs[i] - m) * (xs[i] - m);
    return Math.sqrt(s / (xs.length - 1));
  }

  /** Phân vị theo nội suy tuyến tính (cách R type 7). p trong [0, 1]. */
  function quantile(xs, p) {
    if (!xs.length) return NaN;
    var s = sorted(xs);
    var h = (s.length - 1) * p;
    var lo = Math.floor(h), hi = Math.ceil(h);
    return s[lo] + (h - lo) * (s[hi] - s[lo]);
  }

  function median(xs) {
    return quantile(xs, 0.5);
  }

  /** Bộ sinh số ngẫu nhiên có hạt giống (mulberry32), để kiểm thử lặp lại được. */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(xs, rand) {
    var a = xs.slice();
    rand = rand || Math.random;
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /*
   * Stroop.
   * Một lượt: { cond: "congruent" | "incongruent" | "neutral", ink: 0..k-1, word: 0..k-1 | -1 }
   * word = -1 nghĩa là kích thích trung tính (####).
   */

  /**
   * Sinh một khối lượt cân bằng: mỗi điều kiện n/3 lượt, mỗi màu mực xuất hiện
   * đều nhau trong từng điều kiện, không có hai lượt liên tiếp cùng màu mực,
   * và ở lượt không khớp, chữ không trùng màu mực của lượt ngay trước
   * (tránh hiệu ứng mồi lặp lại).
   */
  function stroopBlock(nPerCond, k, rand) {
    rand = rand || Math.random;
    var conds = ["congruent", "incongruent", "neutral"];
    var trials = [];
    conds.forEach(function (cond, ci) {
      for (var i = 0; i < nPerCond; i++) {
        // Lệch màu theo điều kiện để khối nhỏ (ví dụ lượt khởi động) vẫn có nhiều màu mực.
        var ink = (i + ci) % k;
        var word;
        if (cond === "congruent") word = ink;
        else if (cond === "neutral") word = -1;
        else {
          // Chữ khác màu mực, phân bố đều qua các màu còn lại.
          word = (ink + 1 + Math.floor(i / k) % (k - 1)) % k;
        }
        trials.push({ cond: cond, ink: ink, word: word });
      }
    });
    // Xếp ngẫu nhiên từng lượt, luôn chọn trong số các lượt hợp lệ với lượt trước,
    // ưu tiên màu mực còn nhiều để không bị "kẹt" ở cuối. Kẹt thì làm lại.
    for (var attempt = 0; attempt < 1000; attempt++) {
      var seq = buildOrder(trials, rand);
      if (seq) return seq;
    }
    throw new Error("Không xếp được thứ tự lượt Stroop thỏa ràng buộc");
  }

  function fits(t, prev) {
    if (!prev) return true;
    if (t.ink === prev.ink) return false;
    if (t.cond === "incongruent" && t.word === prev.ink) return false;
    return true;
  }

  function buildOrder(trials, rand) {
    var pool = shuffle(trials, rand), out = [];
    while (pool.length) {
      var prev = out[out.length - 1];
      var left = {};
      pool.forEach(function (t) { left[t.ink] = (left[t.ink] || 0) + 1; });
      var cands = [], weights = [], total = 0;
      for (var i = 0; i < pool.length; i++) {
        if (!fits(pool[i], prev)) continue;
        var w = left[pool[i].ink];
        w = w * w; // màu còn nhiều được ưu tiên mạnh hơn
        cands.push(i); weights.push(w); total += w;
      }
      if (!cands.length) return null;
      var x = rand() * total, k = 0;
      while (k < cands.length - 1 && x >= weights[k]) { x -= weights[k]; k++; }
      out.push(pool.splice(cands[k], 1)[0]);
    }
    return out;
  }

  function stroopValid(seq) {
    for (var i = 1; i < seq.length; i++) {
      if (seq[i].ink === seq[i - 1].ink) return false;
      if (seq[i].word !== -1 && seq[i].word === seq[i - 1].ink && seq[i].cond === "incongruent") return false;
    }
    return true;
  }

  var RT_MIN = 200, RT_MAX = 2500;

  /**
   * Tóm tắt kết quả Stroop.
   * trials: [{ cond, rt (ms) | null, correct: bool, practice: bool }]
   * Loại lượt khởi động, lượt sai, lượt hết giờ và lượt ngoài [200, 2500] ms.
   * Báo trung vị theo điều kiện (trung vị ít bị kéo bởi vài lượt rất chậm).
   */
  function stroopSummary(trials) {
    var conds = ["congruent", "incongruent", "neutral"];
    var out = { byCond: {}, excluded: 0, total: 0 };
    conds.forEach(function (c) {
      var all = trials.filter(function (t) { return !t.practice && t.cond === c; });
      var answered = all.filter(function (t) { return t.rt != null; });
      var errors = answered.filter(function (t) { return !t.correct; }).length;
      var ok = answered.filter(function (t) {
        return t.correct && t.rt >= RT_MIN && t.rt <= RT_MAX;
      }).map(function (t) { return t.rt; });
      out.total += all.length;
      out.excluded += all.length - ok.length;
      out.byCond[c] = {
        n: all.length,
        used: ok.length,
        median: ok.length ? median(ok) : NaN,
        errorRate: all.length ? (errors + (all.length - answered.length)) / all.length : NaN
      };
    });
    var C = out.byCond;
    out.effect = C.incongruent.median - C.congruent.median;
    // So với điều kiện trung tính, gần với cách so của Stroop (1935): ô màu so với chữ không khớp.
    out.interferencePct = (C.incongruent.median - C.neutral.median) / C.neutral.median * 100;
    out.valid = C.congruent.used >= 8 && C.incongruent.used >= 8 && C.neutral.used >= 8;
    return out;
  }

  /*
   * Độ dài trí nhớ chữ số.
   * Quy trình: bắt đầu từ độ dài `start`, mỗi độ dài 2 lượt; dừng khi sai cả 2 lượt
   * ở cùng một độ dài. Độ dài trí nhớ = độ dài dài nhất có ít nhất một lượt đúng.
   */
  function digitSequence(len, rand, prev) {
    rand = rand || Math.random;
    var out = [];
    while (out.length < len) {
      var d = Math.floor(rand() * 10);
      // Không lặp số liền kề, tránh chuỗi tăng/giảm liên tiếp kiểu 4-5-6.
      var last = out[out.length - 1];
      var last2 = out[out.length - 2];
      if (d === last) continue;
      if (last != null && last2 != null && d - last === last - last2 && Math.abs(d - last) === 1) continue;
      out.push(d);
    }
    if (prev && out.join("") === prev.join("")) return digitSequence(len, rand, prev);
    return out;
  }

  function checkDigits(target, answer, backward) {
    var want = backward ? target.slice().reverse() : target;
    var got = String(answer).replace(/\D/g, "");
    return got === want.join("");
  }

  /**
   * Chấm đúng/sai từng vị trí của một lượt độ dài trí nhớ chữ số.
   * target: dãy gốc (mảng số). answer: chuỗi người dùng gõ.
   * backward: so với dãy đảo ngược.
   * Trả về mảng boolean: vị trí i đúng khi ký tự thứ i của câu trả lời
   * (đã bỏ ký tự không phải số) khớp mục thứ i của dãy mục tiêu.
   */
  function scoreDigitPositions(target, answer, backward) {
    var want = backward ? target.slice().reverse() : target;
    var got = String(answer).replace(/\D/g, "");
    return want.map(function (w, i) {
      return i < got.length && got.charAt(i) === String(w);
    });
  }

  /**
   * Cộng dồn số liệu vị trí qua các lượt.
   * trials: [{ positions: [bool...] }]
   * Trả về [{ correct, total }] theo vị trí (phần tử 0 = vị trí 1).
   */
  function aggregatePositions(trials) {
    var agg = [];
    (trials || []).forEach(function (t) {
      (t.positions || []).forEach(function (ok, i) {
        if (!agg[i]) agg[i] = { correct: 0, total: 0 };
        agg[i].total += 1;
        if (ok) agg[i].correct += 1;
      });
    });
    return agg;
  }

  /**
   * Nhận diện mẫu hình đường cong vị trí chuỗi (serial position).
   * agg: [{ correct, total }] theo vị trí.
   * Trả về "u" (đầu và cuối cao hơn giữa — khớp hiệu ứng đầu/cuối),
   * "none" (không thấy mẫu hình), hoặc "insufficient" (chưa đủ dữ liệu).
   * Đây là heuristic mô tả, không phải kiểm định thống kê.
   */
  function serialPattern(agg) {
    var n = agg.length;
    if (n < 4) return "insufficient";
    var k = Math.max(1, Math.floor(n / 3));
    var groups = [agg.slice(0, k), agg.slice(k, n - k), agg.slice(n - k)];
    var rates = groups.map(function (g) {
      var c = 0, t = 0;
      g.forEach(function (p) { c += p.correct; t += p.total; });
      return t >= 2 ? c / t : NaN;
    });
    if (rates.some(function (r) { return isNaN(r); })) return "insufficient";
    return (rates[0] > rates[1] && rates[2] > rates[1]) ? "u" : "none";
  }

  /**
   * Trạng thái quy trình độ dài trí nhớ. history: [{ len, correct }]
   * Trả về { done, nextLen, span }.
   */
  function spanState(history, start, maxLen) {
    start = start || 3;
    maxLen = maxLen || 12;
    var byLen = {};
    history.forEach(function (h) {
      (byLen[h.len] = byLen[h.len] || []).push(h.correct);
    });
    var span = 0;
    Object.keys(byLen).forEach(function (l) {
      if (byLen[l].some(Boolean)) span = Math.max(span, +l);
    });
    if (!history.length) return { done: false, nextLen: start, span: 0 };
    var cur = history[history.length - 1].len;
    var res = byLen[cur];
    if (res.length < 2) return { done: false, nextLen: cur, span: span };
    if (!res.some(Boolean)) return { done: true, nextLen: null, span: span };
    if (cur >= maxLen) return { done: true, nextLen: null, span: span };
    return { done: false, nextLen: cur + 1, span: span };
  }

  return {
    mean: mean,
    sd: sd,
    median: median,
    quantile: quantile,
    rng: rng,
    shuffle: shuffle,
    stroopBlock: stroopBlock,
    stroopValid: stroopValid,
    stroopSummary: stroopSummary,
    RT_MIN: RT_MIN,
    RT_MAX: RT_MAX,
    digitSequence: digitSequence,
    checkDigits: checkDigits,
    scoreDigitPositions: scoreDigitPositions,
    aggregatePositions: aggregatePositions,
    serialPattern: serialPattern,
    spanState: spanState
  };
});
