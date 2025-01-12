import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { AuthStore } from '@kms-frontend/auth/data-access';

@Component({
  standalone: true,
  selector: 'kms-root',
  imports: [RouterModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: 'app.component.css',
  template: `
    <kms-header
      [isAuthenticated]="authStore.isAuthenticated()"
      [user]="authStore.user()"
      (handleLogout)="authStore.logout({})"
    ></kms-header>
    <div class="main-app-container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  protected readonly authStore = inject(AuthStore);
}
