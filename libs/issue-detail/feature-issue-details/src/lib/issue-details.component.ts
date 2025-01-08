import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueDetailsStore } from '@kms-frontend/issue-detail/data-access';
import { IssueDetailsService } from './services/issue-details.service';

@Component({
  standalone: true,
  selector: 'kms-issue-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  providers: [],
  styleUrl: 'issue-details.component.css',
  template: `
    <div class="sidebar-content" *ngIf="!issueDetailsStore.isLoading(); else skeleton">
      <ng-container *ngIf="issueDetailsStore.issueData() as issueData">
        <div class="issue-title">
          <span>{{ issueData.title }}</span>
        </div>
        <div class="issue-description">
          <span>{{ issueData.description }}</span>
        </div>
        <div class="issue-tasks" *ngIf="issueData.tasks"></div>
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
    if (!Array.from(target.classList).includes('sidebar-content')) {
      this.onHide.emit();
    }
  }
}
