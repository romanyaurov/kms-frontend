import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ModalService {
  public readonly isVisible = signal<boolean>(true);

  public setVisible() {
    this.isVisible.set(true);
  }

  public serInvisible() {
    this.isVisible.set(false);
  }
}