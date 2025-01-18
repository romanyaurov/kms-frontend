import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  CreateProjectRequest,
  DefaultResponse,
} from '@kms-frontend/core/api-types';
import { ButtonComponent } from '@kms-frontend/ui/button';

@Component({
  selector: 'kms-project-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ButtonComponent],
  styleUrl: 'project-form.component.css',
  templateUrl: 'project-form.component.html',
})
export class ProjectFormComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  public readonly formTitle = input<string>();
  public readonly checkEmail =
    input.required<(email: string) => Observable<DefaultResponse>>();
  public readonly onFormSubmit = output<CreateProjectRequest>();
  protected readonly isFormInvalid = signal<boolean>(true);

  protected name: string = '';
  protected columns: string[] = [];
  protected column: string = '';
  protected participants: string[] = [];
  protected participant: string = '';

  protected addToColumns(): void {
    if (this.columns.includes(this.column.trim())) {
      alert(`Columns list is already contains ${this.column.trim()}`);
      return;
    }
    this.columns.push(this.column.trim());
    this.column = '';
    this.checkFormValid();
  }

  protected removeFromColumns(column: string) {
    this.columns = this.columns.filter((item) => item !== column);
    this.checkFormValid();
  }

  protected addToParticipants(): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.participant.trim())) {
      alert(`${this.participant.trim()} is not valid email`);
      return;
    }

    if (this.participants.includes(this.participant.trim())) {
      alert(`${this.participant.trim()} is already in participants list`);
      return;
    }

    this.checkEmail()(this.participant).subscribe({
      next: (res) => {
        if (res.error) {
          alert(`User ${this.participant.trim()} has not found`);
          return;
        }
        this.participants.push(this.participant.trim());
        this.participant = '';
        this.cdr.detectChanges();
      },
      error: (err) => alert(`User ${this.participant.trim()} has not found`),
    });
  }

  protected removeFromParticipants(participant: string) {
    this.participants = this.participants.filter((item) => item !== participant);
  }

  protected checkFormValid() {
    if (this.name && this.columns.length > 1) {
      this.isFormInvalid.set(false);
    } else {
      this.isFormInvalid.set(true);
    }
  }

  protected handleFormSubmit() {
      let formData: CreateProjectRequest = {
        name: this.name,
        columns: this.columns,
      };
  
      if (this.participants.length > 0) {
        formData.participants = this.participants;
      }
  
      this.onFormSubmit.emit(formData);
    }
}
