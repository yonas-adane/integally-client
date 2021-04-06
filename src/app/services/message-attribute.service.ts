import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Page } from '../models/page.model';
import { HttpParams } from '@angular/common/http';
import { MessageAttribute } from '../models/message-template.model';


@Injectable()
export class MessageAttributeService  extends ApiBaseService {

  messageAttributePageable: Page<MessageAttribute>;

  private apiResource = this.apiURL.concat("messageattributes");

  findById(id: string): Observable<MessageAttribute> {
    const url = `${this.apiResource}/${id}`;
    
    let result = this.http.get<MessageAttribute>(url, this.httpOptions);

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

    this.http.get<Page<MessageAttribute>>(url, this.httpOptions).subscribe(result => {

      this.messageAttributePageable = result;

    }
  );
    
  }

  lookup(templateId: String): Observable<MessageAttribute[]> {

    const url = `${this.apiResource}/lookup/${templateId}`;
    return this.http.get<MessageAttribute[]>(url, this.httpOptions);
    
  }

 
  save(entity: MessageAttribute): Observable<MessageAttribute> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if(entity.id == null)
      return this.http.post<MessageAttribute>(url, entity);
    else
      return this.http.put<MessageAttribute>(url, entity);

  }



  delete(entity: MessageAttribute): Observable<MessageAttribute> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<MessageAttribute>(url, this.httpOptions);
    }
    return null;
  }
}

