import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsService } from './details.service';
import { TaskComponent } from '@kms-frontend/ui/task';
import { AvatarComponent } from '@kms-frontend/ui/avatar';
import { AvatarUrl } from '@kms-frontend/core/tools';
import { ProgressBarComponent } from '@kms-frontend/ui/progress-bar';
import { ReadableDate } from '@kms-frontend/core/tools';

@Component({
  standalone: true,
  selector: 'kms-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TaskComponent,
    AvatarComponent,
    ProgressBarComponent,
    AvatarUrl,
    ReadableDate,
  ],
  styleUrl: 'details.component.css',
  templateUrl: 'details.component.html',
})
export class DetailsComponent {
  private readonly elementRef = inject(ElementRef);
  protected readonly detailsService = inject(DetailsService);
  public readonly onHide = output();
  public readonly onTaskToggle = output<string>();

  @HostListener('document:click', ['$event.target'])
  protected onClick(target: HTMLElement) {
    if (
      !this.elementRef.nativeElement.contains(target) ||
      Array.from(target.classList).includes('backdrop')
    ) {
      this.onHide.emit();
    }
  }
}
