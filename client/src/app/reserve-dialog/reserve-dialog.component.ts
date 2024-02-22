import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReserveRequest} from "../model/reserve-request.model";
import {BookingServiceService} from "../service/booking-service.service";
import {catchError, tap, throwError} from "rxjs";
import {CustomMessageService} from "../service/message-service/custom-message.service";

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrls: ['./reserve-dialog.component.scss']
})
export class ReserveDialogComponent {

  reserveRequest: ReserveRequest = new ReserveRequest(1, 1, '', '', 0, 1); // Initialize with default values

  constructor(
    public dialogRef: MatDialogRef<ReserveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingServiceService,
    private messageService: CustomMessageService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reserveVehicle() {
    this.bookingService.reserveVehicles(this.reserveRequest)
      .pipe(
        tap(response => {
          // Handle the response here if needed
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }
}
