import {Injectable} from "@angular/core";
import {environment, route} from "../env/environment";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../auth/login.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private auth_url=environment.localhost + route.vrs_auth

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {
  }


}
