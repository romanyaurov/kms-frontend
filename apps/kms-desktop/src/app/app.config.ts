import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthStore, initializeAuth } from '@kms-frontend/auth/data-access';
import { provideHttpClient } from '@angular/common/http';
import { API_URL, STATIC_URL } from '@kms-frontend/core/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(appRoutes),
    // provideAnimations(),
    { provide: API_URL, useValue: environment.api_url },
    { provide: STATIC_URL, useValue: environment.static_url },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthStore],
      multi: true,
    },
    provideAnimationsAsync(),
  ],
};
