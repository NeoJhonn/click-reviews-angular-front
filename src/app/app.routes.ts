import { Routes } from '@angular/router';
import { ReachOut } from './components/reach-out/reach-out';
import { Home } from './components/home/home';
import { ProductReviewPage } from './components/product-review-page/product-review-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'review/:slug', component: ProductReviewPage },
  { path: 'contato', component: ReachOut }
];
