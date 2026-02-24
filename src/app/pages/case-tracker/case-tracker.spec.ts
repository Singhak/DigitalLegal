import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTracker } from './case-tracker';

describe('CaseTracker', () => {
  let component: CaseTracker;
  let fixture: ComponentFixture<CaseTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
