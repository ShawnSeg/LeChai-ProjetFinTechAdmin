import { TestBed } from '@angular/core/testing';

import { FiltresValuesService } from './filtres-values.service';

describe('FiltresValuesService', () => {
  let service: FiltresValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltresValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
