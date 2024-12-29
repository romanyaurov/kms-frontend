import { ChangeDetectionStrategy, Component, inject, input, output, Signal } from '@angular/core';
import { User } from '@kms-frontend/core/api-types';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [ToolbarModule, AvatarModule, ButtonModule],
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
          <p-button label="Projects" text plain [disabled]="!isAuthenticated()"></p-button>
          <p-button label="Users" text plain [disabled]="!isAuthenticated()"></p-button>
        </div>
      </ng-template>
      @if (isAuthenticated() && !!user()) {
      <ng-template #end>
        <div class="toolbar-module">
          <p-button label="Logout" severity="contrast" size="small" (click)="onLogout()"></p-button>
          <p-avatar
            label="A"
            shape="circle"
          ></p-avatar>
        </div>
      </ng-template>
      }
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
