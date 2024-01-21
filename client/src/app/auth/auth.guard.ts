import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "./login.service";
import {JwtService} from "./jwt.service";

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(LoginService).isLoggedIn() || !inject(JwtService).isTokenExpired()) return true;
  inject(Router).navigateByUrl('/login').then(
    () => {
      console.log("Route success");
    }
  );
  return false;
};
