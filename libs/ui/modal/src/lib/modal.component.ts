import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
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
        <div class="close">&times;</div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class ModalComponent {

}
