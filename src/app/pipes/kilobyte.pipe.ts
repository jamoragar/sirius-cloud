import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "kilobyte",
  standalone: true,
})
export class KilobytePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value === 0) {
      return "0 KB";
    }
    const kilobytes = value / 1024;
    return `${kilobytes.toFixed(2)} KB`;
  }
}
