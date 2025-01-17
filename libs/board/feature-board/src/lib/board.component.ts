import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { BoardStore } from '@kms-frontend/board/data-access';
import { SortByOrder } from '@kms-frontend/core/tools';
import { FilterByColumn } from '@kms-frontend/core/tools';
import { PanelComponent } from '@kms-frontend/ui/panel';
import { Issue } from '@kms-frontend/core/api-types';
import { DetailsComponent, DetailsService } from '@kms-frontend/ui/details';
import { FlatProperty } from '@kms-frontend/core/tools';

@Component({
  standalone: true,
  selector: 'kms-board',
  styleUrl: 'board.component.css',
  templateUrl: 'board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SortByOrder,
    FilterByColumn,
    CdkDropListGroup,
    PanelComponent,
    DetailsComponent,
    FlatProperty,
  ],
})
export class BoardComponent implements OnInit {
  protected readonly detailService = inject(DetailsService);
  protected readonly boardStore = inject(BoardStore);
  private readonly route = inject(ActivatedRoute);

  protected projectSlug!: string;

  ngOnInit(): void {
    this.projectSlug = this.route.snapshot.paramMap.get('projectSlug')!;
    this.boardStore.getBoardData({ projectSlug: this.projectSlug });
  }

  public moveIssue({
    issueId,
    columnSlug,
    order,
  }: {
    issueId: string;
    columnSlug: string;
    order: number;
  }) {
    this.boardStore.moveIssue({ issueId, columnSlug, order });
  }

  protected createIssue(columnSlug: string) {
    alert('create new issue in column ' + columnSlug);
  }

  protected toggleTask(taskId: string) {
    this.boardStore.toggleTaskStatus({ taskId });
  }
}
