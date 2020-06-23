import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { File } from '../models/file.model';
import { inherits } from 'util';
import { ApiBaseService } from './api-base.service';


@Injectable()
export class FileService  extends ApiBaseService {

  fileList: File[] = [];

  private apiResource = this.apiURL.concat("files");

  findById(id: string): Observable<File> {
    const url = `${this.apiResource}/${id}`;
    const params = { id: id };
    

    return this.http.get<File>(url, this.httpOptions);
    
  }

  load(filter: any): void {
    this.find(filter).subscribe(result => {
        this.fileList = result;
      }
    );
  }

  find(filter: any): Observable<File[]> {
    
    const params = {
    };

    const url = `${this.apiResource}/list`;

    return this.http.get<File[]>(url, this.httpOptions);
    
  }

  
  lookup(): Observable<File[]> {

    const url = `${this.apiResource}/lookup`;

    return this.http.get<File[]>(url, this.httpOptions);
    
  }

  save(formData: FormData): Observable<File> {
    
    let params = new HttpParams();

    let url = `${this.apiResource}`;

    return this.http.post<File>(url, formData);

  }

  delete(entity: File): Observable<File> {
    let url = '';
    if (entity.id) {
      url = `${this.apiResource}/${entity.id.toString()}`;
      return this.http.delete<File>(url, this.httpOptions);
    }
    return null;
  }
}

