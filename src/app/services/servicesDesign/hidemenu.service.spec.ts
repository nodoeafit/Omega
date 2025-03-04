import { TestBed } from '@angular/core/testing';

import { hideMenuService } from './hidemenu.service';

describe('MenusideService', () => {
  let service: hideMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(hideMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
