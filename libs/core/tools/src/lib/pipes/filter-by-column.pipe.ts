import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from '@kms-frontend/core/api-types';

@Pipe({
  name: 'filterByColumn',
  standalone: true,
})
export class FilterByColumn implements PipeTransform {
  transform(value: Issue[] | undefined, status: string): Issue[] {
    if (!value) return [];

    return [...value].filter(task => task.column === status);
  }
}
