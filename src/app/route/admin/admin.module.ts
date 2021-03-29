import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminComponent } from './admin.component';
@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
