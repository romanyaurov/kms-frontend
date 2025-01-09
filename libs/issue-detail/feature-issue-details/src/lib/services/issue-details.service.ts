import { Injectable, signal, Signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class IssueDetailsService {

  private _issueId: string = '';
  public isVisible = signal(false);

  get issueId(): string {
    return this._issueId;
  }

  public setVisible(issueId: string): void {
    this._issueId = issueId;
    this.isVisible.set(true);
    document.body.style.overflow = "hidden";
  }

  public setInvisible(): void {
    this.isVisible.set(false);
    document.body.style.overflow = "auto";
  }
}