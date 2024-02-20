import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LoginService} from "./auth/login.service";
import {JwtService} from "./auth/jwt.service";
import {PasswordService} from "./auth/password.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {SignupComponent} from './signup/signup.component';
import {HttpClientModule} from "@angular/common/http";
import {ChipsModule} from "primeng/chips";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppLayoutModule} from "./layout/app.layout.module";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule, HttpClientModule, ChipsModule, BrowserAnimationsModule, AppLayoutModule, FormsModule
  ],
  providers: [LoginService, JwtService, PasswordService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
