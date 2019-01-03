import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], IIT: string) {
    if (!data) { return []; }
    if (!IIT) {
      return data;
    }
    /*
      IIT contains output from tags-input in json format, but it is too ugly.
      Remove \" , \n and blank spaces.
    */
    const IITsub = IIT.substring(1, IIT.length - 1);
    const PreJson = IITsub.replace(/\\n/g, '').replace(/  /g, '').replace(/\\/g, '');

    if (PreJson.length === 0) {
      return data;
    }
    /*
      Parsing JSON.
    */
    const IITJ = JSON.parse(PreJson);
    const searchIITK = [];
    let ProData = [];
    if (IITJ.length === 0) {
      return data;
    }
    /*
      For each IIT chosen,
      Filter data with searchText and IIT.
      Append all the data.
    */
    for (let k = IITJ.length - 1; k >= 0; k--) {
      searchIITK.push(IITJ[k].value.toUpperCase());
      const temp = (data.filter(item => {
        return item.collegeName.toUpperCase() === IITJ[k].value.toUpperCase();
      }));
      ProData = ProData.concat(temp);
    }
    return ProData;
  }
}
