import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-pay-confirmation',
  templateUrl: './pay-confirmation.component.html',
  styleUrls: ['./pay-confirmation.component.scss']
})
export class PayConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<PayConfirmationComponent>
  ) {
  }

  onConfirm() {
    this.dialogRef.close(true); // Send confirmation to parent component
  }

  onCancel() {
    this.dialogRef.close(false); // Close dialog without confirmation
  }
}
