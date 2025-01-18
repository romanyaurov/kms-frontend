import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kms-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: 'modal.component.css',
  imports: [CommonModule],
  template: `
    <div class="backdrop">
      <div class="content">
        <div class="close" (click)="onHide.emit()">&times;</div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class ModalComponent {
  protected readonly elementRef = inject(ElementRef);
  public readonly onHide = output();

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
