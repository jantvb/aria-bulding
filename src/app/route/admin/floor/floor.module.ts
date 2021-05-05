import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorRoutingModule } from './floor-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [AddDialogComponent, TableComponent],
  imports: [
    CommonModule,
    FloorRoutingModule
  ]
})
export class FloorModule { }
