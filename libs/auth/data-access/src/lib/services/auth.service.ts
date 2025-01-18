import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '@kms-frontend/core/data-access';
import {
  UserResponse,
  LoginRequestPayload,
  DefaultResponse,
  RegisterRequestPayload,
} from '@kms-frontend/core/api-types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api_url = inject(API_URL);
  private readonly http = inject(HttpClient);

  public login(credentials: LoginRequestPayload): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.api_url}/login`, credentials, {
      withCredentials: true,
    });
  }

  public register(credentials: RegisterRequestPayload): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.api_url}/signup`, credentials, {
      withCredentials: true,
    })
  }

  public user(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.api_url}/user`, {
      withCredentials: true,
    });
  }

  public logout(): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(
      `${this.api_url}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
