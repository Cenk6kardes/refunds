import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundDataTableComponent } from './refund-data-table.component';

describe('RefundDataTableComponent', () => {
  let component: RefundDataTableComponent;
  let fixture: ComponentFixture<RefundDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
