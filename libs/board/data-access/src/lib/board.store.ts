import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { DefaultResponse, Issue, Project } from '@kms-frontend/core/api-types';
import { BoardService } from './services/board.service';
import { pipe, switchMap, tap } from 'rxjs';
import { positiveIssueMoving } from './utils/move-issue.util';

interface BoardState {
  data: (Project & { issues: Issue[] }) | null;
  dataBackup: (Project & { issues: Issue[] }) | null;
  isLoading: boolean;
  isUpdating: boolean;
}

const InitialBoardState: BoardState = {
  data: null,
  dataBackup: null,
  isLoading: false,
  isUpdating: false,
};

export const BoardStore = signalStore(
  { providedIn: 'root' },
  withState(InitialBoardState),
  withMethods((store, boardService = inject(BoardService)) => ({
    getBoardData: rxMethod<{ projectSlug: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ projectSlug }) => {
          return boardService.getBoardInfo(projectSlug).pipe(
            tapResponse({
              next: (boardDataResponse: {
                project: Project;
                issues: Issue[];
              }) => {
                patchState(store, {
                  data: {
                    ...boardDataResponse.project,
                    issues: boardDataResponse.issues,
                  },
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
    moveIssue: rxMethod<{ issueId: string; columnSlug: string; order: number }>(
      pipe(
        tap(({ issueId, columnSlug, order }) =>
          patchState(store, {
            isUpdating: true,
            dataBackup: store.data(),
            data: {
              ...store.data()!,
              issues: positiveIssueMoving(
                store.data()?.issues as Issue[],
                issueId,
                columnSlug,
                order
              ),
            },
          })
        ),
        switchMap(({ issueId, columnSlug, order }) => {
          return boardService.moveIssue(issueId, columnSlug, order).pipe(
            tapResponse({
              next: (moveIssueResponse: DefaultResponse) => {
                if (moveIssueResponse.error) {
                  patchState(store, {
                    isUpdating: false,
                    data: store.dataBackup(),
                    dataBackup: null,
                  });
                } else {
                  patchState(store, {
                    isUpdating: false,
                    dataBackup: null,
                  });
                }
              },
              error: (err) => {
                patchState(store, {
                  isUpdating: false,
                  data: store.dataBackup(),
                  dataBackup: null,
                });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  }))
);
