import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

 protected apiURL= "";

 protected headers = new HttpHeaders({
    responseType: 'json'
  })
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json');

  protected httpOptions = {
    headers: this.headers
  };

  constructor(protected http: HttpClient) {
        this.apiURL = environment.apiBaseURL;
    }

}