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
      import('@kms-frontend/feature-login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => 
      import('@kms-frontend/feature-register').then((m) => m.RegisterComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('@kms-frontend/feature-projects').then((m) => m.ProjectsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:projectSlug',
    loadComponent: () =>
      import('@kms-frontend/feature-board').then((m) => m.BoardComponent),
    canActivate: [AuthGuard],
  },
];
