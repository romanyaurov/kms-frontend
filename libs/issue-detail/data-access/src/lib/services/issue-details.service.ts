import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@kms-frontend/core/data-access';
import { Issue } from '@kms-frontend/core/api-types';

@Injectable({ providedIn: 'root' })
export class IssueDetailsService {
  private readonly api_url = inject(API_URL);
  private readonly http = inject(HttpClient);

  public getIssueDetails(issueId: string): Observable<Issue> {
    return this.http.get<Issue>(
      `${this.api_url}/issues/details/${issueId}`,
      {
        withCredentials: true,
      }
    );
  }
}
