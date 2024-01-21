import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment, route} from "../env/environment";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private resetUrl: string = environment.localhost + route.vrs + "reset_password";
  private changePasswordUrl: string = environment.localhost + route.vrs + "change_password";
  private getResetRequestUrl = environment.localhost + route.vrs + "reset_response";
  private createResetRequestUrl = environment.localhost + route.vrs + "request_reset";
  private forgotPasswordUrl = environment.localhost + route.vrs + "forgot_password";
  private check2FAUrl = environment.localhost + route.vrs_auth + "check/2FA/";
  private generateTwoFaQrCodeUrl = environment.localhost + route.vrs + "generate_qr_code/";
  private checkAuthenticationUrl = environment.localhost + route.vrs + "check_2FA_authentication/";
  private verifyTokenUrl = environment.localhost + route.vrs + "verify_token";
  private getRecoveryCodeUrl = environment.localhost + route.vrs_auth + "get_recovery_codes/";

  constructor(
    private httpClient: HttpClient) {
  }

  private initDataKey = 'initData';

  setInitData(data: any) {
    localStorage.setItem(this.initDataKey, JSON.stringify(data));
  }

  getInitData() {
    const initData = localStorage.getItem(this.initDataKey);
    return initData ? JSON.parse(initData) : null;
  }

  resetPassword(credentials: any): Observable<any> {
    const apiUrl = `${this.resetUrl}`;
    return this.httpClient.post<any>(apiUrl, credentials);
  }

  changePassword(credentials: any): Observable<any> {
    const apiUrl = `${this.changePasswordUrl}`;
    return this.httpClient.post<any>(apiUrl, credentials);
  }

  forgotPassword(params: HttpParams) {
    const apiUrl = `${this.forgotPasswordUrl}`;
    return this.httpClient.post<any>(apiUrl, null, {params});
  }

  getResetResponse(params: HttpParams) {
    const apiUrl = `${this.getResetRequestUrl}`;
    return this.httpClient.post(apiUrl, null, {params, responseType: 'text'}).pipe(
      catchError(error => {
        console.error('HTTP request error:', error);
        const customError = new Error('An error occurred: ' + error.message);
        return throwError(() => customError);
      })
    );
  }


  requestReset(params: HttpParams) {
    const apiUrl = `${this.createResetRequestUrl}`;
    return this.httpClient.post<any>(apiUrl, null, {params}).pipe(
      catchError(error => {
        const customError = new Error(error);
        return throwError(() => customError);
      })
    );
  }

  check2FA(username: string, params: HttpParams) {
    const apiUrl = `${this.check2FAUrl}${username}`;
    return this.httpClient.post<any>(apiUrl, null, {params});
  }

  generateTwoFaQrCode(username: string): Observable<Blob> {
    const url = `${this.generateTwoFaQrCodeUrl}${username}`;
    return this.httpClient.get(url, {responseType: 'blob'});
  }

  checkAuthentication(username: string, userCode: string) {
    const apiUrl = `${this.checkAuthenticationUrl}${username}/${userCode}`;
    return this.httpClient.post<any>(apiUrl, {});
  }

  verifyToken(params: HttpParams) {
    const apiUrl = `${this.verifyTokenUrl}`;
    return this.httpClient.post<any>(apiUrl, null, {params});
  }

  getRecoveryCode(username: string) {
    const apiUrl = `${this.getRecoveryCodeUrl}${username}`;
    return this.httpClient.get<any>(apiUrl, {});
  }
}
