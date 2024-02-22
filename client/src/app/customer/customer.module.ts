import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerDashboardComponent} from './customer-dashboard/customer-dashboard.component';
import {RouterOutlet} from "@angular/router";
import {ReserveComponent} from './reserve/reserve.component';
import {AboutComponent} from './about/about.component';
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
import {MessageService} from "primeng/api";


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    ReserveComponent,
    AboutComponent
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
    MatToolbarModule
  ],
  providers: [LoginService, JwtService, PasswordService, MessageService],
})
export class CustomerModule {
}
