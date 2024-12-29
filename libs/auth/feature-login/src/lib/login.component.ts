import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthStore } from '@kms-frontend/auth/data-access';

@Component({
  selector: 'kms-login-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label>
        <input formControlName="email" />
      </label>
      <label>
        <input formControlName="password" />
      </label>
      <button type="submit">Enter</button>
    </form>
  `,
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(NonNullableFormBuilder);

  protected loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: [''],
    password: [''],
  });

  protected onSubmit() {
    this.authStore.login(this.loginForm.getRawValue());
  }
}
