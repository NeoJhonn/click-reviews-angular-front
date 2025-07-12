import { ChangeDetectorRef, Component } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { ProductCardComponent } from '../product-card.component/product-card.component';
import { Title } from '@angular/platform-browser';
import { ProductData, ProductDataService  } from '../../services/product-data.service';
import { CanonicalService } from '../../services/canonical.service';


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
  products: ProductData[] = [];

  constructor(private canonicalService: CanonicalService, private title: Title, private productService: ProductDataService, private cdr: ChangeDetectorRef) {
    // SEO Metadata
     this.title.setTitle(`Home | ClickReviews`);
   }

   ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.cdr.detectChanges();
    });

    // Settando link canonico
    const canonicalUrl = `https://www.clickreviews.com.br/home`;
    this.canonicalService.setCanonicalURL(canonicalUrl);
  }
}
