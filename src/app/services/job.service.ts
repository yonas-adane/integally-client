import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { Job } from '../models/job.model';


@Injectable()
export class JobService  extends ApiBaseService {

  jobList: Job[] = [];

  private apiResource = this.apiURL.concat("jobs");

  findById(id: string): Observable<Job> {
    const url = `${this.apiResource}/${id}`;
    
    return this.http.get<Job>(url, this.httpOptions);
    
  }

  load(): void {

    const url = `${this.apiResource}/list/0`;

    this.http.get<Job[]>(url, this.httpOptions).subscribe(result => {
      this.jobList = result;
    }
  );
    
  }

  save(entity: Job, isCreate: boolean): Observable<Job> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if(isCreate){
      return this.http.post<Job>(url, entity);
    }
    else{
      return this.http.put<Job>(url, entity);
    }


  }

  
  start(entity: Job): Observable<Job> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}/start/${entity.id.toString()}`;

    return this.http.post<Job>(url, entity);

  }

  startQueue(): Observable<Job> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}/start`;

    return this.http.post<Job>(url, null);

  }

  delete(entity: Job): Observable<Event> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      params = new HttpParams().set('id', entity.id.toString());
      return this.http.delete<Event>(url, this.httpOptions);
    }
    return null;
  }
  
  
}

