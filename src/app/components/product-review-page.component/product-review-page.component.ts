import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { ProductReviewComponent } from '../product-review.component/product-review.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module-module';


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

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadProduct(slug);
        console.log('slug da rota: ', slug);
      }
    });
  }

  loadProduct(slug: string): void {
    this.http.get<any[]>('/assets/data/products.json').subscribe(products => {
      const found = products.find(p => p.slug === slug);
      this.product = found;

      // Atualiza o título da aba
    this.title.setTitle(`${this.product.productTitle} | ClickReviews`);

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

      this.cdr.detectChanges(); // <- força atualização de estado para carregar a página
      console.log('Produto carregado:', found);
    });
  }
}
