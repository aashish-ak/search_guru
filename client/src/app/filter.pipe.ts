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
    /*
      IIT contains output from tags-input in json format, but it is too ugly.
      Remove \" , \n and blank spaces.
    */
    let IITsub= IIT.substring(1,IIT.length-1)
    let PreJson = IITsub.replace(/\\n/g,"").replace(/  /g,"").replace(/\\/g,"");
    
    if(PreJson.length==0)
    {
      if(!searchText) return data;
      return data.filter(item=>{
        return item.name.toUpperCase().includes(searchText.toUpperCase());
      });
    }
    /*
      Parsing JSON.
    */
    let IITJ = JSON.parse(PreJson);
    let searchIITK = [];
    var ProData=[];
    if(IITJ.length==0)
    {
      if(!searchText) return data;
      return data.filter(item=>{
        return item.name.toUpperCase().includes(searchText.toUpperCase());
      });
    }
    /*
      For each IIT chosen,
      Filter data with searchText and IIT.
      Append all the data.
    */
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
      ProData = ProData.concat(temp);
    }
    return ProData;
  }
}
