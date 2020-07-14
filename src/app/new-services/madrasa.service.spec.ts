import { TestBed } from '@angular/core/testing';

import { MadrasaService } from './madrasa.service';

describe('MadrasaService', () => {
  let service: MadrasaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MadrasaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
