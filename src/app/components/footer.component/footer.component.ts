import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module-module';

@Component({
  selector: 'app-footer',
  imports: [
    MaterialModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  socialLinks = [
    { icon: 'assets/icons/instagram.svg', url: 'https://instagram.com/jhonny__azevedo' }
  ]
}
