import { computed, effect, inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStore } from '@kms-frontend/auth/data-access';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  canActivate(): boolean {
    const { isAuthenticated } = this.authStore;
    if (!isAuthenticated()) {
      this.router.navigateByUrl('login');
    }
    return isAuthenticated();
  }
}
