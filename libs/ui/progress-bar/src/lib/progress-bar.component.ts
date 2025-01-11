import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '@kms-frontend/core/api-types';

@Component({
  standalone: true,
  selector: 'kms-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrl: 'progress-bar.component.css',
  template: `
    <ng-container *ngIf="!empty(); else skeleton">
      <div class="progress-bar" *ngIf="tasks() as tasksData">
        <div
        class="progress-line"
        [style.width.%]="getPercents(tasksData)"
        ></div>
      </div>
    </ng-container>

    <ng-template #skeleton>
      <div class="progress-bar">
        <div
        class="progress-line"
        [style.width.%]="0"
        ></div>
      </div>
    </ng-template>
  `,
})
export class ProgressBarComponent {
  readonly tasks = input<Task[]>();
  readonly empty = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  protected getPercents(tasks: Task[]): number {
    if (!tasks || tasks.length === 0) {
      return 0;
    }
    const completedTasks = tasks.filter((item) => item.isCompleted).length;
    return (completedTasks / tasks.length) * 100;
  }
}
