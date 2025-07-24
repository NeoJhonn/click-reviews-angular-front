import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-footer',
  imports: [
    MaterialModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error('Erro ao carregar anúncio do AdSense:', e);
      }
    }
  }

  currentYear: number = new Date().getFullYear();
  socialLinks = [
    { icon: 'assets/icons/instagram.svg', url: 'https://www.instagram.com/click__reviews/' }
  ]
}
