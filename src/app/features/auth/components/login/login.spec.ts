import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { Auth } from '../../services/auth';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should render login form with email and password inputs', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    const emailInput = compiled.querySelector('input[type="email"]');
    const passwordInput = compiled.querySelector('input[type="password"]');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });


  it('should have signal-based login form with email and password fields', () => {
    expect(component.loginModel).toBeDefined();
    expect(component.loginForm).toBeDefined();

    expect(component.loginForm.email).toBeDefined();
    expect(component.loginForm.password).toBeDefined();
  });

  it('should display validation error when email is invalid and touched', () => {
    fixture.detectChanges();

    const emailInput = fixture.nativeElement.querySelector('input[type="email"]');
    emailInput.focus();
    emailInput.blur();

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Email is required');
  });


  it('should display auth error when sign in fails', async () => {
    fixture.detectChanges();
    const authService = TestBed.inject(Auth);
    vi.spyOn(authService, 'signIn').mockRejectedValue(new Error('Invalid credentials'));

    component.loginModel.set({ email: 'test@test.com', password: 'wrong' });

    await component.onSubmit(new Event('submit'));
    fixture.detectChanges();

    const authError = fixture.nativeElement.querySelector('.auth-error');
    expect(authError).toBeTruthy();
  });
});
