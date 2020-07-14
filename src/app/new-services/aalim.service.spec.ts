import { TestBed } from '@angular/core/testing';

import { AalimService } from './aalim.service';

describe('AalimService', () => {
  let service: AalimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AalimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
