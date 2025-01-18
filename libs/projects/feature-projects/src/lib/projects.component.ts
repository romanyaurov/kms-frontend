import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsStore } from '@kms-frontend/projects/data-access';
import { ProjectCardComponent } from '@kms-frontend/ui/project-card';
import { ModalService, ModalComponent } from '@kms-frontend/ui/modal';
import { ProjectFormComponent } from '@kms-frontend/ui/form';
import { CreateProjectRequest } from '@kms-frontend/core/api-types';

@Component({
  standalone: true,
  selector: 'kms-projects',
  styleUrl: 'projects.component.css',
  imports: [CommonModule, RouterModule, ProjectCardComponent, ModalComponent, ProjectFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="projectsStore.projects() as projects; else skeleton">
      <kms-project-card 
        *ngFor="let project of projects"
        [project]="project!"
      ></kms-project-card>
      <div class="new-project" (click)="modalService.setVisible()">
        <i class="fa fa-plus-square-o" aria-hidden="true"></i>
        <span>Create New Project</span>
      </div>
    </ng-container>

    <ng-template #skeleton>
      skeleton
    </ng-template>

    <kms-modal 
      *ngIf="modalService.isVisible()"
      (onHide)="modalService.setInvisible()"
    >
      <div class="modal-content">
        <kms-project-form
          formTitle="Create new Project"
          [checkEmail]="projectsStore.checkEmail"
          (onFormSubmit)="createProject($event)"
        ></kms-project-form>
      </div>
    </kms-modal>
  `,
})
export class ProjectsComponent implements OnInit {
  protected readonly projectsStore = inject(ProjectsStore);
  protected readonly modalService = inject(ModalService);

  ngOnInit(): void {
    this.projectsStore.getProjects({});
  }

  protected createProject(payload: CreateProjectRequest) {
    this.projectsStore.createProject({ payload });
    this.modalService.setInvisible();
  }
}
