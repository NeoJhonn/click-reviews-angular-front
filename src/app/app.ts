import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header.component/header.component";
import { FooterComponent } from "./components/footer.component/footer.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'click-reviews-angular-front';
}
