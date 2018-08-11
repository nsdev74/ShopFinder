import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    const user = {email: email, password: password};
    this.http.post(
    'http://localhost:3000/api/users/signup', user
    ).subscribe ( res => {
      console.log(res);
    });
  }
}
