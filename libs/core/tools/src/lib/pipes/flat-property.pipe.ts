import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'flatProperty',
  standalone: true
})
export class FlatProperty implements PipeTransform {
  transform(value: any[] | undefined, key: string) {
    return value ? value.map((item) => item[key]) : [];
  }
}