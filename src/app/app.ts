import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { MaterialModule } from './material.module';
import { Home } from './components/home/home';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MaterialModule,
    Header
],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'click-reviews-angular-front';
}
