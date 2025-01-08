import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'kms-time-ago',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="updatedAt() as updatedAt">
      <span>{{ calculateTimeAgo(updatedAt) }}</span>
    </ng-container>
  `,
})
export class TimeAgoComponent {
  readonly updatedAt = input.required<string>();

  protected calculateTimeAgo(updatedAt: string) {
    const now = new Date();
    const lastUpdate = new Date(updatedAt);
    const seconds = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000)
    const minVal = 60;
    const hourVal = minVal * 60;
    const dayVal = hourVal * 24;
    const weekVal = dayVal * 7;
    const monthVal = dayVal * 30;
    const yearVal = dayVal * 365;

    switch (true) {
      case seconds < minVal:
        return 'just now';
      case seconds < hourVal:
        const minutes = Math.floor(seconds / minVal);
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
      case seconds < dayVal:
        const hours = Math.floor(seconds / hourVal);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      case seconds < weekVal:
        const days = Math.floor(seconds / dayVal);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      case seconds < monthVal:
        const weeks = Math.floor(seconds / weekVal);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
      case seconds < yearVal:
        const months = Math.floor(seconds / monthVal);
        return `${months} month${months > 1 ? 's' : ''} ago`;
      default: {
        const years = Math.floor(seconds / yearVal);
        return `${years} year${years > 1 ? 's' : ''} ago`;
      }
    }
  }
}