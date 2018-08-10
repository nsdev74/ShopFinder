import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NearbyComponent } from './nearby/nearby.component';
import { PreferredComponent } from './preferred/preferred.component';
import { ShopsComponent } from './shops.component';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsService } from './shops.service';

@NgModule({
  imports: [
    CommonModule,
    ShopsRoutingModule
  ],
  declarations: [NearbyComponent, PreferredComponent, ShopsComponent],
  exports: [ShopsComponent],
  providers: [ShopsService]
})
export class ShopsModule { }
