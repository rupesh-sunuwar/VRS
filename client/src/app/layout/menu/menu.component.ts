import {Component} from '@angular/core';
import {LoginService} from "../../auth/login.service";
import {catchError, finalize, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private loginService:LoginService,
              private router:Router
              ) {

  }
  badgevisible = false;

  badgevisibility() {
    this.badgevisible = true;
  }

  logout() {
    const userId = this.loginService.getSessionUserId();

    this.loginService.logout(userId).pipe(
      tap(response => {
        console.log("Success",response)
        this.loginService.clearLocalStorage();
        this.router.navigate(['/login']);

      }),
      catchError(error => {
        return throwError(error);
      })
    ).subscribe();
  }



  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  protected readonly LoginService = LoginService;
}
