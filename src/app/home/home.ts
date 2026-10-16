import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MARK_CORNERS, MARK_S, MARK_VIEWBOX, Mark } from '../mark/mark';
import { CONTACT_EMAIL } from '../site';

const img = (n: number) => `images/photo-${String(n).padStart(2, '0')}.jpg`;

/** Photos cycled inside the hero reel, the inline "STORY" pill and the big S. */
const REEL = [1, 13, 19, 38, 5, 46, 27, 21].map(img);
const PILL = [16, 30, 3, 42, 20, 9].map(img);
const MARK_FILL = [7, 9, 5, 10, 6].map(img);

interface Offer {
  key: string;
  title: string;
  /** Letters for the big stacked word in the open card, one row per entry. */
  rows: string[];
  pitch: string;
  services: string[];
  image: string;
}

/** Placeholder copy built from the existing services list. */
const OFFERS: Offer[] = [
  {
    key: 'identity',
    title: 'Identity',
    rows: ['IDEN', 'TI', 'TY'],
    pitch: 'We shape how brands look, sound and feel so they are recognised at a glance',
    services: ['Creative direction', 'Branding', 'Art direction', 'Consulting'],
    image: img(8),
  },
  {
    key: 'content',
    title: 'Content',
    rows: ['CON', 'TE', 'NT'],
    pitch: 'We produce the photos, films and campaigns that stop the scroll',
    services: ['Production', 'Photography', 'Campaigns', 'Social media'],
    image: img(18),
  },
  {
    key: 'digital',
    title: 'Digital',
    rows: ['DIG', 'IT', 'AL'],
    pitch: 'We design and build websites that turn attention into action',
    services: ['Web design', 'Web development', 'E-commerce', 'Launch support'],
    image: img(39),
  },
];

type Tile =
  | { kind: 'photo'; src: string; size: 's' | 'm' | 'l'; shift: number }
  | { kind: 'card'; title: string; label: string; link: string; fragment?: string };

const TILES: Tile[] = [
  { kind: 'photo', src: img(21), size: 'm', shift: -4 },
  { kind: 'card', title: 'Selected work', label: 'View work', link: '/work' },
  { kind: 'photo', src: img(12), size: 'l', shift: 2 },
  { kind: 'photo', src: img(33), size: 's', shift: -6 },
  { kind: 'card', title: 'Who we are', label: 'About', link: '/about' },
  { kind: 'photo', src: img(41), size: 'm', shift: 6 },
  { kind: 'photo', src: img(24), size: 'l', shift: -2 },
  { kind: 'card', title: 'Start a project', label: 'Contact', link: '/', fragment: 'contact' },
  { kind: 'photo', src: img(2), size: 's', shift: 4 },
  { kind: 'photo', src: img(14), size: 'm', shift: -3 },
  { kind: 'card', title: 'What we do', label: 'Services', link: '/', fragment: 'deliver' },
  { kind: 'photo', src: img(45), size: 'm', shift: 5 },
];


@Component({
  selector: 'app-home',
  imports: [RouterLink, Mark],
  template: `
    <!-- 1. Hero: justified headline, serif subline, reel that grows as you scroll -->
    <section class="hero">
      <h1 class="hero__title" aria-label="Sphere is home to brands that refuse to blend in">
        <span class="justify" aria-hidden="true"><span>SPHERE</span><span>IS</span><span>HOME</span><span>TO</span></span>
        <span class="justify" aria-hidden="true"><span>BRANDS</span><span>THAT</span><span>REFUSE</span></span>
        <span class="justify" aria-hidden="true"><span>TO</span><span>BLEND</span><span>IN</span></span>
      </h1>
      <p class="serif hero__sub">
        Built on a culture of <em>craft and curiosity</em>, backed<br />
        by the belief that <em>great brands are felt first.</em>
      </p>
    </section>

    <section #reel class="reel">
      <div class="reel__sticky">
        <div class="reel__frame" data-cursor="view">
          @for (src of reelImages; track src; let i = $index) {
            <img [src]="src" alt="" [class.is-on]="i === tick() % reelImages.length" />
          }
          <app-mark class="reel__mark" />
          <span class="pill pill--light reel__play">Watch reel <span class="pill__icon">&#9654;</span></span>
        </div>
      </div>
      <a class="scroll-cue" href="#intro" aria-label="Scroll down">&darr;</a>
    </section>

    <!-- 2. Light intro: photo-filled S and a word split by a media pill -->
    <section #intro id="intro" class="intro">
      <svg class="intro__mark" [attr.viewBox]="markViewBox" aria-hidden="true">
        <defs>
          <clipPath id="mark-clip">
            <path [attr.d]="markS" />
            @for (d of markCorners; track $index) {
              <path [attr.d]="d" />
            }
          </clipPath>
        </defs>
        <g clip-path="url(#mark-clip)">
          <rect x="178" y="168" width="714" height="712" fill="var(--purple)" />
          @for (src of markFill; track src; let i = $index) {
            <image
              [attr.href]="src"
              x="140" y="130" width="790" height="790"
              preserveAspectRatio="xMidYMid slice"
              [class.is-on]="i === tick() % markFill.length"
            />
          }
        </g>
      </svg>

      <div class="intro__copy">
        <p class="serif intro__lede">
          A digital agency for brands, websites<br />and campaigns <em>people remember.</em>
        </p>
        <h2 class="intro__kicker">We make people care through</h2>
        <p class="intro__word" aria-label="Storytelling">
          <span class="intro__line" aria-hidden="true">
            <span>S</span><span>T</span><span>O</span>
            <span class="intro__pill" data-cursor="view">
              @for (src of pill; track src; let i = $index) {
                <img [src]="src" alt="" [class.is-on]="i === tick() % pill.length" />
              }
              <span class="pill pill--light">Watch reel <span class="pill__icon">&#9654;</span></span>
            </span>
            <span>R</span><span>Y</span>
          </span>
          <span class="intro__line" aria-hidden="true">
            <span>T</span><span>E</span><span>L</span><span>L</span><span>I</span><span>N</span><span>G</span>
          </span>
        </p>
      </div>
    </section>

    <!-- 3. What we deliver: expanding cards -->
    <section id="deliver" class="deliver">
      <h2 class="section-title">What we deliver</h2>
      <div class="offers">
        @for (offer of offers; track offer.key; let i = $index) {
          <article
            class="offer"
            [class.is-open]="open() === i"
            (mouseenter)="open.set(i)"
            (focusin)="open.set(i)"
            (click)="open.set(i)"
            tabindex="0"
          >
            <img class="offer__bg" [src]="offer.image" alt="" loading="lazy" />
            <div class="offer__body">
              <h3 class="offer__pitch">{{ offer.pitch }}</h3>
              <span class="pill pill--light">Services</span>
              <ul class="offer__list">
                @for (s of offer.services; track s) {
                  <li>{{ s }}</li>
                }
              </ul>
            </div>
            <p class="offer__big" aria-hidden="true">
              @for (row of offer.rows; track $index) {
                <span>
                  @for (ch of row.split(''); track $index) {
                    <i>{{ ch }}</i>
                  }
                </span>
              }
            </p>
            <p class="offer__label">{{ offer.title }}</p>
          </article>
        }
      </div>
    </section>

    <!-- 4. Culture & craft: vertical scroll drives a sideways gallery -->
    <section #culture class="culture">
      <div class="culture__sticky">
        <p #cultureWord class="culture__word" aria-label="Culture and craft">
          <span aria-hidden="true">CU L TU R E</span>
          <span class="culture__amp" aria-hidden="true">&amp;</span>
          <span aria-hidden="true">CR A F T</span>
        </p>
        <p class="serif culture__sub">
          Fuelled by <em>curiosity, taste and hard work,</em><br />
          it&rsquo;s our people that make us <em>Sphere.</em>
        </p>
        <div #track class="culture__track">
          @for (tile of tiles; track $index) {
            @if (tile.kind === 'photo') {
              <figure class="tile tile--{{ tile.size }}" [style.--shift]="tile.shift + 'vh'">
                <img [src]="tile.src" alt="" />
              </figure>
            } @else {
              <a class="tile tile--card" [routerLink]="tile.link" [fragment]="tile.fragment">
                <span class="tile__title">{{ tile.title }}</span>
                <span class="pill">{{ tile.label }} <span class="pill__icon">&nearr;</span></span>
              </a>
            }
          }
        </div>
        <div class="pager" aria-hidden="true">
          <span>{{ page() }} / 2</span>
          <i [class.is-on]="page() === 1"></i>
          <i [class.is-on]="page() === 2"></i>
        </div>
      </div>
    </section>

    <!-- 5. Contact -->
    <footer id="contact" class="contact">
      <h2 class="contact__title">
        <span class="justify"><span>GOT</span><span>A</span><span>BRAND</span></span>
        <span class="justify"><span>WORTH</span><span>TALKING</span></span>
        <span class="justify"><span>ABOUT?</span></span>
      </h2>
      <div class="contact__row">
        <p class="serif">Tell us what you&rsquo;re building. <em>We&rsquo;ll take it from there.</em></p>
        <a class="pill pill--light pill--big" [href]="'mailto:' + email">Start a project <span class="pill__icon">&nearr;</span></a>
      </div>
      <div class="contact__base">
        <span class="contact__brand"><app-mark /> SPHERE</span>
        <span>&reg;2026 SPHERE Digital Agency</span>
      </div>
    </footer>
  `,
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly reelEl = viewChild.required<ElementRef<HTMLElement>>('reel');
  private readonly introEl = viewChild.required<ElementRef<HTMLElement>>('intro');
  private readonly cultureEl = viewChild.required<ElementRef<HTMLElement>>('culture');
  private readonly wordEl = viewChild.required<ElementRef<HTMLElement>>('cultureWord');
  private readonly trackEl = viewChild.required<ElementRef<HTMLElement>>('track');

  protected readonly reelImages = REEL;
  protected readonly pill = PILL;
  protected readonly markFill = MARK_FILL;
  protected readonly offers = OFFERS;
  protected readonly tiles = TILES;
  protected readonly email = CONTACT_EMAIL;
  protected readonly markViewBox = MARK_VIEWBOX;
  protected readonly markS = MARK_S;
  protected readonly markCorners = MARK_CORNERS;

  /** Shared clock for every slideshow on the page. */
  protected readonly tick = signal(0);
  protected readonly open = signal(0);
  protected readonly page = signal(1);

  private timer = 0;
  private raf = 0;
  private teardown: Array<() => void> = [];

  ngAfterViewInit(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) this.timer = window.setInterval(() => this.tick.update((t) => t + 1), 1400);

    // Scroll effects run outside Angular and only write CSS variables / transforms.
    this.zone.runOutsideAngular(() => {
      const reel = this.reelEl().nativeElement;
      const intro = this.introEl().nativeElement;
      const culture = this.cultureEl().nativeElement;
      const word = this.wordEl().nativeElement;
      const track = this.trackEl().nativeElement;

      const clamp = (n: number) => Math.min(1, Math.max(0, n));

      // The culture section is as tall as its sideways travel, so one vertical pixel moves one sideways pixel.
      const size = () => {
        const travel = Math.max(0, track.scrollWidth - window.innerWidth);
        culture.style.height = `${window.innerHeight + travel}px`;
      };

      const update = () => {
        this.raf = 0;
        const vh = window.innerHeight;

        // Reel: grows from a card to full bleed while its sticky frame is pinned.
        const r = reel.getBoundingClientRect();
        reel.style.setProperty('--p', clamp(-r.top / Math.max(1, r.height - vh)).toFixed(4));

        // Intro: letters pull together and the S drifts as the section enters.
        const i = intro.getBoundingClientRect();
        intro.style.setProperty('--p', clamp((vh - i.top) / (vh + i.height * 0.5)).toFixed(4));

        // Culture: map vertical progress to sideways movement of the word and the gallery.
        const c = culture.getBoundingClientRect();
        const p = clamp(-c.top / Math.max(1, c.height - vh));
        const wordTravel = Math.max(0, word.scrollWidth - window.innerWidth);
        const trackTravel = Math.max(0, track.scrollWidth - window.innerWidth);
        word.style.transform = `translate3d(${-p * wordTravel}px,0,0)`;
        track.style.transform = `translate3d(${-p * trackTravel}px,0,0)`;

        const page = p < 0.5 ? 1 : 2;
        if (page !== this.page()) this.zone.run(() => this.page.set(page));
      };

      const request = () => {
        if (!this.raf) this.raf = requestAnimationFrame(update);
      };
      const onResize = () => {
        size();
        request();
      };

      size();
      update();
      // Images change the track width once they load.
      track.querySelectorAll('img').forEach((im) => im.addEventListener('load', onResize, { once: true }));

      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', onResize);
      this.teardown.push(
        () => window.removeEventListener('scroll', request),
        () => window.removeEventListener('resize', onResize),
      );
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    cancelAnimationFrame(this.raf);
    this.teardown.forEach((fn) => fn());
  }
}
