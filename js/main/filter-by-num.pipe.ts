import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByNum'
})
export class FilterByNumPipe implements PipeTransform {

  transform(items:any, filter:string): any {
    if(!items || !filter){
    	return items;
    }

    return items.filter(item=>String(item.REESTR_NUM).toLowerCase().indexOf(filter.toLowerCase()) != -1)
  }

}
