import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
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
  withComputed(({ data }) => ({
    issues: computed(() => data()!.issues),
  })),
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
    toggleTaskStatus: rxMethod<{ taskId: string }>(
      pipe(
        tap(({ taskId }) =>
          patchState(store, {
            isUpdating: true,
            dataBackup: store.data(),
            data: {
              ...store.data()!,
              issues: (store.data()?.issues as Issue[]).map((issue) => {
                if (!issue.tasks?.find((task) => task.id === taskId)) {
                  return issue;
                } else {
                  return {
                    ...issue,
                    tasks: issue.tasks?.map((task) => {
                      if (task.id === taskId) {
                        return {
                          ...task,
                          isCompleted: !task.isCompleted,
                        };
                      } else {
                        return task;
                      }
                    }),
                    updatedAt: new Date().toISOString(),
                  };
                }
              }),
            },
          })
        ),
        switchMap(({ taskId }) => {
          return boardService.toggleTask(taskId).pipe(
            tapResponse({
              next: (toggleTaskResponse: DefaultResponse) => {
                if (toggleTaskResponse.error) {
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
