import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { Job } from '../models/job.model';
import { Lookup } from '../models/lookup.model';


@Injectable()
export class LookupService  extends ApiBaseService {

  lookupList: Lookup[] = [];

  private apiResource = this.apiURL.concat("lookups");

  findById(id: string): Observable<Lookup> {
    const url = `${this.apiResource}/${id}`;
    
    return this.http.get<Lookup>(url, this.httpOptions);
    
  }

  load(): void {

    const url = `${this.apiResource}/list/0`;

    this.http.get<Lookup[]>(url, this.httpOptions).subscribe(result => {
      this.lookupList = result;
    }
  );
    
  }

  save(entity: Lookup, isCreate: boolean): Observable<Lookup> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if(isCreate){
      return this.http.post<Lookup>(url, entity);
    }
    else{
      return this.http.put<Lookup>(url, entity);
    }


  }

  
  start(entity: Lookup): Observable<Lookup> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}/start`;

    return this.http.post<Lookup>(url, entity);

  }

  delete(entity: Lookup): Observable<Lookup> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      params = new HttpParams().set('id', entity.id.toString());
      return this.http.delete<Lookup>(url, this.httpOptions);
    }
    return null;
  }
  
  
}

