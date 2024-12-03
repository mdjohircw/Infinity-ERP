import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private permissionService: PermissionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredPermission = route.data['permission'];
    if (this.permissionService.hasPermission(requiredPermission)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
