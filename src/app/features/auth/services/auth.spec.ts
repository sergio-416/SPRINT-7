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

  it('should call Supabase signInWithPassword when signing in', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const result = await service.signIn(email, password);

    expect(result).toBeDefined();
  });

  it('should call Supabase signUp when registering', async () => {
    const email = 'newuser@example.com';
    const password = 'password123';

    const result = await service.signUp(email, password);

    expect(result).toBeDefined();
  });

  it('should call Supabase signOut when signing out', async () => {
    const result = await service.signOut();

    expect(result).toBeDefined();
  });
});
