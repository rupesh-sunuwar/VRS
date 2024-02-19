import {Component} from '@angular/core';
import {LoginService} from "../../auth/login.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private loginService:LoginService,
              ) {

  }
  badgevisible = false;

  badgevisibility() {
    this.badgevisible = true;
  }

  logout() {
    console.log("Logging out.")
    this.loginService.logout(this.loginService.getSessionUserId())
  }
}
