import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersDistance',
})
export class MetersDistancePipe implements PipeTransform {
  transform(distanceInMeters: number, unit: string = 'km'): string {
    let multiplier: number = 1;
    switch (unit) {
      case 'cm':
        multiplier = 100;
        break;
      case 'km':
        multiplier = 0.001;
        break;
    }
    return (distanceInMeters * multiplier).toFixed(1) + ' ' + unit;
  }
}
