import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideRouter, Router } from '@angular/router';
import { Auth } from '../../../features/auth/services/auth';
import { signal } from '@angular/core';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  const mockAuthService = {
    currentUser: signal<{ email: string } | null>(null),
    signOut: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([
          { path: 'login', component: class { } },
          { path: 'movies', component: class { } }
        ]),
        { provide: Auth, useValue: mockAuthService }
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should display logout button with user email when logged in', () => {
    mockAuthService.currentUser.set({ email: 'test@example.com' });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Welcome, test@example.com');
    expect(compiled.textContent).toContain('Sign Out');
  });

  it('should display login and register links when not logged in', () => {
    mockAuthService.currentUser.set(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Login');
    expect(compiled.textContent).toContain('Register');
  });

  it('should call signOut when sign out button is clicked', async () => {
    mockAuthService.currentUser.set({ email: 'test@example.com' });
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    await fixture.whenStable();

    expect(mockAuthService.signOut).toHaveBeenCalled();
  });

});
