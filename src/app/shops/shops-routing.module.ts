// Global dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Local dependencies
import { ShopsComponent } from './shops.component';
import { NearbyComponent } from './nearby/nearby.component';
import { PreferredComponent } from './preferred/preferred.component';
import { AuthGuard } from '../auth/auth.guard';


const shopsRoutes: Routes = [
  // Using AuthGuard for all shop related paths, redirecting if the user is not signed in
  { path: 'shops', component: ShopsComponent, canActivate: [AuthGuard] , children: [
    { path: 'nearby', component: NearbyComponent},
    { path: 'preferred', component: PreferredComponent}
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(shopsRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class ShopsRoutingModule {}
