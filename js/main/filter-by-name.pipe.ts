import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: any, filter: string): any {
    if(!items || !filter){
    	return items;
    }
    return items.filter(item=>item.MEMBERNAME.toLowerCase().indexOf(filter.toLowerCase()) != -1)
  }

}
