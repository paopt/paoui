import { TestBed } from '@angular/core/testing';

import { PuiService } from './pui.service';

describe('PuiService', () => {
  let service: PuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
