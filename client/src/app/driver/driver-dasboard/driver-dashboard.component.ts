import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {catchError, tap, throwError} from "rxjs";
import {LoginService} from "../../auth/login.service";
import {MatDialog} from "@angular/material/dialog";
import {AddVehicleDialogComponent} from "../add-vehicle-dialog/add-vehicle-dialog.component";
import {LogoutConfirmationDailogComponent} from "../../logout-confirmation-dailog/logout-confirmation-dailog.component";
import {ContactFormComponent} from "../../contact-form/contact-form.component";
import {NotificationDialogComponent} from "../../notification-dialog/notification-dialog.component";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss']
})
export class DriverDashboardComponent {

  unreadCount!:number;
  notifications!:any;

  constructor(private loginService: LoginService,
              private router: Router,
              private messageService: CustomMessageService,
              private dialog: MatDialog,
              private userService:UserService
  ) {

  }

  ngOnInit(){
    this.getNotification();

  }

  getNotification() {
    this.userService.getUserNotification().subscribe(
      (notifications) => {
        this.notifications=notifications
        this.unreadCount= this.notifications.length;

      },
      (error) => {
        // Handle error
        console.error('Error fetching notifications:', error);
      }
    );
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

  openNotificationDialog() {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      width: '400px', // Adjust the width as needed
      maxHeight: '80vh', // Maximum height to make it scrollable
      data: { /* Pass any data needed by the dialog */ }
    });
  }
}
