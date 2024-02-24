import {Injectable} from "@angular/core";
import {environment, route} from "../env/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../auth/login.service";
import {Vehicle} from "../model/vehicle.model";
import {VehicleInfoRequest} from "../model/vehicle-info-request";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private auth_url: string = environment.localhost + route.vrs_auth;

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {
  }


  getVehicles() {
    const url = `${this.auth_url}get_vehicles`; // Corrected URL construction
    return this.httpClient.get<any>(url, {headers: this.getHeaders()});
  }

  getUserVehicles() {
    const email = this.loginService.getSessionUserId()
    const url = `${this.auth_url}get_vehicles/${email}`;
    return this.httpClient.get<any>(url, {headers: this.getHeaders()});
  }

  addVehicle(vehicle: Vehicle) {
    const url = `${this.auth_url}add_vehicle`; // Corrected URL construction
    return this.httpClient.post<any>(url, vehicle, {headers: this.getHeaders()});
  }

  getVehicleStatusById(vehicleId: number) {

    const url = `${this.auth_url}quality_info/${vehicleId}`;
    return this.httpClient.get<any>(url, {headers: this.getHeaders()})
  }

  addVehicleInfo(vehicleInfoRequest:VehicleInfoRequest){
    const url = `${this.auth_url}quality_info`; // Corrected URL construction
    return this.httpClient.post<any>(url, vehicleInfoRequest, {headers: this.getHeaders()});
  }

  getHeaders() {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.loginService.getToken()}`)
  }

}
