// Global dependencies
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs';
import { Injectable } from '../../../node_modules/@angular/core';
// Local dependencies
import { AuthService } from './auth.service';

@Injectable()

export class AuthSignedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getAuth();
    // Redirect authenticated users to the main page
    if (isAuth) {
      this.router.navigate(['/']);
    }
    return !isAuth;
  }
}
