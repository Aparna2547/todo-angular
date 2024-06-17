import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userprotectGuard } from './userprotect.guard';

describe('userprotectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userprotectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
