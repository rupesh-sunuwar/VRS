import {Injectable} from '@angular/core';
import {environment, route} from "../env/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../auth/login.service";
import {ReserveRequest} from "../model/reserve-request.model";

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  private auth_url: string = environment.localhost + route.vrs_auth;

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {
  }


  getVehicles() {
    const url = `${this.auth_url}get_vehicles`; // Corrected URL construction
    return this.httpClient.get<any>(url, {headers: this.getHeaders()});
  }

  reserveVehicles(reserveRequest: ReserveRequest)
  {
    const url = `${this.auth_url}reserve`;

    return this.httpClient.post(url, reserveRequest, {headers: this.getHeaders()})
  }

  getHeaders() {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.loginService.getToken()}`)
  }
}
