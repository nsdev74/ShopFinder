// Global dependencies
import { Component, OnInit } from '@angular/core';
// Local dependencies
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shop Finder';

  constructor(private authService: AuthService) {}
  // Check & use of user token during the application's start
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
