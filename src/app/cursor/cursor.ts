import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';

/**
 * Shared cursor. A small dot follows the pointer with a slight lag. Over anything marked
 * data-cursor="view" it becomes a ring with an arrow. Hidden on touch devices.
 */
@Component({
  selector: 'app-cursor',
  template: `
    <div #cursor class="cursor" aria-hidden="true">
      <span class="cursor__dot"></span>
      <span class="cursor__ring">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </div>
  `,
})
export class Cursor implements AfterViewInit, OnDestroy {
  private readonly host = viewChild.required<ElementRef<HTMLDivElement>>('cursor');

  private raf = 0;
  private teardown: Array<() => void> = [];

  ngAfterViewInit(): void {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const el = this.host().nativeElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = reduceMotion ? 1 : 0.2;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let shown = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        cur.x = target.x;
        cur.y = target.y;
        shown = true;
        el.classList.add('is-on');
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const hit = t?.closest ? t.closest('[data-cursor]') : null;
      if (hit) el.setAttribute('data-state', hit.getAttribute('data-cursor') ?? '');
      else el.removeAttribute('data-state');
    };

    const onLeave = () => {
      shown = false;
      el.classList.remove('is-on');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerleave', onLeave);
    this.teardown.push(
      () => window.removeEventListener('pointermove', onMove),
      () => document.removeEventListener('pointerover', onOver),
      () => document.removeEventListener('pointerleave', onLeave),
    );

    const tick = () => {
      cur.x += (target.x - cur.x) * ease;
      cur.y += (target.y - cur.y) * ease;
      el.style.transform = `translate(${cur.x}px,${cur.y}px)`;
      this.raf = requestAnimationFrame(tick);
    };
    tick();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.teardown.forEach((fn) => fn());
  }
}
