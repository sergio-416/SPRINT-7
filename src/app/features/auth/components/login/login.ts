import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LoginData } from '../../interfaces/login-data';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Auth } from '../../services/auth';

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
    email(schemaPath.email, { message: 'Invalid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  });
  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      const credentials = this.loginModel();
      await this.#auth.signIn(credentials.email, credentials.password);
    }
  }
}
