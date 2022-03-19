import { TestBed } from '@angular/core/testing';

import { ImportBilDrugService } from './import-bil-drug.service';

describe('ImportBilDrugService', () => {
  let service: ImportBilDrugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportBilDrugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
