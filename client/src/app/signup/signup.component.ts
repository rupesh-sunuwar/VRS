import {Component} from '@angular/core';
import {LoginService} from "../auth/login.service";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService,
              private messageService: CustomMessageService,
              private router: Router) {
  }


  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      mobile:['',Validators.required],

    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get firstName() {
    return this.signupForm.get('first_name');
  }

  get lastName() {
    return this.signupForm.get('last_name');
  }

  get mobile() {
    return this.signupForm.get('mobile');
  }

  onSubmit() {

    if (this.signupForm.valid) {
      const userData = {
        first_name: this.signupForm.value.first_name,
        last_name: this.signupForm.value.last_name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        mobile: this.signupForm.value.mobile,
        is_driver: !!this.signupForm.value.is_driver // If exist true then false.
      };

      this.loginService.registerUser(userData).pipe(
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
  }

  resetForm() {
    this.signupForm.reset({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      mobile: '',
      is_driver: false // Adjusted to match the form control name
    });
  }


  private handleError(error: any): void {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Access Denied', errorMessage);
  }
}
