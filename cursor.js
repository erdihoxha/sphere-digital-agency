/* Shared cursor.
   A small dot follows the pointer with a slight lag. Over anything marked data-cursor="view"
   it becomes a ring with an arrow. Hidden on touch devices. */

(function () {
  "use strict";

  var cursor = document.getElementById("cursor");
  if (!cursor) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var EASE = reduceMotion ? 1 : 0.2;

  var target = { x: 0, y: 0 };
  var cur = { x: 0, y: 0 };
  var shown = false;

  window.addEventListener("pointermove", function (e) {
    target.x = e.clientX;
    target.y = e.clientY;
    if (!shown) {
      cur.x = target.x;
      cur.y = target.y;
      shown = true;
      cursor.classList.add("is-on");
    }
  }, { passive: true });

  document.addEventListener("pointerover", function (e) {
    var hit = e.target.closest ? e.target.closest("[data-cursor]") : null;
    if (hit) {
      cursor.setAttribute("data-state", hit.getAttribute("data-cursor"));
    } else {
      cursor.removeAttribute("data-state");
    }
  });

  document.addEventListener("pointerleave", function () {
    shown = false;
    cursor.classList.remove("is-on");
  });

  function tick() {
    cur.x += (target.x - cur.x) * EASE;
    cur.y += (target.y - cur.y) * EASE;
    cursor.style.transform = "translate(" + cur.x + "px," + cur.y + "px)";
    requestAnimationFrame(tick);
  }
  tick();
})();
