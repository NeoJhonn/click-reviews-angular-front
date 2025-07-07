import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { ProductReviewComponent } from '../product-review.component/product-review.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module-module';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-review-page',
  imports: [
    MaterialModule,
    ProductReviewComponent
  ],
  templateUrl: './product-review-page.component.html',
  styleUrl: './product-review-page.component.scss'
})
export class ProductReviewPageComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  product?: any;
  isBrowser: boolean;

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.route.paramMap.subscribe(params => {
        const slug = params.get('slug');
        if (slug) {
          this.loadProduct(slug);
          console.log('slug da rota: ', slug);
        }
      });
    }
  }

  loadProduct(slug: string): void {
    this.http.get<any[]>('/assets/data/products.json').subscribe(products => {
      const found = products.find(p => p.slug === slug);
      this.product = found;

      // Atualiza o título da aba
      this.title.setTitle(`${this.product.productTitle} | ClickReviews`);

      // Limpa tags anteriores
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

      // Open Graph
      this.meta.addTags([
        { property: 'og:title', content: this.product.productTitle },
        { property: 'og:description', content: this.product.opinion },
        { property: 'og:image', content: this.product.imageUrl },
        { property: 'og:url', content: `https://clickreviews.com.br/review/${this.product.slug}` },
        { property: 'og:type', content: 'website' },
      ]);

      // Twitter Card
      this.meta.addTags([
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: this.product.productTitle },
        { name: 'twitter:description', content: this.product.opinion },
        { name: 'twitter:image', content: this.product.imageUrl },
      ]);

      //this.cdr.detectChanges();
      console.log('Produto carregado:', found);
    });
  }
}
