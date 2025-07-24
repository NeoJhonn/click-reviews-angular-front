import { Component, Input, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { SafePipe } from '../safe-pipe';
import { MaterialModule } from '../../material.module-module';
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-product-review',
  imports: [MaterialModule, SafePipe],
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.scss',
})
export class ProductReviewComponent {
  @Input() productTitle = '';
  @Input() subtitle = '';
  @Input() imageUrl = '';
  @Input() benefits: string[] = [];
  @Input() videoUrl = '';
  @Input() opinion = '';
  @Input() linkComprar = '';
  @Input() price = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error('Erro ao carregar anúncio do AdSense:', e);
      }
    }
  }

  precoFormatado(price: number) {
    return  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(price));
  }
}


