import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from '../../../node_modules/rxjs';

@Injectable()

export class AuthService {

  private isAuthenticated = false;
  private token: string;
  // This typescript version does not support NodeJS.Timer type
  private tokenTimer: any;
  // Subject listener for authentication status
  private authStatusListener = new Subject<boolean>();

  getToken() {
    return this.token;
  }

  getAuth() {
    return this.isAuthenticated;
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
    this.http.post<{token: string, expiresIn: number}>(
      'http://localhost:3000/api/users/signin', user
    ).subscribe ( res => {
      console.log(res);
      // Storing the token
      this.token = res.token;

      if (this.token) {
        // Token expiration
        const expiresInDuration = res.expiresIn;
        // Saving the timer for signOut clearance usage
        this.tokenTimer = setTimeout( () => {
          this.signOut();
        }, expiresInDuration * 1000);
        // Redirecting to nearby shops page
        this.router.navigate(['/shops/nearby']);
        // Changing the authentication status to true
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      }
    });
  }


  signOut() {
    // Clearing the token and authentication status
    this.token = null;
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    // Redirecting to home page
    this.router.navigate(['/']);
    // Clearing token time out
    clearTimeout(this.tokenTimer);
  }
}
