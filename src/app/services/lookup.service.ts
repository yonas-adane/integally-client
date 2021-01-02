import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Page } from '../models/page.model';
import { Lookup } from '../models/lookupGroup.model';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class LookupService  extends ApiBaseService {

  lookupsPageable: Page<Lookup>;

  private apiResource = this.apiURL.concat("lookups");

  findById(id: string): Observable<Lookup> {
    const url = `${this.apiResource}/${id}`;
    
    let result = this.http.get<Lookup>(url, this.httpOptions);

    return result;
  }

  load(groupId: String): void {

    const url = `${this.apiResource}/list/${groupId}/0`;

    this.http.get<Page<Lookup>>(url, this.httpOptions).subscribe(result => {

      this.lookupsPageable = result;

    }
  );
    
  }

  lookup(): Observable<Lookup[]> {

    const url = `${this.apiResource}/lookup`;

    return this.http.get<Lookup[]>(url, this.httpOptions);
    
  }

  save(entity: Lookup): Observable<Lookup> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if(entity.id == null)
      return this.http.post<Lookup>(url, entity);
    else
      return this.http.put<Lookup>(url, entity);

  }



  delete(entity: Lookup): Observable<Lookup> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<Lookup>(url, this.httpOptions);
    }
    return null;
  }
}

