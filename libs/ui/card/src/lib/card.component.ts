import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { AssignedTo, Issue, Task } from '@kms-frontend/core/api-types';
import { AvatarGroupComponent } from '@kms-frontend/ui/avatar-group';
import { ProgressBarComponent } from '@kms-frontend/ui/progress-bar';
import { TimeAgoComponent } from '@kms-frontend/ui/time-ago';

@Component({
  standalone: true,
  selector: 'kms-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CdkDragHandle,
    AvatarGroupComponent,
    ProgressBarComponent,
    TimeAgoComponent,
  ],
  styleUrl: 'card.component.css',
  template: `
    <ng-container *ngIf="issue() as issue">
      <div class="grab-zone" cdkDragHandle>
        <div class="gl" *ngFor="let _ of [].constructor(3)">
          <div class="gd" *ngFor="let _ of [].constructor(3)"></div>
        </div>
      </div>
      <div class="card-title" (click)="handleGetDetails(issue.id)">{{ issue.title }}</div>
      <ng-container *ngIf="issue.tasks">
        <kms-progress-bar
          [percents]="getProgress(issue.tasks)"
        ></kms-progress-bar>
      </ng-container>
      <div class="card-description">{{ issue.description }}</div>
      <div class="card-footer">
        <ng-container *ngIf="issue.assignedTo">
          <kms-avatar-group
            [avatars]="getAvatarsArray(issue.assignedTo)"
          ></kms-avatar-group>
        </ng-container>
        <kms-time-ago [updatedAt]="issue.updatedAt"></kms-time-ago>
      </div>
    </ng-container>
  `,
})
export class CardComponent {
  readonly issue = input.required<Issue>();
  readonly getDetails = output<string>();

  protected getProgress(tasks: Task[]): number {
    if (!tasks || tasks.length === 0) {
      return 0;
    }
    const completedTasks = tasks.filter((item) => item.isCompleted).length;
    return (completedTasks / tasks.length) * 100;
  }

  protected getAvatarsArray(users: AssignedTo[]): string[] {
    if (!users || users.length === 0) {
      return [];
    }
    return users.map((user) => user.avatar);
  }

  protected handleGetDetails(issueId: string) {
    this.getDetails.emit(issueId);
  }
}