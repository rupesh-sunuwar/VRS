import { Component } from '@angular/core';
import {LoginService} from "../../auth/login.service";
import {Router} from "@angular/router";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutConfirmationDailogComponent} from "../../logout-confirmation-dailog/logout-confirmation-dailog.component";
import {catchError, tap, throwError} from "rxjs";
import {ContactFormComponent} from "../../contact-form/contact-form.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  constructor(private loginService: LoginService,
              private router: Router, private messageService: CustomMessageService,
              private dialog:MatDialog
  ) {

  }

  badgevisible = false;

  badgevisibility() {
    this.badgevisible = true;
  }

  logout() {
    const dialogRef = this.dialog.open(LogoutConfirmationDailogComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
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
      } else {
        // Do nothing if user canceled
      }
    });
  }


  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Access Denied', errorMessage);
  }

  openContactFormDialog() {
    console.log("Clicked.")
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '500px',
      data: { /* You can pass data to the dialog if needed */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed if needed
    });
  }

}
