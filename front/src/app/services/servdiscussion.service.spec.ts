import { TestBed } from '@angular/core/testing';

import { ServdiscussionService } from './servdiscussion.service';

describe('ServdiscussionService', () => {
  let service: ServdiscussionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServdiscussionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
