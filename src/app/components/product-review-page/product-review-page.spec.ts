import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewPage } from './product-review-page';

describe('ProductReviewPage', () => {
  let component: ProductReviewPage;
  let fixture: ComponentFixture<ProductReviewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReviewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
