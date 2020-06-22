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

  load(filter: any): void {
    this.find(filter).subscribe(result => {
        this.connectorList = result;
      }
    );
  }

  find(filter: any): Observable<Connector[]> {
    
    const params = {
    };

    const url = `${this.apiResource}/list/0`;

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
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      params = new HttpParams().set('id', entity.id.toString());
      return this.http.delete<Connector>(url, this.httpOptions);
    }
    return null;
  }
}

