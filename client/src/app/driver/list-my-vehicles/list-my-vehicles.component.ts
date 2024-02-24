import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../../model/vehicle.model';
import {CustomMessageService} from '../../service/message-service/custom-message.service';
import {MatDialog} from '@angular/material/dialog';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {VehicleService} from '../../service/vehicle.service';
import {AddVehicleInfoDialogComponent} from "../add-vehicle-info-dialog/add-vehicle-info-dialog.component";

@Component({
  selector: 'app-list-my-vehicles',
  templateUrl: './list-my-vehicles.component.html',
  styleUrls: ['./list-my-vehicles.component.scss']
})
export class ListMyVehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    private messageService: CustomMessageService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initializeVehicles();
  }

  initializeVehicles(): void {
    this.vehicleService.getUserVehicles()
      .pipe(
        tap(response => {
          this.vehicles = response;
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  addVehicleInfo(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(AddVehicleInfoDialogComponent, {
      width: '300px',
      data: {vehicle}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  checkStatus(vehicleId: number): void {
    this.vehicleService.getVehicleStatusById(vehicleId)
      .pipe(
        tap(response => {
          console.log(response);
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  private handleError(error: any): void {

    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }
}
