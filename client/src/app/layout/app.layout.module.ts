import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from "./menu/menu.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from "./header/header.component";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatBadgeModule} from "@angular/material/badge";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {CustomerModule} from "../customer/customer.module";
import {DriverModule} from "../driver/driver.module";
import {FooterComponent} from "./footer/footer.component";


@NgModule({
  declarations: [MenuComponent, HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatBadgeModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
    ButtonModule, CustomerModule, DriverModule

  ],
  exports: [
    MenuComponent,FooterComponent
  ]
})
export class AppLayoutModule {


}
