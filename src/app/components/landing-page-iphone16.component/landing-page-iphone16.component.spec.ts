import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageIphone16Component } from './landing-page-iphone16.component';

describe('LandingPageIphone16Component', () => {
  let component: LandingPageIphone16Component;
  let fixture: ComponentFixture<LandingPageIphone16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageIphone16Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageIphone16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
