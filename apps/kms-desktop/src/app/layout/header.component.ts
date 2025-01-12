import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { User } from '@kms-frontend/core/api-types';
import { AvatarUrl } from '@kms-frontend/core/tools';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '@kms-frontend/ui/avatar';
import { ButtonComponent } from '@kms-frontend/ui/button';

@Component({
  standalone: true,
  imports: [
    AvatarUrl,
    CommonModule,
    AvatarComponent,
    ButtonComponent
  ],
  selector: 'kms-header',
  styleUrl: 'header.component.css',
  templateUrl: 'header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly user = input.required<User | null>();
  readonly isAuthenticated = input.required<boolean>();

  readonly handleLogout = output<void>();

  protected onLogout() {
    this.handleLogout.emit();
  }
}
