import { TestBed } from '@angular/core/testing';

import { ChapterService } from './chapters.service';

describe('ChaptersService', () => {
  let service: ChapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
