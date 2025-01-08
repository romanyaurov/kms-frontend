import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'kms-input-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  styleUrl: 'input-text.component.css',
  template: `
    <label [for]="label()">{{ label() }}</label>
    <i [class]="icon()" aria-hidden="true"></i>
    <input
      [id]="label()"
      [type]="password() ? 'password' : 'text'"
      [formControl]="control()"
    />
    <div class="validation-error">Invalid field value</div>
  `,
})
export class InputTextComponent {
  readonly label = input.required<string>();
  readonly control = input.required<FormControl>();
  readonly icon = input.required<string>();
  readonly password = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
}
