import { Component } from '@angular/core';
import { ProductReviewComponent } from '../product-review.component/product-review.component';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { ProductData, ProductDataService } from '../../services/product-data.service';
import { Title } from '@angular/platform-browser';

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
  imageUrl: [],
  benefits: [],
  videoUrl: "",
  opinionPreview: "",
  opinion: "",
  linkComprar: [],
  productCategory: "",
  price: 0,
  isFeatured:false
  };

  constructor(private route: ActivatedRoute,
    private productService: ProductDataService, private cdr: ChangeDetectorRef, private title: Title) {


  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
  if (slug) {
    this.productService.getProductBySlug(slug).subscribe(product => {
      if (product) {
        this.product = product;

        // SEO Metadata
        this.title.setTitle(`${this.product.productTitle} | ClickReviews`);
        //this.cdr.detectChanges();
      } else {
        console.error('Produto não encontrado');
      }
    });
  }
  }
}
