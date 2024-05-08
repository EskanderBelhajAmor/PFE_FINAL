import { TestBed } from '@angular/core/testing';

import { ServentretienService } from './serventretien.service';

describe('ServentretienService', () => {
  let service: ServentretienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServentretienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
