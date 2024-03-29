import {Component} from '@angular/core';
import {Vehicle} from "../model/vehicle.model";
import {catchError, tap, throwError} from "rxjs";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {MatDialog} from "@angular/material/dialog";
import {ReserveDialogComponent} from "../reserve-dialog/reserve-dialog.component";
import {VehicleService} from "../service/vehicle.service";
import {VehicleInfoResponse} from "../model/vehicle-info-response";
import {CheckStatusDialogComponent} from "../check-status-dialog/check-status-dialog.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FileService} from "../service/file.service";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent {


  vehicles: Vehicle[] = []; // Assuming you have an array of vehicles
  photoDataMap: { [key: string]: SafeUrl } = {};

  constructor(private vehicleService: VehicleService,
              private messageService: CustomMessageService,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private fileService: FileService) {
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
        console.log(response);
        this.vehicles = response;
        // Fetch photo for each vehicle
        this.vehicles.forEach(vehicle => this.fetchPhoto(vehicle.vehicle_no));
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
      data: {
        vehicle:vehicle
    } // Pass any data needed by the dialog component
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

  fetchPhoto(vehicleNo: string) {
    this.fileService.fetchPhoto(vehicleNo).pipe().subscribe(
      (data:Blob)=>{
        this.convertBlobToSafeUrl(data, vehicleNo);
      }

    );
  }

  convertBlobToSafeUrl(blob: Blob, vehicleNo: string) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // Sanitize the URL to prevent XSS
      this.photoDataMap[vehicleNo] = this.sanitizer.bypassSecurityTrustUrl(base64data);
    };
    reader.readAsDataURL(blob);
  }

  getVehiclePhoto(vehicleNo: string): SafeUrl | null {
    return this.photoDataMap[vehicleNo] || null;
  }
}
