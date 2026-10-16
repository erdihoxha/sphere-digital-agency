import { Routes } from '@angular/router';

import { Home } from './home/home';
import { About } from './about/about';
import { Work } from './work/work';
import { CaseStudy } from './work/case-study';

export const routes: Routes = [
  { path: '', component: Home, title: 'SPHERE Digital Agency' },
  { path: 'work', component: Work, title: 'Work | SPHERE Digital Agency' },
  { path: 'work/:slug', component: CaseStudy },
  { path: 'about', component: About, title: 'About | SPHERE Digital Agency' },
  { path: '**', redirectTo: '' },
];
