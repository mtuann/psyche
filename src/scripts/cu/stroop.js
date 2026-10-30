// Chép nguyên từ ../psyche-zero/docs/assets/js/stroop.js (commit 1ca5a80) cho D1.4–D1.8; đợt 8 viết lại thành module (plans/lam-lai/README.md, D8-L1).
/*
 * Psyche Zero — công cụ "Hiệu ứng Stroop".
 *
 * Hai phiên bản:
 *  - màu: gọi tên MÀU MỰC của chữ (ĐỎ, VÀNG, XANH, TRẮNG trên nền tối);
 *  - đếm: cho biết CÓ BAO NHIÊU ký tự (ví dụ "3 3" → 2). Không cần phân biệt màu.
 *
 * Mỗi lượt: dấu + 500 ms → màn trống 300–700 ms (ngẫu nhiên) → kích thích, đến khi trả lời
 * hoặc hết 3 giây. Thời điểm xuất hiện lấy bằng hai lần requestAnimationFrame;
 * thời điểm trả lời lấy từ event.timeStamp (độ phân giải cao).
 */
(function () {
  "use strict";

  var COLOR_SET = [
    { word: "ĐỎ", ink: "#ff5a52", name: "đỏ" },
    { word: "VÀNG", ink: "#ffd21f", name: "vàng" },
    { word: "XANH", ink: "#5c9dff", name: "xanh (dương)" },
    { word: "TRẮNG", ink: "#f4f4f4", name: "trắng" }
  ];
  var KEYS = ["d", "f", "j", "k"];

  var MODES = {
    color: {
      label: "Phiên bản màu",
      task: "Chọn MÀU MỰC của chữ, bỏ qua nghĩa của chữ.",
      answers: COLOR_SET.map(function (c) { return c.word; }),
      render: function (stim, trial) {
        stim.textContent = trial.word === -1 ? "####" : COLOR_SET[trial.word].word;
        stim.style.color = COLOR_SET[trial.ink].ink;
      },
      answerName: function (i) { return COLOR_SET[i].name; }
    },
    count: {
      label: "Phiên bản đếm (không dùng màu)",
      task: "Cho biết CÓ BAO NHIÊU ký tự trên màn hình, bỏ qua giá trị của chữ số.",
      answers: ["1", "2", "3", "4"],
      render: function (stim, trial) {
        // ink = số lượng − 1; word = chữ số − 1 (hoặc −1 nếu trung tính "#").
        var ch = trial.word === -1 ? "#" : String(trial.word + 1);
        var parts = [];
        for (var i = 0; i <= trial.ink; i++) parts.push(ch);
        stim.textContent = parts.join(" ");
        stim.style.color = "";
      },
      answerName: function (i) { return String(i + 1); }
    }
  };

  // Số liệu gốc: Stroop (1935), Thí nghiệm 2, N = 100 sinh viên, mỗi thẻ 100 mục,
  // gọi tên to. Gọi tên màu ô vuông: 63,3 giây; gọi tên màu mực của chữ không khớp: 110,3 giây (+74%).
  var STROOP_1935 = { neutral: 63.3, incongruent: 110.3, pct: 74 };

  function cfg(root) {
    var d = root.dataset || {};
    return {
      perCond: +d.perCond || 12,
      blocks: +d.blocks || 2,
      practice: d.practice != null ? +d.practice : 8,
      fixation: d.fast ? 0 : 500,
      blankMin: d.fast ? 0 : 300,
      blankMax: d.fast ? 0 : 700,
      timeout: 3000,
      feedback: d.fast ? 0 : 700
    };
  }

  function now() {
    return window.performance && performance.now ? performance.now() : Date.now();
  }

  function eventTime(e) {
    // event.timeStamp cùng gốc với performance.now() trên trình duyệt hiện đại.
    var n = now();
    var ts = e && e.timeStamp;
    return ts && Math.abs(ts - n) < 1000 ? ts : n;
  }

  function raf(fn) {
    return (window.requestAnimationFrame || function (f) { return setTimeout(function () { f(now()); }, 16); })(fn);
  }

  function init() {
    var nodes = document.querySelectorAll(".pz-stroop");
    for (var i = 0; i < nodes.length; i++) {
      if (PZUI.once(nodes[i], "stroop")) setup(nodes[i]);
    }
  }

  function setup(root) {
    var h = PZUI.h;
    var C = cfg(root);
    var live = PZUI.liveRegion();
    var mode = "color";
    var view = h("div", { class: "pz-tool__view" });
    root.classList.add("pz-tool");
    root.appendChild(view);
    root.appendChild(live);

    var state = null; // trạng thái lượt chạy hiện tại
    var keyHandler = null;

    function show(children) {
      view.innerHTML = "";
      children.forEach(function (c) { if (c) view.appendChild(c); });
      var focusEl = view.querySelector("[data-autofocus]");
      if (focusEl) focusEl.focus();
    }

    function swatches() {
      return h("div", { class: "pz-swatches", "aria-hidden": "true" }, COLOR_SET.map(function (c) {
        return h("span", { class: "pz-swatch", style: { background: c.ink } });
      }));
    }

    function intro() {
      stopKeys();
      show([
        h("p", { class: "pz-tool__lead" }, [
          "Bạn sẽ thấy các chữ hiện lần lượt. Việc của bạn rất đơn giản, nhưng não bạn sẽ phải \"cãi nhau\" với chính nó. Khoảng 3 phút."
        ]),
        h("fieldset", { class: "pz-choice" }, [
          h("legend", { text: "Chọn phiên bản" }),
          radio("color", MODES.color.label, true),
          radio("count", MODES.count.label, false)
        ]),
        h("div", { class: "pz-note" }, [
          h("p", {}, ["Bạn có phân biệt rõ bốn màu dưới đây không? Nếu không chắc (ví dụ bạn có mù màu một phần), hãy chọn phiên bản đếm: nó tạo ra cùng loại xung đột mà không cần đến màu sắc."]),
          swatches()
        ]),
        h("button", { class: "md-button md-button--primary pz-big", type: "button", "data-autofocus": true, onclick: instructions }, ["Tiếp tục"]),
        PZUI.privacyNote(),
        history()
      ]);
    }

    function radio(value, label, checked) {
      var id = "pz-stroop-mode-" + value + "-" + Math.floor(Math.random() * 1e6);
      return h("label", { class: "pz-radio", for: id }, [
        h("input", { type: "radio", name: "pz-stroop-mode", id: id, value: value, checked: checked,
          onchange: function () { mode = value; } }),
        " " + label
      ]);
    }

    function instructions() {
      var M = MODES[mode];
      var ex = mode === "color"
        ? [h("span", { class: "pz-ex", style: { color: COLOR_SET[2].ink } }, ["ĐỎ"]), " → đáp án đúng là ", h("strong", {}, ["XANH"]), " (màu mực)."]
        : [h("span", { class: "pz-ex" }, ["3 3"]), " → đáp án đúng là ", h("strong", {}, ["2"]), " (có hai ký tự)."];
      show([
        h("h3", { text: M.label }),
        h("p", {}, [M.task]),
        h("div", { class: "pz-ex-row" }, [h("div", { class: "pz-stage pz-stage--small" }, ex)]),
        h("p", {}, [
          "Trả lời bằng bốn nút bên dưới khung, hoặc bằng phím ",
          h("kbd", { text: "D" }), " ", h("kbd", { text: "F" }), " ", h("kbd", { text: "J" }), " ", h("kbd", { text: "K" }),
          mode === "count" ? " (hoặc phím số 1–4)." : ".",
          " Hãy trả lời nhanh nhưng chính xác."
        ]),
        h("p", {}, ["Đầu tiên là " + C.practice + " lượt khởi động (có báo đúng/sai, không tính điểm)."]),
        h("button", { class: "md-button md-button--primary pz-big", type: "button", "data-autofocus": true,
          onclick: function () { run(true); } }, ["Bắt đầu khởi động"]),
        h("button", { class: "md-button pz-big", type: "button", onclick: intro }, ["Quay lại"])
      ]);
    }

    function buildTrials(practice) {
      var rand = Math.random;
      if (practice) {
        var p = PZStats.stroopBlock(Math.max(1, Math.ceil(C.practice / 3)), 4, rand);
        return p.slice(0, C.practice).map(function (t) { t.practice = true; return t; });
      }
      var all = [];
      for (var b = 0; b < C.blocks; b++) {
        all.push(PZStats.stroopBlock(C.perCond, 4, rand).map(function (t) { t.block = b; return t; }));
      }
      return all;
    }

    function run(practice) {
      var M = MODES[mode];
      var stage = h("div", { class: "pz-stage", "aria-live": "off" });
      // Kích thích chỉ có ý nghĩa khi nhìn: ẩn với trình đọc màn hình (trang có phần mô tả bằng chữ).
      var stim = h("div", { class: "pz-stim", "aria-hidden": "true" });
      stage.appendChild(stim);
      var fb = h("p", { class: "pz-feedback", "aria-live": "assertive" });
      var counter = h("p", { class: "pz-counter" });
      var btns = h("div", { class: "pz-answers", role: "group", "aria-label": "Đáp án" },
        M.answers.map(function (label, i) {
          var b = h("button", { type: "button", class: "pz-answer", "data-answer": i,
            "aria-keyshortcuts": KEYS[i].toUpperCase() }, [
            h("span", { class: "pz-answer__label", text: label }),
            h("span", { class: "pz-answer__key", "aria-hidden": "true", text: KEYS[i].toUpperCase() })
          ]);
          b.addEventListener("pointerdown", function (e) { e.preventDefault(); respond(i, e); });
          b.addEventListener("click", function (e) { if (e.detail === 0) respond(i, e); });
          return b;
        }));
      show([counter, stage, fb, btns]);

      var blocks = practice ? [buildTrials(true)] : buildTrials(false);
      if (stage.scrollIntoView) stage.scrollIntoView({ block: "center" });
      state = {
        practice: practice, blocks: blocks, b: 0, i: 0, results: [],
        onset: null, timer: null, accepting: false, stim: stim, fb: fb, counter: counter, stage: stage
      };
      startKeys();
      nextTrial();
    }

    function currentTrial() {
      return state.blocks[state.b][state.i];
    }

    function nextTrial() {
      var s = state;
      if (!s) return;
      if (s.i >= s.blocks[s.b].length) {
        s.b += 1;
        s.i = 0;
        if (s.b >= s.blocks.length) return finish();
        return pause();
      }
      var total = s.blocks.reduce(function (n, bl) { return n + bl.length; }, 0);
      var done = s.blocks.slice(0, s.b).reduce(function (n, bl) { return n + bl.length; }, 0) + s.i;
      s.counter.textContent = (s.practice ? "Khởi động: " : "Lượt ") + (done + 1) + " / " + total;
      s.stim.textContent = "+";
      s.stim.style.color = "";
      s.stim.className = "pz-stim pz-stim--fix";
      s.onset = null;
      s.accepting = false;
      var blank = C.blankMin + Math.random() * (C.blankMax - C.blankMin);
      s.timer = setTimeout(function () {
        if (state !== s) return;
        s.stim.textContent = "";
        s.timer = setTimeout(function () {
          if (state !== s) return;
          raf(function () {
            if (state !== s) return;
            s.stim.className = "pz-stim";
            MODES[mode].render(s.stim, currentTrial());
            s.accepting = true;
            raf(function () {
              if (state !== s) return;
              if (s.onset == null) s.onset = now();
            });
            s.timer = setTimeout(function () { respond(null, null); }, C.timeout);
          });
        }, blank);
      }, C.fixation);
    }

    function respond(answer, e) {
      var s = state;
      if (!s || !s.accepting) return;
      var t = e ? eventTime(e) : now();
      if (s.onset == null) s.onset = t; // trả lời trước khi khung hình kịp vẽ → RT ≈ 0, sẽ bị loại
      s.accepting = false;
      clearTimeout(s.timer);
      var trial = currentTrial();
      var correct = answer === trial.ink;
      s.results.push({
        cond: trial.cond, ink: trial.ink, word: trial.word, block: trial.block,
        practice: !!trial.practice,
        answer: answer, correct: correct,
        rt: answer == null ? null : Math.round((t - s.onset) * 10) / 10
      });
      s.i += 1;
      if (s.practice && C.feedback) {
        s.fb.textContent = answer == null ? "Hết giờ." : correct ? "Đúng." :
          "Chưa đúng: đáp án là " + MODES[mode].answerName(trial.ink) + ".";
        s.stim.textContent = "";
        s.timer = setTimeout(function () { s.fb.textContent = ""; nextTrial(); }, C.feedback);
      } else {
        s.stim.textContent = "";
        nextTrial();
      }
    }

    function pause() {
      var s = state;
      s.stim.textContent = "";
      s.accepting = false;
      var btn = h("button", { class: "md-button md-button--primary pz-big", type: "button", "data-autofocus": true,
        onclick: function () { btn.remove(); s.fb.textContent = ""; nextTrial(); } }, ["Tiếp tục"]);
      s.fb.textContent = "Nghỉ một chút. Xong " + s.b + " / " + s.blocks.length + " phần.";
      s.stage.appendChild(btn);
      btn.focus();
    }

    function finish() {
      var s = state;
      stopKeys();
      state = null;
      if (s.practice) {
        var ok = s.results.filter(function (r) { return r.correct; }).length;
        show([
          h("p", {}, ["Xong phần khởi động: đúng " + ok + " / " + s.results.length + " lượt."]),
          h("p", {}, ["Phần chính gồm " + (C.blocks * C.perCond * 3) + " lượt, chia " + C.blocks + " phần, không báo đúng/sai. Bạn có thể nghỉ giữa các phần."]),
          h("button", { class: "md-button md-button--primary pz-big", type: "button", "data-autofocus": true,
            onclick: function () { run(false); } }, ["Bắt đầu phần chính"]),
          h("button", { class: "md-button pz-big", type: "button", onclick: function () { run(true); } }, ["Khởi động lại"])
        ]);
        return;
      }
      var sum = PZStats.stroopSummary(s.results);
      var rec = null;
      if (window.PZStore) {
        var r1 = function (x) { return x == null || isNaN(x) ? null : Math.round(x * 10) / 10; };
        rec = PZStore.add("stroop", {
          mode: mode,
          congruent: r1(sum.byCond.congruent.median),
          neutral: r1(sum.byCond.neutral.median),
          incongruent: r1(sum.byCond.incongruent.median),
          effect: r1(sum.effect),
          pct: r1(sum.interferencePct),
          errors: {
            congruent: sum.byCond.congruent.errorRate,
            neutral: sum.byCond.neutral.errorRate,
            incongruent: sum.byCond.incongruent.errorRate
          },
          valid: sum.valid,
          n: sum.total,
          input: inputKind
        });
      }
      live.textContent = "Đã xong. Hiệu ứng Stroop của bạn là " + PZUI.num(sum.effect) + " mili giây.";
      results(sum);
    }

    function results(sum) {
      var B = sum.byCond;
      var rows = [
        { label: "Khớp", value: B.congruent.median, text: PZUI.num(B.congruent.median) + " ms" },
        { label: "Trung tính", value: B.neutral.median, text: PZUI.num(B.neutral.median) + " ms" },
        { label: "Không khớp", value: B.incongruent.median, text: PZUI.num(B.incongruent.median) + " ms", cls: "pz-bar--accent" }
      ];
      var verdict;
      if (!sum.valid) {
        verdict = h("div", { class: "admonition warning" }, [
          h("p", { class: "admonition-title", text: "Chưa đủ lượt hợp lệ để tính" }),
          h("p", {}, ["Có quá nhiều lượt sai, quá nhanh (dưới 200 ms) hoặc quá chậm. Kết quả dưới đây chỉ để tham khảo. Bạn có thể làm lại khi tập trung hơn."])
        ]);
      }
      var effectText = sum.effect > 0
        ? "Bạn trả lời chậm hơn " + PZUI.num(sum.effect) + " ms khi chữ và đáp án mâu thuẫn nhau, so với khi chúng khớp."
        : "Lần này bạn không chậm hơn ở lượt mâu thuẫn. Điều đó có thể xảy ra, nhất là khi số lượt ít hoặc bạn trả lời rất cẩn thận.";
      show([
        h("h3", { text: "Kết quả của bạn" }),
        verdict,
        h("p", { class: "pz-big-number" }, [h("strong", { text: PZUI.num(sum.effect) + " ms" }), " là hiệu ứng Stroop của bạn"]),
        h("p", {}, [effectText]),
        PZUI.barChart(rows, { label: "Thời gian phản ứng trung vị theo điều kiện" }),
        h("p", { class: "pz-small" }, [
          "Trung vị thời gian phản ứng, chỉ tính lượt đúng trong khoảng 200–2.500 ms. ",
          "Tỉ lệ sai: khớp " + PZUI.num(B.congruent.errorRate * 100) + "%, trung tính " + PZUI.num(B.neutral.errorRate * 100) +
          "%, không khớp " + PZUI.num(B.incongruent.errorRate * 100) + "%. ",
          "Đã loại " + sum.excluded + " / " + sum.total + " lượt."
        ]),
        h("h4", { text: "So với nghiên cứu gốc" }),
        h("p", {}, [
          "Trong Thí nghiệm 2 của J. Ridley Stroop (1935), 100 sinh viên gọi tên to màu của 100 mục trên một tấm thẻ. ",
          "Gọi tên màu của các ô vuông mất trung bình " + PZUI.num(STROOP_1935.neutral, 1) + " giây; gọi tên màu mực của các chữ chỉ màu khác mất " +
          PZUI.num(STROOP_1935.incongruent, 1) + " giây: chậm hơn khoảng " + STROOP_1935.pct + "%."
        ]),
        h("p", {}, [
          mode === "color"
            ? "Ở bài này, lượt không khớp của bạn chậm hơn lượt trung tính (####) " + PZUI.num(sum.interferencePct) + "%."
            : "Phiên bản đếm không có số liệu gốc của Stroop (1935) để so trực tiếp. Lượt không khớp của bạn chậm hơn lượt trung tính " + PZUI.num(sum.interferencePct) + "%."
        ]),
        mode === "color" ? h("p", {}, [
          "Với cách trả lời bằng phím bấm như ở đây, một nghiên cứu năm 2019 (Augustinova và cộng sự) đo được hiệu ứng khoảng " +
          "73–76 ms, chỉ bằng khoảng một nửa so với khi người tham gia nói to câu trả lời (155–168 ms)."
        ]) : null,
        h("details", { class: "pz-details" }, [
          h("summary", { text: "Vì sao con số của bạn khó giống với nghiên cứu gốc?" }),
          h("ul", {}, [
            h("li", {}, ["Stroop đo tổng thời gian đọc to cả một tấm thẻ; ở đây bạn bấm nút cho từng lượt. Cách trả lời khác nhau cho ra độ lớn hiệu ứng khác nhau."]),
            h("li", {}, ["Bấm nút đòi hỏi nhớ vị trí bốn đáp án, cộng thêm thời gian vào mọi lượt, nên tỉ lệ % thường nhỏ hơn."]),
            h("li", {}, ["Thiết bị có độ trễ riêng (màn hình, bàn phím, màn cảm ứng), thường vài chục mili giây. Độ trễ này gần như như nhau ở mọi điều kiện, nên phép trừ \"không khớp − khớp\" ít bị ảnh hưởng hơn từng con số riêng lẻ."]),
            h("li", {}, ["Mỗi người khác nhau, và cùng một người cũng dao động giữa các lần làm. Với khoảng 24 lượt mỗi điều kiện, kết quả của một lần làm còn khá \"ồn\"."])
          ])
        ]),
        h("button", { class: "md-button md-button--primary pz-big", type: "button", "data-autofocus": true, onclick: intro }, ["Làm lại"]),
        PZUI.privacyNote(),
        history()
      ]);
    }

    function history() {
      if (!window.PZStore) return null;
      var runs = PZStore.list("stroop").slice(-5).reverse();
      if (!runs.length) return null;
      return h("details", { class: "pz-details" }, [
        h("summary", { text: "Các lần làm trước (" + runs.length + " lần gần nhất)" }),
        h("table", {}, [
          h("thead", {}, [h("tr", {}, ["Ngày", "Phiên bản", "Hiệu ứng", "Khớp", "Không khớp"].map(function (x) { return h("th", { text: x }); }))]),
          h("tbody", {}, runs.map(function (r) {
            return h("tr", {}, [
              new Date(r.t).toLocaleDateString("vi-VN"),
              r.mode === "count" ? "Đếm" : "Màu",
              PZUI.num(r.effect) + " ms",
              PZUI.num(r.congruent) + " ms",
              PZUI.num(r.incongruent) + " ms"
            ].map(function (x) { return h("td", { text: x }); }));
          }))
        ])
      ]);
    }

    var inputKind = "unknown";

    function onKey(e) {
      if (!state) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var k = (e.key || "").toLowerCase();
      var idx = KEYS.indexOf(k);
      if (idx === -1 && mode === "count" && /^[1-4]$/.test(k)) idx = +k - 1;
      if (idx === -1) return;
      e.preventDefault();
      inputKind = "keyboard";
      respond(idx, e);
    }

    function onPointer(e) {
      if (e.pointerType) inputKind = e.pointerType;
    }

    function startKeys() {
      stopKeys();
      document.body.classList.add("pz-running");
      keyHandler = onKey;
      document.addEventListener("keydown", keyHandler);
      root.addEventListener("pointerdown", onPointer, true);
    }

    function stopKeys() {
      document.body.classList.remove("pz-running");
      if (keyHandler) document.removeEventListener("keydown", keyHandler);
      root.removeEventListener("pointerdown", onPointer, true);
      keyHandler = null;
      if (state) clearTimeout(state.timer);
    }

    // Khi chuyển trang bằng instant navigation, phần tử bị gỡ: dừng lượt đang chạy.
    if (window.document$ && window.document$.subscribe) {
      var sub = window.document$.subscribe(function () {
        if (!document.body.contains(root)) {
          stopKeys();
          state = null;
          if (sub && sub.unsubscribe) sub.unsubscribe();
        }
      });
    }

    intro();
  }

  window.PZStroop = { COLOR_SET: COLOR_SET, MODES: MODES, STROOP_1935: STROOP_1935 };
  window.PZReady(init);
})();
