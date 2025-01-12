import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { CookieUserKeys } from '@kms-frontend/core/api-types';
import { Project } from '@kms-frontend/core/api-types';
import { AvatarComponent } from '@kms-frontend/ui/avatar';
import { AvatarGroupComponent } from '@kms-frontend/ui/avatar-group';

@Component({
  standalone: true,
  selector: 'kms-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AvatarComponent, AvatarGroupComponent],
  styleUrl: 'project-card.component.css',
  templateUrl: 'project-card.component.html'
})
export class ProjectCardComponent {
  private readonly cookieService = inject(CookieService);
  public readonly project = input.required<Project>();

  protected checkUser(userId: string): boolean {
    return userId === this.cookieService.get(CookieUserKeys.ID);
  }
}