import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  imports: [],
  templateUrl: './field-error.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldError {
  readonly field = input.required<any>();
}
