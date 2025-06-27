import { Routes } from '@angular/router';
import { ReachOut } from './components/reach-out/reach-out';
import { Home } from './components/home/home';
import { Galaxy15 } from './components/reviews/galaxy-15/galaxy-15';
import { CadeiraSafaty1st } from './components/reviews/cadeira-safaty1st/cadeira-safaty1st';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'analise-galaxy-a15', component: Galaxy15 },
  { path: 'analise-cadeira-safety1st', component: CadeiraSafaty1st },
  { path: 'contato', component: ReachOut },
];
