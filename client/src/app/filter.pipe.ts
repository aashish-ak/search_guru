import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], searchText: string): any[] {
    if(!data) return [];
    if(!searchText) return data;
    return data.filter(item =>{
      return item.toUpperCase().includes(searchText.toUpperCase());
    });
  }
}
