import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'OrderByPipe',
  pure: false
})
export class OrderByPipe implements PipeTransform {
  transform(obj: any, orderFields: string): any {
    orderFields.split(',').forEach((currentField) => {
      let orderType = 'ASC';

      if (currentField[0] === '-') {
        currentField = currentField.substring(1);
        orderType = 'DESC';
      }

      obj.sort(function(a, b) {
        if (orderType === 'ASC') {
          if (a[currentField] < b[currentField]) return -1;
          if (a[currentField] > b[currentField]) return 1;
          return 0;
        } else {
          if (a[currentField] < b[currentField]) return 1;
          if (a[currentField] > b[currentField]) return -1;
          return 0;
        }
      });

    });
    return obj;
  }
}
