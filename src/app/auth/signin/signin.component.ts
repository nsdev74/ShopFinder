import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../auth.service';
import { GeoLocationService } from '../../core/geo-location.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private geolocationService: GeoLocationService,
     private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  private geoSub: Subscription;

  private authErrorSub: Subscription;

  authError: boolean;

  error: string;

  newRegisteredUser: boolean;

  ngOnInit() {
    this.authErrorSub = this.authService.getErrorListener().subscribe(
      authStatus => {
        this.authError = authStatus;
      }
    );
    const snapshot = this.route.snapshot;
    if ( snapshot.queryParams.registered ) {
      this.newRegisteredUser = true;
    }
  }

  ngOnDestroy() {
    this.authErrorSub.unsubscribe();
  }

  onSignIn(form: NgForm) {
    if (form.valid) {
      // Activate loading spinner
      this.spinner.show();
      // Request geolocation
      this.geoSub = this.geolocationService.geoLocation().subscribe(
        (output) => {
        this.geolocationService.setLocation(output.coords.latitude, output.coords.longitude);
        console.log(this.geolocationService.getLocation());
        this.authService.signIn(form.value.email, form.value.password);
        this.geoSub.unsubscribe();
        // Deactivate loading spinner
        this.spinner.hide();
      },
        (error) => {
          // Deactivate loading spinner
          this.spinner.hide();
          // Display error message on the client
          this.error = error;
          console.log(error);
          this.geoSub.unsubscribe();
      });
    } else {
      // Placeholder error
      console.log('Form invalid!');
      // Display error message on the client
    }
  }
}
