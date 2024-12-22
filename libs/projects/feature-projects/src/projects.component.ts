import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: 'kms-projects',
  styleUrl: 'projects.component.css',
  imports: [],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Projects Lib Works!</div>
  `,
})
export class ProjectsComponent {}