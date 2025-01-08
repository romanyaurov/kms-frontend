import { Injectable, signal, Signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class IssueDetailService {
  private _isVisible: boolean = false;

  public isVisible = signal(false);

  public setVisible(): void {
    this._isVisible = true;
    this.isVisible.set(true);
  }

  public setInvisible(): void {
    this._isVisible = false;
    this.isVisible.set(false);
  }

  // public isVisible(): boolean {
  //   return this._isVisible;
  // }
}