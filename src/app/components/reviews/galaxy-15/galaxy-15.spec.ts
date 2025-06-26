import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Galaxy15 } from './galaxy-15';

describe('Galaxy15', () => {
  let component: Galaxy15;
  let fixture: ComponentFixture<Galaxy15>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Galaxy15]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Galaxy15);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
