import {Component} from '@angular/core';
import {LoginService} from "../auth/login.service";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private loginService: LoginService,
              private messageService: CustomMessageService,
              private router: Router) {
  }

  userData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile: '',
    isDriver: false
  };

  onSubmit() {
    this.loginService.registerUser(this.userData).pipe(
      tap(response => {
        // Handle successful registration
        this.messageService.showSuccess('Success', JSON.stringify(response));
        this.router.navigate(['/login']).then(() => {
          console.log("Route success");
        });
        this.resetForm();
      }),
      catchError(error => {
        // Handle registration error
        this.handleError(error);
        return throwError(error);
      })
    ).subscribe();
  }

  resetForm() {
    // Reset the form using the reset() method of NgForm
    // Clear the userData object
    this.userData = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      mobile: '',
      isDriver: false
    };
  }

  private handleError(error: any): void {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Access Denied', errorMessage);
  }
}
