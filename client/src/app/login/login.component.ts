import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

import {catchError, tap} from "rxjs";
import * as Bowser from "bowser";
import { debounce } from 'lodash';
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
  browserName!: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router,
    private messageService: CustomMessageService,
  ) {
  }

  ngOnInit(): void {
    if ((navigator as any).brave) {
      this.browserName = "Brave";
    } else {
      this.browserName = Bowser.getParser(window.navigator.userAgent).getBrowserName();
    }

    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/cms/dashboard']);
    }
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  debouncedOnSubmit = debounce(this.onSubmit, 1000);

  async onSubmit() {
    if (this.loginForm.valid) {
      const credentials: any = {
        email: this.loginForm.value.username,
        password: this.loginForm.value.password,
        browser_name: this.browserName,
        login_OTP: ""
      };

      this.loginService.generateToken(credentials).pipe(
        tap(response => {

          if (response.data.security_option === 'TWO_FA') {
            localStorage.removeItem('ngStorage-profile');
            localStorage.removeItem('token');
            localStorage.removeItem('booleanValue');

            localStorage.setItem("temp-username", this.loginForm.value.username);
            localStorage.setItem("temp-user-auth", response.data.security_option);
            this.router.navigate(['/two-factor-auth']);
          } else {
            if (response.data.token !== null) {
              localStorage.setItem("token", response.data.token);
              const tokenPayload = this.jwtService.decodedToken();
              this.jwtService.setUserNameForUser(tokenPayload.token.full_name);
              this.jwtService.setRoleForUser(tokenPayload.token.role);
              this.jwtService.setPermissionForUser(tokenPayload.token.permissions);
              this.jwtService.setUserStatusForUser(tokenPayload.token.user_status);

              localStorage.setItem("ngStorage-profile", JSON.stringify(tokenPayload.token));
              localStorage.setItem("show-cms-tutorial", response.data.view_cms_tutorial);

              this.messageService.showSuccess('Success', 'Logged in Successfully');
              this.router.navigateByUrl('signup');
            } else {
              this.loginService.setLoginForm(this.loginForm);
              this.router.navigate(['/signup']);
            }
          }
        }),
        catchError(error => {
          const errorMessage = error?.error?.message || 'Service not available';
          const colonIndex = errorMessage.indexOf(':');

          if (colonIndex !== -1) {
            const extractedString = errorMessage.substring(colonIndex + 1).trim();
            this.router.navigate(['/reset-password'], {queryParams: {token: extractedString}});
          }
          this.messageService.showError('Access Denied', errorMessage);
          return [];
        })
      ).subscribe();
    }
  }
}
