import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kms-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: 'progress-bar.component.css',
  template: `
    <div class="progress-bar">
      <div
        class="progress-line"
        [style.width.%]="percents()"
      ></div>
    </div>
  `,
})
export class ProgressBarComponent {
  readonly percents = input.required<number>();
}
