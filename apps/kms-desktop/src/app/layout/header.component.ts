import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { User } from '@kms-frontend/core/api-types';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AvatarUrl } from '@kms-frontend/core/tools';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ToolbarModule,
    AvatarModule,
    ButtonModule,
    RouterModule,
    AvatarUrl,
    CommonModule,
  ],
  selector: 'kms-header',
  styleUrl: 'header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-toolbar
      [style]="{ 'border-radius': '3rem', padding: '1rem 1rem 1rem 1.5rem' }"
    >
      <ng-template #start>
        <div class="toolbar-module">
          <div class="logo"></div>
          <p-button
            *ngIf="isAuthenticated()"
            label="Projects"
            text
            plain
          ></p-button>
          <p-button
            *ngIf="isAuthenticated()"
            label="Users"
            text
            plain
          ></p-button>
        </div>
      </ng-template>
      <ng-template *ngIf="isAuthenticated()" #end>
        <div class="toolbar-module">
          <p-button
            label="Logout"
            severity="contrast"
            size="small"
            (click)="onLogout()"
          ></p-button>
          <ng-container *ngIf="user() as userData">
            <p-avatar shape="circle" [image]="userData.avatar | avatarUrl"></p-avatar>
          </ng-container>
        </div>
      </ng-template>
    </p-toolbar>
  `,
})
export class HeaderComponent {
  readonly user = input.required<User | null>();
  readonly isAuthenticated = input.required<boolean>();

  readonly handleLogout = output<void>();

  protected onLogout() {
    this.handleLogout.emit();
  }
}
