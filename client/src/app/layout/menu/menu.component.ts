import {Component} from '@angular/core';
import {LoginService} from "../../auth/login.service";
import {catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {CustomMessageService} from "../../service/message-service/custom-message.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private loginService: LoginService,
              private router: Router, private messageService: CustomMessageService
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
        this.loginService.clearLocalStorage();
        this.messageService.showSuccess("Success", "Logged out Successfully");
        this.router.navigateByUrl('login');
      }),
      catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    ).subscribe();
  }


  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  protected readonly LoginService = LoginService;

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Access Denied', errorMessage);
  }

  isDriver() {
    return this.loginService.getSessionRole() == "DRIVER";
  }
}
