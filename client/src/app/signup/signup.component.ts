import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../auth/login.service";
import {JwtService} from "../auth/jwt.service";
import {Router} from "@angular/router";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {debounce} from "lodash";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  debouncedOnSubmit!: Function;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router,
    private messageService: CustomMessageService,
  ) {
  }

  ngOnInit(): void {

    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required]
    });
    this.debouncedOnSubmit = debounce(this.onSubmit.bind(this), 1000);
  }

  get email() {
    return this.signupForm.get('email');
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get password() {
    return this.signupForm.get('password');
  }

  async onSubmit() {
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      const credentials: any = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };

      this.loginService.generateToken(credentials).pipe(
        tap(response => {
          if (this.isValidResponse(response)) {
            this.handleSuccessfulResponse(response);
          } else {
            this.handleInvalidResponse();
          }
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      ).subscribe();
    }
  }

  private isValidResponse(response: any): boolean {
    return response && response.token;
  }

  private handleSuccessfulResponse(response: any): void {
    console.log(response.token);
    localStorage.setItem("token", response.token);
    const tokenPayload = this.jwtService.decodedToken();
    console.log("TokenPayload", tokenPayload);
    this.jwtService.setUserNameForUser(tokenPayload.fullName);
    this.jwtService.setRoleForUser(tokenPayload.role);
    this.jwtService.setUserStatusForUser(tokenPayload.status);
    localStorage.setItem("ngStorage-profile", JSON.stringify(tokenPayload.token));
    this.messageService.showSuccess('Success', 'Logged in Successfully');
    this.router.navigateByUrl('home');
  }

  private handleInvalidResponse(): void {
    this.loginService.setLoginForm(this.signupForm);
    this.router.navigate(['/signup']);
  }

  private handleError(error: any): void {
    const errorMessage = error?.error?.message || 'Service not available';
    const colonIndex = errorMessage.indexOf(':');

    if (colonIndex !== -1) {
      const extractedString = errorMessage.substring(colonIndex + 1).trim();
      this.router.navigate(['/reset-password'], {queryParams: {token: extractedString}});
    }
    this.messageService.showError('Access Denied', errorMessage);
  }
}
