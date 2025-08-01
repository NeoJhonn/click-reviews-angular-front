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
  @Input() imageUrl: string[] = [];
  @Input() benefits: string[] = [];
  @Input() videoUrl = '';
  @Input() opinion = '';
  @Input() linkComprar: string[] = [];
  @Input() price = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
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

  //Carrosel de fotos
  currentIndex = 0;
  modalImage: string | null = null;

  get currentImage(): string {
    return this.imageUrl[this.currentIndex];
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.imageUrl.length;
  }

  previousImage(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.imageUrl.length) % this.imageUrl.length;
  }

  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }

  openModal(image: string): void {
    this.modalImage = image;
  }
}


