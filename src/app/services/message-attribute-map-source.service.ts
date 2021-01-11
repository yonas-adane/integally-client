import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { Page } from '../models/page.model';
import { HttpParams } from '@angular/common/http';
import { MessageAttributeMap } from '../models/message-template-map.model';
import { MessageAttributeMapSource } from '../models/message-template.model';


@Injectable()
export class MessageAttributeMapSourceService extends ApiBaseService {

  messageAttributeMapSourcePageable: Page<MessageAttributeMapSource>;

  private apiResource = this.apiURL.concat("messageattributesourcemaps");

  findById(id: string): Observable<MessageAttributeMapSource> {
    const url = `${this.apiResource}/${id}`;

    let result = this.http.get<MessageAttributeMapSource>(url, this.httpOptions);

    return result;
  }

  load(templateId: String): void {

    const url = `${this.apiResource}/list/${templateId}/0`;

    this.http.get<Page<MessageAttributeMapSource>>(url, this.httpOptions).subscribe(result => {

      this.messageAttributeMapSourcePageable = result;

    }
    );

  }

  lookup(attributeMapId: String): Observable<MessageAttributeMapSource[]> {

    const url = `${this.apiResource}/lookup/${attributeMapId}`;

    return this.http.get<MessageAttributeMapSource[]>(url, this.httpOptions);


  }


  save(entity: MessageAttributeMapSource): Observable<MessageAttributeMapSource> {

    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if (entity.id == null)
      return this.http.post<MessageAttributeMapSource>(url, entity);
    else
      return this.http.put<MessageAttributeMapSource>(url, entity);

  }



  delete(entity: MessageAttributeMapSource): Observable<MessageAttributeMapSource> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<MessageAttributeMapSource>(url, this.httpOptions);
    }
    return null;
  }
}

