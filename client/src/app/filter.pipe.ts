import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], searchIIT: string, searchText: string): any[] {
    if(!data) return [];
    
    if(!searchText) return data;
    if(searchIIT != 'allIIT'){
      return data.filter(item => {
        item = item.collegeName.toUpperCase().includes(searchText.toUpperCase());
      });
    }
    // return data.filter(item =>{
    //   return item.toUpperCase().includes(searchText.toUpperCase());
    // });
  }
}
