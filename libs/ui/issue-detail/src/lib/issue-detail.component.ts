import { ChangeDetectionStrategy, Component, HostListener, inject, output } from '@angular/core';
import { IssueDetailService } from './services/issue-detail.service';

@Component({
  standalone: true,
  selector: 'kms-issue-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [IssueDetailService],
  styleUrl: 'issue-detail.component.css',
  template: `
    <div class="sidebar-content">
      Issue Details There
    </div>
  `,
})
export class IssueDetailComponent {
  private issueDetailService = inject(IssueDetailService);
  readonly onHide = output();

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!Array.from(target.classList).includes('sidebar-content')) {
      console.log(target);
      this.onHide.emit();
    }
  }
}