import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopsComponent } from './shops.component';
import { NearbyComponent } from './nearby/nearby.component';
import { PreferredComponent } from './preferred/preferred.component';


const shopsRoutes: Routes = [
  { path: 'shops', component: ShopsComponent, children: [
    { path: 'nearby', component: NearbyComponent },
    { path: 'preferred', component: PreferredComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(shopsRoutes)
  ],
  exports: [RouterModule],
  providers: [
  ]
})
export class ShopsRoutingModule {}
