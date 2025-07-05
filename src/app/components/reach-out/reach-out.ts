import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-reach-out',
  imports: [
    MaterialModule
  ],
  templateUrl: './reach-out.html',
  styleUrl: './reach-out.scss'
})
export class ReachOut {

   constructor(private title: Title, private meta: Meta) {
    // SEO Metadata
    this.title.setTitle(`Contato | ClickReviews`);

    // Limpa tags anteriores (evita duplicação)
    this.meta.removeTag("name='description'");
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("property='og:type'");
    this.meta.removeTag("name='twitter:card'");
    this.meta.removeTag("name='twitter:title'");
    this.meta.removeTag("name='twitter:description'");
    this.meta.removeTag("name='twitter:image'");

    this.meta.updateTag({
        property: 'og:title',
        content: 'Contato | ClickReviews',
      });
    this.meta.updateTag({
        property: 'og:url',
        content: window.location.href,
      });
   }



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
    }
  ];

}
