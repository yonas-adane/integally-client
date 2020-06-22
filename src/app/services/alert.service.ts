import { Injectable, NgZone } from '@angular/core';
import { Alert } from '../models/alert.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

  alert = new Subject<Alert>();

  showSuccess(message: Alert): void {
    this.alert.next(message);
  }

  showError(message: Alert): void {
    this.alert.next(message);
  }

}