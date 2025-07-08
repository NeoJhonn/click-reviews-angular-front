import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reach-out',
  imports: [MaterialModule],
  templateUrl: './reach-out.component.html',
  styleUrl: './reach-out.component.scss',
})
export class ReachOutComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private title: Title
  ) {
    // SEO Metadata
    this.title.setTitle(`Contato | ClickReviews`);

    // Limpa tags anteriores (evita duplicação)
    //this.meta.removeTag("name='description'");
    //this.meta.removeTag("property='og:title'");
    //this.meta.removeTag("property='og:description'");
    //this.meta.removeTag("property='og:image'");
    //this.meta.removeTag("property='og:url'");
    //this.meta.removeTag("property='og:type'");
    //this.meta.removeTag("name='twitter:card'");
    //this.meta.removeTag("name='twitter:title'");
    //this.meta.removeTag("name='twitter:description'");
    //this.meta.removeTag("name='twitter:image'");
    //this.meta.removeTag("name='twitter:domain'");
    //this.meta.removeTag("name='twitter:url'");

    //this.meta.updateTag({
      //property: 'og:title',
      //content: 'Contato | ClickReviews',
    //});

    //if (isPlatformBrowser(this.platformId)) {
      //let url = window.location.href;
      //this.meta.updateTag({
     // property: 'og:url',
      //content: url,
    //});
   // }
  //}

  contactLinks = [
    {
      alt: 'Instagram',
      icon: 'assets/icons/instagram.svg',
      url: 'https://instagram.com/jhonny__azevedo',
    },
    {
      alt: 'WhatsApp',
      icon: 'assets/icons/whatsapp.svg',
      url: 'https://wa.me/5547991803680', // Substitua pelo seu número
    },
  ];
}
