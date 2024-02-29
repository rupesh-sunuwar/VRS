// app-routing.module.ts

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationRequestComponent} from "./reservation-request/reservation-request.component";

const routes: Routes = [
  {
    path: 'reservation-request', component: ReservationRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRoutingModule {
}
