import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'kms-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  styleUrl: 'button.component.css',
  template: `
    <ng-container *ngIf="link() as link; else button">
      <a
        class="button-component"
        [routerLink]="link"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        [ngClass]="plain() ? 'plain' : 'default'"
        [class.w-100]="fullWidth()"
        [class.disabled]="disabled()"
      >
        {{ label() }}
      </a>
    </ng-container>

    <ng-template #button>
      <button
        class="button-component"
        (click)="handleClick()"
        [ngClass]="plain() ? 'plain' : 'default'"
        [class.w-100]="fullWidth()"
        [class.disabled]="disabled()"
        [disabled]="disabled()"
      >
        {{ label() }}
      </button>
    </ng-template>
  `,
})
export class ButtonComponent {
  readonly link = input<string>();
  readonly label = input<string>();
  readonly plain = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  readonly fullWidth = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  readonly disabled = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  readonly onClick = output<void>();

  protected handleClick() {
    this.onClick.emit();
  }
}
