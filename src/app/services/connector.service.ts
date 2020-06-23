import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { File } from '../models/file.model';
import { ApiBaseService } from './api-base.service';
import { Connector } from '../models/connector.model';


@Injectable()
export class ConnectorService  extends ApiBaseService {

  connectorList: Connector[] = [];

  private apiResource = this.apiURL.concat("connectors");

  findById(id: string): Observable<Connector> {
    const url = `${this.apiResource}/${id}`;
    
    return this.http.get<Connector>(url, this.httpOptions);
    
  }

  load(): void {

    const url = `${this.apiResource}/list/0`;

    this.http.get<Connector[]>(url, this.httpOptions).subscribe(result => {
      this.connectorList = result;
    }
  );
    
  }

  lookup(): Observable<Connector[]> {

    const url = `${this.apiResource}/lookup`;

    return this.http.get<Connector[]>(url, this.httpOptions);
    
  }

  save(entity: Connector, isCreate: boolean): Observable<Connector> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    if(isCreate){
      return this.http.post<Connector>(url, entity);
    }
    else{
      return this.http.put<Connector>(url, entity);
    }


  }

  delete(entity: Connector): Observable<Connector> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<Connector>(url, this.httpOptions);
    }
    return null;
  }
}

