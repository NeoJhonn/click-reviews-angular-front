import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-footer',
  imports: [
    MaterialModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  currentYear: number = new Date().getFullYear();
  socialLinks = [
    { icon: 'photo_camera', url: 'https://instagram.com/clickreviews' }
  ]
}
