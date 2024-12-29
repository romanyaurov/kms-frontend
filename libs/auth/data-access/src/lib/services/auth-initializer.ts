import { inject } from "@angular/core";
import { AuthStore } from "../auth.store";

export function initializeAuth() {
  const authStore = inject(AuthStore);
  return () => authStore.initializeAuthState();
}