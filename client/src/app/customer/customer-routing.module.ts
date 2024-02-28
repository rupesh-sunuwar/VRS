import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CustomerDashboardComponent} from './customer-dashboard/customer-dashboard.component';
import {ReserveComponent} from "./reserve/reserve.component";

const customerRoutes: Routes = [

  {path: 'reserve', component: ReserveComponent},
  {path: 'customer-dashboard', component: CustomerDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {
}
