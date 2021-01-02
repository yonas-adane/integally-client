import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { LookupGroup } from '../models/lookupGroup.model';
import { Page } from '../models/page.model';


@Injectable()
export class LookupGroupService  extends ApiBaseService {

  lookupGroupPageable: Page<LookupGroup>;

  private apiResource = this.apiURL.concat("lookupgroups");

  findById(id: string): Observable<LookupGroup> {
    const url = `${this.apiResource}/${id}`;
    
    return this.http.get<LookupGroup>(url, this.httpOptions);
    
  }

  load(): void {

    const url = `${this.apiResource}/list/0`;

    this.http.get<Page<LookupGroup>>(url, this.httpOptions).subscribe(result => {
      this.lookupGroupPageable = result;
    }
  );
    
  }

  save(entity: LookupGroup, isCreate: boolean): Observable<LookupGroup> {
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if(isCreate){
      return this.http.post<LookupGroup>(url, entity);
    }
    else{
      return this.http.put<LookupGroup>(url, entity);
    }


  }

  
  start(entity: LookupGroup): Observable<LookupGroup> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}/start`;

    return this.http.post<LookupGroup>(url, entity);

  }

  delete(entity: LookupGroup): Observable<LookupGroup> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      params = new HttpParams().set('id', entity.id.toString());
      return this.http.delete<LookupGroup>(url, this.httpOptions);
    }
    return null;
  }
  
  
}

