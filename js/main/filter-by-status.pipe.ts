import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(items: any, filter: string): any {
    if(!items || !filter || filter == 'Все члены'){
    	return items;
    }

    return items.filter(item=>item.AGENTSTATUSE.indexOf(filter) != -1)
  }

}
