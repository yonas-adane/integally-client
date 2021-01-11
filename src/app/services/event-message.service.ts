import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { Page } from '../models/page.model';
import { EventMessage } from '../models/event-message.model';


@Injectable()
export class EventMessageService  extends ApiBaseService {

  eventMessagePageable: Page<EventMessage>;

  private apiResource = this.apiURL.concat("eventmessages");

  findById(id: string): Observable<EventMessage> {

    const url = `${this.apiResource}/${id}`;

    let result = this.http.get<EventMessage>(url, this.httpOptions);

    return result;
  }

  load(queueName: string, status: string): void {

    const url = `${this.apiResource}/list/0/${queueName}/${status}`;

    this.http.get<Page<EventMessage>>(url, this.httpOptions).subscribe(result => {

      this.eventMessagePageable = result;

    }
    );

  }

  lookup(): Observable<string[]> {

    const url = `${this.apiResource}/lookup`;
    return this.http.get<string[]>(url, this.httpOptions);

  }


  save(entity: EventMessage, isCreate: Boolean): Observable<EventMessage> {

    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if (isCreate)
      return this.http.post<EventMessage>(url, entity);
    else
      return this.http.put<EventMessage>(url, entity);

  }



  delete(entity: EventMessage): Observable<EventMessage> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<EventMessage>(url, this.httpOptions);
    }
    return null;
  }
}



