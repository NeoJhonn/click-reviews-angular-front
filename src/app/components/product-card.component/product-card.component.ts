import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { RouterModule } from '@angular/router';
import { ProductData } from '../../services/product-data.service';

@Component({
  selector: 'app-product-card',
  imports: [
    RouterModule,
    MaterialModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  constructor(private cdr: ChangeDetectorRef) {

   }


  @Input() product: ProductData = {
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
  }

  ngOnInit(): void {
  this.cdr.detectChanges()
  }
}
