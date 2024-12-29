import { Project } from '@kms-frontend/core/api-types';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ProjectsService } from './services/projects.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
}

const initialProjectsState: ProjectsState = {
  projects: [],
  isLoading: false,
};

export const ProjectsStore = signalStore(
  { providedIn: 'root' },
  withState(initialProjectsState),
  withMethods((store, projectsService = inject(ProjectsService)) => ({
    getProjects: rxMethod<{}>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return projectsService.getProjects().pipe(
            tapResponse({
              next: (projectsResponse: Project[]) => {
                patchState(store, {
                  projects: projectsResponse,
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
