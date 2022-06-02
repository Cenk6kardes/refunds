import { TestBed } from '@angular/core/testing';

import { RefundTableService } from './refund-table.service';

describe('RefundTableService', () => {
  let service: RefundTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefundTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
