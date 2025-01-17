import { Injectable, signal } from "@angular/core";
import { Issue } from "@kms-frontend/core/api-types";

@Injectable({ providedIn: 'root' })
export class DetailsService {

  public issue = signal<Issue | null>(null);
  public isVisible = signal(false);

  public setVisible(issueData: Issue): void {
    this.issue.set(issueData);
    this.isVisible.set(true);
    document.body.style.overflow = "hidden";
  }

  public setInvisible(): void {
    this.isVisible.set(false);
    this.issue.set(null);
    document.body.style.overflow = "auto";
  }
}