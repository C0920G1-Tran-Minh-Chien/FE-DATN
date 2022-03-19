import { TestBed } from '@angular/core/testing';

import { DrugGroupClientService } from './drug-group-client.service';

describe('DrugGroupClientService', () => {
  let service: DrugGroupClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugGroupClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
