import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "./login.service";

export const sidebarAuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const checkPermission = inject(PermissionService)

  const roles = route.data?.['roles'];
  const permissions = route.data?.['permissions'];

  if (!loginService.isLoggedIn()) {
    router.navigate(['/login']).then(
      () => {
        console.log("Route success");
      }
    );
    return false;
  }

  const userRole = loginService.getSessionRole()!;
  const userPermissions = loginService.getSessionPermissions();
  const checkRolePermission = checkPermission.checkRolePermissionForGuard(userRole, userPermissions, roles, permissions)

  if (!checkRolePermission) {
    router.navigate(['/cms/admin']).then(
      () => {
        console.log("Route success");
      }
    );
    return false;
  }

  return true;
};

export class PermissionService {
  checkRolePermissionForGuard(
    userRole: string,
    userPermissions: Array<string>,
    requiredRoles: string[],
    requiredPermissions: string[]
  ): boolean {
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      return false;
    }
    return !(requiredPermissions && !requiredPermissions.every((permission) => userPermissions.includes(permission)));

  }
}
