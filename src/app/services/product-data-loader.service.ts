import { Injectable, Inject, PLATFORM_ID, inject, makeStateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductData } from './product-data.service';
import { isPlatformServer } from '@angular/common';


import { firstValueFrom } from 'rxjs';

const PRODUCTS_KEY = makeStateKey<ProductData[]>('products-data');

@Injectable({ providedIn: 'root' })
export class ProductDataLoaderService {
  private data: ProductData[] = [];

  constructor(
    private http: HttpClient,
    @Inject(TransferState) private state: TransferState
  ) {
    const platformId = inject(PLATFORM_ID);
    if (this.state.hasKey(PRODUCTS_KEY)) {
      this.data = this.state.get(PRODUCTS_KEY, []);
    } else if (!isPlatformServer(platformId)) {
      this.loadData(); // fallback no browser (opcional)
    }
  }

  loadData(): Promise<void> {
    return firstValueFrom(
      this.http.get<ProductData[]>('assets/data/products.json')
    ).then((data) => {
      this.data = data || [];
      this.state.set(PRODUCTS_KEY, this.data);
    });
  }

  getProducts(): ProductData[] {
    return this.data;
  }

  getBySlug(slug: string): ProductData | undefined {
    return this.data.find(p => p.slug === slug);
  }
}
