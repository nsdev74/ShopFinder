import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private authErrorSub: Subscription;

  authError: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authErrorSub = this.authService.getErrorListener().subscribe(
      authStatus => {
        this.authError = authStatus;
      }
    );
  }

  ngOnDestroy() {
    this.authErrorSub.unsubscribe();
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
