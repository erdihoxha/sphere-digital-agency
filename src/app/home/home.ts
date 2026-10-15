import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, inject, viewChild } from '@angular/core';

/**
 * Cursor image trail.
 * Moving the pointer drops an image each time it has travelled far enough since the last one.
 * Each image pops in, holds briefly, then fades out and removes itself.
 * To use your own photos, replace the files in public/images and update IMAGES.
 */
const IMAGES = Array.from({ length: 10 }, (_, i) => `images/${String(i + 1).padStart(2, '0')}.svg`);

const SETTINGS = {
  spacing: 0.1, // distance between drops, as a fraction of viewport width
  minSpacing: 90, // px
  sizeVw: 0.115, // image width as a fraction of viewport width
  minSize: 110, // px
  maxSize: 200, // px
  ratio: 1.22, // height / width
  jitter: 12, // px of random offset
  tilt: 6, // degrees of random rotation
  popMs: 380,
  holdMs: 650,
  fadeMs: 700,
  maxLive: 28,
};

@Component({
  selector: 'app-home',
  template: `
    <main id="top" class="hero">
      <h1 class="mark" aria-label="SPHERE Digital Agency">
        <span class="mark__word" aria-hidden="true">SPHERE</span>
        <span class="mark__sub" aria-hidden="true">
          <span class="mark__letters"><i>D</i><i>I</i><i>G</i><i>I</i><i>T</i><i>A</i><i>L</i></span>
          <span class="mark__letters"><i>A</i><i>G</i><i>E</i><i>N</i><i>C</i><i>Y</i></span>
        </span>
      </h1>

      <p class="tagline">We build brands, websites and campaigns<br />that people remember.</p>
    </main>

    <div #trail class="trail" aria-hidden="true"></div>
  `,
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly doc = inject(DOCUMENT);
  private readonly trail = viewChild.required<ElementRef<HTMLDivElement>>('trail');

  private teardown: Array<() => void> = [];

  constructor() {
    // The home screen is locked to one viewport; other pages scroll.
    this.doc.body.classList.add('page-home');
  }

  ngAfterViewInit(): void {
    const container = this.trail().nativeElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Preload so the first drops are not blank.
    IMAGES.forEach((src) => {
      const im = new Image();
      im.src = src;
    });

    let index = 0;
    let z = 1;
    let live = 0;
    let last: { x: number; y: number } | null = null;

    const dims = () => {
      const vw = window.innerWidth;
      const w = Math.max(SETTINGS.minSize, Math.min(SETTINGS.maxSize, vw * SETTINGS.sizeVw));
      return { w, h: w * SETTINGS.ratio, gap: Math.max(SETTINGS.minSpacing, vw * SETTINGS.spacing) };
    };

    const rand = (n: number) => (Math.random() * 2 - 1) * n;

    const drop = (x: number, y: number) => {
      if (live >= SETTINGS.maxLive) return;

      const d = dims();
      const el = document.createElement('img');
      el.className = 'trail__img';
      el.alt = '';
      el.draggable = false;
      el.src = IMAGES[index % IMAGES.length];
      index++;

      el.style.width = `${d.w}px`;
      el.style.height = `${d.h}px`;
      el.style.zIndex = String(z++);

      const tx = x - d.w / 2 + rand(SETTINGS.jitter);
      const ty = y - d.h / 2 + rand(SETTINGS.jitter);
      const rot = reduceMotion ? 0 : rand(SETTINGS.tilt);
      const base = `translate(${tx}px,${ty}px) rotate(${rot}deg) `;

      container.appendChild(el);
      live++;

      const from = reduceMotion ? 1 : 0.55;
      const pop = el.animate(
        [
          { transform: `${base}scale(${from})`, opacity: 0 },
          { transform: `${base}scale(1)`, opacity: 1 },
        ],
        { duration: SETTINGS.popMs, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' },
      );

      pop.onfinish = () => {
        const out = el.animate(
          [
            { transform: `${base}scale(1)`, opacity: 1 },
            { transform: `${base}scale(${reduceMotion ? 1 : 0.88})`, opacity: 0 },
          ],
          { duration: SETTINGS.fadeMs, delay: SETTINGS.holdMs, easing: 'ease-in', fill: 'forwards' },
        );
        out.onfinish = () => {
          el.remove();
          live--;
        };
      };
    };

    const onMove = (e: PointerEvent) => {
      const pos = { x: e.clientX, y: e.clientY };
      if (!last) {
        last = { ...pos };
        return;
      }

      const gap = dims().gap;
      const dx = pos.x - last.x;
      const dy = pos.y - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // A fast swipe can cover several gaps between two events: fill them in along the path.
      if (dist >= gap) {
        const steps = Math.floor(dist / gap);
        for (let i = 1; i <= steps; i++) {
          const t = (i * gap) / dist;
          drop(last.x + dx * t, last.y + dy * t);
        }
        const used = steps * gap;
        last.x += dx * (used / dist);
        last.y += dy * (used / dist);
      }
    };

    const onLeave = () => {
      last = null;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    this.doc.addEventListener('pointerleave', onLeave);
    this.teardown.push(
      () => window.removeEventListener('pointermove', onMove),
      () => window.removeEventListener('pointerdown', onMove),
      () => this.doc.removeEventListener('pointerleave', onLeave),
    );
  }

  ngOnDestroy(): void {
    this.teardown.forEach((fn) => fn());
    this.doc.body.classList.remove('page-home');
  }
}
