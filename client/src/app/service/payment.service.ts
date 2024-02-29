import {Injectable} from "@angular/core";
import {environment, route} from "../env/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../auth/login.service";
import {ReserveRequest} from "../model/reserve-request.model";
import {Payment, PaymentStatus} from "../model/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private auth_url=environment.localhost + route.vrs_auth

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {
  }

  makePayment(payment: Payment) {
    const url = `${this.auth_url}make_payment`;
    return this.httpClient.post(url,payment,{headers: this.getHeaders()})
  }

  getHeaders() {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.loginService.getToken()}`)
  }
}
