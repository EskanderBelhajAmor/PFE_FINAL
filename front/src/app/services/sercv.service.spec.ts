import { TestBed } from '@angular/core/testing';

import { SercvService } from './sercv.service';

describe('SercvService', () => {
  let service: SercvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SercvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
