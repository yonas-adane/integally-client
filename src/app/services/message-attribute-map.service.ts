import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Page } from '../models/page.model';
import { HttpParams } from '@angular/common/http';
import { MessageAttributeMap } from '../models/message-template-map.model';


@Injectable()
export class MessageAttributeMapService  extends ApiBaseService {

  messageAttributeMapPageable: Page<MessageAttributeMap>;

  private apiResource = this.apiURL.concat("messageattributemaps");

  findById(id: string): Observable<MessageAttributeMap> {
    const url = `${this.apiResource}/${id}`;
    
    let result = this.http.get<MessageAttributeMap>(url, this.httpOptions);

    return result;
  }

  load(templateId: string, page: number): void {


    if(page == null || page <= 0){
      page = 0;
    }
    else{
      page = page - 1;
    }

    const url = `${this.apiResource}/list/${templateId}/${page}`;

    this.http.get<Page<MessageAttributeMap>>(url, this.httpOptions).subscribe(result => {

      this.messageAttributeMapPageable = result;

    }
  );
    
  }

 
  save(entity: MessageAttributeMap): Observable<MessageAttributeMap> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if(entity.id == null)
      return this.http.post<MessageAttributeMap>(url, entity);
    else
      return this.http.put<MessageAttributeMap>(url, entity);

  }



  delete(entity: MessageAttributeMap): Observable<MessageAttributeMap> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<MessageAttributeMap>(url, this.httpOptions);
    }
    return null;
  }
}

