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

  ngOnInit() {
    this.apiService.getData().subscribe(data => this.data = data)
  }

}
