import { Component, ElementRef, computed, effect, inject, input, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Footer } from '../footer/footer';
import { ProjectCard } from './project-card';
import { PROJECTS } from './projects';

/**
 * Single project page. The hero photo carries the "project-hero" view-transition name, so the
 * card that was clicked grows into it. The page ends with the next project's card, which does the same.
 */
@Component({
  selector: 'app-case-study',
  imports: [Footer, ProjectCard],
  template: `
    <!-- Keyed on the slug so moving to the next project builds a fresh page and hero. -->
    @for (p of current(); track p.slug) {
      <main class="case">
        <header class="case__hero">
          <img class="case__hero-img" [src]="pic(0)" alt="" />
          <div class="case__hero-text">
            <p class="case__client">{{ p.title }}</p>
            <h1 class="case__headline">{{ p.tagline[0] }}<br /><em>{{ p.tagline[1] }}</em></h1>
          </div>
        </header>

        <section class="case__intro">
          <div>
            <p class="case__kicker">{{ p.kicker }}</p>
            <p class="case__lede">{{ p.intro }}</p>
          </div>
          <dl class="case__meta">
            <div><dt>Project</dt><dd>{{ p.title }}</dd></div>
            <div><dt>Industry</dt><dd>{{ p.industry }}</dd></div>
            <div>
              <dt>Services</dt>
              @for (s of p.services; track s) {
                <dd>{{ s }}</dd>
              }
            </div>
            <div><dt>Agency</dt><dd>SPHERE Digital Agency</dd></div>
          </dl>
        </section>

        <section class="chapter">
          <div class="chapter__text">
            <p class="case__kicker">{{ p.chapters[0].kicker }}</p>
            <h2 class="chapter__title">{{ p.chapters[0].heading[0] }} <em>{{ p.chapters[0].heading[1] }}</em></h2>
            <img class="chapter__thumb" [src]="pic(1)" alt="" loading="lazy" />
            <p class="chapter__body">{{ p.chapters[0].body }}</p>
          </div>
          <figure class="chapter__media"><img [src]="pic(2)" alt="" loading="lazy" /></figure>
        </section>

        <section class="reel-row">
          <h2 class="chapter__title reel-row__title">A <em>closer</em><br />look</h2>
          <div #track class="reel-row__track">
            @for (src of p.images; track $index) {
              <img [src]="src" alt="" loading="lazy" />
            }
          </div>
          <div class="reel-row__nav">
            <button type="button" aria-label="Previous images" (click)="slide(-1)">&larr;</button>
            <button type="button" aria-label="Next images" (click)="slide(1)">&rarr;</button>
          </div>
        </section>

        <section class="case__pair">
          <img [src]="pic(3)" alt="" loading="lazy" />
          <img [src]="pic(4)" alt="" loading="lazy" />
        </section>

        <section class="chapter chapter--flip">
          <div class="chapter__text">
            <p class="case__kicker">{{ p.chapters[1].kicker }}</p>
            <h2 class="chapter__title"><em>{{ p.chapters[1].heading[0] }}</em> {{ p.chapters[1].heading[1] }}</h2>
            <img class="chapter__thumb" [src]="pic(5)" alt="" loading="lazy" />
            <p class="chapter__body">{{ p.chapters[1].body }}</p>
          </div>
          <figure class="chapter__media"><img [src]="pic(6)" alt="" loading="lazy" /></figure>
        </section>

        <section class="case__next">
          <p class="case__kicker">Next project</p>
          <app-project-card class="case__next-card" [project]="next()" [index]="nextIndex()" />
        </section>
      </main>

      <app-footer />
    }
  `,
})
export class CaseStudy {
  /** Bound from the :slug route parameter. */
  readonly slug = input.required<string>();

  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly track = viewChild<ElementRef<HTMLElement>>('track');

  protected readonly index = computed(() => PROJECTS.findIndex((p) => p.slug === this.slug()));
  protected readonly project = computed(() => PROJECTS[this.index()]);
  protected readonly current = computed(() => (this.project() ? [this.project()] : []));
  protected readonly nextIndex = computed(() => (this.index() + 1) % PROJECTS.length);
  protected readonly next = computed(() => PROJECTS[this.nextIndex()]);

  constructor() {
    effect(() => {
      const p = this.project();
      if (!p) {
        this.router.navigate(['/work'], { replaceUrl: true });
        return;
      }
      this.title.setTitle(`${p.title} | SPHERE Digital Agency`);
    });
  }

  /** Photo n of the project, wrapping round when a shoot has fewer photos than the layout. */
  protected pic(n: number): string {
    const imgs = this.project().images;
    return imgs[n % imgs.length];
  }

  protected slide(dir: 1 | -1): void {
    const el = this.track()?.nativeElement;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    el.scrollBy({ left: dir * (first.offsetWidth + 12), behavior: 'smooth' });
  }
}
