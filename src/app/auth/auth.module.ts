import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { GeoLocationService } from '../core/geo-location.service';
import { NgxSpinnerModule } from '../../../node_modules/ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ],
  declarations: [SigninComponent, SignupComponent],
  providers: [AuthService, GeoLocationService]
})
export class AuthModule { }
