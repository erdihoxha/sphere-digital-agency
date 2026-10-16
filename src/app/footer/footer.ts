import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Mark } from '../mark/mark';
import { CONTACT_EMAIL } from '../site';

/** Dark site footer: faded S watermark, three columns, and oversized type cropped at the bottom edge. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, Mark],
  template: `
    <footer class="site-foot">
      <app-mark class="site-foot__mark" [mono]="true" />

      <div class="site-foot__cols">
        <div class="site-foot__col">
          <h2 class="site-foot__label">Connect</h2>
          <a [href]="'mailto:' + email">Get in touch</a>
          <a [href]="'mailto:' + email + '?subject=New%20project'">Start a project</a>
        </div>

        <nav class="site-foot__nav" aria-label="Footer">
          <a routerLink="/">Home</a>
          <a routerLink="/work">Work</a>
          <a routerLink="/about">About</a>
          <a routerLink="/" fragment="contact">Contact</a>
        </nav>

        <div class="site-foot__col">
          <h2 class="site-foot__label">New business</h2>
          <p class="site-foot__lead">Got a brand worth talking about?</p>
          <a class="pill pill--light" [href]="'mailto:' + email">Say hello <span class="pill__icon">&rarr;</span></a>
        </div>
      </div>

      <div class="site-foot__bar">
        <span>Branding &middot; Production &middot; Web</span>
        <span>&reg;SPHERE 2026. All rights reserved</span>
      </div>

      <div class="site-foot__giant" aria-hidden="true">
        <span>LET&rsquo;S</span>
        <span class="serif site-foot__note">A digital agency for brands,<br />websites and campaigns<br /><em>people remember.</em></span>
        <span>TALK</span>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly email = CONTACT_EMAIL;
}
