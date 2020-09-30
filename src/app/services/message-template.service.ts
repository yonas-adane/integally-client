import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { Job } from '../models/job.model';
import { MessageTemplate } from '../models/message-template.model';


@Injectable()
export class MessageTemplateService  extends ApiBaseService {

  messageTemplateList: MessageTemplate[] = [];

  private apiResource = this.apiURL.concat("messagetemplates");

  findById(id: string): Observable<MessageTemplate> {
    const url = `${this.apiResource}/${id}`;
    
    return this.http.get<MessageTemplate>(url, this.httpOptions);
    
  }

  load(): void {

    const url = `${this.apiResource}/list/0`;

    this.http.get<MessageTemplate[]>(url, this.httpOptions).subscribe(result => {
      this.messageTemplateList = result;
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

    let url = `${this.apiResource}/start`;

    return this.http.post<Job>(url, entity);

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

