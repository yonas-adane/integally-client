import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { Job } from '../models/job.model';
import { Page } from '../models/page.model';


@Injectable()
export class JobService  extends ApiBaseService {

  jobPageable: Page<Job>;

  private apiResource = this.apiURL.concat("jobs");

  findById(id: string): Observable<Job> {
    const url = `${this.apiResource}/${id}`;

    let result = this.http.get<Job>(url, this.httpOptions);

    return result;
  }

  load(): void {

    const url = `${this.apiResource}/list/0`;

    this.http.get<Page<Job>>(url, this.httpOptions).subscribe(result => {

      this.jobPageable = result;

    }
    );

  }

  lookup(templateId: String): Observable<Job[]> {

    const url = `${this.apiResource}/lookup/${templateId}`;
    return this.http.get<Job[]>(url, this.httpOptions);

  }


  save(entity: Job): Observable<Job> {

    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if (entity.id == null)
      return this.http.post<Job>(url, entity);
    else
      return this.http.put<Job>(url, entity);

  }



  delete(entity: Job): Observable<Job> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<Job>(url, this.httpOptions);
    }
    return null;
  }
  
  
}

