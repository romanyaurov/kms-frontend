import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueDetailsStore } from '@kms-frontend/issue-detail/data-access';
import { IssueDetailsService } from './services/issue-details.service';
import { TaskComponent } from '@kms-frontend/ui/task';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'kms-issue-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TaskComponent],
  providers: [],
  styleUrl: 'issue-details.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div
      class="sidebar-content"
      *ngIf="!issueDetailsStore.isLoading(); else skeleton"
      @fadeInOut
    >
      <ng-container *ngIf="issueDetailsStore.issueData() as issueData">
        <div class="issue-title">
          <span>{{ issueData.title }}</span>
        </div>
        <div class="issue-description">
          <span>{{ issueData.description }}</span>
        </div>
        <div class="issue-tasks" *ngIf="issueData.tasks">
          <kms-task
            *ngFor="let task of issueData.tasks"
            [task]="task"
            (onToggle)="toggleTask($event)"
          ></kms-task>
        </div>
        <div class="issue-assigned-to" *ngIf="issueData.assignedTo"></div>
        <div class="issue-created-at"></div>
        <div class="issue-updated-at"></div>
        <div class="issue-deadline" *ngIf="issueData.deadline"></div>
      </ng-container>
    </div>

    <ng-template #skeleton>
      <div class="sidebar-content">
        <div class="skeleton issue-title"></div>
        <div class="skeleton issue-description"></div>
        <div class="skeleton issue-tasks"></div>
        <div class="skeleton issue-assigned-to"></div>
        <div class="skeleton issue-created-at"></div>
        <div class="skeleton issue-updated-at"></div>
        <div class="skeleton issue-deadline"></div>
      </div>
    </ng-template>
  `,
})
export class IssueDetailsComponent implements OnInit {
  private readonly elementRef = inject(ElementRef);
  protected readonly issueDetailsStore = inject(IssueDetailsStore);
  private readonly issueDetailsService = inject(IssueDetailsService);

  readonly onHide = output();

  ngOnInit(): void {
    this.issueDetailsStore.getIssueDetails({
      issueId: this.issueDetailsService.issueId,
    });
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (
      !this.elementRef.nativeElement.contains(target) ||
      target === this.elementRef.nativeElement
    ) {
      this.onHide.emit();
    }
  }

  toggleTask(event: string) {
    console.log(event);
  }
}
