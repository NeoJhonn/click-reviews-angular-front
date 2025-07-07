import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { ProductReviewPageComponent } from './components/product-review-page.component/product-review-page.component';
import { ReachOutComponent } from './components/reach-out.component/reach-out.component';
import { HomeMetaResolver } from './components/home.component/home-meta.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent,
    resolve: { meta: HomeMetaResolver } },
  { path: 'review/:slug', component: ProductReviewPageComponent },
  { path: 'contato', component: ReachOutComponent }
];
