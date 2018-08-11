import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.valid) {
      this.authService.signUp(form.value.email, form.value.password);
    } else {
      // Placeholder error
      console.log('Form invalid!');
    }
  }
}
