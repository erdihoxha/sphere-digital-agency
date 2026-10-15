import { Routes } from '@angular/router';

import { Home } from './home/home';
import { About } from './about/about';
import { Work } from './work/work';

export const routes: Routes = [
  { path: '', component: Home, title: 'SPHERE Digital Agency' },
  { path: 'work', component: Work, title: 'Work | SPHERE Digital Agency' },
  { path: 'about', component: About, title: 'About | SPHERE Digital Agency' },
  { path: '**', redirectTo: '' },
];
