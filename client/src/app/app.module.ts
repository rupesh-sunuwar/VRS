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
import {CheckStatusDialogComponent} from './check-status-dialog/check-status-dialog.component';
import {AboutComponent} from './about/about.component';
import {ReservationListComponent} from './reservation-list/reservation-list.component';
import {CancelConfirmationComponent} from './cancel-confirmation/cancel-confirmation.component';
import {PayConfirmationComponent} from './pay-confirmation/pay-confirmation.component';
import {AcceptConfirmationComponent} from './accept-confirmation/accept-confirmation.component';
import {MessageModule} from "primeng/message";
import {RadioButtonModule} from "primeng/radiobutton";
import {AccordionModule} from "primeng/accordion";
import {PanelModule} from "primeng/panel";
import {TabViewModule} from "primeng/tabview";
import {ContactFormComponent} from './contact-form/contact-form.component';
import {MatOptionModule} from "@angular/material/core";
import {NgxEchartsModule} from "ngx-echarts";
import {NgApexchartsModule} from "ng-apexcharts";
import  * as echarts from "echarts";
import {MatIconModule} from "@angular/material/icon";
import { MyQueriesComponent } from './my-queries/my-queries.component';
import { ReplyDialogContentComponent } from './reply-dialog-content/reply-dialog-content.component';

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
    CheckStatusDialogComponent,
    AboutComponent,
    ReservationListComponent,
    CancelConfirmationComponent,
    PayConfirmationComponent,
    AcceptConfirmationComponent,
    ContactFormComponent,
    MyQueriesComponent,
    ReplyDialogContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule, HttpClientModule,
    ChipsModule, BrowserAnimationsModule,
    AppLayoutModule, FormsModule, MatCardModule,
    MatButtonModule, MatInputModule,
    MatDialogModule, MessageModule, RadioButtonModule,
    AccordionModule, PanelModule, TabViewModule,
    MatOptionModule, NgApexchartsModule,
    NgxEchartsModule.forRoot({echarts}), MatIconModule,
  ],
  providers: [LoginService, JwtService, PasswordService, MessageService,
    BookingServiceService, PaymentService, VehicleService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
