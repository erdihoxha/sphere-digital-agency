import { Component } from '@angular/core';

interface Project {
  title: string;
  tags: string;
  image: string;
}

/** Dummy projects. Swap the names, tags and images (public/images) for real ones. */
const PROJECTS: Project[] = [
  { title: 'Orbit Coffee', tags: 'Branding | Packaging', image: 'images/photo-01.jpg' },
  { title: 'Halo Skincare', tags: 'Creative direction | Production', image: 'images/photo-02.jpg' },
  { title: 'Northbound Fitness', tags: 'Web development | Social media', image: 'images/photo-03.jpg' },
  { title: 'Verde Market', tags: 'Branding | Web development', image: 'images/photo-04.jpg' },
  { title: 'Pulse Festival', tags: 'Campaign | Production', image: 'images/photo-05.jpg' },
  { title: 'Atlas Studio', tags: 'Consulting | Branding', image: 'images/photo-06.jpg' },
];

@Component({
  selector: 'app-work',
  template: `
    <main class="work">
      <section class="work__intro">
        <h1 class="work__title">Selected work</h1>
        <p class="work__sub">A few projects we&rsquo;re proud of</p>
      </section>

      <ul class="grid">
        @for (project of projects; track project.title) {
          <li>
            <a class="card" href="#" data-cursor="view" (click)="$event.preventDefault()">
              <div class="card__media">
                <img [src]="project.image" alt="" loading="lazy" />
              </div>
              <h2 class="card__title">{{ project.title }}</h2>
              <p class="card__meta">{{ project.tags }}</p>
            </a>
          </li>
        }
      </ul>

      <footer class="foot">
        <span>2026&reg;</span>
        <span>SPHERE Digital Agency. All rights reserved.</span>
      </footer>
    </main>
  `,
})
export class Work {
  protected readonly projects = PROJECTS;
}
