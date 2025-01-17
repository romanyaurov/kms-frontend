import { Injectable, Signal, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DetailsService {

  public issueId = signal<string | null>(null);
  public isVisible = signal(false);

  public setVisible(issueId: string): void {
    this.issueId.set(issueId);
    this.isVisible.set(true);
    document.body.style.overflow = "hidden";
  }

  public setInvisible(): void {
    this.isVisible.set(false);
    this.issueId.set(null);
    document.body.style.overflow = "auto";
  }
}