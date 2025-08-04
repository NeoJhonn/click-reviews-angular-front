import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductDataLoaderService } from './product-data-loader.service';


export interface ProductData {
  slug: string;
  productTitle: string;
  subtitle: string;
  imageUrl: string[];
  benefits: string[];
  videoUrl: string;
  opinion: string;
  linkComprar: string[];
  productCategory: string;
  opinionPreview:string;
  price: number;
  isFeatured: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  constructor(private loader: ProductDataLoaderService) {}

  getAllProducts(): Observable<ProductData[]> {
    return of(this.loader.getProducts());
  }

  getProductBySlug(slug: string): Observable<ProductData | undefined> {
    return of(this.loader.getBySlug(slug));
  }
}
