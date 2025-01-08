import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { BoardStore } from '@kms-frontend/board/data-access';
import { SortByOrder } from '@kms-frontend/core/tools';
import { FilterByColumn } from '@kms-frontend/core/tools';
import { PanelComponent } from '@kms-frontend/ui/panel';
import { Column } from '@kms-frontend/core/api-types';
import { IssueDetailComponent, IssueDetailService } from '@kms-frontend/ui/issue-detail';

@Component({
  standalone: true,
  selector: 'kms-board',
  styleUrl: 'board.component.css',
  templateUrl: 'board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PanelModule,
    CardModule,
    SortByOrder,
    FilterByColumn,
    AvatarGroupModule,
    AvatarModule,
    CheckboxModule,
    CdkDropListGroup,
    PanelComponent,
    IssueDetailComponent,
  ],
  providers: [IssueDetailService],
})
export class BoardComponent implements OnInit {
  protected readonly issueDetailService = inject(IssueDetailService);
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

  public getConnectedPanels(columns: Column[]): string[] {
    return columns.map((column) => column.slug);
  }

  protected showDetails(event: string) {
    this.issueDetailService.setVisible();
  }

  protected hideDetails() {
    this.issueDetailService.setInvisible();
  }
}
