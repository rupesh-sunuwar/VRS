import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

import {catchError, tap, throwError} from "rxjs";
import {debounce} from 'lodash';
import {JwtService} from "../auth/jwt.service";
import {LoginService} from "../auth/login.service";
import {CustomMessageService} from "../service/message-service/custom-message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
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
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.debouncedOnSubmit = debounce(this.onSubmit.bind(this), 1000);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      const credentials: any = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
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
    localStorage.setItem("token", response.token);
    const tokenPayload = this.jwtService.decodedToken();
    this.jwtService.setUserNameForUser(tokenPayload.fullName);
    this.jwtService.setRoleForUser(tokenPayload.role);
    this.jwtService.setUserStatusForUser(tokenPayload.status);
    localStorage.setItem("ngStorage-profile", JSON.stringify(tokenPayload));
    this.messageService.showSuccess('Success', 'Logged in Successfully');
    this.router.navigateByUrl('home');
  }

  private handleInvalidResponse(): void {
    this.loginService.setLoginForm(this.loginForm);
    this.router.navigate(['/signup']);
  }

  private handleError(error: any): void {
    console.log(error)
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Access Denied', errorMessage);
  }
}
