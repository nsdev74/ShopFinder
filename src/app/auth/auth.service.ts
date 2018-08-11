import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable()

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    const user: AuthData = {email: email, password: password};
    this.http.post(
    'http://localhost:3000/api/users/signup', user
    ).subscribe ( res => {
      if (res.message === 'Success!') {
      console.log(res);
      // Redirecting to sign in page
      this.router.navigate(['/signin']);
      }
    });
  }
}
