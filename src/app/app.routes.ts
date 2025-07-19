import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { ProductReviewPageComponent } from './components/product-review-page.component/product-review-page.component';
import { ReachOutComponent } from './components/reach-out.component/reach-out.component';
import { NotFoundComponent } from './components/not-found.component/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'review/:slug', component: ProductReviewPageComponent },
  { path: 'contato', component: ReachOutComponent },
  { path: '**', component: NotFoundComponent }

];
