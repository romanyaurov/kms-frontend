import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { BoardStore } from '@kms-frontend/board/data-access';
import { AvatarUrl } from '@kms-frontend/core/tools';
import { SortByOrder } from './pipes/sort-by-order.pipe';
import { FilterByColumn } from './pipes/filter-by-column.pipe';

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
    AvatarUrl,
    CheckboxModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
  ],
})
export class BoardComponent implements OnInit {
  protected readonly boardStore = inject(BoardStore);
  private readonly route = inject(ActivatedRoute);
  protected projectSlug!: string;

  ngOnInit(): void {
    this.projectSlug = this.route.snapshot.paramMap.get('projectSlug')!;
    this.boardStore.getBoardData({ projectSlug: this.projectSlug });
  }

  public drop(event: CdkDragDrop<any>) {
    this.boardStore.moveIssue({
      issueId: event.item.data,
      columnSlug: event.container.data,
      order: event.currentIndex + 1,
    });
    // console.log(event.item.data); // issue id
    // console.log(event.container.data); // new column slug
    // console.log(event.currentIndex + 1); // new order
  }
}
