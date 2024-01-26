// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import {HomeComponent} from "./home/home.component";

const routes: Routes = [

  {path:'home',component:HomeComponent},
  {path:'reserve',component:HomeComponent},
  {path:'about',component:HomeComponent},
  {path:'contact',component:HomeComponent},
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
