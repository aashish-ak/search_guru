import { Injectable } from '@angular/core';
import { Data } from './schema';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:Http) { }

  getData(){
    return this.http.get("http://localhost:3000/scraper/data").map(res => res.json());
  }
  scrap(){
    return this.http.get("http://localhost:3000/scraper").map(res => res.json());
  }
}
