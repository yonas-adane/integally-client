import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { StatusCountReport } from '../models/event-message.model';

@Injectable()
export class StatsService  extends ApiBaseService {
  
  private apiResource = this.apiURL.concat("stats");

  load(): Observable<StatusCountReport[]> {
  
    const url = `${this.apiResource}/statuscountdaily`;

    return this.http.get<StatusCountReport[]>(url, this.httpOptions);
    
  }

  
}

