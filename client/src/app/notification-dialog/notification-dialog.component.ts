import { Component } from '@angular/core';
import {UserService} from "../service/user/user.service";

import {MatDialogRef} from "@angular/material/dialog";
import {Notification} from "rxjs";
import {capitalize} from "lodash";

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent {

  notifications!:any;
  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<NotificationDialogComponent>
  ) {}

  ngOnInit(){
     this.getNotification();
  }
  closeDialog() {
    this.dialogRef.close();
  }

  getNotification() {
    this.userService.getUserNotification().subscribe(
      (notifications) => {
        this.notifications=notifications
        console.log(this.notifications)
      },
      (error) => {
        // Handle error
        console.error('Error fetching notifications:', error);
      }
    );
  }

  handleNotificationClick(notification: any) {

  }
}
