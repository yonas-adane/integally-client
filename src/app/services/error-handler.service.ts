import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AlertService } from './alert.service';
import { Alert } from '../models/alert.model';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }
  
  handleError(error: Error | HttpErrorResponse) {

    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(AlertService);

    let message;

    let alert: Alert = new Alert();

    if (error instanceof HttpErrorResponse) {
      // Server error
      
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);

      alert.type = 'danger';
      alert.message = message;

    } else {

      // Client Error
      message = errorService.getClientErrorMessage(error);

      alert.type = 'danger';
      alert.message = message;
      
    }

    // pass error message to notifier
    notifier.showError(alert);

  }

}