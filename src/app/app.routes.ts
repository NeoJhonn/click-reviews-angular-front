import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { ProductReviewPageComponent } from './components/product-review-page.component/product-review-page.component';
import { ReachOutComponent } from './components/reach-out.component/reach-out.component';
import { NotFoundComponent } from './components/not-found.component/not-found.component';
import { PrivacyComponent } from './components/privacy.component/privacy.component';
import { LandingPageIphone16Component } from './components/landing-page-iphone16.component/landing-page-iphone16.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacidade', component: PrivacyComponent},
  { path: 'review/:slug', component: ProductReviewPageComponent },
  { path: 'contato', component: ReachOutComponent },
  { path: 'oferta/iphone-16', component: LandingPageIphone16Component },
  { path: '**', component: NotFoundComponent }

];
