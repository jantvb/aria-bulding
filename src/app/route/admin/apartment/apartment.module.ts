import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [AddDialogComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule
  ]
})
export class ApartmentModule { }
