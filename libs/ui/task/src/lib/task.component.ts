import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '@kms-frontend/core/api-types';

@Component({
  standalone: true,
  selector: 'kms-task',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  providers: [],
  styleUrl: 'task.component.css',
  template: `
    <div
      class="task-component"
      *ngIf="task() as taskData"
    >
      <input
        [id]="taskData.id"
        type="checkbox"
        [checked]="taskData.isCompleted"
        (click)="onCheckboxClick($event, taskData.id)"
      />
      <label [for]="taskData.id">
        <svg viewBox="0 0 50 50">
          <path d="M5 25 L 19 40 L 45 9"></path>
        </svg>
      </label>
      <span
        class="task-description"
        [class.line-through]="taskData.isCompleted"
        (click)="onSpanClick(taskData.id)"
      >
        {{ taskData.text }}
      </span>
    </div>
  `,
})
export class TaskComponent {
  public readonly task = input.required<Task>();
  public readonly onToggle = output<string>();

  protected onCheckboxClick(event: Event, taskId: string) {
    event.stopPropagation();
    this.onToggle.emit(taskId);
  }
  
  protected onSpanClick(taskId: string) {
    this.onToggle.emit(taskId);
  }
}
