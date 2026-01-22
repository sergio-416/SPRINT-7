import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should expose current user as a signal initialized to null', () => {
    expect(service.currentUser).toBeDefined();
    expect(service.currentUser()).toBeNull();
  });

  it('should attempt sign in with email and password', async () => {
    const email = 'nonexistent@example.com';
    const password = 'password123';

    await expect(service.signIn(email, password)).rejects.toThrow('auth/invalid-credential');
  });

  it('should sign up with email and password', async () => {
    const email = `user${Date.now()}@example.com`;
    const password = 'password123';

    const result = await service.signUp(email, password);

    expect(result).toBeDefined();
    expect(result.user).toBeDefined();
  });

  it('should sign out successfully', async () => {
    await expect(service.signOut()).resolves.toBeUndefined();
  });
});
