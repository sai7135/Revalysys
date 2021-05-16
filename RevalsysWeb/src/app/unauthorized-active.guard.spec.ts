import { TestBed } from '@angular/core/testing';

import { UnauthorizedActiveGuard } from './unauthorized-active.guard';

describe('UnauthorizedActiveGuard', () => {
  let guard: UnauthorizedActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnauthorizedActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
