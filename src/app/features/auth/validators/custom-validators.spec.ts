import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { enhancedEmail } from './custom-validators';
describe('enhancedEmail validator', () => {
  let testForm: ReturnType<typeof form<{ email: string }>>;
  beforeEach(() => {
    const model = signal({ email: '' });
    testForm = TestBed.runInInjectionContext(() =>
      form(model, (schemaPath) => {
        enhancedEmail(schemaPath.email, {
          message: 'Please enter a valid email address',
        });
      })
    );
  });
  it('should accept standard email format', () => {
    testForm.email().value.set('user@example.com');
    expect(testForm.email().valid()).toBe(true);
  });
});
