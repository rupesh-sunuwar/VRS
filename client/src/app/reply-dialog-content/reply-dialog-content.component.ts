import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContactForm} from "../model/contact-from";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-reply-dialog-content',
  templateUrl: './reply-dialog-content.component.html',
  styleUrls: ['./reply-dialog-content.component.scss']
})
export class ReplyDialogContentComponent {
  replyText!: string;
  contactForm!: ContactForm;

  constructor(
    public dialogRef: MatDialogRef<ReplyDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      contactForm: ContactForm
    }, private messageService: CustomMessageService) {
    this.contactForm = data.contactForm;
  }

  cancelReply(): void {
    this.dialogRef.close();
  }

  sendReply(): void {

    this.contactForm.replies.push(this.replyText);
    this.messageService.postContactForm(this.contactForm)
      .pipe(
        tap(response => {
          this.messageService.showSuccess("Message", "Send Message Successfully.");
          this.dialogRef.close();
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      )
      .subscribe();
    this.dialogRef.close(this.replyText);
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }
}
