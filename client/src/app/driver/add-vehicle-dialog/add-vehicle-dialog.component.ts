import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {VehicleService} from "../../service/vehicle.service";
import {Vehicle} from "../../model/vehicle.model";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-add-vehicle-dialog',
  templateUrl: './add-vehicle-dialog.component.html',
  styleUrls: ['./add-vehicle-dialog.component.scss']
})
export class AddVehicleDialogComponent implements OnInit {
  newVehicle: Vehicle = new Vehicle(0, '', '', '', false,
    0,'');
  selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<AddVehicleDialogComponent>
    , private vehicleService: VehicleService,
              private messageService: CustomMessageService) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addVehicle(): void {
    // Implement logic to add the new vehicle
    // You can send the newVehicle object along with the selected file to your backend API
    console.log('New vehicle:');
    console.log('Selected file:', this.selectedFile);
    console.log('response')
    this.vehicleService.addVehicle(this.newVehicle).pipe(
      tap(response => {
        const successMessage = response?.response?.message || 'Success Message';
        this.messageService.showSuccess('Message:',
          successMessage);
      }),
      catchError(error => {
        this.handleError(error);
        return throwError(error);
      })).subscribe();
    this.dialogRef.close();
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }
}
