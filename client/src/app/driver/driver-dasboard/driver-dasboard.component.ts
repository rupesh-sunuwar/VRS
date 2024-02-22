import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {catchError, tap, throwError} from "rxjs";
import {LoginService} from "../../auth/login.service";

@Component({
  selector: 'app-driver-dasboard',
  templateUrl: './driver-dasboard.component.html',
  styleUrls: ['./driver-dasboard.component.scss']
})
export class DriverDasboardComponent {
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


  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Access Denied', errorMessage);
  }
}
