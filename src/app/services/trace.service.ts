import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Trace } from '../models/trace.model';


@Injectable()
export class TraceService  extends ApiBaseService {

  traceList: Trace[] = [];
  trace: Trace;


  private apiResource = this.apiURL.concat("traces");

  loadTrace(id: string): void {
    const url = `${this.apiResource}/${id}`;
    
    this.http.get<Trace>(url, this.httpOptions).subscribe(result => {
      this.trace = result;
      }
    );
    
  }
  

  loadByEvent(eventId: string): void {

    const url = `${this.apiResource}/list/event/${eventId}/0`;

    console.log(url);

    this.http.get<Trace[]>(url, this.httpOptions).subscribe(result => {
      this.traceList = result;
    }
  );
    
  }

  loadByInstance(instanceId: string): void {

    const url = `${this.apiResource}/list/instance/${instanceId}/0`;

    this.http.get<Trace[]>(url, this.httpOptions).subscribe(result => {
      this.traceList = result;
    }
  );
    
  }


  deleteTrace(entity: Trace): Observable<Trace> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<Trace>(url, this.httpOptions);
    }
    return null;
  }

  deleteByEvent(eventId: string): Observable<Trace> {
    let url = '';
    if (eventId) {
      url = `${this.apiResource}/event/${eventId}`;
      return this.http.delete<Trace>(url, this.httpOptions);
    }
    return null;
  }

  deleteByJob(jobId: string): Observable<Trace> {
    let url = '';
    if (jobId) {
      url = `${this.apiResource}/job/${jobId}`;
      return this.http.delete<Trace>(url, this.httpOptions);
    }
    return null;
  }

  deleteByInstance(instanceId: string): Observable<Trace> {
    let url = '';
    if (instanceId) {
      url = `${this.apiResource}/instance/${instanceId}`;
      return this.http.delete<Trace>(url, this.httpOptions);
    }
    return null;
  }
}

