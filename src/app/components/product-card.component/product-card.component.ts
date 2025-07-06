import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { RouterModule } from '@angular/router';

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

}
