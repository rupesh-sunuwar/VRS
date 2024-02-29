import {Injectable} from '@angular/core';
import {environment, route} from "../env/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LoginService} from "../auth/login.service";
import {ReserveRequest} from "../model/reserve-request.model";
import {ReservationStatus} from "../model/reservation-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  private auth_url: string = environment.localhost + route.vrs_auth;

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {
  }


  reserveVehicles(reserveRequest: ReserveRequest) {
    const url = `${this.auth_url}reserve`;

    return this.httpClient.post(url, reserveRequest, {headers: this.getHeaders()})
  }

  getReservationList(email: string) {
    const url = `${this.auth_url}reservation_list/${email}`;
    return this.httpClient.get<any>(url, {headers: this.getHeaders()})
  }

  getReservationRequest(email: string) {
    const url = `${this.auth_url}reservation_request/${email}`;
    return this.httpClient.get<any>(url, {headers: this.getHeaders()})
  }

  changeReservationStatus(vehicleId: number, reservationStatus: ReservationStatus): Observable<any> {
    const url = `${this.auth_url}reserve_action`;
    const headers = this.getHeaders();
    let params = new HttpParams();
    params = params.append('vehicleId', vehicleId);
    params = params.append('reservationStatus', reservationStatus);

    return this.httpClient.post<any>(url, {}, { headers, params });
  }

  getHeaders() {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.loginService.getToken()}`)
  }
}
