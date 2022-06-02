import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRefundCodeDialogComponent } from './add-refund-code-dialog.component';

describe('AddRefundCodeDialogComponent', () => {
  let component: AddRefundCodeDialogComponent;
  let fixture: ComponentFixture<AddRefundCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRefundCodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRefundCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
