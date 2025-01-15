import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'flatProperty',
  standalone: true
})
export class FlatProperty implements PipeTransform {
  transform(value: any[], key: string) {
    return value.map((item) => item.avatar);
  }
}