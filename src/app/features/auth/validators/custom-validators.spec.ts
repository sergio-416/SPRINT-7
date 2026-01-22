import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { enhancedEmail, passwordsMatch } from './custom-validators';

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

  it('should accept valid emails with real provider domains', () => {
    testForm.email().value.set('user@gmail.com');
    expect(testForm.email().valid()).toBe(true);

    testForm.email().value.set('user@yahoo.com');
    expect(testForm.email().valid()).toBe(true);

    testForm.email().value.set('user@hotmail.com');
    expect(testForm.email().valid()).toBe(true);
  });

  it('should reject email with common Gmail typo (gmial)', () => {
    testForm.email().value.set('user@gmial.com');
    expect(testForm.email().valid()).toBe(false);
    expect(testForm.email().errors()[0].message).toContain('typo');
  });

  it('should reject email with consecutive dots', () => {
    testForm.email().value.set('user..test@example.com');
    expect(testForm.email().valid()).toBe(false);
    expect(testForm.email().errors()[0].message).toContain('consecutive dots');
  });

  it('should reject typos regardless of case', () => {
    testForm.email().value.set('user@GMIAL.com');
    expect(testForm.email().valid()).toBe(false);
    expect(testForm.email().errors()[0].message).toContain('typo');
  });

  it('rejects malformed email addresses', () => {
    testForm.email().value.set('notanemail ');
    expect(testForm.email().valid()).toBe(false);
    expect(testForm.email().errors()[0].message).toContain('valid email');
  });

});

describe('passwordsMatch validator', () => {
  let testForm: ReturnType<typeof form<{ password: string; confirmPassword: string }>>;

  beforeEach(() => {
    const model = signal({ password: '', confirmPassword: '' });
    testForm = TestBed.runInInjectionContext(() =>
      form(model, (schemaPath) => {
        passwordsMatch(schemaPath.password, schemaPath.confirmPassword, {
          message: 'Passwords must match'
        });
      })
    );
  });

  it('should reject when passwords do not match', () => {
    testForm.password().value.set('password123');
    testForm.confirmPassword().value.set('password456');
    expect(testForm.confirmPassword().valid()).toBe(false);
    expect(testForm.confirmPassword().errors()[0].message).toContain('match');
  });

  it('should accept when passwords match', () => {
    testForm.password().value.set('password123');
    testForm.confirmPassword().value.set('password123');
    expect(testForm.confirmPassword().valid()).toBe(true);
  });

});
