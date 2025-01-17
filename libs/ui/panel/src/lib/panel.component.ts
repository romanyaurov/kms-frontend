import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { CardComponent } from '@kms-frontend/ui/card';
import { Issue } from '@kms-frontend/core/api-types';
import { SortByOrder } from '@kms-frontend/core/tools';

@Component({
  standalone: true,
  selector: 'kms-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDrag, CdkDropList, CardComponent, CommonModule, SortByOrder],
  styleUrl: 'panel.component.css',
  template: `
    <div class="column-title">{{ title() }}</div>
    <div
      [id]="slug()"
      class="issues-stack"
      *ngIf="issues() as issues"
      cdkDropList
      [cdkDropListData]="slug()"
      [cdkDropListConnectedTo]="connectedTo()"
      (cdkDropListDropped)="handleDrop($event)"
    >
      <ng-container *ngFor="let issue of issues | sortByOrder">
        <kms-card cdkDrag [cdkDragData]="issue.id" [issue]="issue" (getDetails)="onGetDetails($event)"></kms-card>
      </ng-container>
      <div class="new-issue" (click)="onCreateIssue.emit()">
        <i class="fa fa-plus-square-o" aria-hidden="true"></i>
        <span>Add New Issue</span>
      </div>
    </div>
  `,
})
export class PanelComponent {
  readonly title = input.required<string>();
  readonly slug = input.required<string>();
  readonly issues = input<Issue[]>();
  readonly connectedTo = input.required<string[]>();

  readonly getDetails = output<Issue>();
  readonly onCreateIssue = output();

  readonly onDrop = output<{
    issueId: string;
    columnSlug: string;
    order: number;
  }>();

  protected handleDrop(event: CdkDragDrop<any>) {
    this.onDrop.emit({
      issueId: event.item.data,
      columnSlug: event.container.data,
      order: event.currentIndex + 1,
    });
  }

  protected onGetDetails(issueId: Issue) {
    this.getDetails.emit(issueId);
  }
}
