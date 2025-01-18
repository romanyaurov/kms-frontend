import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@kms-frontend/auth/data-access';
import { resetDirtyValidator } from '@kms-frontend/core/tools';
import { InputTextComponent } from '@kms-frontend/ui/input-text';
import { ButtonComponent } from '@kms-frontend/ui/button';

@Component({
  selector: 'kms-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    InputTextComponent,
    ButtonComponent,
  ],
  styleUrl: 'register.component.css',
  templateUrl: 'register.component.html',
})
export class RegisterComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(NonNullableFormBuilder);

  protected registerForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group(
    {
      firstName: ['', [Validators.required, resetDirtyValidator()]],
      lastName: ['', [Validators.required, resetDirtyValidator()]],
      email: ['', [Validators.required, Validators.email, resetDirtyValidator()]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), resetDirtyValidator()],
      ],
    },
  );

  protected submitForm() {
    if (this.registerForm.valid) {
      this.authStore.register(this.registerForm.getRawValue());
    }
  }
}
