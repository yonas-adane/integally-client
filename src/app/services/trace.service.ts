import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Trace } from '../models/trace.model';
import { Page } from '../models/page.model';


@Injectable()
export class TraceService  extends ApiBaseService {

  //traceList: Trace[] = [];
  trace: Trace;

  tracePageable: Page<Trace>;


  private apiResource = this.apiURL.concat("tracelogs");

  loadTrace(id: string): void {
    const url = `${this.apiResource}/${id}`;
    
    this.http.get<Trace>(url, this.httpOptions).subscribe(result => {
      this.trace = result;
      }
    );
    
  }
  

  loadByEvent(eventId: string): void {

    const url = `${this.apiResource}/list/event/${eventId}/0`;

    this.http.get<Page<Trace>>(url, this.httpOptions).subscribe(result => {
      this.tracePageable = result;
    }
  );
    
  }

  loadByInstance(instanceId: string): void {

    const url = `${this.apiResource}/list/instance/${instanceId}/0`;

    this.http.get<Page<Trace>>(url, this.httpOptions).subscribe(result => {
      this.tracePageable = result;
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

  getDateDiff(startDate, endDate) {

    if(startDate == null || endDate == null){
      return 0;
    }
    
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    //return { day: days, hour: hours, minute: minutes, second: seconds };

    return days +"."+ hours+"."+  minutes+"."+ seconds;

  }

}

