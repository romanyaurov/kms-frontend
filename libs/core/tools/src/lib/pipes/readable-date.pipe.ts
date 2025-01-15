import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'readableDate',
  standalone: true,
})
export class ReadableDate implements PipeTransform {
  transform(value: string) {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    const formattedDate = new Intl.DateTimeFormat('ru-RU', options)
      .format(date)
      .replace(',', '');

    return formattedDate;
  }
}