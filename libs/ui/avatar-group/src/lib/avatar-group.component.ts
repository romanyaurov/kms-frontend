import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '@kms-frontend/ui/avatar';
import { AvatarUrl } from '@kms-frontend/core/tools';

@Component({
  standalone: true,
  selector: 'kms-avatar-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AvatarComponent, AvatarUrl],
  styleUrl: 'avatar-group.component.css',
  template: `
    <ng-container *ngIf="avatars() as avatars">
      <ng-container
        *ngFor="let avatar of avatars.slice(0, count()); let i = index"
      >
        <kms-avatar
          [image]="avatar | avatarUrl"
          [size]="32"
          bordered
        ></kms-avatar>
      </ng-container>
      <ng-container *ngIf="avatars.length > count()">
        <kms-avatar
          [label]="getLeastCount()"
          [size]="32"
          [fz]="18"
          bordered
          innerShadow
        ></kms-avatar>
      </ng-container>
    </ng-container>
  `,
})
export class AvatarGroupComponent {
  readonly count = input<number>(3);
  readonly avatars = input.required<string[]>();

  protected getLeastCount(): string {
    return `${this.avatars().length - this.count()}+`;
  }
}
