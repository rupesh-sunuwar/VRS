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
import {HomeComponent} from './home/home.component';
import {CustomerRoutingModule} from "./customer/customer-routing.module";
import {DriverRoutingModule} from "./driver/driver-routing.module";
import {VehiclesListComponent} from './vehicles-list/vehicles-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ReserveDialogComponent} from './reserve-dialog/reserve-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {EsewaIntegrationComponent} from './esewa-integration/esewa-integration.component';
import {BookingServiceService} from "./service/booking-service.service";
import {PaymentService} from "./service/payment.service";
import {VehicleService} from "./service/vehicle.service";
import {LogoutConfirmationDailogComponent} from "./logout-confirmation-dailog/logout-confirmation-dailog.component";
import { CheckStatusDialogComponent } from './check-status-dialog/check-status-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    VehiclesListComponent,
    ReserveDialogComponent,
    EsewaIntegrationComponent,
    LogoutConfirmationDailogComponent,
    CheckStatusDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerRoutingModule,
    DriverRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule, HttpClientModule, ChipsModule, BrowserAnimationsModule, AppLayoutModule, FormsModule, MatCardModule, MatButtonModule, MatInputModule, MatDialogModule
  ],
  providers: [LoginService, JwtService, PasswordService, MessageService,
    BookingServiceService, PaymentService, VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
