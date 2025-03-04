import { TestBed } from '@angular/core/testing';

import { SidecontentService } from './sidecontent.service';

describe('SidecontentService', () => {
  let service: SidecontentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidecontentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
