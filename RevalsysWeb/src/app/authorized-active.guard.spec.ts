import { TestBed } from '@angular/core/testing';

import { AuthorizedActiveGuard } from './authorized-active.guard';

describe('AuthorizedActiveGuard', () => {
  let guard: AuthorizedActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizedActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
