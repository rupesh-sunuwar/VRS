import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-logout-confirmation-dailog',
  templateUrl: './logout-confirmation-dailog.component.html',
  styleUrls: ['./logout-confirmation-dailog.component.scss']
})
export class LogoutConfirmationDailogComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutConfirmationDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Close the dialog with "No" response
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Close the dialog with "Yes" response
  }
}
