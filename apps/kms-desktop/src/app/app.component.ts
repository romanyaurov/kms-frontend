import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header.component';

@Component({
  standalone: true,
  selector: 'kms-root',
  imports: [RouterModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <kms-header></kms-header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
