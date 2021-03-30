import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [AddDialogComponent],
  imports: [
    CommonModule,
    BuildingRoutingModule
  ]
})
export class BuildingModule { }
