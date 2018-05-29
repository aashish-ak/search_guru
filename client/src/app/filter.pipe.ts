import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], searchIIT: string, searchText: string): any[] {
    if(!data) return [];
    if(!searchText) return data;
    if(!searchIIT) return data;
    searchText = searchText.toUpperCase();
    searchIIT = searchIIT.toUpperCase();
    if(searchIIT ==="ALL IIT"){
      return data.filter(item => {
        return item.name.toUpperCase().includes(searchText)
      })
    }
    else{
      console.log(searchIIT);
      data = data.filter(item => {
        return item.collegeName.toUpperCase() === searchIIT;
      });
      return data.filter(item=>{
        return item.name.toUpperCase().includes(searchText);
      })
    }
  

    // return data.filter(item =>{
    //   return item.toUpperCase().includes(searchText.toUpperCase());
    // });
  }
}
