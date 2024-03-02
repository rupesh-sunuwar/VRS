import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListOfUsersComponent} from "./list-of-users/list-of-users.component";
import {ReportingDashboardComponent} from "./reporting-dashboard/reporting-dashboard.component";
import {UsersReservationListComponent} from "./users-reservation-list/users-reservation-list.component";
import {UsersQueriesComponent} from "./users-queries/users-queries.component";


const adminRoutes: Routes = [
  {path: 'users', component: ListOfUsersComponent},
  {path: "reporting", component: ReportingDashboardComponent},
  {path: "users-reservation", component: UsersReservationListComponent},
  {path:"queries",component:UsersQueriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
