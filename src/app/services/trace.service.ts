import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Trace } from '../models/trace.model';


@Injectable()
export class TraceService  extends ApiBaseService {

  traceList: Trace[] = [];
  trace: Trace;


  private apiResource = this.apiURL.concat("traces");

  findById(id: string): void {
    const url = `${this.apiResource}/${id}`;
    
    this.http.get<Trace>(url, this.httpOptions).subscribe(result => {
      this.trace = result;
      }
    );
    
  }
  

  load(tagId: string): void {

    const url = `${this.apiResource}/list/${tagId}/0`;

    this.http.get<Trace[]>(url, this.httpOptions).subscribe(result => {
      this.traceList = result;
    }
  );
    
  }

  loadByTracking(tagId: string, trackingId: string): void {

    const url = `${this.apiResource}/list/${tagId}/${trackingId}/0`;

    this.http.get<Trace[]>(url, this.httpOptions).subscribe(result => {
      this.traceList = result;
    }
  );
    
  }


  delete(entity: Trace): Observable<Trace> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<Trace>(url, this.httpOptions);
    }
    return null;
  }

  deleteByTag(tagId: string): Observable<Trace> {
    let url = '';
    if (tagId) {
      url = `${this.apiResource}/tag/${tagId}`;
      return this.http.delete<Trace>(url, this.httpOptions);
    }
    return null;
  }

  deleteByTagTracking(tagId: string, trackingId: string): Observable<Trace> {
    let url = '';
    if (tagId && trackingId) {
      url = `${this.apiResource}/tag/${tagId}/${trackingId}`;
      return this.http.delete<Trace>(url, this.httpOptions);
    }
    return null;
  }
}

