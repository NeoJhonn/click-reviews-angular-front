import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { ChangeDetectionStrategy } from '@angular/core';
import { MaterialModule } from './material.module';
import { ProductsCard } from "./components/products-card/products-card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    MaterialModule,
    ProductsCard
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'click-reviews-angular-front';
}
