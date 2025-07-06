import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewPageComponent } from './product-review-page.component';

describe('ProductReviewPageComponent', () => {
  let component: ProductReviewPageComponent;
  let fixture: ComponentFixture<ProductReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReviewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
