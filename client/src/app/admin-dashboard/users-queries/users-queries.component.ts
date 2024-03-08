import {Component} from '@angular/core';
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {ContactForm} from "../../model/contact-from";
import {catchError, pipe, tap, throwError} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ReplyDialogContentComponent} from "../../reply-dialog-content/reply-dialog-content.component";

@Component({
  selector: 'app-users-queries',
  templateUrl: './users-queries.component.html',
  styleUrls: ['./users-queries.component.scss']
})
export class UsersQueriesComponent {

  messages: ContactForm[] = []

  constructor(private messageService: CustomMessageService,
              private dialog:MatDialog) {

  }

  ngOnInit(){
    this.getUsersQueries();
  }

  getUsersQueries() {
    this.messageService.getAllUsersMessage().pipe(
      tap(response => {
        this.messageService.showSuccess("Message", "Reserved Successfully.");
        this.messages = response;
        console.log(response)
      }),
      catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    )
      .subscribe();
  }

  openReplyDialog(contactForm: ContactForm) {
    const dialogRef = this.dialog.open(ReplyDialogContentComponent, {
      width: '400px', // Adjust width as needed
      data: {contactForm: contactForm } // Pass message data to the reply dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }
}
