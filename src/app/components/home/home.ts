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
    this.title.setTitle(`Home | Produtos em Destaque | ClickReviews`);
    this.meta.updateTag({
        property: 'og:title',
        content: 'Contato | ClickReviews',
      });
    this.meta.updateTag({
        property: 'og:url',
        content: window.location.href,
      });
   }

}
