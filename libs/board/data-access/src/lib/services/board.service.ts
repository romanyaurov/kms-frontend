import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { API_URL } from '@kms-frontend/core/data-access';
import { Project, Issue, DefaultResponse } from '@kms-frontend/core/api-types';

@Injectable({ providedIn: 'root' })
export class BoardService {
  private readonly api_url = inject(API_URL);
  private readonly http = inject(HttpClient);

  private getProject(projectSlug: string): Observable<Project> {
    return this.http.get<Project>(`${this.api_url}/projects/${projectSlug}`, {
      withCredentials: true,
    });
  }

  private getIssues(projectSlug: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.api_url}/issues/${projectSlug}`, {
      withCredentials: true,
    });
  }

  public getBoardInfo(
    projectSlug: string
  ): Observable<{ project: Project; issues: Issue[] }> {
    return forkJoin({
      project: this.getProject(projectSlug),
      issues: this.getIssues(projectSlug),
    });
  }

  public moveIssue(
    issueId: string,
    columnSlug: string,
    order: number
  ): Observable<DefaultResponse> {
    return this.http.put<DefaultResponse>(
      `${this.api_url}/issues/${issueId}`,
      {
        targetColumn: columnSlug,
        targetOrder: order,
      },
      {
        withCredentials: true,
      }
    );
  }
}
