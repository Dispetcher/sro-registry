import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByOGRN'
})
export class FilterByOGRNPipe implements PipeTransform {

  transform(items: any, filter: string): any {
    if(!items || !filter){
    	return items;
    }

    return items.filter(item=>String(item.OGRN).indexOf(filter) != -1)
  }

}
