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
import { AvatarComponent } from '@kms-frontend/ui/avatar';
import { AvatarUrl } from '@kms-frontend/core/tools';
import { ProgressBarComponent } from '@kms-frontend/ui/progress-bar';

@Component({
  standalone: true,
  selector: 'kms-issue-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TaskComponent,
    AvatarComponent,
    ProgressBarComponent,
    AvatarUrl,
  ],
  styleUrl: 'issue-details.component.css',
  templateUrl: 'issue-details.component.html',
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

  protected toReadableDateString(inputDateDate: string): string {
    const date = new Date(inputDateDate);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    const formattedDate = new Intl.DateTimeFormat('ru-RU', options)
      .format(date)
      .replace(',', '');

    return formattedDate;
  }
}
