import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FileListComponent } from './components/file/file-list.component';
import { FileEditComponent } from './components/file/file-edit.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { ConnectorListComponent } from './components/connector/connector-list.component';
import { ConnectorEditComponent } from './components/connector/connector-edit.component';
import { EventEditComponent } from './components/event/event-edit.component';
import { EventListComponent } from './components/event/event-list.component';
import { JobListComponent } from './components/job/job-list.component';
import { JobEditComponent } from './components/job/job-edit.component';
import { TraceListComponent } from './components/trace/trace-list.component';
import { TraceListTrackComponent } from './components/trace/trace-list-track.component';
import { TraceComponent } from './components/trace/trace.component';

const oktaConfig = {
  issuer: environment.issuer,
  redirectUri: environment.redirectUri,
  clientId: environment.clientId,
  scopes: environment.scopes
};

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'callback',
    component: OktaCallbackComponent
  },
  {
    path: 'files',
    component: FileListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'files/:id',
    component: FileEditComponent,
    canActivate: [OktaAuthGuard]
  }
  ,
  {
    path: 'connectors',
    component: ConnectorListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'connectors/:id',
    component: ConnectorEditComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'events',
    component: EventListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'events/:id',
    component: EventEditComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'jobs',
    component: JobListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'jobs/:id',
    component: JobEditComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'traces/:id/',
    component: TraceComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'traces/:tagId',
    component: TraceListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'traces/:tagId/:trackingId',
    component: TraceListTrackComponent,
    canActivate: [OktaAuthGuard]
  }
  
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OktaAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
