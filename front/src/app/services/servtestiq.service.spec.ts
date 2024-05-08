import { TestBed } from '@angular/core/testing';

import { ServtestiqService } from './servtestiq.service';

describe('ServtestiqService', () => {
  let service: ServtestiqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServtestiqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
