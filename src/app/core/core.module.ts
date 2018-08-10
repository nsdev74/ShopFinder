import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  declarations: [HeaderComponent, HomeComponent],
  exports: [
    HeaderComponent,
    AppRoutingModule
  ]
})
export class CoreModule { }
