import { Component } from '@angular/core';
import { ProductsCard } from '../products-card/products-card';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [  
    ProductsCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(private title: Title, private meta: Meta) {
    // SEO Metadata
    this.title.setTitle(`Home | ClickReviews`);
    
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
        property: 'og:description',
        content: 'ClickReviews, o melhor site de Reviews do Brasil!',
      });
    this.meta.updateTag({
        property: 'og:url',
        content: window.location.href,
      });
   }

}
