import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'kms-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrl: 'avatar.component.css',
  template: `
    <div
      class="avatar-component"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.font-size.px]="fz()"
      [style.border-radius]="shape() === 'circle' ? '50%' : radius() + 'px'"
      [ngStyle]="image() ? {'background-image': 'url(' + image() + ')'} : null"
      [class.bordered]="bordered()"
      [class.inner-shadow]="innerShadow()"
    >
      <ng-container *ngIf="!image() && label()">
        {{ label() }}
      </ng-container>
    </div>
  `,
})
export class AvatarComponent {
  readonly shape = input<'circle' | 'square'>('circle');
  readonly image = input<string>();
  readonly label = input<string>('A');
  readonly fz = input<number>(36);
  readonly size = input<number>(46);
  readonly radius = input<number>(7);
  readonly bordered = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  readonly innerShadow = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
}
