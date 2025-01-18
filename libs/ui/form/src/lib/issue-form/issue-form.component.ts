import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Column, CreateIssueRequest } from '@kms-frontend/core/api-types';
import { ButtonComponent } from '@kms-frontend/ui/button';

@Component({
  selector: 'kms-issue-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule, ButtonComponent],
  styleUrl: 'issue-form.component.css',
  templateUrl: 'issue-form.component.html',
})
export class IssueFormComponent {
  public readonly formTitle = input<string>();
  public readonly columns = input<Column[] | undefined>();
  public readonly users = input<string[]>();
  public readonly initColumn = input<string>();
  public readonly onFormSubmit = output<Omit<CreateIssueRequest, 'project'>>();
  protected readonly isFormInvalid = signal<boolean>(true);

  protected title: string = '';
  protected description: string = '';
  protected column: string = '';

  protected assignedTo: string[] = [];
  protected user: string = '';

  protected tasks: string[] = [];
  protected task: string = '';

  protected deadline: string = '';

  ngOnInit() {
    if (this.initColumn()) {
      this.column = this.initColumn()!;
    }
  }

  protected addToAssignedTo(): void {
    if (!this.users()?.includes(this.user.trim())) {
      alert(`User ${this.user.trim()} is not member of this project.`);
      return;
    }

    if (this.assignedTo.includes(this.user.trim())) {
      alert(`User ${this.user.trim()} is alredy in Assigned To list.`);
      return;
    }

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

  protected checkFormValid() {
    if (this.title && this.description && this.column) {
      this.isFormInvalid.set(false);
    } else {
      this.isFormInvalid.set(true);
    }
  }

  protected handleFormSubmit() {
    let formData: Omit<CreateIssueRequest, 'project'> = {
      title: this.title,
      description: this.description,
      column: this.column,
    };

    if (this.assignedTo.length > 0) {
      formData.assignedTo = this.assignedTo;
    }

    if (this.tasks.length > 0) {
      formData.tasks = this.tasks;
    }

    if (this.deadline) {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
      if (!dateRegex.test(this.deadline)) {
        alert('Invalid deadline format');
        return;
      }
      const [day, month, year] = this.deadline.split('-');
      if(new Date([month, day, year].join('-')) < new Date()) {
        alert('Deadline date can not be earlier that today date');
        return;
      }
      formData.deadline = this.deadline;
    }

    this.onFormSubmit.emit(formData);
  }
}
