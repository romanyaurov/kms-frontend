import { Route } from '@angular/router';
import { AuthGuard } from '@kms-frontend/auth/data-access';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@kms-frontend/auth/feature-login').then((m) => m.LoginComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('@kms-frontend/feature-projects').then((m) => m.ProjectsComponent),
    canActivate: [AuthGuard],
  },
];
