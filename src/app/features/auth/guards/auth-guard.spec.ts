import { TestBed } from '@angular/core/testing';
import { CanActivateFn, UrlTree } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';

import { authGuard } from './auth-guard';
import { Auth } from '../services/auth';

describe('authGuard', () => {
  let mockAuthService: { currentUser: WritableSignal<any> };

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockAuthService = {
      currentUser: signal(null),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Auth, useValue: mockAuthService }],
    });
  });

  it('should allow access when user is authenticated', () => {
    mockAuthService.currentUser.set({ email: 'test@example.com' } as any);

    const result = executeGuard({} as any, { url: '/movies' } as any);

    expect(result).toBe(true);
  });

  it('should redirect to login when user is not authenticated', () => {
    mockAuthService.currentUser.set(null);

    const result = executeGuard({} as any, { url: '/movies' } as any);

    expect(result).not.toBe(true);
    expect(result).toBeInstanceOf(UrlTree);
  });

  it('should preserve returnUrl in query params when redirecting', () => {
    mockAuthService.currentUser.set(null);

    const result = executeGuard({} as any, { url: '/movies' } as any) as UrlTree;

    expect(result.toString()).toContain('/login');
    expect(result.queryParams['returnUrl']).toBe('/movies');
  });
});
