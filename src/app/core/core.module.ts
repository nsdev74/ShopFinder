// Global dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// Local dependencies
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    AuthModule
  ],
  declarations: [HeaderComponent, HomeComponent],
  exports: [
    HeaderComponent,
    AppRoutingModule
  ]
})

export class CoreModule { }
