import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {VehicleService} from "../../service/vehicle.service";
import {Vehicle} from "../../model/vehicle.model";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {catchError, tap, throwError} from "rxjs";
import {LoginService} from "../../auth/login.service";

@Component({
  selector: 'app-add-vehicle-dialog',
  templateUrl: './add-vehicle-dialog.component.html',
  styleUrls: ['./add-vehicle-dialog.component.scss']
})
export class AddVehicleDialogComponent implements OnInit {
  newVehicle: Vehicle = new Vehicle(0, '', '', '', false,
    0, '');
  selectedFile!: File ;

  constructor(public dialogRef: MatDialogRef<AddVehicleDialogComponent>
    , private vehicleService: VehicleService,
              private messageService: CustomMessageService,
              private loginService:LoginService) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addVehicle(): void {
    // Set user email
    this.newVehicle.user_email = this.loginService.getSessionUserId();

    // Check if selected file exists
    if (this.selectedFile) {
      // If file exists, add vehicle with file
      this.vehicleService.addVehicle(this.newVehicle, this.selectedFile).pipe(
        tap(response => {
          const successMessage = response?.response?.message || 'Success Message';
          this.messageService.showSuccess('Message:', successMessage);
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      ).subscribe(() => {
        this.dialogRef.close(); // Close dialog after successful submission
      });
    } else {
      // If file does not exist, add vehicle without file
      this.vehicleService.addVehicle(this.newVehicle).pipe(
        tap(response => {
          const successMessage = response?.response?.message || 'Success Message';
          this.messageService.showSuccess('Message:', successMessage);
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      ).subscribe(() => {
        this.dialogRef.close(); // Close dialog after successful submission
      });
    }
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }
}
