import { inject, Pipe, PipeTransform } from '@angular/core';
import { STATIC_URL } from '@kms-frontend/core/data-access';

@Pipe({
  name: 'avatarUrl',
  standalone: true,
})
export class AvatarUrl implements PipeTransform {
  private readonly hostUrl = inject(STATIC_URL);

  transform(value: string): string {
    return encodeURI(`${this.hostUrl}/${value}`);
  }
}
