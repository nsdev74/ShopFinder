import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from '../../../node_modules/rxjs';
import { GeoLocationService } from '../core/geo-location.service';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL + 'users/';

@Injectable()

export class AuthService {

  private isAuthenticated = false;

  private token: string;
  // This typescript version does not support NodeJS.Timer type
  private tokenTimer: any;
  // Subject listener for authentication status
  private authStatusListener = new Subject<boolean>();
  // Subject listener for authentication errors
  private authErrorListener = new Subject<boolean>();

  getToken() {
    return this.token;
  }

  getAuth() {
    return this.isAuthenticated;
  }

  getErrorListener() {
    return this.authErrorListener.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  constructor(private http: HttpClient, private router: Router, private geoService: GeoLocationService) {}

  signUp(email: string, password: string) {
    const user: AuthData = {email: email, password: password};
    this.http.post(
      BACKEND_URL + 'signup', user
    ).subscribe ( res => {
      console.log(res);
      // Redirecting to sign in page
      this.router.navigate(['/signin']);
    },
    error => {
      // Error case
      this.authErrorListener.next(true);
    }
  );
  }

  signIn(email: string, password: string) {
    const user: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>(
      BACKEND_URL + 'signin', user
    ).subscribe ( res => {
      console.log(res);
      // Storing the token
      const token = res.token;
      this.token = token;

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
        const location = this.geoService.getLocation();
        this.saveAuthData(token, expirationDate, location);
        // Redirecting to nearby shops page
        this.router.navigate(['/shops/nearby']);
    },
    error => {
      // Error case
      this.authErrorListener.next(true);
    }
  );
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
  private saveAuthData(token: string, expirationDate: Date, location: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('lat', location.lat);
    localStorage.setItem('lng', location.lng);
  }

  // Local storage token clearing function
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('lat');
    localStorage.removeItem('lng');
  }

  // Acquiring local storage token
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const lat = localStorage.getItem('lat');
    const lng = localStorage.getItem('lng');

    if (!token || !expirationDate) {
      // Exit if token or expiration date missing
      return;
    } else {
      this.geoService.setLocation(+lat, +lng);
      return {
        token: token,
        expirationDate: new Date(expirationDate)
      };
    }
  }

}
