// Global dependencies
import { Injectable } from '../../../node_modules/@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '../../../node_modules/@angular/common/http';
// Local dependencies
import { AuthService } from './auth.service';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      // Replacing default Authorization header with "Bearer {{token}}"
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }

}
