import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByINN'
})
export class FilterByINNPipe implements PipeTransform {

  transform(items: any, filter: string): any {
    if(!items || !filter){
    	return items;
    }
    return items.filter(item=>item.INN.indexOf(filter) != -1)
  }

}
