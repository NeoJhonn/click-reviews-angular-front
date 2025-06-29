import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductReview } from '../product-review/product-review';
import { MaterialModule } from '../../material.module';
import { ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-product-review-page',
  standalone: true,
  imports: [ProductReview, MaterialModule],
  templateUrl: './product-review-page.html',
  styleUrl: './product-review-page.scss',
})
export class ProductReviewPage implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  product?: any;

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadProduct(slug);
        console.log('slud da rota: ', slug);
      }
    });
  }

  loadProduct(slug: string): void {
    this.http.get<any[]>('/assets/data/products.json').subscribe(products => {
      const found = products.find(p => p.slug === slug);
      this.product = found;
      this.title.setTitle(`${this.product.productTitle} | ClickReviews`);

      this.meta.updateTag({
        name: 'description',
        content: this.product.opinion,
      });

      this.meta.updateTag({
        property: 'og:title',
        content: this.product.productTitle,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: this.product.opinion,
      });
      this.meta.updateTag({
        property: 'og:image',
        content: this.product.imageUrl,
      });
      this.meta.updateTag({
        property: 'og:url',
        content: window.location.href,
      });
      this.cdr.detectChanges(); // <- força atualização de estado para carregar a página
      console.log('Produto carregado:', found);
    });
  }
}
