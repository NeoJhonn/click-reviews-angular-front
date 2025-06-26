import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachOut } from './reach-out';

describe('ReachOut', () => {
  let component: ReachOut;
  let fixture: ComponentFixture<ReachOut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReachOut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReachOut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
