import { TestBed } from '@angular/core/testing';

import { SeroffreService } from './seroffre.service';

describe('SeroffreService', () => {
  let service: SeroffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeroffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
