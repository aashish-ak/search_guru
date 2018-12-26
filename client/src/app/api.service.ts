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
  getFromName(nm:string,byMethod:string)
  {
    var headers = new Headers();
    console.log(byMethod);
    headers.append('Content-Type', 'application/json');
    let x:any;
    const httpOptions = {
      headers:headers,
      observe:'response'
    }
    if(nm.length==0)
    {
    	var jsn1 ={
    		"query":{
    			"match_all":{}
    		}
    	};
    	return this.http.post('http://localhost:9200/search_guru/prof/_search?size=1000', 
                            jsn1,
                           httpOptions);
    }
    var jsn ={};
    if(byMethod=="name"){
    //	nm = "*"+nm+"*";
    //	console.log(nm);
     jsn = {
      "query":{
        "match":{
        	"name": {
        		"query":nm,
        		"fuzziness":2
        	}
        }
      }
    };
	}
    else{
    	jsn = {
      "query":{
        "match": {
          "research" : {
            "query": nm,
            "fuzziness":2
          }
        }
      }
    };
    }
    console.log(jsn);
    let t;
    return this.http.post('http://localhost:9200/search_guru/prof/_search?size=1000', 
                            jsn,
                           httpOptions);
 	}
}
