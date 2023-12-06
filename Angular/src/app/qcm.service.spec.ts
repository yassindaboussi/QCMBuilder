import { TestBed } from '@angular/core/testing';

import { QcmService } from './qcm.service';

describe('QcmService', () => {
  let service: QcmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QcmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
