import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReserveRequest} from "../model/reserve-request.model";
import {BookingServiceService} from "../service/booking-service.service";
import {catchError, tap, throwError} from "rxjs";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {LoginService} from "../auth/login.service";
import {Router} from "@angular/router";
import {Vehicle} from "../model/vehicle.model";
import {VehicleInfoResponse} from "../model/vehicle-info-response";

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrls: ['./reserve-dialog.component.scss']
})
export class ReserveDialogComponent {

  reserveRequest: ReserveRequest = new ReserveRequest(1, 1, '', '',
    0, '', ''); // Initialize with default values

  vehicle!: Vehicle;

  constructor(
    public dialogRef: MatDialogRef<ReserveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: Vehicle },
    private bookingService: BookingServiceService,
    private messageService: CustomMessageService,
    private loginService: LoginService,
    private router: Router,
  ) {
    console.log(data)
    this.vehicle = data.vehicle;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reserveVehicle() {
    console.log(this.loginService.getSessionUserId());
    this.reserveRequest.user_email = this.loginService.getSessionUserId();
    this.reserveRequest.vehicle_id = this.vehicle.vehicle_id;
    this.bookingService.reserveVehicles(this.reserveRequest)
      .pipe(
        tap(response => {
          this.messageService.showSuccess("Message", "Reserved Successfully.");
          this.resetForm();
          this.dialogRef.close();
          this.router.navigate(['/home']);
        }),
        catchError(error => {
          this.handleError(error);
          this.resetForm();
          return throwError(error);
        })
      )
      .subscribe();
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }

  resetForm() {
    this.reserveRequest = new ReserveRequest(1, 1, '', '',
      0, '', ''); // Initial
  }
}
