import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {catchError, tap, throwError} from "rxjs";
import {LoginService} from "../../auth/login.service";
import {MatDialog} from "@angular/material/dialog";
import {AddVehicleDialogComponent} from "../add-vehicle-dialog/add-vehicle-dialog.component";
import {LogoutConfirmationDailogComponent} from "../../logout-confirmation-dailog/logout-confirmation-dailog.component";

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss']
})
export class DriverDashboardComponent {
  constructor(private loginService: LoginService,
              private router: Router,
              private messageService: CustomMessageService,
              private dialog: MatDialog
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

  openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(AddVehicleDialogComponent, {
      width: '300px', // Set the width of the dialog
      data: {} // Pass any data needed by the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed, if needed
    });
  }
}
