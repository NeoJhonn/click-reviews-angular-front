import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-card',
  imports: [
    RouterModule,
    MaterialModule],
  templateUrl: './products-card.html',
  styleUrl: './products-card.scss'
})
export class ProductsCard {

}
