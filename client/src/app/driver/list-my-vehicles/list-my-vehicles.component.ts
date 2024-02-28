import {Component, OnInit} from '@angular/core';
import {Vehicle} from '../../model/vehicle.model';
import {CustomMessageService} from '../../service/message-service/custom-message.service';
import {MatDialog} from '@angular/material/dialog';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {VehicleService} from '../../service/vehicle.service';
import {AddVehicleInfoDialogComponent} from "../add-vehicle-info-dialog/add-vehicle-info-dialog.component";
import {CheckStatusDialogComponent} from "../../check-status-dialog/check-status-dialog.component";
import {VehicleInfoResponse} from "../../model/vehicle-info-response";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FileService} from "../../service/file.service";

@Component({
  selector: 'app-list-my-vehicles',
  templateUrl: './list-my-vehicles.component.html',
  styleUrls: ['./list-my-vehicles.component.scss']
})
export class ListMyVehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  photoDataMap: { [key: string]: SafeUrl } = {};

  constructor(
    private vehicleService: VehicleService,
    private messageService: CustomMessageService,
    private dialog: MatDialog, private sanitizer: DomSanitizer,
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.initializeVehicles();
  }

  initializeVehicles(): void {
    this.vehicleService.getUserVehicles().pipe(
      tap(response => {
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

  addVehicleInfo(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(AddVehicleInfoDialogComponent, {
      width: '300px',
      data: {vehicle: vehicle}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

  private handleError(error: any): void {

    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }

  fetchPhoto(vehicleNo: string) {
    this.fileService.fetchPhoto(vehicleNo).pipe().subscribe(
      (data: Blob) => {
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
