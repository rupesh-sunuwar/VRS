import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverDasboardComponent } from './driver-dasboard/driver-dasboard.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";
import {LoginService} from "../auth/login.service";
import {JwtService} from "../auth/jwt.service";
import {PasswordService} from "../auth/password.service";
import {MessageService} from "primeng/api";
import { ListMyVehiclesComponent } from './list-my-vehicles/list-my-vehicles.component';
import {MatCardModule} from "@angular/material/card";
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [
    DriverDasboardComponent,
    ListMyVehiclesComponent
  ],
  exports: [
    DriverDasboardComponent
  ],
    imports: [
        CommonModule,
        MatBadgeModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterLink,
        RouterOutlet,
        MatCardModule,
        ToastModule
    ],
  providers: [LoginService, JwtService, PasswordService, MessageService],
})
export class DriverModule { }
