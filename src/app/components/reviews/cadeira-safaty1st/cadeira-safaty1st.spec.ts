import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiraSafaty1st } from './cadeira-safaty1st';

describe('CadeiraSafaty1st', () => {
  let component: CadeiraSafaty1st;
  let fixture: ComponentFixture<CadeiraSafaty1st>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadeiraSafaty1st]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadeiraSafaty1st);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
