import { TestBed } from '@angular/core/testing';

import { AdminGroupServiceService } from './admin-group-service.service';

describe('AdminGroupServiceService', () => {
  let service: AdminGroupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGroupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
