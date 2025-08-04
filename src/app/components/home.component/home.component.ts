import { ChangeDetectorRef, Component } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { ProductCardComponent } from '../product-card.component/product-card.component';
import { Title } from '@angular/platform-browser';
import { ProductData, ProductDataService  } from '../../services/product-data.service';
import { CanonicalService } from '../../services/canonical.service';
import { FilterService } from '../../services/filter.service';


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
  filteredProducts: ProductData[] = [];

  constructor(private title: Title, private productService: ProductDataService, private filterService: FilterService) {
    // SEO Metadata
     this.title.setTitle(`Home | ClickReviews`);
   }

   ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;

    this.filterService.category$.subscribe(category => {
      this.applyFilter(category);
    });
    });
  }

  applyFilter(category: string) {
  if (!category) {
    this.filteredProducts = this.products;
  } else if (category === 'destaque') {
    this.filteredProducts = this.products.filter(p => p.isFeatured);
  } else {
    this.filteredProducts = this.products.filter(p => p.productCategory === category);
  }
}
}
