import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerDashboardComponent} from './customer-dashboard/customer-dashboard.component';
import {RouterOutlet} from "@angular/router";
import {ReserveComponent} from './reserve/reserve.component';
import {CustomerRoutingModule} from "./customer-routing.module";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginService} from "../auth/login.service";
import {JwtService} from "../auth/jwt.service";
import {PasswordService} from "../auth/password.service";
import {Footer, MessageService} from "primeng/api";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FooterComponent} from "../layout/footer/footer.component";
import {AppModule} from "../app.module";


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    ReserveComponent
  ],
  exports: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    CustomerRoutingModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [LoginService, JwtService, PasswordService, MessageService],
})
export class CustomerModule {
}
