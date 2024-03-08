import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ContactForm} from "../model/contact-from";
import {catchError, tap, throwError} from "rxjs";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {Router} from "@angular/router";
import {LoginService} from "../auth/login.service";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  contactFormModel: ContactForm = new ContactForm(
    '', '', '', '', '',
    '', ''
  );

  constructor(
    public dialogRef: MatDialogRef<ContactFormComponent>,
    private messageService: CustomMessageService,
    private router: Router,
    private loginService:LoginService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addContact() {
    this.contactFormModel.email=this.loginService.getSessionUserId();
    this.messageService.postContactForm(this.contactFormModel)
      .pipe(
        tap(response => {
          console.log(response);
          this.messageService.showSuccess("Successfully Added", '')
          this.resetForm();
          this.dialogRef.close();
          this.navigateToHome();
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      )
      .subscribe();
  }


  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }

  resetForm() {
    this.contactFormModel = new ContactForm('',
      '', '', '', '', '');
  }

  navigateToHome() {
    this.router.navigate(['/home']); // Navigate to vehicle list page
  }


}
