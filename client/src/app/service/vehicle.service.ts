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

  addVehicle(vehicle: Vehicle, file?: File) {
    const url = `${this.auth_url}add_vehicle`;

    const formData = new FormData();
    formData.append('vehicle', new Blob([JSON.stringify(vehicle)], {type: 'application/json'}));

    if (file) {
      formData.append('file', file, file.name); // Append the file with its name
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.loginService.getToken());
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.post<any>(url, formData, { headers: headers });
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
