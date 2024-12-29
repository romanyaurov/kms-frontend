import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { AuthStore } from '@kms-frontend/auth/data-access';

@Component({
  standalone: true,
  selector: 'kms-root',
  imports: [RouterModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <kms-header
      [isAuthenticated]="authStore.isAuthenticated()"
      [user]="authStore.user()"
      (handleLogout)="authStore.logout({})"
    ></kms-header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  protected readonly authStore = inject(AuthStore);
}
