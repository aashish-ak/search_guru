import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Data } from '../schema';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ApiService],
})
export class MainComponent implements OnInit {
  data: Data[];
  constructor(private apiService: ApiService) { }

  delay(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  }

  async ngOnInit() {
    const data = await this.apiService.getData().toPromise();
    let data2 = data;
    if (data.length === 0) {
      this.apiService.scrape().toPromise().then(scrapedData => {this.data = scrapedData; });
      const cnt = 0;
      while (cnt < 5) {
        this.delay(1000);
        data2 = await this.apiService.getData().toPromise();
        this.onTextChange(1);
      }
    } else {
      this.onTextChange(1);
    }
  }

  async updateData(st: string, byMethod: string) {
      const data = await this.apiService.getFromName(st, byMethod).toPromise();
      const x = JSON.parse(data['_body'])['hits']['hits'];
      const temp = [];
      for (let i = 0; i < x.length; i++) {
        temp.push(x[i]['_source']);
      }
      this.data = temp;
  }

  public onTextChange(event: any) {
    const searchText = (<HTMLInputElement>document.getElementById('enter')).value;
    const searchBy = (<HTMLInputElement>document.getElementById('category')).value;
    this.updateData(searchText, searchBy);
  }

  /*
    When assigning value using js/ts. Triggers like keyup or onInput are not fired. Firing them manually.
  */

  public onAdd(item) {
    const inEle = <HTMLInputElement>document.getElementById('test1');
    const k = JSON.stringify(inEle.value);
    const outEle = <HTMLInputElement>document.getElementById('test2');
    outEle.value = k;
    const evtInput = document.createEvent('HTMLEvents');
    evtInput.initEvent('input', false, true);
    outEle.dispatchEvent(evtInput);
    inEle.dispatchEvent(evtInput);
  }

  public onRemoving(item) {
    const inEle = <HTMLInputElement>document.getElementById('test1');
    const k = JSON.stringify(inEle.value);
    const outEle = <HTMLInputElement>document.getElementById('test2');
    outEle.value = k;
    const evtInput = document.createEvent('HTMLEvents');
    evtInput.initEvent('input', false, true);
    outEle.dispatchEvent(evtInput);
    inEle.dispatchEvent(evtInput);
  }
}
