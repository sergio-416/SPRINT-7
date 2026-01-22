import { TestBed } from '@angular/core/testing';
import { CanActivateFn, UrlTree } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { authGuard } from './auth-guard';
import { Auth } from '../services/auth';

describe('authGuard', () => {
  let mockAuthService: {
    currentUser: WritableSignal<any>;
    authInitialized: WritableSignal<boolean>;
  };
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  beforeEach(() => {
    mockAuthService = {
      currentUser: signal(null),
      authInitialized: signal(false),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: Auth, useValue: mockAuthService }],
    });
  });

  it('should allow access when user is authenticated', async () => {
    mockAuthService.currentUser.set({ email: 'test@example.com' } as any);
    mockAuthService.authInitialized.set(true);
    const result = await firstValueFrom(executeGuard({} as any, { url: '/movies' } as any) as any);
    expect(result).toBe(true);
  });

  it('should redirect to login when user is not authenticated', async () => {
    mockAuthService.currentUser.set(null);
    mockAuthService.authInitialized.set(true);
    const result = await firstValueFrom(executeGuard({} as any, { url: '/movies' } as any) as any);
    expect(result).not.toBe(true);
    expect(result).toBeInstanceOf(UrlTree);
  });

  it('should preserve returnUrl in query params when redirecting', async () => {
    mockAuthService.currentUser.set(null);
    mockAuthService.authInitialized.set(true);
    const result = (await firstValueFrom(
      executeGuard({} as any, { url: '/movies' } as any) as any
    )) as UrlTree;
    expect(result.toString()).toContain('/login');
    expect(result.queryParams['returnUrl']).toBe('/movies');
  });
});
