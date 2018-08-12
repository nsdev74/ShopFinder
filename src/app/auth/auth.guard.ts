import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs';
import { Injectable } from '../../../node_modules/@angular/core';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getAuth();
    if (!isAuth) {
      // Redirect non authenticated users to sign in page
      this.router.navigate(['signin']);
    }
    return isAuth;
  }
}
