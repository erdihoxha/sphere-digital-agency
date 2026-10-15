import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Cursor } from './cursor/cursor';
import { Nav } from './nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Cursor],
  template: `
    <app-nav />
    <router-outlet />
    <app-cursor />
  `,
})
export class App {}
