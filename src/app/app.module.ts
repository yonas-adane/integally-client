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
import { EventListComponent } from './components/event/event-list.component';
import { EventEditComponent } from './components/event/event-edit.component';
import { EventService } from './services/event.service';
import { JobService } from './services/job.service';
import { JobListComponent } from './components/job/job-list.component';
import { JobEditComponent } from './components/job/job-edit.component';
import { TraceService } from './services/trace.service';
import { TraceComponent } from './components/trace/trace.component';
import { TraceInstanceListComponent } from './components/trace/trace-instance-list.component';
import { TraceListComponent } from './components/trace/trace-list.component';
import { LookupListComponent } from './components/lookup/lookup-list.component';
import { MappingTemplateListComponent } from './components/mapping-template/mapping-template-list.component';
import { MessageTemplateListComponent } from './components/message-template/message-template-list.component';
import { LookupService } from './services/lookup.service';
import { MappingTemplateService } from './services/mapping-template.service';
import { MessageTemplateService } from './services/message-template.service';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    FileEditComponent,
    HomeComponent,
    AlertComponent,
    ConnectorListComponent,
    ConnectorEditComponent,
    EventListComponent,
    EventEditComponent,
    JobListComponent,
    JobEditComponent,
    TraceInstanceListComponent,
    TraceComponent,
    TraceListComponent,
    LookupListComponent, 
    MappingTemplateListComponent, 
    MessageTemplateListComponent
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
    EventService,
    JobService,
    TraceService,
    LookupService,
    MappingTemplateService,
    MessageTemplateService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
