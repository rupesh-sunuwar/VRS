import {Injectable} from "@angular/core";
import {environment, route} from "../env/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../auth/login.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private auth_url = environment.localhost + route.vrs_auth

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {
  }


  fetchPhoto(vehicleNo: string) {
    const url = `${this.auth_url}get_image/${vehicleNo}`;
    return this.httpClient.get(url, { responseType: 'blob', headers: this.getHeaders() }); // Set responseType to 'blob'
  }

  getHeaders() {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.loginService.getToken()}`)
  }

}
