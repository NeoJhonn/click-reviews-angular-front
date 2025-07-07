import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MaterialModule } from '../../material.module-module';
import { ProductCardComponent } from '../product-card.component/product-card.component';
import { ActivatedRoute } from '@angular/router';


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
  constructor(private route: ActivatedRoute) {
    // Esse subscribe "força" o Angular a aguardar o resolver
    this.route.data.subscribe();
  }
}
