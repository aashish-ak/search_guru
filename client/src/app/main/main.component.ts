import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Data } from '../schema';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Observable, of} from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[ApiService],
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
      let data = await this.apiService.getData().toPromise();
      let data2 = data;
        if(data.length==0) {
          this.apiService.scrap().toPromise().then(data => {this.data = data});
          var cnt =0;
          while(cnt<5){
            this.delay(1000);
            data2 = await this.apiService.getData().toPromise();
          //  this.data = data2;
            this.onTextChange(1);
          }
        }
        else this.onTextChange(1);
  }
  async updateData(st:string,byMethod:string) {
      let data = await this.apiService.getFromName(st,byMethod).toPromise();
      var x = JSON.parse(data["_body"])["hits"]["hits"];
      var temp = [];
      for(var i=0;i<x.length;i++)
        temp.push(x[i]["_source"]);
      this.data = temp;
  }
  /*
    When assigning value using js/ts. Triggers like keyup or onInput are not fired. Firing them manually.
  */public onTextChange(event){
    let searchText = (<HTMLInputElement>document.getElementById("enter")).value;
    let searchBy = (<HTMLInputElement>document.getElementById("category")).value;
    this.updateData(searchText,searchBy);
  }
    public onAdd(item){
      let inEle = <HTMLInputElement>document.getElementById("test1");
      let k = JSON.stringify(inEle.value);
      let outEle = <HTMLInputElement>document.getElementById("test2");
      outEle.value=k;
      var evtInput = document.createEvent("HTMLEvents");
      evtInput.initEvent("input", false, true);
      outEle.dispatchEvent(evtInput);
      inEle.dispatchEvent(evtInput);
  }
  
  public onRemoving(item){
      let inEle = <HTMLInputElement>document.getElementById("test1");
      let k = JSON.stringify(inEle.value);
      let outEle = <HTMLInputElement>document.getElementById("test2");
      outEle.value=k;
      var evtInput = document.createEvent("HTMLEvents");
      evtInput.initEvent("input", false, true);
      outEle.dispatchEvent(evtInput);
      inEle.dispatchEvent(evtInput);
    }
}
