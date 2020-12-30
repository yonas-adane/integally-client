import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';

@Injectable()
export class AboutService  extends ApiBaseService {

  stats: any;

  private apiResource = this.apiURL.concat("about");

  load(): void {
    this.find().subscribe(result => {
        this.stats = result;
      }
    );
  }

  find(): Observable<any> {
  
    const url = `${this.apiResource}`;

    return this.http.get<any>(url, this.httpOptions);
    
  }

  
}

