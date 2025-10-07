import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    MaterialModule,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (e) {
        console.error('Erro ao carregar anúncio do AdSense:', e);
      }
    }
  }

  currentYear: number = new Date().getFullYear();
  socialLinks =
    { icon: 'assets/icons/instagram.svg', url: 'https://www.instagram.com/click__reviews/' };

}
