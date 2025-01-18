import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '@kms-frontend/auth/data-access';
import { InputTextComponent } from '@kms-frontend/ui/input-text';
import { resetDirtyValidator } from '@kms-frontend/core/tools';
import { ButtonComponent } from '@kms-frontend/ui/button';

@Component({
  selector: 'kms-login-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    InputTextComponent,
    CommonModule,
    ButtonComponent,
    RouterModule
  ],
  styleUrl: 'login.component.css',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(NonNullableFormBuilder);

  protected loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required, Validators.email, resetDirtyValidator()]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), resetDirtyValidator()],
    ],
  });

  protected submitForm() {
    if (this.loginForm.valid) {
      this.authStore.login(this.loginForm.getRawValue());
    }
  }
}
