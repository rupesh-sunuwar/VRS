import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


import {BehaviorSubject, Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {environment, route} from "../env/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private auth_url: string = environment.localhost + route.vrs_auth;
  private url: string = environment.localhost + route.vrs;
  private logoutUrl: string = environment.localhost + route.vrs_auth + "logout";
  private registerUrl: string = this.url + "register";
  private verifyUrl: string = environment.localhost + route.vrs_auth + "verify_login_otp"

  constructor(
    private httpClient: HttpClient) {
  }

  registerUser(registerUser: any) {
    const apiUrl = `${this.registerUrl}`;
    return this.httpClient.post<any>(apiUrl, registerUser);
  }

  generateToken(credentials: any): Observable<any> {
    const apiUrl = this.url + "sign_in";
    return this.httpClient.post<any>(apiUrl, credentials);
  }

  verifyToken(credentials: any): Observable<any> {
    const apiUrl = `${this.verifyUrl}`;
    return this.httpClient.post<any>(apiUrl, credentials);
  }

  loginUser(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    return !(token == undefined || token == '' || token == this.getSessionUserId());
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getSessionUser() {
    const userDetailString = localStorage.getItem("ngStorage-profile");
    const userDetail = JSON.parse(userDetailString!);
    return userDetail.full_name;
  }

  getSessionUserId() {
    const userDetailString = localStorage.getItem("ngStorage-profile");
    const userDetail = JSON.parse(userDetailString!);
    return userDetail.email;
  }

  getUserId(){
    const userDetailString = localStorage.getItem("ngStorage-profile");
    const userDetail = JSON.parse(userDetailString!);
    console.log(userDetail);
    return userDetail.id;
  }

  getSessionRole() {
    const userDetailString = localStorage.getItem("ngStorage-profile");
    const userDetail = JSON.parse(userDetailString!);
    return userDetail.role;
  }

  getUsername() {
    const userDetailString = localStorage.getItem("ngStorage-profile");
    const userDetail = JSON.parse(userDetailString!);
    return userDetail.username;
  }

  getSessionPermissions() {
    const userDetailString = localStorage.getItem("ngStorage-profile");
    const userDetail = JSON.parse(userDetailString!);
    return userDetail.permissions;
  }

  private booleanValueKey = 'booleanValue';
  private isBooleanValue = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem(this.booleanValueKey) || 'false')
  );

  private loginForm: FormGroup | null = null;

  setLoginForm(loginForm: FormGroup): void {
    this.loginForm = loginForm;
  }

  getLoginForm(): FormGroup | null {
    return this.loginForm;
  }

  logout(userId: string): Observable<string> {
    const apiUrl = `${this.logoutUrl}/${userId}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
    return this.httpClient.post<any>(apiUrl, {}, {headers});
  }

  findUserById(userId: string): Observable<any> {
    const url = `${this.auth_url}/user/${userId}`; // Corrected URL construction
    return this.httpClient.get<any>(url);
  }

  getAllUsers() {
    const url = `${this.auth_url}get_users`; // Remove the semicolon at the end of the URL
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`);
    return this.httpClient.get<any>(url, {headers: headers}); // Use the object syntax for options
  }

  clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('ngStorage-profile');
  }
}
