import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectsStore } from '@kms-frontend/projects/data-access';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  standalone: true,
  selector: 'kms-projects',
  styleUrl: 'projects.component.css',
  imports: [PanelModule, ButtonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for(project of projectsStore.projects(); track project.slug) {
      <p-panel header="{{ project.name }}">
        <a [routerLink]="['/projects', project.slug]">{{ project.slug }}</a>
      </p-panel>
    }
  `,
})
export class ProjectsComponent implements OnInit {
  protected readonly projectsStore = inject(ProjectsStore);

  ngOnInit(): void {
    this.projectsStore.getProjects({});
  }
}
