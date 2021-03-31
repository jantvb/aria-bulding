import { ApartmentComponent } from './apartment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [ApartmentComponent, AddDialogComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ApartmentModule { }
