// Global dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
// Local dependencies
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private authErrorSub: Subscription;

  authError: boolean;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.authErrorSub = this.authService.getErrorListener().subscribe(
      authStatus => {
        this.authError = authStatus;
        if (this.authError) {
          // Hide loading spinner on error during submission
          this.spinner.hide();
        }
      }
    );
  }

  ngOnDestroy() {
    this.authErrorSub.unsubscribe();
  }

  onSignup(form: NgForm) {
    if (form.valid) {
      // Activate loading spinner
      this.spinner.show();
      this.authService.signUp(form.value.email, form.value.password);
    }
  }
}
