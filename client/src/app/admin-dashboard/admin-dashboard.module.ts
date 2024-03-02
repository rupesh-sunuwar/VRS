import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';
import {TableModule} from "primeng/table";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ReportingDashboardComponent } from './reporting-dashboard/reporting-dashboard.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {NgxEchartsDirective} from "ngx-echarts";
import { GeographyComponent } from './geography/geography.component';
import { AnalyticsReservatioReportComponent } from './analytics-reservatio-report/analytics-reservatio-report.component';
import { UsersReservationListComponent } from './users-reservation-list/users-reservation-list.component';
import { UsersQueriesComponent } from './users-queries/users-queries.component';



@NgModule({
  declarations: [
    ListOfUsersComponent,
    AdminDashboardComponent,
    ReportingDashboardComponent,
    GeographyComponent,
    AnalyticsReservatioReportComponent,
    UsersReservationListComponent,
    UsersQueriesComponent
  ],
  exports: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    TableModule, AdminRoutingModule,
    MatBadgeModule, MatButtonModule, MatIconModule,
    MatListModule, MatSidenavModule,
    MatToolbarModule, MatTooltipModule,
    NgApexchartsModule,NgxEchartsDirective
  ]
})
export class AdminDashboardModule { }
