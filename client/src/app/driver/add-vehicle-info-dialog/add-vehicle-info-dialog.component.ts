import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {catchError, tap, throwError} from "rxjs";
import {VehicleInfoRequest} from "../../model/vehicle-info-request";
import {TyreCondition} from "../../model/enums/tyre-condition";
import {VehicleService} from "../../service/vehicle.service";

@Component({
  selector: 'app-add-vehicle-info-dialog',
  templateUrl: './add-vehicle-info-dialog.component.html',
  styleUrls: ['./add-vehicle-info-dialog.component.scss']
})
export class AddVehicleInfoDialogComponent {

  vehicleInfoRequest: VehicleInfoRequest = new VehicleInfoRequest(1,
    true, true,
    0, TyreCondition.FAIR); // Initialize with default values

  constructor(
    public dialogRef: MatDialogRef<AddVehicleInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleService: VehicleService,
    private messageService: CustomMessageService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addVehicleInfo() {
    this.vehicleService.addVehicleInfo(this.vehicleInfoRequest)
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
