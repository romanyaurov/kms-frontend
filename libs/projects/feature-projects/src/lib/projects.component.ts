import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsStore } from '@kms-frontend/projects/data-access';
import { ProjectCardComponent } from '@kms-frontend/ui/project-card';

@Component({
  standalone: true,
  selector: 'kms-projects',
  styleUrl: 'projects.component.css',
  imports: [CommonModule, RouterModule, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="projectsStore.projects() as projects">
      <kms-project-card 
        *ngFor="let project of projects"
        [project]="project!"
      ></kms-project-card>
      <div class="new-project" (click)="createNewProject()">
        <i class="fa fa-plus-square-o" aria-hidden="true"></i>
        <span>Create New Project</span>
      </div>
    </ng-container>
  `,
})
export class ProjectsComponent implements OnInit {
  protected readonly projectsStore = inject(ProjectsStore);

  ngOnInit(): void {
    this.projectsStore.getProjects({});
  }

  protected createNewProject() {
    alert('new project modal window');
  }
}
