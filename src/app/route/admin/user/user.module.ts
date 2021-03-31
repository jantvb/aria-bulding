import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './user.component';
import { TableComponent } from './table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    UserComponent,
    AddDialogComponent,
    TableComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class UserModule { }
