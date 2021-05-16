import { TestBed } from '@angular/core/testing';

import { AdminPortalGuardGuard } from './admin-portal-guard.guard';

describe('AdminPortalGuardGuard', () => {
  let guard: AdminPortalGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminPortalGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
