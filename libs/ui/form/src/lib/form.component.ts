import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Column } from '@kms-frontend/core/api-types';
import { ButtonComponent } from '@kms-frontend/ui/button';

@Component({
  selector: 'kms-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule, ButtonComponent],
  styleUrl: 'form.component.css',
  templateUrl: 'form.component.html',
})
export class FormComponent {
  public readonly columns = input<Column[] | undefined>();
  public readonly formTitle = input<string>();

  protected title: string = '';
  protected description: string = '';
  protected user: string = '';
  protected task: string = '';

  protected assignedTo: string[] = [];
  protected tasks: string[] = [];

  protected addToAssignedTo(): void {
    this.assignedTo.push(this.user.trim());
    this.user = '';
  }

  protected addToTasks(): void {
    this.tasks.push(this.task.trim());
    this.task = '';
  }

  protected removeFromAssignedTo(user: string) {
    this.assignedTo = this.assignedTo.filter((item) => item !== user);
  }

  protected removeFromTasks(task: string) {
    this.tasks = this.assignedTo.filter((item) => item !== task);
  }
}
