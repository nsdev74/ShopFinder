import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from '../../../node_modules/rxjs';

@Injectable()

export class AuthService {

  private token: string;
  // Subject listener for authentication status
  private authStatusListener = new Subject<boolean>();

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    const user: AuthData = {email: email, password: password};
    this.http.post(
      'http://localhost:3000/api/users/signup', user
    ).subscribe ( res => {
      console.log(res);
      // Redirecting to sign in page
      this.router.navigate(['/signin']);
    });
  }

  signIn(email: string, password: string) {
    const user: AuthData = {email: email, password: password};
    this.http.post<{token: string}>(
      'http://localhost:3000/api/users/signin', user
    ).subscribe ( res => {
      console.log(res);
      // Storing the token
      this.token = res.token;
      // Redirecting to nearby shops page
      this.router.navigate(['/shops/nearby']);
      // Changing the authentication status to true
      this.authStatusListener.next(true);
    });
  }



}
