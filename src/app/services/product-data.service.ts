import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ProductData {
  slug: string;
  productTitle: string;
  subtitle: string;
  imageUrl: string;
  benefits: string[];
  videoUrl: string;
  opinion: string;
  linkComprar: string;
  productType: string;
  opinionPreview:string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private jsonUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.jsonUrl);
  }

  getProductBySlug(slug: string): Observable<ProductData | undefined> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const product = products.find(p => p.slug === slug);
        observer.next(product);
        observer.complete();
      });
    });
  }
}
