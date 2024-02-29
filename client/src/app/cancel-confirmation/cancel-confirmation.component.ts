import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cancel-confirmation',
  templateUrl: './cancel-confirmation.component.html',
  styleUrls: ['./cancel-confirmation.component.scss']
})
export class CancelConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<CancelConfirmationComponent>
  ) {
  }

  onConfirm() {
    this.dialogRef.close(true); // Send confirmation to parent component
  }

  onCancel() {
    this.dialogRef.close(false); // Close dialog without confirmation
  }
}
