import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Project } from './projects';

/** Indents (in em) applied row by row so the letters of the name look scattered. */
const ROW_INDENT = [0, 0.9, 0.35, 1.3, 0.6];
/** Per row, the letter that gets a wide gap before it (-1 for none). */
const ROW_GAP = [2, -1, 1, 2, -1];

/** Breaks a name into short rows of letters, e.g. "THE VILLAGE" -> THE / VIL / LA / GE. */
function scatter(title: string): string[] {
  const rows: string[] = [];
  for (const word of title.toUpperCase().split(/\s+/)) {
    for (let i = 0; i < word.length; ) {
      const n = word.length - i === 4 ? 2 : 3;
      rows.push(word.slice(i, i + n));
      i += n;
    }
  }
  return rows;
}

/**
 * A project tile: number, serif tagline, scattered name and an arrow that shows on hover.
 * Clicking it names its photo for the view transition, so the photo grows into the project hero.
 */
@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  template: `
    <a
      class="pcard"
      data-cursor="view"
      [routerLink]="['/work', project().slug]"
      [attr.aria-label]="project().title"
      (click)="morph($event)"
    >
      <img [src]="image()" alt="" loading="lazy" />
      <span class="pcard__no"><small>NO.</small>{{ number() }}</span>
      <p class="pcard__tag">{{ project().tagline[0] }}<br /><em>{{ project().tagline[1] }}</em></p>
      <p class="pcard__name" [class.is-long]="rows().length > 3" aria-hidden="true">
        @for (row of rows(); track $index; let r = $index) {
          <span [style.padding-left.em]="indent[r % indent.length]">
            @for (ch of row.split(''); track $index; let c = $index) {
              <i [class.gap]="c === gap[r % gap.length]">{{ ch }}</i>
            }
          </span>
        }
      </p>
      <span class="pcard__go" aria-hidden="true">&rarr;</span>
    </a>
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly index = input.required<number>();
  /** Which of the project's photos to show. */
  readonly photo = input(0);

  protected readonly indent = ROW_INDENT;
  protected readonly gap = ROW_GAP;
  protected readonly rows = computed(() => scatter(this.project().title));
  protected readonly number = computed(() => String(this.index() + 1).padStart(2, '0'));
  protected readonly image = computed(() => {
    const imgs = this.project().images;
    return imgs[this.photo() % imgs.length];
  });

  protected morph(e: MouseEvent): void {
    // Modified clicks open a new tab, so there is no transition to set up.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    // The current project's hero (when leaving one project for the next) gives up the name first.
    document.querySelectorAll<HTMLElement>('.case__hero-img').forEach((el) => (el.style.viewTransitionName = 'none'));
    const photo = (e.currentTarget as HTMLElement).querySelector('img');
    if (photo) photo.style.viewTransitionName = 'project-hero';
  }
}
