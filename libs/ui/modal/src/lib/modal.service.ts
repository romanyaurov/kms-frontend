import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ModalService {
  public readonly isVisible = signal<boolean>(false);
  public readonly column = signal<string | undefined>(undefined);

  public setVisible(columnSlug?: string) {
    columnSlug ? this.column.set(columnSlug) : undefined;
    this.isVisible.set(true);
    document.body.style.overflow = "hidden";
  }

  public setInvisible() {
    this.isVisible.set(false);
    document.body.style.overflow = "auto";
  }
}