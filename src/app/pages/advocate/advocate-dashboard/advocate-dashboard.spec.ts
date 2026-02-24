import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateDashboard } from './advocate-dashboard';

describe('AdvocateDashboard', () => {
  let component: AdvocateDashboard;
  let fixture: ComponentFixture<AdvocateDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvocateDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvocateDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
