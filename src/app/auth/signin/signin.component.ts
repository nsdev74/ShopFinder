import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../auth.service';
import { GeoLocationService } from '../../core/geo-location.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private geolocationService: GeoLocationService, private spinner: NgxSpinnerService) { }

  private geoSub: Subscription;

  ngOnInit() {
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
