import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { Event } from '../models/event.model';


@Injectable()
export class EventService  extends ApiBaseService {

  eventList: Event[] = [];

  private apiResource = this.apiURL.concat("events");

  findById(id: string): Observable<Event> {
    const url = `${this.apiResource}/${id}`;
    
    return this.http.get<Event>(url, this.httpOptions);
    
  }

  load(): void {

    const url = `${this.apiResource}/list/0`;

    this.http.get<Event[]>(url, this.httpOptions).subscribe(result => {
      this.eventList = result;
    }
  );
    
  }

  save(entity: Event, isCreate: boolean): Observable<Event> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if(isCreate){
      return this.http.post<Event>(url, entity);
    }
    else{
      return this.http.put<Event>(url, entity);
    }


  }

  delete(entity: Event): Observable<Event> {
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

