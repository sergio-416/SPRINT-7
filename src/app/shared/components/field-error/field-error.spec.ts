import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldError } from './field-error';

describe('FieldError', () => {
  let fixture: ComponentFixture<FieldError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldError],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldError);
  });

  it('should display error message when field is touched and invalid', () => {
    const mockField = {
      touched: () => true,
      invalid: () => true,
      errors: () => [{ message: 'This field is required' }],
    };

    fixture.componentRef.setInput('field', mockField);
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('This field is required');
  });

  it('should not display error when field is untouched', () => {
    const mockField = {
      touched: () => false,
      invalid: () => true,
      errors: () => [{ message: 'This field is required' }],
    };

    fixture.componentRef.setInput('field', mockField);
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement).toBeFalsy();
  });

  it('should not display error when field is valid', () => {
    const mockField = {
      touched: () => true,
      invalid: () => false,
      errors: () => [],
    };

    fixture.componentRef.setInput('field', mockField);
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement).toBeFalsy();
  });

  it('should have role="alert" for accessibility', () => {
    const mockField = {
      touched: () => true,
      invalid: () => true,
      errors: () => [{ message: 'Invalid input' }],
    };

    fixture.componentRef.setInput('field', mockField);
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.getAttribute('role')).toBe('alert');
  });
});
