import {Component} from '@angular/core';
import {Vehicle} from "../model/vehicle.model";
import {catchError, tap, throwError} from "rxjs";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {MatDialog} from "@angular/material/dialog";
import {ReserveDialogComponent} from "../reserve-dialog/reserve-dialog.component";
import {VehicleService} from "../service/vehicle.service";
import {VehicleInfoResponse} from "../model/vehicle-info-response";
import {CheckStatusDialogComponent} from "../check-status-dialog/check-status-dialog.component";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent {


  vehicles: Vehicle[] = []; // Assuming you have an array of vehicles

  constructor(private vehicleService: VehicleService,
              private messageService: CustomMessageService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Initialize your vehicles array here, perhaps by fetching data from a service
    this.initializeVehicles();
  }

  initializeVehicles() {
    // Fetch vehicles from a service or hardcode them here
    // For example:
    this.vehicleService.getVehicles().pipe(
      tap(response => {
        this.vehicles = response;
      }),
      catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    ).subscribe();
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Not Available', errorMessage);
  }

  reserveVehicle(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(ReserveDialogComponent, {
      width: '300px', // Set the width of the dialog
      data: {vehicle} // Pass any data needed by the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed, if needed
    });
  }

  checkStatus(vehicleId: number): void {
    this.vehicleService.getVehicleStatusById(vehicleId)
      .pipe(
        tap(response => {
          console.log(response);
          this.openStatusDialog(response);
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  private openStatusDialog(vehicleInfoResponse: VehicleInfoResponse): void {
    const dialogRef = this.dialog.open(CheckStatusDialogComponent, {
      width: '300px',
      data: {
        vehicleInfoResponse: vehicleInfoResponse
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The status dialog was closed');
    });
  }
}
