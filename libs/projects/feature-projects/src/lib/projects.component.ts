import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsStore } from '@kms-frontend/projects/data-access';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ProjectCardComponent } from '@kms-frontend/ui/project-card';

@Component({
  standalone: true,
  selector: 'kms-projects',
  styleUrl: 'projects.component.css',
  imports: [CommonModule, PanelModule, ButtonModule, RouterModule, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- @for(project of projectsStore.projects(); track project.slug) {
      <p-panel header="{{ project.name }}">
        <a [routerLink]="['/projects', project.slug]">{{ project.slug }}</a>
      </p-panel>
    } -->
    <ng-container *ngIf="projectsStore.projects() as projects">
      <kms-project-card 
        *ngFor="let project of projects"
        [project]="project!"
      ></kms-project-card>
    </ng-container>
  `,
})
export class ProjectsComponent implements OnInit {
  protected readonly projectsStore = inject(ProjectsStore);

  ngOnInit(): void {
    this.projectsStore.getProjects({});
  }
}
