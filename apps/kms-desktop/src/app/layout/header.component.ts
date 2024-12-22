import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'kms-header',
  styleUrl: 'header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header__test">Kaban Management System</div>
  `,
})
export class HeaderComponent {}
