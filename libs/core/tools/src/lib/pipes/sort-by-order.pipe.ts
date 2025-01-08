import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByOrder',
  standalone: true,
})
export class SortByOrder implements PipeTransform {
  transform<T extends { order: number }>(
    value: T[] | undefined,
    type: 'asc' | 'desc' = 'asc',
  ): T[] | null {
    if (!value) {
      return null;
    }

    return [...value].sort((a, b) =>
      type === 'asc' ? a.order - b.order : b.order - a.order,
    );
  }
}
