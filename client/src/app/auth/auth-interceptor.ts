import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let newRequest = req;
        let token = this.loginService.getToken();
        if (token != null) {
            newRequest = newRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}});
        }
        return next.handle(newRequest);
    }
}
