import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseModal } from './add-case-modal';

describe('AddCaseModal', () => {
  let component: AddCaseModal;
  let fixture: ComponentFixture<AddCaseModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCaseModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCaseModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
