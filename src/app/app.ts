import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { MaterialModule } from './material.module';
import { Home } from './components/home/home';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MaterialModule,
    Header,
    Footer
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ClickReviews, melhor site de análises do Brasil';
}
