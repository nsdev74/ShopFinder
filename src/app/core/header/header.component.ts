// Global dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
// Local dependencies
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Settings user auth value synchronously as it may not fire in time in the observable
    this.userIsAuthenticated = this.authService.getAuth();
    // Actively reflecting user authentication status to userIsAuthenticated
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    // Managing our subscription
    this.authListenerSubs.unsubscribe();
  }

  onSignOut() {
    this.authService.signOut();
  }
}
