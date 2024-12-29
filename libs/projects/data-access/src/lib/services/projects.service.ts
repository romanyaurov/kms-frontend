import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@kms-frontend/core/data-access';
import { Observable } from 'rxjs';
import { Project } from '@kms-frontend/core/api-types';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly api_url = inject(API_URL);
  private readonly http = inject(HttpClient);

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.api_url}/projects`, {
      withCredentials: true,
    });
  }
}
