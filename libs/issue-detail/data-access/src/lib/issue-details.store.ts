import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Issue } from '@kms-frontend/core/api-types';
import { IssueDetailsService } from './services/issue-details.service';
import { pipe, switchMap, tap } from 'rxjs';

interface IssueDetailsState {
  issueData: Issue | null;
  isLoading: boolean;
}

const InitialIssueDetailsState: IssueDetailsState = {
  issueData: null,
  isLoading: false,
};

export const IssueDetailsStore = signalStore(
  { providedIn: 'root' },
  withState(InitialIssueDetailsState),
  withMethods((store, issueDetailsService = inject(IssueDetailsService)) => ({
    getIssueDetails: rxMethod<{ issueId: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ issueId }) => {
          return issueDetailsService.getIssueDetails(issueId).pipe(
            tapResponse({
              next: (issueDetailsResponse: Issue) => {
                patchState(store, {
                  issueData: issueDetailsResponse,
                  isLoading: false,
                });
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
  }))
);
