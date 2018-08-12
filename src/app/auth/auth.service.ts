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
      const token = res.token;
      this.token = token;

      if (token) {
        // Token expiration
        const expiresInDuration = res.expiresIn;
        // Saving the timer for signOut clearance usage
        this.setAuthTimer(expiresInDuration);
        // Changing the authentication status to true
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        // Saving the token locally
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate);
        // Redirecting to nearby shops page
        this.router.navigate(['/shops/nearby']);
      }
    });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      // Exit if authentication information not found
      return;
    }
    const now = new Date();
    // Comparing token expiration date with current date & time
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      // If the token's duration is valid, persist usage
      this.token = authInfo.token;
      this.isAuthenticated = true;
      // We already multiply it by * 1000 on setAuthTimer
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }


  signOut() {
    // Clearing the token and authentication status
    this.token = null;
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    // Clearing token time out
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    // Redirecting to home page
    this.router.navigate(['/']);
  }

  // Refactored token timer function for external usage
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.signOut();
      // Multiplying by 1000 to convert seconds into miliseconds
    }, duration * 1000);
  }

  // Local storage token saving function
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  // Local storage token clearing function
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  // Acquiring local storage token
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      // Exit if token or expiration date missing
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

}
