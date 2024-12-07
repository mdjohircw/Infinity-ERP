import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {}
  canActivate(): boolean {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  
  }
}
