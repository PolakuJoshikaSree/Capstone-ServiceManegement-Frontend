import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data['role']; 
    const userRole = localStorage.getItem('role');

    console.log('RoleGuard check:', userRole, 'expected:', expectedRole);

    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (userRole !== expectedRole) {
      console.warn('Access denied');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
