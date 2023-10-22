import { TestBed } from '@angular/core/testing';

import { ParamsURLService } from './params-url.service';

describe('ParamsURLService', () => {
  let service: ParamsURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
