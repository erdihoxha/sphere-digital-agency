import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, computed, inject, signal, viewChild } from '@angular/core';

import { Footer } from '../footer/footer';
import { ProjectCard } from './project-card';
import { PROJECTS } from './projects';

/** The first six lead the page in two staggered columns. */
const FEATURED = PROJECTS.slice(0, 6);

const SERVICES = [...new Set(PROJECTS.flatMap((p) => p.services))].sort();
const INDUSTRIES = [...new Set(PROJECTS.map((p) => p.industry))].sort();

type FilterKey = 'services' | 'industry';

@Component({
  selector: 'app-work',
  imports: [ProjectCard, Footer],
  host: { '(document:click)': 'closeMenus($event)', '(document:keydown.escape)': 'menu.set(null)' },
  template: `
    <main class="work">
      <!-- Featured: vertical title, two columns that drift apart as you scroll -->
      <section #proof class="proof">
        <h1 class="proof__title"><span>Selected work</span></h1>

        <div class="proof__grid">
          <div class="proof__col">
            @for (p of featuredLeft; track p.title) {
              <app-project-card [project]="p" [index]="featured.indexOf(p)" [style.order]="featured.indexOf(p)" class="proof__card" />
            }
          </div>
          <div class="proof__col proof__col--right">
            <a class="proof__all" href="#all" (click)="toAll($event)">All projects <span>&darr;</span></a>
            @for (p of featuredRight; track p.title) {
              <app-project-card [project]="p" [index]="featured.indexOf(p)" [style.order]="featured.indexOf(p)" class="proof__card" />
            }
          </div>
        </div>
      </section>

      <!-- All projects: filters and a three-column grid -->
      <section #allSection id="all" class="all">
        <h2 class="all__title" aria-label="All projects">
          <span class="all__word" aria-hidden="true"><i>A</i><i>L</i><i>L</i></span>
          <span class="all__word all__word--soft" aria-hidden="true"><i>P</i><i>R</i><i>O</i><i>J</i><i>E</i><i>C</i><i>T</i><i>S</i></span>
        </h2>

        <div class="filters">
          @for (f of filterKeys; track f) {
            <div class="filter" [class.is-open]="menu() === f">
              <button
                type="button"
                class="pill"
                [class.is-set]="selected()[f]"
                [attr.aria-expanded]="menu() === f"
                (click)="toggle(f, $event)"
              >
                {{ selected()[f] ?? (f === 'services' ? 'Services' : 'Industry') }}
                <span class="pill__icon">&darr;</span>
              </button>
              @if (menu() === f) {
                <ul class="filter__menu" role="listbox">
                  <li><button type="button" (click)="pick(f, null)" [class.is-on]="!selected()[f]">All</button></li>
                  @for (opt of options[f]; track opt) {
                    <li><button type="button" (click)="pick(f, opt)" [class.is-on]="selected()[f] === opt">{{ opt }}</button></li>
                  }
                </ul>
              }
            </div>
          }
        </div>

        <ul class="all__grid">
          @for (p of visible(); track p.title) {
            <li><app-project-card [project]="p" [index]="projects.indexOf(p)" [photo]="1" /></li>
          } @empty {
            <li class="all__empty serif">Nothing here yet, <em>try another filter.</em></li>
          }
        </ul>
      </section>
    </main>

    <app-footer />
  `,
})
export class Work implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly featuredEl = viewChild.required<ElementRef<HTMLElement>>('proof');
  private readonly allEl = viewChild.required<ElementRef<HTMLElement>>('allSection');

  protected readonly projects = PROJECTS;
  protected readonly featured = FEATURED;
  protected readonly featuredLeft = FEATURED.filter((_, i) => i % 2 === 0);
  protected readonly featuredRight = FEATURED.filter((_, i) => i % 2 === 1);

  protected readonly filterKeys: FilterKey[] = ['services', 'industry'];
  protected readonly options: Record<FilterKey, string[]> = { services: SERVICES, industry: INDUSTRIES };
  protected readonly menu = signal<FilterKey | null>(null);
  protected readonly selected = signal<Record<FilterKey, string | null>>({ services: null, industry: null });

  protected readonly visible = computed(() => {
    const { services, industry } = this.selected();
    return PROJECTS.filter(
      (p) => (!services || p.services.includes(services)) && (!industry || p.industry === industry),
    );
  });

  private raf = 0;
  private teardown: Array<() => void> = [];

  protected toggle(key: FilterKey, e: Event): void {
    e.stopPropagation();
    this.menu.update((m) => (m === key ? null : key));
  }

  protected pick(key: FilterKey, value: string | null): void {
    this.selected.update((s) => ({ ...s, [key]: value }));
    this.menu.set(null);
  }

  protected closeMenus(e: Event): void {
    if (this.menu() && !(e.target as Element).closest?.('.filter')) this.menu.set(null);
  }

  protected toAll(e: Event): void {
    e.preventDefault();
    this.allEl().nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    // Scroll effects only write CSS variables, so they run outside Angular.
    this.zone.runOutsideAngular(() => {
      const featured = this.featuredEl().nativeElement;
      const all = this.allEl().nativeElement;
      const clamp = (n: number) => Math.min(1, Math.max(0, n));

      const update = () => {
        this.raf = 0;
        const vh = window.innerHeight;

        // Featured: 0 when the section top meets the viewport top, 1 when its bottom does.
        const f = featured.getBoundingClientRect();
        featured.style.setProperty('--p', clamp(-f.top / Math.max(1, f.height - vh)).toFixed(4));

        // Title letters close up as the section scrolls in.
        const a = all.getBoundingClientRect();
        all.style.setProperty('--p', clamp((vh - a.top) / vh).toFixed(4));
      };

      const request = () => {
        if (!this.raf) this.raf = requestAnimationFrame(update);
      };

      update();
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', request);
      this.teardown.push(
        () => window.removeEventListener('scroll', request),
        () => window.removeEventListener('resize', request),
      );
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.teardown.forEach((fn) => fn());
  }
}
