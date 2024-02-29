import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DriverDashboardComponent} from './driver-dasboard/driver-dashboard.component';
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
import {ListMyVehiclesComponent} from './list-my-vehicles/list-my-vehicles.component';
import {MatCardModule} from "@angular/material/card";
import {ToastModule} from "primeng/toast";
import {AddVehicleDialogComponent} from './add-vehicle-dialog/add-vehicle-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AddVehicleInfoDialogComponent} from './add-vehicle-info-dialog/add-vehicle-info-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ReservationRequestComponent } from './reservation-request/reservation-request.component';


@NgModule({
  declarations: [
    DriverDashboardComponent,
    ListMyVehiclesComponent,
    AddVehicleDialogComponent,
    AddVehicleInfoDialogComponent,
    ReservationRequestComponent
  ],
  exports: [
    DriverDashboardComponent
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
        ToastModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTooltipModule
    ],
  providers: [LoginService, JwtService,
    PasswordService, MessageService],
})
export class DriverModule {
}
