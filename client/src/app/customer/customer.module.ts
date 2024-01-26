import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { ReserveComponent } from './reserve/reserve.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    CustomerDashboardComponent,
    HomeComponent,
    ReserveComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ]
})
export class CustomerModule { }
