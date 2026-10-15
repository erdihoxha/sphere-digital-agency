import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="nav">
      <a class="nav__brand" routerLink="/">
        <img class="nav__logo" src="images/logo.svg" alt="" width="26" height="26" />
        <span>SPHERE Digital Agency</span>
      </a>
      <nav class="nav__links" aria-label="Primary">
        <a routerLink="/work" routerLinkActive="is-active" ariaCurrentWhenActive="page">Work</a>
        <a routerLink="/about" routerLinkActive="is-active" ariaCurrentWhenActive="page">About</a>
        <a routerLink="/" fragment="contact">Contact</a>
      </nav>
      <span class="nav__year">&reg;2026</span>
    </header>
  `,
})
export class Nav {}
