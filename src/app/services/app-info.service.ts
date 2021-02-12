import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { AppInfo } from '../models/app-info.model';

@Injectable()
export class AppInfoService  extends ApiBaseService {

  private apiResource = this.apiURL.concat("appinfo");


  load(): Observable<AppInfo> {
  
    const url = `${this.apiResource}`;
    return this.http.get<AppInfo>(url, this.httpOptions);
    
  }

  
}

