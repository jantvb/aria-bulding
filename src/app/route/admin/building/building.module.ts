import { BuildingComponent } from './building.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [BuildingComponent, AddDialogComponent],
  imports: [
    CommonModule,
    BuildingRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class BuildingModule { }
