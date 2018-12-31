import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  getData() {
    return this.http.get('http://localhost:3000/scraper/data').map(res => res.json());
  }

  scrape() {
    return this.http.get('http://localhost:3000/scraper').map(res => res.json());
  }

  getFromName(nm: string, byMethod: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
      observe: 'response'
    };

    if (nm.length === 0) {
      const jsn1 = {
        'query': {
          'match_all': {}
        }
      };
      return this.http.post('http://localhost:9200/search_guru/prof/_search?size=1000',
                            jsn1,
                           httpOptions);
    }
    let jsn = {};
    if (byMethod === 'name') {
      jsn = {
        'query': {
          'match': {
            'name': {
            'query': nm,
            ' fuzziness': 2
            }
          }
        }
      };
    } else {
      jsn = {
        'query': {
          'match': {
            'research' : {
              'query': nm,
              'fuzziness': 2
            }
          }
        }
      };
    }

    return this.http.post('http://localhost:9200/search_guru/prof/_search?size=1000', jsn, httpOptions);

  }
}
