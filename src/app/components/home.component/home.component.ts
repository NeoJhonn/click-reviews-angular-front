import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { ProductCardComponent } from '../product-card.component/product-card.component';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';


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

}
