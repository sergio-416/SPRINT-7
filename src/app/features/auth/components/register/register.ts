import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RegisterData } from '../../interfaces/register-data';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { Auth } from '../../services/auth';
import { enhancedEmail, passwordsMatch } from '../../validators/custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  readonly #auth = inject(Auth);
  readonly #router = inject(Router);
  readonly registerModel = signal<RegisterData>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  readonly registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    enhancedEmail(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters' });
    required(schemaPath.confirmPassword, { message: 'Please confirm your password' });
    passwordsMatch(schemaPath.password, schemaPath.confirmPassword, { message: 'Passwords must match' });
  })
  readonly authError = signal<string | null>(null);
  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm().valid()) {
      const credentials = this.registerModel();
      try {
        await this.#auth.signUp(credentials.email, credentials.password);
        this.authError.set(null);
        this.#router.navigate(['/movies']);
      } catch (error) {
        this.authError.set('Registration failed');
      }
    }
  }
}
