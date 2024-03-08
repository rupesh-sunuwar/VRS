import { Component } from '@angular/core';
import {ContactForm} from "../model/contact-from";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {catchError, tap, throwError} from "rxjs";
import {LoginService} from "../auth/login.service";
import {ReplyDialogContentComponent} from "../reply-dialog-content/reply-dialog-content.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-my-queries',
  templateUrl: './my-queries.component.html',
  styleUrls: ['./my-queries.component.scss']
})
export class MyQueriesComponent {



  messages: ContactForm[] = [];
  userMessages:ContactForm[]=[];
  email!:string;
  showReplies!: boolean;

  constructor(private messageService: CustomMessageService,
              private loginService:LoginService,
              private dialog:MatDialog) {

  }

  ngOnInit(){
    this.email=this.loginService.getSessionUserId();
    this.getUserQueries();
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

  getUserQueries(){
    this.messageService.getUserMessage().pipe(
      tap(response => {
        this.messageService.showSuccess("Message", "Get User Message Successfully.");
        this.userMessages = response;
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
