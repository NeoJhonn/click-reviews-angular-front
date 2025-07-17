import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { CanonicalService } from '../../services/canonical.service';

@Component({
  selector: 'app-reach-out',
  imports: [MaterialModule],
  templateUrl: './reach-out.component.html',
  styleUrl: './reach-out.component.scss',
})
export class ReachOutComponent {
  constructor(private canonicalService: CanonicalService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private title: Title
  ) {
    // SEO Metadata
    this.title.setTitle(`Contato | ClickReviews`);
  }

  contactLinks = [
    {
      alt: 'Instagram',
      icon: 'assets/icons/instagram.svg',
      url: 'https://www.instagram.com/click__reviews/',
    },
    {
      alt: 'WhatsApp',
      icon: 'assets/icons/whatsapp.svg',
      url: 'https://wa.me/5547991803680', // Substitua pelo seu número
    },
  ];
}
