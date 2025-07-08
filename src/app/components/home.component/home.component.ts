import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { ProductCardComponent } from '../product-card.component/product-card.component';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [
    MaterialModule,
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private title: Title, private meta: Meta) {
    // SEO Metadata
  //   this.title.setTitle(`Home | ClickReviews`);

  //   // Limpa tags anteriores (evita duplicação)
  //   this.meta.removeTag("name='description'");
  //   this.meta.removeTag("property='og:title'");
  //   this.meta.removeTag("property='og:description'");
  //   this.meta.removeTag("property='og:image'");
  //   this.meta.removeTag("property='og:url'");
  //   this.meta.removeTag("property='og:type'");
  //   this.meta.removeTag("name='twitter:card'");
  //   this.meta.removeTag("name='twitter:title'");
  //   this.meta.removeTag("name='twitter:description'");
  //   this.meta.removeTag("name='twitter:image'");


  //   this.meta.updateTag({
  //       property: 'og:description',
  //       content: 'ClickReviews, o melhor site de Reviews do Brasil!',
  //     });
  //   if (isPlatformBrowser(this.platformId)) {
  //     let url = window.location.href;
  //     this.meta.updateTag({
  //     property: 'og:url',
  //     content: url,
  //   });
  //   }
   }

}
