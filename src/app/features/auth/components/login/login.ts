import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LoginData } from '../../interfaces/login-data';
import { form, FormField, required } from '@angular/forms/signals';
import { Auth } from '../../services/auth';
import { enhancedEmail } from '../../validators/custom-validators';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  readonly #auth = inject(Auth);
  loginModel = signal<LoginData>({ email: '', password: '' });
  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    enhancedEmail(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  });
  authError = signal<string | null>(null);
  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      const credentials = this.loginModel();
      try {
        await this.#auth.signIn(credentials.email, credentials.password);
        this.authError.set(null);
      } catch (error) { this.authError.set('Invalid email or password'); }
    }
  }
}

