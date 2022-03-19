import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayNum'
})
export class ArrayNumPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const res = [];
    for (let i = 0; i < value; i++) {
      res.push(i);
    }
    return res;
  }

}
