import { Component } from '@angular/core';
import { ProductReviewComponent } from '../product-review.component/product-review.component';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { ProductData, ProductDataService } from '../../services/product-data.service';
import { CanonicalService } from '../../services/canonical.service';

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
  product: ProductData = {
    slug: "",
  productTitle: "Produto Não econtrado",
  subtitle: "Produto Não econtrado",
  imageUrl: "",
  benefits: [],
  videoUrl: "",
  opinionPreview: "",
  opinion: "",
  linkComprar: "",
  productType: ""
  };

  constructor(private route: ActivatedRoute,
    private productService: ProductDataService, private cdr: ChangeDetectorRef,
             private canonicalService: CanonicalService) {

  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
  if (slug) {
    this.productService.getProductBySlug(slug).subscribe(product => {
      if (product) {
        this.product = product;
        this.cdr.detectChanges();
      } else {
        console.error('Produto não encontrado');
      }
    });
  }
    // Settando link canonico
    const slug2 = this.route.snapshot.paramMap.get('slug');
    const canonicalUrl = `https://www.clickreviews.com.br/review/${slug2}`;
    this.canonicalService.setCanonicalURL(canonicalUrl);
  }
}
