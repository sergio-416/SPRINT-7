import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RegisterData } from '../../interfaces/register-data';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  registerModel = signal<RegisterData>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters' });
    required(schemaPath.confirmPassword, { message: 'Please confirm your password' });
  })

  readonly #auth = inject(Auth);
  authError = signal<string | null>(null);
  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm().valid()) {
      const credentials = this.registerModel();
      try {
        await this.#auth.signUp(credentials.email, credentials.password);
        this.authError.set(null);
      } catch (error) {
        this.authError.set('Registration failed');
      }
    }
  }
}
