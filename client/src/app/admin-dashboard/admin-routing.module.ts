import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListOfUsersComponent} from "./list-of-users/list-of-users.component";
import {ReportingDashboardComponent} from "./reporting-dashboard/reporting-dashboard.component";


const adminRoutes: Routes = [
  {path: 'users', component: ListOfUsersComponent},
  {path: "reporting", component: ReportingDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
