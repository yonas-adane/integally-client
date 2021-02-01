import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Subject } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'integally';
  isAuthenticated: boolean;
  name: string;
  preferred_username: string;

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(public oktaAuth: OktaAuthService, private loaderService: LoaderService) {
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  async ngOnInit() {

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  

    if (this.isAuthenticated) {
    
      // Get user information
      const userInfo = this.oktaAuth.getUser();

      this.name = (await userInfo).name;
      this.preferred_username = (await userInfo).preferred_username;

    }

  }

}