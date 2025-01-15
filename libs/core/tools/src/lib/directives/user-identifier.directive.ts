import { AfterContentInit, Directive, ElementRef, inject, Input, input, OnInit, Renderer2 } from "@angular/core";
import { CookieUserKeys } from "@kms-frontend/core/api-types";
import { CookieService } from 'ngx-cookie-service';

@Directive({
  selector: '[identifyUser]',
  standalone: true
})
export class UserIdentifier implements AfterContentInit {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly cookieService = inject(CookieService);

  public readonly identifyUser = input.required<string>();

  ngAfterContentInit(): void {
    if (this.identifyUser() === this.cookieService.get(CookieUserKeys.ID)) {
      const currentText = this.el.nativeElement.textContent;
      this.renderer.setProperty(this.el.nativeElement, 'textContent', 
        `${currentText} (You)`
      )
    }
  }
}