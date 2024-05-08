import { TestBed } from '@angular/core/testing';

import { ServcandService } from './servcand.service';

describe('ServcandService', () => {
  let service: ServcandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServcandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
