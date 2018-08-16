// Global dependencies
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Local dependencies
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthSignedInGuard } from './auth-signedin.guard';


const authRoutes: Routes = [
  // Using AuthSignedInGuard for all auth related paths, redirecting if the user is already signed in
  { path: 'signup', component: SignupComponent, canActivate: [AuthSignedInGuard] },
  { path: 'signin', component: SigninComponent, canActivate: [AuthSignedInGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthSignedInGuard]
})
export class AuthRoutingModule {}
