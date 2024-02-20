import {Component} from '@angular/core';
import {LoginService} from "../auth/login.service";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {Router} from "@angular/router";
// @ts-ignore
import _ = require("lodash");

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

    this.loginService.registerUser(this.userData).subscribe({
      next: (data: any) => {

        this.messageService.showSuccess('Success', JSON.stringify(data.data));
        const debouncedFunction = _.debounce(() => {
          this.router.navigate(['cms/users']).then(() => {
            console.log("Route success");
          });
        }, 500);
        debouncedFunction();
      },
      error: (error: any) => {
        let errorMessage = "Something went wrong!";

        if (error.error) {
          if (typeof error.error === 'object') {
            if ('code' in error.error && 'message' in error.error) {
              errorMessage = error.error.message;
            } else {
              const values = Object.values(error.error);
              errorMessage = values.map(value => JSON.stringify(value)).join('\n');
            }
          } else {
            errorMessage = error.error;
          }
        }

        this.messageService.showError('Error', errorMessage);
      }
    });
  }
}
