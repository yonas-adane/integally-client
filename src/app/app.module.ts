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
import { ConnectorListComponent } from './components/connector/connector.component';
import { ConnectorService } from './services/connector.service';
import { JobService } from './services/job.service';
import { TraceService } from './services/trace.service';
import { TraceComponent } from './components/trace/trace.component';
import { TraceInstanceListComponent } from './components/trace/trace-instance-list.component';
import { TraceListComponent } from './components/trace/trace-list.component';
import { LookupGroupComponent } from './components/lookup/lookup-group.component';
import { LookupGroupService } from './services/lookup-group.service';
import { MessageTemplateService } from './services/message-template.service';
import { AppInfoService } from './services/app-info.service';
import { AppInfoComponent } from './components/about/app-info.component';
import { ConnectorSettingComponent } from './components/connector/connector-setting.component';
import { ConnectorSettingService } from './services/connector-setting.service';
import { LookupComponent } from './components/lookup/lookup.component';
import { LookupService } from './services/lookup.service';
import { MessageTemplateComponent } from './components/message-template/message-template.component';
import { MessageAttributeService } from './services/message-attribute.service';
import { MessageAttributeComponent } from './components/message-template/message-attribute.component';
import { MessageTemplateMapComponent } from './components/mapping-template/message-template-map.component';
import { MessageTemplateMapService } from './services/message-template-map.service';
import { MessageAttributeMapComponent } from './components/mapping-template/message-attribute-map.component';
import { MessageAttributeMapService } from './services/message-attribute-map.service';
import { EventTemplateComponent } from './components/event/event-template.component';
import { EventTemplateService } from './services/event-template.service';
import { JobComponent } from './components/job/job.component';
import { EventMessageComponent } from './components/event/event-message.component';
import { EventMessageService } from './services/event-message.service';
import { ConnectorLibraryComponent } from './components/connector/connector-library.component';
import { ConnectorLibraryService } from './services/connector-library.service';
import { EventMessageEditComponent } from './components/event/event-message-edit.component';
import { EventTemplateEditComponent } from './components/event/event-template-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    FileEditComponent,
    HomeComponent,
    AlertComponent,
    ConnectorListComponent,
    TraceInstanceListComponent,
    TraceComponent,
    TraceListComponent,
    LookupGroupComponent, 
    MessageTemplateComponent,
    AppInfoComponent,
    ConnectorSettingComponent,
    LookupComponent,
    MessageAttributeComponent,
    MessageTemplateMapComponent,
    MessageAttributeMapComponent,
    EventTemplateComponent,
    JobComponent,
    EventMessageComponent,
    ConnectorLibraryComponent,
    EventMessageEditComponent,
    EventTemplateEditComponent
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
    JobService,
    TraceService,
    LookupGroupService,
    MessageTemplateService,
    AppInfoService,
    ConnectorSettingService,
    LookupService,
    MessageAttributeService,
    MessageTemplateMapService,
    MessageAttributeMapService,
    EventTemplateService,
    JobService,
    EventMessageService,
    ConnectorLibraryService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
