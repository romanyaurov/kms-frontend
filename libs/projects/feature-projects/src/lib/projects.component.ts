import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectsStore } from '@kms-frontend/projects/data-access';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  standalone: true,
  selector: 'kms-projects',
  styleUrl: 'projects.component.css',
  imports: [PanelModule, ButtonModule],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for(project of projectsStore.projects(); track project.slug) {
      <p-panel header="{{ project.name }}">
        <p>{{ project.slug }}</p>
      </p-panel>
    }
  `,
})
export class ProjectsComponent {
  protected readonly projectsStore = inject(ProjectsStore);

  constructor() {
    this.projectsStore.getProjects({});
  }
}
