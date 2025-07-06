import { Component, Input } from '@angular/core';
import { SafePipe } from '../safe-pipe';
import { MaterialModule } from '../../material.module-module';

@Component({
  selector: 'app-product-review',
  imports: [
    MaterialModule,
    SafePipe
  ],
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.scss'
})
export class ProductReviewComponent {
  @Input() productTitle = '';
  @Input() subtitle = '';
  @Input() imageUrl = '';
  @Input() benefits: string[] = [];
  @Input() videoUrl = '';
  @Input() opinion = '';
  @Input() linkVerPreco = '';
  @Input() linkComprar = '';
}
