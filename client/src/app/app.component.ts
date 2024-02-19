import {Component} from '@angular/core';
import {LoginService} from "./auth/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private loginService: LoginService,
  ) {
  }

  isLogggedIn() {
    return this.loginService.isLoggedIn();
  }
}
