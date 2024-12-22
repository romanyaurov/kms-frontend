import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('@kms-frontend/feature-projects').then((m) => m.ProjectsComponent),
  },
];
