import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {CustomerDashboardComponent} from "./customer/customer-dashboard/customer-dashboard.component";
import {authGuard} from "./auth/auth.guard";
import {DriverDashboardComponent} from "./driver/driver-dasboard/driver-dashboard.component";
import {HomeComponent} from "./home/home.component";
import {VehiclesListComponent} from "./vehicles-list/vehicles-list.component";
import {EsewaIntegrationComponent} from "./esewa-integration/esewa-integration.component";
import {ListMyVehiclesComponent} from "./driver/list-my-vehicles/list-my-vehicles.component";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'signup', component: SignupComponent
  },{
  path:'payment',component:EsewaIntegrationComponent
  },
  {path: 'login', component: LoginComponent},
  {path: 'vehicles', component: VehiclesListComponent},
  {path: 'vehicle', component: ListMyVehiclesComponent},
  {
    path: 'customer', component: CustomerDashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
        canActivate: [authGuard],
      }
    ]
  },

  {
    path: 'driver', component: DriverDashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./driver/driver.module').then((m) => m.DriverModule),
        canActivate: [authGuard],
      }
    ]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
