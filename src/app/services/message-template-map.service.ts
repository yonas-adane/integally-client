import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Page } from '../models/page.model';
import { HttpParams } from '@angular/common/http';
import { MessageTemplateMap } from '../models/message-template-map.model';


@Injectable()
export class MessageTemplateMapService  extends ApiBaseService {

  messageTemplateMapPageable: Page<MessageTemplateMap>;

  private apiResource = this.apiURL.concat("messagetemplatemaps");

  findById(id: string): Observable<MessageTemplateMap> {
    const url = `${this.apiResource}/${id}`;
    
    return this.http.get<MessageTemplateMap>(url, this.httpOptions);
    
  }

  load(): void {

    const url = `${this.apiResource}/list/0`;

    this.http.get<Page<MessageTemplateMap>>(url, this.httpOptions).subscribe(result => {
      this.messageTemplateMapPageable = result;
    }
  );
    
  }

  save(entity: MessageTemplateMap, isCreate: boolean): Observable<MessageTemplateMap> {
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if(isCreate){
      return this.http.post<MessageTemplateMap>(url, entity);
    }
    else{
      return this.http.put<MessageTemplateMap>(url, entity);
    }


  }



  delete(entity: MessageTemplateMap): Observable<MessageTemplateMap> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      params = new HttpParams().set('id', entity.id.toString());
      return this.http.delete<MessageTemplateMap>(url, this.httpOptions);
    }
    return null;
  }
  

}

