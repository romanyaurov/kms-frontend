import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function resetDirtyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === '') {
      control.markAsPristine();
    }
    return null;
  }
}