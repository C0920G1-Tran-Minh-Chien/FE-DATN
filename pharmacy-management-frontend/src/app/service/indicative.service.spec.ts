import { TestBed } from '@angular/core/testing';

import { IndicativeService } from './indicative.service';

describe('IndicativeService', () => {
  let service: IndicativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
