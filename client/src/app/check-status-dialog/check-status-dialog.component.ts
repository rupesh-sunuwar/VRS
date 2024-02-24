import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VehicleInfoResponse} from "../model/vehicle-info-response";

@Component({
  selector: 'app-check-status-dialog',
  templateUrl: './check-status-dialog.component.html',
  styleUrls: ['./check-status-dialog.component.scss']
})
export class CheckStatusDialogComponent {
  vehicleInfoResponse: VehicleInfoResponse;

  constructor(
    public dialogRef: MatDialogRef<CheckStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicleInfoResponse: VehicleInfoResponse }
  ) {
    console.log(data);
    this.vehicleInfoResponse = data.vehicleInfoResponse;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
