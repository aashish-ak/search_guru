import { Pipe, PipeTransform } from '@angular/core';
import {Http, Headers } from '@angular/http';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  constructor(private http:Http) { }
  transform(data: any[],IIT: string) {
    if(!data) return [];
    if(!IIT){
      return data;
    }
    /*
      IIT contains output from tags-input in json format, but it is too ugly.
      Remove \" , \n and blank spaces.
    */
    let IITsub= IIT.substring(1,IIT.length-1)
    let PreJson = IITsub.replace(/\\n/g,"").replace(/  /g,"").replace(/\\/g,"");
    console.log(PreJson.length);
    if(PreJson.length==0)
    {
      return data;
     //  if(!searchText) return data;
     // return data.filter(item=>{
     //   return item.name.toUpperCase().includes(searchText.toUpperCase());
    // });
    //   console.log("YO2");
    // //  let k;(this.getFromName(searchText));
    // //  let x = k["__zone_symbol__value"];
    //   let k = await(this.getFromName(searchText));
    //   console.log(k);
    //  return k["__zone_symbol__value"];
    }
    /*
      Parsing JSON.
    */
    let IITJ = JSON.parse(PreJson);
    let searchIITK = [];
    var ProData=[];
    if(IITJ.length==0)
    {
      return data;
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
        return item.collegeName.toUpperCase()===IITJ[k].value.toUpperCase();
      }));
      ProData = ProData.concat(temp);
    }
    return ProData;
  }
}
