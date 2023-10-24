import { TestBed } from '@angular/core/testing';

import { URLParserService } from './urlparser.service';

describe('URLParserService', () => {
  let service: URLParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(URLParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
