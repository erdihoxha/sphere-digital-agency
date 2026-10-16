import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Mark } from '../mark/mark';

/** Fixed bar drawn with difference blending, so it reads on the dark hero and the light sections alike. */
@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, Mark],
  template: `
    <header class="nav">
      <a class="nav__brand" routerLink="/" aria-label="SPHERE Digital Agency, home">
        <app-mark [mono]="true" class="nav__logo" />
        <span>SPHERE</span>
      </a>
      <nav class="nav__links" aria-label="Primary">
        <a class="pill" routerLink="/work" routerLinkActive="is-active" ariaCurrentWhenActive="page">Work</a>
        <a class="pill" routerLink="/about" routerLinkActive="is-active" ariaCurrentWhenActive="page">About</a>
        <a class="pill" routerLink="/" fragment="contact">Contact</a>
      </nav>
    </header>
  `,
})
export class Nav {}
