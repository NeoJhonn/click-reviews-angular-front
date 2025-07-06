import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { ProductReviewPageComponent } from './components/product-review-page.component/product-review-page.component';
import { ReachOutComponent } from './components/reach-out.component/reach-out.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'review/:slug', component: ProductReviewPageComponent },
  { path: 'contato', component: ReachOutComponent }
];
