import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NearbyComponent } from './nearby/nearby.component';
import { PreferredComponent } from './preferred/preferred.component';
import { ShopsComponent } from './shops.component';
import { ShopsRoutingModule } from './shops-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ShopsRoutingModule
  ],
  declarations: [NearbyComponent, PreferredComponent, ShopsComponent],
  exports: [ShopsComponent]
})
export class ShopsModule { }
