import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {catchError, tap, throwError} from "rxjs";
import {VehicleInfoRequest} from "../../model/vehicle-info-request";
import {TyreCondition} from "../../model/enums/tyre-condition";
import {VehicleService} from "../../service/vehicle.service";
import {Vehicle} from "../../model/vehicle.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-vehicle-info-dialog',
  templateUrl: './add-vehicle-info-dialog.component.html',
  styleUrls: ['./add-vehicle-info-dialog.component.scss']
})
export class AddVehicleInfoDialogComponent {

  vehicleInfoRequest: VehicleInfoRequest = new VehicleInfoRequest(0); // Initialize with default values

  vehicle1!: Vehicle;

  constructor(
    public dialogRef: MatDialogRef<AddVehicleInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      vehicle: Vehicle
    },
    private vehicleService: VehicleService,
    private messageService: CustomMessageService,
    private router:Router
  ) {
    this.vehicle1 = data.vehicle;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addVehicleInfo() {
    if (this.vehicle1 && this.vehicle1.vehicle_id) {
      this.vehicleInfoRequest.vehicle_id = this.data.vehicle.vehicle_id;
      this.vehicleService.addVehicleInfo(this.vehicleInfoRequest)
        .pipe(
          tap(response => {
            console.log(response);
            this.messageService.showSuccess("Successfully Added",'')
            this.resetForm();
            this.dialogRef.close();
            this.navigateToVehicleList();
          }),
          catchError(error => {
            this.handleError(error);
            return throwError(error);
          })
        )
        .subscribe();
    } else {
      console.error("Vehicle ID is not available.");
    }
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }

 resetForm(){
    this.vehicleInfoRequest=new VehicleInfoRequest(1,false,
      false, true,
      0, TyreCondition.FAIR);
}

  navigateToVehicleList() {
    this.router.navigate(['/vehicle']); // Navigate to vehicle list page
  }
}

