import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, of} from "rxjs";
import {Router} from "@angular/router";
import {environment, route} from "../../env/environment";
import {Store} from "@ngrx/store";
import {getUserProfileFailure, getUserProfileSuccess, logoutSuccess} from "./user.action";
import {LoginService} from "../../auth/login.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth_url: string = environment.localhost + route.vrs_auth;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private loginService:LoginService
  ) {
  }

  getUserProfile() {
    return this.http.get(`${this.auth_url}/users/profile`, {})
      .pipe(
        map((user: any) => {
          return getUserProfileSuccess({userProfile: user});
        }),
        catchError((error) => {
          return of(
            getUserProfileFailure(
              error.response && error.response.data.message ?
                error.response.data.message : error.message)
          )
        })
      ).subscribe((action) => this.store.dispatch(action));
  }


  logout() {
    localStorage.removeItem("jwt");
    this.store.dispatch(logoutSuccess());
    this.router.navigate(['']).then(value => console.log("route success"));
  }

  findAllUsers() {
    return this.http.get(`${this.auth_url}users/kyc/all`)
  }

  getAllUnverifiedUser() {
    return this.http.get(`${this.auth_url}users/kyc/getAllUnverifiedUsers` ,{headers: this.getHeaders()})
  }

  changeKycStatus(userId: number, kycStatus: string) {

    return this.http.post(`${this.auth_url}users/kyc/${userId}/${kycStatus}`, {headers: this.getHeaders()})
  }

  uploadKyc(value: any, fileToUpload: File, fileToUploadB: File) {

    const formData = new FormData();
    if (fileToUpload && fileToUploadB) {

      formData.append('citizenFront', fileToUpload);
      formData.append('citizenBack', fileToUploadB);
      formData.append('userKycRequest', new Blob([JSON.stringify(value)],
        {type: 'application/json'}));
    }

    return this.http.post(`${this.auth_url}users/kyc`, formData,{headers: this.getHeaders()});
  }

  getUserKyc(userId: any) {
   console.log(this.auth_url + "/users/kyc/")
    return this.http.get(`${this.auth_url}users/kyc/${userId}` ,{headers: this.getHeaders()});
  }

  getUserNotification() {
    const userId = this.loginService.getSessionUserId(); // Change to retrieve userId from session storage
    return this.http.get(`${this.auth_url}notification/${userId}`, { headers: this.getHeaders() }); // Fix typo
  }


  getHeaders() {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.loginService.getToken()}`)
  }
}
