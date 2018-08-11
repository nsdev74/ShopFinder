import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NearbyComponent } from './nearby/nearby.component';
import { PreferredComponent } from './preferred/preferred.component';
import { ShopsComponent } from './shops.component';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsService } from './shops.service';
import { AuthInterceptor } from '../auth/auth-interceptor';
import { HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ShopsRoutingModule
  ],
  declarations: [NearbyComponent, PreferredComponent, ShopsComponent],
  exports: [ShopsComponent],
  providers: [ShopsService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class ShopsModule { }
