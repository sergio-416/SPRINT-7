import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LoginData } from '../../interfaces/login-data';
import { form, FormField, required } from '@angular/forms/signals';
import { Auth } from '../../services/auth';
import { enhancedEmail } from '../../validators/custom-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldError } from '../../../../shared/components/field-error/field-error';

@Component({
  selector: 'app-login',
  imports: [FormField, FieldError],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #auth = inject(Auth);
  readonly loginModel = signal<LoginData>({ email: '', password: '' });
  readonly loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    enhancedEmail(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  });
  readonly authError = signal<string | null>(null);
  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      const credentials = this.loginModel();
      try {
        await this.#auth.signIn(credentials.email, credentials.password);
        this.authError.set(null);
        const returnUrl = this.#route.snapshot.queryParams['returnUrl'] || '/movies';
        this.#router.navigateByUrl(returnUrl);
      } catch (error) {
        this.authError.set('Invalid email or password');
      }
    }
  }
}

