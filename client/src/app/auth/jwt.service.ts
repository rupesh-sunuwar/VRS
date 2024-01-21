import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoginService} from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class JwtService {
    private username$ = new BehaviorSubject<string>("");
    private role$ = new BehaviorSubject<string>("");
    private userStatus = '';
    private permission$ = new BehaviorSubject<Set<string>>(new Set<string>());

    constructor(private loginService: LoginService) {
    }

    public getUserNameForUser
    () {
        return this.username$.asObservable();
    }

    public setUserNameForUser
    (username: string) {
        this.username$.next(username);
    }

    public setRoleForUser
    (role: string) {
        this.role$.next(role);
    }

    public setUserStatusForUser
    (userStatus: string) {
        this.userStatus = userStatus;
    }

    public setPermissionForUser
    (permission: Set<string>) {
        this.permission$.next(permission);
    }

    decodedToken() {
        const jwtHelper = new JwtHelperService();
        const token = this.loginService.getToken()!;
        return jwtHelper.decodeToken(token);
    }

    isTokenExpired(): boolean {
        const jwtHelper = new JwtHelperService();
        const token = this.loginService.getToken();
        if (token === null) {
            return false;
        }
        if (token) {
            return jwtHelper.isTokenExpired(token);
        }
        return true; // If no token is present, consider it expired
    }

    getUserStatus() {
        return this.userStatus;
    }
}
