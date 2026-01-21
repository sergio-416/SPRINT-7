import { validate } from '@angular/forms/signals';

export function enhancedEmail<T>(path: any, options: { message: string }): void {
  validate(path, ({ value }) => {
    const emailValue = value() as string;
    if (!emailValue) {
      return null;
    }
    const email = emailValue.trim().toLowerCase();
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i;

    if (!emailRegex.test(email)) {
      return { kind: 'invalidEmail', message: options.message };
    }
    const commonTypos = [
      'gmial.com',
      'gmai.com',
      'gmil.com',
      'yahooo.com',
      'yaho.com',
      'hotmial.com',
      'outlok.com',
    ];

    const domain = email.split('@')[1];
    if (commonTypos.includes(domain)) {
      return {
        kind: 'enhancedEmail',
        message: 'Email domain appears to have a typo. Please verify.',
      };
    }

    if (email.includes('..')) {
      return {
        kind: 'enhancedEmail',
        message: 'Email format is invalid (consecutive dots detected).',
      };
    }

    return null;
  });
}

export function passwordsMatch(passwordPath: any, confirmPasswordPath: any, options: { message: string }): void {
  validate(confirmPasswordPath, ({ value, valueOf }) => {
    const confirmPasswordValue = value();
    if (!confirmPasswordValue) {
      return null;
    }
    const passwordValue = valueOf(passwordPath);
    if (confirmPasswordValue !== passwordValue) {
      return { kind: 'passwordsMatch', message: options.message };
    }

    return null;
  });
}
