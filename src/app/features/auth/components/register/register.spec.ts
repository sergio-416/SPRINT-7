import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideRouter([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should render registration form with email, password, and confirm password inputs', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    const emailInput = compiled.querySelector('input[type="email"]');
    const passwordInput = compiled.querySelector('input[type="password"]');
    const confirmPasswordInput = compiled.querySelectorAll('input[type="password"]')[1];

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
  });

});
