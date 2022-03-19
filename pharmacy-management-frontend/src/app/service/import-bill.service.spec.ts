import { TestBed } from '@angular/core/testing';

import { ImportBillService } from './import-bill.service';

describe('ImportBillService', () => {
  let service: ImportBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
