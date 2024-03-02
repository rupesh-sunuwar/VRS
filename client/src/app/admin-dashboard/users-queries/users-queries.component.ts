import {Component} from '@angular/core';
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {ContactForm} from "../../model/contact-from";
import {catchError, pipe, tap, throwError} from "rxjs";

@Component({
  selector: 'app-users-queries',
  templateUrl: './users-queries.component.html',
  styleUrls: ['./users-queries.component.scss']
})
export class UsersQueriesComponent {

  messages: ContactForm[] = []

  constructor(private messageService: CustomMessageService) {

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


  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }
}
