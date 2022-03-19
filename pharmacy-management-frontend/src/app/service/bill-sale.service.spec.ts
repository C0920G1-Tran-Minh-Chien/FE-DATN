import { TestBed } from '@angular/core/testing';

import { BillSaleService } from './bill-sale.service';

describe('BillSaleService', () => {
  let service: BillSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
