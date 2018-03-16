import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, ResponseType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpRequestService {
  url: String = environment.url;

  constructor(private http: Http) { }

  post(urlPath: String, data: HTMLInputElement): Observable<any> {
    return this.http.post(this.url + '' + urlPath, JSON.stringify(data));
  }

}
