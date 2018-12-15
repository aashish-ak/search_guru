import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Data } from '../schema';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[ApiService]
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
            this.data = data2;
          }
        }
        else this.data=data;
  }

}
