import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withComputed,
} from '@ngrx/signals';
import { pipe, switchMap, tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import {
  CookieUserKeys,
  DefaultResponse,
  LoginRequestPayload,
  User,
  UserResponse,
} from '@kms-frontend/core/api-types';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthState),
  withComputed(({ user }) => ({
    isAuthenticated: computed(() => !!user()),
  })),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      router = inject(Router),
      cookieService = inject(CookieService)
    ) => ({
      getUser: rxMethod<{}>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => {
            return authService.user().pipe(
              tapResponse({
                next: (userResponse: UserResponse) => {
                  patchState(store, {
                    user: userResponse.user,
                    isLoading: false,
                  });
                  cookieService.set(CookieUserKeys.EMAIL, userResponse.user.email);
                  cookieService.set(CookieUserKeys.ID, userResponse.user.id);
                  cookieService.set(
                    CookieUserKeys.NAME,
                    userResponse.user.firstName + userResponse.user.lastName
                  );
                },
                error: (err) => {
                  patchState(store, { isLoading: false });
                  console.error(err);
                },
              })
            );
          })
        )
      ),
      login: rxMethod<LoginRequestPayload>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((credentials) => {
            return authService.login(credentials).pipe(
              tapResponse({
                next: (loginResponse: UserResponse) => {
                  patchState(store, {
                    user: loginResponse.user,
                    isLoading: false,
                  });
                  cookieService.set(CookieUserKeys.EMAIL, loginResponse.user.email);
                  cookieService.set(CookieUserKeys.ID, loginResponse.user.id);
                  cookieService.set(
                    CookieUserKeys.NAME,
                    loginResponse.user.firstName + loginResponse.user.lastName
                  );
                  router.navigateByUrl('projects');
                },
                error: (err) => {
                  patchState(store, { isLoading: false });
                  console.error(err);
                },
              })
            );
          })
        )
      ),
      logout: rxMethod<{}>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => {
            return authService.logout().pipe(
              tapResponse({
                next: (logoutResponse: DefaultResponse) => {
                  patchState(store, {
                    user: null,
                    isLoading: false,
                  });
                  cookieService.delete(CookieUserKeys.EMAIL);
                  cookieService.delete(CookieUserKeys.ID);
                  cookieService.delete(CookieUserKeys.NAME);
                  router.navigateByUrl('login');
                },
                error: (err) => {
                  patchState(store, {
                    user: null,
                    isLoading: false,
                  });
                  router.navigateByUrl('login');
                },
              })
            );
          })
        )
      ),
      initializeAuthState: () => {
        patchState(store, { isLoading: true });
        return authService.user().pipe(
          tapResponse({
            next: (userResponse: UserResponse) => {
              patchState(store, {
                user: userResponse.user,
                isLoading: false,
              });
            },
            error: (err) => {
              if ((err as HttpErrorResponse).status === 401) {
                patchState(store, {
                  user: null,
                  isLoading: false,
                });
              } else {
                console.error('Unexpected error:', err);
              }
            },
          })
        );
      },
    })
  )
);
