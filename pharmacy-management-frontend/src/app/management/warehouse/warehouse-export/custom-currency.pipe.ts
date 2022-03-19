import{Pipe,PipeTransform} from '@angular/core';

@Pipe({name:'currencyVND'})
export class CustomCurrencyPipe implements PipeTransform {
  transform(items: number): string {


    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(items);
  }
}
