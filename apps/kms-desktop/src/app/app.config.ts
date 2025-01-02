import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthStore, initializeAuth } from '@kms-frontend/auth/data-access';
import { provideHttpClient } from '@angular/common/http';
import { API_URL, STATIC_URL } from '@kms-frontend/core/data-access';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(appRoutes),
    { provide: API_URL, useValue: environment.api_url },
    { provide: STATIC_URL, useValue: environment.static_url },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthStore],
      multi: true,
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      },
    }),
  ],
};
