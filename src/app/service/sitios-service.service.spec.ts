import { TestBed } from '@angular/core/testing';

import { SitiosServiceService } from './sitios-service.service';

describe('SitiosServiceService', () => {
  let service: SitiosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitiosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
