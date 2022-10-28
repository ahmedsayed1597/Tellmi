import { TestBed } from '@angular/core/testing';

import { PathguardGuard } from './pathguard.guard';

describe('PathguardGuard', () => {
  let guard: PathguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PathguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
