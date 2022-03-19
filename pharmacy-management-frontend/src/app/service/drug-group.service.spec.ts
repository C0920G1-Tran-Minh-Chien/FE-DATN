import { TestBed } from '@angular/core/testing';

import { DrugGroupService } from './drug-group.service';

describe('DrugGroupService', () => {
  let service: DrugGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
