import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileService } from './services/file.service';
import { FileListComponent } from './components/file/file-list.component';
import { FileEditComponent } from './components/file/file-edit.component';
import { HomeComponent } from './components/home/home.component';
import { LoaderService } from './services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ErrorHandlerService } from './services/error-handler.service';
import { AlertComponent } from './shared/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatsService } from './services/stats.service';
import { ConnectorListComponent } from './components/connector/connector-list.component';
import { ConnectorService } from './services/connector.service';
import { ConnectorEditComponent } from './components/connector/connector-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    FileEditComponent,
    HomeComponent,
    AlertComponent,
    ConnectorListComponent,
    ConnectorEditComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [FileService,
    LoaderService,
    ErrorHandlerService,
    StatsService,
    ConnectorService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
