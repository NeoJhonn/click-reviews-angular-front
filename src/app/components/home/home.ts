import { Component } from '@angular/core';
import { Header } from '../header/header';
import { ProductsCard } from '../products-card/products-card';

@Component({
  selector: 'app-home',
  imports: [  
    ProductsCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
