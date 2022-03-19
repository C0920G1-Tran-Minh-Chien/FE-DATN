import { TestBed } from '@angular/core/testing';

import { ImportBillServiceService } from './import-bill-service.service';

describe('ImportBillServiceService', () => {
  let service: ImportBillServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportBillServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
