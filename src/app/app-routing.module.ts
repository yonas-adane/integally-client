import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FileListComponent } from './components/file/file-list.component';
import { FileEditComponent } from './components/file/file-edit.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { ConnectorListComponent } from './components/connector/connector-list.component';
import { ConnectorEditComponent } from './components/connector/connector-edit.component';

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
  },
  {
    path: 'callback',
    component: OktaCallbackComponent
  },
  {
    path: 'files',
    component: FileListComponent
  },
  {
    path: 'files/:id',
    component: FileEditComponent
  }
  ,
  {
    path: 'connectors',
    component: ConnectorListComponent
  },
  {
    path: 'connectors/:id',
    component: ConnectorEditComponent
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
