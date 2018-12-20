import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(data: any[],searchText: string,IIT: string): any[] {
    if(!data) return [];
    if(!IIT){
      if(!searchText) return data;
      return data.filter(item=>{
        return item.name.toUpperCase().includes(searchText.toUpperCase());
      });
    }
    let t= IIT.substring(1,IIT.length-1)
    let x = t.replace(/\\n/g,"").replace(/  /g,"").replace(/\\/g,"");
    if(x.length==0)
    {
      if(!searchText) return data;
      return data.filter(item=>{
        return item.name.toUpperCase().includes(searchText.toUpperCase());
      });
    }
    let IITJ = JSON.parse(x);
    let searchIITK = [];
    var d=[];
    if(IITJ.length==0)
    {
      if(!searchText) return data;
      return data.filter(item=>{
        return item.name.toUpperCase().includes(searchText.toUpperCase());
      });
    }
    for(var k = IITJ.length-1;k>=0;k--)
    {
      searchIITK.push(IITJ[k].value.toUpperCase());
      var temp = (data.filter(item=>{
        if(!searchText)
          return item;
        return item.name.toUpperCase().includes(searchText.toUpperCase())
      }).filter(item=>{
        return item.collegeName.toUpperCase()===IITJ[k].value.toUpperCase();
      }));
      d = d.concat(temp);
    }
    return d;
  }
}
