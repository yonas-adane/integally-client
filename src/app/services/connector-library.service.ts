import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { File } from '../models/file.model';
import { ApiBaseService } from './api-base.service';
import { Connector } from '../models/connector.model';
import { Page } from '../models/page.model';
import { ConnectorLibrary } from '../models/connector-library.model';


@Injectable()
export class ConnectorLibraryService  extends ApiBaseService {

  connectorLibrariesPageable: Page<ConnectorLibrary>;

  private apiResource = this.apiURL.concat("connectorlibraries");

  findById(id: string): Observable<ConnectorLibrary> {
    const url = `${this.apiResource}/${id}`;
    
    let result = this.http.get<ConnectorLibrary>(url, this.httpOptions);

    return result;
  }

  load(): void {

    const url = `${this.apiResource}/list/0`;

    this.http.get<Page<ConnectorLibrary>>(url, this.httpOptions).subscribe(result => {

      this.connectorLibrariesPageable = result;

    }
  );
    
  }

  lookup(): Observable<ConnectorLibrary[]> {

    const url = `${this.apiResource}/lookup`;

    return this.http.get<ConnectorLibrary[]>(url, this.httpOptions);
    
  }

  save(formData: FormData, id: String): Observable<ConnectorLibrary> {

  let url = `${this.apiResource}`;


  // Display the key/value pairs
  // formData.forEach((value,key) => {
  //   console.log(key+" "+value)
  // });

  if(id.length == 0)
    return this.http.post<ConnectorLibrary>(url, formData);
  else
    return this.http.put<ConnectorLibrary>(url, formData);

  }

  // save(entity: Connector, isCreate: boolean): Observable<Connector> {
    
  //   let params = new HttpParams();

  //   let url = `${this.apiResource}`;

  //   if(isCreate){
  //     return this.http.post<Connector>(url, entity);
  //   }
  //   else{
  //     return this.http.put<Connector>(url, entity);
  //   }


  // }

  delete(entity: ConnectorLibrary): Observable<ConnectorLibrary> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<ConnectorLibrary>(url, this.httpOptions);
    }
    return null;
  }
}

