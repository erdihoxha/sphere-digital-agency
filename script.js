/* Cursor image trail.
   Moving the pointer drops an image each time it has travelled far enough since the last one.
   Each image pops in, holds briefly, then fades out and removes itself.
   To use your own photos, replace the entries in IMAGES (same-size portrait crops work best). */

(function () {
  "use strict";

  var IMAGES = [
    "images/01.svg", "images/02.svg", "images/03.svg", "images/04.svg", "images/05.svg",
    "images/06.svg", "images/07.svg", "images/08.svg", "images/09.svg", "images/10.svg"
  ];

  var SETTINGS = {
    spacing: 0.1,      // distance between drops, as a fraction of viewport width
    minSpacing: 90,    // px
    sizeVw: 0.115,     // image width as a fraction of viewport width
    minSize: 110,      // px
    maxSize: 200,      // px
    ratio: 1.22,       // height / width
    jitter: 12,        // px of random offset
    tilt: 6,           // degrees of random rotation
    popMs: 380,
    holdMs: 650,
    fadeMs: 700,
    maxLive: 28
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var trail = document.getElementById("trail");

  // Preload so the first drops are not blank.
  IMAGES.forEach(function (src) { var im = new Image(); im.src = src; });

  var index = 0;
  var z = 1;
  var live = 0;
  var last = null;      // position of the last drop
  var pos = { x: 0, y: 0 };

  function dims() {
    var vw = window.innerWidth;
    var w = Math.max(SETTINGS.minSize, Math.min(SETTINGS.maxSize, vw * SETTINGS.sizeVw));
    return {
      w: w,
      h: w * SETTINGS.ratio,
      gap: Math.max(SETTINGS.minSpacing, vw * SETTINGS.spacing)
    };
  }

  function rand(n) { return (Math.random() * 2 - 1) * n; }

  function drop(x, y) {
    if (live >= SETTINGS.maxLive) return;

    var d = dims();
    var el = document.createElement("img");
    el.className = "trail__img";
    el.alt = "";
    el.draggable = false;
    el.src = IMAGES[index % IMAGES.length];
    index++;

    el.style.width = d.w + "px";
    el.style.height = d.h + "px";
    el.style.zIndex = String(z++);

    var tx = x - d.w / 2 + rand(SETTINGS.jitter);
    var ty = y - d.h / 2 + rand(SETTINGS.jitter);
    var rot = reduceMotion ? 0 : rand(SETTINGS.tilt);
    var base = "translate(" + tx + "px," + ty + "px) rotate(" + rot + "deg) ";

    trail.appendChild(el);
    live++;

    var from = reduceMotion ? 1 : 0.55;
    var pop = el.animate(
      [
        { transform: base + "scale(" + from + ")", opacity: 0 },
        { transform: base + "scale(1)", opacity: 1 }
      ],
      { duration: SETTINGS.popMs, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
    );

    pop.onfinish = function () {
      var out = el.animate(
        [
          { transform: base + "scale(1)", opacity: 1 },
          { transform: base + "scale(" + (reduceMotion ? 1 : 0.88) + ")", opacity: 0 }
        ],
        { duration: SETTINGS.fadeMs, delay: SETTINGS.holdMs, easing: "ease-in", fill: "forwards" }
      );
      out.onfinish = function () {
        el.remove();
        live--;
      };
    };
  }

  function onMove(e) {
    pos.x = e.clientX;
    pos.y = e.clientY;

    if (!last) {
      last = { x: pos.x, y: pos.y };
      return;
    }

    var gap = dims().gap;
    var dx = pos.x - last.x;
    var dy = pos.y - last.y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    // A fast swipe can cover several gaps between two events: fill them in along the path.
    if (dist >= gap) {
      var steps = Math.floor(dist / gap);
      for (var i = 1; i <= steps; i++) {
        var t = (i * gap) / dist;
        drop(last.x + dx * t, last.y + dy * t);
      }
      var used = steps * gap;
      last.x += dx * (used / dist);
      last.y += dy * (used / dist);
    }
  }

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onMove, { passive: true });
  document.addEventListener("pointerleave", function () {
    last = null;
  });
})();
