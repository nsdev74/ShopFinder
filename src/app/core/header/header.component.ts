import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { Router } from '../../../../node_modules/@angular/router';

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
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      // Actively reflecting user authentication status to userIsAuthenticated
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
