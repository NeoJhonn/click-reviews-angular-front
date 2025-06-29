import { Component, Input} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SafePipe } from '../safe-pipe';

@Component({
  selector: 'app-product-review',
  imports: [
    MaterialModule,
    SafePipe

  ],
  templateUrl: './product-review.html',
  styleUrl: './product-review.scss'
})
export class ProductReview {
  @Input() productTitle = '';
  @Input() subtitle = '';
  @Input() imageUrl = '';
  @Input() benefits: string[] = [];
  @Input() videoUrl = '';
  @Input() opinion = '';
  @Input() linkVerPreco = '';
  @Input() linkComprar = '';
}
