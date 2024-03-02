import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-accept-confirmation',
  templateUrl: './accept-confirmation.component.html',
  styleUrls: ['./accept-confirmation.component.scss']
})
export class AcceptConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<AcceptConfirmationComponent>
  ) {
  }

  onConfirm() {
    this.dialogRef.close(true); // Send confirmation to parent component
  }

  onCancel() {
    this.dialogRef.close(false); // Close dialog without confirmation
  }
}
